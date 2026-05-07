import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import './modals.css';

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
  buttonText = 'Super !',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-[1001] backdrop-blur bg-black/45 animate-sm-bd-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white rounded-2xl border border-primary-500/20 shadow-success-modal p-10 overflow-hidden animate-sm-in"
      >
        {/* Background teal gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary-500/6 to-transparent" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-50 border-0 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all z-10 p-0"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>

        {/* Success icon with pulse ring */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[3px] border-primary-300 animate-sm-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center shadow-[0_12px_32px_rgba(85,161,180,0.35)] animate-sm-icon-in">
            <CheckCircle2 size={40} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8 relative z-10 animate-sm-fade-up-1">
          <h2 className="text-h3 font-extrabold mb-3 modal-gradient-text">
            {title}
          </h2>
          <p className="text-body text-ink-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onClose}
          className="w-full p-4 rounded-xl border-0 text-white font-bold text-body cursor-pointer transition-all relative z-10 modal-success-cta animate-sm-fade-up-2"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
