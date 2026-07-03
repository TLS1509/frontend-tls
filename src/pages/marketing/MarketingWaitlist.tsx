/**
 * MarketingWaitlist — Page accès anticipé + inscription newsletter.
 * Route : /marketing/waitlist (dans MarketingLayout)
 *
 * Deux actions : rejoindre la bêta Learning App + newsletter EdTech & IA.
 * Angle : accès anticipé bêta Learning App + newsletter EdTech & IA.
 * Copy §11 conforme — zéro métrique inventée.
 * Design : light editorial, cohérent avec /inscription (from-primary-50 to-white).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { submitForm } from './utils/submitForm';
import {
  ArrowRight,
  CalendarCheck,
  MailCheck,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MailX,
  Unlink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  KineticHeadline,
  FadeInWhenVisible,
  NoiseTexture,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const BENEFITS = [
  {
    icon: <CalendarCheck size={18} className="text-primary-500 shrink-0 mt-0.5" />,
    label: 'Accès bêta en avant-première',
    desc: 'Testez la plateforme avant le lancement officiel, sans engagement.',
  },
  {
    icon: <MailCheck size={18} className="text-secondary-500 shrink-0 mt-0.5" />,
    label: 'Newsletter EdTech & IA',
    desc: 'Analyses, ressources pédagogiques et actualités IA tous les 15 jours.',
  },
  {
    icon: <Sparkles size={18} className="text-accent-400 shrink-0 mt-0.5" />,
    label: 'Offres de lancement exclusives',
    desc: 'Premiers informés des tarifs fondateurs et des sessions pilotes.',
  },
];

const TRUST_SIGNALS = [
  { icon: <ShieldCheck size={13} />, label: 'RGPD conforme' },
  { icon: <MailX size={13} />, label: 'Zéro spam' },
  { icon: <Unlink size={13} />, label: 'Désinscription en 1 clic' },
];

/* ─── CheckboxField ──────────────────────────────────────────────────────────── */

const CheckboxField: React.FC<{
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}> = ({ id, checked, onChange, label, description }) => (
  /* relative on label is MANDATORY — sr-only uses position:absolute, anchors to nearest positioned ancestor */
  <label htmlFor={id} className="relative flex items-start gap-3 cursor-pointer group">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <span
      aria-hidden
      className={[
        'relative mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-sm border-2',
        'transition-colors duration-base',
        'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary-500',
        checked
          ? 'bg-primary-600 border-primary-600'
          : 'bg-white border-ink-300 group-hover:border-primary-400',
      ].join(' ')}
    >
      {checked && <Check size={11} className="text-white" strokeWidth={2.5} />}
    </span>
    <div className="flex flex-col gap-0.5">
      <span className="font-body text-body-sm font-semibold text-ink-900 leading-snug">{label}</span>
      <span className="font-body text-caption text-ink-500 leading-relaxed">{description}</span>
    </div>
  </label>
);

/* ─── Main ────────────────────────────────────────────────────────────────────── */

