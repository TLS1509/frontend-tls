/**
 * PreviewErrorVariants — Phase 19.2 / Error redesign · sélection affinée
 *
 * 3 directions :
 *   1. Cinematic Immersion — Teal deep · parallax mouse + blob breathing (Auth)
 *   2. Brutalist Neon       — B&W + accent yellow · glitch renforcé
 *   3. Stellar Aurora       — Space noir + TLS warm · morphing blob + skyfield réaliste
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
        className="pointer-events-none absolute bottom-[8%] -right-24 w-[460px] h-[460px] rounded-full bg-accent-400/[0.12] blur-ambient"
      />
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
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="!backdrop-blur-glass-medium !bg-white/85 !text-primary-800 !shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] hover:!bg-white hover:!shadow-[0_18px_50px_-10px_rgba(0,0,0,0.45)] hover:!-translate-y-0.5 transition-all"
            trailingIcon={<ArrowRight size={18} />}
          >
            Tableau de bord
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => navigate('/learning-paths')}
            className="!backdrop-blur-glass-medium !bg-white/15 !text-white !border !border-white/40 hover:!bg-white/25 hover:!border-white/60 transition-colors"
          >
            Explorer les parcours
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Variant 2 : Brutalist Neon ──────────────────────────────────────── */

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

/* V2 refined — brutalist hero conservé, mais :
 *  - Glitch réduit à 1 clone subtil accent-400 (band haut), burst-only, sans permanence
 *  - Paragraphe + CTAs et diagnostic dans des cartes frosted glass légères
 *  - Fond tinté très subtil (primary-50 + accent-50 blobs) pour donner du contenu au backdrop-blur
 */
