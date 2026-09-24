import React from 'react';

export type ColumnAlign = 'left' | 'center' | 'right';

export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: ColumnAlign;
  /** Tailwind width class, e.g. 'w-24' or 'w-1/3' */
  width?: string;
}

export interface SimpleTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  /** Return a unique stable key for each row */
  keyExtractor: (row: T, index: number) => string;
  /** Alternate row background */
  striped?: boolean;
  /** Make rows clickable */
  onRowClick?: (row: T) => void;
  /** Message shown when rows is empty */
  emptyLabel?: string;
  caption?: string;
  className?: string;
}

const ALIGN_TH: Record<ColumnAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

/* Colonne à droite = colonne de chiffres : `tabular-nums` (doctrine § 3). */
const ALIGN_TD: Record<ColumnAlign, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right tabular-nums',
};

/* Le même retrait pour l'en-tête et les cellules : un seul bord gauche. */
const CELL_PAD = 'px-stack py-stack-sm';

export function SimpleTable<T>({
  columns,
  rows,
  keyExtractor,
  striped = false,
  onRowClick,
  emptyLabel = 'Aucun résultat',
  caption,
  className = '',
}: SimpleTableProps<T>): React.ReactElement {
  const clickable = Boolean(onRowClick);

  return (
    <div className={['w-full overflow-x-auto rounded-xl border border-ink-200', className].filter(Boolean).join(' ')}>
      <table className="w-full text-body font-body border-collapse">
        {caption && (
          <caption className="text-caption text-ink-600 text-left px-stack py-stack-xs">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-ink-50 border-b border-ink-200">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={[
                  /* En-tête 13/600 ink-600, en casse normale : les capitales
                     espacées sont le registre de Badge (un état), pas celui
                     d'un nom de colonne. */
                  `${CELL_PAD} text-caption font-semibold text-ink-600 whitespace-nowrap`,
                  ALIGN_TH[col.align ?? 'left'],
                  col.width,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-stack py-section-lg text-center text-body text-ink-600 italic"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row, rowIdx)}
                onClick={clickable ? () => onRowClick!(row) : undefined}
                className={[
                  'border-b border-ink-100 last:border-0 transition-colors duration-fast',
                  striped && rowIdx % 2 === 1 ? 'bg-ink-50/50' : 'bg-white',
                  clickable ? 'cursor-pointer hover:bg-primary-50/40' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      `${CELL_PAD} text-ink-900`,
                      ALIGN_TD[col.align ?? 'left'],
                      col.width,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTable;
