import React from 'react';

export type ProgressRingTone = 'brand' | 'warm' | 'sun' | 'success' | 'danger';

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  thickness?: number;
  tone?: ProgressRingTone;
  /** @deprecated Use `tone`. Direct color override still accepted. */
  color?: string;
  label?: React.ReactNode;
  valueLabel?: React.ReactNode;
}

const TONE_COLOR_VAR: Record<ProgressRingTone, string> = {
  brand:   'var(--color-primary-600)',
  warm:    'var(--color-secondary-500)',
  sun:     'var(--color-accent-400)',
  success: 'var(--color-success-base)',
  danger:  'var(--color-danger-base)',
};

const TONE_VALUE_TEXT: Record<ProgressRingTone, string> = {
  brand:   'text-ink-900',
  warm:    'text-ink-900',
  sun:     'text-ink-900',
  success: 'text-success-fg',
  danger:  'text-danger-fg',
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
  const ringColor = color ?? TONE_COLOR_VAR[tone];

  const wrapperStyle: React.CSSProperties = {
    ...style,
    width: `${size}px`,
    height: `${size}px`,
    background: `conic-gradient(${ringColor} ${pct}%, var(--color-ink-100) 0)`,
  };

  const innerStyle: React.CSSProperties = {
    inset: `${thickness}px`,
  };

  const valueFontSize = `${size / 4.5}px`;

  return (
    <div
      className={[
        'relative inline-flex items-center justify-center rounded-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={wrapperStyle}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className="absolute bg-white rounded-full" style={innerStyle} />
      <div className="relative flex flex-col items-center gap-0.5">
        <span
          className={[
            'font-display font-semibold tracking-tight leading-none',
            TONE_VALUE_TEXT[tone],
          ].join(' ')}
          style={{ fontSize: valueFontSize }}
        >
          {valueLabel ?? `${Math.round(pct)}%`}
        </span>
        {label && (
          <span className="text-micro font-mono uppercase tracking-wider text-ink-500 font-semibold">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
