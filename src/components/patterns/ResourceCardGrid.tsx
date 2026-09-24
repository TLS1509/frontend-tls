import React from 'react';
import { BookOpen, Video, Mic, Newspaper, GraduationCap, Library, Inbox } from 'lucide-react';
import { GRID_CONTAINER, GRID_COLS_CONTENT } from '../../lib/grid-columns';
import { ResourceCard } from '../ui/ResourceCard';
import { IconChip } from '../ui/IconChip';
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

/* Colonnage : src/lib/grid-columns.ts — source unique, en largeur de conteneur. */
const COLS = GRID_COLS_CONTENT;

/* Icônes Lucide par type — elles remplacent des emojis (passe du 2026-09-24).
   La clé se lit sans casse ni accent : « Vidéo », « VIDEO » et « video »
   désignent le même type. */
const TYPE_ICON: Record<string, React.ReactNode> = {
  GUIDE: <BookOpen size={20} />,
  VIDEO: <Video size={20} />,
  PODCAST: <Mic size={20} />,
  ARTICLE: <Newspaper size={20} />,
  TUTORIAL: <GraduationCap size={20} />,
  TUTORIEL: <GraduationCap size={20} />,
};
const DEFAULT_ICON = <Library size={20} />;

const typeKey = (type: string) =>
  type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

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
        <div className="flex flex-col items-center gap-stack-xs text-ink-500">
          <div className="w-10 h-10 rounded-pill border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body text-ink-600">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center p-12 rounded-xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col items-center gap-stack-xs text-center">
          <IconChip size="lg" tone="neutral">
            <Inbox strokeWidth={2} />
          </IconChip>
          <p className="m-0 text-body font-semibold text-ink-900">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={GRID_CONTAINER}>
    <div className={['grid gap-stack', COLS[columns], className].filter(Boolean).join(' ')} role="grid">
      {items.map((item) => (
        <div key={item.id} role="gridcell">
          <ResourceCard
            icon={item.icon || TYPE_ICON[typeKey(item.type)] || DEFAULT_ICON}
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
    </div>
  );
};

export default ResourceCardGrid;
