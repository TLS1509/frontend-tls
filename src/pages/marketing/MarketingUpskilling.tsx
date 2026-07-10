/**
 * MarketingUpskilling : page dédiée « Upskilling L&D sur-mesure » (pilier P2).
 *
 * Contexte (doc Notion "Sitemap & Structure Homepage — Propositions",
 * 29/06/2026, décision meeting Product/Website) : Upskilling est un des 3
 * volets du pilier Accompagnement & Conseil, aux côtés de la Méthode STRIDE
 * et des Solutions IA Plug&Play. Décision meeting : page dédiée (pas une
 * section d'Accompagnement).
 *
 * Différence avec /website/accompagnement (STRIDE) : STRIDE = TLS transforme
 * le dispositif L&D de l'organisation avec elle. Upskilling = l'équipe L&D
 * de l'organisation apprend à le faire elle-même (montée en compétence
 * interne, autonomie transférée, pas de dépendance créée). Les deux pages
 * se renvoient l'une à l'autre.
 *
 * 10/07/2026 : aucune donnée de prix sur cette page (décision explicite —
 * reste sur le pattern "Tarif sur devis" déjà en place partout ailleurs).
 * Contenu volontairement générique sur le format (nombre de sessions, durée)
 * puisque "sur-mesure" = ajusté par échange, pas un programme figé — pas de
 * métrique ou de chiffre inventé.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Compass,
  Users,
  RefreshCw,
  Lightbulb,
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

const MODULES = [
  {
    icon: <Compass size={24} />,
    title: 'Diagnostic Dreyfus de l’équipe',
    desc: 'Positionnement de chaque formateur sur le référentiel de compétences (novice à expert), le même modèle que celui utilisé dans le Passeport de Compétences de la Learning App.',
    iconBg: 'bg-accent-100',
    iconText: 'text-secondary-600',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Ateliers pratiques IA & pédagogie',
    desc: "Conception de prompts pédagogiques, création de contenus assistée, évaluation augmentée : des ateliers appliqués aux dispositifs réels de l'équipe, pas des démonstrations génériques.",
    iconBg: 'bg-primary-100',
    iconText: 'text-primary-600',
  },
  {
    icon: <Users size={24} />,
    title: 'Coaching individuel des formateurs',
    desc: "Séances 1:1 pour ancrer les nouvelles pratiques dans le quotidien de chacun, au rythme de chaque formateur.",
    iconBg: 'bg-secondary-100',
    iconText: 'text-secondary-600',
  },
  {
    icon: <RefreshCw size={24} />,
    title: 'Transfert d’autonomie',
    desc: "L'objectif final : que l'équipe poursuive seule. Documentation interne, guidelines réutilisables, pas de dépendance à TLS après le programme.",
    iconBg: 'bg-ink-100',
    iconText: 'text-ink-600',
  },
];

export const MarketingUpskilling: React.FC = () => {
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
      subject: 'Upskilling L&D sur-mesure',
      _source: 'upskilling',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Upskilling L&D sur-mesure"
        description="Un programme sur-mesure pour que votre équipe L&D monte en compétences sur l'IA pédagogique elle-même : diagnostic Dreyfus, ateliers pratiques, coaching individuel, autonomie transférée."
        canonical="/website/upskilling"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-white via-accent-50/40 to-primary-50/20">
        <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-dore-ambre-5s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)' }}
          />
        </div>
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-pill bg-accent-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-pill bg-primary-200/15 blur-3xl" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-accent-50 border border-accent-200">
              <GraduationCap size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                SBO · Upskilling L&D
              </span>
            </span>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Votre équipe L&D apprend à <span className="text-secondary-600">le faire elle-même</span>.
            </h1>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Un programme sur-mesure pour que vos formateurs et ingénieurs pédagogiques
              montent en compétences sur l'IA pédagogique, sans dépendre de nous pour
              continuer ensuite.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
              <MagneticButton strength={14}>
                <Button href="#contact-form" variant="accent" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Échanger sur votre besoin
                </Button>
              </MagneticButton>
              <Button to="/website/accompagnement" variant="outline" size="lg">
                Voir la méthode STRIDE
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-stack gap-y-1 text-ink-400">
              <span className="font-body text-caption">Tarif sur devis</span>
              <span aria-hidden className="text-ink-200">·</span>
              <span className="font-body text-caption">Format ajusté à la taille de votre équipe</span>
              <span aria-hidden className="text-ink-200">·</span>
              <span className="font-body text-caption">Basé sur le référentiel Dreyfus</span>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── Ce que couvre le programme ──────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Ce que couvre le programme.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Quatre briques combinables, dosées selon le niveau de départ de votre
                équipe et vos objectifs.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {MODULES.map((m, i) => (
              <FadeInWhenVisible key={m.title} direction="up" delay={i * 0.05}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="h-full rounded-xl bg-white p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover transition-shadow duration-base"
                >
                  <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${m.iconBg} ${m.iconText}`}>
                    {m.icon}
                  </span>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">
                    {m.title}
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                    {m.desc}
                  </p>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upskilling vs STRIDE : clarifier la différence ──────────────────── */}
      <section className="py-page bg-ink-50/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Upskilling ou méthode STRIDE ?
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Les deux volets sont complémentaires. La différence tient à qui fait le travail.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            <FadeInWhenVisible direction="up" delay={0.05}>
              <div className="h-full rounded-2xl bg-white border border-primary-100 p-stack-lg flex flex-col gap-stack shadow-card">
                <span className="inline-flex items-center gap-tight w-fit px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-micro font-semibold">
                  Méthode STRIDE
                </span>
                <p className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                  On transforme votre dispositif avec vous.
                </p>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                  Audit, conception, déploiement : TLS pilote la transformation de bout en
                  bout, aux côtés de vos équipes.
                </p>
                <Button to="/website/accompagnement" variant="link" trailingIcon={<ArrowRight size={16} />}>
                  Voir la méthode
                </Button>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible direction="up" delay={0.1}>
              <div className="h-full rounded-2xl bg-white border border-accent-200 p-stack-lg flex flex-col gap-stack shadow-card">
                <span className="inline-flex items-center gap-tight w-fit px-2.5 py-1 rounded-pill bg-accent-50 border border-accent-200 text-secondary-700 font-body text-micro font-semibold">
                  Upskilling L&D
                </span>
                <p className="font-display text-h4 font-extrabold text-ink-900 leading-tight m-0">
                  Votre équipe apprend à le faire elle-même.
                </p>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 flex-1">
                  Diagnostic, ateliers, coaching : vos formateurs montent en compétences
                  et gardent la main après le programme.
                </p>
                <span className="inline-flex items-center gap-tight text-secondary-600 font-body text-body-sm font-semibold">
                  <CheckCircle2 size={16} /> Vous êtes sur cette page
                </span>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── Pourquoi ce format ──────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Pourquoi un format sur-mesure.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                Une équipe L&D de 3 formateurs débutants et une équipe de 15 formateurs
                confirmés n'ont pas besoin du même programme.
              </p>
            </div>
          </FadeInWhenVisible>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {[
              {
                icon: <GraduationCap size={22} />,
                title: 'Pédagogues avant tout',
                body: "Des ingénieurs pédagogiques conçoivent ce programme, pas des consultants IA génériques. La compétence de votre équipe au centre.",
              },
              {
                icon: <Compass size={22} />,
                title: 'Point de départ réel',
                body: "Le diagnostic Dreyfus fixe le niveau de chaque formateur avant tout atelier — pas de programme standard appliqué à l'aveugle.",
              },
              {
                icon: <Sparkles size={22} />,
                title: 'Autonomie, pas dépendance',
                body: "L'objectif est que votre équipe poursuive seule. Nous documentons ce qui doit rester après notre départ.",
              },
            ].map((item) => (
              <StaggerItem key={item.title} direction="up">
                <div className="h-full rounded-xl bg-white p-stack-lg flex flex-col gap-stack shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-base">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent-100 text-secondary-600">
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
        className="py-page bg-gradient-to-br from-accent-50/60 via-white to-primary-50/20 relative overflow-hidden"
      >
        <div aria-hidden className="absolute top-0 right-0 w-1/3 h-full pointer-events-none overflow-hidden">
          <img
            src="/images/bg-frames/aquarelle-dore-ambre-3s.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 80%)' }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="rounded-2xl bg-white border border-accent-100 shadow-card-lift p-section-lg flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200">
              <Sparkles size={14} className="text-primary-600" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                Première rencontre gratuite
              </span>
            </span>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 mt-stack-lg">
              Parlons de votre équipe L&D.
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 mt-stack max-w-prose">
              Décrivez-nous sa taille et son niveau actuel. Nous vous répondons sous 48h
              ouvrées avec une proposition de format.
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
                    <label htmlFor="up-name" className="font-body text-body-sm font-semibold text-ink-700">
                      Prénom et nom *
                    </label>
                    <input
                      id="up-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Marie Dupont"
                      className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="up-email" className="font-body text-body-sm font-semibold text-ink-700">
                      Email pro *
                    </label>
                    <input
                      id="up-email"
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
                  <label htmlFor="up-org" className="font-body text-body-sm font-semibold text-ink-700">
                    Organisation
                  </label>
                  <input
                    id="up-org"
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                  />
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="up-need" className="font-body text-body-sm font-semibold text-ink-700">
                    Votre équipe L&D aujourd'hui
                  </label>
                  <textarea
                    id="up-need"
                    rows={4}
                    value={form.need}
                    onChange={(e) => setForm({ ...form, need: e.target.value })}
                    placeholder="Taille de l'équipe, niveau actuel sur l'IA, ce que vous voulez qu'elle sache faire seule…"
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
                    variant="accent"
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
    </div>
  );
};

export default MarketingUpskilling;
