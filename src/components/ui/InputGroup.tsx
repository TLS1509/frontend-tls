import React from 'react';

export type InputGroupLayout = 'vertical' | 'horizontal' | 'grid';
export type InputGroupColumns = 2 | 3 | 4;

export interface InputGroupProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  layout?: InputGroupLayout;
  columns?: InputGroupColumns;
  children: React.ReactNode;
  className?: string;
}

const LAYOUT_CLASSES: Record<InputGroupLayout, string> = {
  vertical:   'flex flex-col gap-stack',
  horizontal: 'flex flex-row flex-wrap gap-stack-xs items-end',
  grid:       'grid gap-stack-xs',
};

const COLUMNS_CLASSES: Record<InputGroupColumns, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  hint,
  error,
  required,
  layout = 'vertical',
  columns = 2,
  children,
  className = '',
}) => {
  const groupId = `inputgroup-${Math.random().toString(36).substr(2, 6)}`;

  const fieldsClasses = [
    LAYOUT_CLASSES[layout],
    layout === 'grid' && COLUMNS_CLASSES[columns],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={['flex flex-col gap-stack-xs font-body', className].filter(Boolean).join(' ')}
      aria-describedby={error || hint ? `${groupId}-message` : undefined}
    >
      {label && (
        <span className="text-body-sm font-semibold text-ink-900">
          {label}
          {required && (
            <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>
          )}
        </span>
      )}

      <div className={fieldsClasses}>
        {children}
      </div>

      {(error || hint) && (
        <p
          id={`${groupId}-message`}
          className={
            error
              ? 'text-caption text-danger-fg flex items-center gap-tight'
              : 'text-caption text-ink-500'
          }
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
