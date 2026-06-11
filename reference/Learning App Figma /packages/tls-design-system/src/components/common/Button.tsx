import { ReactNode, ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * Composant Button standardisé TLS
 * Variantes : primary (bleu), secondary (orange), outline, ghost, destructive, success
 * Tailles : sm, md, lg
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  
  // Styles de base
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--duration-fast) var(--ease-in-out)',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden',
  };

  // Tailles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)',
      height: '36px',
    },
    md: {
      padding: '12px 24px',
      fontSize: 'var(--text-base)',
      height: '44px',
    },
    lg: {
      padding: '16px 32px',
      fontSize: 'var(--text-lg)',
      height: '52px',
    },
  };

  // Variantes de couleur
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--gradient-primary)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
    },
    secondary: {
      background: 'linear-gradient(135deg, var(--secondary), #D67231)',
      color: 'white',
      boxShadow: '0 4px 12px rgba(237, 132, 58, 0.3)',
    },
    success: {
      background: 'linear-gradient(135deg, var(--success-600), var(--success-700))',
      color: 'white',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
    },
    destructive: {
      background: 'linear-gradient(135deg, var(--destructive-600), var(--destructive-700))',
      color: 'white',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '2px solid var(--primary)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'rgba(85, 161, 180, 0.08)',
      color: 'var(--primary)',
      boxShadow: 'none',
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    
    if (variant === 'primary') {
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = '0 8px 20px rgba(85, 161, 180, 0.4)';
    } else if (variant === 'secondary') {
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = '0 8px 20px rgba(237, 132, 58, 0.4)';
    } else if (variant === 'success') {
      target.style.transform = 'translateY(-2px)';
      target.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.4)';
    } else if (variant === 'outline') {
      target.style.background = 'var(--primary-50)';
    } else if (variant === 'ghost') {
      target.style.background = 'rgba(85, 161, 180, 0.15)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    target.style.transform = 'translateY(0)';
    
    if (variant === 'primary') {
      target.style.boxShadow = '0 4px 12px rgba(85, 161, 180, 0.3)';
    } else if (variant === 'secondary') {
      target.style.boxShadow = '0 4px 12px rgba(237, 132, 58, 0.3)';
    } else if (variant === 'success') {
      target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
    } else if (variant === 'outline') {
      target.style.background = 'transparent';
    } else if (variant === 'ghost') {
      target.style.background = 'rgba(85, 161, 180, 0.08)';
    }
  };

  return (
    <button
      className={className}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            width: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
            height: size === 'sm' ? '14px' : size === 'md' ? '16px' : '18px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      )}

      {/* Icon Left */}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
      )}

      {/* Children */}
      <span>{children}</span>

      {/* Icon Right */}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} />
      )}

      {/* Spin Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
