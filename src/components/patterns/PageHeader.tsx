import React from 'react';

/**
 * PageHeader — Canonical page-level header.
 *
 * Replaces both PageHeader and PageHeaderSimple (deprecated).
 *
 * - Optional eyebrow chip with icon
 * - Title (h1) — responsive clamp
 * - Optional description (max 600px)
 * - Optional actions slot (right side)
 * - Variant: 'default' | 'tight' (less spacing)
 *
 * Use SectionHeader for section-level headings within a page.
 */

interface EyebrowProps {
  icon?: React.ReactNode;
  text: string;
}

export interface PageHeaderProps {
  eyebrow?: EyebrowProps;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'tight';
  align?: 'left' | 'center';
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  variant = 'default',
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';
  const tight = variant === 'tight';

  const wrapperClasses = [
    'flex gap-6 flex-wrap',
    isCenter ? 'flex-col items-center text-center' : 'justify-between items-start',
    tight ? 'mb-6' : 'mb-10',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [
    'flex flex-col',
    tight ? 'gap-1.5' : 'gap-2',
    isCenter ? 'items-center max-w-[760px]' : 'min-w-0 flex-1',
  ].join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={contentClasses}>
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 self-start text-caption font-bold uppercase tracking-[0.1em] text-primary-700 px-2.5 py-1 rounded-pill bg-primary-50 border border-primary-100">
            {eyebrow.icon && (
              <span className="inline-flex items-center text-current">{eyebrow.icon}</span>
            )}
            {eyebrow.text}
          </div>
        )}

        <h1
          className={[
            'm-0 font-display font-extrabold text-ink-900 leading-[1.1] tracking-tight',
            tight ? 'text-h2' : 'text-[clamp(1.875rem,3.5vw,2.75rem)]',
          ].join(' ')}
        >
          {title}
        </h1>

        {description && (
          <p
            className={[
              'm-0 text-ink-500 leading-relaxed max-w-[640px]',
              tight ? 'text-body-sm' : 'text-body',
              isCenter ? 'text-center mx-auto' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </p>
        )}
      </div>

      {actions && !isCenter && (
        <div className="flex flex-wrap gap-2.5 items-center shrink-0 pt-1">{actions}</div>
      )}

      {actions && isCenter && (
        <div className="flex flex-wrap gap-2.5 items-center justify-center mt-2">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
