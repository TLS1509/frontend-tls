import React from 'react';

/**
 * PageHeader — en-tête utilitaire de page (Réglages, Facturation, Confidentialité).
 *
 * Replaces both PageHeader and PageHeaderSimple (deprecated).
 *
 * - Optional eyebrow (surtitre) with icon
 * - Title (h1) — 36/44/700, l'échelle de l'app
 * - Optional description — chapô 18/28, ink-700, largeur de lecture
 * - Optional actions slot (right side)
 * - Variant: 'default' | 'tight' — @deprecated, sans effet depuis le 2026-09-24
 *
 * Même anatomie que `PageHero` (passe typographique du 2026-09-24) :
 *   surtitre → titre 8 · titre → chapô 12.
 *
 * ⚠️ Aucune marge externe (2026-09-24, piège n°12). Le composant portait
 * l'espace SOUS lui (40, ou 32 en `tight`), « exception écrite » du piège :
 * posé dans un `PageShell`, cette marge s'ajoutait au `gap` de la coque (48),
 * soit 80 à 88 px sous le titre — c'est pourquoi /notifications gardait un
 * en-tête fait main. L'espace appartient désormais au parent : 48 entre les
 * blocs d'un `PageShell`, ou `gap-section` (32) quand l'en-tête et son contenu
 * forment un bloc, comme sur les écrans d'onboarding.
 * Le titre était en `font-extrabold` (800, réservé au site) sur un
 * `clamp(30px, 3.5vw, 44px)` hors échelle, et le chapô en ink-500 à 16 px.
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
  /**
   * @deprecated Sans effet depuis le 2026-09-24 : le composant ne pose plus de
   * marge sous lui. L'espace appartient au parent (`gap-section`, 32 px).
   */
  variant?: 'default' | 'tight';
  align?: 'left' | 'center';
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  const wrapperClasses = [
    'flex gap-stack-lg flex-wrap',
    isCenter ? 'flex-col items-center text-center' : 'justify-between items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={['flex flex-col', isCenter ? 'items-center max-w-content' : 'min-w-0 flex-1'].join(' ')}>
        <div className={['flex flex-col gap-stack-xs', isCenter ? 'items-center' : ''].filter(Boolean).join(' ')}>
          {eyebrow && (
            /* Le surtitre dit OÙ l'on est : une légende discrète, 13/600 ink-600,
               sans capitales ni pastille. Il était en MetaPill teal — une
               donnée posée comme un objet, qui tirait l'œil avant le titre. */
            <p className="inline-flex items-center gap-stack-2xs text-caption font-semibold text-ink-600">
              {eyebrow.icon}
              {eyebrow.text}
            </p>
          )}

          <h1 className="font-display text-h1 text-ink-900 text-balance">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-stack-sm font-body text-body-lg text-ink-700 max-w-prose">
            {description}
          </p>
        )}
      </div>

      {actions && !isCenter && (
        <div className="flex flex-wrap gap-stack-xs items-center shrink-0 pt-1">{actions}</div>
      )}

      {actions && isCenter && (
        <div className="flex flex-wrap gap-stack-xs items-center justify-center">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
