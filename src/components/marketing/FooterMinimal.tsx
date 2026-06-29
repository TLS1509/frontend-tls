import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterMinimalProps {
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  companyName?: string;
  legalLinks?: FooterLink[];
}

/**
 * FooterMinimal — Premium yet minimal footer component
 * Single-column mobile, 2-3 columns desktop
 * Focus: links, social, copyright only (no extended descriptions)
 */
export const FooterMinimal: React.FC<FooterMinimalProps> = ({
  links = [],
  socialLinks = [],
  companyName = 'The Learning Society',
  legalLinks = [],
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-ink-100">
      {/* Main content */}
      <div className="max-w-page mx-auto px-stack py-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-section-lg md:gap-stack-lg">
          {/* Brand + Description column */}
          <div className="flex flex-col gap-stack">
            <div>
              <h2 className="text-body font-semibold text-ink-900">{companyName}</h2>
              <p className="text-body-sm text-ink-600 mt-tight">
                Plateforme EdTech pour le développement des compétences.
              </p>
            </div>

            {/* Social links (mobile: inline, desktop: stacked) */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-stack-xs pt-stack">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-ink-50 text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Main links column */}
          {links.length > 0 && (
            <div className="flex flex-col gap-stack">
              <h3 className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                Ressources
              </h3>
              <nav className="flex flex-col gap-stack-xs">
                {links.map((link) => (
                  <div key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-body-sm text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors duration-200"
                      >
                        {link.label}
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="inline-flex items-center gap-1.5 text-body-sm text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* Legal links column */}
          {legalLinks.length > 0 && (
            <div className="flex flex-col gap-stack">
              <h3 className="text-body-sm font-semibold text-ink-900 uppercase tracking-widest">
                Légal
              </h3>
              <nav className="flex flex-col gap-stack-xs">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-body-sm text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-ink-100 to-transparent" />

      {/* Copyright bar */}
      <div className="max-w-page mx-auto px-stack py-stack">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-stack">
          <p className="text-caption text-ink-600">
            © {currentYear} {companyName}. Tous droits réservés.
          </p>

          {/* Contact link */}
          <a
            href="mailto:contact@thelearningsociety.fr"
            className="inline-flex items-center gap-1.5 text-caption text-primary-600 hover:text-primary-700 underline underline-offset-4 transition-colors duration-200"
          >
            <Mail size={14} />
            contact@thelearningsociety.fr
          </a>
        </div>
      </div>
    </footer>
  );
};

/**
 * Default footer preset for marketing pages
 */
export const MarketingFooter: React.FC = () => (
  <FooterMinimal
    links={[
      { label: 'Parcours', href: '/learning-paths' },
      { label: 'Formations', href: '/formations' },
      { label: 'Ressources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
    ]}
    socialLinks={[
      {
        icon: <ExternalLink size={18} />,
        href: 'https://www.linkedin.com/company/the-learning-society',
        label: 'LinkedIn',
      },
      {
        icon: <ExternalLink size={18} />,
        href: 'https://twitter.com/thelearningsociety',
        label: 'Twitter',
      },
      {
        icon: <Mail size={18} />,
        href: 'mailto:contact@thelearningsociety.fr',
        label: 'Email',
      },
    ]}
    legalLinks={[
      { label: 'Mentions légales', href: '/marketing/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/marketing/politique-confidentialite' },
      { label: 'CGV & CGU', href: '/marketing/cgv-cgu' },
      { label: 'Charte IA', href: '/marketing/charte-ia' },
    ]}
  />
);
