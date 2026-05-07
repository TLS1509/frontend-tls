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
  emptyMessage = 'Aucun contenu disponible',
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-10 h-10 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm font-medium">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center p-12 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <p className="m-0 text-4xl">📭</p>
          <p className="m-0 text-body-sm font-medium">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const tonePillVariant: 'primary' | 'warm' | 'sun' =
    tone === 'warm' ? 'warm' : tone === 'sun' ? 'sun' : 'primary';

  return (
    <div
      className={[
        'grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => {
        const isSaved = savedIds.includes(item.id);

        return (
          <article key={item.id} className="relative group" role="article">
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
                      label: 'NOUVEAU',
                      variant: tonePillVariant,
                      position: 'top-right',
                    }
                  : undefined
              }
              cta={{
                label: 'Découvrir',
                onClick: () => onItemClick?.(item.id),
              }}
            />

            {showSaveButton && (
              <button
                className={[
                  'absolute top-3 right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-md border cursor-pointer transition-all duration-200',
                  'hover:scale-110 active:scale-95',
                  isSaved
                    ? 'bg-danger-bg text-danger-fg border-danger-base/40 shadow-md'
                    : 'bg-white/90 text-ink-400 border-ink-200 hover:text-danger-base hover:border-danger-base/40 hover:bg-white',
                ].join(' ')}
                onClick={(e) => {
                  e.stopPropagation();
                  onSave?.(item.id, !isSaved);
                }}
                title={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
                aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
              >
                <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={2} />
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default VeilleCardFeed;
