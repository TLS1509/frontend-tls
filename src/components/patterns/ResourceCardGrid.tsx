import React from 'react';
import { ResourceCard } from '../ui/ResourceCard';
import type { CardTone, CardBadgeConfig } from '../core/Card';

export interface ResourceCardGridItem {
  id: string;
  type: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  icon?: React.ReactNode;
  badge?: CardBadgeConfig;
  href?: string;
}

export interface ResourceCardGridProps {
  items: ResourceCardGridItem[];
  columns?: 1 | 2 | 3 | 4;
  onCardClick?: (id: string) => void;
  tone?: CardTone;
  variant?: 'default' | 'minimal' | 'with-badge';
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const COLS: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const TYPE_ICON: Record<string, string> = {
  GUIDE: '📖',
  VIDEO: '🎬',
  PODCAST: '🎙️',
  ARTICLE: '📰',
  TUTORIAL: '🎓',
};

export const ResourceCardGrid: React.FC<ResourceCardGridProps> = ({
  items,
  columns = 3,
  onCardClick,
  tone = 'primary',
  variant = 'default',
  isLoading = false,
  emptyMessage = 'Aucune ressource disponible',
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

  return (
    <div className={['grid gap-5', COLS[columns], className].filter(Boolean).join(' ')} role="grid">
      {items.map((item) => (
        <div key={item.id} role="gridcell">
          <ResourceCard
            icon={item.icon || TYPE_ICON[item.type] || '📚'}
            resourceType={item.type}
            title={item.title}
            description={item.description}
            duration={item.duration}
            category={item.category}
            tone={tone}
            variant={variant}
            badge={item.badge}
            cta={{
              label: 'Découvrir',
              onClick: () => onCardClick?.(item.id),
            }}
            href={item.href}
          />
        </div>
      ))}
    </div>
  );
};

export default ResourceCardGrid;
