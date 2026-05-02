/**
 * Collaboration Page — Projets collaboratifs & travail d'équipe
 *
 * Design: glass hero · tls-kpi-row · avatar stacks overlapping · status badges
 */

import React, { useState } from 'react';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/core/Button';
import {
  CalendarDays,
  CheckCircle2,
  Layers,
  ListChecks,
  Plus,
  Users,
  ArrowRight,
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

const STATUS_LABEL: Record<CollaborativeProject['status'], string> = {
  planning:     'Planification',
  'in-progress': 'En cours',
  completed:    'Terminé',
};

const STATUS_META: Record<
  CollaborativeProject['status'],
  { bg: string; color: string; border: string; fill: 'brand' | 'warm' | 'gradient' }
> = {
  planning:     { bg: 'var(--overlay-brand-xs)',  color: 'var(--tls-orange-600)', border: 'var(--tls-orange-300)',  fill: 'warm' },
  'in-progress': { bg: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)', border: 'var(--overlay-brand-sm)', fill: 'brand' },
  completed:    { bg: 'var(--tls-success-bg)',  color: 'var(--tls-success-fg)', border: 'var(--tls-success-border)', fill: 'gradient' },
};

const AVATAR_PALETTE = [
  { bg: 'var(--tls-primary-100)',   color: 'var(--tls-primary-700)' },
  { bg: 'var(--tls-orange-200)',    color: 'var(--tls-orange-700)' },
  { bg: 'var(--overlay-warm-md)',    color: 'var(--tls-yellow-700)' },
  { bg: 'var(--tls-success-bg)',    color: 'var(--tls-success-fg)' },
  { bg: 'var(--tls-primary-50)',     color: 'var(--tls-primary-700)' },
];

function initials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

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
    <div className="tls-page">

      {/* ── Glass Hero ─────────────────────────────────────────── */}
      <section className="tls-editorial-hero">
        <span className="tls-editorial-eyebrow"><Users size={12} /> Travail d'équipe</span>
        <h1>Collaboration</h1>
        <p className="tls-editorial-summary">
          Pilotez vos projets d'équipe, suivez la progression collective et coordonnez les contributions.
        </p>
        <div style={{ display: 'flex', gap: 'var(--s-3)', marginTop: 'var(--s-4)', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">
            <Plus size={14} /> Nouveau projet
          </Button>
          <Button variant="secondary" size="sm">
            Inviter un membre
          </Button>
        </div>
      </section>

      {/* ── KPI row ────────────────────────────────────────────── */}
      <section className="tls-kpi-row">
        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
            <Layers size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: '0', color: 'var(--tls-primary-700)', letterSpacing: '-0.03em' }}>
            {projects.length}
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Projets actifs</span>
        </div>

        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-orange-50)', color: 'var(--tls-orange-600)' }}>
            <ListChecks size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: '0', color: 'var(--tls-orange-600)', letterSpacing: '-0.03em' }}>
            {totalTasks}
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Tâches au total</span>
        </div>

        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-success-light)', color: 'var(--tls-success-fg)' }}>
            <CheckCircle2 size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: '0', color: 'var(--tls-success-fg)', letterSpacing: '-0.03em' }}>
            {completedTasks}
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Tâches complétées</span>
        </div>

        <div className="tls-kpi">
          <div className="tls-kpi-icon" style={{ background: 'var(--tls-yellow-200)', color: 'var(--tls-yellow-700)' }}>
            <Users size={20} />
          </div>
          <h2 style={{ fontSize: 'var(--t-h2)', fontWeight: 800, margin: '0', color: 'var(--tls-yellow-700)', letterSpacing: '-0.03em' }}>
            {uniqueMembers}
          </h2>
          <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>Membres d'équipe</span>
        </div>
      </section>

      {/* ── Project cards ──────────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--s-5)' }}>
        {projects.map((project) => {
          const sm = STATUS_META[project.status];
          return (
            <Card key={project.id} variant="interactive" className="tls-section-card" style={{ cursor: 'default', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-3)' }}>
                <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, flex: 1 }}>
                  {project.title}
                </h3>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: 'var(--r-pill)',
                  background: sm.bg,
                  color: sm.color,
                  border: `1px solid ${sm.border}`,
                  fontSize: 'var(--t-micro)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {STATUS_LABEL[project.status]}
                </span>
              </div>

              {/* Description */}
              <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.55, flex: 1 }}>
                {project.description}
              </p>

              {/* Progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s-1-5)' }}>
                  <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 500 }}>Progression</span>
                  <span style={{ fontSize: 'var(--t-micro)', fontWeight: 700, color: sm.color }}>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} fill={sm.fill} />
              </div>

              {/* Meta chips */}
              <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
                  padding: '3px 8px', borderRadius: 'var(--r-md)',
                  background: 'var(--surface-muted)', border: '1px solid var(--border)',
                  fontSize: 'var(--t-micro)', color: 'var(--text-muted)',
                }}>
                  <CheckCircle2 size={11} /> {project.completedTasks}/{project.totalTasks} tâches
                </span>
                {project.deadline && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)',
                    padding: '3px 8px', borderRadius: 'var(--r-md)',
                    background: 'var(--surface-muted)', border: '1px solid var(--border)',
                    fontSize: 'var(--t-micro)', color: 'var(--text-muted)',
                  }}>
                    <CalendarDays size={11} /> {project.deadline}
                  </span>
                )}
              </div>

              {/* Team footer */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 'var(--s-3)', borderTop: '1px solid var(--border)',
              }}>
                {/* Avatar stack */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                  <div style={{ display: 'flex' }}>
                    {project.teamMembers.map((member, i) => {
                      const pal = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
                      return (
                        <div
                          key={member.id}
                          title={`${member.name} · ${member.role}`}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: pal.bg,
                            color: pal.color,
                            border: '2.5px solid var(--surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '9px',
                            fontWeight: 800,
                            letterSpacing: '-0.01em',
                            marginLeft: i > 0 ? '-7px' : 0,
                            position: 'relative',
                            zIndex: project.teamMembers.length - i,
                            boxShadow: 'var(--shadow-xs)',
                          }}
                        >
                          {initials(member.name)}
                        </div>
                      );
                    })}
                  </div>
                  <span style={{ fontSize: 'var(--t-micro)', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {project.teamMembers.length} membre{project.teamMembers.length > 1 ? 's' : ''}
                  </span>
                </div>

                <button
                  type="button"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '5px 12px',
                    borderRadius: 'var(--r-md)',
                    border: '1.5px solid var(--border)',
                    background: 'transparent',
                    fontSize: 'var(--t-micro)',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all var(--dur-2)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = sm.color;
                    (e.currentTarget as HTMLButtonElement).style.color = sm.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                  }}
                >
                  Ouvrir <ArrowRight size={12} />
                </button>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
};
