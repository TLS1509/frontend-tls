/**
 * Chip — shared primitive behind FilterChip and MetaPill.
 *
 * Owns the common chip vocabulary (radius by size, sizes, tone-tints, glass variants,
 * focus-visible). The public wrappers (FilterChip / MetaPill) are thin façades that
 * consume Chip + add their specialized affordances (active toggle, count badge, etc.).
 * `Pill` and `Tag` were removed on 2026-09-10 (0 product usage).
 *
 * Why keep the wrappers and not collapse into one Chip:
 *   - MetaPill's text is string (constrained, card metadata)
 *   - FilterChip has active toggle + count badge, and is a control of the line (44 px)
 *   - The APIs are intentionally narrow per consumer — Chip stays internal.
 *
 * Style tokens (CHIP_BASE_SANS_RAYON, CHIP_RAYON, CHIP_SIZE, CHIP_TONE_*, CHIP_SURFACE)
 * are also exported so wrappers can pick what they need without rendering the Chip
 * component itself, when their structure needs to diverge.
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

/* Le rayon est posé À PART de la base (piège n°6 : deux classes de rayon sur un
   même élément, c'est l'ordre d'émission de Tailwind qui tranche). `Chip` et
   `MetaPill` prennent la base sans rayon et le rayon de LEUR TAILLE
   (`CHIP_RAYON`) ; `FilterChip`, contrôle de la ligne depuis l'arbitrage n°22
   (44 px en `md`), pose le sien. */
export const CHIP_BASE_SANS_RAYON =
  'inline-flex items-center font-body whitespace-nowrap transition-all border select-none';

/* Le rayon suit la taille — règle du seuil (R3, doctrine § Rayons), appliquée
   le 2026-09-24. Sous 28 px de haut, la pilule ; au-dessus, l'échelle
   (`rounded-lg`, 14). Les trois tailles étaient en pilule : `md` fait 30 px
   et `lg` 44 — celui-ci rendait un rayon de 22 à côté d'un champ et d'un
   bouton de même hauteur à 14. `sm` (24 px) reste une pilule, et `md` change
   à peine (14 contre 15) : c'est le cran 44 que la règle vise. */
export const CHIP_RAYON: Record<ChipSize, string> = {
  sm: 'rounded-pill', // 24 px
  md: 'rounded-lg',   // 30 px
  lg: 'rounded-lg',   // 44 px
};

/** @deprecated La pilule ne vaut que sous 28 px (taille `sm`) : prendre
 *  `CHIP_BASE_SANS_RAYON` + `CHIP_RAYON[size]`. Plus aucun consommateur. */
export const CHIP_BASE = `${CHIP_BASE_SANS_RAYON} rounded-pill`;

export const CHIP_SIZE: Record<ChipSize, string> = {
  sm: 'gap-tight px-2 py-0.5 text-micro font-medium',
  md: 'gap-stack-2xs px-2.5 py-1 text-caption font-medium',
  lg: 'gap-stack-xs px-4 py-2 text-body font-medium',
};

export const CHIP_TONE_SOLID: Record<ChipTone, string> = {
  neutral: 'bg-ink-50 text-ink-700 border-ink-200',
  // Label au cran 800 (règle « filet 700, label 800 ») : primary-700 sur
  // primary-50 mesurait 4,48 à 11 px, sous le seuil AA (audit du 23/09).
  primary: 'bg-primary-50 text-primary-800 border-primary-200',
  warm:    'bg-secondary-50 text-secondary-800 border-secondary-200',
  sun:     'bg-accent-50 text-accent-800 border-accent-200',
  brand:   'bg-primary-50 text-primary-800 border-primary-200',
};

/* État actif (FilterChip, Chip `active`) — le filet au cran 700 pour les
   quatre tons : arbitrage n°9 du 23/09, « tout état coché d'un contrôle est au
   cran 700 ». Au 500, le filet qui dit « choisi » mesurait 2,94:1 sur blanc,
   sous le 3:1 d'un contrôle (WCAG 1.4.11) ; le neutre au 300, 1,5:1.
   Pas de `font-bold` : l'état ne change pas la graisse (une par rôle), il ne
   faisait d'ailleurs rien — battu par la graisse de la taille. */
export const CHIP_TONE_SOLID_ACTIVE: Record<ChipTone, string> = {
  neutral: 'bg-ink-100 text-ink-900 border-ink-700',
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100/60 text-primary-800 border-primary-700 shadow-brand-xs',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100/60 text-secondary-800 border-secondary-700',
  sun:     'bg-gradient-to-br from-accent-50 to-accent-100/60 text-accent-800 border-accent-700',
  brand:   'bg-gradient-to-br from-primary-50 to-primary-100/60 text-primary-800 border-primary-700 shadow-brand-xs',
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
  'solid-white':  'bg-white text-ink-600 border-ink-200',
  'glass-light':  'bg-white/15 backdrop-blur-glass-light text-white border-white/30',
  'glass-dark':   'bg-black/40 backdrop-blur-glass-light text-white/80 border-white/15',
  'glass-tinted': 'bg-white/55 text-ink-700 border-white/60 backdrop-blur-glass-light shadow-xs',
};

/* Soulèvement retiré le 2026-09-17 (motif S1) : le survol d'un chip est déjà
   dit par CHIP_TONE_HOVER (fond) — le translate déplaçait la cible sous le
   curseur et n'existait pas au tactile. */
export const CHIP_INTERACTIVE =
  'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

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
    CHIP_BASE_SANS_RAYON,
    CHIP_RAYON[size],
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
