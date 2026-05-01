import { useState, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterOption {
  id: string;
  label: string;
  value: string | number | boolean;
}

interface Filter {
  id: string;
  label: string;
  type: 'select' | 'multi-select' | 'range' | 'toggle';
  options?: FilterOption[];
  min?: number;
  max?: number;
  defaultValue?: any;
}

interface SearchWithFiltersProps {
  placeholder?: string;
  filters?: Filter[];
  sortOptions?: Array<{ id: string; label: string }>;
  onSearch: (query: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  onSortChange?: (sortBy: string) => void;
  debounceMs?: number;
}

export function SearchWithFilters({
  placeholder = 'Rechercher...',
  filters = [],
  sortOptions = [],
  onSearch,
  onFilterChange,
  onSortChange,
  debounceMs = 300,
}: SearchWithFiltersProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState(sortOptions[0]?.id || '');
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Debounce search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, debounceMs, onSearch]);

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = { ...activeFilters, [filterId]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    key => activeFilters[key] !== undefined && activeFilters[key] !== ''
  ).length;

  return (
    <div className="space-y-4">
      {/* Search bar + Controls */}
      <div className="flex gap-3">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
            style={{ color: 'var(--muted-foreground)' }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 rounded-xl transition-all"
            style={{
              background: 'var(--glass-white)',
              border: '2px solid var(--border)',
              fontSize: 'var(--text-base)',
              color: 'var(--foreground)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 4px rgba(85, 161, 180, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters button */}
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 rounded-xl flex items-center gap-2 transition-all relative"
            style={{
              background: showFilters ? 'var(--primary-lighter)' : 'var(--glass-white)',
              border: `2px solid ${showFilters ? 'var(--primary)' : 'var(--border)'}`,
              color: showFilters ? 'var(--primary)' : 'var(--foreground)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
            {activeFilterCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* Sort dropdown */}
        {sortOptions.length > 0 && (
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-3 rounded-xl transition-all appearance-none pr-10"
            style={{
              background: 'var(--glass-white)',
              border: '2px solid var(--border)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23252B37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div 
              className="p-6 rounded-2xl space-y-4"
              style={{
                background: 'var(--glass-white)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Filtres
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-1 rounded-lg transition-colors"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary)',
                      background: 'transparent',
                    }}
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filters.map(filter => (
                  <div key={filter.id}>
                    <label 
                      className="block mb-2"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {filter.label}
                    </label>

                    {filter.type === 'select' && (
                      <select
                        value={activeFilters[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg"
                        style={{
                          background: 'var(--input-background)',
                          border: '1px solid var(--input-border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--foreground)',
                        }}
                      >
                        <option value="">Tous</option>
                        {filter.options?.map(option => (
                          <option key={option.id} value={option.value.toString()}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {filter.type === 'multi-select' && (
                      <div className="space-y-2">
                        {filter.options?.map(option => (
                          <label 
                            key={option.id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={activeFilters[filter.id]?.includes(option.value) || false}
                              onChange={(e) => {
                                const current = activeFilters[filter.id] || [];
                                const updated = e.target.checked
                                  ? [...current, option.value]
                                  : current.filter((v: any) => v !== option.value);
                                handleFilterChange(filter.id, updated);
                              }}
                              style={{ accentColor: 'var(--primary)' }}
                            />
                            <span style={{ fontSize: 'var(--text-sm)' }}>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {filter.type === 'range' && (
                      <div>
                        <input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          value={activeFilters[filter.id] || filter.min}
                          onChange={(e) => handleFilterChange(filter.id, Number(e.target.value))}
                          className="w-full"
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <div className="flex justify-between mt-1">
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                            {filter.min}
                          </span>
                          <span style={{ 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--primary)' 
                          }}>
                            {activeFilters[filter.id] || filter.min}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                            {filter.max}
                          </span>
                        </div>
                      </div>
                    )}

                    {filter.type === 'toggle' && (
                      <button
                        onClick={() => handleFilterChange(filter.id, !activeFilters[filter.id])}
                        className="w-full px-4 py-2 rounded-lg transition-all"
                        style={{
                          background: activeFilters[filter.id] 
                            ? 'var(--primary-lighter)' 
                            : 'var(--input-background)',
                          border: `2px solid ${activeFilters[filter.id] ? 'var(--primary)' : 'var(--input-border)'}`,
                          color: activeFilters[filter.id] ? 'var(--primary)' : 'var(--foreground)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--text-sm)',
                        }}
                      >
                        {activeFilters[filter.id] ? 'Activé' : 'Désactivé'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
            const filter = filters.find(f => f.id === key);
            if (!filter) return null;

            let displayValue = value;
            if (filter.type === 'select') {
              const option = filter.options?.find(o => o.value.toString() === value.toString());
              displayValue = option?.label || value;
            } else if (filter.type === 'multi-select' && Array.isArray(value)) {
              displayValue = value.length + ' sélectionné(s)';
            }

            return (
              <div
                key={key}
                className="px-3 py-1 rounded-lg flex items-center gap-2"
                style={{
                  background: 'var(--primary-lighter)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--primary)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <span>{filter.label}: {displayValue.toString()}</span>
                <button
                  onClick={() => handleFilterChange(key, undefined)}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
