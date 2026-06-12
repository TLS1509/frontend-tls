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
  brand: 'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:  'bg-gradient-to-r from-secondary-500 to-secondary-700',
  sun:   'bg-gradient-to-r from-accent-300 to-accent-500',
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
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      <div className="flex justify-between items-baseline text-body-sm">
        <span className="font-semibold text-ink-900">{label}</span>
        {showValue && (
          <span
            className={`font-display font-bold tabular-nums ${VALUE_TONE_CLASSES[tone]}`}
          >
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
        className="w-full h-2 rounded-pill bg-ink-100 overflow-hidden shadow-inner"
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
