import React, { useMemo } from 'react';

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

  const getLabelColor = (value: number): string => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return normalized > 0.5 ? '#1a1a1a' : '#ffffff';
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="inline-block">
        {/* X-axis labels */}
        <div className="flex">
          <div style={{ width: 100 }} /> {/* Space for Y labels */}
          {xLabels.map((x) => (
            <div
              key={x}
              className="text-caption font-semibold text-center text-ink-700"
              style={{
                width: cellSize,
                height: 40,
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
              className="text-caption font-semibold text-ink-700 flex items-center justify-end pr-3"
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
                  className="border border-ink-200 hover:border-primary-400 transition-all"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: cellColor,
                    color: hasValue ? getLabelColor(value!) : '#9ca3af',
                    fontSize: '12px',
                    fontWeight: hasValue ? '600' : '400',
                    cursor: hasValue ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    border: hasValue ? '1px solid rgba(0,0,0,0.1)' : '1px solid #e5e7eb',
                  }}
                  disabled={!hasValue}
                >
                  {hasValue && showValues && (
                    <span title={`${value}`}>
                      {typeof value === 'number' && value <= 5 ? `D${value}` : `${Math.round(value as number)}%`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-stack flex items-center gap-stack-xs text-caption text-ink-600">
        <span className="font-semibold">Légende:</span>
        <div className="flex items-center gap-1">
          <div style={{ width: 20, height: 20, backgroundColor: getColor(minValue), border: '1px solid #ccc' }} />
          <span>{minValue}</span>
        </div>
        <div className="flex items-center gap-1">
          <div style={{ width: 20, height: 20, backgroundColor: getColor((minValue + maxValue) / 2), border: '1px solid #ccc' }} />
          <span>{Math.round((minValue + maxValue) / 2)}</span>
        </div>
        <div className="flex items-center gap-1">
          <div style={{ width: 20, height: 20, backgroundColor: getColor(maxValue), border: '1px solid #ccc' }} />
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
};
