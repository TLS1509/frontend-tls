/**
 * KeyFindingCard — glass card horizontale pour "points clés", "insights",
 * "data findings". Icon-bubble tone-aware + title + description (+ optional
 * value/metric).
 *
 * Utilisé dans Dossier, VeilleContent (rapport), MagazineArticle.
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

const METRIC_TEXT: Record<KeyFindingTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  success: 'text-success-fg',
  neutral: 'text-ink-700',
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

  return (
    <div
      className={[
        'group relative rounded-2xl bg-white/70 backdrop-blur-glass-light border border-ink-100',
        'p-5 sm:p-6 shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-base',
        'flex gap-4',
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

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h3 className="m-0 font-display text-body font-bold text-ink-900 leading-tight">
          {title}
        </h3>

        {metric ? (
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-display text-h2 font-extrabold leading-none ${METRIC_TEXT[tone]}`}>
              {metric.value}
            </span>
            {metric.label && (
              <span className="font-body text-caption text-ink-500">
                {metric.label}
              </span>
            )}
          </div>
        ) : null}

        {description && (
          <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default KeyFindingCard;
