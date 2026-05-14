import React, { useMemo } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RadarAxis {
  label: string;
  current: number;   // 0–5 (Dreyfus scale)
  target?: number;   // 0–5 (objectif cible, optionnel)
}

export type RadarSize = 'sm' | 'md' | 'lg';

export interface CompetencyRadarProps {
  /** Up to 6 axes */
  axes: RadarAxis[];
  size?: RadarSize;
  showLegend?: boolean;
  showLabels?: boolean;
  /** Fired when clicking on an axis label */
  onAxisClick?: (axis: RadarAxis, index: number) => void;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_PX: Record<RadarSize, number> = { sm: 200, md: 320, lg: 480 };
const LEVELS = 5; // Dreyfus 1–5

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Returns [x, y] for a point at `angle` (radians) and `r` from center */
const polar = (cx: number, cy: number, r: number, angle: number): [number, number] => [
  cx + r * Math.cos(angle),
  cy + r * Math.sin(angle),
];

/** Angles for N axes, starting at top (−π/2) */
const axisAngles = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => (-Math.PI / 2) + (i * 2 * Math.PI) / n);

/** Build an SVG polygon `points` string from an array of [x,y] tuples */
const toPoints = (pts: [number, number][]): string =>
  pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Dreyfus level ring labels (1–5) on each spoke */
const LevelRings: React.FC<{
  cx: number; cy: number; maxR: number; n: number;
}> = ({ cx, cy, maxR, n }) => {
  const angles = axisAngles(n);
  return (
    <>
      {Array.from({ length: LEVELS }, (_, lvl) => {
        const r = (maxR / LEVELS) * (lvl + 1);
        const pts = angles.map((a) => polar(cx, cy, r, a));
        return (
          <polygon
            key={lvl}
            points={toPoints(pts)}
            fill="none"
            stroke="currentColor"
            strokeWidth={lvl === LEVELS - 1 ? 1.5 : 0.75}
            className="text-ink-200"
            strokeDasharray={lvl === LEVELS - 1 ? undefined : '3 3'}
          />
        );
      })}
    </>
  );
};

// ─── CompetencyRadar ──────────────────────────────────────────────────────────

export const CompetencyRadar: React.FC<CompetencyRadarProps> = ({
  axes,
  size = 'md',
  showLegend = true,
  showLabels = true,
  onAxisClick,
  className = '',
}) => {
  const px = SIZE_PX[size];
  const cx = px / 2;
  const cy = px / 2;
  // Reserve space for labels: padding scales with size
  const labelPad = size === 'sm' ? 28 : size === 'md' ? 36 : 48;
  const maxR = (px / 2) - labelPad;

  const n = Math.min(axes.length, 6);
  const angles = useMemo(() => axisAngles(n), [n]);

  // Points for current level polygon
  const currentPts = useMemo(
    () =>
      axes.slice(0, n).map((axis, i) => {
        const r = (maxR / LEVELS) * Math.max(0, Math.min(axis.current, LEVELS));
        return polar(cx, cy, r, angles[i]);
      }),
    [axes, n, angles, cx, cy, maxR]
  );

  // Points for target polygon (if any axis has a target)
  const hasTarget = axes.slice(0, n).some((a) => a.target !== undefined);
  const targetPts = useMemo(
    () =>
      axes.slice(0, n).map((axis, i) => {
        const lvl = axis.target ?? axis.current;
        const r = (maxR / LEVELS) * Math.max(0, Math.min(lvl, LEVELS));
        return polar(cx, cy, r, angles[i]);
      }),
    [axes, n, angles, cx, cy, maxR]
  );

  // Font size for labels
  const labelFontSize = size === 'sm' ? 9 : size === 'md' ? 11 : 14;

  return (
    <div className={`flex flex-col items-center gap-stack-xs ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        role="img"
        aria-label="Radar de compétences Dreyfus"
        className="overflow-visible"
      >
        {/* Background rings */}
        <LevelRings cx={cx} cy={cy} maxR={maxR} n={n} />

        {/* Axis spokes */}
        {angles.map((angle, i) => {
          const [x, y] = polar(cx, cy, maxR, angle);
          return (
            <line
              key={`spoke-${i}`}
              x1={cx} y1={cy}
              x2={x} y2={y}
              stroke="currentColor"
              strokeWidth={0.75}
              className="text-ink-200"
            />
          );
        })}

        {/* Target polygon (dashed, warm) */}
        {hasTarget && (
          <polygon
            points={toPoints(targetPts)}
            fill="rgba(237, 132, 58, 0.08)"
            stroke="rgba(237, 132, 58, 0.6)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}

        {/* Current level polygon */}
        <polygon
          points={toPoints(currentPts)}
          fill="rgba(85, 161, 180, 0.18)"
          stroke="rgb(74, 143, 161)"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Current level dots */}
        {currentPts.map(([x, y], i) => (
          <circle key={`dot-${i}`} cx={x} cy={y} r={size === 'sm' ? 3 : 4} fill="rgb(74, 143, 161)" />
        ))}

        {/* Axis labels */}
        {showLabels &&
          axes.slice(0, n).map((axis, i) => {
            const angle = angles[i];
            const [x, y] = polar(cx, cy, maxR + (size === 'sm' ? 16 : 20), angle);
            const anchor =
              Math.abs(x - cx) < 2 ? 'middle'
              : x > cx ? 'start'
              : 'end';
            const isClickable = !!onAxisClick;
            return (
              <text
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={labelFontSize}
                fontFamily="var(--font-body)"
                fontWeight={500}
                fill="rgb(55, 65, 81)"
                className={isClickable ? 'cursor-pointer hover:fill-primary-600' : ''}
                onClick={isClickable ? () => onAxisClick(axis, i) : undefined}
                role={isClickable ? 'button' : undefined}
                aria-label={isClickable ? `Voir détail : ${axis.label}` : undefined}
              >
                {axis.label}
              </text>
            );
          })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={2.5} fill="rgb(74, 143, 161)" opacity={0.5} />
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center gap-section justify-center flex-wrap">
          <div className="flex items-center gap-stack-xs">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: 'rgba(85, 161, 180, 0.5)', border: '2px solid rgb(74, 143, 161)' }}
            />
            <span className="text-micro text-ink-600">Niveau actuel</span>
          </div>
          {hasTarget && (
            <div className="flex items-center gap-stack-xs">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: 'rgba(237, 132, 58, 0.12)', border: '2px dashed rgba(237, 132, 58, 0.7)' }}
              />
              <span className="text-micro text-ink-600">Objectif cible</span>
            </div>
          )}
          <div className="flex items-center gap-stack-xs">
            <span className="text-micro text-ink-400">Échelle Dreyfus 1–5</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetencyRadar;
