import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastWithActionProps {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose: (id: string) => void;
  duration?: number;
}

export function ToastWithAction({
  id,
  title,
  message,
  variant = 'info',
  actionLabel,
  onAction,
  onClose,
  duration = 5000,
}: ToastWithActionProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          gradient: 'var(--gradient-success)',
          icon: <CheckCircle2 className="w-5 h-5" />,
          iconBg: 'rgba(115, 175, 191, 0.1)',
          iconColor: 'var(--success)',
        };
      case 'error':
        return {
          gradient: 'var(--gradient-destructive)',
          icon: <AlertCircle className="w-5 h-5" />,
          iconBg: 'rgba(237, 132, 58, 0.1)',
          iconColor: 'var(--destructive)',
        };
      case 'warning':
        return {
          gradient: 'var(--gradient-warning)',
          icon: <AlertTriangle className="w-5 h-5" />,
          iconBg: 'rgba(248, 176, 68, 0.1)',
          iconColor: 'var(--warning)',
        };
      case 'info':
      default:
        return {
          gradient: 'var(--gradient-primary)',
          icon: <Info className="w-5 h-5" />,
          iconBg: 'rgba(85, 161, 180, 0.1)',
          iconColor: 'var(--primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
          }}
        >
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-lg)',
              background: variantStyles.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: variantStyles.iconColor,
            }}
          >
            {variantStyles.icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: message ? 'var(--space-1)' : 0,
              }}
            >
              {title}
            </div>
            {message && (
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-snug)',
                }}
              >
                {message}
              </div>
            )}

            {/* Action Button */}
            {actionLabel && onAction && (
              <button
                onClick={() => {
                  onAction();
                  handleClose();
                }}
                style={{
                  marginTop: 'var(--space-3)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: 'none',
                  background: variantStyles.gradient,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {actionLabel}
              </button>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              flexShrink: 0,
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--duration-base) ease',
              color: 'var(--muted-foreground)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Progress Bar */}
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: variantStyles.gradient,
                borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
                transformOrigin: 'left',
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container for stacked toasts
interface ToastContainerWithActionsProps {
  toasts: Array<Omit<ToastWithActionProps, 'onClose'>>;
  onCloseToast: (id: string) => void;
}

export function ToastContainerWithActions({ toasts, onCloseToast }: ToastContainerWithActionsProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--space-6)',
        right: 'var(--space-6)',
        zIndex: 'var(--z-tooltip)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <ToastWithAction {...toast} onClose={onCloseToast} />
        </div>
      ))}
    </div>
  );
}
