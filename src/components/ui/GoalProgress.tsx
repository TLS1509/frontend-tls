import React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

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

const CONTAINER_BASE = 'rounded-xl border font-body transition-[background-color,border-color] duration-base ease-standard';

const CONTAINER_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-primary-50/50 border-primary-200',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-50/50 border-secondary-200',
  success: 'bg-gradient-to-br from-success-bg to-success-bg/50 border-success-base/30',
  danger:  'bg-gradient-to-br from-danger-bg to-danger-bg/50 border-danger-base/30',
};

const CONTAINER_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'p-3 px-4',
  md: 'p-4 px-stack-md',
};

const TITLE_SIZE_CLASSES: Record<GoalProgressSize, string> = {
  sm: 'text-body',
  md: 'text-body',
};

const STATUS_TONE_CLASSES: Record<GoalProgressTone, string> = {
  primary: 'text-primary-800',
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
  md: 'text-body',
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
      {/* L'objectif est un libellé de rangée (16/600, Nunito) : il était dans
          un <h3>, qui prenait le League Spartan de la base, une graisse 600
          qu'aucun titre ne porte, et la marge haute des titres (0,75em) —
          décalé de 6 px sous le centre de sa rangée. */}
      <div className="flex items-center justify-between mb-stack-sm gap-stack-xs">
        <div className="flex items-center gap-stack-xs flex-1 min-w-0">
          {icon && <div className={`shrink-0 ${STATUS_TONE_CLASSES[effectiveTone]}`}>{icon}</div>}
          <p className={`font-body font-semibold text-ink-900 truncate ${TITLE_SIZE_CLASSES[size]}`}>
            {goal}
          </p>
        </div>
        <div className={`shrink-0 ${STATUS_TONE_CLASSES[effectiveTone]}`}>
          {/* Un état qui mérite un signe en porte un ; « dans les temps » n'en
              a pas besoin. L'étincelle à 50 % qui le décorait est sortie
              (DESIGN.md §10 : l'étincelle signale une fonction IA). */}
          {isComplete ? (
            <CheckCircle2 size={20} aria-label="Terminé" />
          ) : !isOnTrack ? (
            <AlertCircle size={20} aria-label="En retard" />
          ) : null}
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
        <div className={`flex justify-between items-baseline gap-stack-xs text-ink-700 ${DETAILS_SIZE_CLASSES[size]}`}>
          {/* Chiffre dans une phrase : Nunito 600 tabulaire (le League Spartan
              ne descend pas sous 16 px, et la taille `sm` est à 13). */}
          <span className={`font-body font-semibold tabular-nums ${STATUS_TONE_CLASSES[effectiveTone]}`}>
            {Math.round(percentComplete)}&nbsp;% complété
          </span>
          {timeRemaining && (
            <span className="inline-flex items-center gap-stack-3xs text-ink-600">
              <Clock size={14} aria-hidden="true" />
              {timeRemaining}
            </span>
          )}
        </div>
      )}

      {!isOnTrack && (
        <p className={`mt-stack-sm pt-stack-sm border-t ${effectiveTone === 'danger' ? 'border-danger-base/20' : 'border-ink-200'} text-caption text-danger-fg flex items-center gap-stack-2xs`}>
          <AlertCircle size={14} aria-hidden="true" />
          En retard sur l'échéance prévue
        </p>
      )}

      {isComplete && (
        <p className="mt-stack-sm pt-stack-sm border-t border-success-base/20 text-caption text-success-fg flex items-center gap-stack-2xs">
          <CheckCircle2 size={14} aria-hidden="true" />
          Objectif atteint. Quel est le prochain ?
        </p>
      )}
    </div>
  );
};

export default GoalProgress;
