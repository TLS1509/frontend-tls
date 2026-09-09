#!/usr/bin/env node
/**
 * Contrôle de parité des tokens : `@theme` ↔ vitrine.
 *
 * Compare les variables déclarées dans le bloc `@theme` de `src/index.css` aux
 * `cssVar` que `src/pages/Components.tsx` expose, et signale les deux dérives :
 *   - un token du thème que la vitrine ne montre pas
 *   - une entrée de vitrine qui ne correspond à aucun token du thème
 *
 * Pourquoi ce garde-fou existe. La vitrine relisait déjà ses valeurs en direct
 * depuis le DOM, et on en avait conclu qu'aucune dérive n'était plus possible.
 * C'était faux : elle relisait la mauvaise variable. `design-tokens.css` porte
 * une échelle typographique jumelle en `--t-*`, la vitrine l'interrogeait, et
 * l'app rendait `--text-*`. Deux noms différents pour un même concept ne se
 * télescopent pas dans la cascade — ils coexistent, chacun avec sa valeur.
 * Résultat mesuré au 2026-09-09 : la vitrine annonçait h3 à 22 px pendant que
 * l'app rendait 24 px, et h4 à 18 px pour 20 px rendus.
 *
 * Lire en direct ne protège de rien si l'on lit à côté. Ce script vérifie donc
 * l'endroit où l'on lit, pas seulement la fraîcheur de la lecture.
 *
 * Usage : node scripts/check-token-coverage.mjs [--strict]
 *         --strict → sort en code 1 s'il reste un écart dans un sens ou l'autre.
 */
import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url).pathname;
const THEME = `${ROOT}src/index.css`;
const SHOWCASE = `${ROOT}src/pages/Components.tsx`;

/** Tokens du thème qu'on ne montre volontairement pas, et pourquoi. */
const NOT_SHOWN = {
  '--color-accent': 'alias de --color-accent-400, pas un cran de rampe',
  '--animate-alert-slide': 'animation nommée, se juge sur le composant Alert',
  '--animate-skeleton-shimmer': 'animation nommée, se juge sur Skeleton',
  '--z-base': 'doublon lisible de --z-index-base (même valeur, montré une fois)',
  '--z-sticky': 'doublon lisible de --z-index-sticky',
  '--z-dropdown': 'doublon lisible de --z-index-dropdown',
  '--z-overlay': 'doublon lisible de --z-index-overlay',
  '--z-modal': 'doublon lisible de --z-index-modal',
  '--z-toast': 'doublon lisible de --z-index-toast',
  '--z-tooltip': 'doublon lisible de --z-index-tooltip',
};

/** Le bloc @theme, du `{` à l'accolade fermante en colonne 0. */
function themeTokens() {
  const css = readFileSync(THEME, 'utf8');
  const from = css.indexOf('@theme');
  if (from < 0) throw new Error('bloc @theme introuvable dans src/index.css');
  const end = css.indexOf('\n}', from);
  const block = css.slice(from, end);
  const found = new Map();
  for (const line of block.split('\n')) {
    // Les sous-propriétés (--text-h3--line-height) appartiennent au pas parent :
    // Tailwind les applique avec lui, elles n'ont pas d'existence propre.
    const m = line.match(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/i);
    if (!m) continue;
    if (/--(line-height|font-weight|letter-spacing)$/.test(m[1])) continue;
    found.set(m[1], m[2].trim());
  }
  return found;
}

/** Les cssVar déclarés par la vitrine — littéraux comme gabarits. */
function showcaseVars() {
  const src = readFileSync(SHOWCASE, 'utf8');
  const vars = new Set();
  for (const m of src.matchAll(/cssVar:\s*'(--[a-z0-9-]+)'/gi)) vars.add(m[1]);
  // L'échelle de couleur est bâtie par `scale()` : `--color-${prefix}-${step}`.
  // Le `]` du tableau est celui qui précède la parenthèse fermante : non-greedy
  // jusqu'au premier `]` s'arrêterait sur la fin du premier couple.
  for (const m of src.matchAll(/\.\.\.scale\(\s*'[^']*',\s*'([a-z]+)',\s*\[([\s\S]*?)\]\s*\)/g)) {
    const prefix = m[1];
    for (const s of m[2].matchAll(/\['([a-z0-9]+)'/gi)) vars.add(`--color-${prefix}-${s[1]}`);
  }
  return vars;
}

const theme = themeTokens();
const shown = showcaseVars();

const missing = [...theme.keys()].filter((v) => !shown.has(v) && !(v in NOT_SHOWN));
const orphan = [...shown].filter((v) => !theme.has(v));

console.log(`@theme : ${theme.size} tokens · vitrine : ${shown.size} entrées`);

if (missing.length) {
  console.log(`\n❌ ${missing.length} token(s) du thème absent(s) de la vitrine :`);
  for (const v of missing) console.log(`   ${v.padEnd(28)} = ${theme.get(v)}`);
  console.log('   → les ajouter à Components.tsx, ou les déclarer dans NOT_SHOWN ici.');
}

if (orphan.length) {
  console.log(`\n❌ ${orphan.length} entrée(s) de vitrine sans token correspondant :`);
  for (const v of orphan) console.log(`   ${v}`);
  console.log("   → c'est la dérive silencieuse : la vitrine lit une variable que le thème");
  console.log('     ne définit pas. Vérifier si un jumeau périmé traîne dans design-tokens.css.');
}

if (!missing.length && !orphan.length) console.log('\n✅ Parité complète.');

if (process.argv.includes('--strict') && (missing.length || orphan.length)) process.exit(1);
