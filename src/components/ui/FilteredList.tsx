import React, { useState, useDeferredValue } from 'react';
import { Search, X } from 'lucide-react';

export interface FilteredListProps<T> {
  items: T[];
  /** Return true if item matches query (called with lowercased trimmed query) */
  filterFn: (item: T, query: string) => boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  placeholder?: string;
  emptyLabel?: string;
  /** Show "N résultats" count below the search input */
  showCount?: boolean;
  /** Label for item count — e.g. "parcours" or "notifications" */
  itemLabel?: string;
  className?: string;
  listClassName?: string;
}

export function FilteredList<T>({
  items,
  filterFn,
  renderItem,
  placeholder = 'Rechercher…',
  emptyLabel = 'Aucun résultat correspondant.',
  showCount = true,
  itemLabel = 'résultats',
  className = '',
  listClassName = '',
}: FilteredListProps<T>): React.ReactElement {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);

  const normalised = deferred.trim().toLowerCase();
  const filtered = normalised ? items.filter((item) => filterFn(item, normalised)) : items;

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      {/* Search input */}
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={[
            'w-full h-10 pl-9 pr-9 rounded-xl border border-ink-200 bg-white',
            'text-body-sm font-body text-ink-900 placeholder:text-ink-400',
            'transition-all duration-base',
            'focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100',
          ].join(' ')}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            aria-label="Effacer la recherche"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Count */}
      {showCount && normalised && (
        <p className="text-caption text-ink-500 -mt-2">
          {filtered.length} {itemLabel}
        </p>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-body-sm text-ink-400 italic py-stack-lg text-center">{emptyLabel}</p>
      ) : (
        <div className={listClassName}>
          {filtered.map((item, i) => renderItem(item, i))}
        </div>
      )}
    </div>
  );
}

export default FilteredList;
