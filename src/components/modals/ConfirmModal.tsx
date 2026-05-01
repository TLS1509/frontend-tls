import React from 'react';
import { X, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react';

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
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--s-4)',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'cmBdIn 0.2s ease both',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 440,
            background: 'var(--surface)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'cmIn 0.28s cubic-bezier(.34,1.56,.64,1) both',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 'var(--s-4)', right: 'var(--s-4)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--surface-muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {/* Icon */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: meta.iconBg, color: meta.iconColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--s-5)',
            animation: 'cmIconIn 0.4s cubic-bezier(.34,1.56,.64,1) 0.1s both',
          }}>
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
          <div style={{ display: 'flex', gap: 'var(--s-3)' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: 'var(--s-3) var(--s-4)',
                borderRadius: 'var(--r-lg)',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                fontWeight: 600, fontSize: 'var(--t-body-sm)',
                cursor: 'pointer', transition: 'all var(--dur-1)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)'; }}
            >
              {cancelText}
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              style={{
                flex: 1, padding: 'var(--s-3) var(--s-4)',
                borderRadius: 'var(--r-lg)',
                border: 'none',
                background: meta.confirmBg,
                color: '#fff',
                fontWeight: 700, fontSize: 'var(--t-body-sm)',
                cursor: 'pointer', transition: 'all var(--dur-2)',
                boxShadow: `0 4px 14px ${meta.confirmShadow}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 20px ${meta.confirmShadow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 14px ${meta.confirmShadow}`;
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
