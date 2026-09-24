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
 * La typographie d'un graphique — cible du 2026-09-24 (doctrine-design.md,
 * « Typographie, texte et rythme ») :
 *
 *   graduations et axes   13 px (`caption`) · 400 · ink-600 · chiffres tabulaires
 *   légende               13 px · 400 · ink-700
 *   info-bulle            titre 13/600 ink-900 · valeurs 13 ink-700 tabulaires
 *   titre du graphique    porté par la carte (h3, 20), jamais par le SVG
 *
 * Nunito partout : le texte d'un graphique se lit comme du texte, pas comme un
 * titre. Plus aucun 10, 11 ou 12 px — à 375 px de large, c'est illisible.
 */

/**
 * Graduations. ⚠️ Recharts 3 rend les libellés de graduation dans une COUCHE À
 * PART (`ZIndexLayer`), hors du `<g>` de l'axe : une classe posée sur
 * `<XAxis className>` ne les atteint donc pas. Mesuré le 2026-09-24 : les
 * graduations héritaient de la page (16 px, ink-900) — ou valaient 12 px quand
 * un `tick={{ fontSize: 12 }}` était posé. La classe passe par l'objet `tick`,
 * que Recharts recopie sur chaque `<text>` ; elle bat l'attribut `fill` que
 * Recharts y écrit (une règle CSS l'emporte toujours sur un attribut de
 * présentation SVG).
 */
export const CHART_TICK = { className: 'text-caption fill-ink-600 tabular-nums' };

/**
 * Axe cartésien complet : trait et graduations. Le trait garde `currentColor`
 * sur ink-600 (il vit, lui, dans le `<g>` de l'axe) ; les libellés passent par
 * `CHART_TICK`. À étaler tel quel : `<XAxis dataKey="label" {...CHART_AXIS} />`.
 */
export const CHART_AXIS = {
  stroke: 'currentColor',
  className: 'text-ink-600',
  tick: CHART_TICK,
};

/** Titre d'axe (`label` de Recharts) : même corps que les graduations. Sans
 *  lui, Recharts écrit le titre en #808080 (3,95:1) au corps de la page. */
export const CHART_AXIS_LABEL_CLASS = 'text-caption fill-ink-600';

/**
 * Info-bulle. Rayon au cran `lg` (14) : une info-bulle de graphique fait
 * 50 px et plus, donc au-dessus du seuil de 28 px où le rayon cesse d'être un
 * plafonnement (R3). Le texte des séries est en ink-700, pas dans la couleur de
 * la série : les teintes 500 de la palette mesurent 1,86 à 2,94:1 sur blanc.
 * Les valeurs sont en chiffres tabulaires : d'une ligne à l'autre, les unités
 * restent sous les unités.
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
  /* Le titre est un <p> : la base (`globals.css`) pose `p { font-size: body }`,
     qui bat l'héritage. Sans corps explicite, le titre de l'info-bulle passait
     à 16 px au-dessus de valeurs à 13 — mesuré le 2026-09-24. */
  labelStyle: {
    color: 'var(--color-ink-900)',
    fontSize: 'var(--text-caption)',
    lineHeight: 'var(--text-caption--line-height)',
    fontWeight: 600,
    marginBottom: 'var(--spacing-stack-3xs)',
  },
  itemStyle: {
    color: 'var(--color-ink-700)',
    fontVariantNumeric: 'tabular-nums',
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
 * Un pourcentage à la française : virgule décimale et espace fine insécable
 * avant le signe (« 37,5 % »). `toFixed` écrivait « 37.5% » — un point anglais
 * et un signe collé, dans une interface en français.
 */
const POURCENT = [0, 1].map(
  (decimales) => new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: decimales }),
);
/** `part` est une fraction (0,375 → « 37,5 % »). Une décimale au plus, zéro sur demande. */
export const pourcent = (part: number, decimales: 0 | 1 = 1): string => POURCENT[decimales].format(part);

/**
 * Coupe un libellé d'axe en lignes d'au plus `max` caractères, sur les espaces.
 *
 * Pourquoi : à 13 px, « Communication & Influence » fait 165 px de large. Posé
 * sur le côté d'un radar, il réclamait une marge que l'écran n'a pas — mesuré le
 * 2026-09-24 à 375 px, les libellés latéraux du radar du Passeport étaient
 * coupés par le SVG (« tivité & Innovation »). Sur deux lignes de 14 caractères,
 * le plus long tient dans 92 px. Un mot plus long que `max` garde sa ligne.
 */
export const coupeLibelle = (texte: string, max = 14, lignesMax = 3): string[] => {
  const lignes: string[] = [];
  for (const mot of texte.split(/\s+/).filter(Boolean)) {
    const derniere = lignes[lignes.length - 1];
    if (derniere !== undefined && `${derniere} ${mot}`.length <= max) lignes[lignes.length - 1] = `${derniere} ${mot}`;
    else lignes.push(mot);
  }
  if (lignes.length <= lignesMax) return lignes;
  return [...lignes.slice(0, lignesMax - 1), lignes.slice(lignesMax - 1).join(' ')];
};

/** Largeur moyenne d'un caractère à 13 px en Nunito 400, mesurée le 2026-09-24
 *  sur les libellés réels (6,0 à 6,7 px) : sert à estimer une largeur de texte
 *  sans la mesurer. */
export const CHASSE_CAPTION = 6.7;

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
