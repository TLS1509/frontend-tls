/**
 * MarketingAccompagnement : Immersive Services Page (Phase P2.3)
 *
 * Direction: 6 service pillars + 3-step process timeline + testimonials + contact.
 * Tone: brand primary + warm CTAs + sun accents.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  ArrowRight,
  AlertCircle,
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
  Stagger,
  StaggerItem,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const SERVICES = [
  {
    icon: <Search size={24} />,
    pill: 'Stratégie',
    title: 'Diagnostic & Stratégie',
    desc: "Audit de votre dispositif existant, identification des cas d'usage IA prioritaires, feuille de route alignée sur vos résultats métier.",
    iconBg: 'bg-primary-100',
    iconText: 'text-primary-600',
    pillCls: 'bg-primary-50 border-primary-200 text-primary-700',
  },
  {
    icon: <PenLine size={24} />,
    pill: 'Création',
    title: 'Conception Pédagogique',
    desc: 'Conception de parcours blended/digital, création de prompts et contenus multimédias, ingénierie pédagogique augmentée.',
    iconBg: 'bg-secondary-100',
    iconText: 'text-secondary-600',
    pillCls: 'bg-secondary-50 border-secondary-200 text-secondary-700',
  },
  {
    icon: <Cog size={24} />,
    pill: 'Production',
    title: 'Industrialisation & Outils',
    desc: "Déploiement d'automatisations, mise en place de chartes qualité et de guidelines pour vos équipes.",
    iconBg: 'bg-ink-100',
    iconText: 'text-ink-600',
    pillCls: 'bg-ink-50 border-ink-200 text-ink-600',
  },
  {
    icon: <Users size={24} />,
    pill: 'Accompagnement',
    title: 'Animation & Coaching',
    desc: "Coaching d'équipe pour l'adoption de l'IA, facilitation d'ateliers et de communautés de pratique.",
    iconBg: 'bg-primary-50',
    iconText: 'text-primary-700',
    pillCls: 'bg-primary-50 border-primary-100 text-primary-600',
  },
  {
    icon: <BarChart3 size={24} />,
    pill: 'Analytics',
    title: "Mesure d'Impact",
    desc: "KPIs, tableaux de bord, A/B testing pédagogique et reporting d'impact pour vos décideurs.",
    iconBg: 'bg-accent-100',
    iconText: 'text-secondary-600',
    pillCls: 'bg-accent-50 border-accent-200 text-secondary-600',
  },
  {
    icon: <Shield size={24} />,
    pill: 'Gouvernance',
    title: 'Conformité & Éthique',
    desc: "Encadrement RGPD, propriété intellectuelle, gouvernance de l'IA responsable.",
    /* Tons neutres (pas success-*) : une carte gouvernance/conformité n'est pas
       un état de succès. success-bg/fg sont réservés à l'état de confirmation
       du formulaire plus bas sur cette page (03/07/2026, fix review). */
    iconBg: 'bg-ink-800',
    iconText: 'text-white',
    pillCls: 'bg-ink-50 border-ink-300 text-ink-700',
  },
];

// Chaque bulle affiche la ou les initiale(s) EXACTE(S) des mots de son propre
// titre, dans l'ordre — corrigé (03/07/2026) : l'ancien découpage séquentiel
// S·T / R·I / D·E ne correspondait pas aux titres adjacents (ex. "R·I" à côté
// de "Tester · Réaliser", qui commence par T et R, pas R et I). Chaque bulle
// = initiales du titre qu'elle accompagne, ça matche toujours.
const PROCESS = [
  {
    num: 'S',
    duration: '2 semaines',
    title: "S'orienter",
    desc: "Rencontre d'exploration (90 min), audit de maturité pédagogique, cartographie des compétences Dreyfus et identification des cas d'usage prioritaires. Livrable : rapport + feuille de route stratégique.",
    accent: 'bg-primary-500',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-700',
  },
  {
    num: 'T·R',
    duration: '4–8 semaines',
    title: 'Tester · Réaliser',
    desc: "Validation du modèle sur une cohorte pilote (Tester), puis développement des agents IA, référentiels de compétences et parcours sur-mesure avec vos équipes (Réaliser). Livrable : dispositif conçu, testé et validé.",
    accent: 'bg-secondary-500',
    accentLight: 'bg-secondary-50',
    accentText: 'text-secondary-700',
  },
  {
    num: 'I·D·E',
    duration: '2–4 semaines',
    title: 'Intégrer · Déployer · Évoluer',
    desc: "Connexion à votre stack existante (LMS, SIRH, CRM), lancement officiel, onboarding des équipes sur la Learning App et activation des Passeports de Compétences. Amélioration continue pilotée par la donnée. Livrable : solution déployée + tableau de bord compétences.",
    accent: 'bg-accent-400',
    accentLight: 'bg-accent-50',
    accentText: 'text-secondary-600',
  },
];


