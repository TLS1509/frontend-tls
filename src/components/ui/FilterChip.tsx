import React from 'react';
import {
  CHIP_BASE_SANS_RAYON,
  CHIP_TONE_SOLID,
  CHIP_TONE_SOLID_ACTIVE,
  CHIP_TONE_HOVER,
} from './Chip';

/** Active-state tone — inactive chips are always neutral; tone only colours the active state. */
export type FilterChipTone = 'primary' | 'warm' | 'sun' | 'neutral';

const COUNT_BG_ACTIVE: Record<FilterChipTone, string> = {
  primary: 'bg-primary-700 text-white',
  warm:    'bg-secondary-700 text-white',
  sun:     'bg-accent-400 text-ink-900',
  neutral: 'bg-ink-900 text-white',
};

export type FilterChipSize = 'sm' | 'md';

/* Tailles — arbitrage n°22 du 2026-09-24.
   `md` est un CONTRÔLE DE LA LIGNE : 44 px, la hauteur du `Button md`, de
   l'`Input md` et de la `Search md` qu'il côtoie dans les barres de filtres.
   Son libellé passe à 16 (le texte saisi à côté est à 16, le libellé du
   bouton aussi) : à 13 dans 44 px, la pastille paraissait vide. `sm` reste
   compact pour les barres d'outils denses (28 px, 13 — l'ancien 11 était le
   pas `micro`, réservé aux étiquettes en capitales).
   Graisse 600 aux deux états, une seule par rôle (doctrine) : l'actif se dit
   par le fond et le filet au cran 700, pas par un gras qui fait bouger le
   texte. Le `font-bold` de l'état actif ne s'appliquait d'ailleurs pas —
   battu par le `font-semibold` de la taille (piège n°6). */
const SIZE_MAP: Record<FilterChipSize, string> = {
  sm: 'min-h-7 gap-stack-3xs px-stack-sm text-caption font-semibold [&_svg]:size-3.5',
  md: 'min-h-touch gap-stack-xs px-stack text-body font-semibold [&_svg]:size-4.5',
};

/* Rayon — R3 : au-dessus de 28 px, l'échelle. À 44 px, la pilule n'était plus
   un accident de plafonnement mais une troisième forme dans une barre où le
   champ de recherche et le bouton sont à 14 : trois objets de même hauteur,
   deux courbes. Comparé à l'œil le 24/09 sur /coach/apprenants (pilule et 14,
   libellé 13 et 16) : à 14, champ et filtres se lisent comme un seul outil.
   Sous 28 px (`sm`), le navigateur plafonne le rayon à la moitié de la
   hauteur : la forme reste une pilule, sans exception à écrire. */
const RAYON = 'rounded-lg';

const COUNT_SIZE: Record<FilterChipSize, string> = {
  sm: 'min-w-4.5 h-4.5 px-1',
  md: 'min-w-5 h-5 px-1.5',
};

/**
 * FilterChip — Interactive toggle chip with active state + optional count badge.
 *
 * Phase 19.A — refactored on top of Chip style tokens. Filet de 1 px : le
 * `border-[1.5px]` annoncé ici n'a jamais rendu (battu par le `border` de la
 * base, même spécificité) — retiré le 2026-09-24, rendu inchangé.
 *
 * Variants:
 *   - default : solid tinted, primary tone when active (gradient + bold border)
 *   - reset   : passive neutral, no active state — used for "Clear filters" button
 *   - glass   : voile sombre au repos, verre clair à encre foncée actif (heroes 700+)
 */

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  count?: number;
  /** 'default' = solid surface · 'reset' = passive · 'glass' = glassmorphism */
  variant?: 'default' | 'reset' | 'glass';
  /** Active-state colour (default variant only). Default `primary`. */
  tone?: FilterChipTone;
  /** `md` (default, 44px touch) · `sm` (compact toolbars). */
  size?: FilterChipSize;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

/* Le nom historique portait un « lift » — retiré le 2026-09-17 (motif S1) :
   le feedback de survol vit dans les tone maps (fond), pas dans un translate. */
const INTERACTIVE_LIFT =
  'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2';

/* ── Glass surface — keeps its own classes (voile logic distinct from solid tone) ─
   Contrat : un hero au cran 700 ou plus sombre (doctrine `onDark`).

   ⚠️ Corrigé le 2026-09-23 — le verre posait un voile BLANC sous un texte blanc,
   la contradiction que la doctrine nomme pour le compteur de la nav : un voile
   clair éclaircit le fond, le texte blanc réclame du sombre. Mesuré sur la
   vitrine, arrêt le plus clair d'un hero 700→800 : repos 2,62 (blanc/80 sur
   blanc/10), actif 2,38 (blanc sur blanc/30), compteurs 1,63.
   Désormais les deux états s'opposent, comme les deux niveaux `onDark` de
   Button : au repos un voile SOMBRE et du blanc plein ; actif un verre CLAIR à
   encre foncée. */
const GLASS_INACTIVE =
  'bg-ink-900/20 border-white/40 text-white backdrop-blur-glass-light hover:bg-ink-900/30 hover:border-white/60 focus-visible:outline-white/60';
const GLASS_ACTIVE =
  'bg-white/90 border-white text-ink-900 shadow-xs hover:bg-white focus-visible:outline-white/60';

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  icon,
  count,
  variant = 'default',
  tone = 'primary',
  size = 'md',
  disabled = false,
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
      ? [CHIP_TONE_SOLID_ACTIVE[tone], 'focus-visible:outline-primary-500'].join(' ')
      : [CHIP_TONE_SOLID.neutral, CHIP_TONE_HOVER.neutral, 'focus-visible:outline-primary-500'].join(' ');
  }

  const classes = [
    CHIP_BASE_SANS_RAYON,
    RAYON,
    // FilterChip uses its own padding (heavier touch target than passive chips)
    SIZE_MAP[size],
    INTERACTIVE_LIFT,
    stateClass,
    disabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const countBg = isGlass
    ? active
      ? 'bg-ink-900 text-white'
      : 'bg-ink-900/30 text-white'
    : active
      ? COUNT_BG_ACTIVE[tone]
      : 'bg-ink-200 text-ink-700';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-pressed={!isReset ? active : undefined}
      aria-label={ariaLabel}
    >
      {icon && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      {label}
      {count !== undefined && (
        <span
          className={`inline-flex items-center justify-center ${COUNT_SIZE[size]} rounded-pill text-micro font-bold tabular-nums ${countBg}`}
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;
