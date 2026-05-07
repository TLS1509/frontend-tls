import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  divider = false,
  className = '',
}) => {
  const classes = [
    'w-full',
    divider && 'pb-4 border-b border-ink-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <span
              className="inline-flex items-center justify-center text-2xl text-primary-600 shrink-0"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="m-0 text-h3 font-display font-semibold text-ink-900 truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="m-0 text-body-sm text-ink-500">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
};

export default SectionTitle;
