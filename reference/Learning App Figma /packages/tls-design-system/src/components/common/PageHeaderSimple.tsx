import { ReactNode } from 'react';

interface PageHeaderSimpleProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  variant?: 'default' | 'compact';
}

/**
 * Page Header Simple - Sans icône ni bordure
 * 
 * Design épuré et moderne sans conteneur d'icône
 * Focus sur la typographie et la hiérarchie visuelle
 * 
 * Specs TLS Design System:
 * - Titre: League Spartan • font-bold • text-4xl (36px) • leading-tight
 * - Description: Nunito • font-medium • text-base (16px) • color: muted-foreground
 * - Structure: flex items-start justify-between
 * - Margin Bottom: space-8 (32px)
 * - PAS de bordure (line divider supprimée)
 * - Utilise UNIQUEMENT les variables CSS du design system
 */
export function PageHeaderSimple({ 
  title, 
  description, 
  actions,
  variant = 'default'
}: PageHeaderSimpleProps) {
  const isCompact = variant === 'compact';
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        gap: 'var(--space-4)',
        marginBottom: isCompact ? 'var(--space-6)' : 'var(--space-8)',
      }}
    >
      <div style={{ 
        flex: 1, 
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: description ? 'var(--space-2)' : 0,
      }}>
        <h1 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: isCompact ? 'var(--text-3xl)' : 'var(--text-4xl)', 
            fontWeight: 'var(--font-weight-bold)', 
            color: 'var(--foreground)', 
            lineHeight: 'var(--leading-tight)', 
            margin: 0,
          }}
        >
          {title}
        </h1>
        
        {description && (
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-base)', 
              fontWeight: 'var(--font-weight-medium)', 
              color: 'var(--muted-foreground)', 
              lineHeight: 'var(--leading-normal)', 
              margin: 0 
            }}
          >
            {description}
          </p>
        )}
      </div>
      
      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * Page Header avec Badge - Sans icône ni bordure + Badge coloré
 * 
 * Variante avec un badge pour indiquer un status ou une catégorie
 * 
 * Specs:
 * - Badge: text-xs • font-semibold • padding: 4px 12px • radius-full
 * - Badge Colors: background coloré + texte contrastant
 * - PAS de bordure (line divider supprimée)
 * - Utilise UNIQUEMENT les variables CSS du design system
 */
interface PageHeaderWithBadgeProps extends PageHeaderSimpleProps {
  badge?: {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning';
  };
}

export function PageHeaderWithBadge({ 
  title, 
  description, 
  actions,
  badge,
  variant = 'default'
}: PageHeaderWithBadgeProps) {
  const isCompact = variant === 'compact';
  
  const badgeColors = {
    primary: { bg: 'var(--primary)', color: 'white' },
    secondary: { bg: 'var(--secondary)', color: 'white' },
    success: { bg: 'var(--success)', color: 'white' },
    warning: { bg: 'var(--warning)', color: 'var(--foreground)' },
  };
  
  const badgeStyle = badge ? badgeColors[badge.variant || 'primary'] : null;
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        gap: 'var(--space-4)',
        marginBottom: isCompact ? 'var(--space-6)' : 'var(--space-8)',
      }}
    >
      <div style={{ 
        flex: 1, 
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: description ? 'var(--space-2)' : 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: isCompact ? 'var(--text-3xl)' : 'var(--text-4xl)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--foreground)', 
              lineHeight: 'var(--leading-tight)', 
              margin: 0,
            }}
          >
            {title}
          </h1>
          
          {badge && badgeStyle && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: badgeStyle.bg,
                color: badgeStyle.color,
                whiteSpace: 'nowrap',
              }}
            >
              {badge.label}
            </span>
          )}
        </div>
        
        {description && (
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-base)', 
              fontWeight: 'var(--font-weight-medium)', 
              color: 'var(--muted-foreground)', 
              lineHeight: 'var(--leading-normal)', 
              margin: 0 
            }}
          >
            {description}
          </p>
        )}
      </div>
      
      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
