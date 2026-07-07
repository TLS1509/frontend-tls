/**
 * MarketingHomeCinematic — Immersive hero avec vidéo full-screen cinématique
 *
 * Direction : Cinematic reveal (4-6s video autoplay muted) + hero content
 * fade-in over video + scroll-driven sections avec semi-transparent bg
 * permettant à la vidéo de "persister" visuellement sous les sections.
 *
 * Structure : Hero vidéo immersif · Conviction · Pour qui · 3 piliers ·
 * CTA final. (Pas de section Méthode STRIDE / Auto-diagnostic / Preuve —
 * volontairement plus courte que les autres variantes, la vidéo hero est
 * le moment signature.)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  GraduationCap,
  Building2,
  Smartphone,
  Lightbulb,
  Target,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { HeroSection, ConvictionSection, OffersSection, MethodSection, CtaSection } from '../../components/marketing/sections';

// ─── Hero cinématique avec vidéo full-screen ────────────────────────────────

const CinematicHero: React.FC = () => {
  const reduced = useReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-black">
      {/* Video full-screen background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {reduced ? (
          <img
            src="/marketing/assets/hero-watercolor.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/marketing/assets/hero-watercolor.webp"
            className="absolute inset-0 w-full h-full object-cover"
            tabIndex={-1}
          >
            <source src="/videos/aquarelle-hero-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Scrim overlay légère (noir transparent) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />

      {/* Hero content — fade-in et centré */}
      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg"
        >
          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[24ch] text-[clamp(3rem,7vw,5.5rem)]">
            Vos formateurs,{' '}
            <span className="text-accent-400">
              augmentés par l'IA
            </span>
            .
          </h1>

          <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-[58ch]">
            Formation certifiante, Learning App adaptative, accompagnement sur mesure.
            Tout pour maîtriser l'IA sans perdre l'humain au centre.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
            <MagneticButton strength={14}>
              <Button
                to="/website/accompagnement"
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight size={18} />}
              >
                Je représente une entreprise
              </Button>
            </MagneticButton>
            <Button to="/website/learning-app" variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Me former
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Section avec bg semi-transparent (vidéo visible derrière) ───────────────

const SectionWithVideoUnderlay: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <section className={`relative bg-white/85 backdrop-blur-sm py-page ${className}`}>
    <div className="relative max-w-page mx-auto px-6">
      {children}
    </div>
  </section>
);

const Conviction: React.FC = () => (
  <SectionWithVideoUnderlay>
    <FadeInWhenVisible className="max-w-[40ch] mx-auto text-center flex flex-col gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 [text-wrap:balance] text-[clamp(2rem,4vw,3.25rem)] leading-tight">
        L'enjeu n'est pas de produire{' '}
        <span className="text-primary-600">plus de contenu</span>.
      </h2>
      <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
        C'est de produire des apprenants augmentés. Des professionnels qui maîtrisent
        l'IA sans s'y soumettre.
      </p>
    </FadeInWhenVisible>
  </SectionWithVideoUnderlay>
);

// ─── Pour qui ────────────────────────────────────────────────────────────────

const Audience: React.FC = () => (
  <SectionWithVideoUnderlay>
    <FadeInWhenVisible className="text-center max-w-[40ch] mx-auto mb-section-lg">
      <p className="font-body text-caption font-semibold uppercase tracking-widest text-primary-600 m-0">
        Pour qui
      </p>
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 mt-stack text-[clamp(2rem,3.5vw,2.75rem)]">
        Deux audiences, une même vision
      </h2>
    </FadeInWhenVisible>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
      {[
        {
          icon: GraduationCap,
          title: 'Formateurs indépendants',
          desc: "Se former à l'IA pédagogique, intégrer les bons outils, obtenir une certification.",
          cta: 'Devenir Formateur Augmenté',
          route: '/website/learning-app',
        },
        {
          icon: Building2,
          title: 'Organisations L&D',
          desc: 'Transformer vers une logique de compétences, accompagnement stratégique, déploiement mesurable.',
          cta: 'Consulter pour mon org',
          route: '/website/accompagnement',
        },
      ].map((item, idx) => {
        const Icon = item.icon;
        return (
          <FadeInWhenVisible key={idx} direction="up" delay={idx * 0.1}>
            <button
              onClick={() => (window.location.href = item.route)}
              className="group relative text-left h-full rounded-2xl bg-white p-stack-lg hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer border-0"
            >
              <div className="flex flex-col gap-stack-lg h-full justify-between">
                <div className="flex items-start justify-between">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-primary-50 items-center justify-center text-primary-600 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-h3 font-bold text-ink-900 m-0">{item.title}</h3>
                  <p className="font-body text-body-sm text-ink-600 mt-stack-xs leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-body-sm">
                  {item.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </FadeInWhenVisible>
        );
      })}
    </div>
  </SectionWithVideoUnderlay>
);

// ─── 3 Piliers ──────────────────────────────────────────────────────────────

const ThreePillars: React.FC = () => (
  <SectionWithVideoUnderlay>
    <FadeInWhenVisible className="text-center max-w-[45ch] mx-auto mb-section-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 [text-wrap:balance] text-[clamp(2rem,3.5vw,2.75rem)]">
        Formation, technologie, accompagnement
      </h2>
    </FadeInWhenVisible>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
      {[
        {
          icon: GraduationCap,
          title: 'Formation certifiante',
          desc: "Maîtriser l'IA pédagogique avec méthode STRIDE.",
        },
        {
          icon: Smartphone,
          title: 'Learning App',
          desc: 'Plateforme adaptative pour formateurs et apprenants.',
        },
        {
          icon: Compass,
          title: 'Accompagnement stratégique',
          desc: 'Déploiement, pilotage, mesure des compétences.',
        },
      ].map((item, idx) => {
        const Icon = item.icon;
        return (
          <FadeInWhenVisible key={idx} direction="up" delay={idx * 0.1}>
            <div className="text-center p-stack-lg rounded-xl bg-white/60 backdrop-blur-sm">
              <div className="inline-flex w-14 h-14 rounded-lg bg-accent-100 items-center justify-center text-accent-600 mb-stack">
                <Icon size={28} />
              </div>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0">{item.title}</h3>
              <p className="font-body text-body-sm text-ink-600 mt-stack leading-relaxed m-0">
                {item.desc}
              </p>
            </div>
          </FadeInWhenVisible>
        );
      })}
    </div>
  </SectionWithVideoUnderlay>
);

// ─── CTA final ───────────────────────────────────────────────────────────────

const FinalCTA: React.FC = () => (
  <SectionWithVideoUnderlay className="py-section-lg">
    <FadeInWhenVisible className="text-center flex flex-col items-center gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 text-[clamp(1.9rem,3.5vw,2.75rem)]">
        Commencez maintenant
      </h2>
      <p className="font-body text-body-lg text-ink-600 m-0 max-w-[60ch]">
        Réservez un diagnostic de maturité SBO ou lancez la découverte de la Learning App.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-xs pt-stack">
        <MagneticButton strength={14}>
          <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
            Prendre rendez-vous
          </Button>
        </MagneticButton>
        <Button to="/website/learning-app" variant="secondary" size="lg">
          Explorer la plateforme
        </Button>
      </div>
    </FadeInWhenVisible>
  </SectionWithVideoUnderlay>
);

// ─── Export ──────────────────────────────────────────────────────────────────

export const MarketingHomeCinematic: React.FC = () => {
  return (
    <div className="bg-white">
      <CinematicHero />
      <Conviction />
      <Audience />
      <ThreePillars />
      <FinalCTA />
    </div>
  );
};

export default MarketingHomeCinematic;
