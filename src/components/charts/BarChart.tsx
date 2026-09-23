import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CHART_TOOLTIP, CHART_LEGEND, decrireSeries } from './chartTheme';

export interface BarChartDataPoint {
  label: string;
  [key: string]: string | number; // e.g. value1, value2, etc.
}

export interface BarChartProps {
  /** Data points for the chart */
  data: BarChartDataPoint[];
  /**
   * Data key to display. Optionnel : quand `series` est fourni, le rendu passe
   * par la branche multi-séries et `dataKey` n'est jamais lu (voir le ternaire
   * `series ? … : <Bar dataKey={dataKey}/>`). Le type le déclarait requis, ce
   * qui contredisait ce comportement et sa propre documentation.
   */
  dataKey?: string;
  /** Multiple data series to compare */
  series?: Array<{
    key: string;
    label: string;
    color?: string;
  }>;
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Horizontal layout */
  layout?: 'vertical' | 'horizontal';
  /** Callback on bar click */
  onBarClick?: (data: BarChartDataPoint, index: number) => void;
  /** Show export button */
  showExport?: boolean;
  /** Export filename prefix */
  exportFilename?: string;
  /** Nom accessible. Par défaut, décrit le type et les valeurs de chaque série. */
  ariaLabel?: string;
  /** Additional CSS */
  className?: string;
  /** Chart element ID for exports */
  chartId?: string;
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
 * BarChart — horizontal/vertical bar comparisons
 * Useful for: learner rankings, team comparisons, category breakdowns
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  series,
  size = 'md',
  showLegend = true,
  layout = 'horizontal',
  onBarClick,
  showExport = false,
  exportFilename = 'bar-chart',
  className = '',
  chartId = 'bar-chart',
  ariaLabel,
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];
  const prefersReducedMotion = useReducedMotion();

  const isVertical = layout === 'horizontal'; // default recharts naming

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {showExport && (
        <div className="flex justify-end">
          <div id={`${chartId}-export`}>
            {/* Export button will be added via ChartExportButton wrapper */}
          </div>
        </div>
      )}
      <motion.div
        className="w-full"
        id={chartId}
        role="img"
        aria-label={
          ariaLabel ??
          decrireSeries('Graphique en barres', data, series ?? [{ key: dataKey ?? 'value', label: 'Valeur' }])
        }
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          accessibilityLayer={false}
          data={data}
          layout={isVertical ? 'vertical' : 'horizontal'}
          margin={{ top: 20, right: 30, bottom: 20, left: isVertical ? 150 : 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis type={isVertical ? 'number' : 'category'} stroke="currentColor" className="text-body-sm text-ink-600" />
          <YAxis
            type={isVertical ? 'category' : 'number'}
            dataKey={isVertical ? 'label' : undefined}
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            width={isVertical ? 140 : undefined}
          />
          <Tooltip {...CHART_TOOLTIP} />
          {showLegend && <Legend {...CHART_LEGEND} />}

          {series ? (
            series.map((s, idx) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                onClick={(_, index) => onBarClick?.(data[index], index)}
                style={{ cursor: onBarClick ? 'pointer' : 'default' }}
              />
            ))
          ) : (
            <Bar
              dataKey={dataKey}
              fill={COLORS.primary}
              onClick={(_, index) => onBarClick?.(data[index], index)}
              style={{ cursor: onBarClick ? 'pointer' : 'default' }}
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
