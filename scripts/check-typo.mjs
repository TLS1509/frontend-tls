#!/usr/bin/env node
/**
 * check-typo — la typographie RENDUE suit-elle l'échelle et la hiérarchie ?
 *
 *   npm run dev                                   # dans un autre terminal
 *   node scripts/check-typo.mjs                   # routes de l'app (sans le site)
 *   node scripts/check-typo.mjs --route /passeport --detail
 *   node scripts/check-typo.mjs --site            # avec /website/*
 *   node scripts/check-typo.mjs --params          # + routes à paramètre (:id → 1)
 *   node scripts/check-typo.mjs --json <fichier>  # tout le relevé, pour analyse
 *
 * Né le 2026-09-24, avec les arbitrages n°20 (texte courant à 16 px) et n°21
 * (titres 28 puis 20). Les tokens disent l'échelle ; ce script dit ce que l'œil
 * reçoit : une classe peut être écrasée, un titre peut n'avoir aucune classe
 * (la base CSS parle alors), un composant peut porter sa propre taille.
 *
 * Échelle cible de l'app (doctrine-design.md, arbitrages n°20-21) :
 *   h1 36 · h2 28 · h3 20 · chapô 18 · corps 16 · légende 13 · étiquette 11
 * + les chiffres de `stat-value` (≥ 30 px, League Spartan). Le site garde sa
 * couche d'affiche (hero, section, title, feature, lede), mesurée à part.
 *
 * Ce qu'il relève :
 *   HORS ÉCHELLE   une taille rendue qui n'est pas un pas de l'échelle cible ;
 *   TITRE          un h1…h4 qui n'est pas en 700 ou pas en League Spartan ;
 *   NIVEAU         un saut de niveau (h1 → h3), ou un titre plus grand que
 *                  celui de niveau supérieur sur la même page ;
 *   H1             aucun h1, ou plusieurs ;
 *   GRAISSE        800/900 dans l'app (réservés au site) ;
 *   FAMILLE        League Spartan sous 16 px, ou Nunito en gras ≥ 20 px (un
 *                  titre qui s'ignore).
 * Il dresse aussi le recensement : combien de textes par taille × graisse ×
 * famille, pour voir d'un coup d'œil si la hiérarchie tient.
 *
 * Ne note pas : les tailles au sein de SVG (graphiques), le texte masqué.
 * Sortie 0 : c'est un recensement ; `--strict` rend la sortie non nulle.
 */
import { writeFileSync } from 'node:fs';
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';

const ECHELLE = [36, 28, 20, 18, 16, 13, 11];

