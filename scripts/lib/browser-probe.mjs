/**
 * Socle commun des sondes navigateur (contraste, coins imbriqués).
 *
 * Pourquoi un navigateur : les deux défauts que ces sondes cherchent n'existent
 * qu'au rendu. Le contraste dépend du fond COMPOSÉ (parents translucides,
 * dégradés) et des couleurs calculées — que Tailwind 4 émet en `oklab()`, qu'on
 * ne peut lire qu'à travers un canvas (piège n°6 ter). Un coin pincé dépend de
 * la position réelle d'un élément dans son parent. Aucun des deux ne se lit
 * dans le code source.
 *
 * Prérequis : le serveur de dev tourne (`npm run dev`) — BASE_URL, par défaut
 * http://localhost:5173. Chromium est celui du cache Playwright (playwright-core
 * en devDependency, aucun téléchargement).
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const ROOT = new URL('../..', import.meta.url).pathname;

export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173';

/** Routes du manifeste, sans labo (`/_…`). Par défaut sans paramètre ;
 *  `params: true` ajoute les routes à paramètre, chaque `:x` remplacé par `1`
 *  (les données de démo commencent à 1) — c'est là que vivent les écrans les
 *  plus importants : détail de parcours, leçon, fiche apprenant. */
export function routesStatiques({ site = true, params = false } = {}) {
  const src = readFileSync(`${ROOT}src/data/routesManifest.ts`, 'utf8');
  const toutes = [...src.matchAll(/"path": "([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => !p.includes('*') && !p.startsWith('/_'))
    .filter((p) => site || !p.startsWith('/website'));
  const fixes = toutes.filter((p) => !p.includes(':'));
  if (!params) return fixes;
  const avecParam = toutes.filter((p) => p.includes(':')).map((p) => p.replace(/:[^/]+/g, '1'));
  return [...new Set([...fixes, ...avecParam])];
}

export const arg = (nom) => {
  const i = process.argv.indexOf(nom);
  return i >= 0 ? process.argv[i + 1] : undefined;
};

/**
 * Ouvre chaque route et y évalue `sonde` (fonction sérialisée, exécutée dans la
 * page). Les animations d'entrée sont terminées avant : un `translateY` figé
 * a déjà produit de faux résultats (coin « retrait 9 » au Passeport, 23/09).
 * `apres(page, resultat)` reçoit la page encore ouverte pour une vérification
 * côté Node (le contraste y relit les pixels réellement peints).
 */
export async function parcourir(routes, sonde, { largeur = 1440, hauteur = 900, apres } = {}) {
  let navigateur;
  try {
    navigateur = await chromium.launch();
  } catch (e) {
    console.error('Chromium introuvable. Lancer une fois : npx playwright-core install chromium');
    throw e;
  }
  const page = await navigateur.newPage({ viewport: { width: largeur, height: hauteur } });
  const resultats = {};
  for (const route of routes) {
    try {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle', timeout: 20000 });
    } catch {
      resultats[route] = { erreur: 'chargement' };
      continue;
    }
    await page.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch { /* animation sans fin */ } }));
    await page.waitForTimeout(150);
    resultats[route] = await page.evaluate(sonde);
    // Vérification côté Node, avec la page encore ouverte (captures, etc.).
    if (apres) resultats[route] = await apres(page, resultats[route]);
  }
  await navigateur.close();
  return resultats;
}
