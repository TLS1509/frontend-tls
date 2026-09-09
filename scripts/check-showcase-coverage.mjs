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
const block = (name) => registrySrc.match(new RegExp(`${name}[^=]*= \\{([\\s\\S]*?)\\n\\};`))?.[1] ?? '';
const keysOf = (body) => new Set([...body.matchAll(/^\s*'?([A-Za-z]\w*)'?\s*:/gm)].map((m) => m[1]));

const classified = keysOf(block('CATALOG'));
/* Un composant peut être présenté DANS une autre entrée (EditorialCard montre
   ArticleCard, MagazineCard, VideoCard). Sans ces deux tables, on le compterait
   absent alors qu'il est à l'écran. */
const coveredBy = keysOf(block('COVERED_BY'));
const notShowcased = keysOf(block('NOT_SHOWCASED'));

const missing = [...exported.keys()]
  .filter((n) => !classified.has(n) && !coveredBy.has(n) && !notShowcased.has(n))
  .sort();
/* Une clé du CATALOG peut être une étiquette de regroupement plutôt qu'un
   export : soit elle nomme un fichier (JacCard.tsx expose JacCardNextJalon et
   JacCardPending), soit elle sert de cible dans COVERED_BY (EditorialCard).
   Un vrai fantôme n'est ni l'un ni l'autre. */
const fileNames = new Set(
  walk(COMPONENTS_DIR).map((f) => f.split('/').pop().replace('.tsx', '')),
);
const groupingTargets = new Set(
  [...block('COVERED_BY').matchAll(/:\s*'([^']+)'/g)].map((m) => m[1]),
);
/* Les fiches de convention ne sont pas des composants : elles décrivent une règle
   transverse (rythme des titres, padding, centrage…) qu'aucun fichier ne porte
   à lui seul. Chercher un export du même nom n'a donc pas de sens. On lit la
   liste que le registre déclare, plutôt que de la deviner au nom : « Padding »
   et « Centrage » ressemblent trait pour trait à des identifiants. */
const conventions = new Set(
  [...registrySrc.matchAll(/export const CONVENTIONS = new Set\(\[([\s\S]*?)\]\)/g)]
    .flatMap((m) => [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1])),
);

const ghosts = [...classified]
  .filter((n) => !exported.has(n) && !fileNames.has(n) && !groupingTargets.has(n) && !conventions.has(n))
  .sort();

console.log(`Exportés (hors périmètre exclu) : ${exported.size}`);
console.log(`Classés dans le registre        : ${classified.size}`);
console.log(`Présentés via une autre entrée  : ${coveredBy.size}`);
console.log(`Hors vitrine (décidé)           : ${notShowcased.size}`);
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
