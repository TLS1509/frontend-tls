import React from 'react';
import {
  CHIP_BASE,
  CHIP_SIZE,
  CHIP_TONE_SOLID,
  CHIP_SURFACE_MAP,
  CHIP_INTERACTIVE,
  type ChipSize,
} from './Chip';

/**
 * MetaPill — Metadata chip used in cards (tone-tinted bg-50 + matching border).
 *
 * Phase 19.A — refactored on top of Chip style tokens. Uses `text: string` (not children)
 * so it stays narrow by design for card metadata rows. When clickable, becomes a real
 * `<button>` (previous role="button" span was an a11y anti-pattern).
 *
 * Tones: neutral / primary / warm / sun / brand / success / danger / info + glass / glass-dark.
 * Note: `default` is a deprecated alias for `neutral`.
 */

export type MetaPillTone =
  | 'neutral'    // canonical name (matches Figma DS)
  | 'default'    // @deprecated alias → neutral (backward compat)
  | 'primary'
  | 'warm'
  | 'sun'
  | 'brand'
  | 'success'    // semantic success (muted teal-green bg)
  | 'danger'     // semantic danger (soft coral bg)
  | 'info'       // semantic info (TLS primary bg)
  | 'glass'
  | 'glass-dark';

export type MetaPillSize = ChipSize;

export interface MetaPillProps {
  text: string;
  icon?: React.ReactNode;
  tone?: MetaPillTone;
  size?: MetaPillSize;
  onClick?: () => void;
  className?: string;
}

const ICON_OPACITY = '[&_svg]:opacity-75';

function resolveSurface(tone: MetaPillTone): string {
  switch (tone) {
    case 'neutral':
    case 'default':
      return CHIP_TONE_SOLID.neutral;
    case 'primary':
    case 'brand':
      return CHIP_TONE_SOLID.primary;
    case 'warm':
      return CHIP_TONE_SOLID.warm;
    case 'sun':
      return CHIP_TONE_SOLID.sun;
    case 'success':
      return 'bg-success-bg text-success-fg border-success-base/40';
    case 'danger':
      return 'bg-danger-bg text-danger-fg border-danger-base/40';
    case 'info':
      return 'bg-info-bg text-info-fg border-info-base/40';
    case 'glass':
      return CHIP_SURFACE_MAP['glass-tinted'];
    case 'glass-dark':
      // softer alphas than Pill's full dark variant
      return 'bg-white/15 text-white border-white/25 backdrop-blur-glass-light shadow-xs';
    default:
      return CHIP_TONE_SOLID.neutral;
  }
}

/* La pastille impose la taille de son icône.

   Elle recevait un ReactNode et le rendait tel quel : chaque appelant devait
   penser à la taille, et une icône Lucide sans `size` vaut 24 px par défaut —
   dix de trop à côté d'un texte de 13. Mesuré dans la vitrine le 2026-09-10.

   `icon-2xs` (14 px) est le cran apparié à `caption`, selon la table de
   src/lib/icon-pairing.ts. `[&>svg]` force le glyphe à remplir la boîte, donc
   la taille passée par l'appelant n'a plus d'effet — et n'a plus à être juste. */
const ICONE_PASTILLE_BASE =
  'inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full';

/* Le cran suit la TAILLE de la pastille, pas une valeur unique : Chip rend
   `text-micro` en sm, `text-caption` en md, `text-body-sm` en lg — et
   l'appariement de src/lib/icon-pairing.ts leur donne 14, 14 et 16. */
const ICONE_PASTILLE_CRAN: Record<MetaPillSize, string> = {
  sm: 'icon-2xs',  // avec micro (11)
  md: 'icon-2xs',  // avec caption (13)
  lg: 'icon-xs',   // avec body-sm (15)
};

export const MetaPill: React.FC<MetaPillProps> = ({
  text,
  icon,
  tone = 'default',
  size = 'md',
  onClick,
  className = '',
}) => {
  const interactive = !!onClick;

  const classes = [
    CHIP_BASE,
    CHIP_SIZE[size],
    resolveSurface(tone),
    ICON_OPACITY,
    interactive && CHIP_INTERACTIVE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (interactive) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {icon && (
          <span className={`${ICONE_PASTILLE_BASE} ${ICONE_PASTILLE_CRAN[size]}`}>{icon}</span>
        )}
        {text}
      </button>
    );
  }

  return (
    <span className={classes}>
      {icon && (
        <span className={`${ICONE_PASTILLE_BASE} ${ICONE_PASTILLE_CRAN[size]}`}>{icon}</span>
      )}
      {text}
    </span>
  );
};

export default MetaPill;
