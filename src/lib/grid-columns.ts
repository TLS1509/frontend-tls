/**
 * Le colonnage des grilles — source unique, exprimée en largeur de CONTENEUR.
 *
 * Toutes les grilles du design system posaient leur colonnage sur des seuils de
 * fenêtre, chacune avec les siens. Une grille ne sait pourtant pas où elle est
 * posée : pleine page, colonne étroite d'une mise en page à deux volets, corps
 * d'une modale. Réglée sur la fenêtre, elle se trompe partout sauf dans le cas
 * pour lequel on l'a réglée — et elle se trompait déjà à pleine largeur. Mesuré
 * le 2026-09-09 sur /learning-paths : à 652 px de fenêtre la grille faisait
 * 596 px et n'affichait qu'une colonne, une carte de 596 px seule sur sa ligne,
 * quand la place tenait deux colonnes de 282.
 *
 * Les seuils sont choisis sur la largeur de carte visée, jamais transposés des
 * anciens seuils de fenêtre. Ils tiennent une carte au-dessus de 260 px partout :
 *
 *   conteneur   2 colonnes            3 colonnes            4 colonnes
 *   576 px      2 × 272
 *   896 px                            3 × 277
 *   1024 px                                                 4 × 244
 *
 * ⚠️ Les crans `@` viennent de l'échelle `--container-*` de Tailwind et se lisent
 * en largeur de conteneur : `@lg` 32rem · `@xl` 36rem · `@3xl` 48rem · `@4xl`
 * 56rem · `@5xl` 64rem. Ce ne sont PAS les seuils des variantes de fenêtre.
 *
 * ⚠️ Une requête de conteneur remonte à l'ancêtre le plus proche qui en est un,
 * **jamais à l'élément qui la porte**. Le wrapper `GRID_CONTAINER` est donc
 * obligatoire : posé sur la grille elle-même, `@container` ne produirait rien.
 */

/** Le wrapper qui fait office de conteneur mesuré. Transparent en flex comme en grille. */
export const GRID_CONTAINER = '@container w-full';

/** Colonnage pour des cartes de contenu (~260–400 px de large). */
export const GRID_COLS_CONTENT: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 @xl:grid-cols-2',
  3: 'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3',
  4: 'grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-4',
};

/** Colonnage pour des tuiles carrées ou compactes (~150–200 px). Jamais une seule colonne. */
export const GRID_COLS_TILES: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 @lg:grid-cols-3',
  4: 'grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4',
};
