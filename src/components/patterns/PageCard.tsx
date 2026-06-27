/**
 * PageCard Pattern
 *
 * Composite pattern for displaying page/screen tiles in a directory or index.
 * Used for app navigation, feature showcase, or project galleries.
 */

import React from 'react';
import { ArrowRight, FileText, Loader2 } from 'lucide-react';
import type { CardTone } from '../core/Card';

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
  archived:      'text-ink-500',
};

const BADGE_CLASSES: Record<PageCardBadgeVariant, string> = {
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:     'bg-accent-50 text-accent-800 border-accent-200',
  success: 'bg-success-bg text-success-fg border-success-base/30',
  danger:  'bg-danger-bg text-danger-fg border-danger-base/30',
};

const COLUMNS_CLASSES: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const TONE_RING: Record<NonNullable<PageCardItem['tone']>, string> = {
  primary:   'hover:border-primary-300',
  warm:      'hover:border-secondary-300',
  sun:       'hover:border-accent-300',
  brand:     'hover:border-primary-300',
};

const TONE_HOVER_SHADOW: Record<NonNullable<PageCardItem['tone']>, string> = {
  primary: 'hover:shadow-brand-sm',
  warm:    'hover:shadow-warm-sm',
  sun:     'hover:shadow-sun-sm',
  brand:   'hover:shadow-brand-sm',
};

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

  const card = (
    <div
      className={[
        'group relative flex flex-col overflow-hidden bg-white border border-ink-200 rounded-2xl shadow-card transition-all duration-base',
        'hover:-translate-y-1',
        TONE_HOVER_SHADOW[tone],
        TONE_RING[tone],
      ].join(' ')}
    >
      {/* Thumbnail */}
      {showThumbnail && item.thumbnail && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-ink-50">
          <img
            src={item.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Status + Badge row */}
      {(item.status || item.badge) && (
        <div className="flex items-center gap-stack-xs px-5 pt-stack flex-wrap">
          {item.status && (
            <span
              className={[
                'inline-flex items-center gap-1 text-caption font-semibold',
                STATUS_TEXT[item.status],
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className={[
                  'inline-block w-2 h-2 rounded-full',
                  STATUS_DOT[item.status],
                  item.status === 'active' ? 'animate-pulse' : '',
                ].join(' ')}
              />
              {STATUS_LABEL[item.status]}
            </span>
          )}
          {item.badge && (
            <span
              className={[
                'inline-flex items-center px-2 py-0.5 rounded-pill border text-micro font-bold uppercase tracking-wider',
                BADGE_CLASSES[item.badge.variant || 'primary'],
              ].join(' ')}
            >
              {item.badge.label}
            </span>
          )}
        </div>
      )}

      {/* Icon (when no thumbnail) */}
      {!item.thumbnail && item.icon && (
        <div className="px-5 pt-5">
          <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${TONE_ICON_BUBBLE[tone]}`}>
            {item.icon}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-stack-xs px-5 py-stack">
        <h3 className="font-display text-h4 font-semibold text-ink-900 m-0 leading-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="font-body text-body-sm text-ink-500 m-0 leading-relaxed">
            {item.description}
          </p>
        )}
        {item.tag && (
          <span className="inline-flex self-start mt-1 px-2 py-0.5 rounded-pill bg-ink-50 text-ink-600 text-micro font-medium">
            {item.tag}
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className={`flex items-center justify-end px-5 pb-stack opacity-0 -translate-x-2 transition-all duration-base group-hover:opacity-100 group-hover:translate-x-0 ${TONE_ARROW[tone]}`}>
        <ArrowRight size={18} strokeWidth={2.25} />
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-2xl">
        {card}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className="block w-full text-left p-0 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-2xl"
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
        <div className="flex flex-col items-center gap-stack-xs text-ink-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" strokeWidth={2.5} />
          <p className="m-0 text-body-sm font-medium">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!pages || pages.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center px-6 py-12 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col items-center gap-stack-xs text-ink-500 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-ink-200 text-ink-400">
            <FileText size={26} strokeWidth={2} />
          </span>
          <p className="m-0 text-body-sm font-medium text-ink-700">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default PageCardGrid;
