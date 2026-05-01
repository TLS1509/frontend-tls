import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'light' | 'strong' | 'card';
  blur?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  border?: 'default' | 'light' | 'strong';
  shadow?: 'sm' | 'default' | 'lg';
  style?: CSSProperties;
}

export function GlassCard({
  children,
  className = '',
  variant = 'card',
  blur = 'xl',
  border = 'default',
  shadow = 'default',
  style,
}: GlassCardProps) {
  const backgrounds = {
    white: 'var(--glass-white)',
    light: 'var(--glass-white-light)',
    strong: 'var(--glass-white-strong)',
    card: 'var(--glass-card)',
  };

  const borders = {
    default: 'var(--glass-border)',
    light: 'var(--glass-border-light)',
    strong: 'var(--glass-border-strong)',
  };

  const shadows = {
    sm: 'var(--glass-shadow-sm)',
    default: 'var(--glass-shadow)',
    lg: 'var(--glass-shadow-lg)',
  };

  const blurs = {
    xs: 'var(--blur-xs)',
    sm: 'var(--blur-sm)',
    md: 'var(--blur-md)',
    lg: 'var(--blur-lg)',
    xl: 'var(--blur-xl)',
    '2xl': 'var(--blur-2xl)',
    '3xl': 'var(--blur-3xl)',
  };

  return (
    <div
      className={className}
      style={{
        background: backgrounds[variant],
        backdropFilter: blurs[blur],
        WebkitBackdropFilter: blurs[blur],
        border: `1px solid ${borders[border]}`,
        boxShadow: shadows[shadow],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
