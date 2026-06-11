/**
 * Error404 — Page non trouvée
 * Direction : Soft Cloud (DA light — cohérente avec l'app)
 * Fond gradient primary-50→white, blobs doux breathing, texte ink-900
 * Suggestions cards verre léger, CTA primary standard
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
    x.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * strength);
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
  const parallax = useMouseParallax(28);
  const codeX = useTransform(parallax.x, (v) => v * 1.2);
  const codeY = useTransform(parallax.y, (v) => v * 1.2);
  const subX  = useTransform(parallax.x, (v) => v * 0.45);
  const subY  = useTransform(parallax.y, (v) => v * 0.45);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50/60 flex items-center justify-center px-6 py-page"
    >
      {/* Blobs doux breathing */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.06, 1] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-primary-100/70 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -22, 0], y: [0, 18, 0], scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 -right-24 w-[520px] h-[520px] rounded-full bg-accent-100/50 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { opacity: [0.4, 0.7, 0.4] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 left-1/4 w-[260px] h-[260px] rounded-full bg-primary-100/50 blur-ambient"
      />

      <div className="relative z-base text-center max-w-4xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.28em] text-primary-400 inline-flex items-center gap-2 mb-4"
        >
          <Compass size={13} /> Navigation perdue
        </motion.p>

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] bg-gradient-to-br from-primary-700 via-primary-500 to-primary-400 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(85,161,180,0.18)]">
            404
          </span>
        </motion.div>

        {/* Title + description */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="flex flex-col items-center gap-3 mb-10"
        >
          <h1 className="font-display text-h1 font-bold text-ink-900 leading-tight max-w-2xl">
            On vous remet sur la bonne route
          </h1>
          <p className="font-body text-body-lg text-ink-500 leading-relaxed max-w-xl">
            Cette page n'existe pas ou a été déplacée. Voici par où repartir.
          </p>
        </motion.div>

        {/* Suggestion cards */}
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
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] } },
              }}
              whileHover={!parallax.reduce ? { y: -3, scale: 1.02 } : undefined}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(s.to)}
              className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white/80 border border-primary-100 hover:border-primary-300 hover:bg-white hover:shadow-sm transition-all min-h-touch cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 shadow-xs"
            >
              <span className="text-primary-500">{s.icon}</span>
              <span className="font-body text-caption font-semibold text-ink-700 leading-tight text-center">{s.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
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
