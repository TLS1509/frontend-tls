/**
 * DataTable — Design System Pattern
 *
 * Responsive sortable/paginated table with consistent styling.
 * Features: column sorting, pagination, hover effects, mobile stack.
 *
 * Usage:
 *   <DataTable
 *     columns={[
 *       { key: 'name', label: 'Name', sortable: true },
 *       { key: 'email', label: 'Email' }
 *     ]}
 *     rows={[
 *       { name: 'John', email: 'john@example.com' }
 *     ]}
 *     onSort={(key, direction) => console.log(key, direction)}
 *   />
 */

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './DataTable.css';

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
    <div className={`datatable ${className}`}>
      <div className="datatable__wrapper">
        <table className="datatable__table">
          <thead className="datatable__header">
            <tr className="datatable__header-row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`datatable__header-cell datatable__header-cell--${
                    column.align || 'left'
                  }${column.sortable ? ' datatable__header-cell--sortable' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  role={column.sortable ? 'button' : undefined}
                  tabIndex={column.sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      column.sortable &&
                      (e.key === 'Enter' || e.key === ' ')
                    ) {
                      handleSort(column.key);
                    }
                  }}
                >
                  <div className="datatable__header-content">
                    <span>{column.label}</span>
                    {column.sortable && activeSort === column.key && (
                      <span className="datatable__sort-indicator">
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

          <tbody className="datatable__body">
            {loading ? (
              <tr className="datatable__row datatable__row--loading">
                <td colSpan={columns.length} className="datatable__cell">
                  <div className="datatable__loading">Loading...</div>
                </td>
              </tr>
            ) : displayedRows.length === 0 ? (
              <tr className="datatable__row datatable__row--empty">
                <td colSpan={columns.length} className="datatable__cell">
                  <div className="datatable__empty">{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              displayedRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`datatable__row${onRowClick ? ' datatable__row--clickable' : ''}`}
                  onClick={() => onRowClick?.(row, rowIdx)}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (
                      onRowClick &&
                      (e.key === 'Enter' || e.key === ' ')
                    ) {
                      onRowClick(row, rowIdx);
                    }
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={`${rowIdx}-${column.key}`}
                      className={`datatable__cell datatable__cell--${
                        column.align || 'left'
                      }`}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="datatable__pagination">
          <button
            className="datatable__pagination-button"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="datatable__pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="datatable__pagination-button"
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
