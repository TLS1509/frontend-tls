import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  badge?: {
    text: string;
    bg: string;
    color: string;
  };
}

/**
 * Card glassmorphism standardisée TLS
 * Utilisée pour tous les contenus (actualités, notifications, entrées journal, etc.)
 */
export function GlassCard({ 
  children, 
  onClick, 
  className = '', 
  hover = true,
  icon: Icon,
  iconColor,
  iconBg,
  badge
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl transition-all duration-500 relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        padding: 'var(--card-padding-y) var(--card-padding-x)',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.1), 0 0 40px 0 rgba(85, 161, 180, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
        }
      }}
    >
      {/* Glow Effect */}
      {iconColor && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 0% 50%, ${iconColor}15 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="relative z-10 flex items-start" style={{ gap: 'var(--card-gap)' }}>
        {/* Icon */}
        {Icon && (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: iconBg || 'var(--primary-50)',
            }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor || 'var(--primary)' }} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* Badge */}
        {badge && (
          <span 
            className="px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: badge.bg,
              color: badge.color,
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {badge.text}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Titre de card standardisé - 18px Bold (700) - Option 2
 */
export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 
      className={className}
      style={{ 
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-display)',
        lineHeight: 'var(--leading-tight)',
        margin: 0,
        marginBottom: 'var(--space-1-5)', /* 6px - espace très étroit avec meta */
      }}
    >
      {children}
    </h3>
  );
}

/**
 * Meta de card standardisé - SUR UNE SEULE LIGNE, AVANT la description
 */
export function CardMeta({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div 
      className={className}
      style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)', /* Gap entre les meta items */
        fontSize: 'var(--text-sm)',
        color: 'var(--muted-foreground)',
        fontFamily: 'var(--font-body)',
        marginBottom: 'var(--space-3)', /* 12px - réduit pour séparation avec description */
      }}
    >
      {children}
    </div>
  );
}

/**
 * Contenu de card standardisé - APRÈS les meta
 */
export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p 
      className={className}
      style={{ 
        fontSize: 'var(--text-base)',
        color: 'var(--foreground)',
        lineHeight: 'var(--leading-relaxed)',
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}
