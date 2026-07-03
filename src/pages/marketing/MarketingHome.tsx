/**
 * MarketingHome — homepage de production, `/website` (route index).
 *
 * Restructurée le 03/07/2026 pour clarté + suppression du scroll-jack :
 *  - Hero : vidéo full-bleed, fade-in au chargement (aucun scroll-jack). Ajout
 *    d'un eyebrow "Formation · Learning App · Accompagnement" pour dire d'emblée
 *    ce qu'est TLS et ce qu'elle propose.
 *  - L'offre concrète (3 leviers) est remontée juste après la Conviction : on
 *    comprend "ce qu'on vend" avant d'entrer dans la méthode.
 *  - Section méthode : le diagramme SkillMap + 3 cartes statiques Learn/Do/Match.
 *    RETIRÉ : StickyScrollStory (pin 300vh), ParallexTextLayers (parallax texte),
 *    MorphingSVGVisualizer, CounterAnimation, LearnDoMatchVisual — tout le
 *    scroll-jack. Remplacé par une mise en page statique, fade-in classique.
 *
 * Discipline : vous (pas tu), pas de métrique inventée, pas de client fictif,
 * pas d'em dash, CTA verbe+objet. Aucun ParallaxSection / scroll-jack ici.
 *
 * 03/07/2026 (2) — Hero : léger zoom + fondu de la vidéo au scroll (scale
 * 1→1.15, opacity 1→0 sur la hauteur du hero, via useScroll/useTransform).
 * PAS de scroll-jack : le hero n'est jamais épinglé, il défile normalement ;
 * seule la couche vidéo/scrim s'anime en fonction du scroll progress. Le
 * contenu texte (h1/p/CTA) garde son fade-in au chargement, non lié au
 * scroll, pour ne jamais risquer de le faire disparaître en pleine lecture.
 * Neutralisé sous prefers-reduced-motion (scale/opacity fixés à 1).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  BadgeCheck,
  GraduationCap,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  InteractiveAppMockup,
  TiltCard,
  MeshGradientBg,
} from '../../components/marketing/motion';
import { ScrollReveal, ScrollProgressIndicator } from '../../components/marketing/scroll-effects';
import { SEOHead } from './components/SEOHead';
import { SkillMapSection } from './components/SkillMapSection';

// ─── 1. Hero : vidéo full-bleed, fade-in au chargement, pas de scroll-jack ────

const Hero: React.FC = () => {
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
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.75, 1], reduced ? [1, 1, 1] : [1, 0.4, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ scale, opacity: videoOpacity }}
        aria-hidden
      >
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
            <source src="/videos/watercolour-reveal-4s.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-black/45 pointer-events-none" />

      <div className="relative min-h-[100dvh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg"
        >
          <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[24ch] text-[clamp(3rem,7vw,5.5rem)]">
            Vos formateurs,{' '}
            <span className="text-accent-400">augmentés par l'IA</span>.
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
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Conviction : un bandeau teal, une seule affirmation ──────────────────

const Conviction: React.FC = () => (
  <section className="relative bg-primary-700 text-white">
    {/* Seam : adoucit la coupure nette noir (hero) → teal, 03/07/2026 */}
    <div aria-hidden className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
    <div className="max-w-wide mx-auto px-6 py-page lg:py-section-lg">
      <FadeInWhenVisible>
        <h2 className="max-w-5xl font-display font-bold text-white leading-[1.1] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.75rem,3.8vw,3rem)]">
          L'IA ne remplace pas le formateur. Elle l'aide à aller plus loin :
          à personnaliser, à mesurer, et à rendre du temps au métier qui
          compte vraiment.
        </h2>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 3. Ce qu'on propose : 3 offres concrètes (remonté pour la clarté) ───────

type Offer = {
  tag: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
  cta: string;
};

