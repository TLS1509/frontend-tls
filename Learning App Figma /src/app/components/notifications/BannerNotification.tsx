import { X, Info, CheckCircle2, AlertTriangle, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error';

interface BannerNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant?: BannerVariant;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
}

export function BannerNotification({
  isVisible,
  onClose,
  title,
  message,
  variant = 'info',
  actionLabel,
  onAction,
  dismissible = true,
}: BannerNotificationProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          background: 'linear-gradient(90deg, rgba(115, 175, 191, 0.95) 0%, rgba(150, 195, 207, 0.95) 100%)',
          icon: <CheckCircle2 className="w-5 h-5" />,
          borderColor: 'var(--success)',
        };
      case 'warning':
        return {
          background: 'linear-gradient(90deg, rgba(248, 176, 68, 0.95) 0%, rgba(255, 193, 119, 0.95) 100%)',
          icon: <AlertTriangle className="w-5 h-5" />,
          borderColor: 'var(--warning)',
        };
      case 'error':
        return {
          background: 'linear-gradient(90deg, rgba(237, 132, 58, 0.95) 0%, rgba(252, 187, 147, 0.95) 100%)',
          icon: <AlertCircle className="w-5 h-5" />,
          borderColor: 'var(--destructive)',
        };
      case 'info':
      default:
        return {
          background: 'linear-gradient(90deg, rgba(85, 161, 180, 0.95) 0%, rgba(123, 196, 212, 0.95) 100%)',
          icon: <Info className="w-5 h-5" />,
          borderColor: 'var(--primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 'var(--z-sticky)',
            background: variantStyles.background,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `2px solid ${variantStyles.borderColor}`,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}
          >
            {/* Icon */}
            <div
              style={{
                flexShrink: 0,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  color: 'white',
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
                    color: 'rgba(255, 255, 255, 0.95)',
                    lineHeight: 'var(--leading-snug)',
                  }}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Action Button */}
            {actionLabel && onAction && (
              <button
                onClick={onAction}
                style={{
                  flexShrink: 0,
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {actionLabel}
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {/* Close Button */}
            {dismissible && (
              <button
                onClick={onClose}
                style={{
                  flexShrink: 0,
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
