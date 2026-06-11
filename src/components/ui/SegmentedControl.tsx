import React from 'react';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlTone = 'primary' | 'warm' | 'sun';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: SegmentedControlSize;
  tone?: SegmentedControlTone;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

const TRACK_BASE =
  'inline-flex items-center p-1 bg-ink-100 rounded-lg gap-0.5';

const TRACK_SIZE: Record<SegmentedControlSize, string> = {
  sm: 'gap-0',
  md: 'gap-0.5',
  lg: 'gap-1',
};

const SEGMENT_BASE =
  'relative inline-flex items-center justify-center gap-1.5 font-body font-semibold whitespace-nowrap rounded-md cursor-pointer border-0 bg-transparent transition-[background-color,box-shadow,color,transform] duration-fast ease-emphasis select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ' +
  'disabled:opacity-disabled disabled:cursor-not-allowed';

const SEGMENT_SIZE: Record<SegmentedControlSize, string> = {
  sm: 'h-7 px-3 text-caption',
  md: 'h-9 px-4 text-body-sm',
  lg: 'h-11 px-5 text-body',
};

const SEGMENT_ACTIVE: Record<SegmentedControlTone, string> = {
  primary: 'bg-white text-primary-700 shadow-xs',
  warm:    'bg-white text-secondary-700 shadow-xs',
  sun:     'bg-white text-accent-700 shadow-xs',
};

const SEGMENT_INACTIVE =
  'text-ink-600 hover:text-ink-900 hover:bg-white/60 active:scale-[0.97]';

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  tone = 'primary',
  fullWidth = false,
  className = '',
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const trackClasses = [
    TRACK_BASE,
    TRACK_SIZE[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={trackClasses}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        const segmentClasses = [
          SEGMENT_BASE,
          SEGMENT_SIZE[size],
          isActive ? SEGMENT_ACTIVE[tone] : SEGMENT_INACTIVE,
          fullWidth && 'flex-1',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={segmentClasses}
          >
            {opt.icon && (
              <span className="inline-flex items-center justify-center shrink-0 [&>svg]:w-[1em] [&>svg]:h-[1em]">
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
