/**
 * Collaboration Page - Collaborative projects and team work
 *
 * Shows:
 * - Active collaborative projects
 * - Team members
 * - Project progress
 * - Project contributions
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import { CalendarDays, CheckCircle2, Users } from 'lucide-react';
import '../styles/feature-pages-modern.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface CollaborativeProject {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  teamMembers: TeamMember[];
  deadline?: string;
  totalTasks: number;
  completedTasks: number;
}

export const Collaboration: React.FC = () => {
  const [projects] = useState<CollaborativeProject[]>([
          {
            id: 'project-1',
            title: 'Refonte plateforme learning',
            description: 'Refonte de l\'expérience utilisateur globale.',
            status: 'in-progress',
            progress: 65,
            deadline: '30/06/2026',
            totalTasks: 24,
            completedTasks: 16,
            teamMembers: [
              { id: '1', name: 'Alice Johnson', role: 'Lead' },
              { id: '2', name: 'Bob Smith', role: 'Design' },
              { id: '3', name: 'Carol Davis', role: 'Dev' },
            ],
          },
          {
            id: 'project-2',
            title: 'Extension bibliothèque contenu',
            description: 'Ajout de nouveaux modules pédagogiques.',
            status: 'planning',
            progress: 20,
            deadline: '15/08/2026',
            totalTasks: 48,
            completedTasks: 10,
            teamMembers: [
              { id: '4', name: 'David Lee', role: 'Content' },
              { id: '5', name: 'Emma Wilson', role: 'Author' },
              { id: '1', name: 'Alice Johnson', role: 'Reviewer' },
            ],
          },
          {
            id: 'project-3',
            title: 'App mobile',
            description: 'Développement des apps iOS/Android.',
            status: 'in-progress',
            progress: 45,
            deadline: '30/07/2026',
            totalTasks: 32,
            completedTasks: 14,
            teamMembers: [
              { id: '6', name: 'Frank Miller', role: 'Lead Dev' },
              { id: '7', name: 'Grace Brown', role: 'QA' },
              { id: '3', name: 'Carol Davis', role: 'Backend' },
            ],
          },
        ]);

  const getStatusVariant = (status: string): 'info' | 'warm' | 'success' => {
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

  return (
    <div className="feature-page">
      <section className="feature-page__hero">
        <h1>Collaboration</h1>
        <p>Pilotez les projets d'équipe et la contribution collective.</p>
      </section>

      <section className="feature-page__kpis">
        <div className="feature-page__kpi"><span>Projets actifs</span><strong>{projects.length}</strong></div>
        <div className="feature-page__kpi"><span>Tâches totales</span><strong>{projects.reduce((a, p) => a + p.totalTasks, 0)}</strong></div>
        <div className="feature-page__kpi"><span>Tâches complétées</span><strong>{projects.reduce((a, p) => a + p.completedTasks, 0)}</strong></div>
      </section>

      <section className="feature-page__grid">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="feature-page__stack">
                <div className="feature-page__row">
                  <h3>{project.title}</h3>
                  <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                </div>
                <p className="feature-page__muted">{project.description}</p>
                <div className="feature-page__chips">
                  <span className="feature-page__chip"><CheckCircle2 size={14} /> {project.completedTasks}/{project.totalTasks} tasks</span>
                  <span className="feature-page__chip"><CalendarDays size={14} /> {project.deadline}</span>
                  <span className="feature-page__chip"><Users size={14} /> {project.teamMembers.length} membres</span>
                </div>
                <ProgressBar value={project.progress} />
                <div className="feature-page__chips">
                  {project.teamMembers.map((member) => (
                    <span key={member.id} className="feature-page__chip">{member.name} ({member.role})</span>
                  ))}
                </div>
                <Button fullWidth>Voir le projet</Button>
              </div>
            </Card>
          ))}
      </section>
    </div>
  );
};
