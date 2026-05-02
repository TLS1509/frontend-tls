/**
 * ActivityFeed Pattern
 *
 * Composite pattern for displaying user activities, events, or notifications
 * in a chronological timeline or list format
 *
 * Reusable in:
 * - Dashboard activity section
 * - User profile activity history
 * - Course progress tracking
 * - Collaboration feeds
 */

import React from 'react';
import './ActivityFeed.css';

export type ActivityType =
  | 'start'
  | 'complete'
  | 'progress'
  | 'achievement'
  | 'feedback'
  | 'message'
  | 'comment'
  | 'share';

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
  tone?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  actionLabel?: string;
  onActionClick?: () => void;
}

export interface ActivityFeedProps {
  /** Array of activity items */
  items: ActivityItem[];

  /** Whether to show timeline layout (with connector lines) */
  useTimeline?: boolean;

  /** Maximum items to show initially (pagination) */
  itemsPerPage?: number;

  /** Format for timestamps */
  timeFormat?: 'relative' | 'absolute'; // "2 hours ago" vs "2024-04-29 10:30 AM"

  /** Loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Callback to load more items */
  onLoadMore?: () => void;

  /** Whether more items are available */
  hasMore?: boolean;

  /** Custom className */
  className?: string;
}

const getIconForType = (type: ActivityType): string => {
  const icons: Record<ActivityType, string> = {
    start: '🚀',
    complete: '✅',
    progress: '📈',
    achievement: '🏆',
    feedback: '💬',
    message: '💭',
    comment: '📝',
    share: '📤',
  };
  return icons[type] || '📌';
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

  // Loading state
  if (isLoading) {
    return (
      <div className={`activity-feed activity-feed--loading ${className}`}>
        <div className="activity-feed__loader">
          <div className="activity-feed__spinner" />
          <p>Loading activities...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className={`activity-feed activity-feed--empty ${className}`}>
        <div className="activity-feed__empty">
          <p className="activity-feed__empty-icon">📭</p>
          <p className="activity-feed__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`activity-feed ${useTimeline ? 'activity-feed--timeline' : ''} ${className}`}>
      {useTimeline && <div className="activity-feed__timeline-line" />}

      <div className="activity-feed__items">
        {displayedItems.map((item, idx) => (
          <article
            key={item.id}
            className={`activity-feed__item activity-feed__item--${item.type} activity-feed__item--tone-${item.tone || 'primary'}`}
          >
            {useTimeline && (
              <div className="activity-feed__timeline-dot">
                <span className="activity-feed__timeline-icon">
                  {item.icon || getIconForType(item.type)}
                </span>
              </div>
            )}

            {!useTimeline && (
              <div className="activity-feed__item-icon">
                {item.icon || getIconForType(item.type)}
              </div>
            )}

            <div className="activity-feed__item-content">
              <header className="activity-feed__item-header">
                <h3 className="activity-feed__item-title">{item.title}</h3>
                <time className="activity-feed__item-time">
                  {formatTimestamp(item.timestamp, timeFormat)}
                </time>
              </header>

              {item.description && (
                <p className="activity-feed__item-description">{item.description}</p>
              )}

              {item.actor && (
                <div className="activity-feed__item-actor">
                  {item.actor.avatar && (
                    <img
                      src={item.actor.avatar}
                      alt={item.actor.name}
                      className="activity-feed__actor-avatar"
                    />
                  )}
                  <span className="activity-feed__actor-name">{item.actor.name}</span>
                </div>
              )}

              {item.actionLabel && item.onActionClick && (
                <button
                  type="button"
                  className="activity-feed__item-action"
                  onClick={item.onActionClick}
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Load more button */}
      {hasMore && displayCount < items.length && (
        <div className="activity-feed__footer">
          <button
            type="button"
            className="activity-feed__load-more"
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
