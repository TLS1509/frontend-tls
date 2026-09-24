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
    ? 'text-micro px-1.5 py-0.5 gap-tight'
    : 'text-caption px-2.5 py-1 gap-stack-2xs';

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
      /* Pas de pulsation (arbitrage n°16) : un état ne se signale pas par un
         mouvement permanent — le mot et la couleur portent l'information. */
      className={[
        'inline-flex items-center font-medium rounded-pill shrink-0',
        colorClasses,
        sizeClasses,
        className,
      ].filter(Boolean).join(' ')}
      title={tooltip}
      // Pas de `role="status"` : le contenu est statique, rien ne change
      // pendant qu'on lit la page — un rôle live l'aurait annoncé au montage,
      // dix fois sur une page de cohorte. `role="img"` donne à la pastille un
      // nom complet (le libellé visible y est inclus), et rend `aria-label`
      // valide : sur un <span> sans rôle, il est interdit et ignoré.
      role="img"
      aria-label={tooltip}
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
