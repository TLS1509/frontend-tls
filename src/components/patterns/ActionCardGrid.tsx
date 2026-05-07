import React from 'react';

/**
 * ActionCardGrid — Reusable component for action button card collections
 *
 * Used in Dashboard quick-actions, journal prompts, learning paths
 * Premium glass morphism style with centered icon + title + description
 *
 * Example:
 * <ActionCardGrid
 *   items={[
 *     { icon: <Zap size={40} />, title: 'Quick action', description: 'Daily prompt' },
 *     { icon: <BookOpen size={40} />, title: 'Learn more', description: 'Access materials' },
 *   ]}
 *   layout="3-col"
 *   onClick={(item) => console.log(item)}
 * />
 */

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

const layoutClasses: Record<ActionCardLayout, string> = {
  '2-col': 'grid-2-col',
  '3-col': 'grid-3-col',
  '4-col': 'grid-4-col',
  'auto-fit': 'grid-auto-fit--sm',
};

export const ActionCardGrid: React.FC<ActionCardGridProps> = ({
  items,
  layout = '3-col',
  gapSize = 'md',
  onItemClick,
}) => {
  return (
    <div className={layoutClasses[layout]}>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className="card card--xs"
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
          <div className="flex justify-center">{item.icon}</div>
          <h3 className="card__title">{item.title}</h3>
          <p className="card__desc">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ActionCardGrid;
