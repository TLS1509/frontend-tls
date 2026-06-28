/**
 * MarketingMethode — STRIDE methodology — Premium Minimal (redesign)
 *
 * Direction: signature method page. Visual step-by-step (S-T-R-I-D-E) + principles + use cases.
 * Suppression: MeshGradientBg, ParallaxLayer, GradientText, NoiseTexture.
 * Fonds blanc/primary-50. Accents accent-400.
 *
 * STRIDE = S'orienter · Tester · Réaliser · Intégrer · Déployer · Évoluer
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
  FadeInWhenVisible,
  MagneticButton,
  CountUp,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const STRIDE_STEPS = [
  {
    letter: 'S',
    word: "S'orienter",
    title: 'Audit de maturité & sensibilisation',
    desc: "On part du réel. Audit de l'organisation, cartographie des compétences Dreyfus, identification des cas d'usage pédagogiques prioritaires. Pas de solution avant le diagnostic. Pas de diagnostic sans écoute.",
    icon: <Compass size={28} />,
    deliverable: 'Rapport audit + feuille de route compétences',
  },
  {
    letter: 'T',
    word: 'Tester',
    title: 'Proof of concept sur un périmètre réel',
    desc: "On valide le modèle avant de scaler. Des parcours sur-mesure créés dans la Learning App pour tester l'approche pédagogique avec une cohorte pilote. On mesure, on ajuste, on décide.",
    icon: <Target size={28} />,
    deliverable: 'Dispositif pilote validé',
  },
  {
    letter: 'R',
    word: 'Réaliser',
    title: "Construction de l'infrastructure pédagogique",
    desc: "Développement des agents IA, des référentiels de compétences et des parcours sur-mesure. Prototypage avec vos équipes : chaque brique est testée par vos apprenants pilotes avant déploiement.",
    icon: <BookOpen size={28} />,
    deliverable: 'Dispositif conçu, testé et validé',
  },
  {
    letter: 'I',
    word: 'Intégrer',
    title: 'Connexion à votre stack technique',
    desc: "La solution se branche sur l'existant : LMS, SIRH, CRM. Pas de grand remplacement, pas de silo supplémentaire. Un seul écosystème cohérent, avec la Learning App comme colonne vertébrale.",
    icon: <Play size={28} />,
    deliverable: 'Stack technique connectée',
  },
  {
    letter: 'D',
    word: 'Déployer',
    title: 'Mise en production & accompagnement au changement',
    desc: "Lancement officiel auprès de tous les collaborateurs. Onboarding sur la Learning App, activation des Passeports de Compétences. L'adoption se conçoit dès l'étape R.",
    icon: <Award size={28} />,
    deliverable: 'Solution déployée + tableau de bord compétences',
  },
  {
    letter: 'E',
    word: 'Évoluer',
    title: 'Amélioration continue pilotée par la donnée',
    desc: "STRIDE ne s'arrête pas au déploiement. On analyse la vélocité des compétences, l'engagement et les skill gaps émergents pour mettre à jour les outils IA et les référentiels.",
    icon: <RefreshCw size={28} />,
    deliverable: 'Tableau de bord compétences + backlog mensuel',
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
    desc: "Chaque étape produit un livrable concret et validable. Pas de big bang : on ajuste à chaque pas.",
  },
  {
    icon: <Users size={24} />,
    title: 'Co-conception',
    desc: "Vous n'êtes pas spectateur du processus. Vous co-construisez avec nous. Votre autonomie à l'issue du projet est notre seul vrai livrable.",
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
  },
  {
    badge: 'Parcours certifiant',
    title: 'Manager Augmenté · 8 semaines',
    metric: '92 % de complétion',
    desc: "Cohorte mixte managers + L&D. STRIDE a permis d'aligner le programme sur les vrais cas d'usage opérationnels, validés en JAC à chaque étape.",
  },
  {
    badge: 'Workflow learning',
    title: 'Compagnon IA dans le CRM',
    metric: 'Adoption 78 % en 3 mois',
    desc: "Une scale-up tech a embarqué la méthode dans son outil métier. Apprentissage 'just-in-time' rythmé par les vrais moments du flux de travail.",
  },
];

export const MarketingMethode: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title="La Méthode STRIDE"
        description="STRIDE : S'orienter, Tester, Réaliser, Intégrer, Déployer, Évoluer. La méthode TLS pour transformer vos pratiques pédagogiques avec l'IA, de l'audit initial à l'évolution continue."
        canonical="/marketing/methode"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-pill bg-accent-400/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light shadow-xs">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                La méthode TLS · STRIDE
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight m-0 text-[clamp(3rem,8vw,6rem)]">
              Six étapes.{' '}
              <span className="text-accent-400">Un cadre qui marche</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              STRIDE est la méthode TLS pour déployer une organisation apprenante augmentée par l'IA : de l'audit initial à l'évolution continue des compétences. Six étapes, des livrables tangibles à chaque jalon.
            </p>
          </FadeInWhenVisible>

          {/* Mega letters preview */}
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex items-center justify-center gap-stack-xs sm:gap-stack pt-stack flex-wrap">
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
                  <div className="flex items-center gap-stack lg:flex-col lg:items-start lg:gap-tight lg:w-40">
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ type: 'spring', stiffness: 240, damping: 16, delay: i * 0.05 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 border-2 border-primary-400 text-primary-700 font-display font-extrabold text-[3rem] shrink-0 leading-none"
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
                    <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white border border-ink-200 text-ink-700 shadow-xs">
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
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Quatre règles qu'on ne casse{' '}
                <span className="text-accent-400">jamais</span>.
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
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-700 border border-primary-100">
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
                  className="h-full rounded-3xl border border-ink-100 bg-white p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl hover:border-primary-200 transition-shadow duration-base"
                >
                  <span className="inline-flex self-start items-center gap-tight px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 text-ink-700 font-body text-caption font-bold uppercase tracking-wider">
                    {u.badge}
                  </span>
                  <h3 className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                    {u.title}
                  </h3>
                  <div className="inline-flex self-start items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200">
                    <Sparkles size={14} className="text-accent-400" />
                    <span className="font-display font-bold text-body-sm text-primary-700">{u.metric}</span>
                  </div>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {u.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — brand gradient ──────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-500/25 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center">
          <FadeInWhenVisible direction="up">
            <div className="w-full rounded-3xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 shadow-2xl p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
                On applique STRIDE{' '}
                <span className="text-accent-400">à votre contexte</span> ?
              </h2>
              <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
                On démarre par un diagnostic de 90 min : audit de maturité pédagogique et identification de vos cas d'usage prioritaires. On repart avec un cadrage concret de l'étape S'orienter.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/contact">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Demander un diagnostic
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/accompagnement">
                  <Button variant="glass" size="lg" trailingIcon={<Briefcase size={16} />}>
                    Voir l'accompagnement
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingMethode;
