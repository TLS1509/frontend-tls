import React, { useEffect } from 'react';
import { X, Sparkles, Star, Trophy } from 'lucide-react';

/**
 * CelebrationModal — generic milestone celebration modal.
 *
 * Replaces the inline `Celebration` UI component (deleted) with a proper
 * modal-style celebration that follows the same animation/scrim language
 * as the rest of `src/components/modals/` (BookingModal, StreakCelebrationModal,
 * SuccessModal, etc.).
 *
 * Design:
 *   - Scrim with backdrop-blur, click-outside closes
 *   - Card with secondary→accent gradient surface, rounded-2xl, soft shadow
 *   - Centered icon bubble (defaults to Trophy)
 *   - Gradient title text (secondary-700 → accent-700)
 *   - 4 corner-sparkle decorations with staggered twinkle animation
 *   - Optional actions slot
 *
 * Use for: parcours completed, badge unlocked, big-jump milestones.
 */

export interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Optional icon — defaults to Trophy. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action buttons (typically <Button> from the DS). */
  actions?: React.ReactNode;
  /** Hide the corner sparkles. */
  hideSparkles?: boolean;
  /** Hide the close (X) button. */
  hideClose?: boolean;
}

const CornerSparkles: React.FC = () => (
  <>
    <span aria-hidden="true" className="pointer-events-none absolute top-5 left-6 text-secondary-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite]">
      <Sparkles size={22} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute top-10 right-8 text-accent-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite_0.6s]">
      <Star size={16} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-8 left-12 text-accent-500/60 [animation:cel-twinkle_2.4s_ease-in-out_infinite_1s]">
      <Star size={14} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-6 right-10 text-secondary-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite_1.4s]">
      <Sparkles size={20} fill="currentColor" />
    </span>
    <style>{`
      @keyframes cel-twinkle {
        0%, 100% { opacity: 0.45; transform: scale(0.85) rotate(-4deg); }
        50%      { opacity: 1;    transform: scale(1.1)  rotate(6deg); }
      }
    `}</style>
  </>
);

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  actions,
  hideSparkles = false,
  hideClose = false,
}) => {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-modal-bd-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-modal-title"
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl px-10 py-10 text-center overflow-hidden bg-gradient-to-br from-secondary-50 via-accent-50/70 to-secondary-50 border border-secondary-500/25 shadow-warm-md animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Diffuse radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(at_15%_20%,rgba(237,132,58,0.22),transparent_55%),radial-gradient(at_85%_80%,rgba(248,176,68,0.20),transparent_55%)]"
        />

        {!hideSparkles && <CornerSparkles />}

        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-ink-200 text-ink-500 hover:bg-white hover:text-ink-700 transition-colors cursor-pointer"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}

        {/* Icon bubble */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-5 bg-gradient-to-br from-secondary-400 via-secondary-500 to-accent-500 text-white shadow-warm-md ring-4 ring-white/60">
          {icon ?? <Trophy size={36} strokeWidth={2} fill="currentColor" />}
        </div>

        {/* Title with gradient text */}
        <h2
          id="celebration-modal-title"
          className="relative m-0 mb-3 font-display text-h1 font-bold tracking-tight leading-tight bg-gradient-to-br from-secondary-700 via-secondary-600 to-accent-700 bg-clip-text text-transparent"
        >
          {title}
        </h2>

        {description && (
          <p className="relative m-0 mx-auto mb-6 max-w-[400px] text-body-lg text-ink-700 leading-relaxed">
            {description}
          </p>
        )}

        {actions && (
          <div className="relative flex gap-3 justify-center flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrationModal;
