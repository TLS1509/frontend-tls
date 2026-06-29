import React, { useReducedMotion } from 'react';
import { motion } from 'framer-motion';
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

export interface BarChartDataPoint {
  label: string;
  [key: string]: string | number; // e.g. value1, value2, etc.
}

export interface BarChartProps {
  /** Data points for the chart */
  data: BarChartDataPoint[];
  /** Data key to display (if multiple series, pass series array instead) */
  dataKey: string;
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
  className = '',
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];
  const prefersReducedMotion = useReducedMotion();

  const isVertical = layout === 'horizontal'; // default recharts naming

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
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
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            labelStyle={{ color: '#1a1a1a' }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}

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
  );
};
