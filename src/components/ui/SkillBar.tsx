/**
 * SkillBar
 *
 * Horizontal skill progress bar with label, percentage, and tone variants.
 * Uses only design tokens — no separate CSS file.
 *
 * Usage:
 * <SkillBar label="Prompt Engineering" value={95} tone="brand" showValue />
 */

import React from 'react';

export interface SkillBarProps {
  label: string;
  value: number; // 0–100
  tone?: 'brand' | 'warm' | 'sun';
  showValue?: boolean;
  style?: React.CSSProperties;
}

const TONE_COLOR: Record<NonNullable<SkillBarProps['tone']>, string> = {
  brand: 'var(--tls-primary-500)',
  warm: 'var(--tls-orange-500)',
  sun: 'var(--tls-yellow-500)',
};

export const SkillBar: React.FC<SkillBarProps> = ({
  label,
  value,
  tone = 'brand',
  showValue = true,
  style,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const fillColor = TONE_COLOR[tone];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-2)',
        ...style,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--t-body-sm)',
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text)' }}>{label}</span>
        {showValue && (
          <span style={{ fontWeight: 700, color: fillColor }}>
            {clampedValue}%
          </span>
        )}
      </div>

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clampedValue}%`}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: 'var(--r-full)',
          background: 'var(--surface-muted)',
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${clampedValue}%`,
            borderRadius: 'var(--r-full)',
            background: fillColor,
            transition: 'width 0.6s var(--ease-standard)',
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
