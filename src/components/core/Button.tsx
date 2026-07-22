import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * A single action trigger. Pill shape, clear hierarchy:
 *   - primary:           one per screen, main task (teal #4A8FA1)
 *   - secondary:         alternative actions / warm CTA (orange #ED843A)
 *   - accent:            celebration / highlight (yellow #DF9E3D)
 *   - ghost:             soft brand action (light teal bg, very subtle border)
 *   - outline:          transparent bg + visible teal border (mid-weight between ghost and primary)
 *   - outline-warm:     transparent bg + visible orange border
 *   - destructive:       delete / irreversible
 *   - glass:             on DARK tinted/gradient surfaces (text-white, semi-transparent)
 *   - glass-light:       ⭐ on LIGHT tinted surfaces (cards EntryCard/SessionCard tinted) — filled frosted white
 *   - glass-light-ghost: ⭐ on LIGHT tinted surfaces — ghost frosted (secondary action)
 *   - glass-brand:       ⭐ frosted tinted brand (primary-100/70 + blur) — tone-aware glass
 *   - glass-warm:        ⭐ frosted tinted warm (secondary-100/70 + blur)
 *   - glass-sun:         ⭐ frosted tinted sun (accent-100/70 + blur)
 *   - link:              inline text links
 *
 * Glass variants pair :
 *   - Use `glass` on saturated/dark backgrounds (hero brand, auth, dark gradient overlay)
 *   - Use `glass-light` (filled) + `glass-light-ghost` (secondary) on LIGHT tinted card surfaces
 *     (primary-50, secondary-50, accent-50, etc.) for cohérent frosted DS effect
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
  | 'outline'
  | 'outline-warm'
  | 'destructive'
  | 'glass'
  | 'glass-light'
  | 'glass-light-ghost'
  | 'glass-brand'
  | 'glass-warm'
  | 'glass-sun'
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
  /**
   * Render as an internal React Router link instead of a <button>. Use this
   * instead of wrapping <Button> in <Link> — nesting a real <button> inside
   * an <a> is invalid HTML and creates duplicate/ambiguous tab stops for
   * keyboard and screen-reader users. Mutually exclusive with `href`.
   */
  to?: string;
  /**
   * Render as a plain external <a> instead of a <button>. Same rationale as
   * `to` — use this instead of wrapping <Button> in <a>. Mutually exclusive
   * with `to`.
   */
  href?: string;
  /** Anchor target — only applies when `to` or `href` is set. */
  target?: string;
  /** Anchor rel — only applies when `to` or `href` is set. */
  rel?: string;
  /** Anchor download — only applies when `href` is set. */
  download?: string | boolean;
}

const BASE = 'inline-flex items-center justify-center gap-stack-xs rounded-pill font-body font-semibold tracking-tight cursor-pointer transition-[background-color,box-shadow,transform,opacity] duration-fast ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0 aria-busy:pointer-events-none whitespace-nowrap select-none';

// Hover strategy for filled variants: keep the base color (no aggressive
// darkening) and add a colored glow shadow + subtle lift via translate-y
// in BASE. The active state still darkens for tactile feedback. Less
// "saturated to death" than hover:bg-X-700.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:     'bg-primary-600 text-white shadow-sm hover:shadow-brand-md hover:bg-primary-500 active:bg-primary-800 active:shadow-sm',
  secondary:   'bg-secondary-500 text-white shadow-sm hover:shadow-warm-md hover:bg-secondary-400 active:bg-secondary-700 active:shadow-sm',
  accent:      'bg-accent-500 text-white shadow-sm hover:shadow-sun-md hover:bg-accent-400 active:bg-accent-600 active:shadow-sm',
  ghost:       'bg-primary-50 text-primary-800 border border-primary-100 shadow-xs hover:bg-primary-100 hover:border-primary-200 hover:shadow-sm active:bg-primary-200 active:border-primary-200',
  /* outline : transparent bg + visible colored border — mid-weight between ghost and primary */
  outline:     'bg-transparent text-primary-700 border border-primary-400 shadow-xs hover:bg-primary-50 hover:border-primary-500 hover:shadow-sm active:bg-primary-100 active:border-primary-500',
  'outline-warm': 'bg-transparent text-secondary-700 border border-secondary-400 shadow-xs hover:bg-secondary-50 hover:border-secondary-500 hover:shadow-warm-sm active:bg-secondary-100 active:border-secondary-500',
  destructive: 'bg-danger-strong text-white shadow-sm hover:shadow-danger-md active:bg-danger-deep active:shadow-sm',
  /* glass : pour surfaces DARK (hero brand, auth glass-dark) — semi-transparent + text-white */
  glass:       'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/35 hover:border-white/50',
  /* glass-light : pour surfaces LIGHT tinted (EntryCard tinted, SessionCard tinted) — frosted white filled */
  'glass-light':
               'bg-white/70 text-ink-900 border border-white/70 backdrop-blur-glass-light shadow-sm hover:bg-white/90 hover:border-white active:bg-white',
  /* glass-light-ghost : action secondary sur surface LIGHT tinted — frosted plus translucide */
  'glass-light-ghost':
               'bg-white/40 text-ink-800 border border-white/50 backdrop-blur-glass-light hover:bg-white/60 hover:border-white/70 active:bg-white/70',
  /* glass-brand / glass-warm / glass-sun : tinted frosted buttons — bg tone-100/X + blur + tone-800 text.
     Pour usages sur fond blanc OU sur surface tinted MÊME tone (emphasis subtle). */
  'glass-brand':
               'bg-primary-100/70 text-primary-800 border border-primary-200/80 backdrop-blur-glass-light shadow-xs hover:bg-primary-100 hover:border-primary-300 active:bg-primary-200',
  'glass-warm':
               'bg-secondary-100/70 text-secondary-800 border border-secondary-200/80 backdrop-blur-glass-light shadow-xs hover:bg-secondary-100 hover:border-secondary-300 active:bg-secondary-200',
  'glass-sun':
               'bg-accent-100/70 text-accent-800 border border-accent-200/80 backdrop-blur-glass-light shadow-xs hover:bg-accent-100 hover:border-accent-300 active:bg-accent-200',
  link:        'bg-transparent text-primary-700 underline underline-offset-4 hover:text-primary-800 hover:translate-y-0 p-0 h-auto',
  // Deprecated aliases — point to the new mapping (same hover logic)
  warm:           'bg-secondary-500 text-white shadow-sm hover:shadow-warm-md hover:bg-secondary-400 active:bg-secondary-700 active:shadow-sm',
  'brand-ghost':  'bg-primary-50 text-primary-800 border border-primary-100 shadow-xs hover:bg-primary-100 hover:border-primary-200 hover:shadow-sm active:bg-primary-200 active:border-primary-200',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-caption',
  md: 'h-touch px-5 text-body-sm',
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
  to,
  href,
  target,
  rel,
  download,
  onClick,
  ...rest
}) => {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    !iconOnly && SIZE_CLASSES[size],
    iconOnly && `${size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : size === 'xl' ? 'w-14' : 'w-touch'} aspect-square`,
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Spinner icon (replaces leadingIcon when loading)
  const spinner = (
    <span
      className="inline-flex items-center justify-center shrink-0 animate-spin animate-glow-pulse"
      style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );

  const content = (
    <>
      {loading
        ? spinner
        : leadingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{leadingIcon}</span>}
      {!iconOnly && children}
      {iconOnly && !loading && children}
      {trailingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{trailingIcon}</span>}
    </>
  );

  // `to`/`href` render as a real single anchor instead of nesting this
  // <button> inside a <Link>/<a> — nesting is invalid HTML and creates
  // duplicate/ambiguous tab stops for keyboard and screen-reader users.
  if (to || href) {
    const isDisabled = disabled || loading;
    const linkRest = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'onClick'>;
    const sharedProps = {
      className: classes,
      target,
      rel,
      'aria-disabled': isDisabled || undefined,
      onClick: isDisabled
        ? (e: React.MouseEvent) => e.preventDefault()
        : (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined),
      ...linkRest,
    };
    if (to) {
      return (
        <Link to={to} {...sharedProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} download={download} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
