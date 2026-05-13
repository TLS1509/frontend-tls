import React, { useState } from 'react';
import { X, Send, Sparkles, Star } from 'lucide-react';

/**
 * SessionFeedbackModal — Notation étoiles + commentaire
 * Usage: post-session coaching, fin de leçon, etc.
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

  const SUBMIT_BASE = 'w-full p-4 rounded-xl border-0 flex items-center justify-center gap-2 font-bold text-body cursor-pointer transition-all';
  const SUBMIT_ENABLED = 'modal-submit-enabled text-white';
  const SUBMIT_DISABLED = 'bg-ink-200 text-ink-600 opacity-50 cursor-not-allowed';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/40 animate-fb-bd-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] bg-white rounded-2xl border border-ink-200 shadow-xl overflow-hidden p-8 animate-fb-in"
      >
        {/* Blur amber glow blob */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(248,176,68,0.25)_0%,transparent_70%)] blur-[40px] pointer-events-none" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-50 border-0 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all z-10 p-0"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>

        {!submitted ? (
          <>
            {/* Icon badge */}
            <div className="relative w-[60px] h-[60px] rounded-lg bg-gradient-to-br from-accent-400/20 to-accent-400/8 border border-accent-400/25 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-accent-600" />
            </div>

            {/* Title */}
            <h2 className="text-h3 font-extrabold text-ink-900 text-center mb-2">
              {title}
            </h2>
            <p className="text-body text-ink-600 text-center leading-relaxed mb-6">
              {subtitle}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-3 mb-3">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= display;
                const selected = star <= rating;
                return (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`bg-transparent border-0 cursor-pointer p-0 w-12 h-12 inline-flex items-center justify-center transition-transform ${selected ? '' : 'hover:scale-[1.15]'}`}
                    style={{
                      filter: selected
                        ? 'drop-shadow(0 0 10px rgba(248,176,68,0.7))'
                        : filled
                        ? 'drop-shadow(0 4px 8px rgba(248,176,68,0.3))'
                        : 'none',
                    }}
                    aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={40}
                      strokeWidth={1.75}
                      className={filled ? 'fill-accent-400 text-accent-400' : 'fill-transparent text-ink-300'}
                    />
                  </button>
                );
              })}
            </div>

            {/* Rating label — conditional, compact */}
            {display > 0 && (
              <div className="flex justify-center mb-4">
                <div className="px-4 py-1.5 rounded-lg modal-amber-badge text-body-sm font-bold text-accent-600">
                  {RATING_LABELS[display]}
                </div>
              </div>
            )}

            {/* Comment */}
            <div className="mb-5">
              <label className="block mb-2 text-body-sm font-semibold text-ink-900">
                Commentaire <span className="font-normal text-ink-600">(optionnel)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience…"
                rows={4}
                className="w-full box-border p-3 rounded-lg border-[1.5px] border-ink-200 bg-ink-50 text-ink-900 text-body-sm leading-relaxed resize-y transition-colors font-body h-auto min-h-[120px] focus:outline-none focus:border-accent-400 focus:bg-white"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`${SUBMIT_BASE} ${canSubmit ? SUBMIT_ENABLED : SUBMIT_DISABLED}`}
            >
              <Send size={16} /> Envoyer mon avis
            </button>
          </>
        ) : (
          /* Submitted confirmation */
          <div className="text-center py-6 animate-[fbFadeIn_0.4s_ease_both]">
            <div className="text-[3.5rem] mb-3">🌟</div>
            <h3 className="text-h4 font-bold text-ink-900 mb-2">
              Merci pour votre retour !
            </h3>
            <p className="text-body text-ink-600">
              Votre avis nous aide à améliorer l'expérience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionFeedbackModal;
