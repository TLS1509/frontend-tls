import React from 'react';

export interface NotificationBadgeProps {
  count: number;
  max?: number;
  tone?: 'danger' | 'brand' | 'warm';
  children: React.ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<'danger' | 'brand' | 'warm', string> = {
  danger: 'bg-danger-base text-white',
  brand:  'bg-primary-600 text-white',
  warm:   'bg-secondary-500 text-white',
};

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
  const isWide = displayCount.length > 1;

  const classes = ['relative inline-flex shrink-0', className].filter(Boolean).join(' ');

  const dotClasses = [
    'absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-pill border-2 border-white',
    'text-[10px] font-bold leading-none px-1',
    isWide ? 'px-1.5' : 'aspect-square px-0',
    TONE_CLASSES[tone],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {children}
      <span className={dotClasses} aria-label={`${count} notifications`} role="status">
        {displayCount}
      </span>
    </span>
  );
};

export default NotificationBadge;
