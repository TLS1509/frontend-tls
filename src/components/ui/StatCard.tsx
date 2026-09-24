import React from 'react';

/**
 * StatCard — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Prominent learning metric. Display number, micro uppercase label, optional delta.
 * Variants: default / elevated / warm / brand / sun
 * Sizes: sm / md / lg
 * Square: aspect-square for grid layouts (content should stay short)
 */

export type StatCardVariant = 'default' | 'elevated' | 'warm' | 'brand' | 'sun';
export type StatCardTone = 'neutral' | 'brand' | 'warm' | 'sun';
export type StatCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';
export type StatValueColor = 'default' | 'warm' | 'brand';
export type StatDeltaDirection = 'up' | 'down';
/** Sens dans lequel la métrique s'améliore — décide de la couleur du delta. */
export type StatPolarity = 'higher-is-better' | 'lower-is-better';
export type StatCardSize = 'sm' | 'md' | 'lg';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Micro uppercase label displayed above value */
  label: React.ReactNode;
  /** Main metric (string or number) — rendered display-size */
  value: React.ReactNode;
  /** Small unit shown after value (e.g. %, pts, h) */
  sub?: React.ReactNode;
  /** Optional delta (e.g. "+12% cette semaine") */
  delta?: React.ReactNode;
  /** Delta direction — the arrow's way (up / down). Color follows `polarity`. */
  deltaDirection?: StatDeltaDirection;
  /**
   * Sens favorable de la métrique. `higher-is-better` (défaut) : une hausse est
   * verte. `lower-is-better` : une BAISSE est verte — coût par apprenant,
   * apprenants inactifs, délai de réponse. Un coût qui baisse n'est pas rouge.
   */
  polarity?: StatPolarity;
  /**
   * Legacy combined variant (tone + surface). Still supported for back-compat.
   * Prefer `tone` + `surface` for granular control.
   * - `default`  → tone=neutral, surface=card
   * - `elevated` → tone=neutral, surface=card (+ shadow-sm)
   * - `brand`    → tone=brand,   surface=tinted
   * - `warm`     → tone=warm,    surface=tinted
   * - `sun`      → tone=sun,     surface=tinted
   */
  variant?: StatCardVariant;
  /** Color tone. Overrides legacy `variant` if both passed. */
  tone?: StatCardTone;
  /** Surface treatment. Overrides legacy `variant` surface if both passed. */
  surface?: StatCardSurface;
  size?: StatCardSize;
  /** Force 1:1 aspect ratio — delegates sizing to parent grid */
  square?: boolean;
  /** Override value color tint (defaults to variant/tone-appropriate) */
  valueColor?: StatValueColor;
  /** Icon shown above label */
  icon?: React.ReactNode;

  // ---- Legacy API (pre-spec) ------------------------------------------------
  /** @deprecated Use `label` */
  title?: string;
  /** @deprecated Use `sub` */
  unit?: string;
  /** @deprecated Use `delta` + `deltaDirection` (numeric trend) */
  trend?: number;
}

const BASE = 'relative flex flex-col rounded-xl';

/**
 * Legacy single-variant classes — kept for back-compat fallback when neither
 * `tone` nor `surface` props are provided.
 */
const VARIANT_CLASSES: Record<StatCardVariant, string> = {
  default:  'bg-white border border-ink-200',
  elevated: 'bg-white shadow-sm border-0',
  warm:     'bg-gradient-to-b from-secondary-50 to-white border-0',
  brand:    'bg-gradient-to-b from-primary-50 to-white border-0',
  sun:      'bg-gradient-to-b from-accent-50 to-white border-0',
};

/**
 * Surface × Tone matrix — new explicit API.
 * Order : tone-surface key → classes.
 */
const SURFACE_TONE_CLASSES: Record<
  StatCardSurface,
  Record<StatCardTone, string>
