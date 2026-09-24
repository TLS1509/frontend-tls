/**
 * QuickActionButton — Compact action button (icon + label + chevron).
 *
 * Pattern reproductible : button-shaped card avec icon bubble tone + label + chevron right.
 * Tone-aware (primary / warm / sun / accent). Disabled state supporté.
 *
 * Use cases :
 *  - Coaching page "Outils de coaching" (3 quick actions tone-différenciées)
 *  - Dashboard quick links
 *  - Profile shortcuts
 *  - Settings access tiles
 *
 * Comparé à :
 *  - <Button> : trop small + pas de card feel (juste pill/rect)
 *  - <ActionCard> : trop large (p-6 horizontal) + pas un button sémantique
 *  - <IconFeatureCard> : trop large (p-8 vertical centered)
 *
 * QuickActionButton tient entre les deux : compact mais avec card surface +
 * sémantique button (onClick, disabled, focus-visible).
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IconChip, type IconChipTone, type IconChipSurface } from './IconChip';

export type QuickActionTone = 'primary' | 'warm' | 'sun' | 'accent';
export type QuickActionSurface = 'card' | 'tinted' | 'glass' | 'frosted';

export interface QuickActionButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icône Lucide. Sa taille propre est ignorée : la pastille (IconChip md) la met à 20 px. */
  icon: React.ReactNode;
  /** Main label — 1 line, bold. */
  label: string;
  /** Optional short subtitle below label (1 line, caption text). */
  subtitle?: string;
  /** Tone — drives icon bubble + border + chevron color. */
  tone?: QuickActionTone;
  /** Surface treatment — card (default solid), tinted, glass, frosted. */
  surface?: QuickActionSurface;
}

/* La pastille est un `IconChip` md (40 px, `rounded-md`) depuis le 2026-09-24 —
   arbitrage n°3 : elle était faite main, à 14 px de rayon, glyphe au cran 600.
   Sur la surface `tinted` (voile du cran 50), elle monte au cran 100 pour ne
   pas se fondre dans le bouton (arbitrage n°10). */
const TONE_PASTILLE: Record<QuickActionTone, IconChipTone> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
  accent:  'sun',
};

const SURFACE_PASTILLE: Record<QuickActionSurface, IconChipSurface> = {
  card:    'default',
  tinted:  'tinted',
  glass:   'default',
  frosted: 'default',
};

const TONE_CHEVRON: Record<QuickActionTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  accent:  'text-accent-700',
};

const TONE_FOCUS: Record<QuickActionTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-400',
  sun:     'focus-visible:outline-accent-500',
  accent:  'focus-visible:outline-accent-500',
};

const SURFACE_TONE: Record<QuickActionSurface, Record<QuickActionTone, string>> = {
  card: {
    primary: 'bg-white border-primary-100 hover:border-primary-300',
    warm:    'bg-white border-secondary-100 hover:border-secondary-300',
    sun:     'bg-white border-accent-200 hover:border-accent-400',
    accent:  'bg-white border-accent-200 hover:border-accent-400',
  },
  tinted: {
    primary: 'bg-primary-50/60 border-primary-100 hover:bg-primary-50 hover:border-primary-200',
    warm:    'bg-secondary-50/60 border-secondary-100 hover:bg-secondary-50 hover:border-secondary-200',
    sun:     'bg-accent-50/70 border-accent-200 hover:bg-accent-50 hover:border-accent-300',
    accent:  'bg-accent-50/70 border-accent-200 hover:bg-accent-50 hover:border-accent-300',
  },
  glass: {
    primary: 'bg-white/70 backdrop-blur-glass-light border-white/60 hover:bg-white/85 shadow-xs',
    warm:    'bg-white/70 backdrop-blur-glass-light border-white/60 hover:bg-white/85 shadow-xs',
    sun:     'bg-white/70 backdrop-blur-glass-light border-white/60 hover:bg-white/85 shadow-xs',
    accent:  'bg-white/70 backdrop-blur-glass-light border-white/60 hover:bg-white/85 shadow-xs',
  },
  frosted: {
    primary: 'bg-primary-100/40 backdrop-blur-glass-medium border-primary-200/50 hover:bg-primary-100/55 shadow-sm',
    warm:    'bg-secondary-100/40 backdrop-blur-glass-medium border-secondary-200/50 hover:bg-secondary-100/55 shadow-sm',
    sun:     'bg-accent-100/45 backdrop-blur-glass-medium border-accent-200/50 hover:bg-accent-100/60 shadow-sm',
    accent:  'bg-accent-100/45 backdrop-blur-glass-medium border-accent-200/50 hover:bg-accent-100/60 shadow-sm',
  },
};

/* Rayon de contrôle, 14 px (`rounded-lg`) — corrigé le 2026-09-24. Il portait
   le rayon d'une carte (20) : c'est un bouton, l'étage interactif de l'échelle
   (doctrine § Rayons). À 20, la pastille posée à 17 × 18 px du coin tombait
   dans le régime concentrique et aurait dû s'arrondir à 2 px — 4 coins hors
   règle sur la vitrine. À 14, le retrait dépasse le rayon : la pastille garde
   le sien (forme fixe). */
const BASE =
  'group flex items-center gap-stack-xs w-full px-stack py-stack-sm rounded-lg border text-left cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-base ease-emphasis hover:shadow-sm active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-disabled disabled:cursor-not-allowed disabled:hover:shadow-none';

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  subtitle,
  tone = 'primary',
  surface = 'card',
  className = '',
  disabled,
  ...rest
}) => {
  const classes = [
    BASE,
    SURFACE_TONE[surface][tone],
    TONE_FOCUS[tone],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      <IconChip size="md" tone={TONE_PASTILLE[tone]} surface={SURFACE_PASTILLE[surface]}>
        {icon}
      </IconChip>

      {/* Label + optional subtitle — libellé 16/700, 4 px, sous-titre en
          légende ink-600 (la méta : ink-500 est réservé aux placeholders). */}
      <span className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
        <span className="font-display text-body font-bold text-ink-900 truncate">
          {label}
        </span>
        {subtitle && (
          <span className="font-body text-caption text-ink-600 truncate">
            {subtitle}
          </span>
        )}
      </span>

      {/* Chevron */}
      <ChevronRight
        size={18}
        strokeWidth={2.25}
        aria-hidden="true"
        className={[
          'shrink-0 transition-[transform] duration-fast ease-emphasis group-hover:translate-x-0.5 group-disabled:hidden',
          TONE_CHEVRON[tone],
        ].join(' ')}
      />
    </button>
  );
};

export default QuickActionButton;
