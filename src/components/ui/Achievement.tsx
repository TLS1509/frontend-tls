import React from 'react';
import { Lock } from 'lucide-react';
import { CARD_HOVER, CARD_HOVER_NEUTRE } from '../../lib/tone-classes';

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'unlocked' | 'locked' | 'in-progress';
  onClick?: () => void;
  className?: string;
}

/* Padding : jamais sous le rayon de la carte (20) — 20 en dense, 24 au
   canon (arbitrage n°4). Les crans 12 et 16 pinçaient le coin de 40 et 20 %. */
const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-stack-md gap-stack-sm',
  md: 'p-stack-md gap-stack',
  lg: 'p-stack-lg gap-stack',
};

/* La pastille dimensionne le GLYPHE (une icône Lucide), plus une taille de
   police : `text-xl/2xl/3xl` ne servaient qu'à grossir des emojis, hors de
   l'échelle typographique (passe du 2026-09-24). */
const BADGE_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-12 h-12 [&>svg]:w-6 [&>svg]:h-6',
  md: 'w-16 h-16 [&>svg]:w-8 [&>svg]:h-8',
  lg: 'w-20 h-20 [&>svg]:w-10 [&>svg]:h-10',
};

const VARIANT_CARD: Record<'unlocked' | 'locked' | 'in-progress', string> = {
  unlocked:     'bg-gradient-to-br from-accent-50/80 to-white border-accent-200',
  locked:       'bg-ink-50 border-ink-200 opacity-70',
  'in-progress': 'bg-gradient-to-br from-primary-50/80 to-white border-primary-200',
};

const VARIANT_BADGE: Record<'unlocked' | 'locked' | 'in-progress', string> = {
  // La pastille porte une icône : 3:1 à l'arrêt le plus clair. L'or n'y
  // arrive qu'au 700 (4,88 ; le 300 mesurait 1,61), le teal au 600 (3,66 ; le 400, 2,44).
  unlocked:     'bg-gradient-to-br from-accent-700 to-accent-800 text-white shadow-md ring-4 ring-accent-100',
  locked:       'bg-ink-200 text-ink-400',
  'in-progress': 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-brand-sm ring-4 ring-primary-100',
};

/* Survol (carte cliquable) : filet fermé d'un cran + fond très léger — règle du
 * 2026-09-16 (CARD_HOVER, lib/tone-classes.ts). Pas de soulèvement, pas d'ombre.
 * sun pour débloqué, primary pour en cours, neutre pour verrouillé. */
const VARIANT_HOVER: Record<'unlocked' | 'locked' | 'in-progress', string> = {
  unlocked:      CARD_HOVER.sun,
  locked:        CARD_HOVER_NEUTRE,
  'in-progress': CARD_HOVER.primary,
};

export const Achievement: React.FC<AchievementProps> = ({
  icon,
  title,
  description,
  unlockedAt,
  progress,
  maxProgress = 100,
  size = 'md',
  variant = 'unlocked',
  onClick,
  className = '',
}) => {
  const isClickable = !!onClick;
  const progressPercent =
    maxProgress > 0 ? Math.min(((progress || 0) / maxProgress) * 100, 100) : 0;

  const classes = [
    'flex items-center border-2 rounded-xl transition-colors duration-base ease-emphasis',
    SIZE_CLASSES[size],
    VARIANT_CARD[variant],
    isClickable
      ? `cursor-pointer ${VARIANT_HOVER[variant]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      <div className="relative shrink-0">
        <div
          className={[
            'inline-flex items-center justify-center rounded-2xl',
            BADGE_SIZE[size],
            VARIANT_BADGE[variant],
          ].join(' ')}
        >
          {icon}
        </div>
        {variant === 'locked' && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 inline-flex items-center justify-center rounded-pill bg-ink-500 text-white ring-2 ring-white">
            <Lock size={14} strokeWidth={2.5} />
          </div>
        )}
        {/* Plus d'étincelle au coin de la pastille débloquée : l'étincelle
            signale une fonction IA, jamais un gain (DESIGN.md §10,
            arbitrage n°18). */}
      </div>

      {/* Vignette compacte : libellé 16/600 (pas un titre de carte à 20/700),
          texte 16/400 ink-700, méta 13. Titre → texte 4 ; texte → méta 8/12. */}
      <div className="flex-1 min-w-0">
        <p className="m-0 text-body font-semibold text-ink-900 truncate">{title}</p>
        <p className="m-0 mt-stack-3xs text-body text-ink-700 line-clamp-2">{description}</p>

        {variant === 'in-progress' && progress !== undefined && (
          <div className="flex items-center gap-stack-xs mt-stack-sm">
            <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-pill transition-[width] duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-caption font-semibold text-primary-800 min-w-[3.5rem] text-right tabular-nums">
              {progress} / {maxProgress}
            </span>
          </div>
        )}

        {/* Dite calmement : « Obtenu le », sans étincelle ni « Débloqué »
            (PRODUCT.md : un badge s'affiche calmement). */}
        {variant === 'unlocked' && unlockedAt && (
          <p className="m-0 mt-stack-xs text-caption text-accent-800">
            Obtenu le {unlockedAt}
          </p>
        )}
      </div>
    </div>
  );
};

export default Achievement;
