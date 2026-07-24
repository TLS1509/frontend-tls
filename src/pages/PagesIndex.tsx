/**
 * PagesIndex — carte de l'application, pour piloter et se repérer.
 *
 * Refonte du 2026-07-23. Ce que l'ancienne version faisait mal :
 *  - elle listait 40 routes recopiées à la main pour 181 réelles (22 % de l'app) ;
 *  - trois StatCard affichaient 40 / 40 / 0, tout étant marqué « completed » —
 *    des chiffres qui ne disaient rien et occupaient le premier écran ;
 *  - 40 cards en grille pour une tâche qui est de la navigation, pas de la lecture ;
 *  - des emojis là où CLAUDE.md impose Lucide.
 *
 * Ici : aucune donnée recopiée. Tout vient de `src/data/routesManifest.ts`,
 * généré depuis App.tsx (`node scripts/gen-routes-manifest.mjs`). L'arborescence
 * est calculée à partir des segments d'URL, pas déclarée.
 *
 * Trois lectures d'un même jeu de données :
 *  · Schéma       — répartition par public, pour voir où est la surface
 *  · Arborescence — la hiérarchie d'URL, pour explorer
 *  · Liste        — dense et filtrable, pour trouver
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Network, ListTree, Rows3, Search, ArrowUpRight, ChevronRight, X, Unlink,
} from 'lucide-react';
import { ROUTES, type RouteAudience, type RouteEntry } from '../data/routesManifest';

/* ─────────────────────────────── Publics ────────────────────────────────── */

const AUDIENCES: { key: RouteAudience; label: string; hint: string; dot: string; chip: string }[] = [
  { key: 'apprenant',  label: 'Apprenant',  hint: 'le protagoniste',        dot: 'bg-primary-600',   chip: 'bg-primary-50 text-primary-800 border-primary-200' },
  { key: 'coach',      label: 'Coach',      hint: 'accompagne la pratique', dot: 'bg-secondary-600', chip: 'bg-secondary-50 text-secondary-800 border-secondary-200' },
  { key: 'manager',    label: 'Manager',    hint: 'pilote une cohorte',     dot: 'bg-accent-700',    chip: 'bg-accent-50 text-accent-800 border-accent-200' },
  { key: 'entreprise', label: 'Entreprise', hint: 'vue stratégique',        dot: 'bg-primary-800',   chip: 'bg-primary-50 text-primary-900 border-primary-200' },
  { key: 'marketing',  label: 'Site public',hint: 'hors application',       dot: 'bg-ink-500',       chip: 'bg-ink-50 text-ink-800 border-ink-200' },
  { key: 'systeme',    label: 'Système',    hint: 'outils internes',        dot: 'bg-ink-400',       chip: 'bg-ink-50 text-ink-700 border-ink-200' },
];

const AUD = Object.fromEntries(AUDIENCES.map((a) => [a.key, a])) as Record<RouteAudience, (typeof AUDIENCES)[number]>;

/* ─────────────────────────── Arborescence dérivée ───────────────────────── */

interface TreeNode {
  segment: string;
  full: string;
  route?: RouteEntry;
  children: Map<string, TreeNode>;
}

/** Construit l'arbre depuis les segments d'URL. Rien n'est déclaré à la main. */
function buildTree(routes: RouteEntry[]): TreeNode {
  const root: TreeNode = { segment: '', full: '', children: new Map() };
  for (const r of routes) {
    const segs = r.path.split('/').filter(Boolean);
    let node = root;
    let acc = '';
    for (const s of segs) {
      acc += `/${s}`;
      if (!node.children.has(s)) node.children.set(s, { segment: s, full: acc, children: new Map() });
      node = node.children.get(s)!;
    }
    node.route = r;
  }
  return root;
}

const countLeaves = (n: TreeNode): number =>
  (n.route ? 1 : 0) + [...n.children.values()].reduce((s, c) => s + countLeaves(c), 0);

/* ──────────────────────────────── Vue arbre ─────────────────────────────── */

