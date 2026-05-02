import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import './modals.css';

/**
 * SuccessModal — Célébration d'une réussite générique
 * CSS animations uniquement (pas de framer-motion)
 * Tokens: TLS design system
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
    <>
      <div
        className="modal__backdrop"
        style={{ background: 'rgba(0,0,0,0.45)', animation: 'smBdIn 0.2s ease both' }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal--success modal__content"
          style={{ padding: 'var(--s-10)', overflow: 'hidden' }}
        >
          {/* Background teal gradient */}
          <div className="modal__success-bg-gradient" />

          {/* Close */}
          <button
            onClick={onClose}
            className="modal__close-btn"
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {/* Success icon with pulse ring */}
          <div className="modal__success-icon-container">
            <div className="modal__pulse-ring" />
            <div className="modal__success-icon">
              <CheckCircle2 size={40} style={{ color: '#fff' }} />
            </div>
          </div>

          {/* Content */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--s-8)', position: 'relative', zIndex: 1, animation: 'smFadeUp 0.4s ease 0.25s both' }}>
            <h2 style={{
              margin: '0 0 var(--s-3)', fontSize: 'var(--t-h3)', fontWeight: 800,
              background: 'linear-gradient(135deg, var(--tls-primary-600) 0%, var(--tls-primary-400) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {title}
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {message}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: 'var(--s-4)',
              borderRadius: 'var(--r-xl)', border: 'none',
              background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-400) 100%)',
              color: '#fff', fontWeight: 700, fontSize: 'var(--t-body)',
              cursor: 'pointer', transition: 'all var(--dur-2)',
              boxShadow: '0 6px 20px rgba(85,161,180,0.35)',
              position: 'relative', zIndex: 1,
              animation: 'smFadeUp 0.4s ease 0.35s both',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(85,161,180,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(85,161,180,0.35)';
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes smBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes smIn {
          from { opacity: 0; transform: translateY(20px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes smIconIn {
          from { opacity: 0; transform: scale(0) rotate(-90deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes smPulse {
          0%   { transform: scale(1); opacity: 0.8; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes smFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default SuccessModal;
