import React from 'react';
import { MetaPill } from './MetaPill';
import type { MetaPillTone, MetaPillSize } from './MetaPill';
import './MetaPillGroup.css';

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

export const MetaPillGroup: React.FC<MetaPillGroupProps> = ({
  items,
  size = 'md',
  layout = 'horizontal',
  gap = 'md',
  className = '',
}) => {
  const classes = [
    'tls-meta-pill-group',
    layout === 'vertical' && 'tls-meta-pill-group--vertical',
    `tls-meta-pill-group--gap-${gap}`,
    className,
  ]
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
