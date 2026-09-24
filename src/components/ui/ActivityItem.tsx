import React from 'react';

/**
 * ActivityItem — atomic single activity row.
 *
 * Visually aligned with `patterns/ActivityFeed` (gradient circular icon + optional timeline rail).
 * Use this atom for simple inline activity lists (Dashboard, sidebars).
 * For full-featured chronological feeds with grouping/empty/load-more, use `ActivityFeed`.
 */

export type ActivityItemType = 'lesson' | 'achievement' | 'coach' | 'journal' | 'default';

interface ActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  type?: ActivityItemType;
  /** Show vertical timeline rail connecting to next item (hidden on last). Default: true. */
  showRail?: boolean;
  className?: string;
}

const TYPE_GRADIENT: Record<ActivityItemType, string> = {
  default:     'bg-gradient-to-br from-ink-300 to-ink-500 text-white',
  // Pastille d'icône : 3:1 à l'arrêt le plus clair — 600 pour le teal et l'orange,
  // 700 pour l'or (le blanc y mesure 3,66 · 3,98 · 4,88).
  lesson:      'bg-gradient-to-br from-primary-600 to-primary-700 text-white',
  achievement: 'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900',
  coach:       'bg-gradient-to-br from-secondary-600 to-secondary-700 text-white',
  journal:     'bg-gradient-to-br from-success-base to-success-fg text-white',
};

const TYPE_SHADOW: Record<ActivityItemType, string> = {
  default:     'shadow-sm',
  lesson:      'shadow-brand-sm',
  achievement: 'shadow-sun-sm',
  coach:       'shadow-warm-sm',
  journal:     'shadow-sm',
};

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  type = 'default',
  showRail = true,
  className = '',
}) => {
  return (
    <article
      className={[
        'group/item relative flex items-start gap-stack-xs p-3 rounded-xl transition-colors duration-200 hover:bg-ink-50/60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative flex flex-col items-center shrink-0">
        <span
          className={[
            'inline-flex items-center justify-center w-9 h-9 rounded-pill ring-4 ring-white transition-transform duration-200 group-hover/item:scale-105 shrink-0',
            TYPE_GRADIENT[type],
            TYPE_SHADOW[type],
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </span>
        {showRail && (
          <span
            aria-hidden="true"
            className="absolute top-9 bottom-[-1.25rem] w-px bg-gradient-to-b from-ink-200 via-ink-200 to-ink-200/0 group-last/item:hidden last:hidden"
          />
        )}
      </div>

      {/* Anatomie de rangée (passe typographique du 2026-09-24) :
          titre 16/600 ink-900 · texte 16/400 ink-700, deux lignes au plus ·
          méta 13/400 ink-600, sur la ligne de base du titre.
          Le `pt-stack-3xs` recentre la première ligne (26 px) sur la pastille
          (36 px) : 4 + 13 = 17, contre 18 — à 1 px près.
          Le titre n'est plus un `h4` : un libellé de rangée n'est pas un titre
          de section, et un h4 en Nunito 600 contredisait l'échelle des titres. */}
      <div className="flex-1 min-w-0 pt-stack-3xs pb-stack-3xs">
        <header className="flex items-baseline justify-between gap-stack-xs flex-wrap">
          <p className="m-0 text-body font-semibold text-ink-900">{title}</p>
          {timestamp && (
            <time className="text-caption text-ink-600 whitespace-nowrap shrink-0 tabular-nums">
              {timestamp}
            </time>
          )}
        </header>
        {description && (
          <p className="m-0 mt-stack-3xs text-body text-ink-700 line-clamp-2">{description}</p>
        )}
      </div>
    </article>
  );
};

export default ActivityItem;
