/**
 * MarketingLearningApp — Refined Minimal Premium Product Page
 *
 * Direction: Clean, minimalist, premium aesthetic with soft pastels
 * Tone: soft primary teal + minimal accents + refined glassmorphism
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Map,
  PenLine,
  MessageSquare,
  Trophy,
  Brain,
  BookOpen,
  Newspaper,
  CheckCircle2,
  Users,
  Layers,
  Zap,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  CountUp,
  InteractiveAppMockup,
  TiltCard,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { MarketingFooter } from '../../components/marketing/FooterMinimal';

const STATS = [
  { to: 120, suffix: '+', label: 'modules disponibles' },
  { to: 40, suffix: '+', label: 'formateurs actifs' },
  { to: 200, suffix: 'h', label: 'de contenu' },
  { to: 30, suffix: ' min', label: 'session moyenne' },
];

const FEATURES_MAIN = [
  {
    icon: <Map size={36} />,
    eyebrow: 'Personnalisation IA',
    title: 'Parcours adaptatifs en temps réel.',
    description:
      "Des parcours qui s'ajustent à ton niveau Dreyfus, tes objectifs et ton rythme. L'IA analyse tes progrès et recommande la suite la plus pertinente.",
    bullets: [
      'Recommandations IA basées sur tes progrès réels',
      'Niveau Dreyfus tracé à chaque étape (Novice → Expert)',
      'Compétences validées inscrites dans ton Passeport de Compétences',
      'Plans de développement alignés avec tes objectifs SBO',
    ],
    tone: 'from-primary-500 to-primary-700',
    pillBg: 'bg-primary-100 text-primary-700',
  },
  {
    icon: <PenLine size={36} />,
    eyebrow: 'Réflexion structurée',
    title: 'Journal de bord, ancré.',
    description:
      "Un espace de réflexion guidé qui transforme ce que tu vis en traces d'apprentissage durables. Tes insights deviennent ton portfolio professionnel.",
    bullets: [
      'Prompts de réflexion guidés par moment',
      'Historique chronologique de tes apprentissages',
      'Export PDF de ton portfolio',
      'Partage sélectif avec ton coach',
    ],
    tone: 'from-secondary-500 to-secondary-600',
    pillBg: 'bg-secondary-100 text-secondary-700',
  },
  {
    icon: <MessageSquare size={36} />,
    eyebrow: 'Coaching humain · IA-augmenté',
    title: 'Ton coach, au bon moment.',
    description:
      "Coaching 1-1 intégré : messagerie contextualisée, sessions visio, corrections de productions. Ton coach voit ton parcours, pas juste des messages déconnectés.",
    bullets: [
      'Messagerie directe avec contexte du parcours',
      'Sessions visio intégrées (pas de Zoom externe)',
      'Corrections inline sur tes productions',
      'Feedback structuré sur tes exercices',
    ],
    tone: 'from-accent-400 to-secondary-500',
    pillBg: 'bg-accent-100 text-warning-fg',
  },
];

const FEATURE_TILES = [
  { icon: <Trophy size={24} />, title: 'Gamification', desc: 'XP, badges, streaks. Apprends en jouant.' },
  { icon: <Brain size={24} />, title: 'Flashcards IA', desc: 'Espace espacé, cartes auto-générées.' },
  { icon: <Newspaper size={24} />, title: 'Veille intégrée', desc: 'Curation continue par domaine.' },
  { icon: <BookOpen size={24} />, title: 'Open Badges', desc: 'Certifications W3C exportables.' },
  { icon: <Layers size={24} />, title: 'Contenus variés', desc: 'Vidéos, articles, podcasts, exercices.' },
  { icon: <Users size={24} />, title: 'Communauté', desc: 'Forums, co-apprentissage entre pairs.' },
  { icon: <Zap size={24} />, title: 'Chatbot pédago', desc: 'Assistant IA 24/7 contextualisé.' },
  { icon: <Sparkles size={24} />, title: 'Passeport Dreyfus', desc: 'Compétences tracées Novice → Expert, exportables.' },
];

const USE_CASES = [
  {
    badge: 'Formateur',
    title: 'Anime tes cohortes en mode augmenté',
    bullets: [
      'Tableau de bord apprenants en temps réel',
      'Génération de quiz adaptatifs IA',
      'Suivi individuel & collectif sans rétention',
    ],
  },
  {
    badge: 'Apprenant',
    title: 'Apprends à ton rythme, sans te perdre',
    bullets: [
      'Reprends exactement où tu en étais',
      'Coach 1-1 accessible en 2 clics',
      'Journal qui ancre tes insights',
    ],
  },
  {
    badge: 'Responsable L&D',
    title: 'Déploie ta stratégie SBO',
    bullets: [
      'Passeports de Compétences agrégés par cohorte',
      'Analytics Dreyfus : où en est chaque apprenant',
      'Reporting Qualiopi & OPCO en 1 clic',
    ],
  },
];

export const MarketingLearningApp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Learning App"
        description="La plateforme qui connecte apprentissage, compétences et impact business. Parcours IA, Passeport de Compétences Dreyfus, coaching, gamification."
        canonical="/marketing/learning-app"
      />
      {/* ── 1. Hero with prominent mockup ──────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-b from-white to-primary-50">
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200 w-fit">
                <Sparkles size={14} className="text-accent-400" />
                <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                  La Learning App SBO · Learn → Do → Match
                </span>
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.1}>
              <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,6.5vw,5.5rem)]">
                Une plateforme.{' '}
                <span className="text-accent-400">Tout un écosystème.</span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-xl">
                Acquire les compétences (Learn), déploie-les sur de vrais projets (Do), fais matcher ton Passeport de Compétences avec les opportunités (Match).
                Un écosystème SBO intégré — parcours adaptatifs, coaching humain, journal réflexif, Passeport Dreyfus.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-stack">
                <MagneticButton strength={14}>
                  <a href="#early-access">
                    <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Accès anticipé
                    </Button>
                  </a>
                </MagneticButton>
                <a href="#features">
                  <Button
                    variant="secondary"
                    size="lg"
                    trailingIcon={<ArrowUpRight size={18} />}
                  >
                    Voir les fonctionnalités
                  </Button>
                </a>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.4}>
              <div className="flex items-center gap-2 pt-stack">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-accent-400 text-ink-900 text-micro font-bold uppercase tracking-wider">
                  Beta
                </span>
                <span className="font-body text-body-sm text-ink-600">
                  En développement actif · accès progressif par invitation
                </span>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Hero mockup — TiltCard for tactile depth */}
          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative">
              <TiltCard maxRotation={7} className="relative">
                <InteractiveAppMockup />
              </TiltCard>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── 2. Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-ink-100 py-section">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-stack">
          {STATS.map((s, i) => (
            <FadeInWhenVisible key={s.label} direction="up" delay={i * 0.08}>
              <div className="flex flex-col gap-1 p-stack rounded-xl bg-ink-50 border border-ink-100">
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-primary-700 leading-none"
                />
                <span className="font-body text-caption text-ink-600 mt-1 uppercase tracking-wider font-semibold">
                  {s.label}
                </span>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* ── 3. Features alternating split ────────────────────────────────── */}
      <section id="features" className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-page">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Learn · Do · Match
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Tout ce qu'il faut pour{' '}
                <GradientText>apprendre vraiment</GradientText>.
              </h2>
            </FadeInWhenVisible>
          </div>

          {FEATURES_MAIN.map((f, idx) => (
            <FadeInWhenVisible key={f.title} direction="up" delay={0.05}>
              <article
                className={`grid grid-cols-1 lg:grid-cols-2 gap-section items-center ${
                  idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual side */}
                <div
                  className={`relative aspect-square max-w-md w-full mx-auto rounded-3xl overflow-hidden shadow-2xl ${
                    idx % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.tone}`} />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="relative h-full flex items-center justify-center text-white"
                  >
                    <div className="p-8 rounded-3xl bg-white/15 backdrop-blur-glass-light border border-white/25">
                      {React.cloneElement(f.icon, { size: 96, strokeWidth: 1.25 })}
                    </div>
                  </motion.div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col gap-stack-lg ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <span
                    className={`inline-flex self-start items-center px-3 py-1 rounded-pill ${f.pillBg} font-body text-caption font-bold uppercase tracking-wider`}
                  >
                    {f.eyebrow}
                  </span>
                  <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-ink-900 leading-[1.1] tracking-tight m-0">
                    {f.title}
                  </h3>
                  <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
                    {f.description}
                  </p>
                  <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 size={18} className="text-primary-600 shrink-0 mt-0.5" />
                        <span className="font-body text-body text-ink-800">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* ── 4. Feature tiles bento ──────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack items-center text-center max-w-3xl mx-auto">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Et beaucoup plus
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                8 modules clés. Un seul outil.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {FEATURE_TILES.map((t, i) => (
              <FadeInWhenVisible key={t.title} direction="up" delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-xs hover:shadow-lg hover:border-primary-200 transition-shadow duration-base"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 border border-primary-100">
                    {t.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-body font-bold text-ink-900 m-0 leading-tight">{t.title}</h3>
                    <p className="font-body text-caption text-ink-600 m-0 leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Use cases ────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Pour qui ?
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Une expérience pour chaque rôle.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {USE_CASES.map((u, i) => (
              <FadeInWhenVisible key={u.badge} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:border-primary-200 transition-all duration-base"
                >
                  <span className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-bold uppercase tracking-wider">
                    {u.badge}
                  </span>
                  <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">
                    {u.title}
                  </h3>
                  <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                    {u.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 font-body text-body-sm text-ink-700">
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

      {/* ── 6. Early access ─────────────────────────────────────────────────── */}
      <section
        id="early-access"
        className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50 py-page"
      >
        <div className="relative max-w-prose mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex items-center gap-2 justify-center">
              <Mail size={18} className="text-accent-400" />
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Accès anticipé
              </span>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Sois parmi <span className="text-accent-400">les premiers</span>.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0">
              La Learning App est en bêta. Inscris-toi pour être notifié·e en priorité et bénéficier d'un accès exclusif.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white/60 backdrop-blur-glass-medium border border-primary-200 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-md"
              >
                <CheckCircle2 size={40} className="text-primary-600" />
                <p className="font-display font-bold text-h4 text-ink-900 m-0">Merci ! Tu es sur la liste.</p>
                <p className="font-body text-body-sm text-ink-700 m-0">
                  On te contacte dès que l'accès bêta est disponible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-stack pt-stack bg-white/50 backdrop-blur-glass-medium border border-ink-100 rounded-2xl p-section"
              >
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="ea-email" className="font-body text-body-sm font-semibold text-ink-900">
                    Email professionnel
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="toi@organisation.fr"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-500 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="ea-role" className="font-body text-body-sm font-semibold text-ink-900">
                    Ton rôle
                  </label>
                  <input
                    id="ea-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Formateur · Responsable L&D · Concepteur pédagogique…"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-500 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <MagneticButton strength={10} className="w-full pt-stack">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    trailingIcon={<ArrowRight size={18} />}
                  >
                    Demander l'accès anticipé
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-ink-600 text-center m-0">
                  Aucun spam. Désinscription en 1 clic.
                </p>
              </motion.form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <MarketingFooter />
    </div>
  );
};

export default MarketingLearningApp;
