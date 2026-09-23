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
import { CHART_TOOLTIP, CHART_LEGEND } from './chartTheme';

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
  ariaLabel,
}) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];
  /* Rayon par taille, et non 100 px fixes : au cran sm, la zone de tracé fait
   * 210 px de haut (250 − la légende), donc un rayon de 100 posait l'étiquette
   * de la part du haut 15 px AU-DESSUS du SVG, coupée (mesuré le 23/09 sur
   * /analytics/dashboard). L'étiquette se pose 20 px hors du disque. */
  const outerMap = donut ? { sm: 64, md: 90, lg: 116 } : { sm: 70, md: 100, lg: 130 };
  const outerRadius = outerMap[size];
  const inner = donut ? Math.min(innerRadius, outerRadius - 16) : 0;

  // Sort by value descending
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Apply colors if not provided
  const dataWithColors = sortedData.map((d, idx) => ({
    ...d,
    color: d.color || COLOR_PALETTE[idx % COLOR_PALETTE.length],
  }));

  /* L'étiquette de part est en encre, pas dans la couleur de la part : Recharts
   * lui passe `fill` = couleur de la tranche, et les teintes 500 de la palette
   * mesurent 1,86 à 2,94:1 sur blanc. Le filet de rappel garde la couleur. */
  const renderLabel = (entry: any) => {
    if (!showLabels) return null;
    const total = dataWithColors.reduce((sum, d) => sum + d.value, 0);
    const percent = total > 0 ? ((entry.value / total) * 100).toFixed(0) : '0';
    return (
      <text
        x={entry.x}
        y={entry.y}
        textAnchor={entry.textAnchor}
        dominantBaseline="central"
        className="fill-ink-700 text-caption font-semibold"
      >
        {percent} %
      </text>
    );
  };

  const prefersReducedMotion = useReducedMotion();

  const totalValeurs = dataWithColors.reduce((sum, d) => sum + d.value, 0);
  const description =
    ariaLabel ??
    `${donut ? 'Graphique en anneau' : 'Graphique circulaire'}, ${dataWithColors.length} parts. ${dataWithColors
      .map((d) => `${d.label} ${d.value.toLocaleString('fr-FR')} (${totalValeurs > 0 ? Math.round((d.value / totalValeurs) * 100) : 0} %)`)
      .join(', ')}.`;

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
        <RechartsPieChart accessibilityLayer={false}>
          <Pie
            data={dataWithColors}
            cx="50%"
            cy="50%"
            innerRadius={inner}
            outerRadius={outerRadius}
            paddingAngle={donut ? 2 : 1}
            fill="#8884d8"
            dataKey="value"
            rootTabIndex={-1}
            label={showLabels ? renderLabel : false}
            labelLine={showLabels}
            onClick={(_, index) => onSliceClick?.(sortedData[index], index)}
            style={{ cursor: onSliceClick ? 'pointer' : 'default' }}
          >
            {dataWithColors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            {...CHART_TOOLTIP}
            formatter={/* v3: Formatter reçoit ValueType | undefined, pas number */ (value) => {
              const n = typeof value === 'number' ? value : Number(value);
              if (!Number.isFinite(n)) return String(value ?? '');
              const total = dataWithColors.reduce((sum, d) => sum + d.value, 0);
              const percent = total > 0 ? ((n / total) * 100).toFixed(1) : '0.0';
              return `${n} (${percent}%)`;
            }}
          />
          {showLegend && (
            <Legend
              {...CHART_LEGEND}
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
