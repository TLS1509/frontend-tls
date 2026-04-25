import React from 'react';

/**
 * EmptyState — Source of truth: design-system/spec.json → components.EmptyState
 *
 * First contact, no results, server error. Always with an actionable exit.
 * Rule: Every empty state must have a primary CTA. No dead ends.
 */

export type EmptyStateTone = 'default' | 'warm' | 'danger';

export interface EmptyStateProps {
  tone?: EmptyStateTone;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Primary + secondary actions (Button components) */
  actions?: React.ReactNode;
  className?: string;
}

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const EmptyState: React.FC<EmptyStateProps> = ({
  tone = 'default',
  icon,
  title,
  description,
  actions,
  className = '',
}) => {
  const classes = ['empty', className].filter(Boolean).join(' ');
  const iconClasses = [
    'empty__icon',
    tone === 'warm' && 'empty__icon--warm',
    tone === 'danger' && 'empty__icon--danger',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className={iconClasses} aria-hidden="true">
        {icon ?? DEFAULT_ICON}
      </span>
      <h3 className="empty__title">{title}</h3>
      {description && <p className="empty__desc">{description}</p>}
      {actions && <div className="empty__actions">{actions}</div>}
    </div>
  );
};

export default EmptyState;