export const MarketingAccompagnement: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', org: '', need: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const { ok, error } = await submitForm({
      name: form.name,
      email: form.email,
      org: form.org,
      need: form.need,
      subject: 'Accompagnement STRIDE',
      _source: 'accompagnement',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Accompagnement STRIDE"
        description="Déployez l'IA dans votre organisation avec la méthode STRIDE. Accompagnement sur-mesure pour organismes de formation et ETI : de l'audit flash au déploiement opérationnel."
        canonical="/website/accompagnement"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-white via-primary-50/40 to-accent-50/20">
        {/* Watercolour decorative — right side */}
        <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-orange-teal-3s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)' }}
          />
        </div>
        {/* Soft halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-primary-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-pill bg-secondary-200/15 blur-3xl" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200">
              <Briefcase size={14} className="text-primary-600" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                SBO · Méthode STRIDE
              </span>
            </span>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Passez à une organisation <span className="text-secondary-600">Skills-Based</span>.
            </h1>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Nous auditons, concevons et déployons vos dispositifs L&D avec la méthode STRIDE.
              Livrables contractualisés à chaque étape.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <a href="#contact-form">
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Demander un diagnostic
                  </Button>
                </a>
              </MagneticButton>
              <a href="#services">
                <Button variant="outline" size="lg">
                  Voir les services
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-stack gap-y-1 text-ink-400">
              <span className="font-body text-caption">Tarif sur devis</span>
              <span aria-hidden className="text-ink-200">·</span>
              <span className="font-body text-caption">Première rencontre gratuite</span>
              <span aria-hidden className="text-ink-200">·</span>
              <span className="font-body text-caption">1 an de Learning App offert</span>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── Services 6 cards ──────────────────────────────────────────────── */}
      <section id="services" className="py-page bg-white relative overflow-hidden">
