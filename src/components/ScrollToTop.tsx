/**
 * ScrollToTop — réinitialise le scroll à chaque changement de route.
 *
 * À placer une seule fois à l'intérieur du `<Router>` (au root de l'app).
 * Écoute `useLocation().pathname` et appelle `window.scrollTo(0, 0)` sur
 * chaque navigation, sauf si l'URL contient un hash anchor (`#section-id`)
 * — dans ce cas on laisse le browser gérer l'ancre native.
 *
 * Désactive aussi `history.scrollRestoration` natif du browser qui peut
 * interférer (notamment au back/forward) — on prend le contrôle total.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable native browser scroll restoration on back/forward — we handle it
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Skip if URL has hash anchor — let browser handle anchor scroll
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        // Smooth scroll to anchor target after a small delay (let DOM mount)
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
      return;
    }

    // Scroll window to top on route change (instant, no animation)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
