import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

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
import { useMarketingToast } from '../../../components/marketing/motion';

const NAV_LINKS = [
  { label: 'Learning App', href: '/marketing/learning-app' },
  { label: 'Formation', href: '/marketing/formation' },
  { label: 'Accompagnement', href: '/marketing/accompagnement' },
  { label: 'Magazine', href: '/marketing/magazine' },
  { label: 'Notre méthode', href: '/marketing/methode' },
  { label: "L'équipe", href: '/marketing/equipe' },
  { label: 'Cas clients', href: '/marketing/temoignages' },
  { label: 'Contact', href: '/marketing/contact' },
];

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/marketing/mentions-legales' },
  { label: 'Confidentialité', href: '/marketing/politique-confidentialite' },
  { label: 'CGV / CGU', href: '/marketing/cgv-cgu' },
  { label: 'Charte IA & éthique', href: '/marketing/charte-ia' },
];

const NewsletterInline: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { push } = useMarketingToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    push({
      tone: 'success',
      message: 'Inscription confirmée ✨',
      description: "Premier email du Mag' d'ici 15 jours dans ta boîte.",
    });
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-stack-xs">
      <label className="sr-only" htmlFor="newsletter-email">
        Adresse email
      </label>
      <div className="flex items-center gap-tight p-1 rounded-pill bg-white/8 border border-white/15 backdrop-blur-glass-light focus-within:border-accent-400/60 transition-colors duration-base">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre.email@organisation.fr"
          className="flex-1 min-w-0 px-4 h-9 bg-transparent text-white placeholder:text-white/40 font-body text-body-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitted}
          className="inline-flex items-center justify-center gap-tight.5 px-4 h-9 rounded-pill bg-accent-400 hover:bg-accent-500 text-ink-900 font-body font-bold text-caption whitespace-nowrap transition-colors duration-base disabled:opacity-disabled disabled:cursor-not-allowed"
          aria-label="S'inscrire à la newsletter"
        >
          {submitted ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}
          <span className="hidden sm:inline">{submitted ? 'Inscrit·e' : "S'inscrire"}</span>
        </button>
      </div>
      <p className="font-body text-micro text-white/40 m-0">
        Un email tous les 15 jours · désabonnement en 1 clic.
      </p>
    </form>
  );
};

export const MarketingFooter: React.FC = () => (
  <footer className="relative overflow-hidden bg-ink-900 text-white">
    {/* Halo ambient subtle */}
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(600px circle at 80% 20%, rgba(85, 161, 180, 0.12), transparent 50%)`,
      }}
    />

    <div className="relative max-w-7xl mx-auto px-6 py-section flex flex-col gap-section">
      {/* Top : Brand + Newsletter | Navigation | Légal */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-section-lg">
        {/* Brand + newsletter (col span 1.5) */}
        <div className="flex flex-col gap-stack-lg max-w-md">
          <Link to="/marketing" className="flex items-center gap-stack-xs.5 w-fit group">
            <TlsLogo
              size={32}
              variant="light"
              className="transition-transform duration-base group-hover:scale-105"
            />
            <span className="font-display font-bold text-h4 text-white leading-none">
              The Learning Society
            </span>
          </Link>
          <p className="font-body text-body-sm text-white/60 leading-relaxed m-0">
            Skills-Based Organization. Formation, technologie et accompagnement — un cycle complet
            au service de la montée en compétences.
          </p>
          <NewsletterInline />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-body text-caption font-bold text-white/50 uppercase tracking-widest m-0">
            Navigation
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-tight.5 list-none p-0 m-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="font-body text-body-sm text-white/70 hover:text-white transition-colors duration-fast inline-flex items-center group"
                >
                  <span className="border-b border-transparent group-hover:border-accent-400/60 pb-0.5 transition-colors duration-fast">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-body text-caption font-bold text-white/50 uppercase tracking-widest m-0">
            Légal
          </h3>
          <ul className="flex flex-col gap-tight.5 list-none p-0 m-0">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-body text-body-sm text-white/70 hover:text-white transition-colors duration-fast inline-flex items-center group"
                >
                  <span className="border-b border-transparent group-hover:border-accent-400/60 pb-0.5 transition-colors duration-fast">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar — copyright + trust pills inline + socials */}
      <div className="pt-stack-lg border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-stack">
        <div className="flex flex-wrap items-center gap-x-stack gap-y-1 text-caption text-white/50">
          <span>© 2026 The Learning Society</span>
          <span className="text-white/20">·</span>
          <span>OPCO éligible</span>
          <span className="text-white/20">·</span>
          <span>RGPD compliant</span>
        </div>
        <div className="flex items-center gap-stack-xs">
          <a
            href="https://linkedin.com/company/thelearningsociety"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-pill bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent-400/40 text-white/70 hover:text-white transition-all duration-base flex items-center justify-center"
            aria-label="LinkedIn The Learning Society"
          >
            <LinkedInIcon size={15} />
          </a>
          <a
            href="mailto:contact@thelearningsociety.fr"
            className="w-9 h-9 rounded-pill bg-white/5 hover:bg-white/15 border border-white/10 hover:border-accent-400/40 text-white/70 hover:text-white transition-all duration-base flex items-center justify-center"
            aria-label="Contact email"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default MarketingFooter;
