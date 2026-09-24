import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../core/Button';
import type { ButtonEmphasis, ButtonTone } from '../core/Button';
import { useDialog } from '../../hooks/useDialog';

interface ChartDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /**
   * Actions du pied, de gauche à droite. Par défaut (arbitrage n°19 : un seul
   * `solid` par écran, et une modale en est un) : la DERNIÈRE est l'action que
   * la modale sert, en `solid` brand ; les autres sont en `ghost` neutre.
   * `emphasis` et `tone` restent surchargeables — une paire Annuler / Confirmer
   * passe Annuler en `outline`.
   */
  actions?: Array<{
    label: string;
    onClick: () => void;
    emphasis?: ButtonEmphasis;
    tone?: ButtonTone;
  }>;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ChartDetailModal — Reusable drill-down modal for chart interactions
 * Used by: all charts (click handler) for detail views
 *
 * Un vrai dialogue depuis le 2026-09-24. Il annonçait un piège de focus qu'il
 * n'avait pas : ni `role="dialog"`, ni nom, le focus restait sur le bouton qui
 * l'ouvrait, et Tab sortait vers la page derrière le voile (le bouton « Retour
 * en haut de page », puis les raccourcis développeur). Le comportement vient
 * de `useDialog`, comme les neuf modales de `modals/` : focus entrant, Tab
 * piégé, Échap, focus rendu à la fermeture. Le voile n'est plus un faux bouton
 * focalisable : un clic dessus ferme, le clavier passe par Échap ou « Fermer ».
 */
export const ChartDetailModal: React.FC<ChartDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actions,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  // Focus entrant, Tab piégé, Échap, focus rendu (motif Dialog de l'APG).
  const dialog = useDialog<HTMLDivElement>(isOpen, onClose);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className={`fixed inset-0 flex items-center justify-center z-modal pointer-events-none p-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={dialog.ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialog.titleId}
              tabIndex={-1}
              className={`bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto pointer-events-auto w-full focus:outline-none ${sizeClasses[size]}`}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-ink-200 p-stack-lg flex items-start justify-between gap-stack-xs">
                {/* Titre de modale au pas h3, en League Spartan comme celui de
                    `Modal` : sans `font-display`, il tombait en Nunito gras. */}
                <div className="flex-1 flex flex-col gap-stack-3xs">
                  <h2 id={dialog.titleId} className="font-display text-h3 text-ink-900">{title}</h2>
                  {subtitle && (
                    <p className="text-body text-ink-700 max-w-prose">{subtitle}</p>
                  )}
                </div>
                {/* Même fermeture que `Modal` : un Button icône, en français. */}
                <Button iconOnly size="sm" emphasis="ghost" tone="neutral" onClick={onClose} aria-label="Fermer">
                  <X />
                </Button>
              </div>

              {/* Content */}
              <div className="p-stack-lg">
                {children}
              </div>

              {/* Footer (if actions provided) */}
              {actions && actions.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-ink-200 p-stack-lg flex items-center justify-end gap-stack-sm">
                  {actions.map((action, idx) => {
                    const principale = idx === actions.length - 1;
                    return (
                      <Button
                        key={idx}
                        emphasis={action.emphasis ?? (principale ? 'solid' : 'ghost')}
                        tone={action.tone ?? (principale ? 'brand' : 'neutral')}
                        size="md"
                        onClick={() => {
                          action.onClick();
                          onClose();
                        }}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChartDetailModal;
