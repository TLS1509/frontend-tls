/**
 * Achievement.tsx
 *
 * Achievement/Badge component for displaying earned achievements and milestones
 */

import React from 'react';
import './Achievement.css';

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
  const progressPercent = maxProgress > 0 ? Math.min((progress || 0) / maxProgress * 100, 100) : 0;

  const classes = [
    'tls-achievement',
    `tls-achievement--${size}`,
    `tls-achievement--${variant}`,
    isClickable && 'tls-achievement--clickable',
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
      <div className="tls-achievement__badge">
        <div className="tls-achievement__icon">{icon}</div>
        {variant === 'locked' && <div className="tls-achievement__lock">🔒</div>}
      </div>

      <div className="tls-achievement__content">
        <h3 className="tls-achievement__title">{title}</h3>
        <p className="tls-achievement__description">{description}</p>

        {variant === 'in-progress' && progress !== undefined && (
          <div className="tls-achievement__progress">
            <div className="tls-achievement__progress-bar">
              <div
                className="tls-achievement__progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="tls-achievement__progress-text">
              {progress} / {maxProgress}
            </span>
          </div>
        )}

        {variant === 'unlocked' && unlockedAt && (
          <p className="tls-achievement__unlocked-date">Unlocked {unlockedAt}</p>
        )}
      </div>
    </div>
  );
};
