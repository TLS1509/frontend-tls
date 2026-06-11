import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfirmationModalAdvancedProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
}

export function ConfirmationModalAdvanced({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'info',
  icon,
}: ConfirmationModalAdvancedProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          gradient: 'var(--gradient-destructive)',
          iconBg: 'rgba(237, 132, 58, 0.1)',
          iconColor: 'var(--destructive)',
          icon: icon || <AlertTriangle className="w-6 h-6" />,
        };
      case 'success':
        return {
          gradient: 'var(--gradient-success)',
          iconBg: 'rgba(115, 175, 191, 0.1)',
          iconColor: 'var(--success)',
          icon: icon || <CheckCircle2 className="w-6 h-6" />,
        };
      case 'warning':
        return {
          gradient: 'var(--gradient-warning)',
          iconBg: 'rgba(248, 176, 68, 0.1)',
          iconColor: 'var(--warning)',
          icon: icon || <AlertCircle className="w-6 h-6" />,
        };
      case 'info':
      default:
        return {
          gradient: 'var(--gradient-primary)',
          iconBg: 'rgba(85, 161, 180, 0.1)',
          iconColor: 'var(--primary)',
          icon: icon || <Info className="w-6 h-6" />,
        };
    }
  };

  const variantStyles = getVariantStyles();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '450px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                background: variantStyles.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                color: variantStyles.iconColor,
              }}
            >
              {variantStyles.icon}
            </motion.div>

            {/* Content */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {message}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: '1px solid var(--border)',
                  background: 'white',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                style={{
                  flex: 1,
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: 'none',
                  background: variantStyles.gradient,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
