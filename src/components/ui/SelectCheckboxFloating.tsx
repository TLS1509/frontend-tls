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
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      {label && <span className="text-body font-semibold text-ink-900">{label}</span>}

      {/* Floating pills container */}
      <div className="flex flex-wrap gap-stack-xs">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <label
              key={option.id}
              /* Option : 44 px, rayon 14 (contrôle au-dessus du seuil de 28 px,
                 comme `FilterChip`), libellé 16 / 400 aux deux états — c'est un
                 libellé de case à cocher, et la case dit l'état. Choisie : filet
                 et case au cran 700 (arbitrage n°9). */
              className={[
                'flex items-center gap-stack-xs min-h-touch px-stack rounded-lg border transition-all cursor-pointer',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500',
                isSelected
                  ? 'bg-primary-50 border-primary-700 text-ink-900 shadow-xs'
                  : 'bg-white border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-ink-300',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.id)}
                className="w-4 h-4 cursor-pointer accent-primary-700 rounded-xs"
              />
              <span className="text-body">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectCheckboxFloating;
