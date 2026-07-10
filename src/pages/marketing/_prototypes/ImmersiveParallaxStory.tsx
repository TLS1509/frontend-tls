/**
 * ImmersiveParallaxStory — essai "très immersif, transitions mega smooth"
 * (10/07/2026), sans le ban parallax/scroll-jack — décision explicite de
 * l'utilisateur après relecture des vidéos Media Vault (le ban venait d'une
 * session précédente, pas d'une demande produit).
 *
 * Base : VideoScrollStory.tsx (déjà en prod dans /website/_v2-chemin),
 * enrichi de vraie profondeur :
 *  - ParallaxLayer (déjà existant, src/components/marketing/motion) sur la
 *    vidéo ET sur le texte, à des amplitudes différentes → vraie parallaxe
 *    multi-couches, pas un simple fade au scroll.
 *  - Ken Burns continu sur la vidéo (scale lent, indépendant du scroll) pour
 *    une sensation "vivante" en continu, pas seulement réactive au scroll.
 *  - Transitions texte en spring physics (scale + blur + y), pas un simple
 *    duration/ease — plus organique, "mega smooth" au sens où le mouvement
 *    a une vraie inertie.
 *
 * Route cachée /website/_immersive-parallax-story — essai, pas en prod.
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';

const CHAPTERS = [
  {
    eyebrow: 'Point de départ',
    title: 'Vous arrivez avec vos intuitions',
    body: "Pas besoin d'être expert IA. Juste curieux, motivé, prêt à expérimenter. Nous vous rencontrons là où vous en êtes.",
  },
  {
    eyebrow: 'La découverte',
    title: 'Vous découvrez une autre manière',
    body: 'Le Formateur Augmenté ne remplace rien. Il ajoute une dimension : la personnalisation à grande échelle.',
  },
  {
    eyebrow: 'La construction',
    title: 'Vous construisez vos parcours',
    body: 'Concevoir des expériences qui transforment vraiment. Avec des outils, oui, mais surtout avec un cadre pédagogique solide.',
  },
  {
    eyebrow: 'La preuve',
    title: 'Vous en sortez avec une preuve',
    body: "Chaque parcours enrichit votre Passeport de Compétences. Un Open Badge vérifiable, pas une promesse en l'air.",
  },
] as const;

export const ImmersiveParallaxStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * CHAPTERS.length), CHAPTERS.length - 1);
    setActiveIndex(idx);
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Profondeur : la vidéo dérive légèrement plus lentement que le texte —
  // vraie parallaxe multi-couches (amplitudes différentes), pas un simple fade.
  const videoY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 30]);
  const eyebrowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [10, -10]);
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [22, -22]);

  const springTransition = { type: 'spring' as const, stiffness: 140, damping: 20, mass: 0.9 };

  return (
    <>
      <section
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: `${CHAPTERS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-ink-900">
          {/* Vidéo — dérive parallax légère + Ken Burns continu indépendant du scroll */}
          <motion.div className="absolute inset-0" style={{ y: videoY }}>
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden
              tabIndex={-1}
              initial={{ scale: 1.06 }}
              animate={reduced ? { scale: 1.06 } : { scale: [1.06, 1.14, 1.06] }}
              transition={reduced ? undefined : { duration: 24, repeat: Infinity, ease: 'easeInOut' }}
              ref={(el) => {
                if (el && el.paused) el.play().catch(() => {});
              }}
            >
              <source src="/videos/bosch-jardin-terrestre-teal-15s.mp4" type="video/mp4" />
            </motion.video>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/55 to-ink-900/10" />
          <div className="absolute inset-0 bg-ink-900/10" />

          <motion.div style={{ y: eyebrowY }} className="absolute top-10 left-10 md:left-16">
            <p className="font-body text-caption font-bold text-white/35 uppercase tracking-widest m-0">
              Le parcours
            </p>
          </motion.div>

          <div className="absolute top-10 right-10 md:right-16">
            <p className="font-body text-caption text-white/35 m-0 tabular-nums">
              {activeIndex + 1} / {CHAPTERS.length}
            </p>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="px-10 md:px-16 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={reduced ? {} : { opacity: 0, y: 36, scale: 0.97, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={reduced ? {} : { opacity: 0, y: -24, scale: 0.98, filter: 'blur(4px)' }}
                  transition={springTransition}
                  style={{ y: titleY }}
                  className="flex flex-col gap-stack"
                >
                  <span className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">
                    {CHAPTERS[activeIndex].eyebrow}
                  </span>
                  <h2
                    className="font-display font-extrabold text-white leading-[1.05] tracking-display m-0"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
                  >
                    {CHAPTERS[activeIndex].title}
                  </h2>
                  <p className="font-body text-body-lg text-white/75 leading-relaxed m-0 max-w-md">
                    {CHAPTERS[activeIndex].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {CHAPTERS.map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: i === activeIndex ? 32 : 6 }}
                transition={springTransition}
                className={`w-1.5 rounded-pill ${
                  i === activeIndex ? 'bg-accent-400' : i < activeIndex ? 'bg-white/50' : 'bg-white/25'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
            <motion.div
              className="h-full bg-accent-400/60"
              style={reduced ? { width: '100%' } : { width: progressWidth }}
            />
          </div>

          <AnimatePresence>
            {activeIndex === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                aria-hidden
              >
                <span className="font-body text-caption text-white/30 uppercase tracking-widest">
                  Défiler
                </span>
                <motion.div
                  animate={reduced ? {} : { y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-px h-6 bg-white/20"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile : chapitres empilés, pas de pin */}
      <section className="md:hidden py-page bg-white">
        <div className="max-w-xl mx-auto px-6 flex flex-col gap-page">
          <div className="flex flex-col gap-stack">
            <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
              Le parcours
            </span>
            <h2 className="font-display text-h1 font-extrabold text-ink-900 leading-[1.05] tracking-display m-0">
              Votre chemin en 4 chapitres.
            </h2>
          </div>
          <div className="flex flex-col gap-section">
            {CHAPTERS.map(({ eyebrow, title, body }) => (
              <div key={eyebrow} className="flex flex-col gap-stack">
                <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                  {eyebrow}
                </span>
                <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">{title}</h3>
                <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ImmersiveParallaxStory;
