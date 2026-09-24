import React, { useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CHART_TICK, CHART_TOOLTIP, CHASSE_CAPTION, coupeLibelle } from './chartTheme';

export interface RadarDataPoint {
  label: string;
  current: number; // 0–5 (Dreyfus)
  target?: number; // 0–5 (objectif)
}

export interface RadarChartProps {
  /** Données pour le radar (max 6 axes) */
  data: RadarDataPoint[];
  /** Callback quand un axe est cliqué */
  onAxisClick?: (axis: RadarDataPoint, index: number) => void;
  /** Taille du chart */
  size?: 'sm' | 'md' | 'lg';
  /** Montrer la légende */
  showLegend?: boolean;
  /** Nom accessible. Par défaut, décrit le type et les valeurs de chaque série. */
  ariaLabel?: string;
  /** Classe custom */
  className?: string;
}

const COLORS = {
  current: '#55A1B4', // primary-500
  target: '#ED843A',  // secondary-500
};

/* Les libellés d'axe se posent HORS du polygone, dans la marge latérale : avec
 * 30 px de côté, « Communication » débordait de 21 px du SVG et était coupé
 * (mesuré le 23/09 sur /coach/dashboard, panneau de 300 px). Les libellés
 * sont au corps caption (13 px) et la marge suit la plus longue de leurs
 * LIGNES : un libellé long passe sur deux lignes (`coupeLibelle`) plutôt que
 * d'élargir la marge — à 375 px, la marge plafonnée à 96 laissait « Créativité
 * & Innovation » coupé par le bord du SVG. */
const LIGNE_MAX = 14;
const radarMargin = (labels: string[]) => {
  const plusLongue = Math.max(0, ...labels.flatMap((l) => coupeLibelle(l, LIGNE_MAX)).map((l) => l.length));
  const cote = Math.min(96, Math.max(30, Math.round(plusLongue * CHASSE_CAPTION) + 8));
  // Haut et bas : place pour deux lignes au-dessus et au-dessous du polygone.
  return { top: 28, right: cote, bottom: 28, left: cote };
};

/* Interligne d'un libellé sur plusieurs lignes, en em du corps de 13 px. */
const INTERLIGNE_EM = 1.25;

/**
 * RadarChart — charting interactif avec Recharts
 * Interactions : hover (tooltip), click sur axes, légende interactive
 */
