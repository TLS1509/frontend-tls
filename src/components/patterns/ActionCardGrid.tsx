import React from 'react';
import { ArrowRight } from 'lucide-react';

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
          className="group relative flex flex-col items-center gap-stack-xs text-center bg-white border border-ink-200 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 transition-transform group-hover:scale-110 shrink-0">
            {item.icon}
          </div>
          <h3 className="m-0 text-h4 font-display font-semibold text-ink-900 leading-snug">
            {item.title}
          </h3>
          <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{item.description}</p>
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
