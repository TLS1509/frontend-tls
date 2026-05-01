/**
 * Bottom Navigation — Mobile Tab Navigation
 *
 * Tab-like navigation bar positioned at the bottom of mobile screens.
 * Shows primary navigation items with icons and optional labels.
 *
 * Features:
 * - Tab-based navigation UI
 * - Icon + label layout
 * - Active state styling
 * - Glassmorphic design
 * - Touch-friendly target sizes
 * - Accessibility support (role=tablist)
 */

import React from 'react';
import '../../styles/mobile-nav.css';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: number;
  onClick?: () => void;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeId?: string;
  onSelect?: (itemId: string) => void;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeId,
  onSelect,
  className = '',
}) => {
  const handleItemClick = (item: BottomNavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (onSelect) {
      onSelect(item.id);
    }
  };

  return (
    <nav className={`bottom-nav ${className}`.trim()} role="tablist">
      <div className="bottom-nav__container">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bottom-nav__item ${activeId === item.id ? 'bottom-nav__item--active' : ''}`.trim()}
            role="tab"
            aria-selected={activeId === item.id}
            aria-label={item.label}
          >
            {item.href ? (
              <a href={item.href} className="bottom-nav__link">
                <span className="bottom-nav__icon">
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <span className="bottom-nav__badge">{item.badge > 99 ? '99+' : item.badge}</span>
                  )}
                </span>
                <span className="bottom-nav__label">{item.label}</span>
              </a>
            ) : (
              <button
                type="button"
                className="bottom-nav__button"
                onClick={() => handleItemClick(item)}
              >
                <span className="bottom-nav__icon">
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <span className="bottom-nav__badge">{item.badge > 99 ? '99+' : item.badge}</span>
                  )}
                </span>
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
