import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import './GoalProgress.css';

/**
 * GoalProgress — Learning Goal Tracking
 *
 * Visualizes progress toward a specific learning goal with:
 * - Goal name
 * - Completion percentage (horizontal bar)
 * - Time remaining / deadline
 * - On-track indicator
 *
 * Uses TLS design tokens via GoalProgress.css — no inline styles except
 * the dynamic `width` on the progress fill.
 */

export interface GoalProgressProps {
  goal: string;
  percentComplete: number;  // 0-100
  daysRemaining?: number;
  hoursRemaining?: number;
  isOnTrack: boolean;
  icon?: React.ReactNode;
  tone?: 'primary' | 'warm' | 'success' | 'danger';
  size?: 'sm' | 'md';
  showDetails?: boolean;
}

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
  const effectiveTone = !isOnTrack ? 'danger' : tone;
  const isComplete = percentComplete >= 100;

  const containerClass = [
    'goal-progress',
    `goal-progress--${effectiveTone}`,
    size === 'sm' && 'goal-progress--sm',
  ]
    .filter(Boolean)
    .join(' ');

  // Format time remaining
  const timeRemaining = daysRemaining
    ? daysRemaining === 1
      ? 'Due tomorrow'
      : `${daysRemaining} days left`
    : hoursRemaining
      ? hoursRemaining === 1
        ? 'Due in 1 hour'
        : `${hoursRemaining} hours left`
      : 'Time unknown';

  return (
    <div className={containerClass}>
      {/* Header: Goal name + status icon */}
      <div className="goal-progress__header">
        <div className="goal-progress__meta">
          {icon && <div className="goal-progress__icon">{icon}</div>}
          <h3 className="goal-progress__title">{goal}</h3>
        </div>

        <div className="goal-progress__status-icon">
          {isComplete ? (
            <CheckCircle2 size={20} aria-label="Completed" />
          ) : !isOnTrack ? (
            <AlertCircle size={20} aria-label="Behind schedule" />
          ) : null}
        </div>
      </div>

      {/* Progress bar — width is dynamic, set via inline style */}
      <div className="goal-progress__bar-track" role="progressbar" aria-valuenow={percentComplete} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="goal-progress__bar-fill"
          style={{ width: `${Math.min(100, percentComplete)}%` }}
        />
      </div>

      {/* Details row: Percentage + Time remaining */}
      {showDetails && (
        <div className="goal-progress__details">
          <span className="goal-progress__percent">{Math.round(percentComplete)}% complete</span>
          <span className="goal-progress__time">
            <Clock size={14} aria-hidden="true" />
            {timeRemaining}
          </span>
        </div>
      )}

      {/* Status messages */}
      {!isOnTrack && (
        <p className="goal-progress__message goal-progress__message--danger">
          Behind schedule — increase learning pace to catch up
        </p>
      )}

      {isComplete && (
        <p className="goal-progress__message goal-progress__message--success">
          Goal completed! What's next?
        </p>
      )}
    </div>
  );
};

export default GoalProgress;
