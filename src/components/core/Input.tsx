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
 * Surface: light (default, white bg) | glass (dark glass surface — auth, overlays)
 * Features: Leading/trailing icons, multiline, disabled, required
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'success' | 'error';
export type InputSurface = 'light' | 'glass';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: InputSize;
  status?: InputStatus;
  /** `light` (default) = white bg on light surfaces. `glass` = dark translucent bg for auth/overlays. */
  surface?: InputSurface;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

const FIELD_BASE = 'flex flex-col gap-2 font-body';

const CONTROL_BASE =
  'flex items-center gap-2 w-full border rounded-md font-body transition-[border-color,box-shadow] duration-base ease-standard';

// Light surface (default)
const CONTROL_LIGHT = 'bg-white text-ink-900';

const STATUS_CLASSES: Record<InputStatus, string> = {
  default: 'border-ink-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
  success: 'border-success-base focus-within:ring-2 focus-within:ring-success-base/35',
  error: 'border-danger-base focus-within:ring-2 focus-within:ring-danger-base/35',
};

const DISABLED_LIGHT = 'bg-ink-50 text-ink-500 cursor-not-allowed hover:border-ink-300';

// Glass surface — for dark backgrounds (auth shell, modals on dark)
const CONTROL_GLASS =
  'bg-white/15 backdrop-blur-glass-medium text-white ' +
  'border-white/25 hover:border-white/35 ' +
  'focus-within:border-white/50 focus-within:ring-2 focus-within:ring-white/20';

const DISABLED_GLASS = 'bg-white/8 text-white/40 cursor-not-allowed hover:border-white/20';

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-caption',
  md: 'h-touch px-3.5 text-body-sm',
  lg: 'h-13 px-4 text-body',
};

const TEXTAREA_EXTRA = 'min-h-24 py-3 items-start';

const NATIVE_FIELD_LIGHT =
  'flex-1 bg-transparent outline-none border-0 shadow-none p-0 min-w-0 font-body text-inherit placeholder:text-ink-500 disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none [appearance:textfield]';

const NATIVE_FIELD_GLASS =
  'flex-1 bg-transparent outline-none border-0 shadow-none p-0 min-w-0 font-body text-inherit placeholder:text-white/50 disabled:cursor-not-allowed focus:outline-none focus:shadow-none focus:bg-transparent focus-visible:outline-none [appearance:textfield]';

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  required,
  id,
  size = 'md',
  status = 'default',
  surface = 'light',
  leadingIcon,
  trailingIcon,
  multiline = false,
  rows = 4,
  disabled,
  className = '',
  ...rest
}) => {
  const fieldId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isGlass = surface === 'glass';

  const containerClasses = [FIELD_BASE, className].filter(Boolean).join(' ');

  const controlClasses = [
    CONTROL_BASE,
    SIZE_CLASSES[size],
    isGlass ? CONTROL_GLASS : CONTROL_LIGHT,
    !isGlass && STATUS_CLASSES[status],
    multiline && TEXTAREA_EXTRA,
    multiline && 'h-auto',
    disabled && (isGlass ? DISABLED_GLASS : DISABLED_LIGHT),
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = isGlass
    ? 'text-body-sm font-semibold text-white'
    : 'text-body-sm font-semibold text-ink-900';

  const nativeFieldClasses = isGlass ? NATIVE_FIELD_GLASS : NATIVE_FIELD_LIGHT;

  const iconClasses = isGlass
    ? 'inline-flex items-center justify-center shrink-0 text-white/60 text-base'
    : 'inline-flex items-center justify-center shrink-0 text-ink-500 text-base';

  const hintClasses = isGlass ? 'text-caption text-white/60' : 'text-caption text-ink-500';
  const errorClasses = isGlass
    ? 'text-caption text-danger-base flex items-center gap-1'
    : 'text-caption text-danger-fg flex items-center gap-1';

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses} htmlFor={fieldId}>
          {label}
          {required && (
            <span className={isGlass ? 'text-danger-base ml-0.5' : 'text-danger-fg ml-0.5'} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={controlClasses}>
        {leadingIcon && (
          <span className={iconClasses}>{leadingIcon}</span>
        )}

        {multiline ? (
          <textarea
            id={fieldId}
            rows={rows}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={`${nativeFieldClasses} resize-y`}
            {...(rest as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={error || hint ? `${fieldId}-message` : undefined}
            className={nativeFieldClasses}
            {...rest}
          />
        )}

        {trailingIcon && (
          <span className={iconClasses}>{trailingIcon}</span>
        )}
      </div>

      {(error || hint) && (
        <p
          id={`${fieldId}-message`}
          className={error ? errorClasses : hintClasses}
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
