import React from 'react';
import { Search } from 'lucide-react';

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
  default: 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100 text-secondary-700',
  danger:  'bg-gradient-to-br from-danger-bg to-danger-base/15 text-danger-fg',
};

const TONE_RING: Record<EmptyStateTone, string> = {
  default: 'ring-primary-100 shadow-brand-sm',
  warm:    'ring-secondary-100 shadow-md',
  danger:  'ring-danger-bg shadow-md',
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
    'flex flex-col items-center text-center px-6 py-14 gap-4 rounded-2xl bg-ink-50/40 border border-dashed border-ink-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconWrapperClasses = [
    'inline-flex items-center justify-center w-20 h-20 rounded-3xl ring-8 transition-transform',
    TONE_ICON_BG[tone],
    TONE_RING[tone],
  ].join(' ');

  return (
    <div className={containerClasses}>
      <span className={iconWrapperClasses} aria-hidden="true">
        {icon ?? <Search size={36} strokeWidth={1.75} />}
      </span>
      <div className="flex flex-col gap-2 max-w-[440px]">
        <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight text-balance">
          {title}
        </h3>
        {description && (
          <p className="text-body-sm text-ink-500 leading-relaxed m-0">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center justify-center gap-3 flex-wrap mt-2">{actions}</div>
      )}
    </div>
  );
};

export default EmptyState;