> = {
  card: {
    neutral: 'bg-white border border-ink-200',
    brand:   'bg-white border border-primary-200',
    warm:    'bg-white border border-secondary-200',
    sun:     'bg-white border border-accent-200',
  },
  tinted: {
    neutral: 'bg-ink-50 border border-ink-100',
    brand:   'bg-gradient-to-b from-primary-50 to-white border border-primary-100',
    warm:    'bg-gradient-to-b from-secondary-50 to-white border border-secondary-100',
    sun:     'bg-gradient-to-b from-accent-50 to-white border border-accent-100',
  },
  glass: {
    neutral: 'bg-white/70 backdrop-blur-glass-light border border-white/60 shadow-sm',
    brand:   'bg-primary-50/60 backdrop-blur-glass-light border border-primary-200/60 shadow-brand-xs',
    warm:    'bg-secondary-50/60 backdrop-blur-glass-light border border-secondary-200/60 shadow-warm-xs',
    sun:     'bg-accent-50/70 backdrop-blur-glass-light border border-accent-200/60 shadow-sun-xs',
  },
  frosted: {
    neutral: 'bg-white/85 backdrop-blur-glass-medium border border-white/70 shadow-md',
    brand:   'bg-primary-100/40 backdrop-blur-glass-medium border border-primary-200/50 shadow-brand-md',
    warm:    'bg-secondary-100/40 backdrop-blur-glass-medium border border-secondary-200/50 shadow-warm-md',
    sun:     'bg-accent-100/45 backdrop-blur-glass-medium border border-accent-200/50 shadow-sun-md',
  },
};

/** Map legacy variant → (tone, surface) tuple. */
const VARIANT_TO_TONE_SURFACE: Record<StatCardVariant, { tone: StatCardTone; surface: StatCardSurface }> = {
  default:  { tone: 'neutral', surface: 'card' },
  elevated: { tone: 'neutral', surface: 'card' }, // shadow added via class below
  brand:    { tone: 'brand',   surface: 'tinted' },
  warm:     { tone: 'warm',    surface: 'tinted' },
  sun:      { tone: 'sun',     surface: 'tinted' },
};

// Deux paddings seulement (arbitrage n°4 du 23/09) : 20 dense, 24 canon.
// `sm` était à 16, sous le rayon 20 : son coin pinçait.
const CONTAINER_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'p-stack-md gap-stack-xs',
  md: 'p-stack-md gap-2.5',
  lg: 'p-stack-lg gap-stack-xs',
};

// Label below value — regular sans font, NOT font-mono. Slightly muted color.
const LABEL_BASE = 'font-body font-medium text-ink-500 leading-snug';
const LABEL_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body-sm',
};

const VALUE_BASE = 'font-display font-bold tracking-tight leading-none inline-flex items-baseline gap-tight';
const VALUE_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-2xl',
  md: 'text-stat-value',
  lg: 'text-stat-value-lg',
};

const VALUE_COLOR_CLASSES: Record<StatValueColor, string> = {
  default: 'text-ink-900',
  warm:    'text-secondary-700',
  brand:   'text-primary-700',
};

// Icon bubble — light fill (variant-aware), rounded-xl, smaller than the value
const ICON_BUBBLE_BASE = 'inline-flex items-center justify-center rounded-xl shrink-0 [&>svg]:opacity-90';

const ICON_BUBBLE_VARIANT: Record<StatCardVariant, string> = {
  default:  'bg-ink-50 text-ink-600 border border-ink-200/60',
  elevated: 'bg-ink-50 text-ink-600 border border-ink-200/60',
  brand:    'bg-primary-100 text-primary-800',
  warm:     'bg-secondary-100 text-secondary-700',
  sun:      'bg-accent-100 text-accent-800',
};

const ICON_BUBBLE_TONE: Record<StatCardTone, string> = {
  neutral: 'bg-ink-100 text-ink-700',
  brand:   'bg-primary-100 text-primary-800',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-800',
};

const ICON_BUBBLE_SIZE: Record<StatCardSize, string> = {
  sm: 'w-9 h-9 [&>svg]:w-4 [&>svg]:h-4',
  md: 'w-11 h-11 [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-12 h-12 [&>svg]:w-5 [&>svg]:h-5',
};

/* Le delta n'est plus posé en absolu dans le coin (2026-09-24) : il
   chevauchait la valeur dès que la place manquait — « 68% » et « ↑ 5% vs
   période précédente » l'un sur l'autre sur /enterprise/dashboard à 1440, une
   quarantaine de tuiles à 375 et 768. Il vit maintenant dans le flux, sur la
   première rangée de la tuile (à côté de l'icône, ou de la valeur s'il n'y a
   pas d'icône), dans une rangée `flex-wrap` : il reste en haut à droite,
   comme avant, quand la place suffit, et passe SOUS la valeur quand elle
   manque. Le repli se décide sur le contenu réel — une requête de conteneur
   aurait dû deviner, par un seuil fixe, la largeur d'un texte qui va de
   « +2 » à « Intervention recommandée ». */
