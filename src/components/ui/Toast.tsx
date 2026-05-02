import React from 'react';

/**
 * Toast — Source of truth: design-system/spec.json → components.Toast
 *
 * Transient confirmation, non-blocking. 4–6s display, bottom-right, max 3 stacked.
 * Variants: success/info/warning/danger.
 * Each variant gets a tone-colored left border and icon background.
 */

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

const TOAST_ICONS: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant;
  title?: React.ReactNode;
  /** Primary action (text + callback) */
  actionLabel?: string;
  onAction?: () => void;
  /** Show close button */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Dismissing animation state */
  dismissing?: boolean;
  icon?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  actionLabel,
  onAction,
  dismissible = true,
  onDismiss,
  dismissing = false,
  icon,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'toast',
    `toast--${variant}`,
    dismissing && 'toast--dismissing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" {...rest}>
      <span className={`toast__icon toast__icon--${variant}`} aria-hidden="true">
        {icon ?? TOAST_ICONS[variant]}
      </span>
      <div className="toast__body">
        {title && <p className="toast__title">{title}</p>}
        {children && <p className="toast__desc">{children}</p>}
      </div>
      {actionLabel && (
        <button type="button" className="toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          className="toast__close"
          onClick={onDismiss}
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;
