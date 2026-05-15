/**
 * AppBreadcrumb — auto-generated breadcrumb from `useLocation`.
 *
 * Règle d'affichage (Phase 10) :
 *  - 1 segment (page top-level comme /search, /coaching) → null (la page a son
 *    propre header, pas besoin de "Home > Page" redondant).
 *  - 2+ segments (page détail avec parent comme /learning-paths/:id) → render
 *    le chain complet "Home > Parent > Enfant" pour offrir un retour rapide.
 *
 * Font-size : text-caption (13px) pour lisibilité — chevré au-dessus du
 * text-micro (11px) qui était trop petit.
 *
 * Intégré dans `AppLayout` au-dessus du `<main>` (sauf si la page a son
 * propre fil d'Ariane comme les éditoriaux Veille).
 */

import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

type Crumb = { label: string; href?: string };

/** Map pathname → crumb chain. Most-specific first. */
const ROUTE_MAP: Array<{
  test: RegExp;
  build: (m: RegExpMatchArray) => Crumb[];
}> = [
  // Auth — pas de breadcrumb (Auth shell own its layout)

  // Dashboard
  { test: /^\/(dashboard)?$/, build: () => [{ label: 'Tableau de bord' }] },

  // Learning paths
  { test: /^\/learning-paths\/?$/, build: () => [{ label: 'Parcours' }] },
  {
    test: /^\/learning-paths\/([^/]+)$/,
    build: () => [
      { label: 'Parcours', href: '/learning-paths' },
      { label: 'Détail du parcours' },
    ],
  },
  {
    test: /^\/learning-paths\/([^/]+)\/lessons\/([^/]+)$/,
    build: () => [
      { label: 'Parcours', href: '/learning-paths' },
      { label: 'Leçon' },
    ],
  },

  // Veille
  { test: /^\/veille\/?$/, build: () => [{ label: 'Veille' }] },
  {
    test: /^\/veille\/magazine\/?$/,
    build: () => [{ label: 'Veille', href: '/veille' }, { label: 'Magazine' }],
  },
  {
    test: /^\/veille\/weekly-newsletter\/?$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Newsletter hebdo' },
    ],
  },
  {
    test: /^\/veille\/newsletter\/?$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Newsletter' },
    ],
  },
  {
    test: /^\/veille\/video-reels\/?$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Vidéos courtes' },
    ],
  },
  {
    test: /^\/veille\/article\/([^/]+)$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Article' },
    ],
  },
  {
    test: /^\/veille\/dossier\/([^/]+)$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Dossier' },
    ],
  },
  {
    test: /^\/veille\/magazine-article\/([^/]+)$/,
    build: () => [
      { label: 'Veille', href: '/veille/magazine' },
      { label: 'Article magazine' },
    ],
  },
  {
    test: /^\/veille\/weekly-news\/([^/]+)$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Actualité' },
    ],
  },
  {
    test: /^\/veille\/video-tutorial\/([^/]+)$/,
    build: () => [
      { label: 'Veille', href: '/veille' },
      { label: 'Tutoriel vidéo' },
    ],
  },
  // Project
  {
    test: /^\/project\/([^/]+)$/,
    build: () => [{ label: 'Projet' }],
  },
  // Course (lesson explorer)
  {
    test: /^\/course\/([^/]+)$/,
    build: () => [{ label: 'Cours' }],
  },

  // Journal
  { test: /^\/journal\/?$/, build: () => [{ label: 'Journal' }] },
  {
    test: /^\/journal\/(detail|new-entry|free-entry)/,
    build: (m) => [
      { label: 'Journal', href: '/journal' },
      {
        label:
          m[1] === 'detail'
            ? 'Entrée'
            : m[1] === 'new-entry'
              ? 'Nouvelle entrée'
              : 'Entrée libre',
      },
    ],
  },

  // Coaching
  { test: /^\/coaching\/?$/, build: () => [{ label: 'Coaching' }] },
  {
    test: /^\/coaching\/booking/,
    build: () => [
      { label: 'Coaching', href: '/coaching' },
      { label: 'Réservation' },
    ],
  },
  {
    test: /^\/coaching\/pre-questionnaire/,
    build: () => [
      { label: 'Coaching', href: '/coaching' },
      { label: 'Questionnaire' },
    ],
  },
  {
    test: /^\/coaching\/compte-rendu/,
    build: () => [
      { label: 'Coaching', href: '/coaching' },
      { label: 'Compte-rendu' },
    ],
  },

  // Account family
  { test: /^\/profile\/?$/, build: () => [{ label: 'Profil' }] },
  { test: /^\/account\/?$/, build: () => [{ label: 'Mon compte' }] },
  {
    test: /^\/account\/billing\/?$/,
    build: () => [
      { label: 'Mon compte', href: '/account' },
      { label: 'Facturation' },
    ],
  },
  { test: /^\/settings\/?$/, build: () => [{ label: 'Paramètres' }] },

  // Recherche
  { test: /^\/search\/?$/, build: () => [{ label: 'Recherche' }] },

  // Positionnement (test diagnostique avant parcours)
  {
    test: /^\/learning-paths\/([^/]+)\/positionnement\/?$/,
    build: () => [
      { label: 'Parcours', href: '/learning-paths' },
      { label: 'Positionnement' },
    ],
  },

  // Communauté
  { test: /^\/notifications\/?$/, build: () => [{ label: 'Notifications' }] },
  { test: /^\/messages\/?$/, build: () => [{ label: 'Messages' }] },
  { test: /^\/leaderboard\/?$/, build: () => [{ label: 'Leaderboard' }] },
  { test: /^\/collaboration\/?$/, build: () => [{ label: 'Collaboration' }] },

  // Entreprise / Help / Onboarding
  { test: /^\/enterprise\/?$/, build: () => [{ label: 'Espace Entreprise' }] },
  { test: /^\/help\/?$/, build: () => [{ label: 'Centre d\'aide' }] },
  { test: /^\/onboarding\/?$/, build: () => [{ label: 'Onboarding' }] },
  {
    test: /^\/onboarding\/payment\/?$/,
    build: () => [
      { label: 'Onboarding', href: '/onboarding' },
      { label: 'Choix de la formule' },
    ],
  },
  { test: /^\/learning-space\/?$/, build: () => [{ label: 'Espace Apprentissage' }] },

  // Project
  { test: /^\/project\/?/, build: () => [{ label: 'Projet' }] },
];

