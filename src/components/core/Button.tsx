import React from 'react';

/**
 * Button — Source of truth: design-system/spec.json → components.Button
 *
 * A single action trigger. Pill shape, clear hierarchy:
 *   - primary:     one per screen, main task (teal #4A8FA1)
 *   - secondary:   alternative actions / warm CTA (orange #ED843A)
 *   - accent:      celebration / highlight (yellow #DF9E3D)
 *   - ghost:       soft brand action (light teal bg)
 *   - destructive: delete / irreversible
 *   - glass:       on tinted/gradient surfaces only
 *   - link:        inline text links
 *
 * Deprecated aliases (backward compat):
 *   - warm        → use 'secondary'
 *   - brand-ghost → use 'ghost'
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'destructive'
  | 'glass'
  | 'link'
  // Deprecated — kept as aliases for backward compatibility
  | 'warm'
  | 'brand-ghost';

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

const BASE = 'inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold tracking-tight cursor-pointer border-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0 aria-busy:pointer-events-none whitespace-nowrap select-none';

// Hover strategy for filled variants: keep the base color (no aggressive
// darkening) and add a colored glow shadow + subtle lift via translate-y
// in BASE. The active state still darkens for tactile feedback. Less
// "saturated to death" than hover:bg-X-700.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:     'bg-primary-600 text-white shadow-sm hover:shadow-brand-md hover:bg-primary-500 active:bg-primary-800 active:shadow-sm',
  secondary:   'bg-secondary-500 text-white shadow-sm hover:shadow-warm-md hover:bg-secondary-400 active:bg-secondary-700 active:shadow-sm',
  accent:      'bg-accent-500 text-white shadow-sm hover:shadow-sun-sm hover:bg-accent-400 active:bg-accent-700 active:shadow-sm',
  ghost:       'bg-primary-50 text-primary-800 shadow-xs hover:bg-primary-100 hover:shadow-sm active:bg-primary-200',
  destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-500 hover:shadow-[0_6px_16px_-2px_rgba(220,38,38,0.4)] active:bg-red-800 active:shadow-sm',
  glass:       'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/35 hover:border-white/50',
  link:        'bg-transparent text-primary-700 underline underline-offset-4 hover:text-primary-800 hover:translate-y-0 p-0 h-auto',
  // Deprecated aliases — point to the new mapping (same hover logic)
  warm:           'bg-secondary-500 text-white shadow-sm hover:shadow-warm-md hover:bg-secondary-400 active:bg-secondary-700 active:shadow-sm',
  'brand-ghost':  'bg-primary-50 text-primary-800 shadow-xs hover:bg-primary-100 hover:shadow-sm active:bg-primary-200',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-caption',
  md: 'h-10 px-5 text-body-sm',
  lg: 'h-12 px-6 text-body',
  xl: 'h-14 px-7 text-body-lg',
};

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
    BASE,
    VARIANT_CLASSES[variant],
    !iconOnly && SIZE_CLASSES[size],
    iconOnly && `w-10 ${size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : size === 'xl' ? 'w-14' : 'w-10'} aspect-square`,
    fullWidth && 'w-full',
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
      {leadingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{leadingIcon}</span>}
      {!iconOnly && children}
      {iconOnly && children}
      {trailingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{trailingIcon}</span>}
    </button>
  );
};

export default Button;
