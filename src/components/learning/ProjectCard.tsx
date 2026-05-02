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
import './ProjectCard.css';

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
    <Card className={`project-card ${className}`}>
      {/* Header with title and status */}
      <div className="project-card__header">
        <h3 className="project-card__title">{title}</h3>
        <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
      </div>

      {/* Description */}
      <p className="project-card__description">
        {description}
      </p>

      {/* Metadata row: tasks, deadline, team */}
      <div className="project-card__metadata">
        <span className="project-card__meta-item">
          <CheckCircle2 size={14} /> {completedTasks}/{totalTasks} tasks
        </span>
        {deadline && (
          <span className="project-card__meta-item">
            <CalendarDays size={14} /> {deadline}
          </span>
        )}
        <span className="project-card__meta-item">
          <Users size={14} /> {teamMembers.length} membres
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar value={progress} fill="brand" />

      {/* Team members list */}
      <div className="project-card__team">
        {teamMembers.map((member) => (
          <span
            key={member.id}
            className="project-card__team-member"
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
    </Card>
  );
};

export default ProjectCard;
