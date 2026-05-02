import React from 'react';
import './Input.css';

/**
 * Input — Complete, self-contained form field component
 *
 * Includes everything needed for a form field:
 * - Label (with optional required indicator)
 * - Control (input/textarea with optional icons)
 * - Helper text or error message
 *
 * Sizes: sm/md/lg
 * Status: default/success/error
 * Features: Leading/trailing icons, multiline, disabled, required
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'error';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the control */
  label?: React.ReactNode;
  /** Helper text displayed below the control */
  hint?: React.ReactNode;
  /** Error message (displayed in place of hint, overrides when present) */
  error?: React.ReactNode;
  /** Mark field as required (adds * to label) */
  required?: boolean;
  /** Size of the input control */
  size?: InputSize;
  /** Status/validation state of the input */
  status?: InputStatus;
  /** Icon displayed before the input text */
  leadingIcon?: React.ReactNode;
  /** Icon or control displayed after the input text */
  trailingIcon?: React.ReactNode;
  /** Render as textarea instead of input */
  multiline?: boolean;
  /** Number of rows for textarea */
  rows?: number;
}

/**
 * Input — Self-contained form field component
 *
 * Usage:
 * <Input
 *   label="Email"
 *   hint="Enter your work email"
 *   error={emailError}
 *   type="email"
 *   required
 *   status={emailError ? "error" : "default"}
 * />
 */
export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  required,
  id,
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
  // Generate ID if not provided
  const fieldId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Container classes for the entire field
  const containerClasses = [
    'field',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Control wrapper classes (using .input base class with modifiers)
  const controlClasses = [
    'input',
    size !== 'md' && `input--${size}`,
    status === 'success' && 'input--success',
    status === 'error' && 'input--error',
    disabled && 'input--disabled',
    multiline && 'textarea',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label className="field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="required" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Control: Input/Textarea with optional icons */}
      <div className={controlClasses}>
        {leadingIcon && <span className="input__icon">{leadingIcon}</span>}

        {multiline ? (
          <textarea
            id={fieldId}
            rows={rows}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            {...rest}
          />
        )}

        {trailingIcon && <span className="input__icon">{trailingIcon}</span>}
      </div>

      {/* Helper text or error message */}
      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={error ? 'field__error' : 'field__hint'}
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// CHECKBOX — Self-contained checkbox with integrated label
// ============================================================================

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text displayed next to checkbox */
  label?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={['check', className].filter(Boolean).join(' ')}>
      <input
        id={fieldId}
        type="checkbox"
        {...rest}
      />
      <span className="check__box" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// RADIO — Self-contained radio button with integrated label
// ============================================================================

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text displayed next to radio button */
  label?: React.ReactNode;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={['radio', className].filter(Boolean).join(' ')}>
      <input
        id={fieldId}
        type="radio"
        {...rest}
      />
      <span className="radio__box" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// SWITCH/TOGGLE — Self-contained toggle with integrated label
// ============================================================================

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text displayed next to toggle */
  label?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={['switch', className].filter(Boolean).join(' ')}>
      <input
        id={fieldId}
        type="checkbox"
        role="switch"
        {...rest}
      />
      <span className="switch__track" aria-hidden="true" />
      {label && <span>{label}</span>}
    </label>
  );
};


export default Input;
