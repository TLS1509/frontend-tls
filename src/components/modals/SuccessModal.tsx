import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

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
          animation: 'smBdIn 0.2s ease both',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 480,
            background: 'var(--surface)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-10)',
            border: '1px solid rgba(85,161,180,0.2)',
            boxShadow: '0 25px 50px rgba(85,161,180,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'smIn 0.35s cubic-bezier(.34,1.56,.64,1) both',
            overflow: 'hidden',
          }}
        >
          {/* Background teal gradient */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(85,161,180,0.06) 0%, transparent 60%)',
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 'var(--s-4)', right: 'var(--s-4)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--surface-muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', zIndex: 1,
              transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {/* Success icon with pulse ring */}
          <div style={{
            position: 'relative', width: 96, height: 96, margin: '0 auto var(--s-6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '3px solid var(--tls-primary-300)',
              animation: 'smPulse 1.8s ease-out infinite',
            }} />
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-400) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 32px rgba(85,161,180,0.35)',
              animation: 'smIconIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.15s both',
            }}>
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
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(85,161,180,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(85,161,180,0.35)';
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
