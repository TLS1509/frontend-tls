/**
 * SessionCard
 *
 * Card component for displaying coaching session info.
 * Shows title, coach, date, duration, status and related actions.
 * Uses only design tokens and TLS components.
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

import React, { useState } from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { UserRound, CalendarClock, Clock3, FileText, Notebook, ArrowRight } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';

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
  const [hovered, setHovered] = useState(false);
  const statusVariant: BadgeVariant = status === 'completed' ? 'success' : 'info';
  const statusLabel = status === 'completed' ? 'Completée' : 'Planifiée';

  return (
    <Card
      variant="interactive"
      className={className}
      style={{
        transition: 'box-shadow 0.15s, transform 0.15s',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.08)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        {/* Header with title and status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-3)' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>

        {/* Description */}
        <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {description}
        </p>

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
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
          {questionnaire && (
            <button
              onClick={onViewQuestionnaire}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-1)',
                padding: 'var(--s-1) var(--s-3)',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--tls-primary-200)',
                background: 'var(--tls-primary-50)',
                color: 'var(--tls-primary-600)',
                fontSize: 'var(--t-caption)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-100)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-50)';
              }}
            >
              <FileText size={13} />
              Questionnaire
            </button>
          )}
          {report && (
            <button
              onClick={onViewReport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-1)',
                padding: 'var(--s-1) var(--s-3)',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--tls-orange-200)',
                background: 'var(--tls-orange-50)',
                color: 'var(--tls-orange-600)',
                fontSize: 'var(--t-caption)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-orange-100)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-orange-50)';
              }}
            >
              <FileText size={13} />
              Compte-rendu
            </button>
          )}
          {(questionnaire || report) && (
            <button
              onClick={onAddNote}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-1)',
                padding: 'var(--s-1) var(--s-3)',
                borderRadius: 'var(--r-pill)',
                border: '1px solid var(--border)',
                background: 'var(--surface-muted)',
                color: 'var(--text-muted)',
                fontSize: 'var(--t-caption)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }}
            >
              <Notebook size={13} />
              {journal ? 'Voir ma note' : 'Ajouter une note'}
            </button>
          )}
          {onOpen && (
            <Button variant="secondary" size="sm" onClick={onOpen} style={{ marginLeft: 'auto' }}>
              Ouvrir <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SessionCard;
