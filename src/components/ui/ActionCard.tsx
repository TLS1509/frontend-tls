import React from 'react';

export type ActionCardTone = 'brand' | 'warm' | 'sun';

interface ActionCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: ActionCardTone;
  className?: string;
}

const TONE_ICON: Record<ActionCardTone, string> = {
  brand: 'bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600',
  warm:  'bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-600',
  sun:   'bg-gradient-to-br from-accent-100 to-accent-50 text-accent-600',
};

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  action,
  tone = 'brand',
  className = '',
}) => {
  const classes = [
    'group flex items-center gap-4 p-6 bg-white border border-ink-200 rounded-lg transition-all',
    'hover:border-ink-300 hover:shadow-md hover:-translate-y-[3px]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {icon && (
        <div
          className={[
            'shrink-0 w-14 h-14 inline-flex items-center justify-center rounded-md text-3xl transition-transform',
            'group-hover:scale-[1.08]',
            TONE_ICON[tone],
          ].join(' ')}
        >
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="m-0 mb-2 text-h4 font-display font-semibold text-ink-900">{title}</h3>
        {description && <p className="m-0 text-body-sm text-ink-500">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default ActionCard;
