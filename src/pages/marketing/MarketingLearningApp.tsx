/**
 * MarketingLearningApp: Immersive Product Page (Phase P2.2)
 *
 * Direction: Interactive Product Demo (signature B): the app is the hero.
 * Tone: brand teal dominant + warm CTAs + sun accents.
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
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  CountUp,
  InteractiveAppMockup,
  TiltCard,
  NoiseTexture,
} from '../../components/marketing/motion';

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
      'Recommandations basées sur tes progrès',
      'Contenu adapté à ton profil Dreyfus (Novice → Expert)',
      'Plans de développement sur mesure',
      'Objectifs SMART intégrés à ton passeport',
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
  { icon: <Sparkles size={24} />, title: 'Analytics', desc: 'Forces, lacunes, progression visualisée.' },
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
    tone: 'from-primary-50 to-white border-primary-100',
  },
  {
    badge: 'Apprenant',
    title: 'Apprends à ton rythme, sans te perdre',
    bullets: [
      'Reprends exactement où tu en étais',
      'Coach 1-1 accessible en 2 clics',
      'Journal qui ancre tes insights',
    ],
    tone: 'from-secondary-50 to-white border-secondary-100',
  },
  {
    badge: 'Responsable L&D',
    title: 'Pilote ta stratégie formation',
    bullets: [
      'Analytics par compétence et par cohorte',
      'ROI par parcours',
      'Reporting Qualiopi & OPCO en 1 clic',
    ],
    tone: 'from-accent-50 to-white border-accent-100',
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
      {/* ── 1. Hero with prominent mockup ──────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <MeshGradientBg tone="brand" intensity="intense" />
        <NoiseTexture opacity={0.06} />

        <ParallaxLayer amplitude={60} className="absolute top-1/3 -left-32 pointer-events-none" aria-hidden>
          <div className="w-96 h-96 rounded-pill bg-accent-400/15 blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer amplitude={40} className="absolute -bottom-20 -right-20 pointer-events-none" aria-hidden>
          <div className="w-[500px] h-[500px] rounded-pill bg-secondary-500/20 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
          <div className="flex flex-col gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20 w-fit">
                <Sparkles size={14} className="text-accent-400" />
                <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                  La Learning App · accès anticipé
                </span>
              </span>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.1}>
              <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,6.5vw,5.5rem)]">
                Une plateforme.{' '}
                <GradientText
                  from="from-accent-300"
                  via="via-accent-400"
                  to="to-secondary-400"
                  duration={10}
                >
                  Tout un écosystème.
                </GradientText>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.2}>
              <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-xl">
                Parcours adaptatifs, coaching 1-1, journal réflexif, gamification, veille.
                Tout est intégré, contextualisé, et pensé pour les professionnels qui apprennent en travaillant.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-stack">
                <MagneticButton strength={14}>
                  <a href="#early-access">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Accès anticipé
                    </Button>
                  </a>
                </MagneticButton>
                <a href="#features">
                  <Button
                    variant="ghost"
                    size="lg"
                    trailingIcon={<ArrowUpRight size={18} />}
                    className="!text-white hover:!bg-white/10 !border !border-white/30"
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
                <span className="font-body text-body-sm text-white/70">
                  En développement actif · accès progressif par invitation
                </span>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Hero mockup: TiltCard for tactile depth */}
          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 bg-gradient-to-br from-accent-400/20 via-secondary-400/20 to-primary-400/30 blur-3xl pointer-events-none"
              />
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
              <div className="flex flex-col gap-1 p-stack-lg rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50/40 border border-ink-100">
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
                Trois piliers
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
              <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
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
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className={`h-full rounded-3xl border bg-gradient-to-br ${u.tone} p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl transition-shadow duration-base`}
                >
                  <span className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-pill bg-white border border-ink-200 text-ink-900 font-body text-caption font-bold uppercase tracking-wider">
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
        className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950 py-page"
      >
        <MeshGradientBg tone="ink" intensity="intense" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-accent-400" />
              <span className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">
                Accès anticipé
              </span>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Sois parmi{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={8}
              >
                les premiers
              </GradientText>
              .
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              La Learning App est en bêta. Inscris-toi pour être notifié·e en priorité et bénéficier d'un accès exclusif.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white/10 backdrop-blur-glass-medium border border-white/20 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-md"
              >
                <CheckCircle2 size={40} className="text-accent-400" />
                <p className="font-display font-bold text-h4 text-white m-0">Merci ! Tu es sur la liste.</p>
                <p className="font-body text-body-sm text-white/75 m-0">
                  On te contacte dès que l'accès bêta est disponible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-stack pt-stack">
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="ea-email" className="font-body text-body-sm font-semibold text-white">
                    Email professionnel
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="toi@organisation.fr"
                    className="px-4 h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="ea-role" className="font-body text-body-sm font-semibold text-white">
                    Ton rôle
                  </label>
                  <input
                    id="ea-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Formateur · Responsable L&D · Concepteur pédagogique…"
                    className="px-4 h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
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
                <p className="font-body text-caption text-white/50 text-center m-0">
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
