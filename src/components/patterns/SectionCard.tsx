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
 *
 * ── Anatomie (passe typographique du 2026-09-24) ─────────────────────────────
 *   titre            h3 20/26/700, ink-900 — l'icône centrée sur sa 1re ligne
 *   titre → texte     8
 *   description      16/26, ink-700, largeur de lecture
 *   en-tête → contenu 16
 *   contenu → actions 24 (12 + filet + 12)
 *   padding          24 (celui de `Card`, le canon)
 * Avant : description ink-500 collée au titre à 2 px, icône centrée sur le
 * bloc du titre (elle glissait entre deux lignes quand il passait à la ligne),
 * et 28 px de contenu aux actions.
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
  tone,
  actions,
  className = '',
  children,
}) => {
  const hasHeader = Boolean(title || description || headerAction);

  return (
    /* `gap-0` : les écarts sont écrits sur chaque partie — ils ne sont pas
       tous égaux (8, 16, 24), un `gap` unique ne sait pas le dire. */
    <Card
      tone={tone}
      className={['flex flex-col gap-0', className].filter(Boolean).join(' ')}
    >
      {hasHeader && (
        <header className="flex items-start justify-between gap-stack flex-wrap">
          <div className="flex flex-col gap-stack-xs min-w-0">
            {title && (
              <h3 className="flex items-start gap-stack-xs font-display text-h3 text-ink-900">
                {titleIcon && (
                  /* Une ligne de haut (`h-lh`) : l'icône se centre sur la
                     première ligne du titre, pas sur tout le bloc. */
                  <span className="shrink-0 inline-flex items-center h-lh" aria-hidden="true">
                    {titleIcon}
                  </span>
                )}
                <span className="min-w-0">{title}</span>
              </h3>
            )}
            {description && (
              <p className="font-body text-body text-ink-700 max-w-prose">{description}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </header>
      )}

      <div className={['flex flex-col gap-stack-xs min-w-0', hasHeader ? 'mt-stack' : ''].filter(Boolean).join(' ')}>
        {children}
      </div>

      {actions && (
        <footer className="mt-stack-sm flex flex-wrap items-center gap-stack-xs pt-stack-sm border-t border-ink-100">
          {actions}
        </footer>
      )}
    </Card>
  );
};

export default SectionCard;
