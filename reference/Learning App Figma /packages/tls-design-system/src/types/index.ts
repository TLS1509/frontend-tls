/**
 * Types globaux pour @tls/design-system
 */

// Variantes de couleur TLS
export type TLSColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'info';

// Tailles standardisées
export type Size = 'sm' | 'md' | 'lg' | 'xl';

// Variantes de badge
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'outline';

// Variantes de bouton
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';

// Position des icônes
export type IconPosition = 'left' | 'right';

// Props communes pour les composants
export interface CommonComponentProps {
  className?: string;
  style?: React.CSSProperties;
}
