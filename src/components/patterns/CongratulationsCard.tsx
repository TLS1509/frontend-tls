/**
 * CongratulationsCard — Celebration block for milestone completion.
 *
 * Used at the end of an onboarding flow / parcours / module to mark a
 * success milestone : large success icon, badge, title, summary, optional
 * XP reward block.
 *
 * Tone-aware (brand / warm / sun). For OnboardingSuccess we use `brand`
 * (transition into the app's stable identity), but a warm parcours
 * completion could use `warm`.
 */

import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

export type CongratulationsCardTone = 'brand' | 'warm' | 'sun' | 'success';

export interface CongratulationsCardXp {
  earned: number;
  current: number;
  max: number;
  levelLabel?: string;
}

export interface CongratulationsCardProps {
  /** Badge text shown above the heading. */
  badgeLabel?: string;
  title: React.ReactNode;
  summary?: React.ReactNode;
  /** Optional XP reward block (renders below the heading). */
  xp?: CongratulationsCardXp;
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

const XP_SURFACE: Record<CongratulationsCardTone, string> = {
  brand:   'bg-primary-50/60 border-primary-100',
  warm:    'bg-secondary-50/60 border-secondary-100',
  sun:     'bg-accent-50/60 border-accent-100',
  success: 'bg-success-bg border-success-border',
};

const XP_ACCENT: Record<CongratulationsCardTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  success: 'text-success-fg',
};

const XP_FILL: Record<CongratulationsCardTone, 'brand' | 'warm' | 'sun' | 'success'> = {
  brand:   'brand',
  warm:    'warm',
  sun:     'sun',
  success: 'success',
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
  xp,
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
          'w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-lg',
          ICON_RING[tone],
        ].join(' ')}
        aria-hidden
      >
        {icon ?? <CheckCircle2 size={40} />}
      </div>

      {badgeLabel && (
        <Badge variant={BADGE_VARIANT[tone]} size="lg">
          {badgeLabel}
        </Badge>
      )}

      <div className="flex flex-col gap-stack max-w-lg">
        <h1 className="text-h1 font-display font-bold text-ink-900 leading-tight m-0">
          {title}
        </h1>
        {summary && (
          <p className="text-body-lg text-ink-600 leading-relaxed m-0">
            {summary}
          </p>
        )}
      </div>

      {xp && (
        <div
          className={[
            'w-full max-w-sm rounded-2xl border p-5 flex flex-col gap-stack items-center',
            XP_SURFACE[tone],
          ].join(' ')}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} className={XP_ACCENT[tone]} />
            <span className={['text-body-sm font-semibold', XP_ACCENT[tone]].join(' ')}>
              {xp.levelLabel ?? 'Étape terminée'}
            </span>
          </div>
          <span className={['text-h2 font-display font-bold', XP_ACCENT[tone]].join(' ')}>
            +{xp.earned} XP
          </span>
          <div className="w-full flex flex-col gap-tight">
            <div className="flex justify-between text-caption text-ink-500">
              <span>Niveau {Math.max(1, Math.floor(xp.current / xp.max) + 1)}</span>
              <span>{xp.current} / {xp.max} XP</span>
            </div>
            <ProgressBar
              value={Math.min(100, (xp.current / xp.max) * 100)}
              fill={XP_FILL[tone]}
              size="sm"
              valueLabel={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CongratulationsCard;
