import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Lock } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
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

const ProjectsList: React.FC = () => {
  const nav = useNavigate();
  const store = useProjectsStore();
  const [filterStatus, setFilterStatus] = useState<'all' | ProjectStatus>('all');
  const [filterType, setFilterType] = useState<'all' | ProjectType>('all');

  const projects = store.getProjects(MOCK_PROJECT_COMPANY_ID);

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

  /* Le titre de la collection nomme ce qu'elle montre : « Tous les projets »,
     ou les filtres actifs. */
  const STATUS_FILTER_LABEL: Record<ProjectStatus, string> = { planned: 'Planifiés', active: 'En cours', completed: 'Terminés', archived: 'Archivés' };
  const collectionTitle = [
    filterStatus !== 'all' ? STATUS_FILTER_LABEL[filterStatus] : null,
    filterType !== 'all' ? TYPE_LABELS[filterType] : null,
  ].filter(Boolean).join(' · ') || 'Tous les projets';

  return (
    /* L'en-tête entre dans la coque : il collait au haut de l'écran. */
    <PageShell width="page">
      <EditorialHero
        eyebrow={{ label: 'Projets · Mes missions' }}
        title="Tous mes projets"
        summary="Tâches assignées, statut JAC, progression et enrichissement Passeport en temps réel."
        tone="flat"
        trailing={
          <Button emphasis="soft" leadingIcon={<Plus size={16} />}>
            Nouveau projet
          </Button>
        }
      />

      {/* La collection a son titre (h2) : la page passait du h1 aux h3 des
          cartes. Le compte est une donnée (méta). Les deux rangées de filtres
          se suivent à 8 (elles étaient à 2), la grille les suit à 16. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title={collectionTitle}
          meta={`${filtered.length} projet${filtered.length > 1 ? 's' : ''}`}
        />
        <div className="flex flex-col gap-stack-xs">
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
                /* Anatomie de carte : le type (une donnée, MetaPill) et
                   l'état (Badge) au-dessus du titre à 4 ; puis 16 entre les
                   blocs ; la méta du bas en ink-600 (elle était en ink-500). */
                <Card
                  key={p.id}
                  className="p-stack-lg flex flex-col gap-stack cursor-pointer hover:border-primary-300 transition-all"
                  onClick={() => nav(`/project/${p.id}`)}
                >
                  <div className="flex flex-col gap-stack-3xs">
                    <div className="flex flex-wrap items-center gap-stack-2xs">
                      <MetaPill text={TYPE_LABELS[p.type]} tone={TYPE_VARIANTS[p.type]} />
                      <Badge variant={STATUS_VARIANTS[p.status]}>{STATUS_LABELS[p.status]}</Badge>
                    </div>
                    <h3 className="font-display text-h3 text-ink-900">{p.title}</h3>
                  </div>

                  {gatingFails && gatingFails.length > 0 && (
                    <div className="flex items-start gap-stack-xs p-stack rounded-lg bg-warning-bg border border-warning-base/30 text-caption text-warning-fg">
                      <Lock size={14} className="mt-[3px] shrink-0" aria-hidden="true" />
                      <span>
                        Pré-requis non atteints :{' '}
                        {gatingFails.map((f) => `${f.competencyName} (D${f.current} → D${f.required} requis)`).join(', ')}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-stack-xs">
                    <div className="flex justify-between gap-stack text-caption text-ink-600 tabular-nums">
                      <span>Progression ({tasks.filter((t) => t.status === 'approved').length}/{tasks.length} tâches)</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar value={progress} fill="brand" size="sm" valueLabel={false} />
                  </div>

                  <div className="flex items-center justify-between gap-stack text-caption text-ink-600">
                    <div className="flex items-center gap-stack-xs">
                      <Avatar initials={p.expertInitials} size="sm" tint="brand" />
                      <span>{p.expertName}</span>
                    </div>
                    <div className="flex items-center gap-stack-3xs tabular-nums">
                      <Calendar size={14} aria-hidden="true" />
                      {new Date(p.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default ProjectsList;
