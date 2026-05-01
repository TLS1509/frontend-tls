import React from 'react';

export type InlineProgressTone = 'primary' | 'warm' | 'sun';
export type InlineProgressSize = 'sm' | 'md';

export interface InlineProgressProps {
  value: number; // 0-100
  tone?: InlineProgressTone;
  showLabel?: boolean;
  size?: InlineProgressSize;
  className?: string;
}

/**
 * InlineProgress — Embedded progress bar for use within cards, steps, or inline displays
 *
 * Displays a progress bar with optional percentage label.
 * - value: Progress as percentage (0-100)
 * - tone: Color tone (primary/warm/sun)
 * - showLabel: Show percentage text
 * - size: sm (6px height) or md (8px height)
 */
export const InlineProgress: React.FC<InlineProgressProps> = ({
  value,
  tone = 'primary',
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const classes = [
    'inline-progress',
    `inline-progress--${tone}`,
    `inline-progress--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={classes}>
      <div className="inline-progress__track">
        <div
          className="inline-progress__fill"
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="inline-progress__label">{Math.round(clampedValue)}%</span>
      )}
    </div>
  );
};