export const MarketingWaitlist: React.FC = () => {
  const reduced = useReducedMotion();

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [wantsBeta, setWantsBeta] = useState(true);
  const [wantsNewsletter, setWantsNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const emailError = touched && !email.trim();
  const checkboxError = touched && !wantsBeta && !wantsNewsletter;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email.trim() || (!wantsBeta && !wantsNewsletter)) return;
    setSubmitting(true);
    setSubmitError(null);
    const { ok, error } = await submitForm({
      name: firstName,
      email,
      subject: wantsBeta && wantsNewsletter ? 'Bêta + Newsletter' : wantsBeta ? 'Bêta Learning App' : 'Newsletter EdTech & IA',
      _source: 'waitlist',
    });
    setSubmitting(false);
    if (ok) setSubmitted(true);
    else setSubmitError(error ?? 'Une erreur est survenue. Réessayez ou écrivez-nous directement.');
  };

  /* Stagger variants for the left column */
  const colVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const successMessage = wantsBeta && wantsNewsletter
    ? 'Vous serez parmi les premiers à accéder à la bêta. Votre premier email arrive bientôt.'
    : wantsBeta
    ? 'Vous serez parmi les premiers à accéder à la bêta Learning App.'
    : 'Premier email dans votre boîte dans les 15 prochains jours.';

  return (
    <>
      <SEOHead
        title="Accès anticipé · Learning App · The Learning Society"
        description="Rejoignez la liste d'accès anticipé à la Learning App TLS. Parcours adaptatifs, Passeport Dreyfus, coaching intégré, méthode STRIDE."
        canonical="/website/waitlist"
        noIndex={false}
      />

      {/* ── HERO + FORM ──────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white px-6 md:px-10 py-16 md:py-24 lg:py-28">
        <NoiseTexture opacity={0.022} />

        {/* Ambient blob — non-interactive decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-primary-100/40 [filter:blur(80px)]"
        />

        <div className="relative z-10 max-w-page mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — copy ──────────────────────────────────────────────────── */}
            <motion.div
              className="flex flex-col gap-6 lg:pt-2"
              variants={colVariants}
              initial={reduced ? false : 'hidden'}
              animate={reduced ? false : 'show'}
            >
              {/* Urgency pill */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-secondary-50 border border-secondary-200 font-body text-caption font-semibold text-secondary-600">
                  <span
                    aria-hidden
                    className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"
                  />
                  Bêta · Accès anticipé · Places limitées
                </span>
              </motion.div>

              {/* H1 */}
              <h1
                className="font-display font-extrabold text-ink-900 leading-[0.92] tracking-display m-0"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
              >
                <span className="block">
                  <KineticHeadline text="Formez vos" delay={0.08} />
                </span>
                <span className="block">
                  <KineticHeadline text="équipes à l'IA." delay={0.18} />
                </span>
                <span className="block text-accent-400">
                  <KineticHeadline text="Accès anticipé." delay={0.28} />
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[48ch]"
              >
                La Learning App qui apprend avec vos équipes : parcours adaptatifs,
                Passeport Dreyfus, coaching intégré. Rejoignez la liste d'accès
                anticipé et soyez parmi les premiers à déployer{' '}
                <span className="text-ink-900 font-semibold">
                  la méthode STRIDE
                </span>.
              </motion.p>

              {/* Benefits */}
              <motion.ul
                variants={itemVariants}
                className="flex flex-col gap-4 list-none m-0 p-0"
              >
                {BENEFITS.map((b) => (
                  <li key={b.label} className="flex items-start gap-3">
                    {b.icon}
                    <div>
                      <span className="font-body text-body-sm font-semibold text-ink-800 block">
                        {b.label}
                      </span>
                      <span className="font-body text-caption text-ink-500">
                        {b.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </motion.ul>

              {/* Trust strip */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-x-5 gap-y-2 pt-1"
              >
                {TRUST_SIGNALS.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 font-body text-caption text-ink-400"
                  >
                    <span className="text-primary-400">{icon}</span>
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — form card ────────────────────────────────────────────── */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 28, scale: 0.975 }}
              animate={reduced ? false : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:max-w-md lg:ml-auto"
            >
              {/* Double-bezel card (consistent with /inscription) */}
              <div className="bg-white border border-primary-100 rounded-3xl p-2 shadow-brand-md">
                <div className="bg-primary-50/60 border border-primary-100 rounded-[18px] p-6 md:p-8">

                  <AnimatePresence mode="wait">

                    {/* FORM STATE */}
                    {!submitted && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                        className="flex flex-col gap-5"
                      >
                        {/* Card heading */}
                        <div className="flex flex-col gap-1">
                          <h2 className="font-display font-bold text-ink-900 text-h4 m-0">
                            Rejoindre la liste
                          </h2>
                          <p className="font-body text-body-sm text-ink-500 m-0">
                            Accès anticipé · Aucun engagement
                          </p>
                        </div>

                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-4"
                          noValidate
                          aria-label="Formulaire d'accès anticipé"
                        >
                          {/* Prénom (optionnel) */}
                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor="wl-firstname"
                              className="font-body text-caption font-semibold text-ink-700"
                            >
                              Prénom{' '}
                              <span className="font-normal text-ink-400">(optionnel)</span>
                            </label>
                            <input
                              id="wl-firstname"
                              type="text"
                              autoComplete="given-name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Votre prénom"
                              className="h-11 px-4 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body-sm focus:outline-none focus:border-primary-400 focus:shadow-sm transition-all shadow-xs"
                            />
                          </div>

                          {/* Email */}
                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor="wl-email"
                              className="font-body text-caption font-semibold text-ink-700"
                            >
                              Email professionnel{' '}
                              <span className="text-secondary-500" aria-hidden>*</span>
                            </label>
                            <input
                              id="wl-email"
                              type="email"
                              required
                              autoComplete="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (touched) setTouched(false);
                              }}
                              placeholder="prenom.nom@entreprise.fr"
                              aria-describedby={emailError ? 'wl-email-error' : undefined}
                              aria-invalid={emailError}
                              className={[
                                'h-11 px-4 rounded-xl bg-white border font-body text-body-sm text-ink-900',
                                'placeholder:text-ink-400 focus:outline-none transition-all shadow-xs',
                                emailError
                                  ? 'border-danger-base focus:border-danger-base'
                                  : 'border-ink-200 focus:border-primary-400 focus:shadow-sm',
                              ].join(' ')}
                            />
                            {emailError && (
                              <span
                                id="wl-email-error"
                                role="alert"
                                className="flex items-center gap-1.5 font-body text-caption text-danger-fg"
                              >
                                <AlertCircle size={13} className="shrink-0" aria-hidden />
                                Email requis.
                              </span>
                            )}
                          </div>

                          {/* Separator */}
                          <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-ink-100" />
                            <span className="font-body text-caption text-ink-400 font-medium shrink-0">
                              Je souhaite...
                            </span>
                            <div className="flex-1 h-px bg-ink-100" />
                          </div>

                          {/* Checkboxes */}
                          <div
                            className="flex flex-col gap-4"
                            role="group"
                            aria-labelledby="wl-checkboxes-label"
                          >
                            <span id="wl-checkboxes-label" className="sr-only">
                              Sélectionner vos préférences
                            </span>
                            <CheckboxField
                              id="wl-beta"
                              checked={wantsBeta}
                              onChange={() => setWantsBeta(!wantsBeta)}
                              label="Accès bêta à la Learning App"
                              description="Testez la plateforme en avant-première dès l'ouverture."
                            />
                            <CheckboxField
                              id="wl-newsletter"
                              checked={wantsNewsletter}
                              onChange={() => setWantsNewsletter(!wantsNewsletter)}
                              label="Newsletter TLS"
                              description="Analyses IA, ressources EdTech et actualités tous les 15 jours."
                            />
                          </div>

                          {/* Checkbox error */}
                          {checkboxError && (
                            <div
                              role="alert"
                              className="flex items-center gap-1.5 font-body text-caption text-danger-fg"
                            >
                              <AlertCircle size={13} className="shrink-0" aria-hidden />
                              Sélectionnez au moins une option.
                            </div>
                          )}

                          {/* CTA — button-in-button */}
                          <button
                            type="submit"
                            disabled={submitting}
                            className="group w-full inline-flex items-center justify-between h-12 pl-6 pr-2 rounded-pill bg-secondary-500 hover:bg-secondary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-body shadow-warm-sm active:scale-[0.98] transition-[background-color,transform,opacity] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white mt-1"
                          >
                            <span>{submitting ? 'Inscription en cours…' : 'Rejoindre la liste'}</span>
                            {!submitting && (
                              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-base ease-emphasis group-hover:translate-x-0.5">
                                <ArrowRight size={16} />
                              </span>
                            )}
                          </button>
                          {submitError && (
                            <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-danger-bg border border-danger-base/30 text-danger-fg font-body text-caption" role="alert">
                              <AlertCircle size={14} className="shrink-0 mt-0.5" />
                              {submitError}
                            </div>
                          )}

                          {/* RGPD micro-note */}
                          <p className="font-body text-micro text-ink-400 text-center m-0 leading-relaxed">
                            En envoyant ce formulaire, vous acceptez notre{' '}
                            <Link
                              to="/website/politique-confidentialite"
                              className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors"
                            >
                              politique de confidentialité
                            </Link>
                            . Désinscription en 1 clic à tout moment.
                          </p>
                        </form>
                      </motion.div>
                    )}

                    {/* SUCCESS STATE */}
                    {submitted && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.94, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-5 py-6 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center">
                          <CheckCircle2
                            size={30}
                            className="text-success-base"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <h2 className="font-display font-bold text-ink-900 text-h4 m-0">
                            {firstName ? `Parfait, ${firstName} !` : 'C’est noté !'}
                          </h2>
                          <p className="font-body text-body-sm text-ink-600 m-0 max-w-xs mx-auto leading-relaxed">
                            {successMessage}
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-1">
                          <Link
                            to="/website/learning-app"
                            className="inline-flex items-center gap-2 font-body text-caption font-semibold text-primary-600 hover:text-primary-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
                          >
                            Découvrir la Learning App
                            <ArrowRight size={14} />
                          </Link>
                          <Link
                            to="/website/resources"
                            className="font-body text-caption text-ink-400 hover:text-ink-700 transition-colors"
                          >
                            Lire notre magazine EdTech
                          </Link>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WHAT'S COMING (lightweight) ────────────────────────────────────── */}
      <FadeInWhenVisible className="w-full px-6 md:px-10 py-16 md:py-20 bg-white">
        <div className="max-w-page mx-auto">
          <div className="text-center mb-10">
            <p className="font-body text-caption font-semibold text-primary-500 uppercase tracking-widest mb-2">
              La plateforme
            </p>
            <h2 className="font-display font-bold text-ink-900 m-0 text-h2 tracking-headline">
              Learn. Do. Match.
            </h2>
            <p className="font-body text-body text-ink-500 mt-3 max-w-[55ch] mx-auto m-0">
              Trois piliers pour passer de la formation aux preuves concrètes,
              traçables et valorisables dans votre Passeport de Compétences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tone: 'bg-primary-50 border-primary-100',
                eyebrow: 'Learn',
                eyebrowColor: 'text-primary-600',
                title: 'Parcours adaptatifs',
                desc: 'Modules IA contextualisés à votre secteur, progression Dreyfus, restitution immédiate.',
              },
              {
                tone: 'bg-secondary-50 border-secondary-100',
                eyebrow: 'Do',
                eyebrowColor: 'text-secondary-600',
                title: 'Coaching humain 1:1',
                desc: 'Sessions avec un coach certifié, corrections de missions réelles, suivi longitudinal.',
              },
              {
                tone: 'bg-accent-50 border-accent-200',
                eyebrow: 'Match',
                eyebrowColor: 'text-accent-500',
                title: 'Passeport de Compétences',
                desc: 'Preuves vérifiables, Open Badge, visibles par votre employeur et votre réseau.',
              },
            ].map((card) => (
              <div
                key={card.eyebrow}
                className={`rounded-2xl border p-6 flex flex-col gap-3 ${card.tone}`}
              >
                <span className={`font-display font-bold text-body-sm uppercase tracking-widest ${card.eyebrowColor}`}>
                  {card.eyebrow}
                </span>
                <h3 className="font-display font-bold text-ink-900 text-h4 m-0 tracking-snug">
                  {card.title}
                </h3>
                <p className="font-body text-body-sm text-ink-600 m-0 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <FadeInWhenVisible className="w-full px-6 md:px-10 py-16 md:py-20 bg-gradient-to-br from-ink-950 via-primary-900 to-ink-900">
        <div className="max-w-content mx-auto text-center flex flex-col items-center gap-6">
          <p className="font-body text-caption text-white/55 m-0">
            Accès anticipé · Bêta · Sans engagement
          </p>
          <h2 className="font-display font-extrabold text-white m-0 tracking-display leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            Rejoignez les premiers.
          </h2>
          <p className="font-body text-body text-white/70 m-0 max-w-[48ch] leading-relaxed">
            La formation IA qui prouve ce que vos équipes savent faire.
            Places limitées pour la prochaine session.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center justify-between gap-3 h-12 pl-6 pr-2 rounded-pill bg-accent-400 hover:bg-accent-500 text-ink-900 font-body font-semibold text-body shadow-sun-sm active:scale-[0.98] transition-[background-color,transform] duration-base ease-emphasis focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          >
            <span>Obtenir un accès anticipé</span>
            <span className="w-8 h-8 rounded-full bg-ink-900/10 flex items-center justify-center shrink-0 transition-transform duration-base ease-emphasis group-hover:translate-x-0.5">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </FadeInWhenVisible>
    </>
  );
};

export default MarketingWaitlist;
