import React from 'react';

export interface SelectCheckboxFloatingOption {
  id: string;
  label: string;
}

export interface SelectCheckboxFloatingProps {
  options: SelectCheckboxFloatingOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  className?: string;
}

/**
 * SelectCheckboxFloating — Multi-select with floating pill options
 *
 * Displays options as floating pills/chips with checkboxes, grouped by section.
 * Similar to Figma's filter UI — compact and visual.
 *
 * Better UX than dropdown for:
 * - Multiple options visible at once
 * - Visual scanning of available choices
 * - Mobile-friendly (no scrolling dropdown)
 *
 * Usage:
 * <SelectCheckboxFloating
 *   label="Thématique"
 *   options={[
 *     { id: 'comm', label: 'Communication' },
 *     { id: 'coop', label: 'Coopération' },
 *   ]}
 *   selected={['comm']}
 *   onChange={setSelected}
 * />
 */
export const SelectCheckboxFloating: React.FC<SelectCheckboxFloatingProps> = ({
  options,
  selected,
  onChange,
  label,
  className = '',
}) => {
  const handleToggle = (optionId: string) => {
    const newSelected = selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId];
    onChange(newSelected);
  };

  return (
    <div className={`flex flex-col gap-tight ${className}`}>
      {label && <span className="text-body-sm font-semibold text-ink-700">{label}</span>}

      {/* Floating pills container */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-pill border transition-all cursor-pointer',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500',
                isSelected
                  ? 'bg-primary-50 border-primary-200 text-primary-700 font-medium shadow-xs'
                  : 'bg-white border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-ink-300',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.id)}
                className="w-4 h-4 cursor-pointer accent-primary-600 rounded"
              />
              <span className="text-body-sm">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCheckboxFloating;
