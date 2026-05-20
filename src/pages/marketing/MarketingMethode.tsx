/**
 * MarketingMethode — STRIDE methodology (Phase P3.5)
 *
 * Direction: signature method page. Visual step-by-step (S-T-R-I-D-E) + principles + use cases.
 * Tone: brand primary dominant + sun accents.
 *
 * ⚠️ PLACEHOLDER CONTENT — the STRIDE acronym expansion below is illustrative.
 * Replace with the real STRIDE definition from TLS before production.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Target,
  BookOpen,
  Play,
  RefreshCw,
  Award,
  CheckCircle2,
  Briefcase,
  Users,
  Brain,
  Lightbulb,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  CountUp,
  NoiseTexture,
} from '../../components/marketing/motion';

// ⚠️ PLACEHOLDER — Acronyme STRIDE illustratif. Remplacer par la vraie définition TLS.
const STRIDE_STEPS = [
  {
    letter: 'S',
    word: 'Scope',
    title: 'Cadrer le besoin',
    desc: "On commence par comprendre le contexte, les contraintes et les objectifs. Pas de solution avant le diagnostic — un parcours mal cadré, c'est de l'énergie perdue.",
    icon: <Compass size={28} />,
    deliverable: 'Brief pédagogique validé',
    tone: 'from-primary-500 to-primary-700',
  },
  {
    letter: 'T',
    word: 'Target',
    title: 'Définir la cible',
    desc: "Compétences visées, niveau Dreyfus de départ et d'arrivée, indicateurs de succès. La cible structure toutes les décisions suivantes.",
    icon: <Target size={28} />,
    deliverable: 'Référentiel compétences',
    tone: 'from-primary-600 to-secondary-500',
  },
  {
    letter: 'R',
    word: 'Resource',
    title: 'Concevoir les ressources',
    desc: "Contenus, activités, évaluations. C'est là que l'IA accélère le plus : génération de variantes, adaptation par profil, qualité reproductible.",
    icon: <BookOpen size={28} />,
    deliverable: 'Catalogue de ressources IA-augmentées',
    tone: 'from-secondary-500 to-secondary-600',
  },
  {
    letter: 'I',
    word: 'Intervention',
    title: 'Animer la séance',
    desc: "Présentiel, distanciel, asynchrone. L'IA aide à personnaliser le rythme et le feedback en temps réel. Le formateur garde la main sur la dynamique.",
    icon: <Play size={28} />,
    deliverable: 'Plan d\'animation augmenté',
    tone: 'from-secondary-600 to-accent-500',
  },
  {
    letter: 'D',
    word: 'Debrief',
    title: 'Évaluer & ancrer',
    desc: "Le moment qu'on saute toujours et qui fait toute la différence. On mesure ce qui compte, on capture les apprentissages, on alimente le passeport.",
    icon: <Award size={28} />,
    deliverable: 'Rapport d\'impact + Open Badges',
    tone: 'from-accent-400 to-secondary-500',
  },
  {
    letter: 'E',
    word: 'Evolve',
    title: 'Itérer en continu',
    desc: "Le parcours vit. On collecte les signaux, on identifie les frictions, on améliore. STRIDE n'est pas un cycle fermé — c'est une boucle d'apprentissage permanente.",
    icon: <RefreshCw size={28} />,
    deliverable: 'Backlog d\'amélioration mensuel',
    tone: 'from-accent-400 to-primary-500',
  },
];

const PRINCIPLES = [
  {
    icon: <Brain size={24} />,
    title: "Cadre avant outil",
    desc: "STRIDE détermine quels outils IA on utilise, jamais l'inverse. La méthode est agnostique des modèles, elle survit aux changements de techno.",
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Validation par étape',
    desc: "Chaque étape produit un livrable concret et validable. Pas de big bang en fin de projet — on ajuste à chaque pas.",
  },
  {
    icon: <Users size={24} />,
    title: 'Co-conception',
    desc: "Tu n'es pas spectateur du processus. Tu co-construis avec nous — c'est ta capacité à le refaire seul·e qui mesure notre succès.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: 'Mesurable de bout en bout',
    desc: "À chaque étape, on sait ce qu'on mesure et pourquoi. KPIs pédagogiques, ROI, satisfaction, impact métier.",
  },
];

const USE_CASES = [
  {
    badge: 'Formation interne',
    title: 'Onboarding commercial 2 jours',
    metric: '40 % de temps de conception en moins',
    desc: "Un grand groupe industriel a refondu son onboarding commercial via STRIDE en 5 semaines. L'IA a généré les variantes par secteur, le formateur a animé.",
    tone: 'from-primary-50 to-white border-primary-100',
  },
  {
    badge: 'Parcours certifiant',
    title: 'Manager Augmenté · 8 semaines',
    metric: '92 % de complétion',
    desc: "Cohorte mixte managers + L&D. STRIDE a permis d'aligner le programme sur les vrais cas d'usage opérationnels, validés en JAC à chaque étape.",
    tone: 'from-secondary-50 to-white border-secondary-100',
  },
  {
    badge: 'Workflow learning',
    title: 'Compagnon IA dans le CRM',
    metric: 'Adoption 78 % en 3 mois',
    desc: "Une scale-up tech a embarqué la méthode dans son outil métier. Apprentissage 'just-in-time' rythmé par les vrais moments du flux de travail.",
    tone: 'from-accent-50 to-white border-accent-100',
  },
];

export const MarketingMethode: React.FC = () => {
  return (
    <div className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <MeshGradientBg tone="brand" intensity="normal" />
        <NoiseTexture opacity={0.05} />
        <ParallaxLayer amplitude={60} className="absolute top-1/3 -right-32 pointer-events-none" aria-hidden>
          <div className="w-96 h-96 rounded-pill bg-accent-400/15 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                La méthode TLS · STRIDE
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight m-0 text-[clamp(3rem,8vw,6rem)]">
              Six étapes.{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={10}
              >
                Un cadre qui marche
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              STRIDE est notre méthodologie de conception de parcours augmentés par l'IA.
              Six étapes claires, des livrables tangibles, une boucle d'amélioration continue.
            </p>
          </FadeInWhenVisible>

          {/* Mega letters preview */}
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex items-center justify-center gap-2 sm:gap-stack pt-stack flex-wrap">
              {STRIDE_STEPS.map((s, i) => (
                <motion.span
                  key={s.letter}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.4 + i * 0.05 }}
                  className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-white/30 hover:text-accent-400 transition-colors duration-base tabular-nums leading-none"
                >
                  {s.letter}
                </motion.span>
              ))}
            </div>
          </FadeInWhenVisible>

        </div>
      </section>

      {/* ── 6 STRIDE steps ────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Les 6 étapes
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Du diagnostic à l'évolution continue.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="flex flex-col gap-section">
            {STRIDE_STEPS.map((s, i) => (
              <FadeInWhenVisible key={s.letter} direction="up" delay={0.05}>
                <article
                  className={`grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-stack-lg items-start lg:items-center rounded-3xl p-stack-lg border ${
                    i % 2 === 0 ? 'bg-white border-ink-100' : 'bg-primary-50/30 border-primary-100'
                  } shadow-sm hover:shadow-lg transition-shadow duration-base`}
                >
                  {/* Letter + word */}
                  <div className="flex items-center gap-stack lg:flex-col lg:items-start lg:gap-1 lg:w-40">
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 240, damping: 16, delay: i * 0.05 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${s.tone} text-white font-display font-extrabold text-[3rem] shadow-xl shrink-0 leading-none`}
                    >
                      {s.letter}
                    </motion.span>
                    <div className="flex flex-col lg:gap-0.5">
                      <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-wider">
                        Étape {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-h4 font-extrabold text-ink-900 leading-tight">
                        {s.word}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-stack">
                    <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                      {s.title}
                    </h3>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0">{s.desc}</p>
                  </div>

                  {/* Deliverable badge */}
                  <div className="lg:w-56 flex flex-col gap-stack lg:items-end">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-ink-200 text-ink-700 shadow-xs">
                      {s.icon}
                      <span className="font-body text-caption font-bold uppercase tracking-wider">
                        Livrable
                      </span>
                    </span>
                    <p className="font-body text-body-sm font-semibold text-ink-900 m-0 lg:text-right">
                      {s.deliverable}
                    </p>
                  </div>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
                Principes de la méthode
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Quatre règles qu'on ne casse{' '}
                <GradientText
                  from="from-secondary-500"
                  via="via-secondary-600"
                  to="to-accent-500"
                >
                  jamais
                </GradientText>
                .
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack">
            {PRINCIPLES.map((p, i) => (
              <FadeInWhenVisible key={p.title} direction="up" delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-lg hover:border-primary-200 transition-shadow duration-base"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 border border-primary-100">
                    {p.icon}
                  </span>
                  <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0">
                    {p.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {p.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                STRIDE en action
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois contextes, une méthode.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <p className="font-body text-caption text-ink-400 italic m-0">
                Exemples illustratifs — vrais cas clients publiés dès accord des organisations concernées.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {USE_CASES.map((u, i) => (
              <FadeInWhenVisible key={u.title} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className={`h-full rounded-3xl border bg-gradient-to-br ${u.tone} p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl transition-shadow duration-base`}
                >
                  <span className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-pill bg-white border border-ink-200 text-ink-900 font-body text-caption font-bold uppercase tracking-wider">
                    {u.badge}
                  </span>
                  <h3 className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                    {u.title}
                  </h3>
                  <div className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-pill bg-white/80 border border-ink-200">
                    <Sparkles size={14} className="text-warning-fg" />
                    <span className="font-display font-bold text-body-sm text-ink-900">{u.metric}</span>
                  </div>
                  <p className="font-body text-body-sm text-ink-700 leading-relaxed m-0 flex-1">
                    {u.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950">
        <MeshGradientBg tone="ink" intensity="intense" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              On applique STRIDE{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={8}
              >
                à ton contexte
              </GradientText>
              ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              On démarre par un diagnostic gratuit de 90 min. On repart avec un cadrage de l'étape Scope.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Demander un diagnostic
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/accompagnement">
                <Button
                  variant="ghost"
                  size="lg"
                  trailingIcon={<Briefcase size={16} />}
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                >
                  Voir l'accompagnement
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingMethode;
