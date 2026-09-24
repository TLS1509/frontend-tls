import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Square, Send, CheckCircle2,
  Clock, AlertCircle, RefreshCw, CalendarDays, Shield,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { SectionCard } from '../components/patterns/SectionCard';
import { Avatar } from '../components/ui/Avatar';
import FormGroup from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { useProjectsStore } from '../stores/persistence';
import type { TaskStatus } from '../types/projects';
import { PageShell } from '../components/layout';

const MOCK_USER_ID = 'user-demo';

const STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'À faire',
  in_progress: 'En cours',
  submitted: 'Soumis',
  approved: 'Validé',
  rework: 'À retravailler',
};

const STATUS_VARIANTS: Record<TaskStatus, 'neutral' | 'brand' | 'info' | 'success' | 'danger'> = {
  not_started: 'neutral',
  in_progress: 'brand',
  submitted: 'info',
  approved: 'success',
  rework: 'danger',
};

const STATUS_ICONS: Record<TaskStatus, React.ReactNode> = {
  not_started: <Square size={14} />,
  in_progress: <Clock size={14} />,
  submitted: <Send size={14} />,
  approved: <CheckCircle2 size={14} />,
  rework: <RefreshCw size={14} />,
};

const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

export const ProjectTask: React.FC = () => {
  const { id: projectId, taskId } = useParams<{ id: string; taskId: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();

  const task = store.getTask(taskId ?? '');
  const taskJacs = taskId ? store.getTaskJacs(taskId) : [];
  const gatingChecks = store.checkGating(MOCK_USER_ID, projectId ?? '');
  const myGatingFails = gatingChecks.filter((c) => !c.passed);

  const [deliverableUrl, setDeliverableUrl] = useState(task?.deliverableUrl ?? '');
  const [notes, setNotes] = useState(task?.submissionNotes ?? '');
  const [submitted, setSubmitted] = useState(false);

  if (!task) {
    return (
      <PageShell width="page">
        <EditorialHero title="Tâche introuvable" summary="Cette tâche n'existe pas." tone="flat" />
        <Button emphasis="outline" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(`/project/${projectId}`)} className="self-start">
          Retour au projet
        </Button>
      </PageShell>
    );
  }

  const canSubmit = task.status === 'not_started' || task.status === 'in_progress' || task.status === 'rework';
  const isApproved = task.status === 'approved';

  const handleSubmit = () => {
    if (!deliverableUrl.trim()) return;
    store.submitTask(task.id, deliverableUrl.trim(), notes.trim());
    setSubmitted(true);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    /* `PageShell` : le `Container` ajoutait sa gouttière à celle de la page.
       Le retour et l'en-tête forment un groupe (24). */
    <PageShell width="medium">
      <div className="flex flex-col gap-stack-lg">
        <div>
          <Button emphasis="outline" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
            Retour au projet
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ label: `Projet · Tâche` }}
          title={task.title}
          summary={task.description}
          tone="flat"
          trailing={
            <Badge variant={STATUS_VARIANTS[task.status]}>
              <span className="inline-flex items-center gap-stack-2xs">
                {STATUS_ICONS[task.status]}
                {STATUS_LABELS[task.status]}
              </span>
            </Badge>
          }
          meta={[
            { icon: <CalendarDays size={14} />, label: `Échéance : ${formatDate(task.dueDate)}` },
            { icon: <Shield size={14} />, label: `Dreyfus ${task.dreyfusLevelRequired}+ requis (${DREYFUS_LABELS[task.dreyfusLevelRequired]})` },
            { icon: <Clock size={14} />, label: `${task.estimatedHours}h estimées` },
          ]}
        />
      </div>

      {/* Alerte du système (faite main, liste indentée sans puces). */}
      {myGatingFails.length > 0 && (
        <Alert variant="warning" icon={<AlertCircle size={18} />} title="Pré-requis Dreyfus non atteints">
          <ul className="list-disc pl-5 flex flex-col gap-stack-3xs">
            {myGatingFails.map((f) => (
              <li key={f.competencyId}>
                {f.competencyName} : vous êtes D{f.current} ({DREYFUS_LABELS[f.current]}), niveau D{f.required}+ requis
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-page lg:gap-section">
        {/* Colonne principale : des sections, titre (h2 28) sur la page,
            contenu dans sa carte. */}
        <div className="lg:col-span-2 flex flex-col gap-page min-w-0">
          {/* Critères de succès — une liste dans une carte (chaque critère
              était une boîte grise dans une carte) ; un critère coché passe en
              ink-600 barré (ink-500 est la couleur des placeholders). */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Critères de succès" />
            <Card>
              <ul className="flex flex-col gap-stack-xs">
                {task.successCriteria.map((sc, i) => (
                  <li key={i} className="flex items-start gap-stack-xs">
                    {sc.checked ? (
                      <CheckCircle2 size={16} className="text-success-base mt-[5px] shrink-0" aria-label="Fait" />
                    ) : (
                      <Square size={16} className="text-ink-600 mt-[5px] shrink-0" aria-hidden="true" />
                    )}
                    <span className={`text-body ${sc.checked ? 'text-ink-600 line-through' : 'text-ink-900'}`}>
                      {sc.criterion}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Spécification du livrable — le format est une donnée (MetaPill),
              il criait en Badge capitales. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Livrable attendu" />
            <Card className="flex flex-col gap-stack-sm">
              <p className="text-body text-ink-700 max-w-prose">{task.deliverableSpec.description}</p>
              <MetaPill text={`Format : ${task.deliverableSpec.format}`} className="self-start" />
            </Card>
          </section>

          {/* Soumission */}
          {canSubmit && !submitted && (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Soumettre le livrable" />
              <Card className="flex flex-col gap-stack">
                <FormGroup label="URL du livrable *">
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={deliverableUrl}
                    onChange={(e) => setDeliverableUrl(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="Notes de soumission (optionnel)">
                  <textarea
                    rows={3}
                    placeholder="Décrivez votre approche, les points clés de votre livrable..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-stack-sm rounded-lg border border-ink-400 font-body text-body placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-auto min-h-[88px]"
                  />
                </FormGroup>
                <div className="flex justify-end mt-stack-xs">
                  <Button
                    emphasis="soft"
                    leadingIcon={<Send size={16} />}
                    onClick={handleSubmit}
                    disabled={!deliverableUrl.trim()}
                  >
                    Soumettre
                  </Button>
                </div>
              </Card>
            </section>
          )}

          {/* États : les alertes du système (elles étaient faites main). */}
          {(submitted || task.status === 'submitted') && (
            <Alert variant="info" icon={<Send size={18} />} title="Livrable soumis : en attente de validation">
              {task.deliverableUrl && (
                <a href={task.deliverableUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">
                  {task.deliverableUrl}
                </a>
              )}
            </Alert>
          )}

          {isApproved && (
            <Alert variant="success" icon={<CheckCircle2 size={18} />} title="Tâche validée par l'expert" />
          )}

          {task.expertFeedback && (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="Feedback de l'expert" />
              <Card>
                <p className="font-body text-body text-ink-700 italic max-w-prose">"{task.expertFeedback}"</p>
              </Card>
            </section>
          )}

          {/* JACs liés — rangées dans une carte. */}
          {taskJacs.length > 0 && (
            <section className="flex flex-col gap-stack">
              <SectionHeader title="JAC liés à cette tâche" />
              <Card className="p-0 overflow-hidden">
                <ul className="divide-y divide-ink-100">
                  {taskJacs.map((jac) => (
                    <li key={jac.id} className="flex items-center gap-stack px-stack-lg py-stack">
                      <Avatar initials={jac.collaboratorInitials} size="sm" tint="brand" />
                      <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                        <p className="text-body font-semibold text-ink-900">{jac.collaboratorName}</p>
                        <p className="text-caption text-ink-600">{jac.competencyName}</p>
                      </div>
                      <Badge variant={jac.status === 'approved' ? 'success' : jac.status === 'pending' ? 'neutral' : 'danger'}>
                        {jac.status === 'approved' ? 'Validé' : jac.status === 'pending' ? 'En attente' : 'À retravailler'}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          )}
        </div>

        {/* Aside — des blocs (h3 20), après les sections. L'encart « Statut »
            est une liste de paires : intitulé en légende 13/600 (il était en
            capitales espacées ink-500), valeur en corps, 4 entre eux, 12 entre
            deux paires. */}
        <div className="flex flex-col gap-stack-lg">
          <SectionCard title="Assigné à">
            <div className="flex items-center gap-stack-sm">
              <Avatar initials={task.assignedToInitials} size="md" tint="brand" />
              <div className="flex flex-col gap-stack-3xs">
                <p className="text-body font-semibold text-ink-900">{task.assignedToName}</p>
                <p className="text-caption text-ink-600">Collaborateur</p>
              </div>
            </div>
          </SectionCard>

          <Card size="sm">
            <dl className="flex flex-col gap-stack-sm">
              <div className="flex flex-col gap-stack-3xs">
                <dt className="text-caption font-semibold text-ink-600">Statut</dt>
                <dd className="flex items-center gap-stack-xs">
                  {STATUS_ICONS[task.status]}
                  <span className="text-body font-semibold text-ink-900">{STATUS_LABELS[task.status]}</span>
                </dd>
              </div>
              <div className="flex flex-col gap-stack-3xs">
                <dt className="text-caption font-semibold text-ink-600">Échéance</dt>
                <dd className="text-body text-ink-900 tabular-nums">{formatDate(task.dueDate)}</dd>
              </div>
              {task.submissionDate && (
                <div className="flex flex-col gap-stack-3xs">
                  <dt className="text-caption font-semibold text-ink-600">Soumis le</dt>
                  <dd className="text-body text-ink-900 tabular-nums">{formatDate(task.submissionDate)}</dd>
                </div>
              )}
            </dl>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

export default ProjectTask;
