import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

/**
 * SessionFeedbackModal — Notation étoiles + commentaire
 * Usage: post-session coaching, fin de leçon, etc.
 * Tokens: TLS design system
 */

interface SessionFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  title?: string;
  subtitle?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Très mauvais',
  2: 'Mauvais',
  3: 'Moyen',
  4: 'Très bien',
  5: 'Excellent',
};

export const SessionFeedbackModal: React.FC<SessionFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = 'Votre avis compte',
  subtitle = 'Comment évaluez-vous cette session ?',
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const display = hover || rating;
  const canSubmit = rating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      setRating(0); setHover(0); setComment(''); setSubmitted(false);
      onClose();
    }, 1400);
  };

  const handleClose = () => {
    setRating(0); setHover(0); setComment(''); setSubmitted(false);
    onClose();
  };

  return (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--s-4)',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          animation: 'fbBdIn 0.2s ease both',
        }}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 500,
            background: 'var(--surface)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-8)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-xl), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'fbIn 0.32s cubic-bezier(.34,1.56,.64,1) both',
            overflow: 'hidden',
          }}
        >
          {/* Blur glow blob */}
          <div style={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(248,176,68,0.25) 0%, transparent 70%)',
            filter: 'blur(40px)', pointerEvents: 'none',
          }} />

          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 'var(--s-4)', right: 'var(--s-4)',
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--surface-muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', zIndex: 1, transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {!submitted ? (
            <>
              {/* Icon */}
              <div style={{
                width: 60, height: 60, borderRadius: 'var(--r-lg)',
                background: 'linear-gradient(135deg, rgba(248,176,68,0.2) 0%, rgba(248,176,68,0.08) 100%)',
                border: '1px solid rgba(248,176,68,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--s-4)',
              }}>
                <Sparkles size={28} style={{ color: 'var(--tls-yellow-600)' }} />
              </div>

              {/* Title */}
              <h2 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)', textAlign: 'center' }}>
                {title}
              </h2>
              <p style={{ margin: '0 0 var(--s-6)', fontSize: 'var(--t-body)', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                {subtitle}
              </p>

              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-4)' }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= display;
                  const selected = star <= rating;
                  return (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={(e) => {
                        setHover(star);
                        if (!selected) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        setHover(0);
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                      }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: 0, width: 52, height: 52,
                        transition: 'transform var(--dur-1)',
                        filter: selected
                          ? 'drop-shadow(0 0 10px rgba(248,176,68,0.7))'
                          : filled
                          ? 'drop-shadow(0 4px 8px rgba(248,176,68,0.3))'
                          : 'none',
                      }}
                    >
                      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
                        <path
                          d="M26 4L33.5 19.2L50.5 21.7C51.2 21.8 51.7 22.3 52 22.9C52.3 23.5 52.2 24.2 51.8 24.8L39.8 36.5L42.6 53.5C42.7 54.2 42.4 54.9 41.9 55.3C41.4 55.7 40.7 55.8 40.1 55.5L26 47.6L11.9 55.5C11.3 55.8 10.6 55.7 10.1 55.3C9.6 54.9 9.3 54.2 9.4 53.5L12.2 36.5L0.2 24.8C-0.2 24.2 -0.3 23.5 0 22.9C0.3 22.3 0.8 21.8 1.5 21.7L18.5 19.2L26 4Z"
                          fill={filled ? '#F8B044' : 'transparent'}
                          stroke={filled ? '#F8B044' : 'rgba(0,0,0,0.15)'}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          transform="translate(-0.5,-0.5)"
                        />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {/* Rating label */}
              {display > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--s-5)' }}>
                  <div style={{
                    padding: 'var(--s-2) var(--s-5)',
                    borderRadius: 'var(--r-lg)',
                    background: 'linear-gradient(135deg, rgba(248,176,68,0.1) 0%, rgba(248,176,68,0.15) 100%)',
                    border: '1.5px solid rgba(248,176,68,0.25)',
                    boxShadow: '0 4px 16px rgba(248,176,68,0.12)',
                  }}>
                    <span style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--tls-yellow-600)' }}>
                      {RATING_LABELS[display]}
                    </span>
                  </div>
                </div>
              )}

              {/* Comment */}
              <div style={{ marginBottom: 'var(--s-5)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--s-2)', fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
                  Commentaire <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optionnel)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience…"
                  rows={3}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: 'var(--s-3)', borderRadius: 'var(--r-lg)',
                    border: '1.5px solid var(--border)',
                    background: 'var(--surface-muted)',
                    color: 'var(--text)',
                    fontSize: 'var(--t-body-sm)', lineHeight: 1.6,
                    resize: 'vertical', transition: 'border-color var(--dur-1)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--tls-yellow-400)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-muted)'; }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  width: '100%', padding: 'var(--s-4)',
                  borderRadius: 'var(--r-xl)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s-2)',
                  background: canSubmit
                    ? 'linear-gradient(135deg, #F8B044 0%, #e89a30 100%)'
                    : 'var(--border)',
                  color: canSubmit ? '#fff' : 'var(--text-muted)',
                  fontWeight: 700, fontSize: 'var(--t-body)',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.5,
                  transition: 'all var(--dur-2)',
                  boxShadow: canSubmit ? '0 6px 20px rgba(248,176,68,0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canSubmit) {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(248,176,68,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (canSubmit) {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(248,176,68,0.3)';
                  }
                }}
              >
                <Send size={16} /> Envoyer mon avis
              </button>
            </>
          ) : (
            /* Submitted confirmation */
            <div style={{ textAlign: 'center', padding: 'var(--s-6) 0', animation: 'fbFadeIn 0.4s ease both' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 'var(--s-3)' }}>🌟</div>
              <h3 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Merci pour votre retour !
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)' }}>
                Votre avis nous aide à améliorer l'expérience.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fbBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fbIn {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fbFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default SessionFeedbackModal;