const sonde = (echelle) => {
  const famille = (f) => (/spartan/i.test(f) ? 'display' : /nunito/i.test(f) ? 'body' : /mono|menlo|courier/i.test(f) ? 'mono' : 'autre');
  const textes = [];
  const titres = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg,script,style,noscript,[aria-hidden="true"]')) continue;
    const direct = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    const tag = el.tagName.toLowerCase();
    const estTitre = /^h[1-6]$/.test(tag);
    if (!direct && !estTitre) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || +s.opacity === 0) continue;
    const px = Math.round(parseFloat(s.fontSize) * 10) / 10;
    const lh = s.lineHeight === 'normal' ? null : Math.round(parseFloat(s.lineHeight) * 10) / 10;
    const item = {
      tag, px, poids: +s.fontWeight, fam: famille(s.fontFamily), lh,
      texte: (direct || el.textContent.trim()).slice(0, 40),
      classe: String(el.className).slice(0, 80),
      y: Math.round(r.top + scrollY),
    };
    if (direct) textes.push(item);
    if (estTitre) titres.push({ ...item, niveau: +tag[1] });
  }

  const defauts = [];
  const pres = (px) => echelle.some((e) => Math.abs(e - px) < 0.6);
  for (const t of textes) {
    if (!pres(t.px) && !(t.px >= 30 && t.fam === 'display')) defauts.push({ type: 'HORS ÉCHELLE', ...t });
    if (t.poids >= 800) defauts.push({ type: 'GRAISSE', ...t });
    if (t.fam === 'display' && t.px < 16) defauts.push({ type: 'FAMILLE', note: 'League Spartan sous 16 px', ...t });
    if (t.fam === 'body' && t.poids >= 700 && t.px >= 20 && !/^h[1-6]$/.test(t.tag)) defauts.push({ type: 'FAMILLE', note: 'Nunito gras ≥ 20 px : un titre qui s’ignore', ...t });
  }
  for (const h of titres) {
    if (h.niveau <= 4 && h.poids !== 700) defauts.push({ type: 'TITRE', note: `graisse ${h.poids}`, ...h });
    if (h.niveau <= 4 && h.fam !== 'display') defauts.push({ type: 'TITRE', note: `famille ${h.fam}`, ...h });
  }
  const h1 = titres.filter((h) => h.niveau === 1).length;
  if (h1 !== 1) defauts.push({ type: 'H1', note: `${h1} h1 sur la page`, tag: 'h1', px: 0, texte: '', classe: '' });
  // Sauts et inversions, dans l'ordre du document.
  const ordre = titres.slice().sort((a, b) => a.y - b.y);
  let precedent = null;
  const tailleMaxParNiveau = {};
  for (const h of ordre) {
    if (precedent && h.niveau > precedent.niveau + 1) defauts.push({ type: 'NIVEAU', note: `h${precedent.niveau} → h${h.niveau}`, ...h });
    precedent = h;
    tailleMaxParNiveau[h.niveau] = Math.max(tailleMaxParNiveau[h.niveau] ?? 0, h.px);
  }
  for (const h of titres) {
    const sup = tailleMaxParNiveau[h.niveau - 1];
    if (sup && h.px > sup + 0.5) defauts.push({ type: 'NIVEAU', note: `h${h.niveau} (${h.px}) plus grand que les h${h.niveau - 1} (${sup})`, ...h });
  }
  return { textes, defauts };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: process.argv.includes('--site'), params: process.argv.includes('--params') });
const res = await parcourir(routes, `(${sonde.toString()})(${JSON.stringify(ECHELLE)})`, {});

// Recensement global : taille × graisse × famille.
const recensement = new Map();
const parType = new Map();
let total = 0;
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) continue;
  for (const t of r.textes) {
    const k = `${String(t.px).padStart(5)} px · ${t.poids} · ${t.fam}`;
    recensement.set(k, (recensement.get(k) ?? 0) + 1);
    total++;
  }
  for (const d of r.defauts) {
    const k = d.type;
    if (!parType.has(k)) parType.set(k, []);
    parType.get(k).push({ route, ...d });
  }
}

console.log(`\nRecensement — ${total} textes sur ${routes.length} routes (taille · graisse · famille)\n`);
for (const [k, n] of [...recensement.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(`  ${String(n).padStart(6)}  ${k}`);

console.log('\nDéfauts');
for (const [type, liste] of parType) {
  console.log(`\n  ${type} — ${liste.length}`);
  const groupes = new Map();
  for (const d of liste) {
    const k = `${d.note ?? `${d.px} px · ${d.poids}`} · ${d.classe || d.tag}`;
    if (!groupes.has(k)) groupes.set(k, []);
    groupes.get(k).push(d.route);
  }
  const lignes = [...groupes.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [k, rs] of lignes.slice(0, process.argv.includes('--detail') ? 200 : 12)) {
    const pages = [...new Set(rs)];
    console.log(`    ${String(rs.length).padStart(4)}×  ${k.slice(0, 110)}   (${pages.slice(0, 3).join(', ')}${pages.length > 3 ? `, +${pages.length - 3}` : ''})`);
  }
}
const json = arg('--json');
if (json) writeFileSync(json, JSON.stringify(res, null, 1));
const nb = [...parType.values()].reduce((s, l) => s + l.length, 0);
console.log(`\n${nb} défaut(s) typographiques relevés.`);
process.exit(process.argv.includes('--strict') && nb ? 1 : 0);
