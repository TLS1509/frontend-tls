#!/usr/bin/env node
/**
 * check-rythme — l'espace dit-il la hiérarchie ?
 *
 *   npm run dev                                  # dans un autre terminal
 *   node scripts/check-rythme.mjs                # routes de l'app
 *   node scripts/check-rythme.mjs --route /passeport --detail
 *   node scripts/check-rythme.mjs --route /passeport --tout   # chaque titre mesuré
 *   node scripts/check-rythme.mjs --params       # + routes à paramètre (:id → 1)
 *
 * Né le 2026-09-24. Un titre appartient à ce qu'il introduit : l'espace AU-DESSUS
 * d'un titre doit être nettement plus grand que l'espace EN DESSOUS (loi de
 * proximité, Gestalt ; Material 3 et Apple HIG règlent leurs en-têtes de section
 * ainsi). Quand les deux sont égaux, le titre flotte entre deux blocs et l'œil
 * ne sait plus à quoi il se rattache. La doctrine (fiche « Rythme des titres »)
 * vise un rapport de 3:1 ; ce script signale sous 1,5:1.
 *
 * Mesures, pour chaque titre de SECTION visible (h1, h2, ou League Spartan
 * ≥ 24 px) — révisé le 24/09 : un titre de bloc (h3 20, titre de carte) suit
 * l'anatomie de la carte (surtitre 4 au-dessus, texte 8 en dessous), serrée
 * par construction ; le compter faussait le relevé. On mesure le GROUPE
 * d'en-tête (surtitre + titre + sous-titre frères directs, petits textes) :
 *   dessus  = distance du haut du groupe à l'élément visible qui le précède ;
 *   dessous = distance du bas du groupe à l'élément visible qui le suit ;
 * (« visible » = boîte non nulle, hors conteneurs purement structurels : on
 * remonte au premier ancêtre qui a un frère précédent / suivant.)
 * Et le recensement des espacements réels entre frères (gap et marges
 * confondus), pour voir quels pas l'app emploie vraiment.
 */
import { routesStatiques, parcourir, arg } from './lib/browser-probe.mjs';

