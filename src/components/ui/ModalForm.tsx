import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '../core/Button';

export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  description?: string;
  /** Primary CTA label */
  submitLabel?: string;
  /** If true, shows a loading spinner on the submit button */
  submitting?: boolean;
  /** Secondary destructive action label (e.g. "Supprimer") */
  destructiveLabel?: string;
  onDestructive?: () => void;
  /** Override the max-width. Defaults to 'sm' (480px) */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<string, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const ModalForm: React.FC<ModalFormProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  description,
  submitLabel = 'Enregistrer',
  submitting = false,
  destructiveLabel,
  onDestructive,
  size = 'sm',
  children,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      // Focus first focusable element after paint
      requestAnimationFrame(() => firstFocusRef.current?.focus());
    } else {
      dialog.close();
    }
  }, [open]);

  // Close on backdrop click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      onClose={onClose}
      className={[
        // Backdrop
        'backdrop:bg-ink-900/50 backdrop:backdrop-blur-sm',
        // Panel
        'w-full m-auto rounded-2xl bg-white shadow-lg border border-ink-100',
        'p-0 overflow-hidden',
        SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <form
        method="dialog"
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-4 border-b border-ink-100">
          <div>
            <h2 className="text-h4 font-display font-bold text-ink-900 m-0">{title}</h2>
            {description && (
              <p className="text-body-sm text-ink-500 m-0 mt-1">{description}</p>
            )}
          </div>
          <button
            ref={firstFocusRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors duration-fast shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-stack">
          {children}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 pb-5 pt-2">
          <div>
            {destructiveLabel && onDestructive && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onDestructive}
              >
                {destructiveLabel}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Annuler
            </Button>
            {onSubmit && (
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={submitting}
                disabled={submitting}
              >
                {submitLabel}
              </Button>
            )}
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default ModalForm;
