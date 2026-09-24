import React from 'react';
import { Sparkles, Lock } from 'lucide-react';

export type AchievementBadgeColor = 'primary' | 'warm' | 'sun' | 'success';

export interface AchievementBadgeProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  unlockedDate?: string;
  isLocked?: boolean;
  onShare?: () => void;
  color?: AchievementBadgeColor;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_PADDING: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-stack',
  md: 'p-stack-lg',
  lg: 'p-section',
};

const ICON_CIRCLE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-[60px] h-[60px]',
  md: 'w-[100px] h-[100px]',
  lg: 'w-[140px] h-[140px]',
};

/* Le rythme vertical est tenu par la carte (piège n°12), plus par des marges
   posées sur chaque enfant — l'`h3`, qui suivait la pastille, ajoutait en
   plus sa marge de titre (0,75em) : 31 à 47 px entre la pastille et le titre.
   Pastille → texte et texte → action : le même pas, qui grandit avec la carte. */
const SIZE_GAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-stack',
  md: 'gap-stack-lg',
  lg: 'gap-section',
};

const ICON_INNER_PX: Record<'sm' | 'md' | 'lg', number> = { sm: 28, md: 48, lg: 64 };

const COLOR_GRADIENT: Record<AchievementBadgeColor, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
  warm:    'bg-gradient-to-br from-secondary-500 to-secondary-600',
  sun:     'bg-gradient-to-br from-accent-400 to-secondary-500',
  success: 'bg-gradient-to-br from-success-base to-primary-500',
};

const COLOR_BORDER: Record<AchievementBadgeColor, string> = {
  primary: 'border-primary-500',
  warm:    'border-secondary-500',
  sun:     'border-accent-400',
  success: 'border-success-base',
};

/* Texte de marque au cran 800 (doctrine, § 2). */
const COLOR_TEXT: Record<AchievementBadgeColor, string> = {
  primary: 'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
  success: 'text-success-fg',
};

const COLOR_BTN: Record<AchievementBadgeColor, string> = {
  // Libellé blanc à 13 px : fond au 700, survol qui fonce au 800 (contrat de
  // Button solid). Au 500, le blanc mesurait 2,31 à 2,94.
  primary: 'bg-primary-700 hover:bg-primary-800 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-700 hover:bg-secondary-800 shadow-sm hover:shadow-md',
  sun:     'bg-accent-700 hover:bg-accent-800 shadow-sm hover:shadow-md',
  success: 'bg-success-vivid hover:bg-success-fg shadow-sm hover:shadow-md',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  unlockedDate,
  isLocked = false,
  onShare,
  color = 'primary',
  size = 'md',
}) => {
  const innerIconSize = ICON_INNER_PX[size];

  const cardClasses = [
    'flex flex-col items-center bg-white rounded-lg border-2 text-center transition-all duration-300',
    SIZE_PADDING[size],
    SIZE_GAP[size],
    isLocked ? 'border-ink-200 opacity-60 scale-95' : COLOR_BORDER[color],
  ].join(' ');

  const circleClasses = [
    'relative inline-flex items-center justify-center mx-auto rounded-pill overflow-hidden',
    ICON_CIRCLE[size],
    isLocked ? 'bg-ink-100' : `${COLOR_GRADIENT[color]} shadow-brand-sm`,
  ].join(' ');

  return (
    <div className={cardClasses}>
      <div className={circleClasses}>
        {icon && typeof icon === 'object' && 'props' in icon
          ? React.cloneElement(icon as React.ReactElement, { size: innerIconSize } as any)
          : icon}
        {!isLocked && (
          <span className="absolute -top-2 -right-2 text-white animate-pulse">
            <Sparkles size={Math.round(innerIconSize * 0.5)} />
          </span>
        )}
        {isLocked && (
          <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-7 h-7 rounded-pill bg-white text-ink-500 border border-ink-200">
            <Lock size={Math.round(innerIconSize * 0.4)} />
          </span>
        )}
      </div>

      {/* Titre → texte 8 · texte → méta 12 (anatomie de carte, doctrine § 5). */}
      <div className="flex flex-col items-center gap-stack-sm">
        <div className="flex flex-col gap-stack-xs">
          <h3 className="text-h3 font-display text-ink-900">{title}</h3>
          {description && (
            <p className="m-0 text-body text-ink-700">{description}</p>
          )}
        </div>

        <p
          className={[
            'm-0 text-caption',
            isLocked ? 'text-ink-600' : COLOR_TEXT[color],
          ].join(' ')}
        >
          {isLocked
            ? 'Complete prerequisites to unlock'
            : `Unlocked ${unlockedDate ? `on ${unlockedDate}` : 'today'}`}
        </p>
      </div>

      {onShare && !isLocked && (
        <button
          type="button"
          onClick={onShare}
          className={[
            'px-stack-md py-3 min-h-touch text-white border-0 rounded-md text-caption font-bold cursor-pointer transition-all',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            COLOR_BTN[color],
          ].join(' ')}
        >
          Share Achievement
        </button>
      )}
    </div>
  );
};

export default AchievementBadge;
