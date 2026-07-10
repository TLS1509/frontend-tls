import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { TlsLogo } from '../../../components/ui/TlsLogo';

const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
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

const NAV_LINKS = [
  { label: 'Learning App', href: '/website/learning-app' },
  { label: 'Accompagnement', href: '/website/accompagnement' },
  { label: 'Upskilling L&D', href: '/website/upskilling' },
  { label: 'Méthode', href: '/website/methode' },
  { label: 'Ressources', href: '/website/resources' },
  { label: 'Témoignages', href: '/website/temoignages' },
  { label: "L'équipe", href: '/website/equipe' },
  { label: 'Contact', href: '/website/contact' },
  { label: 'Accès anticipé', href: '/website/waitlist' },
];

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/website/mentions-legales' },
  { label: 'Confidentialité', href: '/website/politique-confidentialite' },
  { label: 'CGV / CGU', href: '/website/cgv-cgu' },
];

export const MarketingFooter: React.FC = () => (
  <footer className="border-t border-primary-100/60 bg-primary-50/40">
    <div className="max-w-7xl mx-auto px-6 py-stack-lg flex flex-col gap-stack">

      {/* Row 1 — Logo + nav */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-stack sm:gap-section-lg">
        <Link to="/website" className="flex items-center gap-2 shrink-0 group w-fit">
          <TlsLogo size={24} variant="primary" />
          <span className="font-display font-bold text-body text-ink-800 leading-none whitespace-nowrap">
            The Learning Society
          </span>
        </Link>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-stack gap-y-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="font-body text-body-sm text-ink-500 hover:text-ink-900 transition-colors duration-fast"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Row 2 — Copyright + legal + socials */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-xs text-micro text-ink-400">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© 2026 The Learning Society</span>
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="hover:text-ink-700 transition-colors duration-fast"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://linkedin.com/company/thelearningsociety"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-400 hover:text-primary-600 transition-colors duration-fast"
            aria-label="LinkedIn The Learning Society"
          >
            <LinkedInIcon size={15} />
          </a>
          <a
            href="mailto:contact@thelearningsociety.fr"
            className="text-ink-400 hover:text-primary-600 transition-colors duration-fast"
            aria-label="Écrire à The Learning Society"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>

    </div>
  </footer>
);

export default MarketingFooter;
