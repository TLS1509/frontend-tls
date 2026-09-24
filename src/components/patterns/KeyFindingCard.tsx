/**
 * KeyFindingCard — glass card horizontale pour "points clés", "insights",
 * "data findings". Icon-bubble tone-aware + title + description (+ optional
 * value/metric).
 *
 * Utilisé dans Dossier, MagazineArticle.
 *
 * Usage:
 *   <KeyFindingCard
 *     icon={<Target size={20} />}
 *     tone="brand"
 *     title="Adoption massive"
 *     description="78 % des entreprises du CAC40 ont adopté le microlearning."
 *     metric={{ value: '78 %', label: 'des entreprises' }}
 *   />
 *
 * Layout variants :
 *   - `horizontal` (default) : icon left, content right
 *   - `stacked` : icon top, content below
 */

import React from 'react';

export type KeyFindingTone = 'brand' | 'warm' | 'sun' | 'success' | 'neutral';

export interface KeyFindingCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  /** Optional metric (big value + small label) — replaces description if both. */
  metric?: { value: string; label?: string };
  tone?: KeyFindingTone;
  layout?: 'horizontal' | 'stacked';
  className?: string;
}

const ICON_BUBBLE: Record<KeyFindingTone, string> = {
  brand:   'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700',
  warm:    'bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-700',
  sun:     'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700',
  success: 'bg-gradient-to-br from-success-bg to-success-bg text-success-fg',
  neutral: 'bg-gradient-to-br from-ink-100 to-ink-200 text-ink-700',
};

/* Le chiffre est une valeur de marque : cran 800 (doctrine § 2). */
const METRIC_TEXT: Record<KeyFindingTone, string> = {
  brand:   'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
  success: 'text-success-fg',
  neutral: 'text-ink-800',
};

export const KeyFindingCard: React.FC<KeyFindingCardProps> = ({
  icon,
  title,
  description,
  metric,
  tone = 'brand',
  layout = 'horizontal',
  className = '',
}) => {
  const isStacked = layout === 'stacked';

  /* Anatomie (passe typographique du 2026-09-24) : titre h3 20/700 (il était au
     corps du texte, 16 px) · 8 px · chiffre h2 28 + légende · 8 px ·
     description 16 ink-700. En disposition horizontale, le bloc de texte
     descend de 11 px pour que la PREMIÈRE ligne du titre (26) se centre sur
     la pastille (48) — doctrine § 4. */
  return (
    <div
      className={[
        'group relative rounded-lg bg-white/70 backdrop-blur-glass-light border border-ink-100',
        'p-stack-md sm:p-stack-lg shadow-xs hover:shadow-sm transition-all duration-base',
        'flex gap-stack',
        isStacked ? 'flex-col items-start' : 'items-start',
        className,
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'shrink-0 inline-flex items-center justify-center',
          'w-12 h-12 rounded-xl',
          ICON_BUBBLE[tone],
        ].join(' ')}
      >
        {icon}
      </span>

      <div className={['flex-1 min-w-0 flex flex-col gap-stack-xs', isStacked ? '' : 'mt-[11px]'].filter(Boolean).join(' ')}>
        <h3 className="font-display text-h3 text-ink-900">
          {title}
        </h3>

        {metric ? (
          <p className="flex flex-wrap items-baseline gap-x-stack-xs gap-y-stack-3xs">
            {/* Chiffre ≥ 16 px : League Spartan, sur l'échelle (h2 28). */}
            <span className={`font-display text-h2 leading-none tabular-nums ${METRIC_TEXT[tone]}`}>
              {metric.value}
            </span>
            {metric.label && (
              <span className="font-body text-caption text-ink-600">
                {metric.label}
              </span>
            )}
          </p>
        ) : null}

        {description && (
          <p className="font-body text-body text-ink-700 max-w-prose">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default KeyFindingCard;
