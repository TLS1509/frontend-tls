import React from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

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

const ICON_BY_VARIANT: Record<AlertVariant, React.ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

const BASE =
  'flex gap-3 rounded-lg border backdrop-blur-sm animate-alert-slide';

const PATTERN_CLASSES: Record<AlertPattern, string> = {
  banner: 'items-start py-4 px-5 text-body-sm leading-normal',
  inline: 'items-center py-2 px-3 text-caption leading-normal',
};

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info:    'bg-gradient-to-br from-primary-500/15 to-primary-500/5 border-primary-500/25 text-primary-800',
  success: 'bg-gradient-to-br from-success-base/25 to-success-base/[8%] border-success-base/30 text-success-fg',
  warning: 'bg-gradient-to-br from-accent-400/20 to-accent-400/5 border-accent-400/30 text-accent-900',
  danger:  'bg-gradient-to-br from-danger-base/20 to-danger-base/5 border-danger-base/30 text-danger-fg',
};

const ICON_TONE_CLASSES: Record<AlertVariant, string> = {
  info:    'text-primary-600',
  success: 'text-success-base',
  warning: 'text-accent-400',
  danger:  'text-danger-base',
};

const ICON_SIZE_BY_PATTERN: Record<AlertPattern, number> = {
  banner: 20,
  inline: 16,
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

  const IconComponent = ICON_BY_VARIANT[resolvedVariant];
  const iconSize = ICON_SIZE_BY_PATTERN[pattern];
  // Banner with potentially multi-line content → align icon with first line via mt-0.5
  // Inline (single line) → parent items-center handles it, no margin needed
  const iconWrapperClasses = [
    'shrink-0',
    ICON_TONE_CLASSES[resolvedVariant],
    pattern === 'banner' && 'mt-px',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert" {...rest}>
      <span className={iconWrapperClasses} aria-hidden="true">
        {icon ?? <IconComponent size={iconSize} strokeWidth={2} aria-hidden />}
      </span>

      <div className="flex-1 flex flex-col gap-2 min-w-0">
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
          className="shrink-0 -mr-1 p-1 rounded-md cursor-pointer text-current opacity-50 transition-all duration-150 hover:opacity-100 hover:bg-black/[0.08] hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 focus-visible:opacity-100"
        >
          <X size={iconSize - 2} strokeWidth={2} aria-hidden />
        </button>
      )}
    </div>
  );
};

export default Alert;
