import React from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeatmapRow {
  name: string;
  initials?: string;
  scores: number[]; // Dreyfus 0–5, same length as axes
}

export interface HeatmapGridProps {
  axes: string[];
  rows: HeatmapRow[];
  onCellClick?: (rowIndex: number, colIndex: number) => void;
  showLegend?: boolean;
  className?: string;
}

// ─── Score → color mapping (Dreyfus 0–5) ─────────────────────────────────────

const SCORE_CLASSES: Record<number, string> = {
  0: 'bg-ink-100 text-ink-400',
  1: 'bg-danger-bg text-danger-fg',
  2: 'bg-warning-bg text-warning-fg',
  3: 'bg-info-bg text-info-fg',
  4: 'bg-success-bg text-success-fg',
  5: 'bg-primary-600 text-white',
};

const SCORE_LABEL: Record<number, string> = {
  0: '—',
  1: 'D1',
  2: 'D2',
  3: 'D3',
  4: 'D4',
  5: 'D5',
};

const LEGEND = [
  { score: 0, label: 'Non évalué' },
  { score: 1, label: 'Novice' },
  { score: 2, label: 'Débutant avancé' },
  { score: 3, label: 'Compétent' },
  { score: 4, label: 'Performant' },
  { score: 5, label: 'Expert' },
];

// ─── HeatmapGrid ─────────────────────────────────────────────────────────────

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({
  axes,
  rows,
  onCellClick,
  showLegend = true,
  className = '',
}) => {
  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      <div className="overflow-x-auto rounded-xl border border-ink-100">
        <table className="min-w-full border-collapse">
          {/* Header row — competence axes */}
          <thead>
            <tr>
              {/* Empty corner cell */}
              <th className="sticky left-0 z-base bg-white px-4 py-3 text-left min-w-[160px] border-b border-r border-ink-100">
                <span className="text-caption font-semibold text-ink-400 uppercase tracking-wide">
                  Apprenant
                </span>
              </th>
              {axes.map((axis) => (
                <th
                  key={axis}
                  className="px-3 py-3 text-center border-b border-ink-100 min-w-[80px]"
                >
                  <span className="text-caption font-semibold text-ink-600 block whitespace-normal leading-tight max-w-[80px]">
                    {axis}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={row.name}
                className="hover:bg-ink-50 transition-colors duration-fast"
              >
                {/* Sticky name cell */}
                <td className="sticky left-0 z-base bg-white px-4 py-3 border-b border-r border-ink-100">
                  <div className="flex items-center gap-stack-xs">
                    {row.initials && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-micro font-bold shrink-0">
                        {row.initials}
                      </span>
                    )}
                    <span className="text-body-sm font-medium text-ink-900 whitespace-nowrap">
                      {row.name}
                    </span>
                  </div>
                </td>

                {/* Score cells */}
                {row.scores.map((score, colIdx) => {
                  const clampedScore = Math.min(5, Math.max(0, Math.round(score)));
                  const colorClass = SCORE_CLASSES[clampedScore] ?? SCORE_CLASSES[0];
                  const label = SCORE_LABEL[clampedScore] ?? '—';
                  const isClickable = !!onCellClick;

                  return (
                    <td
                      key={colIdx}
                      className="px-3 py-3 border-b border-ink-100 text-center"
                    >
                      <button
                        type="button"
                        onClick={isClickable ? () => onCellClick!(rowIdx, colIdx) : undefined}
                        disabled={!isClickable}
                        title={`${row.name} — ${axes[colIdx]} : ${LEGEND[clampedScore]?.label ?? '—'}`}
                        className={[
                          'inline-flex items-center justify-center w-10 h-10 rounded-md text-micro font-bold transition-all duration-fast mx-auto',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                          colorClass,
                          isClickable ? 'cursor-pointer hover:scale-110 hover:shadow-md' : 'cursor-default',
                        ].join(' ')}
                      >
                        {label}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-stack-xs">
          {LEGEND.map(({ score, label }) => (
            <div key={score} className="flex items-center gap-tight">
              <span className={['inline-flex items-center justify-center w-6 h-6 rounded text-micro font-bold', SCORE_CLASSES[score]].join(' ')}>
                {SCORE_LABEL[score]}
              </span>
              <span className="text-caption text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeatmapGrid;
