import { useState, useRef } from 'react';
import { ChevronDown, X, Calendar as CalendarIcon, Tag, SlidersHorizontal } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface AdvancedFilter {
  id: string;
  label: string;
  type: 'single' | 'multi' | 'date-range' | 'custom';
  options?: FilterOption[];
  icon?: any;
}

interface AdvancedFilterBarProps {
  filters: AdvancedFilter[];
  activeFilters: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onClearAll?: () => void;
  className?: string;
}

/**
 * Barre de filtres avancée TLS
 * Supporte filtres simples, multiples, plages de dates, custom
 * Pour Journal de bord, Veille & Apprentissages
 */
export function AdvancedFilterBar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  className = '',
}: AdvancedFilterBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const filterRefs = useRef(new Map<string, HTMLButtonElement>());

  const hasActiveFilters = Object.keys(activeFilters).some(key => {
    const value = activeFilters[key];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).reduce((count, key) => {
      const value = activeFilters[key];
      if (!value) return count;
      if (Array.isArray(value)) return count + value.length;
      return count + 1;
    }, 0);
  };

  const hasActiveFilter = (filterId: string) => {
    const value = activeFilters[filterId];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  };

  const getFilterCount = (filterId: string) => {
    const value = activeFilters[filterId];
    if (!value) return 0;
    if (Array.isArray(value)) return value.length;
    return 1;
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Filters */}
      {filters.map((filter) => {
        const isOpen = openFilter === filter.id;
        const activeValue = activeFilters[filter.id];

        return (
          <div key={filter.id} className="relative">
            {/* Filter Button */}
            <button
              ref={(el) => {
                if (el) filterRefs.current.set(filter.id, el);
              }}
              onClick={() => setOpenFilter(isOpen ? null : filter.id)}
              className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200"
              style={{
                background: isOpen || hasActiveFilter(filter.id)
                  ? 'var(--primary)'
                  : 'rgba(255, 255, 255, 0.8)',
                color: isOpen || hasActiveFilter(filter.id)
                  ? 'white'
                  : 'var(--foreground)',
                border: '1px solid',
                borderColor: isOpen || hasActiveFilter(filter.id)
                  ? 'var(--primary)'
                  : 'rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                boxShadow: isOpen
                  ? '0 4px 12px rgba(85, 161, 180, 0.2)'
                  : '0 2px 4px rgba(0, 0, 0, 0.05)',
              }}
            >
              {filter.icon && <filter.icon className="w-4 h-4" />}
              <span>{filter.label}</span>
              {hasActiveFilter(filter.id) && (
                <span
                  className="min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center"
                  style={{
                    background: 'white',
                    color: 'var(--primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}
                >
                  {getFilterCount(filter.id)}
                </span>
              )}
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Single-select Dropdown */}
            {isOpen && filter.type === 'single' && filter.options && (
              <div
                className="absolute top-full left-0 mt-2 min-w-[200px] rounded-xl shadow-lg overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  zIndex: 100,
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                {filter.options.map((option) => {
                  const isActive = activeValue === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        onFilterChange(filter.id, option.id);
                        setOpenFilter(null);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 transition-colors"
                      style={{
                        background: isActive ? 'var(--primary-50)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--foreground)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <span>{option.label}</span>
                      {option.count !== undefined && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: isActive ? 'var(--primary)' : 'rgba(0, 0, 0, 0.06)',
                            color: isActive ? 'white' : 'var(--muted-foreground)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {option.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Multi-select Dropdown */}
            {isOpen && filter.type === 'multi' && filter.options && (
              <div
                className="absolute top-full left-0 mt-2 min-w-[200px] rounded-xl shadow-lg overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  zIndex: 100,
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                {filter.options.map((option) => {
                  const selectedValues = (activeValue as string[]) || [];
                  const isActive = selectedValues.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        const newValues = isActive
                          ? selectedValues.filter(v => v !== option.id)
                          : [...selectedValues, option.id];
                        onFilterChange(filter.id, newValues);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 transition-colors"
                      style={{
                        background: isActive ? 'var(--primary-50)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--foreground)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {/* Checkbox */}
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: 'var(--radius-sm)',
                            border: isActive ? 'none' : '2px solid rgba(0, 0, 0, 0.2)',
                            background: isActive ? 'var(--primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isActive && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                      {option.count !== undefined && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: isActive ? 'var(--primary)' : 'rgba(0, 0, 0, 0.06)',
                            color: isActive ? 'white' : 'var(--muted-foreground)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {option.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Clear All Button */}
      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
          style={{
            background: 'transparent',
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.color = 'var(--foreground)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          <X className="w-4 h-4" />
          <span>Effacer ({getActiveFilterCount()})</span>
        </button>
      )}

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
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

/**
 * Exemple de configuration pour Journal de bord
 */
export const journalFilters: AdvancedFilter[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    icon: Tag,
    options: [
      { id: 'guided', label: 'Réflexion post découverte', count: 12 },
      { id: 'free', label: 'Réflexion libre', count: 8 },
      { id: 'learning', label: 'Apprentissage', count: 15 },
      { id: 'coaching', label: 'Session coaching', count: 5 },
      { id: 'insight', label: 'Moment Eurêka', count: 3 },
    ],
  },
  {
    id: 'period',
    label: 'Période',
    type: 'single',
    icon: CalendarIcon,
    options: [
      { id: 'today', label: "Aujourd'hui" },
      { id: 'week', label: 'Cette semaine' },
      { id: 'month', label: 'Ce mois' },
      { id: 'quarter', label: 'Ce trimestre' },
      { id: 'all', label: 'Tout' },
    ],
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'multi',
    icon: Tag,
    options: [
      { id: 'ia', label: 'IA & Prompts', count: 18 },
      { id: 'leadership', label: 'Leadership', count: 9 },
      { id: 'technique', label: 'Technique', count: 14 },
      { id: 'soft-skills', label: 'Soft Skills', count: 11 },
    ],
  },
];

/**
 * Exemple de configuration pour Veille & Apprentissages
 */
export const veilleFilters: AdvancedFilter[] = [
  {
    id: 'source',
    label: 'Source',
    type: 'multi',
    icon: SlidersHorizontal,
    options: [
      { id: 'articles', label: 'Articles', count: 24 },
      { id: 'videos', label: 'Vidéos', count: 12 },
      { id: 'podcasts', label: 'Podcasts', count: 8 },
      { id: 'livres', label: 'Livres', count: 5 },
    ],
  },
  {
    id: 'category',
    label: 'Catégorie',
    type: 'single',
    icon: Tag,
    options: [
      { id: 'all', label: 'Toutes les catégories' },
      { id: 'ia', label: 'Intelligence Artificielle' },
      { id: 'management', label: 'Management' },
      { id: 'tech', label: 'Technologies' },
      { id: 'formation', label: 'Formation' },
    ],
  },
  {
    id: 'status',
    label: 'Statut',
    type: 'single',
    icon: SlidersHorizontal,
    options: [
      { id: 'all', label: 'Tous', count: 49 },
      { id: 'unread', label: 'Non lus', count: 15 },
      { id: 'reading', label: 'En cours', count: 8 },
      { id: 'completed', label: 'Terminés', count: 26 },
    ],
  },
];