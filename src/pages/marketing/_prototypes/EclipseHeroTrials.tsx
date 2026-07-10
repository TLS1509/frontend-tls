/**
 * EclipseHeroTrials — comparaison des 3 essais vidéo "éclipse → lumière"
 * (10/07/2026), demandés après le glow code-only déjà en prod.
 *
 * Chaque section reprend le traitement EXACT du Hero de production (vignette,
 * H1, sous-titre, CTA) pour une comparaison à armes égales — seule la vidéo de
 * fond change. Toutes générées avec ffmpeg/PIL à partir d'assets déjà en local
 * ou de formes générées : aucun coût de génération.
 *
 * 1. Crossfade teal→or (aquarelle-nuages-orange-teal-8s.mp4 → -dore-ambre-8s.mp4)
 * 2. Glow radial sur le hero actuel (screen blend, révélé au chargement)
 * 3. Schéma éclipse littéral (disque sombre qui glisse pour révéler le disque doré)
 *
 * Route cachée /website/_eclipse-trials — pas indexée, pas liée dans la nav.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { MagneticButton } from '../../../components/marketing/motion';

type Variant = {
  id: string;
  label: string;
  note: string;
  videoSrc: string;
  posterSrc: string;
};

const VARIANTS: Variant[] = [
  {
    id: 'crossfade',
    label: '1 · Crossfade teal → or',
    note:
      "Deux aquarelles existantes enchaînées (fondu à mi-parcours). Palette agréable, mais les deux phases restent claires — l'écart \"éclipse (sombre) → lumière\" est plus une histoire de teinte que de contraste réel.",
    videoSrc: '/videos/eclipse-crossfade-teal-gold.mp4',
    posterSrc: '/images/bg-frames/eclipse-crossfade-poster.jpg',
  },
  {
    id: 'radial-glow',
    label: '2 · Glow radial sur le hero actuel',
    note:
      "Lueur dorée composée en mode 'screen' sur l'aquarelle déjà en prod, révélée au chargement. Look le plus proche de la home actuelle (même vidéo de base) — juste une lumière qui apparaît derrière le texte.",
    videoSrc: '/videos/eclipse-radial-glow-hero.mp4',
    posterSrc: '/images/bg-frames/eclipse-radial-glow-poster.jpg',
  },
  {
    id: 'schema',
    label: '3 · Schéma éclipse littéral',
    note:
      "Disque sombre qui glisse pour révéler un disque doré (accent-400) — dessin généré, pas une aquarelle. Le plus lisible conceptuellement, mais rupture de style avec le reste du site (peint → géométrique).",
    videoSrc: '/videos/eclipse-schema-diagram.mp4',
    posterSrc: '/images/bg-frames/eclipse-schema-poster.jpg',
  },
];

const TrialHero: React.FC<{ variant: Variant }> = ({ variant }) => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.1]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-black">
      <span className="absolute top-4 left-4 z-toast inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-white/90 text-ink-900 font-body text-caption font-bold">
        {variant.label}
      </span>

      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale }}
        aria-hidden
      >
        {reduced ? (
          <img src={variant.posterSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={variant.posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src={variant.videoSrc} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 52%, rgba(15,42,48,0.60) 0%, rgba(15,42,48,0.34) 44%, rgba(15,42,48,0) 78%)',
        }}
      />

      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <div className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg">
          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[30ch] text-[clamp(3rem,7vw,5.5rem)]">
            L'IA n'éclipse pas vos formateurs.{' '}
            <span className="text-accent-400">Elle les met en lumière.</span>
          </h1>

          <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-[62ch]">
            The Learning Society aide organisations et professionnels à maîtriser
            l'IA en formation : une formation certifiante, une Learning App
            adaptative et un accompagnement sur mesure. Sans perdre l'humain au centre.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
            <MagneticButton strength={14}>
              <Button to="/website/accompagnement" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Je représente une entreprise
              </Button>
            </MagneticButton>
            <Button to="/website/learning-app" variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Me former
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-toast max-w-2xl px-6 text-center">
        <p className="font-body text-caption text-white/70 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 m-0">
          {variant.note}
        </p>
      </div>
    </section>
  );
};

export const EclipseHeroTrials: React.FC = () => (
  <div className="bg-black">
    <div className="fixed top-4 right-4 z-modal">
      <Link
        to="/website"
        className="inline-flex items-center gap-tight px-4 py-2 rounded-pill bg-white text-ink-900 font-body text-caption font-bold shadow-card-lift"
      >
        ← Retour à la home
      </Link>
    </div>
    {VARIANTS.map((v) => (
      <TrialHero key={v.id} variant={v} />
    ))}
  </div>
);

export default EclipseHeroTrials;