<div className="max-w-7xl mx-auto px-6 flex flex-col gap-section relative">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Une offre modulaire, combinable.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Audit flash, programme complet ou déploiement continu : nous définissons
                ensemble le périmètre adapté à votre contexte.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Featured entry: Diagnostic & Stratégie */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <motion.article
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/60 p-section flex flex-col md:flex-row items-start md:items-center gap-section shadow-card hover:shadow-card-hover transition-shadow duration-base"
            >
              <div className="flex flex-col gap-stack flex-1">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-200/70 text-primary-700">
                  {SERVICES[0].icon}
                </span>
                <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold text-ink-900 leading-tight m-0">
                  {SERVICES[0].title}
                </h3>
                <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-prose">
                  {SERVICES[0].desc}
                </p>
              </div>
              <div className="shrink-0 mt-stack md:mt-0">
                <a href="#contact-form">
                  <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Cadrer mon projet
                  </Button>
                </a>
              </div>
            </motion.article>
          </FadeInWhenVisible>

          {/* Remaining service modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {SERVICES.slice(1).map((s, i) => (
              <FadeInWhenVisible key={s.title} direction="up" delay={i * 0.05}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl bg-white p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-shadow duration-base"
                >
                  <div className="flex items-start justify-between gap-stack-xs">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${s.iconBg} ${s.iconText}`}>
                      {s.icon}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border ${s.pillCls} font-body text-micro font-semibold`}>
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
            <FadeInWhenVisible direction="up" delay={0.05}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                La méthode <span className="text-accent-400">S·T·R·I·D·E</span>.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Six temps regroupés en trois phases : S'orienter, Tester · Réaliser, Intégrer · Déployer · Évoluer.
              </p>
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
                      className={`relative inline-flex items-center justify-center w-24 h-24 rounded-pill ${p.accent} text-white font-display font-extrabold text-h4 tracking-tight shadow-xl ring-8 ring-white px-2`}
                    >
                      {p.num}
                    </motion.span>
                    <span className={`inline-flex items-center gap-tight px-2.5 py-1 rounded-pill ${p.accentLight} ${p.accentText} font-body text-caption font-semibold`}>
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

      {/* ── Pourquoi TLS (fusion Ancrage terrain + Ce qui nous distingue,
          03/07/2026 — les 2 sections se chevauchaient en propos "pourquoi
          nous faire confiance", l'une juste après l'autre) ─────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Ce qui nous distingue.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Chaque dispositif est conçu pour votre contexte, à partir de votre
                réalité terrain.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className="rounded-xl bg-primary-50/30 p-stack-lg flex flex-col md:flex-row items-center gap-section-lg">
              <div className="flex flex-col gap-stack flex-1">
                <p className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                  Formateurs et ingénieurs pédagogiques de terrain.
                </p>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 max-w-prose">
                  Chloé Mimault et Pierre-Armand Dennery conçoivent et déploient
                  des dispositifs L&D depuis plusieurs années. Nous construisons
                  ce que nous vendons : méthode éprouvée, livrables concrets.
                </p>
              </div>
              <div className="flex flex-col gap-stack-xs items-center md:items-end shrink-0">
                <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-700 font-body text-caption font-semibold">
                  <GraduationCap size={13} /> Partenaire C-Campus
                </span>
                <span className="inline-flex items-center gap-tight px-3 py-1.5 rounded-pill bg-accent-50 border border-accent-200 text-secondary-600 font-body text-caption font-semibold">
                  <Sparkles size={13} /> 1 an de Learning App offert
                </span>
              </div>
            </div>
          </FadeInWhenVisible>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {[
              {
                icon: <GraduationCap size={22} />,
                title: 'Pédagogues avant tout',
                body: "Des ingénieurs pédagogiques ont conçu cette approche, pas des consultants IA génériques. La compétence au centre, l'outil au service.",
              },
              {
                icon: <Shield size={22} />,
                title: 'Exigence qualité',
                body: 'Méthode STRIDE documentée. Livrables contractualisés à chaque étape.',
              },
              {
                icon: <Sparkles size={22} />,
                title: 'Conformité & Éthique',
                body: "RGPD et propriété intellectuelle pris en compte dès la conception. Votre organisation reste conforme à chaque étape.",
              },
            ].map((item) => (
              <StaggerItem key={item.title} direction="up">
                <div className="h-full rounded-xl bg-white p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-base">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100 text-primary-600">
                    {item.icon}
                  </span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="py-page bg-gradient-to-br from-primary-50/60 via-white to-secondary-50/20 relative overflow-hidden"
      >
        {/* Watercolour accent top-right */}
        <div aria-hidden className="absolute top-0 right-0 w-1/3 h-full pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-dore-ambre-3s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 80%)' }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="rounded-2xl bg-white border border-primary-100 shadow-card-lift p-section-lg flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200">
              <Sparkles size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                Première rencontre gratuite
              </span>
            </span>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 mt-stack-lg">
              Parlons de votre projet.
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 mt-stack max-w-prose">
              Décrivez-nous votre contexte. Nous vous répondons sous 48h ouvrées avec une proposition de RDV.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-success-bg border border-success-base/30 rounded-2xl p-stack-lg flex flex-col items-center gap-stack text-center w-full max-w-xl"
              >
                <CheckCircle2 size={40} className="text-success-fg" />
                <p className="font-display font-bold text-h4 text-ink-900 m-0">Demande reçue !</p>
                <p className="font-body text-body-sm text-ink-600 m-0">
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
                    <label htmlFor="ac-name" className="font-body text-body-sm font-semibold text-ink-700">
                      Prénom et nom *
                    </label>
                    <input
                      id="ac-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Marie Dupont"
                      className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="ac-email" className="font-body text-body-sm font-semibold text-ink-700">
                      Email pro *
                    </label>
                    <input
                      id="ac-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="marie@organisation.fr"
                      className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="ac-org" className="font-body text-body-sm font-semibold text-ink-700">
                    Organisation
                  </label>
                  <input
                    id="ac-org"
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="ac-need" className="font-body text-body-sm font-semibold text-ink-700">
                    Votre besoin
                  </label>
                  <textarea
                    id="ac-need"
                    rows={4}
                    value={form.need}
                    onChange={(e) => setForm({ ...form, need: e.target.value })}
                    placeholder="Décrivez brièvement votre contexte et vos enjeux de formation…"
                    className="px-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base resize-y h-auto min-h-[120px]"
                  />
                </div>
                {submitError && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-danger-bg border border-danger-base/30 text-danger-fg font-body text-body-sm" role="alert">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {submitError}
                  </div>
                )}
                <MagneticButton strength={10} className="w-full pt-stack">
                  <Button
                    type="submit"
                    variant="warm"
                    size="lg"
                    fullWidth
                    disabled={submitting}
                    trailingIcon={submitting ? undefined : <ArrowRight size={18} />}
                  >
                    {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                  </Button>
                </MagneticButton>
                <p className="font-body text-caption text-ink-400 text-center m-0">
                  Vos données restent confidentielles. RGPD respecté.
                </p>
              </form>
            )}
          </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingAccompagnement;
