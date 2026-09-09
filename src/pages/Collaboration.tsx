/**
 * Collaboration Page : Projets collaboratifs & travail d'équipe
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { ProjectCard } from '../components/learning/ProjectCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Container } from '../components/layout';
import {
  Plus,
  Users,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
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

// Status mapping géré directement par <ProjectCard> (STATUS_VARIANT + STATUS_LABEL internes).
// Avatar palette + initials helpers retirés : délégués à ProjectCard.

const PROJECTS: CollaborativeProject[] = [
  {
    id: 'project-1',
    title: 'Refonte plateforme learning',
    description: "Refonte de l'expérience utilisateur et du moteur de navigation des parcours.",
    status: 'in-progress',
    progress: 65,
    deadline: '30/06/2026',
    totalTasks: 24,
    completedTasks: 16,
    teamMembers: [
      { id: '1', name: 'Alice Johnson', role: 'Lead' },
      { id: '2', name: 'Bob Smith',     role: 'Design' },
      { id: '3', name: 'Carol Davis',   role: 'Dev' },
    ],
  },
  {
    id: 'project-2',
    title: 'Extension bibliothèque contenu',
    description: 'Ajout de nouveaux modules pédagogiques IA pour les formateurs experts.',
    status: 'planning',
    progress: 20,
    deadline: '15/08/2026',
    totalTasks: 48,
    completedTasks: 10,
    teamMembers: [
      { id: '4', name: 'David Lee',     role: 'Content' },
      { id: '5', name: 'Emma Wilson',   role: 'Author' },
      { id: '1', name: 'Alice Johnson', role: 'Reviewer' },
    ],
  },
  {
    id: 'project-3',
    title: 'App mobile TLS',
    description: 'Développement des applications iOS & Android avec parcours offline.',
    status: 'in-progress',
    progress: 45,
    deadline: '30/07/2026',
    totalTasks: 32,
    completedTasks: 14,
    teamMembers: [
      { id: '6', name: 'Frank Miller', role: 'Lead Dev' },
      { id: '7', name: 'Grace Brown',  role: 'QA' },
      { id: '3', name: 'Carol Davis',  role: 'Backend' },
    ],
  },
];

export const Collaboration: React.FC = () => {
  const [projects] = useState<CollaborativeProject[]>(PROJECTS);

  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col">
      <Container width="page" className="flex-1 py-section flex flex-col gap-section">

        <EditorialHero
          tone="flat"
          eyebrow={{ icon: <Users size={14} />, label: "Travail d'équipe" }}
          title="Collaboration"
          summary="Pilotez vos projets d'équipe, suivez la progression collective et coordonnez les contributions."
          trailing={
            <div className="flex gap-stack-xs">
              <Button variant="secondary" size="sm" leadingIcon={<Plus size={14} />}>
                Nouveau projet
              </Button>
              <Button variant="secondary" size="sm" leadingIcon={<Users size={14} />}>
                Inviter
              </Button>
            </div>
          }
        />


        {/* Project cards */}
        <div className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-stack-xs">
            <h2 className="font-display text-h3 font-bold text-ink-900 tracking-tight">
              Projets en cours
            </h2>
            <span className="font-body text-caption text-ink-500">
              {projects.length} projets
            </span>
          </div>
          <div className="grid grid-cols-1 gap-stack-lg sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                progress={project.progress}
                totalTasks={project.totalTasks}
                completedTasks={project.completedTasks}
                deadline={project.deadline}
                teamMembers={project.teamMembers}
                onViewProject={() => undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
