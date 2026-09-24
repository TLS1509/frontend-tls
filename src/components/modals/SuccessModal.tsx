import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { Button } from '../core/Button';

/**
 * SuccessModal — Célébration d'une réussite générique
 * CSS animations uniquement (pas de framer-motion)
 */

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'Continuer',
}) => {
  // Comportement de dialogue partagé (APG) : focus entrant, Tab piégé, Échap, focus rendu.
  const dialog = useDialog<HTMLDivElement>(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-sm-bd-in"
      onClick={onClose}
    >
      <div
        ref={dialog.ref} role="dialog" aria-modal="true" aria-labelledby={dialog.titleId} tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white rounded-2xl border border-primary-500/20 shadow-success-modal p-10 overflow-hidden animate-sm-in"
      >
        {/* Background teal gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-500/6 to-transparent" />

        {/* Close */}
        <Button iconOnly size="sm" emphasis="ghost" tone="neutral" onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 z-10">
          <X />
        </Button>

        {/* Success icon with pulse ring */}
        <div className="relative w-24 h-24 mx-auto mb-stack-lg flex items-center justify-center">
          <div className="absolute inset-0 rounded-pill border-[3px] border-primary-300 animate-sm-pulse" />
          <div className="relative w-20 h-20 rounded-pill bg-gradient-to-br from-primary-700 to-primary-600 flex items-center justify-center shadow-[0_12px_32px_rgba(85,161,180,0.35)] animate-sm-icon-in">
            <CheckCircle2 size={40} className="text-white" />
          </div>
        </div>

        {/* Content — titre h2 20/26/700 ink-900 · 8 · message 16 ink-700 ·
            24 · action. Le titre portait `.modal-gradient-text` : graisse 800
            (réservée au site) et primary-600, une couleur de marque qui ne
            passe pas l'AA en texte (3,66:1) et qui « faisait joli ». */}
        <div className="flex flex-col items-center gap-stack-xs text-center mb-stack-lg relative z-10 animate-sm-fade-up-1">
          <h2 id={dialog.titleId} className="font-display text-h3 text-ink-900 text-balance">
            {title}
          </h2>
          <p className="font-body text-body text-ink-700 text-balance">
            {message}
          </p>
        </div>

        {/* L'unique action, donc le `solid` de la modale (arbitrage n°19).
            Il était fait main (`.modal-success-cta`, dégradé 700 → 800 et
            rayon de carte) ; `Button` porte le même cran 700. */}
        <Button
          emphasis="solid"
          size="lg"
          fullWidth
          onClick={onClose}
          className="relative z-10 animate-sm-fade-up-2"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
