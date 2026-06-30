import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterSelectProps {
  id: string;
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (ids: string[]) => void;
  multi?: boolean;
}

/**
 * FilterSelect — Reusable dropdown filter component
 * Renders a grouped filter with checkbox/radio options.
 * Can be composed with SearchBar and other FilterSelects.
 */
export const FilterSelect: React.FC<FilterSelectProps> = ({
  id,
  label,
  options,
  selected,
  onChange,
  multi = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedLabels = selected
    .map((sid) => options.find((opt) => opt.id === sid)?.label)
    .filter(Boolean)
    .join(', ');
  const displayLabel = selectedLabels || label;

  const handleChange = (optionId: string, isSelected: boolean) => {
    if (multi) {
      onChange(
        isSelected
          ? selected.filter((sid) => sid !== optionId)
          : [...selected, optionId],
      );
    } else {
      onChange(isSelected ? [] : [optionId]);
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative">
      {/* Filter dropdown button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className={[
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-base',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          'whitespace-nowrap',
          isExpanded
            ? 'bg-primary-50 border-primary-300 text-primary-700 font-medium'
            : selected.length > 0
              ? 'bg-primary-50 border-primary-200 text-primary-700 font-medium'
              : 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50',
        ].join(' ')}
      >
        <span className="text-caption truncate max-w-[180px]">{displayLabel}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-ink-200 rounded-lg shadow-md z-10 min-w-[220px] max-h-64 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <label
                key={option.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-ink-50 cursor-pointer transition-colors border-b border-ink-100 last:border-b-0"
              >
                <input
                  type={multi ? 'checkbox' : 'radio'}
                  name={id}
                  checked={isSelected}
                  onChange={(e) => handleChange(option.id, !isSelected)}
                  className="w-4 h-4 cursor-pointer accent-primary-600"
                />
                <span className="text-body-sm text-ink-700 flex-1">{option.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
