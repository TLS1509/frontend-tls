import React from 'react';
import { X } from 'lucide-react';
import {
  CHIP_BASE,
  CHIP_SIZE,
  CHIP_TONE_SOLID,
  CHIP_SURFACE_MAP,
  type ChipTone,
} from './Chip';

/**
 * Tag — Removable filter chip with optional leading icon + X dismiss button.
 *
 * Phase 19.A — refactored on top of Chip style tokens. The nested remove `<button>`
 * stays here (can't go through Chip's trailingIcon slot — needs its own focus management
 * + click-stop-propagation).
 *
 * Tones: neutral / primary / warm / sun.
 * Surfaces: default (tinted solid) / glass (translucent on colored bg).
 */

export type TagTone = ChipTone;
export type TagSurface = 'default' | 'glass';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  leadingIcon?: React.ReactNode;
  tone?: TagTone;
  /** 'glass' = glassmorphism — use on colored/gradient backgrounds */
  surface?: TagSurface;
}

const REMOVE_HOVER: Record<TagTone, string> = {
  neutral: 'hover:bg-ink-200 hover:text-ink-900',
  primary: 'hover:bg-primary-100 hover:text-primary-900',
  warm:    'hover:bg-secondary-100 hover:text-secondary-800',
  sun:     'hover:bg-accent-100 hover:text-accent-900',
  brand:   'hover:bg-primary-100 hover:text-primary-900',
};

const GLASS_REMOVE_HOVER = 'hover:bg-white/25 hover:text-white';

export const Tag: React.FC<TagProps> = ({
  onRemove,
  leadingIcon,
  tone = 'neutral',
  surface = 'default',
  className = '',
  children,
  ...rest
}) => {
  const isGlass = surface === 'glass';

  const classes = [
    CHIP_BASE,
    CHIP_SIZE.md, // Tag is always md
    'transition-colors',
    isGlass ? CHIP_SURFACE_MAP['glass-light'] : CHIP_TONE_SOLID[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {leadingIcon && (
        <span className="inline-flex items-center shrink-0 opacity-75">{leadingIcon}</span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label="Retirer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={[
            'inline-flex items-center justify-center w-4 h-4 -mr-0.5 rounded-full bg-transparent border-0 p-0 cursor-pointer text-current transition-colors',
            'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500',
            isGlass ? GLASS_REMOVE_HOVER : REMOVE_HOVER[tone],
          ].join(' ')}
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
};

export default Tag;
