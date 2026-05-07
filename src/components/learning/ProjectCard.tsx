import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { CheckCircle2, CalendarDays, Users } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  totalTasks: number;
  completedTasks: number;
  deadline?: string;
  teamMembers: TeamMember[];
  onViewProject?: () => void;
  className?: string;
}

const STATUS_VARIANT: Record<ProjectCardProps['status'], BadgeVariant> = {
  planning: 'warm',
  'in-progress': 'info',
  completed: 'success',
};

const STATUS_LABEL: Record<ProjectCardProps['status'], string> = {
  planning: 'Planning',
  'in-progress': 'En cours',
  completed: 'Complété',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status,
  progress,
  totalTasks,
  completedTasks,
  deadline,
  teamMembers,
  onViewProject,
  className = '',
}) => {
  return (
    <Card className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-h4 font-semibold text-ink-900 leading-snug">{title}</h3>
        <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </div>

      <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>

      <div className="flex flex-wrap items-center gap-3 text-caption text-ink-500">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 size={14} /> {completedTasks}/{totalTasks} tasks
        </span>
        {deadline && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} /> {deadline}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Users size={14} /> {teamMembers.length} membres
        </span>
      </div>

      <ProgressBar value={progress} fill="brand" />

      <div className="flex flex-wrap gap-2">
        {teamMembers.map((member) => (
          <span
            key={member.id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-pill bg-ink-50 border border-ink-200 text-caption text-ink-700"
          >
            {member.name} ({member.role})
          </span>
        ))}
      </div>

      {onViewProject && (
        <Button onClick={onViewProject} fullWidth>
          Voir le projet
        </Button>
      )}
    </Card>
  );
};

export default ProjectCard;
