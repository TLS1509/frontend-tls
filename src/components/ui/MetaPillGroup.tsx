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

const LAYOUT_CLASSES = {
  horizontal: 'flex flex-wrap items-center',
  vertical:   'flex flex-col flex-nowrap items-start',
};

const GAP_CLASSES = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

export const MetaPillGroup: React.FC<MetaPillGroupProps> = ({
  items,
  size = 'md',
  layout = 'horizontal',
  gap = 'md',
  className = '',
}) => {
  const classes = [LAYOUT_CLASSES[layout], GAP_CLASSES[gap], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
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
