/**
 * PreviewErrorVariants — Page de comparaison Phase 19.2 / Error redesign
 *
 * 6 directions visuelles, CHACUNE avec une mécanique d'animation distincte
 * et une palette/tonalité différente :
 *
 *   1. Cinematic Immersion       — Teal deep   · parallax mouse-follow + blob breathing
 *   2. Editorial Print           — Cream/ink   · typewriter reveal + slide-in
 *   3. Playful SVG Story         — Sunset warm · SVG path draw + wobble loop
 *   4. Glass Vision              — Vapor pastel · 3D tilt + watermark parallax
 *   5. Brutalist Neon            — B&W + yellow · glitch jitter + harsh transitions
 *   6. Liquid Aurora             — Aurora      · morphing blob + spring physics
 *
 * Route : /preview/error-variants
 * ⚠️ Page éphémère — supprimée après choix utilisateur.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import {
  Compass,
  Home,
  Search,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Coffee,
  MapPin,
  BookOpen,
  Lightbulb,
  Newspaper,
  Quote,
  CornerDownLeft,
  ChevronRight,
  Layers,
  Disc3,
} from 'lucide-react';
import { Button } from '../components/core/Button';

/* ─── Shared hooks ───────────────────────────────────────────────────── */

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
        className="pointer-events-none absolute -top-32 -left-32 w-[720px] h-[720px] rounded-full bg-primary-400/30 blur-ambient"
      />
      <motion.div
        aria-hidden
        animate={!parallax.reduce ? { x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full bg-accent-400/25 blur-ambient"
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

/* ─── Variant 2 : Editorial Print (typewriter + slide-in) ────────────── */

const useTypewriter = (text: string, delayMs = 50, startDelay = 0) => {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : '');
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        if (i >= text.length) { clearInterval(iv); return; }
        i++;
        setOut(text.slice(0, i));
      }, delayMs);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, delayMs, startDelay, reduce]);
  return { out, isDone: out.length === text.length };
};

