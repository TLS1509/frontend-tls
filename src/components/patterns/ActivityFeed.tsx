import React from 'react';
import {
  Rocket,
  CheckCircle2,
  TrendingUp,
  Trophy,
  MessageCircle,
  MessageSquare,
  Pencil,
  Share2,
  Newspaper,
  Video,
  Compass,
  BookOpen,
  GraduationCap,
  Inbox,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { IconChip } from '../ui/IconChip';
import { Card } from '../core/Card';

/**
 * ActivityFeed — chronological list of user activities.
 *
 * Redesign:
 *   - Lucide icons replace emoji (cleaner, on-brand colors)
 *   - Avatar component for actor cards
 *   - Smaller, gradient timeline rail
 *   - Optional date grouping (groupByDate)
 *   - 3 layouts: timeline (default) | list | cards
 *
 * `list` — rangées dans UNE carte, séparées par un filet (arbitrage n°5 du
 * 23/09 : une collection se lit en rangées, pas en pile de cartes). C'est le
 * layout d'un fil qu'on parcourt. `cards` (une carte par activité) reste
 * pour compatibilité ; ne pas l'utiliser pour un nouveau fil.
 */

export type ActivityType =
  // ── User actions / progress ─────────────────────────────────────
  | 'start'
  | 'complete'
  | 'progress'
  | 'achievement'
  | 'feedback'
  | 'message'
  | 'comment'
  | 'share'
  // ── Content discovery (used by Dashboard "À découvrir" feed) ────
  | 'veille-article'
  | 'veille-video'
  | 'parcours'
  | 'lesson'
  | 'coaching';

export type ActivityTone = 'primary' | 'warm' | 'sun' | 'success' | 'danger';
export type ActivityLayout = 'timeline' | 'list' | 'cards';

export interface ActivityFeedItem {
  id: string;
  type: ActivityType;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp: Date;
  actor?: {
    name: string;
    avatar?: string;
  };
  /** Override the default icon for the activity type. */
  icon?: React.ReactNode;
  tone?: ActivityTone;
  actionLabel?: string;
  onActionClick?: () => void;
}

/** @deprecated Use `ActivityFeedItem` (data shape) — `ActivityItem` is now the React component in ui/ActivityItem. */
export type ActivityItem = ActivityFeedItem;

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  /**
   * Layout: 'timeline' (default, vertical rail), 'list' (rows in one card —
   * the one to use for a feed) or 'cards' (one card per item, kept for
   * compatibility).
   */
  layout?: ActivityLayout;
  /** Group items by relative date (Today / Yesterday / This week / Earlier). */
  groupByDate?: boolean;
  itemsPerPage?: number;
  timeFormat?: 'relative' | 'absolute';
  isLoading?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
  /** @deprecated Use `layout="timeline"` (default) or `layout="cards"`. */
  useTimeline?: boolean;
}

// ─── Mappings ───────────────────────────────────────────────────────────────

const ICON_FOR_TYPE: Record<ActivityType, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  start:           Rocket,
  complete:        CheckCircle2,
  progress:        TrendingUp,
  achievement:     Trophy,
  feedback:        MessageCircle,
  message:         MessageSquare,
  comment:         Pencil,
  share:           Share2,
  // Discovery types
  'veille-article': Newspaper,
  'veille-video':   Video,
  parcours:         Compass,
  lesson:           BookOpen,
  coaching:         GraduationCap,
};

const DEFAULT_TONE_FOR_TYPE: Record<ActivityType, ActivityTone> = {
  start:           'primary',
  complete:        'success',
  progress:        'primary',
  achievement:     'sun',
  feedback:        'warm',
  message:         'primary',
  comment:         'primary',
  share:           'warm',
  // Discovery defaults — match the dashboard color system
  'veille-article': 'primary',
  'veille-video':   'warm',
  parcours:         'warm',
  lesson:           'primary',
  coaching:         'sun',
};

/* Soft tinted icon discs — éditorial/calme (pas de gradient glossy app-y).
   L'icône colorée sur un disque tinté lit mieux sur fond clair et fait moins "dashboard". */
