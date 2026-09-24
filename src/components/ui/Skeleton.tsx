import React from 'react';

/**
 * Skeleton — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Placeholder shimmer matching the shape of expected content.
 * Variants: text / caption / title / heading / stat / block / circle / card / button.
 * Use when 1–3s load; for ≤1s use a spinner, ≥3s add a message.
 */

export type SkeletonVariant =
  | 'text'     // une ligne de corps — 16/26
  | 'caption'  // une ligne de légende, méta, date — 13/20
  | 'title'    // un titre de bloc (carte) — h3 20/26
  | 'heading'  // un titre de section — h2 28/36
  | 'stat'     // la valeur d'une StatCard — `stat-value`, 32 → 44
  | 'block'
  | 'circle'
  | 'card'
  | 'button';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
}

const BASE =
  'block bg-gradient-to-r from-ink-50 via-ink-100 to-ink-50 bg-[length:200%_100%] animate-skeleton-shimmer';

/* Une ligne de texte prend la HAUTEUR DE LIGNE de son pas, et dessine au milieu
   une barre du corps de ce pas — révisé le 2026-09-24. Les lignes faisaient
   14 px et le titre 24, des tailles d'avant la passe typographique : dix
   lignes de squelette rendaient 140 px pour un texte réel de 260, et la page
   sautait au passage du contenu. Ici la boîte vaut `1lh` (26 px au corps,
   20 en légende, 26 et 36 pour les titres) et le fond ne se peint que dans la
   boîte de contenu, réduite par le padding à `1em` : la barre fait 16, 13, 20
   ou 28 px, là où seraient les lettres. Le pas donne tout, sans valeur écrite.
   Les lignes d'un même paragraphe se posent sans `gap`, comme les vraies. */
const LIGNE = 'h-lh py-[calc((1lh-1em)/2)] bg-clip-content rounded-pill';

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text:    `text-body ${LIGNE}`,
  caption: `text-caption ${LIGNE}`,
  title:   `text-h3 w-3/5 ${LIGNE}`,
  heading: `text-h2 w-3/5 ${LIGNE}`,
  // La valeur d'une StatCard est posée sans interligne (`leading-none`) : sa
  // boîte vaut le corps, 32 → 44 px selon la fenêtre, comme le chiffre.
  stat:    'text-stat-value leading-none h-lh w-20 max-w-full rounded-md',
  block:   'h-30 rounded-lg',
  circle:  'rounded-pill aspect-square',
  // Le rayon d'une carte (20) et la hauteur d'un Button md (44, rayon 14 —
  // arbitrage n°22) : c'étaient 14 et une pilule de 40.
  card:    'h-40 rounded-xl',
  button:  'h-touch w-24 rounded-lg',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...rest
}) => {
  const classes = [BASE, VARIANT_CLASSES[variant], className].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <span className={classes} style={inlineStyle} aria-hidden="true" {...rest} />
  );
};

export default Skeleton;
