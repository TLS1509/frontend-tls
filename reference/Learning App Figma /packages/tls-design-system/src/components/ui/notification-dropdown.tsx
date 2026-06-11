import { useState } from 'react';
import { Bell, Check, MessageSquare, BookOpen, Calendar, Trophy, X } from 'lucide-react';
import { Button } from './button';

export interface Notification {
  id: string;
  type: 'message' | 'lesson' | 'coaching' | 'achievement' | 'correction';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onNavigate?: (url: string) => void;
}

export function NotificationDropdown({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDelete,
  onNavigate 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'lesson':
        return <BookOpen className="w-5 h-5" />;
      case 'coaching':
        return <Calendar className="w-5 h-5" />;
      case 'achievement':
        return <Trophy className="w-5 h-5" />;
      case 'correction':
        return <Check className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary)';
      case 'lesson':
        return 'var(--secondary)';
      case 'coaching':
        return 'var(--accent)';
      case 'achievement':
        return 'var(--success-600)';
      case 'correction':
        return 'var(--primary)';
      default:
        return 'var(--muted-foreground)';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl transition-all duration-200 hover:scale-105"
        style={{
          background: isOpen ? 'var(--primary-lighter)' : 'transparent',
        }}
      >
        <Bell 
          className="w-6 h-6" 
          style={{ 
            color: isOpen ? 'var(--primary)' : 'var(--muted-foreground)',
          }} 
        />
        {unreadCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: 'var(--secondary)',
              color: 'white',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-bold)',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notifications Panel */}
          <div 
            className="absolute right-0 top-full mt-2 w-96 max-h-[600px] rounded-2xl overflow-hidden z-50 shadow-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b flex items-center justify-between"
              style={{
                borderColor: 'var(--glass-border)',
              }}
            >
              <div>
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
                  <p 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--primary)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  Tout marquer comme lu
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div 
              className="overflow-y-auto"
              style={{
                maxHeight: '500px',
              }}
            >
              {notifications.length === 0 ? (
                <div 
                  className="p-8 text-center"
                >
                  <Bell 
                    className="w-12 h-12 mx-auto mb-3 opacity-30" 
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                  <p 
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Aucune notification
                  </p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b cursor-pointer transition-all duration-200 hover:bg-opacity-50 relative group"
                      style={{
                        background: notification.isRead ? 'transparent' : 'var(--primary-lighter)',
                        borderColor: 'var(--glass-border)',
                      }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: notification.isRead 
                              ? 'var(--neutral-100)' 
                              : `${getIconColor(notification.type)}15`,
                          }}
                        >
                          <div style={{ color: getIconColor(notification.type) }}>
                            {getIcon(notification.type)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 
                              className="line-clamp-1"
                              style={{
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--foreground)',
                              }}
                            >
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-100"
                            >
                              <X className="w-4 h-4" style={{ color: 'var(--destructive)' }} />
                            </button>
                          </div>

                          {notification.sender && (
                            <p 
                              className="mb-1"
                              style={{
                                fontSize: 'var(--text-xs)',
                                color: 'var(--primary)',
                                fontWeight: 'var(--font-weight-medium)',
                              }}
                            >
                              {notification.sender.name} {notification.sender.role && `• ${notification.sender.role}`}
                            </p>
                          )}

                          <p 
                            className="line-clamp-2 mb-2"
                            style={{
                              fontSize: 'var(--text-sm)',
                              color: 'var(--muted-foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}
                          >
                            {notification.message}
                          </p>

                          <span 
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            {notification.time}
                          </span>
                        </div>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                            style={{
                              background: 'var(--primary)',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div 
                className="p-3 border-t text-center"
                style={{
                  borderColor: 'var(--glass-border)',
                }}
              >
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('notifications');
                      setIsOpen(false);
                    }
                  }}
                  className="w-full py-2 rounded-lg transition-all duration-200"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--primary)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary-lighter)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Voir toutes les notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}