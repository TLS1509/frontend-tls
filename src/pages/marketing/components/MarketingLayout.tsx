import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { MarketingHeader } from './MarketingHeader';
import { MarketingFooter } from './MarketingFooter';
import { MarketingToastProvider } from '../../../components/marketing/motion';

/**
 * MarketingLayout: public marketing site shell.
 *
 * - Sticky header + footer
 * - Global scroll progress bar (just below header)
 * - Toast provider for newsletter / form confirmations
 * - Page transitions via AnimatePresence (subtle fade-up between routes)
 */
export const MarketingLayout: React.FC = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  // full-bg variants need a transparent layout so the fixed image behind the page shows through
  const isFullBgPage = pathname === '/marketing';

  return (
    <MarketingToastProvider>
      <div className={`min-h-[100dvh] flex flex-col ${isFullBgPage ? 'bg-transparent' : 'bg-white'}`}>
        <MarketingHeader />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <MarketingFooter />
        {/* Dev-only variant lab shortcut */}
        {import.meta.env.DEV && (
          <Link
            to="/marketing/_variants"
            className="fixed bottom-5 left-5 z-[9999] inline-flex items-center gap-1.5 px-3 py-2 rounded-pill bg-ink-900/90 text-white text-caption font-bold shadow-lg hover:bg-primary-700 transition-colors duration-fast backdrop-blur-sm"
          >
            <Layers size={13} />
            Variants
          </Link>
        )}
      </div>
    </MarketingToastProvider>
  );
};

export default MarketingLayout;
