/**
 * Variant C: "Storytelling Immersif"
 * Structure narrative calquée sur la homepage :
 *   Hero → Bridge → VideoScrollStory (4 chapitres) → Stats réels → 3 Leviers → Manifeste → CTA
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  CheckCircle2,
  GraduationCap,
  Smartphone,
  Compass,
  ShieldCheck,
  CreditCard,
  Globe,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { CinematicHero } from './components/CinematicHero';
import { VideoScrollStory } from './components/VideoScrollStory';

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TRUST_SIGNALS = [
  { value: '578', label: 'apprenants formés', note: 'C-Campus 2023' },
  { value: '+93%', label: 'de satisfaction', note: 'C-Campus 2023' },
  { value: '1 grand groupe', label: 'français en production', note: 'depuis janvier 2026' },
  { value: '7 modules', label: 'de formation certifiante', note: '7h de pédagogie active' },
] as const;

export const MarketingHomeC: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <div className="bg-white">

      {/* ── Hero cinématographique ───────────────────────────────────────────── */}
      <CinematicHero />

      {/* ── Lead-in : mise en scène du parcours ─────────────────────────────── */}
      <section className="py-section-lg bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col gap-stack">
          <p className="font-body text-caption font-bold text-secondary-500 uppercase tracking-widest m-0">
            Le parcours
          </p>
          <h2
            className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Quatre chapitres.<br />
            <span className="text-secondary-500">Un avant, un après.</span>
          </h2>
          <p className="font-body text-body text-ink-400 m-0">
            Défiler pour vivre le parcours.
          </p>
        </div>
      </section>

      {/* ── Storytelling vidéo sticky — 4 × 100vh ───────────────────────────── */}
      <VideoScrollStory />

      {/* ── Stats réels C-Campus ─────────────────────────────────────────────── */}
      <section className="border-y border-ink-100 py-stack-lg bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <p className="font-body text-caption text-ink-500 text-center font-semibold m-0">
              Résultats vérifiables · source C-Campus 2023
            </p>
          </FadeInWhenVisible>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
            {TRUST_SIGNALS.map((s, i) => (
              <FadeInWhenVisible key={s.label} direction="up" delay={i * 0.08}>
                <div className="flex flex-col items-center text-center gap-tight">
                  <span className="font-display text-h2 font-extrabold text-ink-900 tracking-display leading-none">
                    {s.value}
                  </span>
                  <span className="font-body text-body-sm font-semibold text-ink-700">{s.label}</span>
                  <span className="font-body text-micro text-ink-400">{s.note}</span>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 leviers ────────────────────────────────────────────────────────── */}
      <section className="relative py-page bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section-lg">
          <FadeInWhenVisible direction="up">
            <div className="max-w-2xl flex flex-col gap-stack">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Formation, technologie,{' '}
                <span className="text-secondary-500">accompagnement.</span>
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                Trois portes d'entrée vers la même destination : une organisation qui apprend vraiment.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {[
              {
                icon: <Smartphone size={24} />,
                label: 'Learning App',
                title: 'La plateforme qui apprend avec vous',
                desc: 'Parcours adaptatifs, Passeport Dreyfus, coaching intégré, matching IA.',
                bg: 'from-primary-50/60 via-white to-primary-100/30',
                border: 'border-primary-100 hover:border-primary-300',
                iconBg: 'bg-primary-100 text-primary-700',
                link: '/marketing/learning-app',
                color: 'text-primary-700',
              },
              {
                icon: <GraduationCap size={24} />,
                label: 'Formation certifiante',
                title: 'Devenez Formateur Augmenté',
                desc: 'Méthode STRIDE · pédagogie active · Open Badge C-Campus. 7 modules, 8 semaines.',
                bg: 'from-secondary-50/60 via-white to-secondary-100/30',
                border: 'border-secondary-100 hover:border-secondary-300',
                iconBg: 'bg-secondary-100 text-secondary-700',
                link: '/marketing/formation',
                color: 'text-secondary-700',
              },
              {
                icon: <Compass size={24} />,
                label: 'Accompagnement',
                title: 'Avec vous, pas pour vous',
                desc: 'Conseil stratégique · déploiement sur mesure · pilotage de la montée en compétences.',
                bg: 'from-accent-50/60 via-white to-accent-100/30',
                border: 'border-accent-100 hover:border-accent-300',
                iconBg: 'bg-accent-100 text-accent-700',
                link: '/marketing/accompagnement',
                color: 'text-accent-700',
              },
            ].map((card, i) => (
              <FadeInWhenVisible key={card.label} direction="up" delay={i * 0.1}>
                <article className={`group relative rounded-3xl bg-gradient-to-br ${card.bg} border ${card.border} hover:shadow-xl transition-all duration-500 p-stack-lg flex flex-col gap-stack-lg min-h-[240px]`}>
                  <div className={`inline-flex w-12 h-12 rounded-xl ${card.iconBg} items-center justify-center group-hover:scale-110 transition-transform duration-base`}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col gap-stack flex-1">
                    <span className={`font-body text-caption font-bold uppercase tracking-widest ${card.color}`}>
                      {card.label}
                    </span>
                    <h3 className="font-display text-h4 font-extrabold text-ink-900 m-0 leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                      {card.desc}
                    </p>
                  </div>
                  <Link to={card.link} className={`flex items-center gap-stack-xs ${card.color} font-semibold text-body-sm`}>
                    <span>En savoir plus</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-base" />
                  </Link>
                </article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifeste pull-quote (dark) ───────────────────────────────────────── */}
      <section className="relative py-page overflow-hidden bg-ink-900">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(700px circle at 25% 30%, rgba(85, 161, 180, 0.32), transparent 55%),
              radial-gradient(600px circle at 75% 70%, rgba(248, 176, 68, 0.18), transparent 55%)
            `,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: GRAIN_SVG }}
        />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-section">
          <FadeInWhenVisible direction="up">
            <Quote size={48} className="text-accent-400" />
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium text-white leading-[1.2] tracking-tight m-0">
              L'enjeu n'est pas de produire{' '}
              <span className="text-white/40">plus de contenu</span>.
              <br />
              C'est de produire des{' '}
              <span className="text-accent-400 font-bold italic">apprenants augmentés</span>.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex items-center gap-stack-xs">
              <div className="w-12 h-px bg-white/30" />
              <span className="font-body text-caption text-white/60 tracking-widest uppercase font-semibold">
                Notre philosophie
              </span>
              <div className="w-12 h-px bg-white/30" />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Qualité & financement ─────────────────────────────────────────────── */}
      <section className="py-stack-lg bg-white border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
            {[
              { icon: <ShieldCheck size={22} />, bg: 'bg-primary-50 text-primary-700', title: 'Open Badge', desc: "Certification numérique vérifiable, délivrée à l'issue du parcours." },
              { icon: <CreditCard size={22} />, bg: 'bg-secondary-50 text-secondary-700', title: 'Éligible OPCO', desc: 'Prise en charge possible via votre OPCO. Devis sur demande.' },
              { icon: <Globe size={22} />, bg: 'bg-accent-50 text-accent-700', title: '100% à distance', desc: 'Formation en ligne, accessible depuis partout, à votre rythme.' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-stack p-stack rounded-2xl border border-ink-100 bg-white">
                <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex flex-col gap-tight">
                  <span className="font-display font-bold text-body-sm text-ink-900">{item.title}</span>
                  <span className="font-body text-caption text-ink-500 leading-relaxed">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA finale ───────────────────────────────────────────────────────── */}
      <section className="relative py-page overflow-hidden bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-pill bg-primary-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-pill bg-accent-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col gap-stack-lg items-center">
          <FadeInWhenVisible direction="up">
            <h2
              className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0"
              style={{ fontSize: 'clamp(2.5rem,6vw,5rem)' }}
            >
              Et si on en parlait{' '}
              <span className="text-primary-700">de vive voix</span> ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
              30 minutes pour comprendre vos enjeux et tracer le chemin le plus court vers l'impact.
              Pas de slides, pas de démo formatée. Juste une conversation.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Link to="/marketing/contact">
                  <Button variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                    Réserver un échange
                  </Button>
                </Link>
              </MagneticButton>
              <Link to="/marketing/learning-app">
                <Button variant="ghost" size="xl" trailingIcon={<ArrowUpRight size={18} />}>
                  Voir la démo
                </Button>
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

    </div>
  );
};

export default MarketingHomeC;
