/**
 * VideoScrollStory — Storytelling immersif
 * La vidéo reste fixée en fond, 4 chapitres apparaissent au scroll.
 * Desktop : sticky 400vh · Mobile : stacked.
 */

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
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
    eyebrow: 'La communauté',
    title: 'Vous rejoignez une communauté',
    body: '200+ formateurs certifiés qui partagent, expérimentent, et font évoluer la pédagogie augmentée ensemble.',
  },
] as const;

export const VideoScrollStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
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

  return (
    <>
      {/* ── Desktop : sticky scroll story ────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: `${CHAPTERS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden bg-ink-900">

          {/* Vidéo en fond */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            aria-hidden
            tabIndex={-1}
            ref={(el) => {
              if (el && el.paused) el.play().catch(() => {});
            }}
          >
            <source src="/videos/aquarelle-nuages-orange-teal-8s.mp4" type="video/mp4" />
          </video>

          {/* Scrim : gauche foncé → droite transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/88 via-ink-900/60 to-ink-900/10" />
          {/* Scrim de base léger */}
          <div className="absolute inset-0 bg-ink-900/15" />

          {/* Label section */}
          <div className="absolute top-10 left-10 md:left-16">
            <p className="font-body text-caption font-bold text-white/35 uppercase tracking-widest m-0">
              Le parcours
            </p>
          </div>

          {/* Compteur chapitre */}
          <div className="absolute top-10 right-10 md:right-16">
            <p className="font-body text-caption text-white/35 m-0 tabular-nums">
              {activeIndex + 1} / {CHAPTERS.length}
            </p>
          </div>

          {/* Panneau texte principal */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-10 md:px-16 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={reduce ? {} : { opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Dots de navigation (droite) */}
          <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {CHAPTERS.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-pill transition-all duration-[350ms] ease-standard ${
                  i === activeIndex
                    ? 'h-8 bg-accent-400'
                    : i < activeIndex
                    ? 'h-1.5 bg-white/50'
                    : 'h-1.5 bg-white/25'
                }`}
              />
            ))}
          </div>

          {/* Barre de progression en bas */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
            <motion.div
              className="h-full bg-accent-400/60"
              style={reduce ? { width: '100%' } : { width: progressWidth }}
            />
          </div>

          {/* Hint scroll (disparaît après le premier chapitre) */}
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
                  animate={reduce ? {} : { y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-px h-6 bg-white/20"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Mobile : chapitres empilés ───────────────────────────────────── */}
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
                <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                  {title}
                </h3>
                <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoScrollStory;
