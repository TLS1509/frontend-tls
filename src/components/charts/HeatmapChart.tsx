import React, { useMemo } from 'react';
import { CHASSE_CAPTION } from './chartTheme';

export interface HeatmapDataPoint {
  x: string;      // column label (learner name, skill, etc.)
  y: string;      // row label (team, category, etc.)
  value: number;  // 0-5 or 0-100
}

export interface HeatmapChartProps {
  /** Data points with x, y, value */
  data: HeatmapDataPoint[];
  /** Scale for coloring (0 = cold/red, 1 = hot/green) */
  minValue?: number;
  maxValue?: number;
  /** Size of cells */
  cellSize?: number;
  /** Show value in cell */
  showValues?: boolean;
  /** Callback on cell click */
  onCellClick?: (data: HeatmapDataPoint) => void;
  /** Nom accessible de la grille. */
  ariaLabel?: string;
  /** Additional CSS */
  className?: string;
}

/**
 * HeatmapChart — team skill matrix, learner performance grid
 * Useful for: team skills matrix, learner progress heatmap, course completion status
 *
 * Color scheme: Red (low) → Yellow (mid) → Green (high)
 * Values: 0-5 (Dreyfus scale) or 0-100 (percentage)
 */
export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  minValue = 0,
  maxValue = 5,
  cellSize = 48,
  showValues = true,
  onCellClick,
  ariaLabel = 'Carte de chaleur',
  className = '',
}) => {
  const { xLabels, yLabels, grid } = useMemo(() => {
    const xs = new Set<string>();
    const ys = new Set<string>();

    data.forEach((d) => {
      xs.add(d.x);
      ys.add(d.y);
    });

    const xLabels = Array.from(xs).sort();
    const yLabels = Array.from(ys).sort();

    // Create 2D grid
    const grid: Map<string, number> = new Map();
    data.forEach((d) => {
      grid.set(`${d.x}|${d.y}`, d.value);
    });

    return { xLabels, yLabels, grid };
  }, [data]);

  /* Hauteur de l'en-tête des colonnes, calculée sur le plus long libellé. Tourné
     de 45° autour de son pied, un libellé de largeur l monte de 0,71 × (l/2 + 20)
     au-dessus de son point d'ancrage ; l'en-tête faisait 40 px et le conteneur
     (`overflow-x-auto`) coupait tout ce qui dépassait — mesuré le 2026-09-24 sur
     /enterprise : « Communicat… », « Leadershi… », « Techniqu… ». */
  const hauteurEntete = useMemo(() => {
    const plusLong = Math.max(0, ...xLabels.map((x) => x.length)) * CHASSE_CAPTION;
    return Math.max(40, Math.ceil(20 + Math.SQRT1_2 * (plusLong / 2 + 20)));
  }, [xLabels]);

  // Color gradient function: 0=red, 0.5=yellow, 1=green
  const getColor = (value: number): string => {
    const normalized = (value - minValue) / (maxValue - minValue);
    const clamped = Math.max(0, Math.min(1, normalized));

    if (clamped < 0.5) {
      // Red to Yellow (0 to 0.5)
      const t = clamped * 2;
      const r = 242; // #F28559
      const g = Math.round(133 + (176 - 133) * t);
      const b = Math.round(89 + (68 - 89) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Yellow to Green (0.5 to 1)
      const t = (clamped - 0.5) * 2;
      const r = Math.round(248 - (248 - 157) * t);
      const g = Math.round(176 + (190 - 176) * t);
      const b = Math.round(68 + (186 - 68) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Toute l'échelle est claire (corail #F28559 → ambre #F8B044 → sauge #9DBEBA) :
  // le blanc y tombait à 1,86–2,54:1 sous la moitié basse, l'encre y passe partout
  // (≥ 5,7:1). Une seule couleur de label, donc : `text-ink-900` sur la cellule.

  return (
    // Groupe nommé plutôt que role="img" : la grille contient de vrais boutons,
    // qu'une image masquerait aux technologies d'assistance.
    <div role="group" aria-label={ariaLabel} className={`w-full overflow-x-auto ${className}`}>
      <div className="inline-block">
        {/* X-axis labels */}
        <div className="flex">
          <div style={{ width: 100 }} /> {/* Space for Y labels */}
          {xLabels.map((x) => (
            <div
              key={x}
              className="text-caption text-center text-ink-600"
              style={{
                width: cellSize,
                height: hauteurEntete,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 4,
              }}
              title={x}
            >
              <span style={{ transform: 'rotate(-45deg)', whiteSpace: 'nowrap', transformOrigin: 'center bottom', marginBottom: 12 }}>
                {x}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        {yLabels.map((y) => (
          <div key={y} className="flex">
            {/* Y label */}
            <div
              className="text-caption text-ink-600 flex items-center justify-end pr-3"
              style={{
                width: 100,
                height: cellSize,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={y}
            >
              {y}
            </div>

            {/* Cells */}
            {xLabels.map((x) => {
              const key = `${x}|${y}`;
              const value = grid.get(key);
              const hasValue = value !== undefined;
              const cellColor = hasValue ? getColor(value!) : '#f3f4f6';

              return (
                <button
                  key={key}
                  onClick={() => {
                    const dataPoint = data.find((d) => d.x === x && d.y === y);
                    if (dataPoint) onCellClick?.(dataPoint);
                  }}
                  /* Valeur de cellule : 13 px (`caption`) et chiffres tabulaires —
                     elle était à 12 px en style en ligne, hors échelle, et la
                     colonne des « D3 » ne s'alignait pas d'une ligne à l'autre.
                     Encre, filet et mise en page passent en classes : le style en
                     ligne ne garde que ce qui se calcule (taille, fond). Le filet
                     en ligne battait aussi `hover:border-primary-400`, qui ne
                     s'est jamais vu. */
                  className={[
                    'flex items-center justify-center p-0 border hover:border-primary-400 transition-all text-caption tabular-nums',
                    hasValue ? 'border-black/10 text-ink-900 font-semibold cursor-pointer' : 'border-ink-200 text-ink-600 font-normal cursor-default',
                  ].join(' ')}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: cellColor,
                  }}
                  disabled={!hasValue}
                >
                  {hasValue && showValues && (
                    <span title={`${value}`}>
                      {typeof value === 'number' && value <= 5 ? `D${value}` : `${Math.round(value as number)}\u202F%`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      {/* Légende : 13 px, ink-700 (cible des graphiques). Les pastilles gardent
          leur couleur calculée en style, leur filet passe au token. */}
      <div className="mt-stack flex items-center gap-stack text-caption text-ink-700 tabular-nums">
        <span className="font-semibold">Légende :</span>
        <div className="flex items-center gap-stack-xs">
          <div className="size-5 border border-ink-300" style={{ backgroundColor: getColor(minValue) }} />
          <span>{minValue}</span>
        </div>
        <div className="flex items-center gap-stack-xs">
          <div className="size-5 border border-ink-300" style={{ backgroundColor: getColor((minValue + maxValue) / 2) }} />
          <span>{Math.round((minValue + maxValue) / 2)}</span>
        </div>
        <div className="flex items-center gap-stack-xs">
          <div className="size-5 border border-ink-300" style={{ backgroundColor: getColor(maxValue) }} />
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
};
