import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Users, Compass, Award, Newspaper } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '../../../components/core/Button';
import { MagneticButton } from '../../../components/marketing/motion';
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
  { label: 'Contact', href: '/marketing/contact' },
];

const isPathActive = (pathname: string, href: string): boolean =>
  pathname === href || (href !== '/marketing' && pathname.startsWith(href));

/* ────────────────────────────────────────────────────────────────────────────
   Fluid Island shell — custom spring cubic-bezier used everywhere for the
   morph; never `ease-in-out`. Tied to scroll state, not continuous scroll.
   NB: the easing utility must be written LITERALLY in every className so the
   Tailwind v4 source scanner can compile it (no template interpolation).
   ──────────────────────────────────────────────────────────────────────────── */

/* ────────────────────────────────────────────────────────────────────────────
   HamburgerMorph — 3 bars fluidly rotate/translate into a perfect X.
   ──────────────────────────────────────────────────────────────────────────── */
const HamburgerMorph: React.FC<{ open: boolean }> = ({ open }) => {
  const reduced = useReducedMotion();
  const spring = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 30 };
  const barBase = 'absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 rounded-pill bg-ink-900';
  return (
    <span aria-hidden className="relative block h-5 w-5">
      <motion.span
        className={barBase}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
        transition={spring}
      />
      <motion.span
        className={barBase}
        animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: reduced ? 0 : 0.18 }}
      />
      <motion.span
        className={barBase}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
        transition={spring}
      />
    </span>
  );
};

