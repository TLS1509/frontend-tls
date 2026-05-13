import React from 'react';

/**
 * ActionCard — horizontal card with icon + title + description + action.
 *
 * Retrofit Phase 10 : surface × tone matrix added.
 *
 * Props :
 *   - `tone`: brand | warm | sun | neutral (color tint of icon bubble + accent)
 *   - `surface`: card | tinted | glass | frosted (background treatment)
 */

export type ActionCardTone = 'brand' | 'warm' | 'sun' | 'neutral';
export type ActionCardSurface = 'card' | 'tinted' | 'glass' | 'frosted';

interface ActionCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: ActionCardTone;
  surface?: ActionCardSurface;
  /** Optional click handler — turns the card into a button-like clickable surface. */
  onClick?: () => void;
  className?: string;
}

const TONE_ICON: Record<ActionCardTone, string> = {
  brand:   'bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700',
  warm:    'bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-700',
  sun:     'bg-gradient-to-br from-accent-100 to-accent-50 text-accent-700',
  neutral: 'bg-gradient-to-br from-ink-100 to-ink-50 text-ink-700',
};

const SURFACE_TONE: Record<ActionCardSurface, Record<ActionCardTone, string>> = {
  card: {
    neutral: 'bg-white border border-ink-200 hover:border-ink-300',
    brand:   'bg-white border border-primary-200 hover:border-primary-300',
    warm:    'bg-white border border-secondary-200 hover:border-secondary-300',
    sun:     'bg-white border border-accent-200 hover:border-accent-300',
  },
  tinted: {
    neutral: 'bg-ink-50 border border-ink-100 hover:border-ink-200 hover:bg-ink-100/50',
    brand:   'bg-primary-50/60 border border-primary-100 hover:border-primary-200',
    warm:    'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200',
    sun:     'bg-accent-50/70 border border-accent-100 hover:border-accent-200',
  },
  glass: {
    neutral: 'bg-white/70 backdrop-blur-glass-light border border-white/60 hover:bg-white/85 shadow-sm',
    brand:   'bg-primary-50/60 backdrop-blur-glass-light border border-primary-200/60 hover:bg-primary-50/80 shadow-sm',
    warm:    'bg-secondary-50/60 backdrop-blur-glass-light border border-secondary-200/60 hover:bg-secondary-50/80 shadow-sm',
    sun:     'bg-accent-50/70 backdrop-blur-glass-light border border-accent-200/60 hover:bg-accent-50/85 shadow-sm',
  },
  frosted: {
    neutral: 'bg-white/85 backdrop-blur-glass-medium border border-white/70 hover:bg-white/95 shadow-md',
    brand:   'bg-primary-100/40 backdrop-blur-glass-medium border border-primary-200/50 hover:bg-primary-100/55 shadow-md',
    warm:    'bg-secondary-100/40 backdrop-blur-glass-medium border border-secondary-200/50 hover:bg-secondary-100/55 shadow-md',
    sun:     'bg-accent-100/45 backdrop-blur-glass-medium border border-accent-200/50 hover:bg-accent-100/60 shadow-md',
  },
};

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  action,
  tone = 'brand',
  surface = 'card',
  onClick,
  className = '',
}) => {
  const clickable = Boolean(onClick);

  const classes = [
    'group flex items-center gap-4 p-6 rounded-lg transition-all duration-base',
    SURFACE_TONE[surface][tone],
    'hover:shadow-md hover:-translate-y-[3px]',
    clickable && 'cursor-pointer text-left w-full !h-auto !overflow-visible !items-center !font-normal',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && (
        <div
          className={[
            'shrink-0 w-14 h-14 inline-flex items-center justify-center rounded-md text-3xl transition-transform duration-base',
            'group-hover:scale-[1.08]',
            TONE_ICON[tone],
          ].join(' ')}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="m-0 mb-2 text-h4 font-display font-semibold text-ink-900">{title}</h3>
        {description && <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </>
  );

  if (clickable) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
};

export default ActionCard;
