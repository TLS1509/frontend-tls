import React from 'react';
import { useDialog } from '../../hooks/useDialog';
import { X } from 'lucide-react';
import { Button } from '../core/Button';

/**
 * Modal — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
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
  // Focus entrant, Tab piégé, Échap, focus rendu (APG) — la modale ne gérait
  // qu'Échap, et laissait le focus sur la page derrière.
  const dialog = useDialog<HTMLDivElement>(open, onClose);

  if (!open) return null;

  const dialogClasses = [
    // Mobile-first: 16px gutter via parent p-4 (scrim) + full width; desktop: 480px cap
    'relative bg-white rounded-2xl shadow-xl w-full sm:max-w-[480px]',
    'p-6 sm:p-8 flex flex-col gap-stack max-h-[90vh] overflow-y-auto',
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
        ref={dialog.ref}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? dialog.titleId : undefined}
      >
        {(title || description || showClose) && (
          <div className="grid grid-cols-[1fr_auto] gap-stack-xs items-start">
            <div className="flex-1 min-w-0">
              {title && (
                /* Un vrai titre (h2) à id unique : l'ancien `p#modal-title`
                   n'était pas un titre et son id fixe collisionnait dès que
                   deux modales coexistaient. */
                <h2 id={dialog.titleId} className="font-display text-h2 font-semibold tracking-headline leading-[1.15] text-ink-900 mb-2">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-body text-ink-600 m-0">{description}</p>
              )}
            </div>
            {showClose && (
              <Button
                iconOnly
                size="sm"
                emphasis="ghost"
                tone="neutral"
                onClick={onClose}
                aria-label="Fermer"
                className="row-span-2 col-start-2"
              >
                <X />
              </Button>
            )}
          </div>
        )}

        {children && (
          <div className="text-body text-ink-900">{children}</div>
        )}

        {actions && (
          <div className="flex justify-end gap-stack-xs mt-3">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
