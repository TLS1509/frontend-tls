import React, { useEffect, useId, useRef } from 'react';
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
  /* Le dialogue se nomme par son titre, et se décrit par sa description
     (2026-09-24). Un <dialog> n'emprunte pas son nom à son contenu : sans
     `aria-labelledby`, Chromium lui calculait un nom vide, et un lecteur
     d'écran annonçait « dialogue » sans dire lequel. */
  const titreId = useId();
  const descriptionId = useId();

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
      aria-labelledby={titreId}
      aria-describedby={description ? descriptionId : undefined}
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
        {/* Header — titre h2 au pas du bloc (20/26/700) · 8 · description
            16 ink-700 (elle était en ink-500, la couleur des placeholders). */}
        <div className="flex items-start justify-between gap-stack-xs px-stack-lg pt-stack-md pb-stack border-b border-ink-100">
          <div className="flex flex-col gap-stack-xs min-w-0">
            <h2 id={titreId} className="font-display text-h3 text-ink-900 text-balance">{title}</h2>
            {description && (
              <p id={descriptionId} className="font-body text-body text-ink-700 max-w-prose">{description}</p>
            )}
          </div>
          <button
            ref={firstFocusRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-ink-600 hover:text-ink-700 hover:bg-ink-100 transition-colors duration-fast shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-stack-lg py-stack-md flex flex-col gap-stack">
          {children}
        </div>

        {/* Footer — les actions à 24 px du contenu (20 du corps + 4). */}
        <div className="flex items-center justify-between gap-stack-xs px-stack-lg pb-stack-md pt-stack-3xs">
          <div>
            {destructiveLabel && onDestructive && (
              <Button
                type="button"
                emphasis="solid" tone="danger"
                size="sm"
                onClick={onDestructive}
              >
                {destructiveLabel}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-stack-xs">
            <Button type="button" emphasis="outline" size="sm" onClick={onClose}>
              Annuler
            </Button>
            {onSubmit && (
              <Button
                type="submit"
                emphasis="soft"
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
