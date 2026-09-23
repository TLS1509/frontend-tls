import React, { useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { CHART_TOOLTIP, CHART_LEGEND } from './chartTheme';

export interface RadarDataPoint {
  label: string;
  current: number; // 0–5 (Dreyfus)
  target?: number; // 0–5 (objectif)
}

export interface RadarChartProps {
  /** Données pour le radar (max 6 axes) */
  data: RadarDataPoint[];
  /** Callback quand un axe est cliqué */
  onAxisClick?: (axis: RadarDataPoint, index: number) => void;
  /** Taille du chart */
  size?: 'sm' | 'md' | 'lg';
  /** Montrer la légende */
  showLegend?: boolean;
  /** Nom accessible. Par défaut, décrit le type et les valeurs de chaque série. */
  ariaLabel?: string;
  /** Classe custom */
  className?: string;
}

const COLORS = {
  current: '#55A1B4', // primary-500
  target: '#ED843A',  // secondary-500
};

/* Les libellés d'axe se posent HORS du polygone, dans la marge latérale : avec
 * 30 px de côté, « Communication » débordait de 21 px du SVG et était coupé
 * (mesuré le 23/09 sur /coach/dashboard, panneau de 300 px). Les libellés
 * passent au corps caption (13 px, ~7 px par caractère) et la marge suit le
 * plus long d'entre eux : un radar aux libellés courts garde son rayon, un
 * radar à « Communication » réduit le sien plutôt que de couper le mot. */
const PX_PAR_CARACTERE = 6.5;
const radarMargin = (labels: string[]) => {
  const plusLong = Math.max(0, ...labels.map((l) => l.length));
  const cote = Math.min(96, Math.max(30, Math.round(plusLong * PX_PAR_CARACTERE)));
  return { top: 20, right: cote, bottom: 20, left: cote };
};

/**
 * RadarChart — charting interactif avec Recharts
 * Interactions : hover (tooltip), click sur axes, légende interactive
 */
export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  onAxisClick,
  size = 'md',
  showLegend = true,
  className = '',
  ariaLabel,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Adapter la hauteur selon la taille
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  // Préparer les données pour Recharts (format [{ name, current, target }, ...])
  const chartData = data.slice(0, 6).map((d) => ({
    name: d.label,
    current: d.current,
    target: d.target ?? 0,
  }));

  const handleAxisClick = (entry: any, index: number) => {
    setActiveIndex(index);
    onAxisClick?.(data[index], index);
  };

  const aCible = data.some((d) => d.target);
  const description =
    ariaLabel ??
    `Radar des niveaux Dreyfus, sur 5. ${chartData
      .map((d) => `${d.name} ${d.current.toLocaleString('fr-FR')}${aCible && d.target ? ` (objectif ${d.target.toLocaleString('fr-FR')})` : ''}`)
      .join(', ')}.`;

  return (
    <div className={`w-full ${className}`}>
      <div role="img" aria-label={description}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart
          accessibilityLayer={false}
          data={chartData}
          margin={radarMargin(chartData.map((d) => d.name))}
        >
          <PolarGrid
            stroke="currentColor"
            className="text-ink-200"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="name"
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            onClick={(e) => {
              const index = chartData.findIndex((d) => d.name === e.value);
              if (index >= 0) handleAxisClick(e, index);
            }}
            style={{ cursor: 'pointer' }}
            tick={/* v3: la valeur du tick vit dans payload.value, plus au premier
                     niveau. On ne spread pas props sur <text> : il porte payload /
                     tickFormatter / visibleTicksCount, non valides en SVG. */
              ({ x, y, textAnchor, payload }) => {
              const label = String(payload?.value ?? '');
              const isActive = hoveredAxis === label;
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  className={`text-caption font-semibold transition-colors ${
                    isActive ? 'fill-primary-800' : 'fill-ink-700'
                  }`}
                  onMouseEnter={() => setHoveredAxis(label)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {label}
                </text>
              );
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            stroke="currentColor"
            className="text-caption text-ink-600"
          />
          <Radar
            name="Niveau actuel"
            dataKey="current"
            stroke={COLORS.current}
            fill={COLORS.current}
            fillOpacity={0.35}
            strokeWidth={2}
          />
          {data.some((d) => d.target) && (
            <Radar
              name="Objectif cible"
              dataKey="target"
              stroke={COLORS.target}
              fill={COLORS.target}
              fillOpacity={0}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          {/* contentStyle est une prop de Tooltip, pas de Legend : le style du
              conteneur de légende passe par wrapperStyle. */}
          {showLegend && (
            <Legend {...CHART_LEGEND} />
          )}
          <Tooltip
            {...CHART_TOOLTIP}
            formatter={(value) => `D${value}`}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
      </div>

      {/* Legend textuelle pour petits écrans */}
      <div className="flex flex-wrap gap-stack-xs justify-center mt-stack-xs text-caption">
        <div className="flex items-center gap-stack-3xs">
          <div className="w-3 h-3 rounded-xs" style={{ backgroundColor: COLORS.current }} />
          <span className="text-ink-600">Niveau actuel</span>
        </div>
        {data.some((d) => d.target) && (
          <div className="flex items-center gap-stack-3xs">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: COLORS.target }}
            />
            <span className="text-ink-600">Objectif</span>
          </div>
        )}
      </div>
    </div>
  );
};
