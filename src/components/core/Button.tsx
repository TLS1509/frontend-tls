import React from 'react';

/**
 * Button — Source of truth: design-system/spec.json → components.Button
 *
 * A single action trigger. Pill shape, clear hierarchy:
 *   - primary: one per screen, main task
 *   - warm: post-success / celebration CTA
 *   - secondary: alternative actions
 *   - ghost: tertiary (cancel, dismiss)
 *   - brand-ghost: soft brand action
 *   - destructive: delete / irreversible
 *   - glass: on tinted/gradient surfaces only
 *   - link: inline text links
 */

export type ButtonVariant =
  | 'primary'
  | 'warm'
  | 'secondary'
  | 'ghost'
  | 'brand-ghost'
  | 'destructive'
  | 'glass'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render just an icon (requires aria-label) */
  iconOnly?: boolean;
  /** Icon before label */
  leadingIcon?: React.ReactNode;
  /** Icon after label */
  trailingIcon?: React.ReactNode;
  /** Loading state — disables + shows spinner */
  loading?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** HTML button type (button | submit | reset) */
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  type = 'button',
  disabled,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    iconOnly && 'btn--icon-only',
    fullWidth && 'btn--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      {...rest}
    >
      {leadingIcon && <span className="btn__icon">{leadingIcon}</span>}
      {!iconOnly && children}
      {iconOnly && children}
      {trailingIcon && <span className="btn__icon">{trailingIcon}</span>}
    </button>
  );
};

export default Button;
