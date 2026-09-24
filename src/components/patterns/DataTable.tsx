import React, { useMemo, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../core/Button';

export interface DataTableRow {
  [key: string]: React.ReactNode;
}

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  /**
   * Valeur de tri de la rangée pour cette colonne. Indispensable dès que la
   * cellule est un ReactNode (badge, barre, span stylé) : le composant ne sait
   * pas lire un nœud. Sans elle, la colonne trie sur la cellule si TOUTES les
   * cellules sont des chaînes ou des nombres — sinon elle ne trie pas et
   * n'affiche aucune affordance de tri (une flèche qui ne réordonne rien est
   * pire que pas de flèche).
   */
  sortValue?: (row: DataTableRow) => string | number | null | undefined;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  sortBy?: string;
  sortDirection?: SortDirection;
  /**
   * Si fourni, le PARENT est maître du tri : il reçoit la demande et repasse
   * des `rows` déjà triées — le composant n'y touche pas (cas de CoachDashboard).
   * Sans lui, le composant trie lui-même.
   */
  onSort?: (key: string, direction: SortDirection) => void;
  /** `index` = position de la rangée dans le tableau `rows` d'origine, pas à l'écran. */
  onRowClick?: (row: DataTableRow, index: number) => void;
  pageSize?: number;
  /** Page contrôlée (1-based). Sans elle, la pagination est interne. */
  currentPage?: number;
  /**
   * Nombre total de rangées côté serveur. S'il dépasse `rows.length`, `rows`
   * est considérée comme la page courante déjà découpée et n'est pas tranchée.
   */
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

const JUSTIFY: Record<NonNullable<DataTableColumn['align']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/** Anneau intérieur : le conteneur est en `overflow-x-auto`, un anneau décalé vers l'extérieur serait rogné. */
const FOCUS_INSET =
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink-900';

const TH_BUTTON = [
  'inline-flex w-full items-center gap-tight px-4 py-3 font-semibold text-ink-700 cursor-pointer',
  'hover:bg-ink-100 transition-colors duration-fast',
  FOCUS_INSET,
].join(' ');

const isPlain = (v: unknown): v is string | number | null | undefined =>
  v == null || typeof v === 'string' || typeof v === 'number';

const collator = (a: string, b: string) => a.localeCompare(b, 'fr', { numeric: true, sensitivity: 'base' });

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  sortBy,
  sortDirection,
  onSort,
  onRowClick,
  pageSize = 10,
  currentPage,
  totalRows,
  onPageChange,
  loading = false,
  emptyMessage = 'Aucune donnée',
  className = '',
}) => {
  const [internalSort, setInternalSort] = useState<{ key: string; dir: SortDirection }>({
    key: sortBy || '',
    dir: sortDirection || null,
  });
  const [internalPage, setInternalPage] = useState(1);

  const activeSort = sortBy ?? internalSort.key;
  const activeDir = sortDirection !== undefined ? sortDirection : internalSort.dir;

  /** Lecteur de valeur de tri par colonne, ou `null` si la colonne ne peut pas trier. */
  const sortReaders = useMemo(() => {
    const map: Record<string, ((row: DataTableRow) => string | number | null | undefined) | null> = {};
    for (const col of columns) {
      if (!col.sortable) map[col.key] = null;
      else if (col.sortValue) map[col.key] = col.sortValue;
      else if (onSort) map[col.key] = (row) => row[col.key] as string | number | null | undefined;
      else if (rows.every((r) => isPlain(r[col.key]))) map[col.key] = (row) => row[col.key] as string | number | null | undefined;
      else map[col.key] = null;
    }
    return map;
  }, [columns, rows, onSort]);

  const canSort = (key: string) => sortReaders[key] != null;

  const handleSort = (key: string) => {
    if (!canSort(key)) return;
    let newDir: SortDirection = 'asc';
    if (activeSort === key) {
      if (activeDir === 'asc') newDir = 'desc';
      else if (activeDir === 'desc') newDir = null;
    }
    setInternalSort({ key, dir: newDir });
    if (currentPage === undefined) setInternalPage(1);
    else onPageChange?.(1);
    onSort?.(key, newDir);
  };

  // Rangées indexées sur leur position d'origine : la clé React et l'index
  // rendu à `onRowClick` restent stables quel que soit le tri.
  const sortedRows = useMemo(() => {
    const indexed = rows.map((row, index) => ({ row, index }));
    const read = activeSort ? sortReaders[activeSort] : null;
    if (onSort || !read || !activeDir) return indexed;
    const sign = activeDir === 'asc' ? 1 : -1;
    return indexed.sort((a, b) => {
      const va = read(a.row);
      const vb = read(b.row);
      // Les cellules vides vont en fin de liste, quel que soit le sens.
      if (va == null || va === '') return vb == null || vb === '' ? a.index - b.index : 1;
      if (vb == null || vb === '') return -1;
      const cmp =
        typeof va === 'number' && typeof vb === 'number' ? va - vb : collator(String(va), String(vb));
      return cmp !== 0 ? sign * cmp : a.index - b.index;
    });
  }, [rows, activeSort, activeDir, sortReaders, onSort]);

  const serverPaged = totalRows !== undefined && totalRows > rows.length;
  const total = totalRows ?? rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, currentPage ?? internalPage), totalPages);
  const displayedRows = serverPaged
    ? sortedRows
    : sortedRows.slice((page - 1) * pageSize, page * pageSize);

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    if (currentPage === undefined) setInternalPage(clamped);
    onPageChange?.(clamped);
  };

  const hasSortable = columns.some((c) => canSort(c.key));

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      <div className="overflow-x-auto rounded-lg border border-ink-200 bg-white">
        <table className="w-full border-collapse font-body text-body">
          {hasSortable && (
            // Motif APG « Sortable Table » : la légende annonce que les en-têtes à bouton trient.
            <caption className="sr-only">Les en-têtes munis d'un bouton permettent de trier la colonne.</caption>
          )}
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {columns.map((column) => {
                const align = column.align ?? 'left';
                const sortable = canSort(column.key);
                const isActive = sortable && activeSort === column.key && activeDir != null;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    // aria-sort n'est posé que sur la colonne triée : sa valeur par défaut est
                    // déjà « none », et ARIA demande qu'un seul en-tête le porte à la fois.
                    aria-sort={isActive ? (activeDir === 'asc' ? 'ascending' : 'descending') : undefined}
                    className={[
                      'font-semibold text-ink-700 select-none',
                      ALIGN[align],
                      sortable ? 'p-0' : 'px-4 py-3',
                    ].join(' ')}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className={[TH_BUTTON, JUSTIFY[align]].join(' ')}
                        onClick={() => handleSort(column.key)}
                      >
                        <span>{column.label}</span>
                        <span aria-hidden="true" className={isActive ? 'inline-flex text-ink-900' : 'inline-flex text-ink-500'}>
                          {!isActive ? (
                            <ChevronsUpDown size={14} />
                          ) : activeDir === 'asc' ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-section text-center text-ink-600" aria-live="polite">
                  Chargement…
                </td>
              </tr>
            ) : displayedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-section text-center text-ink-600">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayedRows.map(({ row, index }) => (
                // Rangée cliquable : elle reste une vraie rangée de tableau (pas de
                // role="button", qui effacerait la structure lignes/colonnes pour
                // un lecteur d'écran). L'activation clavier passe par tabIndex +
                // Entrée/Espace, filtrés sur la rangée elle-même pour ne pas
                // doubler l'action d'un bouton posé dans une cellule.
                <tr
                  key={index}
                  className={[
                    'border-b border-ink-200 last:border-b-0 transition-colors',
                    onRowClick ? `cursor-pointer hover:bg-ink-50 ${FOCUS_INSET}` : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.target !== e.currentTarget) return;
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onRowClick(row, index);
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column.key}`}
                      className={['px-4 py-3 text-ink-900', ALIGN[column.align ?? 'left']].join(' ')}
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
        <nav aria-label="Pagination du tableau" className="flex items-center justify-between gap-stack-xs">
          <Button
            emphasis="outline"
            size="sm"
            leadingIcon={<ChevronLeft size={14} />}
            onClick={() => goTo(page - 1)}
            disabled={page <= 1}
          >
            Précédent
          </Button>

          <p className="text-caption text-ink-600 tabular-nums" aria-live="polite">
            Page {page} sur {totalPages}
          </p>

          <Button
            emphasis="outline"
            size="sm"
            trailingIcon={<ChevronRight size={14} />}
            onClick={() => goTo(page + 1)}
            disabled={page >= totalPages}
          >
            Suivant
          </Button>
        </nav>
      )}
    </div>
  );
};

export default DataTable;
