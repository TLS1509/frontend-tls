/**
 * FormField
 *
 * Reusable form field wrapper with label, input, optional icons, and error state.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <FormField
 *   label="Email"
 *   placeholder="your@email.com"
 *   leadIcon={<Mail size={16} />}
 *   error={hasError ? "Invalid email" : undefined}
 * />
 */

import React from 'react';
import type { InputHTMLAttributes } from 'react';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
  helperText?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  leadIcon,
  trailIcon,
  helperText,
  className = '',
  disabled = false,
  ...inputProps
}) => {
  const hasError = !!error;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: 'var(--s-2)',
            fontSize: 'var(--t-body-sm)',
            fontWeight: 500,
            color: 'var(--text)',
          }}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Lead Icon */}
        {leadIcon && (
          <div
            style={{
              position: 'absolute',
              left: 'var(--s-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: hasError ? 'var(--tls-danger-base)' : 'var(--text-muted)',
            }}
          >
            {leadIcon}
          </div>
        )}

        {/* Input */}
        <input
          {...inputProps}
          disabled={disabled}
          style={{
            width: '100%',
            padding: leadIcon ? 'var(--s-3) var(--s-3) var(--s-3) var(--s-10)' : 'var(--s-3)',
            paddingRight: trailIcon ? 'var(--s-10)' : 'var(--s-3)',
            borderRadius: 'var(--r-xl)',
            border: hasError ? '1px solid var(--tls-danger-base)' : '1px solid var(--border-default)',
            background: disabled ? 'var(--surface-muted)' : 'var(--surface)',
            color: 'var(--text)',
            fontSize: 'var(--t-body-sm)',
            outline: 'none',
            transition: 'all var(--dur-2)',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!disabled && !hasError) {
              e.currentTarget.style.borderColor = 'var(--tls-primary-500)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--overlay-brand-xs)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = hasError ? 'var(--tls-danger-base)' : 'var(--border-default)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        {/* Trail Icon */}
        {trailIcon && (
          <div
            style={{
              position: 'absolute',
              right: 'var(--s-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: hasError ? 'var(--tls-danger-base)' : 'var(--text-muted)',
            }}
          >
            {trailIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          style={{
            marginTop: 'var(--s-1)',
            fontSize: 'var(--t-caption)',
            color: 'var(--tls-danger-base)',
          }}
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p
          style={{
            marginTop: 'var(--s-1)',
            fontSize: 'var(--t-caption)',
            color: 'var(--text-muted)',
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
