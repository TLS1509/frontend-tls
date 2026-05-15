import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import type { CardTone, CardBadgeConfig } from '../core/Card';

export type ResourceCardVariant = 'default' | 'minimal' | 'with-badge';
export type ResourceCardIconSize = 'sm' | 'md' | 'lg';

export interface ResourceCardProps {
  icon?: React.ReactNode;
  iconSize?: ResourceCardIconSize;
  resourceType?: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  tone?: CardTone;
  badge?: CardBadgeConfig;
  cta?: {
    label: string;
    onClick: () => void;
  };
  href?: string;
  variant?: ResourceCardVariant;
  className?: string;
}

// Background tint per tone — replaces the previous border-l-4 accent stripe.
// Uses a soft alpha gradient (top-left lighter → bottom-right transparent)
// + matching outline border in the same tone.
const TONE_BG: Record<string, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-white border-primary-200',
  brand:   'bg-gradient-to-br from-primary-50 to-white border-primary-200',
  warm:    'bg-gradient-to-br from-secondary-50 to-white border-secondary-200',
  sun:     'bg-gradient-to-br from-accent-50 to-white border-accent-200',
  default: 'bg-gradient-to-br from-primary-50 to-white border-primary-200',
};

const TONE_ACCENT_TEXT: Record<string, string> = {
  primary: 'text-primary-500',
  brand:   'text-primary-600',
  warm:    'text-secondary-500',
  sun:     'text-accent-500',
  default: 'text-primary-500',
};

const TONE_CTA_HOVER: Record<string, string> = {
  primary: 'hover:bg-primary-50',
  brand:   'hover:bg-primary-50',
  warm:    'hover:bg-secondary-50',
  sun:     'hover:bg-accent-50',
  default: 'hover:bg-primary-50',
};

const ICON_SIZE: Record<ResourceCardIconSize, string> = {
  sm: 'w-9 h-9',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const BADGE_VARIANT: Record<string, string> = {
  primary: 'bg-primary-50 text-primary-800',
  warm:    'bg-secondary-50 text-secondary-700',
  sun:     'bg-accent-50 text-accent-700',
  success: 'bg-success-bg text-success-fg',
  danger:  'bg-danger-bg text-danger-fg',
};

const BADGE_POSITION: Record<string, string> = {
  'top-right': 'top-3 right-3',
  'top-left':  'top-3 left-3',
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  icon,
  iconSize = 'md',
  resourceType,
  title,
  description,
  duration,
  category,
  tone = 'primary',
  badge,
  cta,
  href,
  variant = 'default',
  className = '',
}) => {
  const toneBg = TONE_BG[tone] ?? TONE_BG.primary;
  const accentText = TONE_ACCENT_TEXT[tone] ?? TONE_ACCENT_TEXT.primary;
  const ctaHover = TONE_CTA_HOVER[tone] ?? TONE_CTA_HOVER.primary;

  const padding = variant === 'minimal' ? 'p-4' : 'p-6';

  const classes = [
    'relative border rounded-xl flex flex-col gap-4 transition-all no-underline text-inherit',
    'hover:-translate-y-0.5 hover:shadow-md',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
    toneBg,
    padding,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {badge && (
        <span
          className={[
            'absolute z-10 px-3 py-1 rounded-pill text-caption font-bold whitespace-nowrap',
            BADGE_VARIANT[badge.variant ?? 'primary'],
            BADGE_POSITION[badge.position || 'top-right'],
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {badge.label}
        </span>
      )}

      {(icon || resourceType) && (
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={[
                'shrink-0 inline-flex items-center justify-center text-2xl',
                ICON_SIZE[iconSize],
                accentText,
              ].join(' ')}
            >
              {icon}
            </div>
          )}
          {resourceType && (
            <span className={`text-caption font-bold uppercase tracking-wider ${accentText}`}>
              {resourceType}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-h4 font-semibold leading-snug text-ink-900">{title}</h3>
        {variant !== 'minimal' && description && (
          <p className="m-0 text-body-sm leading-relaxed text-ink-500">{description}</p>
        )}
      </div>

      {variant !== 'minimal' && (duration || category || cta) && (
        <footer className="flex items-center justify-between gap-3 mt-2 pt-3 border-t border-ink-200">
          <div className="flex items-center gap-3 flex-wrap">
            {category && (
              <span className="text-caption font-semibold uppercase tracking-wider text-ink-500 px-2 py-0.5 bg-ink-50 rounded-sm">
                {category}
              </span>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1 text-caption text-ink-500">
                <Clock size={12} strokeWidth={2} className="opacity-70" />
                {duration}
              </span>
            )}
          </div>
          {cta && (
            <button
              type="button"
              onClick={cta.onClick}
              className={[
                'inline-flex items-center gap-2 px-3 py-2 bg-transparent border-0 rounded-md',
                'text-body-sm font-semibold cursor-pointer whitespace-nowrap transition-all',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                accentText,
                ctaHover,
                '[&>svg]:transition-transform hover:[&>svg]:translate-x-0.5',
              ].join(' ')}
            >
              <span>{cta.label}</span>
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          )}
        </footer>
      )}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }

  return <div className={classes}>{content}</div>;
};

export default ResourceCard;