const sonde = () => {
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.position !== 'absolute' && s.position !== 'fixed'; };
  // Premier élément visible AU-DESSUS (sens < 0) ou EN DESSOUS (sens > 0), parmi
  // les frères puis en remontant. Un frère posé À CÔTÉ (colonne voisine, lien
  // aligné sur la même ligne) n'est ni au-dessus ni en dessous : on le saute.
  const voisin = (el, sens) => {
    const ref = el.getBoundingClientRect();
    let cur = el;
    while (cur && cur !== document.body) {
      let s = sens < 0 ? cur.previousElementSibling : cur.nextElementSibling;
      while (s) {
        if (visible(s)) {
          const rs = s.getBoundingClientRect();
          if (sens < 0 ? rs.bottom <= ref.top + 1 : rs.top >= ref.bottom - 1) return { el: s, depuis: cur };
        }
        s = sens < 0 ? s.previousElementSibling : s.nextElementSibling;
      }
      cur = cur.parentElement;
    }
    return null;
  };
  // Un « petit texte » d'en-tête : surtitre au-dessus, sous-titre en dessous.
  const petitTexte = (x) => {
    if (!x) return false;
    const sx = getComputedStyle(x);
    return parseFloat(sx.fontSize) <= 18 && !/spartan/i.test(sx.fontFamily) && x.getBoundingClientRect().height <= 80;
  };
  // Conteneur « carte » : fond ou filet, rayon ≥ 12, padding ≥ 12.
  const dansUneCarte = (el) => {
    for (let x = el.parentElement; x && x !== document.body && x.tagName !== 'MAIN'; x = x.parentElement) {
      const sx = getComputedStyle(x);
      const surface = (sx.backgroundColor !== 'rgba(0, 0, 0, 0)' && sx.backgroundColor !== 'transparent') || sx.backgroundImage !== 'none' || parseFloat(sx.borderTopWidth) > 0;
      if (surface && parseFloat(sx.borderTopLeftRadius) >= 12 && Math.max(parseFloat(sx.paddingTop), parseFloat(sx.paddingLeft)) >= 12) return true;
    }
    return false;
  };
  const titres = [];
  let blocs = 0;
  for (const el of document.querySelectorAll('h1,h2,h3,h4,p,span,div')) {
    if (el.closest('svg,[aria-hidden="true"],nav,header[role="banner"],aside')) continue;
    const tag = el.tagName.toLowerCase();
    const s = getComputedStyle(el);
    const px = parseFloat(s.fontSize);
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const estTitre = /^h[1-4]$/.test(tag) || (/spartan/i.test(s.fontFamily) && px >= 18 && direct);
    if (!estTitre || !visible(el)) continue;
    // Le rapport 3:1 vaut pour les titres de SECTION, posés sur la page. Un titre
    // DANS une carte suit l'anatomie de la carte (surtitre 4, texte 8) : ses
    // écarts serrés sont voulus (doctrine, « Anatomie d'une carte »). Le critère
    // est la place, pas la taille : un titre de section rendu à 20 px (h3) reste
    // un titre de section, et c'est justement ce qu'on veut voir.
    if (dansUneCarte(el)) { blocs++; continue; }
    // On mesure le GROUPE d'en-tête, pas le titre seul : surtitre + titre +
    // sous-titre, quand ils sont frères directs (même parent) et de petits textes.
    let haut = el, bas = el;
    const avant0 = voisin(el, -1), apres0 = voisin(el, 1);
    if (avant0 && avant0.depuis === el && petitTexte(avant0.el) && el.getBoundingClientRect().top - avant0.el.getBoundingClientRect().bottom <= 12) haut = avant0.el;
    if (apres0 && apres0.depuis === el && petitTexte(apres0.el) && apres0.el.getBoundingClientRect().top - el.getBoundingClientRect().bottom <= 16) bas = apres0.el;
    const avant = voisin(haut, -1), apres = voisin(bas, 1);
    const rh = haut.getBoundingClientRect(), rb = bas.getBoundingClientRect();
    const dessus = avant ? Math.round(rh.top - avant.el.getBoundingClientRect().bottom) : null;
    const dessous = apres ? Math.round(apres.el.getBoundingClientRect().top - rb.bottom) : null;
    titres.push({ tag, px: Math.round(px), texte: el.textContent.trim().slice(0, 36), classe: String(el.className).slice(0, 70), dessus, dessous, groupe: haut !== el || bas !== el });
  }
  const gaps = {};
  for (const el of document.querySelectorAll('main *')) {
    const s = getComputedStyle(el);
    if (!(s.display.includes('flex') || s.display.includes('grid'))) continue;
    const g = s.flexDirection === 'row' && s.display.includes('flex') ? null : parseFloat(s.rowGap);
    if (g && el.children.length > 1) gaps[Math.round(g)] = (gaps[Math.round(g)] ?? 0) + 1;
  }
  return { titres, gaps, blocs };
};

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: process.argv.includes('--site'), params: process.argv.includes('--params') });
const res = await parcourir(routes, sonde, {});

const gaps = {};
const plats = [];
let nb = 0, blocs = 0;
for (const [route, r] of Object.entries(res)) {
  if (r.erreur) continue;
  blocs += r.blocs ?? 0;
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
if (process.argv.includes('--tout')) {
  for (const [route, r] of Object.entries(res)) {
    if (r.erreur) continue;
    console.log(`\n${route} — titres de section mesurés :`);
    for (const x of r.titres) console.log(`  ${x.tag} ${x.px}px  dessus ${x.dessus ?? '—'} / dessous ${x.dessous ?? '—'}${x.groupe ? ' (groupe)' : ''}  « ${x.texte} »`);
  }
}
console.log(`\nTitres de section dont l'espace au-dessus n'est pas ≥ 1,5 × l'espace en dessous : ${plats.length} sur ${nb} (${blocs} titres de carte ignorés : anatomie de carte)`);
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
