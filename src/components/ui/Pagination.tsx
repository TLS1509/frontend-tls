import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination — numbered navigation for long lists.
 */

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

const BTN_BASE =
  'inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-md border text-body-sm font-medium font-body cursor-pointer transition-all ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

const BTN_DEFAULT =
  'bg-white border-ink-200 text-ink-900 hover:bg-ink-50 hover:border-ink-300 hover:text-primary-700';

const BTN_ACTIVE =
  'bg-primary-600 border-primary-600 text-white font-semibold shadow-brand-xs cursor-default hover:bg-primary-600 hover:border-primary-600';

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
    'flex items-center justify-center flex-wrap gap-2 font-body',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <nav aria-label="Pagination" style={{ display: 'contents' }}>
        <button
          type="button"
          onClick={go(page - 1)}
          disabled={page === 1}
          aria-label="Page précédente"
          className={`${BTN_BASE} ${BTN_DEFAULT}`}
        >
          <ChevronLeft size={16} strokeWidth={2.25} />
        </button>

        {pages.map((p, i) =>
          p === 'dots' ? (
            <span
              key={`dots-${i}`}
              aria-hidden="true"
              className="inline-flex items-center justify-center min-w-10 h-10 text-body-sm text-ink-400 select-none"
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
          className={`${BTN_BASE} ${BTN_DEFAULT}`}
        >
          <ChevronRight size={16} strokeWidth={2.25} />
        </button>
      </nav>
      {info && (
        <span className="w-full text-center text-caption text-ink-500 mt-2">{info}</span>
      )}
    </div>
  );
};

export default Pagination;
