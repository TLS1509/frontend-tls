import React from 'react';

/**
 * Input — Self-contained form field component (Tailwind v4)
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
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: InputSize;
  status?: InputStatus;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

const FIELD_BASE = 'flex flex-col gap-2 font-body';

const CONTROL_BASE =
  'flex items-center gap-2 w-full bg-white border rounded-md text-ink-900 font-body transition-colors duration-200';

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-caption',
  md: 'h-11 px-3.5 text-body-sm',
  lg: 'h-13 px-4 text-body',
};

const STATUS_CLASSES: Record<InputStatus, string> = {
  default: 'border-ink-300',
  success: 'border-emerald-500',
  error: 'border-red-500',
};

const DISABLED_CLASSES =
  'bg-ink-50 text-ink-500 cursor-not-allowed hover:border-ink-300';

const TEXTAREA_EXTRA = 'min-h-24 py-3 items-start';

const NATIVE_FIELD =
  'flex-1 bg-transparent outline-none border-0 p-0 min-w-0 font-body text-inherit placeholder:text-ink-500 disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none';

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
  const fieldId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [FIELD_BASE, className].filter(Boolean).join(' ');

  const controlClasses = [
    CONTROL_BASE,
    SIZE_CLASSES[size],
    STATUS_CLASSES[status],
    multiline && TEXTAREA_EXTRA,
    multiline && 'h-auto',
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
            <span className="text-red-600 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={controlClasses}>
        {leadingIcon && (
          <span className="inline-flex items-center justify-center shrink-0 text-ink-500 text-base">
            {leadingIcon}
          </span>
        )}

        {multiline ? (
          <textarea
            id={fieldId}
            rows={rows}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={`${NATIVE_FIELD} resize-y`}
            {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={NATIVE_FIELD}
            {...rest}
          />
        )}

        {trailingIcon && (
          <span className="inline-flex items-center justify-center shrink-0 text-ink-500 text-base">
            {trailingIcon}
          </span>
        )}
      </div>

      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={
            error
              ? 'text-caption text-red-700 flex items-center gap-1'
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

// ============================================================================
// CHECKBOX
// ============================================================================

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

const TOGGLE_LABEL =
  'relative inline-flex items-center gap-2 cursor-pointer font-body text-body-sm text-ink-900 select-none';

const CHECKBOX_BOX =
  "inline-flex items-center justify-center w-5 h-5 shrink-0 bg-white border-2 border-ink-300 rounded-sm transition-colors " +
  "peer-checked:bg-primary-500 peer-checked:border-primary-500 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:border-ink-200 peer-disabled:cursor-not-allowed " +
  "after:content-['✓'] after:text-white after:font-bold after:text-[12px] after:leading-none after:opacity-0 " +
  "peer-checked:after:opacity-100";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input id={fieldId} type="checkbox" className="peer sr-only" {...rest} />
      <span aria-hidden="true" className={CHECKBOX_BOX} />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// RADIO
// ============================================================================

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

const RADIO_BOX =
  "inline-flex items-center justify-center w-5 h-5 shrink-0 bg-white border-2 border-ink-300 rounded-full transition-colors " +
  "peer-checked:border-primary-500 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:border-ink-200 peer-disabled:cursor-not-allowed " +
  "after:content-[''] after:w-2 after:h-2 after:rounded-full after:bg-primary-500 after:opacity-0 " +
  "peer-checked:after:opacity-100";

export const Radio: React.FC<RadioProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input id={fieldId} type="radio" className="peer sr-only" {...rest} />
      <span aria-hidden="true" className={RADIO_BOX} />
      {label && <span>{label}</span>}
    </label>
  );
};

// ============================================================================
// SWITCH / TOGGLE
// ============================================================================

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

const SWITCH_TRACK =
  "relative inline-block w-11 h-6 rounded-xl bg-ink-300 shrink-0 transition-colors " +
  "peer-checked:bg-primary-500 " +
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500 " +
  "peer-disabled:bg-ink-50 peer-disabled:cursor-not-allowed " +
  "after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:transition-transform " +
  "peer-checked:after:translate-x-5";

export const Switch: React.FC<SwitchProps> = ({
  label,
  id,
  className = '',
  ...rest
}) => {
  const fieldId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={[TOGGLE_LABEL, className].filter(Boolean).join(' ')}>
      <input
        id={fieldId}
        type="checkbox"
        role="switch"
        className="peer sr-only"
        {...rest}
      />
      <span aria-hidden="true" className={SWITCH_TRACK} />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Input;
