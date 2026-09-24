#!/usr/bin/env node
/**
 * check-rythme — l'espace dit-il la hiérarchie ?
 *
 *   npm run dev                                  # dans un autre terminal
 *   node scripts/check-rythme.mjs                # routes de l'app
 *   node scripts/check-rythme.mjs --route /passeport --detail
 *
 * Né le 2026-09-24. Un titre appartient à ce qu'il introduit : l'espace AU-DESSUS
 * d'un titre doit être nettement plus grand que l'espace EN DESSOUS (loi de
 * proximité, Gestalt ; Material 3 et Apple HIG règlent leurs en-têtes de section
 * ainsi). Quand les deux sont égaux, le titre flotte entre deux blocs et l'œil
 * ne sait plus à quoi il se rattache. La doctrine (fiche « Rythme des titres »)
 * vise un rapport de 3:1 ; ce script signale sous 1,5:1.
 *
 * Mesures, pour chaque titre visible (h1…h4, ou texte League Spartan ≥ 18 px) :
 *   dessus  = distance au bord bas de l'élément visible qui le précède ;
 *   dessous = distance au bord haut de l'élément visible qui le suit ;
 * (« visible » = boîte non nulle, hors conteneurs purement structurels : on
 * remonte au premier ancêtre qui a un frère précédent / suivant.)
 * Et le recensement des espacements réels entre frères (gap et marges
 * confondus), pour voir quels pas l'app emploie vraiment.
 */
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';

const sonde = () => {
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.position !== 'absolute' && s.position !== 'fixed'; };
  const voisin = (el, sens) => {
    // premier frère visible dans le sens donné, en remontant si besoin
    let cur = el;
    while (cur && cur !== document.body) {
      let s = sens < 0 ? cur.previousElementSibling : cur.nextElementSibling;
      while (s && !visible(s)) s = sens < 0 ? s.previousElementSibling : s.nextElementSibling;
      if (s) return { el: s, depuis: cur };
      cur = cur.parentElement;
    }
    return null;
  };
  const titres = [];
  for (const el of document.querySelectorAll('h1,h2,h3,h4,p,span,div')) {
    if (el.closest('svg,[aria-hidden="true"],nav,header[role="banner"],aside')) continue;
    const tag = el.tagName.toLowerCase();
    const s = getComputedStyle(el);
    const px = parseFloat(s.fontSize);
    const estTitre = /^h[1-4]$/.test(tag) || (/spartan/i.test(s.fontFamily) && px >= 18 && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
    if (!estTitre || !visible(el)) continue;
    const r = el.getBoundingClientRect();
    const avant = voisin(el, -1), apres = voisin(el, 1);
    const dessus = avant ? Math.round(r.top - avant.el.getBoundingClientRect().bottom) : null;
    const dessous = apres ? Math.round(apres.el.getBoundingClientRect().top - r.bottom) : null;
    titres.push({ tag, px: Math.round(px), texte: el.textContent.trim().slice(0, 36), classe: String(el.className).slice(0, 70), dessus, dessous });
  }
  const gaps = {};
  for (const el of document.querySelectorAll('main *')) {
    const s = getComputedStyle(el);
    if (!(s.display.includes('flex') || s.display.includes('grid'))) continue;
    const g = s.flexDirection === 'row' && s.display.includes('flex') ? null : parseFloat(s.rowGap);
    if (g && el.children.length > 1) gaps[Math.round(g)] = (gaps[Math.round(g)] ?? 0) + 1;
  }
  return { titres, gaps };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: process.argv.includes('--site') });
const res = await parcourir(routes, sonde, {});

const gaps = {};
const plats = [];
let nb = 0;
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) continue;
  for (const [g, n] of Object.entries(r.gaps)) gaps[g] = (gaps[g] ?? 0) + n;
  for (const t of r.titres) {
    if (t.dessus == null || t.dessous == null || t.dessous < 0 || t.dessus < 0) continue;
    nb++;
    const rapport = t.dessous === 0 ? Infinity : t.dessus / t.dessous;
    if (rapport < 1.5) plats.push({ route, ...t, rapport });
  }
}
console.log(`\nEspacements verticaux réels entre frères (gap de colonne), toutes routes :`);
for (const [g, n] of Object.entries(gaps).sort((a, b) => b[1] - a[1]).slice(0, 16)) console.log(`  ${String(n).padStart(6)}× ${g} px`);
console.log(`\nTitres dont l'espace au-dessus n'est pas ≥ 1,5 × l'espace en dessous : ${plats.length} sur ${nb}`);
const groupes = new Map();
for (const p of plats) {
  const k = `${p.tag} ${p.px}px · dessus ${p.dessus} / dessous ${p.dessous} · ${p.classe}`;
  if (!groupes.has(k)) groupes.set(k, []);
  groupes.get(k).push(p.route);
}
for (const [k, rs] of [...groupes.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, process.argv.includes('--detail') ? 300 : 25)) {
  const pages = [...new Set(rs)];
  console.log(`  ${String(rs.length).padStart(4)}×  ${k.slice(0, 120)}  (${pages.slice(0, 2).join(', ')}${pages.length > 2 ? `, +${pages.length - 2}` : ''})`);
}
