/**
 * Collaboration Page — Projets collaboratifs & travail d'équipe
 */

import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { StatCard } from '../components/ui/StatCard';
import { ProjectCard } from '../components/learning/ProjectCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import {
  CheckCircle2,
  Layers,
  ListChecks,
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
// Avatar palette + initials helpers retirés — délégués à ProjectCard.

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

  const totalTasks     = projects.reduce((a, p) => a + p.totalTasks, 0);
  const completedTasks = projects.reduce((a, p) => a + p.completedTasks, 0);
  const uniqueMembers  = new Set(projects.flatMap((p) => p.teamMembers.map((m) => m.id))).size;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        <EditorialHero
          tone="warm"
          eyebrow={{ icon: <Users size={12} />, label: "Travail d'équipe" }}
          title="Collaboration"
          summary="Pilotez vos projets d'équipe, suivez la progression collective et coordonnez les contributions."
          trailing={
            <div className="flex gap-2">
              <Button variant="warm" size="sm" leadingIcon={<Plus size={13} />}>
                Nouveau projet
              </Button>
              <Button variant="secondary" size="sm" leadingIcon={<Users size={13} />}>
                Inviter
              </Button>
            </div>
          }
        />

        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-stack sm:grid-cols-4">
          <StatCard
            variant="brand"
            size="sm"
            icon={<Layers strokeWidth={1.8} />}
            value={projects.length}
            label="Projets actifs"
          />
          <StatCard
            variant="warm"
            size="sm"
            icon={<ListChecks strokeWidth={1.8} />}
            value={totalTasks}
            label="Tâches au total"
          />
          <StatCard
            variant="elevated"
            size="sm"
            icon={<CheckCircle2 strokeWidth={1.8} />}
            value={completedTasks}
            label="Tâches complétées"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Users strokeWidth={1.8} />}
            value={uniqueMembers}
            label="Membres d'équipe"
          />
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
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
      </div>
    </div>
  );
};
