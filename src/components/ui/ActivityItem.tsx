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
  lesson:      'bg-gradient-to-br from-primary-400 to-primary-600 text-white',
  achievement: 'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900',
  coach:       'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white',
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
            'inline-flex items-center justify-center w-9 h-9 rounded-full ring-4 ring-white transition-transform duration-200 group-hover/item:scale-105 shrink-0',
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

      <div className="flex-1 min-w-0 pt-1 pb-1">
        <header className="flex items-start justify-between gap-stack-xs flex-wrap">
          <h4 className="m-0 text-body-sm font-semibold text-ink-900 leading-snug">{title}</h4>
          {timestamp && (
            <time className="text-micro text-ink-400 font-medium whitespace-nowrap shrink-0 mt-0.5 tabular-nums">
              {timestamp}
            </time>
          )}
        </header>
        {description && (
          <p className="m-0 mt-1 text-caption text-ink-600 leading-relaxed">{description}</p>
        )}
      </div>
    </article>
  );
};

export default ActivityItem;
