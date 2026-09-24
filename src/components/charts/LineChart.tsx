import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_TOOLTIP, CHART_LEGEND, decrireSeries } from './chartTheme';

export interface LineChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface LineChartProps {
  /** Data points for the chart */
  data: LineChartDataPoint[];
  /** Single data series key */
  dataKey?: string;
  /** Multiple data series */
  series?: Array<{
    key: string;
    label: string;
    color?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }>;
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Smooth curve */
  smooth?: boolean;
  /** Show dots on data points */
  showDots?: boolean;
  /** Callback on line click */
  onPointClick?: (data: LineChartDataPoint, index: number) => void;
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

const COLOR_PALETTE = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.success,
  COLORS.danger,
  COLORS.warning,
];

/**
 * LineChart — trends over time
 * Useful for: XP progression, engagement timeline, skill growth, adoption curves
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  series,
  size = 'md',
  showLegend = true,
  smooth = true,
  showDots = true,
  onPointClick,
  className = '',
  ariaLabel,
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`w-full ${className}`}
      role="img"
      aria-label={
        ariaLabel ??
        decrireSeries('Graphique en courbes', data, series ?? [{ key: dataKey || 'value', label: 'Valeur' }])
      }
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          accessibilityLayer={false}
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          /* recharts v3 : le handler de clic vit sur le chart, pas sur <Line>.
             Il reçoit (nextState, event) et l'index du point actif est dans
             nextState.activeTooltipIndex. En v2 <Line onClick> recevait
             (data, index) — signature supprimée depuis. */
          onClick={
            onPointClick
              ? (nextState) => {
                  const i = nextState?.activeTooltipIndex;
                  if (typeof i === 'number' && data[i]) onPointClick(data[i], i);
                }
              : undefined
          }
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis
            dataKey="label"
            stroke="currentColor"
            className="text-body text-ink-600"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="currentColor"
            className="text-body text-ink-600"
            tick={{ fontSize: 12 }}
          />
          <Tooltip {...CHART_TOOLTIP} />
          {showLegend && <Legend {...CHART_LEGEND} />}

          {series ? (
            series.map((s, idx) => (
              <Line
                key={s.key}
                type={smooth ? 'monotone' : 'linear'}
                dataKey={s.key}
                name={s.label}
                stroke={s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                strokeWidth={s.strokeWidth ?? 2}
                strokeDasharray={s.strokeDasharray}
                dot={showDots}
                activeDot={{ r: 5 }}
                style={{ cursor: onPointClick ? 'pointer' : 'default' }}
              />
            ))
          ) : (
            <Line
              type={smooth ? 'monotone' : 'linear'}
              dataKey={dataKey || 'value'}
              stroke={COLORS.primary}
              strokeWidth={2}
              dot={showDots}
              activeDot={{ r: 5 }}
              style={{ cursor: onPointClick ? 'pointer' : 'default' }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
