import React from 'react';

export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface MasteryBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  level: MasteryLevel;
  icon?: React.ReactNode;
  label?: string;
  progress?: number;
}

const LEVEL_DEFAULTS: Record<MasteryLevel, { icon: string; label: string }> = {
  beginner:     { icon: '🌱', label: 'Débutant' },
  intermediate: { icon: '⚡', label: 'Intermédiaire' },
  advanced:     { icon: '🔥', label: 'Avancé' },
  expert:       { icon: '🏆', label: 'Expert' },
};

const LEVEL_RING: Record<MasteryLevel, string> = {
  beginner:     'text-success-base',
  intermediate: 'text-primary-500',
  advanced:     'text-secondary-500',
  expert:       'text-accent-500',
};

const LEVEL_BG: Record<MasteryLevel, string> = {
  beginner:     'bg-gradient-to-br from-success-bg to-white',
  intermediate: 'bg-gradient-to-br from-primary-50 to-white',
  advanced:     'bg-gradient-to-br from-secondary-50 to-white',
  expert:       'bg-gradient-to-br from-accent-50 to-white',
};

const LEVEL_LABEL: Record<MasteryLevel, string> = {
  beginner:     'text-success-fg',
  intermediate: 'text-primary-700',
  advanced:     'text-secondary-700',
  expert:       'text-accent-700',
};

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({
  level,
  icon,
  label,
  progress = 100,
  className = '',
  ...rest
}) => {
  const defaults = LEVEL_DEFAULTS[level];
  const pct = Math.min(Math.max(progress, 0), 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  const classes = ['inline-flex flex-col items-center gap-2', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="relative w-[88px] h-[88px]">
        <svg
          viewBox="0 0 88 88"
          className={`w-full h-full -rotate-90 ${LEVEL_RING[level]}`}
          aria-hidden="true"
        >
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="6"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
        <div
          className={[
            'absolute inset-2 rounded-full inline-flex items-center justify-center text-3xl shadow-sm',
            LEVEL_BG[level],
          ].join(' ')}
        >
          {icon ?? defaults.icon}
        </div>
      </div>
      <span className={`text-caption font-bold uppercase tracking-wider ${LEVEL_LABEL[level]}`}>
        {label ?? defaults.label}
      </span>
    </div>
  );
};

export default MasteryBadge;
