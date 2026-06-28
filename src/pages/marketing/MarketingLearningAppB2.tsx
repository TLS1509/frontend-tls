/**
 * Learning App — Variant B2 : Zigzag Features
 *
 * Direction: clean white hero + alternating full-width feature sections
 * (left visual / right copy then inverted). Each section has distinct bg tint.
 * Ends with a minimal teal manifesto + early-access signup.
 * Tone: editorial restraint, 2-tone max per section.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, Map, PenLine, MessageSquare, Trophy,
  Brain, BookOpen, Newspaper, Users, Layers, Zap, ArrowUpRight,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const FEATURES = [
  {
    eyebrow: 'Personnalisation IA',
    icon: Map,
    title: 'Parcours adaptatifs\nen temps réel.',
    body: "L'IA analyse vos progrès et recommande la suite la plus pertinente. Votre niveau Dreyfus progresse en temps réel — de Novice à Expert, tracé à chaque étape.",
    bullets: [
      'Recommandations IA basées sur vos progrès réels',
      'Niveau Dreyfus tracé à chaque étape',
      'Plans de développement alignés avec vos objectifs',
    ],
    bg: 'bg-primary-50/60',
    iconBg: 'bg-primary-500',
    accentColor: 'text-primary-600',
    visual: { from: 'from-primary-400', to: 'to-primary-700' },
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
    visual: { from: 'from-secondary-400', to: 'to-secondary-600' },
  },
  {
    eyebrow: 'Coaching humain · IA-augmenté',
    icon: MessageSquare,
    title: 'Votre coach,\nau bon moment.',
    body: "Coaching 1-1 intégré : messagerie contextualisée, corrections de productions. Votre coach voit votre parcours complet — pas juste des messages déconnectés.",
    bullets: [
      'Messagerie directe avec contexte du parcours',
      'Corrections inline sur vos productions',
      'Feedback structuré sur vos exercices',
    ],
    bg: 'bg-accent-50/40',
    iconBg: 'bg-accent-400',
    accentColor: 'text-warning-fg',
    visual: { from: 'from-accent-300', to: 'to-secondary-500' },
  },
];

const TILES = [
  { icon: Trophy, title: 'Gamification', desc: 'XP, badges, streaks.' },
  { icon: Brain, title: 'Flashcards IA', desc: 'Espace espacé auto-généré.' },
  { icon: Newspaper, title: 'Veille intégrée', desc: 'Curation continue.' },
  { icon: BookOpen, title: 'Open Badges', desc: 'W3C exportables.' },
  { icon: Layers, title: 'Contenus variés', desc: 'Vidéos, articles, exercices.' },
  { icon: Users, title: 'Communauté', desc: 'Co-apprentissage entre pairs.' },
  { icon: Zap, title: 'Chatbot pédago', desc: 'Assistant IA 24/7.' },
  { icon: Sparkles, title: 'Passeport Dreyfus', desc: 'Compétences exportables.' },
];

// Minimal screen mockup for each feature visual
const FeatureMockup: React.FC<{ from: string; to: string; icon: React.FC<{ size: number; className?: string }> }> = ({ from, to, icon: Icon }) => (
  <div className={`rounded-2xl overflow-hidden aspect-[4/3] shadow-card-lift bg-gradient-to-br ${from} ${to} relative`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <Icon size={64} className="text-white/20" />
    </div>
    {/* Fake UI chrome */}
    <div className="absolute top-4 left-4 right-4 bottom-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
      <div className="h-6 bg-white/20 flex items-center gap-1.5 px-3">
        {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/40" />)}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {[90, 75, 85, 60].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/20" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-2 h-1.5 rounded-full bg-white/30" style={{ width: '65%' }} />
        <div className="flex gap-2 mt-2">
          {[40, 35, 45].map((w, i) => (
            <div key={i} className="h-6 rounded-lg bg-white/15 flex-1" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const MarketingLearningAppB2: React.FC = () => {
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

      {/* ── Hero minimal ─────────────────────────────────────────────────── */}
      <section className="pt-32 pb-section-lg bg-white border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-section items-center">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg">
              <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200 w-fit">
                <Sparkles size={14} className="text-primary-600" />
                <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                  Learn · Do · Match
                </span>
              </span>
              <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-[-0.03em] m-0 text-[clamp(2.75rem,6vw,5rem)]">
                Une plateforme.{' '}
                <span className="text-secondary-600">Tout un écosystème.</span>
              </h1>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-lg">
                Parcours adaptatifs, coaching humain, journal réflexif, Passeport Dreyfus. L'apprentissage qui laisse des traces.
              </p>
              <div className="flex flex-wrap gap-stack-xs">
                <MagneticButton strength={14}>
                  <a href="#early-access">
                    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                      Accès anticipé
                    </Button>
                  </a>
                </MagneticButton>
                <a href="#features">
                  <Button variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={16} />}>
                    Découvrir
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-stack-xs">
                <span className="inline-flex items-center gap-tight px-2 py-0.5 rounded-pill bg-accent-400 text-ink-900 text-micro font-bold uppercase tracking-wider">Beta</span>
                <span className="font-body text-body-sm text-ink-500">Accès progressif par invitation</span>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Simple stats column */}
          <FadeInWhenVisible direction="left" delay={0.15}>
            <div className="flex flex-col gap-stack">
              {[
                { val: 'Dreyfus', label: 'Référentiel de progression', sub: '5 niveaux : Novice → Expert', accent: 'text-primary-600' },
                { val: '100%', label: 'Coaching humain', sub: '1-1, messagerie + sessions', accent: 'text-secondary-600' },
                { val: 'W3C', label: 'Open Badges', sub: 'Compétences exportables partout', accent: 'text-warning-fg' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.val}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-stack p-stack-lg rounded-2xl border border-ink-100 hover:border-primary-200 hover:shadow-card transition-all duration-base"
                >
                  <span className={`font-display text-h2 font-extrabold leading-none ${stat.accent} shrink-0`}>{stat.val}</span>
                  <div>
                    <div className="font-body text-body-sm font-bold text-ink-900">{stat.label}</div>
                    <div className="font-body text-caption text-ink-500">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Zigzag features ──────────────────────────────────────────────── */}
      <div id="features">
        {FEATURES.map((f, idx) => (
          <section key={f.title} className={`py-page ${f.bg}`}>
            <div className="max-w-6xl mx-auto px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-section items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''}`}>
                <FadeInWhenVisible direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <FeatureMockup from={f.visual.from} to={f.visual.to} icon={f.icon} />
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
                    <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 whitespace-pre-line">
                      {f.title}
                    </h2>
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
          </section>
        ))}
      </div>

      {/* ── Tiles grid ───────────────────────────────────────────────────── */}
      <section className="py-page bg-white border-y border-ink-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Et bien plus encore.
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
            {TILES.map((tile, i) => (
              <FadeInWhenVisible key={tile.title} direction="up" delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  className="flex flex-col gap-stack-xs p-stack rounded-xl border border-ink-100 hover:border-primary-200 hover:shadow-card transition-all duration-base"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                    <tile.icon size={18} className="text-primary-600" />
                  </div>
                  <span className="font-display text-body font-bold text-ink-900">{tile.title}</span>
                  <span className="font-body text-caption text-ink-500">{tile.desc}</span>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto + signup ───────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary-400/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary-500/10 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-section text-center items-center">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Un apprentissage qui laisse des traces.
            </h2>
            <p className="font-body text-body-lg text-white/75 leading-relaxed m-0 mt-stack max-w-2xl">
              Chaque compétence acquise est tracée, validée, exportable. Votre Passeport de Compétences grandit avec vous.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <div id="early-access" className="w-full max-w-md">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-white/10 border border-white/20 p-stack-lg text-center"
                >
                  <p className="font-display text-h4 font-bold text-white m-0">Inscription enregistrée !</p>
                  <p className="font-body text-body-sm text-white/70 m-0 mt-stack">Vous serez parmi les premiers à accéder à la plateforme.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-stack">
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
                  <p className="font-body text-caption text-white/40 text-center m-0">Beta — accès progressif par invitation.</p>
                </form>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingLearningAppB2;
