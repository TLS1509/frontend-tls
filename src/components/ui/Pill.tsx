import React from 'react';
import { CHIP_BASE, CHIP_SIZE, CHIP_SURFACE_MAP, type ChipSize } from './Chip';

/**
 * Pill — Generic chip with icon + text on white/glass surfaces.
 *
 * Phase 19.A — refactored on top of Chip primitive (shared `CHIP_*` style tokens).
 * Public API unchanged; surface tokens reused for visual consistency with Tag, MetaPill, FilterChip.
 *
 * Differs from:
 *   - Badge (uppercase status indicator, micro size)
 *   - MetaPill (metadata in cards, tone-tinted bg-50)
 *   - FilterChip (interactive tab/filter with active state)
 *
 * Variants:
 *   - surface     : white bg + ink border (Login/Signup/Help banners)
 *   - glass-light : translucent white + backdrop-blur (on colored hero)
 *   - glass-dark  : translucent black + backdrop-blur (on media overlay)
 */

export type PillVariant = 'surface' | 'glass-light' | 'glass-dark';
export type PillSize = ChipSize;

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
  variant?: PillVariant;
  size?: PillSize;
}

const VARIANT_TO_SURFACE: Record<PillVariant, keyof typeof CHIP_SURFACE_MAP> = {
  surface:       'solid-white',
  'glass-light': 'glass-light',
  'glass-dark':  'glass-dark',
};

export const Pill: React.FC<PillProps> = ({
  icon,
  variant = 'surface',
  size = 'md',
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    CHIP_BASE,
    CHIP_SIZE[size],
    CHIP_SURFACE_MAP[VARIANT_TO_SURFACE[variant]],
    className,
  ]
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
