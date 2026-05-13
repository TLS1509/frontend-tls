import React from 'react';

export type ProgressRingTone = 'brand' | 'warm' | 'sun' | 'success' | 'danger';

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  thickness?: number;
  tone?: ProgressRingTone;
  /** @deprecated Use `tone`. Direct color override still accepted (CSS color string). */
  color?: string;
  label?: React.ReactNode;
  valueLabel?: React.ReactNode;
  /** Animate from 0 → value on mount (default: true). */
  animate?: boolean;
  /** Show outer glow halo behind the ring (default: true). */
  glow?: boolean;
}

interface ToneStops {
  from: string;
  to: string;
  glow: string;
  text: string;
}

const TONE_STOPS: Record<ProgressRingTone, ToneStops> = {
  brand: {
    from: 'var(--color-primary-400)',
    to:   'var(--color-primary-600)',
    glow: 'rgba(85, 161, 180, 0.45)',
    text: 'text-primary-700',
  },
  warm: {
    from: 'var(--color-secondary-400)',
    to:   'var(--color-secondary-600)',
    glow: 'rgba(237, 132, 58, 0.45)',
    text: 'text-secondary-700',
  },
  sun: {
    from: 'var(--color-accent-300)',
    to:   'var(--color-accent-500)',
    glow: 'rgba(248, 176, 68, 0.50)',
    text: 'text-accent-700',
  },
  success: {
    from: 'var(--color-success-base)',
    to:   'var(--color-success-fg)',
    glow: 'rgba(157, 190, 186, 0.45)',
    text: 'text-success-fg',
  },
  danger: {
    from: 'var(--color-danger-base)',
    to:   'var(--color-danger-fg)',
    glow: 'rgba(242, 133, 89, 0.45)',
    text: 'text-danger-fg',
  },
};

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 120,
  thickness = 10,
  tone = 'brand',
  color,
  label,
  valueLabel,
  animate = true,
  glow = true,
  className = '',
  style,
  ...rest
}) => {
  const pct = Math.min(Math.max(value, 0), 100);
  const stops = TONE_STOPS[tone];
  const fromColor = color ?? stops.from;
  const toColor = color ?? stops.to;

  const radius = (size - thickness) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const gradientId = React.useId();
  const filterId = React.useId();

  const [displayed, setDisplayed] = React.useState(animate ? 0 : pct);
  React.useEffect(() => {
    if (!animate) {
      setDisplayed(pct);
      return;
    }
    const id = requestAnimationFrame(() => setDisplayed(pct));
    return () => cancelAnimationFrame(id);
  }, [pct, animate]);

  const dashOffset = circumference - (displayed / 100) * circumference;
  const valueFontSize = `${size / 4.5}px`;

  return (
    <div
      className={[
        'relative inline-flex items-center justify-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...style, width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
          {glow && (
            <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={size / 30} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-ink-100)"
          strokeWidth={thickness}
        />

        {/* Glow layer (sits behind, blurred) */}
        {glow && pct > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            opacity={0.35}
            style={{
              filter: `url(#${filterId})`,
              transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        )}

        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pointer-events-none">
        <span
          className={[
            'font-display font-bold tracking-tight leading-none tabular-nums',
            stops.text,
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
