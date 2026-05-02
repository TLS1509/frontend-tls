import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Input.css';

/**
 * Select — Complete, self-contained dropdown field component
 *
 * Includes everything needed for a form field:
 * - Label (with optional required indicator)
 * - Control (select with chevron icon)
 * - Helper text or error message
 *
 * Sizes: sm/md/lg
 * Status: default/success/error
 * Features: Custom options array or children elements, disabled, required
 */

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectStatus = 'default' | 'success' | 'error';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text displayed above the control */
  label?: React.ReactNode;
  /** Helper text displayed below the control */
  hint?: React.ReactNode;
  /** Error message (displayed in place of hint, overrides when present) */
  error?: React.ReactNode;
  /** Mark field as required (adds * to label) */
  required?: boolean;
  /** Visual size of the select */
  size?: SelectSize;
  /** Status variant: default/success/error */
  status?: SelectStatus;
  /** Array of options */
  options?: SelectOption[];
  /** Placeholder text when value is empty */
  placeholder?: string;
  /** Show chevron icon (default: true) */
  showIcon?: boolean;
}

/**
 * Select — Self-contained dropdown field component
 *
 * Usage:
 * <Select
 *   label="Choose language"
 *   hint="Select your preferred language"
 *   options={[
 *     { value: 'fr', label: 'Français' },
 *     { value: 'en', label: 'English' },
 *   ]}
 *   value={selected}
 *   onChange={handleChange}
 *   required
 * />
 */
export const Select: React.FC<SelectProps> = ({
  label,
  hint,
  error,
  required,
  id,
  size = 'md',
  status = 'default',
  options = [],
  placeholder = 'Sélectionner...',
  showIcon = true,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  // Generate ID if not provided
  const fieldId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

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

      {/* Control: Select with optional icon */}
      <span className={controlClasses}>
        <select
          id={fieldId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={error || hint ? `${fieldId}-message` : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {showIcon && (
          <span className="input__icon" aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        )}
      </span>

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

export default Select;
