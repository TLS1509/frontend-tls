import React from 'react';

export type ActivityItemType = 'lesson' | 'achievement' | 'coach' | 'journal' | 'default';

interface ActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  type?: ActivityItemType;
  className?: string;
}

const TYPE_DOT: Record<ActivityItemType, string> = {
  default:     'bg-ink-300',
  lesson:      'bg-primary-500',
  achievement: 'bg-accent-500',
  coach:       'bg-secondary-500',
  journal:     'bg-success-base',
};

const TYPE_ICON: Record<ActivityItemType, string> = {
  default:     'bg-ink-50 text-ink-500',
  lesson:      'bg-primary-50 text-primary-600',
  achievement: 'bg-accent-50 text-accent-700',
  coach:       'bg-secondary-50 text-secondary-600',
  journal:     'bg-success-bg text-success-fg',
};

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  type = 'default',
  className = '',
}) => {
  const classes = [
    'group relative flex items-start gap-3 pb-5 last:pb-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="relative flex flex-col items-center shrink-0 pt-1">
        <span
          className={[
            'block w-2.5 h-2.5 rounded-full ring-4 ring-white z-10 shrink-0',
            TYPE_DOT[type],
          ].join(' ')}
        />
        <span
          aria-hidden="true"
          className="absolute top-3 bottom-0 w-px bg-ink-200 group-last:hidden"
        />
      </div>

      {icon && (
        <div
          className={[
            'shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center',
            TYPE_ICON[type],
          ].join(' ')}
        >
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h4 className="m-0 text-body-sm font-semibold text-ink-900 leading-snug">{title}</h4>
        {description && (
          <p className="m-0 mt-0.5 text-caption text-ink-500 leading-relaxed">{description}</p>
        )}
        {timestamp && (
          <span className="inline-block mt-1 text-micro text-ink-400">{timestamp}</span>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
