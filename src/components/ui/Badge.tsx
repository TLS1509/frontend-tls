import React from 'react';
import { Lock, Circle, Play, Check, X, TrendingUp, Star, Sparkles, Award, Zap } from 'lucide-react';

// ─── Badge (status text) ───────────────────────────────────────────────────

export type BadgeVariant =
  | 'brand'
  | 'neutral'
  | 'warm'
  | 'sun'
  | 'success'
  | 'danger'
  | 'info';

/* Les tailles ne s'appellent plus sm/md/lg, et c'est délibéré.

   `Chip` — donc `MetaPill`, `Tag`, `FilterChip` — porte les MÊMES noms pour des
   hauteurs différentes : un Badge `md` mesurait 20 px quand un Chip `md` en fait
   30. On comparait deux échelles qui ne parlent pas de la même chose, et l'écart
   se lisait comme un défaut d'alignement alors qu'il est voulu : un badge annote
   et doit rester compact, une pastille de méta porte une donnée et peut respirer.

   Des noms propres à la famille lèvent la confusion sans toucher aux hauteurs.
   Renommé le 2026-09-10. */
export type BadgeSize = 'compact' | 'normal' | 'large';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  text?: React.ReactNode;
  /** @deprecated Use variant. `primary` maps to `brand`. */
  color?: BadgeVariant | 'primary';
}

const mapLegacyColor = (color?: BadgeVariant | 'primary'): BadgeVariant => {
  if (color === 'primary' || !color) return 'brand';
  return color;
};

const BASE =
  'inline-flex items-center gap-tight rounded-pill font-body font-bold uppercase leading-tight whitespace-nowrap border';

/* Un seul serrage, pris au token `--tracking-label`. Les trois valeurs
   arbitraires précédentes — 0,06 · 0,05 · 0,04 — n'étaient pas une courbe :
   les deux premières s'appliquaient au MÊME corps de 11 px. */
const SIZE_CLASSES: Record<BadgeSize, string> = {
  compact: 'text-micro px-2 py-0.5 tracking-label',   // ~18 px
  normal:  'text-micro px-2.5 py-0.5 tracking-label', // ~20 px — le défaut
  large:   'text-caption px-3 py-1 tracking-label',   // ~28 px
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-50 text-primary-800 border-primary-200',
  neutral:  'bg-ink-50 text-ink-700 border-ink-200',
  warm:     'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:      'bg-accent-50 text-accent-800 border-accent-200',
  success:  'bg-success-bg text-success-fg border-success-base/30',
  danger:   'bg-danger-bg text-danger-fg border-danger-base/30',
  info:     'bg-info-bg text-info-fg border-info-base/30',
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  brand:    'bg-primary-500',
  neutral:  'bg-ink-400',
  warm:     'bg-secondary-500',
  sun:      'bg-accent-500',
  success:  'bg-success-base',
  danger:   'bg-danger-base',
  info:     'bg-info-base',
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  color,
  size = 'normal',
  dot = false,
  text,
  className = '',
  children,
  ...rest
}) => {
  const resolvedVariant: BadgeVariant = variant ?? mapLegacyColor(color);
  const classes = [BASE, SIZE_CLASSES[size], VARIANT_CLASSES[resolvedVariant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && (
        <span
          aria-hidden
          className={`w-1.5 h-1.5 rounded-pill shrink-0 ${DOT_CLASSES[resolvedVariant]}`}
        />
      )}
      {children ?? text}
    </span>
  );
};

export default Badge;

// ─── StatusBadge (lesson state indicator with icon) ────────────────────────

export type StatusBadgeStatus =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'completed'
  | 'failed';

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const STATUS_LABELS: Record<StatusBadgeStatus, string> = {
  locked:       'Verrouillé',
  available:    'Disponible',
  'in-progress':'En cours',
  completed:    'Terminé',
  failed:       'Échoué',
};

const STATUS_CLASSES: Record<StatusBadgeStatus, string> = {
  locked:        'bg-ink-100 text-ink-500 border-ink-200',
  available:     'bg-primary-50 text-primary-700 border-primary-200',
  'in-progress': 'bg-primary-100 text-primary-800 border-primary-300 shadow-brand-xs',
  completed:     'bg-success-bg text-success-fg border-success-base/30',
  failed:        'bg-danger-bg text-danger-fg border-danger-base/30',
};

const STATUS_SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-1.5 py-0.5 gap-tight',
  md: 'text-caption px-2 py-1 gap-stack-2xs',
};

const STATUS_ICON_SIZE: Record<'sm' | 'md', number> = { sm: 10, md: 12 };

const StatusIcon: React.FC<{ status: StatusBadgeStatus; size: number }> = ({ status, size }) => {
  const props = { size, strokeWidth: 2 };
  switch (status) {
    case 'locked':       return <Lock {...props} />;
    case 'available':    return <Circle {...props} />;
    case 'in-progress':  return <Play size={size} fill="currentColor" strokeWidth={0} />;
    case 'completed':    return <Check {...props} strokeWidth={2.5} />;
    case 'failed':       return <X {...props} strokeWidth={2.5} />;
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  const iconSize = STATUS_ICON_SIZE[size];
  const label = STATUS_LABELS[status];

  const classes = [
    'inline-flex items-center justify-center font-semibold border rounded-pill whitespace-nowrap',
    STATUS_SIZE_CLASSES[size],
    STATUS_CLASSES[status],
    !showLabel && 'aspect-square px-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="status" aria-label={label}>
      <StatusIcon status={status} size={iconSize} />
      {showLabel && <span>{label}</span>}
    </span>
  );
};

/* TrendingBadge a été retiré le 2026-09-10 : zéro usage dans le produit.

   Ses onze occurrences vivaient toutes dans la vitrine, qui le montrait —
   c'est-à-dire qu'il n'existait que pour être exposé. Le CLAUDE.md annonçait
   trois exports publics ici ; il en reste deux, Badge et StatusBadge.

   StatusBadge reste malgré son unique consommateur : il n'est pas un doublon de
   Badge mais encode les cinq états d'une leçon — verrouillée, disponible, en
   cours, terminée, échouée — avec leur icône. C'est du vocabulaire de domaine,
   dont l'app aura besoin quand le corpus de formation arrivera. Le retirer pour
   économiser un usage échangerait un concept contre des lignes. */
