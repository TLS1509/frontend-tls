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
  primary: 'bg-primary-500 text-white',
  warm:    'bg-secondary-500 text-white',
  sun:     'bg-accent-400 text-accent-900',
  success: 'bg-success-base text-white',
  danger:  'bg-danger-base text-white',
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
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-8 h-8 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <p className="m-0 text-3xl">📭</p>
          <p className="m-0 text-body-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <div className="flex flex-col gap-4">
        {displayedItems.map((item, idx) => {
          const tone = item.tone || 'primary';
          const isLast = idx === displayedItems.length - 1;

          return (
            <article key={item.id} className="relative flex items-start gap-3">
              {useTimeline && (
                <div className="relative flex flex-col items-center shrink-0">
                  <span
                    className={[
                      'inline-flex items-center justify-center w-9 h-9 rounded-full ring-4 ring-white z-10 text-base',
                      TONE_DOT[tone],
                    ].join(' ')}
                  >
                    {item.icon || ICON_FOR_TYPE[item.type]}
                  </span>
                  {!isLast && (
                    <span aria-hidden="true" className="absolute top-9 bottom-[-1rem] w-px bg-ink-200" />
                  )}
                </div>
              )}

              {!useTimeline && (
                <div
                  className={[
                    'shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl',
                    TONE_DOT[tone],
                  ].join(' ')}
                >
                  {item.icon || ICON_FOR_TYPE[item.type]}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <header className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="m-0 text-body-sm font-semibold text-ink-900">{item.title}</h3>
                  <time className="text-micro text-ink-500">
                    {formatTimestamp(item.timestamp, timeFormat)}
                  </time>
                </header>

                {item.description && (
                  <p className="m-0 mt-1 text-caption text-ink-500 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {item.actor && (
                  <div className="inline-flex items-center gap-2 mt-2">
                    {item.actor.avatar && (
                      <img
                        src={item.actor.avatar}
                        alt={item.actor.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    )}
                    <span className="text-caption text-ink-500">{item.actor.name}</span>
                  </div>
                )}

                {item.actionLabel && item.onActionClick && (
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center px-3 py-1 rounded-pill bg-primary-50 text-primary-700 text-caption font-semibold hover:bg-primary-100 transition-colors"
                    onClick={item.onActionClick}
                  >
                    {item.actionLabel}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && displayCount < items.length && (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-pill border border-ink-200 bg-white text-body-sm font-medium text-ink-900 cursor-pointer hover:bg-ink-50 transition-colors"
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