const Variant5Brutalist: React.FC = () => {
  const navigate = useNavigate();
  const glitching = useGlitch(3200, 380);
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-50/40 via-white to-accent-50/30 flex items-center justify-center px-6 py-page">
      {/* Subtle tint blobs — donnent du contenu au backdrop-blur des cartes glass */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-primary-200/30 blur-ambient" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full bg-accent-200/30 blur-ambient" />

      {/* Grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Scan-line during burst only */}
      {glitching && !reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(248,176,68,0.14)_0px,rgba(248,176,68,0.14)_1px,transparent_1px,transparent_4px)] mix-blend-multiply"
        />
      )}

      <div className="relative z-base max-w-4xl w-full">
        <div className="flex items-center gap-3 mb-stack">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-900 text-accent-400 font-mono text-caption font-bold uppercase tracking-[0.2em]">
            <span className={`w-2 h-2 ${glitching ? 'bg-secondary-500 scale-150' : 'bg-accent-400'} ${!reduce ? 'animate-pulse' : ''} transition-transform`} /> ERROR · 404
          </span>
          <span className="font-mono text-caption text-ink-600">SYSTEM://navigation/route/not_found</span>
        </div>

        <div className="relative">
          <motion.div
            animate={glitching && !reduce ? { x: [0, -2, 3, -1, 0] } : { x: 0 }}
            transition={{ duration: 0.38, ease: 'steps(6)' }}
            className="relative inline-block"
          >
            <h1 className="font-display font-black text-ink-900 leading-[0.85] tracking-tighter text-[clamp(7rem,18vw,14rem)] relative">
              <span className="relative inline-block">
                404
                {/* 1 clone subtil, burst-only — accent-400 sur une bande haute */}
                {glitching && !reduce && (
                  <span
                    aria-hidden
                    className="absolute inset-0 text-accent-400 translate-x-[6px] -translate-y-[2px] opacity-80 mix-blend-multiply"
                    style={{ clipPath: 'polygon(0 8%, 100% 8%, 100% 22%, 0 22%)' }}
                  >
                    404
                  </span>
                )}
              </span>
            </h1>
          </motion.div>
          <div className="absolute -top-4 right-0 inline-flex flex-col gap-1 items-end text-ink-900 font-mono text-caption font-bold uppercase tracking-wider">
            <span>PAGE</span>
            <span>NOT</span>
            <span className={glitching && !reduce ? 'text-accent-400 bg-ink-900 px-1 transition-colors' : 'transition-colors'}>FOUND</span>
          </div>
        </div>

        {/* Glass cards layout — frosted léger sur fond tinté */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-stack-lg mt-stack-lg pt-stack border-t-4 border-ink-900">
          {/* Carte principale : paragraphe + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="backdrop-blur-glass-medium bg-white/70 border-2 border-ink-900 shadow-[6px_6px_0_0_#1a1a1a] p-stack-lg flex flex-col gap-stack"
          >
            <p className="font-mono text-body text-ink-900 leading-relaxed">
              <span className="bg-accent-400 px-1.5 text-ink-900 font-bold">⚠ ROUTE_NOT_RESOLVED</span> — La ressource demandée n'existe pas dans le système. Les routes valides sont indiquées ci-dessous.
            </p>
            <div className="flex flex-wrap gap-stack-xs">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-ink-900 text-white font-mono text-body-sm font-bold uppercase tracking-wider hover:bg-accent-400 hover:text-ink-900 transition-colors min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
              >
                <CornerDownLeft size={16} /> /dashboard
              </button>
              <button
                onClick={() => navigate('/learning-paths')}
                className="inline-flex items-center gap-2 px-5 py-3 backdrop-blur-glass-medium bg-white/80 text-ink-900 font-mono text-body-sm font-bold uppercase tracking-wider border-2 border-ink-900 hover:bg-accent-400 transition-colors min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
              >
                <ChevronRight size={16} /> /learning-paths
              </button>
            </div>
          </motion.div>

          {/* Carte diagnostic frosted */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="backdrop-blur-glass-medium bg-white/70 border-2 border-ink-900 shadow-[6px_6px_0_0_#1a1a1a] p-stack-lg flex flex-col gap-tight font-mono text-caption text-ink-700"
          >
            <p className="font-bold uppercase tracking-widest text-ink-900">DIAGNOSTIC</p>
            <p>STATUS: 404</p>
            <p>METHOD: GET</p>
            <p>TIMESTAMP: {new Date().toISOString().slice(0, 19)}</p>
            <p>TRACE_ID: tls-{Math.random().toString(36).slice(2, 10)}</p>
            <p className={glitching && !reduce ? 'text-secondary-500 font-bold' : 'text-ink-500'}>
              {glitching && !reduce ? '◉ GLITCH DETECTED' : '○ STABLE'}
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

/* ─── Variant 3 : Stellar Aurora — espace + TLS warm ─────────────────── */

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  duration: number;
  baseOpacity: number;
  color: string;
}

const generateStars = (count: number, seed = 42): Star[] => {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => {
    const colorRoll = rand();
    // 10% warm gold, 8% cool blue-white, 82% pure white
    const color =
      colorRoll < 0.10 ? '#FFD9A0'
      : colorRoll < 0.18 ? '#B8D4FF'
      : 'white';
    return {
      cx: rand() * 1600,
      cy: rand() * 900,
      r: 0.35 + rand() * 1.9,
      delay: rand() * 5,
      duration: 2 + rand() * 4.5,
      baseOpacity: 0.25 + rand() * 0.75,
      color,
    };
  });
};

/* Dense star cluster — biased to a viewport region */
const generateCluster = (count: number, cx: number, cy: number, spread: number, seed: number): Star[] => {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return Array.from({ length: count }, () => ({
    cx: cx + (rand() - 0.5) * spread,
    cy: cy + (rand() - 0.5) * spread * 0.6,
    r: 0.3 + rand() * 1.0,
    delay: rand() * 4,
    duration: 2.5 + rand() * 3,
    baseOpacity: 0.3 + rand() * 0.65,
    color: rand() < 0.15 ? '#FFD9A0' : 'white',
  }));
};

/* Shooting star — randomises position + angle each cycle */
interface ShootingConfig {
  x1: number; y1: number; x2: number; y2: number;
  delay: number; key: number;
}

