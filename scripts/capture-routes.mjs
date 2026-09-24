#!/usr/bin/env node
/**
 * capture-routes — une capture pleine page de chaque route, pour la critique.
 *
 *   node scripts/capture-routes.mjs --out /chemin/dossier            # app, 1440 + 375
 *   node scripts/capture-routes.mjs --out … --route /passeport       # une route
 *   node scripts/capture-routes.mjs --out … --site                   # avec /website/*
 *   node scripts/capture-routes.mjs --out … --params                 # + routes à paramètre (:id → 1)
 *
 * Né le 2026-09-23 : le panneau navigateur de Claude Code est souvent masqué et
 * n'y prend alors aucune capture — les passes du jour ont dû juger au DOM, sans
 * voir. Une critique d'interface qui ne regarde pas l'interface n'en est pas une.
 * Fichiers : <out>/<route-aplatie>@<largeur>.png. BASE_URL comme les sondes.
 */
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { routesStatiques, BASE_URL, arg } from './lib/browser-probe.mjs';

const out = arg('--out');
if (!out) { console.error('--out <dossier> requis'); process.exit(2); }
mkdirSync(out, { recursive: true });

const unique = arg('--route');
const routes = unique ? [unique] : routesStatiques({ site: process.argv.includes('--site'), params: process.argv.includes('--params') });
// --seulement-params : ne capturer que les routes à paramètre (complète une passe déjà faite)
const liste = process.argv.includes('--seulement-params') ? routes.filter((r) => !routesStatiques({ site: true }).includes(r)) : routes;
const largeurs = (arg('--largeurs') ?? '1440,375').split(',').map(Number);

const navigateur = await chromium.launch();
for (const largeur of largeurs) {
  const page = await navigateur.newPage({
    viewport: { width: largeur, height: largeur < 768 ? 812 : 900 },
    deviceScaleFactor: 1,
  });
  for (const route of liste) {
    const nom = (route === '/' ? 'racine' : route.slice(1).replace(/\//g, '__')) + `@${largeur}.png`;
    try {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle', timeout: 20000 });
      await page.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch { /* sans fin */ } }));
      await page.waitForTimeout(200);
      await page.screenshot({ path: `${out}/${nom}`, fullPage: true });
      process.stdout.write('.');
    } catch {
      process.stdout.write('x');
    }
  }
  await page.close();
}
await navigateur.close();
console.log(`\n${liste.length} routes × ${largeurs.length} largeurs → ${out}`);
