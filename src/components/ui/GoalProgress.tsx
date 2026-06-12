import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';

export type GoalProgressTone = 'primary' | 'warm' | 'success' | 'danger';
export type GoalProgressSize = 'sm' | 'md';

export interface GoalProgressProps {
  goal: string;
  percentComplete: number;
  daysRemaining?: number;
  hoursRemaining?: number;
  isOnTrack: boolean;
  icon?: React.ReactNode;
  tone?: GoalProgressTone;
  size?: GoalProgressSize;
  showDetails?: boolean;
}

const CONTAINER_BASE = 'rounded-2xl border font-body transition-[background-color,border-color] duration-base ease-standard';

const CONTAINER_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-primary-50/50 border-primary-200',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-50/50 border-secondary-200',
  success: 'bg-gradient-to-br from-success-bg to-success-bg/50 border-success-base/30',
  danger:  'bg-gradient-to-br from-danger-bg to-danger-bg/50 border-danger-base/30',
};

const CONTAINER_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'p-3 px-4',
  md: 'p-4 px-5',
};

const TITLE_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
};

const STATUS_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  success: 'text-success-fg',
  danger:  'text-danger-fg',
};

const FILL_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-700',
  success: 'bg-gradient-to-r from-success-base to-success-fg',
  danger:  'bg-gradient-to-r from-danger-base to-danger-fg',
};

const TRACK_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2',
};

const DETAILS_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'text-caption',
  md: 'text-body-sm',
};

export const GoalProgress: React.FC<GoalProgressProps> = ({
  goal,
  percentComplete,
  daysRemaining,
  hoursRemaining,
  isOnTrack,
  icon,
  tone = 'primary',
  size = 'md',
  showDetails = true,
}) => {
  const effectiveTone: GoalProgressTone = !isOnTrack ? 'danger' : percentComplete >= 100 ? 'success' : tone;
  const isComplete = percentComplete >= 100;

  const containerClass = [
    CONTAINER_BASE,
    CONTAINER_TONE_CLASSES[effectiveTone],
    CONTAINER_SIZE_CLASSES[size],
  ].join(' ');

  const timeRemaining = daysRemaining
    ? daysRemaining === 1
      ? 'Échéance demain'
      : `${daysRemaining} jours restants`
    : hoursRemaining
    ? hoursRemaining === 1
      ? 'Échéance dans 1 h'
      : `${hoursRemaining} h restantes`
    : null;

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between mb-3 gap-stack-xs">
        <div className="flex items-center gap-stack-xs.5 flex-1 min-w-0">
          {icon && <div className={`shrink-0 ${STATUS_TONE_CLASSES[effectiveTone]}`}>{icon}</div>}
          <h3 className={`m-0 font-semibold text-ink-900 leading-snug truncate ${TITLE_SIZE_CLASSES[size]}`}>
            {goal}
          </h3>
        </div>
        <div className={`shrink-0 ${STATUS_TONE_CLASSES[effectiveTone]}`}>
          {isComplete ? (
            <CheckCircle2 size={20} aria-label="Terminé" />
          ) : !isOnTrack ? (
            <AlertCircle size={20} aria-label="En retard" />
          ) : (
            <Sparkles size={18} aria-hidden="true" className="opacity-50" />
          )}
        </div>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-white/60 rounded-pill overflow-hidden mb-2 shadow-inner ${TRACK_SIZE_CLASSES[size]}`}
      >
        <div
          className={`h-full rounded-pill transition-[width] duration-700 ease-out ${FILL_TONE_CLASSES[effectiveTone]}`}
          style={{ width: `${Math.min(100, percentComplete)}%` }}
        />
      </div>

      {showDetails && (
        <div className={`flex justify-between items-center text-ink-700 ${DETAILS_SIZE_CLASSES[size]}`}>
          <span className={`font-display font-bold tabular-nums ${STATUS_TONE_CLASSES[effectiveTone]}`}>
            {Math.round(percentComplete)}% complété
          </span>
          {timeRemaining && (
            <span className="inline-flex items-center gap-tight text-ink-500 font-medium">
              <Clock size={14} aria-hidden="true" />
              {timeRemaining}
            </span>
          )}
        </div>
      )}

      {!isOnTrack && (
        <p className={`mt-2.5 pt-2.5 border-t ${effectiveTone === 'danger' ? 'border-danger-base/20' : 'border-ink-200'} text-caption font-medium text-danger-fg flex items-center gap-tight.5 m-0`}>
          <AlertCircle size={13} />
          Retard sur le calendrier — augmentez le rythme
        </p>
      )}

      {isComplete && (
        <p className="mt-2.5 pt-2.5 border-t border-success-base/20 text-caption font-medium text-success-fg flex items-center gap-tight.5 m-0">
          <Sparkles size={13} />
          Objectif atteint ! Quel est le prochain ?
        </p>
      )}
    </div>
  );
};

export default GoalProgress;
