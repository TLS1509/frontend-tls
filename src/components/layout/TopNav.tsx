/**
 * Top Navigation — Header Navigation Component
 *
 * Optional header navigation bar with breadcrumbs, search, and user menu.
 * Positioned at the top of the page for desktop/tablet layouts.
 *
 * Features:
 * - Breadcrumb navigation
 * - Search bar (slot-based)
 * - User quick menu (slot-based)
 * - Glassmorphic design
 * - Responsive layout
 * - Accessibility support
 */

import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface TopNavProps {
  breadcrumbs?: BreadcrumbItem[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  userMenu?: React.ReactNode;
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  breadcrumbs,
  searchPlaceholder = 'Rechercher...',
  onSearch,
  userMenu,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <nav className={`top-nav ${className}`.trim()}>
      <div className="top-nav__container">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="top-nav__breadcrumbs">
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="top-nav__breadcrumb-sep">/</span>}
                {item.isCurrent ? (
                  <span className="top-nav__breadcrumb-current">{item.label}</span>
                ) : (
                  <a href={item.href || '#'} className="top-nav__breadcrumb-link">
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Search Bar */}
        {onSearch && (
          <div className="top-nav__search">
            <input
              type="text"
              className="top-nav__search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            <span className="top-nav__search-icon">🔍</span>
          </div>
        )}

        {/* User Menu Slot */}
        {userMenu && <div className="top-nav__menu">{userMenu}</div>}
      </div>
    </nav>
  );
};

export default TopNav;
