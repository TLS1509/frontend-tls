import React, { useEffect } from 'react';

/**
 * Modal — Source of truth: design-system/spec.json → components.Modal
 *
 * Blocking interruption for critical decisions or important information.
 * Scrim dims + blurs the page behind.
 */

export interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when user clicks scrim or close button or presses Escape */
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Footer actions (usually Button components) */
  actions?: React.ReactNode;
  /** Close on scrim click (default true) */
  closeOnScrim?: boolean;
  /** Show close X button (default true) */
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

  return (
    <>
      <div
        className="modal-scrim"
        onClick={closeOnScrim ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        className={['modal', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || description || showClose) && (
          <div className="modal__head">
            <div style={{ flex: 1 }}>
              {title && (
                <p id="modal-title" className="modal__title">
                  {title}
                </p>
              )}
              {description && <p className="modal__desc">{description}</p>}
            </div>
            {showClose && (
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Fermer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        {children && <div className="modal__body">{children}</div>}

        {actions && <div className="modal__actions">{actions}</div>}
      </div>
    </>
  );
};

export default Modal;
