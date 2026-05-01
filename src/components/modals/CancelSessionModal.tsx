import React, { useState } from 'react';
import { X, AlertTriangle, CalendarX, RefreshCcw } from 'lucide-react';

/**
 * CancelSessionModal — Annulation ou reprogrammation d'une session de coaching
 * Options : annuler définitivement ou reprogrammer
 * Tokens: TLS design system
 */

interface CancelSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string) => void;
  onReschedule: () => void;
  sessionTitle?: string;
  sessionDate?: string;
}

const REASONS = [
  { value: 'conflict', label: 'Conflit d\'agenda' },
  { value: 'personal', label: 'Raison personnelle' },
  { value: 'changed_mind', label: 'J\'ai changé d\'avis' },
  { value: 'technical', label: 'Problème technique' },
  { value: 'other', label: 'Autre raison' },
];

export const CancelSessionModal: React.FC<CancelSessionModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onReschedule,
  sessionTitle = 'Session de coaching IA',
  sessionDate = 'Mardi 30 avril 2026 — 14h00',
}) => {
  const [reason, setReason] = useState('');
  const [step, setStep] = useState<'confirm' | 'done'>('confirm');

  if (!isOpen) return null;

  const handleCancel = () => {
    if (!reason) return;
    onCancel(reason);
    setStep('done');
    setTimeout(() => {
      setStep('confirm');
      setReason('');
      onClose();
    }, 1600);
  };

  const handleClose = () => {
    setStep('confirm');
    setReason('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--s-4)',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          animation: 'csoBdIn 0.2s ease both',
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 460,
            background: 'var(--surface)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'csoIn 0.32s cubic-bezier(.34,1.56,.64,1) both',
            overflow: 'hidden',
          }}
        >
          {/* Warning glow blob */}
          <div style={{
            position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(237,132,58,0.18) 0%, transparent 70%)',
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 'var(--s-4)', right: 'var(--s-4)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--surface-muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', zIndex: 1,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
          >
            <X size={13} />
          </button>

          {step === 'confirm' ? (
            <>
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 'var(--r-xl)',
                background: 'linear-gradient(135deg, rgba(237,132,58,0.15) 0%, rgba(237,132,58,0.06) 100%)',
                border: '1px solid rgba(237,132,58,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--s-4)',
              }}>
                <AlertTriangle size={26} style={{ color: 'var(--tls-orange-600)' }} />
              </div>

              <h2 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)', textAlign: 'center' }}>
                Annuler la session ?
              </h2>
              <p style={{ margin: '0 0 var(--s-5)', fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.55 }}>
                Cette action est irréversible. Vous pouvez aussi reprogrammer plutôt qu'annuler.
              </p>

              {/* Session summary */}
              <div style={{
                padding: 'var(--s-3) var(--s-4)',
                borderRadius: 'var(--r-xl)',
                background: 'var(--surface-muted)',
                border: '1px solid var(--border)',
                marginBottom: 'var(--s-5)',
              }}>
                <p style={{ margin: '0 0 2px', fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>
                  {sessionTitle}
                </p>
                <p style={{ margin: 0, fontSize: 'var(--t-micro)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                  📅 {sessionDate}
                </p>
              </div>

              {/* Reason dropdown */}
              <div style={{ marginBottom: 'var(--s-6)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--s-2)', fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                  Motif d'annulation <span style={{ color: 'var(--tls-orange-600)' }}>*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{
                    width: '100%', padding: 'var(--s-3)',
                    borderRadius: 'var(--r-lg)',
                    border: `1.5px solid ${reason ? 'var(--border)' : 'var(--border)'}`,
                    background: 'var(--surface-muted)',
                    color: reason ? 'var(--text)' : 'var(--text-muted)',
                    fontSize: 'var(--t-body-sm)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color var(--dur-1)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--tls-orange-400)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <option value="">Sélectionnez un motif…</option>
                  {REASONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                {/* Reschedule (primary action) */}
                <button
                  onClick={() => { onReschedule(); handleClose(); }}
                  style={{
                    width: '100%', padding: 'var(--s-3-5)',
                    borderRadius: 'var(--r-xl)', border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s-2)',
                    background: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-primary-600) 100%)',
                    color: '#fff', fontWeight: 700, fontSize: 'var(--t-body-sm)',
                    cursor: 'pointer', transition: 'all var(--dur-2)',
                    boxShadow: '0 4px 16px rgba(85,161,180,0.3)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(85,161,180,0.4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(85,161,180,0.3)'; }}
                >
                  <RefreshCcw size={15} /> Reprogrammer plutôt
                </button>

                {/* Cancel (destructive) */}
                <button
                  onClick={handleCancel}
                  disabled={!reason}
                  style={{
                    width: '100%', padding: 'var(--s-3-5)',
                    borderRadius: 'var(--r-xl)',
                    border: reason ? '1.5px solid rgba(237,132,58,0.4)' : '1.5px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s-2)',
                    background: reason ? 'rgba(237,132,58,0.08)' : 'var(--surface-muted)',
                    color: reason ? 'var(--tls-orange-700)' : 'var(--text-muted)',
                    fontWeight: 700, fontSize: 'var(--t-body-sm)',
                    cursor: reason ? 'pointer' : 'not-allowed',
                    opacity: reason ? 1 : 0.5,
                    transition: 'all var(--dur-2)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => { if (reason) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(237,132,58,0.14)'; }}
                  onMouseLeave={(e) => { if (reason) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(237,132,58,0.08)'; }}
                >
                  <CalendarX size={15} /> Confirmer l'annulation
                </button>
              </div>
            </>
          ) : (
            /* Done state */
            <div style={{ textAlign: 'center', padding: 'var(--s-6) 0', animation: 'csoFadeIn 0.4s ease both' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--s-3)' }}>✅</div>
              <h3 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Session annulée
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
                Vous pouvez réserver une nouvelle session quand vous le souhaitez.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes csoBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes csoIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes csoFadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default CancelSessionModal;
