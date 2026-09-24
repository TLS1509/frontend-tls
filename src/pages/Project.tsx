import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Target, CheckCircle2, Clock3, FolderKanban, Award,
  ArrowLeft, Users, Calendar, TrendingUp, Lock, ChevronRight,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';
import { EtapeAccordion } from '../components/patterns/EtapeAccordion';
import { useProjectsStore } from '../stores/persistence';
import type { ProjectType, ProjectStatus, TaskStatus } from '../types/projects';
import { PageShell } from '../components/layout';

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
  const [openTask, setOpenTask] = useState<string | null>(null);

  // Seed via getter
  const project = store.getProject(id ?? '');
  const tasks = id ? store.getTasks(id) : [];
  const jacs = id ? store.getJacs(id) : [];
  const enrichments = id ? store.getEnrichments(id) : [];
  const gatingChecks = store.checkGating(MOCK_USER_ID, id ?? '');
  const gatingFails = gatingChecks.filter((c) => !c.passed);

  if (!project) {
    return (
      <PageShell width="page">
        <EditorialHero title="Projet introuvable" summary="Ce projet n'existe pas." tone="flat" />
        {/* Seule issue de l'écran : son action principale, l'aplat (n°19). */}
        <Button emphasis="solid" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/projects')} className="self-start">
          Retour aux projets
        </Button>
      </PageShell>
    );
  }

  const completedTasks = tasks.filter((t) => t.status === 'approved').length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const validatedJacs = jacs.filter((j) => j.status === 'approved').length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    /* `PageShell` : le `Container` ajoutait sa propre gouttière (40 px à
       1440) à celle de la page — tout le projet était décalé vers la droite. */
    <PageShell width="medium">
      {/* Le retour et l'en-tête forment un groupe : 24 entre eux. */}
      <div className="flex flex-col gap-stack-lg">
        {/* Le retour est tertiaire : `ghost` neutre (arbitrage n°19). La page
            est un hub sans aplat : chaque action appartient à sa tâche. */}
        <div>
          <Button emphasis="ghost" tone="neutral" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/projects')}>
            Retour aux projets
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ icon: <Award size={14} />, label: `Projet ${TYPE_LABELS[project.type]}` }}
          title={project.title}
          summary={project.description}
          tone="flat"
          trailing={
            <Badge variant={project.status === 'active' ? 'success' : project.status === 'planned' ? 'info' : 'neutral'}>
              {STATUS_LABELS[project.status]}
            </Badge>
          }
          meta={[
            { icon: <Calendar size={14} />, label: `${formatDate(project.startDate)} → ${formatDate(project.endDate)}` },
            /* L'étincelle marque les fonctions d'IA : ici, une progression. */
            { icon: <TrendingUp size={14} />, label: `${project.passeportEnrichmentCount} enrichissements attendus` },
          ]}
        />
      </div>

      {/* L'alerte du système (elle était faite main, avec une liste indentée
          sans puces) ; les écarts se lisent en corps 16. */}
      {gatingFails.length > 0 && (
        <Alert variant="warning" icon={<Lock size={18} />} title="Pré-requis Dreyfus non atteints">
          <ul className="list-disc pl-5 flex flex-col gap-stack-3xs">
            {gatingFails.map((f) => (
              <li key={f.competencyId}>
                {f.competencyName} : tu es D{f.current}, niveau D{f.required}+ requis
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
        <StatCard label="Tâches validées" value={`${completedTasks}/${tasks.length}`} icon={<CheckCircle2 size={20} />} variant="brand" />
        <StatCard label="JAC validés" value={`${validatedJacs}/${jacs.length}`} icon={<Target size={20} />} variant="warm" />
        <StatCard label="Enrichissements" value={enrichments.length} icon={<TrendingUp size={20} />} variant="default" />
        <StatCard label="Progression" value={`${progress}%`} icon={<FolderKanban size={20} />} variant="default" />
      </div>

      <EditorialLayout
        main={
          /* Les sections de la colonne principale : titre (h2 28) sur la
             page, le compte en méta ; les tâches sont des accordéons, sans
             carte autour d'eux. */
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Tâches du projet"
                meta={`${tasks.length} tâches · ${completedTasks} validées`}
              />
              <div className="flex flex-col gap-stack-xs">
                {tasks.map((task) => (
                  <EtapeAccordion
                    key={task.id}
                    variant="default"
                    isOpen={openTask === task.id}
                    onToggle={() => setOpenTask(openTask === task.id ? null : task.id)}
                    header={
                      <div className="flex items-center gap-stack min-w-0 flex-1">
                        <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                          <p className="text-body font-semibold text-ink-900 truncate">{task.title}</p>
                          <p className="text-caption text-ink-600 tabular-nums">
                            D{task.dreyfusLevelRequired}+ · {task.estimatedHours}h
                          </p>
                        </div>
                        <div className="flex items-center gap-stack-2xs shrink-0">
                          <Avatar initials={task.assignedToInitials} size="sm" />
                          <Badge variant={TASK_STATUS_VARIANTS[task.status]} size="compact">
                            {TASK_STATUS_LABELS[task.status]}
                          </Badge>
                        </div>
                      </div>
                    }
                  >
                    {/* Description et critères : le contenu de la tâche, en corps
                        ink-700 (ils étaient en ink-600 et en légende ink-500). */}
                    <div className="px-stack py-stack flex flex-col gap-stack border-t border-ink-100">
                      <p className="text-body text-ink-700 max-w-prose">{task.description}</p>
                      {task.successCriteria.length > 0 && (
                        <ul className="list-disc pl-5 flex flex-col gap-stack-3xs text-body text-ink-700">
                          {task.successCriteria.map((c, i) => (
                            <li key={i}>{c.criterion}</li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-stack-xs">
                        {task.status !== 'approved' && (
                          <Button
                            emphasis="soft"
                            size="sm"
                            trailingIcon={<ChevronRight size={14} />}
                            onClick={() => navigate(`/project/${project.id}/task/${task.id}/submit`)}
                          >
                            {task.status === 'submitted' ? 'Voir la soumission' : 'Soumettre ma réalisation'}
                          </Button>
                        )}
                        {task.status === 'approved' && (
                          <span className="inline-flex items-center gap-stack-3xs text-caption text-success-fg font-semibold">
                            <CheckCircle2 size={14} /> Tâche validée
                          </span>
                        )}
                      </div>
                    </div>
                  </EtapeAccordion>
                ))}
              </div>
            </section>

            {enrichments.length > 0 && (
              <section className="flex flex-col gap-stack">
                <SectionHeader title="Enrichissements Passeport" />
                <Card className="p-0 overflow-hidden">
                  <ul className="divide-y divide-ink-100">
                    {enrichments.slice(0, 5).map((e) => (
                      <li key={e.id} className="flex items-center gap-stack px-stack-lg py-stack">
                        <Avatar initials={e.collaboratorInitials} size="sm" tint="brand" />
                        <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                          <p className="text-body font-semibold text-ink-900">
                            {e.collaboratorName} : {e.competencyName}
                          </p>
                          <p className="text-caption text-ink-600">
                            D{e.oldDreyfusLevel} → D{e.newDreyfusLevel} · validé par {e.verifiedByName}
                          </p>
                        </div>
                        {/* Un écart de niveau est une donnée : MetaPill. */}
                        <MetaPill text={`+${e.newDreyfusLevel - e.oldDreyfusLevel}`} tone="success" className="shrink-0 tabular-nums" />
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}
          </div>
        }
        aside={
          /* Colonne latérale : des blocs (h3 20), après les sections de la
             colonne principale. Les libellés en corps, les niveaux requis en
             MetaPill (des données), 8 entre deux boutons (2 avant). */
          <div className="flex flex-col gap-stack-lg">
            <SectionCard title="Expert mentor" titleIcon={<Users size={16} />}>
              <div className="flex items-center gap-stack-sm">
                <Avatar initials={project.expertInitials} size="md" tint="brand" />
                <div className="flex flex-col gap-stack-3xs">
                  <p className="text-body font-semibold text-ink-900">{project.expertName}</p>
                  <p className="text-caption text-ink-600">Mentor TLS</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Compétences requises" titleIcon={<Target size={16} />}>
              <div className="flex flex-col gap-stack-xs">
                {project.skillProfile.map((req) => (
                  <div key={req.competencyId} className="flex items-center justify-between gap-stack-xs">
                    <span className="text-body text-ink-900">{req.competencyName}</span>
                    <MetaPill text={`D${req.dreyfusLevelRequired}+`} tone="primary" className="shrink-0" />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Une sous-navigation : des liens vers les pages voisines, donc
                des `ghost` (arbitrage n°19). C'étaient quatre `soft` orange
                empilés, le bloc le plus bruyant de la page. */}
            <SectionCard title="Pages du projet" titleIcon={<FolderKanban size={16} />}>
              <div className="flex flex-col gap-stack-xs">
                <Button emphasis="ghost" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/team`)}>
                  Équipe
                </Button>
                <Button emphasis="ghost" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/skill-gaps`)}>
                  Lacunes compétences
                </Button>
                <Button emphasis="ghost" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/passeport`)}>
                  Feed Passeport
                </Button>
                <Button emphasis="ghost" size="sm" fullWidth onClick={() => navigate(`/project/${project.id}/jac`)}>
                  JAC
                </Button>
              </div>
            </SectionCard>
          </div>
        }
      />
    </PageShell>
  );
};

export default Project;
