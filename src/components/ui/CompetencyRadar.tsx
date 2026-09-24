import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CHASSE_CAPTION, coupeLibelle } from '../charts/chartTheme';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface RadarAxis {
  label: string;
  current: number;   // 0–5 (Dreyfus scale)
  target?: number;   // 0–5 (objectif cible, optionnel)
}

export type RadarSize = 'sm' | 'md' | 'lg';

export interface CompetencyRadarProps {
  /** Up to 6 axes */
  axes: RadarAxis[];
  size?: RadarSize;
  showLegend?: boolean;
  showLabels?: boolean;
  /** Fired when clicking on an axis label */
  onAxisClick?: (axis: RadarAxis, index: number) => void;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Côté nominal du dessin : le radar ne dépasse jamais ce rayon. */
const SIZE_PX: Record<RadarSize, number> = { sm: 200, md: 320, lg: 480 };
/** Réserve historique entre le bord du dessin et le polygone. */
const LABEL_PAD: Record<RadarSize, number> = { sm: 28, md: 36, lg: 48 };
const LEVELS = 5; // Dreyfus 1–5

/* ─── Les libellés — révisé le 2026-09-24 (passe typographique) ───────────────
 *
 * Ils étaient à 9 · 11 · 14 px selon la taille, en graisse 500 et en gris brut
 * (#374151). Ils sont au corps `caption` (13 px, 400, ink-600) à toutes les
 * tailles : à 9 px, un libellé ne se lit pas, surtout à 375 px de large.
 *
 * Ce qui a obligé à revoir la géométrie : le dessin avait une taille FIXE
 * (200 · 320 · 480 px) et laissait déborder ses libellés (`overflow-visible`).
 * Mesuré le 24/09 à 375 px, les libellés sortaient de leur carte de 39 à 113 px
 * sur quatre pages — avant même de grossir. Le radar mesure désormais sa boîte
 * et réduit son RAYON pour que les libellés tiennent, texte toujours à 13 px ;
 * un libellé long passe sur deux lignes (`coupeLibelle`). Quand même ainsi le
 * polygone tomberait sous 48 px de rayon, les pointes sont numérotées et les
 * libellés passent dans une liste sous le dessin.
 */
const ECART = 12;          // de la pointe au libellé
const HAUTEUR_LIGNE = 16;  // une ligne de libellé à 13 px
const RAYON_MIN = 48;
const LIGNE_MAX = 14;

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Returns [x, y] for a point at `angle` (radians) and `r` from center */
const polar = (cx: number, cy: number, r: number, angle: number): [number, number] => [
  cx + r * Math.cos(angle),
  cy + r * Math.sin(angle),
];

/** Angles for N axes, starting at top (−π/2) */
const axisAngles = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => (-Math.PI / 2) + (i * 2 * Math.PI) / n);

/** Build an SVG polygon `points` string from an array of [x,y] tuples */
const toPoints = (pts: [number, number][]): string =>
  pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Dreyfus level ring labels (1–5) on each spoke */
const LevelRings: React.FC<{
  cx: number; cy: number; maxR: number; n: number;
}> = ({ cx, cy, maxR, n }) => {
  const angles = axisAngles(n);
  return (
    <>
      {Array.from({ length: LEVELS }, (_, lvl) => {
        const r = (maxR / LEVELS) * (lvl + 1);
        const pts = angles.map((a) => polar(cx, cy, r, a));
        return (
          <polygon
            key={lvl}
            points={toPoints(pts)}
            fill="none"
            stroke="currentColor"
            strokeWidth={lvl === LEVELS - 1 ? 1.5 : 0.75}
            className="text-ink-200"
            strokeDasharray={lvl === LEVELS - 1 ? undefined : '3 3'}
          />
        );
      })}
    </>
  );
};

// ─── CompetencyRadar ──────────────────────────────────────────────────────────

