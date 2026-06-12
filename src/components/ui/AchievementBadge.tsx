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
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const ICON_CIRCLE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-[60px] h-[60px] mb-stack',
  md: 'w-[100px] h-[100px] mb-stack-lg',
  lg: 'w-[140px] h-[140px] mb-section',
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

const COLOR_TEXT: Record<AchievementBadgeColor, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-600',
  sun:     'text-accent-700',
  success: 'text-success-fg',
};

const COLOR_BTN: Record<AchievementBadgeColor, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-500 hover:bg-secondary-600 shadow-sm hover:shadow-md',
  sun:     'bg-accent-500 hover:bg-accent-600 shadow-sm hover:shadow-md',
  success: 'bg-success-base hover:bg-success-fg shadow-sm hover:shadow-md',
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
    'bg-white rounded-lg border-2 text-center transition-all duration-300',
    SIZE_PADDING[size],
    isLocked ? 'border-ink-200 opacity-60 scale-95' : COLOR_BORDER[color],
  ].join(' ');

  const circleClasses = [
    'relative inline-flex items-center justify-center mx-auto rounded-full overflow-hidden',
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
          <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-ink-500 border border-ink-200">
            <Lock size={Math.round(innerIconSize * 0.4)} />
          </span>
        )}
      </div>

      <h3 className="m-0 mb-2 text-h4 font-display font-semibold text-ink-900">{title}</h3>

      {description && (
        <p className="m-0 mb-stack text-body-sm text-ink-500 leading-relaxed">{description}</p>
      )}

      <p
        className={[
          'm-0 text-caption font-medium',
          isLocked ? 'text-ink-500' : COLOR_TEXT[color],
          onShare && !isLocked ? 'mb-stack' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {isLocked
          ? 'Complete prerequisites to unlock'
          : `Unlocked ${unlockedDate ? `on ${unlockedDate}` : 'today'}`}
      </p>

      {onShare && !isLocked && (
        <button
          type="button"
          onClick={onShare}
          className={[
            'mt-stack px-5 py-3 min-h-touch text-white border-0 rounded-md text-caption font-semibold cursor-pointer transition-all',
            'hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
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
