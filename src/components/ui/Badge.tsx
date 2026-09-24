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
  'inline-flex items-center gap-stack-3xs rounded-pill font-body font-bold uppercase leading-tight whitespace-nowrap border';

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

/* Largeur : le badge épouse son texte, où qu'on le pose (2026-09-24).
   `inline-flex` ne suffit pas : dans un parent `flex-col`, l'`align-items:
   stretch` par défaut l'étirait sur toute la colonne — « À VENIR · 2 JUIL. »
   sur 479 px au récap d'atelier, « 342 / 400 INSCRITS » sur 739 px au détail
   d'événement. `w-fit` et non `self-start` : ce dernier aurait aussi remonté
   le badge en haut de toutes les rangées `items-center`, où il est aligné sur
   le titre. Une largeur rend le `stretch` inopérant sans toucher l'axe
   vertical ; dans une grille, elle neutralise de même le `justify-items`.
   Si la page déclare sa propre largeur (`w-*`, `flex-1`, `grow`,
   `self-stretch`), on la lui laisse — deux classes de largeur sur le même
   élément, c'est l'ordre d'émission de Tailwind qui tranche (piège n°6). */
const OWN_WIDTH = /(^|\s)([a-z0-9]+:)*(w-|flex-1|grow|self-stretch)/;

/* Pas de mouvement permanent sur un état (arbitrage n°16) : le mot porte
   l'information, un badge ne pulse pas. Les classes `animate-*` passées par
   la page sont donc ignorées — le point `dot` est fixe. */
const ANIMATION = /^([a-z0-9-]+:)*animate-/;

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
  const pageClasses = className
    .split(/\s+/)
    .filter((c) => c && !ANIMATION.test(c))
    .join(' ');
  const classes = [
    BASE,
    OWN_WIDTH.test(pageClasses) ? '' : 'w-fit',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[resolvedVariant],
    pageClasses,
  ]
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
  // ink-600 et non ink-500 : un état verrouillé reste un texte lisible (ink-500
  // est réservé aux textes indicatifs, et tombait près de 4,5:1 sur ink-100).
  locked:        'bg-ink-100 text-ink-600 border-ink-200',
  available:     'bg-primary-50 text-primary-800 border-primary-200',
  'in-progress': 'bg-primary-100 text-primary-800 border-primary-300 shadow-brand-xs',
  completed:     'bg-success-bg text-success-fg border-success-base/30',
  failed:        'bg-danger-bg text-danger-fg border-danger-base/30',
};

/* Les deux crans parlent au corps des étiquettes (11 px) : en capitales et en
   700, le 13 px du cran `md` criait plus fort que tous les Badge de l'app —
   un état n'a qu'un registre. Le cran ne règle plus que le padding et
   l'icône ; sans libellé, la pastille md passe de 30 à 28 px. */
const STATUS_SIZE_CLASSES: Record<'sm' | 'md', string> = {
  sm: 'text-micro px-1.5 py-0.5 gap-tight',
  md: 'text-micro px-2 py-1 gap-stack-2xs',
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

  /* Le registre de Badge — capitales, 700, `tracking-label` (2026-09-24).
     StatusBadge dit un ÉTAT, comme Badge, mais parlait en 600 et en casse
     normale — le registre d'une donnée — donc « En cours » se lisait comme
     une pastille de méta à côté d'un « EN COURS » de Badge. Sans libellé,
     rien ne change : l'icône seule. */
  const classes = [
    'inline-flex items-center justify-center font-bold uppercase tracking-label border rounded-pill whitespace-nowrap',
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
