import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { TlsLogo } from '../../../components/ui/TlsLogo';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/marketing' },
  { label: 'Formation', href: '/marketing/formation' },
  { label: 'Accompagnement', href: '/marketing/accompagnement' },
  { label: 'Learning App', href: '/marketing/learning-app', highlight: true },
  { label: 'Magazine', href: '/marketing/magazine' },
  { label: 'Contact', href: '/marketing/contact' },
];

export const MarketingHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-sticky transition-all duration-base',
        scrolled
          ? 'bg-white/90 backdrop-blur-glass-medium shadow-sm border-b border-ink-100'
          : 'bg-white/70 backdrop-blur-glass-light',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/marketing" className="shrink-0 flex items-center gap-2.5 min-h-touch">
          <TlsLogo size={32} />
          <span className="font-display font-bold text-h4 text-ink-900 leading-none hidden sm:block">
            The Learning Society
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_ITEMS.map(({ label, href, highlight }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={[
                  'px-3 py-1.5 rounded-md text-body-sm font-semibold transition-colors duration-fast min-h-touch flex items-center',
                  highlight
                    ? 'text-primary-700 bg-primary-50 hover:bg-primary-100'
                    : active
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-ink-700 hover:text-ink-900 hover:bg-ink-50',
                ].join(' ')}
              >
                {label}
                {highlight && (
                  <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded-pill bg-gradient-to-r from-primary-500 to-primary-600 text-white text-micro font-bold">
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link to="/marketing/contact">
            <Button variant="ghost" size="sm">Demander un devis</Button>
          </Link>
          <Link to="/marketing/formation">
            <Button variant="warm" size="sm">Voir la formation</Button>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md text-ink-600 hover:bg-ink-50 min-h-touch min-w-touch flex items-center justify-center"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-glass-medium border-t border-ink-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Navigation mobile">
            {NAV_ITEMS.map(({ label, href, highlight }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={[
                    'px-4 py-3 rounded-lg text-body font-semibold transition-colors min-h-touch flex items-center',
                    highlight
                      ? 'text-primary-700 bg-primary-50'
                      : active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-ink-700 hover:bg-ink-50',
                  ].join(' ')}
                >
                  {label}
                  {highlight && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-pill bg-gradient-to-r from-primary-500 to-primary-600 text-white text-micro font-bold">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 mt-1 border-t border-ink-100 flex flex-col gap-2">
              <Link to="/marketing/contact">
                <Button variant="ghost" size="md" fullWidth>Demander un devis</Button>
              </Link>
              <Link to="/marketing/formation">
                <Button variant="warm" size="md" fullWidth>Voir la formation</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default MarketingHeader;
