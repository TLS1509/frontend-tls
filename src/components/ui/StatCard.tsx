import React from 'react';

/**
 * StatCard — Source of truth: design-system/spec.json → components.StatCard
 *
 * Prominent learning metric. Display number, micro uppercase label, optional delta.
 * Variants: default / elevated / warm / brand.
 */

export type StatCardVariant = 'default' | 'elevated' | 'warm' | 'brand';
export type StatValueColor = 'default' | 'warm' | 'brand';
export type StatDeltaDirection = 'up' | 'down';

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
  /** Override value color tint (defaults to variant-appropriate) */
  valueColor?: StatValueColor;

  // ---- Legacy API (pre-spec) ------------------------------------------------
  /** @deprecated Use `label` */
  title?: string;
  /** @deprecated Use `sub` */
  unit?: string;
  /** @deprecated Use `delta` + `deltaDirection` (numeric trend) */
  trend?: number;
  /** @deprecated Not part of the new spec, rendered as prefix */
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sub,
  delta,
  deltaDirection,
  variant = 'default',
  valueColor,
  // Legacy
  title,
  unit,
  trend,
  icon,
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
    'stat-card',
    variant !== 'default' && `stat-card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const valueClasses = [
    'stat-card__value',
    resolvedValueColor !== 'default' && `stat-card__value--${resolvedValueColor}`,
  ]
    .filter(Boolean)
    .join(' ');

  const deltaClasses = [
    'stat-card__delta',
    resolvedDeltaDir && `stat-card__delta--${resolvedDeltaDir}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {icon && <div style={{ marginBottom: 'var(--s-3)' }}>{icon}</div>}
      {resolvedLabel && <p className="stat-card__label">{resolvedLabel}</p>}
      <p className={valueClasses}>
        {value}
        {resolvedSub && <sub>{resolvedSub}</sub>}
      </p>
      {resolvedDelta && <p className={deltaClasses}>{resolvedDelta}</p>}
      {children}
    </div>
  );
};

export default StatCard;
