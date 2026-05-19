import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  Shield,
  Award,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

/** Brand logo SVG — Lucide v1 doesn't ship a LinkedIn icon. Brand exception per CLAUDE.md. */
const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { TlsLogo } from '../../../components/ui/TlsLogo';
import { CountUp, useMarketingToast } from '../../../components/marketing/motion';

const FOOTER_LINKS = {
  offres: [
    { label: 'Formation Formateur Augmenté', href: '/marketing/formation' },
    { label: 'Accompagnement sur mesure', href: '/marketing/accompagnement' },
    { label: 'Learning App', href: '/marketing/learning-app' },
    { label: 'Tarifs & devis', href: '/marketing/contact' },
  ],
  societe: [
    { label: "L'équipe", href: '/marketing/equipe' },
    { label: 'Notre méthode (STRIDE)', href: '/marketing/methode' },
    { label: 'Cas clients', href: '/marketing/temoignages' },
    { label: 'Magazine', href: '/marketing/magazine' },
    { label: 'Contact', href: '/marketing/contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
    { label: 'CGV / CGU', href: '#' },
    { label: 'Charte IA & éthique', href: '#' },
  ],
};

const TRUST_BADGES = [
  { icon: <Shield size={16} />, label: 'Qualiopi · C-Campus' },
  { icon: <Award size={16} />, label: 'Open Badge 2.0' },
  { icon: <GraduationCap size={16} />, label: 'CPF / OPCO éligible' },
  { icon: <CheckCircle2 size={16} />, label: 'RGPD & AI Act compliant' },
];

// ⚠️ PLACEHOLDER — Chiffres en cours de consolidation.
// À mettre à jour avec les vraies métriques avant production.
const SOCIAL_PROOF = [
  { value: 200, suffix: '+', label: 'formateurs certifiés' },
  { value: 40, suffix: '+', label: 'organisations clientes' },
  { value: 97, suffix: ' %', label: 'satisfaction apprenants' },
];

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { push } = useMarketingToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      push({
        tone: 'success',
        message: 'Inscription confirmée ✨',
        description: 'Premier email du Mag\' d\'ici 15 jours dans ta boîte.',
      });
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-stack">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-h4 font-bold text-white m-0 leading-tight">
          La newsletter du Formateur Augmenté
        </h3>
        <p className="font-body text-body-sm text-white/70 m-0">
          Un email tous les 15 jours. Insights, ressources, invitations événements.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <label className="sr-only" htmlFor="newsletter-email">
          Adresse email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton.email@exemple.fr"
          className="flex-1 min-w-0 px-4 h-11 rounded-pill bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-base"
        />
        <button
          type="submit"
          disabled={submitted}
          className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-pill bg-accent-400 hover:bg-accent-500 active:bg-secondary-500 text-ink-900 font-body font-bold text-body-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-base disabled:opacity-disabled disabled:cursor-not-allowed"
        >
          {submitted ? (
            <>
              <CheckCircle2 size={16} />
              Inscrit·e
            </>
          ) : (
            <>
              S'inscrire
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
      <p className="font-body text-micro text-white/50 m-0">
        Pas de spam. Désabonnement en 1 clic. Tes données sont strictement protégées.
      </p>
    </form>
  );
};

export const MarketingFooter: React.FC = () => (
  <footer className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950 text-white">
    {/* Subtle ambient blob behind */}
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-pill bg-primary-500/15 blur-[120px]"
      />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-section-lg flex flex-col gap-section-lg">
      {/* Social proof row */}
      <div className="grid grid-cols-3 gap-stack pb-section border-b border-white/10">
        {SOCIAL_PROOF.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <CountUp
              to={s.value}
              suffix={s.suffix}
              className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-white leading-none"
            />
            <span className="font-body text-caption text-white/60 mt-1 uppercase tracking-wider font-semibold">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-section">
        {/* Brand + Newsletter */}
        <div className="flex flex-col gap-stack-lg">
          <div className="flex flex-col gap-stack">
            <Link to="/marketing" className="flex items-center gap-2.5 w-fit group">
              <TlsLogo size={36} className="transition-transform duration-base group-hover:scale-105" />
              <span className="font-display font-bold text-h4 text-white leading-none">
                The Learning Society
              </span>
            </Link>
            <p className="font-body text-body-sm text-white/70 leading-relaxed max-w-prose m-0">
              Transforme tes pratiques pédagogiques en combinant intelligence artificielle
              et expertise humaine. Formation certifiante, accompagnement sur mesure,
              plateforme d'apprentissage intégrée.
            </p>
          </div>
          <NewsletterSignup />
        </div>

        {/* Offres */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-display text-body font-bold text-white uppercase tracking-wide m-0">
            Nos offres
          </h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {FOOTER_LINKS.offres.map(({ label, href }) => (
              <li key={href + label}>
                <Link
                  to={href}
                  className="text-body-sm text-white/65 hover:text-white transition-colors duration-fast flex items-center gap-1 group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-fast text-accent-400"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Société */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-display text-body font-bold text-white uppercase tracking-wide m-0">
            Société
          </h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {FOOTER_LINKS.societe.map(({ label, href }) => (
              <li key={href + label}>
                <Link
                  to={href}
                  className="text-body-sm text-white/65 hover:text-white transition-colors duration-fast flex items-center gap-1 group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-fast text-accent-400"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-display text-body font-bold text-white uppercase tracking-wide m-0">
            Légal
          </h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {FOOTER_LINKS.legal.map(({ label, href }) => (
              <li key={href + label}>
                <a
                  href={href}
                  className="text-body-sm text-white/65 hover:text-white transition-colors duration-fast flex items-center gap-1 group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-fast text-accent-400"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust badges row */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-section border-t border-white/10">
        {TRUST_BADGES.map((b) => (
          <div
            key={b.label}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/5 border border-white/10 backdrop-blur-glass-light"
          >
            <span className="text-accent-400">{b.icon}</span>
            <span className="font-body text-caption font-semibold text-white/80">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-stack-lg border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-caption text-white/45 m-0">
          © 2026 The Learning Society. Tous droits réservés.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com/company/thelearningsociety"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-pill bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent-400/40 text-white/70 hover:text-white transition-all duration-base flex items-center justify-center min-h-touch"
            aria-label="LinkedIn The Learning Society"
          >
            <LinkedInIcon size={16} />
          </a>
          <a
            href="mailto:contact@thelearningsociety.fr"
            className="w-9 h-9 rounded-pill bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent-400/40 text-white/70 hover:text-white transition-all duration-base flex items-center justify-center min-h-touch"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-accent-400/10 border border-accent-400/30 text-accent-300 text-caption font-semibold">
            <Sparkles size={12} />
            Made in Paris
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default MarketingFooter;
