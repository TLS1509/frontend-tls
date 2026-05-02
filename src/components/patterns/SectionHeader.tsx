/**
 * SectionHeader — Consistent section title with optional icon, subtitle, and action
 * Based on Figma reference design (SectionHeader component)
 * Uses only TLS design tokens
 */
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  iconColor?: string;
  compact?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  action,
  className = '',
  iconColor = 'var(--tls-primary-500)',
  compact = false,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--s-6)',
        marginBottom: compact ? 'var(--s-4)' : 'var(--s-6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: Icon ? 'var(--s-3)' : 0,
          flex: 1,
        }}
      >
        {Icon && (
          <Icon
            style={{
              width: compact ? '1.5rem' : '1.75rem',
              height: compact ? '1.5rem' : '1.75rem',
              color: iconColor,
              flexShrink: 0,
              strokeWidth: 2,
              display: 'block',
              marginTop: '2px',
            }}
          />
        )}

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: subtitle ? 'var(--s-1)' : 0,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: compact ? 'var(--t-h4)' : 'var(--t-h3)',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--t-body-sm)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                lineHeight: 1.5,
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
};

export default SectionHeader;
