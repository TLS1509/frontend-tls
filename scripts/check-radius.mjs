#!/usr/bin/env node
/**
 * check-radius — les coins imbriqués suivent-ils la règle ?
 *
 *   npm run dev                         # dans un autre terminal
 *   node scripts/check-radius.mjs       # toutes les routes statiques
 *   node scripts/check-radius.mjs --app | --route /dashboard | --largeur 375
 *
 * La règle (adoptée le 2026-09-23, doctrine-design.md « Règle des coins
 * imbriqués ») : RAYON INTÉRIEUR = RAYON EXTÉRIEUR − RETRAIT. Le retrait se
 * mesure du bord extérieur du parent au bord de l'enfant, bordure du parent
 * comprise.
 *
 *   retrait au coin (dx, dy)      régime          attendu
 *   les deux ≥ R du parent        forme fixe      rien — l'enfant garde son étage
 *   les deux < R                  concentrique    r ≈ R − retrait, à ±3 px
 *   l'un < R, l'autre ≥ R         hors zone       rien
 *   enfant capsule ou cercle      exempté         rien (arbitrage n°6)
 *
 * Deux défauts :
 *   PINCÉ  — r > R − min(dx, dy) + 3 : l'enfant est plus rond que l'espace ne
 *            le permet, l'écart se resserre dans le coin ;
 *   ÉVASÉ  — r < R − max(dx, dy) − 3 : l'enfant est trop carré, l'écart s'ouvre.
 *
 * Ne compte que les paires VISIBLES : un enfant sans fond, sans bordure et sans
 * ombre n'a pas de coin qui se voie ; un enfant collé au bord d'un parent en
 * `overflow: hidden` est rogné par lui.
 *
 * Le 23/09, la version manuelle de cette sonde a mesuré 1 321 paires sur 60
 * routes, dont 87 % en forme fixe. Sortie non nulle s'il reste un défaut.
 */
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';

const sonde = () => {
  const visible = (s) =>
    (s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent') ||
    s.backgroundImage !== 'none' ||
    (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') ||
    s.boxShadow !== 'none';
  const rayon = (s, coin) => parseFloat(s[`border${coin}Radius`]) || 0;
  const COINS = [
    ['TopLeft', (e, p) => [e.left - p.left, e.top - p.top]],
    ['TopRight', (e, p) => [p.right - e.right, e.top - p.top]],
    ['BottomLeft', (e, p) => [e.left - p.left, p.bottom - e.bottom]],
    ['BottomRight', (e, p) => [p.right - e.right, p.bottom - e.bottom]],
  ];

  let paires = 0;
  const defauts = [];
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (!visible(s) || s.visibility === 'hidden' || +s.opacity === 0) continue;
    // Les vignettes de tokens de la vitrine MONTRENT une valeur (un rayon, une
    // ombre, un pas d'espacement) : ce ne sont pas des formes à accorder.
    if (el.closest('.token-card')) continue;
    const e = el.getBoundingClientRect();
    if (e.width < 8 || e.height < 8) continue;
    const demi = Math.min(e.width, e.height) / 2;

    // Parent arrondi et visible le plus proche.
    let parent = el.parentElement, ps = null;
    while (parent && parent !== document.body) {
      ps = getComputedStyle(parent);
      if (visible(ps) && COINS.some(([c]) => rayon(ps, c) > 0)) break;
      parent = parent.parentElement;
    }
    if (!parent || parent === document.body) continue;
    const p = parent.getBoundingClientRect();
    const rogne = ps.overflow !== 'visible' || ps.overflowX !== 'visible';

    for (const [coin, retrait] of COINS) {
      const R = Math.min(rayon(ps, coin), Math.min(p.width, p.height) / 2);
      if (R <= 0) continue;
      const r = Math.min(rayon(s, coin), demi);
      if (r >= demi - 0.5) continue; // capsule ou cercle : exempté
      const [dx, dy] = retrait(e, p);
      if (dx < -0.5 || dy < -0.5) continue; // déborde du parent
      if (!(dx < R && dy < R)) continue; // forme fixe ou hors zone
      // Rogné par le parent : `overflow` coupe au bord INTÉRIEUR de la bordure,
      // avec le rayon intérieur. Un enfant collé à ce bord (calque inset-0,
      // couverture en tête de carte) prend la forme du parent, quel que soit
      // son propre rayon.
      const bx = coin.endsWith('Left') ? parseFloat(ps.borderLeftWidth) : parseFloat(ps.borderRightWidth);
      const by = coin.startsWith('Top') ? parseFloat(ps.borderTopWidth) : parseFloat(ps.borderBottomWidth);
      if (rogne && (dx <= bx + 0.5 || dy <= by + 0.5)) continue;
      paires++;
      const max = R - Math.min(dx, dy) + 3;
      const min = R - Math.max(dx, dy) - 3;
      if (r > max || r < min) {
        defauts.push({
          type: r > max ? 'pincé' : 'évasé',
          coin, r: Math.round(r), R: Math.round(R), retrait: [Math.round(dx), Math.round(dy)],
          attendu: Math.max(0, Math.round(R - Math.max(dx, dy))),
          enfant: `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 70)}`,
          parent: String(parent.className).slice(0, 50),
        });
        break; // un défaut par élément suffit
      }
    }
  }
  return { paires, defauts };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: !process.argv.includes('--app') });
const largeur = Number(arg('--largeur') ?? 1440);

const res = await parcourir(routes, sonde, { largeur });
let total = 0, paires = 0;
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) { console.log(`⚠️  ${route} — ${r.erreur}`); continue; }
  paires += r.paires;
  if (!r.defauts.length) continue;
  total += r.defauts.length;
  console.log(`\n${route}`);
  for (const d of r.defauts) {
    console.log(`   ${d.type.padEnd(6)} ${d.coin.padEnd(11)} r ${d.r} dans R ${d.R}, retrait ${d.retrait.join('×')} → attendu ≈ ${d.attendu}`);
    console.log(`          ${d.enfant}   ⊂ ${d.parent}`);
  }
}
console.log(`\n${routes.length} routes · ${paires} paires concentriques mesurées · largeur ${largeur} px`);
console.log(total ? `❌ ${total} coin(s) hors règle.` : '✅ Tous les coins imbriqués suivent la règle.');
process.exit(total ? 1 : 0);
