/**
 * Collaboration Page — Collaborative projects and team work
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/core/Button';
import {
  CalendarDays,
  CheckCircle2,
  Layers,
  ListChecks,
  Users,
} from 'lucide-react';
import '../styles/feature-pages-modern.css';
import '../styles/static-pages.css';

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

const STATUS_LABEL: Record<CollaborativeProject['status'], string> = {
  planning: 'Planification',
  'in-progress': 'En cours',
  completed: 'Terminé',
};

const STATUS_COLORS: Record<CollaborativeProject['status'], { bg: string; color: string; border: string }> = {
  planning:    { bg: 'rgba(237,132,58,0.08)',  color: 'var(--tls-orange-600)', border: 'rgba(237,132,58,0.25)' },
  'in-progress': { bg: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', border: 'rgba(85,161,180,0.25)' },
  completed:   { bg: 'rgba(74,140,110,0.08)',  color: 'var(--tls-success-fg)', border: 'rgba(74,140,110,0.25)' },
};

function initials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

const AVATAR_PALETTE = [
  { bg: 'var(--tls-primary-100)', color: 'var(--tls-primary-700)' },
  { bg: 'rgba(237,132,58,0.15)',  color: 'var(--tls-orange-700)' },
  { bg: 'rgba(234,192,74,0.2)',   color: 'var(--tls-yellow-700)' },
  { bg: 'rgba(74,140,110,0.12)',  color: 'var(--tls-success-fg)' },
];

export const Collaboration: React.FC = () => {
  const [projects] = useState<CollaborativeProject[]>([
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
        { id: '2', name: 'Bob Smith',    role: 'Design' },
        { id: '3', name: 'Carol Davis',  role: 'Dev' },
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
  ]);

  const totalTasks      = projects.reduce((a, p) => a + p.totalTasks, 0);
  const completedTasks  = projects.reduce((a, p) => a + p.completedTasks, 0);

  return (
    <div className="feature-page">
      {/* Glass hero */}
      <section className="feature-page__hero">
        <span className="tls-editorial-eyebrow"><Users size={12} /> Travail d'équipe</span>
        <h1 style={{ margin: 'var(--s-2) 0 var(--s-3)', fontSize: 'var(--t-h1)', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Collaboration
        </h1>
        <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)', maxWidth: 520 }}>
          Pilotez vos projets d'équipe, suivez la progression collective et coordonnez les contributions.
        </p>
      </section>

      {/* KPI row with icons */}
      <section className="feature-page__kpis">
        <div className="feature-page__kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', marginBottom: 'var(--s-2)' }}>
            <Layers size={20} />
          </div>
          <strong style={{ color: 'var(--tls-primary-700)' }}>{projects.length}</strong>
          <span>Projets actifs</span>
        </div>
        <div className="feature-page__kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(237,132,58,0.1)', color: 'var(--tls-orange-600)', marginBottom: 'var(--s-2)' }}>
            <ListChecks size={20} />
          </div>
          <strong style={{ color: 'var(--tls-orange-600)' }}>{totalTasks}</strong>
          <span>Tâches au total</span>
        </div>
        <div className="feature-page__kpi">
          <div className="tls-kpi-icon" style={{ background: 'rgba(74,140,110,0.1)', color: 'var(--tls-success-fg)', marginBottom: 'var(--s-2)' }}>
            <CheckCircle2 size={20} />
          </div>
          <strong style={{ color: 'var(--tls-success-fg)' }}>{completedTasks}</strong>
          <span>Tâches complétées</span>
        </div>
      </section>

      {/* Project cards */}
      <section className="feature-page__grid">
        {projects.map((project) => {
          const sc = STATUS_COLORS[project.status];
          return (
            <Card key={project.id} variant="interactive" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-3)' }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--r-pill)',
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`,
                    fontSize: 'var(--t-micro)',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                {/* Description */}
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {project.description}
                </p>

                {/* Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s-1-5)' }}>
                    <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 500 }}>Progression</span>
                    <span style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: sc.color }}>{project.progress}%</span>
                  </div>
                  <ProgressBar value={project.progress} fill={project.status === 'planning' ? 'warm' : 'brand'} />
                </div>

                {/* Meta chips */}
                <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                  <span className="tls-micro" style={{ padding: '3px 8px', borderRadius: 'var(--r-md)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                    <CheckCircle2 size={11} /> {project.completedTasks}/{project.totalTasks}
                  </span>
                  <span className="tls-micro" style={{ padding: '3px 8px', borderRadius: 'var(--r-md)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                    <CalendarDays size={11} /> {project.deadline}
                  </span>
                </div>

                {/* Team avatars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--s-2)', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: -8 }}>
                    {project.teamMembers.map((member, i) => {
                      const pal = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
                      return (
                        <div
                          key={member.id}
                          title={`${member.name} · ${member.role}`}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: pal.bg,
                            color: pal.color,
                            border: '2px solid var(--surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 800,
                            marginLeft: i > 0 ? -8 : 0,
                            position: 'relative',
                            zIndex: project.teamMembers.length - i,
                          }}
                        >
                          {initials(member.name)}
                        </div>
                      );
                    })}
                    <span style={{ marginLeft: 'var(--s-2)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      {project.teamMembers.length} membres
                    </span>
                  </div>
                  <Button size="sm" variant="secondary">Voir →</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
};
