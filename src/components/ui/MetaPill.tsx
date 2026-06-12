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
          <span className="inline-flex items-center justify-center shrink-0">{icon}</span>
        )}
        {text}
      </button>
    );
  }

  return (
    <span className={classes}>
      {icon && (
        <span className="inline-flex items-center justify-center shrink-0">{icon}</span>
      )}
      {text}
    </span>
  );
};

export default MetaPill;
