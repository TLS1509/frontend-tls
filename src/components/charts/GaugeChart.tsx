import React, { useMemo } from 'react';

export interface GaugeChartProps {
  current: number; // 0-100 or 0-5 (Dreyfus)
  max?: number; // Default 100
  label?: string;
  tone?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  variant?: 'arc' | 'needle' | 'segment';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  target?: number; // Optional target line
}

const TONE_COLORS: Record<string, { arc: string; needle: string; bg: string }> = {
  primary: {
    arc: '#55A1B4',
    needle: '#3D7786',
    bg: '#E8F4F7',
  },
  warm: {
    arc: '#ED843A',
    needle: '#C06920',
    bg: '#FFF3EB',
  },
  sun: {
    arc: '#F8B044',
    needle: '#E89F1B',
    bg: '#FFF9EE',
  },
  success: {
    arc: '#9DBEBA',
    needle: '#7AA89F',
    bg: '#F0F5F4',
  },
  danger: {
    arc: '#F28559',
    needle: '#C0432A',
    bg: '#FFF5F2',
  },
};

const SIZE_CONFIG: Record<string, { radius: number; center: number; strokeWidth: number; fontSize: number }> = {
  sm: {
    radius: 40,
    center: 50,
    strokeWidth: 6,
    fontSize: 14,
  },
  md: {
    radius: 60,
    center: 70,
    strokeWidth: 8,
    fontSize: 18,
  },
  lg: {
    radius: 80,
    center: 100,
    strokeWidth: 10,
    fontSize: 22,
  },
};

/**
 * GaugeChart — Circular progress indicator (0-100% or 0-5 Dreyfus scale)
 * Variants: arc-fill (default), needle (speedometer), segment (rings)
 * Tone-aware colors, size variants, optional target indicator
 */
