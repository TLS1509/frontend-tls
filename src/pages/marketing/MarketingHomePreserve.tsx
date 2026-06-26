/**
 * MarketingHomePreserve: Proposal A : "Preserve & Elevate"
 *
 * A refined, more confident evolution of the existing immersive TLS direction.
 * Same DNA as MarketingHome.tsx (teal→warm gradient heroes, measured glass,
 * the full motion vocabulary, InteractiveAppMockup show-don't-tell): but more
 * crafted:
 *   - hero display type capped at clamp max 6rem (was 6.5rem)
 *   - CTA contrast fixed on dark surfaces (variant="glass", never white-on-light ghost)
 *   - ONE deliberate kicker overall (the hero trust chip), not one per section
 *   - a single earned hero-metric moment (200+/40+/97%), framed as substantiated
 *   - tighter vertical rhythm via semantic spacing tokens
 *   - [text-wrap:balance] on headings, modest card radius (rounded-lg/xl/2xl only)
 *
 * Tone: brand teal dominant · warm orange + sun yellow on accents/details.
 * All 100% Tailwind (token-mapped) · all motion respects prefers-reduced-motion.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Quote,
  Compass,
  Users,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Target,
  Award,
  Zap,
  PlayCircle,
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

/* ──────────────────────────────────────────────────────────────────────────
   Content data (real TLS content: no invented facts, no fake client logos)
   ────────────────────────────────────────────────────────────────────────── */

const METRICS = [
  { to: 200, suffix: '+', label: 'formateurs certifiés' },
  { to: 40, suffix: '+', label: 'organisations accompagnées' },
  { to: 97, suffix: ' %', label: 'de satisfaction' },
] as const;

const OFFERS = [
  {
    icon: GraduationCap,
    eyebrow: 'Se former',
    title: 'Formateur Augmenté',
    body: "Le programme certifiant, délivré dans la Learning App. Apprends à intégrer l'IA dans ta pédagogie, à ton rythme, sans renoncer à ta voix.",
    cta: 'Découvrir le programme',
    href: '/marketing/formation',
    tone: 'primary' as const,
  },
  {
    icon: Compass,
    eyebrow: 'Se faire accompagner',
    title: 'Studio & Accompagnement',
    body: "Audit, stratégie IA et déploiement sur-mesure pour les organismes de formation et les entreprises. On construit le dispositif avec toi.",
    cta: 'Parler de ton projet',
    href: '/marketing/accompagnement',
    tone: 'warm' as const,
  },
  {
    icon: Sparkles,
    eyebrow: 'Voir la plateforme',
    title: 'La Learning App',
    body: "Parcours adaptatifs (progression Dreyfus), coaching 1-1, journal de bord réflexif, veille curée, passeport de compétences et badges, réunis en un seul endroit.",
    cta: 'Explorer la plateforme',
    href: '/marketing/learning-app',
    tone: 'sun' as const,
  },
];

const PILLARS = [
  {
    icon: Target,
    title: 'Personnalisation des parcours',
    body: "Chaque apprenant suit un chemin calibré sur son niveau réel, pas sur une moyenne de classe.",
  },
  {
    icon: Zap,
    title: 'Moins de tâches administratives',
    body: "L'IA prend en charge la conception répétitive et le suivi. Tu récupères du temps pour la pédagogie.",
  },
  {
    icon: Users,
    title: 'Engagement et suivi individualisé',
    body: "Des signaux d'apprentissage lisibles, en continu, pour intervenir au bon moment auprès de chaque personne.",
  },
  {
    icon: Award,
    title: 'Traçabilité intégrée',
    body: "La traçabilité des preuves et des compétences est intégrée au dispositif, pas ajoutée après coup.",
  },
];

const APP_FEATURES = [
  {
    icon: Compass,
    title: 'Parcours adaptatifs',
    body: 'Progression Dreyfus, du débutant à l’expert, avec un objectif clair à chaque étape.',
  },
  {
    icon: MessageSquare,
    title: 'Coaching 1-1 intégré',
    body: 'Messagerie et visio dans la plateforme. Le coach voit le contexte réel de l’apprenant.',
  },
  {
    icon: BookOpen,
    title: 'Journal de bord réflexif',
    body: 'Un espace d’écriture augmenté par l’IA pour ancrer ce qui a été appris.',
  },
  {
    icon: Sparkles,
    title: 'Veille pédagogique curée',
    body: 'Une sélection de ressources tenue à jour pour ton métier, sans le bruit.',
  },
];

