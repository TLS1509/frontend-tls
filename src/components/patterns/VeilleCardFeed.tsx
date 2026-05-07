import React from 'react';
import { Heart } from 'lucide-react';
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
  items: VeilleItem[];
  onSave?: (id: string, saved: boolean) => void;
  onItemClick?: (id: string) => void;
  savedIds?: string[];
  tone?: CardTone;
  showSaveButton?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const TYPE_ICON: Record<string, string> = {
  GUIDE: '📖',
  VIDEO: '🎬',
  PODCAST: '🎙️',
  ARTICLE: '📰',
  TUTORIAL: '🎓',
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
  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-8 h-8 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <p className="m-0 text-3xl">📭</p>
          <p className="m-0 text-body-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const tonePillVariant: 'primary' | 'warm' | 'sun' =
    tone === 'warm' ? 'warm' : tone === 'sun' ? 'sun' : 'primary';

  return (
    <div className={['grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3', className].filter(Boolean).join(' ')}>
      {items.map((item) => {
        const isSaved = savedIds.includes(item.id);

        return (
          <article key={item.id} className="relative" role="article">
            <ResourceCard
              icon={item.icon || TYPE_ICON[item.type] || '📚'}
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
                      variant: tonePillVariant,
                      position: 'top-right',
                    }
                  : undefined
              }
              cta={{
                label: 'Discover',
                onClick: () => onItemClick?.(item.id),
              }}
            />

            {showSaveButton && (
              <button
                className={[
                  'absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-sm border cursor-pointer transition-all',
                  isSaved
                    ? 'bg-danger-bg text-danger-fg border-danger-base/30 hover:bg-danger-base hover:text-white'
                    : 'bg-white/90 text-ink-500 border-ink-200 hover:text-danger-base hover:border-danger-base/30',
                ].join(' ')}
                onClick={(e) => {
                  e.stopPropagation();
                  onSave?.(item.id, !isSaved);
                }}
                title={isSaved ? 'Remove from saved' : 'Save for later'}
                aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default VeilleCardFeed;
