import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  iconColor?: string; // Nouvelle option pour personnaliser la couleur
}

/**
 * Section Header - Avec icône colorée inline (optionnelle)
 * 
 * Header de section standardisé TLS
 * Utilisé pour les titres de sections dans toute l'app
 * 
 * Specs TLS Design System v6.0:
 * - Icône: 28px (1.75rem) - inline, colorée, SANS conteneur/background (optionnelle)
 * - Titre: League Spartan • font-bold • text-2xl (24px) • leading-tight
 * - Subtitle: Nunito • text-sm (14px) • color: muted-foreground
 * - Gap entre icône et texte: space-3 (12px) - supprimé si pas d'icône
 * - Icône colorée avec couleur primaire par défaut
 * - Icône alignée FLEX-START (top) avec le bloc de texte
 * - PAS de padding interne - doit être wrappé dans un container avec padding pour alignement
 * - Utilise UNIQUEMENT les variables CSS du design system
 * 
 * Usage:
 * <div style={{ paddingLeft: 'var(--space-6)', paddingRight: 'var(--space-6)' }}>
 *   <SectionHeader title="..." />
 *   <div>{content}</div>
 * </div>
 */
export function SectionHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  action, 
  className = '',
  iconColor = 'var(--primary)'
}: SectionHeaderProps) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
        // Pas de padding ici - sera géré par le container parent
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: Icon ? 'var(--space-3)' : 0,
          flex: 1,
        }}
      >
        {/* Icône colorée inline - SANS conteneur - Alignée en haut */}
        {Icon && (
          <Icon 
            style={{ 
              width: '1.75rem', // 28px - proportionnée au titre
              height: '1.75rem',
              color: iconColor,
              flexShrink: 0,
              strokeWidth: 2,
              display: 'block',
              marginTop: '2px', // Ajustement optique pour aligner avec la baseline du texte
            }} 
          />
        )}

        <div style={{ 
          flex: 1, 
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: subtitle ? 'var(--space-1)' : 0,
        }}>
          <h2 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
            }}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--leading-normal)',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {action && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}

/**
 * Section Header Compact - Version plus petite avec icône inline (optionnelle)
 * 
 * Variante compacte pour les sous-sections
 * 
 * Specs:
 * - Icône: 24px (1.5rem) - inline, colorée, SANS conteneur (optionnelle)
 * - Titre: text-xl (20px)
 * - Margin bottom réduit: space-4 (16px)
 * - Alignement: flex-start (top)
 */
export function SectionHeaderCompact({ 
  icon: Icon, 
  title, 
  subtitle, 
  action, 
  className = '',
  iconColor = 'var(--primary)'
}: SectionHeaderProps) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-4)',
        // Pas de padding ici - sera géré par le container parent
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: Icon ? 'var(--space-2)' : 0,
          flex: 1,
        }}
      >
        {/* Icône colorée inline - SANS conteneur - Alignée en haut */}
        {Icon && (
          <Icon 
            style={{ 
              width: '1.5rem', // 24px
              height: '1.5rem',
              color: iconColor,
              flexShrink: 0,
              strokeWidth: 2,
              display: 'block',
              marginTop: '2px', // Ajustement optique
            }} 
          />
        )}

        <div style={{ 
          flex: 1, 
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: subtitle ? 'var(--space-1)' : 0,
        }}>
          <h3 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
            }}
          >
            {title}
          </h3>
          
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--leading-normal)',
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {action && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}
