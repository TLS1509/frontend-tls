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
  beginner:     'bg-gradient-to-br from-success-bg to-white shadow-md',
  intermediate: 'bg-gradient-to-br from-primary-50 to-white shadow-brand-sm',
  advanced:     'bg-gradient-to-br from-secondary-50 to-white shadow-md',
  expert:       'bg-gradient-to-br from-accent-50 to-white shadow-md',
};

const LEVEL_LABEL: Record<MasteryLevel, string> = {
  beginner:     'text-success-fg',
  intermediate: 'text-primary-700',
  advanced:     'text-secondary-700',
  expert:       'text-accent-700',
};

const LEVEL_LABEL_BG: Record<MasteryLevel, string> = {
  beginner:     'bg-success-bg border-success-base/20',
  intermediate: 'bg-primary-50 border-primary-200',
  advanced:     'bg-secondary-50 border-secondary-200',
  expert:       'bg-accent-50 border-accent-200',
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
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  const classes = ['inline-flex flex-col items-center gap-stack-xs.5', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="relative w-[96px] h-[96px]">
        <svg
          viewBox="0 0 96 96"
          className={`w-full h-full -rotate-90 ${LEVEL_RING[level]}`}
          aria-hidden="true"
        >
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="6"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-700"
          />
        </svg>
        <div
          className={[
            'absolute inset-2 rounded-full inline-flex items-center justify-center text-3xl',
            LEVEL_BG[level],
          ].join(' ')}
        >
          {icon ?? defaults.icon}
        </div>
      </div>
      <span
        className={[
          'inline-flex items-center px-3 py-1 rounded-pill text-caption font-bold uppercase tracking-wider border',
          LEVEL_LABEL[level],
          LEVEL_LABEL_BG[level],
        ].join(' ')}
      >
        {label ?? defaults.label}
      </span>
    </div>
  );
};

export default MasteryBadge;