const TONE_DOT: Record<ActivityTone, string> = {
  primary: 'bg-primary-50 text-primary-600 ring-1 ring-primary-100',
  warm:    'bg-secondary-50 text-secondary-600 ring-1 ring-secondary-100',
  sun:     'bg-accent-50 text-accent-700 ring-1 ring-accent-200',
  success: 'bg-success-bg text-success-fg ring-1 ring-success-base/30',
  danger:  'bg-danger-bg text-danger-fg ring-1 ring-danger-base/30',
};

const TONE_HOVER_BG: Record<ActivityTone, string> = {
  primary: 'group-hover/item:bg-primary-50/60',
  warm:    'group-hover/item:bg-secondary-50/60',
  sun:     'group-hover/item:bg-accent-50/60',
  success: 'group-hover/item:bg-success-bg/60',
  danger:  'group-hover/item:bg-danger-bg/60',
};

const TONE_ACTION: Record<ActivityTone, string> = {
  primary: 'bg-primary-50 text-primary-800 border-primary-200 hover:bg-primary-100',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100',
  sun:     'bg-accent-50 text-accent-800 border-accent-200 hover:bg-accent-100',
  success: 'bg-success-bg text-success-fg border-success-base/30 hover:bg-success-base/20',
  danger:  'bg-danger-bg text-danger-fg border-danger-base/30 hover:bg-danger-base/20',
};

// ─── Time helpers ───────────────────────────────────────────────────────────

