/**
 * L'appariement icône ↔ texte — source unique, établie par la mesure.
 *
 * Une taille d'icône ne se juge pas seule : elle se juge au rapport avec le mot
 * qu'elle accompagne. Mais ce rapport ne se calcule PAS sur les tailles
 * nominales, et c'est là que le système s'était trompé.
 *
 * Ce que l'œil compare, c'est l'ENCRE contre la CAPITALE :
 *
 *   – l'encre d'une icône Lucide ne remplit que 20/24 de sa boîte nominale,
 *     le trait restant à l'intérieur du viewBox ;
 *   – la capitale de Nunito ne vaut que 0,712 de son corps (mesuré : 9,26 px
 *     pour un caption de 13).
 *
 * Une icône de 16 px à côté d'un caption de 13 donne donc 13,33 d'encre contre
 * 9,26 de capitale, soit **1,44** — l'icône domine le mot. À 14 px, on obtient
 * 1,26, ce qui se tient.
 *
 * **La règle est donc : le cran d'icône vaut à peu près le CORPS du texte**,
 * arrondi au cran de l'échelle. Pas 1,25 fois, comme l'annonçaient les
 * commentaires des tokens `--icon-size-*` — cette valeur venait du rapport
 * nominal, qui ignore les deux facteurs ci-dessus.
 *
 *   texte        px   cran      encre   encre/capitale
 *   micro        11   icon-2xs  11,67   1,49  ⚠ le plancher de l'échelle
 *   caption      13   icon-2xs  11,67   1,26
 *   body-sm      15   icon-xs   13,33   1,25
 *   body         16   icon-xs   13,33   1,17
 *   body-lg      18   icon-sm   15,00   1,17
 *   h4           20   icon-md   16,67   1,17
 *   h3           24   icon-lg   20,00   1,17
 *   h2           28   icon-xl   23,33   1,17
 *
 * ⚠️ `micro` (11 px) n'a pas de cran à sa mesure : 14 px est le plancher de
 * l'échelle et donne 1,49. Un cran à 12 px le corrigerait, mais 12 et 14 sont
 * trop proches pour coexister dans une échelle. On accepte, en sachant que
 * l'icône y pèse un peu plus que son mot.
 *
 * ⚠️ Ceci vaut pour une icône posée EN LIGNE à côté de son étiquette. Une icône
 * dans une PASTILLE obéit à une autre règle : c'est la pastille qui s'apparie au
 * texte, et le glyphe vaut environ la moitié de la pastille. `SectionHeader`
 * l'applique déjà, à 0,5 exactement sur ses quatre tailles.
 */

/** Le pas de texte, tel qu'il s'écrit en classe Tailwind. */
export type PasTexte =
  | 'micro' | 'caption' | 'body-sm' | 'body' | 'body-lg' | 'h4' | 'h3' | 'h2';

/** La classe d'icône appariée à chaque pas. */
export const ICONE_POUR_TEXTE: Record<PasTexte, string> = {
  micro:     'icon-2xs',
  caption:   'icon-2xs',
  'body-sm': 'icon-xs',
  body:      'icon-xs',
  'body-lg': 'icon-sm',
  h4:        'icon-md',
  h3:        'icon-lg',
  h2:        'icon-xl',
};

/** La même table en pixels, pour les composants qui passent `size={n}` à Lucide. */
export const TAILLE_POUR_TEXTE: Record<PasTexte, number> = {
  micro: 14, caption: 14, 'body-sm': 16, body: 16,
  'body-lg': 18, h4: 20, h3: 24, h2: 28,
};
