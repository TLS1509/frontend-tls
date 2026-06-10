import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select — Self-contained dropdown field component (Tailwind v4)
 *
 * Includes everything needed for a form field:
 * - Label (with optional required indicator)
 * - Control (select with chevron icon)
 * - Helper text or error message
 *
 * Sizes: sm/md/lg
 * Status: default/success/error
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
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: SelectSize;
  status?: SelectStatus;
  options?: SelectOption[];
  placeholder?: string;
  showIcon?: boolean;
}

const FIELD_BASE = 'flex flex-col gap-2 font-body';

const CONTROL_BASE =
  'inline-flex items-center gap-2 w-full bg-white border rounded-md text-ink-900 font-body transition-colors duration-200';

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'h-9 px-3 text-caption',
  md: 'h-11 px-3.5 text-body-sm',
  lg: 'h-13 px-4 text-body',
};

const STATUS_CLASSES: Record<SelectStatus, string> = {
  default: 'border-ink-300',
  success: 'border-success-base',
  error: 'border-danger-base',
};

const DISABLED_CLASSES =
  'bg-ink-50 text-ink-500 cursor-not-allowed';

const NATIVE_SELECT =
  'flex-1 bg-transparent outline-none border-0 p-0 min-w-0 font-body text-inherit appearance-none cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none';

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
  const fieldId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [FIELD_BASE, className].filter(Boolean).join(' ');

  const controlClasses = [
    CONTROL_BASE,
    SIZE_CLASSES[size],
    STATUS_CLASSES[status],
    disabled && DISABLED_CLASSES,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label
          className="text-body-sm font-semibold text-ink-900"
          htmlFor={fieldId}
        >
          {label}
          {required && (
            <span className="text-danger-fg ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <span className={controlClasses}>
        <select
          id={fieldId}
          disabled={disabled}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={error || hint ? `${fieldId}-message` : undefined}
          className={NATIVE_SELECT}
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
          <span
            className="inline-flex items-center justify-center shrink-0 text-ink-500 pointer-events-none"
            aria-hidden="true"
          >
            <ChevronDown size={16} />
          </span>
        )}
      </span>

      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={
            error
              ? 'text-caption text-danger-fg flex items-center gap-1'
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

export default Select;
