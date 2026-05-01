/**
 * FilterBar
 *
 * Reusable filter bar component with selectable chips and clear all button.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <FilterBar
 *   options={[
 *     { id: 'all', label: 'All' },
 *     { id: 'unread', label: 'Unread' },
 *   ]}
 *   selected={['all']}
 *   onChange={(ids) => setFilters(ids)}
 *   onClearAll={() => setFilters([])}
 * />
 */

import React from 'react';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterBarProps {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  onClearAll?: () => void;
  multiSelect?: boolean;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selected,
  onChange,
  onClearAll,
  multiSelect = true,
  className = '',
}) => {
  const handleFilterChange = (id: string) => {
    if (multiSelect) {
      const newSelected = selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id];
      onChange(newSelected);
    } else {
      onChange(selected.includes(id) ? [] : [id]);
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${className}`}
      style={{
        padding: 'var(--s-3)',
        background: 'var(--surface-muted)',
        borderRadius: 'var(--r-xl)',
      }}
    >
      {/* Filter Chips */}
      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <button
            key={option.id}
            onClick={() => handleFilterChange(option.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: '6px 12px',
              borderRadius: 'var(--r-lg)',
              border: isSelected ? 'none' : '1px solid transparent',
              background: isSelected ? 'var(--tls-primary-500)' : 'var(--surface)',
              color: isSelected ? 'white' : 'var(--text)',
              fontSize: 'var(--t-body-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--dur-2)',
              boxShadow: isSelected ? 'var(--shadow-xs)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'var(--surface)';
                e.currentTarget.style.borderColor = 'var(--tls-primary-200)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.background = 'var(--surface)';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
          >
            {option.icon && <span>{option.icon}</span>}
            {option.label}
          </button>
        );
      })}

      {/* Clear All Button */}
      {selected.length > 0 && onClearAll && (
        <>
          <div
            style={{
              width: 1,
              height: 24,
              background: 'var(--border-subtle)',
              margin: '0 var(--s-1)',
            }}
          />
          <button
            onClick={onClearAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: '6px 12px',
              borderRadius: 'var(--r-lg)',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: 'var(--t-body-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'color var(--dur-2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--tls-danger-base)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
            title="Clear all filters"
          >
            <X size={16} />
            Clear all
          </button>
        </>
      )}
    </div>
  );
};

export default FilterBar;
