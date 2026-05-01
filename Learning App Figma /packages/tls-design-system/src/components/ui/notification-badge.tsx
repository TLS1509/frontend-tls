import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showPulse?: boolean;
  onClick?: () => void;
}

export function NotificationBadge({ 
  count, 
  size = 'md', 
  position = 'top-right',
  showPulse = true,
  onClick,
}: NotificationBadgeProps) {
  if (count === 0) return null;

  const sizeClasses = {
    sm: 'w-4 h-4 text-[8px]',
    md: 'w-5 h-5 text-[10px]',
    lg: 'w-6 h-6 text-xs',
  };

  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <div 
      className={`absolute ${positionClasses[position]} rounded-full cursor-pointer`}
      style={{
        width: '10px',
        height: '10px',
        background: 'var(--secondary)',
        boxShadow: '0 2px 8px rgba(237, 132, 58, 0.4)',
        border: '2px solid white',
      }}
      onClick={onClick}
      aria-label="New notifications"
    />
  );
}

// Avatar with notification badge
interface AvatarWithBadgeProps {
  initials: string;
  name: string;
  notificationCount?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export function AvatarWithBadge({ 
  initials, 
  name, 
  notificationCount = 0,
  size = 'md',
  onClick,
}: AvatarWithBadgeProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', text: 'var(--text-xs)' },
    md: { container: 'w-10 h-10', text: 'var(--text-sm)' },
    lg: { container: 'w-12 h-12', text: 'var(--text-base)' },
    xl: { container: 'w-16 h-16', text: 'var(--text-xl)' },
  };

  const { container, text } = sizeMap[size];

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={`${container} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105`}
        style={{
          background: 'var(--gradient-primary)',
          color: 'white',
          fontFamily: 'var(--font-display)',
          fontSize: text,
          fontWeight: 'var(--font-weight-bold)',
          boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)',
        }}
        aria-label={`${name} profile`}
      >
        {initials}
      </button>

      {notificationCount > 0 && (
        <NotificationBadge 
          count={notificationCount} 
          size={size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'}
          showPulse
        />
      )}
    </div>
  );
}

// Standalone notification bell icon with badge
interface NotificationBellProps {
  count: number;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function NotificationBell({ count, onClick, size = 'md' }: NotificationBellProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { container: 'w-12 h-12', icon: 'w-6 h-6' },
  };

  const { container, icon } = sizeMap[size];
  const hasNotifications = count > 0;

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={`${container} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105`}
        style={{
          background: hasNotifications ? 'rgba(85, 161, 180, 0.1)' : 'transparent',
          border: '1px solid var(--border)',
          color: hasNotifications ? 'var(--primary)' : 'var(--muted-foreground)',
          animation: hasNotifications ? 'bell-shake 0.5s ease-in-out' : 'none',
        }}
        aria-label={`Notifications (${count})`}
      >
        <Bell className={icon} />
      </button>

      {hasNotifications && (
        <NotificationBadge 
          count={count} 
          size={size === 'lg' ? 'md' : 'sm'}
          showPulse
        />
      )}

      <style>{`
        @keyframes bell-shake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}