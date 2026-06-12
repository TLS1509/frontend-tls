/**
 * MarketingHome — Premium Editorial (light + immersive)
 *
 * Direction : Stripe-style light premium, glassmorphism subtle, cursor spotlight,
 * mesh gradient mouvant, grain texture, asymétrie éditoriale.
 *
 * Structure 9 sections :
 *   1. Hero light + cursor spotlight + grain
 *   2. Marquee logos (sobre)
 *   3. Bento 3 leviers (asymétrique : Learning App hero card + Formation + Accompagnement)
 *   4. Product Demo (TiltCard mockup glass container)
 *   5. Manifesto pull-quote (dark mesh gradient, ancre éditoriale)
 *   6. Humains + outils (édito 2-col, squiggly underline)
 *   7. Témoignage unique éditorial (1 grande citation + portrait)
 *   8. Hero stat impact (97% XXL gradient + 3 secondaires)
 *   9. CTA finale light éditorial (no box, floating elements)
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Quote,
  CheckCircle2,
  GraduationCap,
  Smartphone,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  MarqueeRow,
  CountUp,
  InteractiveAppMockup,
  TiltCard,
  MeshGradientBg,
  GradientText,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { SkillMapSection } from './components/SkillMapSection';

// ⚠️ PLACEHOLDER — logos illustratifs.
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

// ⚠️ PLACEHOLDER — Témoignage hero illustratif.
const FEATURED_TESTIMONIAL = {
  quote:
    "En 3 mois, on a doublé l'engagement et divisé par 2 le temps de conception. Nos formateurs sont devenus des architectes de parcours — c'est la première fois qu'on voit la pédagogie passer en mode produit.",
  author: 'Camille Lefèvre',
  role: 'Directrice Formation',
  org: 'Renault',
  portrait:
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop',
};

/* ────────────────────────────────────────────────────────────────────────────
   Grain SVG — texture organic premium discrète.
   ──────────────────────────────────────────────────────────────────────────── */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ────────────────────────────────────────────────────────────────────────────
   HeroChevron — indicateur de scroll animé (surface sombre).
   ──────────────────────────────────────────────────────────────────────────── */
