import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Input } from '../core/Input';
import { Button } from '../core/Button';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  multi?: boolean;
  options: FilterOption[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

export interface CompactFilterPanelProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  hasActiveFilters: boolean;
  onReset: () => void;
  filters: FilterGroup[];
}

/**
 * CompactFilterPanel — Grouped filter dropdowns + search input
 * Replaces the tall SearchFilters panel with compact grouped selects.
 *
 * Layout:
 * • Row 1: Search input (full width)
 * • Row 2: Filter dropdowns (inline, wrapped)
 * • Density: Much more compact than full SearchFilters panel
 */
export const CompactFilterPanel: React.FC<CompactFilterPanelProps> = ({
  query,
  onQueryChange,
  placeholder = 'Rechercher…',
  hasActiveFilters,
  onReset,
  filters,
}) => {
  const [expandedFilterId, setExpandedFilterId] = useState<string | null>(null);

  const toggleFilterDropdown = (filterId: string) => {
    setExpandedFilterId(expandedFilterId === filterId ? null : filterId);
  };

  const handleFilterChange = (filterId: string, selectedIds: string[]) => {
    const filter = filters.find((f) => f.id === filterId);
    if (filter) {
      filter.onChange(selectedIds);
    }
  };

  return (
    <div className="flex flex-col gap-stack bg-white rounded-xl border border-ink-100 p-4 md:p-6">
      {/* Search input row */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          leadingIcon={<Search size={16} />}
          className="flex-1"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Effacer la recherche"
            className="p-2 hover:bg-ink-50 rounded-md transition-colors"
          >
            <X size={16} className="text-ink-400" />
          </button>
        )}
      </div>

      {/* Filter dropdowns row */}
      <div className="flex flex-wrap gap-2 items-center">
        {filters.map((filter) => {
          const isExpanded = expandedFilterId === filter.id;
          const selectedLabels = filter.selected
            .map((id) => filter.options.find((opt) => opt.id === id)?.label)
            .filter(Boolean)
            .join(', ');
          const displayLabel = selectedLabels || filter.label;

          return (
            <div key={filter.id} className="relative">
              {/* Filter dropdown button */}
              <button
                type="button"
                onClick={() => toggleFilterDropdown(filter.id)}
                aria-expanded={isExpanded}
                className={[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-base',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  isExpanded
                    ? 'bg-primary-50 border-primary-300 text-primary-700 font-medium'
                    : filter.selected.length > 0
                      ? 'bg-primary-50 border-primary-200 text-primary-700 font-medium'
                      : 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50',
                ].join(' ')}
              >
                <span className="text-caption truncate max-w-[180px]">{displayLabel}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown menu */}
              {isExpanded && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-ink-200 rounded-lg shadow-md z-10 min-w-[220px] max-h-64 overflow-y-auto">
                  {filter.options.map((option) => {
                    const isSelected = filter.selected.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-ink-50 cursor-pointer transition-colors border-b border-ink-100 last:border-b-0"
                      >
                        <input
                          type={filter.multi ? 'checkbox' : 'radio'}
                          name={filter.id}
                          checked={isSelected}
                          onChange={() => {
                            if (filter.multi) {
                              handleFilterChange(
                                filter.id,
                                isSelected
                                  ? filter.selected.filter((id) => id !== option.id)
                                  : [...filter.selected, option.id],
                              );
                            } else {
                              handleFilterChange(filter.id, isSelected ? [] : [option.id]);
                              setExpandedFilterId(null);
                            }
                          }}
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
        })}

        {/* Reset button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto"
          >
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompactFilterPanel;
