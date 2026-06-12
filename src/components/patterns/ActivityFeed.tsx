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

/**
 * ActivityFeed — chronological list of user activities.
 *
 * Redesign:
 *   - Lucide icons replace emoji (cleaner, on-brand colors)
 *   - Avatar component for actor cards
 *   - Smaller, gradient timeline rail
 *   - Optional date grouping (groupByDate)
 *   - 2 layouts: timeline (default) | cards
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
export type ActivityLayout = 'timeline' | 'cards';

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
  /** Layout: 'timeline' (default, vertical rail) or 'cards' (separated cards). */
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

const TONE_DOT: Record<ActivityTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-warm-sm',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-sun-sm',
  success: 'bg-gradient-to-br from-success-base to-success-fg text-white shadow-sm',
  danger:  'bg-gradient-to-br from-danger-base to-danger-fg text-white shadow-sm',
};

const TONE_HOVER_BG: Record<ActivityTone, string> = {
  primary: 'group-hover/item:bg-primary-50/60',
  warm:    'group-hover/item:bg-secondary-50/60',
  sun:     'group-hover/item:bg-accent-50/60',
  success: 'group-hover/item:bg-success-bg/60',
  danger:  'group-hover/item:bg-danger-bg/60',
};

const TONE_ACTION: Record<ActivityTone, string> = {
  primary: 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100',
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
  const shape = layout === 'timeline' ? 'rounded-full w-9 h-9' : 'rounded-xl w-10 h-10';
  return (
    <span
      className={[
        'inline-flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-105',
        layout === 'timeline' ? 'ring-4 ring-white' : '',
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
        'group/item relative flex items-start gap-stack-xs rounded-xl transition-[background-color,border-color,box-shadow] duration-fast ease-standard',
        layout === 'cards'
          ? 'p-4 bg-white border border-ink-200 hover:border-primary-300 hover:shadow-sm'
          : `p-3 ${TONE_HOVER_BG[tone]}`,
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
          <h3 className="m-0 text-body-sm font-semibold text-ink-900 leading-snug">{item.title}</h3>
          <time className="text-micro text-ink-400 font-medium whitespace-nowrap shrink-0 mt-0.5 tabular-nums">
            {formatTimestamp(item.timestamp, timeFormat)}
          </time>
        </header>

        {item.description && (
          <p className="m-0 mt-1 text-caption text-ink-600 leading-relaxed">{item.description}</p>
        )}

        {(item.actor || (item.actionLabel && item.onActionClick)) && (
          <div className="flex items-center gap-stack-xs mt-2 flex-wrap">
            {item.actor && (
              <span className="inline-flex items-center gap-stack-xs px-1.5 py-1 pr-2.5 rounded-pill bg-ink-50 border border-ink-200">
                <Avatar
                  size="xs"
                  name={item.actor.name}
                  src={item.actor.avatar}
                  shape="circle"
                  className="!ring-1 !ring-white"
                />
                <span className="text-caption text-ink-700 font-medium">{item.actor.name}</span>
              </span>
            )}
            {item.actionLabel && item.onActionClick && (
              <button
                type="button"
                onClick={item.onActionClick}
                className={[
                  'inline-flex items-center gap-tight px-3 py-1 rounded-pill text-caption font-semibold border cursor-pointer transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  TONE_ACTION[tone],
                ].join(' ')}
              >
                {item.actionLabel}
                <ArrowRight size={13} strokeWidth={2.25} />
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
          <p className="m-0 text-body-sm font-medium">Chargement des activités…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
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
            <Inbox size={26} strokeWidth={2} />
          </span>
          <p className="m-0 text-body-sm font-medium text-ink-700">{emptyMessage}</p>
          <p className="m-0 text-caption text-ink-400 max-w-[280px]">Vos prochaines activités apparaîtront ici dès que vous commencerez à apprendre.</p>
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
        </div>
      ))}

      {hasMore && displayCount < items.length && (
        <div className="flex justify-center mt-5">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-stack-xs px-5 py-2.5 rounded-pill border border-ink-200 bg-white text-body-sm font-semibold text-ink-700 cursor-pointer hover:bg-ink-50 hover:border-primary-300 hover:-translate-y-0.5 hover:shadow-sm transition-[background-color,border-color,transform,box-shadow] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Voir plus d’activités
            <ArrowRight size={15} strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
