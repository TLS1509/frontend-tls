import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, CheckSquare, Square, Send, CheckCircle2,
  Clock, AlertCircle, RefreshCw, CalendarDays, Shield,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Avatar } from '../components/ui/Avatar';
import FormGroup from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { useProjectsStore } from '../stores/persistence';
import type { TaskStatus } from '../types/projects';
import { Container } from '../components/layout';

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
      <Container width="page" padding={false} className="px-stack py-section flex flex-col gap-section">
        <EditorialHero title="Tâche introuvable" summary="Cette tâche n'existe pas." tone="flat" />
        <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </Container>
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
    <Container width="medium" className="py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
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
            <span className="inline-flex items-center gap-tight.5">
              {STATUS_ICONS[task.status]}
              {STATUS_LABELS[task.status]}
            </span>
          </Badge>
        }
        meta={[
          { icon: <CalendarDays size={12} />, label: `Échéance : ${formatDate(task.dueDate)}` },
          { icon: <Shield size={12} />, label: `Dreyfus ${task.dreyfusLevelRequired}+ requis (${DREYFUS_LABELS[task.dreyfusLevelRequired]})` },
          { icon: <Clock size={12} />, label: `${task.estimatedHours}h estimées` },
        ]}
      />

      {myGatingFails.length > 0 && (
        <div className="flex items-start gap-stack-xs p-stack rounded-xl bg-warning-bg border border-warning-base/30">
          <AlertCircle size={16} className="text-warning-fg mt-0.5 shrink-0" />
          <div>
            <p className="text-body-sm font-semibold text-warning-fg m-0 mb-1">Pré-requis Dreyfus non atteints</p>
            <ul className="m-0 pl-4 flex flex-col gap-tight">
              {myGatingFails.map((f) => (
                <li key={f.competencyId} className="text-caption text-warning-fg">
                  {f.competencyName} : vous êtes D{f.current} ({DREYFUS_LABELS[f.current]}), niveau D{f.required}+ requis
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-section">
        <div className="lg:col-span-2 flex flex-col gap-section">
          {/* Critères de succès */}
          <SectionCard title="Critères de succès" titleIcon={<CheckSquare size={18} />}>
            <div className="flex flex-col gap-stack-xs">
              {task.successCriteria.map((sc, i) => (
                <div key={i} className="flex items-start gap-stack-xs p-stack-xs rounded-lg bg-ink-50">
                  {sc.checked ? (
                    <CheckCircle2 size={16} className="text-success-base mt-0.5 shrink-0" />
                  ) : (
                    <Square size={16} className="text-ink-400 mt-0.5 shrink-0" />
                  )}
                  <span className={`text-body-sm ${sc.checked ? 'text-ink-500 line-through' : 'text-ink-800'}`}>
                    {sc.criterion}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Spécification du livrable */}
          <SectionCard title="Livrable attendu" titleIcon={<FileText size={18} />}>
            <div className="flex flex-col gap-stack-xs">
              <p className="text-body-sm text-ink-700 m-0">{task.deliverableSpec.description}</p>
              <Badge variant="neutral">Format : {task.deliverableSpec.format}</Badge>
            </div>
          </SectionCard>

          {/* Soumission */}
          {canSubmit && !submitted && (
            <SectionCard title="Soumettre le livrable" titleIcon={<Send size={18} />}>
              <div className="flex flex-col gap-stack">
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
                    className="w-full p-3 rounded-md border border-ink-200 font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-auto min-h-[88px]"
                  />
                </FormGroup>
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    leadingIcon={<Send size={16} />}
                    onClick={handleSubmit}
                    disabled={!deliverableUrl.trim()}
                  >
                    Soumettre
                  </Button>
                </div>
              </div>
            </SectionCard>
          )}

          {(submitted || task.status === 'submitted') && (
            <div className="flex items-start gap-stack-xs p-stack rounded-xl bg-info-bg border border-info-base/30">
              <Send size={16} className="text-info-fg mt-0.5 shrink-0" />
              <div>
                <p className="text-body-sm font-semibold text-info-fg m-0">Livrable soumis : en attente de validation</p>
                {task.deliverableUrl && (
                  <a href={task.deliverableUrl} target="_blank" rel="noopener noreferrer" className="text-caption text-info-fg underline">
                    {task.deliverableUrl}
                  </a>
                )}
              </div>
            </div>
          )}

          {isApproved && (
            <div className="flex items-start gap-stack-xs p-stack rounded-xl bg-success-bg border border-success-base/30">
              <CheckCircle2 size={16} className="text-success-fg mt-0.5 shrink-0" />
              <p className="text-body-sm font-semibold text-success-fg m-0">Tâche validée par l'expert</p>
            </div>
          )}

          {task.expertFeedback && (
            <SectionCard title="Feedback de l'expert">
              <p className="text-body-sm text-ink-700 m-0 italic">"{task.expertFeedback}"</p>
            </SectionCard>
          )}

          {/* JACs liés */}
          {taskJacs.length > 0 && (
            <SectionCard title="JAC liés à cette tâche" titleIcon={<CheckCircle2 size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {taskJacs.map((jac) => (
                  <div key={jac.id} className="flex items-center gap-stack p-3 rounded-lg border border-ink-100">
                    <Avatar initials={jac.collaboratorInitials} size="sm" tint="brand" />
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-semibold text-ink-900 m-0">{jac.collaboratorName}</p>
                      <p className="text-caption text-ink-500 m-0">{jac.competencyName}</p>
                    </div>
                    <Badge variant={jac.status === 'approved' ? 'success' : jac.status === 'pending' ? 'neutral' : 'danger'}>
                      {jac.status === 'approved' ? 'Validé' : jac.status === 'pending' ? 'En attente' : 'À retravailler'}
                    </Badge>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>

        {/* Aside */}
        <div className="flex flex-col gap-section">
          <SectionCard title="Assigné à">
            <div className="flex items-center gap-stack">
              <Avatar initials={task.assignedToInitials} size="md" tint="brand" />
              <div>
                <p className="text-body-sm font-semibold text-ink-900 m-0">{task.assignedToName}</p>
                <p className="text-caption text-ink-500 m-0">Collaborateur</p>
              </div>
            </div>
          </SectionCard>

          <Card className="p-stack flex flex-col gap-stack-xs">
            <p className="text-caption font-semibold text-ink-500 uppercase tracking-wide m-0">Statut</p>
            <div className="flex items-center gap-stack-xs">
              {STATUS_ICONS[task.status]}
              <span className="text-body-sm font-semibold text-ink-900">{STATUS_LABELS[task.status]}</span>
            </div>
            <p className="text-caption font-semibold text-ink-500 uppercase tracking-wide m-0 mt-stack-xs">Échéance</p>
            <p className="text-body-sm text-ink-800 m-0">{formatDate(task.dueDate)}</p>
            {task.submissionDate && (
              <>
                <p className="text-caption font-semibold text-ink-500 uppercase tracking-wide m-0 mt-stack-xs">Soumis le</p>
                <p className="text-body-sm text-ink-800 m-0">{formatDate(task.submissionDate)}</p>
              </>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProjectTask;
