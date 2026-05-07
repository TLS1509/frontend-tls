import React from 'react';

export type InlineProgressTone = 'primary' | 'warm' | 'sun';
export type InlineProgressSize = 'sm' | 'md';

export interface InlineProgressProps {
  value: number;
  tone?: InlineProgressTone;
  showLabel?: boolean;
  size?: InlineProgressSize;
  className?: string;
}

const TRACK_BASE = 'flex-1 bg-ink-50 rounded-xs overflow-hidden min-w-20';

const TRACK_SIZE_CLASSES: Record<InlineProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2',
};

const FILL_BASE = 'h-full transition-[width] duration-300 ease-out';

const FILL_TONE_CLASSES: Record<InlineProgressTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-600',
  sun:     'bg-accent-600',
};

/**
 * InlineProgress — Embedded progress bar for use within cards, steps, or inline displays.
 */
export const InlineProgress: React.FC<InlineProgressProps> = ({
  value,
  tone = 'primary',
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`${TRACK_BASE} ${TRACK_SIZE_CLASSES[size]}`}>
        <div
          className={`${FILL_BASE} ${FILL_TONE_CLASSES[tone]}`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-caption font-semibold min-w-8 text-right text-ink-900">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
};
