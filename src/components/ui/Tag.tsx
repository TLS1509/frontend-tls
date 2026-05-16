import React from 'react';
import { X } from 'lucide-react';

export type TagTone = 'neutral' | 'primary' | 'warm' | 'sun';
export type TagSurface = 'default' | 'glass';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  leadingIcon?: React.ReactNode;
  tone?: TagTone;
  /** 'glass' = glassmorphism — use on colored/gradient backgrounds */
  surface?: TagSurface;
}

const TONE_CLASSES: Record<TagTone, string> = {
  neutral: 'bg-ink-50 text-ink-700 border-ink-200',
  primary: 'bg-primary-50 text-primary-800 border-primary-200',
  warm:    'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:     'bg-accent-50 text-accent-700 border-accent-200',
};

const REMOVE_HOVER: Record<TagTone, string> = {
  neutral: 'hover:bg-ink-200 hover:text-ink-900',
  primary: 'hover:bg-primary-100 hover:text-primary-900',
  warm:    'hover:bg-secondary-100 hover:text-secondary-800',
  sun:     'hover:bg-accent-100 hover:text-accent-900',
};

const GLASS_BASE = 'bg-white/15 text-white border-white/30 backdrop-blur-glass-light';
const GLASS_REMOVE = 'hover:bg-white/25 hover:text-white';

export const Tag: React.FC<TagProps> = ({
  onRemove,
  leadingIcon,
  tone = 'neutral',
  surface = 'default',
  className = '',
  children,
  ...rest
}) => {
  const isGlass = surface === 'glass';

  const classes = [
    'inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-pill text-caption font-medium whitespace-nowrap transition-colors',
    isGlass ? GLASS_BASE : TONE_CLASSES[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {leadingIcon && (
        <span className="inline-flex items-center shrink-0 opacity-75">{leadingIcon}</span>
      )}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label="Retirer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={[
            'inline-flex items-center justify-center w-4 h-4 -mr-0.5 rounded-full bg-transparent border-0 p-0 cursor-pointer text-current transition-colors',
            isGlass ? GLASS_REMOVE : REMOVE_HOVER[tone],
          ].join(' ')}
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
};

export default Tag;
