/**
 * NotificationCard
 *
 * Card component for displaying notifications with type, title, message, and actions.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <NotificationCard
 *   type="achievement"
 *   title="Badge unlocked"
 *   message="You've earned a new badge"
 *   timestamp="2 hours ago"
 *   isRead={false}
 *   onMarkAsRead={() => {}}
 * />
 */

import React from 'react';
import { X, Check, CheckCheck } from 'lucide-react';
import './NotificationCard.css';

export type NotificationType =
  | 'message'
  | 'lesson'
  | 'coaching'
  | 'achievement'
  | 'correction'
  | 'system'
  | 'completion'
  | 'report';

export interface NotificationCardProps {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  icon?: React.ReactNode;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

const typeConfig: Record<NotificationType, { bg: string; border: string; accent: string }> = {
  message: { bg: 'var(--tls-primary-50)', border: 'var(--tls-primary-200)', accent: 'var(--tls-primary-500)' },
  lesson: { bg: 'var(--tls-primary-50)', border: 'var(--tls-primary-200)', accent: 'var(--tls-primary-500)' },
  coaching: { bg: 'var(--overlay-warm-xs)', border: 'var(--tls-orange-200)', accent: 'var(--tls-orange-600)' },
  achievement: { bg: 'var(--tls-yellow-50)', border: 'var(--tls-yellow-200)', accent: 'var(--tls-yellow-600)' },
  correction: { bg: 'var(--tls-success-light)', border: 'var(--tls-success-border)', accent: 'var(--tls-success-base)' },
  system: { bg: 'var(--surface-muted)', border: 'var(--border-default)', accent: 'var(--text-muted)' },
  completion: { bg: 'var(--tls-success-light)', border: 'var(--tls-success-border)', accent: 'var(--tls-success-base)' },
  report: { bg: 'var(--overlay-warm-xs)', border: 'var(--tls-orange-200)', accent: 'var(--tls-orange-600)' },
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  title,
  message,
  timestamp,
  isRead = true,
  icon,
  onMarkAsRead,
  onDelete,
  onClick,
  className = '',
}) => {
  const config = typeConfig[type];

  const cardClasses = [
    'notification-card',
    `notification-card--${type}`,
    !isRead && 'notification-card--unread',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      onClick={onClick}
      className={cardClasses}
    >
      {/* Icon or Read Badge */}
      <div className="notification-card__icon">
        {icon || '📬'}
      </div>

      {/* Content */}
      <div className="notification-card__content">
        {/* Header with title and unread dot */}
        <div className="notification-card__header">
          <h4 className="notification-card__title">
            {title}
          </h4>
          {!isRead && (
            <div className="notification-card__unread-dot" />
          )}
        </div>

        {/* Message */}
        <p className="notification-card__message">
          {message}
        </p>

        {/* Timestamp */}
        <p className="notification-card__timestamp">
          {timestamp}
        </p>
      </div>

      {/* Actions */}
      <div className="notification-card__actions">
        {!isRead && onMarkAsRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            className="notification-card__action-btn"
            title="Mark as read"
          >
            <Check size={16} />
          </button>
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="notification-card__action-btn notification-card__action-btn--delete"
            title="Delete"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
