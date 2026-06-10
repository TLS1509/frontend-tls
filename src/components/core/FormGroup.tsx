import React from 'react';

export interface FormGroupProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const GROUP_BASE = 'flex flex-col gap-2 font-body';

const LAYOUT_CLASSES: Record<'vertical' | 'horizontal', string> = {
  vertical: '',
  horizontal: 'sm:flex-row sm:items-start sm:gap-4',
};

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  hint,
  error,
  required,
  id,
  children,
  className = '',
  layout = 'vertical',
}) => {
  const hasError = !!error;

  const groupClasses = [GROUP_BASE, LAYOUT_CLASSES[layout], className]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    'text-body-sm font-semibold flex items-center gap-1',
    hasError ? 'text-danger-fg' : 'text-ink-900',
    layout === 'horizontal' && 'sm:shrink-0 sm:min-w-[150px]',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && (
            <span className="text-danger-fg font-bold" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="flex-1 flex flex-col gap-2">
        {children}
        {hasError ? (
          <p className="text-caption text-danger-fg flex items-center gap-1" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-caption text-ink-500">{hint}</p>
        ) : null}
      </div>
    </div>
  );
};

export default FormGroup;
