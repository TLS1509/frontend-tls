import React from 'react';
import './NotificationBadge.css';

/**
 * NotificationBadge — count badge overlaid on icon buttons / avatars
 *
 * Wraps `children` in a relative container and renders a small pill
 * badge at the top-right corner.
 *
 * - Shows "99+" when count exceeds `max` (default 99)
 * - Pill shape when count > 9, circle when ≤ 9
 * - Tones: danger (default) | brand | warm
 */

export interface NotificationBadgeProps {
  /** Notification count to display */
  count: number;
  /** Maximum value before showing "max+" (default: 99) */
  max?: number;
  /** Color tone */
  tone?: 'danger' | 'brand' | 'warm';
  /** The icon or button to overlay the badge on */
  children: React.ReactNode;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  max = 99,
  tone = 'danger',
  children,
  className = '',
}) => {
  if (count <= 0) {
    return <>{children}</>;
  }

  const displayCount = count > max ? `${max}+` : String(count);

  const classes = [
    'notif-badge',
    `notif-badge--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {children}
      <span
        className="notif-badge__dot"
        aria-label={`${count} notifications`}
        role="status"
      >
        {displayCount}
      </span>
    </span>
  );
};

export default NotificationBadge;
