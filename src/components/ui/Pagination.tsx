import React from 'react';

/**
 * Pagination — Source of truth: design-system/spec.json → components.Pagination
 *
 * Numbered navigation for long lists. Default pattern: first, prev, pages
 * (with dots collapse), next, last. Use loadMore for feeds, infinite for activity.
 */

export interface PaginationProps {
  /** 1-based current page */
  page: number;
  /** Total number of pages */
  totalPages: number;
  onChange: (page: number) => void;
  /** How many sibling pages to show around current */
  siblings?: number;
  /** Informational text (e.g. "1–20 sur 240") — rendered below/beside */
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

  return (
    <div className={['pager', className].filter(Boolean).join(' ')}>
      <nav aria-label="Pagination" style={{ display: 'contents' }}>
        <button
          type="button"
          onClick={go(page - 1)}
          disabled={page === 1}
          aria-label="Page précédente"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          p === 'dots' ? (
            <span key={`dots-${i}`} className="pager__dots" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={go(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p}`}
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
        >
          ›
        </button>
      </nav>
      {info && <span className="pager-info">{info}</span>}
    </div>
  );
};

export default Pagination;
