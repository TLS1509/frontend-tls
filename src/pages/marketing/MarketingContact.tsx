/**
 * MarketingContact — Polished Contact Page (Phase P2.5)
 *
 * Direction: form-first with sticky aside (contact info + quick links + booking).
 * Tone: brand primary + warm CTA.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Smartphone,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { MarketingFooter } from '../../components/marketing/FooterMinimal';

const QUICK_LINKS = [
  {
    icon: <BookOpen size={20} />,
    label: 'Formation Formateur Augmenté',
    href: '/marketing/formation',
    desc: 'À partir de 249€ — 7 modules',
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
  {
    icon: <Briefcase size={20} />,
    label: 'Accompagnement sur mesure',
    href: '/marketing/accompagnement',
    desc: 'Devis personnalisé',
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
  {
    icon: <Smartphone size={20} />,
    label: 'Learning App — accès anticipé',
    href: '/marketing/learning-app',
    desc: 'Inscription bêta gratuite',
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
];

const SUBJECTS = ['Formation', 'Accompagnement', 'Learning App', 'Partenariat', 'Autre'];

export const MarketingContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    subject: 'Formation',
    message: '',
  });

  return (
    <div className="bg-white">
      <SEOHead
        title="Contact"
        description="Échangez avec l'équipe The Learning Society. Prenez rendez-vous, posez vos questions, démarrez votre transformation Skills-Based."
        canonical="/marketing/contact"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-section overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white">
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-primary-200 shadow-xs">
              <MessageSquare size={14} className="text-primary-700" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                On adore les conversations qui démarrent
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.5rem,6vw,4.5rem)]">
              Parlons de{' '}
              <span className="text-accent-400">ton projet</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-2xl">
              Question sur nos formations, projet d'accompagnement, ou envie d'en savoir plus sur la Learning App ?
              On te répond sous 48h ouvrées.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Form + Aside ──────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-section items-start">
          {/* Form column */}
          <FadeInWhenVisible direction="up">
            <div className="rounded-3xl bg-gradient-to-br from-white to-primary-50/30 border border-ink-100 shadow-sm p-section">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center text-center gap-stack-lg py-stack-lg"
                >
                  <div className="w-20 h-20 rounded-pill bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <div className="flex flex-col gap-stack">
                    <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0">
                      Message envoyé !
                    </h2>
                    <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
                      Merci {form.name || 'pour ton message'} ! On te répond sous 48h ouvrées
                      à l'adresse <strong>{form.email}</strong>.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', org: '', subject: 'Formation', message: '' });
                    }}
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col gap-stack-lg"
                >
                  <div className="flex flex-col gap-stack">
                    <h2 className="font-display text-h3 font-extrabold text-ink-900 m-0 leading-tight">
                      Envoie-nous un message
                    </h2>
                    <p className="font-body text-body text-ink-600 m-0">
                      Tous les champs sont volontairement courts. On ira au fond pendant l'échange.
                    </p>
                  </div>

                  {/* Subject pills */}
                  <div className="flex flex-col gap-stack">
                    <label className="font-body text-body-sm font-semibold text-ink-900">
                      Sujet
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => {
                        const isActive = form.subject === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm({ ...form, subject: s })}
                            className={`relative inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors duration-base ${
                              isActive ? 'text-white' : 'text-ink-700 hover:text-ink-900 bg-ink-50 hover:bg-ink-100'
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="contact-subject-bg"
                                className="absolute inset-0 rounded-pill bg-gradient-to-r from-primary-500 to-primary-600 shadow-sm"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                            )}
                            <span className="relative">{s}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ct-name" className="font-body text-body-sm font-semibold text-ink-900">
                        Prénom et nom *
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Marie Dupont"
                        className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ct-email" className="font-body text-body-sm font-semibold text-ink-900">
                        Email pro *
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="marie@organisation.fr"
                        className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ct-org" className="font-body text-body-sm font-semibold text-ink-900">
                      Organisation
                    </label>
                    <input
                      id="ct-org"
                      type="text"
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      placeholder="Nom de l'entreprise ou organisation"
                      className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ct-message" className="font-body text-body-sm font-semibold text-ink-900">
                      Ton message *
                    </label>
                    <textarea
                      id="ct-message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Décris brièvement ton contexte, tes objectifs, tes questions…"
                      className="px-4 py-3 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base resize-y h-auto min-h-[140px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-stack pt-stack">
                    <p className="font-body text-caption text-ink-500 m-0">
                      Tes données restent confidentielles. RGPD respecté.
                    </p>
                    <MagneticButton strength={12}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        trailingIcon={<ArrowRight size={18} />}
                      >
                        Envoyer le message
                      </Button>
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </FadeInWhenVisible>

          {/* Aside */}
          <div className="flex flex-col gap-stack-lg lg:sticky lg:top-20">
            {/* Booking card */}
            <FadeInWhenVisible direction="up" delay={0.05}>
              <div className="relative overflow-hidden rounded-3xl bg-primary-50 border border-primary-200 p-stack-lg flex flex-col gap-stack-lg shadow-sm">
                <div className="flex flex-col gap-stack">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white border border-primary-200 text-accent-400 text-caption font-bold uppercase tracking-wider w-fit">
                    <Sparkles size={12} />
                    Plus rapide
                  </span>
                  <h3 className="font-display text-h3 font-extrabold text-ink-900 m-0 leading-tight">
                    Réserve un échange de 30 min
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 m-0 leading-relaxed">
                    Plus efficace qu'un email. Choisis ton créneau directement dans notre agenda.
                  </p>
                </div>
                <MagneticButton strength={10}>
                  <a
                    href="https://calendly.com/thelearningsociety/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      trailingIcon={<Calendar size={16} />}
                    >
                      Réserver maintenant
                    </Button>
                  </a>
                </MagneticButton>
              </div>
            </FadeInWhenVisible>

            {/* Contact info */}
            <FadeInWhenVisible direction="up" delay={0.1}>
              <div className="rounded-3xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm">
                <h3 className="font-display text-h5 font-bold text-ink-900 m-0">Autres canaux</h3>
                <div className="flex flex-col gap-stack">
                  <a
                    href="mailto:contact@thelearningsociety.fr"
                    className="flex items-start gap-stack p-stack rounded-xl hover:bg-primary-50/50 transition-colors duration-fast group"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-700 border border-primary-100 shrink-0">
                      <Mail size={18} />
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-wider">
                        Email
                      </span>
                      <span className="font-body text-body-sm font-semibold text-ink-900 group-hover:text-primary-700 transition-colors truncate">
                        contact@thelearningsociety.fr
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/company/thelearningsociety"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-stack p-stack rounded-xl hover:bg-primary-50/50 transition-colors duration-fast group"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-700 border border-primary-100 shrink-0">
                      <ExternalLink size={18} />
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-wider">
                        LinkedIn
                      </span>
                      <span className="font-body text-body-sm font-semibold text-ink-900 group-hover:text-primary-700 transition-colors">
                        @thelearningsociety
                      </span>
                    </div>
                  </a>
                  <div className="flex items-start gap-stack p-stack rounded-xl bg-ink-50/40">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white text-ink-700 border border-ink-200 shrink-0">
                      <MapPin size={18} />
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-wider">
                        Bureau
                      </span>
                      <span className="font-body text-body-sm font-semibold text-ink-900">
                        Paris, France
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-stack border-t border-ink-100 flex items-center gap-2">
                  <Clock size={14} className="text-ink-500 shrink-0" />
                  <p className="font-body text-caption text-ink-600 m-0">
                    Réponse sous <strong className="text-ink-900">48h ouvrées</strong> · L-V, 9h–18h
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>

            {/* Quick links */}
            <FadeInWhenVisible direction="up" delay={0.15}>
              <div className="rounded-3xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm">
                <h3 className="font-display text-h5 font-bold text-ink-900 m-0">Accès rapide</h3>
                <div className="flex flex-col gap-2">
                  {QUICK_LINKS.map((q) => (
                    <Link
                      key={q.href + q.label}
                      to={q.href}
                      className="flex items-start gap-stack p-stack rounded-xl hover:bg-ink-50 transition-colors duration-fast group"
                    >
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border shrink-0 ${q.tone}`}>
                        {q.icon}
                      </span>
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-body text-body-sm font-bold text-ink-900 group-hover:text-primary-700 transition-colors leading-tight">
                          {q.label}
                        </span>
                        <span className="font-body text-caption text-ink-500">{q.desc}</span>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-ink-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-base mt-1 shrink-0"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
};

export default MarketingContact;
