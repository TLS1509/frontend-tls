import React from 'react';
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { Button } from '../core/Button';

/**
 * ConfirmModal — Dialog de confirmation générique
 * Variants brand-aligned : info (primary) | success (teal-green) | warning (amber) | danger (coral-red)
 */

type ConfirmVariant = 'info' | 'success' | 'warning' | 'danger';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  icon?: React.ReactNode;
}

const VARIANT_ICON_BG: Record<ConfirmVariant, string> = {
  info: 'bg-primary-50',
  success: 'bg-success-bg',
  warning: 'bg-accent-400/12',
  danger: 'bg-danger-bg',
};

const VARIANT_ICON_COLOR: Record<ConfirmVariant, string> = {
  info: 'text-primary-600',
  success: 'text-success-fg',
  warning: 'text-accent-600',
  danger: 'text-danger-fg',
};

const VARIANT_CONFIRM_BG: Record<ConfirmVariant, string> = {
  // Libellé blanc à 15 px : l'arrêt le plus clair doit tenir 4,5:1. Partis du
  // 400/base, ils mesuraient 1,86 à 2,54 ; au pire désormais 4,88 (or 700).
  info: 'bg-gradient-to-br from-primary-800 to-primary-700',
  success: 'bg-gradient-to-br from-success-fg to-success-vivid',
  warning: 'bg-gradient-to-br from-accent-700 to-accent-800',
  danger: 'bg-gradient-to-br from-danger-fg to-danger-strong',
};

const VARIANT_CONFIRM_SHADOW: Record<ConfirmVariant, string> = {
  info: 'shadow-[0_4px_14px_rgba(85,161,180,0.35)] hover:shadow-[0_8px_20px_rgba(85,161,180,0.45)]',
  success: 'shadow-[0_4px_14px_rgba(157,190,186,0.35)] hover:shadow-[0_8px_20px_rgba(157,190,186,0.45)]',
  warning: 'shadow-[0_4px_14px_rgba(248,176,68,0.35)] hover:shadow-[0_8px_20px_rgba(248,176,68,0.45)]',
  danger: 'shadow-[0_4px_14px_rgba(242,133,89,0.35)] hover:shadow-[0_8px_20px_rgba(242,133,89,0.45)]',
};

const DEFAULT_ICONS: Record<ConfirmVariant, React.ReactNode> = {
  info:    <Info size={24} />,
  success: <CheckCircle2 size={24} />,
  warning: <AlertCircle size={24} />,
  danger:  <AlertTriangle size={24} />,
};

// Graisse 700 pour les deux actions : celle de `Button` (doctrine § 2). Le
// bouton d'annulation était à 600, l'autre à 700.
const ACTION_BTN_BASE = 'flex-1 py-3 px-4 rounded-lg text-body font-bold cursor-pointer transition-all font-body';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'info',
  icon,
}) => {
  // Comportement de dialogue partagé (APG) : focus entrant, Tab piégé, Échap, focus rendu.
  const dialog = useDialog<HTMLDivElement>(isOpen, onClose);
  if (!isOpen) return null;

  const displayIcon = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-cm-bd-in"
      onClick={onClose}
    >
      <div
        ref={dialog.ref} role="dialog" aria-modal="true" aria-labelledby={dialog.titleId} tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] bg-white rounded-2xl border border-ink-200 shadow-xl p-8 animate-cm-in"
      >
        {/* Close */}
        <Button iconOnly size="sm" emphasis="ghost" tone="neutral" onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 z-10">
          <X />
        </Button>

        {/* Variant icon */}
        <div className={`w-16 h-16 rounded-pill flex items-center justify-center mx-auto mb-stack-md animate-cm-icon-in ${VARIANT_ICON_BG[variant]} ${VARIANT_ICON_COLOR[variant]}`}>
          {displayIcon}
        </div>

        {/* Text — titre h2 20/26/700 · 8 · message 16 ink-700, centré (une
            confirmation courte, deux lignes au plus : `text-balance`) · 24 ·
            actions. */}
        <div className="flex flex-col items-center gap-stack-xs text-center mb-stack-lg">
          <h2 id={dialog.titleId} className="font-display text-h3 text-ink-900 text-balance">
            {title}
          </h2>
          <p className="font-body text-body text-ink-700 text-balance">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-stack-xs">
          <button
            onClick={onClose}
            className={`${ACTION_BTN_BASE} border-[1.5px] border-ink-200 bg-white text-ink-900 hover:bg-ink-50`}
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`${ACTION_BTN_BASE} border-0 text-white ${VARIANT_CONFIRM_BG[variant]} ${VARIANT_CONFIRM_SHADOW[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
