import React from 'react';
import { Check, Info, AlertTriangle, X, XCircle } from 'lucide-react';

/**
 * Toast — Source of truth: design-system/spec.json → components.Toast
 *
 * Transient confirmation, non-blocking. 4–6s display, bottom-right, max 3 stacked.
 * Variants: success/info/warning/danger.
 * Each variant gets a tone-colored icon background.
 */

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

const TOAST_ICON_BG: Record<ToastVariant, string> = {
  success: 'bg-success-base',
  info:    'bg-primary-600',
  warning: 'bg-accent-400',
  danger:  'bg-danger-base',
};

const DEFAULT_ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <Check size={18} strokeWidth={3} />,
  info:    <Info size={18} strokeWidth={2.5} />,
  warning: <AlertTriangle size={18} strokeWidth={2.5} />,
  danger:  <XCircle size={18} strokeWidth={2.5} />,
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
    'grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center',
    'min-w-[320px] max-w-[440px] py-3 pl-3 pr-4',
    'bg-white rounded-lg shadow-lg border border-ink-200 font-body',
    dismissing
      ? 'animate-[toast-out_0.2s_ease_both]'
      : 'animate-[toast-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" {...rest}>
      <span
        className={`w-8 h-8 rounded-full inline-flex items-center justify-center text-white shrink-0 ${TOAST_ICON_BG[variant]}`}
        aria-hidden="true"
      >
        {icon ?? DEFAULT_ICONS[variant]}
      </span>
      <div className="min-w-0">
        {title && <p className="font-bold text-body-sm text-ink-900 leading-tight m-0 mb-1">{title}</p>}
        {children && <p className="text-caption text-ink-600 leading-snug m-0">{children}</p>}
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="bg-transparent border-0 text-primary-700 font-semibold text-caption cursor-pointer px-2.5 py-1.5 rounded-md transition-colors hover:bg-primary-50"
        >
          {actionLabel}
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer"
          className="w-6 h-6 bg-transparent border-0 text-ink-400 rounded-sm cursor-pointer inline-flex items-center justify-center opacity-70 p-0 transition-all hover:opacity-100 hover:bg-ink-100"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default Toast;
