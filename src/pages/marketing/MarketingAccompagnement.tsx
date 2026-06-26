/**
 * MarketingAccompagnement : Immersive Services Page (Phase P2.3)
 *
 * Direction: 6 service pillars + 3-step process timeline + testimonials + contact.
 * Tone: brand primary + warm CTAs + sun accents.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  PenLine,
  Cog,
  Users,
  BarChart3,
  Shield,
  Briefcase,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const SERVICES = [
  {
    icon: <Search size={24} />,
    pill: 'Stratégie',
    title: 'Diagnostic & Stratégie',
    desc: "Audit de votre dispositif existant, identification des cas d'usage IA prioritaires, feuille de route alignée sur vos résultats métier.",
  },
  {
    icon: <PenLine size={24} />,
    pill: 'Création',
    title: 'Conception Pédagogique',
    desc: 'Conception de parcours blended/digital, création de prompts et contenus multimédias, ingénierie pédagogique augmentée.',
  },
  {
    icon: <Cog size={24} />,
    pill: 'Production',
    title: 'Industrialisation & Outils',
    desc: "Déploiement d'automatisations, mise en place de chartes qualité et de guidelines pour vos équipes.",
  },
  {
    icon: <Users size={24} />,
    pill: 'Accompagnement',
    title: 'Animation & Coaching',
    desc: "Coaching d'équipe pour l'adoption de l'IA, facilitation d'ateliers et de communautés de pratique.",
  },
  {
    icon: <BarChart3 size={24} />,
    pill: 'Analytics',
    title: "Mesure d'Impact",
    desc: "KPIs, tableaux de bord, A/B testing pédagogique et reporting d'impact pour vos décideurs.",
  },
  {
    icon: <Shield size={24} />,
    pill: 'Gouvernance',
    title: 'Conformité & Éthique',
    desc: "Encadrement RGPD, propriété intellectuelle, gouvernance de l'IA responsable.",
  },
];

const PROCESS = [
  {
    num: '01',
    duration: '2 semaines',
    title: "S'orienter",
    desc: "Rencontre d'exploration (90 min), audit de maturité pédagogique, cartographie des compétences Dreyfus et identification des cas d'usage prioritaires. Livrable : rapport + feuille de route stratégique.",
    accent: 'bg-primary-500',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-700',
  },
  {
    num: '02',
    duration: '4–8 semaines',
    title: 'Tester · Réaliser',
    desc: "Validation du modèle sur une cohorte pilote (Tester), puis développement des agents IA, référentiels de compétences et parcours sur-mesure avec vos équipes (Réaliser). Livrable : dispositif conçu, testé et validé.",
    accent: 'bg-secondary-500',
    accentLight: 'bg-secondary-50',
    accentText: 'text-secondary-700',
  },
  {
    num: '03',
    duration: '2–4 semaines',
    title: 'Intégrer · Déployer · Évoluer',
    desc: "Connexion à votre stack existante (LMS, SIRH, CRM), lancement officiel, onboarding des équipes sur la Learning App et activation des Passeports de Compétences — puis amélioration continue pilotée par la donnée. Livrable : solution déployée + tableau de bord compétences.",
    accent: 'bg-accent-400',
    accentLight: 'bg-accent-50',
    accentText: 'text-warning-fg',
  },
];


export const MarketingAccompagnement: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', org: '', need: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Accompagnement STRIDE"
        description="Déployez l'IA dans votre organisation avec la méthode STRIDE. Accompagnement sur-mesure pour organismes de formation et ETI — de l'audit flash au déploiement opérationnel."
        canonical="/marketing/accompagnement"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        {/* Radial halo */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-pill bg-primary-500/30 blur-3xl" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-pill bg-secondary-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25 backdrop-blur-glass-light">
              <Briefcase size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Transition Skills-Based Organization · Méthode STRIDE
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Passez à une organisation <span className="text-accent-400">Skills-Based</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Des experts en pédagogie et en IA, sans bullshit. Nous auditons, concevons, déployons
              et mesurons — avec la méthode STRIDE et le Passeport de Compétences comme fil rouge.
              Des livrables tangibles à chaque étape.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <a href="#contact-form">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Demander un diagnostic
                  </Button>
                </a>
              </MagneticButton>
              <a href="#services">
                <Button variant="glass" size="lg">
                  Voir les services
                </Button>
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Services 6 cards ──────────────────────────────────────────────── */}
      <section id="services" className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                6 domaines d'expertise
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Une offre modulaire, combinable.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.1}>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Vous n'avez besoin que d'un audit ? Parfait. D'un programme complet ?
                On y va. Nous nous adaptons à votre contexte, jamais l'inverse.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {SERVICES.map((s, i) => (
              <FadeInWhenVisible key={s.title} direction="up" delay={i * 0.05}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-lg hover:border-primary-200 transition-shadow duration-base"
                >
                  <div className="flex items-start justify-between gap-stack-xs">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary-600">
                      {s.icon}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 font-body text-micro font-bold uppercase tracking-wider">
                      {s.pill}
                    </span>
                  </div>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {s.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {s.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process timeline ──────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-primary-600 uppercase tracking-widest">
                Méthode STRIDE
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois phases pour déployer <span className="text-accent-400">votre stratégie</span>.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {/* Connector line desktop */}
            <div
              aria-hidden
              className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-400"
            />
            {PROCESS.map((p, i) => (
              <FadeInWhenVisible key={p.num} direction="up" delay={i * 0.15}>
                <div className="relative flex flex-col gap-stack-lg">
                  {/* Number bubble */}
                  <div className="flex items-center gap-stack">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ type: 'spring', stiffness: 240, damping: 16, delay: i * 0.15 }}
                      className={`relative inline-flex items-center justify-center w-24 h-24 rounded-pill ${p.accent} text-white font-display font-extrabold text-h2 shadow-xl ring-8 ring-white`}
                    >
                      {p.num}
                    </motion.span>
                    <span className={`inline-flex items-center gap-tight px-2.5 py-1 rounded-pill ${p.accentLight} ${p.accentText} font-body text-caption font-bold uppercase tracking-wider`}>
                      {p.duration}
                    </span>
                  </div>
                  <div className="flex flex-col gap-stack">
                    <h3 className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                      {p.title}
                    </h3>
                    <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ancrage terrain ───────────────────────────────────────────────── */}
      <section className="py-section bg-gradient-to-b from-primary-50/30 to-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeInWhenVisible direction="up">
            <div className="rounded-2xl bg-white border border-primary-100 p-stack-lg flex flex-col md:flex-row items-center gap-section-lg">
              <div className="flex flex-col gap-stack flex-1">
                <span className="font-body text-caption font-bold text-primary-600 uppercase tracking-widest">
                  Notre ancrage
                </span>
                <p className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0">
                  Formateurs et ingénieurs pédagogiques de terrain.
                </p>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-prose">
                  Chloé Mimault et Pierre-Armand Dennery conçoivent et déploient
                  des dispositifs L&D depuis plusieurs années. Nous construisons
                  ce que nous vendons — méthode éprouvée, livrables concrets.
                </p>
              </div>
              <div className="flex flex-col gap-stack-xs items-center md:items-end shrink-0">
                <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-700 font-body text-caption font-semibold">
                  <GraduationCap size={13} /> Partenaire C-Campus
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Pourquoi TLS ──────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Ce qui nous distingue.
              </h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                On ne vend pas de frameworks génériques. On construit avec vous,
                pas pour vous.
              </p>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {[
              {
                icon: <GraduationCap size={22} />,
                title: 'Pédagogues avant tout',
                body: "Notre approche est conçue par des ingénieurs pédagogiques — pas des consultants IA génériques. La compétence au centre, l'outil au service.",
              },
              {
                icon: <Shield size={22} />,
                title: 'Exigence qualité',
                body: 'Méthode STRIDE documentée et éprouvée. Livrables contractualisés à chaque étape, pas de vague "transformation".',
              },
              {
                icon: <Sparkles size={22} />,
                title: 'IA Act · RGPD natifs',
                body: "Conformité intégrée dès la conception : IA Act (deadline 2026-08-02), RGPD, propriété intellectuelle. Vous avancez sans risque réglementaire.",
              },
            ].map((item, i) => (
              <FadeInWhenVisible key={item.title} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-2xl bg-gradient-to-br from-primary-50/60 to-white border border-primary-100 p-stack-lg flex flex-col gap-stack shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-base"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100 text-primary-600">
                    {item.icon}
                  </span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {item.body}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 relative overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-500/25 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 rounded-2xl bg-white/10 backdrop-blur-glass-heavy border border-white/20 p-section-lg flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-white/15 border border-white/25">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Première rencontre gratuite
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Parlons de votre projet.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              Décrivez-nous votre contexte. Nous vous répondons sous 48h ouvrées avec une proposition de RDV.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white/15 border border-white/25 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-xl"
              >
                <CheckCircle2 size={40} className="text-accent-400" />
                <p className="font-display font-bold text-h4 text-white m-0">Demande reçue !</p>
                <p className="font-body text-body-sm text-white/80 m-0">
                  Nous vous répondons sous 48h ouvrées avec une proposition de créneau.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-stack pt-stack text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="ac-name" className="font-body text-body-sm font-semibold text-white/90">
                      Prénom et nom *
                    </label>
                    <input
                      id="ac-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Marie Dupont"
                      className="px-4 h-12 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="ac-email" className="font-body text-body-sm font-semibold text-white/90">
                      Email pro *
                    </label>
                    <input
                      id="ac-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="marie@organisation.fr"
                      className="px-4 h-12 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="ac-org" className="font-body text-body-sm font-semibold text-white/90">
                    Organisation
                  </label>
                  <input
                    id="ac-org"
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="px-4 h-12 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="ac-need" className="font-body text-body-sm font-semibold text-white/90">
                    Votre besoin
                  </label>
                  <textarea
                    id="ac-need"
                    rows={4}
                    value={form.need}
                    onChange={(e) => setForm({ ...form, need: e.target.value })}
                    placeholder="Décrivez brièvement votre contexte et vos enjeux de formation…"
                    className="px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base resize-y h-auto min-h-[120px]"
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
                    Envoyer ma demande
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-white/60 text-center m-0">
                  Vos données restent confidentielles. RGPD respecté.
                </p>
              </form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingAccompagnement;
