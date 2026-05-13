import React from 'react';
import { Card } from '../core/Card';
import type { CardTone } from '../core/Card';

/**
 * SectionCard — sectioned content card with optional title, description and
 * action footer.
 *
 * Used by editorial / content pages to wrap an article section ("À retenir",
 * "Dans cette édition", etc.) and across feature pages for grouping settings,
 * KPIs, or supporting content.
 */

export interface SectionCardProps {
  /** Section heading (rendered as h3). Optional — omit for unlabeled sections. */
  title?: React.ReactNode;
  /** Optional icon rendered to the left of the title. */
  titleIcon?: React.ReactNode;
  /** Optional secondary text beneath the title. */
  description?: React.ReactNode;
  /** Optional action node rendered on the right side of the header (e.g. button, link). */
  headerAction?: React.ReactNode;
  /** Card tone — passed through to underlying Card. */
  tone?: CardTone;
  /** Footer slot — typically buttons. Rendered with a top border. */
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  titleIcon,
  description,
  headerAction,
  tone = 'neutral',
  actions,
  className = '',
  children,
}) => {
  return (
    <Card
      tone={tone}
      className={['p-6 flex flex-col gap-4', className].filter(Boolean).join(' ')}
    >
      {(title || description || headerAction) && (
        <header className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex flex-col gap-1 min-w-0">
            {title && (
              <h3 className="font-display text-h4 font-bold tracking-tight text-ink-900 m-0 inline-flex items-center gap-2">
                {titleIcon}
                {title}
              </h3>
            )}
            {description && (
              <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </header>
      )}

      <div className="flex flex-col gap-3 min-w-0">{children}</div>

      {actions && (
        <footer className="flex flex-wrap items-center gap-2 pt-3 border-t border-ink-100">
          {actions}
        </footer>
      )}
    </Card>
  );
};

export default SectionCard;
