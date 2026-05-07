import React from 'react';

/**
 * Pill — Generic chip with icon + text.
 *
 * Differs from:
 *   - Badge (uppercase status indicator, micro size)
 *   - MetaPill (metadata in cards, tone-tinted bg-50)
 *   - FilterChip (interactive tab/filter with active state)
 *
 * Pill is a soft chip used in announcements, hero overlays, counters.
 * Variants:
 *   - surface: white bg + border (Login/Signup/Help banners)
 *   - glass-light: translucent white + backdrop-blur (on colored hero)
 *   - glass-dark: translucent black + backdrop-blur (on media overlay)
 */

export type PillVariant = 'surface' | 'glass-light' | 'glass-dark';
export type PillSize = 'sm' | 'md' | 'lg';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
  variant?: PillVariant;
  size?: PillSize;
}

const BASE =
  'inline-flex items-center rounded-pill font-body font-medium whitespace-nowrap';

const SIZE_CLASSES: Record<PillSize, string> = {
  sm: 'gap-1 px-2.5 py-1 text-micro',
  md: 'gap-2 px-3 py-2 text-caption',
  lg: 'gap-2 px-4 py-2.5 text-body-sm',
};

const VARIANT_CLASSES: Record<PillVariant, string> = {
  surface:
    'bg-white border border-ink-200 text-ink-500',
  'glass-light':
    'bg-white/15 backdrop-blur-md border border-white/30 text-white',
  'glass-dark':
    'bg-black/40 backdrop-blur-md border border-white/15 text-white/80',
};

export const Pill: React.FC<PillProps> = ({
  icon,
  variant = 'surface',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const classes = [BASE, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Pill;
