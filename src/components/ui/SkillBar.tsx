/**
 * SkillBar — horizontal skill progress with label, percentage, and tone variants.
 *
 * <SkillBar label="Prompt Engineering" value={95} tone="brand" showValue />
 */

import React from 'react';

export interface SkillBarProps {
  label: string;
  value: number;
  tone?: 'brand' | 'warm' | 'sun';
  showValue?: boolean;
  className?: string;
}

type SkillTone = NonNullable<SkillBarProps['tone']>;

const FILL_TONE_CLASSES: Record<SkillTone, string> = {
  brand: 'bg-primary-500',
  warm:  'bg-secondary-500',
  sun:   'bg-accent-500',
};

const VALUE_TONE_CLASSES: Record<SkillTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

export const SkillBar: React.FC<SkillBarProps> = ({
  label,
  value,
  tone = 'brand',
  showValue = true,
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center text-body-sm">
        <span className="font-semibold text-ink-900">{label}</span>
        {showValue && (
          <span className={`font-display font-semibold tabular-nums ${VALUE_TONE_CLASSES[tone]}`}>
            {clampedValue}%
          </span>
        )}
      </div>

      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clampedValue}%`}
        className="w-full h-1.5 rounded-pill bg-ink-50 overflow-hidden"
      >
        <div
          className={`h-full rounded-pill transition-[width] duration-700 ease-out ${FILL_TONE_CLASSES[tone]}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
