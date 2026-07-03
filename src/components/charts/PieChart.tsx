import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  /** Data points (will be sorted by value, largest first) */
  data: PieChartDataPoint[];
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';
  /** Show legend */
  showLegend?: boolean;
  /** Show percentage labels on slices */
  showLabels?: boolean;
  /** Donut mode (inner radius) */
  donut?: boolean;
  /** Inner radius for donut (only used if donut=true) */
  innerRadius?: number;
  /** Callback on slice click */
  onSliceClick?: (data: PieChartDataPoint, index: number) => void;
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
  '#A1D3D1',
  '#FBDDC1',
  '#FFE5B4',
];

/**
 * PieChart & DonutChart — distribution and composition
 * Useful for: course completion rates, category breakdown, skill distribution, cohort composition
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 'md',
  showLegend = true,
  showLabels = true,
  donut = false,
  innerRadius = 60,
  onSliceClick,
  className = '',
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  // Sort by value descending
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Apply colors if not provided
  const dataWithColors = sortedData.map((d, idx) => ({
    ...d,
    color: d.color || COLOR_PALETTE[idx % COLOR_PALETTE.length],
  }));

  const renderLabel = (entry: any) => {
    const total = dataWithColors.reduce((sum, d) => sum + d.value, 0);
    const percent = ((entry.value / total) * 100).toFixed(0);
    return showLabels ? `${percent}%` : '';
  };

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={dataWithColors}
            cx="50%"
            cy="50%"
            innerRadius={donut ? innerRadius : 0}
            outerRadius={donut ? 90 : 100}
            paddingAngle={donut ? 2 : 1}
            fill="#8884d8"
            dataKey="value"
            label={renderLabel}
            onClick={(_, index) => onSliceClick?.(sortedData[index], index)}
            style={{ cursor: onSliceClick ? 'pointer' : 'default' }}
          >
            {dataWithColors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            formatter={(value: number) => {
              const total = dataWithColors.reduce((sum, d) => sum + d.value, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return `${value} (${percent}%)`;
            }}
            labelStyle={{ color: '#1a1a1a' }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, _entry, index) => {
                const item = dataWithColors[index as number];
                if (!item) return value;
                const total = dataWithColors.reduce((sum, d) => sum + d.value, 0);
                const percent = ((item.value / total) * 100).toFixed(1);
                return `${item.label} (${item.value}, ${percent}%)`;
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
