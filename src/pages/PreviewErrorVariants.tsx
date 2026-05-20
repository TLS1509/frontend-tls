/**
 * PreviewErrorVariants — Phase 19.2 / Error redesign · narrowed selection
 *
 * 3 directions retenues après itération utilisateur :
 *
 *   1. Cinematic Immersion — Teal deep · parallax mouse-follow + blob breathing
 *      (blob jaune/orangé réduit, retenu notamment pour Auth)
 *   2. Brutalist Neon       — B&W + accent yellow · glitch jitter renforcé
 *   3. Stellar Aurora       — Dark space + TLS warm · morphing blob (yellow/orange)
 *                             + ciel étoilé twinkling
 *
 * Route : /preview/error-variants
 * ⚠️ Page éphémère — supprimée après choix utilisateur final.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Compass,
  Home,
  Zap,
  ArrowRight,
  ArrowUpRight,
  CornerDownLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/core/Button';

/* ─── Shared parallax hook ─────────────────────────────────────────────── */

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

/* ─── Variant 1 : Cinematic Immersion (parallax + breathing) ─────────── */
/* Adjustments :
 *  - Blob accent-400 reduced from 800×800/25% → 480×480/15%
 *  - Better positioned to balance composition
 */

const Variant1Cinematic: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(30);
  const codeX = useTransform(parallax.x, (v) => v * 1.2);
  const codeY = useTransform(parallax.y, (v) => v * 1.2);
  const subX = useTransform(parallax.x, (v) => v * 0.5);
  const subY = useTransform(parallax.y, (v) => v * 0.5);

  return (
    <section
      onMouseMove={parallax.handleMove}
      onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center px-6"
    >
      {/* Primary teal blob — large, dominant */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-primary-400/25 blur-ambient"
      />
      {/* Accent blob — reduced (was 800px/25%) → now 460px/12%, repositioned */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[8%] -right-24 w-[460px] h-[460px] rounded-full bg-accent-400/[0.12] blur-ambient"
      />
      {/* Subtle highlight third blob — small spotlight */}
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { opacity: [0.15, 0.25, 0.15] } : undefined}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary-300/20 blur-ambient"
      />

      <div className="relative z-base text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }} style={{ x: subX, y: subY }}
          className="font-mono text-caption font-bold uppercase tracking-[0.3em] text-white/70 inline-flex items-center gap-2"
        >
          <Compass size={14} /> Navigation perdue
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.2, 0, 0, 1.1] }}
          style={{ x: codeX, y: codeY }} aria-hidden
          className="font-display font-black text-white tracking-tighter leading-none my-6"
        >
          <span className="block text-[clamp(8rem,22vw,16rem)] bg-gradient-to-br from-white via-primary-100 to-accent-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(85,161,180,0.4)]">404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }} style={{ x: subX, y: subY }}
          className="font-display text-h1 font-bold text-white leading-tight mb-4 max-w-2xl mx-auto"
        >
          On vous remet sur la bonne route
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }} style={{ x: subX, y: subY }}
          className="font-body text-body-lg text-white/75 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Cette page n'existe pas. Aucun stress, voici par où repartir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button size="lg" onClick={() => navigate('/dashboard')} className="!bg-white !text-primary-800 hover:!bg-white/90 !shadow-xl" trailingIcon={<ArrowRight size={18} />}>Tableau de bord</Button>
          <Button size="lg" variant="ghost" onClick={() => navigate('/learning-paths')} className="!text-white !border !border-white/30 hover:!bg-white/10">Explorer les parcours</Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Variant 2 : Brutalist Neon — renforcé ──────────────────────────── */
/* Adjustments :
 *  - Glitch more visible : larger displacement (8-10px), longer duration (450ms),
 *    higher frequency (every 3s instead of 5s), added skew + scale jitter,
 *    full opacity colored clones, scan-line overlay during glitch
 */

const useGlitch = (period = 3000, duration = 450) => {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), duration);
    }, period);
    return () => clearInterval(interval);
  }, [period, duration, reduce]);
  return glitching;
};

