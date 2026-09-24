import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { CARD_HOVER } from '../../lib/tone-classes';
import type { CardTone, CardBadgeConfig } from '../core/Card';
import { MetaPill, type MetaPillTone } from './MetaPill';
import { Badge, type BadgeVariant } from './Badge';

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

/* Texte et icône d'accent : cran 800 pour les trois tons (doctrine § 2 — une
   couleur de marque ne porte du texte qu'au 800). */
const TONE_ACCENT_TEXT: Record<string, string> = {
  primary: 'text-primary-800',
  brand:   'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
  default: 'text-primary-800',
};

/* Le type de ressource est une DONNÉE : MetaPill au ton de la carte. */
const TONE_PILL: Record<string, MetaPillTone> = {
  primary: 'primary',
  brand:   'primary',
  warm:    'warm',
  sun:     'sun',
  default: 'primary',
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

/* `badge` dit un ÉTAT (« Nouveau ») : le vrai Badge, plus son imitation. */
const BADGE_VARIANT: Record<string, BadgeVariant> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
  success: 'success',
  danger:  'danger',
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

  /* Padding jamais sous le rayon (20) : 20 en dense, 24 au canon (arbitrage n°4). */
  const padding = variant === 'minimal' ? 'p-stack-md' : 'p-stack-lg';
  const pillTone = TONE_PILL[tone] ?? TONE_PILL.primary;

  /* Anatomie (passe typographique du 2026-09-24) : en-tête (icône + type) →
     titre 12 · titre → texte 8 · contenu → pied 24, filet compris. */
  const classes = [
    'relative border rounded-xl flex flex-col gap-stack-sm transition-colors duration-base ease-emphasis no-underline text-inherit',
    CARD_HOVER[tone],
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
        <Badge
          variant={BADGE_VARIANT[badge.variant ?? 'primary'] ?? 'brand'}
          className={['absolute z-10', BADGE_POSITION[badge.position || 'top-right']].join(' ')}
        >
          {badge.label}
        </Badge>
      )}

      {(icon || resourceType) && (
        <div className="flex items-center gap-stack-sm">
          {icon && (
            <div
              className={[
                'shrink-0 inline-flex items-center justify-center',
                ICON_SIZE[iconSize],
                accentText,
              ].join(' ')}
            >
              {icon}
            </div>
          )}
          {/* Le type (« Guide », « Vidéo ») était en capitales 700 : le
              registre qui crie, pour une donnée qui chuchote (n°15). */}
          {resourceType && <MetaPill text={resourceType} tone={pillTone} />}
        </div>
      )}

      <div className="flex flex-col gap-stack-xs">
        <h3 className="text-h3 text-ink-900">{title}</h3>
        {variant !== 'minimal' && description && (
          <p className="m-0 text-body text-ink-700">{description}</p>
        )}
      </div>

      {variant !== 'minimal' && (duration || category || cta) && (
        <footer className="flex items-center justify-between gap-stack-xs mt-stack-sm pt-stack-sm border-t border-ink-200">
          <div className="flex items-center gap-stack-xs flex-wrap">
            {/* Une catégorie est une DONNÉE : MetaPill, même registre que la durée
                posée à côté (arbitrage n°14, 2026-09-23). Elle était en Badge
                — capitales, 700 — et pesait plus lourd que le titre. */}
            {category && <MetaPill text={category} tone="neutral" />}
            {duration && (
              <span className="inline-flex items-center gap-stack-3xs text-caption text-ink-600">
                <Clock size={14} strokeWidth={2} className="opacity-70" />
                {duration}
              </span>
            )}
          </div>
          {cta && (
            <button
              type="button"
              onClick={cta.onClick}
              className={[
                'inline-flex items-center gap-stack-xs px-3 py-2 bg-transparent border-0 rounded-md',
                'text-body font-bold cursor-pointer whitespace-nowrap transition-[background-color] duration-fast ease-emphasis',
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
