import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ButtonEnhancedProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function ButtonEnhanced({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonEnhancedProps) {
  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'var(--gradient-primary)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
        hoverShadow: '0 6px 20px rgba(85, 161, 180, 0.4)',
      },
      secondary: {
        background: 'var(--gradient-secondary)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(237, 132, 58, 0.3)',
        hoverShadow: '0 6px 20px rgba(237, 132, 58, 0.4)',
      },
      accent: {
        background: 'var(--gradient-accent)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(248, 176, 68, 0.3)',
        hoverShadow: '0 6px 20px rgba(248, 176, 68, 0.4)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--foreground)',
        border: '1px solid var(--neutral-200)',
        boxShadow: 'none',
        hoverShadow: 'var(--shadow-sm)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--foreground)',
        border: '1px solid var(--neutral-200)',
        boxShadow: 'none',
        hoverShadow: 'var(--shadow-sm)',
      },
      danger: {
        background: 'linear-gradient(135deg, var(--error-600), var(--error-700))',
        color: 'white',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
        hoverShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
      },
      success: {
        background: 'linear-gradient(135deg, var(--success-600), var(--success-700))',
        color: 'white',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        hoverShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
      },
    };
    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      xs: { 
        padding: '6px 12px', 
        fontSize: 'var(--text-xs)',
        borderRadius: 'var(--radius-md)',
      },
      sm: { 
        padding: '8px 16px', 
        fontSize: 'var(--text-sm)',
        borderRadius: 'var(--radius-lg)',
      },
      md: { 
        padding: '12px 24px', 
        fontSize: 'var(--text-base)',
        borderRadius: 'var(--radius-xl)',
      },
      lg: { 
        padding: '16px 32px', 
        fontSize: 'var(--text-lg)',
        borderRadius: 'var(--radius-2xl)',
      },
    };
    return sizes[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { 
        scale: 1.02,
        boxShadow: variantStyles.hoverShadow,
      } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center gap-2 transition-all duration-200 ${className}`}
      style={{
        ...variantStyles,
        ...sizeStyles,
        width: fullWidth ? '100%' : 'auto',
        fontWeight: 'var(--font-weight-semibold)',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
      {...props}
    >
      {/* Shine effect on hover */}
      {!disabled && !isLoading && (
        <motion.div
          className="absolute inset-0"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Chargement...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </div>
    </motion.button>
  );
}