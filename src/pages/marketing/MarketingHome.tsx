/**
 * MarketingHome — Immersive Fusion (Phase 1.2)
 *
 * Direction: Editorial Cinematic (A) × Interactive Demo (B) × 1 chapter signature (C).
 * Tone: brand (teal) dominant + warm CTAs + sun accent on details.
 *
 * 7 sections, all 100% Tailwind, all motion primitives respect prefers-reduced-motion.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  MarqueeRow,
  CountUp,
  InteractiveAppMockup,
  TiltCard,
  NoiseTexture,
} from '../../components/marketing/motion';

// ⚠️ PLACEHOLDER — Exemples de logos illustratifs.
// Le site live ne publie aucun logo client. À remplacer par les vraies orgs accompagnées
// (avec accord écrit de chaque organisation) avant mise en production.
const LOGOS = [
  'Renault',
  'BNP Paribas',
  'Capgemini',
  "L'Oréal",
  'Airbus',
  'Decathlon',
  'Orange',
  'Société Générale',
];

// ⚠️ PLACEHOLDER — Témoignages illustratifs. Le site live n'en publie aucun.
// À remplacer par de vrais témoignages clients (avec accord écrit) avant production.
const TESTIMONIALS = [
  {
    quote:
      "En 3 mois, on a doublé l'engagement et divisé par 2 le temps de conception. Nos formateurs sont devenus des architectes de parcours.",
    author: 'Camille Lefèvre',
    role: 'Directrice Formation, Renault',
    portrait:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote:
      "Le Passeport Dreyfus a changé notre façon de mesurer la montée en compétence. C'est la première fois qu'on a un vrai signal d'apprentissage.",
    author: 'Marc Daviau',
    role: 'Head of L&D, Capgemini',
    portrait:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote:
      "TLS fait ce que les LMS classiques promettent depuis 15 ans. La différence : ils l'ont vraiment fait.",
    author: 'Sophie Martin',
    role: "CHRO, L'Oréal",
    portrait:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop',
  },
];

// ─── Hero scroll-bound scale: subtle zoom-out of hero portrait as user scrolls past ───
const useHeroParallax = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], reduced ? [1, 1] : [1, 0.92]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);
  return { scale, opacity };
};

const HeroChevron: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      animate={reduced ? undefined : { y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-1 text-white/70"
    >
      <span className="font-body text-caption font-semibold uppercase tracking-widest">
        Scroll
      </span>
      <ChevronDown size={18} />
    </motion.div>
  );
};

export const MarketingHome: React.FC = () => {
  const { scale, opacity } = useHeroParallax();

  return (
    <div className="bg-white">
      {/* ── 1. Hero immersive ───────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <MeshGradientBg tone="brand" intensity="intense" />
        <NoiseTexture opacity={0.06} />

        {/* Parallax decorative blobs */}
        <ParallaxLayer amplitude={80} className="absolute -top-10 -left-20 pointer-events-none" aria-hidden>
          <div className="w-72 h-72 rounded-pill bg-accent-400/20 blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer amplitude={50} className="absolute top-1/3 -right-32 pointer-events-none" aria-hidden>
          <div className="w-96 h-96 rounded-pill bg-secondary-400/20 blur-3xl" />
        </ParallaxLayer>

        <motion.div
          className="relative max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg"
          style={{ scale, opacity }}
        >
          <FadeInWhenVisible direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                La formation augmentée par l'IA
              </span>
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight m-0 text-[clamp(3rem,8vw,6.5rem)] max-w-4xl">
              Former, c'est{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={10}
              >
                transmettre l'avenir
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.3}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              The Learning Society conçoit la formation comme une œuvre.
              Nous combinons intelligence artificielle et expertise pédagogique
              pour créer des parcours qui transforment durablement.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.45}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/formation">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Devenir Formateur Augmenté
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button
                  variant="ghost"
                  size="lg"
                  trailingIcon={<ArrowUpRight size={18} />}
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                >
                  Découvrir la plateforme
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Trust strip */}
          <FadeInWhenVisible direction="up" delay={0.6}>
            <div className="flex items-center gap-3 pt-stack">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80&auto=format&fit=crop',
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-pill object-cover border-2 border-primary-800 shadow-sm"
                  />
                ))}
              </div>
              <span className="font-body text-caption font-semibold text-white/80">
                <CountUp to={200} suffix="+" className="font-bold text-white" /> formateurs certifiés
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="none" delay={0.9}>
            <div className="pt-section">
              <HeroChevron />
            </div>
          </FadeInWhenVisible>
        </motion.div>
      </section>

      {/* ── 2. Marquee logos ────────────────────────────────────────────────── */}
      <section className="border-y border-ink-100 py-stack-lg bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-stack">
          <p className="font-body text-caption text-ink-500 text-center uppercase tracking-widest font-semibold">
            <CountUp to={40} suffix="+" className="text-ink-900 font-bold" /> organisations leur font confiance
          </p>
          <MarqueeRow
            duration={50}
            items={LOGOS.map((name) => (
              <span className="font-display text-h3 font-bold text-ink-400 tracking-tight whitespace-nowrap">
                {name}
              </span>
            ))}
          />
          <p className="font-body text-micro text-ink-400 text-center italic m-0">
            Exemples illustratifs — la liste réelle des partenaires sera publiée prochainement.
          </p>
        </div>
      </section>

      {/* ── 3. Interactive Product Demo (signature B) ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white py-page">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-page items-center">
            {/* Text column */}
            <div className="flex flex-col gap-stack-lg">
              <FadeInWhenVisible direction="up">
                <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                  La Learning App
                </span>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.1}>
                <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                  Essaie-la avant{' '}
                  <GradientText>d'en parler à ton équipe</GradientText>.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.2}>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-lg">
                  Pas besoin de demo call, pas besoin de slides.
                  Clique sur les onglets de la maquette, regarde l'app vivre, comprends en 30 secondes.
                </p>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.3}>
                <ul className="flex flex-col gap-stack m-0 p-0 list-none pt-stack">
                  {[
                    'Parcours adaptatifs avec progression Dreyfus',
                    'Coaching 1-1 intégré (messagerie + visio)',
                    'Journal de bord réflexif, IA-augmenté',
                    'Veille pédagogique curée pour ton métier',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-body text-body text-ink-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.4}>
                <div className="flex items-center gap-3 pt-stack">
                  <Link to="/marketing/learning-app">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Voir toutes les fonctionnalités
                    </Button>
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Mockup column — TiltCard for tactile dimensionality */}
            <FadeInWhenVisible direction="left" delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-8 bg-gradient-to-br from-primary-200/40 via-accent-200/30 to-secondary-200/40 blur-3xl pointer-events-none"
                />
                <TiltCard maxRotation={6} className="relative">
                  <InteractiveAppMockup />
                </TiltCard>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 4. Chapter signature (warm, signature C) ───────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 via-accent-50/40 to-white py-page">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          {/* Text */}
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-accent-100 border border-accent-200 w-fit">
                <Sparkles size={14} className="text-warning-fg" />
                <span className="font-body text-caption font-bold text-warning-fg tracking-wider uppercase">
                  Chapitre signature
                </span>
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                On n'apprend pas{' '}
                <span className="relative inline-block">
                  avec des outils.
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full text-accent-400"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2 8 Q 25 1, 50 6 T 100 6 T 150 6 T 198 6"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    />
                  </svg>
                </span>
                <br />
                On apprend{' '}
                <GradientText
                  from="from-secondary-500"
                  via="via-secondary-600"
                  to="to-accent-500"
                >
                  avec des humains
                </GradientText>{' '}
                — accompagnés par des outils.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-lg">
                Nos formateurs deviennent des architectes de l'apprentissage.
                Des pédagogues qui maîtrisent l'IA sans s'y soumettre.
                Des artisans qui combinent technologie et présence.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/formation">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Devenir Formateur Augmenté
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/magazine">
                  <Button variant="ghost" size="lg">
                    Lire le magazine
                  </Button>
                </Link>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Portrait + floating quote card */}
          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative">
              <ParallaxLayer amplitude={20} className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-ink-100">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop"
                    alt="Formatrice augmentée en session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ParallaxLayer>
              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -bottom-6 -left-6 max-w-xs bg-white rounded-2xl shadow-2xl border border-ink-100 p-stack-lg flex flex-col gap-2"
              >
                <Quote size={20} className="text-secondary-500" />
                <p className="font-display font-medium text-body text-ink-900 leading-snug m-0">
                  "Je ne forme plus, je crée des expériences."
                </p>
                <p className="font-body text-caption text-ink-500 m-0">
                  Sophie, promotion 2026
                </p>
              </motion.div>
              {/* Accent badge top-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 220, damping: 14 }}
                className="absolute -top-4 -right-4 bg-accent-400 text-ink-900 px-3 py-1.5 rounded-pill font-display font-bold text-caption uppercase tracking-wider shadow-lg"
              >
                Promo Septembre ouverte
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 5. Metrics + Testimonials ───────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-page">
          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
            {[
              { to: 200, suffix: '+', label: 'formateurs certifiés' },
              { to: 40, suffix: '+', label: 'organisations clientes' },
              { to: 120, suffix: '+', label: 'modules pédagogiques' },
              { to: 97, suffix: ' %', label: 'satisfaction apprenants' },
            ].map((m, i) => (
              <FadeInWhenVisible key={m.label} direction="up" delay={i * 0.08}>
                <div className="flex flex-col gap-1 p-5 rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50/40 border border-ink-100">
                  <CountUp
                    to={m.to}
                    suffix={m.suffix}
                    className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-primary-700 leading-none"
                  />
                  <span className="font-body text-caption text-ink-600 mt-1">{m.label}</span>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-section">
            <FadeInWhenVisible direction="up">
              <div className="flex flex-col gap-stack max-w-3xl">
                <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                  Ce qu'ils en disent
                </span>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                  Les leaders L&D parlent mieux que nous.
                </h2>
                <p className="font-body text-caption text-ink-400 italic m-0">
                  Témoignages illustratifs — de vrais retours clients seront publiés à mesure que les autorisations sont reçues.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
              {TESTIMONIALS.map(({ quote, author, role, portrait }, i) => (
                <FadeInWhenVisible key={author} direction="up" delay={i * 0.1}>
                  <article className="h-full rounded-2xl bg-ink-50/40 border border-ink-100 p-6 flex flex-col gap-stack-lg hover:bg-white hover:shadow-lg hover:border-primary-200 transition-all duration-base">
                    <Quote size={20} className="text-primary-400" />
                    <p className="font-body text-body text-ink-800 leading-relaxed m-0 flex-1">
                      "{quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-stack border-t border-ink-100">
                      <img
                        src={portrait}
                        alt=""
                        className="w-10 h-10 rounded-pill object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-body-sm text-ink-900">
                          {author}
                        </span>
                        <span className="font-body text-caption text-ink-500">{role}</span>
                      </div>
                    </div>
                  </article>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Final CTA — magnetic, dark mesh ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-primary-900 to-ink-900 py-page">
        <MeshGradientBg tone="ink" intensity="intense" />
        <ParallaxLayer
          amplitude={40}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden
        >
          <div className="w-[600px] h-[600px] rounded-pill bg-primary-500/20 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                30 jours pour déployer
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold text-white leading-[1.02] tracking-tight m-0">
              Prêt à{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={8}
              >
                transformer ta pédagogie
              </GradientText>
              ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              Échangeons 30 minutes pour comprendre tes enjeux et tracer le chemin le plus court vers l'impact.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={16}>
                <Link to="/marketing/contact">
                  <Button variant="warm" size="xl" trailingIcon={<ArrowRight size={20} />}>
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button
                  variant="ghost"
                  size="xl"
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                >
                  Voir la démo
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingHome;
