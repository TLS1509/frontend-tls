import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal — Source of truth: design-system/spec.json → components.Modal
 *
 * Blocking interruption for critical decisions or important information.
 * Scrim dims + blurs the page behind. Closes via Escape, scrim click, or X button.
 */

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Footer actions (usually Button components) */
  actions?: React.ReactNode;
  closeOnScrim?: boolean;
  showClose?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  actions,
  closeOnScrim = true,
  showClose = true,
  children,
  className = '',
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const dialogClasses = [
    // Mobile-first: 16px gutter via parent p-4 (scrim) + full width; desktop: 480px cap
    'relative bg-white rounded-2xl shadow-xl w-full sm:max-w-[480px]',
    'p-6 sm:p-8 flex flex-col gap-5 max-h-[90vh] overflow-y-auto',
    'animate-[modal-scale-in-flat_0.25s_cubic-bezier(0.34,1.56,0.64,1)_both]',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className="fixed inset-0 z-overlay bg-black/40 backdrop-blur-glass-light flex items-center justify-center p-4 animate-[scrim-in_0.2s_ease_both]"
      onClick={closeOnScrim ? onClose : undefined}
    >
      <div
        className={dialogClasses}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || description || showClose) && (
          <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
            <div className="flex-1 min-w-0">
              {title && (
                <p id="modal-title" className="font-display text-h2 font-semibold tracking-tight leading-[1.15] text-ink-900 mb-2">
                  {title}
                </p>
              )}
              {description && (
                <p className="text-body text-ink-600 m-0">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="row-span-2 col-start-2 w-8 h-8 rounded-md bg-ink-50 border-0 text-ink-600 cursor-pointer inline-flex items-center justify-center transition-colors hover:bg-ink-100 hover:text-ink-900 p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {children && (
          <div className="text-body text-ink-900 leading-relaxed">{children}</div>
        )}

        {actions && (
          <div className="flex justify-end gap-3 mt-3">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
