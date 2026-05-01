/**
 * Components Showcase Layout Wrapper
 *
 * Wraps the Components page with enhanced UX/UI:
 * - Sticky header with search and multi-select filtering
 * - Advanced filter state management
 * - Responsive layout
 */

import { useState, useCallback } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '../components';
import { debounce } from '../utils/design-system';
import '../styles/components-showcase.css';

type Category = 'Core' | 'Patterns' | 'Composite Patterns' | 'Learning' | 'Navigation';
type TokenType = 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'motion' | 'gradient' | 'role';

export interface ComponentsLayoutProps {
  children: React.ReactNode;
}

/**
 * Enhanced filter state structure
 */
interface FilterState {
  query: string;
  categories: Set<Category>;
  tokenType: TokenType | 'all';
  viewMode: 'grid' | 'list';
  density: 'compact' | 'normal' | 'spacious';
  showResponsive: boolean;
  darkMode: boolean;
}

export const ComponentsLayout: React.FC<ComponentsLayoutProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    categories: new Set(),
    tokenType: 'all',
    viewMode: 'grid',
    density: 'normal',
    showResponsive: false,
    darkMode: false,
  });

  /**
   * Handle search input with debouncing
   */
  const handleSearch = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, query: value }));
    }, 300),
    []
  );

  /**
   * Toggle category filter (multi-select)
   */
  const handleCategoryToggle = (category: Category) => {
    setFilters((prev) => {
      const newCategories = new Set(prev.categories);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return { ...prev, categories: newCategories };
    });
  };

  /**
   * Reset all filters
   */
  const handleReset = () => {
    setFilters({
      query: '',
      categories: new Set(),
      tokenType: 'all',
      viewMode: 'grid',
      density: 'normal',
      showResponsive: false,
      darkMode: false,
    });
  };

  /**
   * Toggle a single filter option
   */
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categories: Category[] = ['Core', 'Patterns', 'Composite Patterns', 'Learning', 'Navigation'];
  const tokenTypes: TokenType[] = ['color', 'typography', 'spacing', 'radius', 'shadow', 'motion', 'gradient', 'role'];

  const hasActiveFilters =
    filters.query !== '' ||
    filters.categories.size > 0 ||
    filters.tokenType !== 'all' ||
    filters.viewMode !== 'grid' ||
    filters.density !== 'normal' ||
    filters.showResponsive ||
    filters.darkMode;

  return (
    <div className={`ds-layout ${filters.darkMode ? 'dark-mode' : ''}`}>
      {/* ========== STICKY HEADER WITH CONTROLS ========== */}
      <header className="ds-header">
        {/* Search Bar */}
        <div className="ds-search-wrapper">
          <div className="ds-search-input-container">
            <Search size={20} className="ds-search-icon" />
            <input
              type="text"
              className="ds-search-input"
              placeholder="Search components, tokens, CSS classes..."
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search design system"
            />
          </div>
        </div>

        {/* Multi-Select Category Filters */}
        <div className="ds-filter-section">
          <label className="ds-filter-label">
            <Filter size={16} />
            Categories
          </label>
          <div className="ds-filter-pills">
            {categories.map((category) => (
              <button
                key={category}
                className={`ds-filter-pill ${filters.categories.has(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
                aria-pressed={filters.categories.has(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* View Options & Toggle Buttons */}
        <div className="ds-controls-row">
          {/* View Mode */}
          <div className="ds-control-group">
            <select
              className="ds-select"
              value={filters.viewMode}
              onChange={(e) => handleFilterChange('viewMode', e.target.value)}
              aria-label="View mode"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
            </select>
          </div>

          {/* Density */}
          <div className="ds-control-group">
            <select
              className="ds-select"
              value={filters.density}
              onChange={(e) => handleFilterChange('density', e.target.value)}
              aria-label="Content density"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>

          {/* Responsive Toggle */}
          <button
            className={`ds-toggle-button ${filters.showResponsive ? 'active' : ''}`}
            onClick={() => handleFilterChange('showResponsive', !filters.showResponsive)}
            title="Show responsive preview modes"
            aria-pressed={filters.showResponsive}
          >
            📱 Responsive
          </button>

          {/* Dark Mode Toggle */}
          <button
            className={`ds-toggle-button ${filters.darkMode ? 'active' : ''}`}
            onClick={() => handleFilterChange('darkMode', !filters.darkMode)}
            title="Toggle dark mode preview"
            aria-pressed={filters.darkMode}
          >
            🌙 Dark
          </button>

          {/* Reset Button (only show if filters active) */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              title="Reset all filters"
              leadingIcon={<RotateCcw size={16} />}
            >
              Reset
            </Button>
          )}
        </div>
      </header>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="ds-content">
        {children}
      </div>

      {/* ========== INLINE STYLES ========== */}
      <style>{LAYOUT_STYLES}</style>
    </div>
  );
};

/**
 * Layout-specific CSS
 */
const LAYOUT_STYLES = `
  .ds-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg);
    transition: background-color 200ms ease;
  }

  .ds-layout.dark-mode {
    background: #1a1a1a;
    color: #ffffff;
  }

  /* ===== STICKY HEADER ===== */
  .ds-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: var(--s-4);
    display: flex;
    flex-direction: column;
    gap: var(--s-4);
    flex-shrink: 0;
    backdrop-filter: blur(8px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .ds-layout.dark-mode .ds-header {
    background: rgba(30, 30, 30, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  /* ===== SEARCH BAR ===== */
  .ds-search-wrapper {
    display: flex;
    gap: var(--s-2);
    align-items: stretch;
  }

  .ds-search-input-container {
    position: relative;
    flex: 1;
    max-width: 400px;
    display: flex;
    align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    padding: 0 var(--s-3);
    transition: all 200ms ease;
  }

  .ds-search-input-container:focus-within {
    border-color: var(--tls-primary-500);
    box-shadow: 0 0 0 2px var(--tls-primary-100);
  }

  .ds-search-icon {
    color: var(--text-muted);
    margin-right: var(--s-2);
    flex-shrink: 0;
  }

  .ds-search-input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: var(--t-body-sm);
    padding: var(--s-2) 0;
    color: var(--text);
  }

  .ds-search-input::placeholder {
    color: var(--text-soft);
  }

  .ds-layout.dark-mode .ds-search-input {
    color: #ffffff;
  }

  /* ===== FILTER SECTION ===== */
  .ds-filter-section {
    display: flex;
    align-items: center;
    gap: var(--s-3);
    flex-wrap: wrap;
  }

  .ds-filter-label {
    display: flex;
    align-items: center;
    gap: var(--s-1);
    font-size: var(--t-body-sm);
    font-weight: 600;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .ds-filter-pills {
    display: flex;
    gap: var(--s-2);
    flex-wrap: wrap;
    align-items: center;
  }

  .ds-filter-pill {
    padding: var(--s-1-5) var(--s-3);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: var(--r-pill);
    font-size: var(--t-body-xs);
    font-weight: 500;
    cursor: pointer;
    transition: all 150ms ease;
    font-family: inherit;
  }

  .ds-filter-pill:hover {
    border-color: var(--tls-primary-400);
    background: var(--tls-primary-50);
    color: var(--tls-primary-600);
  }

  .ds-filter-pill.active {
    background: var(--tls-primary-600);
    border-color: var(--tls-primary-600);
    color: #ffffff;
  }

  /* ===== CONTROLS ROW ===== */
  .ds-controls-row {
    display: flex;
    gap: var(--s-3);
    flex-wrap: wrap;
    align-items: center;
  }

  .ds-control-group {
    display: flex;
    align-items: center;
  }

  .ds-select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: var(--r-md);
    font-size: var(--t-body-xs);
    font-weight: 500;
    cursor: pointer;
    transition: all 150ms ease;
    font-family: inherit;
  }

  .ds-select:hover {
    border-color: var(--border-strong);
  }

  .ds-select:focus {
    outline: none;
    border-color: var(--tls-primary-500);
    box-shadow: 0 0 0 2px var(--tls-primary-100);
  }

  .ds-toggle-button {
    padding: var(--s-1-5) var(--s-3);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    border-radius: var(--r-md);
    font-size: var(--t-body-xs);
    font-weight: 500;
    cursor: pointer;
    transition: all 150ms ease;
    font-family: inherit;
  }

  .ds-toggle-button:hover {
    border-color: var(--tls-primary-400);
    background: var(--tls-primary-50);
  }

  .ds-toggle-button.active {
    background: var(--tls-primary-600);
    border-color: var(--tls-primary-600);
    color: #ffffff;
  }

  /* ===== CONTENT AREA ===== */
  .ds-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--s-6);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1024px) {
    .ds-header {
      padding: var(--s-3);
      gap: var(--s-3);
    }

    .ds-search-input-container {
      max-width: 100%;
    }

    .ds-content {
      padding: var(--s-4);
    }
  }

  @media (max-width: 768px) {
    .ds-header {
      padding: var(--s-3);
      gap: var(--s-2);
    }

    .ds-search-wrapper {
      gap: var(--s-1);
    }

    .ds-search-input-container {
      max-width: 100%;
      padding: 0 var(--s-2);
    }

    .ds-search-input {
      font-size: var(--t-body-xs);
    }

    .ds-filter-section {
      gap: var(--s-2);
    }

    .ds-filter-label {
      font-size: var(--t-body-xs);
      display: none;
    }

    .ds-filter-pills {
      gap: var(--s-1);
    }

    .ds-filter-pill {
      padding: var(--s-1) var(--s-2-5);
      font-size: var(--t-micro);
    }

    .ds-controls-row {
      gap: var(--s-2);
    }

    .ds-select,
    .ds-toggle-button {
      padding: 4px 8px;
      font-size: var(--t-micro);
    }

    .ds-content {
      padding: var(--s-3);
    }
  }

  @media (max-width: 480px) {
    .ds-header {
      padding: var(--s-2);
      gap: var(--s-2);
    }

    .ds-controls-row {
      flex-direction: column;
      gap: var(--s-2);
      width: 100%;
    }

    .ds-select,
    .ds-toggle-button {
      width: 100%;
    }

    .ds-content {
      padding: var(--s-2);
    }
  }
`;

export default ComponentsLayout;
