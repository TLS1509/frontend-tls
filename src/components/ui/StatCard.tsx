import React from 'react';

/**
 * StatCard — Source of truth: design-system/spec.json → components.StatCard
 *
 * Prominent learning metric. Display number, micro uppercase label, optional delta.
 * Variants: default / elevated / warm / brand / sun
 * Sizes: sm / md / lg
 * Square: aspect-square for grid layouts (content should stay short)
 */

export type StatCardVariant = 'default' | 'elevated' | 'warm' | 'brand' | 'sun';
export type StatValueColor = 'default' | 'warm' | 'brand';
export type StatDeltaDirection = 'up' | 'down';
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
  /** Delta direction — colors the delta green/red */
  deltaDirection?: StatDeltaDirection;
  variant?: StatCardVariant;
  size?: StatCardSize;
  /** Force 1:1 aspect ratio — delegates sizing to parent grid */
  square?: boolean;
  /** Override value color tint (defaults to variant-appropriate) */
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

const VARIANT_CLASSES: Record<StatCardVariant, string> = {
  default:  'bg-white border border-ink-200',
  elevated: 'bg-white shadow-sm border-0',
  warm:     'bg-gradient-to-b from-secondary-50 to-white border-0',
  brand:    'bg-gradient-to-b from-primary-50 to-white border-0',
  sun:      'bg-gradient-to-b from-accent-50 to-white border-0',
};

const CONTAINER_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'p-4 gap-2',
  md: 'p-5 gap-2.5',
  lg: 'p-6 gap-3',
};

// Label below value — regular sans font, NOT font-mono. Slightly muted color.
const LABEL_BASE = 'font-body font-medium text-ink-500 leading-snug';
const LABEL_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body-sm',
};

const VALUE_BASE = 'font-display font-bold tracking-tight leading-none inline-flex items-baseline gap-1';
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
  brand:    'bg-primary-100 text-primary-700',
  warm:     'bg-secondary-100 text-secondary-700',
  sun:      'bg-accent-100 text-accent-800',
};

const ICON_BUBBLE_SIZE: Record<StatCardSize, string> = {
  sm: 'w-9 h-9 [&>svg]:w-4 [&>svg]:h-4',
  md: 'w-11 h-11 [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-12 h-12 [&>svg]:w-5 [&>svg]:h-5',
};

const DELTA_BASE = 'absolute inline-flex items-center gap-1 text-caption font-semibold';
const DELTA_POSITION_CLASSES: Record<StatCardSize, string> = {
  sm: 'top-3 right-3',
  md: 'top-4 right-4',
  lg: 'top-5 right-5',
};
const DELTA_DIRECTION_CLASSES: Record<StatDeltaDirection, string> = {
  up: 'text-success-fg',
  down: 'text-danger-fg',
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sub,
  delta,
  deltaDirection,
  variant = 'default',
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

  const resolvedValueColor: StatValueColor =
    valueColor ?? (variant === 'warm' ? 'warm' : variant === 'brand' ? 'brand' : 'default');

  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
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

  const deltaClasses = [
    DELTA_BASE,
    DELTA_POSITION_CLASSES[size],
    resolvedDeltaDir ? DELTA_DIRECTION_CLASSES[resolvedDeltaDir] : 'text-ink-600',
  ]
    .filter(Boolean)
    .join(' ');

  const iconBubbleClasses = [
    ICON_BUBBLE_BASE,
    ICON_BUBBLE_VARIANT[variant],
    ICON_BUBBLE_SIZE[size],
  ].join(' ');

  return (
    <div className={classes} {...rest}>
      {icon && (
        <div className={iconBubbleClasses} aria-hidden="true">
          {icon}
        </div>
      )}
      <p className={valueClasses}>
        {value}
        {resolvedSub && (
          <span className="text-[0.45em] font-medium text-ink-500 leading-none self-end mb-[0.15em]">
            {resolvedSub}
          </span>
        )}
      </p>
      {resolvedLabel && <p className={labelClasses}>{resolvedLabel}</p>}
      {resolvedDelta && <p className={deltaClasses}>{resolvedDelta}</p>}
      {children}
    </div>
  );
};

export default StatCard;
