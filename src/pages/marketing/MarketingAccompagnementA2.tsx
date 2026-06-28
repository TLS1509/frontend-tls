/**
 * Accompagnement — Variant A2 : Édito Manifeste
 *
 * Direction: editorial, text-forward. Opening question. Numbered service list.
 * Dark teal closing section with team credentials + response SLA.
 * Tone: restrained primary teal, warm CTAs, editorial rhythm.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  ArrowRight,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const SERVICES = [
  { num: '01', tag: 'Stratégie', title: 'Diagnostic & Stratégie', desc: "Audit de votre dispositif, cartographie Dreyfus, feuille de route alignée sur vos résultats métier. Livrable : rapport + roadmap stratégique." },
  { num: '02', tag: 'Création', title: 'Conception Pédagogique', desc: 'Parcours blended/digital, prompts et contenus multimédias, ingénierie pédagogique augmentée IA. Livrable : dispositif complet.' },
  { num: '03', tag: 'Production', title: 'Industrialisation & Outils', desc: "Automatisations, chartes qualité, guidelines pour vos équipes de production. Livrable : processus documenté + outils." },
  { num: '04', tag: 'Humain', title: 'Animation & Coaching', desc: "Adoption IA, facilitation d'ateliers et communautés de pratique. Livrable : équipes formées et autonomes." },
  { num: '05', tag: 'Analytics', title: "Mesure d'Impact", desc: "KPIs, tableaux de bord, A/B testing pédagogique. Livrable : dashboard impact + rapport décideurs." },
  { num: '06', tag: 'Conformité', title: 'Conformité & Éthique IA', desc: "Encadrement RGPD, propriété intellectuelle, gouvernance IA responsable. Livrable : charte + processus conformes." },
];

const TAG_COLORS: Record<string, string> = {
  Stratégie: 'bg-primary-50 text-primary-700 border border-primary-200',
  Création: 'bg-secondary-50 text-secondary-700 border border-secondary-200',
  Production: 'bg-ink-100 text-ink-600 border border-ink-200',
  Humain: 'bg-primary-50 text-primary-700 border border-primary-200',
  Analytics: 'bg-accent-50 text-warning-fg border border-accent-100',
  Conformité: 'bg-ink-50 text-ink-600 border border-ink-200',
};

export const MarketingAccompagnementA2: React.FC = () => {
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
      subject: 'Accompagnement STRIDE — A2', _source: 'accompagnement-a2',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Accompagnement STRIDE"
        description="Déployez l'IA dans votre organisation avec la méthode STRIDE. Accompagnement sur-mesure pour organismes de formation et ETI."
        canonical="/marketing/accompagnement"
      />

      {/* ── Hero : question ouverte ───────────────────────────────────────── */}
      <section className="pt-32 pb-section-lg bg-white border-b border-ink-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-stack-xs px-3 py-1.5 rounded-pill bg-primary-50 border border-primary-200 w-fit">
              <Sparkles size={14} className="text-primary-600" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                Méthode STRIDE · SBO
              </span>
            </span>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-[-0.03em] m-0 text-[clamp(2.5rem,5.5vw,4.5rem)] italic">
              Votre organisation a-t-elle un problème de compétences&nbsp;?
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="up" delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-section-lg items-start">
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                La réponse est souvent oui — mais le vrai problème n'est pas de former, c'est de mesurer ce que la formation change. Nous auditons, concevons et déployons avec STRIDE. Des livrables contractualisés à chaque étape, pas de vague "transformation".
              </p>
              <div className="flex flex-col gap-stack">
                <MagneticButton strength={10}>
                  <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />} fullWidth>
                    Demander un diagnostic
                  </Button>
                </MagneticButton>
                <a href="#services" className="font-body text-body-sm font-semibold text-ink-500 text-center hover:text-primary-700 transition-colors duration-base">
                  Voir les 6 services ↓
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Service list éditoriale ───────────────────────────────────────── */}
      <section id="services" className="py-page bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex items-center gap-stack-lg border-b-2 border-primary-500 pb-stack">
              <span className="font-body text-caption font-bold uppercase tracking-widest text-ink-400">
                Les 6 modules STRIDE
              </span>
            </div>
          </FadeInWhenVisible>

          <div className="divide-y divide-ink-100">
            {SERVICES.map((svc, i) => (
              <FadeInWhenVisible key={svc.num} direction="up" delay={i * 0.07}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="flex items-baseline gap-stack-lg py-section cursor-default group"
                >
                  <span className="font-display text-body-sm font-extrabold text-ink-300 min-w-[2rem] shrink-0 group-hover:text-primary-400 transition-colors duration-base">
                    {svc.num}
                  </span>
                  <div className="flex-1 flex flex-col gap-stack-xs">
                    <div className="flex flex-wrap items-baseline gap-stack-xs">
                      <span className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-extrabold text-ink-900 leading-tight tracking-tight">
                        {svc.title}
                      </span>
                      <span className={`font-body text-caption font-bold px-2 py-0.5 rounded-pill shrink-0 ${TAG_COLORS[svc.tag]}`}>
                        {svc.tag}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 max-w-2xl">
                      {svc.desc}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-ink-200 shrink-0 group-hover:text-primary-400 transition-colors duration-base" />
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifeste foncé ───────────────────────────────────────────────── */}
      <section className="py-page bg-primary-900 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-700/30 blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary-500/10 blur-[80px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col gap-section lg:flex-row lg:items-center lg:justify-between">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack-lg max-w-2xl">
              <Quote size={36} className="text-primary-300 opacity-60" />
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
                Formateurs et ingénieurs pédagogiques de terrain.
              </h2>
              <p className="font-body text-body-lg text-white/70 leading-relaxed m-0">
                Chloé Mimault et Pierre-Armand Dennery conçoivent et déploient des dispositifs L&D depuis plusieurs années. Méthode éprouvée, livrables concrets — pas de "transformation" vague.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.15}>
            <div className="flex flex-col gap-stack shrink-0">
              <div className="flex gap-stack">
                {[
                  { big: '48h', label: 'délai de réponse', color: 'bg-secondary-500' },
                  { big: '100%', label: 'sur-mesure', color: 'bg-accent-400' },
                ].map((stat) => (
                  <div key={stat.big} className="flex flex-col items-center px-6 py-5 rounded-2xl bg-white/[0.06] border border-white/10">
                    <span className={`font-display text-[2rem] font-extrabold leading-tight tracking-tight ${stat.color === 'bg-secondary-500' ? 'text-secondary-400' : 'text-accent-400'}`}>
                      {stat.big}
                    </span>
                    <span className="font-body text-caption text-white/50 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              <MagneticButton strength={8}>
                <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />} fullWidth>
                  Parler de votre projet
                </Button>
              </MagneticButton>
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
                      { id: 'a2-name', label: 'Prénom et nom *', type: 'text', key: 'name', placeholder: 'Marie Dupont', required: true },
                      { id: 'a2-email', label: 'Email pro *', type: 'email', key: 'email', placeholder: 'marie@org.fr', required: true },
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
                    <label htmlFor="a2-org" className="font-body text-body-sm font-semibold text-ink-700">Organisation</label>
                    <input
                      id="a2-org" type="text"
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      placeholder="Nom de l'entreprise"
                      className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-base"
                    />
                  </div>
                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="a2-need" className="font-body text-body-sm font-semibold text-ink-700">Votre besoin</label>
                    <textarea
                      id="a2-need" rows={4}
                      value={form.need}
                      onChange={(e) => setForm({ ...form, need: e.target.value })}
                      placeholder="Décrivez brièvement votre contexte…"
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

export default MarketingAccompagnementA2;
