import React from 'react';
import {
  ComposedChart as RechartsComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface ComposedChartDataPoint {
  label: string;
  [key: string]: string | number;
}

export interface ComposedChartSeriesConfig {
  key: string;
  label: string;
  type: 'bar' | 'line';
  color?: string;
  yAxisId?: 'left' | 'right';
  strokeWidth?: number;
}

export interface ComposedChartProps {
  /** Data points for the chart */
  data: ComposedChartDataPoint[];
  /** Series configuration (bars + lines) */
  series: ComposedChartSeriesConfig[];
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Use dual Y axes */
  dualAxis?: boolean;
  /** Left Y axis label */
  leftAxisLabel?: string;
  /** Right Y axis label */
  rightAxisLabel?: string;
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
 * ComposedChart — combine bars + lines for complex metrics
 * Useful for: learner activities (count + average score), team metrics (count + efficiency)
 */
export const ComposedChart: React.FC<ComposedChartProps> = ({
  data,
  series,
  size = 'md',
  showLegend = true,
  dualAxis = false,
  leftAxisLabel = 'Value',
  rightAxisLabel = 'Score',
  className = '',
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsComposedChart
          data={data}
          margin={{ top: 20, right: dualAxis ? 80 : 30, bottom: 20, left: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis
            dataKey="label"
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            stroke="currentColor"
            className="text-body-sm text-ink-600"
            tick={{ fontSize: 12 }}
            label={{ value: leftAxisLabel, angle: -90, position: 'insideLeft' }}
          />
          {dualAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="currentColor"
              className="text-body-sm text-ink-600"
              tick={{ fontSize: 12 }}
              label={{ value: rightAxisLabel, angle: 90, position: 'insideRight' }}
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
            labelStyle={{ color: '#1a1a1a' }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: '20px' }} />}

          {series.map((s, idx) => {
            const color = s.color || COLOR_PALETTE[idx % COLOR_PALETTE.length];
            const yAxisId = dualAxis ? (s.yAxisId || 'left') : 'left';

            if (s.type === 'bar') {
              return (
                <Bar
                  key={s.key}
                  yAxisId={yAxisId}
                  dataKey={s.key}
                  name={s.label}
                  fill={color}
                  opacity={0.7}
                />
              );
            }

            return (
              <Line
                key={s.key}
                yAxisId={yAxisId}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={color}
                strokeWidth={s.strokeWidth ?? 2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
