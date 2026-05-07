import React from 'react';

/**
 * ProgressBar — Source of truth: design-system/spec.json → components.Progress.subComponents.ProgressBar
 *
 * Linear progress tracking. Sizes: xs/sm/md/lg. Fill variants: brand/warm/sun/success/danger/gradient.
 */

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressFill = 'brand' | 'warm' | 'sun' | 'success' | 'danger' | 'gradient';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: ProgressSize;
  fill?: ProgressFill;
  /** Animated diagonal stripes overlay (currently no-op, reserved) */
  striped?: boolean;
  label?: React.ReactNode;
  valueLabel?: React.ReactNode | false;

  /** @deprecated Use `value` */
  percentage?: number;
  /** @deprecated Use `valueLabel` */
  showLabel?: boolean;
  /** @deprecated Use `fill` (maps primary→brand, secondary→warm) */
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

const TRACK_BASE = 'bg-ink-50 rounded-pill overflow-hidden relative';

const TRACK_SIZE_CLASSES: Record<ProgressSize, string> = {
  xs: 'h-0.5',
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3.5',
};

const FILL_BASE = 'h-full rounded-[inherit] transition-[width] duration-700 ease-out';

const FILL_VARIANT_CLASSES: Record<ProgressFill, string> = {
  brand:    'bg-primary-600',
  warm:     'bg-gradient-to-br from-secondary-500 to-accent-400',
  sun:      'bg-accent-400',
  success:  'bg-success-base',
  danger:   'bg-danger-base',
  gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  fill,
  striped: _striped = false,
  label,
  valueLabel,
  percentage,
  showLabel,
  variant,
  className = '',
  ...rest
}) => {
  const resolvedValue = value ?? percentage ?? 0;
  const pct = Math.min(Math.max((resolvedValue / max) * 100, 0), 100);

  const resolvedFill: ProgressFill =
    fill ?? (variant === 'secondary' ? 'warm' : variant === 'success' ? 'success' : 'brand');

  const showValueLabel =
    valueLabel !== false && (valueLabel !== undefined || showLabel !== false);

  const trackClasses = [TRACK_BASE, TRACK_SIZE_CLASSES[size]].join(' ');
  const fillClasses = [FILL_BASE, FILL_VARIANT_CLASSES[resolvedFill]].join(' ');

  return (
    <div className={`flex flex-col gap-2 ${className}`} {...rest}>
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-caption">
          {label && (
            <span className="text-ink-600 font-semibold uppercase tracking-[0.04em] text-micro">
              {label}
            </span>
          )}
          {showValueLabel && (
            <span className="font-mono font-bold text-ink-900 text-caption">
              {valueLabel ?? `${Math.round(pct)}%`}
            </span>
          )}
        </div>
      )}
      <div
        className={trackClasses}
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