const OFFERS: Offer[] = [
  {
    tag: 'Formation',
    icon: <GraduationCap size={24} />,
    title: 'Formation certifiante',
    desc:
      "Formateurs Augmentés, méthode STRIDE, pédagogie active. Devenez architecte de l'apprentissage IA-augmenté.",
    link: '/website/learning-app',
    cta: 'Voir la formation',
  },
  {
    tag: 'Conseil',
    icon: <Compass size={24} />,
    title: 'Accompagnement',
    desc:
      'Conseil stratégique, déploiement sur mesure, pilotage de la montée en compétences. Avec vous, pas pour vous.',
    link: '/website/accompagnement',
    cta: "Voir l'accompagnement",
  },
];

const LEARNING_APP_FEATURES = [
  'Passeport Dreyfus mesurable',
  'Matching Talents-Projets par IA',
  'Coaching 1-1 intégré',
];

const Offers: React.FC = () => (
  <section className="relative py-page bg-gradient-to-b from-white to-primary-50/30 overflow-hidden">
    <div className="max-w-wide mx-auto px-6 flex flex-col gap-section-lg relative">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Trois façons de{' '}
            <span className="text-accent-500">former à l'ère de l'IA.</span>
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Une plateforme d'apprentissage, une formation certifiante et un
            accompagnement stratégique, vers la même destination : une
            organisation qui apprend vraiment.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-stack-lg">
        {/* Learning App — carte vedette, produit phare montré en premier */}
        <FadeInWhenVisible direction="up" className="lg:col-span-3 lg:row-span-2">
          <Link
            to="/website/learning-app"
            className="group relative flex h-full min-h-[420px] lg:min-h-[560px] flex-col justify-between gap-section overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary-900 to-ink-900 p-stack-lg lg:p-section-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-brand-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          >
            <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-pill bg-primary-500/25 blur-3xl pointer-events-none group-hover:bg-primary-400/35 transition-colors duration-700" />
            <div aria-hidden className="absolute -bottom-20 -left-20 w-72 h-72 rounded-pill bg-accent-400/12 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col gap-stack-lg">
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-white leading-[1.1] m-0 max-w-md">
                La Learning App qui{' '}
                <span className="text-accent-400">apprend avec vous</span>.
              </h3>
              <p className="font-body text-body-lg text-white/70 leading-relaxed m-0 max-w-md">
                Parcours adaptatifs, Passeport Dreyfus, coaching intégré, matching IA. Une expérience apprenante de bout en bout.
              </p>
            </div>

            <div className="relative flex flex-col gap-stack-lg">
              <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                {LEARNING_APP_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-stack-xs">
                    <CheckCircle2 size={15} className="text-accent-400 shrink-0" />
                    <span className="font-body text-body-sm text-white/80">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-stack-xs text-accent-400 font-semibold">
                <span>Explorer la Learning App</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-base" />
              </div>
            </div>
          </Link>
        </FadeInWhenVisible>

        {OFFERS.map((o, i) => (
          <FadeInWhenVisible key={o.title} direction="up" delay={0.1 * (i + 1)} className="lg:col-span-2">
            <Link
              to={o.link}
              className="group relative flex h-full min-h-[260px] flex-col justify-between gap-stack-lg overflow-hidden rounded-2xl border border-secondary-100 bg-gradient-to-br from-secondary-50/60 via-white to-secondary-100/30 p-stack-lg transition-all duration-500 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
            >
              <div aria-hidden className="absolute -bottom-20 -right-20 w-72 h-72 rounded-pill bg-secondary-200/30 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-stack">
                <div className="inline-flex w-12 h-12 rounded-xl bg-secondary-100 items-center justify-center text-secondary-700 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-base">
                  {o.icon}
                </div>
                <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight">{o.title}</h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{o.desc}</p>
              </div>
              <div className="relative flex items-center gap-stack-xs text-secondary-700 font-semibold text-body-sm">
                <span>{o.cta}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-base" />
              </div>
            </Link>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. Méthode : diagramme SkillMap (fusionné avec MethodSteps, 03/07/2026) ─
// SkillMapSection porte désormais aussi la copy Learn/Do/Match en captions
// sous le diagramme — plus de section séparée qui redisait la même boucle.

// ─── 5. Démo produit — features réelles, pas de slides ──────────────────────

const FEATURES = [
  'Parcours adaptatifs avec progression Dreyfus',
  'Coaching 1-1 intégré (messagerie et visio)',
  "Journal de bord réflexif, augmenté par l'IA",
  'Veille pédagogique curée pour votre métier',
];

// ─── 6. Preuve honnête : ce qu'on peut affirmer aujourd'hui, rien de plus ─────

const PROOFS: { title: string; detail: string }[] = [
  { title: 'Open Badge vérifiable', detail: 'une preuve de compétence numérique, partageable et durable.' },
  { title: 'Premiers déploiements en cours', detail: 'dont un grand groupe français, depuis janvier 2026.' },
];

export const MarketingHome: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title="The Learning Society · Former à l'ère de l'IA"
        description="Formation certifiante, Learning App adaptative, accompagnement stratégique. La méthode complète pour que vos formateurs maîtrisent l'IA et forment autrement."
        canonical="/website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'The Learning Society',
          url: 'https://thelearningsociety.fr',
          logo: 'https://thelearningsociety.fr/favicon.svg',
          description:
            "Formation certifiante en IA pédagogique et plateforme LXP pour formateurs. Méthode STRIDE, Learning App, accompagnement stratégique.",
          foundingYear: 2023,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '26 bis rue Olivier Noyer',
            addressLocality: 'Paris',
            postalCode: '75014',
            addressCountry: 'FR',
          },
          sameAs: ['https://www.linkedin.com/company/the-learning-society'],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'hello@thelearningsociety.fr',
            availableLanguage: 'French',
          },
        }}
      />

      <ScrollProgressIndicator height={3} />

      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── 2. Conviction ───────────────────────────────────────────────────── */}
      <Conviction />

      {/* ── 3. Ce qu'on propose (offre remontée pour la clarté) ─────────────── */}
      <Offers />

      {/* ── 4. Méthode : diagramme SkillMap (avec captions Learn/Do/Match) ──── */}
      <SkillMapSection />

      {/* ── 5. Démo produit interactive ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-50 py-page">
        <div className="max-w-wide mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-center">
            <div className="lg:col-span-4 flex flex-col gap-stack-lg">
              <FadeInWhenVisible>
                <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4vw,3.25rem)]">
                  Essayez la plateforme avant d'en parler à votre équipe.
                </h2>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.08}>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-md">
                  Pas de demo call, pas de slides. Cliquez sur les onglets,
                  regardez l'app fonctionner, comprenez en trente secondes ce que
                  vivent vos apprenants.
                </p>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.16}>
                <ul className="flex flex-col gap-stack m-0 p-0 list-none">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-stack-xs">
                      <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                      <span className="font-body text-body text-ink-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </FadeInWhenVisible>
              <FadeInWhenVisible delay={0.24}>
                <div className="pt-stack">
                  <Button to="/website/learning-app" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Voir toutes les fonctionnalités
                  </Button>
                </div>
              </FadeInWhenVisible>
            </div>

            <FadeInWhenVisible delay={0.1} className="lg:col-span-8 flex items-center justify-center">
              <TiltCard maxRotation={6} className="relative w-full">
                <div className="rounded-2xl overflow-hidden ring-1 ring-ink-200 shadow-xl bg-white">
                  <InteractiveAppMockup />
                </div>
              </TiltCard>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 6. Preuve honnête ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-wide mx-auto px-6 py-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-section lg:gap-page items-start">
            <div className="lg:col-span-5">
              <FadeInWhenVisible>
                <div className="flex flex-col gap-stack-lg">
                  <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4vw,3.25rem)]">
                    On préfère prouver que survendre.
                  </h2>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-sm">
                    Pas de métriques gonflées ni de logos empruntés. Voici ce
                    qu'on peut affirmer aujourd'hui : le reste viendra avec les
                    premiers parcours terminés.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              {PROOFS.map((p, i) => (
                <FadeInWhenVisible key={p.title} delay={i * 0.05}>
                  <div className="flex items-start gap-stack-lg border-t border-ink-200/70 py-stack-lg first:border-t-0 last:border-b last:border-ink-200/70">
                    <BadgeCheck size={24} className="text-primary-600 shrink-0 mt-0.5" />
                    <p className="font-body text-body-lg leading-snug m-0">
                      <span className="font-bold text-ink-900">{p.title}</span>
                      <span className="text-ink-600"> • {p.detail}</span>
                    </p>
                  </div>
                </FadeInWhenVisible>
              ))}
              <p className="font-body text-caption text-ink-500 italic mt-stack-lg m-0">
                Les retours de nos formateurs et clients seront publiés ici, avec
                leur accord : pas avant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. En savoir plus : STRIDE + Ressources (fusionnés, 03/07/2026) ──
          Étaient 2 sections pleine largeur identiques en forme (titre + p +
          1 lien), l'une après l'autre — lues comme deux arrière-pensées
          jumelles (critique P1). Fusionnées en 2 cartes compactes côte à côte. */}
      <section className="bg-white border-t border-ink-100">
        <div className="max-w-wide mx-auto px-6 py-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <Link
                to="/website/methode"
                className="group flex h-full flex-col gap-stack rounded-2xl bg-primary-50 p-section transition-colors duration-base hover:bg-primary-100"
              >
                <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                  La méthode STRIDE.
                </h3>
                <p className="font-body text-body text-ink-700 leading-relaxed m-0 flex-1">
                  Six étapes qui relient le besoin métier, le parcours et la
                  preuve de compétence. Sans jargon, sans détour.
                </p>
                <span className="inline-flex items-center gap-stack-xs font-body text-body-sm font-bold text-primary-700 min-h-touch">
                  Découvrir la méthode
                  <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.08}>
              <Link
                to="/website/resources"
                className="group flex h-full flex-col gap-stack rounded-2xl bg-secondary-50 p-section transition-colors duration-base hover:bg-secondary-100"
              >
                <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                  L'IA en formation, sans esbroufe.
                </h3>
                <p className="font-body text-body text-ink-700 leading-relaxed m-0 flex-1">
                  Des analyses concrètes et des retours de terrain, pour décider
                  en connaissance de cause, pas sur la hype.
                </p>
                <span className="inline-flex items-center gap-stack-xs font-body text-body-sm font-bold text-secondary-700 min-h-touch">
                  Lire nos analyses
                  <ArrowRight size={16} className="transition-transform duration-base group-hover:translate-x-1" />
                </span>
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── 9. CTA finale : le seul moment sombre de la page ─────────────────── */}
      {/* 03/07/2026 — Second bouton ("Explorer la plateforme" → learning-app)
          retiré : répétait la bifurcation du hero (déjà vue à la seconde 0) sans
          rien apporter de neuf après 9 sections. Un lecteur qui vient de voir la
          démo + les preuves n'a plus besoin d'un nudge générique "explorer" —
          la fin doit converger vers UNE action, pas rouvrir le menu de départ. */}
      <section className="bg-white border-t border-ink-100">
        <div className="max-w-wide mx-auto px-6 pt-page pb-page">
          <ScrollReveal distance={32} duration={800}>
            <div className="relative overflow-hidden rounded-2xl bg-ink-900 text-white px-6 py-page sm:px-section-lg">
              <MeshGradientBg tone="ink" intensity="subtle" />
              <div className="relative max-w-content flex flex-col gap-stack-lg">
                <h2 className="font-display font-extrabold text-white leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.25rem,5vw,4rem)]">
                  Discutons de vos enjeux, pas de la hype.
                </h2>
                <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-2xl">
                  Trente minutes pour comprendre votre contexte et tracer le chemin
                  le plus court vers l'impact. Sans engagement.
                </p>
                <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                  <MagneticButton strength={16}>
                    <Button to="/website/contact" variant="secondary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                      Réserver un échange
                    </Button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default MarketingHome;
