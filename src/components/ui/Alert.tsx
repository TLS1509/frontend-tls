import React from 'react';

/**
 * Alert — Source of truth: design-system/spec.json → components.Alert
 *
 * Persistent contextual message anchored in the page.
 * 4 variants: info / success / warning / danger.
 * 2 patterns: banner (default) | inline (compact).
 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertPattern = 'banner' | 'inline';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  pattern?: AlertPattern;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  /** @deprecated Use `variant`. `error` maps to `danger`. */
  type?: AlertVariant | 'error';
}

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

const BASE =
  'grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-2 leading-normal border border-l-[3px] animate-alert-slide';

const PATTERN_CLASSES: Record<AlertPattern, string> = {
  banner: 'grid-rows-[auto_auto_auto] py-4 px-5 rounded-lg text-body-sm',
  inline: 'grid-rows-1 py-2 px-3 rounded-md text-caption items-center',
};

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info:    'bg-primary-500/10 text-primary-800 border-primary-500/[15%] border-l-primary-500',
  success: 'bg-success-bg text-success-fg border-primary-500/25 border-l-success-base',
  warning: 'bg-accent-50 text-accent-900 border-secondary-500/20 border-l-accent-400',
  danger:  'bg-danger-bg text-danger-fg border-secondary-500/25 border-l-danger-base',
};

const ICON_TONE_CLASSES: Record<AlertVariant, string> = {
  info:    'text-primary-600',
  success: 'text-success-base',
  warning: 'text-accent-400',
  danger:  'text-danger-base',
};

const ICON_SIZE_CLASSES: Record<AlertPattern, string> = {
  banner: 'w-6 h-6 [&>svg]:w-5 [&>svg]:h-5',
  inline: 'w-[18px] h-[18px] [&>svg]:w-4 [&>svg]:h-4',
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  type,
  pattern = 'banner',
  title,
  icon,
  dismissible = false,
  onDismiss,
  actions,
  className = '',
  children,
  ...rest
}) => {
  const resolvedVariant: AlertVariant =
    variant ?? (type === 'error' ? 'danger' : (type as AlertVariant)) ?? 'info';

  const classes = [BASE, PATTERN_CLASSES[pattern], VARIANT_CLASSES[resolvedVariant], className]
    .filter(Boolean)
    .join(' ');

  const iconClasses = [
    'col-start-1 row-start-1 inline-flex items-center justify-center shrink-0',
    ICON_SIZE_CLASSES[pattern],
    ICON_TONE_CLASSES[resolvedVariant],
  ].join(' ');

  return (
    <div className={classes} role="alert" {...rest}>
      <span className={iconClasses} aria-hidden="true">
        {icon ?? DEFAULT_ICONS[resolvedVariant]}
      </span>

      <div className={`col-start-2 ${pattern === 'banner' ? 'row-start-1 row-span-3' : 'row-start-1'} flex flex-col gap-2 self-center`}>
        {title && pattern === 'banner' && (
          <p className="font-body font-bold m-0 leading-tight">{title}</p>
        )}
        {children && <p className="m-0">{children}</p>}
        {actions && pattern === 'banner' && (
          <div className="flex gap-2 mt-1">{actions}</div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer"
          className="col-start-3 row-start-1 self-start bg-transparent border-0 p-1 rounded-md cursor-pointer text-current opacity-50 transition-all duration-150 hover:opacity-100 hover:bg-black/[0.08] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 focus-visible:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
