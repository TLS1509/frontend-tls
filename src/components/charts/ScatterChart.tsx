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
import { CHART_TOOLTIP, CHART_LEGEND } from './chartTheme';

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
        <RechartsScatterChart
          accessibilityLayer={false}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisLabel || 'X'}
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            domain={xDomain}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel || 'Y'}
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            domain={yDomain}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            {...CHART_TOOLTIP}
            formatter={/* v3: Formatter reçoit ValueType | undefined, pas number */ (value) =>
              typeof value === 'number' ? value.toFixed(2) : String(value ?? '')
            }
          />
          {showLegend && <Legend {...CHART_LEGEND} />}

          <Scatter
            name="Data"
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
