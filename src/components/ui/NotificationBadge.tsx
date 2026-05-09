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
  const isVeryWide = displayCount.length >= 3; // "99+", "100", etc.

  const classes = ['relative inline-flex shrink-0', className].filter(Boolean).join(' ');

  // ring-2 ring-white sits OUTSIDE the box (vs border-2 which eats into it),
  // so a 16×16 badge keeps its full visible area. tabular-nums prevents the
  // pill from breathing in/out as digits change.
  const dotClasses = [
    'absolute -top-1 -right-1 inline-flex items-center justify-center h-[16px] min-w-[16px] rounded-pill ring-2 ring-white font-bold leading-none tabular-nums shadow-xs',
    isVeryWide
      ? 'px-1 text-[9px]'
      : isWide
        ? 'px-1 text-[10px]'
        : 'aspect-square px-0 text-[10px]',
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