function makeShootingConfig(): ShootingConfig {
  const y1 = 50 + Math.random() * 650;
  const angle = 18 + Math.random() * 28;        // 18–46° diagonal
  const len = 80 + Math.random() * 110;          // 80–190 px trail
  const rad = (angle * Math.PI) / 180;
  return {
    x1: -100,
    y1,
    x2: -100 + len * Math.cos(rad),
    y2: y1 + len * Math.sin(rad),
    delay: 4 + Math.random() * 9,               // 4–13 s gap between stars
    key: Date.now() * (1 + Math.random()),
  };
}

const ShootingStar: React.FC = () => {
  const reduce = useReducedMotion();
  const [cfg, setCfg] = useState<ShootingConfig>(makeShootingConfig);
  if (reduce) return null;
  return (
    <motion.line
      key={cfg.key}
      x1={cfg.x1} y1={cfg.y1} x2={cfg.x2} y2={cfg.y2}
      stroke="white" strokeWidth="1.5" strokeLinecap="round"
      initial={{ x: 0, opacity: 0.9 }}
      animate={{ x: 1950, opacity: [0.9, 0.75, 0.3, 0] }}
      transition={{ duration: 1.15, ease: 'easeOut', delay: cfg.delay }}
      onAnimationComplete={() => setCfg(makeShootingConfig())}
    />
  );
};

// ShootingStar is defined but not rendered (removed from V3 per user request)
void ShootingStar;

