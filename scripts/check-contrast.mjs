#!/usr/bin/env node
/**
 * check-contrast — tout texte rendu passe-t-il WCAG AA sur son fond RÉEL ?
 *
 *   npm run dev                          # dans un autre terminal
 *   node scripts/check-contrast.mjs      # toutes les routes statiques
 *   node scripts/check-contrast.mjs --app                 # sans le site
 *   node scripts/check-contrast.mjs --route /passeport    # une seule route
 *   node scripts/check-contrast.mjs --largeur 375         # en mobile
 *
 * Né le 2026-09-23. Ce jour-là, la même sonde, lancée à la main, a trouvé :
 * un stepper d'onboarding à 1,93:1, des h1 ink-900 sur dégradé teal (la base CSS
 * battait `text-white`, piège n°16), 73 textes teal-700 sur surface teal-50/100
 * (4,11-4,48), un titre du site blanc sur blanc (1,00). Aucun ne se voyait dans
 * le code. Elle vivait dans un dossier temporaire : ce script la rend
 * permanente, pour qu'une régression se voie avant d'être livrée.
 *
 * Méthode (ce qui a été appris en la construisant) :
 * - couleurs lues via un canvas : Tailwind 4 émet `oklab()` (piège n°6 ter) ;
 * - fond composé en remontant les parents translucides ;
 * - sur un dégradé, on mesure contre l'arrêt le PLUS CLAIR — le texte peut s'y
 *   poser (piège n°6 quater) ;
 * - un échec est revérifié sur ce qui est vraiment peint sous le texte
 *   (`elementsFromPoint`) : un fond peut venir d'un élément voisin, pas d'un
 *   parent (faux 1,00 de /website/contact) ;
 * - seuils : 4,5 ; 3 pour le grand texte (≥ 24 px, ou ≥ 18,66 px gras) et pour
 *   un glyphe seul (✓, ·) qui fonctionne comme une icône ;
 * - exclus : aria-hidden, disabled / aria-disabled (exemptés par WCAG).
 *
 * Ne couvre pas : états survol et focus, texte sur image ou canvas.
 * Sortie non nulle s'il reste un échec.
 */
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';
import { decodePng } from './lib/png.mjs';

const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const rapport = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

/* Un échec calculé est revérifié sur les PIXELS réellement peints sous le texte :
   capture de sa boîte, fond = couleur la plus fréquente parmi les pixels éloignés
   de l'encre. C'est la seule mesure juste sous un halo radial, un calque voisin
   en dégradé ou un verre flouté — les cas où la remontée des parents se trompe
   (faux 1,00 de l'item actif de la nav, faux échecs sous les halos Auth). */
async function verifierAuxPixels(page, res) {
  const gardes = [];
  for (const e of res.echecs) {
    const b = e.boite;
    if (b.width < 2 || b.height < 2) continue;
    let png;
    try { png = decodePng(await page.screenshot({ clip: { x: Math.max(0, b.x), y: Math.max(0, b.y), width: b.width, height: b.height }, fullPage: true })); }
    catch { gardes.push(e); continue; }
    const compte = new Map();
    for (let i = 0; i < png.px.length; i += png.bpp) {
      const c = [png.px[i], png.px[i + 1], png.px[i + 2]];
      if (Math.hypot(c[0] - e.encre[0], c[1] - e.encre[1], c[2] - e.encre[2]) < 48) continue; // pixel d'encre
      const k = ((c[0] >> 2) << 12) | ((c[1] >> 2) << 6) | (c[2] >> 2);
      compte.set(k, (compte.get(k) ?? 0) + 1);
    }
    if (!compte.size) { gardes.push(e); continue; }
    const k = [...compte.entries()].sort((a, z) => z[1] - a[1])[0][0];
    const fond = [((k >> 12) & 63) << 2, ((k >> 6) & 63) << 2, (k & 63) << 2];
    const cr = rapport(e.encre, fond);
    if (cr < e.seuil) gardes.push({ ...e, cr: +cr.toFixed(2) });
  }
  return { ...res, echecs: gardes };
}

const sonde = () => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const rgb = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const L = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  // Fond sous `el` en remontant `depuis` : composé des voiles, arrêt de dégradé le plus clair.
  const fondDepuis = (depuis) => {
    const voiles = [];
    for (let e = depuis; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none') {
        const arrets = s.backgroundImage.match(/(?:rgba?|oklab|oklch|lab|lch|color)\([^()]*(?:\([^()]*\)[^()]*)*\)/g);
        if (!arrets) return null; // image : hors de portée
        let base = arrets.map((c) => rgb(c)).reduce((w, c) => (L(c) > L(w) ? c : w)).slice(0, 3);
        for (const c of voiles.reverse()) base = base.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
        return base;
      }
      const c = rgb(s.backgroundColor);
      if (c[3] > 0) { voiles.push(c); if (c[3] >= 1) break; }
    }
    let base = [255, 255, 255];
    for (const c of voiles.reverse()) base = base.map((v, i) => v * (1 - c[3]) + c[i] * c[3]);
    return base;
  };

  const echecs = [];
  let mesures = 0;
  for (const el of document.querySelectorAll('body *')) {
    const texte = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    if (!texte || el.closest('[aria-hidden="true"],[disabled],[aria-disabled="true"],script,style,noscript')) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || +s.opacity < 0.99) continue;
    const fond = fondDepuis(el);
    if (!fond) continue;
    mesures++;
    const fg = rgb(s.color);
    const encre = fond.map((v, i) => v * (1 - fg[3]) + fg[i] * fg[3]);
    const px = parseFloat(s.fontSize);
    const grand = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700);
    const glyphe = texte.length <= 2 && !/[\p{L}\p{N}]/u.test(texte);
    const seuil = grand || glyphe ? 3 : 4.5;
    let cr = ratio(encre, fond);
    if (cr >= seuil) continue;
    // Revérifier sur ce qui est vraiment peint au centre du texte.
    const pile = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const dessous = pile.find((x) => x !== el && !el.contains(x) && !x.contains(el) && (getComputedStyle(x).backgroundColor !== 'rgba(0, 0, 0, 0)' || getComputedStyle(x).backgroundImage !== 'none'));
    if (dessous) {
      const f2 = fondDepuis(dessous);
      if (f2) { const e2 = f2.map((v, i) => v * (1 - fg[3]) + fg[i] * fg[3]); cr = Math.max(cr, ratio(e2, f2)); }
    }
    if (cr < seuil) echecs.push({
      cr: +cr.toFixed(2), seuil, texte: texte.slice(0, 40), classe: String(el.className).slice(0, 90),
      boite: { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height },
      encre: fg.slice(0, 3).map(Math.round),
    });
  }
  return { mesures, echecs };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: !process.argv.includes('--app'), params: process.argv.includes('--params') });
const largeur = Number(arg('--largeur') ?? 1440);

const res = await parcourir(routes, sonde, { largeur, apres: verifierAuxPixels });
let total = 0, mesures = 0;
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) { console.log(`⚠️  ${route} — ${r.erreur}`); continue; }
  mesures += r.mesures;
  if (!r.echecs.length) continue;
  total += r.echecs.length;
  console.log(`\n${route}`);
  for (const e of r.echecs) console.log(`   ${String(e.cr).padStart(5)} < ${e.seuil}  « ${e.texte} »  ${e.classe}`);
}
console.log(`\n${routes.length} routes · ${mesures} textes mesurés · largeur ${largeur} px`);
console.log(total ? `❌ ${total} texte(s) sous le seuil AA.` : '✅ Aucun texte sous le seuil AA.');
process.exit(total ? 1 : 0);
