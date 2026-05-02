import React from 'react';
import './Badge.css';

/**
 * Badge — Source of truth: design-system/spec.json → components.Badge
 *
 * Compact status indicator. Uppercase, 11px, 1–2 words max.
 * Variants: brand (default), neutral, warm, sun, success, danger, info.
 * Sizes: sm (10px text), md (default), lg (larger).
 * Optional status dot via `dot` prop.
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
  /** sm = 10px text / tight padding, md = default, lg = larger */
  size?: BadgeSize;
  /** Show a small colored status dot before the label */
  dot?: boolean;
  /** Legacy/simple API: text content */
  text?: React.ReactNode;
  /** Legacy API: map color prop to variant */
  color?: BadgeVariant | 'primary';
}

const mapLegacyColor = (color?: BadgeVariant | 'primary'): BadgeVariant => {
  if (color === 'primary' || !color) return 'brand';
  return color;
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
  const classes = [
    'badge',
    resolvedVariant !== 'brand' && `badge--${resolvedVariant}`,
    `badge--${size}`,
    dot && 'badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {children ?? text}
    </span>
  );
};

export default Badge;
