/**
 * MarketingLearningApp — Redesign v2 (Phase P2.6)
 *
 * New sections:
 *  - Dreyfus interactif: 5-level selector with animated panel
 *  - Features bento: varied-size grid replacing flat 8-tile grid
 *  - Badge system: visual Open Badge showcase
 *
 * 03/07/2026 — Page Formation (/website/formation) supprimée, route redirige
 * vers /website/learning-app. Le contenu spécifique au programme certifiant
 * (7 modules, partenariat C-Campus, OPCO) a été retiré de cette page : ce
 * programme tourne sur la plateforme C-Campus, pas sur la Learning App TLS —
 * le garder ici en pleine section créait une contradiction de statut (bêta
 * vs. programme livré/financé). Mention factuelle déplacée sur /website/equipe
 * (timeline). Cette page ne parle plus que de la Learning App elle-même.
 *
 * 03/07/2026 (2) — Zigzag features (Parcours/Journal/Coaching) : remplacement
 * des mockups abstraits (FeatureMockup, faux squelette gradient) par de vrais
 * états de InteractiveAppMockup (le composant du hero), pour une fidélité
 * visuelle cohérente et un rendu plus proche de la vraie app. Bento réduit à
 * 5 cartes (les fonctionnalités non couvertes en profondeur par le zigzag),
 * pour éliminer la redite verbatim des 3 mêmes fonctionnalités.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Map,
  PenLine,
  MessageSquare,
  Trophy,
  Brain,
  Newspaper,
  CheckCircle2,
  Users,
  Zap,
  ArrowUpRight,
  Star,
  Award,
  Target,
  TrendingUp,
  ChevronRight,
  Lightbulb,
  Shield,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  InteractiveAppMockup,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { submitForm } from './utils/submitForm';

// ─── Dreyfus data ────────────────────────────────────────────────────────────

const DREYFUS_LEVELS = [
  {
    level: 1,
    label: 'Novice',
    short: 'N1',
    color: 'from-ink-200 to-ink-300',
    pillBg: 'bg-ink-100 text-ink-700 border-ink-200',
    activeBg: 'bg-ink-800',
    desc: 'Vous suivez des règles explicites et procédures pas à pas. L\'IA vous guide à chaque étape.',
    skills: ['Utiliser un prompt modèle', 'Suivre un plan fourni', 'Comprendre les consignes IA'],
    timeLabel: '0 → 3 mois',
  },
  {
    level: 2,
    label: 'Débutant Avancé',
    short: 'N2',
    color: 'from-primary-300 to-primary-400',
    pillBg: 'bg-primary-50 text-primary-700 border-primary-200',
    activeBg: 'bg-primary-600',
    desc: 'Vous adaptez les règles selon le contexte. Vos premières productions personnelles émergent.',
    skills: ['Adapter un prompt existant', 'Identifier les cas limites IA', 'Produire des variations'],
    timeLabel: '3 → 9 mois',
  },
  {
    level: 3,
    label: 'Compétent',
    short: 'N3',
    color: 'from-primary-500 to-primary-600',
    pillBg: 'bg-primary-100 text-primary-800 border-primary-300',
    activeBg: 'bg-primary-700',
    desc: 'Vous planifiez, anticipez les problèmes et choisissez vos approches. Vous maîtrisez le domaine.',
    skills: ['Construire un workflow IA complet', 'Diagnostiquer les échecs', 'Former des débutants'],
    timeLabel: '9 → 18 mois',
  },
  {
    level: 4,
    label: 'Performant',
    short: 'N4',
    color: 'from-secondary-400 to-secondary-600',
    pillBg: 'bg-secondary-50 text-secondary-800 border-secondary-200',
    activeBg: 'bg-secondary-600',
    desc: 'Vous percevez la situation globalement et réagissez de façon fluide, sans procédure.',
    skills: ['Voir les patterns sur des projets entiers', 'Anticiper les dérives IA', 'Innover sur vos méthodes'],
    timeLabel: '18 → 36 mois',
  },
  {
    level: 5,
    label: 'Expert',
    short: 'N5',
    color: 'from-accent-400 to-secondary-500',
    pillBg: 'bg-accent-50 text-accent-600 border-accent-200',
    activeBg: 'bg-accent-500',
    desc: 'Intuition profonde et maîtrise tacite. Vous agissez avec aisance et formez les autres.',
    skills: ['Concevoir de nouveaux usages', 'Enseigner par l\'exemple', 'Définir les standards du domaine'],
    timeLabel: '36 mois +',
  },
];

// ─── Features bento data ─────────────────────────────────────────────────────

// Each card has a `span` for the CSS grid area (cols × rows)
// Parcours/Journal/Coaching sont couverts en profondeur par le zigzag
// ci-dessus — pas de redite ici (voir critique Phase 24, 03/07/2026).
const BENTO_FEATURES = [
  {
    id: 'flashcards',
    span: 'md:col-span-1',
    icon: <Brain size={24} />,
    eyebrow: 'Mémorisation',
    title: 'Flashcards IA',
    desc: 'Répétition espacée, cartes auto-générées.',
    accent: 'bg-white border-ink-100',
    iconBg: 'bg-primary-50 text-primary-700',
    tag: null,
  },
  {
    id: 'gamification',
    span: 'md:col-span-2',
    icon: <Trophy size={28} />,
    eyebrow: 'Engagement',
    title: 'Gamification & streaks',
    desc: 'XP, badges, classements, défis hebdomadaires. Apprenez en jouant, sans tomber dans le jeu pour le jeu.',
    accent: 'bg-gradient-to-br from-ink-900 to-primary-900 border-ink-700',
    iconBg: 'bg-accent-400 text-ink-900',
    tag: null,
    dark: true,
  },
  {
    id: 'veille',
    span: 'md:col-span-1',
    icon: <Newspaper size={24} />,
    eyebrow: 'Veille',
    title: 'Curation continue',
    desc: 'Articles, vidéos, rapports triés par domaine et niveau.',
    accent: 'bg-white border-ink-100',
    iconBg: 'bg-primary-50 text-primary-700',
    tag: null,
  },
  {
    id: 'communaute',
    span: 'md:col-span-1',
    icon: <Users size={24} />,
    eyebrow: 'Communauté',
    title: 'Pairs & cohortes',
    desc: 'Forums, co-apprentissage, partage de productions.',
    accent: 'bg-white border-ink-100',
    iconBg: 'bg-primary-50 text-primary-700',
    tag: null,
  },
  {
    id: 'chatbot',
    span: 'md:col-span-1',
    icon: <Zap size={24} />,
    eyebrow: 'Assistant IA',
    title: 'Chatbot pédago',
    desc: 'Disponible 24/7, contextualisé à votre parcours.',
    accent: 'bg-white border-ink-100',
    iconBg: 'bg-primary-50 text-primary-700',
    tag: null,
  },
];

// ─── Zigzag features data ────────────────────────────────────────────────────

const ZIGZAG_FEATURES = [
  {
    eyebrow: 'Personnalisation IA',
    icon: Map,
    title: 'Parcours adaptatifs\nen temps réel.',
    body: "L'IA analyse vos progrès et recommande la suite la plus pertinente. Votre niveau Dreyfus progresse en temps réel, de Novice à Expert, tracé à chaque étape.",
    bullets: [
      'Recommandations IA basées sur vos progrès réels',
      'Niveau Dreyfus tracé à chaque étape',
      'Plans de développement alignés avec vos objectifs',
    ],
    bg: 'bg-primary-50/60',
    iconBg: 'bg-primary-500',
    accentColor: 'text-primary-600',
    tabKey: 'parcours' as const,
  },
  {
    eyebrow: 'Réflexion structurée',
    icon: PenLine,
    title: 'Journal de bord,\nancré.',
    body: "Un espace de réflexion guidé qui transforme ce que vous vivez en traces d'apprentissage durables. Vos insights deviennent votre portfolio professionnel.",
    bullets: [
      'Prompts de réflexion guidés par moment',
      'Historique chronologique de vos apprentissages',
      'Partage sélectif avec votre coach',
    ],
    bg: 'bg-white',
    iconBg: 'bg-secondary-500',
    accentColor: 'text-secondary-600',
    tabKey: 'journal' as const,
  },
  {
    eyebrow: 'Coaching humain · IA-augmenté',
    icon: MessageSquare,
    title: 'Votre coach,\nau bon moment.',
    body: "Coaching 1-1 intégré : messagerie contextualisée, corrections de productions. Votre coach voit votre parcours complet, pas juste des messages déconnectés.",
    bullets: [
      'Messagerie directe avec contexte du parcours',
      'Corrections inline sur vos productions',
      'Feedback structuré sur vos exercices',
    ],
    bg: 'bg-accent-50/40',
    iconBg: 'bg-accent-400',
    accentColor: 'text-secondary-600',
    tabKey: 'coaching' as const,
  },
];

// ─── Badge system data ───────────────────────────────────────────────────────

const BADGES = [
  {
    id: 'formateur-augmente',
    icon: <Star size={32} strokeWidth={1.5} />,
    label: 'Formateur Augmenté',
    level: 'Expert',
    issuer: 'The Learning Society',
    date: 'Juin 2026',
    from: 'from-accent-400',
    to: 'to-secondary-500',
    ring: 'ring-accent-300',
    desc: 'Maîtrise avancée de l\'IA en formation professionnelle.',
  },
  {
    id: 'prompt-design',
    icon: <Lightbulb size={32} strokeWidth={1.5} />,
    label: 'Prompt Designer',
    level: 'Compétent',
    issuer: 'The Learning Society',
    date: 'Mai 2026',
    from: 'from-primary-500',
    to: 'to-primary-700',
    ring: 'ring-primary-300',
    desc: 'Conception de prompts structurés et reproductibles.',
  },
  {
    id: 'learning-coach',
    icon: <Target size={32} strokeWidth={1.5} />,
    label: 'Learning Coach',
    level: 'Performant',
    issuer: 'The Learning Society',
    date: 'Avr. 2026',
    from: 'from-secondary-400',
    to: 'to-secondary-600',
    ring: 'ring-secondary-300',
    desc: 'Accompagnement des apprenants en parcours IA.',
  },
  {
    id: 'data-literacy',
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
    label: 'Data Literacy',
    level: 'Compétent',
    issuer: 'The Learning Society',
    date: 'Mars 2026',
    from: 'from-primary-400',
    to: 'to-accent-400',
    ring: 'ring-primary-200',
    desc: 'Lecture et interprétation des données analytiques.',
  },
];

// ─── Use cases ───────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    badge: 'Formateur',
    title: 'Animez vos cohortes avec les outils IA',
    bullets: [
      'Tableau de bord apprenants en temps réel',
      'Génération de quiz adaptatifs IA',
      'Suivi individuel & collectif sans rétention',
    ],
  },
  {
    badge: 'Apprenant',
    title: 'Apprenez à votre rythme, sans vous perdre',
    bullets: [
      'Reprenez exactement où vous en étiez',
      'Coach 1-1 accessible en 2 clics',
      'Journal qui ancre vos insights',
    ],
  },
  {
    badge: 'Responsable L&D',
    title: 'Déployez votre stratégie apprenante',
    bullets: [
      'Passeports de Compétences agrégés par cohorte',
      'Analytics Dreyfus : où en est chaque apprenant',
      'Reporting conformité OPCO en 1 clic',
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export const MarketingLearningApp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeLevel, setActiveLevel] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    const { ok, error } = await submitForm({
      email: email.trim(),
      name: role.trim() || 'Accès bêta',
      subject: 'Demande d\'accès bêta · Learning App',
      need: role.trim() || undefined,
      _source: 'learning-app-beta',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur s\'est produite. Réessayez ou contactez-nous.');
  };

  const activeDreyfus = DREYFUS_LEVELS[activeLevel];

  return (
    <div className="bg-white">
      <SEOHead
        title="Learning App TLS · Formation IA adaptative"
        description="La plateforme qui connecte apprentissage, compétences et impact business. Parcours IA, Passeport de Compétences Dreyfus, coaching, gamification."
        canonical="/website/learning-app"
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-50/60 via-white to-accent-50/15">
        <div aria-hidden className="absolute top-0 right-0 w-1/3 h-80 pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-orange-teal-1s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            style={{ maskImage: 'linear-gradient(to bottom-left, rgba(0,0,0,0.5) 0%, transparent 70%)' }}
          />
        </div>
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-pill bg-primary-200/25 blur-3xl" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-pill bg-secondary-200/15 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-page items-center">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg">
              <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200 w-fit">
                <Sparkles size={14} className="text-primary-600" />
                <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                  La Learning App · Learn → Do → Match
                </span>
              </span>

              <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,6.5vw,5.5rem)]">
                Une plateforme.{' '}
                <span className="text-secondary-600">Tout un écosystème.</span>
              </h1>

              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
                Parcours adaptatifs, coaching humain, journal réflexif, Passeport Dreyfus.
                L'apprentissage qui laisse des traces concrètes, reliées à votre travail réel.
              </p>

              <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                <MagneticButton strength={14}>
                  <a href="#early-access">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Accès anticipé
                    </Button>
                  </a>
                </MagneticButton>
                <a href="#features">
                  <Button variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
                    Voir les fonctionnalités
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-stack-xs">
                <span className="inline-flex items-center gap-tight px-2 py-0.5 rounded-pill bg-accent-400 text-ink-900 text-micro font-bold uppercase tracking-wider">
                  Beta
                </span>
                <span className="font-body text-body-sm text-ink-500">
                  En développement actif · accès progressif par invitation
                </span>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative lg:-mr-8 xl:-mr-16">
              <InteractiveAppMockup />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 2. Dreyfus interactif ─────────────────────────────────────────────── */}
      <section className="py-page bg-white border-t border-ink-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-micro font-bold text-ink-400 uppercase tracking-[0.08em]">
                <Shield size={11} />
                Modèle Dreyfus · Passeport de Compétences
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Votre progression sur 5 niveaux.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                Chaque compétence est tracée du novice à l'expert selon le modèle Dreyfus.
                Sélectionnez un niveau pour voir ce qu'il représente.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <div className="flex flex-col gap-section-lg">
              {/* Level selector — horizontal bar */}
              <div className="relative">
                {/* Track */}
                <div className="h-1.5 bg-ink-100 rounded-pill absolute top-[22px] left-0 right-0 mx-[10%]" />
                {/* Fill */}
                <motion.div
                  className="h-1.5 rounded-pill absolute top-[22px] left-[10%] bg-gradient-to-r from-ink-300 via-primary-500 to-accent-400"
                  style={{ width: `${(activeLevel / 4) * 80}%` }}
                  animate={{ width: `${(activeLevel / 4) * 80}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Level buttons */}
                <div className="relative flex justify-between px-[10%]">
                  {DREYFUS_LEVELS.map((lvl, idx) => (
                    <button
                      key={lvl.level}
                      type="button"
                      onClick={() => setActiveLevel(idx)}
                      aria-pressed={activeLevel === idx}
                      className="flex flex-col items-center gap-2 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm"
                    >
                      {/* Dot */}
                      <motion.div
                        animate={{
                          scale: activeLevel === idx ? 1.25 : 1,
                          backgroundColor: activeLevel === idx ? '#55A1B4' : '#e5e7eb',
                        }}
                        transition={{ duration: 0.25 }}
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-display text-caption font-extrabold transition-colors ${
                          activeLevel === idx
                            ? 'border-primary-500 bg-primary-500 text-white shadow-brand-sm'
                            : 'border-ink-200 bg-white text-ink-500 group-hover:border-primary-300 group-hover:text-primary-600'
                        }`}
                      >
                        {lvl.short}
                      </motion.div>
                      {/* Label */}
                      <span className={`font-body text-caption font-semibold transition-colors leading-tight text-center hidden sm:block ${
                        activeLevel === idx ? 'text-ink-900' : 'text-ink-500 group-hover:text-ink-700'
                      }`}>
                        {lvl.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLevel}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-stack rounded-2xl overflow-hidden border border-ink-100 shadow-card"
                >
                  {/* Left: gradient side */}
                  <div className={`relative bg-gradient-to-br ${activeDreyfus.color} p-stack-lg flex flex-col gap-stack justify-between min-h-[200px]`}>
                    <div className="flex flex-col gap-stack-xs">
                      <span className="font-body text-caption font-bold text-white/70 uppercase tracking-wider">
                        Niveau {activeDreyfus.level} · {activeDreyfus.timeLabel}
                      </span>
                      <p className="font-display text-h3 font-extrabold text-white leading-tight m-0">
                        {activeDreyfus.label}
                      </p>
                    </div>
                    <p className="font-body text-body text-white/90 leading-relaxed m-0">
                      {activeDreyfus.desc}
                    </p>
                  </div>
                  {/* Right: skills list */}
                  <div className="bg-white p-stack-lg flex flex-col gap-stack">
                    <span className="font-body text-caption font-semibold text-ink-500 uppercase tracking-wider">
                      Compétences représentatives
                    </span>
                    <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                      {activeDreyfus.skills.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <ChevronRight size={16} className="text-primary-500 shrink-0 mt-0.5" />
                          <span className="font-body text-body text-ink-800">{s}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-stack mt-auto">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-pill border font-body text-caption font-semibold ${activeDreyfus.pillBg}`}>
                        {activeDreyfus.label} · {activeDreyfus.timeLabel}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 3. Zigzag features ────────────────────────────────────────────────── */}
      <section id="features-deep" className="py-section-lg bg-white">
        {ZIGZAG_FEATURES.map((f, idx) => (
          <div key={f.title} className={`py-page ${f.bg}`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-section items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}>
                <FadeInWhenVisible direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <InteractiveAppMockup initialTab={f.tabKey} className="max-w-md mx-auto" />
                </FadeInWhenVisible>

                <FadeInWhenVisible direction={idx % 2 === 0 ? 'left' : 'right'} delay={0.1}>
                  <div className="flex flex-col gap-stack-lg">
                    <div className="flex items-center gap-stack-xs">
                      <div className={`w-8 h-8 rounded-lg ${f.iconBg} flex items-center justify-center`}>
                        <f.icon size={16} className="text-white" />
                      </div>
                      <span className={`font-body text-caption font-bold uppercase tracking-widest ${f.accentColor}`}>
                        {f.eyebrow}
                      </span>
                    </div>
                    <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 whitespace-pre-line">
                      {f.title}
                    </h3>
                    <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">{f.body}</p>
                    <ul className="flex flex-col gap-stack-xs">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-stack-xs font-body text-body-sm text-ink-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── 4. Features bento ─────────────────────────────────────────────────── */}
      <section id="features" className="py-page bg-gradient-to-b from-primary-50/30 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Et bien plus,{' '}
                <span className="text-accent-400">dans le même outil</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                En complément de vos parcours, journal et coaching : la mémorisation, l'engagement, la veille et la communauté, intégrés nativement.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Bento grid — 3 cols on md+, auto-sized rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {BENTO_FEATURES.map((f, i) => (
              <FadeInWhenVisible key={f.id} direction="up" delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`${f.span} rounded-2xl border p-stack-lg flex flex-col gap-stack-lg shadow-card hover:shadow-card-hover transition-shadow duration-base ${f.accent}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.iconBg} shadow-sm`}>
                      {f.icon}
                    </span>
                    {f.tag && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill bg-white/80 border border-primary-200 text-primary-700 font-body text-micro font-bold uppercase tracking-wider">
                        {f.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-tight">
                    <p className={`font-body text-caption font-semibold uppercase tracking-wider m-0 ${f.dark ? 'text-white/50' : 'text-ink-400'}`}>
                      {f.eyebrow}
                    </p>
                    <h3 className={`font-display text-h4 font-extrabold leading-tight m-0 ${f.dark ? 'text-white' : 'text-ink-900'}`}>
                      {f.title}
                    </h3>
                    <p className={`font-body text-body-sm leading-relaxed m-0 ${f.dark ? 'text-white/75' : 'text-ink-600'}`}>
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Badge system ───────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-ink-900 via-primary-900 to-ink-900 overflow-hidden relative">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-pill bg-primary-700/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-pill bg-accent-400/10 blur-[60px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-micro font-bold text-primary-300 uppercase tracking-[0.08em]">
                <Award size={11} />
                Open Badges · Exemples
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
                Des badges qui prouvent quelque chose.
              </h2>
              <p className="font-body text-body-lg text-white/70 leading-relaxed m-0">
                Chaque Open Badge est lié à des preuves concrètes : missions accomplies, sessions de coaching, productions validées. Pas un trophée générique. Exemples illustratifs.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Badge grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
            {BADGES.map((badge, i) => (
              <FadeInWhenVisible key={badge.id} direction="up" delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="rounded-2xl bg-white/8 backdrop-blur-glass-light border border-white/15 p-stack-lg flex flex-col gap-stack hover:bg-white/12 hover:border-white/25 transition-all duration-base cursor-default"
                >
                  {/* Badge icon hexagon-ish */}
                  <div className="flex flex-col items-center gap-stack pt-stack-xs">
                    <div className={`relative w-20 h-20 rounded-[28px] bg-gradient-to-br ${badge.from} ${badge.to} flex items-center justify-center shadow-lg ring-4 ring-white/20`}>
                      <span className="text-white">{badge.icon}</span>
                      {/* Shine */}
                      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    <div className="flex flex-col items-center gap-tight text-center">
                      <p className="font-display text-body font-extrabold text-white m-0 leading-tight">
                        {badge.label}
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-pill bg-white/10 text-white/70 font-body text-micro font-semibold">
                        {badge.level}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-caption text-white/60 leading-relaxed m-0 text-center">
                    {badge.desc}
                  </p>
                  {/* Footer meta */}
                  <div className="pt-stack border-t border-white/10 flex items-center justify-between">
                    <span className="font-body text-micro text-white/40">{badge.issuer}</span>
                    <span className="font-body text-micro text-white/40">{badge.date}</span>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* W3C / Open Badges note */}
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 text-white/80 font-body text-caption font-semibold">
                <CheckCircle2 size={13} className="text-success-base" />
                Compatibles Open Badges (W3C)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 text-white/80 font-body text-caption font-semibold">
                <CheckCircle2 size={13} className="text-success-base" />
                Partageables sur LinkedIn &amp; CV
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 text-white/80 font-body text-caption font-semibold">
                <CheckCircle2 size={13} className="text-success-base" />
                Vérifiables par un tiers
              </span>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 6. Use cases ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 max-w-3xl">
              Une expérience pour chaque rôle.
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {USE_CASES.map((u, i) => (
              <FadeInWhenVisible key={u.badge} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack-lg shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-base"
                >
                  <span className="inline-flex self-start items-center gap-tight px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-semibold">
                    {u.badge}
                  </span>
                  <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                    {u.title}
                  </h3>
                  <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                    {u.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-stack-xs font-body text-body-sm text-ink-700">
                        <CheckCircle2 size={16} className="text-primary-600 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Passeport manifesto ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-page">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-orange-teal-5s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          />
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-pill bg-primary-500/30 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-pill bg-accent-400/10 blur-[60px]" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-section-lg">
            <p className="font-body text-body-sm text-primary-200 font-semibold m-0">Passeport de Compétences</p>
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold text-white leading-[1.0] tracking-tight m-0">
              Un apprentissage qui laisse des traces.
            </h2>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Chaque leçon suivie, chaque mission accomplie, chaque session de coaching : tout est enregistré dans votre Passeport de Compétences. Pas un badge générique. Une preuve concrète, datée, reliée à vos comportements réels au travail.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack pt-stack border-t border-white/20">
              {[
                { label: 'Progression détaillée', desc: 'Niveau Dreyfus par compétence, de novice à expert.' },
                { label: 'Preuves liées', desc: 'Chaque affirmation est adossée à une trace concrète.' },
                { label: 'Partage sur mesure', desc: 'À votre RH, votre équipe, ou gardez-le pour vous.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-tight">
                  <p className="font-display text-body font-bold text-white m-0">{item.label}</p>
                  <p className="font-body text-body-sm text-white/70 m-0 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── 8. Early access ───────────────────────────────────────────────────── */}
      <section
        id="early-access"
        className="relative overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-secondary-50/20 py-page"
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-prose mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col items-center text-center gap-stack-lg">
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Soyez parmi <span className="text-secondary-600">les premiers</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                La Learning App est en bêta. Inscrivez-vous pour être notifié en priorité et bénéficier d'un accès exclusif.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-success-bg border border-success-base/30 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-md"
              >
                <CheckCircle2 size={40} className="text-success-fg" />
                <p className="font-display font-bold text-h4 text-ink-900 m-0">Merci ! Vous êtes sur la liste.</p>
                <p className="font-body text-body-sm text-ink-600 m-0">
                  Nous vous contacterons dès que l'accès bêta est disponible.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-stack bg-white border border-ink-100 rounded-2xl p-section shadow-card"
              >
                <div className="flex flex-col gap-stack-xs text-left">
                  <label htmlFor="ea-email" className="font-body text-body-sm font-semibold text-ink-700">
                    Email professionnel
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@organisation.fr"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-stack-xs text-left">
                  <label htmlFor="ea-role" className="font-body text-body-sm font-semibold text-ink-700">
                    Votre rôle
                  </label>
                  <input
                    id="ea-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Formateur · Responsable L&D · Concepteur pédagogique…"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                {submitError && (
                  <p className="font-body text-caption text-danger-fg bg-danger-bg border border-danger-base/30 rounded-xl px-4 py-3 m-0">
                    {submitError}
                  </p>
                )}
                <MagneticButton strength={10} className="w-full pt-stack">
                  <Button
                    type="submit"
                    variant="warm"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    trailingIcon={<ArrowRight size={18} />}
                  >
                    {submitting ? 'Envoi…' : "Demander l'accès anticipé"}
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-ink-500 text-center m-0">
                  Aucun spam. Désinscription en 1 clic.
                </p>
              </form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingLearningApp;
