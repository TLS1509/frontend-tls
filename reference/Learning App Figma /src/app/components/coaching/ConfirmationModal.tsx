import { CheckCircle2, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'warning' | 'danger';
}

/**
 * Modal de confirmation glassmorphism Apple-like
 * Respecte le design system TLS
 */
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'success',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getGradient = () => {
    switch (type) {
      case 'success':
        return 'var(--gradient-success)';
      case 'warning':
        return 'var(--gradient-secondary)';
      case 'danger':
        return 'var(--gradient-destructive)';
      default:
        return 'var(--gradient-primary)';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'var(--success)';
      case 'warning':
        return 'var(--warning)';
      case 'danger':
        return 'var(--destructive)';
      default:
        return 'var(--primary)';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="w-full max-w-md rounded-3xl relative"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 transition-all duration-200"
            style={{
              color: 'var(--muted-foreground)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: 'var(--radius-lg)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: getGradient(),
                  boxShadow: `0 8px 24px ${getIconColor()}33`,
                }}
              >
                <CheckCircle2 className="w-10 h-10" style={{ color: 'white' }} />
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-display)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
                fontFamily: 'var(--font-body)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {description}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 transition-all duration-200"
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-xl)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                }}
              >
                {cancelText}
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-6 py-3 transition-all duration-200"
                style={{
                  background: getGradient(),
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontFamily: 'var(--font-body)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: `0 4px 12px ${getIconColor()}33`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${getIconColor()}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${getIconColor()}33`;
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
