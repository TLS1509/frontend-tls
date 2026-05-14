import React from 'react';
import { AlertTriangle } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type AtrophieSize = 'sm' | 'md';

export interface AtrophieIndicatorProps {
  /** Days since last activity. Nothing rendered if <= 90. */
  daysSinceActivity: number;
  /** Current Dreyfus level 1–5 (informational, affects copy) */
  currentLevel?: number;
  size?: AtrophieSize;
  /** Show the "Inactif depuis Xj" label next to the icon */
  showLabel?: boolean;
  className?: string;
}

// ─── AtrophieIndicator ────────────────────────────────────────────────────────

export const AtrophieIndicator: React.FC<AtrophieIndicatorProps> = ({
  daysSinceActivity,
  currentLevel,
  size = 'sm',
  showLabel = true,
  className = '',
}) => {
  // Render nothing if not in atrophie zone
  if (daysSinceActivity <= 90) return null;

  const iconSize = size === 'sm' ? 12 : 16;
  const sizeClasses = size === 'sm'
    ? 'text-micro px-1.5 py-0.5 gap-1'
    : 'text-caption px-2.5 py-1 gap-1.5';

  // Severity: > 180j = critical, > 90j = warning
  const isCritical = daysSinceActivity > 180;
  const colorClasses = isCritical
    ? 'bg-danger-bg text-danger-fg border border-danger-border'
    : 'bg-warning-bg text-warning-fg border border-warning-border';

  const tooltip = currentLevel
    ? `Niveau Dreyfus ${currentLevel} — inactif depuis ${daysSinceActivity} jours. Les compétences peuvent s'atrophier (-10% après 90j).`
    : `Inactif depuis ${daysSinceActivity} jours. Les compétences peuvent s'atrophier (-10% après 90j).`;

  return (
    <span
      className={[
        'inline-flex items-center font-medium rounded-pill shrink-0',
        isCritical ? '' : 'animate-pulse',
        colorClasses,
        sizeClasses,
        className,
      ].filter(Boolean).join(' ')}
      title={tooltip}
      aria-label={tooltip}
      role="status"
    >
      <AlertTriangle size={iconSize} aria-hidden className="shrink-0" />
      {showLabel && (
        <span>
          Inactif depuis {daysSinceActivity}j
        </span>
      )}
    </span>
  );
};

export default AtrophieIndicator;
