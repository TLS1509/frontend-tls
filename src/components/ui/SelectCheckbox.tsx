import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

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
 * Premium select dropdown with multiple checkbox selection.
 * Input-style interface with smooth reveal animation.
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

  const selectedCount = selected.length;
  const triggerText = selectedCount === 0 ? placeholder : `${selectedCount} filtre${selectedCount > 1 ? 's' : ''} actif${selectedCount > 1 ? 's' : ''}`;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* ===== OUTER SHELL (Double-Bezel) ===== */}
      <div className="p-0.5 bg-black/5 rounded-xl border border-ink-200">
        {/* ===== INNER CORE ===== */}
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 bg-white rounded-lg
            text-body-sm font-medium text-ink-900
            border border-ink-100
            shadow-[inset_0_1px_1px_white/15]
            flex items-center justify-between gap-2
            transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            hover:border-ink-200 hover:bg-ink-50
            active:scale-[0.98]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
          `}
        >
          <span className="text-ink-600">{triggerText}</span>
          <ChevronDown
            size={18}
            className={`
              transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </button>

        {/* ===== DROPDOWN OVERLAY ===== */}
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <div
              ref={dropdownRef}
              className={`
                absolute top-full left-0 right-0 mt-2 z-50
                bg-white border border-ink-200 rounded-xl
                shadow-lg backdrop-blur-glass-medium
                overflow-hidden
                animate-in fade-in slide-in-from-top-2 duration-300
              `}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-ink-100">
                <p className="text-micro font-bold uppercase tracking-[0.15em] text-ink-500">
                  Sélectionner les filtres
                </p>
              </div>

              {/* Options */}
              <div className="p-2 max-h-80 overflow-y-auto space-y-0.5">
                {options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg
                      cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
                      hover:bg-primary-50
                    `}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selected.includes(opt.id)}
                      onChange={() => handleToggle(opt.id)}
                      className="peer sr-only"
                    />
                    <div
                      className={`
                        w-5 h-5 rounded-md border-2 flex items-center justify-center
                        transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
                        ${
                          selected.includes(opt.id)
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-ink-300 bg-white'
                        }
                      `}
                    >
                      {selected.includes(opt.id) && (
                        <span className="text-white text-caption font-bold">✓</span>
                      )}
                    </div>
                    <span className={`text-body-sm transition-colors duration-200 ${selected.includes(opt.id) ? 'text-ink-900 font-semibold' : 'text-ink-600'}`}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-ink-100 flex gap-2">
                <button
                  onClick={() => {
                    onChange([]);
                    setIsOpen(false);
                  }}
                  className="flex-1 px-3 py-2 text-body-sm text-ink-600 hover:text-ink-900 font-medium rounded-lg hover:bg-ink-100 transition-all duration-200"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-3 py-2 text-body-sm text-white font-medium bg-primary-500 rounded-lg hover:bg-primary-600 transition-all duration-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectCheckbox;
