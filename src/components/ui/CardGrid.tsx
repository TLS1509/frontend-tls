import React, { useState, useDeferredValue } from 'react';
import { Search, X, LayoutGrid, List } from 'lucide-react';

export type CardGridLayout = 'grid' | 'list';
export type CardGridColumns = 2 | 3 | 4;

export interface CardGridProps<T> {
  items: T[];
  renderCard: (item: T, index: number, layout: CardGridLayout) => React.ReactNode;
  /** If provided, enables live search filtering */
  filterFn?: (item: T, query: string) => boolean;
  /** Optional categories for filtering chips */
  categories?: string[];
  categoryFn?: (item: T) => string;
  searchPlaceholder?: string;
  emptyLabel?: string;
  /** Default columns in grid mode (desktop) */
  columns?: CardGridColumns;
  /** Allow user to toggle grid ↔ list layout */
  allowLayoutToggle?: boolean;
  defaultLayout?: CardGridLayout;
  className?: string;
}

const GRID_COLS: Record<CardGridColumns, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function CardGrid<T>({
  items,
  renderCard,
  filterFn,
  categories,
  categoryFn,
  searchPlaceholder = 'Rechercher…',
  emptyLabel = 'Aucun résultat.',
  columns = 3,
  allowLayoutToggle = false,
  defaultLayout = 'grid',
  className = '',
}: CardGridProps<T>): React.ReactElement {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [layout, setLayout] = useState<CardGridLayout>(defaultLayout);
  const deferred = useDeferredValue(query);

  const normalised = deferred.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesSearch = !filterFn || !normalised || filterFn(item, normalised);
    const matchesCategory =
      !activeCategory || !categoryFn || categoryFn(item) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const hasFilters = Boolean(filterFn) || (categories && categories.length > 0);

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      {/* Toolbar */}
      {(hasFilters || allowLayoutToggle) && (
        <div className="flex flex-col gap-stack-xs sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          {filterFn && (
            <div className="relative flex items-center flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
                  aria-label="Effacer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Layout toggle */}
          {allowLayoutToggle && (
            <div className="inline-flex items-center gap-1 bg-ink-100 rounded-lg p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setLayout('grid')}
                aria-pressed={layout === 'grid'}
                aria-label="Vue grille"
                className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-md transition-all duration-fast',
                  layout === 'grid'
                    ? 'bg-white text-primary-700 shadow-xs'
                    : 'text-ink-500 hover:text-ink-700',
                ].join(' ')}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLayout('list')}
                aria-pressed={layout === 'list'}
                aria-label="Vue liste"
                className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-md transition-all duration-fast',
                  layout === 'list'
                    ? 'bg-white text-primary-700 shadow-xs'
                    : 'text-ink-500 hover:text-ink-700',
                ].join(' ')}
              >
                <List size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Category chips */}
      {categories && categories.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={[
              'inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-all duration-fast',
              activeCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
            ].join(' ')}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={[
                'inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-all duration-fast',
                activeCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      {(normalised || activeCategory) && (
        <p className="text-caption text-ink-500 -mt-2">
          {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <p className="text-body-sm text-ink-400 italic py-8 text-center">{emptyLabel}</p>
      ) : layout === 'grid' ? (
        <div className={['grid gap-stack', GRID_COLS[columns]].join(' ')}>
          {filtered.map((item, i) => renderCard(item, i, 'grid'))}
        </div>
      ) : (
        <div className="flex flex-col gap-stack-xs">
          {filtered.map((item, i) => renderCard(item, i, 'list'))}
        </div>
      )}
    </div>
  );
}

export default CardGrid;