const Variant2Editorial: React.FC = () => {
  const navigate = useNavigate();
  const { out: titleOut, isDone } = useTypewriter('Page introuvable.', 60, 400);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FAF6EE] flex items-center px-6 py-page">
      {/* Paper texture overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:4px_4px]" />

      <div className="relative z-base w-full max-w-page mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-section items-start">
        {/* LEFT — masthead + editorial */}
        <div className="flex flex-col gap-stack">
          {/* Masthead */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between border-b-2 border-ink-900 pb-3"
          >
            <div className="flex items-center gap-2">
              <Newspaper size={18} className="text-ink-900" />
              <span className="font-mono text-caption font-bold uppercase tracking-[0.2em] text-ink-900">The Learning Times</span>
            </div>
            <span className="font-mono text-caption text-ink-600">Vol. 404 · Erreur</span>
          </motion.div>

          {/* Headline with typewriter */}
          <motion.h1
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-[clamp(3rem,7vw,6rem)] font-black text-ink-900 leading-[0.95] tracking-tighter"
          >
            {titleOut}
            <span className={`inline-block w-[0.08em] h-[0.85em] bg-ink-900 -mb-[0.05em] ml-1 align-middle ${isDone ? 'animate-pulse' : ''}`} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="border-l-4 border-secondary-500 pl-4 max-w-2xl"
          >
            <Quote size={24} className="text-secondary-500 mb-2" />
            <p className="font-display text-body-lg italic text-ink-700 leading-relaxed">
              Tout grand explorateur a un jour pris une mauvaise rue. Cette fois-ci c'est la nôtre.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-wrap gap-stack-xs items-center mt-stack"
          >
            <button onClick={() => navigate('/dashboard')} className="group inline-flex items-baseline gap-1.5 font-display text-body-lg font-bold text-ink-900 underline decoration-secondary-500 decoration-[3px] underline-offset-4 hover:decoration-accent-500 hover:text-secondary-700 transition-colors">
              Retour à l'accueil
              <ArrowRight size={18} className="self-center group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="font-mono text-caption text-ink-400 px-2">·</span>
            <button onClick={() => navigate(-1)} className="font-body text-body text-ink-600 underline underline-offset-4 hover:text-ink-900">
              Page précédente
            </button>
          </motion.div>
        </div>

        {/* RIGHT — sidebar suggestions */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="hidden lg:block w-72 border-l-2 border-ink-900 pl-stack"
        >
          <p className="font-mono text-caption font-bold uppercase tracking-[0.15em] text-ink-900 mb-stack">Aussi à lire</p>
          <ul className="flex flex-col gap-stack-xs">
            {[
              { title: 'Parcours disponibles', meta: 'Cursus · 12 min', to: '/learning-paths' },
              { title: 'Veille & ressources', meta: 'Actu · quotidien', to: '/veille' },
              { title: 'Support apprenant', meta: 'Aide · 7j/7', to: '/messages' },
            ].map((it, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 + i * 0.1 }}
              >
                <button onClick={() => navigate(it.to)} className="group w-full text-left py-2 border-b border-ink-300 hover:border-secondary-500 transition-colors min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500">
                  <p className="font-display text-body font-bold text-ink-900 group-hover:text-secondary-700 transition-colors">{it.title}</p>
                  <p className="font-mono text-caption text-ink-500 uppercase tracking-wider mt-0.5">{it.meta}</p>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
};

/* ─── Variant 3 : Playful SVG Story (path draw + wobble) ─────────────── */

const Variant3Playful: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-accent-50 via-secondary-50/40 to-white flex flex-col items-center justify-center px-6 py-page">
      {/* Hand-drawn squiggle background */}
      <svg aria-hidden viewBox="0 0 1200 400" className="absolute inset-x-0 top-1/4 w-full h-1/2 opacity-30 pointer-events-none">
        <motion.path
          d="M 50 200 Q 200 50, 400 200 T 800 200 T 1150 200"
          fill="none" stroke="#ED843A" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </svg>

      <div className="relative z-base max-w-3xl text-center flex flex-col items-center gap-stack-lg">
        {/* Animated SVG compass with draw-in path */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="relative"
        >
          <svg viewBox="0 0 200 200" className="w-44 h-44">
            <defs>
              <radialGradient id="bowl">
                <stop offset="0%" stopColor="#FFF9EE" />
                <stop offset="100%" stopColor="#FFE6BC" />
              </radialGradient>
            </defs>
            <motion.circle cx="100" cy="100" r="88" fill="url(#bowl)" stroke="#ED843A" strokeWidth="6"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
            <motion.circle cx="100" cy="100" r="68" fill="none" stroke="#F8B044" strokeWidth="2" strokeDasharray="4 4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
            <text x="100" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3D7786">N</text>
            <text x="100" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3D7786">S</text>
            <text x="22" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3D7786">O</text>
            <text x="178" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3D7786">E</text>
            <motion.g
              animate={{ rotate: [0, -28, 22, -10, 8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <path d="M 100 40 L 92 100 L 100 70 L 108 100 Z" fill="#ED843A" />
              <path d="M 100 160 L 92 100 L 100 130 L 108 100 Z" fill="#1F3E45" />
              <circle cx="100" cy="100" r="6" fill="#1F3E45" />
            </motion.g>
          </svg>
          {/* Floating "?" badge */}
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [-5, 5, -5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-6 w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center shadow-lg border-4 border-white"
          >
            <span className="font-display text-body font-black text-white">?</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col gap-tight"
        >
          <p className="inline-flex items-center gap-2 font-mono text-caption font-bold uppercase tracking-wider text-secondary-700 justify-center">
            <Lightbulb size={14} /> Erreur 404 · une opportunité
          </p>
          <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold text-ink-900 leading-tight tracking-tight">
            Parfois <span className="italic text-secondary-600 underline decoration-accent-400 decoration-4 underline-offset-4">explorer</span> précède trouver.
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed max-w-xl mx-auto">
            Cette page n'existe pas. L'apprentissage non plus n'est jamais linéaire. Voici quelques pistes pour rebondir.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-stack w-full mt-stack"
        >
          {[
            { icon: <BookOpen size={20} />, title: 'Reprendre un parcours', to: '/learning-paths', tone: 'primary' },
            { icon: <Sparkles size={20} />, title: 'Découvrir des astuces', to: '/veille', tone: 'sun' },
            { icon: <MapPin size={20} />, title: 'Carte de la plateforme', to: '/dashboard', tone: 'warm' },
          ].map((s, i) => (
            <motion.button
              key={i}
              variants={{ hidden: { opacity: 0, y: 20, rotate: -2 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 200 } } }}
              whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
              onClick={() => navigate(s.to)}
              className="group flex flex-col items-center gap-stack-xs p-stack-lg rounded-2xl bg-white border-2 border-dashed border-ink-200 hover:border-secondary-300 hover:shadow-lg text-center cursor-pointer min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 transition-colors"
            >
              <div className={[
                'w-12 h-12 rounded-2xl flex items-center justify-center',
                s.tone === 'sun' && 'bg-accent-100 text-accent-700',
                s.tone === 'warm' && 'bg-secondary-100 text-secondary-700',
                s.tone === 'primary' && 'bg-primary-100 text-primary-700',
              ].filter(Boolean).join(' ')}>{s.icon}</div>
              <p className="font-body text-body-sm font-bold text-ink-900 m-0">{s.title}</p>
            </motion.button>
          ))}
        </motion.div>

        <Button size="lg" variant="warm" onClick={() => navigate('/dashboard')} leadingIcon={<Home size={18} />} className="mt-4">
          Retour au tableau de bord
        </Button>
      </div>
    </section>
  );
};

/* ─── Variant 4 : Glass Vision (3D tilt + watermark parallax) ────────── */

const Variant4Glass: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useMouseParallax(20);
  const tiltX = useTransform(parallax.y, [-20, 20], [4, -4]);
  const tiltY = useTransform(parallax.x, [-20, 20], [-4, 4]);
  const codeX = useTransform(parallax.x, (v) => v * 2.5);
  const codeY = useTransform(parallax.y, (v) => v * 2.5);

  return (
    <section
      onMouseMove={parallax.handleMove} onMouseLeave={parallax.reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-ink-100 via-white to-primary-50 flex items-center justify-center px-6 py-page"
    >
      <motion.div style={{ x: codeX, y: codeY }} aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-display font-black text-[clamp(20rem,45vw,40rem)] leading-none tracking-tighter bg-gradient-to-br from-primary-200/60 via-primary-300/40 to-accent-200/30 bg-clip-text text-transparent select-none">404</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        className="relative z-base w-full max-w-xl"
      >
        <div className="rounded-3xl backdrop-blur-glass-heavy backdrop-saturate-[180%] bg-white/55 border border-white/70 shadow-[0_30px_80px_-20px_rgba(85,161,180,0.35),0_10px_30px_-10px_rgba(0,0,0,0.1)] p-page-lg flex flex-col items-center text-center gap-stack-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/60 border border-white/80 text-caption font-semibold text-ink-700">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" /> Page introuvable
          </div>
          <h1 className="font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight">
            Cette page n'existe pas.
          </h1>
          <p className="font-body text-body text-ink-600 leading-relaxed">
            Vous pouvez revenir en arrière ou rejoindre votre espace.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button size="lg" onClick={() => navigate('/dashboard')} trailingIcon={<ArrowRight size={18} />}>Tableau de bord</Button>
            <Button size="lg" variant="ghost" onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ─── Variant 5 : Brutalist Neon (glitch jitter + harsh) ─────────────── */

const useGlitch = (period = 4500) => {
  const reduce = useReducedMotion();
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 280);
    }, period);
    return () => clearInterval(interval);
  }, [period, reduce]);
  return glitching;
};

const Variant5Brutalist: React.FC = () => {
  const navigate = useNavigate();
  const glitching = useGlitch(5000);
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white flex items-center justify-center px-6 py-page">
      {/* Grid pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-base max-w-4xl w-full">
        {/* Brutalist label */}
        <div className="flex items-center gap-3 mb-stack">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink-900 text-accent-400 font-mono text-caption font-bold uppercase tracking-[0.2em]">
            <span className={`w-2 h-2 ${glitching ? 'bg-secondary-500' : 'bg-accent-400'} ${!reduce && 'animate-pulse'}`} /> ERROR · 404
          </span>
          <span className="font-mono text-caption text-ink-600">SYSTEM://navigation/route/not_found</span>
        </div>

        {/* Glitched 404 */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-display font-black text-ink-900 leading-[0.85] tracking-tighter text-[clamp(7rem,18vw,14rem)] relative"
          >
            <span className="relative inline-block">
              404
              {glitching && (
                <>
                  <span aria-hidden className="absolute inset-0 text-secondary-500 mix-blend-multiply translate-x-1 -translate-y-0.5 opacity-80">404</span>
                  <span aria-hidden className="absolute inset-0 text-primary-500 mix-blend-multiply -translate-x-1 translate-y-0.5 opacity-80">404</span>
                </>
              )}
            </span>
          </motion.h1>
          <div className="absolute -top-4 right-0 inline-flex flex-col gap-1 items-end text-ink-900 font-mono text-caption font-bold uppercase tracking-wider">
            <span>PAGE</span>
            <span>NOT</span>
            <span>FOUND</span>
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
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

/* ─── Variant 6 : Liquid Aurora (morph blob + spring physics) ────────── */

const Variant6Aurora: React.FC = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0F0B2E] flex items-center justify-center px-6 py-page">
      {/* Aurora animated SVG blob */}
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute inset-0 w-full h-full opacity-90">
        <defs>
          <linearGradient id="aurora1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7B61FF" />
            <stop offset="50%" stopColor="#FF61C7" />
            <stop offset="100%" stopColor="#61D4FF" />
          </linearGradient>
          <linearGradient id="aurora2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8B044" />
            <stop offset="100%" stopColor="#FF61C7" />
          </linearGradient>
          <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <motion.circle
            cx="280" cy="380" r="160" fill="url(#aurora1)" opacity="0.7"
            animate={!reduce ? { cx: [280, 480, 280], cy: [380, 280, 380], r: [160, 200, 160] } : undefined}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="540" cy="420" r="140" fill="url(#aurora2)" opacity="0.65"
            animate={!reduce ? { cx: [540, 340, 540], cy: [420, 520, 420], r: [140, 180, 140] } : undefined}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="400" cy="200" r="110" fill="url(#aurora1)" opacity="0.5"
            animate={!reduce ? { cx: [400, 500, 400], cy: [200, 600, 200], r: [110, 150, 110] } : undefined}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>
      </svg>

      {/* Star dust */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:120px_120px]" />

      <div className="relative z-base max-w-3xl text-center flex flex-col items-center gap-stack-lg">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-pill backdrop-blur-glass-medium bg-white/10 border border-white/30 text-white/90 font-mono text-caption font-bold uppercase tracking-wider"
        >
          <Disc3 size={14} className="animate-spin" style={{ animationDuration: '8s' }} /> Errance cosmique
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
          className="font-display text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] bg-gradient-to-br from-white via-[#FFB8E5] to-[#A892FF] bg-clip-text text-transparent"
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill backdrop-blur-glass-medium bg-white/15 border border-white/30 text-white font-body font-semibold hover:bg-white/25 transition-colors min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-[0_8px_30px_-8px_rgba(123,97,255,0.6)]"
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
      <VariantSection number={1} title="Cinematic Immersion" subtitle="Teal deep · ton rassurant" animTag="Parallax + breathing">
        <Variant1Cinematic />
      </VariantSection>
      <VariantSection number={2} title="Editorial Print" subtitle="Cream + ink · ton journalistique" animTag="Typewriter + slide-in">
        <Variant2Editorial />
      </VariantSection>
      <VariantSection number={3} title="Playful SVG Story" subtitle="Sunset warm · ton educational" animTag="SVG path draw + wobble">
        <Variant3Playful />
      </VariantSection>
      <VariantSection number={4} title="Glass Vision" subtitle="Vapor pastel · ton premium minimal" animTag="3D tilt + watermark">
        <Variant4Glass />
      </VariantSection>
      <VariantSection number={5} title="Brutalist Neon" subtitle="B&W + accent yellow · ton technique" animTag="Glitch + harsh shadows">
        <Variant5Brutalist />
      </VariantSection>
      <VariantSection number={6} title="Liquid Aurora" subtitle="Aurora purple/pink · ton cosmic" animTag="Morphing blob + spring">
        <Variant6Aurora />
      </VariantSection>
    </div>
  );
};

export default PreviewErrorVariants;