const STRIDE = [
  { n: '01', label: 'Situer' },
  { n: '02', label: 'Tracer' },
  { n: '03', label: 'Renforcer' },
  { n: '04', label: 'Intégrer' },
  { n: '05', label: 'Démontrer' },
  { n: '06', label: 'Évaluer' },
];

/* ⚠️ Témoignages ILLUSTRATIFS, attribution anonymisée par rôle.
   Le site live ne publie aucun témoignage nominatif. À remplacer par de vrais
   retours (avec accord écrit) avant mise en production. */
const TESTIMONIALS = [
  {
    quote:
      "Le passeport Dreyfus a changé notre façon de mesurer la montée en compétence. Pour la première fois, on a un vrai signal d'apprentissage, pas juste un taux de complétion.",
    role: 'Directrice Formation, secteur industrie',
  },
  {
    quote:
      "Nos formateurs passent moins de temps sur la conception répétitive et davantage avec les apprenants. C'est exactement ce qu'on cherchait en intégrant l'IA.",
    role: 'Responsable L&D, organisme de formation',
  },
  {
    quote:
      "Le déploiement a été net : un dispositif clair, structuré, et adopté par les équipes sans formation lourde à l'outil.",
    role: 'Responsable pédagogique, ESN',
  },
];

const ORG_TYPES = [
  'Organismes de formation',
  'ESN',
  'Industrie',
  'Conseil',
  'Secteur public',
  'Grandes écoles',
  'Cabinets RH',
  'PME en croissance',
];

/* ──────────────────────────────────────────────────────────────────────────
   Small inline helpers (kept in-file, no new shared files)
   ────────────────────────────────────────────────────────────────────────── */

const useHeroParallax = () => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], reduced ? [1, 1] : [1, 0.94]);
  const opacity = useTransform(scrollY, [0, 460], [1, 0.55]);
  return { scale, opacity };
};

const HeroScrollCue: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      animate={reduced ? undefined : { y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-tight text-white/65"
    >
      <span className="font-body text-micro font-semibold uppercase tracking-widest">
        Défiler
      </span>
      <ChevronDown size={18} />
    </motion.div>
  );
};

