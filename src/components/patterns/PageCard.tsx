/**
 * PageCard Pattern
 *
 * Composite pattern for displaying page/screen tiles in a directory or index.
 * Used for app navigation, feature showcase, or project galleries.
 */

import React from 'react';
import { GRID_CONTAINER, GRID_COLS_CONTENT } from '../../lib/grid-columns';
import { CARD_HOVER } from '../../lib/tone-classes';
import { ArrowRight, FileText, Loader2 } from 'lucide-react';
import type { CardTone } from '../core/Card';
import { IconChip } from '../ui/IconChip';
import { MetaPill } from '../ui/MetaPill';
import { Badge } from '../ui/Badge';
import type { BadgeVariant } from '../ui/Badge';

export type PageCardStatus = 'active' | 'coming-soon' | 'beta' | 'archived';
export type PageCardBadgeVariant = 'primary' | 'warm' | 'sun' | 'success' | 'danger';

export interface PageCardItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  thumbnail?: string;
  badge?: {
    label: string;
    variant?: PageCardBadgeVariant;
  };
  tag?: string;
  status?: PageCardStatus;
  tone?: CardTone;
  href?: string;
  onClick?: () => void;
}

export interface PageCardGridProps {
  pages: PageCardItem[];
  columns?: 1 | 2 | 3 | 4;
  isLoading?: boolean;
  emptyMessage?: string;
  showThumbnails?: boolean;
  className?: string;
}

const STATUS_DOT: Record<PageCardStatus, string> = {
  active:        'bg-success-base',
  'coming-soon': 'bg-accent-400',
  beta:          'bg-primary-500',
  archived:      'bg-ink-300',
};

const STATUS_LABEL: Record<PageCardStatus, string> = {
  active:        'Active',
  'coming-soon': 'Coming Soon',
  beta:          'Beta',
  archived:      'Archived',
};

const STATUS_TEXT: Record<PageCardStatus, string> = {
  active:        'text-success-fg',
  'coming-soon': 'text-accent-700',
  beta:          'text-primary-700',
  archived:      'text-ink-600',
};

/* Le badge fait main (11 px capitales, `tracking-wider`) devient le `Badge` du
   système : même registre, un seul endroit où il se règle. */
const BADGE_VARIANT: Record<PageCardBadgeVariant, BadgeVariant> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
  success: 'success',
  danger:  'danger',
};

/* Colonnage : src/lib/grid-columns.ts — source unique, en largeur de conteneur. */
const COLUMNS_CLASSES = GRID_COLS_CONTENT;

/* Survol : filet fermé d'un cran + fond très léger — CARD_HOVER[tone]
 * (lib/tone-classes.ts, règle du 2026-09-16). Pas de soulèvement, pas d'ombre. */

const TONE_ICON_BUBBLE: Record<NonNullable<PageCardItem['tone']>, string> = {
  primary: 'bg-primary-50 text-primary-600',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-600',
  brand:   'bg-primary-50 text-primary-600',
};

const TONE_ARROW: Record<NonNullable<PageCardItem['tone']>, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-600',
  sun:     'text-accent-600',
  brand:   'text-primary-600',
};

export const PageCard: React.FC<{ item: PageCardItem; showThumbnail?: boolean }> = ({
  item,
  showThumbnail = true,
}) => {
  const tone: NonNullable<PageCardItem['tone']> = item.tone || 'primary';

  /* Dans un <button> (carte cliquable sans lien), des <span> seulement : le
     bouton n'admet que du contenu phrasé — il portait des <div>, un <h3> et un
     <p> (2026-09-24). Chaque bloc garde ses classes : les enveloppes sont en
     flex, ou éléments d'une colonne flex, donc des blocs. Le lien et la carte
     simple gardent leurs éléments. */
  const enBouton = !item.href && Boolean(item.onClick);
  const Bloc = enBouton ? 'span' : 'div';
  const Titre = enBouton ? 'span' : 'h3';
  const Texte = enBouton ? 'span' : 'p';

  const card = (
    <Bloc
      className={[
        'group relative flex flex-col overflow-hidden bg-white border border-ink-200 rounded-lg transition-all duration-base',
        CARD_HOVER[tone],
      ].join(' ')}
    >
      {/* Thumbnail */}
      {showThumbnail && item.thumbnail && (
        <Bloc className="relative w-full aspect-[16/10] overflow-hidden bg-ink-50">
          <img
            src={item.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Bloc>
      )}

      {/* Status + Badge row */}
      {(item.status || item.badge) && (
        <Bloc className="flex items-center gap-stack-xs px-stack-md pt-stack flex-wrap">
          {item.status && (
            <span
              className={[
                'inline-flex items-center gap-stack-3xs text-caption font-semibold',
                STATUS_TEXT[item.status],
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                /* Point FIXE : pas de mouvement permanent pour dire un état
                   (arbitrage n°16) — le mot porte l'information. */
                className={[
                  'inline-block w-2 h-2 rounded-pill',
                  STATUS_DOT[item.status],
                ].join(' ')}
              />
              {STATUS_LABEL[item.status]}
            </span>
          )}
          {item.badge && (
            <Badge variant={BADGE_VARIANT[item.badge.variant || 'primary']} size="compact">
              {item.badge.label}
            </Badge>
          )}
        </Bloc>
      )}

      {/* Icon (when no thumbnail) */}
      {!item.thumbnail && item.icon && (
        <Bloc className="px-stack-md pt-stack-md">
          <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${TONE_ICON_BUBBLE[tone]}`}>
            {item.icon}
          </span>
        </Bloc>
      )}

      {/* Content — titre h3 · 8 · description 16 ink-700 · 12 · méta */}
      <Bloc className="flex-1 flex flex-col gap-stack-xs px-stack-md py-stack">
        <Titre className="font-display text-h3 text-ink-900">
          {item.title}
        </Titre>
        {item.description && (
          <Texte className="font-body text-body text-ink-700 max-w-prose">
            {item.description}
          </Texte>
        )}
        {item.tag && (
          <MetaPill text={item.tag} className="self-start mt-stack-3xs" />
        )}
      </Bloc>

      {/* Hover arrow */}
      <Bloc className={`flex items-center justify-end px-stack-md pb-stack opacity-0 -translate-x-2 transition-all duration-base group-hover:opacity-100 group-hover:translate-x-0 ${TONE_ARROW[tone]}`}>
        <ArrowRight size={18} strokeWidth={2.25} />
      </Bloc>
    </Bloc>
  );

  if (item.href) {
    return (
      <a href={item.href} className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg">
        {card}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className="block w-full text-left p-0 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg"
      >
        {card}
      </button>
    );
  }

  return card;
};

export const PageCardGrid: React.FC<PageCardGridProps> = ({
  pages,
  columns = 3,
  isLoading = false,
  emptyMessage = 'Aucune page disponible',
  showThumbnails = true,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-stack-xs text-ink-600">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" strokeWidth={2.5} />
          <p className="text-body">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center px-6 py-12 rounded-xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col items-center gap-stack-xs text-ink-600 text-center">
          <IconChip size="lg" tone="neutral">
            <FileText strokeWidth={2} />
          </IconChip>
          <p className="text-body text-ink-700">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={GRID_CONTAINER}>
      <div
        role="grid"
        className={['grid gap-stack', COLUMNS_CLASSES[columns], className].filter(Boolean).join(' ')}
      >
        {pages.map((page) => (
          <div key={page.id} role="gridcell">
            <PageCard item={page} showThumbnail={showThumbnails} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageCardGrid;
