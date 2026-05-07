import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableRow {
  [key: string]: React.ReactNode;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  onRowClick?: (row: DataTableRow, index: number) => void;
  pageSize?: number;
  currentPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const ALIGN: Record<NonNullable<DataTableColumn['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const PAG_BTN =
  'px-3 py-2 rounded-md border border-ink-200 bg-white text-ink-900 text-body-sm font-medium ' +
  'hover:bg-ink-50 hover:border-ink-300 transition-all cursor-pointer ' +
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  sortBy,
  sortDirection,
  onSort,
  onRowClick,
  pageSize = 10,
  currentPage = 1,
  totalRows,
  onPageChange,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}) => {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDirection }>({
    key: sortBy || '',
    dir: sortDirection || null,
  });

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    let newDir: SortDirection = 'asc';
    if (internalSort.key === key) {
      if (internalSort.dir === 'asc') newDir = 'desc';
      else if (internalSort.dir === 'desc') newDir = null;
    }

    setInternalSort({ key, dir: newDir });
    onSort?.(key, newDir);
  };

  const activeSort = sortBy || internalSort.key;
  const activeDir = sortDirection ?? internalSort.dir;
  const totalPages = Math.ceil((totalRows || rows.length) / pageSize);
  const displayedRows = rows.slice(0, pageSize);

  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
        <table className="w-full border-collapse font-body text-body-sm">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={[
                    'px-4 py-3 font-semibold text-ink-700 select-none',
                    ALIGN[column.align ?? 'left'],
                    column.sortable
                      ? 'cursor-pointer hover:bg-ink-100 transition-colors'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={column.width ? { width: column.width } : undefined}
                  onClick={() => column.sortable && handleSort(column.key)}
                  role={column.sortable ? 'button' : undefined}
                  tabIndex={column.sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      handleSort(column.key);
                    }
                  }}
                >
                  <div
                    className={[
                      'inline-flex items-center gap-1',
                      column.align === 'center' ? 'justify-center' : '',
                      column.align === 'right' ? 'justify-end' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <span>{column.label}</span>
                    {column.sortable && activeSort === column.key && (
                      <span className="inline-flex">
                        {activeDir === 'asc' ? (
                          <ChevronUp size={16} aria-label="Sort ascending" />
                        ) : (
                          <ChevronDown size={16} aria-label="Sort descending" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-ink-500">
                  Loading...
                </td>
              </tr>
            ) : displayedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-ink-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayedRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={[
                    'border-b border-ink-200 last:border-b-0 transition-colors',
                    onRowClick ? 'cursor-pointer hover:bg-ink-50' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onRowClick?.(row, rowIdx)}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      onRowClick(row, rowIdx);
                    }
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIdx}-${column.key}`}
                      className={[
                        'px-4 py-3 text-ink-900',
                        ALIGN[column.align ?? 'left'],
                      ].join(' ')}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <button
            className={PAG_BTN}
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="text-caption text-ink-500">
            Page {currentPage} of {totalPages}
          </div>

          <button
            className={PAG_BTN}
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
