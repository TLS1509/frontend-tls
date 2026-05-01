/**
 * ProjectCard
 *
 * Card component for displaying collaborative projects.
 * Shows project title, description, status, progress, tasks, deadline, and team members.
 * Uses only design tokens and TLS components.
 *
 * Usage:
 * <ProjectCard
 *   title="Refonte plateforme learning"
 *   description="Refonte de l'expérience utilisateur..."
 *   status="in-progress"
 *   progress={65}
 *   totalTasks={24}
 *   completedTasks={16}
 *   deadline="30/06/2026"
 *   teamMembers={[...]}
 *   onViewProject={() => {}}
 * />
 */

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
  const getStatusVariant = (): BadgeVariant => {
    switch (status) {
      case 'planning':
        return 'warm';
      case 'in-progress':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'info';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'planning':
        return 'Planning';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Complété';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className={className}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        {/* Header with title and status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-3)' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600 }}>{title}</h3>
          <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
        </div>

        {/* Description */}
        <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {description}
        </p>

        {/* Metadata row: tasks, deadline, team */}
        <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={14} /> {completedTasks}/{totalTasks} tasks
          </span>
          {deadline && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
              <CalendarDays size={14} /> {deadline}
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
            <Users size={14} /> {teamMembers.length} membres
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar value={progress} fill="brand" />

        {/* Team members list */}
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
          {teamMembers.map((member) => (
            <span
              key={member.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--s-2) var(--s-3)',
                borderRadius: 'var(--r-md)',
                background: 'var(--surface-muted)',
                color: 'var(--text-muted)',
                fontSize: 'var(--t-caption)',
                fontWeight: 500,
              }}
            >
              {member.name} ({member.role})
            </span>
          ))}
        </div>

        {/* Action button */}
        {onViewProject && (
          <Button onClick={onViewProject} fullWidth>
            Voir le projet
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProjectCard;
