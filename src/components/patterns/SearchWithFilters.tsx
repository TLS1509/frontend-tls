/**
 * SearchWithFilters — Search Pattern
 *
 * Search input with filter chip pills.
 * Supports category, difficulty, duration, and custom filters.
 *
 * Usage:
 *   <SearchWithFilters
 *     placeholder="Search lessons..."
 *     onSearch={(query) => console.log(query)}
 *     onFilterChange={(filters) => console.log(filters)}
 *     filters={[
 *       { id: 'difficulty', label: 'Difficulty', values: ['beginner', 'advanced'] },
 *       { id: 'duration', label: 'Duration', values: ['< 1h', '1-2h'] }
 *     ]}
 *   />
 */

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../core/Input';
import './SearchWithFilters.css';

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

      const newState: Record<string, string[]> = {
        ...prev,
      };

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
    <div className={`search-with-filters ${className}`}>
      {/* Search input */}
      <div className="search-with-filters__search">
        <Search size={18} className="search-with-filters__search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          className="search-with-filters__input"
        />
        {query && (
          <button
            className="search-with-filters__clear-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters */}
      {filterGroups.length > 0 && (
        <div className="search-with-filters__filters">
          {filterGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const activeCount = (filters[group.id] || []).length;

            return (
              <div key={group.id} className="search-with-filters__filter-group">
                <button
                  className="search-with-filters__filter-header"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isExpanded}
                >
                  <span className="search-with-filters__filter-label">{group.label}</span>
                  {activeCount > 0 && (
                    <span className="search-with-filters__filter-badge">
                      {activeCount}
                    </span>
                  )}
                  <span
                    className={`search-with-filters__filter-arrow${
                      isExpanded ? ' search-with-filters__filter-arrow--open' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className="search-with-filters__filter-options">
                    {group.options.map((option) => {
                      const isChecked = (filters[group.id] || []).includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className="search-with-filters__filter-option"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() =>
                              handleFilterToggle(group.id, option.id)
                            }
                            className="search-with-filters__filter-checkbox"
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
              className="search-with-filters__clear-filters"
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
