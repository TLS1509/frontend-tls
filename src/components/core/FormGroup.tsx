import React from 'react';

/**
 * FormGroup — Wrapper for form field + label + error/hint
 *
 * Combines with Input, Select, etc. for consistent form layout.
 * Provides consistent spacing, label positioning, and error display.
 */

export interface FormGroupProps {
  /** Label text displayed above the field */
  label?: React.ReactNode;
  /** Helper text below field */
  hint?: React.ReactNode;
  /** Error message (shows in red, overrides hint) */
  error?: React.ReactNode;
  /** Marks field as required */
  required?: boolean;
  /** Input id for label association */
  id?: string;
  /** Form control element (Input, Select, etc.) */
  children: React.ReactNode;
  /** Optional CSS class */
  className?: string;
  /** Optional direction - stack vertically or horizontally */
  layout?: 'vertical' | 'horizontal';
}

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
  const classes = [
    'form-group',
    layout === 'horizontal' && 'form-group--horizontal',
    hasError && 'form-group--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={id} className="form-group__label">
          {label}
          {required && <span className="form-group__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="form-group__control">{children}</div>

      {hasError ? (
        <p className="form-group__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="form-group__hint">{hint}</p>
      ) : null}
    </div>
  );
};

export default FormGroup;
