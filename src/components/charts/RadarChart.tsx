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
  /** Classe custom */
  className?: string;
}

const COLORS = {
  current: '#55A1B4', // primary-500
  target: '#ED843A',  // secondary-500
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

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
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
            tick={(props) => {
              const isActive = hoveredAxis === props.value;
              return (
                <g {...props}>
                  <text
                    {...props}
                    className={`text-body-sm font-semibold transition-all ${
                      isActive ? 'fill-primary-600' : 'fill-ink-700'
                    }`}
                    onMouseEnter={() => setHoveredAxis(props.value)}
                    onMouseLeave={() => setHoveredAxis(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {props.value}
                  </text>
                </g>
              );
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            stroke="currentColor"
            className="text-caption text-ink-400"
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
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              contentStyle={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
              }}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            formatter={(value) => `D${value}`}
            labelStyle={{ color: '#1a1a1a' }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>

      {/* Legend textuelle pour petits écrans */}
      <div className="flex flex-wrap gap-stack-xs justify-center mt-stack-xs text-caption">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-xs" style={{ backgroundColor: COLORS.current }} />
          <span className="text-ink-600">Niveau actuel</span>
        </div>
        {data.some((d) => d.target) && (
          <div className="flex items-center gap-1">
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
