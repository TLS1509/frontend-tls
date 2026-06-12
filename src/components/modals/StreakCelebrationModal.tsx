import React, { useEffect, useState } from 'react';
import { X, Flame, Calendar, TrendingUp } from 'lucide-react';

/**
 * StreakCelebrationModal — Célébration de série d'apprentissage
 * Animations CSS uniquement (pas de framer-motion)
 */

interface StreakCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
  milestone?: number;
  encouragement?: string;
}

function makeParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: 30 + Math.random() * 40,
    delay: Math.random() * 1.2,
    duration: 1.6 + Math.random() * 1.2,
    size: 8 + Math.random() * 8,
  }));
}

const PARTICLES = makeParticles(14);

export const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({
  isOpen,
  onClose,
  streakCount,
  milestone,
  encouragement = 'Continuez comme ça !',
}) => {
  const [, setVisible] = useState(false);
  const isMilestone = milestone !== undefined && streakCount >= milestone;

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Floating flame particles — random positions/sizes/delays kept inline (runtime values) */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="modal-flame-bg fixed bottom-[45%] z-modal pointer-events-none rounded-[50%_50%_50%_0]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animation: `streakParticle ${p.duration}s ${p.delay}s ease-out infinite both`,
          }}
        />
      ))}

      {/* Backdrop */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-modal bg-black/55 animate-sc-bd-in"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[520px] bg-white rounded-2xl border border-[rgba(255,107,53,0.2)] shadow-celebration overflow-hidden p-10 animate-sc-in"
        >
          {/* Orange header gradient */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[rgba(237,132,58,0.12)] to-transparent pointer-events-none" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-50 border-0 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all z-20 p-0"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>

          {/* Flame icon */}
          <div className="relative w-28 h-28 rounded-full modal-flame-bg flex items-center justify-center mx-auto mb-stack-lg shadow-[0_20px_40px_rgba(255,107,53,0.4)] z-10 animate-flame-in">
            <Flame size={56} className="text-white" />
            <div className="absolute -inset-1.5 rounded-full border-[3px] border-[rgba(255,107,53,0.4)] animate-ring" />
          </div>

          {/* Streak count */}
          <div className="text-center mb-5 relative z-10 animate-[scFadeUp_0.4s_ease_0.3s_both]">
            <div className="text-[4.5rem] font-black leading-none modal-flame-text mb-1">
              {streakCount}
            </div>
            <div className="text-body font-bold text-ink-900 uppercase tracking-[0.08em]">
              Jours Consécutifs
            </div>
          </div>

          {/* Milestone badge */}
          {isMilestone && (
            <div className="flex justify-center mb-5 relative z-10">
              <div className="inline-flex items-center gap-stack-xs px-4 py-2 rounded-pill modal-milestone-bg text-white text-caption font-bold shadow-[0_4px_16px_rgba(255,215,0,0.4)] animate-milestone-in">
                <TrendingUp size={14} /> Jalon {milestone} jours atteint !
              </div>
            </div>
          )}

          {/* Title + message */}
          <div className="text-center mb-stack-lg relative z-10 animate-[scFadeUp_0.4s_ease_0.5s_both]">
            <h2 className="text-h3 font-extrabold text-ink-900 mb-2">
              🔥 Série Enflammée !
            </h2>
            <p className="text-body text-ink-600 leading-relaxed">
              {encouragement}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-stack-xs mb-stack-lg relative z-10 animate-[scFadeUp_0.4s_ease_0.6s_both]">
            <div className="p-4 rounded-lg bg-primary-50 border border-primary-500/15 text-center">
              <Calendar size={20} className="mx-auto mb-2 text-primary-500" />
              <div className="text-h4 font-extrabold text-ink-900">{Math.floor(streakCount / 7)}</div>
              <div className="text-micro text-ink-600">Semaines</div>
            </div>
            <div className="p-4 rounded-lg bg-accent-400/8 border border-accent-400/15 text-center">
              <TrendingUp size={20} className="mx-auto mb-2 text-accent-600" />
              <div className="text-h4 font-extrabold text-ink-900">+{streakCount * 10}</div>
              <div className="text-micro text-ink-600">XP Total</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full p-4 rounded-xl border-0 text-white font-bold text-body cursor-pointer transition-all relative z-10 modal-streak-cta animate-[scFadeUp_0.4s_ease_0.7s_both]"
          >
            Continuer ma série 🔥
          </button>
        </div>
      </div>
    </>
  );
};

export default StreakCelebrationModal;