export const CompetencyRadar: React.FC<CompetencyRadarProps> = ({
  axes,
  size = 'md',
  showLegend = true,
  showLabels = true,
  onAxisClick,
  className = '',
}) => {
  const n = Math.min(axes.length, 6);
  const angles = useMemo(() => axisAngles(n), [n]);
  const rayonNominal = SIZE_PX[size] / 2 - LABEL_PAD[size];

  /* La boîte du composant : c'est elle qui décide de la place des libellés.
     ⚠️ Elle est en `w-full` et doit le rester : si sa largeur dépendait de son
     contenu (un parent `flex` qui l'ajuste, par exemple), la mesure suivrait le
     dessin, le dessin la mesure, et le radar rétrécirait jusqu'au rayon minimal
     — constaté sur /passeport/historique pendant la mise au point. Une mesure à
     0 (onglet masqué, rendu initial) est ignorée pour la même raison. */
  const boite = useRef<HTMLDivElement>(null);
  const [largeurDispo, setLargeurDispo] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = boite.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([entree]) => {
      const w = entree.contentRect.width;
      if (w > 0) setLargeurDispo(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* La largeur RÉELLE des libellés — mesurée depuis le 2026-09-24.
     La géométrie partait d'une chasse moyenne (6,7 px par caractère à 13 px) ;
     un libellé plus large que la moyenne sortait du SVG, qui le rognait :
     « Communication » mesure 91 px pour 87 estimés, et /manager/cohort
     affichait « Communicatior » (radar `sm`, à 375 comme à 1440). Après le
     premier rendu, on mesure chaque ligne dans la police calculée du libellé
     (canvas `measureText`), et on recommence quand les polices ont fini de
     charger. L'estimation ne sert plus qu'au tout premier rendu. */
  const [largeursMesurees, setLargeursMesurees] = useState<number[] | null>(null);
  const [policesPretes, setPolicesPretes] = useState(false);
  useLayoutEffect(() => {
    let actif = true;
    document.fonts?.ready.then(() => { if (actif) setPolicesPretes(true); });
    return () => { actif = false; };
  }, []);
  useLayoutEffect(() => {
    const texte = boite.current?.querySelector('svg text');
    const ctx = texte && document.createElement('canvas').getContext('2d');
    if (!texte || !ctx) return;
    const cs = getComputedStyle(texte);
    // Graisse du libellé, pas celle d'un numéro (600 en mode numéroté).
    ctx.font = `400 ${cs.fontSize} ${cs.fontFamily}`;
    const mesures = axes
      .slice(0, n)
      .map((a) => Math.max(...coupeLibelle(a.label, LIGNE_MAX).map((ligne) => ctx.measureText(ligne).width)));
    setLargeursMesurees((avant) =>
      avant && avant.length === mesures.length && avant.every((v, i) => Math.abs(v - mesures[i]) < 0.5) ? avant : mesures,
    );
  }, [axes, n, policesPretes]);

  const geo = useMemo(() => {
    const libelles = axes.slice(0, n).map((a) => coupeLibelle(a.label, LIGNE_MAX));
    const largeurs =
      largeursMesurees?.length === libelles.length
        ? largeursMesurees
        : libelles.map((l) => Math.max(...l.map((ligne) => ligne.length)) * CHASSE_CAPTION);
    // Avant la première mesure : la place du dessin nominal et de ses libellés.
    const W = largeurDispo ?? SIZE_PX[size] + 2 * Math.max(0, ...largeurs);

    /* Le plus grand rayon qui garde chaque libellé latéral dans la boîte :
       |cos a|·(r + ECART) + largeur ≤ W / 2. Les libellés du haut et du bas,
       centrés sur leur pointe, ne contraignent pas le rayon. */
    const rayonPour = (larg: number[]) =>
      angles.reduce((r, a, i) => {
        const c = Math.abs(Math.cos(a));
        return c < 0.01 ? r : Math.min(r, (W / 2 - larg[i]) / c - ECART);
      }, rayonNominal);

    let numerote = false;
    let rayon = showLabels ? rayonPour(largeurs) : Math.min(rayonNominal, W / 2 - 4);
    if (showLabels && rayon < RAYON_MIN) {
      numerote = true;
      rayon = rayonPour(largeurs.map(() => 10));
    }
    rayon = Math.max(24, Math.min(rayonNominal, rayon));

    const blocs = showLabels
      ? angles.map((a, i) => {
          const lignes = numerote ? [String(i + 1)] : libelles[i];
          const larg = numerote ? 10 : largeurs[i];
          const haut = lignes.length * HAUTEUR_LIGNE;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const [x, y] = polar(0, 0, rayon + ECART, a);
          const ancre: 'start' | 'middle' | 'end' = Math.abs(cos) < 0.01 ? 'middle' : cos > 0 ? 'start' : 'end';
          // Haut : le bloc finit sur la pointe. Bas : il y commence. Côtés : centré.
          const y0 = Math.abs(cos) < 0.01 ? (sin < 0 ? y - haut : y) : y - haut / 2;
          const x0 = ancre === 'start' ? x : ancre === 'end' ? x - larg : x - larg / 2;
          return { lignes, x, y0, ancre, x0, x1: x0 + larg, y1: y0 + haut };
        })
      : [];

    const minX = Math.min(-rayon, ...blocs.map((b) => b.x0)) - 2;
    const maxX = Math.max(rayon, ...blocs.map((b) => b.x1)) + 2;
    const minY = Math.min(-rayon, ...blocs.map((b) => b.y0)) - 4;
    const maxY = Math.max(rayon, ...blocs.map((b) => b.y1)) + 4;
    return { rayon, numerote, blocs, minX, minY, largeur: maxX - minX, hauteur: maxY - minY };
  }, [axes, n, angles, size, rayonNominal, largeurDispo, showLabels, largeursMesurees]);

  const maxR = geo.rayon;

  // Points for current level polygon
  const currentPts = useMemo(
    () =>
      axes.slice(0, n).map((axis, i) => {
        const r = (maxR / LEVELS) * Math.max(0, Math.min(axis.current, LEVELS));
        return polar(0, 0, r, angles[i]);
      }),
    [axes, n, angles, maxR]
  );

  // Points for target polygon (if any axis has a target)
  const hasTarget = axes.slice(0, n).some((a) => a.target !== undefined);
  const targetPts = useMemo(
    () =>
      axes.slice(0, n).map((axis, i) => {
        const lvl = axis.target ?? axis.current;
        const r = (maxR / LEVELS) * Math.max(0, Math.min(lvl, LEVELS));
        return polar(0, 0, r, angles[i]);
      }),
    [axes, n, angles, maxR]
  );

  const isClickable = !!onAxisClick;
  /* Nom accessible : les niveaux, pas seulement le mot « radar ». Si les
     libellés sont cliquables, le SVG est un groupe — un `role="img"` rendrait
     ses boutons invisibles aux technologies d'assistance. */
  const description = `Radar de compétences Dreyfus, sur 5. ${axes
    .slice(0, n)
    .map((a) => `${a.label} ${a.current.toLocaleString('fr-FR')}${a.target !== undefined ? ` (objectif ${a.target.toLocaleString('fr-FR')})` : ''}`)
    .join(', ')}.`;

  return (
    <div ref={boite} className={`w-full flex flex-col items-center gap-stack-xs ${className}`}>
      <svg
        width={geo.largeur}
        height={geo.hauteur}
        viewBox={`${geo.minX} ${geo.minY} ${geo.largeur} ${geo.hauteur}`}
        role={isClickable ? 'group' : 'img'}
        aria-label={description}
        className="max-w-full h-auto"
      >
        {/* Background rings */}
        <LevelRings cx={0} cy={0} maxR={maxR} n={n} />

        {/* Axis spokes */}
        {angles.map((angle, i) => {
          const [x, y] = polar(0, 0, maxR, angle);
          return (
            <line
              key={`spoke-${i}`}
              x1={0} y1={0}
              x2={x} y2={y}
              stroke="currentColor"
              strokeWidth={0.75}
              className="text-ink-200"
            />
          );
        })}

        {/* Target polygon (dashed, warm) */}
        {hasTarget && (
          <polygon
            points={toPoints(targetPts)}
            fill="rgba(237, 132, 58, 0.08)"
            stroke="rgba(237, 132, 58, 0.6)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}

        {/* Current level polygon */}
        <polygon
          points={toPoints(currentPts)}
          fill="rgba(85, 161, 180, 0.18)"
          stroke="rgb(74, 143, 161)"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Current level dots */}
        {currentPts.map(([x, y], i) => (
          <circle key={`dot-${i}`} cx={x} cy={y} r={size === 'sm' ? 3 : 4} fill="rgb(74, 143, 161)" />
        ))}

        {/* Axis labels — 13 px, ink-600, une à deux lignes */}
        {geo.blocs.map((b, i) => {
          const axis = axes[i];
          return (
            <text
              key={`label-${i}`}
              x={b.x}
              textAnchor={b.ancre}
              dominantBaseline="central"
              className={[
                'font-body text-caption fill-ink-600',
                geo.numerote && 'font-semibold',
                isClickable && 'cursor-pointer hover:fill-primary-800 focus-visible:fill-primary-800 focus-visible:outline-none',
              ].filter(Boolean).join(' ')}
              onClick={isClickable ? () => onAxisClick(axis, i) : undefined}
              onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAxisClick(axis, i); }
              } : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={isClickable ? `Voir détail : ${axis.label}` : undefined}
            >
              {b.lignes.map((ligne, k) => (
                <tspan key={k} x={b.x} y={b.y0 + HAUTEUR_LIGNE * (k + 0.5)}>
                  {ligne}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Center dot */}
        <circle cx={0} cy={0} r={2.5} fill="rgb(74, 143, 161)" opacity={0.5} />
      </svg>

      {/* Pointes numérotées : la liste des compétences, dans l'ordre des numéros. */}
      {geo.numerote && showLabels && (
        <ol className="flex flex-col gap-stack-3xs self-stretch text-caption text-ink-700">
          {axes.slice(0, n).map((axis, i) => (
            <li key={axis.label} className="flex items-baseline gap-stack-xs">
              <span className="w-4 shrink-0 text-right font-semibold tabular-nums text-ink-600">{i + 1}</span>
              <span>{axis.label}</span>
            </li>
          ))}
        </ol>
      )}

      {/* Legend — 13 px, ink-700 */}
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-x-stack gap-y-stack-3xs text-caption text-ink-700">
          <div className="flex items-center gap-stack-xs">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary-500/50 border-2 border-primary-600" />
            <span>Niveau actuel</span>
          </div>
          {hasTarget && (
            <div className="flex items-center gap-stack-xs">
              <span className="inline-block w-3 h-3 rounded-sm bg-secondary-500/[0.12] border-2 border-dashed border-secondary-500/70" />
              <span>Objectif cible</span>
            </div>
          )}
          <span className="text-ink-600">Échelle Dreyfus 1–5</span>
        </div>
      )}
    </div>
  );
};

export default CompetencyRadar;
