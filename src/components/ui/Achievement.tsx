import React from 'react';
import { Lock } from 'lucide-react';

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

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-3 gap-2',
  md: 'p-4 gap-3',
  lg: 'p-6 gap-4',
};

const BADGE_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-12 h-12 text-2xl',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-20 h-20 text-4xl',
};

const VARIANT_CARD: Record<'unlocked' | 'locked' | 'in-progress', string> = {
  unlocked:     'bg-gradient-to-br from-accent-50 to-white border-accent-200',
  locked:       'bg-ink-50 border-ink-200 opacity-70',
  'in-progress': 'bg-white border-primary-200',
};

const VARIANT_BADGE: Record<'unlocked' | 'locked' | 'in-progress', string> = {
  unlocked:     'bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-md',
  locked:       'bg-ink-200 text-ink-400',
  'in-progress': 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-sm',
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
    'flex items-center border rounded-xl transition-all',
    SIZE_CLASSES[size],
    VARIANT_CARD[variant],
    isClickable && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
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
            'inline-flex items-center justify-center rounded-full',
            BADGE_SIZE[size],
            VARIANT_BADGE[variant],
          ].join(' ')}
        >
          {icon}
        </div>
        {variant === 'locked' && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 inline-flex items-center justify-center rounded-full bg-ink-500 text-white border-2 border-white">
            <Lock size={12} strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="m-0 text-body font-semibold text-ink-900 truncate">{title}</h3>
        <p className="m-0 mt-0.5 text-body-sm text-ink-500">{description}</p>

        {variant === 'in-progress' && progress !== undefined && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-ink-100 rounded-pill overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-pill transition-[width] duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-caption font-semibold text-ink-700 min-w-[3.5rem] text-right">
              {progress} / {maxProgress}
            </span>
          </div>
        )}

        {variant === 'unlocked' && unlockedAt && (
          <p className="m-0 mt-1 text-caption text-accent-700 font-medium">Unlocked {unlockedAt}</p>
        )}
      </div>
    </div>
  );
};

export default Achievement;