const formatTimestamp = (date: Date, format: 'relative' | 'absolute'): string => {
  if (format === 'absolute') return date.toLocaleString();
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'à l’instant';
  if (diffMins < 60) return `il y a ${diffMins} min`;
  if (diffHours < 24) return `il y a ${diffHours} h`;
  if (diffDays < 7) return `il y a ${diffDays} j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const groupKey = (date: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const itemDay = new Date(date);
  itemDay.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - itemDay.getTime()) / 86400000);
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return 'Cette semaine';
  if (diffDays < 30) return 'Ce mois-ci';
  return 'Plus ancien';
};

// ─── Subcomponents ──────────────────────────────────────────────────────────

const ActivityIcon: React.FC<{ item: ActivityItem; tone: ActivityTone; layout: ActivityLayout }> = ({ item, tone, layout }) => {
  const IconComponent = ICON_FOR_TYPE[item.type];
  const shape = layout === 'timeline' ? 'rounded-pill w-9 h-9' : 'rounded-xl w-10 h-10';
  return (
    <span
      className={[
        'inline-flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-105',
        shape,
        TONE_DOT[tone],
      ].join(' ')}
      aria-hidden="true"
    >
      {item.icon ?? <IconComponent size={layout === 'timeline' ? 16 : 18} strokeWidth={2.25} />}
    </span>
  );
};

const ActivityRow: React.FC<{
  item: ActivityItem;
  layout: ActivityLayout;
  isLast: boolean;
  timeFormat: 'relative' | 'absolute';
}> = ({ item, layout, isLast, timeFormat }) => {
  const tone = item.tone ?? DEFAULT_TONE_FOR_TYPE[item.type];

  return (
    <article
      className={[
        'group/item relative flex items-start gap-stack-xs',
        /* En `list`, la rangée n'a ni coque ni fond : la carte parente porte le
           coin, et le retrait (20 puis 24 px) ne descend jamais sous son rayon. */
        layout === 'list'
          ? 'px-stack-md sm:px-stack-lg py-stack'
          : layout === 'cards'
            ? 'p-4 rounded-lg bg-white border border-ink-100 hover:border-ink-200 transition-[background-color,border-color,box-shadow] duration-fast ease-standard'
            : 'p-3 rounded-lg bg-white border border-ink-100 hover:border-ink-200 transition-[background-color,border-color,box-shadow] duration-fast ease-standard',
      ].join(' ')}
    >
      {/* Icon + optional rail */}
      <div className="relative flex flex-col items-center shrink-0">
        <ActivityIcon item={item} tone={tone} layout={layout} />
        {layout === 'timeline' && !isLast && (
          <span
            aria-hidden="true"
            className="absolute top-9 bottom-[-1.25rem] w-px bg-gradient-to-b from-ink-200 via-ink-200 to-ink-200/0"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pt-1 pb-1">
        <header className="flex items-start justify-between gap-stack-xs flex-wrap">
          <h3 className="text-body font-semibold text-ink-900 leading-snug">{item.title}</h3>
          <time className="text-micro text-ink-600 font-medium whitespace-nowrap shrink-0 mt-0.5 tabular-nums">
            {formatTimestamp(item.timestamp, timeFormat)}
          </time>
        </header>

        {item.description && (
          <p className="m-0 mt-1 text-caption text-ink-600">{item.description}</p>
        )}

        {(item.actor || (item.actionLabel && item.onActionClick)) && (
          <div className="flex items-center gap-stack-xs mt-2 flex-wrap">
            {item.actor && (
              <span className="inline-flex items-center gap-stack-2xs">
                <Avatar
                  size="xs"
                  name={item.actor.name}
                  src={item.actor.avatar}
                  shape="circle"
                />
                <span className="text-caption text-ink-600 font-medium">{item.actor.name}</span>
              </span>
            )}
            {item.actionLabel && item.onActionClick && (
              <button
                type="button"
                onClick={item.onActionClick}
                className="inline-flex items-center min-h-6 py-1 -my-1 gap-stack-3xs text-caption font-semibold text-primary-700 hover:text-primary-800 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {item.actionLabel}
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

// ─── Main ───────────────────────────────────────────────────────────────────

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  layout: layoutProp,
  groupByDate = false,
  itemsPerPage = 10,
  timeFormat = 'relative',
  isLoading = false,
  emptyMessage = 'Aucune activité pour le moment',
  onLoadMore,
  hasMore = false,
  className = '',
  useTimeline,
}) => {
  // Backward compat: useTimeline (boolean) → layout
  const layout: ActivityLayout =
    layoutProp ?? (useTimeline === false ? 'cards' : 'timeline');

  const [displayCount, setDisplayCount] = React.useState(itemsPerPage);
  const displayedItems = items.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((p) => p + itemsPerPage);
    onLoadMore?.();
  };

  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-stack-xs text-ink-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" strokeWidth={2.5} />
          <p className="m-0 text-body font-medium">Chargement des activités…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center px-6 py-12 rounded-xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col items-center gap-stack-xs text-ink-500 text-center">
          <IconChip size="lg" tone="neutral">
            <Inbox strokeWidth={2} />
          </IconChip>
          <p className="m-0 text-body font-medium text-ink-700">{emptyMessage}</p>
          <p className="m-0 text-caption text-ink-600 max-w-[280px]">Vos prochaines activités apparaîtront ici dès que vous commencerez à apprendre.</p>
        </div>
      </div>
    );
  }

  // Group by date (or single bucket)
  const buckets: Array<{ label: string | null; items: ActivityItem[] }> = (() => {
    if (!groupByDate) return [{ label: null, items: displayedItems }];
    const map = new Map<string, ActivityItem[]>();
    displayedItems.forEach((item) => {
      const key = groupKey(item.timestamp);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    });
    return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
  })();

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      {buckets.map((bucket, bIdx) => (
        <div key={bucket.label ?? bIdx} className={bIdx > 0 ? 'mt-stack-lg' : ''}>
          {bucket.label && (
            <p className="m-0 mb-3 text-caption font-bold uppercase tracking-[0.08em] text-ink-500">
              {bucket.label}
            </p>
          )}
          {layout === 'list' ? (
            <Card className="p-0">
              <ul className="flex flex-col divide-y divide-ink-100">
                {bucket.items.map((item, idx) => (
                  <li key={item.id}>
                    <ActivityRow
                      item={item}
                      layout={layout}
                      isLast={idx === bucket.items.length - 1}
                      timeFormat={timeFormat}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          ) : (
            <div className={layout === 'cards' ? 'flex flex-col gap-stack-xs' : 'flex flex-col gap-tight'}>
              {bucket.items.map((item, idx) => (
                <ActivityRow
                  key={item.id}
                  item={item}
                  layout={layout}
                  isLast={idx === bucket.items.length - 1}
                  timeFormat={timeFormat}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {hasMore && displayCount < items.length && (
        <div className="flex justify-center mt-stack-md">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-stack-xs px-stack-md py-2.5 rounded-lg border border-ink-200 bg-white text-body font-bold text-ink-700 cursor-pointer hover:bg-ink-50 hover:border-primary-300 hover:shadow-sm transition-[background-color,border-color,box-shadow] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Voir plus d’activités
            <ArrowRight size={14} strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