export const GaugeChart: React.FC<GaugeChartProps> = ({
  current,
  max = 100,
  label,
  tone = 'primary',
  variant = 'arc',
  size = 'md',
  showPercentage = true,
  target,
}) => {
  const config = SIZE_CONFIG[size];
  const colors = TONE_COLORS[tone];

  // Clamp values to 0-max
  const normalizedCurrent = Math.max(0, Math.min(current, max));
  const normalizedTarget = target ? Math.max(0, Math.min(target, max)) : null;
  const percentage = (normalizedCurrent / max) * 100;
  const targetPercentage = normalizedTarget ? (normalizedTarget / max) * 100 : null;

  // SVG dimensions
  const svgSize = config.center * 2;
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const renderArcVariant = () => (
    <div className="flex flex-col items-center gap-3">
      <svg width={svgSize} height={svgSize} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill={colors.bg}
          opacity={0.5}
        />

        {/* Target indicator line (if provided) */}
        {targetPercentage !== null && (
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius}
            fill="none"
            stroke={colors.needle}
            strokeWidth={2}
            strokeDasharray={`${(targetPercentage / 100) * circumference} ${(100 - targetPercentage) / 100 * circumference}`}
            opacity={0.4}
            strokeDashoffset={0}
          />
        )}

        {/* Main arc */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill="none"
          stroke={colors.arc}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />

        {/* Center circle background */}
        <circle cx={config.center} cy={config.center} r={config.radius * 0.35} fill="white" />
      </svg>

      {/* Center label */}
      <div className="text-center -mt-16">
        {showPercentage && (
          <p className="font-bold" style={{ fontSize: `${config.fontSize}px`, color: colors.arc }}>
            {Math.round(percentage)}%
          </p>
        )}
        {label && (
          <p className="text-caption text-ink-600 mt-1">{label}</p>
        )}
        {targetPercentage !== null && (
          <p className="text-micro text-ink-500 mt-1">Target: {Math.round(targetPercentage)}%</p>
        )}
      </div>
    </div>
  );

  const renderNeedleVariant = () => {
    const angle = (percentage / 100) * 180 - 90; // 180° range, -90° offset
    const radian = (angle * Math.PI) / 180;
    const needleLength = config.radius * 0.8;
    const needleEndX = config.center + needleLength * Math.cos(radian);
    const needleEndY = config.center + needleLength * Math.sin(radian);

    return (
      <div className="flex flex-col items-center gap-3">
        <svg width={svgSize} height={svgSize * 0.6}>
          {/* Background semi-circle */}
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius}
            fill={colors.bg}
            opacity={0.3}
          />

          {/* Gauge arc (180°) */}
          <path
            d={`M ${config.center - config.radius} ${config.center} A ${config.radius} ${config.radius} 0 0 1 ${config.center + config.radius} ${config.center}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={config.strokeWidth}
          />

          {/* Gauge filled arc */}
          <path
            d={`M ${config.center - config.radius} ${config.center} A ${config.radius} ${config.radius} 0 ${percentage > 50 ? 1 : 0} 1 ${
              config.center + config.radius * Math.cos(radian)
            } ${config.center + config.radius * Math.sin(radian)}`}
            fill="none"
            stroke={colors.arc}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />

          {/* Target indicator (if provided) */}
          {targetPercentage !== null && (
            <circle
              cx={config.center + config.radius * Math.cos((((targetPercentage / 100) * 180 - 90) * Math.PI) / 180)}
              cy={config.center + config.radius * Math.sin((((targetPercentage / 100) * 180 - 90) * Math.PI) / 180)}
              r={3}
              fill={colors.needle}
              opacity={0.6}
            />
          )}

          {/* Needle */}
          <line
            x1={config.center}
            y1={config.center}
            x2={needleEndX}
            y2={needleEndY}
            stroke={colors.needle}
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              transition: 'all 1s ease-out',
            }}
          />

          {/* Center dot */}
          <circle cx={config.center} cy={config.center} r={4} fill={colors.needle} />
        </svg>

        {/* Center label */}
        <div className="text-center -mt-4">
          {showPercentage && (
            <p className="font-bold" style={{ fontSize: `${config.fontSize}px`, color: colors.arc }}>
              {Math.round(percentage)}%
            </p>
          )}
          {label && (
            <p className="text-caption text-ink-600 mt-0.5">{label}</p>
          )}
        </div>
      </div>
    );
  };

  const renderSegmentVariant = () => (
    <div className="flex flex-col items-center gap-3">
      <svg width={svgSize} height={svgSize}>
        {/* Outer ring (max) */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={4}
          opacity={0.3}
        />

        {/* Current ring */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius * 0.7}
          fill="none"
          stroke={colors.arc}
          strokeWidth={6}
          strokeDasharray={`${(percentage / 100) * circumference} ${(100 - percentage) / 100 * circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: `${config.center}px ${config.center}px`,
            transition: 'stroke-dasharray 1s ease-out',
          }}
        />

        {/* Target ring (if provided) */}
        {targetPercentage !== null && (
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius * 0.4}
            fill="none"
            stroke={colors.needle}
            strokeWidth={2}
            strokeDasharray={`${(targetPercentage / 100) * circumference} ${(100 - targetPercentage) / 100 * circumference}`}
            strokeDashoffset={0}
            opacity={0.6}
            strokeDashoffset={0}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: `${config.center}px ${config.center}px`,
            }}
          />
        )}

        {/* Center circle background */}
        <circle cx={config.center} cy={config.center} r={config.radius * 0.3} fill="white" />
      </svg>

      {/* Center label */}
      <div className="text-center -mt-20">
        {showPercentage && (
          <p className="font-bold" style={{ fontSize: `${config.fontSize}px`, color: colors.arc }}>
            {Math.round(percentage)}%
          </p>
        )}
        {label && (
          <p className="text-caption text-ink-600 mt-1">{label}</p>
        )}
        {targetPercentage !== null && (
          <p className="text-micro text-ink-500 mt-1">Target: {Math.round(targetPercentage)}%</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center">
      {variant === 'needle' && renderNeedleVariant()}
      {variant === 'segment' && renderSegmentVariant()}
      {variant === 'arc' && renderArcVariant()}
    </div>
  );
};

export default GaugeChart;
