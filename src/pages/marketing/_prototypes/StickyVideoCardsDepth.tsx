/**
 * StickyVideoCardsDepth — v2 "très immersif" de StickyVideoCards (10/07/2026).
 *
 * Même base (vidéo pinnée, cartes qui apparaissent 2 gauche/2 droite — cf.
 * StickyVideoCards.tsx pour le contexte Media Vault), enrichi de profondeur
 * réelle maintenant que le ban parallax est levé (décision utilisateur) :
 *  - Vidéo : Ken Burns continu (scale lent, indépendant du scroll) + léger
 *    drift parallax lié au scroll (amplitude faible, la vidéo reste le
 *    repère stable).
 *  - Cartes gauche vs droite : dérivent à des vitesses DIFFÉRENTES l'une de
 *    l'autre (vraie parallaxe multi-couches, pas juste un fade synchronisé).
 *  - Entrée en spring physics (scale + blur + position), pas un simple
 *    opacity/x linéaire — plus organique, plus "smooth".
 *  - Vidéo = eclipse-radial-glow-hero.mp4 (déjà la lueur dorée intégrée,
 *    raccord direct avec le H1 "...Elle les met en lumière.").
 *
 * Route cachée /website/_sticky-video-cards-depth — essai, pas en prod.
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { GraduationCap, Sparkles, Compass, BadgeCheck } from 'lucide-react';

type Card = {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  side: 'left' | 'right';
  at: number;
};

const CARDS: Card[] = [
  {
    icon: <GraduationCap size={20} />,
    eyebrow: 'Formation',
    title: 'Formation certifiante',
    desc: 'Formateur Augmenté, méthode STRIDE, Open Badge vérifiable.',
    side: 'left',
    at: 0.18,
  },
  {
    icon: <Sparkles size={20} />,
    eyebrow: 'Plateforme',
    title: 'Learning App adaptative',
    desc: 'Passeport Dreyfus, coaching intégré, matching IA.',
    side: 'right',
    at: 0.36,
  },
  {
    icon: <Compass size={20} />,
    eyebrow: 'Conseil',
    title: 'Accompagnement STRIDE',
    desc: 'Audit, déploiement, pilotage — aux côtés de vos équipes.',
    side: 'left',
    at: 0.54,
  },
  {
    icon: <BadgeCheck size={20} />,
    eyebrow: 'Preuve',
    title: 'Open Badge vérifiable',
    desc: 'Une preuve de compétence numérique, partageable et durable.',
    side: 'right',
    at: 0.72,
  },
];

const springTransition = { type: 'spring' as const, stiffness: 160, damping: 22, mass: 0.8 };

const CardSlot: React.FC<{ card: Card; progress: MotionValue<number>; depthY: MotionValue<number> }> = ({
  card,
  progress,
  depthY,
}) => {
  const reveal = useTransform(progress, [card.at, card.at + 0.1], [0, 1]);
  const opacity = reveal;
  const x = useTransform(reveal, [0, 1], card.side === 'left' ? [-36, 0] : [36, 0]);
  const scale = useTransform(reveal, [0, 1], [0.92, 1]);
  const blur = useTransform(reveal, [0, 1], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ opacity, x, scale, filter, y: depthY }}
      transition={springTransition}
      className="w-64 rounded-2xl bg-white/95 backdrop-blur-glass-light border border-ink-100 shadow-card-lift p-stack flex flex-col gap-stack-xs pointer-events-none"
    >
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 text-primary-700">
        {card.icon}
      </span>
      <span className="font-body text-micro font-bold text-ink-400 uppercase tracking-wider">
        {card.eyebrow}
      </span>
      <p className="font-display text-body font-extrabold text-ink-900 m-0 leading-tight">{card.title}</p>
      <p className="font-body text-caption text-ink-600 leading-relaxed m-0">{card.desc}</p>
    </motion.div>
  );
};

export const StickyVideoCardsDepth: React.FC = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Profondeur : gauche et droite dérivent à des vitesses différentes l'une
  // de l'autre — c'est ça qui crée la vraie sensation de parallaxe (pas
  // juste "les deux fondent en même temps").
  const leftDepthY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [10, -40]);
  const rightDepthY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-10, 30]);
  const videoDriftY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-16, 16]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [18, -18]);

  const leftCards = CARDS.filter((c) => c.side === 'left');
  const rightCards = CARDS.filter((c) => c.side === 'right');

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: reduced ? 'auto' : '320vh' }}>
      <div className="sticky top-0 min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Vidéo pinnée : Ken Burns continu + léger drift lié au scroll */}
        <motion.div className="absolute inset-0" style={{ y: videoDriftY }}>
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.04 }}
            animate={reduced ? { scale: 1.04 } : { scale: [1.04, 1.12, 1.04] }}
            transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            ref={(el) => {
              if (el && el.paused) el.play().catch(() => {});
            }}
          >
            <source src="/videos/eclipse-radial-glow-hero.mp4" type="video/mp4" />
          </motion.video>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 50%, rgba(15,42,48,0.30) 0%, rgba(15,42,48,0.62) 100%)',
            }}
          />
        </motion.div>

        {/* Titre central, sa propre profondeur */}
        <motion.div style={{ y: titleY }} className="relative z-base text-center px-6 max-w-xl">
          <h2 className="font-display font-extrabold text-white leading-[1.05] tracking-tight m-0 text-[clamp(2rem,4.5vw,3.25rem)]">
            Une méthode, <span className="text-accent-400">quatre piliers</span>.
          </h2>
        </motion.div>

        <div className="hidden lg:flex absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 flex-col gap-stack z-base">
          {leftCards.map((c) => (
            <CardSlot key={c.title} card={c} progress={scrollYProgress} depthY={leftDepthY} />
          ))}
        </div>

        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col gap-stack z-base">
          {rightCards.map((c) => (
            <CardSlot key={c.title} card={c} progress={scrollYProgress} depthY={rightDepthY} />
          ))}
        </div>

        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 flex flex-col gap-stack-xs z-base">
          {CARDS.map((c) => (
            <div key={c.title} className="w-full rounded-xl bg-white/95 p-stack-xs flex items-center gap-stack-xs">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 text-primary-700 shrink-0">
                {c.icon}
              </span>
              <p className="font-body text-caption font-bold text-ink-900 m-0">{c.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StickyVideoCardsDepth;
