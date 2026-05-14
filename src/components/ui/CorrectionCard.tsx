import React from 'react';
import { MessageSquare, Clock, ChevronRight, UserCheck } from 'lucide-react';
import { Card } from '../core/Card';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { Button } from '../core/Button';

// ─── Types ───────────────────────────────────────────────────────────────────

export type CorrectionStatus = 'pending' | 'in-review' | 'corrected' | 'rejected';

export interface CorrectionCardProps {
  id: string;
  apprenantName: string;
  apprenantInitials?: string;
  exerciceTitle: string;
  competence: string;
  submittedAt: string;
  status: CorrectionStatus;
  excerpt?: string;
  feedbackCount?: number;
  surface?: 'card' | 'tinted';
  onOpen?: () => void;
  onAssign?: () => void;
  className?: string;
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<CorrectionStatus, { label: string; variant: 'neutral' | 'info' | 'success' | 'danger' }> = {
  pending: { label: 'À corriger', variant: 'neutral' },
  'in-review': { label: 'En cours', variant: 'info' },
  corrected: { label: 'Corrigé', variant: 'success' },
  rejected: { label: 'Refusé', variant: 'danger' },
};

// ─── CorrectionCard ───────────────────────────────────────────────────────────

export const CorrectionCard: React.FC<CorrectionCardProps> = ({
  apprenantName,
  apprenantInitials,
  exerciceTitle,
  competence,
  submittedAt,
  status,
  excerpt,
  feedbackCount,
  surface = 'card',
  onOpen,
  onAssign,
  className = '',
}) => {
  const { label: statusLabel, variant: statusVariant } = STATUS_CONFIG[status];

  return (
    <Card
      variant={surface === 'tinted' ? 'tinted' : 'default'}
      tone="primary"
      className={['flex flex-col gap-stack-xs', className].filter(Boolean).join(' ')}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-stack-xs">
        <div className="flex items-center gap-stack-xs min-w-0">
          <Avatar
            name={apprenantName}
            initials={apprenantInitials ?? apprenantName.slice(0, 2).toUpperCase()}
            size="sm"
          />
          <div className="min-w-0">
            <p className="text-body-sm font-semibold text-ink-900 truncate">{apprenantName}</p>
            <p className="text-caption text-ink-400 flex items-center gap-1">
              <Clock size={11} aria-hidden />
              {submittedAt}
            </p>
          </div>
        </div>
        <Badge variant={statusVariant as any}>{statusLabel}</Badge>
      </div>

      {/* Exercise title + competence */}
      <div className="flex flex-col gap-tight">
        <p className="text-body font-semibold text-ink-900 line-clamp-2">{exerciceTitle}</p>
        <span className="inline-flex items-center gap-1 text-caption text-primary-700 bg-primary-50 px-2 py-0.5 rounded-pill w-fit font-medium">
          {competence}
        </span>
      </div>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-body-sm text-ink-500 line-clamp-2 italic border-l-2 border-ink-200 pl-3">
          {excerpt}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-stack-xs border-t border-ink-100 mt-auto">
        <div className="flex items-center gap-1 text-caption text-ink-400">
          {feedbackCount !== undefined && (
            <>
              <MessageSquare size={13} aria-hidden />
              <span>{feedbackCount} feedback{feedbackCount !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAssign && status === 'pending' && (
            <Button
              variant="ghost"
              size="sm"
              leadingIcon={<UserCheck size={14} />}
              onClick={onAssign}
            >
              Assigner
            </Button>
          )}
          {onOpen && (
            <Button
              variant="brand-ghost"
              size="sm"
              trailingIcon={<ChevronRight size={14} />}
              onClick={onOpen}
            >
              {status === 'pending' || status === 'in-review' ? 'Corriger' : 'Voir'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CorrectionCard;
