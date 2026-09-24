import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CHART_AXIS, CHART_AXIS_LABEL_CLASS, CHART_TOOLTIP, CHART_LEGEND } from './chartTheme';

export interface ScatterChartDataPoint {
  label: string;
  x: number;
  y: number;
  z?: number; // bubble size (optional)
  color?: string;
}

export interface ScatterChartProps {
  /** Data points with x, y coordinates */
  data: ScatterChartDataPoint[];
  /** X axis label */
  xAxisLabel?: string;
  /** Y axis label */
  yAxisLabel?: string;
  /** Domain for X axis */
  xDomain?: [number, number];
  /** Domain for Y axis */
  yDomain?: [number, number];
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Bubble size scale (for z values) */
  bubbleScale?: number;
  /** Callback on dot click */
  onDotClick?: (data: ScatterChartDataPoint, index: number) => void;
  /** Nom accessible. Par défaut, décrit le type et les valeurs de chaque série. */
  ariaLabel?: string;
  /** Additional CSS */
  className?: string;
}

const COLORS = {
  primary: '#55A1B4',     // primary-500
  secondary: '#ED843A',   // secondary-500
  success: '#9DBEBA',     // success-base
  danger: '#F28559',      // danger-base
  warning: '#F8B044',     // accent-400 (sun)
  info: '#55A1B4',        // primary-500
};

const arrondi = (v: number) => Math.round(v).toLocaleString('fr-FR');

/**
 * ScatterChart — correlation and distribution analysis
 * Useful for: skill vs engagement, learner performance matrix, team comparison
 */
export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  xAxisLabel,
  yAxisLabel,
  xDomain,
  yDomain,
  size = 'md',
  showLegend = true,
  bubbleScale = 3,
  onDotClick,
  className = '',
  ariaLabel,
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  // Prepare data with defaults
  const chartData = data.map((d) => ({
    ...d,
    color: d.color || COLORS.primary,
    z: d.z ?? 100, // default bubble size
  }));

  const prefersReducedMotion = useReducedMotion();

  const nomX = xAxisLabel ?? 'x';
  const nomY = yAxisLabel ?? 'y';
  const description =
    ariaLabel ??
    `Nuage de points, ${data.length} points. ${data
      .slice(0, 12)
      .map((d) => `${d.label} : ${nomX} ${d.x.toLocaleString('fr-FR')}, ${nomY} ${d.y.toLocaleString('fr-FR')}`)
      .join(' ; ')}${data.length > 12 ? ' ; …' : ''}.`;

  return (
    <motion.div
      className={`w-full ${className}`}
      role="img"
      aria-label={description}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        {/* Titres d'axe dessinés depuis le 2026-09-24 : `xAxisLabel` et
            `yAxisLabel` n'alimentaient que l'info-bulle et le nom accessible —
            sur /coach/dashboard, rien ne disait quel axe portait la compétence
            et lequel l'engagement. Même habillage que ComposedChart : 13 px
            ink-600, le titre vertical à gauche des graduations, l'horizontal
            sous elles. L'axe horizontal s'agrandit pour le loger : Recharts
            pose la légende juste sous la boîte de l'axe, et un titre placé
            hors de cette boîte tombait dans la légende. */}
        <RechartsScatterChart
          accessibilityLayer={false}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis
            type="number"
            dataKey="x"
            name={nomX}
            {...CHART_AXIS}
            domain={xDomain}
            height={xAxisLabel ? 52 : undefined}
            label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: 8, className: CHART_AXIS_LABEL_CLASS } : undefined}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={nomY}
            {...CHART_AXIS}
            domain={yDomain}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', className: CHART_AXIS_LABEL_CLASS } : undefined}
          />
          {/* Info-bulle écrite ici plutôt que celle de Recharts (2026-09-23) : un
              nuage de points n'a pas d'axe de catégories, donc pas de « label »
              à passer à `labelFormatter` — l'info-bulle par défaut ne disait pas
              de QUI était le point (sur /coach/dashboard, le nom de l'apprenant)
              et écrivait « 64.00 » pour 64. Elle montre maintenant le libellé du
              point, puis chaque valeur arrondie derrière le nom de son axe.
              Même boîte que les autres graphiques : les objets de style de
              CHART_TOOLTIP, pas une copie en classes qui pourrait diverger. */}
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              const point = active ? (payload?.[0]?.payload as ScatterChartDataPoint | undefined) : undefined;
              if (!point) return null;
              return (
                <div style={{ whiteSpace: 'nowrap', ...CHART_TOOLTIP.contentStyle }}>
                  <p style={{ margin: 0, ...CHART_TOOLTIP.labelStyle }}>{point.label}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <li style={CHART_TOOLTIP.itemStyle}>{nomX} : {arrondi(point.x)}</li>
                    <li style={CHART_TOOLTIP.itemStyle}>{nomY} : {arrondi(point.y)}</li>
                  </ul>
                </div>
              );
            }}
          />
          {showLegend && <Legend {...CHART_LEGEND} />}

          <Scatter
            name="Données"
            data={chartData}
            fill={COLORS.primary}
            onClick={(_, index) => onDotClick?.(data[index], index)}
            style={{ cursor: onDotClick ? 'pointer' : 'default' }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                r={Math.sqrt(entry.z! / Math.PI) * bubbleScale}
              />
            ))}
          </Scatter>
        </RechartsScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
