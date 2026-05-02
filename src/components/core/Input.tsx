import React from 'react';
import './Input.css';

/**
 * Input — Source of truth: design-system/spec.json → components.Input
 *
 * Form field. Label always above, never placeholder-only. Hint/error below.
 * Sizes: sm/md/lg. Variants: default/success/error/disabled + textarea.
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'error';

export interface FieldProps {
  /** Label text displayed above the input */
  label?: React.ReactNode;
  /** Helper text below input */
  hint?: React.ReactNode;
  /** Error message (overrides hint when shown) */
  error?: React.ReactNode;
  /** Marks field as required visually + in DOM */
  required?: boolean;
  /** Input id (auto-generated if omitted) — used to link label */
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/** Wrapper that provides label + hint/error layout. */
export const Field: React.FC<FieldProps> = ({
  label,
  hint,
  error,
  required,
  id,
  children,
  className = '',
}) => {
  const classes = ['field', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className="field__label" htmlFor={id}>
          {label}
          {required && <span className="required" aria-hidden="true"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
};

// ============================================================================
// INPUT
// ============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  status?: InputStatus;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Render as textarea instead of input */
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  size = 'md',
  status = 'default',
  leadingIcon,
  trailingIcon,
  multiline = false,
  rows = 4,
  disabled,
  className = '',
  ...rest
}) => {
  const wrapperClasses = [
    'input',
    size !== 'md' && `input--${size}`,
    status === 'success' && 'input--success',
    status === 'error' && 'input--error',
    disabled && 'input--disabled',
    multiline && 'textarea',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={wrapperClasses}>
      {leadingIcon && <span className="input__icon">{leadingIcon}</span>}
      {multiline ? (
        <textarea
          rows={rows}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          {...rest}
        />
      )}
      {trailingIcon && <span className="input__icon">{trailingIcon}</span>}
    </span>
  );
};

// ============================================================================
// CHECKBOX
// ============================================================================

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  ...rest
}) => (
  <label className={['check', className].filter(Boolean).join(' ')}>
    <input type="checkbox" {...rest} />
    <span className="check__box" aria-hidden="true" />
    {label && <span>{label}</span>}
  </label>
);

// ============================================================================
// RADIO
// ============================================================================

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  className = '',
  ...rest
}) => (
  <label className={['radio', className].filter(Boolean).join(' ')}>
    <input type="radio" {...rest} />
    <span className="radio__box" aria-hidden="true" />
    {label && <span>{label}</span>}
  </label>
);

// ============================================================================
// SWITCH
// ============================================================================

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  className = '',
  ...rest
}) => (
  <label className={['switch', className].filter(Boolean).join(' ')}>
    <input type="checkbox" role="switch" {...rest} />
    <span className="switch__track" aria-hidden="true" />
    {label && <span>{label}</span>}
  </label>
);

export default Input;
