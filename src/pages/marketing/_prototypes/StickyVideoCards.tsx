/**
 * StickyVideoCards — essai "vidéo pinnée + cartes qui apparaissent au scroll"
 * (10/07/2026), technique repérée dans le Media Vault ("Claude Fable 5 Just
 * Changed Web Design Forever!", transcript lu en entier) : la vidéo reste
 * fixe pendant que l'utilisateur scrolle, et 4 cartes de texte (2 à gauche,
 * 2 à droite) apparaissent progressivement autour d'elle. Différent du
 * "zoom au scroll" déjà en prod (Hero scale 1→1.15) — ici la vidéo NE bouge
 * PAS, seul le texte autour se construit.
 *
 * Contenu des cartes = les 4 vrais piliers déjà établis ailleurs sur le site
 * (Formation, Learning App, Accompagnement STRIDE, Open Badge) — pas un
 * texte de démo générique, pour juger la lisibilité avec du vrai contenu.
 *
 * Route cachée /website/_sticky-video-cards — essai, pas en prod.
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
  /** Seuil de progression du scroll (0-1) à partir duquel la carte apparaît. */
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

const CardSlot: React.FC<{ card: Card; progress: MotionValue<number> }> = ({ card, progress }) => {
  const opacity = useTransform(progress, [card.at, card.at + 0.08], [0, 1]);
  const x = useTransform(
    progress,
    [card.at, card.at + 0.08],
    card.side === 'left' ? [-24, 0] : [24, 0]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={`w-64 rounded-2xl bg-white/95 backdrop-blur-glass-light border border-ink-100 shadow-card-lift p-stack flex flex-col gap-stack-xs pointer-events-none`}
    >
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 text-primary-700">
        {card.icon}
      </span>
      <span className="font-body text-micro font-bold text-ink-400 uppercase tracking-wider">
        {card.eyebrow}
      </span>
      <p className="font-display text-body font-extrabold text-ink-900 m-0 leading-tight">
        {card.title}
      </p>
      <p className="font-body text-caption text-ink-600 leading-relaxed m-0">{card.desc}</p>
    </motion.div>
  );
};

export const StickyVideoCards: React.FC = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const leftCards = CARDS.filter((c) => c.side === 'left');
  const rightCards = CARDS.filter((c) => c.side === 'right');

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: reduced ? 'auto' : '320vh' }}>
      <div className="sticky top-0 min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Vidéo pinnée — ne bouge pas, pas de scale/zoom ici (contrairement au Hero prod) */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
            <source src="/videos/aquarelle-hero-loop.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 50%, rgba(15,42,48,0.35) 0%, rgba(15,42,48,0.65) 100%)',
            }}
          />
        </div>

        {/* Titre central, toujours visible */}
        <div className="relative z-base text-center px-6 max-w-xl">
          <h2 className="font-display font-extrabold text-white leading-[1.05] tracking-tight m-0 text-[clamp(2rem,4.5vw,3.25rem)]">
            Une méthode, <span className="text-accent-400">quatre piliers</span>.
          </h2>
        </div>

        {/* Cartes gauche */}
        <div className="hidden lg:flex absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 flex-col gap-stack z-base">
          {leftCards.map((c) => (
            <CardSlot key={c.title} card={c} progress={scrollYProgress} />
          ))}
        </div>

        {/* Cartes droite */}
        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col gap-stack z-base">
          {rightCards.map((c) => (
            <CardSlot key={c.title} card={c} progress={scrollYProgress} />
          ))}
        </div>

        {/* Mobile fallback : cartes empilées sous le titre, pas de scroll-pin (trop de bricolage sur petit écran) */}
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

export default StickyVideoCards;
