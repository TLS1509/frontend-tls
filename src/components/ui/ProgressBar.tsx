import React from 'react';

/**
 * ProgressBar — Source of truth: design-system/spec.json → components.Progress.subComponents.ProgressBar
 *
 * Linear progress tracking. Sizes: sm/md/lg. Fill variants: brand (default), warm, gradient.
 */

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressFill = 'brand' | 'warm' | 'gradient';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
  /** Optional max (defaults to 100) */
  max?: number;
  size?: ProgressSize;
  fill?: ProgressFill;
  /** Label text (left of value) */
  label?: React.ReactNode;
  /** Value text on right. Pass explicit string or false to hide (default: "<pct>%") */
  valueLabel?: React.ReactNode | false;

  // ---- Legacy API -----------------------------------------------------------
  /** @deprecated Use `value` */
  percentage?: number;
  /** @deprecated Use `valueLabel` */
  showLabel?: boolean;
  /** @deprecated Use `fill` (maps primary→brand, secondary→warm) */
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  fill = 'brand',
  label,
  valueLabel,
  // Legacy
  percentage,
  showLabel,
  variant,
  className = '',
  ...rest
}) => {
  const resolvedValue = value ?? percentage ?? 0;
  const pct = Math.min(Math.max((resolvedValue / max) * 100, 0), 100);

  // Legacy variant → new fill
  const resolvedFill: ProgressFill =
    fill ?? (variant === 'secondary' ? 'warm' : 'brand');

  const classes = [
    'progress',
    size !== 'md' && `progress--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fillClasses = [
    'progress__fill',
    resolvedFill !== 'brand' && `progress__fill--${resolvedFill}`,
  ]
    .filter(Boolean)
    .join(' ');

  const showValueLabel =
    valueLabel !== false && (valueLabel !== undefined || showLabel !== false);

  return (
    <div className={classes} {...rest}>
      {(label || showValueLabel) && (
        <div className="progress__head">
          {label && <span className="progress__label">{label}</span>}
          {showValueLabel && (
            <span className="progress__value">
              {valueLabel ?? `${Math.round(pct)}%`}
            </span>
          )}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={fillClasses} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
