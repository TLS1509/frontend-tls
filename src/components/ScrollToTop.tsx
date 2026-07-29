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
    if (hash) {
      /**
       * On attend que la cible existe, au lieu de parier sur un délai.
       *
       * L'ancienne version cherchait l'élément après 50 ms et abandonnait s'il
       * n'était pas là. C'était suffisant pour une page légère, jamais pour une
       * page dense : sur `/components/atoms#trendingbadge`, les 30 composants de
       * la catégorie ne sont pas montés à 50 ms, donc le lien profond ne
       * scrollait pas — il ouvrait la page en haut, en silence.
       *
       * On réessaie à chaque frame pendant ~1 s. `scrollIntoView` respecte le
       * `scroll-margin-top` de la cible, ce qui dégage le chrome sticky.
       */
      const id = hash.slice(1);
      let frames = 0;
      let raf = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (frames++ < 60) raf = requestAnimationFrame(tryScroll);
      };
      raf = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(raf);
    }

    // Scroll window to top on route change (instant, no animation)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
