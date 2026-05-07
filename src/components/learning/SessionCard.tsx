import React from 'react';
import { Card, CardTitle, CardDesc } from '../core/Card';
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

const ACTION_BTN_BASE =
  'inline-flex items-center gap-1 px-3 py-1 rounded-pill text-caption font-body font-medium cursor-pointer border transition-colors';

const ACTION_BTN_TONES = {
  primary:   'border-primary-200 bg-primary-50 text-primary-600 hover:bg-primary-100 active:bg-primary-200',
  warm:      'border-secondary-200 bg-secondary-50 text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200',
  secondary: 'border-ink-200 bg-ink-50 text-ink-500 hover:bg-white hover:text-ink-900 active:bg-ink-50',
};

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
    <Card variant="interactive" className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      <div className="flex justify-between items-start gap-3">
        <CardTitle>{title}</CardTitle>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      <CardDesc>{description}</CardDesc>

      <MetaPillGroup
        items={[
          { icon: <UserRound size={14} />, text: coachName },
          { icon: <CalendarClock size={14} />, text: dateLabel },
          { icon: <Clock3 size={14} />, text: durationLabel },
        ]}
        size="sm"
      />

      <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-200">
        {questionnaire && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.primary}`} onClick={onViewQuestionnaire}>
            <FileText size={13} />
            Questionnaire
          </button>
        )}
        {report && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.warm}`} onClick={onViewReport}>
            <FileText size={13} />
            Compte-rendu
          </button>
        )}
        {(questionnaire || report) && (
          <button className={`${ACTION_BTN_BASE} ${ACTION_BTN_TONES.secondary}`} onClick={onAddNote}>
            <Notebook size={13} />
            {journal ? 'Voir ma note' : 'Ajouter une note'}
          </button>
        )}
        {onOpen && (
          <div className="ml-auto flex">
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
