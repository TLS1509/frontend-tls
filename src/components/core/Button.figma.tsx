import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Code Connect — Button component set (1109:58)
 * File: LccBZ1GKWQVwVzPtsSzk5Y
 *
 * Maps Figma variant properties to React props.
 * State dimension (rest/hover/active/focus) = CSS-driven, not mapped.
 *
 * ⚠️ CE MAPPING N'EST PAS PUBLIÉ, ET NE PEUT PAS L'ÊTRE aujourd'hui.
 * Code Connect exige un plan Organization ou Enterprise ; TLS est en pro :
 * « You need a Dev or Full seat on an Organization or Enterprise plan. »
 * Le fichier compile et documente l'intention, rien de plus. Voir
 * docs/_audits/PARITE-FIGMA-CODE-2026-07-29.md
 *
 * Mise à jour du 2026-07-29 — le component set Figma a été relu node par node
 * (les 15 variantes réelles) et le mapping corrigé :
 *   - `outline` et `outline-warm` AJOUTÉS : ils existaient des deux côtés sans
 *     être liés, donc Figma ne pouvait pas les résoudre vers du code.
 *   - `brand-ghost` et `warm` RETIRÉS : ils n'existent plus dans le Figma
 *     actuel, leurs alias ne mappaient donc rien.
 *   - `glass-brand` existe bien dans Figma ; il pointe désormais vers `glass`
 *     et non plus vers `ghost`, qui était un repli arbitraire.
 */
figma.connect(
  Button,
  'https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=1109-58',
  {
    props: {
      // Les 13 variantes réellement présentes dans le component set Figma,
      // relevées le 2026-07-29. Chacune a son équivalent exact côté code.
      variant: figma.enum('variant', {
        primary:            'primary',
        secondary:          'secondary',
        accent:             'accent',
        ghost:              'ghost',
        outline:            'outline',
        'outline-warm':     'outline-warm',
        destructive:        'destructive',
        'glass-light':      'glass-light',
        'glass-light-ghost':'glass-light-ghost',
        'glass-brand':      'glass',
        'glass-warm':       'glass-warm',
        'glass-sun':        'glass-sun',
        link:               'link',
      }),
      size: figma.enum('size', {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      }),
      loading:  figma.enum('state', { loading: true }),
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ variant, size, loading, disabled }) => (
      <Button variant={variant} size={size} loading={loading} disabled={disabled}>
        Libellé
      </Button>
    ),
  }
);

/**
 * Button/Glass — dark glass set (1109:67)
 * Used on saturated/dark surfaces (hero brand, auth glass-dark).
 */
figma.connect(
  Button,
  'https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=1109-67',
  {
    props: {
      disabled: figma.enum('state', { disabled: true }),
    },
    example: ({ disabled }) => (
      <Button variant="glass" disabled={disabled}>
        Libellé
      </Button>
    ),
  }
);
