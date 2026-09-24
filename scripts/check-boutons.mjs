#!/usr/bin/env node
/**
 * check-boutons — chaque écran a-t-il UNE action principale, et une seule ?
 *
 *   npm run dev                                   # dans un autre terminal
 *   node scripts/check-boutons.mjs                # routes de l'app (sans le site)
 *   node scripts/check-boutons.mjs --route /dashboard --detail
 *   node scripts/check-boutons.mjs --params       # + routes à paramètre (:id → 1)
 *
 * Né le 2026-09-24 avec l'arbitrage n°19 : un seul `solid` par écran, et c'est
 * l'action principale ; `soft` porte l'action de contexte (dans une carte, une
 * rangée), `ghost` le tertiaire, `outline` est réservé aux paires Annuler /
 * Confirmer. Deux `solid` visibles, et l'œil ne sait plus où aller.
 *
 * Il lit le niveau RENDU, que `Button` expose en `data-emphasis` (alias
 * résolu : un `variant="destructive"` compte comme un `solid`). Seuls les
 * boutons visibles comptent — une modale fermée n'est pas dans le DOM, et le
 * doublon mobile d'un CTA de bureau est masqué.
 *
 * Il relève :
 *   PLUSIEURS SOLID   plus d'un `solid` visible sur l'écran ;
 *   AUCUN SOLID       aucun — souvent légitime (page de lecture), à regarder ;
 * et recense les niveaux, pour voir la hiérarchie de toute l'app d'un coup.
 */
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';

const sonde = () => {
  const boutons = [];
  for (const el of document.querySelectorAll('[data-emphasis]')) {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility === 'hidden' || +s.opacity === 0) continue;
    if (el.closest('[aria-hidden="true"],[inert]')) continue;
    boutons.push({
      niveau: el.dataset.emphasis,
      texte: (el.textContent.trim() || el.getAttribute('aria-label') || '').slice(0, 40),
      y: Math.round(r.top + scrollY),
    });
  }
  return { boutons };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: process.argv.includes('--site'), params: process.argv.includes('--params') });
const res = await parcourir(routes, sonde, {});

const niveaux = {};
const plusieurs = [];
const aucun = [];
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) { console.log(`⚠️  ${route} — ${r.erreur}`); continue; }
  for (const b of r.boutons) niveaux[b.niveau] = (niveaux[b.niveau] ?? 0) + 1;
  const solides = r.boutons.filter((b) => b.niveau === 'solid');
  if (solides.length > 1) plusieurs.push({ route, solides });
  if (solides.length === 0 && r.boutons.length) aucun.push(route);
}

const total = Object.values(niveaux).reduce((a, b) => a + b, 0);
console.log(`\nNiveaux rendus — ${total} boutons visibles sur ${routes.length} routes`);
for (const k of ['solid', 'soft', 'outline', 'ghost', 'link']) console.log(`  ${String(niveaux[k] ?? 0).padStart(6)}  ${k}`);

console.log(`\nPLUSIEURS SOLID — ${plusieurs.length} écran(s)`);
const detail = process.argv.includes('--detail');
for (const p of plusieurs.sort((a, b) => b.solides.length - a.solides.length).slice(0, detail ? 500 : 30)) {
  console.log(`  ${String(p.solides.length).padStart(3)}×  ${p.route}   ${p.solides.map((s) => `« ${s.texte} »`).slice(0, 4).join(' · ')}`);
}
console.log(`\nAUCUN SOLID — ${aucun.length} écran(s) qui ont des boutons mais pas d'action principale (souvent légitime)`);
if (detail) for (const r of aucun) console.log(`  ${r}`);
process.exit(process.argv.includes('--strict') && plusieurs.length ? 1 : 0);
