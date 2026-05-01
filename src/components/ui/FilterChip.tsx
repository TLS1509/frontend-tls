import React from 'react';

export interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'reset';
  className?: string;
  'aria-label'?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  icon,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
}) => {
  const isReset = variant === 'reset';

  return (
    <button
      onClick={onClick}
      className={className}
      aria-pressed={!isReset ? active : undefined}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--s-1)',
        padding: 'var(--s-2) var(--s-3)',
        borderRadius: 'var(--r-pill)',
        border: active ? '2px solid var(--tls-primary-500)' : '1.5px solid var(--border)',
        background: active ? 'var(--tls-primary-50)' : 'transparent',
        color: active ? 'var(--tls-primary-600)' : 'var(--text-muted)',
        fontSize: 'var(--t-caption)',
        fontWeight: active ? 600 : 500,
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!active && !isReset) {
          e.currentTarget.style.background = 'var(--surface-muted)';
          e.currentTarget.style.color = 'var(--text)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !isReset) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-muted)';
        }
      }}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {label}
    </button>
  );
};