export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  onAxisClick,
  size = 'md',
  showLegend = true,
  className = '',
  ariaLabel,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Adapter la hauteur selon la taille
  const heightMap = { sm: 250, md: 350, lg: 450 };
  const height = heightMap[size];

  // Largeur réelle, remontée par ResponsiveContainer (0 tant qu'inconnue).
  const [largeur, setLargeur] = useState(0);

  // Préparer les données pour Recharts (format [{ name, current, target }, ...])
  const chartData = data.slice(0, 6).map((d) => ({
    name: d.label,
    current: d.current,
    target: d.target ?? 0,
  }));

  const handleAxisClick = (entry: any, index: number) => {
    setActiveIndex(index);
    onAxisClick?.(data[index], index);
  };

  const aCible = data.some((d) => d.target);

  /* Rayon du polygone, estimé comme Recharts le calcule (80 % du demi-côté de la
     zone utile) : sert seulement à savoir si les graduations ont la place. */
  const marges = radarMargin(chartData.map((d) => d.name));
  const rayonEstime = largeur
    ? 0.8 * Math.min(largeur - marges.left - marges.right, height - marges.top - marges.bottom) / 2
    : 100;
  const description =
    ariaLabel ??
    `Radar des niveaux Dreyfus, sur 5. ${chartData
      .map((d) => `${d.name} ${d.current.toLocaleString('fr-FR')}${aCible && d.target ? ` (objectif ${d.target.toLocaleString('fr-FR')})` : ''}`)
      .join(', ')}.`;

  return (
    <div className={`w-full ${className}`}>
      <div role="img" aria-label={description}>
      <ResponsiveContainer width="100%" height={height} onResize={(w) => setLargeur(w)}>
        <RechartsRadarChart
          accessibilityLayer={false}
          data={chartData}
          margin={marges}
        >
          <PolarGrid
            stroke="currentColor"
            className="text-ink-200"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="name"
            stroke="currentColor"
            className="text-ink-600"
            onClick={(e) => {
              const index = chartData.findIndex((d) => d.name === e.value);
              if (index >= 0) handleAxisClick(e, index);
            }}
            style={{ cursor: 'pointer' }}
            tick={/* v3: la valeur du tick vit dans payload.value, plus au premier
                     niveau. On ne spread pas props sur <text> : il porte payload /
                     tickFormatter / visibleTicksCount, non valides en SVG. */
              ({ x, y, textAnchor, verticalAnchor, payload }) => {
              const label = String(payload?.value ?? '');
              const isActive = hoveredAxis === label;
              const lignes = coupeLibelle(label, LIGNE_MAX);
              const saut = (lignes.length - 1) * INTERLIGNE_EM;
              /* Le libellé du haut se pose AU-DESSUS de sa pointe, celui du bas
                 AU-DESSOUS (Recharts le dit par `verticalAnchor`), ceux des côtés
                 centrés sur elle. Centré sur la pointe, le libellé du haut mordait
                 sur le polygone et sur la graduation « 5 » : mesuré le 2026-09-24
                 sur /passeport, « Leadership & Management » chevauchait le rayon
                 et « Tech & Outils numériques » la cible. */
              const ancrage: { dominantBaseline: 'auto' | 'hanging' | 'central'; premiere: number } =
                verticalAnchor === 'end' ? { dominantBaseline: 'auto', premiere: -saut - 0.3 }
                : verticalAnchor === 'start' ? { dominantBaseline: 'hanging', premiere: 0.1 }
                : { dominantBaseline: 'central', premiere: -saut / 2 };
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline={ancrage.dominantBaseline}
                  className={`text-caption transition-colors ${
                    isActive ? 'fill-primary-800' : 'fill-ink-600'
                  }`}
                  onMouseEnter={() => setHoveredAxis(label)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {lignes.map((ligne, i) => (
                    <tspan key={i} x={x} dy={`${i === 0 ? ancrage.premiere : INTERLIGNE_EM}em`}>
                      {ligne}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          {/* Une graduation par niveau Dreyfus, de 1 à 5 : les anneaux de la grille
              suivent les graduations, donc chaque anneau devient un niveau. Recharts
              choisissait 0 · 2 · 4 · 5 — des anneaux qui ne correspondaient à rien.
              Sur un petit radar, les cinq chiffres de 13 px se chevauchaient le long
              du rayon : on n'en garde que deux, le premier et le dernier niveau. */}
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            ticks={rayonEstime / 5 < 18 ? [1, 5] : [1, 2, 3, 4, 5]}
            stroke="currentColor"
            className="text-ink-600"
            /* Chaque chiffre est centré sur son anneau, 5 px à droite du rayon, et
               détouré de blanc : l'arête du polygone qui le traverse ne le barre
               plus. Recharts le posait AU-DESSUS de la pointe, où le « 5 » mordait
               sur le libellé du haut. */
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y}
                dx={5}
                dominantBaseline="central"
                className={`${CHART_TICK.className} stroke-white stroke-[3px] [paint-order:stroke]`}
              >
                {payload?.value}
              </text>
            )}
          />
          <Radar
            name="Niveau actuel"
            dataKey="current"
            stroke={COLORS.current}
            fill={COLORS.current}
            fillOpacity={0.35}
            strokeWidth={2}
          />
          {data.some((d) => d.target) && (
            <Radar
              name="Objectif cible"
              dataKey="target"
              stroke={COLORS.target}
              fill={COLORS.target}
              fillOpacity={0}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Tooltip
            {...CHART_TOOLTIP}
            formatter={(value) => `D${value}`}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
      </div>

      {/* UNE légende (2026-09-24). Il y en avait deux, l'une sous l'autre : celle
          de Recharts — un carré plein pour l'objectif, qui est pourtant un trait
          pointillé — et celle-ci, « pour petits écrans », rendue à toutes les
          tailles. On garde celle dont les pastilles ressemblent aux tracés. */}
      {showLegend && (
        <ul className="flex flex-wrap justify-center gap-x-stack gap-y-stack-3xs mt-stack-xs text-caption text-ink-700" aria-label="Légende">
          <li className="flex items-center gap-stack-xs">
            <span aria-hidden className="w-3 h-3 rounded-xs bg-primary-500" />
            Niveau actuel
          </li>
          {aCible && (
            <li className="flex items-center gap-stack-xs">
              <span aria-hidden className="w-4 border-t-2 border-dashed border-secondary-500" />
              Objectif cible
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
