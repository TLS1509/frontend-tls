import React from 'react';

export type BadgeVariant =
  | 'brand'
  | 'neutral'
  | 'warm'
  | 'sun'
  | 'success'
  | 'danger'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  text?: React.ReactNode;
  /** @deprecated Use variant. `primary` maps to `brand`. */
  color?: BadgeVariant | 'primary';
}

const mapLegacyColor = (color?: BadgeVariant | 'primary'): BadgeVariant => {
  if (color === 'primary' || !color) return 'brand';
  return color;
};

const BASE =
  'inline-flex items-center gap-1 rounded-pill font-body font-bold uppercase leading-tight whitespace-nowrap border';

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 tracking-[0.06em]',
  md: 'text-micro px-2.5 py-0.5 tracking-[0.05em]',
  lg: 'text-caption px-3 py-1 tracking-[0.04em]',
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-50 text-primary-800 border-primary-200',
  neutral:  'bg-ink-50 text-ink-700 border-ink-200',
  warm:     'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:      'bg-accent-50 text-accent-800 border-accent-200',
  success:  'bg-success-bg text-success-fg border-success-base/30',
  danger:   'bg-danger-bg text-danger-fg border-danger-base/30',
  info:     'bg-primary-50 text-primary-700 border-primary-200',
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-500',
  neutral:  'bg-ink-400',
  warm:     'bg-secondary-500',
  sun:      'bg-accent-500',
  success:  'bg-success-base',
  danger:   'bg-danger-base',
  info:     'bg-primary-500',
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  color,
  size = 'md',
  dot = false,
  text,
  className = '',
  children,
  ...rest
}) => {
  const resolvedVariant: BadgeVariant = variant ?? mapLegacyColor(color);
  const classes = [BASE, SIZE_CLASSES[size], VARIANT_CLASSES[resolvedVariant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && (
        <span
          aria-hidden
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASSES[resolvedVariant]}`}
        />
      )}
      {children ?? text}
    </span>
  );
};

export default Badge;
