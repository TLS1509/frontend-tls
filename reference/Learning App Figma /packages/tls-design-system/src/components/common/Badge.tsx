import { ReactNode } from 'react';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'info' | 'neutral' | 'destructive' | 'primary' | 'accent' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  count?: number;
  dot?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * Composant Badge standardisé TLS
 * Utilisé pour statuts, tags, compteurs, labels
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  count,
  dot = false,
  children,
  className = '',
}: BadgeProps) {
  
  // Styles de base
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--radius-full)',
    whiteSpace: 'nowrap',
  };

  // Tailles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: count !== undefined ? '4px 8px' : '4px 10px',
      fontSize: 'var(--text-xs)',
      height: count !== undefined ? '20px' : 'auto',
      minWidth: count !== undefined ? '20px' : 'auto',
    },
    md: {
      padding: count !== undefined ? '6px 10px' : '6px 12px',
      fontSize: 'var(--text-sm)',
      height: count !== undefined ? '24px' : 'auto',
      minWidth: count !== undefined ? '24px' : 'auto',
    },
    lg: {
      padding: count !== undefined ? '8px 12px' : '8px 16px',
      fontSize: 'var(--text-base)',
      height: count !== undefined ? '32px' : 'auto',
      minWidth: count !== undefined ? '32px' : 'auto',
    },
  };

  // Variantes de couleur
  const variantStyles: Record<string, React.CSSProperties> = {
    success: {
      background: 'var(--success-100)',
      color: 'var(--success-700)',
    },
    warning: {
      background: 'var(--warning-100)',
      color: 'var(--warning-700)',
    },
    info: {
      background: 'var(--info-100)',
      color: 'var(--info-700)',
    },
    neutral: {
      background: 'var(--neutral-100)',
      color: 'var(--neutral-700)',
    },
    destructive: {
      background: 'var(--destructive-100)',
      color: 'var(--destructive-700)',
    },
    primary: {
      background: 'var(--primary-50)',
      color: 'var(--primary)',
    },
    accent: {
      background: 'var(--accent-50)',
      color: 'var(--accent)',
    },
    secondary: {
      background: 'rgba(237, 132, 58, 0.1)',
      color: 'var(--secondary)',
    },
  };

  // Couleurs de compteur optimisées pour contraste
  const getCounterColor = (variant: string): string => {
    const counterColors: Record<string, string> = {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      accent: 'var(--accent)', // Jaune TLS
      warning: '#D89B2F', // Jaune foncé au lieu de var(--warning-700) marron
      success: 'var(--success-700)',
      destructive: 'var(--destructive-700)',
      info: 'var(--info-700)',
      neutral: 'var(--neutral-700)',
    };
    return counterColors[variant] || 'var(--foreground)';
  };

  // Si c'est un compteur uniquement
  if (count !== undefined && !children) {
    return (
      <span
        className={className}
        style={{
          ...baseStyles,
          ...sizeStyles[size],
          ...variantStyles[variant],
          justifyContent: 'center',
        }}
      >
        {count > 99 ? '99+' : count}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          style={{
            width: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
            height: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
          }}
        />
      )}

      {/* Content */}
      {children}

      {/* Count badge */}
      {count !== undefined && children && (
        <span
          style={{
            background: getCounterColor(variant),
            color: 'white',
            padding: '2px 6px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-bold)',
            minWidth: '20px',
            textAlign: 'center',
            marginLeft: 'var(--space-1)',
          }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </span>
  );
}

/**
 * Badge avec gradient (pour éléments premium)
 */
export function GradientBadge({
  children,
  size = 'md',
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '4px 10px',
      fontSize: 'var(--text-xs)',
    },
    md: {
      padding: '6px 12px',
      fontSize: 'var(--text-sm)',
    },
    lg: {
      padding: '8px 16px',
      fontSize: 'var(--text-base)',
    },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'var(--gradient-primary)',
        color: 'white',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--font-weight-bold)',
        borderRadius: 'var(--radius-full)',
        letterSpacing: '0.05em',
        ...sizeStyles[size],
      }}
    >
      {children}
    </span>
  );
}
