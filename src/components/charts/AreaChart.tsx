import React, { useReducedMotion } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface AreaChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface AreaChartProps {
  /** Data points for the chart */
  data: AreaChartDataPoint[];
  /** Single data series key */
  dataKey?: string;
  /** Multiple data series (stacked) */
  series?: Array<{
    key: string;
    label: string;
    color?: string;
  }>;
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Stack areas */
  stacked?: boolean;
  /** Smooth curve */
  smooth?: boolean;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
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
 * AreaChart — cumulative trends and distribution
 * Useful for: total hours, cumulative XP, category breakdown over time, engagement distribution
 */
export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  series,
  size = 'md',
  showLegend = true,
  stacked = true,
  smooth = true,
  fillOpacity = 0.3,
  className = '',
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <defs>
            {series && series.map((s, idx) => (
              <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]} stopOpacity={0.1} />
              </linearGradient>
            ))}
            {!series && (
              <linearGradient id="gradient-default" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis
            dataKey="label"
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            tick={{ fontSize: 12 }}
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
              <Area
                key={s.key}
                type={smooth ? 'monotone' : 'linear'}
                dataKey={s.key}
                name={s.label}
                stackId={stacked ? 'stack' : undefined}
                stroke={s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length]}
                fill={`url(#gradient-${s.key})`}
                fillOpacity={fillOpacity}
              />
            ))
          ) : (
            <Area
              type={smooth ? 'monotone' : 'linear'}
              dataKey={dataKey || 'value'}
              stroke={COLORS.primary}
              fill="url(#gradient-default)"
              fillOpacity={fillOpacity}
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
