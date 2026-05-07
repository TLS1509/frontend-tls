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

const BASE = 'relative flex flex-col justify-center rounded-xl';

const VARIANT_CLASSES: Record<StatCardVariant, string> = {
  default: 'bg-white border border-ink-200',
  elevated: 'bg-white shadow-sm border-0',
  warm: 'bg-gradient-to-b from-secondary-50 to-white border-0',
  brand: 'bg-gradient-to-b from-primary-50 to-white border-0',
  sun: 'bg-gradient-to-b from-accent-50 to-white border-0',
};

const CONTAINER_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'p-4 gap-1',
  md: 'p-6 gap-2',
  lg: 'p-8 gap-3',
};

const LABEL_BASE = 'font-mono font-bold uppercase tracking-[0.08em] text-ink-600';
const LABEL_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-micro',
  md: 'text-micro',
  lg: 'text-caption',
};

const VALUE_BASE = 'font-display font-semibold tracking-tight leading-none inline-flex items-baseline gap-1';
const VALUE_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-2xl',
  md: 'text-stat-value',
  lg: 'text-stat-value-lg',
};

const VALUE_COLOR_CLASSES: Record<StatValueColor, string> = {
  default: 'text-ink-900',
  warm: 'text-secondary-600',
  brand: 'text-primary-700',
};

const ICON_SIZE_CLASSES: Record<StatCardSize, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

const DELTA_BASE = 'absolute inline-flex items-center gap-1 text-caption font-semibold';
const DELTA_POSITION_CLASSES: Record<StatCardSize, string> = {
  sm: 'top-4 right-4',
  md: 'top-6 right-6',
  lg: 'top-8 right-8',
};
const DELTA_DIRECTION_CLASSES: Record<StatDeltaDirection, string> = {
  up: 'text-success-base',
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

  return (
    <div className={classes} {...rest}>
      {icon && (
        <div className={ICON_SIZE_CLASSES[size]}>
          {icon}
        </div>
      )}
      {resolvedLabel && <p className={labelClasses}>{resolvedLabel}</p>}
      <p className={valueClasses}>
        {value}
        {resolvedSub && (
          <span className="text-[0.45em] font-medium text-ink-500 leading-none self-end mb-[0.15em]">
            {resolvedSub}
          </span>
        )}
      </p>
      {resolvedDelta && <p className={deltaClasses}>{resolvedDelta}</p>}
      {children}
    </div>
  );
};

export default StatCard;
