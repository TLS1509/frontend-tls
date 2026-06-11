/**
 * MarketingConseil — Conseil & Accompagnement
 * Fusionne MarketingAccompagnement + MarketingMethode. Route : /conseil
 *
 * Source : docs/marketing/FAITS-OFFRES.md §3 + §4 · docs/_canon/FACTS-CANON.md
 * Règles : vous · 0 prix affiché (⏸️ gelé) · 0 GradientText · 0 FadeInWhenVisible
 * · Reveal local visible-par-défaut · 0 em-dash · 1 section dark (CTA final)
 * · lane LIGHT+warm · STRIDE ordre canon R avant I
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Search,
  PenLine,
  Link2,
  Zap,
  RefreshCw,
  Lightbulb,
  Users,
  CheckCircle2,
  Gift,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { MeshGradientBg } from '../../components/marketing/motion';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ y: 24 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// STRIDE : ordre canonique R avant I (FACTS-CANON A1 : Réaliser avant Intégrer)
const STRIDE_STEPS = [
  {
    letter: 'S',
    word: "S'orienter",
    title: 'Cadrer les enjeux',
    desc: "Audit de l'existant, identification des cas d'usage IA prioritaires, cadrage des objectifs mesurables. On ne choisit pas d'outil avant de comprendre le contexte.",
    icon: <Compass size={18} />,
    color: 'bg-primary-600',
    light: 'bg-primary-50 border-primary-200 text-primary-700',
  },
  {
    letter: 'T',
    word: 'Tester',
    title: "Valider avant d'investir",
    desc: "Prototype rapide sur un périmètre limité. On valide les hypothèses pédagogiques et techniques avant d'engager les ressources au complet.",
    icon: <Search size={18} />,
    color: 'bg-secondary-500',
    light: 'bg-secondary-50 border-secondary-200 text-secondary-700',
  },
  {
    letter: 'R',
    word: 'Réaliser',
    title: 'Concevoir les ressources',
    desc: "Production des ressources pédagogiques augmentées : contenus, prompts, évaluations, activités adaptatives. C'est là que l'IA accélère le plus le travail d'ingénierie.",
    icon: <PenLine size={18} />,
    color: 'bg-secondary-600',
    light: 'bg-secondary-50 border-secondary-200 text-secondary-700',
  },
  {
    letter: 'I',
    word: 'Intégrer',
    title: 'Connecter aux outils existants',
    desc: "Intégration dans les LMS, outils métier et workflows de l'organisation. Connexion au passeport de compétences pour rendre l'apprentissage visible et mesurable.",
    icon: <Link2 size={18} />,
    color: 'bg-accent-500',
    light: 'bg-accent-50 border-accent-200 text-accent-700',
  },
  {
    letter: 'D',
    word: 'Déployer',
    title: 'Mettre en production',
    desc: "Animation, accompagnement des formateurs, déploiement à grande échelle. Les équipes terrain s'approprient le dispositif et le font vivre.",
    icon: <Zap size={18} />,
    color: 'bg-primary-700',
    light: 'bg-primary-50 border-primary-200 text-primary-700',
  },
  {
    letter: 'E',
    word: 'Évoluer',
    title: 'Mesurer et itérer',
    desc: "Collecte des signaux d'usage, mesure d'impact, identification des frictions. Le dispositif s'améliore en continu et le passeport de compétences s'enrichit à chaque cycle.",
    icon: <RefreshCw size={18} />,
    color: 'bg-primary-500',
    light: 'bg-primary-50 border-primary-200 text-primary-700',
  },
];

const AUDIT_DELIVERABLES = [
  "État des lieux de vos pratiques de formation et de votre maturité IA",
  "Cartographie des compétences et identification des skills gaps prioritaires",
  "Rapport de recommandations avec feuille de route vers STRIDE",
];

const POLES = [
  {
    eyebrow: 'Pôle Conception & Diagnostic',
    lead: 'Chloé Mimault',
    role: 'Tech · ingénierie pédagogique · produit',
    services: [
      "Audit Flash SBO (0,5 à 1 jour)",
      "Architecture de dispositifs et design de parcours",
      "Création de contenus Power Skills (micro-learning, vidéo, ancrage mémoriel)",
      "Ingénierie de certification Open Badges",
    ],
    icon: <Lightbulb size={22} />,
    cardTone: 'border-primary-200 bg-gradient-to-br from-primary-50/60 to-white',
    iconTone: 'bg-primary-100 text-primary-700 border-primary-200',
    checkTone: 'text-primary-500',
  },
  {
    eyebrow: 'Pôle Delivery & Animation',
    lead: 'Pierre-Armand Dennery',
    role: 'Commercial · delivery · animation',
    services: [
      "Animation et coaching (C-Campus et partenaires)",
      "Conférences et masterclasses sur la Skills-Based Organization",
      "Maintenance et support des outils IA déployés",
    ],
    icon: <Users size={22} />,
    cardTone: 'border-secondary-200 bg-gradient-to-br from-secondary-50/60 to-white',
    iconTone: 'bg-secondary-100 text-secondary-700 border-secondary-200',
    checkTone: 'text-secondary-500',
  },
];

export const MarketingConseil: React.FC = () => {
  return (
    <main className="bg-white">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative max-w-medium mx-auto px-6 flex flex-col gap-stack-lg">
          <Reveal>
            <span className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-pill bg-white border border-primary-200 shadow-xs">
              <Sparkles size={13} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                Conseil & Accompagnement
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.0] tracking-tight m-0 text-[clamp(2.5rem,6vw,4.5rem)] max-w-content">
              La formation se prouve sur le terrain.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Nous aidons les ETI et les organismes de formation à passer de l'intention à
              la preuve, avec la méthode STRIDE : une boucle Learn, Do, Match opérationnelle.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-body text-caption font-semibold px-3 py-1 rounded-pill bg-ink-100 text-ink-700">
                ETI 200 à 2 000 salariés
              </span>
              <span className="font-body text-caption font-semibold px-3 py-1 rounded-pill bg-ink-100 text-ink-700">
                Organismes de formation
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-stack">
              <Link to="/contact">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Démarrer par l'Audit Flash
                </Button>
              </Link>
              <Link to="#stride">
                <Button variant="ghost" size="lg">
                  Voir la méthode STRIDE
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Audit Flash SBO — porte d'entrée ────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-medium mx-auto px-6">
          <Reveal>
            <div className="rounded-3xl border border-secondary-200 bg-gradient-to-br from-secondary-50 via-white to-accent-50/30 p-section lg:p-section-lg">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_140px] gap-section-sm items-start">

                <div className="flex flex-col gap-stack-lg">
                  <div className="flex flex-col gap-stack">
                    <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-widest">
                      La porte d'entrée
                    </span>
                    <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-ink-900 leading-[1.1] tracking-tight m-0">
                      L'Audit Flash SBO
                    </h2>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
                      En 0,5 à 1 journée, on produit un diagnostic express de votre organisation :
                      état des compétences, identification des skills gaps prioritaires et
                      recommandations concrètes. La feuille de route vers STRIDE en sort directement.
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                    {AUDIT_DELIVERABLES.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 font-body text-body-sm text-ink-700">
                        <CheckCircle2 size={16} className="text-secondary-600 shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-stack pt-1">
                    <Link to="/contact">
                      <Button variant="warm" size="md" trailingIcon={<ArrowRight size={16} />}>
                        Demander l'Audit Flash
                      </Button>
                    </Link>
                    <span className="font-body text-caption text-ink-500">
                      Mène vers STRIDE si vous souhaitez aller plus loin
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-center justify-center gap-1 pt-2">
                  <span className="font-display text-[5rem] font-extrabold text-secondary-100 leading-none select-none">
                    1j
                  </span>
                  <span className="font-body text-caption text-ink-400 text-center leading-snug">
                    diagnostic express
                  </span>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STRIDE — 6 étapes ───────────────────────────────────────────── */}
      <section id="stride" className="py-page bg-ink-50/30 border-y border-ink-100">
        <div className="max-w-medium mx-auto px-6 flex flex-col gap-section">

          <div className="flex flex-col gap-stack max-w-content">
            <Reveal>
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                La méthode
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Six étapes. De l'intention à la preuve.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-body text-ink-600 m-0">
                Chaque étape produit un livrable concret, validé avec vous avant de passer
                à la suivante. Pas de big bang en fin de mission.
              </p>
            </Reveal>
          </div>

          {/* Steps */}
          <div className="flex flex-col divide-y divide-ink-100 border border-ink-100 rounded-3xl overflow-hidden bg-white shadow-sm">
            {STRIDE_STEPS.map((step, i) => (
              <Reveal key={step.letter} delay={i * 0.05}>
                <div className="grid grid-cols-[3.5rem_1fr] lg:grid-cols-[5rem_1fr] gap-stack lg:gap-stack-lg items-start p-stack-lg hover:bg-ink-50/40 transition-colors duration-fast">

                  {/* Letter badge */}
                  <div className="flex flex-col items-center gap-1.5 pt-0.5">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl text-white font-display font-extrabold text-2xl shadow-sm shrink-0 leading-none ${step.color}`}
                    >
                      {step.letter}
                    </span>
                    <span className="hidden lg:block font-body text-micro text-ink-400 uppercase tracking-wider text-center leading-tight">
                      étape {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-h5 font-extrabold text-ink-900 leading-tight m-0">
                        {step.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-pill border text-caption font-semibold ${step.light}`}>
                        {step.icon}
                        {step.word}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      {step.desc}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

          {/* Bonus Learning App */}
          <Reveal>
            <div className="flex items-start gap-3 rounded-2xl border border-accent-200 bg-accent-50/60 p-stack-lg">
              <Gift size={20} className="text-accent-600 shrink-0 mt-0.5" />
              <p className="font-body text-body-sm text-ink-700 m-0">
                <span className="font-bold text-ink-900">1 an d'abonnement Learning App offert</span>
                {' '}pour tout contrat STRIDE. La boucle Learn, Do, Match reste active bien
                après la fin de la mission.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 2 Pôles ─────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-medium mx-auto px-6 flex flex-col gap-section">

          <div className="flex flex-col gap-stack max-w-content">
            <Reveal>
              <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-widest">
                L'équipe
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Deux expertises, une méthode.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {POLES.map((pole, i) => (
              <Reveal key={pole.lead} delay={i * 0.08}>
                <article className={`h-full rounded-3xl border p-section flex flex-col gap-stack-lg ${pole.cardTone}`}>
                  <div className="flex items-start gap-stack">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border shrink-0 ${pole.iconTone}`}>
                      {pole.icon}
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                        {pole.eyebrow}
                      </span>
                      <span className="font-display text-h5 font-extrabold text-ink-900 leading-tight">
                        {pole.lead}
                      </span>
                      <span className="font-body text-caption text-ink-500">
                        {pole.role}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2 m-0 p-0 list-none flex-1">
                    {pole.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 font-body text-body-sm text-ink-700">
                        <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${pole.checkTone}`} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA final (dark — 1 seule section dark autorisée) ───────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950">
        <MeshGradientBg tone="ink" intensity="subtle" />
        <div className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-stack-lg">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              On démarre par l'Audit Flash ?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-body-lg text-white/80 max-w-2xl m-0">
              Réservez un échange de 30 minutes pour cadrer votre situation.
              On repart avec un premier diagnostic et une feuille de route.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-stack">
              <Link to="/contact">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Réserver un échange
                </Button>
              </Link>
              <Link to="/learning-app">
                <Button variant="glass" size="lg" trailingIcon={<BookOpen size={16} />}>
                  Voir la Learning App
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
};

export default MarketingConseil;
