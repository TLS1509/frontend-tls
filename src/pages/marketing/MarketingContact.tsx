/**
 * MarketingContact : Polished Contact Page (Phase P2.5)
 *
 * Direction: form-first with sticky aside (contact info + quick links + booking).
 * Tone: brand primary + warm CTA.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Smartphone,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  MapPin,
  Lock,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

const QUICK_LINKS = [
  {
    icon: <Compass size={20} />,
    label: 'Notre méthode STRIDE',
    href: '/website/methode',
    desc: 'Comment on travaille',
    tone: 'bg-primary-50 text-primary-700 border-primary-100',
  },
  {
    icon: <Briefcase size={20} />,
    label: 'Accompagnement sur mesure',
    href: '/website/accompagnement',
    desc: 'Devis personnalisé',
    tone: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  },
  {
    icon: <Smartphone size={20} />,
    label: 'Learning App : accès anticipé',
    href: '/website/learning-app',
    desc: 'Inscription bêta gratuite',
    tone: 'bg-accent-50 text-accent-600 border-accent-200',
  },
];

const SUBJECTS = ['Formation', 'Accompagnement', 'Learning App', 'Partenariat', 'Autre'];

const SUBJECT_CONTEXTS: Record<string, { headline: string; desc: string }> = {
  'Formation': {
    headline: 'Découvrir la formation Formateur Augmenté.',
    desc: '7 modules · 7h · Open Badge · Éligible OPCO. Posez vos questions, nous vous répondons avant votre inscription.',
  },
  'Accompagnement': {
    headline: 'Démarrer un accompagnement STRIDE.',
    desc: 'Chaque mission commence par 30 min d\'échange pour comprendre votre contexte. Pas de devis standard : tout est sur mesure.',
  },
  'Learning App': {
    headline: 'Rejoindre la bêta Learning App.',
    desc: 'Bêta ouverte, accès anticipé gratuit pour les premières organisations. Réponse sous 24h.',
  },
  'Partenariat': {
    headline: 'Construire quelque chose ensemble.',
    desc: 'Formateurs indépendants, organismes, entreprises : parlons de ce qu\'on peut co-construire.',
  },
  'Autre': {
    headline: 'Entrer en contact.',
    desc: 'Écrivez-nous pour n\'importe quelle raison. On adore les échanges directs.',
  },
};

export const MarketingContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    phone: '',
    subject: 'Formation',
    message: '',
    newsletter: false,
  });

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) errors.name = 'Indiquez votre prénom et nom.';
    if (!form.email.trim()) errors.email = 'Indiquez votre email pro.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errors.email = 'Cet email semble invalide.';
    if (!form.message.trim()) errors.message = 'Décrivez brièvement votre demande.';
    return errors;
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Contactez The Learning Society · Échange & Rendez-vous"
        description="Échangez avec l'équipe The Learning Society. Prenez rendez-vous, posez vos questions ou démarrez votre projet de formation IA."
        canonical="/website/contact"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-section overflow-hidden bg-gradient-to-br from-white via-primary-50/60 to-secondary-50/30">
<div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-pill bg-primary-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-pill bg-secondary-200/20 blur-3xl" />
        </div>
        <FadeInWhenVisible direction="up">
          <div className="relative max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">

            {/* Interactive subject selector — visible above fold */}
            <div className="flex flex-col items-center gap-stack">
              <p className="font-body text-body-sm text-ink-500 m-0">
                Pour mieux vous orienter, quel est votre sujet ?
              </p>
              <div className="flex flex-wrap justify-center gap-stack-xs">
                {SUBJECTS.map((s) => {
                  const isActive = form.subject === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, subject: s })}
                      className={`relative inline-flex items-center px-4 py-2 rounded-pill font-body text-body-sm font-semibold transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 min-h-touch ${
                        isActive
                          ? 'text-white'
                          : 'text-ink-700 hover:text-ink-900 bg-ink-50 hover:bg-ink-100 border border-ink-200'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="contact-hero-subject-bg"
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

            {/* Dynamic headline — animates on subject change */}
            <motion.div
              key={form.subject}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col items-center gap-stack"
            >
              <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2rem,5vw,3.75rem)]">
                {SUBJECT_CONTEXTS[form.subject].headline}
              </h1>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                {SUBJECT_CONTEXTS[form.subject].desc}
              </p>
            </motion.div>

            <p className="font-body text-caption text-ink-500 m-0">
              Réponse sous <strong className="text-ink-900">48h ouvrées</strong> · ou réservez directement un créneau.
            </p>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ── Form + Aside ──────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-section items-start">
          {/* Form column */}
          <FadeInWhenVisible direction="up">
            <div className="rounded-2xl bg-gradient-to-br from-white to-primary-50/30 border border-ink-100 shadow-sm p-section">
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
                      Merci {form.name || 'pour votre message'} ! Nous vous répondons sous 48h ouvrées
                      à l'adresse <strong>{form.email}</strong>.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', org: '', phone: '', subject: 'Formation', message: '', newsletter: false });
                    }}
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form
                  noValidate
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const errors = validate();
                    setFieldErrors(errors);
                    if (Object.keys(errors).length > 0) {
                      const firstId =
                        errors.name ? 'ct-name' : errors.email ? 'ct-email' : 'ct-message';
                      document.getElementById(firstId)?.focus();
                      return;
                    }
                    setSubmitting(true);
                    setSubmitError(null);
                    const { ok, error } = await submitForm({
                      name: form.name,
                      email: form.email,
                      org: form.org,
                      phone: form.phone || undefined,
                      subject: form.subject,
                      message: form.message,
                      _source: 'contact',
                    });
                    setSubmitting(false);
                    if (ok) setSubmitted(true);
                    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
                  }}
                  className="flex flex-col gap-stack-lg"
                >
                  <div className="flex flex-col gap-stack">
                    <h2 className="font-display text-h3 font-extrabold text-ink-900 m-0 leading-tight">
                      Écrivez-nous
                    </h2>
                    <p className="font-body text-body text-ink-600 m-0">
                      Tous les champs sont courts. Nous irons au fond pendant l'échange.
                    </p>
                  </div>

                  {/* Subject pills — pré-rempli depuis le sélecteur du hero, modifiable ici */}
                  <div className="flex flex-col gap-stack-xs">
                    <label className="font-body text-body-sm font-semibold text-ink-900">
                      Sujet
                    </label>
                    <p className="font-body text-caption text-ink-500 m-0 -mt-1">
                      Pré-rempli depuis votre choix ci-dessus, modifiable.
                    </p>
                    <div className="flex flex-wrap gap-stack-xs">
                      {SUBJECTS.map((s) => {
                        const isActive = form.subject === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm({ ...form, subject: s })}
                            className={`relative inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 min-h-touch ${
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
                    <div className="flex flex-col gap-stack-xs">
                      <label htmlFor="ct-name" className="font-body text-body-sm font-semibold text-ink-900">
                        Prénom et nom *
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        required
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'ct-name-error' : undefined}
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                        }}
                        placeholder="Marie Dupont"
                        className={`px-4 h-12 rounded-xl bg-white border text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-base ${
                          fieldErrors.name
                            ? 'border-danger-base focus-visible:outline-danger-base'
                            : 'border-ink-200 focus-visible:outline-primary-500'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p id="ct-name-error" role="alert" className="font-body text-caption text-danger-fg m-0">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-stack-xs">
                      <label htmlFor="ct-email" className="font-body text-body-sm font-semibold text-ink-900">
                        Email pro *
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        required
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'ct-email-error' : undefined}
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                        }}
                        placeholder="marie@organisation.fr"
                        className={`px-4 h-12 rounded-xl bg-white border text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-base ${
                          fieldErrors.email
                            ? 'border-danger-base focus-visible:outline-danger-base'
                            : 'border-ink-200 focus-visible:outline-primary-500'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="ct-email-error" role="alert" className="font-body text-caption text-danger-fg m-0">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                    <div className="flex flex-col gap-stack-xs">
                      <label htmlFor="ct-org" className="font-body text-body-sm font-semibold text-ink-900">
                        Organisation
                      </label>
                      <input
                        id="ct-org"
                        type="text"
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        placeholder="Nom de l'entreprise ou organisation"
                        className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-all duration-base"
                      />
                    </div>
                    <div className="flex flex-col gap-stack-xs">
                      <label htmlFor="ct-phone" className="font-body text-body-sm font-semibold text-ink-900">
                        Téléphone <span className="text-ink-400 font-normal">(optionnel)</span>
                      </label>
                      <input
                        id="ct-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+33 6 00 00 00 00"
                        className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-all duration-base"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-stack-xs">
                    <label htmlFor="ct-message" className="font-body text-body-sm font-semibold text-ink-900">
                      Votre message *
                    </label>
                    <textarea
                      id="ct-message"
                      rows={5}
                      required
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'ct-message-error' : undefined}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
                      }}
                      placeholder="Décrivez brièvement votre contexte, vos objectifs, vos questions…"
                      className={`px-4 py-3 rounded-xl bg-white border text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-base resize-y h-auto min-h-[140px] ${
                        fieldErrors.message
                          ? 'border-danger-base focus-visible:outline-danger-base'
                          : 'border-ink-200 focus-visible:outline-primary-500'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="ct-message-error" role="alert" className="font-body text-caption text-danger-fg m-0">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter opt-in */}
                  <label className="relative flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 inline-flex w-5 h-5 border-2 border-ink-300 rounded-md
                        peer-checked:bg-primary-500 peer-checked:border-primary-500
                        peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary-500
                        transition-colors duration-fast
                        after:content-['✓'] after:text-white after:font-bold after:text-[12px] after:opacity-0 after:leading-none after:flex after:items-center after:justify-center
                        peer-checked:after:opacity-100 flex items-center justify-center"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-body-sm font-semibold text-ink-900 leading-snug">
                        Recevoir nos ressources et actualités
                      </span>
                      <span className="font-body text-caption text-ink-500 leading-relaxed">
                        Veille EdTech, méthodes de formation, retours terrain. Pas plus d'un email par semaine. Résiliable en un clic.
                      </span>
                    </div>
                  </label>

                  {submitError && (
                    <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-danger-bg border border-danger-base/30 text-danger-fg font-body text-body-sm" role="alert">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      {submitError}
                    </div>
                  )}

                  {/* Reassurance + submit */}
                  <div className="flex flex-col gap-stack-xs pt-stack border-t border-ink-100">
                    <div className="flex flex-wrap items-center gap-x-stack gap-y-1">
                      <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                        <Lock size={11} className="text-ink-400 shrink-0" />
                        Données confidentielles · RGPD
                      </span>
                      <span className="text-ink-300 text-caption">·</span>
                      <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                        <MapPin size={11} className="text-ink-400 shrink-0" />
                        Équipe basée à Paris
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <MagneticButton strength={12}>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={submitting}
                          trailingIcon={submitting ? undefined : <ArrowRight size={18} />}
                        >
                          {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
                        </Button>
                      </MagneticButton>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </FadeInWhenVisible>

          {/* Aside */}
          <FadeInWhenVisible direction="up" delay={0.1}>
          <div className="flex flex-col gap-stack-lg lg:sticky lg:top-20">
            {/* Booking card */}
              <div className="relative overflow-hidden rounded-2xl bg-primary-50 border border-primary-200 p-stack-lg flex flex-col gap-stack-lg shadow-sm">
                <div className="flex flex-col gap-stack">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white border border-primary-200 text-accent-400 text-caption font-bold w-fit">
                    <Sparkles size={12} />
                    Plus rapide
                  </span>
                  <h3 className="font-display text-h3 font-extrabold text-ink-900 m-0 leading-tight">
                    Réservez un échange de 30 min
                  </h3>
                  <p className="font-body text-body-sm text-ink-600 m-0 leading-relaxed">
                    Choisissez votre créneau dans notre agenda.
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
                      variant="secondary"
                      size="md"
                      fullWidth
                      trailingIcon={<Calendar size={16} />}
                    >
                      Réserver maintenant
                    </Button>
                  </a>
                </MagneticButton>
              </div>

            {/* Contact info */}
              <div className="rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm">
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
                      <span className="font-body text-caption font-bold text-ink-500">
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
                      <span className="font-body text-caption font-bold text-ink-500">
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
                      <span className="font-body text-caption font-bold text-ink-500">
                        Bureau
                      </span>
                      <span className="font-body text-body-sm font-semibold text-ink-900">
                        Paris, France
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-stack border-t border-ink-100 flex items-center gap-stack-xs">
                  <Clock size={14} className="text-ink-500 shrink-0" />
                  <p className="font-body text-caption text-ink-600 m-0">
                    Réponse sous <strong className="text-ink-900">48h ouvrées</strong> · L-V, 9h–18h
                  </p>
                </div>
              </div>

            {/* Quick links */}
              <div className="rounded-2xl bg-white border border-ink-100 p-stack-lg flex flex-col gap-stack shadow-sm">
                <h3 className="font-display text-h5 font-bold text-ink-900 m-0">Accès rapide</h3>
                <div className="flex flex-col gap-stack-xs">
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
          </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default MarketingContact;
