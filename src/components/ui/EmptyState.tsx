import React from 'react';
import { Search } from 'lucide-react';

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

const TONE_ICON_BG: Record<EmptyStateTone, string> = {
  default: 'bg-primary-50 text-primary-700',
  warm:    'bg-secondary-50 text-secondary-700',
  danger:  'bg-danger-bg text-danger-base',
};

const TONE_RING_BORDER: Record<EmptyStateTone, string> = {
  default: 'after:border-primary-200',
  warm:    'after:border-secondary-200',
  danger:  'after:border-danger-base/30',
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  tone = 'default',
  icon,
  title,
  description,
  actions,
  className = '',
}) => {
  const containerClasses = [
    'flex flex-col items-center text-center px-6 py-12 gap-4',
    className,
  ].filter(Boolean).join(' ');

  const iconWrapperClasses = [
    'relative w-22 h-22 rounded-full inline-flex items-center justify-center',
    'after:content-[""] after:absolute after:-inset-1.5 after:rounded-full after:border-2 after:opacity-60',
    TONE_ICON_BG[tone],
    TONE_RING_BORDER[tone],
  ].join(' ');

  return (
    <div className={containerClasses}>
      <span className={iconWrapperClasses} aria-hidden="true">
        {icon ?? <Search size={40} strokeWidth={1.75} />}
      </span>
      <h3 className="font-display text-h3 font-semibold text-ink-900 m-0 max-w-[380px]">
        {title}
      </h3>
      {description && (
        <p className="text-body-sm text-ink-600 leading-relaxed m-0 max-w-[440px]">
          {description}
        </p>
      )}
      {actions && (
        <div className="flex items-center justify-center gap-3 flex-wrap mt-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
