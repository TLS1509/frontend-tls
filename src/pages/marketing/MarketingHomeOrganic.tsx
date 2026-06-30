/**
 * MarketingHomeWatercolorScroll — Watercolor background défile avec scroll parallax
 *
 * Direction : Fixed watercolor image en background, sections scroll over avec
 * bg semi-transparent (white/85 backdrop-blur), création de l'illusion que
 * la watercolor "drifts" while sections flow. Parallax useScroll() + useTransform.
 *
 * Structure : Hero watercolor · Conviction · Pour qui · 3 piliers · Méthode ·
 * Auto-diagnostic · Preuve & équipe · CTA final.
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

// ─── Fixed Watercolor Background (parallax on scroll) ───────────────────────

const WatercolorBackground: React.FC = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Slow parallax: watercolor moves 30% of scroll speed
  const bgY = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={reduced ? undefined : { y: bgY }}
    >
      <img
        src="/marketing/assets/hero-watercolor.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>
  );
};

// ─── Hero section (over watercolor) ──────────────────────────────────────────

const Hero: React.FC = () => (
  <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
    {/* Scrim: white gradient fade over watercolor */}
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/85 pointer-events-none"
    />

    <div className="relative max-w-page mx-auto px-6 py-page w-full">
      <FadeInWhenVisible className="flex flex-col items-center text-center gap-stack-lg">
        <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[22ch] text-[clamp(2.75rem,6vw,5.5rem)]">
          Vos formateurs,{' '}
          <span className="text-primary-600">
            augmentés par l'IA
          </span>
          .
        </h1>

        <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[58ch]">
          Formation certifiante, Learning App adaptative, accompagnement sur mesure.
          Tout pour maîtriser l'IA sans perdre l'humain au centre.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
          <MagneticButton strength={14}>
            <Link to="/marketing/accompagnement">
              <Button
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight size={18} />}
              >
                Je représente une entreprise
              </Button>
            </Link>
          </MagneticButton>
          <Link to="/marketing/formation">
            <Button variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Me former
            </Button>
          </Link>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── Section avec bg semi-transparent (watercolor visible derrière) ──────────

const TransparentSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="relative bg-white/85 backdrop-blur-sm py-page">
    <div className="relative max-w-page mx-auto px-6">
      {children}
    </div>
  </section>
);

// ─── Conviction ──────────────────────────────────────────────────────────────

const Conviction: React.FC = () => (
  <TransparentSection>
    <FadeInWhenVisible className="max-w-[40ch] mx-auto text-center flex flex-col gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,3rem)] leading-tight">
        L'enjeu n'est pas de produire{' '}
        <span className="text-primary-600">plus de contenu</span>.
      </h2>
      <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[58ch]">
        C'est de produire des apprenants augmentés. Des professionnels qui maîtrisent
        l'IA sans s'y soumettre, avec la pédagogie au centre.
      </p>
    </FadeInWhenVisible>
  </TransparentSection>
);

// ─── Pour qui ────────────────────────────────────────────────────────────────

const Audience: React.FC = () => (
  <TransparentSection>
    <FadeInWhenVisible className="text-center max-w-[40ch] mx-auto mb-section-lg">
      <p className="font-body text-caption font-semibold uppercase tracking-widest text-primary-600 m-0">
        Pour qui
      </p>
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 mt-stack text-[clamp(1.7rem,3vw,2.5rem)]">
        Deux audiences, une même vision
      </h2>
    </FadeInWhenVisible>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
      {[
        {
          icon: GraduationCap,
          title: 'Formateurs indépendants',
          desc: "Se former à l'IA pédagogique, certification, intégration des bons outils.",
          cta: 'Devenir Formateur Augmenté',
          route: '/marketing/formation',
        },
        {
          icon: Building2,
          title: 'Organisations L&D',
          desc: 'Transformation vers compétences, accompagnement stratégique, déploiement mesurable.',
          cta: 'Consulter pour mon org',
          route: '/marketing/accompagnement',
        },
      ].map((item, idx) => {
        const Icon = item.icon;
        return (
          <FadeInWhenVisible key={idx} direction="up" delay={idx * 0.1}>
            <button
              onClick={() => (window.location.href = item.route)}
              className="group relative text-left h-full rounded-2xl bg-white/80 backdrop-blur-sm p-stack-lg hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 cursor-pointer"
            >
              <div className="flex flex-col gap-stack-lg h-full justify-between">
                <div>
                  <div className="inline-flex w-12 h-12 rounded-xl bg-primary-50 items-center justify-center text-primary-600 mb-stack group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
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
  </TransparentSection>
);

// ─── 3 Piliers ──────────────────────────────────────────────────────────────

const ThreePillars: React.FC = () => (
  <TransparentSection>
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
          title: 'Accompagnement',
          desc: 'Déploiement stratégique, pilotage, mesure des compétences.',
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
  </TransparentSection>
);

// ─── CTA final ───────────────────────────────────────────────────────────────

const FinalCTA: React.FC = () => (
  <TransparentSection>
    <FadeInWhenVisible className="text-center flex flex-col items-center gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-display m-0 text-[clamp(1.9rem,3.5vw,2.75rem)]">
        Commencez votre transformation SBO
      </h2>
      <p className="font-body text-body-lg text-ink-600 m-0 max-w-[60ch]">
        Diagnostic maturité, découverte de la plateforme, ou consultation stratégique.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-xs pt-stack">
        <MagneticButton strength={14}>
          <Link to="/marketing/contact">
            <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Prendre rendez-vous
            </Button>
          </Link>
        </MagneticButton>
        <Link to="/marketing/learning-app">
          <Button variant="secondary" size="lg">
            Découvrir la plateforme
          </Button>
        </Link>
      </div>
    </FadeInWhenVisible>
  </TransparentSection>
);

// ─── Export ──────────────────────────────────────────────────────────────────

export const MarketingHomeOrganic: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <div className="bg-white overflow-x-hidden">
      {!reduced && <WatercolorBackground />}
      <Hero />
      <Conviction />
      <Audience />
      <ThreePillars />
      <FinalCTA />
    </div>
  );
};

export default MarketingHomeOrganic;
