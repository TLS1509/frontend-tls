/**
 * CongratulationsCard — Celebration block for milestone completion.
 *
 * Used at the end of an onboarding flow / parcours / module to mark a
 * success milestone : large success icon, badge, title, summary.
 *
 * Arbitrage n°18 (2026-09-24) : le bloc de récompense XP (« +150 XP »,
 * « Niveau 1 · 150 / 500 XP », jauge, étincelle décorative) est retiré avec
 * sa prop `xp`. La carte célèbre calmement l'étape franchie, rien d'autre.
 *
 * Tone-aware (brand / warm / sun). For OnboardingSuccess we use `brand`
 * (transition into the app's stable identity), but a warm parcours
 * completion could use `warm`.
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export type CongratulationsCardTone = 'brand' | 'warm' | 'sun' | 'success';

export interface CongratulationsCardProps {
  /** Badge text shown above the heading. */
  badgeLabel?: string;
  title: React.ReactNode;
  summary?: React.ReactNode;
  tone?: CongratulationsCardTone;
  icon?: React.ReactNode;
  className?: string;
}

const ICON_RING: Record<CongratulationsCardTone, string> = {
  brand:   'bg-primary-50 border-primary-200 text-primary-600',
  warm:    'bg-secondary-50 border-secondary-200 text-secondary-600',
  sun:     'bg-accent-50 border-accent-200 text-accent-600',
  success: 'bg-success-bg border-success-border text-success-fg',
};

const BADGE_VARIANT: Record<CongratulationsCardTone, 'brand' | 'warm' | 'sun' | 'success'> = {
  brand:   'brand',
  warm:    'warm',
  sun:     'sun',
  success: 'success',
};

export const CongratulationsCard: React.FC<CongratulationsCardProps> = ({
  badgeLabel,
  title,
  summary,
  tone = 'brand',
  icon,
  className = '',
}) => {
  const wrapperClasses = [
    'w-full flex flex-col items-center gap-stack-lg text-center',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div
        className={[
          'w-20 h-20 rounded-pill border-2 flex items-center justify-center shadow-lg',
          ICON_RING[tone],
        ].join(' ')}
        aria-hidden
      >
        {icon ?? <CheckCircle2 size={40} />}
      </div>

      {badgeLabel && (
        <Badge variant={BADGE_VARIANT[tone]} size="large">
          {badgeLabel}
        </Badge>
      )}

      {/* L'anatomie de l'en-tête : titre 36/44/700 · 12 px · chapô 18/28
          ink-700, centré et court (`text-balance`). */}
      <div className="flex flex-col items-center gap-stack-sm max-w-lg">
        <h1 className="font-display text-h1 text-ink-900 text-balance">
          {title}
        </h1>
        {summary && (
          <p className="font-body text-body-lg text-ink-700 text-balance">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default CongratulationsCard;
