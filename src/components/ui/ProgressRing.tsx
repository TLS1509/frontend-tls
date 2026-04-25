import React from 'react';

/**
 * ProgressRing — Source of truth: design-system/spec.json → components.Progress.subComponents.Ring
 *
 * Circular progress with prominent % center. Implemented with conic-gradient.
 */

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 percentage */
  value: number;
  /** Ring diameter in px (default: 120) */
  size?: number;
  /** Stroke thickness in px (default: 10) */
  thickness?: number;
  /** Ring fill color — defaults to --tls-primary-600 */
  color?: string;
  /** Label under the numeric value */
  label?: React.ReactNode;
  /** Override the centered value text */
  valueLabel?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 120,
  thickness = 10,
  color,
  label,
  valueLabel,
  className = '',
  style,
  ...rest
}) => {
  const pct = Math.min(Math.max(value, 0), 100);

  const ringStyle = {
    ...style,
    ['--ring-size' as string]: `${size}px`,
    ['--ring-pct' as string]: `${pct}`,
    ['--ring-thickness' as string]: `${thickness}px`,
    ...(color ? { ['--ring-color' as string]: color } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={['ring', className].filter(Boolean).join(' ')}
      style={ringStyle}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className="ring__content">
        <span className="ring__value">{valueLabel ?? `${Math.round(pct)}%`}</span>
        {label && <span className="ring__label">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
