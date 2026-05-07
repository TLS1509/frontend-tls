import React from 'react';

export type MetaPillTone = 'default' | 'primary' | 'warm' | 'sun' | 'brand';
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
  'inline-flex items-center rounded-md font-body font-medium whitespace-nowrap select-none transition-colors duration-200 border';

const SIZE_CLASSES: Record<MetaPillSize, string> = {
  sm: 'text-micro px-2 py-0.5 gap-[3px]',
  md: 'text-caption px-3 py-1 gap-1',
  lg: 'text-body-sm px-4 py-2 gap-2',
};

const TONE_CLASSES: Record<MetaPillTone, string> = {
  default: 'bg-ink-50 text-ink-600 border-ink-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-500/25',
  brand:   'bg-primary-50 text-primary-700 border-primary-500/25',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-500/20',
  sun:     'bg-accent-50 text-accent-700 border-accent-400/[28%]',
};

const CLICKABLE =
  'cursor-pointer hover:bg-ink-100 hover:border-ink-900/[14%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

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
      {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
      {text}
    </span>
  );
};
