import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

/**
 * Toast — Source of truth: design-system/spec.json → components.Toast
 *
 * Transient confirmation, non-blocking. 4–6s display, bottom-right, max 3 stacked.
 * Variants: success/info/warning/danger.
 * Design aligned with Alert: tinted gradient bg, variant-colored border + icon,
 * no circular icon background.
 */

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

const ICON_BY_VARIANT: Record<ToastVariant, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  success: CheckCircle2,
  info:    Info,
  warning: AlertTriangle,
  danger:  XCircle,
};

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: 'bg-gradient-to-br from-success-base/25 to-success-base/[8%] border-success-base/30 text-success-fg',
  info:    'bg-gradient-to-br from-primary-500/15 to-primary-500/5 border-primary-500/25 text-primary-800',
  warning: 'bg-gradient-to-br from-accent-400/20 to-accent-400/5 border-accent-400/30 text-accent-900',
  danger:  'bg-gradient-to-br from-danger-base/20 to-danger-base/5 border-danger-base/30 text-danger-fg',
};

const ICON_TONE: Record<ToastVariant, string> = {
  success: 'text-success-base',
  info:    'text-primary-600',
  warning: 'text-accent-400',
  danger:  'text-danger-base',
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
  const IconComponent = ICON_BY_VARIANT[variant];

  const classes = [
    'flex items-start gap-3 rounded-lg border backdrop-blur-sm shadow-lg',
    'min-w-[320px] max-w-[440px] py-3 px-4 font-body text-body-sm leading-normal',
    VARIANT_CLASSES[variant],
    dismissing
      ? 'animate-[toast-out_0.2s_ease_both]'
      : 'animate-[toast-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-live="polite" {...rest}>
      <span className={`shrink-0 mt-px ${ICON_TONE[variant]}`} aria-hidden="true">
        {icon ?? <IconComponent size={20} strokeWidth={2} />}
      </span>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        {title && <p className="font-bold m-0 leading-tight">{title}</p>}
        {children && <p className="m-0 opacity-90">{children}</p>}
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 self-center bg-transparent border-0 text-current font-semibold text-caption cursor-pointer px-2.5 py-1.5 rounded-md transition-all hover:bg-black/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {actionLabel}
        </button>
      )}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer"
          className="shrink-0 -mr-1 p-1 rounded-md cursor-pointer text-current opacity-50 transition-all duration-150 hover:opacity-100 hover:bg-black/[0.08] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export default Toast;
