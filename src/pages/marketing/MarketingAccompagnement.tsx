/**
 * MarketingAccompagnement — Immersive Services Page (Phase P2.3)
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
  Star,
  CheckCircle2,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  ParallaxLayer,
  MagneticButton,
  GradientText,
  CountUp,
} from '../../components/marketing/motion';

const SERVICES = [
  {
    icon: <Search size={24} />,
    pill: 'Stratégie',
    title: 'Diagnostic & Stratégie',
    desc: "Audit de votre dispositif existant, identification des cas d'usage IA prioritaires, feuille de route alignée sur vos résultats métier.",
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
  {
    icon: <PenLine size={24} />,
    pill: 'Création',
    title: 'Conception Pédagogique',
    desc: 'Conception de parcours blended/digital, création de prompts et contenus multimédias, ingénierie pédagogique augmentée.',
    tone: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  },
  {
    icon: <Cog size={24} />,
    pill: 'Production',
    title: 'Industrialisation & Outils',
    desc: "Déploiement d'automatisations, mise en place de chartes qualité et de guidelines pour vos équipes.",
    tone: 'bg-accent-50 text-warning-fg border-accent-100',
  },
  {
    icon: <Users size={24} />,
    pill: 'Accompagnement',
    title: 'Animation & Coaching',
    desc: "Coaching d'équipe pour l'adoption de l'IA, facilitation d'ateliers et de communautés de pratique.",
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
  {
    icon: <BarChart3 size={24} />,
    pill: 'Analytics',
    title: "Mesure d'Impact",
    desc: "KPIs, tableaux de bord, A/B testing pédagogique et reporting d'impact pour vos décideurs.",
    tone: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  },
  {
    icon: <Shield size={24} />,
    pill: 'Gouvernance',
    title: 'Conformité & Éthique',
    desc: "Encadrement RGPD, propriété intellectuelle, gouvernance de l'IA responsable.",
    tone: 'bg-accent-50 text-warning-fg border-accent-100',
  },
];

const PROCESS = [
  {
    num: '01',
    duration: '2 semaines',
    title: 'Diagnostic',
    desc: "Rencontre d'exploration (90 min), audit du dispositif existant, identification des cas d'usage prioritaires. Livrable : rapport + recommandations stratégiques.",
    accent: 'bg-primary-500',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-700',
  },
  {
    num: '02',
    duration: '4–8 semaines',
    title: 'Co-construction',
    desc: "Ateliers de co-conception, prototypage de solutions, formation des équipes impliquées. Livrable : parcours ou dispositif conçu et testé.",
    accent: 'bg-secondary-500',
    accentLight: 'bg-secondary-50',
    accentText: 'text-secondary-700',
  },
  {
    num: '03',
    duration: '2–4 semaines',
    title: 'Déploiement',
    desc: "Mise en production, formation des utilisateurs finaux, suivi des indicateurs d'impact. Livrable : solution déployée + tableau de bord.",
    accent: 'bg-accent-400',
    accentLight: 'bg-accent-50',
    accentText: 'text-warning-fg',
  },
];

// ⚠️ PLACEHOLDER — Témoignages illustratifs. Le site live n'en publie aucun.
// À remplacer par de vrais témoignages clients (avec accord écrit) avant production.
const TESTIMONIALS = [
  {
    quote:
      "L'équipe TLS nous a permis de déployer notre première formation IA en 6 semaines. La rigueur pédagogique et la maîtrise des outils sont impressionnantes.",
    author: 'Directrice Formation',
    org: 'Groupe industriel · 500+ collaborateurs',
    stars: 5,
  },
  {
    quote:
      "Le diagnostic initial a été une révélation : nous avions des doublons et des outils sous-utilisés. La feuille de route qu'ils ont livrée a changé notre vision.",
    author: 'Responsable L&D',
    org: 'Scale-up tech · 200 collaborateurs',
    stars: 5,
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
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
        <MeshGradientBg tone="brand" intensity="normal" />
        <ParallaxLayer amplitude={60} className="absolute -top-10 -right-32 pointer-events-none" aria-hidden>
          <div className="w-96 h-96 rounded-pill bg-secondary-400/20 blur-3xl" />
        </ParallaxLayer>

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20">
              <Briefcase size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Consulting & accompagnement sur mesure
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-white leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              On co-construit{' '}
              <GradientText
                from="from-accent-300"
                via="via-accent-400"
                to="to-secondary-400"
                duration={10}
              >
                ta stratégie IA
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-2xl">
              Des experts en pédagogie et en IA, sans bullshit. On audit, on conçoit, on déploie,
              on mesure. Trois phases claires, des livrables tangibles.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
              <MagneticButton strength={14}>
                <a href="#contact-form">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Demander un diagnostic
                  </Button>
                </a>
              </MagneticButton>
              <a href="#services">
                <Button
                  variant="ghost"
                  size="lg"
                  className="!text-white hover:!bg-white/10 !border !border-white/30"
                >
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
                Tu n'as besoin que d'un audit ? Top. D'un programme complet ? On y va.
                On s'adapte à ton contexte, jamais l'inverse.
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
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${s.tone}`}>
                      {s.icon}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-pill border ${s.tone} font-body text-micro font-bold uppercase tracking-wider`}>
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
      <section className="py-page bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
                Méthode
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois phases.{' '}
                <GradientText
                  from="from-secondary-500"
                  via="via-secondary-600"
                  to="to-accent-500"
                >
                  Du diagnostic au déploiement
                </GradientText>
                .
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
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-pill ${p.accentLight} ${p.accentText} font-body text-caption font-bold uppercase tracking-wider`}>
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

      {/* ── Metrics ───────────────────────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-stack">
          {[
            { to: 40, suffix: '+', label: 'missions livrées' },
            { to: 6, suffix: ' sem', label: 'time-to-market moyen' },
            { to: 97, suffix: ' %', label: 'satisfaction client' },
            { to: 12, suffix: '+', label: 'secteurs accompagnés' },
          ].map((m, i) => (
            <FadeInWhenVisible key={m.label} direction="up" delay={i * 0.08}>
              <div className="flex flex-col items-center text-center gap-1 p-stack-lg rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50/40 border border-ink-100">
                <CountUp
                  to={m.to}
                  suffix={m.suffix}
                  className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-primary-700 leading-none"
                />
                <span className="font-body text-caption text-ink-600 mt-1 uppercase tracking-wider font-semibold">
                  {m.label}
                </span>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white via-secondary-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <div className="flex flex-col gap-stack max-w-3xl">
            <FadeInWhenVisible direction="up">
              <span className="font-body text-caption font-bold text-secondary-600 uppercase tracking-widest">
                Ils nous ont fait confiance
              </span>
            </FadeInWhenVisible>
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Ce qu'en disent nos clients.
              </h2>
            </FadeInWhenVisible>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {TESTIMONIALS.map((t, i) => (
              <FadeInWhenVisible key={t.author + i} direction="up" delay={i * 0.1}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-3xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack-lg shadow-sm hover:shadow-xl transition-shadow duration-base"
                >
                  <div className="flex items-center justify-between">
                    <Quote size={28} className="text-accent-400" />
                    <div className="flex gap-1">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} size={16} className="fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="font-display text-body-lg font-medium text-ink-900 leading-snug m-0">
                    « {t.quote} »
                  </blockquote>
                  <div className="flex flex-col gap-0.5 pt-stack border-t border-ink-100">
                    <span className="font-display font-bold text-body-sm text-ink-900">{t.author}</span>
                    <span className="font-body text-caption text-ink-500">{t.org}</span>
                  </div>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="relative overflow-hidden py-page bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900"
      >
        <MeshGradientBg tone="brand" intensity="normal" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/10 backdrop-blur-glass-medium border border-white/20">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-white tracking-wider uppercase">
                Première rencontre gratuite
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.05}>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Parlons de ton projet.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-prose">
              Décris-nous ton contexte. On te répond sous 48h ouvrées avec une proposition de RDV.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white/10 backdrop-blur-glass-medium border border-white/20 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-xl"
              >
                <CheckCircle2 size={40} className="text-accent-400" />
                <p className="font-display font-bold text-h4 text-white m-0">Demande reçue !</p>
                <p className="font-body text-body-sm text-white/75 m-0">
                  On te répond sous 48h ouvrées avec une proposition de créneau.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-stack pt-stack text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ac-name" className="font-body text-body-sm font-semibold text-white">
                      Prénom et nom *
                    </label>
                    <input
                      id="ac-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Marie Dupont"
                      className="px-4 h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ac-email" className="font-body text-body-sm font-semibold text-white">
                      Email pro *
                    </label>
                    <input
                      id="ac-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="marie@organisation.fr"
                      className="px-4 h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ac-org" className="font-body text-body-sm font-semibold text-white">
                    Organisation
                  </label>
                  <input
                    id="ac-org"
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="px-4 h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ac-need" className="font-body text-body-sm font-semibold text-white">
                    Ton besoin
                  </label>
                  <textarea
                    id="ac-need"
                    rows={4}
                    value={form.need}
                    onChange={(e) => setForm({ ...form, need: e.target.value })}
                    placeholder="Décris brièvement ton contexte et tes objectifs…"
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base resize-y h-auto min-h-[120px]"
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
                <p className="font-body text-caption text-white/55 text-center m-0">
                  Tes données restent confidentielles. RGPD respecté.
                </p>
              </form>
            )}
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingAccompagnement;
