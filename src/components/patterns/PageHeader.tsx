import React from 'react';

interface EyebrowProps {
  icon?: React.ReactNode;
  text: string;
}

interface PageHeaderProps {
  eyebrow?: EyebrowProps;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  className = '',
}) => {
  const classes = [
    'flex justify-between items-start gap-6 mb-10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <div className="inline-flex items-center gap-1 text-caption font-semibold text-ink-500 uppercase tracking-wider">
            {eyebrow.icon && (
              <span className="flex items-center text-ink-500">{eyebrow.icon}</span>
            )}
            {eyebrow.text}
          </div>
        )}

        <h1 className="font-display text-h1 font-extrabold text-ink-900 m-0 leading-tight tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-body text-ink-500 m-0 leading-relaxed max-w-[600px]">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex gap-3 items-center shrink-0 pt-1">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