const resolveCrumbs = (pathname: string): Crumb[] | null => {
  for (const route of ROUTE_MAP) {
    const match = pathname.match(route.test);
    if (match) return route.build(match);
  }
  return null;
};

export interface AppBreadcrumbProps {
  /** Hide on certain routes (e.g. viewers, modals fullscreen). */
  hide?: boolean;
  /** Container className override. */
  className?: string;
}

export const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({
  hide = false,
  className = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = resolveCrumbs(location.pathname);

  if (hide || !crumbs || crumbs.length === 0) return null;

  // Règle : 1 segment = page top-level → on cache (la page a son propre header).
  // 2+ segments = page détail avec parent → on affiche le chain.
  if (crumbs.length < 2) return null;

  const parentCrumb = crumbs[crumbs.length - 2];
  const parentHref = parentCrumb?.href;

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={[
        // Sticky sub-header : reste accessible quand on scroll dans une page longue.
        'sticky top-0 z-sticky',
        'flex items-center gap-2 font-body text-caption text-ink-700',
        // Light bg + backdrop-blur léger pour séparer du contenu sans casser le ton.
        'bg-white/85 backdrop-blur-glass-light border-b border-ink-100',
        // Hauteur min consistante (44px = touch target Apple) avec padding vertical.
        'min-h-[44px] py-2',
        className,
      ].join(' ')}
    >
      {/* Back button (mobile-first) — touche 40x40 = WCAG touch target, pill light bg pour visibilité */}
      {parentHref && (
        <button
          type="button"
          onClick={() => navigate(parentHref)}
          aria-label={`Retour à ${parentCrumb.label}`}
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-pill bg-ink-50 border border-ink-200 text-ink-800 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 active:scale-95 transition-all duration-base shrink-0"
        >
          <ArrowLeft size={18} strokeWidth={2.25} />
        </button>
      )}

      {/* Home icon — caché sur mobile (back button suffit), pill button sur desktop */}
      <Link
        to="/"
        className="max-sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-pill text-ink-500 hover:bg-ink-100 hover:text-primary-700 transition-colors duration-base shrink-0"
        aria-label="Accueil"
      >
        <Home size={14} aria-hidden />
      </Link>

      {/* Crumb chain — always visible */}
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        const isFirst = i === 0;
        return (
          <React.Fragment key={i}>
            {/* Sur mobile : on n'affiche pas le chevron avant le 1er crumb (pas de home) */}
            {(!isFirst || true) && (
              <ChevronRight
                size={12}
                className={[
                  'text-ink-300 shrink-0',
                  isFirst ? 'max-sm:hidden' : '',
                ].join(' ')}
                aria-hidden
              />
            )}
            {crumb.href && !isLast ? (
              <Link
                to={crumb.href}
                className="inline-flex items-center px-2 py-1 -my-1 -mx-1 rounded-md text-ink-600 hover:bg-ink-100 hover:text-primary-700 transition-colors duration-base truncate font-medium"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className={isLast ? 'text-ink-900 font-semibold truncate' : 'text-ink-600 truncate'}
                aria-current={isLast ? 'page' : undefined}
              >
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AppBreadcrumb;
