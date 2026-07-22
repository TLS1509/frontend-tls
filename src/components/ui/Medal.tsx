import React from 'react';
import { Trophy } from 'lucide-react';

/**
 * Medal — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Achievement representation: circle with inset dashed ring.
 * Rule: Warm gradient = unlocked. Brand deep = special/rare. Ink gray = locked.
 */

export type MedalSize = 'sm' | 'md' | 'lg';
export type MedalVariant = 'default' | 'brand' | 'locked' | 'gold' | 'silver' | 'bronze';

export interface MedalProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: MedalSize;
  variant?: MedalVariant;
  icon?: React.ReactNode;
  /** Accessible label (e.g. name of achievement) */
  label?: string;
}

const SIZE_CLASSES: Record<MedalSize, string> = {
  sm: 'w-[72px] h-[72px]',
  md: 'w-[120px] h-[120px]',
  lg: 'w-[160px] h-[160px]',
};

/**
 * VARIANT_CLASSES — tokens TLS pour `default` (warm) et `brand` (primary).
 * `gold/silver/bronze/locked` gardent leurs couleurs symboliques (or/argent/bronze réels).
 */
const VARIANT_CLASSES: Record<MedalVariant, string> = {
  // TLS tokens : default = secondary gradient warm, brand = primary radial deep
  default: 'bg-gradient-to-br from-secondary-500 to-accent-400 text-white shadow-[0_10px_30px_-10px_rgba(237,132,58,0.35),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-6px_18px_rgba(0,0,0,0.12)]',
  brand:   'bg-[radial-gradient(circle_at_0%_0%,var(--color-primary-500)_0%,var(--color-primary-800)_60%,var(--color-primary-900)_100%)] text-white shadow-[0_10px_30px_-10px_rgba(85,161,180,0.45),inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-6px_18px_rgba(0,0,0,0.18)]',
  locked:  'bg-ink-200 text-ink-500 shadow-none',
  // Symboliques : couleurs réelles or/argent/bronze, intentionnellement hors palette TLS
  gold:    'bg-[linear-gradient(135deg,#FFD700_0%,#FFA500_100%)] text-white shadow-[0_10px_30px_-10px_rgba(255,165,0,0.45),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-6px_18px_rgba(0,0,0,0.12)]',
  silver:  'bg-[linear-gradient(135deg,#C0C0C0_0%,#A8A8A8_100%)] text-white shadow-[0_10px_30px_-10px_rgba(160,160,160,0.45),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-6px_18px_rgba(0,0,0,0.12)]',
  bronze:  'bg-[linear-gradient(135deg,#CD7F32_0%,#A06022_100%)] text-white shadow-[0_10px_30px_-10px_rgba(160,96,34,0.45),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-6px_18px_rgba(0,0,0,0.12)]',
};

export const Medal: React.FC<MedalProps> = ({
  size = 'md',
  variant = 'default',
  icon,
  label,
  className = '',
  ...rest
}) => {
  const classes = [
    'relative rounded-full inline-flex items-center justify-center shrink-0',
    '[&>svg]:relative [&>svg]:w-[44%] [&>svg]:h-[44%]',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={label} {...rest}>
      {icon ?? <Trophy strokeWidth={2} />}
    </span>
  );
};

export default Medal;
