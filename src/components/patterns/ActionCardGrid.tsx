import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CARD_HOVER } from '../../lib/tone-classes';
import { IconChip } from '../ui/IconChip';

export interface ActionCardItem {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export type ActionCardLayout = '2-col' | '3-col' | '4-col' | 'auto-fit';

export interface ActionCardGridProps {
  items: ActionCardItem[];
  layout?: ActionCardLayout;
  gapSize?: 'sm' | 'md' | 'lg';
  onItemClick?: (item: ActionCardItem) => void;
}

const LAYOUT_CLASSES: Record<ActionCardLayout, string> = {
  '2-col':    'grid grid-cols-1 md:grid-cols-2',
  '3-col':    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4-col':    'grid grid-cols-2 lg:grid-cols-4',
  'auto-fit': 'grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
};

const GAP_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-stack-xs',
  md: 'gap-stack',
  lg: 'gap-stack-lg',
};

export const ActionCardGrid: React.FC<ActionCardGridProps> = ({
  items,
  layout = '3-col',
  gapSize = 'md',
  onItemClick,
}) => {
  return (
    <div className={[LAYOUT_CLASSES[layout], GAP_CLASSES[gapSize]].join(' ')}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className={`group relative flex flex-col items-center gap-stack-xs text-center bg-white border border-ink-200 rounded-lg p-stack-lg cursor-pointer transition-all ${CARD_HOVER.primary} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`}
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              item.onClick?.();
              onItemClick?.(item);
            }
          }}
        >
          <IconChip size="lg" tone="brand" className="transition-transform group-hover:scale-110 motion-reduce:group-hover:scale-100">
            {item.icon}
          </IconChip>
          <h3 className="text-h3 font-display text-ink-900">
            {item.title}
          </h3>
          <p className="m-0 text-body text-ink-500">{item.description}</p>
          <ArrowRight
            size={16}
            className="absolute top-4 right-4 text-ink-300 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all"
          />
        </div>
      ))}
    </div>
  );
};

export default ActionCardGrid;
