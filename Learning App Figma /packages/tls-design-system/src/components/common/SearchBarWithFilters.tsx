import { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { AdvancedFilterBar, AdvancedFilter } from './AdvancedFilterBar';

interface SearchBarWithFiltersProps {
  // Search
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  // Filters
  filters: AdvancedFilter[];
  activeFilters: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClearAllFilters: () => void;
  
  // Display
  className?: string;
}

/**
 * Barre de recherche avec filtres avancés intégrés
 * Les filtres apparaissent au clic sur la barre de recherche
 * Version compacte sans header
 * 
 * @example
 * ```tsx
 * <SearchBarWithFilters
 *   searchValue={query}
 *   onSearchChange={setQuery}
 *   searchPlaceholder="Rechercher des articles..."
 *   filters={veilleFilters}
 *   activeFilters={activeFilters}
 *   onFilterChange={(id, value) => setActiveFilters({ ...activeFilters, [id]: value })}
 *   onClearAllFilters={() => setActiveFilters({})}
 * />
 * ```
 */
export function SearchBarWithFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Rechercher...',
  filters,
  activeFilters,
  onFilterChange,
  onClearAllFilters,
  className = '',
}: SearchBarWithFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFiltersOpen(false);
      }
    }

    if (isFiltersOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
    return undefined;
  }, [isFiltersOpen]);

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value !== '' && value !== 'all';
    return value !== null && value !== undefined;
  }).length;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Bar */}
      <div 
        className="relative flex items-center cursor-text"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isFiltersOpen ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: isFiltersOpen 
            ? '0 4px 20px 0 rgba(85, 161, 180, 0.15)' 
            : '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
        }}
        onClick={() => setIsFiltersOpen(true)}
      >
        <Search 
          className="absolute left-4 w-5 h-5 pointer-events-none" 
          style={{ color: isFiltersOpen ? 'var(--primary)' : 'var(--muted-foreground)' }}
        />
        
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-32 py-3 bg-transparent outline-none"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--foreground)',
            borderRadius: 'var(--radius-2xl)',
          }}
        />

        {/* Filter Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFiltersOpen(!isFiltersOpen);
          }}
          className="absolute right-3 px-3 py-1.5 rounded-xl flex items-center gap-2 transition-all duration-300"
          style={{
            background: isFiltersOpen || activeFilterCount > 0
              ? 'var(--primary)'
              : 'rgba(0, 0, 0, 0.05)',
            color: isFiltersOpen || activeFilterCount > 0
              ? 'white'
              : 'var(--muted-foreground)',
          }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span 
              className="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center"
              style={{
                background: 'white',
                color: 'var(--primary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters Dropdown Panel - Compact Version */}
      {isFiltersOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-visible p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            animation: 'slideDown 0.2s ease-out',
          }}
        >
          <AdvancedFilterBar
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAllFilters}
          />
        </div>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}