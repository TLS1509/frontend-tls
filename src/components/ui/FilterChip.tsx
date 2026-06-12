import React from 'react';
import {
  CHIP_BASE,
  CHIP_TONE_SOLID,
  CHIP_TONE_SOLID_ACTIVE,
  CHIP_TONE_HOVER,
} from './Chip';

/**
 * FilterChip — Interactive toggle chip with active state + optional count badge.
 *
 * Phase 19.A — refactored on top of Chip style tokens. Border kept at `border-[1.5px]`
 * (heavier than Chip's default border) because filter toggles need stronger visual
 * commitment than passive Pill/Tag chips.
 *
 * Variants:
 *   - default : solid tinted, primary tone when active (gradient + bold border)
 *   - reset   : passive neutral, no active state — used for "Clear filters" button
 *   - glass   : translucent white-alpha (hero overlays)
 */

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  count?: number;
  /** 'default' = solid surface · 'reset' = passive · 'glass' = glassmorphism */
  variant?: 'default' | 'reset' | 'glass';
  className?: string;
  'aria-label'?: string;
}

const BORDER_OVERRIDE = 'border-[1.5px]';
const INTERACTIVE_LIFT =
  'cursor-pointer hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2';

/* ── Glass surface — keeps its own classes (white-alpha logic distinct from solid tone) ─ */
const GLASS_INACTIVE =
  'bg-white/10 border-white/25 text-white/80 backdrop-blur-glass-light hover:bg-white/20 hover:border-white/40 hover:text-white focus-visible:outline-white/60';
const GLASS_ACTIVE =
  'bg-white/30 border-white/70 text-white font-bold shadow-xs hover:bg-white/35 focus-visible:outline-white/60';

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  icon,
  count,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const isGlass = variant === 'glass';
  const isReset = variant === 'reset';

  let stateClass: string;
  if (isGlass) {
    stateClass = active ? GLASS_ACTIVE : GLASS_INACTIVE;
  } else if (isReset) {
    // Reset: passive neutral with subtle hover, no active toggle
    stateClass = [CHIP_TONE_SOLID.neutral, CHIP_TONE_HOVER.neutral, 'focus-visible:outline-primary-500'].join(' ');
  } else {
    stateClass = active
      ? [CHIP_TONE_SOLID_ACTIVE.primary, 'focus-visible:outline-primary-500'].join(' ')
      : [CHIP_TONE_SOLID.neutral, CHIP_TONE_HOVER.neutral, 'focus-visible:outline-primary-500'].join(' ');
  }

  const classes = [
    CHIP_BASE,
    // FilterChip uses its own padding (heavier touch target than passive chips)
    'gap-tight.5 px-3.5 py-2 min-h-touch text-caption font-semibold',
    BORDER_OVERRIDE,
    INTERACTIVE_LIFT,
    stateClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const countBg = isGlass
    ? active
      ? 'bg-white/40 text-white'
      : 'bg-white/20 text-white/80'
    : active
      ? 'bg-primary-500 text-white'
      : 'bg-ink-200 text-ink-700';

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-pressed={!isReset ? active : undefined}
      aria-label={ariaLabel}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      {label}
      {count !== undefined && (
        <span
          className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-pill text-[0.625rem] font-bold leading-none ml-0.5 ${countBg}`}
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;
