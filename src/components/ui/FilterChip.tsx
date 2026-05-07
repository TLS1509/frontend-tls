import React from 'react';

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  count?: number;
  variant?: 'default' | 'reset';
  className?: string;
  'aria-label'?: string;
}

const BASE =
  'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-pill border-[1.5px] bg-transparent font-body text-caption font-semibold cursor-pointer whitespace-nowrap transition-all ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const STATE_INACTIVE =
  'border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-ink-300 hover:text-ink-900 hover:-translate-y-px';
const STATE_ACTIVE =
  'bg-gradient-to-br from-primary-50 to-primary-100/60 border-primary-500 text-primary-800 font-bold shadow-brand-xs hover:from-primary-100 hover:to-primary-100 hover:-translate-y-px';
const STATE_RESET =
  'border-ink-200 text-ink-500 gap-1.5 hover:bg-ink-50 hover:border-ink-300 hover:text-ink-700';

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  icon,
  count,
  variant = 'default',
  className = '',
  'aria-label': ariaLabel,
}) => {
  const isReset = variant === 'reset';

  const classes = [
    BASE,
    isReset ? STATE_RESET : active ? STATE_ACTIVE : STATE_INACTIVE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const countBg = active
    ? 'bg-primary-500 text-white'
    : 'bg-ink-200 text-ink-700';

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-pressed={!isReset ? active : undefined}
      aria-label={ariaLabel}
    >
      {icon && <span className="inline-flex items-center shrink-0">{icon}</span>}
      {label}
      {count !== undefined && (
        <span
          className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-pill text-[0.625rem] font-bold leading-none ml-0.5 ${countBg}`}
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;
