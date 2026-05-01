/**
 * ResourceCardGrid Pattern
 *
 * Composite pattern for displaying a grid of ResourceCard instances
 * Wraps ResourceCard with grid layout logic and state management
 *
 * Reusable in:
 * - Magazine page (featured resources)
 * - Learning path detail (complementary resources)
 * - Content discovery sections
 * - Search results
 */

import React from 'react';
import { ResourceCard } from '../ui/ResourceCard';
import type { CardTone, CardBadgeConfig } from '../core/Card';

export interface ResourceCardGridItem {
  id: string;
  type: string; // 'GUIDE' | 'VIDEO' | 'PODCAST' | 'ARTICLE' | 'TUTORIAL'
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  icon?: React.ReactNode;
  badge?: CardBadgeConfig;
  href?: string;
}

export interface ResourceCardGridProps {
  /** Array of resource items to display */
  items: ResourceCardGridItem[];

  /** Number of columns: 2, 3, or 4 */
  columns?: 1 | 2 | 3 | 4;

  /** Callback when user clicks on a card */
  onCardClick?: (id: string) => void;

  /** Tone for all cards */
  tone?: CardTone;

  /** Variant for all cards */
  variant?: 'default' | 'minimal' | 'with-badge';

  /** Loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Custom className */
  className?: string;
}

const getIconForType = (type: string): string => {
  const icons: Record<string, string> = {
    GUIDE: '📖',
    VIDEO: '🎬',
    PODCAST: '🎙️',
    ARTICLE: '📰',
    TUTORIAL: '🎓',
  };
  return icons[type] || '📚';
};

export const ResourceCardGrid: React.FC<ResourceCardGridProps> = ({
  items,
  columns = 3,
  onCardClick,
  tone = 'primary',
  variant = 'default',
  isLoading = false,
  emptyMessage = 'No resources available',
  className = '',
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={`resource-card-grid resource-card-grid--loading ${className}`}>
        <div className="resource-card-grid__loader">
          <div className="resource-card-grid__spinner" />
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className={`resource-card-grid resource-card-grid--empty ${className}`}>
        <div className="resource-card-grid__empty">
          <p className="resource-card-grid__empty-icon">📭</p>
          <p className="resource-card-grid__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`resource-card-grid resource-card-grid--${columns}col ${className}`}
      role="grid"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="resource-card-grid__item"
          role="gridcell"
        >
          <ResourceCard
            icon={item.icon || getIconForType(item.type)}
            resourceType={item.type}
            title={item.title}
            description={item.description}
            duration={item.duration}
            category={item.category}
            tone={tone}
            variant={variant}
            badge={item.badge}
            cta={{
              label: 'Discover',
              onClick: () => onCardClick?.(item.id),
            }}
            href={item.href}
            className="resource-card-grid__card"
          />
        </div>
      ))}
    </div>
  );
};

export default ResourceCardGrid;
