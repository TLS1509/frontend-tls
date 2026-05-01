/**
 * PageHeaderSimple
 *
 * Reusable page header pattern with title, description, and optional actions.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <PageHeaderSimple
 *   title="My Page"
 *   description="This is a description"
 *   actions={<Button>Action</Button>}
 * />
 */

import React from 'react';

interface PageHeaderSimpleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeaderSimple: React.FC<PageHeaderSimpleProps> = ({
  title,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Title */}
      <h1
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--t-h1)',
          fontWeight: 700,
          color: 'var(--text)',
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: 'var(--t-body)',
            color: 'var(--text-muted)',
            margin: '0 0 var(--s-4)',
          }}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {actions && (
        <div style={{ display: 'flex', gap: 'var(--s-2)', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeaderSimple;
