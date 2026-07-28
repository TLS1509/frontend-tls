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

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: 'Offres',
    links: [
      { label: 'Learning App', href: '/website/learning-app' },
      { label: 'Studio IA & Pédagogie', href: '/website/studio' },
      { label: 'Déploiement IA & SBO', href: '/website/accompagnement' },
      { label: 'Upskilling sur-mesure', href: '/website/upskilling' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Autodiagnostics', href: '/website/diagnostic' },
      { label: 'La Vigie IA', href: '/website/vigie' },
      { label: 'Magazine & Ressources', href: '/website/resources' },
    ],
  },
  {
    title: 'La société',
    links: [
      { label: 'Les Fondateurs', href: '/website/equipe' },
      { label: 'Contact', href: '/website/contact' },
      { label: 'Accès anticipé', href: '/website/waitlist' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/website/mentions-legales' },
  { label: 'Confidentialité', href: '/website/politique-confidentialite' },
  { label: 'CGV / CGU', href: '/website/cgv-cgu' },
  { label: 'Charte IA', href: '/website/charte-ia' },
];

export const MarketingFooter: React.FC = () => (
  <footer className="border-t border-primary-100/60 bg-primary-50/40">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8 flex flex-col gap-section">

      {/* Row 1 — Brand block + link columns */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-section md:gap-stack-lg">
        <div className="flex flex-col gap-stack max-w-xs">
          <Link to="/website" className="flex items-center gap-2 shrink-0 group w-fit">
            <TlsLogo size={28} variant="primary" />
            <span className="font-display font-bold text-body text-ink-800 leading-none whitespace-nowrap">
              The Learning Society
            </span>
          </Link>
          <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
            Le cabinet de conseil et studio expert en Skills-Based Organization.
            Conseil, création pédagogique et IA pour aligner vos talents avec
            vos enjeux business.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://linkedin.com/company/thelearningsociety"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-pill text-ink-500 transition-colors duration-fast hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="LinkedIn The Learning Society"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href="mailto:contact@thelearningsociety.fr"
              className="flex h-9 w-9 items-center justify-center rounded-pill text-ink-500 transition-colors duration-fast hover:bg-primary-100 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-label="Écrire à The Learning Society"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {COLUMNS.map(({ title, links }) => (
          <nav key={title} aria-label={`Footer : ${title}`} className="flex flex-col gap-stack-xs">
            <span className="font-display text-body-sm font-bold text-ink-800">{title}</span>
            <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="font-body text-body-sm text-ink-500 hover:text-ink-900 transition-colors duration-fast"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Row 2 — Copyright + legal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-xs border-t border-primary-100/60 pt-stack text-micro text-ink-400">
        <span>© 2026 The Learning Society · Paris</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
      </div>

    </div>
  </footer>
);

export default MarketingFooter;
