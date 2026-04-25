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
  /** Competence name */
  label: React.ReactNode;
  /** Override the number shown in the dot (default: level) */
  dotContent?: React.ReactNode;
}

const LEVEL_CLASS: Record<CompetenceLevel, string> = {
  1: '', // default = primary / brand
  2: 'comp-badge--warm',
  3: 'comp-badge--sun',
  4: 'comp-badge--mastered',
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
  const classes = ['comp-badge', LEVEL_CLASS[level], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span className="comp-badge__dot" aria-hidden="true">
        {dotContent ?? level}
      </span>
      <span>{label}</span>
    </span>
  );
};

export default CompetenceBadge;
