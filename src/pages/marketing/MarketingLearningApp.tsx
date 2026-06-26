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
  InteractiveAppMockup,
  TiltCard,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';


const FEATURES_MAIN = [
  {
    icon: <Map size={36} />,
    eyebrow: 'Personnalisation IA',
    title: 'Parcours adaptatifs en temps réel.',
    description:
      "Des parcours qui s'ajustent à votre niveau Dreyfus, vos objectifs et votre rythme. L'IA analyse vos progrès et recommande la suite la plus pertinente.",
    bullets: [
      'Recommandations IA basées sur vos progrès réels',
      'Niveau Dreyfus tracé à chaque étape (Novice → Expert)',
      'Compétences validées inscrites dans votre Passeport de Compétences',
      'Plans de développement alignés avec vos objectifs SBO',
    ],
    tone: 'from-primary-500 to-primary-700',
    pillBg: 'bg-primary-100 text-primary-700',
  },
  {
    icon: <PenLine size={36} />,
    eyebrow: 'Réflexion structurée',
    title: 'Journal de bord, ancré.',
    description:
      "Un espace de réflexion guidé qui transforme ce que vous vivez en traces d'apprentissage durables. Vos insights deviennent votre portfolio professionnel.",
    bullets: [
      'Prompts de réflexion guidés par moment',
      'Historique chronologique de vos apprentissages',
      'Export PDF de votre portfolio',
      'Partage sélectif avec votre coach',
    ],
    tone: 'from-secondary-500 to-secondary-600',
    pillBg: 'bg-secondary-100 text-secondary-700',
  },
  {
    icon: <MessageSquare size={36} />,
    eyebrow: 'Coaching humain · IA-augmenté',
    title: 'Votre coach, au bon moment.',
    description:
      "Coaching 1-1 intégré : messagerie contextualisée, sessions visio, corrections de productions. Votre coach voit votre parcours, pas juste des messages déconnectés.",
    bullets: [
      'Messagerie directe avec contexte du parcours',
      'Sessions visio intégrées (pas de Zoom externe)',
      'Corrections inline sur vos productions',
      'Feedback structuré sur vos exercices',
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
    title: 'Animez vos cohortes en mode augmenté',
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
    title: 'Déployez votre stratégie SBO',
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
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        {/* Radial halo */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-pill bg-secondary-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light w-fit">
                <Sparkles size={14} className="text-accent-400" />
                <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                  La Learning App SBO · Learn → Do → Match
                </span>
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.1}>
              <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,6.5vw,5.5rem)]">
                Une plateforme.{' '}
                <span className="text-accent-400">Tout un écosystème.</span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-xl">
                Acquérez les compétences (Learn), déployez-les sur de vrais projets (Do), faites matcher votre Passeport de Compétences avec les opportunités (Match).
                Un écosystème SBO intégré — parcours adaptatifs, coaching humain, journal réflexif, Passeport Dreyfus.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                <MagneticButton strength={14}>
                  <a href="#early-access">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Accès anticipé
                    </Button>
                  </a>
                </MagneticButton>
                <a href="#features">
                  <Button
                    variant="glass"
                    size="lg"
                    trailingIcon={<ArrowUpRight size={18} />}
                  >
                    Voir les fonctionnalités
                  </Button>
                </a>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.4}>
              <div className="flex items-center gap-stack-xs pt-stack">
                <span className="inline-flex items-center gap-tight px-2 py-0.5 rounded-pill bg-accent-400 text-ink-900 text-micro font-bold uppercase tracking-wider">
                  Beta
                </span>
                <span className="font-body text-body-sm text-white/75">
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
                <span className="text-accent-400">apprendre vraiment</span>.
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
                  <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-stack-xs.5">
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
      <section className="py-page bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
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
                  <div className="flex flex-col gap-tight">
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
                  <span className="inline-flex self-start items-center gap-tight px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-caption font-bold uppercase tracking-wider">
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

      {/* ── 6. Early access ─────────────────────────────────────────────────── */}
      <section
        id="early-access"
        className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 py-page"
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-500/25 blur-3xl" />
        </div>
        <div className="relative max-w-prose mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex items-center gap-stack-xs justify-center">
              <Mail size={18} className="text-accent-400" />
              <span className="font-body text-caption font-bold text-white/70 uppercase tracking-widest">
                Accès anticipé
              </span>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Soyez parmi <span className="text-accent-400">les premiers</span>.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0">
              La Learning App est en bêta. Inscrivez-vous pour être notifié·e en priorité et bénéficier d'un accès exclusif.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white/15 backdrop-blur-glass-medium border border-white/25 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-md"
              >
                <CheckCircle2 size={40} className="text-accent-400" />
                <p className="font-display font-bold text-h4 text-white m-0">Merci ! Vous êtes sur la liste.</p>
                <p className="font-body text-body-sm text-white/80 m-0">
                  Nous vous contacterons dès que l'accès bêta est disponible.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-stack pt-stack bg-white/10 backdrop-blur-glass-medium border border-white/20 rounded-2xl p-section"
              >
                <div className="flex flex-col gap-stack-xs text-left">
                  <label htmlFor="ea-email" className="font-body text-body-sm font-semibold text-white/90">
                    Email professionnel
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@organisation.fr"
                    className="px-4 h-12 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-stack-xs text-left">
                  <label htmlFor="ea-role" className="font-body text-body-sm font-semibold text-white/90">
                    Votre rôle
                  </label>
                  <input
                    id="ea-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Formateur · Responsable L&D · Concepteur pédagogique…"
                    className="px-4 h-12 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <MagneticButton strength={10} className="w-full pt-stack">
                  <Button
                    type="submit"
                    variant="warm"
                    size="lg"
                    fullWidth
                    trailingIcon={<ArrowRight size={18} />}
                  >
                    Demander l'accès anticipé
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-white/60 text-center m-0">
                  Aucun spam. Désinscription en 1 clic.
                </p>
              </motion.form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
    </div>
  );
};

export default MarketingLearningApp;
