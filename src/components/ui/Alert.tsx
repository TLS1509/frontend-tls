import React from 'react';
import './Alert.css';

/**
 * Alert — Source of truth: design-system/spec.json → components.Alert
 *
 * Persistent, contextual message anchored in the page.
 * Four semantic intents: info, success, warning, danger.
 * Two sizing patterns: banner (default) | inline (compact).
 */

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertPattern = 'banner' | 'inline';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  pattern?: AlertPattern;
  title?: React.ReactNode;
  /** Use custom icon. If omitted, default per-variant icon is rendered. */
  icon?: React.ReactNode;
  /** Show close button (consumer controls visibility) */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Optional action buttons/links rendered below description */
  actions?: React.ReactNode;
  /** Legacy API support (use `variant` going forward) */
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
  // Legacy support: 'error' → 'danger'
  const resolvedVariant: AlertVariant =
    variant ?? (type === 'error' ? 'danger' : (type as AlertVariant)) ?? 'info';

  const classes = [
    'alert',
    `alert--${resolvedVariant}`,
    pattern === 'inline' && 'alert--inline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert" {...rest}>
      <span className={`alert__icon alert__icon--${resolvedVariant}`} aria-hidden="true">
        {icon ?? DEFAULT_ICONS[resolvedVariant]}
      </span>

      <div className="alert__body">
        {title && <p className="alert__title">{title}</p>}
        {children && <p className="alert__desc">{children}</p>}
        {actions && <div className="alert__actions">{actions}</div>}
      </div>

      {dismissible && (
        <button
          type="button"
          className="alert__close"
          onClick={onDismiss}
          aria-label="Fermer"
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
