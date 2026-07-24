#!/usr/bin/env node
/**
 * Génère `src/data/routesManifest.ts` à partir des <Route> de `src/App.tsx`.
 *
 * Pourquoi un générateur plutôt qu'une liste à la main : l'ancien Pages Index
 * portait 40 entrées recopiées pour 181 routes réelles. Une liste tenue à la
 * main dérive le jour où elle est écrite. Ici App.tsx reste la seule source.
 *
 *   node scripts/gen-routes-manifest.mjs
 *
 * À relancer après tout ajout ou retrait de route.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(`${ROOT}/src/App.tsx`, 'utf8');
const block = src.slice(src.indexOf('<Routes>'), src.lastIndexOf('</Routes>'));

// path="..." + le premier composant <Xxx du même élément <Route .../>
const routes = [];
for (const m of block.matchAll(/<Route\b([\s\S]*?)\/>|<Route\b([^>]*)>/g)) {
  const chunk = m[1] ?? m[2] ?? '';
  const p = chunk.match(/path=["']([^"']+)["']/);
  if (!p) continue;
  const comp = [...chunk.matchAll(/<([A-Z]\w+)/g)].map((x) => x[1]).find((n) => n !== 'Route');
  routes.push({ path: p[1], component: comp ?? null });
}

// Les chemins relatifs sont des enfants de /website (seul parent imbriqué).
const seen = new Set();
const clean = [];
for (const r of routes) {
  if (r.path === '*') continue;
  const path = r.path.startsWith('/') ? r.path : `/website/${r.path}`;
  if (seen.has(path)) continue;
  seen.add(path);
  clean.push({ ...r, path });
}
clean.sort((a, b) => a.path.localeCompare(b.path));

/** Premier segment -> public visé. Sert la lecture « pilotage ». */
const AUDIENCE = {
  coach: 'coach',
  manager: 'manager',
  enterprise: 'entreprise',
  analytics: 'entreprise',
  website: 'marketing',
  components: 'systeme',
  'pages-index': 'systeme',
  'motion-sprints': 'systeme',
  'onboarding-preview': 'systeme',
  'api-docs': 'systeme',
  monitoring: 'systeme',
  error: 'systeme',
  '_bg-lab': 'systeme',
  '_card-lab': 'systeme',
  '_design-lab': 'systeme',
};

/* ─────────────────────── Atteignabilité (liens entrants) ────────────────── */

/**
 * Une route est atteignable si un lien la vise exactement, ou vise plus
 * profond qu'elle (routes à paramètre : /lesson/:id ← navigate(`/lesson/${id}`)).
 * Un lien vers le PARENT ne rend PAS l'enfant atteignable.
 *
 * Exclusions délibérées des sources de liens :
 *  - le bloc <Routes> d'App.tsx : ce sont les déclarations, pas des liens ;
 *  - PagesIndex : il pointe vers tout par construction, donc l'inclure
 *    rendrait chaque route « atteignable » et tuerait le signal ;
 *  - le manifeste lui-même.
 *
 * Limite connue : une navigation construite dynamiquement (`navigate(row.path)`
 * où `path` vient de données) échappe à une analyse statique. Le compte de
 * routes sans lien est donc un MAXIMUM, pas une certitude.
 */
const EXCLUDED_SOURCES = ['src/pages/PagesIndex.tsx', 'src/data/routesManifest.ts'];

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(full, acc);
    else if (/\.tsx?$/.test(e.name)) acc.push(full);
  }
  return acc;
}

const files = walk(`${ROOT}/src`);
const linkSources = new Map(); // rel -> targets[]
for (const f of files) {
  const rel = f.slice(ROOT.length + 1);
  if (EXCLUDED_SOURCES.includes(rel)) continue;
  let text = readFileSync(f, 'utf8');
  if (rel === 'src/App.tsx') {
    const a = text.indexOf('<Routes>');
    const b = text.lastIndexOf('</Routes>');
    text = text.slice(0, a) + text.slice(b); // garde la nav (sidebar, menu), retire les déclarations
  }
  const targets = new Set();
  for (const m of text.matchAll(/(?:to|href)=\{?["'`]([^"'`{]+)["'`]/g)) targets.add(m[1]);
  for (const m of text.matchAll(/navigate\(\s*["'`]([^"'`]+)["'`]/g)) targets.add(m[1]);
  for (const m of text.matchAll(/(?:to|href)=\{`([^`$]*)\$\{/g)) targets.add(m[1]);
  for (const m of text.matchAll(/navigate\(\s*`([^`$]*)\$\{/g)) targets.add(m[1]);
  for (const m of text.matchAll(/goTo\(\s*['"`]([^'"`]+)['"`]/g)) targets.add(m[1]);
  // `href:` compte : la nav marketing est un tableau de données `{ label, href }`,
  // pas du JSX. L'oublier faisait ressortir 8 pages publiques comme orphelines.
  for (const m of text.matchAll(/(?:path|route|url|href):\s*['"`](\/[^'"`]*)['"`]/g)) targets.add(m[1]);
  if (targets.size) linkSources.set(rel, [...targets].map((t) => t.replace(/\/$/, '')).filter(Boolean));
}

const staticPart = (p) => p.split('/:')[0].replace(/\/\*$/, '').replace(/\/$/, '') || '/';

function inboundFor(routePath) {
  const s = staticPart(routePath);
  const from = [];
  for (const [rel, targets] of linkSources) {
    if (targets.some((t) => t === routePath || t === s || t.startsWith(s + '/'))) from.push(rel);
  }
  return from;
}

const rows = clean.map((r) => {
  const seg = r.path.split('/').filter(Boolean)[0] ?? '';
  const from = inboundFor(r.path);
  return {
    path: r.path,
    component: r.component,
    section: seg || 'racine',
    audience: AUDIENCE[seg] ?? 'apprenant',
    inbound: from.length,
    linkedFrom: from.slice(0, 3).map((f) => f.replace('src/', '')),
  };
});

const out = `/**
 * routesManifest — GÉNÉRÉ, NE PAS ÉDITER À LA MAIN.
 *
 * Source : les <Route> de src/App.tsx.
 * Régénérer :  node scripts/gen-routes-manifest.mjs
 *
 * ${rows.length} routes au moment de la génération.
 */

export type RouteAudience = 'apprenant' | 'coach' | 'manager' | 'entreprise' | 'marketing' | 'systeme';

export interface RouteEntry {
  /** Chemin absolu, imbrication résolue. */
  path: string;
  /** Composant rendu par la route, tel que lu dans App.tsx. */
  component: string | null;
  /** Premier segment d'URL — sert de regroupement. */
  section: string;
  audience: RouteAudience;
  /** Liens entrants trouvés statiquement. 0 = route non atteignable par l'UI. */
  inbound: number;
  /** Échantillon des fichiers qui pointent dessus. */
  linkedFrom: string[];
}

export const ROUTES: RouteEntry[] = ${JSON.stringify(rows, null, 2)};
`;

mkdirSync(`${ROOT}/src/data`, { recursive: true });
writeFileSync(`${ROOT}/src/data/routesManifest.ts`, out);
console.log(`✓ src/data/routesManifest.ts — ${rows.length} routes`);
const byAud = {};
for (const r of rows) byAud[r.audience] = (byAud[r.audience] ?? 0) + 1;
for (const [a, n] of Object.entries(byAud).sort((x, y) => y[1] - x[1])) console.log(`   ${String(n).padStart(3)}  ${a}`);
const orphans = rows.filter((r) => r.inbound === 0);
console.log(`\n   ${orphans.length} routes sans lien entrant (sur ${rows.length})`);
