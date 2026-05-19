import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-sticky transition-all duration-base',
        scrolled
          ? 'bg-white/85 backdrop-blur-glass-heavy shadow-sm border-b border-ink-100/80'
          : 'bg-white/60 backdrop-blur-glass-medium border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/marketing"
          className="shrink-0 flex items-center gap-2.5 min-h-touch group"
          aria-label="The Learning Society — Accueil"
        >
          <TlsLogo size={32} className="transition-transform duration-base group-hover:scale-105" />
          <span className="hidden xl:block font-display font-bold text-h4 text-ink-900 leading-none whitespace-nowrap">
            The Learning Society
          </span>
          <span className="hidden sm:block xl:hidden font-display font-bold text-h4 text-ink-900 leading-none whitespace-nowrap">
            TLS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Navigation principale"
        >
          {NAV_ITEMS.map(({ label, href, highlight }) => {
            const active = pathname === href || (href !== '/marketing' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                to={href}
                className={[
                  'relative px-2.5 py-1.5 rounded-md text-body-sm font-semibold whitespace-nowrap transition-colors duration-fast min-h-touch flex items-center gap-1.5',
                  active
                    ? 'text-primary-700'
                    : 'text-ink-700 hover:text-ink-900',
                ].join(' ')}
              >
                {label}
                {highlight && (
                  <span className="inline-block px-1.5 py-0.5 rounded-pill bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-micro font-bold tracking-wider uppercase">
                    New
                  </span>
                )}
                {active && (
                  <motion.span
                    layoutId="marketing-nav-active"
                    aria-hidden
                    className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-pill bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link to="/marketing/contact">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Demander un devis
            </Button>
          </Link>
          <Link to="/marketing/formation">
            <Button variant="warm" size="sm" className="whitespace-nowrap">
              Voir la formation
            </Button>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md text-ink-700 hover:bg-ink-50 active:bg-ink-100 transition-colors duration-fast min-h-touch min-w-touch flex items-center justify-center"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="marketing-mobile-nav"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim — opaque enough to block content behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
              className="lg:hidden fixed inset-0 top-16 bg-ink-900/40 backdrop-blur-glass-light z-overlay"
            />
            {/* Drawer */}
            <motion.div
              id="marketing-mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:hidden relative bg-white border-t border-ink-100 shadow-xl z-modal"
            >
              <nav
                className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1"
                aria-label="Navigation mobile"
              >
                {NAV_ITEMS.map(({ label, href, highlight }) => {
                  const active = pathname === href || (href !== '/marketing' && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      to={href}
                      className={[
                        'px-4 py-3 rounded-lg text-body font-semibold transition-colors duration-fast min-h-touch flex items-center gap-2',
                        active
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-ink-800 hover:bg-ink-50',
                      ].join(' ')}
                    >
                      <span>{label}</span>
                      {highlight && (
                        <span className="ml-auto inline-block px-1.5 py-0.5 rounded-pill bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-micro font-bold tracking-wider uppercase">
                          New
                        </span>
                      )}
                    </Link>
                  );
                })}
                <div className="pt-3 mt-1 border-t border-ink-100 flex flex-col gap-2">
                  <Link to="/marketing/contact">
                    <Button variant="ghost" size="md" fullWidth>
                      Demander un devis
                    </Button>
                  </Link>
                  <Link to="/marketing/formation">
                    <Button variant="warm" size="md" fullWidth>
                      Voir la formation
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MarketingHeader;
