import React from 'react';

/**
 * Badge — Source of truth: design-system/spec.json → components.Badge
 *
 * Compact status indicator. Uppercase, 11px, 1–2 words max.
 * Variants: brand (default), neutral, warm, sun, success, danger, info.
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

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
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
