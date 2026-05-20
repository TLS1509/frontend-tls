/**
 * Error500 — Erreur serveur
 * Direction : Cinematic Immersion · tone danger
 * Fond deep dark avec tint danger chaud · blobs coral/orange · frosted glass diagnostic
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
import { AlertTriangle, Home, RefreshCw, ArrowRight } from 'lucide-react';
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

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const Error500: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(25);
  const codeX = useTransform(parallax.x, (v) => v * 1.1);
  const codeY = useTransform(parallax.y, (v) => v * 1.1);
  const subX = useTransform(parallax.x, (v) => v * 0.4);
  const subY = useTransform(parallax.y, (v) => v * 0.4);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-900 via-[#1a0e0a] to-ink-900 flex items-center justify-center px-6 py-page"
    >
      {/* Blobs — coral/danger tint */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 22, 0], y: [0, -18, 0], scale: [1, 1.06, 1] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full bg-danger-base/20 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -20, 0], y: [0, 18, 0], scale: [1, 1.09, 1] } : undefined}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[10%] -right-20 w-[420px] h-[420px] rounded-full bg-secondary-500/15 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { opacity: [0.1, 0.2, 0.1] } : undefined}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-danger-base/10 blur-ambient"
      />

      <div className="relative z-base text-center max-w-3xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-white/55 inline-flex items-center gap-2 mb-4"
        >
          <AlertTriangle size={14} /> Système · Incident
        </motion.p>

        {/* Giant 500 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] bg-gradient-to-br from-white via-danger-bg to-secondary-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(242,133,89,0.3)]">
            500
          </span>
        </motion.div>

        {/* Title + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{ x: subX, y: subY }}
          className="flex flex-col items-center gap-3 mb-8"
        >
          <h1 className="font-display text-h1 font-bold text-white leading-tight max-w-xl">
            Une erreur s'est produite
          </h1>
          <p className="font-body text-body-lg text-white/65 leading-relaxed max-w-lg">
            Notre équipe technique a été notifiée. Vous pouvez réessayer dans quelques instants.
          </p>
        </motion.div>

        {/* Diagnostic — frosted glass callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="w-full max-w-md mb-10 rounded-xl backdrop-blur-glass-medium bg-white/8 border border-white/15 px-stack-lg py-stack text-left flex flex-col gap-tight"
        >
          <p className="font-mono text-caption font-bold uppercase tracking-wider text-white/50 mb-1">
            Diagnostic
          </p>
          <p className="font-mono text-caption text-white/70">Code: <span className="text-danger-bg font-bold">500</span> · Erreur interne</p>
          <p className="font-mono text-caption text-white/70">Équipe technique notifiée</p>
          <p className="font-mono text-caption text-white/55">Action recommandée : réessayer dans quelques instants</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.45 }}
          className="flex flex-wrap gap-stack-xs justify-center"
        >
          <Button
            size="lg"
            onClick={() => window.location.reload()}
            className="!backdrop-blur-glass-medium !bg-white/85 !text-primary-900 !shadow-[0_12px_40px_-8px_rgba(0,0,0,0.40)] hover:!bg-white hover:!shadow-[0_18px_50px_-10px_rgba(0,0,0,0.50)] hover:!-translate-y-0.5 transition-all"
            leadingIcon={<RefreshCw size={18} />}
          >
            Réessayer
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="!backdrop-blur-glass-medium !bg-white/12 !text-white !border !border-white/30 hover:!bg-white/22 hover:!border-white/50 transition-colors"
            trailingIcon={<ArrowRight size={18} />}
          >
            <Home size={16} className="shrink-0" />
            Tableau de bord
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Error500;
