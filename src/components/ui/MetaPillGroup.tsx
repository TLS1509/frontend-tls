import React from 'react';
import { MetaPill } from './MetaPill';
import type { MetaPillTone, MetaPillSize } from './MetaPill';

export interface MetaPillItem {
  icon?: React.ReactNode;
  text: string;
  tone?: MetaPillTone;
  onClick?: () => void;
}

export interface MetaPillGroupProps {
  items: MetaPillItem[];
  size?: MetaPillSize;
  layout?: 'horizontal' | 'vertical';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GAP_MAP = { sm: 'var(--s-2)', md: 'var(--s-3)', lg: 'var(--s-4)' };

export const MetaPillGroup: React.FC<MetaPillGroupProps> = ({
  items,
  size = 'md',
  layout = 'horizontal',
  gap = 'md',
  className = '',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        flexWrap: layout === 'horizontal' ? 'wrap' : undefined,
        gap: GAP_MAP[gap],
        alignItems: layout === 'horizontal' ? 'center' : 'flex-start',
      }}
      className={className}
    >
      {items.map((item, i) => (
        <MetaPill
          key={i}
          text={item.text}
          icon={item.icon}
          tone={item.tone}
          size={size}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
