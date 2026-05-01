import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select — Native HTML select with design system styling
 *
 * Provides accessible dropdown selection with proper focus states,
 * icon indicators, and status variants.
 * Sizes: sm/md/lg. Variants: default/success/error/disabled.
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

export const Select: React.FC<SelectProps> = ({
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
  const wrapperClasses = [
    'select',
    size !== 'md' && `select--${size}`,
    status === 'success' && 'select--success',
    status === 'error' && 'select--error',
    disabled && 'select--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={wrapperClasses}>
      <select
        disabled={disabled}
        aria-invalid={status === 'error' || undefined}
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
        <span className="select__icon" aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      )}
    </span>
  );
};

export default Select;
