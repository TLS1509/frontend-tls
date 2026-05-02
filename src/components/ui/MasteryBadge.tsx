import React from 'react';

/**
 * MasteryBadge — Large badge showing mastery level with icon + ring.
 * Used on Profile and Leaderboard pages.
 * Levels: beginner / intermediate / advanced / expert
 */

export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface MasteryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  level: MasteryLevel;
  /** Emoji or icon content shown in the center */
  icon?: React.ReactNode;
  /** Label shown below the badge */
  label?: string;
  /** Ring fill percentage (default: 100) */
  progress?: number;
}

const LEVEL_DEFAULTS: Record<MasteryLevel, { icon: string; label: string }> = {
  beginner:     { icon: '🌱', label: 'Débutant' },
  intermediate: { icon: '⚡', label: 'Intermédiaire' },
  advanced:     { icon: '🔥', label: 'Avancé' },
  expert:       { icon: '🏆', label: 'Expert' },
};

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  level,
  icon,
  label,
  progress = 100,
  className = '',
  style,
  ...rest
}) => {
  const defaults = LEVEL_DEFAULTS[level];
  const pct = Math.min(Math.max(progress, 0), 100);

  const classes = [
    'mastery-badge',
    `mastery-badge--${level}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ringStyle = {
    ...style,
    ['--ring-pct' as string]: `${pct}`,
  } as React.CSSProperties;

  return (
    <div className={classes} {...rest}>
      <div className="mastery-badge__ring" style={ringStyle}>
        <div className="mastery-badge__icon">
          {icon ?? defaults.icon}
        </div>
      </div>
      <span className="mastery-badge__label">
        {label ?? defaults.label}
      </span>
    </div>
  );
};

export default MasteryBadge;
