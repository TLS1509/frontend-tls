import { 
  Bell, 
  CheckCircle2, 
  Trophy, 
  MessageSquare, 
  BookOpen, 
  Users,
  AlertCircle,
  Clock,
  X,
  Eye,
  Trash2,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'message' | 'lesson' | 'coaching' | 'achievement' | 'correction' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  isPinned?: boolean;
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

interface NotificationFeedProps {
  notifications: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAction?: (id: string, actionUrl?: string) => void;
  showActions?: boolean;
  maxItems?: number;
  emptyMessage?: string;
}

export function NotificationFeed({
  notifications,
  onMarkAsRead,
  onDelete,
  onAction,
  showActions = true,
  maxItems,
  emptyMessage = 'Aucune notification',
}: NotificationFeedProps) {
  const displayedNotifications = maxItems 
    ? notifications.slice(0, maxItems) 
    : notifications;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'lesson':
        return BookOpen;
      case 'coaching':
        return Users;
      case 'achievement':
        return Trophy;
      case 'correction':
        return CheckCircle2;
      case 'reminder':
        return Clock;
      case 'system':
      default:
        return AlertCircle;
    }
  };

  const getIconColor = (type: NotificationItem['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary)';
      case 'lesson':
        return 'var(--accent)';
      case 'coaching':
        return 'var(--secondary)';
      case 'achievement':
        return 'var(--accent)';
      case 'correction':
        return 'var(--success)';
      case 'reminder':
        return 'var(--warning)';
      case 'system':
      default:
        return 'var(--muted-foreground)';
    }
  };

  const getIconBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'message':
        return 'rgba(85, 161, 180, 0.1)';
      case 'lesson':
        return 'rgba(248, 176, 68, 0.1)';
      case 'coaching':
        return 'rgba(237, 132, 58, 0.1)';
      case 'achievement':
        return 'rgba(248, 176, 68, 0.1)';
      case 'correction':
        return 'rgba(34, 197, 94, 0.1)';
      case 'reminder':
        return 'rgba(245, 158, 11, 0.1)';
      case 'system':
      default:
        return 'rgba(0, 0, 0, 0.05)';
    }
  };

  if (displayedNotifications.length === 0) {
    return (
      <div 
        className="text-center py-12"
        style={{
          background: 'rgba(0, 0, 0, 0.02)',
          border: '1px dashed var(--border)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <Bell className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
        <p style={{ color: 'var(--muted-foreground)' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayedNotifications.map((notification) => {
        const Icon = getIcon(notification.type);
        const iconColor = getIconColor(notification.type);
        const iconBg = getIconBg(notification.type);

        return (
          <div
            key={notification.id}
            className="relative group"
            style={{
              background: notification.isRead 
                ? 'rgba(255, 255, 255, 0.5)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: notification.isRead 
                ? '1px solid var(--border)' 
                : '2px solid var(--primary-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: notification.isRead 
                ? '0 2px 8px rgba(0, 0, 0, 0.04)' 
                : '0 4px 16px rgba(85, 161, 180, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {/* Pinned indicator */}
            {notification.isPinned && (
              <div 
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 8px var(--accent)',
                }}
              />
            )}

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: iconBg,
                  color: iconColor,
                }}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Sender info */}
                {notification.sender && (
                  <div className="flex items-center gap-2 mb-1">
                    {notification.sender.avatar && (
                      <span style={{ fontSize: 'var(--text-lg)' }}>
                        {notification.sender.avatar}
                      </span>
                    )}
                    <div>
                      <span 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {notification.sender.name}
                      </span>
                      {notification.sender.role && (
                        <>
                          <span style={{ color: 'var(--muted-foreground)', margin: '0 0.25rem' }}>•</span>
                          <span 
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            {notification.sender.role}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Title */}
                <h4 
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                  }}
                >
                  {notification.title}
                </h4>

                {/* Message */}
                <p 
                  className="mb-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    lineHeight: '1.5',
                  }}
                >
                  {notification.message}
                </p>

                {/* Time */}
                <div 
                  className="flex items-center gap-1"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  <Clock className="w-3 h-3" />
                  {notification.time}
                </div>
              </div>

              {/* Actions */}
              {showActions && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {!notification.isRead && onMarkAsRead && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: 'var(--success)',
                      }}
                      title="Marquer comme lu"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(notification.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'rgba(220, 38, 38, 0.1)',
                        color: 'var(--destructive)',
                      }}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Action button */}
            {notification.actionUrl && onAction && (
              <button
                onClick={() => onAction(notification.id, notification.actionUrl)}
                className="mt-3 w-full px-4 py-2 rounded-lg transition-all duration-200 hover:scale-102"
                style={{
                  background: 'rgba(85, 161, 180, 0.1)',
                  border: '1px solid var(--primary-200)',
                  color: 'var(--primary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                Voir plus
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Compact notification feed for dashboard widget
interface CompactNotificationFeedProps {
  notifications: NotificationItem[];
  onViewAll?: () => void;
  maxItems?: number;
}

export function CompactNotificationFeed({
  notifications,
  onViewAll,
  maxItems = 3,
}: CompactNotificationFeedProps) {
  const displayedNotifications = notifications.slice(0, maxItems);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            Notifications
          </h3>
          {unreadCount > 0 && (
            <div 
              className="px-2 py-0.5 rounded-full"
              style={{
                background: 'var(--secondary)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              {unreadCount}
            </div>
          )}
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            style={{
              color: 'var(--primary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Tout voir
          </button>
        )}
      </div>

      {/* Notifications */}
      <NotificationFeed 
        notifications={displayedNotifications}
        showActions={false}
        maxItems={maxItems}
        emptyMessage="Aucune notification récente"
      />
    </div>
  );
}
