/**
 * PageHeader
 *
 * Full-featured page header with optional eyebrow text, title, description, and actions.
 * All values use design tokens — no hardcoded colors or sizes.
 *
 * Usage:
 * <PageHeader
 *   eyebrow={{ icon: <Zap size={14} />, text: "Section" }}
 *   title="Page Title"
 *   description="Longer description of the section content"
 *   actions={<Button>Action</Button>}
 * />
 */

import React from 'react';

interface EyebrowProps {
  icon?: React.ReactNode;
  text: string;
}

interface PageHeaderProps {
  eyebrow?: EyebrowProps;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  className = '',
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 'var(--s-6)',
        marginBottom: 'var(--s-10)',
        ...style,
      }}
    >
      {/* Left: eyebrow + title + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
        {/* Optional eyebrow */}
        {eyebrow && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              fontSize: 'var(--t-caption)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}
          >
            {eyebrow.icon && (
              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                {eyebrow.icon}
              </span>
            )}
            {eyebrow.text}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--t-h1)',
            fontWeight: 800,
            color: 'var(--text)',
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>

        {/* Optional description */}
        {description && (
          <p
            style={{
              fontSize: 'var(--t-body)',
              color: 'var(--text-muted)',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Right: optional actions */}
      {actions && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--s-3)',
            alignItems: 'center',
            flexShrink: 0,
            paddingTop: 'var(--s-1)',
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
