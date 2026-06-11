import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, Target, Lock, CheckCircle2 } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { StatCard } from '../components/ui/StatCard';
import { Avatar, AvatarGroup } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { PageShell } from '../components/layout';
import { useProjectsStore, MOCK_PROJECT_COMPANY_ID } from '../stores/persistence';
import type { ProjectType, ProjectStatus } from '../types/projects';

const MOCK_USER_ID = 'user-demo';

const TYPE_LABELS: Record<ProjectType, string> = {
  upskilling: 'Upskilling',
  stride: 'STRIDE',
  custom: 'Custom',
};

const TYPE_VARIANTS = {
  upskilling: 'brand',
  stride: 'warm',
  custom: 'sun',
} as const;

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planned: 'Planifié',
  active: 'En cours',
  completed: 'Terminé',
  archived: 'Archivé',
};

const STATUS_VARIANTS = {
  planned: 'info',
  active: 'success',
  completed: 'neutral',
  archived: 'neutral',
} as const;

const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

const ProjectsList: React.FC = () => {
  const nav = useNavigate();
  const store = useProjectsStore();
  const [filterStatus, setFilterStatus] = useState<'all' | ProjectStatus>('all');
  const [filterType, setFilterType] = useState<'all' | ProjectType>('all');

  const projects = store.getProjects(MOCK_PROJECT_COMPANY_ID);
  const active = projects.filter((p) => p.status === 'active').length;
  const planned = projects.filter((p) => p.status === 'planned').length;
  const allTasks = projects.flatMap((p) => store.getTasks(p.id));
  const myTasks = allTasks.filter((t) => t.assignedTo === MOCK_USER_ID);
  const pendingJacs = projects.flatMap((p) => store.getJacs(p.id)).filter((j) => j.status === 'pending').length;

  const filtered = projects.filter((p) => {
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchType = filterType === 'all' || p.type === filterType;
    return matchStatus && matchType;
  });

  const getProjectProgress = (projectId: string) => {
    const tasks = store.getTasks(projectId);
    if (tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.status === 'approved' || t.status === 'submitted').length;
    return Math.round((done / tasks.length) * 100);
  };

  const getGatingBadge = (projectId: string) => {
    const checks = store.checkGating(MOCK_USER_ID, projectId);
    if (checks.length === 0) return null;
    const failed = checks.filter((c) => !c.passed);
    if (failed.length === 0) return null;
    return failed;
  };

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow={{ label: 'Projets · Mes missions' }}
        title="Tous mes projets"
        summary="Tâches assignées, statut JAC, progression et enrichissement Passeport en temps réel."
        tone="brand"
        trailing={
          <Button variant="glass" leadingIcon={<Plus size={16} />}>
            Nouveau projet
          </Button>
        }
      />

      <PageShell width="page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Projets actifs" value={active} icon={<Target size={20} />} variant="brand" />
          <StatCard label="Planifiés" value={planned} icon={<Calendar size={20} />} variant="warm" />
          <StatCard label="Mes tâches" value={myTasks.length} icon={<Users size={20} />} variant="default" />
          <StatCard label="JAC en attente" value={pendingJacs} icon={<CheckCircle2 size={20} />} variant="default" />
        </div>

        <div className="flex flex-col gap-tight">
          <div className="flex flex-wrap gap-stack-xs">
            <FilterChip label="Tous statuts" active={filterStatus === 'all'} onClick={() => setFilterStatus('all')} />
            <FilterChip label="En cours" active={filterStatus === 'active'} onClick={() => setFilterStatus('active')} />
            <FilterChip label="Planifiés" active={filterStatus === 'planned'} onClick={() => setFilterStatus('planned')} />
            <FilterChip label="Terminés" active={filterStatus === 'completed'} onClick={() => setFilterStatus('completed')} />
          </div>
          <div className="flex flex-wrap gap-stack-xs">
            <FilterChip label="Tous types" active={filterType === 'all'} onClick={() => setFilterType('all')} />
            <FilterChip label="Upskilling" active={filterType === 'upskilling'} onClick={() => setFilterType('upskilling')} />
            <FilterChip label="STRIDE" active={filterType === 'stride'} onClick={() => setFilterType('stride')} />
            <FilterChip label="Custom" active={filterType === 'custom'} onClick={() => setFilterType('custom')} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Aucun projet" description="Aucun projet ne correspond aux filtres sélectionnés." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {filtered.map((p) => {
              const progress = getProjectProgress(p.id);
              const gatingFails = getGatingBadge(p.id);
              const tasks = store.getTasks(p.id);

              return (
                <Card
                  key={p.id}
                  className="p-6 cursor-pointer hover:border-primary-300 transition-all"
                  onClick={() => nav(`/project/${p.id}`)}
                >
                  <div className="flex items-start justify-between gap-stack mb-stack">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        <Badge variant={TYPE_VARIANTS[p.type]}>{TYPE_LABELS[p.type]}</Badge>
                        <Badge variant={STATUS_VARIANTS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
                      </div>
                      <h3 className="text-h4 font-semibold text-ink-900 m-0">{p.title}</h3>
                    </div>
                  </div>

                  {gatingFails && gatingFails.length > 0 && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-warning-bg border border-warning-base/30 mb-stack text-caption text-warning-fg">
                      <Lock size={12} className="mt-0.5 shrink-0" />
                      <span>
                        Pré-requis non atteints :{' '}
                        {gatingFails.map((f) => `${f.competencyName} (D${f.current} → D${f.required} requis)`).join(', ')}
                      </span>
                    </div>
                  )}

                  <div className="mb-stack">
                    <div className="flex justify-between text-caption text-ink-500 mb-1">
                      <span>Progression ({tasks.filter((t) => t.status === 'approved').length}/{tasks.length} tâches)</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar value={progress} fill="brand" size="sm" valueLabel={false} />
                  </div>

                  <div className="flex items-center justify-between text-caption text-ink-500">
                    <div className="flex items-center gap-1.5">
                      <Avatar initials={p.expertInitials} size="sm" tint="brand" />
                      <span>{p.expertName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(p.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </PageShell>
    </div>
  );
};

export default ProjectsList;
