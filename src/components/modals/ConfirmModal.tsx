import React from 'react';
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';
import { Button, type ButtonTone } from '../core/Button';

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

/* Le ton du `solid` de confirmation. La modale est un écran à elle seule :
   un seul `solid`, l'action qu'elle sert (arbitrage n°19). Les deux boutons
   étaient faits main — dégradé et ombre colorée d'un côté, filet ink-200 de
   l'autre (1,2:1, un contour qui ne se voyait pas) — et n'exposaient pas leur
   niveau à la sonde. `success` prend la marque : `Button` n'a pas de ton
   succès, et le vert d'état de TLS est un teal désaturé (en-tête du
   fichier : « success (teal-green) »). */
const VARIANT_CONFIRM_TONE: Record<ConfirmVariant, ButtonTone> = {
  info: 'brand',
  success: 'brand',
  warning: 'sun',
  danger: 'danger',
};

const DEFAULT_ICONS: Record<ConfirmVariant, React.ReactNode> = {
  info:    <Info size={24} />,
  success: <CheckCircle2 size={24} />,
  warning: <AlertCircle size={24} />,
  danger:  <AlertTriangle size={24} />,
};

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

        {/* Actions — la paire Annuler / Confirmer : Annuler en `outline`
            neutre (il n'insiste dans aucune couleur), Confirmer en `solid`. */}
        <div className="flex gap-stack-xs">
          <Button emphasis="outline" tone="neutral" size="lg" onClick={onClose} className="flex-1">
            {cancelText}
          </Button>
          <Button
            emphasis="solid"
            tone={VARIANT_CONFIRM_TONE[variant]}
            size="lg"
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