const TreeBranch: React.FC<{ node: TreeNode; depth: number; onGo: (p: string) => void }> = ({ node, depth, onGo }) => {
  const [open, setOpen] = useState(depth < 1);
  const kids = [...node.children.values()].sort((a, b) => a.segment.localeCompare(b.segment));
  const total = countLeaves(node);
  const aud = node.route ? AUD[node.route.audience] : null;

  return (
    <li className="min-w-0">
      <div className="flex items-center gap-stack-xs min-h-touch">
        {kids.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center justify-center w-6 h-6 shrink-0 rounded-sm text-ink-500 hover:bg-ink-100 hover:text-ink-800 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <ChevronRight size={14} strokeWidth={2.4} className={open ? 'rotate-90 transition-transform duration-fast' : 'transition-transform duration-fast'} />
            <span className="sr-only">{open ? 'Replier' : 'Déplier'} {node.segment}</span>
          </button>
        ) : (
          <span className="w-6 shrink-0" aria-hidden />
        )}

        {aud && <span className={`w-1.5 h-1.5 rounded-pill shrink-0 ${aud.dot}`} aria-hidden />}

        {node.route ? (
          <button
            type="button"
            onClick={() => onGo(node.route!.path)}
            className="group inline-flex items-baseline gap-stack-xs min-w-0 text-left rounded-sm px-1 -mx-1 hover:bg-primary-50 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <span className="font-mono text-caption text-ink-900 group-hover:text-primary-800 truncate">/{node.segment}</span>
            {node.route.component && (
              <span className="text-micro text-ink-400 truncate hidden sm:inline">{node.route.component}</span>
            )}
            {node.route.inbound === 0 && (
              <Unlink size={10} strokeWidth={2.4} className="shrink-0 text-danger-fg" aria-label="aucun lien entrant" />
            )}
            <ArrowUpRight size={11} className="shrink-0 text-ink-300 group-hover:text-primary-700" aria-hidden />
          </button>
        ) : (
          <span className="font-mono text-caption font-semibold text-ink-700 truncate">/{node.segment}</span>
        )}

        {kids.length > 0 && (
          <span className="text-micro text-ink-400 tabular-nums shrink-0">{total}</span>
        )}
      </div>

      {open && kids.length > 0 && (
        <ul className="list-none m-0 pl-4 border-l border-ink-100 ml-3">
          {kids.map((k) => (
            <TreeBranch key={k.full} node={k} depth={depth + 1} onGo={onGo} />
          ))}
        </ul>
      )}
    </li>
  );
};

/* ─────────────────────────────── La page ────────────────────────────────── */

type View = 'schema' | 'tree' | 'list';

const VIEWS: { key: View; label: string; icon: React.ReactNode; hint: string }[] = [
  { key: 'schema', label: 'Schéma',       icon: <Network size={15} strokeWidth={2} />,  hint: 'où est la surface' },
  { key: 'tree',   label: 'Arborescence', icon: <ListTree size={15} strokeWidth={2} />, hint: 'explorer la hiérarchie' },
  { key: 'list',   label: 'Liste',        icon: <Rows3 size={15} strokeWidth={2} />,    hint: 'trouver une route' },
];