const Variant5Brutalist: React.FC = () => {
  const navigate = useNavigate();
  const glitching = useGlitch(2800, 480);
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-page">
      {/* Grid pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Scan-line overlay during glitch */}
      {glitching && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(248,176,68,0.18)_0px,rgba(248,176,68,0.18)_1px,transparent_1px,transparent_3px)] mix-blend-multiply"
        />
      )}

      <div className="relative z-base max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-stack">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-900 text-accent-400 font-mono text-caption font-bold uppercase tracking-[0.2em]">
            <span className={`w-2 h-2 ${glitching ? 'bg-secondary-500 scale-150' : 'bg-accent-400'} ${!reduce ? 'animate-pulse' : ''} transition-transform`} /> ERROR · 404
          </span>
          <span className="font-mono text-caption text-ink-600">SYSTEM://navigation/route/not_found</span>
        </div>

        {/* Glitched 404 — much more visible now */}
        <div className="relative">
          <motion.div
            animate={glitching && !reduce ? { x: [0, -3, 5, -2, 0], skewX: [0, -1.5, 1, 0] } : { x: 0, skewX: 0 }}
            transition={{ duration: 0.48, ease: 'steps(8)' }}
            className="relative inline-block"
          >
            <h1 className="font-display font-black text-ink-900 leading-[0.85] tracking-tighter text-[clamp(7rem,18vw,14rem)] relative">
              <span className="relative inline-block">
                404
                {glitching && (
                  <>
                    {/* Yellow-warm clone — heavier offset */}
                    <span
                      aria-hidden
                      className="absolute inset-0 text-accent-400 translate-x-[10px] -translate-y-[3px] opacity-100 mix-blend-multiply"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 38%, 0 38%)' }}
                    >404</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 text-accent-400 translate-x-[8px] translate-y-[2px] opacity-100 mix-blend-multiply"
                      style={{ clipPath: 'polygon(0 62%, 100% 62%, 100% 100%, 0 100%)' }}
                    >404</span>
                    {/* Coral-secondary clone — opposite offset */}
                    <span
                      aria-hidden
                      className="absolute inset-0 text-secondary-500 -translate-x-[10px] translate-y-[3px] opacity-100 mix-blend-multiply"
                      style={{ clipPath: 'polygon(0 38%, 100% 38%, 100% 62%, 0 62%)' }}
                    >404</span>
                    {/* Cyan-primary clone — middle band */}
                    <span
                      aria-hidden
                      className="absolute inset-0 text-primary-500 -translate-x-[6px] -translate-y-[1px] opacity-90 mix-blend-multiply"
                      style={{ clipPath: 'polygon(0 18%, 100% 18%, 100% 32%, 0 32%)' }}
                    >404</span>
                  </>
                )}
              </span>
            </h1>
          </motion.div>
          <div className="absolute -top-4 right-0 inline-flex flex-col gap-1 items-end text-ink-900 font-mono text-caption font-bold uppercase tracking-wider">
            <span className={glitching ? 'text-secondary-500' : ''}>PAGE</span>
            <span>NOT</span>
            <span className={glitching ? 'text-accent-400 bg-ink-900 px-1' : ''}>FOUND</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-stack-lg mt-stack-lg pt-stack border-t-4 border-ink-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-mono text-body text-ink-900 leading-relaxed mb-stack">
              <span className="bg-accent-400 px-1.5 text-ink-900 font-bold">⚠ ROUTE_NOT_RESOLVED</span> — La ressource demandée n'existe pas dans le système. Les routes valides sont indiquées ci-dessous.
            </p>

            <div className="flex flex-wrap gap-stack-xs">
              <button
                onClick={() => navigate('/dashboard')}
                className="group inline-flex items-center gap-2 px-5 py-3 bg-ink-900 text-white font-mono text-body-sm font-bold uppercase tracking-wider border-4 border-ink-900 hover:bg-accent-400 hover:text-ink-900 transition-colors min-h-touch shadow-[6px_6px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
              >
                <CornerDownLeft size={16} /> /dashboard
              </button>
              <button
                onClick={() => navigate('/learning-paths')}
                className="group inline-flex items-center gap-2 px-5 py-3 bg-white text-ink-900 font-mono text-body-sm font-bold uppercase tracking-wider border-4 border-ink-900 hover:bg-accent-400 transition-colors min-h-touch shadow-[6px_6px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
              >
                <ChevronRight size={16} /> /learning-paths
              </button>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="border-l-4 border-ink-900 pl-stack flex flex-col gap-tight font-mono text-caption text-ink-700"
          >
            <p className="font-bold uppercase tracking-widest text-ink-900">DIAGNOSTIC</p>
            <p>STATUS: 404</p>
            <p>METHOD: GET</p>
            <p>TIMESTAMP: {new Date().toISOString().slice(0, 19)}</p>
            <p>TRACE_ID: tls-{Math.random().toString(36).slice(2, 10)}</p>
            <p className={glitching ? 'text-secondary-500 font-bold' : 'text-ink-500'}>
              {glitching ? '◉ GLITCH DETECTED' : '○ STABLE'}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

