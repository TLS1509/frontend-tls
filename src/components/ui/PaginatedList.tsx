import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  pageSize?: number;
  /** Label for item count — e.g. "résultats" */
  itemLabel?: string;
  className?: string;
  listClassName?: string;
}

export function PaginatedList<T>({
  items,
  renderItem,
  pageSize = 10,
  itemLabel = 'résultats',
  className = '',
  listClassName = '',
}: PaginatedListProps<T>): React.ReactElement {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = page * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const BTN =
    'inline-flex items-center justify-center w-9 h-9 rounded-pill border border-ink-200 text-ink-600 transition-all duration-fast hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 disabled:opacity-disabled disabled:cursor-not-allowed';

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      {/* List */}
      <div className={listClassName}>{pageItems.map((item, i) => renderItem(item, start + i))}</div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-stack-xs pt-3 border-t border-ink-100">
          <span className="text-caption text-ink-500 font-medium">
            {start + 1}–{Math.min(start + pageSize, items.length)} / {items.length} {itemLabel}
          </span>

          <div className="flex items-center gap-stack-xs">
            <button
              type="button"
              className={BTN}
              onClick={() => setPage((p) => p - 1)}
              disabled={!canPrev}
              aria-label="Page précédente"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page numbers — show at most 5 around current */}
            <div className="hidden sm:flex items-center gap-tight">
              {Array.from({ length: totalPages }, (_, i) => i)
                .filter((i) => Math.abs(i - page) <= 2)
                .map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-current={i === page ? 'page' : undefined}
                    className={[
                      'inline-flex items-center justify-center w-9 h-9 rounded-pill text-caption font-semibold transition-all duration-fast',
                      i === page
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'border border-ink-200 text-ink-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700',
                    ].join(' ')}
                  >
                    {i + 1}
                  </button>
                ))}
            </div>

            <span className="sm:hidden text-caption font-semibold text-ink-700">
              {page + 1} / {totalPages}
            </span>

            <button
              type="button"
              className={BTN}
              onClick={() => setPage((p) => p + 1)}
              disabled={!canNext}
              aria-label="Page suivante"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginatedList;
