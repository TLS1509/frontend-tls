import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Users, Compass, Award, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components/core/Button';
import { TlsLogo } from '../../../components/ui/TlsLogo';

type NavItem = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string; desc: string; icon: React.ReactNode }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/marketing' },
  { label: 'Learning App', href: '/marketing/learning-app' },
  { label: 'Formation', href: '/marketing/formation' },
  { label: 'Accompagnement', href: '/marketing/accompagnement' },
  {
    label: 'Ressources',
    dropdown: [
      {
        label: 'Magazine',
        href: '/marketing/magazine',
        desc: 'Articles, analyses, tendances EdTech & IA',
        icon: <Newspaper size={16} />,
      },
      {
        label: "L'équipe",
        href: '/marketing/equipe',
        desc: 'Les humains derrière TLS',
        icon: <Users size={16} />,
      },
      {
        label: 'Notre méthode',
        href: '/marketing/methode',
        desc: 'STRIDE en 6 étapes',
        icon: <Compass size={16} />,
      },
      {
        label: 'Cas clients',
        href: '/marketing/temoignages',
        desc: 'Six transformations racontées',
        icon: <Award size={16} />,
      },
    ],
  },
];

const isPathActive = (pathname: string, href: string): boolean =>
  pathname === href || (href !== '/marketing' && pathname.startsWith(href));

export const MarketingHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const dropdownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimerRef.current) window.clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-sticky transition-all duration-base backdrop-blur-glass-heavy border-b',
        scrolled
          ? 'bg-white/75 shadow-sm border-white/40'
          : 'bg-white/40 border-white/20',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-stack">
        {/* Logo */}
        <Link
          to="/marketing"
          className="shrink-0 flex items-center gap-stack-xs.5 min-h-touch group"
          aria-label="The Learning Society: Accueil"
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
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => {
            // Dropdown variant
            if (item.dropdown) {
              const isOpen = openDropdown === item.label;
              const hasActiveChild = item.dropdown.some((d) => isPathActive(pathname, d.href));
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    className={[
                      'relative px-3 py-1.5 rounded-pill text-body-sm font-semibold whitespace-nowrap transition-colors duration-fast min-h-touch flex items-center gap-tight',
                      hasActiveChild ? 'text-primary-800' : 'text-ink-700 hover:text-ink-900',
                    ].join(' ')}
                  >
                    {hasActiveChild && (
                      <motion.span
                        layoutId="marketing-nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-pill bg-primary-50/80 border border-primary-100"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`relative z-10 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-white/90 backdrop-blur-glass-heavy border border-white/50 shadow-2xl overflow-hidden z-dropdown"
                        role="menu"
                      >
                        <div className="p-2 flex flex-col gap-0.5">
                          {item.dropdown.map((d) => {
                            const active = isPathActive(pathname, d.href);
                            return (
                              <Link
                                key={d.href}
                                to={d.href}
                                role="menuitem"
                                className={`flex items-start gap-stack p-stack rounded-xl transition-colors duration-fast ${
                                  active ? 'bg-primary-50' : 'hover:bg-ink-50'
                                }`}
                              >
                                <span
                                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border shrink-0 ${
                                    active
                                      ? 'bg-primary-100 border-primary-200 text-primary-700'
                                      : 'bg-ink-50 border-ink-100 text-ink-700'
                                  }`}
                                >
                                  {d.icon}
                                </span>
                                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                  <span
                                    className={`font-display text-body-sm font-bold leading-tight ${
                                      active ? 'text-primary-700' : 'text-ink-900'
                                    }`}
                                  >
                                    {d.label}
                                  </span>
                                  <span className="font-body text-caption text-ink-500 leading-snug">
                                    {d.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Regular link
            const active = isPathActive(pathname, item.href!);
            return (
              <Link
                key={item.href}
                to={item.href!}
                className={[
                  'relative px-3 py-1.5 rounded-pill text-body-sm font-semibold whitespace-nowrap transition-colors duration-fast min-h-touch flex items-center gap-tight.5',
                  active ? 'text-primary-800' : 'text-ink-700 hover:text-ink-900',
                ].join(' ')}
              >
                {active && (
                  <motion.span
                    layoutId="marketing-nav-active"
                    aria-hidden
                    className="absolute inset-0 rounded-pill bg-primary-50/80 border border-primary-100"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-stack-xs shrink-0">
          <Link to="/marketing/contact">
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              Contact
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              Connexion
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
              className="lg:hidden fixed inset-0 top-16 bg-ink-900/40 backdrop-blur-glass-light z-overlay"
            />
            <motion.div
              id="marketing-mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:hidden relative bg-white/95 backdrop-blur-glass-heavy border-t border-white/50 shadow-xl z-modal max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <nav className="max-w-7xl mx-auto px-6 py-stack flex flex-col gap-tight" aria-label="Navigation mobile">
                {NAV_ITEMS.map((item) => {
                  if (item.dropdown) {
                    const isExpanded = mobileExpanded === item.label;
                    return (
                      <div key={item.label} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                          aria-expanded={isExpanded}
                          className="px-4 py-3 rounded-lg text-body font-semibold transition-colors duration-fast min-h-touch flex items-center gap-stack-xs text-ink-800 hover:bg-ink-50"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`ml-auto transition-transform duration-base ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-stack-lg pt-1 flex flex-col gap-tight">
                                {item.dropdown.map((d) => {
                                  const active = isPathActive(pathname, d.href);
                                  return (
                                    <Link
                                      key={d.href}
                                      to={d.href}
                                      className={`flex items-start gap-stack p-stack rounded-lg ${
                                        active
                                          ? 'bg-primary-50 text-primary-700'
                                          : 'text-ink-700 hover:bg-ink-50'
                                      }`}
                                    >
                                      <span className="text-primary-600 mt-0.5 shrink-0">{d.icon}</span>
                                      <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className="font-body text-body-sm font-bold leading-tight">
                                          {d.label}
                                        </span>
                                        <span className="font-body text-caption text-ink-500 leading-snug">
                                          {d.desc}
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const active = isPathActive(pathname, item.href!);
                  return (
                    <Link
                      key={item.href}
                      to={item.href!}
                      className={[
                        'px-4 py-3 rounded-lg text-body font-semibold transition-colors duration-fast min-h-touch flex items-center gap-stack-xs',
                        active ? 'text-primary-700 bg-primary-50' : 'text-ink-800 hover:bg-ink-50',
                      ].join(' ')}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="pt-3 mt-1 border-t border-ink-100 flex flex-col gap-stack-xs">
                  <Link to="/marketing/contact">
                    <Button variant="ghost" size="md" fullWidth>
                      Contact
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="primary" size="md" fullWidth>
                      Connexion
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
