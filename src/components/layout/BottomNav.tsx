import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_BARRE_DU_BAS, entreeActive } from '../../config/navigation';

/**
 * BottomNav — navigation principale du mobile (< md).
 *
 * Fixée en bas, consciente des zones sûres, surface en verre.
 * Masquée en md+, où la Sidebar prend le relais.
 *
 * ⚠️ Les entrées viennent de `src/config/navigation.ts`, PAS d'une liste locale.
 * Elle était codée ici jusqu'au 2026-09-16, et avait dérivé de celle du rail :
 * deux icônes différentes et deux libellés différents pour les mêmes écrans.
 * Ne jamais réintroduire de tableau d'onglets dans ce fichier.
 */

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <nav
      aria-label="Navigation principale"
      className={[
        'md:hidden',
        'fixed bottom-0 inset-x-0 z-sticky',
        'bg-white/95 backdrop-blur-glass-medium',
        'border-t border-ink-100',
        'shadow-[0_-2px_16px_rgba(0,0,0,0.06)]',
        'pb-safe-bottom',
      ].join(' ')}
    >
      <div className="flex items-stretch h-14">
        {NAVIGATION_BARRE_DU_BAS.map((entree) => {
          const { href, icon: Icon } = entree;
          // La barre du bas n'a qu'environ 75 px par onglet : forme courte si elle existe.
          const label = entree.labelCourt ?? entree.label;
          const active = entreeActive(entree, location.pathname);
          return (
            <button
              key={href}
              type="button"
              onClick={() => navigate(href)}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-tight',
                'min-h-touch cursor-pointer transition-colors duration-fast',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                // primary-600 sur blanc = 3,66:1 — sous les 4,5 exigés pour un
                // label de 11 px (SC 1.4.3). 700 donne 5,02. Corrigé le 2026-09-16.
                active ? 'text-primary-700' : 'text-ink-600 hover:text-ink-600',
              ].join(' ')}
            >
              <span
                className={[
                  'flex items-center justify-center w-12 h-6 rounded-pill transition-all duration-base',
                  active ? 'bg-primary-100' : 'bg-transparent',
                ].join(' ')}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.25 : 1.75}
                  aria-hidden="true"
                />
              </span>
              <span
                className={[
                  'font-body text-micro',
                  active ? 'font-semibold' : 'font-normal',
                ].join(' ')}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