const Variant6Stellar: React.FC = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const stars = useMemo(() => generateStars(200, 42), []);
  const brightStars = useMemo(() => generateStars(10, 999), []);
  // Two dense clusters for depth/realism
  const cluster1 = useMemo(() => generateCluster(35, 340, 180, 380, 1337), []);
  const cluster2 = useMemo(() => generateCluster(28, 1260, 640, 300, 7777), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080C18] flex items-center justify-center px-6 py-page">
      {/* Deep space gradient — subtle warm tint at bottom for aurora glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080C18] via-[#0E0A14] to-[#100608]"
      />

      {/* ── Starfield SVG ──────────────────────────────────────────────── */}
      <svg
        aria-hidden
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Milky Way band gradient */}
          <linearGradient id="milky-way-grad" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="12%"  stopColor="white" stopOpacity="0.018" />
            <stop offset="30%"  stopColor="white" stopOpacity="0.04" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.065" />
            <stop offset="70%"  stopColor="white" stopOpacity="0.04" />
            <stop offset="88%"  stopColor="white" stopOpacity="0.018" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* Nebula gradients */}
          <radialGradient id="nebula-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F8B044" stopOpacity="0.12" />
            <stop offset="60%"  stopColor="#ED843A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#F8B044" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-cool" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#55A1B4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#55A1B4" stopOpacity="0" />
          </radialGradient>
          <filter id="milky-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="nebula-blur">
            <feGaussianBlur stdDeviation="35" />
          </filter>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Milky Way band — tilted ~22° */}
        <rect
          x="-150" y="260" width="1900" height="200"
          fill="url(#milky-way-grad)"
          filter="url(#milky-blur)"
          transform="rotate(-22 800 450)"
          opacity="0.85"
        />

        {/* Nebula clouds */}
        <ellipse cx="380"  cy="185" rx="220" ry="130" fill="url(#nebula-warm)" filter="url(#nebula-blur)" />
        <ellipse cx="1220" cy="680" rx="200" ry="110" fill="url(#nebula-cool)" filter="url(#nebula-blur)" />

        {/* Cluster stars */}
        {cluster1.map((s, i) => (
          <motion.circle
            key={`c1-${i}`}
            cx={s.cx} cy={s.cy} r={s.r}
            fill={s.color}
            initial={{ opacity: s.baseOpacity }}
            animate={!reduce ? { opacity: [s.baseOpacity * 0.4, s.baseOpacity, s.baseOpacity * 0.4] } : undefined}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}
        {cluster2.map((s, i) => (
          <motion.circle
            key={`c2-${i}`}
            cx={s.cx} cy={s.cy} r={s.r}
            fill={s.color}
            initial={{ opacity: s.baseOpacity }}
            animate={!reduce ? { opacity: [s.baseOpacity * 0.4, s.baseOpacity, s.baseOpacity * 0.4] } : undefined}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}

        {/* Background stars */}
        {stars.map((s, i) => (
          <motion.circle
            key={`s-${i}`}
            cx={s.cx} cy={s.cy} r={s.r}
            fill={s.color}
            initial={{ opacity: s.baseOpacity }}
            animate={!reduce ? { opacity: [s.baseOpacity * 0.3, s.baseOpacity, s.baseOpacity * 0.3] } : undefined}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}

        {/* Bright "lead" stars with cross glow */}
        {brightStars.map((s, i) => (
          <motion.g
            key={`bright-${i}`}
            filter="url(#star-glow)"
            animate={!reduce ? { opacity: [0.55, 1, 0.55] } : undefined}
            transition={{ duration: 3 + s.delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          >
            <circle cx={s.cx} cy={s.cy} r={s.r * 2.8} fill={s.color === '#FFD9A0' ? '#FFD9A0' : '#E8F0FF'} opacity="0.35" />
            <circle cx={s.cx} cy={s.cy} r={s.r * 1.5} fill="white" />
            {/* Cross sparkle lines */}
            <line x1={s.cx - s.r * 4} y1={s.cy} x2={s.cx + s.r * 4} y2={s.cy} stroke="white" strokeWidth="0.35" opacity="0.5" />
            <line x1={s.cx} y1={s.cy - s.r * 4} x2={s.cx} y2={s.cy + s.r * 4} stroke="white" strokeWidth="0.35" opacity="0.5" />
            <line x1={s.cx - s.r * 2.5} y1={s.cy - s.r * 2.5} x2={s.cx + s.r * 2.5} y2={s.cy + s.r * 2.5} stroke="white" strokeWidth="0.2" opacity="0.3" />
            <line x1={s.cx + s.r * 2.5} y1={s.cy - s.r * 2.5} x2={s.cx - s.r * 2.5} y2={s.cy + s.r * 2.5} stroke="white" strokeWidth="0.2" opacity="0.3" />
          </motion.g>
        ))}
      </svg>

      {/* ── Aurora goo blobs — TLS warm palette, colour morphism ─────── */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-85"
      >
        <defs>
          <filter id="goo-warm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="50" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
          </filter>
        </defs>
        <g filter="url(#goo-warm)">
          {/* Blob 1 — yellow anchor, morphs toward deep orange */}
          <motion.circle
            cx="270" cy="430" r="145"
            fill="#F8B044"
            opacity="0.82"
            animate={!reduce ? {
              cx: [270, 450, 270],
              cy: [430, 310, 430],
              r: [145, 192, 145],
              fill: ['#F8B044', '#C06920', '#F18A4C', '#F8B044'],
            } : { fill: '#F8B044' }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Blob 2 — orange anchor, morphs toward light yellow */}
          <motion.circle
            cx="545" cy="435" r="130"
            fill="#ED843A"
            opacity="0.78"
            animate={!reduce ? {
              cx: [545, 355, 545],
              cy: [435, 545, 435],
              r: [130, 178, 130],
              fill: ['#ED843A', '#FFCB81', '#F18A4C', '#ED843A'],
            } : { fill: '#ED843A' }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Blob 3 — light yellow, drifts high, morphs to deep orange */}
          <motion.circle
            cx="400" cy="235" r="95"
            fill="#FFCB81"
            opacity="0.65"
            animate={!reduce ? {
              cx: [400, 510, 400],
              cy: [235, 625, 235],
              r: [95, 140, 95],
              fill: ['#FFCB81', '#F8B044', '#ED843A', '#FFCB81'],
            } : { fill: '#FFCB81' }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </g>
      </svg>

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_25%,rgba(8,12,24,0.65)_100%)]"
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
      <VariantSection number={3} title="Stellar Aurora" subtitle="Space noir + TLS warm · ton cosmique" animTag="Starfield + colour morph goo">
        <Variant6Stellar />
      </VariantSection>
    </div>
  );
};

export default PreviewErrorVariants;
