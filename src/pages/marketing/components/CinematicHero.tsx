/**
 * CinematicHero v5 — "Plonger dans l'aquarelle"
 *
 * Comportement :
 *   1. Page charge → overlay gradient aquarelle (warm → teal) en attente
 *   2. Vidéo prête → overlay disparaît, vidéo joue UNE FOIS (build-up aquarelle)
 *   3. Fin vidéo → freeze automatique sur dernière frame (aquarelle complète)
 *   4. Scroll → fond monte lentement + légère dilatation
 *              → sensation de descendre dans la peinture
 *   5. Contenu (h1 + carte) disparaît progressivement sur les 25% premiers du scroll
 *
 * Structure scroll-driven :
 *   - div container (220vh) — fournit la distance de scroll
 *   - section sticky top-0 h-screen — reste dans le viewport
 *   - VideoBackground : gère canPlay (loading overlay) + transforms scroll
 *   - motion.div contenu : opacity + y liés au scroll
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, ArrowUpRight, Award, BookOpen } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { MagneticButton } from '../../../components/marketing/motion';

const EASE_EMPHASIS = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH   = [0.25, 0.46, 0.45, 0.94] as const;

const SWAP_WORDS = ['forment', 'conçoivent', 'accompagnent', 'transmettent'];

// ─── Word swap ─────────────────────────────────────────────────────────────────
const WordSwap: React.FC = () => {
  const reduce = useReducedMotion();
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % SWAP_WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const longest = SWAP_WORDS.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className="relative inline-grid align-baseline">
      <span aria-hidden className="invisible col-start-1 row-start-1 text-secondary-600">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={SWAP_WORDS[i]}
            className="inline-block text-secondary-600 will-change-transform"
            initial={reduce ? false : { y: '0.5em', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? undefined : { y: '-0.5em', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE_EMPHASIS }}
          >
            {SWAP_WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

// ─── Fond vidéo — scroll-driven descent ───────────────────────────────────────
const VideoBackground: React.FC<{
  reduce: boolean;
  bgY: MotionValue<number>;
  bgScale: MotionValue<number>;
}> = ({ reduce, bgY, bgScale }) => {
  const [canPlay, setCanPlay] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // React doesn't propagate the `muted` prop to the DOM attribute (known React bug).
  // Chrome blocks autoplay on unmuted video → set it imperatively via ref.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/*
        Pas de loop, pas d'onTimeUpdate.
        La vidéo joue une fois et freeze naturellement sur la dernière frame.
        scale(1.2) absorbe le bleed dû au déplacement bgY.
      */}
      <motion.div
        className="absolute inset-0"
        style={{
          y:     reduce ? undefined : bgY,
          scale: reduce ? undefined : bgScale,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={() => setCanPlay(true)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
          tabIndex={-1}
        >
          <source src="/videos/aquarelle-hero-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay chargement — gradient aquarelle orange→teal, disparaît sur canPlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          canPlay ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ background: 'linear-gradient(135deg, #ffd4a8 0%, #b9d7df 55%, #96C3CF 100%)' }}
        aria-hidden
      />

      {/* Voile de lisibilité — contraste texte ink-900 */}
      <div className="absolute inset-0 bg-white/30" />
    </div>
  );
};

// ─── Carte glass de l'app TLS ──────────────────────────────────────────────────
const AppGlassCard: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <div className="relative w-full max-w-[340px] mx-auto">

    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.95)',
        boxShadow:
          '0 20px 56px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
      }}
      initial={reduce ? false : { opacity: 0, x: 40, y: 18 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE_EMPHASIS }}
    >
      <div className="p-5 flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <span className="font-body text-micro font-semibold text-ink-400 uppercase tracking-widest">
            Formation en cours
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-primary-50 border border-primary-100">
            <span className="w-1.5 h-1.5 rounded-pill bg-accent-400" />
            <span className="font-body text-micro font-semibold text-primary-700">Module 3/5</span>
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="font-display font-bold text-ink-900 text-body-lg m-0 leading-tight">
            Formateur Augmenté
          </p>
          <p className="font-body text-caption text-ink-500 m-0">
            Pédagogie IA &amp; conception augmentée
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-body text-micro text-ink-400">Progression</span>
            <span className="font-body text-micro font-semibold text-secondary-600">67%</span>
          </div>
          <div className="h-1.5 rounded-pill overflow-hidden bg-ink-100">
            <motion.div
              className="h-full rounded-pill bg-secondary-500"
              initial={reduce ? false : { width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 1.2, delay: 0.85, ease: EASE_SMOOTH }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-primary-50 border border-primary-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary-100">
            <BookOpen size={14} className="text-primary-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body text-micro text-ink-400">Prochaine leçon</span>
            <span className="font-body text-caption font-semibold text-ink-800 leading-tight truncate">
              L'IA générative en pédagogie
            </span>
          </div>
          <ArrowRight size={14} className="text-ink-300 shrink-0 ml-auto" />
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-ink-100">
          <div className="flex -space-x-1.5">
            {[
              { bg: 'rgba(85,161,180,0.25)',  text: '#2F5F6A', label: 'M' },
              { bg: 'rgba(237,132,58,0.25)',  text: '#C06920', label: 'S' },
              { bg: 'rgba(248,176,68,0.28)',  text: '#A07010', label: 'A' },
            ].map(({ bg, text, label }) => (
              <div
                key={label}
                className="w-5 h-5 rounded-pill flex items-center justify-center text-[8px] font-bold border border-white"
                style={{ background: bg, color: text }}
              >
                {label}
              </div>
            ))}
          </div>
          <span className="font-body text-micro text-ink-400">+24 formateurs en cours</span>
        </div>
      </div>
    </motion.div>

    {/* Badge Open Badge */}
    <motion.div
      className="absolute -bottom-4 -left-5 rounded-xl px-3 py-2 flex items-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(248,176,68,0.32)',
        boxShadow: '0 8px 24px rgba(248,176,68,0.18), 0 2px 8px rgba(0,0,0,0.06)',
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.78, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: EASE_EMPHASIS }}
    >
      <Award size={14} className="text-accent-500 shrink-0" />
      <span className="font-body text-caption font-semibold text-ink-800">Open Badge vérifié</span>
    </motion.div>

    {/* Notification coach */}
    <motion.div
      className="absolute -top-3 -right-4 rounded-xl px-3 py-2 flex items-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(85,161,180,0.22)',
        boxShadow: '0 8px 24px rgba(85,161,180,0.12), 0 2px 8px rgba(0,0,0,0.05)',
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.78, y: -14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.15, ease: EASE_EMPHASIS }}
    >
      <div
        className="w-5 h-5 rounded-pill flex items-center justify-center text-[9px] font-bold shrink-0"
        style={{ background: 'rgba(85,161,180,0.22)', color: '#2F5F6A' }}
      >
        S
      </div>
      <div className="flex flex-col">
        <span className="font-body text-micro font-semibold text-ink-800 leading-none">Sophie · Coach</span>
        <span className="font-body text-micro text-ink-400 leading-none mt-0.5">Feedback reçu</span>
      </div>
      <span className="relative flex w-2 h-2 ml-0.5 shrink-0">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-pill bg-primary-400"
          animate={reduce ? undefined : { scale: [1, 2.2], opacity: [0.65, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="relative inline-flex w-2 h-2 rounded-pill bg-primary-500" />
      </span>
    </motion.div>

    {/* Pill Passeport */}
    <motion.div
      className="absolute -bottom-4 -right-5 inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1.5"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(85,161,180,0.22)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.45, ease: EASE_EMPHASIS }}
    >
      <span className="relative flex h-2 w-2">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-pill bg-primary-500"
          animate={reduce ? undefined : { scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-pill bg-primary-600" />
      </span>
      <span className="font-body text-caption font-semibold text-ink-700">Passeport vérifiable</span>
    </motion.div>
  </div>
);

// ─── Entrée transform-only ─────────────────────────────────────────────────────
const SettleIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  from?: string;
  delay?: number;
}> = ({ children, className = '', from = 'translateY(16px)', delay = 0 }) => {
  const reduce = useReducedMotion();
  const [settled, setSettled] = React.useState(!!reduce);
  React.useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, [reduce]);
  return (
    <div
      className={className}
      style={{
        transform: settled ? 'none' : from,
        transition: `transform 820ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────
export const CinematicHero: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Fond : monte sur 200px pendant tout le scroll → plongée dans la peinture
  const bgY    = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.12]);

  // Contenu : disparaît sur tout le scroll-jack (pas juste les 25% premiers)
  // pour qu'il n'y ait pas de fond vide qui "tient" avant le relâchement
  // du sticky — le texte s'efface pile au moment où la section suivante arrive.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.9], [0, -32]);

  return (
    // Container = exactement 100vh (2026-07-03, réduit de 220vh → 140vh → 115vh
    // → 100vh) : à 100vh le conteneur fait la même hauteur que la section
    // sticky interne, donc il n'y a plus AUCUNE distance de scroll "morte"
    // réservée après la disparition du contenu — la section suivante arrive
    // immédiatement après le hero, sans bande de fond vide entre les deux.
    <div ref={containerRef} style={{ minHeight: '100vh' }}>

      {/* Section sticky — reste dans le viewport pendant le défilement */}
      <section className="sticky top-0 h-screen overflow-hidden bg-primary-50">

        <VideoBackground reduce={reduce} bgY={bgY} bgScale={bgScale} />

        {/* Contenu — disparaît progressivement au scroll */}
        <motion.div
          className="absolute inset-0 flex items-center w-full"
          style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <div className="w-full max-w-wide mx-auto px-6 py-page">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-center">

              {/* Gauche : texte */}
              <SettleIn className="lg:col-span-6 flex flex-col gap-stack-lg" delay={80}>

                <h1 className="font-display font-extrabold text-ink-900 leading-[0.96] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.6rem,5.8vw,5rem)]">
                  Ce que l'IA change
                  <br />
                  pour ceux qui <WordSwap />.
                </h1>

                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[520px]">
                  La formation certifiante et la plateforme qui apprennent aux
                  formateurs à intégrer l'IA dans leur pédagogie. En gardant
                  l'humain au centre.
                </p>

                <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                  <MagneticButton strength={14}>
                    <Button to="/website/learning-app" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Découvrir la formation
                    </Button>
                  </MagneticButton>
                  <Button to="/website/learning-app" variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                    Explorer la plateforme
                  </Button>
                </div>

              </SettleIn>

              {/* Droite : carte glass */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end pt-section lg:pt-0">
                <SettleIn from="translateX(36px)" delay={260}>
                  <AppGlassCard reduce={reduce} />
                </SettleIn>
              </div>

            </div>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default CinematicHero;
