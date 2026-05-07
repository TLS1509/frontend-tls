import React from 'react';

interface PageHeaderSimpleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeaderSimple: React.FC<PageHeaderSimpleProps> = ({
  title,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="font-display text-h1 font-bold text-ink-900 m-0 mb-2">{title}</h1>

      {description && <p className="text-body text-ink-500 m-0 mb-4">{description}</p>}

      {actions && <div className="flex gap-2 items-center">{actions}</div>}
    </div>
  );
};

export default PageHeaderSimple;
