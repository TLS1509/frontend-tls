import React from 'react';
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
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  // Prepare data with defaults
  const chartData = data.map((d) => ({
    ...d,
    color: d.color || COLORS.primary,
    z: d.z ?? 100, // default bubble size
  }));

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart
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
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => value.toFixed(2)}
            labelStyle={{ color: '#1a1a1a' }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}

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
    </div>
  );
};