export const MarketingHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const dropdownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="fixed inset-x-0 top-3 z-sticky flex justify-center px-3 sm:top-4">
      {/* ── Outer shell (the machined tray) ────────────────────────────────── */}
      <nav
        aria-label="Navigation principale"
        className={[
          'pointer-events-auto w-max max-w-[calc(100vw-1.5rem)] rounded-pill p-1.5 ring-1',
          'transition-[background-color,box-shadow,border-color] duration-[450ms]',
          'ease-[cubic-bezier(0.32,0.72,0,1)] [will-change:background-color,box-shadow]',
          'backdrop-blur-glass-heavy',
          scrolled
            ? 'bg-white/70 ring-black/[0.07] shadow-card-lift'
            : 'bg-white/40 ring-black/[0.04] shadow-card',
        ].join(' ')}
      >
        {/* ── Inner core (glass plate with edge highlight) ─────────────────── */}
        <div
          className={[
            'flex items-center gap-1 rounded-pill pl-2 pr-1.5 py-1',
            'transition-colors duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
            scrolled ? 'bg-white/70' : 'bg-white/45',
            'shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]',
          ].join(' ')}
        >
          {/* Logo */}
          <Link
            to="/marketing"
            className="group flex shrink-0 items-center gap-2 rounded-pill pl-1.5 pr-2 py-1.5 transition-colors duration-fast hover:bg-ink-900/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            aria-label="The Learning Society: Accueil"
          >
            <TlsLogo size={30} className="transition-transform duration-base ease-emphasis group-hover:scale-105" />
            <span className="hidden font-display text-body-sm font-extrabold leading-none tracking-tight text-ink-900 whitespace-nowrap xl:block">
              The Learning Society
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
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
                        'relative flex items-center gap-tight rounded-pill px-3 py-2 text-body-sm font-semibold whitespace-nowrap',
                        'transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                        hasActiveChild ? 'text-primary-800' : 'text-ink-700 hover:text-ink-900',
                      ].join(' ')}
                    >
                      {hasActiveChild && (
                        <motion.span
                          layoutId="marketing-nav-active"
                          aria-hidden
                          className="absolute inset-0 rounded-pill bg-primary-500/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-base">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`relative z-base transition-transform duration-base ease-emphasis ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                          className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-card-lift backdrop-blur-glass-heavy z-dropdown"
                          role="menu"
                        >
                          <div className="flex flex-col gap-0.5 p-2">
                            {item.dropdown.map((d) => {
                              const active = isPathActive(pathname, d.href);
                              return (
                                <Link
                                  key={d.href}
                                  to={d.href}
                                  role="menuitem"
                                  className={`flex items-start gap-stack rounded-xl p-stack transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                                    active ? 'bg-primary-50' : 'hover:bg-ink-50'
                                  }`}
                                >
                                  <span
                                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                                      active
                                        ? 'border-primary-200 bg-primary-100 text-primary-700'
                                        : 'border-ink-100 bg-ink-50 text-ink-700'
                                    }`}
                                  >
                                    {d.icon}
                                  </span>
                                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                    <span
                                      className={`font-display text-body-sm font-bold leading-tight ${
                                        active ? 'text-primary-700' : 'text-ink-900'
                                      }`}
                                    >
                                      {d.label}
                                    </span>
                                    <span className="font-body text-caption leading-snug text-ink-500">
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
                    'relative flex items-center rounded-pill px-3 py-2 text-body-sm font-semibold whitespace-nowrap',
                    'transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    active ? 'text-primary-800' : 'text-ink-700 hover:text-ink-900',
                  ].join(' ')}
                >
                  {active && (
                    <motion.span
                      layoutId="marketing-nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-pill bg-primary-500/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-base">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA — magnetic, button-in-button arrow */}
          <div className="hidden shrink-0 pl-1 lg:block">
            <MagneticButton strength={10}>
              <Link to="/login" aria-label="Connexion">
                <Button
                  variant="primary"
                  size="md"
                  className="group/cta pr-1.5"
                  trailingIcon={
                    <span className="ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-pill bg-white/20 transition-transform duration-base ease-emphasis group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px">
                      <ArrowRight size={13} />
                    </span>
                  }
                >
                  Connexion
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-ink-900 transition-colors duration-fast hover:bg-ink-900/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:hidden"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="marketing-mobile-nav"
          >
            <HamburgerMorph open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="marketing-mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-modal flex flex-col overflow-y-auto bg-white/90 backdrop-blur-glass-heavy lg:hidden"
          >
            <nav
              className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-tight px-6 pb-16 pt-28"
              aria-label="Navigation mobile"
            >
              {NAV_ITEMS.map((item, i) => {
                const reveal = reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 24 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
                    };

                if (item.dropdown) {
                  const isExpanded = mobileExpanded === item.label;
                  return (
                    <motion.div key={item.label} {...reveal} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                        aria-expanded={isExpanded}
                        className="flex min-h-touch items-center gap-stack-xs rounded-xl px-4 py-3 font-display text-h4 font-bold text-ink-900 transition-colors duration-fast hover:bg-ink-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={20}
                          className={`ml-auto transition-transform duration-base ease-emphasis ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-tight pl-stack-lg pt-1">
                              {item.dropdown.map((d) => {
                                const active = isPathActive(pathname, d.href);
                                return (
                                  <Link
                                    key={d.href}
                                    to={d.href}
                                    className={`flex min-h-touch items-start gap-stack rounded-lg p-stack focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                                      active ? 'bg-primary-50 text-primary-700' : 'text-ink-700 hover:bg-ink-50'
                                    }`}
                                  >
                                    <span className="mt-0.5 shrink-0 text-primary-600">{d.icon}</span>
                                    <div className="flex min-w-0 flex-col gap-0.5">
                                      <span className="font-body text-body-sm font-bold leading-tight">
                                        {d.label}
                                      </span>
                                      <span className="font-body text-caption leading-snug text-ink-500">
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
                    </motion.div>
                  );
                }

                const active = isPathActive(pathname, item.href!);
                return (
                  <motion.div key={item.href} {...reveal}>
                    <Link
                      to={item.href!}
                      className={[
                        'flex min-h-touch items-center rounded-xl px-4 py-3 font-display text-h4 font-bold transition-colors duration-fast',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                        active ? 'text-primary-700' : 'text-ink-900 hover:bg-ink-900/5',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 24 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.08 + NAV_ITEMS.length * 0.06, duration: 0.5, ease: [0.32, 0.72, 0, 1] as const },
                    })}
                className="mt-stack-lg"
              >
                <Link to="/login">
                  <Button variant="primary" size="lg" fullWidth trailingIcon={<ArrowRight size={18} />}>
                    Connexion
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MarketingHeader;
