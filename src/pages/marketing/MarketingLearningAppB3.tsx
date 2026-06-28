/**
 * Learning App — Variant B3 : Bento Grid
 *
 * Direction: dark teal hero, then bento grid of feature cells (big + small),
 * followed by use-case cards and signup.
 * Tone: bold primary teal hero, accent-400 highlights, white/ink-50 bento bg.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Map, PenLine, MessageSquare, Trophy,
  Brain, BookOpen, Newspaper, Users, Layers, Zap, ArrowUpRight, Star,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const BIG_FEATURES = [
  {
    icon: Map,
    eyebrow: 'Personnalisation IA',
    title: 'Parcours adaptatifs',
    body: "L'IA analyse vos progrès et recommande la suite la plus pertinente. Niveau Dreyfus tracé en temps réel.",
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    iconBg: 'bg-primary-200',
    iconColor: 'text-primary-700',
    colSpan: 'col-span-2',
    // fake mini screen
    hasScreen: true,
  },
  {
    icon: PenLine,
    eyebrow: 'Réflexion',
    title: 'Journal réflexif',
    body: 'Prompts guidés qui transforment vos apprentissages en traces durables.',
    bg: 'bg-secondary-50',
    border: 'border-secondary-200',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-700',
    colSpan: 'col-span-1',
    hasScreen: false,
  },
  {
    icon: MessageSquare,
    eyebrow: 'Coaching 1-1',
    title: 'Coach humain intégré',
    body: 'Messagerie, corrections inline, sessions vidéo. Votre coach voit votre parcours complet.',
    bg: 'bg-accent-50',
    border: 'border-accent-100',
    iconBg: 'bg-accent-100',
    iconColor: 'text-warning-fg',
    colSpan: 'col-span-1',
    hasScreen: false,
  },
];

const MINI_TILES = [
  { icon: Trophy, title: 'Gamification', accent: 'text-secondary-500' },
  { icon: Brain, title: 'Flashcards IA', accent: 'text-primary-500' },
  { icon: BookOpen, title: 'Open Badges', accent: 'text-warning-fg' },
  { icon: Newspaper, title: 'Veille IA', accent: 'text-primary-600' },
  { icon: Layers, title: 'Multi-formats', accent: 'text-secondary-600' },
  { icon: Users, title: 'Communauté', accent: 'text-primary-500' },
  { icon: Zap, title: 'Chatbot 24/7', accent: 'text-warning-fg' },
  { icon: Sparkles, title: 'Passeport', accent: 'text-primary-600' },
  { icon: Star, title: 'Certifications', accent: 'text-secondary-500' },
];

const USE_CASES = [
  {
    badge: 'Formateur',
    title: 'Animez vos cohortes en mode augmenté',
    bullets: ['Dashboard apprenants temps réel', 'Quiz adaptatifs IA', 'Suivi individuel & collectif'],
    accent: 'bg-primary-600',
    border: 'border-primary-200',
    bg: 'bg-primary-50',
  },
  {
    badge: 'Apprenant',
    title: 'Apprenez à votre rythme, sans vous perdre',
    bullets: ["Reprenez où vous en étiez", 'Coach 1-1 en 2 clics', 'Journal qui ancre vos insights'],
    accent: 'bg-secondary-500',
    border: 'border-secondary-200',
    bg: 'bg-secondary-50',
  },
  {
    badge: 'Responsable L&D',
    title: 'Déployez votre stratégie apprenante',
    bullets: ['Passeports agrégés par cohorte', 'Analytics Dreyfus', 'Reporting OPCO en 1 clic'],
    accent: 'bg-accent-400',
    border: 'border-accent-100',
    bg: 'bg-accent-50',
  },
];

export const MarketingLearningAppB3: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Learning App — La plateforme"
        description="Parcours adaptatifs IA, journal réflexif, coaching 1-1, Passeport de Compétences Dreyfus. L'écosystème qui transforme la formation en impact."
        canonical="/marketing/learning-app"
      />

      {/* ── Hero sombre ───────────────────────────────────────────────────── */}
      <section className="pt-32 pb-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[600px] h-[600px] rounded-full bg-primary-500/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary-500/10 blur-[80px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col gap-stack-lg text-center items-center">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/10 border border-white/20 w-fit">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white/80 tracking-wider uppercase">
                La Learning App · Bêta ouverte
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[1.02] tracking-[-0.03em] m-0 text-[clamp(3rem,7vw,6rem)]">
              Une plateforme.{' '}
              <span className="text-accent-400">Tout un écosystème.</span>
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-body text-body-lg text-white/70 leading-relaxed m-0 max-w-2xl">
              Parcours adaptatifs, coaching humain, journal réflexif, Passeport Dreyfus exportable. L'apprentissage qui laisse des traces.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs">
              <MagneticButton strength={14}>
                <a href="#early-access">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Accès anticipé
                  </Button>
                </a>
              </MagneticButton>
              <a href="#bento">
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                  trailingIcon={<ArrowUpRight size={16} />}
                >
                  Découvrir
                </Button>
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Bento grid ───────────────────────────────────────────────────── */}
      <section id="bento" className="py-page bg-ink-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Tout ce qu'il faut pour apprendre vraiment.
            </h2>
          </FadeInWhenVisible>

          {/* Main bento row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack auto-rows-fr">
            {BIG_FEATURES.map((f, i) => (
              <FadeInWhenVisible key={f.title} direction="up" delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`flex flex-col gap-stack-xs p-stack-lg rounded-2xl border shadow-card hover:shadow-card-hover transition-all duration-base ${f.bg} ${f.border} ${f.colSpan}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.iconBg}`}>
                    <f.icon size={20} className={f.iconColor} />
                  </div>
                  <span className={`font-body text-caption font-bold uppercase tracking-widest ${f.iconColor}`}>{f.eyebrow}</span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">{f.title}</h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">{f.body}</p>
                  {f.hasScreen && (
                    <div className="mt-stack-xs rounded-xl bg-white border border-primary-100 overflow-hidden h-20">
                      <div className="h-2 bg-primary-100" />
                      <div className="p-2 flex flex-col gap-1.5">
                        <div className="h-1.5 rounded-full bg-ink-100" style={{ width: '85%' }} />
                        <div className="h-1 rounded-full bg-primary-300" style={{ width: '60%' }} />
                        <div className="h-1.5 rounded-full bg-ink-100" style={{ width: '75%' }} />
                      </div>
                    </div>
                  )}
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* Mini tile row */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-stack-xs">
            {MINI_TILES.map((t, i) => (
              <FadeInWhenVisible key={t.title} direction="up" delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                  className="flex flex-col items-center gap-tight p-stack-xs rounded-xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-card transition-all duration-base text-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-ink-50 flex items-center justify-center">
                    <t.icon size={16} className={t.accent} />
                  </div>
                  <span className="font-body text-micro font-bold text-ink-700 leading-tight">{t.title}</span>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────────────────────── */}
      <section className="py-page bg-white border-t border-ink-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Pour vous, quelle que soit votre casquette.
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {USE_CASES.map((uc, i) => (
              <FadeInWhenVisible key={uc.badge} direction="up" delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`rounded-2xl border p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover transition-all duration-base ${uc.bg} ${uc.border}`}
                >
                  <span className={`inline-flex items-center px-3 py-1 rounded-pill text-caption font-bold text-white w-fit ${uc.accent}`}>{uc.badge}</span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">{uc.title}</h3>
                  <ul className="flex flex-col gap-stack-xs">
                    {uc.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-stack-xs font-body text-body-sm text-ink-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signup ───────────────────────────────────────────────────────── */}
      <section id="early-access" className="py-page bg-gradient-to-br from-primary-600 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] -translate-x-1/2 rounded-full bg-primary-400/20 blur-[100px]" />
        </div>
        <div className="relative max-w-xl mx-auto px-6 flex flex-col gap-stack-lg text-center items-center">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Rejoignez la liste d'attente.
            </h2>
            <p className="font-body text-body-lg text-white/70 m-0 mt-stack">
              Bêta ouverte — accès progressif par invitation.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-white/10 border border-white/20 p-stack-lg text-center w-full"
              >
                <p className="font-display text-h4 font-bold text-white m-0">Inscription enregistrée !</p>
                <p className="font-body text-body-sm text-white/70 m-0 mt-stack">Vous serez parmi les premiers.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-stack">
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.pro"
                  className="w-full px-5 h-14 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-body focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-base"
                />
                <MagneticButton strength={10} className="w-full">
                  <Button type="submit" variant="warm" size="lg" fullWidth trailingIcon={<ArrowRight size={18} />}>
                    Demander l'accès anticipé
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-white/40 m-0">Aucun spam. RGPD respecté.</p>
              </form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingLearningAppB3;
