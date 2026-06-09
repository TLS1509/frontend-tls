import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Code Connect — Button component set (1109:58)
 * File: LccBZ1GKWQVwVzPtsSzk5Y
 *
 * Maps Figma variant properties to React props.
 * State dimension (rest/hover/active/focus) = CSS-driven, not mapped.
 * Deprecated aliases: warm → secondary, brand-ghost → ghost (kept in Figma for compat).
 */
figma.connect(
  Button,
  'https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=1109-58',
  {
    props: {
      variant: figma.enum('variant', {
        primary:            'primary',
        secondary:          'secondary',
        accent:             'accent',
        ghost:              'ghost',
        'brand-ghost':      'ghost',      // deprecated alias → ghost
        destructive:        'destructive',
        'glass-light':      'glass-light',
        'glass-light-ghost':'glass-light-ghost',
        'glass-brand':      'glass-brand',
        'glass-warm':       'glass-warm',
        'glass-sun':        'glass-sun',
        link:               'link',
        warm:               'secondary',  // deprecated alias → secondary
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
