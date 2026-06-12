import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface CategoryOption {
  id: string;
  label: string;
  subcategories?: Array<{ id: string; label: string }>;
}

export interface SelectCheckboxCategoryProps {
  categories: CategoryOption[];
  selected: string; // single selection mode — returns parent category id
  onChange: (selected: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Premium scrollable category select with nested subcategories.
 * Single-selection mode with smooth staggered reveal.
 */
export const SelectCheckboxCategory: React.FC<SelectCheckboxCategoryProps> = ({
  categories,
  selected,
  onChange,
  placeholder = 'Catégories',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  const selectedLabel = categories.find((c) => c.id === selected)?.label || placeholder;

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
          <span className="text-ink-600">{selectedLabel}</span>
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
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

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
                  Catégories
                </p>
              </div>

              {/* Scrollable categories */}
              <div className="max-h-96 overflow-y-auto p-2 space-y-0.5">
                {categories.map((cat, idx) => {
                  const isSelected = selected === cat.id;
                  const isExpanded = expandedParent === cat.id && cat.subcategories;

                  return (
                    <div
                      key={cat.id}
                      style={{ animationDelay: `${idx * 30}ms` }}
                      className="animate-in fade-in slide-in-from-left-2 duration-300"
                    >
                      {/* Parent category */}
                      <button
                        onClick={() => {
                          onChange(cat.id);
                          setIsOpen(false);
                        }}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg
                          transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
                          ${
                            isSelected
                              ? 'bg-primary-50 border border-primary-200'
                              : 'hover:bg-ink-50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-stack-xs flex-1">
                          {/* Radio dot */}
                          <div
                            className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
                              ${
                                isSelected
                                  ? 'bg-primary-500 border-primary-500'
                                  : 'border-ink-300 bg-white'
                              }
                            `}
                          >
                            {isSelected && (
                              <span className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span
                            className={`text-body-sm transition-all duration-200 ${
                              isSelected ? 'text-ink-900 font-semibold' : 'text-ink-600'
                            }`}
                          >
                            {cat.label}
                          </span>
                        </div>

                        {/* Expand arrow for subcategories */}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedParent(
                                isExpanded ? null : cat.id
                              );
                            }}
                            className="p-1 hover:bg-ink-100 rounded-md transition-all"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : 'rotate-0'
                              }`}
                            />
                          </button>
                        )}
                      </button>

                      {/* Subcategories (expandable) */}
                      {isExpanded && cat.subcategories && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l border-ink-100 pl-3">
                          {cat.subcategories.map((sub, subIdx) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                onChange(cat.id); // Still filters by parent
                                setIsOpen(false);
                              }}
                              style={{ animationDelay: `${300 + subIdx * 20}ms` }}
                              className={`
                                w-full text-left px-3 py-2 rounded-lg text-body-sm
                                transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
                                animate-in fade-in slide-in-from-left-1
                                hover:bg-primary-50 hover:text-primary-700
                              `}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-ink-100">
                <button
                  onClick={() => {
                    onChange('all');
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-body-sm text-ink-600 hover:text-ink-900 font-medium rounded-lg hover:bg-ink-100 transition-all duration-200"
                >
                  Voir tous
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectCheckboxCategory;