// Tone maps for the offer cards (static classes only: Tailwind-safe).
const OFFER_ICON_TONE: Record<'primary' | 'warm' | 'sun', string> = {
  primary: 'bg-primary-100 text-primary-700',
  warm: 'bg-secondary-100 text-secondary-700',
  sun: 'bg-accent-100 text-accent-700',
};
const OFFER_HOVER_RING: Record<'primary' | 'warm' | 'sun', string> = {
  primary: 'hover:border-primary-300',
  warm: 'hover:border-secondary-300',
  sun: 'hover:border-accent-300',
};
const OFFER_LINK_TONE: Record<'primary' | 'warm' | 'sun', string> = {
  primary: 'text-primary-700',
  warm: 'text-secondary-700',
  sun: 'text-accent-700',
};

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export const MarketingHomePreserve: React.FC = () => {
  const { scale, opacity } = useHeroParallax();

  return (
    <div className="bg-white">
      {/* ── 1 · HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 pt-section-lg pb-page">
        <MeshGradientBg tone="brand" intensity="intense" />
        <NoiseTexture opacity={0.05} />

        <ParallaxLayer
          amplitude={80}
          className="absolute -top-16 -left-24 pointer-events-none"
        >
          <div aria-hidden className="h-72 w-72 rounded-pill bg-accent-400/20 blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer
          amplitude={50}
          className="absolute top-1/3 -right-28 pointer-events-none"
        >
          <div aria-hidden className="h-96 w-96 rounded-pill bg-secondary-400/20 blur-3xl" />
        </ParallaxLayer>

        <motion.div
          className="relative mx-auto flex max-w-page flex-col items-center gap-stack-lg px-6 text-center"
          style={{ scale, opacity }}
        >
          {/* The ONE deliberate kicker on the whole page */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-stack-xs rounded-pill border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-glass-medium">
              <Sparkles size={14} className="text-accent-300" />
              <span className="font-body text-caption font-semibold uppercase tracking-wider text-white">
                Certifiant · Open Badge 2.0
              </span>
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.14}>
            <h1 className="m-0 max-w-4xl font-display text-[clamp(2.75rem,7.5vw,6rem)] font-extrabold leading-[0.98] tracking-tight text-white [text-wrap:balance]">
              L&apos;IA augmente tes compétences.{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={11}
              >
                Pas l&apos;inverse
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.26}>
            <p className="m-0 max-w-2xl font-body text-body-lg leading-relaxed text-white/85">
              Transforme ta pratique en combinant intelligence artificielle et
              expertise pédagogique. Des parcours qui mesurent l&apos;impact et
              développent des compétences durables.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.38}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/formation">
                  <Button variant="secondary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Devenir Formateur Augmenté
                  </Button>
                </Link>
              </MagneticButton>
              {/* glass = readable white-on-dark CTA (contrast fix vs old white-ghost) */}
              <Link to="/marketing/learning-app">
                <Button variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                  Découvrir la plateforme
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Earned proof avatars + count */}
          <FadeInWhenVisible direction="up" delay={0.52}>
            <div className="flex items-center gap-stack-xs pt-stack">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
                  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-8 w-8 rounded-pill border-2 border-primary-800 object-cover shadow-sm"
                  />
                ))}
              </div>
              <span className="font-body text-caption font-semibold text-white/80">
                <CountUp to={200} suffix="+" className="font-bold text-white" /> formateurs
                déjà certifiés
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="none" delay={0.8}>
            <div className="pt-section">
              <HeroScrollCue />
            </div>
          </FadeInWhenVisible>
        </motion.div>
      </section>

      {/* ── 2 · EARNED METRIC BAND ────────────────────────────────────────── */}
      <section className="border-b border-ink-100 bg-white py-section-lg">
        <div className="mx-auto max-w-page px-6">
          <div className="grid grid-cols-1 items-center gap-stack-lg md:grid-cols-[1.1fr_auto_2fr]">
            <FadeInWhenVisible direction="up">
              <p className="m-0 max-w-xs font-body text-body text-ink-600">
                Des résultats que l&apos;on mesure, pas que l&apos;on promet.
              </p>
            </FadeInWhenVisible>

            <div aria-hidden className="hidden h-12 w-px bg-ink-200 md:block" />

            <div className="grid grid-cols-3 gap-stack">
              {METRICS.map((m, i) => (
                <FadeInWhenVisible key={m.label} direction="up" delay={i * 0.08}>
                  <div className="flex flex-col gap-tight">
                    <CountUp
                      to={m.to}
                      suffix={m.suffix}
                      className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-none text-primary-700"
                    />
                    <span className="font-body text-caption text-ink-600">{m.label}</span>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 · DOCTRINE STATEMENT ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-page">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeInWhenVisible direction="up">
            <h2 className="m-0 font-display text-[clamp(1.875rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
              L&apos;IA ne remplace pas le formateur.{' '}
              <GradientText>Elle l&apos;aide à aller plus loin</GradientText>.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="mx-auto mt-stack-lg max-w-2xl font-body text-body-lg leading-relaxed text-ink-600">
              Nos formateurs deviennent des architectes de l&apos;apprentissage : des
              pédagogues qui maîtrisent l&apos;IA sans s&apos;y soumettre, et qui
              combinent technologie et présence humaine.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 4 · INTERACTIVE APP MOCKUP (show, don't tell) ─────────────────── */}
      <section className="bg-white py-page">
        <div className="mx-auto max-w-wide px-6">
          <div className="grid grid-cols-1 items-center gap-section-lg lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-stack-lg">
              <FadeInWhenVisible direction="up">
                <h2 className="m-0 font-display text-[clamp(1.875rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
                  Essaie la plateforme avant{' '}
                  <GradientText>d&apos;en parler à ton équipe</GradientText>.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.12}>
                <p className="m-0 max-w-lg font-body text-body-lg leading-relaxed text-ink-600">
                  Pas de slides, pas de demo call obligatoire. Clique sur les onglets
                  de la maquette et regarde l&apos;app vivre : parcours, coaching,
                  journal, veille.
                </p>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.22}>
                <ul className="m-0 flex list-none flex-col gap-stack p-0 pt-stack">
                  {APP_FEATURES.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-stack-xs">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                        <Icon size={18} />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-display text-body font-bold text-ink-900">
                          {title}
                        </span>
                        <span className="font-body text-body-sm leading-relaxed text-ink-600">
                          {body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.32}>
                <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                  <Link to="/marketing/learning-app">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Voir toutes les fonctionnalités
                    </Button>
                  </Link>
                  <Link to="/marketing/contact">
                    <Button variant="ghost" size="lg" leadingIcon={<PlayCircle size={18} />}>
                      Réserver une démo
                    </Button>
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

            <FadeInWhenVisible direction="left" delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-8 bg-gradient-to-br from-primary-200/40 via-accent-200/30 to-secondary-200/40 blur-3xl"
                />
                <TiltCard maxRotation={6} className="relative">
                  <InteractiveAppMockup />
                </TiltCard>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 5 · THREE OFFERS ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-primary-50/40 py-page">
        <div className="mx-auto max-w-wide px-6">
          <FadeInWhenVisible direction="up">
            <div className="mb-section-lg flex flex-col gap-stack-lg md:flex-row md:items-end md:justify-between">
              <h2 className="m-0 max-w-2xl font-display text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
                Trois façons de travailler avec nous.
              </h2>
              <p className="m-0 max-w-sm font-body text-body text-ink-600">
                Te former, te faire accompagner, ou équiper tes équipes. Souvent, les
                trois se rejoignent.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-3">
            {OFFERS.map(({ icon: Icon, eyebrow, title, body, cta, href, tone }, i) => (
              <FadeInWhenVisible key={title} direction="up" delay={i * 0.1}>
                <Link
                  to={href}
                  className={`group flex h-full flex-col gap-stack rounded-2xl border border-ink-100 bg-white p-stack-lg transition-all duration-base hover:-translate-y-1 hover:shadow-xl ${OFFER_HOVER_RING[tone]}`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${OFFER_ICON_TONE[tone]}`}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="font-body text-caption font-semibold uppercase tracking-wider text-ink-500">
                    {eyebrow}
                  </span>
                  <h3 className="m-0 font-display text-h3 font-bold tracking-tight text-ink-900">
                    {title}
                  </h3>
                  <p className="m-0 flex-1 font-body text-body-sm leading-relaxed text-ink-600">
                    {body}
                  </p>
                  <span
                    className={`mt-stack inline-flex items-center gap-tight font-body text-body-sm font-bold ${OFFER_LINK_TONE[tone]}`}
                  >
                    {cta}
                    <ChevronRight
                      size={16}
                      className="transition-transform duration-base group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · WHY AI: warm chapter ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 via-accent-50/40 to-white py-page">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative mx-auto max-w-wide px-6">
          <div className="grid grid-cols-1 gap-section-lg lg:grid-cols-[1fr_1.4fr] lg:items-start">
            {/* Left: statement + portrait */}
            <div className="flex flex-col gap-stack-lg">
              <FadeInWhenVisible direction="up">
                <h2 className="m-0 font-display text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
                  Pourquoi l&apos;IA, vraiment ?
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.12}>
                <p className="m-0 max-w-md font-body text-body-lg leading-relaxed text-ink-700">
                  Parce qu&apos;elle libère du temps là où il était perdu, et le rend
                  là où il compte : la relation pédagogique. Quatre effets concrets,
                  pas un argument de plaquette.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="left" delay={0.2}>
                <div className="relative mt-stack max-w-md">
                  <ParallaxLayer amplitude={18}>
                    <div className="aspect-[5/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink-100">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                        alt="Formatrice accompagnant un apprenant en session de travail"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </ParallaxLayer>
                  <div className="absolute -bottom-4 -right-4 flex max-w-[14rem] flex-col gap-tight rounded-xl bg-white p-stack shadow-xl ring-1 ring-ink-100">
                    <Quote size={18} className="text-secondary-500" />
                    <p className="m-0 font-display text-body-sm font-medium leading-snug text-ink-900">
                      &laquo; Je ne forme plus, je conçois des expériences. &raquo;
                    </p>
                    <p className="m-0 font-body text-micro text-ink-500">
                      Formatrice, promotion 2026
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Right: pillar grid */}
            <div className="grid grid-cols-1 gap-stack-lg sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <FadeInWhenVisible key={title} direction="up" delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-stack rounded-xl border border-secondary-100 bg-white/70 p-stack-lg backdrop-blur-glass-light transition-all duration-base hover:bg-white hover:shadow-lg">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-100 text-secondary-700">
                      <Icon size={20} />
                    </span>
                    <h3 className="m-0 font-display text-h4 font-bold tracking-tight text-ink-900">
                      {title}
                    </h3>
                    <p className="m-0 font-body text-body-sm leading-relaxed text-ink-600">
                      {body}
                    </p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 · STRIDE METHOD teaser ──────────────────────────────────────── */}
      <section className="bg-white py-page">
        <div className="mx-auto max-w-wide px-6">
          <div className="grid grid-cols-1 gap-section-lg lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <FadeInWhenVisible direction="up">
              <div className="flex flex-col gap-stack-lg">
                <h2 className="m-0 font-display text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
                  Une méthode, six étapes : <GradientText>STRIDE</GradientText>.
                </h2>
                <p className="m-0 max-w-md font-body text-body-lg leading-relaxed text-ink-600">
                  De la situation de départ à l&apos;évaluation des preuves, STRIDE
                  structure chaque parcours pour que l&apos;apprentissage laisse une
                  trace mesurable.
                </p>
                <div className="pt-stack">
                  <Link to="/marketing/methode">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Découvrir la méthode
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-2 gap-stack sm:grid-cols-3">
              {STRIDE.map(({ n, label }, i) => (
                <FadeInWhenVisible key={n} direction="up" delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-stack-xs rounded-xl border border-ink-100 bg-primary-50/40 p-stack-lg transition-colors duration-base hover:border-primary-200 hover:bg-primary-50">
                    <span className="font-display text-h3 font-extrabold tracking-tight text-primary-400">
                      {n}
                    </span>
                    <span className="font-display text-body font-bold text-ink-900">
                      {label}
                    </span>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 · TESTIMONIALS (illustrative, role-based) ───────────────────── */}
      <section className="bg-gradient-to-b from-white to-ink-50/60 py-page">
        <div className="mx-auto max-w-wide px-6">
          <FadeInWhenVisible direction="up">
            <div className="mb-section-lg flex max-w-content flex-col gap-stack">
              <h2 className="m-0 font-display text-[clamp(1.875rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight text-ink-900 [text-wrap:balance]">
                Ce que change un dispositif augmenté.
              </h2>
              <p className="m-0 font-body text-caption italic text-ink-400">
                Témoignages illustratifs. De vrais retours seront publiés à mesure que
                les autorisations sont reçues.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 gap-stack-lg md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, role }, i) => (
              <FadeInWhenVisible key={role} direction="up" delay={i * 0.1}>
                <article className="flex h-full flex-col gap-stack-lg rounded-2xl bg-white p-stack-lg shadow-sm ring-1 ring-ink-100 transition-all duration-base hover:-translate-y-1 hover:shadow-lg">
                  <Quote size={22} className="text-primary-400" />
                  <p className="m-0 flex-1 font-body text-body leading-relaxed text-ink-800">
                    {quote}
                  </p>
                  <div className="flex items-center gap-stack-xs border-t border-ink-100 pt-stack">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-primary-100 font-display text-body-sm font-bold text-primary-700">
                      {role.charAt(0)}
                    </span>
                    <span className="font-body text-body-sm font-semibold text-ink-700">
                      {role}
                    </span>
                  </div>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 · ORG PROOF: neutral marquee, no fake logos ────────────────── */}
      <section className="border-y border-ink-100 bg-white py-section-lg">
        <div className="mx-auto flex max-w-wide flex-col gap-stack-lg px-6">
          <p className="m-0 text-center font-body text-caption font-semibold uppercase tracking-widest text-ink-500">
            <CountUp to={40} suffix="+" className="font-bold text-ink-900" /> organisations
            accompagnées, dans tous les secteurs
          </p>
          <MarqueeRow
            duration={48}
            items={ORG_TYPES.map((name) => (
              <span className="inline-flex items-center gap-stack-xs whitespace-nowrap font-display text-h4 font-bold tracking-tight text-ink-400">
                <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-accent-400" />
                {name}
              </span>
            ))}
          />
          <p className="m-0 text-center font-body text-micro italic text-ink-400">
            Logos partenaires communiqués prochainement.
          </p>
        </div>
      </section>

      {/* ── 10 · FINAL CTA: dark mesh, magnetic ──────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-primary-900 to-ink-900 py-page">
        <MeshGradientBg tone="ink" intensity="intense" />
        <NoiseTexture opacity={0.05} />
        <ParallaxLayer
          amplitude={40}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div aria-hidden className="h-[600px] w-[600px] rounded-pill bg-primary-500/20 blur-3xl" />
        </ParallaxLayer>

        <div className="relative mx-auto flex max-w-content flex-col items-center gap-stack-lg px-6 text-center">
          <FadeInWhenVisible direction="up">
            <h2 className="m-0 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-white [text-wrap:balance]">
              Prêt à{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={9}
              >
                transformer ta pédagogie
              </GradientText>
              ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.12}>
            <p className="m-0 max-w-2xl font-body text-body-lg leading-relaxed text-white/85">
              Échangeons 30 minutes pour comprendre tes enjeux et tracer le chemin le
              plus court vers l&apos;impact.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.24}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={16}>
                <Link to="/marketing/contact">
                  <Button variant="secondary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button variant="glass" size="xl" trailingIcon={<PlayCircle size={20} />}>
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

export default MarketingHomePreserve;
