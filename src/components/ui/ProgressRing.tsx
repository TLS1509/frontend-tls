import React from 'react';

/**
 * ProgressRing — Source of truth: design-system/spec.json → components.Progress.subComponents.Ring
 *
 * Circular progress with prominent % center. Implemented with conic-gradient.
 * Tone variants: brand (default) / warm / sun / success / danger.
 */

export type ProgressRingTone = 'brand' | 'warm' | 'sun' | 'success' | 'danger';

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 percentage */
  value: number;
  /** Ring diameter in px (default: 120) */
  size?: number;
  /** Stroke thickness in px (default: 10) */
  thickness?: number;
  /** Tone variant — sets ring color from CSS token */
  tone?: ProgressRingTone;
  /** @deprecated Use `tone`. Direct color override still accepted. */
  color?: string;
  /** Label under the numeric value */
  label?: React.ReactNode;
  /** Override the centered value text */
  valueLabel?: React.ReactNode;
}

const TONE_COLORS: Record<ProgressRingTone, string> = {
  brand:   'var(--tls-primary-600)',
  warm:    'var(--tls-orange-500)',
  sun:     'var(--tls-yellow-400)',
  success: 'var(--tls-success-base)',
  danger:  'var(--tls-danger-base)',
};

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 120,
  thickness = 10,
  tone = 'brand',
  color,
  label,
  valueLabel,
  className = '',
  style,
  ...rest
}) => {
  const pct = Math.min(Math.max(value, 0), 100);

  // color prop takes priority over tone (backward compat)
  const ringColor = color ?? TONE_COLORS[tone];

  const ringStyle = {
    ...style,
    ['--ring-size' as string]: `${size}px`,
    ['--ring-pct' as string]: `${pct}`,
    ['--ring-thickness' as string]: `${thickness}px`,
    ['--ring-color' as string]: ringColor,
  } as React.CSSProperties;

  const classes = ['ring', tone !== 'brand' && `ring--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
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