export const PagesIndex: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('schema');
  const [query, setQuery] = useState('');
  const [audFilter, setAudFilter] = useState<RouteAudience | null>(null);
  const [orphansOnly, setOrphansOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROUTES.filter((r) => {
      if (audFilter && r.audience !== audFilter) return false;
      if (orphansOnly && r.inbound > 0) return false;
      if (!q) return true;
      return r.path.toLowerCase().includes(q) || (r.component ?? '').toLowerCase().includes(q);
    });
  }, [query, audFilter, orphansOnly]);

  const orphanTotal = useMemo(() => ROUTES.filter((r) => r.inbound === 0).length, []);

  const tree = useMemo(() => buildTree(filtered), [filtered]);

  /** Sections d'un public, avec leur poids — c'est la lecture « pilotage ». */
  const byAudience = useMemo(() => {
    const map = new Map<RouteAudience, Map<string, number>>();
    for (const r of filtered) {
      if (!map.has(r.audience)) map.set(r.audience, new Map());
      const s = map.get(r.audience)!;
      s.set(r.section, (s.get(r.section) ?? 0) + 1);
    }
    return map;
  }, [filtered]);

  const go = (p: string) => navigate(p);

  return (
    <div className="min-h-[100dvh] bg-ink-25">
      {/* ── En-tête + contrôles ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-sticky border-b border-ink-200 bg-white/92 backdrop-blur-glass-medium">
        <div className="mx-auto max-w-page px-4 sm:px-6 py-3 flex flex-col gap-stack-xs">
          <div className="flex flex-wrap items-baseline gap-stack-xs">
            <h1 className="text-h4 font-bold tracking-snug text-ink-900 m-0">Carte de l'application</h1>
            <p className="text-caption text-ink-500 m-0">
              <span className="tabular-nums font-semibold text-ink-700">{ROUTES.length}</span> routes, lues depuis{' '}
              <code className="text-micro">App.tsx</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-stack-xs">
            {/* Bascule de vue */}
            <div role="tablist" aria-label="Mode d'affichage" className="inline-flex items-center gap-1 rounded-pill bg-ink-100 p-1">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  role="tab"
                  aria-selected={view === v.key}
                  title={v.hint}
                  onClick={() => setView(v.key)}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-pill px-3 h-9 text-caption font-semibold transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    view === v.key ? 'bg-white text-primary-800 shadow-xs' : 'text-ink-600 hover:text-ink-900',
                  ].join(' ')}
                >
                  {v.icon}
                  {v.label}
                </button>
              ))}
            </div>

            {/* Recherche */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrer par chemin ou composant…"
                aria-label="Filtrer les routes"
                className="w-full h-11 pl-9 pr-3 rounded-pill border border-ink-200 bg-white text-body-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 transition-colors duration-fast"
              />
            </div>
          </div>

          {/* Filtres par public */}
          <div className="flex flex-wrap items-center gap-1.5">
            {AUDIENCES.map((a) => {
              const n = ROUTES.filter((r) => r.audience === a.key).length;
              const active = audFilter === a.key;
              return (
                <button
                  key={a.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setAudFilter(active ? null : a.key)}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-pill border px-2.5 h-8 text-micro font-semibold transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    active ? a.chip : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900',
                  ].join(' ')}
                >
                  <span className={`w-1.5 h-1.5 rounded-pill ${a.dot}`} aria-hidden />
                  {a.label}
                  <span className="tabular-nums text-ink-400">{n}</span>
                </button>
              );
            })}
            <span className="w-px h-5 bg-ink-200 mx-0.5" aria-hidden />

            <button
              type="button"
              aria-pressed={orphansOnly}
              onClick={() => setOrphansOnly((o) => !o)}
              title="Routes vers lesquelles aucun lien ne pointe dans le code"
              className={[
                'inline-flex items-center gap-1.5 rounded-pill border px-2.5 h-8 text-micro font-semibold transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                orphansOnly
                  ? 'border-danger-base bg-danger-bg text-danger-fg'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900',
              ].join(' ')}
            >
              <Unlink size={11} strokeWidth={2.4} />
              Sans lien entrant
              <span className="tabular-nums text-ink-400">{orphanTotal}</span>
            </button>

            {(audFilter || query || orphansOnly) && (
              <button
                type="button"
                onClick={() => { setAudFilter(null); setQuery(''); setOrphansOnly(false); }}
                className="inline-flex items-center gap-1 rounded-pill px-2.5 h-8 text-micro font-semibold text-ink-600 hover:bg-ink-100 hover:text-ink-900 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <X size={12} strokeWidth={2.5} /> Tout afficher
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-page px-4 sm:px-6 py-section">
        {filtered.length === 0 ? (
          <p className="text-body-sm text-ink-600">Aucune route ne correspond à « {query} ».</p>
        ) : view === 'schema' ? (
          /* ── SCHÉMA : la surface par public ─────────────────────────── */
          <div className="flex flex-col gap-section">
            <p className="text-body-sm text-ink-600 m-0 max-w-prose">
              Chaque bloc est un public ; chaque puce une section d'URL. La barre mesure la part de routes{' '}
              <strong className="font-bold text-ink-900">réellement atteignables</strong> — celles vers lesquelles un
              lien pointe quelque part dans le code. Le reste n'existe qu'en tapant l'URL.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
              {AUDIENCES.map((a) => {
                const sections = byAudience.get(a.key);
                if (!sections) return null;
                const rows = filtered.filter((r) => r.audience === a.key);
                const total = rows.length;
                const orphans = rows.filter((r) => r.inbound === 0).length;
                const linked = total - orphans;
                const pct = total ? Math.round((linked / total) * 100) : 0;
                const ordered = [...sections.entries()].sort((x, y) => y[1] - x[1]);
                return (
                  <section key={a.key} className="rounded-xl border border-ink-200 bg-white p-4 flex flex-col gap-stack-xs">
                    <div className="flex items-baseline gap-stack-xs">
                      <span className={`w-2 h-2 rounded-pill shrink-0 ${a.dot}`} aria-hidden />
                      <h2 className="text-body-sm font-bold text-ink-900 m-0">{a.label}</h2>
                      <span className="text-micro text-ink-500">{a.hint}</span>
                      <span className="ml-auto text-caption font-bold text-ink-700 tabular-nums">{total}</span>
                    </div>

                    {/* Part atteignable — une barre, pas une stat card */}
                    <div className="flex items-center gap-stack-xs">
                      <div
                        className="flex-1 h-1.5 rounded-pill bg-danger-bg overflow-hidden"
                        role="img"
                        aria-label={`${linked} routes sur ${total} ont un lien entrant`}
                      >
                        <div className={`h-full rounded-pill ${a.dot}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-micro tabular-nums shrink-0">
                        <span className="font-bold text-ink-800">{linked}</span>
                        <span className="text-ink-400"> liées</span>
                        {orphans > 0 && <span className="text-danger-fg font-bold"> · {orphans} sans lien</span>}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {ordered.map(([sec, n]) => {
                        const secOrphans = rows.filter((r) => r.section === sec && r.inbound === 0).length;
                        const allOrphan = secOrphans === n;
                        return (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => { setQuery(`/${sec}`); setView('list'); }}
                            title={secOrphans ? `${secOrphans} route(s) sans lien entrant` : 'toutes liées'}
                            className={[
                              'inline-flex items-center gap-1.5 rounded-pill border px-2.5 h-8 font-mono text-micro transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                              allOrphan
                                ? 'border-danger-base/40 bg-danger-bg text-danger-fg'
                                : 'border-ink-200 bg-ink-25 text-ink-800 hover:border-primary-300 hover:bg-primary-50',
                            ].join(' ')}
                          >
                            {allOrphan && <Unlink size={10} strokeWidth={2.4} aria-hidden />}
                            /{sec}
                            <span className="tabular-nums font-body font-bold text-ink-500">{n}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        ) : view === 'tree' ? (
          /* ── ARBORESCENCE ──────────────────────────────────────────── */
          <div className="rounded-xl border border-ink-200 bg-white p-4">
            <ul className="list-none m-0 p-0">
              {[...tree.children.values()]
                .sort((a, b) => a.segment.localeCompare(b.segment))
                .map((n) => <TreeBranch key={n.full} node={n} depth={0} onGo={go} />)}
            </ul>
          </div>
        ) : (
          /* ── LISTE ─────────────────────────────────────────────────── */
          <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
            <table className="w-full border-collapse text-caption">
              <thead>
                <tr className="border-b border-ink-200">
                  <th scope="col" className="text-left px-4 py-2.5 font-bold text-ink-900">Route</th>
                  <th scope="col" className="text-left px-4 py-2.5 font-bold text-ink-900 hidden sm:table-cell">Composant</th>
                  <th scope="col" className="text-left px-4 py-2.5 font-bold text-ink-900 hidden md:table-cell">Public</th>
                  <th scope="col" className="text-left px-4 py-2.5 font-bold text-ink-900 whitespace-nowrap">Liens entrants</th>
                  <th scope="col" className="px-4 py-2.5"><span className="sr-only">Ouvrir</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.path} className="border-b border-ink-100 last:border-b-0 hover:bg-primary-50/50 transition-colors duration-fast">
                    <th scope="row" className="text-left px-4 py-2 font-mono font-normal text-ink-900 whitespace-nowrap">{r.path}</th>
                    <td className="px-4 py-2 text-ink-600 hidden sm:table-cell">{r.component ?? '—'}</td>
                    <td className="px-4 py-2 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-ink-600">
                        <span className={`w-1.5 h-1.5 rounded-pill ${AUD[r.audience].dot}`} aria-hidden />
                        {AUD[r.audience].label}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {r.inbound === 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-pill bg-danger-bg px-2 py-0.5 text-micro font-bold text-danger-fg">
                          <Unlink size={10} strokeWidth={2.4} /> aucun
                        </span>
                      ) : (
                        <span className="inline-flex items-baseline gap-1.5">
                          <span className="text-caption font-bold text-ink-800 tabular-nums">{r.inbound}</span>
                          <span className="text-micro text-ink-400 truncate max-w-[14rem] hidden lg:inline">
                            {r.linkedFrom.join(', ')}
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => go(r.path)}
                        className="inline-flex items-center gap-1 rounded-pill px-2.5 h-8 text-micro font-semibold text-primary-800 hover:bg-primary-100 transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        Ouvrir <ArrowUpRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-micro text-ink-500 mt-section m-0">
          Données générées depuis <code>src/App.tsx</code> — régénérer avec{' '}
          <code>node scripts/gen-routes-manifest.mjs</code> après tout ajout ou retrait de route.
          Les routes à paramètre (<code>:id</code>) s'ouvrent telles quelles et peuvent afficher un état vide.
        </p>
      </main>
    </div>
  );
};
