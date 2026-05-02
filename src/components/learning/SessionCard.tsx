/**
 * SessionCard
 *
 * Card component for displaying coaching session info.
 * Shows title, coach, date, duration, status and related actions.
 * Uses only design tokens, CSS classes, and TLS components (no inline styles).
 *
 * Usage:
 * <SessionCard
 *   title="Introduction au prompt engineering"
 *   coachName="Sophie Martin"
 *   description="Fondamentaux ROLE-CONTEXT-TASK..."
 *   dateLabel="15 decembre 2025"
 *   durationLabel="1h"
 *   status="completed"
 *   onViewQuestionnaire={() => {}}
 *   onViewReport={() => {}}
 * />
 */

import React from 'react';
import { Card, CardTitle, CardDesc } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { UserRound, CalendarClock, Clock3, FileText, Notebook, ArrowRight } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';
import './SessionCard.css';

export interface SessionCardProps {
  title: string;
  coachName: string;
  description: string;
  dateLabel: string;
  durationLabel: string;
  status: 'planned' | 'completed';
  questionnaire?: boolean;
  report?: boolean;
  journal?: boolean;
  onViewQuestionnaire?: () => void;
  onViewReport?: () => void;
  onAddNote?: () => void;
  onOpen?: () => void;
  className?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  title,
  coachName,
  description,
  dateLabel,
  durationLabel,
  status,
  questionnaire,
  report,
  journal,
  onViewQuestionnaire,
  onViewReport,
  onAddNote,
  onOpen,
  className = '',
}) => {
  const statusVariant: BadgeVariant = status === 'completed' ? 'success' : 'info';
  const statusLabel = status === 'completed' ? 'Completée' : 'Planifiée';

  return (
    <Card variant="interactive" className={['session-card', className].filter(Boolean).join(' ')}>
      {/* Header with title and status */}
      <div className="session-card__header">
        <CardTitle>{title}</CardTitle>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      {/* Description */}
      <CardDesc>{description}</CardDesc>

      {/* Metadata pills */}
      <MetaPillGroup
        items={[
          { icon: <UserRound size={14} />, text: coachName },
          { icon: <CalendarClock size={14} />, text: dateLabel },
          { icon: <Clock3 size={14} />, text: durationLabel },
        ]}
        size="sm"
      />

      {/* Actions — distinct colors per action type */}
      <div className="session-card__actions">
        {questionnaire && (
          <button className="session-card__action-btn session-card__action-btn--primary" onClick={onViewQuestionnaire}>
            <FileText size={13} />
            Questionnaire
          </button>
        )}
        {report && (
          <button className="session-card__action-btn session-card__action-btn--warm" onClick={onViewReport}>
            <FileText size={13} />
            Compte-rendu
          </button>
        )}
        {(questionnaire || report) && (
          <button className="session-card__action-btn session-card__action-btn--secondary" onClick={onAddNote}>
            <Notebook size={13} />
            {journal ? 'Voir ma note' : 'Ajouter une note'}
          </button>
        )}
        {onOpen && (
          <div className="session-card__action-primary">
            <Button variant="secondary" size="sm" onClick={onOpen}>
              Ouvrir <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SessionCard;
