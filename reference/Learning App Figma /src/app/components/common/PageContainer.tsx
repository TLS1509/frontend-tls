import React, { CSSProperties } from 'react';

/**
 * PageContainer - Conteneur principal standardisé pour toutes les pages
 * 
 * Utilise exclusivement les variables CSS du design system TLS.
 * Assure une cohérence visuelle sur toutes les pages de l'application.
 * 
 * @example
 * ```tsx
 * <PageContainer>
 *   <Section spacing="large">
 *     <h1>Titre</h1>
 *   </Section>
 * </PageContainer>
 * ```
 */

interface PageContainerProps {
  children: React.ReactNode;
  /** Mode pour pages avec sidebar viewer (article, leçon) */
  isViewerMode?: boolean;
  /** Padding custom (par défaut: var(--space-8)) */
  padding?: string;
  /** Padding top custom (par défaut: var(--space-20) pour éviter header mobile) */
  paddingTop?: string;
  /** Max width custom (par défaut: 1400px) */
  maxWidth?: string;
  /** Styles additionnels */
  style?: CSSProperties;
  /** Classes CSS additionnelles */
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  isViewerMode = false,
  padding = 'var(--space-8)',
  paddingTop = 'var(--space-20)',
  maxWidth = '1400px',
  style = {},
  className = '',
}) => {
  return (
    <div 
      className={className}
      style={{ 
        maxWidth: isViewerMode ? '100%' : maxWidth,
        margin: '0 auto',
        padding,
        paddingTop,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Section - Conteneur de section avec margins standardisées
 * 
 * Gère l'espacement vertical entre les grandes sections de page.
 * 
 * @example
 * ```tsx
 * <Section spacing="large">
 *   <h2>Section Title</h2>
 *   <p>Content...</p>
 * </Section>
 * ```
 */

interface SectionProps {
  children: React.ReactNode;
  /** Taille du spacing en dessous */
  spacing?: 'small' | 'medium' | 'large' | 'none';
  /** Styles additionnels */
  style?: CSSProperties;
  /** Classes CSS additionnelles */
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  spacing = 'large',
  style = {},
  className = '',
}) => {
  const getMarginBottom = () => {
    switch (spacing) {
      case 'large': return 'var(--space-12)';   // 48px - Sections principales
      case 'medium': return 'var(--space-8)';   // 32px - Sections standards
      case 'small': return 'var(--space-6)';    // 24px - Sous-sections
      case 'none': return '0';
      default: return 'var(--space-12)';
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        marginBottom: getMarginBottom(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * CardContainer - Conteneur de card avec padding standardisé
 * 
 * Wrapper pour appliquer un padding uniforme selon la taille de la card.
 * 
 * @example
 * ```tsx
 * <CardContainer size="large" glassmorphism>
 *   <h3>Card Title</h3>
 *   <p>Content...</p>
 * </CardContainer>
 * ```
 */

interface CardContainerProps {
  children: React.ReactNode;
  /** Taille de la card (définit le padding) */
  size?: 'small' | 'medium' | 'large';
  /** Active le style glassmorphism TLS */
  glassmorphism?: boolean;
  /** Radius custom (par défaut selon size) */
  borderRadius?: string;
  /** Styles additionnels */
  style?: CSSProperties;
  /** Classes CSS additionnelles */
  className?: string;
  /** Handler onClick */
  onClick?: () => void;
}

export const CardContainer: React.FC<CardContainerProps> = ({ 
  children, 
  size = 'medium',
  glassmorphism = true,
  borderRadius,
  style = {},
  className = '',
  onClick,
}) => {
  const getPadding = () => {
    switch (size) {
      case 'large': return 'var(--space-8)';   // 32px - Hero cards, features
      case 'medium': return 'var(--space-6)';  // 24px - Cards standards
      case 'small': return 'var(--space-4)';   // 16px - List items, notifications
      default: return 'var(--space-6)';
    }
  };

  const getBorderRadius = () => {
    if (borderRadius) return borderRadius;
    switch (size) {
      case 'large': return 'var(--radius-2xl)';  // 24px
      case 'medium': return 'var(--radius-xl)';  // 16px
      case 'small': return 'var(--radius-lg)';   // 10px
      default: return 'var(--radius-xl)';
    }
  };

  const getBoxShadow = () => {
    switch (size) {
      case 'large': return '0 8px 32px rgba(0, 0, 0, 0.08)';
      case 'medium': return '0 4px 16px rgba(0, 0, 0, 0.06)';
      case 'small': return '0 2px 8px rgba(0, 0, 0, 0.04)';
      default: return '0 4px 16px rgba(0, 0, 0, 0.06)';
    }
  };

  const glassStyle: CSSProperties = glassmorphism ? {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  } : {};

  return (
    <div 
      className={className}
      onClick={onClick}
      style={{ 
        padding: getPadding(),
        borderRadius: getBorderRadius(),
        boxShadow: getBoxShadow(),
        transition: 'all var(--duration-base) var(--ease-out)',
        ...glassStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * GridContainer - Conteneur grid avec gap standardisé
 * 
 * Wrapper pour créer des grids responsive avec gap uniforme.
 * 
 * @example
 * ```tsx
 * <GridContainer columns={{ default: 1, md: 2, lg: 3 }} gap="medium">
 *   <CardContainer>Card 1</CardContainer>
 *   <CardContainer>Card 2</CardContainer>
 *   <CardContainer>Card 3</CardContainer>
 * </GridContainer>
 * ```
 */

interface GridContainerProps {
  children: React.ReactNode;
  /** Colonnes par breakpoint ou auto-fill */
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  } | 'auto-fill';
  /** Largeur min des colonnes en mode auto-fill */
  minColumnWidth?: string;
  /** Taille du gap */
  gap?: 'small' | 'medium' | 'large';
  /** Styles additionnels */
  style?: CSSProperties;
  /** Classes CSS additionnelles */
  className?: string;
}

export const GridContainer: React.FC<GridContainerProps> = ({ 
  children, 
  columns = 'auto-fill',
  minColumnWidth = '300px',
  gap = 'medium',
  style = {},
  className = '',
}) => {
  const getGap = () => {
    switch (gap) {
      case 'large': return 'var(--space-6)';   // 24px
      case 'medium': return 'var(--space-4)';  // 16px
      case 'small': return 'var(--space-2)';   // 8px
      default: return 'var(--space-4)';
    }
  };

  const getGridTemplateColumns = () => {
    if (columns === 'auto-fill') {
      return `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`;
    }
    // Si c'est un objet avec breakpoints, utiliser le default
    return `repeat(${columns.default || 1}, 1fr)`;
  };

  return (
    <div 
      className={className}
      style={{ 
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: getGap(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * FlexContainer - Conteneur flex avec gap standardisé
 * 
 * Wrapper pour créer des layouts flex avec gap uniforme.
 * 
 * @example
 * ```tsx
 * <FlexContainer direction="row" gap="small" align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </FlexContainer>
 * ```
 */

interface FlexContainerProps {
  children: React.ReactNode;
  /** Direction du flex */
  direction?: 'row' | 'column';
  /** Alignement vertical */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justification horizontale */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Wrap */
  wrap?: boolean;
  /** Taille du gap */
  gap?: 'small' | 'medium' | 'large';
  /** Styles additionnels */
  style?: CSSProperties;
  /** Classes CSS additionnelles */
  className?: string;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({ 
  children, 
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'medium',
  style = {},
  className = '',
}) => {
  const getGap = () => {
    switch (gap) {
      case 'large': return 'var(--space-6)';   // 24px
      case 'medium': return 'var(--space-4)';  // 16px
      case 'small': return 'var(--space-2)';   // 8px
      default: return 'var(--space-4)';
    }
  };

  const getAlignItems = () => {
    switch (align) {
      case 'start': return 'flex-start';
      case 'center': return 'center';
      case 'end': return 'flex-end';
      case 'stretch': return 'stretch';
      default: return 'flex-start';
    }
  };

  const getJustifyContent = () => {
    switch (justify) {
      case 'start': return 'flex-start';
      case 'center': return 'center';
      case 'end': return 'flex-end';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      default: return 'flex-start';
    }
  };

  return (
    <div 
      className={className}
      style={{ 
        display: 'flex',
        flexDirection: direction,
        alignItems: getAlignItems(),
        justifyContent: getJustifyContent(),
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap: getGap(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
