/**
 * MarketingError404 — Page non trouvée · Site marketing public
 * Direction : Aurora Light (Variant C)
 * Fond blanc, 3 gros blobs mix-blend-multiply en overlay parallax
 * Code gradient saturé primary-700→accent-400, pills suggestions, 2 CTAs
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Compass, Home, BookOpen, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/core/Button';

/* ── Parallax hook ────────────────────────────────────────────────────────── */

function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.6 });
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
  { icon: <Home size={16} />, label: 'Accueil', href: '/marketing' },
  { icon: <BookOpen size={16} />, label: 'La méthode', href: '/marketing/methode' },
  { icon: <BookOpen size={16} />, label: 'Formations', href: '/marketing/formation' },
  { icon: <Mail size={16} />, label: 'Contact', href: '/marketing/contact' },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export const MarketingError404: React.FC = () => {
  const parallax = useMouseParallax(32);
  const codeX = useTransform(parallax.x, (v) => v * 1.3);
  const codeY = useTransform(parallax.y, (v) => v * 1.3);
  const blob1X = useTransform(parallax.x, (v) => v * 0.35);
  const blob1Y = useTransform(parallax.y, (v) => v * 0.35);
  const blob2X = useTransform(parallax.x, (v) => v * 0.6);
  const blob2Y = useTransform(parallax.y, (v) => v * 0.6);
  const blob3X = useTransform(parallax.x, (v) => v * -0.25);
  const blob3Y = useTransform(parallax.y, (v) => v * 0.45);
  const subX   = useTransform(parallax.x, (v) => v * 0.5);
  const subY   = useTransform(parallax.y, (v) => v * 0.5);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-page"
    >
      {/* Blob 1 — primary teal, top-left, grand + étiré */}
      <motion.div
        aria-hidden
        style={{ x: blob1X, y: blob1Y }}
        animate={!parallax.reduce ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-56 -left-56 w-[780px] h-[620px] rounded-full bg-primary-100 blur-ambient mix-blend-multiply opacity-80"
      />
      {/* Blob 2 — warm/secondary, bottom-right */}
      <motion.div
        aria-hidden
        style={{ x: blob2X, y: blob2Y }}
        animate={!parallax.reduce ? { scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="pointer-events-none absolute -bottom-40 -right-40 w-[680px] h-[560px] rounded-full bg-secondary-100 blur-ambient mix-blend-multiply opacity-70"
      />
      {/* Blob 3 — accent yellow, centre-haut flottant */}
      <motion.div
        aria-hidden
        style={{ x: blob3X, y: blob3Y }}
        animate={!parallax.reduce ? { scale: [1, 1.06, 1], opacity: [0.45, 0.65, 0.45] } : undefined}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="pointer-events-none absolute top-[15%] left-[45%] w-[440px] h-[440px] rounded-full bg-accent-100 blur-ambient mix-blend-multiply"
      />

      <div className="relative z-base text-center max-w-3xl w-full flex flex-col items-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-primary-400 inline-flex items-center gap-2 mb-4"
        >
          <Compass size={13} /> Page introuvable
        </motion.p>

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }}
          aria-hidden
          className="font-display font-black tracking-tighter leading-none mb-6"
        >
          <span className="block text-[clamp(7rem,20vw,14rem)] bg-gradient-to-br from-primary-700 via-primary-500 to-accent-400 bg-clip-text text-transparent drop-shadow-[0_2px_28px_rgba(85,161,180,0.14)]">
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
            Cette page n'existe pas
          </h1>
          <p className="font-body text-body-lg text-ink-500 leading-relaxed max-w-xl">
            Le lien est peut-être obsolète ou l'adresse incorrecte. Voici par où reprendre.
          </p>
        </motion.div>

        {/* Pills suggestions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
          }}
          className="flex flex-wrap justify-center gap-stack-xs mb-10"
        >
          {SUGGESTIONS.map((s) => (
            <motion.div
              key={s.href}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
              }}
              whileHover={!parallax.reduce ? { y: -2 } : undefined}
            >
              <Link
                to={s.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-white border border-ink-200 text-ink-700 font-body text-body-sm font-semibold hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 shadow-xs"
              >
                <span className="text-primary-400">{s.icon}</span>
                {s.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="flex flex-wrap gap-stack-xs justify-center"
        >
          <Button
            size="lg"
            onClick={() => window.location.href = '/marketing'}
            trailingIcon={<ArrowRight size={18} />}
          >
            Retour à l'accueil
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.href = '/marketing/contact'}
          >
            Nous contacter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingError404;
