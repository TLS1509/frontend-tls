import React from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import type { ToastItem } from '../../hooks/useToast';

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

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
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-toast flex flex-col gap-stack-xs w-full max-w-[360px] pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto animate-[toast-slide-in_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]"
        >
          <Toast
            variant={TYPE_TO_VARIANT[t.type]}
            title={t.title ?? TITLE_FALLBACK[t.type]}
            dismissible
            onDismiss={() => onRemove(t.id)}
            className="shadow-lg"
          >
            {t.message}
          </Toast>
        </div>
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
