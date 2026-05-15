import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Target, CheckCircle2, Clock3, FolderKanban, Sparkles, Award,
  ArrowLeft, Users, Calendar, TrendingUp, Lock,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';
import { useProjectsStore } from '../stores/persistence';
import type { ProjectType, ProjectStatus, TaskStatus } from '../types/projects';

const MOCK_USER_ID = 'user-demo';

const TYPE_LABELS: Record<ProjectType, string> = {
  upskilling: 'Upskilling',
  stride: 'STRIDE',
  custom: 'Custom',
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planned: 'Planifié',
  active: 'En cours',
  completed: 'Terminé',
  archived: 'Archivé',
};

const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'À faire',
  in_progress: 'En cours',
  submitted: 'Soumis',
  approved: 'Validé',
  rework: 'À retravailler',
};

const TASK_STATUS_VARIANTS = {
  not_started: 'neutral',
  in_progress: 'brand',
  submitted: 'info',
  approved: 'success',
  rework: 'danger',
} as const;

export const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  // Seed via getter
  const project = store.getProject(id ?? '');
  const tasks = id ? store.getTasks(id) : [];
  const jacs = id ? store.getJacs(id) : [];
  const enrichments = id ? store.getEnrichments(id) : [];
  const gatingChecks = store.checkGating(MOCK_USER_ID, id ?? '');
  const gatingFails = gatingChecks.filter((c) => !c.passed);

  if (!project) {
    return (
      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <EditorialHero title="Projet introuvable" summary="Ce projet n'existe pas." tone="default" />
        <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/projects')}>
          Retour aux projets
        </Button>
      </div>
    );
  }

  const completedTasks = tasks.filter((t) => t.status === 'approved').length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const validatedJacs = jacs.filter((j) => j.status === 'approved').length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/projects')}>
          Retour aux projets
        </Button>
      </div>

      <EditorialHero
        eyebrow={{ icon: <Award size={12} />, label: `Projet ${TYPE_LABELS[project.type]}` }}
        title={project.title}
        summary={project.description}
        tone="brand"
        trailing={
          <Badge variant={project.status === 'active' ? 'success' : project.status === 'planned' ? 'info' : 'neutral'}>
            {STATUS_LABELS[project.status]}
          </Badge>
        }
        meta={[
          { icon: <Calendar size={12} />, label: `${formatDate(project.startDate)} → ${formatDate(project.endDate)}` },
          { icon: <Sparkles size={12} />, label: `${project.passeportEnrichmentCount} enrichissements attendus` },
        ]}
      />

      {gatingFails.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning-bg border border-warning-base/30">
          <Lock size={16} className="text-warning-fg mt-0.5 shrink-0" />
          <div>
            <p className="text-body-sm font-semibold text-warning-fg m-0 mb-1">Pré-requis Dreyfus non atteints</p>
            <ul className="m-0 pl-4 flex flex-col gap-tight">
              {gatingFails.map((f) => (
                <li key={f.competencyId} className="text-caption text-warning-fg">
                  {f.competencyName} — vous êtes D{f.current}, niveau D{f.required}+ requis
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
        <StatCard label="Tâches validées" value={`${completedTasks}/${tasks.length}`} icon={<CheckCircle2 size={20} />} variant="brand" />
        <StatCard label="JAC validés" value={`${validatedJacs}/${jacs.length}`} icon={<Target size={20} />} variant="warm" />
        <StatCard label="Enrichissements" value={enrichments.length} icon={<TrendingUp size={20} />} variant="default" />
        <StatCard label="Progression" value={`${progress}%`} icon={<FolderKanban size={20} />} variant="default" />
      </div>

      <EditorialLayout
        main={
          <div className="flex flex-col gap-section">
            <SectionCard
              title="Tâches du projet"
              titleIcon={<FolderKanban size={18} />}
              description={`${tasks.length} tâches · ${completedTasks} validées`}
            >
              <div className="flex flex-col gap-stack-xs">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-stack p-3 rounded-lg border border-ink-100 hover:bg-ink-50 transition-all cursor-pointer"
                    onClick={() => navigate(`/project/${project.id}/task/${task.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-semibold text-ink-900 m-0 truncate">{task.title}</p>
                      <p className="text-caption text-ink-500 m-0">
                        Dreyfus {task.dreyfusLevelRequired}+ requis · {task.estimatedHours}h estimées
                      </p>
                    </div>
                    <div className="flex items-center gap-stack-xs shrink-0">
                      <Avatar initials={task.assignedToInitials} size="sm" />
                      <Badge variant={TASK_STATUS_VARIANTS[task.status]}>
                        {TASK_STATUS_LABELS[task.status]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {enrichments.length > 0 && (
              <SectionCard title="Enrichissements Passeport" titleIcon={<TrendingUp size={18} />}>
                <div className="flex flex-col gap-stack-xs">
                  {enrichments.slice(0, 5).map((e) => (
                    <div key={e.id} className="flex items-center gap-stack p-3 rounded-lg bg-success-bg">
                      <Avatar initials={e.collaboratorInitials} size="sm" tint="brand" />
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-semibold text-ink-900 m-0">
                          {e.collaboratorName} — {e.competencyName}
                        </p>
                        <p className="text-caption text-success-fg m-0">
                          D{e.oldDreyfusLevel} → D{e.newDreyfusLevel} · validé par {e.verifiedByName}
                        </p>
                      </div>
                      <Badge variant="success">+{e.newDreyfusLevel - e.oldDreyfusLevel}</Badge>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        }
        aside={
          <div className="flex flex-col gap-section">
            <SectionCard title="Expert mentor" titleIcon={<Users size={15} />}>
              <div className="flex items-center gap-stack">
                <Avatar initials={project.expertInitials} size="md" tint="brand" />
                <div>
                  <p className="text-body-sm font-semibold text-ink-900 m-0">{project.expertName}</p>
                  <p className="text-caption text-ink-500 m-0">Mentor TLS</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Compétences requises" titleIcon={<Target size={15} />}>
              <div className="flex flex-col gap-stack-xs">
                {project.skillProfile.map((req) => (
                  <div key={req.competencyId} className="flex items-center justify-between gap-stack-xs">
                    <span className="text-caption text-ink-700">{req.competencyName}</span>
                    <Badge variant="brand">D{req.dreyfusLevelRequired}+</Badge>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Pages du projet" titleIcon={<FolderKanban size={15} />}>
              <div className="flex flex-col gap-tight">
                <Button variant="secondary" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/team`)}>
                  Équipe
                </Button>
                <Button variant="secondary" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/skill-gaps`)}>
                  Lacunes compétences
                </Button>
                <Button variant="secondary" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/passeport-feed`)}>
                  Feed Passeport
                </Button>
                <Button variant="secondary" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/jac`)}>
                  JAC
                </Button>
              </div>
            </SectionCard>
          </div>
        }
      />
    </div>
  );
};

export default Project;
