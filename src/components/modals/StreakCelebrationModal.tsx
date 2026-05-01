import React, { useEffect, useState } from 'react';
import { X, Flame, Calendar, TrendingUp } from 'lucide-react';

/**
 * StreakCelebrationModal — Célébration de série d'apprentissage
 * Animations CSS uniquement (pas de framer-motion)
 * Tokens: TLS design system
 */

interface StreakCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
  milestone?: number;
  encouragement?: string;
}

// Generates N particle specs once so they're stable per render
function makeParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: 30 + Math.random() * 40, // 30-70% horizontally
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
  const [visible, setVisible] = useState(false);
  const isMilestone = milestone !== undefined && streakCount >= milestone;

  useEffect(() => {
    if (isOpen) {
      // Tiny delay to trigger CSS animations
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Floating flame particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: `${p.left}%`,
            bottom: '45%',
            width: p.size,
            height: p.size * 1.3,
            borderRadius: '50% 50% 50% 0',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
            zIndex: 1001,
            animation: `streakParticle ${p.duration}s ${p.delay}s ease-out infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--s-4)',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: 'scBdIn 0.22s ease both',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 520,
            background: 'var(--surface)',
            borderRadius: 'var(--r-2xl)',
            padding: 'var(--s-10)',
            border: '1px solid rgba(255,107,53,0.2)',
            boxShadow: '0 30px 60px rgba(255,107,53,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
            animation: 'scIn 0.5s cubic-bezier(.34,1.56,.64,1) both',
            overflow: 'hidden',
          }}
        >
          {/* Orange header gradient */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 160,
            background: 'linear-gradient(180deg, rgba(237,132,58,0.12) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 'var(--s-4)', right: 'var(--s-4)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--surface-muted)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)', zIndex: 2, transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--border)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)'; }}
          >
            <X size={14} />
          </button>

          {/* Flame icon */}
          <div style={{
            position: 'relative', width: 112, height: 112,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--s-6)',
            boxShadow: '0 20px 40px rgba(255,107,53,0.4)',
            zIndex: 1,
            animation: 'scFlameIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.2s both',
          }}>
            <Flame size={56} style={{ color: '#fff' }} />
            <div style={{
              position: 'absolute', inset: -6,
              borderRadius: '50%', border: '3px solid rgba(255,107,53,0.4)',
              animation: 'scRing 2s ease-out infinite',
            }} />
          </div>

          {/* Streak count */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--s-5)', position: 'relative', zIndex: 1, animation: 'scFadeUp 0.4s ease 0.3s both' }}>
            <div style={{
              fontSize: '4.5rem', fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 'var(--s-1)',
            }}>
              {streakCount}
            </div>
            <div style={{ fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Jours Consécutifs
            </div>
          </div>

          {/* Milestone badge */}
          {isMilestone && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4)',
              borderRadius: 'var(--r-pill)',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#fff',
              fontSize: 'var(--t-caption)', fontWeight: 700,
              margin: '0 auto var(--s-5)',
              boxShadow: '0 4px 16px rgba(255,215,0,0.4)',
              animation: 'scFadeUp 0.4s ease 0.4s both',
              position: 'relative', zIndex: 1,
            }}>
              <TrendingUp size={14} /> Jalon {milestone} jours atteint !
            </div>
          )}

          {/* Title + message */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--s-6)', position: 'relative', zIndex: 1, animation: 'scFadeUp 0.4s ease 0.5s both' }}>
            <h2 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)' }}>
              🔥 Série Enflammée !
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {encouragement}
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--s-3)', marginBottom: 'var(--s-6)', animation: 'scFadeUp 0.4s ease 0.6s both' }}>
            <div style={{ padding: 'var(--s-4)', borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-50)', border: '1px solid rgba(85,161,180,0.15)', textAlign: 'center' }}>
              <Calendar size={20} style={{ color: 'var(--tls-primary-500)', marginBottom: 'var(--s-2)' }} />
              <div style={{ fontSize: 'var(--t-h4)', fontWeight: 800, color: 'var(--text)' }}>{Math.floor(streakCount / 7)}</div>
              <div style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>Semaines</div>
            </div>
            <div style={{ padding: 'var(--s-4)', borderRadius: 'var(--r-lg)', background: 'rgba(248,176,68,0.08)', border: '1px solid rgba(248,176,68,0.15)', textAlign: 'center' }}>
              <TrendingUp size={20} style={{ color: 'var(--tls-yellow-600)', marginBottom: 'var(--s-2)' }} />
              <div style={{ fontSize: 'var(--t-h4)', fontWeight: 800, color: 'var(--text)' }}>+{streakCount * 10}</div>
              <div style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)' }}>XP Total</div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            style={{
              width: '100%', padding: 'var(--s-4)',
              borderRadius: 'var(--r-xl)', border: 'none',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              color: '#fff', fontWeight: 700, fontSize: 'var(--t-body)',
              cursor: 'pointer', transition: 'all var(--dur-2)',
              boxShadow: '0 8px 24px rgba(255,107,53,0.35)',
              position: 'relative', zIndex: 1,
              animation: 'scFadeUp 0.4s ease 0.7s both',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(255,107,53,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(255,107,53,0.35)';
            }}
          >
            Continuer ma série 🔥
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scIn {
          from { opacity: 0; transform: translateY(30px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scFlameIn {
          from { opacity: 0; transform: scale(0) rotate(-20deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes scRing {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes scFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes streakParticle {
          0%   { opacity: 0; transform: rotate(45deg) translateY(0) scale(0); }
          20%  { opacity: 1; transform: rotate(45deg) translateY(-40px) scale(1); }
          80%  { opacity: 0.5; transform: rotate(45deg) translateY(-140px) scale(0.6); }
          100% { opacity: 0; transform: rotate(45deg) translateY(-220px) scale(0); }
        }
      `}</style>
    </>
  );
};

export default StreakCelebrationModal;
