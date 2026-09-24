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
    neutral: 'bg-white border border-ink-200 hover:border-ink-300 hover:bg-ink-50/50',
    brand:   'bg-white border border-primary-200 hover:border-primary-300 hover:bg-primary-50/40',
    warm:    'bg-white border border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50/40',
    sun:     'bg-white border border-accent-200 hover:border-accent-300 hover:bg-accent-50/40',
  },
  tinted: {
    neutral: 'bg-ink-50 border border-ink-100 hover:border-ink-200 hover:bg-ink-100/50',
    brand:   'bg-primary-50/60 border border-primary-100 hover:border-primary-200 hover:bg-primary-50',
    warm:    'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
    sun:     'bg-accent-50/70 border border-accent-100 hover:border-accent-200 hover:bg-accent-50',
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
  const TitleTag = clickable ? 'span' : 'h3';
  const DescTag = clickable ? 'span' : 'p';

  /* Anatomie (passe typographique du 2026-09-24) : pastille 56 · titre h3
     20/700 · 8 px · description 16 ink-700, largeur de lecture. La pastille
     et le texte ne sont plus centrés l'un sur l'autre (`items-center`) : sur
     deux lignes et plus, l'icône s'aligne sur la PREMIÈRE ligne du titre
     (doctrine § 4) — le texte descend de (56 − 26) / 2 = 15 px. L'action,
     elle, reste centrée sur la rangée. */
  const classes = [
    'group flex items-start gap-stack p-stack-lg rounded-xl transition-all duration-base min-h-touch',
    SURFACE_TONE[surface][tone],
    clickable &&
      'cursor-pointer text-left w-full !h-auto !overflow-visible !font-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && (
        <div
          className={[
            /* `text-h2` : la taille d'un émoji passé en icône, prise sur
               l'échelle (il était en `text-3xl`, 30 px, hors échelle). */
            'shrink-0 w-14 h-14 inline-flex items-center justify-center rounded-xl text-h2 transition-transform duration-base',
            'group-hover:scale-[1.08]',
            TONE_ICON[tone],
          ].join(' ')}
        >
          {icon}
        </div>
      )}
      <div className={['flex-1 min-w-0 flex flex-col gap-stack-xs', icon ? 'mt-[15px]' : ''].filter(Boolean).join(' ')}>
        {/* Dans un <button>, pas de titre : le contenu d'un bouton est du
            texte courant (HTML), un <h3> y est invalide. Même style. */}
        <TitleTag className="block font-display text-h3 text-ink-900">{title}</TitleTag>
        {description && <DescTag className="block font-body text-body text-ink-700 max-w-prose">{description}</DescTag>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
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
