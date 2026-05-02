import React from 'react';
import './FilterChip.css';

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
  /** Optional count to display after the label */
  count?: number;
  variant?: 'default' | 'reset';
  className?: string;
  'aria-label'?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  icon,
  count,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
}) => {
  const isReset = variant === 'reset';

  const classes = [
    'filter-chip',
    isReset && 'filter-chip--reset',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-pressed={!isReset ? active : undefined}
      aria-label={ariaLabel}
    >
      {icon && <span className="filter-chip__icon">{icon}</span>}
      {label}
      {count !== undefined && (
        <span className="filter-chip__count" aria-hidden="true">
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;
