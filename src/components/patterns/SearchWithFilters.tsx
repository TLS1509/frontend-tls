import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

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
  placeholder = 'Search...',
  onSearch,
  onFilterChange,
  filterGroups = [],
  initialQuery = '',
  initialFilters = {},
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

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

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const activeFilterCount = Object.values(filters).flat().length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div className="relative flex items-center bg-white border border-ink-300 rounded-xl focus-within:border-primary-400 focus-within:shadow-brand-sm transition-all">
        <Search size={18} className="ml-3 text-ink-500 shrink-0" aria-hidden="true" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          className="flex-1 bg-transparent border-0 outline-none px-3 py-2.5 font-body text-body-sm text-ink-900 h-auto placeholder:text-ink-500 focus:outline-none focus:bg-transparent focus:shadow-none"
        />
        {query && (
          <button
            className="mr-2 inline-flex items-center justify-center w-7 h-7 rounded-md bg-ink-50 hover:bg-ink-200 text-ink-500 hover:text-ink-900 cursor-pointer border-0 transition-colors"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {filterGroups.length > 0 && (
        <div className="flex flex-wrap gap-2 items-start">
          {filterGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const activeCount = (filters[group.id] || []).length;

            return (
              <div key={group.id} className="relative">
                <button
                  className={[
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border text-caption font-medium cursor-pointer transition-colors',
                    activeCount > 0
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-ink-200 bg-white text-ink-700 hover:bg-ink-50',
                  ].join(' ')}
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isExpanded}
                >
                  <span>{group.label}</span>
                  {activeCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-pill bg-primary-500 text-white text-micro font-bold leading-none">
                      {activeCount}
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className={['transition-transform', isExpanded ? 'rotate-180' : ''].join(' ')}
                  />
                </button>

                {isExpanded && (
                  <div className="absolute top-full left-0 mt-1 z-20 min-w-[220px] bg-white border border-ink-200 rounded-lg shadow-lg p-2 flex flex-col gap-1">
                    {group.options.map((option) => {
                      const isChecked = (filters[group.id] || []).includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-ink-50 cursor-pointer text-body-sm text-ink-900"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFilterToggle(group.id, option.id)}
                            className="w-4 h-4 accent-primary-500"
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
              className="inline-flex items-center px-3 py-1.5 rounded-pill border border-ink-200 bg-transparent text-caption text-ink-500 hover:bg-ink-50 hover:text-ink-900 cursor-pointer transition-colors"
              onClick={handleClearFilters}
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithFilters;
