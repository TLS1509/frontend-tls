import React from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import type { ToastItem } from '../../hooks/useToast';

/**
 * ToastContainer — renders an animated toast stack at bottom-right.
 * Drop this once at your layout root and pass in the toasts from useToast().
 *
 * <ToastContainer toasts={toasts} onRemove={removeToast} />
 */

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

/** Maps our internal type → Toast component variant */
const TYPE_TO_VARIANT: Record<ToastItem['type'], 'success' | 'info' | 'warning' | 'danger'> = {
  success: 'success',
  error:   'danger',
  warning: 'warning',
  info:    'info',
};

const TITLE_FALLBACK: Record<ToastItem['type'], string> = {
  success: 'Succès',
  error:   'Erreur',
  warning: 'Attention',
  info:    'Information',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <>
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: 'var(--s-6)',
          right: 'var(--s-6)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-3)',
          maxWidth: 360,
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              animation: 'tcSlideIn 0.3s cubic-bezier(.34,1.56,.64,1) both',
            }}
          >
            <Toast
              variant={TYPE_TO_VARIANT[t.type]}
              title={t.title ?? TITLE_FALLBACK[t.type]}
              dismissible
              onDismiss={() => onRemove(t.id)}
              style={{
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {t.message}
            </Toast>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tcSlideIn {
          from { opacity: 0; transform: translateX(20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </>,
    document.body,
  );
};

export default ToastContainer;
