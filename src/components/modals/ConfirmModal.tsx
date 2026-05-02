import React from 'react';
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import './modals.css';

/**
 * ConfirmModal — Dialog de confirmation générique
 * Variantes: info | success | warning | danger
 * Tokens: TLS design system
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

const VARIANT_META: Record<ConfirmVariant, {
  iconBg: string;
  iconColor: string;
  confirmBg: string;
  confirmShadow: string;
  defaultIcon: React.ReactNode;
}> = {
  info: {
    iconBg: 'var(--tls-primary-50)',
    iconColor: 'var(--tls-primary-600)',
    confirmBg: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-400) 100%)',
    confirmShadow: 'rgba(85,161,180,0.35)',
    defaultIcon: <Info size={24} />,
  },
  success: {
    iconBg: 'rgba(74,140,110,0.1)',
    iconColor: 'var(--tls-success-fg)',
    confirmBg: 'linear-gradient(135deg, var(--tls-success-fg) 0%, #5aa87a 100%)',
    confirmShadow: 'rgba(74,140,110,0.35)',
    defaultIcon: <CheckCircle2 size={24} />,
  },
  warning: {
    iconBg: 'rgba(248,176,68,0.12)',
    iconColor: 'var(--tls-yellow-600)',
    confirmBg: 'linear-gradient(135deg, var(--tls-yellow-500) 0%, #e89a30 100%)',
    confirmShadow: 'rgba(248,176,68,0.35)',
    defaultIcon: <AlertCircle size={24} />,
  },
  danger: {
    iconBg: 'rgba(220,38,38,0.08)',
    iconColor: '#dc2626',
    confirmBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    confirmShadow: 'rgba(220,38,38,0.35)',
    defaultIcon: <AlertTriangle size={24} />,
  },
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
  if (!isOpen) return null;

  const meta = VARIANT_META[variant];
  const displayIcon = icon ?? meta.defaultIcon;

  return (
    <>
      <div
        className="modal__backdrop"
        style={{ background: 'rgba(0,0,0,0.45)', animation: 'cmBdIn 0.2s ease both' }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal--confirm modal__content"
          style={{ padding: 'var(--s-8)' }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="modal__close-btn"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {/* Icon */}
          <div className="modal__icon-circle" style={{ background: meta.iconBg, color: meta.iconColor }}>
            {displayIcon}
          </div>

          {/* Text */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--s-6)' }}>
            <h2 style={{ margin: '0 0 var(--s-3)', fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
              {title}
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="modal__actions">
            <button
              onClick={onClose}
              className="modal__action-btn modal__action-btn--cancel"
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-muted)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; }}
            >
              {cancelText}
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className="modal__action-btn modal__action-btn--confirm"
              style={{
                background: meta.confirmBg,
                boxShadow: `0 4px 14px ${meta.confirmShadow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${meta.confirmShadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 14px ${meta.confirmShadow}`;
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cmBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cmIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cmIconIn {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default ConfirmModal;
