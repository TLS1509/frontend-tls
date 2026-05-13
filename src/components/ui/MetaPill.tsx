import React from 'react';

export type MetaPillTone = 'default' | 'primary' | 'warm' | 'sun' | 'brand' | 'glass' | 'glass-dark';
export type MetaPillSize = 'sm' | 'md' | 'lg';

export interface MetaPillProps {
  text: string;
  icon?: React.ReactNode;
  tone?: MetaPillTone;
  size?: MetaPillSize;
  onClick?: () => void;
  className?: string;
}

const BASE =
  'inline-flex items-center rounded-pill font-body font-medium whitespace-nowrap select-none transition-all duration-200 border';

const SIZE_CLASSES: Record<MetaPillSize, string> = {
  sm: 'text-micro px-2 py-0.5 gap-1',
  md: 'text-caption px-2.5 py-1 gap-1.5',
  lg: 'text-body-sm px-4 py-2 gap-2',
};

const TONE_CLASSES: Record<MetaPillTone, string> = {
  default: 'bg-ink-50 text-ink-600 border-ink-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  brand:   'bg-primary-50 text-primary-700 border-primary-200',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:     'bg-accent-50 text-accent-700 border-accent-200',
  // Frosted glass — for use on light/tinted backgrounds (cards, surfaces)
  glass:   'bg-white/55 text-ink-700 border-white/60 backdrop-blur-glass-light shadow-xs',
  // Frosted glass on dark/saturated bg (gradient heroes — white text)
  'glass-dark': 'bg-white/15 text-white border-white/25 backdrop-blur-glass-light shadow-xs',
};

const CLICKABLE =
  'cursor-pointer hover:-translate-y-px hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const ICON_OPACITY = '[&_svg]:opacity-75';

export const MetaPill: React.FC<MetaPillProps> = ({
  text,
  icon,
  tone = 'default',
  size = 'md',
  onClick,
  className = '',
}) => {
  const classes = [
    BASE,
    SIZE_CLASSES[size],
    TONE_CLASSES[tone],
    ICON_OPACITY,
    onClick && CLICKABLE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="inline-flex items-center justify-center shrink-0">{icon}</span>}
      {text}
    </span>
  );
};

export default MetaPill;
