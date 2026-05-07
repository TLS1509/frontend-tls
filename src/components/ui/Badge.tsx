import React from 'react';

/**
 * Badge — Source of truth: design-system/spec.json → components.Badge
 *
 * Compact status indicator. Uppercase, micro size, 1–2 words max.
 * Variants: brand (default), neutral, warm, sun, success, danger, info.
 * Sizes: sm / md / lg. Optional status dot via `dot` prop.
 */

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
  'inline-flex items-center gap-1 rounded-sm font-body font-bold uppercase leading-tight whitespace-nowrap border';

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-1.5 py-px tracking-[0.05em]',
  md: 'text-micro px-2 py-0.5 tracking-[0.04em]',
  lg: 'text-caption px-3 py-1 tracking-[0.03em]',
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-50 text-primary-800 border-primary-500/25',
  neutral:  'bg-ink-50 text-ink-600 border-ink-900/[14%]',
  warm:     'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:      'bg-accent-100 text-accent-900 border-accent-200',
  success:  'bg-success-bg text-success-fg border-success-base',
  danger:   'bg-danger-bg text-danger-fg border-danger-base',
  info:     'bg-primary-50 text-primary-900 border-primary-500/25',
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
      {dot && <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {children ?? text}
    </span>
  );
};

export default Badge;
