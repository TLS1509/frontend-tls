import React from 'react';
import { StatusBadge, type StatusBadgeStatus } from '../ui/Badge';
import { Zap } from 'lucide-react';

export type CorrectionStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface CorrectionStatusBarProps {
  status: CorrectionStatus;
  competenceLabel?: string;
  xpAwarded?: number;
  iterationCount?: number;
  className?: string;
}

/**
 * CorrectionStatusBar — Reusable status display for corrections
 *
 * Shows: status badge + competence label + XP awarded + iteration count.
 * Extracted from CorrectionDetailLearner lines 77–91 (Phase 19.1).
 * Reusable across: corrections list, coach queue, detail pages.
 *
 * Status mapping: pending → locked, in-progress → available,
 * completed → completed, failed → failed.
 */
export const CorrectionStatusBar: React.FC<CorrectionStatusBarProps> = ({
  status,
  competenceLabel,
  xpAwarded,
  iterationCount,
  className = '',
}) => {
  const statusMap: Record<CorrectionStatus, StatusBadgeStatus> = {
    pending: 'locked',
    'in-progress': 'available',
    completed: 'completed',
    failed: 'failed',
  };

  const badgeStatus = statusMap[status];

  return (
    <div className={`flex flex-wrap items-center gap-stack-xs ${className}`}>
      <StatusBadge status={badgeStatus} />

      {competenceLabel && (
        <span className="text-body-sm font-semibold text-ink-700">
          {competenceLabel}
        </span>
      )}

      {xpAwarded !== undefined && (
        <div className="flex items-center gap-tight">
          <Zap size={14} className="text-accent-400" />
          <span className="text-body-sm font-semibold text-accent-600">
            +{xpAwarded} XP
          </span>
        </div>
      )}

      {iterationCount !== undefined && (
        <span className="text-caption text-ink-500">
          Itération {iterationCount}
        </span>
      )}
    </div>
  );
};
