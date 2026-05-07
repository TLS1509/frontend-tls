import React from 'react';

/**
 * FilterChip — Toggle pill for filtering content lists.
 *
 * States: inactive (default), active (aria-pressed=true), reset variant.
 * Supports optional icon, label, and numeric count badge.
 */

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

const BASE = 'inline-flex items-center gap-1 px-3 py-2 rounded-pill border-[1.5px] bg-transparent font-body text-caption font-medium cursor-pointer whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const STATE_INACTIVE = 'border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-ink-300 hover:text-ink-900 hover:-translate-y-px';
const STATE_ACTIVE   = 'bg-primary-50 border-2 border-primary-500 text-primary-700 font-semibold shadow-brand-sm hover:bg-primary-100 hover:border-primary-600 hover:-translate-y-px';
const STATE_RESET    = 'border-ink-200 text-ink-500 gap-1.5 hover:bg-ink-50 hover:border-ink-300 hover:text-ink-600';

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
    isReset ? STATE_RESET : (active ? STATE_ACTIVE : STATE_INACTIVE),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const countBg = active ? 'bg-primary-200/60 text-primary-700' : 'bg-ink-200/60 text-ink-600';

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
          className={`inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-pill text-[0.625rem] font-bold leading-none ml-1 ${countBg}`}
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;
