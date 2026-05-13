import React from 'react';
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';

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
  info: 'bg-gradient-to-br from-primary-500 to-primary-400',
  success: 'bg-gradient-to-br from-success-fg to-success-base',
  warning: 'bg-gradient-to-br from-accent-400 to-accent-500',
  danger: 'bg-gradient-to-br from-danger-fg to-danger-base',
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

const ACTION_BTN_BASE = 'flex-1 py-3 px-4 rounded-lg text-body-sm cursor-pointer transition-all font-body';

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
  if (!isOpen) return null;

  const displayIcon = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-cm-bd-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] bg-white rounded-2xl border border-ink-200 shadow-xl p-8 animate-cm-in"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-50 border-0 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all z-10 p-0"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>

        {/* Variant icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 animate-cm-icon-in ${VARIANT_ICON_BG[variant]} ${VARIANT_ICON_COLOR[variant]}`}>
          {displayIcon}
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h2 className="text-h4 font-bold text-ink-900 mb-3">
            {title}
          </h2>
          <p className="text-body text-ink-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`${ACTION_BTN_BASE} font-semibold border-[1.5px] border-ink-200 bg-white text-ink-900 hover:bg-ink-50`}
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`${ACTION_BTN_BASE} font-bold border-0 text-white hover:-translate-y-0.5 ${VARIANT_CONFIRM_BG[variant]} ${VARIANT_CONFIRM_SHADOW[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
