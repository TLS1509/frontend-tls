import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../core/Input';

export interface SelectCheckboxOption {
  id: string;
  label: string;
}

export interface SelectCheckboxProps {
  options: SelectCheckboxOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Compact glass select dropdown with checkbox selection.
 * Single-layer floating trigger + frosted popover (matches DropdownMenu's `glass` variant).
 */
export const SelectCheckbox: React.FC<SelectCheckboxProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Filtres',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (optionId: string) => {
    const newSelected = selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId];
    onChange(newSelected);
  };

  const selectedLabels = options.filter((o) => selected.includes(o.id)).map((o) => o.label);
  const isActive = selectedLabels.length > 0;
  const triggerText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length === 1
      ? selectedLabels[0]
      : `${placeholder} (${selectedLabels.length})`;

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={[
          'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-body-sm font-medium',
          'backdrop-blur-glass-light transition-all duration-base',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          isActive
            ? 'bg-primary-50/80 border border-primary-200 text-primary-700 hover:bg-primary-50'
            : 'bg-white/70 border border-ink-200/70 text-ink-700 hover:bg-white hover:border-ink-300',
        ].join(' ')}
      >
        <span className="truncate max-w-[10rem]">{triggerText}</span>
        <ChevronDown
          size={15}
          strokeWidth={2.25}
          className={`shrink-0 transition-transform duration-base ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown overlay */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div
            ref={dropdownRef}
            className={[
              'absolute top-full left-0 mt-2 z-50 min-w-[200px]',
              'bg-white/80 backdrop-blur-glass-heavy backdrop-saturate-150',
              'border border-white/60 ring-1 ring-primary-100/50 rounded-xl',
              'shadow-[0_20px_60px_-15px_rgba(85,161,180,0.35),0_8px_25px_-8px_rgba(85,161,180,0.15)]',
              'overflow-hidden animate-[dd-slide-up_0.18s_ease-out]',
            ].join(' ')}
          >
            <div className="p-1.5 max-h-72 overflow-y-auto space-y-0.5">
              {options.map((opt) => (
                <Checkbox
                  key={opt.id}
                  checked={selected.includes(opt.id)}
                  onChange={() => handleToggle(opt.id)}
                  label={opt.label}
                  className="w-full px-2.5 py-1.5 rounded-lg hover:bg-primary-50/70 transition-colors duration-base"
                />
              ))}
            </div>

            {isActive && (
              <div className="px-2.5 py-1.5 border-t border-ink-100/70">
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="w-full px-2 py-1 text-caption text-ink-500 hover:text-ink-900 font-medium rounded-md hover:bg-ink-100/60 transition-colors duration-fast text-left"
                >
                  Réinitialiser
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectCheckbox;
