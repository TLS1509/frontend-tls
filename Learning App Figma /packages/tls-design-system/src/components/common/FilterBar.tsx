interface FilterChip {
  id: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  filters: FilterChip[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

/**
 * Barre de filtres standardisée TLS
 * Utilisée dans Journal, Veille, Notifications, etc.
 */
export function FilterBar({ filters, activeFilter, onFilterChange, className = '' }: FilterBarProps) {
  return (
    <div className={`flex items-center gap-3 overflow-x-auto ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200"
            style={{
              background: isActive 
                ? 'linear-gradient(135deg, var(--primary), #4A8FA0)'
                : 'rgba(0, 0, 0, 0.03)',
              color: isActive ? 'white' : 'var(--foreground)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: isActive ? '0 4px 12px rgba(85, 161, 180, 0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
              }
            }}
          >
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span 
                className="px-2 py-0.5 rounded-lg"
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.06)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                }}
              >
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
