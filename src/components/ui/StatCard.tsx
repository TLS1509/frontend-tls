import React from 'react';

/**
 * StatCard — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Prominent learning metric. Chiffre en `stat-value` (h2 28 en `sm`), libellé
 * en légende 13/600 ink-600, delta et unité en légende.
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
  /** Libellé sous la valeur — légende 13/600, ink-600. */
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
// Les écarts sont portés par les éléments (voir `VALUE_AFTER_ICON` et
// `LABEL_CLASSES`) : ils ne sont pas égaux, un `gap` ne sait pas le dire.
// Le `gap-2.5` de `md` (10 px) n'était d'ailleurs pas un pas de l'échelle.
const CONTAINER_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'p-stack-md',
  md: 'p-stack-md',
  lg: 'p-stack-lg',
};

/* ── Typographie des chiffres — passe du 2026-09-24 ────────────────────────
   Le libellé est une LÉGENDE, à toutes les tailles : 13/20, graisse 600,
   ink-600. Il était à 16 px graisse 500 (réservée aux puces) en ink-500 sur
   `md` et `lg` — le même corps que le texte courant, donc en concurrence avec
   lui, alors qu'il ne fait que nommer le chiffre.
   La valeur prend l'échelle : `stat-value` (32 → 44) en `md`, `stat-value-lg`
   en `lg`, et le h2 (28) en `sm`, qui rendait 24 px — hors échelle.
   `leading-none` reste : un chiffre tient sur une ligne, et `stat-value`
   n'a pas d'interligne déclaré (il hériterait de celui du corps). Le serrage
   vit dans la map de taille (piège n°15), jamais dans la base : le h2 porte
   déjà le sien. */
/* Rythme : icône → valeur 12, valeur → libellé 4. Le libellé nomme le
   chiffre, il lui est collé (« étiquette ↔ valeur », doctrine § 5) ; l'icône
   s'en écarte davantage. À 8 / 8 (10 / 10 en `md`), le chiffre flottait à
   égale distance des deux. */
const LABEL_CLASSES = 'mt-stack-3xs font-body text-caption font-semibold text-ink-600';
const VALUE_AFTER_ICON = 'mt-stack-sm';

const VALUE_BASE = 'font-display font-bold leading-none inline-flex items-baseline gap-stack-3xs';
const VALUE_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-h2',
  md: 'text-stat-value tracking-headline',
  lg: 'text-stat-value-lg tracking-display',
};

/* Une couleur de marque ne porte du texte qu'au cran 800 (doctrine § 2) —
   le cran 700 des valeurs teintées passait le seuil du grand texte, pas la
   règle. */
const VALUE_COLOR_CLASSES: Record<StatValueColor, string> = {
  default: 'text-ink-900',
  warm:    'text-secondary-800',
  brand:   'text-primary-800',
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
const DELTA_BASE = 'inline-flex items-center gap-stack-3xs text-caption font-semibold min-w-0';
const DELTA_ROW = 'flex flex-wrap items-start gap-x-stack-xs gap-y-stack-3xs';
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
    // Tuile carrée : contenu centré sur les deux axes (il restait collé en
    // haut, sous un grand vide).
    square && 'aspect-square overflow-hidden items-center justify-center text-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = LABEL_CLASSES;

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
      {/* L'unité est une légende posée sur la ligne de base du chiffre. Elle
          était à 0,45em — 12,6 à 19,8 px selon la taille, jamais un pas de
          l'échelle — en graisse 500. */}
      {resolvedSub && (
        <span className="font-body text-caption font-normal tracking-normal text-ink-600">
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

  // Sans icône, le delta accompagne la valeur sur sa rangée ; avec une icône,
  // il accompagne l'icône, et la valeur descend de 12 px.
  const valueSlot = deltaEl && !iconEl ? deltaRow(valueEl) : valueEl;

  return (
    <div className={classes} {...rest}>
      {iconEl && (deltaEl ? deltaRow(iconEl) : iconEl)}
      {iconEl ? <div className={VALUE_AFTER_ICON}>{valueSlot}</div> : valueSlot}
      {resolvedLabel && <p className={labelClasses}>{resolvedLabel}</p>}
      {children && <div className="mt-stack-xs">{children}</div>}
    </div>
  );
};

export default StatCard;
