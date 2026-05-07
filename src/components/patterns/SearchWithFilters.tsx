import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface SearchWithFiltersProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
  filterGroups?: FilterGroup[];
  initialQuery?: string;
  initialFilters?: Record<string, string[]>;
  className?: string;
}

export const SearchWithFilters: React.FC<SearchWithFiltersProps> = ({
  placeholder = 'Rechercher…',
  onSearch,
  onFilterChange,
  filterGroups = [],
  initialQuery = '',
  initialFilters = {},
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    if (openGroup) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openGroup]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleFilterToggle = (groupId: string, optionId: string) => {
    setFilters((prev) => {
      const groupFilters = prev[groupId] || [];
      const newFilters = groupFilters.includes(optionId)
        ? groupFilters.filter((id) => id !== optionId)
        : [...groupFilters, optionId];

      const newState: Record<string, string[]> = { ...prev };
      if (newFilters.length > 0) {
        newState[groupId] = newFilters;
      } else {
        delete newState[groupId];
      }

      onFilterChange(newState);
      return newState;
    });
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch('');
  };

  const activeFilterCount = Object.values(filters).flat().length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div ref={containerRef} className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div className="relative flex items-center bg-white border border-ink-300 rounded-2xl focus-within:border-primary-400 focus-within:shadow-brand-sm transition-all duration-200 group">
        <Search size={18} className="ml-4 text-ink-400 shrink-0 group-focus-within:text-primary-500 transition-colors" aria-hidden="true" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          className="flex-1 bg-transparent border-0 outline-none px-3 py-3 font-body text-body text-ink-900 h-auto placeholder:text-ink-400 focus:outline-none focus:bg-transparent focus:shadow-none"
        />
        {query && (
          <button
            className="mr-3 inline-flex items-center justify-center w-7 h-7 rounded-full bg-ink-100 hover:bg-ink-200 text-ink-500 hover:text-ink-900 cursor-pointer border-0 transition-all"
            onClick={handleClearSearch}
            aria-label="Effacer la recherche"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {filterGroups.length > 0 && (
        <div className="flex flex-wrap gap-2 items-start">
          {filterGroups.map((group) => {
            const isOpen = openGroup === group.id;
            const activeCount = (filters[group.id] || []).length;
            const hasActive = activeCount > 0;

            return (
              <div key={group.id} className="relative">
                <button
                  className={[
                    'inline-flex items-center gap-2 px-4 py-2 rounded-pill border-[1.5px] text-caption font-semibold cursor-pointer transition-all',
                    'hover:-translate-y-px',
                    hasActive
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-brand-xs'
                      : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50',
                  ].join(' ')}
                  onClick={() => setOpenGroup(isOpen ? null : group.id)}
                  aria-expanded={isOpen}
                >
                  <span>{group.label}</span>
                  {hasActive && (
                    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-pill bg-primary-500 text-white text-micro font-bold leading-none">
                      {activeCount}
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className={['transition-transform duration-200', isOpen ? 'rotate-180' : ''].join(' ')}
                  />
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 z-30 min-w-[240px] bg-white border border-ink-200 rounded-xl shadow-xl p-1.5 flex flex-col gap-0.5 animate-[dd-slide-up_0.18s_ease-out]">
                    {group.options.map((option) => {
                      const isChecked = (filters[group.id] || []).includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className={[
                            'inline-flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-body-sm transition-colors',
                            isChecked
                              ? 'bg-primary-50 text-primary-800 font-semibold'
                              : 'text-ink-900 hover:bg-ink-50',
                          ].join(' ')}
                        >
                          <span
                            className={[
                              'inline-flex items-center justify-center w-5 h-5 rounded-md border-2 transition-colors shrink-0',
                              isChecked ? 'bg-primary-500 border-primary-500' : 'border-ink-300 bg-white',
                            ].join(' ')}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} className="text-white" />}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFilterToggle(group.id, option.id)}
                            className="sr-only"
                          />
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {hasActiveFilters && (
            <button
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-pill bg-transparent text-caption font-medium text-ink-500 hover:text-danger-fg hover:bg-danger-bg cursor-pointer transition-colors border border-transparent"
              onClick={handleClearFilters}
            >
              <X size={14} />
              Tout effacer ({activeFilterCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithFilters;
