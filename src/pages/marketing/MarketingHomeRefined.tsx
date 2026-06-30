/**
 * Variant A: "Editorial Aerated"
 * Inspirations : Apple, Anthropic, Stripe.
 * Mood : Premium calme, whitespace généreux, oversized typo, narrative scroll.
 * Identity TLS : brand teal + accent yellow sparks, warm en CTAs primaires.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Quote,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { TlsLogo } from '../../components/ui/TlsLogo';

const TRUSTED_LOGOS = [
  'Renault', 'BNP Paribas', 'Capgemini', 'L\'Oréal', 'Airbus', 'Decathlon', 'Orange', 'Société Générale',
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'L\'intelligence augmente, ne remplace pas',
    body: 'L\'IA est un copilote pour vos formateurs. Elle accélère la conception, personnalise les parcours, libère du temps pour l\'accompagnement humain.',
  },
  {
    number: '02',
    title: 'La pédagogie reste reine',
    body: 'Avant chaque feature, une question : est-ce qu\'elle améliore l\'apprentissage profond ? Nous ne shippons pas de gadgets.',
  },
  {
    number: '03',
    title: 'L\'éthique se code dans les fondations',
    body: 'RGPD, AI Act, audit trail des décisions IA : tout est intégré dès le design, jamais en patch. La confiance se construit.',
  },
];

export const MarketingHomeRefined: React.FC = () => (
  <div className="bg-white">

    {/* ── Hero: éditorial centré, typo oversized ────────────────────────────── */}
    <section className="relative pt-32 pb-section-lg overflow-hidden">
      {/* Subtle ambient gradient */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-100/40 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-100/30 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
        <span className="inline-flex items-center gap-stack-xs px-3 py-1 rounded-pill bg-white border border-ink-200 shadow-xs">
          <Sparkles size={14} className="text-accent-400" />
          <span className="font-body text-caption font-semibold text-ink-700 tracking-wider uppercase">
            La formation augmentée par l'IA
          </span>
        </span>

        <h1 className="font-display font-extrabold text-ink-900 leading-[0.95] tracking-tight m-0 text-[clamp(3rem,8vw,6.5rem)]">
          Former, c'est<br />
          <span className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 bg-clip-text text-transparent">
            transmettre l'avenir.
          </span>
        </h1>

        <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
          The Learning Society conçoit la formation comme une œuvre.
          Nous combinons intelligence artificielle et expertise pédagogique
          pour créer des parcours qui transforment durablement.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
          <Link to="/marketing/formation">
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Devenir Formateur Augmenté
            </Button>
          </Link>
          <Link to="/marketing/learning-app">
            <Button variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Découvrir la plateforme
            </Button>
          </Link>
        </div>

        {/* Hero portrait: placeholder photo */}
        <div className="mt-section w-full max-w-4xl aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 border border-ink-100 shadow-xl relative">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop"
            alt="Session de formation augmentée"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
        </div>
      </div>
    </section>

    {/* ── Trusted by: bandeau grayscale ─────────────────────────────────────── */}
    <section className="border-y border-ink-100 py-section">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-stack-lg">
        <p className="font-body text-caption text-ink-500 text-center uppercase tracking-widest font-semibold">
          40+ organisations leur font confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
          {TRUSTED_LOGOS.map((name) => (
            <span key={name} className="font-display text-body-lg font-bold text-ink-700 tracking-tight">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ── 3 principes: éditorial numéroté ───────────────────────────────────── */}
    <section className="py-page bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-page">
        <div className="flex flex-col gap-stack max-w-3xl">
          <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
            Notre conviction
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Trois principes qui guident<br />tout ce que nous concevons.
          </h2>
        </div>

        <div className="flex flex-col gap-section-lg">
          {PRINCIPLES.map(({ number, title, body }, i) => (
            <article
              key={number}
              className={`flex flex-col md:flex-row gap-stack-lg md:gap-page items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-32 shrink-0">
                <span className="font-display text-[5rem] font-extrabold text-primary-100 leading-none tracking-tight">
                  {number}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-stack max-w-2xl">
                <h3 className="font-display text-h2 font-bold text-ink-900 leading-tight m-0">
                  {title}
                </h3>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* ── App showcase: full-bleed mockup ─────────────────────────────────── */}
    <section className="bg-gradient-to-b from-white via-primary-50/30 to-white py-page overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-section text-center">
        <div className="flex flex-col gap-stack max-w-2xl">
          <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
            La Learning App
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
            Une plateforme,<br />tout un écosystème.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Parcours adaptatifs, coaching personnalisé, journal réflexif, gamification: intégrés dans une expérience cohérente.
          </p>
        </div>

        {/* App mockup: laptop frame inline */}
        <div className="w-full max-w-5xl relative">
          <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700 shadow-2xl border-8 border-ink-900">
            <div className="h-8 bg-ink-900 flex items-center px-3 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-success-base" />
            </div>
            <div className="p-8 bg-white h-[calc(100%-2rem)] flex flex-col gap-stack">
              <div className="flex items-center gap-stack-xs">
                <TlsLogo size={28} />
                <span className="font-display font-bold text-h4 text-ink-900">Tableau de bord</span>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                <p className="text-caption opacity-80 font-semibold uppercase tracking-wider m-0">Mardi 19 mai</p>
                <p className="font-display text-h2 font-bold m-0 mt-2">Bienvenue Marie 👋</p>
                <p className="text-body-sm opacity-90 m-0 mt-2">Ton parcours Leadership t'attend: étape 4 sur 7.</p>
              </div>
              <div className="grid grid-cols-3 gap-stack-xs">
                {['Parcours', 'Coaching', 'Veille'].map((t) => (
                  <div key={t} className="rounded-xl bg-ink-50 p-3 flex flex-col gap-tight">
                    <span className="text-caption font-bold text-ink-500 uppercase">{t}</span>
                    <span className="font-display text-h3 font-bold text-ink-900">+12</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link to="/marketing/learning-app">
          <Button variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
            Voir toutes les fonctionnalités
          </Button>
        </Link>
      </div>
    </section>

    {/* ── Testimonial hero: single quote ────────────────────────────────────── */}
    <section className="py-page bg-white">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-section items-center text-center">
        <Quote size={48} className="text-accent-400" />
        <blockquote className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium text-ink-900 leading-snug m-0 max-w-3xl">
          "TLS a transformé notre approche de la formation interne.
          Nos formateurs sont devenus des architectes de parcours,
          et l'engagement de nos apprenants a doublé."
        </blockquote>
        <div className="flex items-center gap-stack">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&auto=format&fit=crop"
            alt=""
            className="w-16 h-16 rounded-pill object-cover border-2 border-white shadow-md"
          />
          <div className="text-left">
            <p className="font-display font-bold text-body text-ink-900 m-0">Camille Lefèvre</p>
            <p className="font-body text-body-sm text-ink-500 m-0">Directrice Formation, Renault</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA final: minimaliste centré ─────────────────────────────────────── */}
    <section className="bg-ink-50 py-page">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
          Une heure de votre temps.<br />
          <span className="text-primary-600">Une nouvelle approche.</span>
        </h2>
        <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
          Échangez avec notre équipe pour découvrir comment intégrer l'IA dans vos formations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
          <Link to="/marketing/contact">
            <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Réserver un échange
            </Button>
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default MarketingHomeRefined;