const HeroChevron: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      animate={reduced ? undefined : { y: [0, 8, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex flex-col items-center gap-tight text-white/55"
    >
      <span className="font-body text-caption font-semibold uppercase tracking-widest">Scroll</span>
      <ChevronDown size={18} />
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
   HeroBlobs — couche mid-ground : 3 blobs organiques teal/amber, parallax +
   rotation lente + respiration. Désactivés sous prefers-reduced-motion.
   ──────────────────────────────────────────────────────────────────────────── */
const HERO_BLOBS = [
  { pos: 'top-[8%] right-[6%] h-[34rem] w-[34rem]', color: 'rgba(248,176,68,0.24)', dur: 17 },
  { pos: 'bottom-[2%] -left-[4%] h-[42rem] w-[42rem]', color: 'rgba(115,175,191,0.30)', dur: 22 },
  { pos: 'top-[34%] left-[40%] h-[24rem] w-[24rem]', color: 'rgba(85,161,180,0.22)', dur: 14 },
];

const HeroBlobs: React.FC<{ y: ReturnType<typeof useTransform>; rotate: ReturnType<typeof useTransform>; reduced: boolean | null }> = ({ y, rotate, reduced }) => (
  <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
    {HERO_BLOBS.map((b, i) => (
      <motion.div
        key={i}
        style={reduced ? undefined : { y, rotate }}
        animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute rounded-pill blur-[64px] ${b.pos}`}
      >
        <div
          className="h-full w-full rounded-pill"
          style={{ background: `radial-gradient(circle at 50% 50%, ${b.color}, transparent 70%)` }}
        />
      </motion.div>
    ))}
  </div>
);

/* ────────────────────────────────────────────────────────────────────────────
   HeroParallax — hero immersif sombre, 3 couches parallax bound au scroll.
   Couche 1 (mesh, lent) · Couche 2 (blobs, medium) · Couche 3 (contenu, rapide
   + fade out). Surface : gradient teal saturé from-primary-700 → primary-900.
   ──────────────────────────────────────────────────────────────────────────── */
const HeroParallax: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Absolute-px scroll mapping over ~one viewport. Hooks called unconditionally.
  const meshY = useTransform(scrollY, [0, 760], [0, -110]);
  const blobY = useTransform(scrollY, [0, 760], [0, -260]);
  const blobRotate = useTransform(scrollY, [0, 760], [0, 9]);
  const contentY = useTransform(scrollY, [0, 760], [0, -150]);
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0]);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 pt-32 pb-page">
      {/* Couche 1 — mesh gradient animé (lent) */}
      <motion.div aria-hidden className="absolute inset-0" style={reduced ? undefined : { y: meshY }}>
        <MeshGradientBg tone="brand" intensity="intense" />
      </motion.div>

      {/* Couche 2 — blobs organiques (medium) */}
      <HeroBlobs y={blobY} rotate={blobRotate} reduced={reduced} />

      {/* Grain texture — tactile, mix-blend sur surface sombre */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: GRAIN_SVG }}
      />

      {/* Fade bas — transition douce vers la section blanche suivante */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-b from-transparent to-white"
      />

      {/* Couche 3 — contenu (rapide + fade au scroll) */}
      <motion.div
        className="relative z-base w-full"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export const MarketingHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <SEOHead
        title="The Learning Society — Transformez vos équipes en organisation Skills-Based"
        description="Méthode STRIDE, Learning App, Accompagnement : construisez une organisation Skills-Based qui apprend et s'adapte en continu."
        canonical="/marketing"
      />

      {/* ── 1. Hero immersif sombre — parallax 3 couches ──────────────────── */}
      <HeroParallax>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-stack-lg px-6 text-center">
          {/* Eyebrow — pill glass micro */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <span className="inline-flex items-center gap-stack-xs rounded-pill border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-glass-light">
              <span className="inline-flex h-1.5 w-1.5 rounded-pill bg-accent-400" />
              <span className="font-body text-micro font-semibold uppercase tracking-[0.2em] text-white/80">
                Skills-Based Organization · IA pédagogique
              </span>
            </span>
          </FadeInWhenVisible>

          {/* Headline — blanc dominant, accent gradient amber sur le punchword */}
          <FadeInWhenVisible direction="up" delay={0.15}>
            <h1 className="m-0 max-w-5xl font-display text-[clamp(2.5rem,5.4vw,4.5rem)] font-extrabold leading-[0.98] tracking-display text-white [text-wrap:balance]">
              L'IA ne remplacera pas les formateurs.{' '}
              <span className="text-white/55">Ceux qui la maîtrisent,</span>{' '}
              <GradientText from="from-accent-300" via="via-accent-400" to="to-secondary-400">
                si.
              </GradientText>
            </h1>
          </FadeInWhenVisible>

          {/* Sous-titre */}
          <FadeInWhenVisible direction="up" delay={0.3}>
            <p className="m-0 max-w-[52ch] font-body text-body-lg leading-relaxed text-white/75">
              Parcours adaptatifs, Passeport de Compétences, matching IA. Un cycle complet{' '}
              <strong className="font-bold text-white">Learn → Do → Match</strong> pour transformer
              vos talents en avantage durable.
            </p>
          </FadeInWhenVisible>

          {/* CTAs — warm magnétique + ghost glass sur fond sombre */}
          <FadeInWhenVisible direction="up" delay={0.45}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/formation" aria-label="Je veux me former">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="group/cta pr-1.5"
                    trailingIcon={
                      <span className="ml-0.5 inline-flex h-7 w-7 items-center justify-center rounded-pill bg-white/20 transition-transform duration-base ease-emphasis group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px">
                        <ArrowRight size={15} />
                      </span>
                    }
                  >
                    Je veux me former
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/accompagnement">
                <Button variant="glass" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                  Je représente une entreprise
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Trust strip */}
          <FadeInWhenVisible direction="up" delay={0.6}>
            <div className="flex items-center gap-stack-xs pt-stack">
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
                    className="h-8 w-8 rounded-pill border-2 border-white/80 object-cover shadow-sm"
                  />
                ))}
              </div>
              <span className="font-body text-caption font-semibold text-white/70">
                <CountUp to={200} suffix="+" className="font-bold text-white" /> formateurs certifiés
              </span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="none" delay={0.9}>
            <div className="pt-section">
              <HeroChevron />
            </div>
          </FadeInWhenVisible>
        </div>
      </HeroParallax>

      {/* ── 2. Marquee logos ─────────────────────────────────────────────── */}
      <section className="border-y border-ink-100 py-stack-lg bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-stack">
          <p className="font-body text-caption text-ink-500 text-center uppercase tracking-widest font-semibold m-0">
            <CountUp to={40} suffix="+" className="text-ink-900 font-bold" /> organisations leur
            font confiance
          </p>
          <MarqueeRow
            duration={50}
            items={LOGOS.map((name) => (
              <span
                key={name}
                className="font-display text-h3 font-bold text-ink-300 tracking-tight whitespace-nowrap hover:text-ink-500 transition-colors duration-base"
              >
                {name}
              </span>
            ))}
          />
          <p className="font-body text-micro text-ink-400 text-center italic m-0">
            Logos illustratifs · partenaires confirmés communiqués prochainement.
          </p>
        </div>
      </section>

      {/* ── 3. Bento 3 leviers ───────────────────────────────────────────── */}
      <section className="relative py-page bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section-lg">
          <FadeInWhenVisible direction="up">
            <div className="max-w-3xl flex flex-col gap-stack">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Trois leviers · un cycle complet
              </span>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Formation, technologie,{' '}
                <span className="text-accent-500">accompagnement.</span>
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                Trois portes d'entrée vers la même destination : une organisation qui apprend
                vraiment.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Bento grid — Learning App grande, Formation + Accompagnement petites */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 gap-stack-lg">
            {/* Hero card — Learning App (lg:col-span-3 row-span-2) */}
            <FadeInWhenVisible
              direction="up"
              className="md:col-span-2 lg:col-span-3 lg:row-span-2"
            >
              <article
                onClick={() => navigate('/marketing/learning-app')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/marketing/learning-app');
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-white to-primary-100/40 border border-primary-100 hover:border-primary-300 hover:shadow-2xl transition-all duration-500 cursor-pointer min-h-[420px] lg:min-h-[560px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                {/* Decorative halo */}
                <div
                  aria-hidden
                  className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none group-hover:bg-primary-200/60 transition-colors duration-700"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-24 -left-24 w-80 h-80 rounded-pill bg-accent-100/40 blur-3xl pointer-events-none"
                />

                <div className="relative p-stack-lg lg:p-section-lg flex flex-col h-full justify-between gap-section">
                  <div className="flex flex-col gap-stack-lg">
                    <div className="inline-flex w-14 h-14 rounded-2xl bg-primary-100 items-center justify-center text-primary-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-base">
                      <Smartphone size={28} />
                    </div>
                    <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                      Learning App SBO
                    </span>
                    <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-ink-900 leading-[1.1] m-0 max-w-md">
                      La plateforme qui{' '}
                      <span className="text-primary-700">apprend avec vous</span>.
                    </h3>
                    <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-md">
                      Parcours adaptatifs, Passeport Dreyfus, coaching intégré, matching IA. Une
                      expérience apprenante de bout en bout.
                    </p>
                  </div>

                  <div className="flex flex-col gap-stack-lg">
                    {/* Mini feature list */}
                    <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                      {[
                        'Passeport Dreyfus mesurable',
                        'Matching Talents-Projets par IA',
                        'Coaching 1-1 intégré',
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-stack-xs">
                          <CheckCircle2 size={16} className="text-primary-600 shrink-0" />
                          <span className="font-body text-body-sm text-ink-700">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-stack-xs text-primary-700 font-semibold">
                      <span>Explorer la Learning App</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-2 transition-transform duration-base"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </FadeInWhenVisible>

            {/* Formation card (lg:col-span-2) */}
            <FadeInWhenVisible
              direction="up"
              delay={0.1}
              className="md:col-span-1 lg:col-span-2"
            >
              <article
                onClick={() => navigate('/marketing/formation')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/marketing/formation');
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-50/60 via-white to-secondary-100/30 border border-secondary-100 hover:border-secondary-300 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[260px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
              >
                <div
                  aria-hidden
                  className="absolute -bottom-20 -right-20 w-72 h-72 rounded-pill bg-secondary-200/30 blur-3xl pointer-events-none"
                />
                <div className="relative p-stack-lg flex flex-col h-full justify-between gap-stack-lg">
                  <div className="flex flex-col gap-stack">
                    <div className="inline-flex w-12 h-12 rounded-xl bg-secondary-100 items-center justify-center text-secondary-700 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-base">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">
                      Formation certifiante
                    </h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Formateurs Augmentés · méthode STRIDE · pédagogie active. Devenez architecte
                      de l'apprentissage IA-augmenté.
                    </p>
                  </div>
                  <div className="flex items-center gap-stack-xs text-secondary-700 font-semibold text-body-sm">
                    <span>En savoir plus</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-base"
                    />
                  </div>
                </div>
              </article>
            </FadeInWhenVisible>

            {/* Accompagnement card (lg:col-span-2) */}
            <FadeInWhenVisible
              direction="up"
              delay={0.2}
              className="md:col-span-1 lg:col-span-2"
            >
              <article
                onClick={() => navigate('/marketing/accompagnement')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/marketing/accompagnement');
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50/60 via-white to-accent-100/30 border border-accent-100 hover:border-accent-300 hover:shadow-xl transition-all duration-500 cursor-pointer min-h-[260px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              >
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-72 h-72 rounded-pill bg-accent-200/30 blur-3xl pointer-events-none"
                />
                <div className="relative p-stack-lg flex flex-col h-full justify-between gap-stack-lg">
                  <div className="flex flex-col gap-stack">
                    <div className="inline-flex w-12 h-12 rounded-xl bg-accent-100 items-center justify-center text-accent-700 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-base">
                      <Compass size={24} />
                    </div>
                    <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">
                      Accompagnement SBO
                    </h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Conseil stratégique · déploiement sur mesure · pilotage Skills-Based. Avec
                      vous, pas pour vous.
                    </p>
                  </div>
                  <div className="flex items-center gap-stack-xs text-accent-700 font-semibold text-body-sm">
                    <span>En savoir plus</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-base"
                    />
                  </div>
                </div>
              </article>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 4. Interactive Product Demo ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-page">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-page items-center">
            {/* Colonne texte */}
            <div className="flex flex-col gap-stack-lg">
              <FadeInWhenVisible direction="up">
                <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                  Démo · 30 secondes
                </span>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.1}>
                <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                  Essaie-la avant{' '}
                  <span className="bg-gradient-to-br from-primary-600 to-accent-500 bg-clip-text text-transparent">
                    d'en parler à ton équipe
                  </span>
                  .
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible direction="up" delay={0.2}>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-lg">
                  Pas de demo call, pas de slides. Clique sur les onglets de la maquette, regarde
                  l'app vivre, comprends en 30 secondes.
                </p>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.3}>
                <ul className="flex flex-col gap-stack m-0 p-0 list-none pt-stack">
                  {[
                    'Passeport Compétences Dreyfus — Novice → Expert mesurable',
                    'Matching Talents-Projets par IA',
                    'Coaching 1-1 intégré (messagerie, corrections, visio)',
                    'Journal de bord réflexif + Veille pédagogique IA',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-stack-xs.5">
                      <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-body text-body text-ink-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>

              <FadeInWhenVisible direction="up" delay={0.4}>
                <div className="flex items-center gap-stack-xs pt-stack">
                  <Link to="/marketing/learning-app">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Voir toutes les fonctionnalités
                    </Button>
                  </Link>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Colonne mockup — glass container */}
            <FadeInWhenVisible direction="left" delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-12 bg-gradient-to-br from-primary-100/50 via-accent-100/30 to-primary-50/40 blur-3xl pointer-events-none"
                />
                <TiltCard maxRotation={6} className="relative">
                  <InteractiveAppMockup />
                </TiltCard>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 5. SkillMap — La méthode TLS se dessine ─────────────────────── */}
      <SkillMapSection />

      {/* ── 6. Manifesto pull-quote (dark ancre éditoriale) ──────────────── */}
      <section className="relative py-page overflow-hidden bg-ink-900">
        {/* Mesh gradient dark */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(700px circle at 25% 30%, rgba(85, 161, 180, 0.32), transparent 55%),
              radial-gradient(600px circle at 75% 70%, rgba(248, 176, 68, 0.18), transparent 55%),
              radial-gradient(500px circle at 50% 50%, rgba(237, 132, 58, 0.08), transparent 60%)
            `,
          }}
        />
        {/* Grain texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: GRAIN_SVG }}
        />

        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-section">
          <FadeInWhenVisible direction="up">
            <Quote size={48} className="text-accent-400" />
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium text-white leading-[1.2] tracking-tight m-0">
              L'enjeu n'est pas de produire{' '}
              <span className="text-white/40">plus de contenu</span>.
              <br />
              C'est de produire des{' '}
              <span className="text-accent-400 font-bold italic">apprenants augmentés</span>.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex items-center gap-stack-xs">
              <div className="w-12 h-px bg-white/30" />
              <span className="font-body text-caption text-white/60 tracking-widest uppercase font-semibold">
                Notre philosophie
              </span>
              <div className="w-12 h-px bg-white/30" />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 6. Humains + outils ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-page">
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
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
                <span className="bg-gradient-to-br from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  avec des humains
                </span>{' '}
                — accompagnés par des outils.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-lg">
                Nos formateurs deviennent des architectes de l'apprentissage. Des pédagogues qui
                maîtrisent l'IA sans s'y soumettre. Des artisans qui combinent technologie et
                présence.
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/formation">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
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

          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-ink-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop"
                  alt="Formatrice augmentée en session"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute -bottom-6 -left-6 max-w-xs bg-white/95 backdrop-blur-glass-light rounded-2xl shadow-2xl border border-ink-100 p-stack-lg flex flex-col gap-stack-xs"
              >
                <Quote size={20} className="text-primary-500" />
                <p className="font-display font-medium text-body text-ink-900 leading-snug m-0">
                  "Je ne forme plus, je crée des expériences."
                </p>
                <p className="font-body text-caption text-ink-500 m-0">Sophie, promotion 2026</p>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 7. Témoignage unique éditorial ───────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInWhenVisible direction="up">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-section-lg items-center">
              <blockquote className="relative flex flex-col gap-section">
                <Quote
                  size={56}
                  className="text-primary-200 shrink-0"
                  aria-hidden
                />
                <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-ink-900 leading-[1.25] tracking-tight m-0">
                  "{FEATURED_TESTIMONIAL.quote}"
                </p>
                <footer className="flex items-center gap-stack-lg pt-stack border-t border-ink-100">
                  <div className="flex flex-col gap-0.5">
                    <cite className="font-display font-bold text-body text-ink-900 not-italic">
                      {FEATURED_TESTIMONIAL.author}
                    </cite>
                    <span className="font-body text-body-sm text-ink-500">
                      {FEATURED_TESTIMONIAL.role} · {FEATURED_TESTIMONIAL.org}
                    </span>
                  </div>
                </footer>
              </blockquote>

              <div className="relative order-first md:order-last">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl ring-1 ring-ink-100">
                  <img
                    src={FEATURED_TESTIMONIAL.portrait}
                    alt={FEATURED_TESTIMONIAL.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Brand badge floating */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-pill bg-white shadow-lg border border-ink-100">
                  <span className="font-display font-bold text-body-sm text-ink-900">
                    {FEATURED_TESTIMONIAL.org}
                  </span>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <p className="font-body text-caption text-ink-400 italic m-0 mt-section text-center">
            Témoignage illustratif — de vrais retours clients seront publiés à mesure que les
            autorisations sont reçues.
          </p>
        </div>
      </section>

      {/* ── 8. Hero stat impact ──────────────────────────────────────────── */}
      <section className="relative py-page bg-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(700px circle at 30% 40%, rgba(85, 161, 180, 0.10), transparent 55%),
              radial-gradient(600px circle at 70% 60%, rgba(248, 176, 68, 0.08), transparent 55%)
            `,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 flex flex-col gap-section-lg">
          {/* Hero stat */}
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col items-center text-center gap-stack">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Impact mesuré
              </span>
              <div className="font-display font-extrabold text-[clamp(5rem,15vw,12rem)] leading-[0.9] tracking-tighter m-0">
                <span className="bg-gradient-to-br from-primary-500 via-primary-700 to-accent-500 bg-clip-text text-transparent">
                  <CountUp to={97} suffix="%" />
                </span>
              </div>
              <p className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-ink-700 max-w-2xl m-0 leading-snug">
                des apprenants déclarent une{' '}
                <span className="text-ink-900 font-bold">progression mesurable</span> en moins de
                90 jours.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Stats secondaires */}
          <FadeInWhenVisible direction="up" delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg pt-section border-t border-ink-100">
              {[
                { to: 200, suffix: '+', label: 'formateurs certifiés' },
                { to: 40, suffix: '+', label: 'organisations clientes' },
                { to: 120, suffix: '+', label: 'modules pédagogiques' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center gap-tight">
                  <CountUp
                    to={s.to}
                    suffix={s.suffix}
                    className="font-display text-h2 font-extrabold text-ink-900 leading-none"
                  />
                  <span className="font-body text-caption text-ink-500 uppercase tracking-wider font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 9. CTA finale light éditorial ────────────────────────────────── */}
      <section className="relative py-page overflow-hidden bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30">
        {/* Halos pastels */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-pill bg-primary-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-pill bg-accent-200/30 blur-3xl" />
        </div>
        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: GRAIN_SVG }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col gap-stack-lg items-center">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs">
              <Sparkles size={14} className="text-accent-500" />
              <span className="font-body text-caption font-semibold text-ink-600 tracking-wider uppercase">
                30 minutes · 30 jours pour déployer
              </span>
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0">
              Et si on en parlait{' '}
              <span className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-500 bg-clip-text text-transparent">
                de vive voix
              </span>{' '}
              ?
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
              30 minutes pour comprendre vos enjeux et tracer le chemin le plus court vers
              l'impact. Pas de slides, pas de démo formatée. Juste une conversation.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button variant="ghost" size="xl">
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