const DELTA_BASE = 'inline-flex items-center gap-tight text-caption font-semibold min-w-0';
const DELTA_ROW = 'flex flex-wrap items-start gap-x-stack-xs gap-y-tight';
const DELTA_TONE = { good: 'text-success-fg', bad: 'text-danger-fg' } as const;

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sub,
  delta,
  deltaDirection,
  polarity = 'higher-is-better',
  variant = 'default',
  tone,
  surface,
  size = 'md',
  square = false,
  valueColor,
  icon,
  // Legacy
  title,
  unit,
  trend,
  className = '',
  children,
  ...rest
}) => {
  // Legacy → new API
  const resolvedLabel = label ?? title;
  const resolvedSub = sub ?? unit;
  const resolvedDelta =
    delta ?? (trend !== undefined ? `${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend)}%` : undefined);
  const resolvedDeltaDir: StatDeltaDirection | undefined =
    deltaDirection ?? (trend !== undefined ? (trend >= 0 ? 'up' : 'down') : undefined);

  // Resolve tone × surface — explicit props win over legacy variant
  const fallback = VARIANT_TO_TONE_SURFACE[variant];
  const resolvedTone: StatCardTone = tone ?? fallback.tone;
  const resolvedSurface: StatCardSurface = surface ?? fallback.surface;
  const useExplicit = tone !== undefined || surface !== undefined;

  const resolvedValueColor: StatValueColor =
    valueColor ?? (resolvedTone === 'warm' ? 'warm' : resolvedTone === 'brand' ? 'brand' : 'default');

  // Choose class source : new matrix if explicit props, else legacy variant
  const surfaceClasses = useExplicit
    ? SURFACE_TONE_CLASSES[resolvedSurface][resolvedTone]
    : VARIANT_CLASSES[variant];

  const classes = [
    BASE,
    surfaceClasses,
    // elevated keeps its shadow even in new API
    variant === 'elevated' && !useExplicit && 'shadow-sm',
    CONTAINER_SIZE_CLASSES[size],
    square && 'aspect-square overflow-hidden items-center text-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [LABEL_BASE, LABEL_SIZE_CLASSES[size]].join(' ');

  const valueClasses = [
    VALUE_BASE,
    VALUE_SIZE_CLASSES[size],
    VALUE_COLOR_CLASSES[resolvedValueColor],
  ].join(' ');

  const deltaIsGood = resolvedDeltaDir
    ? (resolvedDeltaDir === 'up') === (polarity === 'higher-is-better')
    : undefined;
  const deltaClasses = [
    DELTA_BASE,
    deltaIsGood === undefined ? 'text-ink-600' : DELTA_TONE[deltaIsGood ? 'good' : 'bad'],
  ]
    .filter(Boolean)
    .join(' ');

  const iconBubbleClasses = [
    ICON_BUBBLE_BASE,
    useExplicit ? ICON_BUBBLE_TONE[resolvedTone] : ICON_BUBBLE_VARIANT[variant],
    ICON_BUBBLE_SIZE[size],
  ].join(' ');

  const iconEl = icon && (
    <div className={iconBubbleClasses} aria-hidden="true">
      {icon}
    </div>
  );
  const valueEl = (
    <p className={valueClasses}>
      {value}
      {resolvedSub && (
        <span className="text-[0.45em] font-medium text-ink-500 leading-none self-end mb-[0.15em]">
          {resolvedSub}
        </span>
      )}
    </p>
  );
  const deltaEl = resolvedDelta && <p className={deltaClasses}>{resolvedDelta}</p>;
  // Rangée de tête : [icône | valeur] … delta. `justify-between` le renvoie à
  // droite tant qu'il tient sur la ligne ; seul sur sa ligne, il part à gauche
  // (au centre sur une tuile carrée).
  const deltaRow = (first: React.ReactNode) => (
    <div className={[DELTA_ROW, square ? 'justify-center' : 'justify-between'].join(' ')}>
      {first}
      {deltaEl}
    </div>
  );

  return (
    <div className={classes} {...rest}>
      {deltaEl && iconEl ? deltaRow(iconEl) : iconEl}
      {deltaEl && !iconEl ? deltaRow(valueEl) : valueEl}
      {resolvedLabel && <p className={labelClasses}>{resolvedLabel}</p>}
      {children}
    </div>
  );
};

export default StatCard;