/* ─── Variant 3 : Stellar Aurora — TLS warm space ────────────────────── */
/* Adjustments :
 *  - Aurora blob colors swapped from purple/pink/cyan → TLS accent-400 (yellow)
 *    + secondary-500 (orange) + secondary-400 (lighter orange)
 *  - Background now deep ink-900 (true space black) instead of #0F0B2E purple
 *  - Improved starry sky : varied star sizes via SVG with individual twinkle delays
 *    instead of single radial-gradient pattern
 */

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  duration: number;
  baseOpacity: number;
}

const generateStars = (count: number, seed = 42): Star[] => {
  // Deterministic seed for stable render between toggles
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    cx: rand() * 1600,
    cy: rand() * 900,
    r: 0.4 + rand() * 1.6, // 0.4 → 2.0 px
    delay: rand() * 4,
    duration: 2.5 + rand() * 3.5, // 2.5 → 6s
    baseOpacity: 0.3 + rand() * 0.7,
  }));
};

const Variant6Stellar: React.FC = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const stars = useMemo(() => generateStars(140), []);
  const constellations = useMemo(() => generateStars(8, 999), []); // a few brighter stars

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0A0E1A] flex items-center justify-center px-6 py-page">
      {/* Deep gradient overlay for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0E1A] via-[#1A0E1A] to-[#0A0608]"
      />

      {/* Starry sky — varied sizes with individual twinkle */}
      <svg
        aria-hidden
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        {stars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="white"
            initial={{ opacity: s.baseOpacity }}
            animate={!reduce ? { opacity: [s.baseOpacity * 0.3, s.baseOpacity, s.baseOpacity * 0.3] } : undefined}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}
        {/* Brighter "lead" stars with glow */}
        {constellations.map((s, i) => (
          <motion.g
            key={`bright-${i}`}
            animate={!reduce ? { opacity: [0.6, 1, 0.6] } : undefined}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          >
            <circle cx={s.cx} cy={s.cy} r={s.r * 2.5} fill="#FFE6BC" opacity="0.4" filter="blur(2px)" />
            <circle cx={s.cx} cy={s.cy} r={s.r * 1.4} fill="white" />
            <line x1={s.cx - s.r * 3} y1={s.cy} x2={s.cx + s.r * 3} y2={s.cy} stroke="white" strokeWidth="0.3" opacity="0.5" />
            <line x1={s.cx} y1={s.cy - s.r * 3} x2={s.cx} y2={s.cy + s.r * 3} stroke="white" strokeWidth="0.3" opacity="0.5" />
          </motion.g>
        ))}

        {/* Shooting star */}
        {!reduce && (
          <motion.line
            x1="-50"
            y1="100"
            x2="50"
            y2="160"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
            initial={{ x: 0 }}
            animate={{ x: 1800 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 7, ease: 'easeOut' }}
          />
        )}
      </svg>

      {/* Morphing aurora blobs — NOW in TLS warm palette */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-80"
      >
        <defs>
          <linearGradient id="aurora-warm-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8B044" /> {/* accent-400 yellow */}
            <stop offset="60%" stopColor="#ED843A" /> {/* secondary-500 orange */}
            <stop offset="100%" stopColor="#C06920" /> {/* secondary-600 deeper */}
          </linearGradient>
          <linearGradient id="aurora-warm-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8B044" />
            <stop offset="100%" stopColor="#F18A4C" />
          </linearGradient>
          <linearGradient id="aurora-warm-3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFCB81" />
            <stop offset="100%" stopColor="#ED843A" />
          </linearGradient>
          <filter id="goo-warm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="50" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
        <g filter="url(#goo-warm)">
          <motion.circle
            cx="280" cy="430" r="150" fill="url(#aurora-warm-1)" opacity="0.75"
            animate={!reduce ? { cx: [280, 450, 280], cy: [430, 320, 430], r: [150, 195, 150] } : undefined}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="540" cy="440" r="135" fill="url(#aurora-warm-2)" opacity="0.7"
            animate={!reduce ? { cx: [540, 360, 540], cy: [440, 540, 440], r: [135, 180, 135] } : undefined}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="400" cy="240" r="100" fill="url(#aurora-warm-3)" opacity="0.55"
            animate={!reduce ? { cx: [400, 500, 400], cy: [240, 620, 240], r: [100, 145, 100] } : undefined}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>
      </svg>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(10,14,26,0.6)_100%)]"
      />

      <div className="relative z-base max-w-3xl text-center flex flex-col items-center gap-stack-lg">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-pill backdrop-blur-glass-medium bg-white/10 border border-accent-400/40 text-accent-100 font-mono text-caption font-bold uppercase tracking-wider"
        >
          <Sparkles size={14} className="text-accent-400" /> Errance cosmique
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
          className="font-display text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] bg-gradient-to-br from-accent-200 via-accent-400 to-secondary-500 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(248,176,68,0.3)]"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-h2 font-bold text-white max-w-xl"
        >
          Cette page s'est dissoute dans l'aurore.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-body text-body-lg text-white/70 max-w-lg leading-relaxed"
        >
          Pas grave — la galaxie d'apprentissage TLS est juste à côté.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.7 } } }}
          className="flex flex-wrap gap-stack-xs justify-center mt-stack"
        >
          {[
            { label: 'Tableau de bord', to: '/dashboard', icon: <Home size={18} /> },
            { label: 'Explorer', to: '/learning-paths', icon: <Zap size={18} /> },
          ].map((s, i) => (
            <motion.button
              key={i}
              variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 18 } } }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate(s.to)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill backdrop-blur-glass-medium bg-white/15 border border-accent-400/40 text-white font-body font-semibold hover:bg-white/25 hover:border-accent-400/60 transition-colors min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 shadow-[0_8px_30px_-8px_rgba(248,176,68,0.5)]"
            >
              {s.icon}
              {s.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Page wrapper ─────────────────────────────────────────────────────── */

interface VariantSectionProps {
  number: number;
  title: string;
  subtitle: string;
  animTag: string;
  children: React.ReactNode;
}

const VariantSection: React.FC<VariantSectionProps> = ({ number, title, subtitle, animTag, children }) => (
  <div className="relative">
    <div className="sticky top-0 z-tooltip flex items-center gap-stack-xs px-page py-stack-xs bg-ink-900/90 backdrop-blur-glass-light text-white border-b border-white/10">
      <span className="font-mono text-caption font-bold text-accent-400">#{number}</span>
      <span className="font-display text-body-sm font-bold">{title}</span>
      <span className="font-body text-caption text-white/60">— {subtitle}</span>
      <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-white/10 border border-white/20 font-mono text-micro text-white/70 uppercase tracking-wider">
        <Layers size={10} /> {animTag}
      </span>
    </div>
    {children}
  </div>
);

export const PreviewErrorVariants: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      <VariantSection number={1} title="Cinematic Immersion" subtitle="Teal deep · ton rassurant (idéal Auth)" animTag="Parallax + breathing">
        <Variant1Cinematic />
      </VariantSection>
      <VariantSection number={2} title="Brutalist Neon" subtitle="B&W + accent yellow · ton technique" animTag="Glitch renforcé">
        <Variant5Brutalist />
      </VariantSection>
      <VariantSection number={3} title="Stellar Aurora" subtitle="Space black + TLS warm · ton cosmique" animTag="Starfield + warm goo morph">
        <Variant6Stellar />
      </VariantSection>
    </div>
  );
};

export default PreviewErrorVariants;
