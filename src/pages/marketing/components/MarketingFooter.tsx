import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { TlsLogo } from '../../../components/ui/TlsLogo';

const FOOTER_LINKS = {
  offres: [
    { label: 'Formation Formateur Augmenté', href: '/marketing/formation' },
    { label: 'Accompagnement sur mesure', href: '/marketing/accompagnement' },
    { label: 'Learning App', href: '/marketing/learning-app' },
    { label: 'Tarifs & devis', href: '/marketing/contact' },
  ],
  ressources: [
    { label: 'Magazine', href: '/marketing/magazine' },
    { label: 'Contact', href: '/marketing/contact' },
  ],
};

export const MarketingFooter: React.FC = () => (
  <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white">
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-section">

      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-section">
        {/* Brand */}
        <div className="lg:col-span-2 flex flex-col gap-stack">
          <div className="flex items-center gap-2.5">
            <TlsLogo size={36} />
            <span className="font-display font-bold text-h4 text-white leading-none">
              The Learning Society
            </span>
          </div>
          <p className="text-body-sm text-white/70 leading-relaxed max-w-prose">
            Transformez vos pratiques pédagogiques en combinant intelligence artificielle
            et expertise humaine. Formation certifiante, accompagnement sur mesure, plateforme
            d'apprentissage intégrée.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://linkedin.com/company/thelearningsociety"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors min-h-touch flex items-center justify-center"
              aria-label="LinkedIn The Learning Society"
            >
              <ExternalLink size={18} />
            </a>
            <a
              href="mailto:contact@thelearningsociety.fr"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors min-h-touch flex items-center justify-center"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Offres */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-display text-body font-bold text-white uppercase tracking-wide">
            Nos offres
          </h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {FOOTER_LINKS.offres.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="text-body-sm text-white/65 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-fast" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ressources */}
        <div className="flex flex-col gap-stack">
          <h3 className="font-display text-body font-bold text-white uppercase tracking-wide">
            Ressources
          </h3>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {FOOTER_LINKS.ressources.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="text-body-sm text-white/65 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-fast" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-section border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-caption text-white/45 m-0">
          © 2026 The Learning Society. Tous droits réservés.
        </p>
        <p className="text-caption text-white/45 m-0">
          Mentions légales · Politique de confidentialité
        </p>
      </div>
    </div>
  </footer>
);

export default MarketingFooter;
