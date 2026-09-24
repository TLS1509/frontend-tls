/**
 * Décodeur PNG minimal — juste assez pour lire les captures de Chromium
 * (8 bits, RVB ou RVBA, non entrelacé). Évite une dépendance pour 40 lignes.
 */
import { inflateSync } from 'node:zlib';

export function decodePng(buf) {
  let pos = 8, largeur = 0, hauteur = 0, type = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const nom = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (nom === 'IHDR') {
      largeur = data.readUInt32BE(0); hauteur = data.readUInt32BE(4);
      if (data[8] !== 8 || data[12] !== 0) throw new Error('PNG non géré (profondeur ou entrelacement)');
      type = data[9];
    } else if (nom === 'IDAT') idat.push(data);
    else if (nom === 'IEND') break;
    pos += 12 + len;
  }
  const bpp = type === 6 ? 4 : type === 2 ? 3 : 0;
  if (!bpp) throw new Error(`PNG de type ${type} non géré`);
  const brut = inflateSync(Buffer.concat(idat));
  const ligne = largeur * bpp;
  const px = Buffer.alloc(ligne * hauteur);
  for (let y = 0; y < hauteur; y++) {
    const f = brut[y * (ligne + 1)];
    const src = brut.subarray(y * (ligne + 1) + 1, (y + 1) * (ligne + 1));
    const out = px.subarray(y * ligne, (y + 1) * ligne);
    const prec = y ? px.subarray((y - 1) * ligne, y * ligne) : null;
    for (let x = 0; x < ligne; x++) {
      const a = x >= bpp ? out[x - bpp] : 0;
      const b = prec ? prec[x] : 0;
      const c = prec && x >= bpp ? prec[x - bpp] : 0;
      let v = src[x];
      if (f === 1) v += a;
      else if (f === 2) v += b;
      else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      out[x] = v & 255;
    }
  }
  return { largeur, hauteur, bpp, px };
}
