/**
 * Error404 — Page non trouvée
 * Direction : Cinematic Immersion (V1 validé Phase 19.2)
 * Fond teal deep · parallax mouse · blobs breathing · frosted glass buttons
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Compass, Home, BookOpen, Zap, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';

/* ── Parallax hook ────────────────────────────────────────────────────────── */

function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.5 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => { x.set(0); y.set(0); };
  return { x: springX, y: springY, handleMove, reset, reduce };
}

/* ── Navigation suggestions ───────────────────────────────────────────────── */

const SUGGESTIONS = [
  { icon: <Home size={18} />, label: 'Tableau de bord', to: '/dashboard' },
  { icon: <BookOpen size={18} />, label: 'Mes parcours', to: '/learning-paths' },
  { icon: <Zap size={18} />, label: 'Veille & Ressources', to: '/veille' },
  { icon: <HelpCircle size={18} />, label: 'Support', to: '/help' },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const Error404: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(30);
  const codeX = useTransform(parallax.x, (v) => v * 1.2);
  const codeY = useTransform(parallax.y, (v) => v * 1.2);
  const subX = useTransform(parallax.x, (v) => v * 0.45);
  const subY = useTransform(parallax.y, (v) => v * 0.45);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center px-6 py-page"
    >
      {/* Blobs breathing */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-primary-400/25 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[8%] -right-24 w-[460px] h-[460px] rounded-full bg-accent-400/[0.10] blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { opacity: [0.12, 0.22, 0.12] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-primary-300/18 blur-ambient"
      />

      <div className="relative z-base text-center max-w-4xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-white/65 inline-flex items-center gap-2 mb-4"
        >
          <Compass size={14} /> Navigation perdue
        </motion.p>

        {/* Giant 404 — deeper parallax layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] bg-gradient-to-br from-white via-primary-100 to-accent-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(85,161,180,0.35)]">
            404
          </span>
        </motion.div>

        {/* Title + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{ x: subX, y: subY }}
          className="flex flex-col items-center gap-3 mb-10"
        >
          <h1 className="font-display text-h1 font-bold text-white leading-tight max-w-2xl">
            On vous remet sur la bonne route
          </h1>
          <p className="font-body text-body-lg text-white/70 leading-relaxed max-w-xl">
            Cette page n'existe pas ou a été déplacée. Voici par où repartir.
          </p>
        </motion.div>

        {/* Suggestion cards — frosted glass */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs w-full max-w-2xl mb-10"
        >
          {SUGGESTIONS.map((s) => (
            <motion.button
              key={s.to}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
              }}
              whileHover={!parallax.reduce ? { y: -4, scale: 1.03 } : undefined}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(s.to)}
              className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl backdrop-blur-glass-medium bg-white/10 border border-white/20 text-white hover:bg-white/18 hover:border-white/35 transition-colors min-h-touch cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <span className="text-white/80">{s.icon}</span>
              <span className="font-body text-caption font-semibold text-white/90 leading-tight text-center">{s.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.45 }}
        >
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="!backdrop-blur-glass-medium !bg-white/85 !text-primary-800 !shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] hover:!bg-white hover:!shadow-[0_18px_50px_-10px_rgba(0,0,0,0.45)] hover:!-translate-y-0.5 transition-all"
            trailingIcon={<ArrowRight size={18} />}
          >
            Tableau de bord
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Error404;
