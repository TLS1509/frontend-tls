import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

/**
 * GoalProgress — Learning goal tracking with bar, percent, and status.
 * Tones: primary / warm / success / danger.
 */

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

const CONTAINER_BASE = 'rounded-lg border font-body transition-all duration-200';

const CONTAINER_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'bg-primary-50 border-primary-200',
  warm:    'bg-secondary-50 border-secondary-200',
  success: 'bg-green-500/[15%] border-green-500/20',
  danger:  'bg-red-500/[4%] border-red-500/15',
};

const CONTAINER_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'p-2 px-3',
  md: 'p-3 px-4',
};

const TITLE_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
};

const STATUS_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'text-primary-600',
  warm:    'text-secondary-500',
  success: 'text-success-base',
  danger:  'text-danger-base',
};

const FILL_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  success: 'bg-success-base',
  danger:  'bg-danger-base',
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
  const effectiveTone: GoalProgressTone = !isOnTrack ? 'danger' : tone;
  const isComplete = percentComplete >= 100;

  const containerClass = [
    CONTAINER_BASE,
    CONTAINER_TONE_CLASSES[effectiveTone],
    CONTAINER_SIZE_CLASSES[size],
  ].join(' ');

  const timeRemaining = daysRemaining
    ? daysRemaining === 1 ? 'Due tomorrow' : `${daysRemaining} days left`
    : hoursRemaining
      ? hoursRemaining === 1 ? 'Due in 1 hour' : `${hoursRemaining} hours left`
      : 'Time unknown';

  return (
    <div className={containerClass}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          {icon && <div className="shrink-0">{icon}</div>}
          <h3 className={`m-0 font-semibold text-ink-900 ${TITLE_SIZE_CLASSES[size]}`}>{goal}</h3>
        </div>
        <div className={`shrink-0 ml-2 ${STATUS_TONE_CLASSES[effectiveTone]}`}>
          {isComplete ? <CheckCircle2 size={20} aria-label="Completed" />
            : !isOnTrack ? <AlertCircle size={20} aria-label="Behind schedule" />
            : null}
        </div>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percentComplete}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-white/35 rounded-xs overflow-hidden mb-2 border border-ink-200 ${TRACK_SIZE_CLASSES[size]}`}
      >
        <div
          className={`h-full rounded-xs transition-[width] duration-500 ease-out ${FILL_TONE_CLASSES[effectiveTone]}`}
          style={{ width: `${Math.min(100, percentComplete)}%` }}
        />
      </div>

      {showDetails && (
        <div className={`flex justify-between items-center text-ink-600 ${DETAILS_SIZE_CLASSES[size]}`}>
          <span className={`font-display font-semibold tabular-nums ${STATUS_TONE_CLASSES[effectiveTone]}`}>
            {Math.round(percentComplete)}% complete
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            {timeRemaining}
          </span>
        </div>
      )}

      {!isOnTrack && (
        <p className="mt-2 pt-2 border-t border-ink-200 text-caption font-medium text-danger-base">
          Behind schedule — increase learning pace to catch up
        </p>
      )}

      {isComplete && (
        <p className="mt-2 pt-2 border-t border-ink-200 text-caption font-medium text-success-base">
          Goal completed! What's next?
        </p>
      )}
    </div>
  );
};

export default GoalProgress;
