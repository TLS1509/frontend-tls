import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  compact?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  action,
  className = '',
  iconClassName = 'text-primary-500',
  compact = false,
}) => {
  return (
    <div
      className={[
        'flex items-start justify-between gap-6',
        compact ? 'mb-4' : 'mb-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['flex items-start flex-1', Icon ? 'gap-3' : 'gap-0'].join(' ')}>
        {Icon && (
          <Icon
            className={[
              'block shrink-0 mt-0.5',
              compact ? 'w-6 h-6' : 'w-7 h-7',
              iconClassName,
            ].join(' ')}
            strokeWidth={2}
          />
        )}

        <div
          className={['flex flex-col flex-1 min-w-0', subtitle ? 'gap-1' : 'gap-0'].join(' ')}
        >
          <h2
            className={[
              'font-display font-bold text-ink-900 leading-tight m-0',
              compact ? 'text-h4' : 'text-h3',
            ].join(' ')}
          >
            {title}
          </h2>

          {subtitle && (
            <p className="font-body text-body-sm font-normal text-ink-500 leading-relaxed m-0">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
