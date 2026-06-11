import { ReactNode, CSSProperties } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  noPadding?: boolean; // Option pour désactiver le padding si nécessaire
}

/**
 * Section Container - Wrapper avec padding standardisé
 * 
 * Container pour sections qui garantit l'alignement parfait de tous les éléments
 * (SectionHeader + contenu) avec le texte du hero gradient.
 * 
 * Specs TLS Design System v5.5:
 * - Padding horizontal: var(--space-6) (24px) par défaut
 * - Aligne tous les enfants (header + cards + contenu) sur la même ligne verticale
 * - Option noPadding pour désactiver si nécessaire
 * 
 * Usage Standard:
 * ```tsx
 * <SectionContainer>
 *   <SectionHeader title="Actions rapides" />
 *   <div className="grid">
 *     <ActionCard ... />
 *   </div>
 * </SectionContainer>
 * ```
 * 
 * Sans Padding (cas spécial):
 * ```tsx
 * <SectionContainer noPadding>
 *   {content}
 * </SectionContainer>
 * ```
 */
export function SectionContainer({ 
  children, 
  className = '',
  style = {},
  noPadding = false
}: SectionContainerProps) {
  return (
    <div 
      className={className}
      style={{
        paddingLeft: noPadding ? 0 : 'var(--space-6)',   // 24px
        paddingRight: noPadding ? 0 : 'var(--space-6)',  // 24px
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Section Container Responsive - Padding adaptatif selon breakpoint
 * 
 * Variante avec padding responsive pour les layouts complexes
 * - Mobile: 16px (space-4)
 * - Tablet+: 24px (space-6)
 * 
 * Usage:
 * ```tsx
 * <SectionContainerResponsive>
 *   <SectionHeader title="..." />
 *   <div>{content}</div>
 * </SectionContainerResponsive>
 * ```
 */
export function SectionContainerResponsive({ 
  children, 
  className = '',
  style = {},
}: Omit<SectionContainerProps, 'noPadding'>) {
  return (
    <div 
      className={`px-4 sm:px-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
