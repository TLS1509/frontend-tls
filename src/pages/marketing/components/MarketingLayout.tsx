import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
  const isFullBgPage = pathname === '/website';

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
      </div>
    </MarketingToastProvider>
  );
};

export default MarketingLayout;
