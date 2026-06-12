/**
 * Error500 — Erreur serveur
 * Direction : Soft Cloud · tone danger-warm
 * Fond gradient secondary-50→white (pêche très clair), blobs warm breathing
 * Texte ink-900, callout diagnostic léger, CTA warm
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
    x.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * strength);
  };

  const reset = () => { x.set(0); y.set(0); };
  return { x: springX, y: springY, handleMove, reset, reduce };
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const Error500: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(24);
  const codeX = useTransform(parallax.x, (v) => v * 1.1);
  const codeY = useTransform(parallax.y, (v) => v * 1.1);
  const subX  = useTransform(parallax.x, (v) => v * 0.4);
  const subY  = useTransform(parallax.y, (v) => v * 0.4);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-secondary-50/40 flex items-center justify-center px-6 py-page"
    >
      {/* Blobs warm doux — tint danger/coral très léger */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 22, 0], y: [0, -16, 0], scale: [1, 1.06, 1] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-24 w-[560px] h-[560px] rounded-full bg-secondary-100/80 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -18, 0], y: [0, 16, 0], scale: [1, 1.09, 1] } : undefined}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[10%] -right-20 w-[440px] h-[440px] rounded-full bg-accent-100/50 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { opacity: [0.3, 0.55, 0.3] } : undefined}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[38%] left-[28%] w-[280px] h-[280px] rounded-full bg-secondary-100/40 blur-ambient"
      />

      <div className="relative z-base text-center max-w-3xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.28em] text-secondary-500/80 inline-flex items-center gap-2 mb-4"
        >
          <AlertTriangle size={13} /> Système · Incident
        </motion.p>

        {/* Giant 500 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.85, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-400 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(237,132,58,0.18)]">
            500
          </span>
        </motion.div>

        {/* Title + description */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="flex flex-col items-center gap-3 mb-8"
        >
          <h1 className="font-display text-h1 font-bold text-ink-900 leading-tight max-w-xl">
            Une erreur s'est produite
          </h1>
          <p className="font-body text-body-lg text-ink-500 leading-relaxed max-w-lg">
            Notre équipe technique a été notifiée. Vous pouvez réessayer dans quelques instants.
          </p>
        </motion.div>

        {/* Diagnostic card — léger, cohérent avec DA light */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          style={{ x: subX, y: subY }}
          className="w-full max-w-md mb-10 rounded-xl bg-white border border-secondary-100 px-stack-lg py-stack text-left flex flex-col gap-tight shadow-xs"
        >
          <p className="font-mono text-caption font-bold uppercase tracking-wider text-ink-400 mb-1">
            Diagnostic
          </p>
          <p className="font-mono text-caption text-ink-700">Code: <span className="text-secondary-600 font-bold">500</span> · Erreur interne</p>
          <p className="font-mono text-caption text-ink-600">Équipe technique notifiée</p>
          <p className="font-mono text-caption text-ink-400">Action recommandée : réessayer dans quelques instants</p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="flex flex-wrap gap-stack-xs justify-center"
        >
          <Button
            size="lg"
            variant="warm"
            onClick={() => window.location.reload()}
            leadingIcon={<RefreshCw size={18} />}
          >
            Réessayer
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/dashboard')}
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
