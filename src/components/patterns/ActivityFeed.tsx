import React from 'react';

export type ActivityType =
  | 'start'
  | 'complete'
  | 'progress'
  | 'achievement'
  | 'feedback'
  | 'message'
  | 'comment'
  | 'share';

export type ActivityTone = 'primary' | 'warm' | 'sun' | 'success' | 'danger';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date;
  actor?: {
    name: string;
    avatar?: string;
  };
  icon?: React.ReactNode;
  tone?: ActivityTone;
  actionLabel?: string;
  onActionClick?: () => void;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  useTimeline?: boolean;
  itemsPerPage?: number;
  timeFormat?: 'relative' | 'absolute';
  isLoading?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

const TONE_DOT: Record<ActivityTone, string> = {
  primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-md',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-md',
  success: 'bg-gradient-to-br from-success-base to-success-fg text-white shadow-md',
  danger:  'bg-gradient-to-br from-danger-base to-danger-fg text-white shadow-md',
};

const TONE_BG_HOVER: Record<ActivityTone, string> = {
  primary: 'group-hover:bg-primary-50/50',
  warm:    'group-hover:bg-secondary-50/50',
  sun:     'group-hover:bg-accent-50/50',
  success: 'group-hover:bg-success-bg/50',
  danger:  'group-hover:bg-danger-bg/50',
};

const ICON_FOR_TYPE: Record<ActivityType, string> = {
  start: '🚀',
  complete: '✅',
  progress: '📈',
  achievement: '🏆',
  feedback: '💬',
  message: '💭',
  comment: '📝',
  share: '📤',
};

const formatTimestamp = (date: Date, format: 'relative' | 'absolute'): string => {
  if (format === 'relative') {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }

  return date.toLocaleString();
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  useTimeline = true,
  itemsPerPage = 10,
  timeFormat = 'relative',
  isLoading = false,
  emptyMessage = 'No activities yet',
  onLoadMore,
  hasMore = false,
  className = '',
}) => {
  const [displayCount, setDisplayCount] = React.useState(itemsPerPage);
  const displayedItems = items.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage);
    onLoadMore?.();
  };

  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-10 h-10 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm font-medium">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={['flex items-center justify-center p-12 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <p className="m-0 text-4xl">📭</p>
          <p className="m-0 text-body-sm font-medium">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <div className="flex flex-col gap-1">
        {displayedItems.map((item, idx) => {
          const tone = item.tone || 'primary';
          const isLast = idx === displayedItems.length - 1;

          return (
            <article
              key={item.id}
              className={[
                'group relative flex items-start gap-4 p-3 rounded-xl transition-colors duration-200',
                TONE_BG_HOVER[tone],
              ].join(' ')}
            >
              {useTimeline && (
                <div className="relative flex flex-col items-center shrink-0">
                  <span
                    className={[
                      'inline-flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white z-10 text-lg transition-transform group-hover:scale-110',
                      TONE_DOT[tone],
                    ].join(' ')}
                  >
                    {item.icon || ICON_FOR_TYPE[item.type]}
                  </span>
                  {!isLast && (
                    <span aria-hidden="true" className="absolute top-10 bottom-[-0.25rem] w-0.5 bg-gradient-to-b from-ink-200 to-ink-200/0" />
                  )}
                </div>
              )}

              {!useTimeline && (
                <div
                  className={[
                    'shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl text-lg transition-transform group-hover:scale-105',
                    TONE_DOT[tone],
                  ].join(' ')}
                >
                  {item.icon || ICON_FOR_TYPE[item.type]}
                </div>
              )}

              <div className="flex-1 min-w-0 pt-0.5">
                <header className="flex items-start justify-between gap-3 flex-wrap">
                  <h3 className="m-0 text-body-sm font-semibold text-ink-900 leading-snug">
                    {item.title}
                  </h3>
                  <time className="text-micro text-ink-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                    {formatTimestamp(item.timestamp, timeFormat)}
                  </time>
                </header>

                {item.description && (
                  <p className="m-0 mt-1 text-caption text-ink-500 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.actor && (
                  <div className="inline-flex items-center gap-2 mt-2 px-2 py-1 rounded-pill bg-ink-50">
                    {item.actor.avatar && (
                      <img
                        src={item.actor.avatar}
                        alt={item.actor.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-white"
                      />
                    )}
                    <span className="text-caption text-ink-700 font-medium">{item.actor.name}</span>
                  </div>
                )}

                {item.actionLabel && item.onActionClick && (
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-pill bg-primary-50 text-primary-700 text-caption font-semibold hover:bg-primary-100 transition-colors border border-primary-100"
                    onClick={item.onActionClick}
                  >
                    {item.actionLabel}
                    <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && displayCount < items.length && (
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill border border-ink-200 bg-white text-body-sm font-semibold text-ink-700 cursor-pointer hover:bg-ink-50 hover:border-ink-300 hover:-translate-y-0.5 hover:shadow-sm transition-all"
            onClick={handleLoadMore}
          >
            Load more activities
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
