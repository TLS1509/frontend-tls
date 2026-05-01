import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <div 
      className={className}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, style }: CardHeaderProps) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding: 'var(--space-6)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, style }: CardTitleProps) {
  return (
    <h3 
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--foreground)',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, style }: CardDescriptionProps) {
  return (
    <p 
      className={className}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--muted-foreground)',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className, style }: CardContentProps) {
  return (
    <div 
      className={className}
      style={{
        padding: 'var(--space-6)',
        paddingTop: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
