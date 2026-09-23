import type { CSSProperties } from 'react';

/**
 * Habillage partagé des graphiques Recharts — info-bulle, légende, nom accessible.
 *
 * Pourquoi un fichier : l'info-bulle était recodée huit fois avec des valeurs
 * en dur (`#1a1a1a`, `#e5e7eb`, rayon 8) — un `#1a1a1a` que la rampe ink a
 * quitté depuis longtemps (ink-900 = #252B37). Recharts ne prend que des objets
 * de style, pas de classes : les valeurs passent donc par les variables CSS des
 * tokens (`src/index.css`, @theme), jamais par des hex recopiés.
 */

/**
 * Info-bulle. Rayon au cran `lg` (14) : une info-bulle de graphique fait
 * 50 px et plus, donc au-dessus du seuil de 28 px où le rayon cesse d'être un
 * plafonnement (R3). Le texte des séries est en ink-700, pas dans la couleur de
 * la série : les teintes 500 de la palette mesurent 1,86 à 2,94:1 sur blanc.
 */
export const CHART_TOOLTIP: {
  contentStyle: CSSProperties;
  labelStyle: CSSProperties;
  itemStyle: CSSProperties;
} = {
  contentStyle: {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-ink-200)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-stack-sm) var(--spacing-stack)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-caption)',
    lineHeight: 'var(--text-caption--line-height)',
    boxShadow: 'var(--shadow-md)',
  },
  labelStyle: {
    color: 'var(--color-ink-900)',
    fontWeight: 600,
    marginBottom: 'var(--spacing-stack-3xs)',
  },
  itemStyle: {
    color: 'var(--color-ink-700)',
    paddingBlock: 0,
  },
};

/**
 * Légende. Seule la pastille garde la couleur de la série ; le libellé est en
 * ink-700 (10,38:1). Recharts écrivait le texte dans la couleur de la série.
 */
export const CHART_LEGEND: { wrapperStyle: CSSProperties; labelStyle: CSSProperties } = {
  wrapperStyle: {
    paddingTop: 'var(--spacing-stack)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-caption)',
  },
  labelStyle: { color: 'var(--color-ink-700)' },
};

const MAX_POINTS_DECRITS = 12;

const nombre = (v: unknown): string =>
  typeof v === 'number' ? v.toLocaleString('fr-FR') : String(v ?? '—');

/**
 * Nom accessible d'un graphique cartésien : le type, puis chaque série avec ses
 * valeurs. Posé en `aria-label` sur un conteneur `role="img"` — le SVG de
 * Recharts, lui, ne dit rien à un lecteur d'écran.
 */
export function decrireSeries(
  type: string,
  data: ReadonlyArray<{ label: string; [key: string]: unknown }>,
  series: ReadonlyArray<{ key: string; label: string }>,
): string {
  if (data.length === 0) return `${type}, aucune donnée`;
  const coupe = data.slice(0, MAX_POINTS_DECRITS);
  const suite = data.length > MAX_POINTS_DECRITS ? ', …' : '';
  const parties = series.map(
    (s) => `${s.label} : ${coupe.map((d) => `${d.label} ${nombre(d[s.key])}`).join(', ')}${suite}`,
  );
  return `${type}, ${data.length} points. ${parties.join('. ')}.`;
}
