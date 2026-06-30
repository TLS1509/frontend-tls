import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterSelect, type FilterSelectProps } from './FilterSelect';
import { Button } from '../core/Button';

export interface SearchFiltersCompositeProps {
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder?: string;
  hasActiveFilters: boolean;
  onReset: () => void;
  filters: FilterSelectProps[];
}

/**
 * SearchFiltersComposite — Composite pattern: SearchBar + multiple FilterSelects
 *
 * Composes smaller, reusable components:
 * • SearchBar (standalone search input)
 * • FilterSelect (dropdown filter — can be used independently)
 *
 * This pattern is more flexible than CompactFilterPanel:
 * - SearchBar can be used alone in other contexts
 * - FilterSelect can be used in different layouts
 * - Easy to add/remove filters or customize layout
 *
 * Usage:
 * <SearchFiltersComposite
 *   query={query}
 *   onQueryChange={setQuery}
 *   filters={[
 *     { id: 'type', label: 'Type', options: [...], selected, onChange },
 *     { id: 'theme', label: 'Theme', options: [...], selected, onChange },
 *   ]}
 *   hasActiveFilters={hasActive}
 *   onReset={reset}
 * />
 */
export const SearchFiltersComposite: React.FC<SearchFiltersCompositeProps> = ({
  query,
  onQueryChange,
  searchPlaceholder = 'Rechercher…',
  hasActiveFilters,
  onReset,
  filters,
}) => {
  return (
    <div className="flex flex-col gap-stack bg-white rounded-xl border border-ink-100 p-4 md:p-6">
      {/* SearchBar component */}
      <SearchBar
        value={query}
        onChange={onQueryChange}
        placeholder={searchPlaceholder}
        onClear={() => undefined}
      />

      {/* Filter dropdowns row */}
      <div className="flex flex-wrap gap-2 items-center">
        {filters.map((filterProps) => (
          <FilterSelect key={filterProps.id} {...filterProps} />
        ))}

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

export default SearchFiltersComposite;
