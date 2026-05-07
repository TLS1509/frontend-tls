import React from 'react';

export type CompetenceLevel = 1 | 2 | 3 | 4;

export interface CompetenceBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: CompetenceLevel;
  label: React.ReactNode;
  dotContent?: React.ReactNode;
}

const LEVEL_BADGE_CLASSES: Record<CompetenceLevel, string> = {
  1: 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-800 border border-primary-200',
  2: 'bg-gradient-to-r from-secondary-50 to-secondary-100 text-secondary-800 border border-secondary-200',
  3: 'bg-gradient-to-r from-accent-50 to-accent-100 text-accent-900 border border-accent-200',
  4: 'bg-[radial-gradient(circle_at_0%_0%,#55A1B4_0%,#2F5F6A_60%,#1F3E45_100%)] text-white border border-primary-900/30',
};

const LEVEL_DOT_CLASSES: Record<CompetenceLevel, string> = {
  1: 'bg-primary-600 text-white shadow-brand-xs',
  2: 'bg-secondary-600 text-white shadow-sm',
  3: 'bg-accent-500 text-white shadow-sm',
  4: 'bg-white/95 text-primary-800 shadow-md',
};

export const LEVEL_LABELS: Record<CompetenceLevel, string> = {
  1: 'Découverte',
  2: 'Pratique',
  3: 'Maîtrise',
  4: 'Expert',
};

export const CompetenceBadge: React.FC<CompetenceBadgeProps> = ({
  level,
  label,
  dotContent,
  className = '',
  ...rest
}) => {
  const classes = [
    'inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-pill text-body-sm font-bold font-body',
    LEVEL_BADGE_CLASSES[level],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span
        className={[
          'w-6 h-6 rounded-full inline-flex items-center justify-center text-caption font-extrabold shrink-0 leading-none',
          LEVEL_DOT_CLASSES[level],
        ].join(' ')}
        aria-hidden="true"
      >
        {dotContent ?? level}
      </span>
      <span>{label}</span>
    </span>
  );
};

export default CompetenceBadge;
