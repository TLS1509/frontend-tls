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

/* Place des libellés en barres horizontales — proportionnelle à la largeur
   du graphique (2026-09-24). Elle valait 290 px fixes : 150 de marge gauche
   + 140 d'axe. Sur un conteneur de ~260 px (une carte à 375 px de fenêtre),
   la zone de tracé tombait à zéro et TOUTES les barres disparaissaient —
   /enterprise/dashboard et /manager/views/builder n'affichaient que leurs
   libellés. La marge servait de débord aux libellés longs, ancrés à droite
   sur l'axe : on la verse donc dans l'axe lui-même, et on tronque le
   libellé à la place disponible (la bulle d'info garde le texte entier).
   Au-dessus de ~810 px de large, le rendu est celui d'avant : axe à 290 px. */
const LIBELLES_MAX = 282; // + 8 de marge = les 290 d'avant
const LIBELLES_MIN = 72;
const LIBELLES_PART = 0.35;
const MARGE_DROITE_MAX = 30;
/* Largeur moyenne d'un caractère de `text-body-sm` (14 px, Nunito) — sert à
   tronquer sans mesurer chaque libellé. Sous-estimer ferait déborder. */
const CHASSE_MOYENNE = 7.5;

const tronquer = (texte: string, largeur: number): string => {
  const max = Math.max(4, Math.floor(largeur / CHASSE_MOYENNE));
  return texte.length > max ? `${texte.slice(0, max - 1).trimEnd()}…` : texte;
};

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

  // Largeur réelle du graphique, remontée par ResponsiveContainer. 0 tant
  // qu'elle n'est pas connue : on part alors sur le rendu large.
  const [largeur, setLargeur] = React.useState(0);
  const libelles = largeur
    ? Math.round(Math.min(LIBELLES_MAX, Math.max(LIBELLES_MIN, largeur * LIBELLES_PART)))
    : LIBELLES_MAX;
  // Marge droite : 30 comme avant, ramenée à 12 sous 480 px, où chaque pixel
  // de zone de tracé compte.
  const margeDroite = largeur && largeur < 480 ? 12 : MARGE_DROITE_MAX;

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
      <ResponsiveContainer width="100%" height={height} onResize={(w) => setLargeur(w)}>
        <RechartsBarChart
          accessibilityLayer={false}
          data={data}
          layout={isVertical ? 'vertical' : 'horizontal'}
          margin={{ top: 20, right: margeDroite, bottom: 20, left: isVertical ? 8 : margeDroite }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-ink-200" />
          <XAxis type={isVertical ? 'number' : 'category'} stroke="currentColor" className="text-body text-ink-600" />
          <YAxis
            type={isVertical ? 'category' : 'number'}
            dataKey={isVertical ? 'label' : undefined}
            stroke="currentColor"
            className="text-body text-ink-600"
            width={isVertical ? libelles : undefined}
            tickFormatter={isVertical ? (v: string) => tronquer(String(v), libelles - 12) : undefined}
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
