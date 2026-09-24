import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblings?: number;
  info?: React.ReactNode;
  className?: string;
}

const buildPages = (page: number, totalPages: number, siblings: number): (number | 'dots')[] => {
  const pages: (number | 'dots')[] = [];
  const first = 1;
  const last = totalPages;

  if (totalPages <= 7 + siblings * 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  const leftBoundary = Math.max(page - siblings, first + 1);
  const rightBoundary = Math.min(page + siblings, last - 1);

  pages.push(first);
  if (leftBoundary > first + 1) pages.push('dots');
  for (let i = leftBoundary; i <= rightBoundary; i++) pages.push(i);
  if (rightBoundary < last - 1) pages.push('dots');
  pages.push(last);

  return pages;
};

/* 44 × 44 (le `md` de l'arbitrage n°22) et rayon 14 : un bouton de page est
   un contrôle interactif au-dessus du seuil de 28 px, donc l'échelle (R3). Il
   portait 20, le rayon des CARTES — une pastille presque ronde, ni bouton ni
   cercle. Numéros à 16 / 600 à tous les états ; la page active se dit par
   l'aplat, plus par un gras ni un `scale-105` qui la faisait déborder de la
   rangée (46,2 px quand ses voisines en font 44). */
const BTN_BASE =
  'inline-flex items-center justify-center min-w-11 h-11 px-stack-sm rounded-lg border text-body font-semibold font-body tabular-nums cursor-pointer transition-all ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

const BTN_DEFAULT =
  'bg-white border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-ink-300 hover:text-primary-800';

const BTN_NAV =
  'bg-white border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-ink-300 hover:text-primary-800';

/* Page active : le NUMÉRO est du texte (16 px), pas une icône — il lui faut
   4,5:1 sur l'arrêt le plus clair. Parti du 600, il mesurait 3,66 ; dégradé
   700→800 : 5,02 → 7,08 (corrigé le 2026-09-23). */
const BTN_ACTIVE =
  'bg-gradient-to-br from-primary-700 to-primary-800 border-transparent text-white shadow-brand-sm cursor-default ring-2 ring-primary-100';

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  siblings = 1,
  info,
  className = '',
}) => {
  if (totalPages <= 1) return null;
  const pages = buildPages(page, totalPages, siblings);

  const go = (p: number) => () => {
    if (p >= 1 && p <= totalPages && p !== page) onChange(p);
  };

  const wrapperClasses = [
    'flex flex-col items-center gap-stack-xs font-body',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <nav aria-label="Pagination" className="flex items-center justify-center flex-wrap gap-stack-2xs">
        <button
          type="button"
          onClick={go(page - 1)}
          disabled={page === 1}
          aria-label="Page précédente"
          className={`${BTN_BASE} ${BTN_NAV}`}
        >
          <ChevronLeft size={18} strokeWidth={2.25} />
        </button>

        {pages.map((p, i) =>
          p === 'dots' ? (
            <span
              key={`dots-${i}`}
              aria-hidden="true"
              className="inline-flex items-center justify-center min-w-11 h-11 text-body font-semibold text-ink-600 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={go(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p}`}
              className={`${BTN_BASE} ${p === page ? BTN_ACTIVE : BTN_DEFAULT}`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={go(page + 1)}
          disabled={page === totalPages}
          aria-label="Page suivante"
          className={`${BTN_BASE} ${BTN_NAV}`}
        >
          <ChevronRight size={18} strokeWidth={2.25} />
        </button>
      </nav>
      {info && <span className="text-caption text-ink-600">{info}</span>}
    </div>
  );
};

export default Pagination;
