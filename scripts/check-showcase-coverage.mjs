#!/usr/bin/env node
/**
 * Contrôle de couverture du showcase.
 *
 * Compare les composants exportés par `src/components/**` au registre
 * `src/pages/components/registry.ts`, et signale les deux dérives :
 *   - un composant réel que le showcase n'expose pas
 *   - une entrée de registre qui ne correspond à aucun export
 *
 * Sans ce garde-fou, l'écart se recreuse en silence : au 2026-07-28 il était
 * de 320 exportés pour 170 classés. Voir docs/_audits/CHANTIER-SHOWCASE-2026-07-28.md
 *
 * Usage : node scripts/check-showcase-coverage.mjs [--strict]
 *         --strict → sort en code 1 s'il reste des composants non classés.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const COMPONENTS_DIR = join(ROOT, 'src/components');
const REGISTRY = join(ROOT, 'src/pages/components/registry.ts');

/** Hors périmètre du design system de la Learning App — décidé le 2026-07-28. */
const OUT_OF_SCOPE = [
  /^marketing\//, // site public : motion + sections, pas le DS produit
];

/** Sous-composants exposés avec leur parent : pas d'entrée propre attendue. */
const CHILD_OF_PARENT = new Set([
  'CardTitle', 'CardDesc', 'CardFooter', 'CardEyebrow',
  'DropdownItem', 'DropdownLabel', 'DropdownSeparator',
  'SidebarGroup', 'StaggerItem', 'SettingsToggleRow',
  'JacCardNextJalon', 'JacCardPending',
  'FeaturedSpotlight', 'FeaturedSpotlightCarousel', 'VeilleCardListItem',
  'ReadingProgressBar', 'ReadingProgressRing', 'PageCardGrid',
  'MarketingFooter', 'OrchestrationContext', 'OrchestrationProvider',
]);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith('.tsx') && !name.endsWith('.figma.tsx')) acc.push(full);
  }
  return acc;
}

const exported = new Map();
for (const file of walk(COMPONENTS_DIR)) {
  const rel = relative(COMPONENTS_DIR, file);
  if (OUT_OF_SCOPE.some((re) => re.test(rel))) continue;
  const src = readFileSync(file, 'utf8');
  const names = [
    ...src.matchAll(/export\s+const\s+([A-Z]\w+)\s*[:=]/g),
    ...src.matchAll(/export\s+function\s+([A-Z]\w+)/g),
  ].map((m) => m[1]);
  for (const n of names) {
    // Constantes de style exportées (CHIP_BASE, AUTH_INPUT_CLASSES…) : pas des composants
    if (/^[A-Z0-9_]+$/.test(n)) continue;
    if (CHILD_OF_PARENT.has(n)) continue;
    if (!exported.has(n)) exported.set(n, rel);
  }
}

const registrySrc = readFileSync(REGISTRY, 'utf8');
const catalogBody = registrySrc.match(/CATALOG: Record<string, CatalogMeta> = \{([\s\S]*?)\n\};/)[1];
const classified = new Set(
  [...catalogBody.matchAll(/^\s*'?([A-Za-z]\w*)'?\s*:\s*\{/gm)].map((m) => m[1]),
);

const missing = [...exported.keys()].filter((n) => !classified.has(n)).sort();
const ghosts = [...classified].filter((n) => !exported.has(n)).sort();

console.log(`Exportés (hors périmètre exclu) : ${exported.size}`);
console.log(`Classés dans le registre        : ${classified.size}`);
console.log('');

if (missing.length) {
  console.log(`❌ ${missing.length} composant(s) sans entrée de registre :`);
  for (const n of missing) console.log(`   ${n.padEnd(30)} ${exported.get(n)}`);
} else {
  console.log('✅ Tout composant exporté est classé.');
}

if (ghosts.length) {
  console.log('');
  console.log(`👻 ${ghosts.length} entrée(s) de registre sans export correspondant :`);
  for (const n of ghosts) console.log(`   ${n}`);
}

if (process.argv.includes('--strict') && (missing.length || ghosts.length)) {
  process.exit(1);
}
