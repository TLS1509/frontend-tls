import React from 'react';
import { Card } from '../core/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../core/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { CheckCircle2, CalendarDays, Users, ArrowRight } from 'lucide-react';
import type { BadgeVariant } from '../ui/Badge';
import type { ProgressFill } from '../ui/ProgressBar';

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
  planning: 'En préparation',
  'in-progress': 'En cours',
  completed: 'Terminé',
};

const STATUS_PROGRESS_FILL: Record<ProjectCardProps['status'], ProgressFill> = {
  planning:     'warm',
  'in-progress': 'brand',
  completed:    'success',
};

const STATUS_AVATAR: Record<ProjectCardProps['status'], string> = {
  planning:     'bg-secondary-100 text-secondary-700',
  'in-progress': 'bg-primary-100 text-primary-700',
  completed:    'bg-success-bg text-success-fg',
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
    <Card
      className={['group flex flex-col gap-stack transition-all duration-slow ease-emphasis hover:-translate-y-1 hover:shadow-card-hover', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start justify-between gap-stack-xs">
        <h3 className="m-0 text-h4 font-display font-semibold text-ink-900 leading-snug flex-1">
          {title}
        </h3>
        <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </div>

      <p className="m-0 text-body-sm text-ink-500 leading-relaxed line-clamp-2">{description}</p>

      <div className="flex flex-wrap items-center gap-stack text-caption text-ink-500">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 size={14} className="text-success-base" />
          <span className="font-semibold text-ink-700">{completedTasks}</span>
          <span>/ {totalTasks} tâches</span>
        </span>
        {deadline && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} className="text-ink-400" />
            {deadline}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Users size={14} className="text-ink-400" />
          {teamMembers.length} membres
        </span>
      </div>

      <div>
        <ProgressBar value={progress} fill={STATUS_PROGRESS_FILL[status]} size="sm" showLabel={true} />
      </div>

      {teamMembers.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {teamMembers.slice(0, 4).map((member) => (
            <span
              key={member.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 text-caption text-ink-700 font-medium"
            >
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${STATUS_AVATAR[status]}`}>
                {member.name.charAt(0)}
              </span>
              {member.name}
            </span>
          ))}
          {teamMembers.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-pill bg-ink-100 text-caption text-ink-600 font-semibold">
              +{teamMembers.length - 4}
            </span>
          )}
        </div>
      )}

      {onViewProject && (
        <Button onClick={onViewProject} fullWidth>
          Voir le projet
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      )}
    </Card>
  );
};

export default ProjectCard;
