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
  sm: 'gap-stack-xs',
  md: 'gap-stack-xs',
  lg: 'gap-stack',
};

/* `sm`, aligné sur le défaut de MetaPill (2026-09-14). Le groupe porte SON
   propre défaut et le passe à chaque pastille : tant qu'il restait à `md`, il
   court-circuitait celui de MetaPill et la décision ne descendait pas. C'est
   lui le vrai canal de distribution — les cartes passent par le groupe. */
export const MetaPillGroup: React.FC<MetaPillGroupProps> = ({
  items,
  size = 'sm',
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
