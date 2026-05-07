import React from 'react';

/**
 * CompetenceBadge — Source of truth: design-system/spec.json → components.CompetenceBadge
 *
 * Competence + acquired level. 4 progressive chromatic tiers.
 * Rule: Color = level. Stable assignment, never decorative.
 */

export type CompetenceLevel = 1 | 2 | 3 | 4;

export interface CompetenceBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: CompetenceLevel;
  label: React.ReactNode;
  dotContent?: React.ReactNode;
}

const LEVEL_BADGE_CLASSES: Record<CompetenceLevel, string> = {
  1: 'bg-primary-50 text-primary-800',
  2: 'bg-secondary-50 text-secondary-700',
  3: 'bg-accent-100 text-accent-900',
  4: 'bg-[radial-gradient(circle_at_0%_0%,#55A1B4_0%,#2F5F6A_60%,#1F3E45_100%)] text-white',
};

const LEVEL_DOT_CLASSES: Record<CompetenceLevel, string> = {
  1: 'bg-primary-600 text-white',
  2: 'bg-secondary-600 text-white',
  3: 'bg-accent-400 text-accent-900',
  4: 'bg-white/30 text-primary-800',
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
    'inline-flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-pill text-body-sm font-semibold font-body',
    LEVEL_BADGE_CLASSES[level],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span
        className={`w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[11px] font-bold shrink-0 ${LEVEL_DOT_CLASSES[level]}`}
        aria-hidden="true"
      >
        {dotContent ?? level}
      </span>
      <span>{label}</span>
    </span>
  );
};

export default CompetenceBadge;
