/**
 * Accompagnement — Variant A3 : Split Livrables
 *
 * Direction: left copy + right "livrable card" in hero, 2-col service grid,
 * horizontal phase stepper, then contact form.
 * Tone: warm-first (secondary orange), primary teal accents.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  ArrowRight, AlertCircle, CheckCircle2, Sparkles,
  Search, PenLine, Cog, Users, BarChart3, Shield,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const SERVICES = [
  { icon: Search, tag: 'Stratégie', title: 'Diagnostic & Stratégie', desc: 'Audit, cartographie Dreyfus, feuille de route.', accent: 'bg-primary-100 text-primary-700' },
  { icon: PenLine, tag: 'Création', title: 'Conception Pédagogique', desc: 'Parcours blended, prompts, contenus multimédias.', accent: 'bg-secondary-100 text-secondary-700' },
  { icon: Cog, tag: 'Production', title: 'Industrialisation', desc: 'Automatisations, chartes qualité, guidelines.', accent: 'bg-ink-100 text-ink-600' },
  { icon: Users, tag: 'Humain', title: 'Animation & Coaching', desc: "Adoption IA, ateliers, communautés de pratique.", accent: 'bg-primary-50 text-primary-700' },
  { icon: BarChart3, tag: 'Analytics', title: "Mesure d'Impact", desc: 'KPIs, tableaux de bord, reporting décideurs.', accent: 'bg-accent-50 text-warning-fg' },
  { icon: Shield, tag: 'Conformité', title: 'Conformité & Éthique', desc: "RGPD, propriété intellectuelle, gouvernance IA.", accent: 'bg-ink-50 text-ink-600' },
];

const PHASES = [
  { num: '01', title: "S'orienter", dur: '2 semaines', accent: 'bg-primary-500', light: 'bg-primary-50', text: 'text-primary-700' },
  { num: '02', title: 'Tester · Réaliser', dur: '4–8 semaines', accent: 'bg-secondary-500', light: 'bg-secondary-50', text: 'text-secondary-700' },
  { num: '03', title: 'Intégrer · Déployer', dur: '2–4 semaines', accent: 'bg-accent-400', light: 'bg-accent-50', text: 'text-warning-fg' },
];

const LIVRABLES = [
  'Rapport d\'audit + feuille de route stratégique',
  'Dispositif pédagogique conçu et validé pilote',
  'Solution déployée + tableau de bord compétences',
];

export const MarketingAccompagnementA3: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', org: '', need: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const { ok, error } = await submitForm({
      name: form.name, email: form.email, org: form.org, need: form.need,
      subject: 'Accompagnement STRIDE — A3', _source: 'accompagnement-a3',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Accompagnement STRIDE"
        description="Déployez l'IA dans votre organisation avec la méthode STRIDE. Accompagnement sur-mesure — de l'audit flash au déploiement opérationnel."
        canonical="/marketing/accompagnement"
      />

      {/* ── Hero : split copy / livrable card ────────────────────────────── */}
      <section className="pt-32 pb-page bg-gradient-to-br from-secondary-50/60 via-white to-primary-50/20 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary-200/20 blur-[90px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-page items-center">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg">
              <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 w-fit">
                <Sparkles size={14} className="text-secondary-600" />
                <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                  Méthode STRIDE · SBO
                </span>
              </span>
              <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-[-0.03em] m-0 text-[clamp(2.5rem,5.5vw,4.5rem)]">
                Passez à une organisation{' '}
                <span className="text-secondary-600">Skills-Based.</span>
              </h1>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
                Des experts en pédagogie et en IA, sans bullshit. Méthode STRIDE, livrables contractualisés, accompagnement sur-mesure pour organismes de formation et ETI.
              </p>
              <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
                <MagneticButton strength={14}>
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    Demander un diagnostic
                  </Button>
                </MagneticButton>
                <a href="#services">
                  <Button variant="secondary" size="lg">Voir les services</Button>
                </a>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Livrable card */}
          <FadeInWhenVisible direction="left" delay={0.15}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(237,132,58,0.16)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="rounded-2xl bg-white border border-secondary-200 shadow-card-lift p-section overflow-hidden"
            >
              <div className="flex items-center gap-stack-xs mb-stack-lg">
                <div className="w-2 h-2 rounded-full bg-secondary-500" />
                <span className="font-body text-caption font-bold uppercase tracking-widest text-secondary-600">
                  Livrable inclus à chaque phase
                </span>
              </div>
              <div className="flex flex-col gap-stack">
                {LIVRABLES.map((l, i) => (
                  <div key={i} className="flex items-start gap-stack-xs">
                    <div className="w-5 h-5 rounded-md bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-body text-body-sm text-ink-700 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
              <div className="mt-stack-lg pt-stack border-t border-ink-100 flex items-center gap-stack-xs">
                <span className="font-body text-caption text-ink-500">Première rencontre gratuite — réponse sous</span>
                <span className="font-body text-caption font-bold text-secondary-600">48h ouvrées</span>
              </div>
            </motion.div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Services 2-col grid ───────────────────────────────────────────── */}
      <section id="services" className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              6 modules combinables à la carte.
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {SERVICES.map((svc, i) => (
              <FadeInWhenVisible key={svc.title} direction="up" delay={i * 0.07}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="flex gap-stack p-stack-lg rounded-2xl border border-ink-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-base bg-white"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${svc.accent}`}>
                    <svc.icon size={20} />
                  </div>
                  <div className="flex flex-col gap-tight">
                    <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">{svc.title}</h3>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{svc.desc}</p>
                  </div>
                </motion.article>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process stepper horizontal ───────────────────────────────────── */}
      <section className="py-page bg-ink-50 border-y border-ink-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-ink-900 leading-tight tracking-tight m-0">
              Trois phases. Des livrables à chaque étape.
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack relative">
              {/* Connecting line (desktop only) */}
              <div aria-hidden className="hidden md:block absolute top-[2.25rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-[2px] bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 pointer-events-none" />

              {PHASES.map((phase, i) => (
                <motion.div
                  key={phase.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col gap-stack-xs p-stack-lg rounded-2xl ${phase.light} border border-transparent`}
                >
                  <div className={`w-9 h-9 rounded-full ${phase.accent} flex items-center justify-center`}>
                    <span className="font-display text-caption font-extrabold text-white">{phase.num}</span>
                  </div>
                  <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0">{phase.title}</h3>
                  <span className={`font-body text-caption font-bold px-2 py-0.5 rounded-pill w-fit bg-white/60 ${phase.text}`}>{phase.dur}</span>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────────── */}
      <section id="contact-form" className="py-page bg-gradient-to-br from-primary-50/60 via-white to-secondary-50/20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-2xl bg-white border border-primary-100 shadow-card-lift p-section-lg flex flex-col items-center text-center gap-stack-lg">
            <FadeInWhenVisible direction="up">
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Parlons de votre projet.
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 mt-stack max-w-prose">
                Décrivez-nous votre contexte. Nous vous répondons sous 48h ouvrées.
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
                  <p className="font-body text-body-sm text-ink-600 m-0">Nous vous répondons sous 48h ouvrées.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-stack pt-stack text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                    {[
                      { id: 'a3-name', label: 'Prénom et nom *', type: 'text', key: 'name', placeholder: 'Marie Dupont', required: true },
                      { id: 'a3-email', label: 'Email pro *', type: 'email', key: 'email', placeholder: 'marie@org.fr', required: true },
                    ].map((f) => (
                      <div key={f.id} className="flex flex-col gap-stack-xs">
                        <label htmlFor={f.id} className="font-body text-body-sm font-semibold text-ink-700">{f.label}</label>
                        <input
                          id={f.id} type={f.type} required={f.required}
                          value={(form as any)[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="a3-need" className="font-body text-body-sm font-semibold text-ink-700">Votre besoin</label>
                    <textarea
                      id="a3-need" rows={4} value={form.need}
                      onChange={(e) => setForm({ ...form, need: e.target.value })}
                      placeholder="Décrivez brièvement votre contexte…"
                      className="px-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base resize-y h-auto min-h-[120px]"
                    />
                  </div>
                  {submitError && (
                    <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-danger-bg border border-danger-base/30 text-danger-fg font-body text-body-sm" role="alert">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />{submitError}
                    </div>
                  )}
                  <MagneticButton strength={10} className="w-full pt-stack">
                    <Button type="submit" variant="warm" size="lg" fullWidth disabled={submitting} trailingIcon={submitting ? undefined : <ArrowRight size={18} />}>
                      {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
                    </Button>
                  </MagneticButton>
                  <p className="font-body text-caption text-ink-400 text-center m-0">Vos données restent confidentielles. RGPD respecté.</p>
                </form>
              )}
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingAccompagnementA3;
