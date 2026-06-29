/**
 * Chip — shared primitive behind Pill, Tag, FilterChip, MetaPill.
 *
 * Owns the common chip vocabulary (rounded-pill, sizes, tone-tints, glass variants,
 * focus-visible, hover lift). The 4 public wrappers (Pill / Tag / FilterChip / MetaPill)
 * are thin façades that consume Chip + add their specialized affordances (remove button,
 * active toggle, count badge, etc.).
 *
 * Why keep 4 wrappers and not collapse into one Chip:
 *   - Pill's children is ReactNode (free composition); MetaPill's text is string (constrained)
 *   - Tag has a removable X button (nested control)
 *   - FilterChip has active toggle + count badge
 *   - The 4 APIs are intentionally narrow per consumer — Chip stays internal.
 *
 * Style tokens (CHIP_BASE, CHIP_SIZE, CHIP_TONE_*, CHIP_SURFACE) are also exported so
 * wrappers can pick what they need without rendering the Chip component itself, when
 * their structure needs to diverge (e.g. Tag's nested remove button can't go through
 * Chip's standard trailingIcon slot because it has its own focus management).
 */

import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type ChipSize = 'sm' | 'md' | 'lg';

/** Tonal solid surface (with hairline border). */
export type ChipTone = 'neutral' | 'primary' | 'warm' | 'sun' | 'brand';

/**
 * Surface family:
 *  - `solid`       — opaque tinted (uses tone)
 *  - `solid-active`— gradient + bolder border (uses tone) — FilterChip active
 *  - `solid-white` — white bg + ink border — Pill surface variant
 *  - `glass-light` — frosted on colored bg (hero overlay)
 *  - `glass-dark`  — frosted on dark/media (alpha black bg)
 *  - `glass-tinted`— frosted with light alpha — MetaPill glass
 */
export type ChipSurface =
  | 'solid'
  | 'solid-active'
  | 'solid-white'
  | 'glass-light'
  | 'glass-dark'
  | 'glass-tinted';

// ─── Shared style constants ─────────────────────────────────────────────────

export const CHIP_BASE =
  'inline-flex items-center rounded-pill font-body whitespace-nowrap transition-all border select-none';

export const CHIP_SIZE: Record<ChipSize, string> = {
  sm: 'gap-tight px-2 py-0.5 text-micro font-medium',
  md: 'gap-1.5 px-2.5 py-1 text-caption font-medium',
  lg: 'gap-stack-xs px-4 py-2 text-body-sm font-medium',
};

export const CHIP_TONE_SOLID: Record<ChipTone, string> = {
  neutral: 'bg-ink-50 text-ink-700 border-ink-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:     'bg-accent-50 text-accent-700 border-accent-200',
  brand:   'bg-primary-50 text-primary-700 border-primary-200',
};

export const CHIP_TONE_SOLID_ACTIVE: Record<ChipTone, string> = {
  neutral: 'bg-ink-100 text-ink-900 border-ink-300 font-bold',
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100/60 text-primary-800 border-primary-500 font-bold shadow-brand-xs',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100/60 text-secondary-800 border-secondary-500 font-bold',
  sun:     'bg-gradient-to-br from-accent-50 to-accent-100/60 text-accent-800 border-accent-500 font-bold',
  brand:   'bg-gradient-to-br from-primary-50 to-primary-100/60 text-primary-800 border-primary-500 font-bold shadow-brand-xs',
};

export const CHIP_TONE_HOVER: Record<ChipTone, string> = {
  neutral: 'hover:bg-ink-100 hover:border-ink-300 hover:text-ink-900',
  primary: 'hover:bg-primary-100 hover:border-primary-300 hover:text-primary-900',
  warm:    'hover:bg-secondary-100 hover:border-secondary-300 hover:text-secondary-800',
  sun:     'hover:bg-accent-100 hover:border-accent-300 hover:text-accent-900',
  brand:   'hover:bg-primary-100 hover:border-primary-300 hover:text-primary-900',
};

export const CHIP_SURFACE_MAP: Record<
  Exclude<ChipSurface, 'solid' | 'solid-active'>,
  string
> = {
  'solid-white':  'bg-white text-ink-500 border-ink-200',
  'glass-light':  'bg-white/15 backdrop-blur-glass-light text-white border-white/30',
  'glass-dark':   'bg-black/40 backdrop-blur-glass-light text-white/80 border-white/15',
  'glass-tinted': 'bg-white/55 text-ink-700 border-white/60 backdrop-blur-glass-light shadow-xs',
};

export const CHIP_INTERACTIVE =
  'cursor-pointer hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

// ─── Helper: resolve full class string for any chip configuration ───────────

export interface ResolveChipClassesArgs {
  size?: ChipSize;
  tone?: ChipTone;
  surface?: ChipSurface;
  interactive?: boolean;
  hover?: boolean;
}

export function resolveChipClasses({
  size = 'md',
  tone = 'neutral',
  surface = 'solid',
  interactive = false,
  hover = false,
}: ResolveChipClassesArgs): string {
  let surfaceClass: string;
  if (surface === 'solid') {
    surfaceClass = CHIP_TONE_SOLID[tone];
  } else if (surface === 'solid-active') {
    surfaceClass = CHIP_TONE_SOLID_ACTIVE[tone];
  } else {
    surfaceClass = CHIP_SURFACE_MAP[surface];
  }

  return [
    CHIP_BASE,
    CHIP_SIZE[size],
    surfaceClass,
    hover && surface === 'solid' && CHIP_TONE_HOVER[tone],
    interactive && CHIP_INTERACTIVE,
  ]
    .filter(Boolean)
    .join(' ');
}

// ─── Internal Chip primitive (for direct consumption when wrappers don't fit) ───

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  size?: ChipSize;
  tone?: ChipTone;
  surface?: ChipSurface;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  /** Renders `<button>` when true OR when `onClick` is provided. */
  asButton?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Chip — direct primitive. Pill / Tag / FilterChip / MetaPill use this OR the
 * exported style constants when their structure diverges (e.g. nested buttons).
 */
export const Chip: React.FC<ChipProps> = ({
  size = 'md',
  tone = 'neutral',
  surface = 'solid',
  active = false,
  leadingIcon,
  trailingIcon,
  onClick,
  asButton,
  className = '',
  children,
  ...rest
}) => {
  const isButton = asButton || !!onClick;
  const effectiveSurface = active ? 'solid-active' : surface;

  const classes = [
    resolveChipClasses({
      size,
      tone,
      surface: effectiveSurface,
      interactive: isButton,
      hover: isButton,
    }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (isButton) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={active ? true : undefined}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {leadingIcon && (
          <span className="inline-flex items-center shrink-0">{leadingIcon}</span>
        )}
        {children}
        {trailingIcon && (
          <span className="inline-flex items-center shrink-0">{trailingIcon}</span>
        )}
      </button>
    );
  }

  return (
    <span className={classes} {...rest}>
      {leadingIcon && (
        <span className="inline-flex items-center shrink-0">{leadingIcon}</span>
      )}
      {children}
      {trailingIcon && (
        <span className="inline-flex items-center shrink-0">{trailingIcon}</span>
      )}
    </span>
  );
};

export default Chip;
