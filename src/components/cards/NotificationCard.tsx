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

  return (
    <div
      onClick={onClick}
      className={`group p-4 rounded-2xl cursor-pointer transition-all duration-200 ${className}`}
      style={{
        background: isRead ? 'var(--surface)' : config.bg,
        border: `1px solid ${isRead ? 'var(--border-subtle)' : config.border}`,
        boxShadow: 'var(--shadow-xs)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
        {/* Icon or Read Badge */}
        <div
          style={{
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: 'var(--r-lg)',
            background: isRead ? 'var(--surface-muted)' : config.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isRead ? 'var(--text-muted)' : 'white',
            fontSize: '1.25rem',
          }}
        >
          {icon || '📬'}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-1)' }}>
            <h4
              style={{
                margin: 0,
                fontSize: 'var(--t-body-sm)',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              {title}
            </h4>
            {!isRead && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: config.accent,
                  flexShrink: 0,
                }}
              />
            )}
          </div>

          {/* Message */}
          <p
            style={{
              margin: 0,
              fontSize: 'var(--t-caption)',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginBottom: 'var(--s-2)',
            }}
          >
            {message}
          </p>

          {/* Timestamp */}
          <p
            style={{
              margin: 0,
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              opacity: 0.7,
            }}
          >
            {timestamp}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-1)', opacity: 0, transition: 'opacity var(--dur-2)' }} className="group-hover:opacity-100">
          {!isRead && onMarkAsRead && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead();
              }}
              style={{
                padding: 'var(--s-2)',
                background: 'none',
                border: 'none',
                color: config.accent,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--dur-2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--tls-primary-500)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = config.accent;
              }}
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
              style={{
                padding: 'var(--s-2)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--dur-2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--tls-danger-base)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }}
              title="Delete"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
