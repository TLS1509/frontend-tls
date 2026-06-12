/**
 * Variant B: "Editorial Dense"
 * Inspirations : Linear, Vercel, Cursor, Resend.
 * Mood : Modern technique, bento grids, app mockups front-and-center, dense info.
 * Identity TLS : brand teal dominant + warm CTAs, AmbientBlobs vifs.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Users,
  Zap,
  BookOpen,
  TrendingUp,
  Award,
  Check,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { TlsLogo } from '../../components/ui/TlsLogo';
import { Badge } from '../../components/ui/Badge';

const LOGOS = ['Renault', 'BNP Paribas', 'Capgemini', 'L\'Oréal', 'Airbus', 'Decathlon', 'Orange', 'SG'];

const FEATURES = [
  {
    icon: <Brain size={20} />,
    title: 'IA pédagogique embarquée',
    desc: 'Conception assistée, personnalisation des parcours, suggestions contextuelles. Mistral + Perplexity intégrés.',
    span: 'col-span-2',
    accent: 'brand',
  },
  {
    icon: <Target size={20} />,
    title: 'Passeport Compétences Dreyfus',
    desc: 'Échelle Novice → Expert sur chaque compétence H.S.O.',
    span: 'col-span-1',
    accent: 'warm',
  },
  {
    icon: <Users size={20} />,
    title: 'Coaching 1-1 intégré',
    desc: 'Messagerie, corrections, sessions visio.',
    span: 'col-span-1',
    accent: 'warm',
  },
  {
    icon: <Zap size={20} />,
    title: 'Gamification & Open Badges',
    desc: 'XP, streaks, badges exportables W3C Open Badges 2.0.',
    span: 'col-span-2',
    accent: 'sun',
  },
];

const METRICS = [
  { value: '200+', label: 'formateurs certifiés' },
  { value: '40+', label: 'organisations' },
  { value: '120+', label: 'modules' },
  { value: '97%', label: 'satisfaction' },
];

const TESTIMONIALS = [
  {
    quote: 'En 3 mois, on a doublé l\'engagement et divisé par 2 le temps de conception.',
    author: 'Camille L.',
    role: 'Directrice Formation, Renault',
    portrait: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote: 'Le Passeport Dreyfus a changé notre façon de mesurer la montée en compétence.',
    author: 'Marc D.',
    role: 'Head of L&D, Capgemini',
    portrait: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop',
  },
  {
    quote: 'TLS fait ce que les LMS classiques promettent depuis 15 ans.',
    author: 'Sophie M.',
    role: 'CHRO, L\'Oréal',
    portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop',
  },
];

export const MarketingHomeB: React.FC = () => (
  <div className="bg-white">

    {/* ── Hero: split 60/40 text + mockup ───────────────────────────────────── */}
    <section className="relative pt-28 pb-section-lg overflow-hidden">
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary-400/30 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary-300/20 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-300/20 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-page items-center">
        {/* Text column */}
        <div className="flex flex-col gap-stack-lg">
          <span className="inline-flex items-center gap-stack-xs px-3 py-1 rounded-pill bg-primary-50 border border-primary-200 w-fit">
            <Sparkles size={14} className="text-primary-700" />
            <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
              Plateforme · Formation · Accompagnement
            </span>
          </span>

          <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 text-[clamp(2.75rem,6vw,4.75rem)]">
            La pile complète pour <span className="text-primary-700">former à l'ère de l'IA</span>.
          </h1>

          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
            Plateforme apprenante, certification formateur, conseil stratégique.
            Tout-en-un, prêt à déployer en 30 jours.
          </p>

          <div className="flex flex-wrap items-center gap-stack-xs">
            <Link to="/marketing/learning-app">
              <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Demander une démo
              </Button>
            </Link>
            <Link to="/marketing/formation">
              <Button variant="ghost" size="lg">
                Voir la formation
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-stack-lg pt-stack border-t border-ink-100">
            {METRICS.map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-h3 font-extrabold text-ink-900 tabular-nums leading-none">{value}</span>
                <span className="font-body text-caption text-ink-500 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup column: stacked devices */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/40 to-accent-200/40 blur-3xl pointer-events-none" />
          <div className="relative aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-ink-100 shadow-xl overflow-hidden p-6 flex flex-col gap-stack-xs">
            {/* mockup header */}
            <div className="flex items-center gap-stack-xs pb-2 border-b border-ink-100">
              <TlsLogo size={20} />
              <span className="font-display font-bold text-body-sm text-ink-900">Learning App</span>
              <div className="ml-auto flex gap-tight">
                <span className="w-2 h-2 rounded-full bg-ink-200" />
                <span className="w-2 h-2 rounded-full bg-ink-200" />
                <span className="w-2 h-2 rounded-full bg-ink-200" />
              </div>
            </div>
            {/* Resume lesson card */}
            <div className="rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 p-4 text-white">
              <p className="text-caption opacity-80 font-semibold uppercase tracking-wider m-0">Étape 4 sur 7</p>
              <p className="font-display text-h4 font-bold m-0 mt-1">Devenir prompt designer</p>
              <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '57%' }} />
              </div>
            </div>
            {/* Stats mini grid */}
            <div className="grid grid-cols-2 gap-stack-xs">
              <div className="rounded-lg bg-primary-50 p-3 flex flex-col gap-0.5">
                <span className="text-caption font-bold text-primary-700 uppercase">XP</span>
                <span className="font-display text-h4 font-bold text-ink-900">+340</span>
              </div>
              <div className="rounded-lg bg-accent-50 p-3 flex flex-col gap-0.5">
                <span className="text-caption font-bold text-warning-fg uppercase">Streak</span>
                <span className="font-display text-h4 font-bold text-ink-900">12j</span>
              </div>
            </div>
            {/* Coach card */}
            <div className="rounded-lg bg-white border border-ink-200 p-3 flex items-center gap-stack-xs mt-auto">
              <div className="w-10 h-10 rounded-pill bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-body-sm text-ink-900 m-0 truncate">Session avec Sarah</p>
                <p className="font-body text-caption text-ink-500 m-0 truncate">Mardi 14:30 · Visio</p>
              </div>
              <Badge variant="brand">Live</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Logos band: dense grayscale ───────────────────────────────────────── */}
    <section className="border-y border-ink-100 bg-ink-50/50 py-stack-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-4 lg:grid-cols-8 items-center gap-stack-lg">
          {LOGOS.map((name) => (
            <span key={name} className="font-display text-body-sm font-bold text-ink-500 tracking-tight text-center opacity-60 hover:opacity-100 transition-opacity">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── Features: bento grid ──────────────────────────────────────────────── */}
    <section className="py-page bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
        <div className="flex flex-col gap-stack max-w-2xl">
          <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
            Plateforme
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Tout ce qu'il faut pour former,<br />sans rien d'inutile.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          {FEATURES.map(({ icon, title, desc, span, accent }) => {
            const accentMap = {
              brand: 'from-primary-50 to-primary-100/50 border-primary-200 text-primary-700',
              warm: 'from-secondary-50 to-secondary-100/40 border-secondary-200 text-secondary-700',
              sun: 'from-accent-50 to-accent-100/40 border-accent-200 text-warning-fg',
            } as const;
            return (
              <div
                key={title}
                className={`${span} md:${span} rounded-2xl bg-gradient-to-br ${accentMap[accent as keyof typeof accentMap]} border p-6 flex flex-col gap-stack min-h-[180px]`}
              >
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-ink-100 ${accentMap[accent as keyof typeof accentMap].split(' ').pop()}`}>
                  {icon}
                </span>
                <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                  {title}
                </h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Product showcase: dark anchor section ─────────────────────────────── */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-page">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary-500 blur-[120px] opacity-30" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent-400 blur-[120px] opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-page items-center">
        <div className="flex flex-col gap-stack-lg">
          <span className="font-body text-caption font-bold text-accent-400 uppercase tracking-widest">
            Formation
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
            Devenez Formateur Augmenté.
          </h2>
          <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-lg">
            Certification reconnue Open Badge 2.0. 7 modules,
            8 semaines, en partenariat avec C-Campus.
          </p>

          <ul className="flex flex-col gap-stack-xs m-0 p-0 list-none">
            {[
              'Prompt Engineering & conception pédagogique IA',
              'Éthique, AI Act, RGPD pour les formateurs',
              'Outils, frameworks, méthodologie STRIDE',
              'Coaching 1-1 inclus pendant la formation',
            ].map((f) => (
              <li key={f} className="flex items-start gap-stack-xs font-body text-body text-white/90">
                <Check size={18} className="text-accent-400 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
            <Link to="/marketing/formation">
              <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Voir le programme
              </Button>
            </Link>
            <span className="font-body text-body-sm text-white/70">
              À partir de <span className="font-bold text-white">249€</span>
            </span>
          </div>
        </div>

        {/* Stylized program preview card */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-glass-medium border border-white/15 p-6 flex flex-col gap-stack">
          <div className="flex items-center gap-stack-xs">
            <Award size={18} className="text-accent-400" />
            <span className="font-body text-caption font-semibold text-white/90 uppercase tracking-wider">
              Programme certifiant
            </span>
          </div>
          {[
            { label: 'Module 1', title: 'Introduction Formateur Augmenté', dur: '2h' },
            { label: 'Module 2', title: 'Prompt Engineering Pédagogique', dur: '4h' },
            { label: 'Module 3', title: 'Conception de parcours IA', dur: '6h' },
            { label: 'Module 4', title: 'Éthique & cadre légal', dur: '3h' },
            { label: 'Modules 5-7', title: 'STRIDE, déploiement, mesure', dur: '12h' },
          ].map((m) => (
            <div key={m.label} className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between gap-stack-xs">
              <div className="flex flex-col">
                <span className="font-body text-caption font-bold text-accent-400 uppercase tracking-wider">{m.label}</span>
                <span className="font-display font-bold text-body text-white m-0">{m.title}</span>
              </div>
              <span className="font-body text-caption text-white/60 shrink-0">{m.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Testimonials: 3-card carousel-like grid ───────────────────────────── */}
    <section className="py-page bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
        <div className="flex flex-col gap-stack max-w-2xl">
          <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
            Témoignages
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Ce qu'en disent les leaders L&D.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
          {TESTIMONIALS.map(({ quote, author, role, portrait }) => (
            <article key={author} className="rounded-2xl bg-ink-50/50 border border-ink-100 p-6 flex flex-col gap-stack-lg">
              <p className="font-body text-body text-ink-800 leading-relaxed m-0 flex-1">
                "{quote}"
              </p>
              <div className="flex items-center gap-stack-xs pt-stack border-t border-ink-100">
                <img src={portrait} alt="" className="w-10 h-10 rounded-pill object-cover" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-body-sm text-ink-900">{author}</span>
                  <span className="font-body text-caption text-ink-500">{role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA final ────────────────────────────────────────────────────────── */}
    <section className="bg-gradient-to-br from-ink-50 to-primary-50/40 py-page border-t border-ink-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-stack-lg items-center justify-between">
        <div className="flex flex-col gap-stack max-w-2xl">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Prêt à déployer en 30 jours ?
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Un onboarding clé-en-main, du diagnostic à la mise en production.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs shrink-0">
          <Link to="/marketing/contact">
            <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Demander un devis
            </Button>
          </Link>
          <Link to="/marketing/learning-app">
            <Button variant="ghost" size="lg">
              Voir la démo
            </Button>
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default MarketingHomeB;
