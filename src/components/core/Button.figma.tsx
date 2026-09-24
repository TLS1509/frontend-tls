import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Code Connect — Button component set (1109:58)
 * Fichier : LccBZ1GKWQVwVzPtsSzk5Y
 *
 * ⚠️ CE MAPPING N'EST PAS PUBLIÉ, ET NE PEUT PAS L'ÊTRE aujourd'hui.
 * Code Connect exige un plan Organization ou Enterprise ; TLS est en pro :
 * « You need a Dev or Full seat on an Organization or Enterprise plan. »
 * Le fichier compile et documente l'intention, rien de plus. Voir
 * docs/_audits/PARITE-FIGMA-CODE-2026-07-29.md
 *
 * ── Mise à jour du 2026-09-17 : le renommage `emphasis` × `tone` ──────────
 *
 * Le component set Figma garde sa propriété `variant` et ses 13 valeurs : les
 * retirer casserait toutes les instances du fichier DS. Mais le code, lui, ne
 * porte plus de classes sous ces noms — ce sont des alias vers une case de la
 * grille. Le mapping traduit donc chaque valeur Figma en COORDONNÉES, et
 * l'exemple émet l'API publique, pas l'alias déprécié.
 *
 * Les 102 symboles du set ont été repeints le même jour sur les valeurs du code
 * (fonds, filets au cran 700, labels au 800, graisse 700, hauteur `xl` à 52 px,
 * verre clair à encre foncée). Node IDs inspectés et mutés : la liste complète
 * est dans le message du commit et dans docs/_audits/.
 *
 * ⚠️ Trois valeurs Figma sont désormais des DOUBLONS exacts, et c'est le
 * renommage qui les a rendus visibles : `ghost` ≡ `outline`, `glass-warm` ≡
 * `secondary`, `glass-sun` ≡ `accent`. Elles sont repeintes à l'identique plutôt
 * que supprimées — retirer une valeur de variante détache les instances. À
 * traiter dans une passe de migration d'instances, pas ici.
 */

/** Chaque valeur Figma → la case de la grille qu'elle désigne. */
const EMPHASE = {
  primary: 'soft', secondary: 'soft', accent: 'soft',
  ghost: 'outline', outline: 'outline', 'outline-warm': 'outline',
  destructive: 'solid', link: 'link',
  glass: 'solid',
  'glass-light': 'soft', 'glass-light-ghost': 'ghost',
  'glass-warm': 'soft', 'glass-sun': 'soft',
} as const;

const TON = {
  primary: 'brand', secondary: 'warm', accent: 'sun',
  ghost: 'brand', outline: 'brand', 'outline-warm': 'warm',
  destructive: 'danger', link: 'brand',
  glass: 'brand',
  'glass-light': 'neutral', 'glass-light-ghost': 'neutral',
  'glass-warm': 'warm', 'glass-sun': 'sun',
} as const;

figma.connect(
  Button,
  'https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=1109-58',
  {
    props: {
      emphasis: figma.enum('variant', EMPHASE),
      tone: figma.enum('variant', TON),
      /* Arbitrage n°22 (2026-09-24) : trois hauteurs, 36 · 44 · 52. Le `xl` du
         set Figma (52) est le `lg` du code ; `xl` n'y est plus qu'un alias
         déprécié. Le set garde ses quatre valeurs tant que ses symboles ne sont
         pas repeints (sm 32 → 36, lg 48 → 52). */
      size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'lg' }),
      loading: figma.enum('state', { loading: true }),
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ emphasis, tone, size, loading, disabled }) => (
      <Button emphasis={emphasis} tone={tone} size={size} loading={loading} disabled={disabled}>
        Libellé
      </Button>
    ),
  }
);

/**
 * Button/Glass — dark glass set (1109:67)
 * Posé sur une surface saturée ou sombre. `onDark` n'est pas un ton : c'est le
 * même niveau exprimé en blanc, et il exige un fond au cran 700 ou plus sombre
 * (mesuré : du blanc tombe à 3,66 sur le cran 600, 2,94 sur le 500).
 */
figma.connect(
  Button,
  'https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=1109-67',
  {
    props: {
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ disabled }) => (
      <Button emphasis="solid" onDark disabled={disabled}>
        Libellé
      </Button>
    ),
  }
);
