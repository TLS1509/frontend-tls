/**
 * VeilleCardFeed Pattern
 * 
 * Composite pattern for displaying a feed of learning resources/content
 * Wraps ResourceCard with Veille-specific logic and styling
 * 
 * Reusable in:
 * - Veille page (main feed)
 * - Magazine page (article recommendations)
 * - Content discovery sections
 */

import React from 'react';
import { ResourceCard } from '../ui/ResourceCard';
import type { CardTone } from '../core/Card';

export interface VeilleItem {
  id: string;
  type: 'GUIDE' | 'VIDEO' | 'PODCAST' | 'ARTICLE' | 'TUTORIAL';
  title: string;
  summary: string;
  description?: string;
  duration?: string;
  category?: string;
  icon?: React.ReactNode;
  isNew?: boolean;
  isSaved?: boolean;
  publishedDate?: Date;
}

export interface VeilleCardFeedProps {
  /** Array of content items to display */
  items: VeilleItem[];
  
  /** Callback when user saves/unsaves an item */
  onSave?: (id: string, saved: boolean) => void;
  
  /** Callback when user clicks on an item */
  onItemClick?: (id: string) => void;
  
  /** Array of saved item IDs */
  savedIds?: string[];
  
  /** Tone for all cards */
  tone?: CardTone;
  
  /** Show/hide save buttons */
  showSaveButton?: boolean;
  
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

export const VeilleCardFeed: React.FC<VeilleCardFeedProps> = ({
  items,
  onSave,
  onItemClick,
  savedIds = [],
  tone = 'primary',
  showSaveButton = true,
  isLoading = false,
  emptyMessage = 'No content available',
  className = '',
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={`veille-card-feed veille-card-feed--loading ${className}`}>
        <div className="veille-card-feed__loader">
          <div className="veille-card-feed__spinner" />
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className={`veille-card-feed veille-card-feed--empty ${className}`}>
        <div className="veille-card-feed__empty">
          <p className="veille-card-feed__empty-icon">📭</p>
          <p className="veille-card-feed__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`veille-card-feed ${className}`}>
      {items.map((item) => {
        const isSaved = savedIds.includes(item.id);

        return (
          <article
            key={item.id}
            className="veille-card-feed__item"
            role="article"
          >
            {/* Card container */}
            <div className="veille-card-feed__card-wrapper">
              <ResourceCard
                icon={item.icon || getIconForType(item.type)}
                iconSize="md"
                resourceType={item.type}
                title={item.title}
                description={item.description || item.summary}
                duration={item.duration}
                category={item.category}
                tone={tone}
                variant="default"
                badge={
                  item.isNew
                    ? {
                        label: 'NEW',
                        variant:
                          tone === 'warm' ? 'warm' : tone === 'sun' ? 'sun' : 'primary',
                        position: 'top-right',
                      }
                    : undefined
                }
                cta={{
                  label: 'Discover',
                  onClick: () => onItemClick?.(item.id),
                }}
                className="veille-card-feed__card"
              />
            </div>

            {/* Save button overlay (positioned absolute) */}
            {showSaveButton && (
              <button
                className={`veille-card-feed__save ${isSaved ? 'veille-card-feed__save--saved' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSave?.(item.id, !isSaved);
                }}
                title={isSaved ? 'Remove from saved' : 'Save for later'}
                aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
              >
                {isSaved ? '❤️' : '🤍'}
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default VeilleCardFeed;
