/**
 * PageCard Pattern
 *
 * Composite pattern for displaying page/screen tiles in a directory or index
 * Used for app navigation, feature showcase, or project galleries
 *
 * Reusable in:
 * - Pages index/directory
 * - Feature showcase
 * - Project galleries
 * - App navigation hub
 */

import React from 'react';
import type { CardTone } from '../core/Card';

export interface PageCardItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  thumbnail?: string;
  badge?: {
    label: string;
    variant?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  };
  tag?: string;
  status?: 'active' | 'coming-soon' | 'beta' | 'archived';
  tone?: CardTone;
  href?: string;
  onClick?: () => void;
}

export interface PageCardGridProps {
  /** Array of pages/items to display */
  pages: PageCardItem[];

  /** Number of columns: 2, 3, or 4 */
  columns?: 1 | 2 | 3 | 4;

  /** Loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Show thumbnail images */
  showThumbnails?: boolean;

  /** Custom className */
  className?: string;
}

const getStatusColor = (status?: string): string => {
  const colors: Record<string, string> = {
    active: '🟢',
    'coming-soon': '🟡',
    beta: '🔵',
    archived: '⚫',
  };
  return colors[status || 'active'] || '';
};

const getStatusLabel = (status?: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    'coming-soon': 'Coming Soon',
    beta: 'Beta',
    archived: 'Archived',
  };
  return labels[status || 'active'] || 'Active';
};

export const PageCard: React.FC<{ item: PageCardItem; showThumbnail?: boolean }> = ({
  item,
  showThumbnail = true,
}) => {
  const content = (
    <div className={`page-card page-card--tone-${item.tone || 'primary'}`}>
      {/* Status badge */}
      {item.status && (
        <div className={`page-card__status page-card__status--${item.status}`}>
          <span className="page-card__status-dot">{getStatusColor(item.status)}</span>
          <span className="page-card__status-label">{getStatusLabel(item.status)}</span>
        </div>
      )}

      {/* Thumbnail or icon area */}
      {showThumbnail && item.thumbnail ? (
        <div
          className="page-card__thumbnail"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        />
      ) : (
        item.icon && <div className="page-card__icon">{item.icon}</div>
      )}

      {/* Badge */}
      {item.badge && (
        <span className={`page-card__badge page-card__badge--${item.badge.variant || 'primary'}`}>
          {item.badge.label}
        </span>
      )}

      {/* Content */}
      <div className="page-card__content">
        <h3 className="page-card__title">{item.title}</h3>
        {item.description && <p className="page-card__description">{item.description}</p>}

        {item.tag && <span className="page-card__tag">{item.tag}</span>}
      </div>

      {/* Hover overlay with arrow */}
      <div className="page-card__overlay">
        <span className="page-card__arrow">→</span>
      </div>
    </div>
  );

  if (item.href) {
    return <a className="page-card__link" href={item.href}>{content}</a>;
  }

  if (item.onClick) {
    return (
      <button type="button" className="page-card__button" onClick={item.onClick}>
        {content}
      </button>
    );
  }

  return content;
};

export const PageCardGrid: React.FC<PageCardGridProps> = ({
  pages,
  columns = 3,
  isLoading = false,
  emptyMessage = 'No pages available',
  showThumbnails = true,
  className = '',
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={`page-card-grid page-card-grid--loading ${className}`}>
        <div className="page-card-grid__loader">
          <div className="page-card-grid__spinner" />
          <p>Loading pages...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!pages || pages.length === 0) {
    return (
      <div className={`page-card-grid page-card-grid--empty ${className}`}>
        <div className="page-card-grid__empty">
          <p className="page-card-grid__empty-icon">📄</p>
          <p className="page-card-grid__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-card-grid page-card-grid--${columns}col ${className}`} role="grid">
      {pages.map((page) => (
        <div key={page.id} className="page-card-grid__item" role="gridcell">
          <PageCard item={page} showThumbnail={showThumbnails} />
        </div>
      ))}
    </div>
  );
};

export default PageCardGrid;
