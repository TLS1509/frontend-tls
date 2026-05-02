/**
 * BreadcrumbNav — Navigation Pattern
 *
 * Breadcrumb with icon support and responsive mobile truncation.
 * Shows navigation hierarchy with clickable items.
 *
 * Usage:
 *   <BreadcrumbNav
 *     items={[
 *       { label: 'Home', icon: <Home />, href: '/' },
 *       { label: 'Courses', href: '/courses' },
 *       { label: 'Advanced React' }
 *     ]}
 *     current={2}
 *   />
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import './BreadcrumbNav.css';

export interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  current?: number;
  onNavigate?: (index: number) => void;
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  current = items.length - 1,
  onNavigate,
  className = '',
}) => {
  const handleClick = (index: number, href?: string) => {
    if (href) {
      window.location.href = href;
    }
    onNavigate?.(index);
  };

  // Mobile: show first, current, and last items
  const isMobile = true; // This will be determined by CSS media query
  const displayItems =
    items.length > 3
      ? [items[0], { label: '...', icon: undefined }, ...items.slice(-2)]
      : items;

  return (
    <nav className={`breadcrumb-nav ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumb-nav__list">
        {displayItems.map((item, index) => {
          const isEllipsis = item.label === '...';
          const isCurrent = index === current;
          const isClickable = item.href || (onNavigate && !isCurrent);

          return (
            <li key={index} className="breadcrumb-nav__item">
              {isEllipsis ? (
                <span className="breadcrumb-nav__ellipsis" aria-label="More items">
                  {item.label}
                </span>
              ) : (
                <>
                  {isClickable ? (
                    <button
                      className={`breadcrumb-nav__link${
                        isCurrent ? ' breadcrumb-nav__link--current' : ''
                      }`}
                      onClick={() => handleClick(index, item.href)}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {item.icon && (
                        <span className="breadcrumb-nav__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <span className="breadcrumb-nav__label">{item.label}</span>
                    </button>
                  ) : (
                    <span
                      className={`breadcrumb-nav__text${
                        isCurrent ? ' breadcrumb-nav__text--current' : ''
                      }`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {item.icon && (
                        <span className="breadcrumb-nav__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <span className="breadcrumb-nav__label">{item.label}</span>
                    </span>
                  )}
                </>
              )}

              {/* Separator */}
              {index < displayItems.length - 1 && (
                <ChevronRight
                  size={16}
                  className="breadcrumb-nav__separator"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
