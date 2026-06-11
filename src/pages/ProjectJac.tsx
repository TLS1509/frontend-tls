import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Target, CheckCircle2, Clock, XCircle, RefreshCw, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Avatar } from '../components/ui/Avatar';
import FormGroup from '../components/core/FormGroup';
import { useProjectsStore } from '../stores/persistence';
import type { JacStatus, DreyfusRubricScore } from '../types/projects';
import type { DreyfusLevel } from '../types/learning';
import { Container } from '../components/layout';

const MOCK_EXPERT_ID = 'expert-jean-marc';
const DREYFUS_LABELS = ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'] as const;

const JAC_STATUS_LABELS: Record<JacStatus, string> = {
  pending: 'En attente',
  approved: 'Validé',
  rejected: 'Refusé',
  rework_submitted: 'Resoumis',
};

const JAC_STATUS_VARIANTS: Record<JacStatus, 'neutral' | 'success' | 'danger' | 'info'> = {
  pending: 'neutral',
  approved: 'success',
  rejected: 'danger',
  rework_submitted: 'info',
};

const JAC_STATUS_ICONS: Record<JacStatus, React.ReactNode> = {
  pending: <Clock size={14} />,
  approved: <CheckCircle2 size={14} />,
  rejected: <XCircle size={14} />,
  rework_submitted: <RefreshCw size={14} />,
};

interface RubricFormState {
  criterion: string;
  score: DreyfusLevel;
  comment: string;
}

const DEFAULT_CRITERIA = [
  'Maîtrise des concepts fondamentaux',
  'Autonomie dans l\'application',
  'Qualité du livrable',
  'Capacité à expliquer et transmettre',
];

const JacValidationForm: React.FC<{
  jacId: string;
  collaboratorName: string;
  competencyName: string;
  onClose: () => void;
}> = ({ jacId, collaboratorName, competencyName, onClose }) => {
  const store = useProjectsStore();
  const [rubric, setRubric] = useState<RubricFormState[]>(
    DEFAULT_CRITERIA.map((criterion) => ({ criterion, score: 3 as DreyfusLevel, comment: '' }))
  );
  const [globalFeedback, setGlobalFeedback] = useState('');
  const [decision, setDecision] = useState<'approved' | 'rejected' | 'rework_submitted'>('approved');

  const averageLevel = Math.round(
    rubric.reduce((sum, r) => sum + r.score, 0) / rubric.length
  ) as DreyfusLevel;

  const handleScoreChange = (idx: number, score: DreyfusLevel) => {
    setRubric((prev) => prev.map((r, i) => (i === idx ? { ...r, score } : r)));
  };

  const handleCommentChange = (idx: number, comment: string) => {
    setRubric((prev) => prev.map((r, i) => (i === idx ? { ...r, comment } : r)));
  };

  const handleSubmit = () => {
    const rubricScores: DreyfusRubricScore[] = rubric.map((r) => ({
      criterion: r.criterion,
      score: r.score,
      comment: r.comment || undefined,
    }));
    store.submitJacValidation(
      jacId,
      averageLevel,
      decision,
      globalFeedback,
      rubricScores
    );
    onClose();
  };

  return (
    <div className="flex flex-col gap-section p-4 bg-ink-50 rounded-xl border border-ink-200">
      <div>
        <p className="text-body-sm font-semibold text-ink-900 m-0">
          Validation JAC : {collaboratorName}
        </p>
        <p className="text-caption text-ink-500 m-0">{competencyName}</p>
      </div>

      {/* Rubric scoring */}
      <div className="flex flex-col gap-stack">
        <p className="text-caption font-semibold text-ink-600 uppercase tracking-wide m-0">Grille d'évaluation Dreyfus</p>
        {rubric.map((row, idx) => (
          <div key={idx} className="flex flex-col gap-stack-xs p-3 bg-white rounded-lg border border-ink-100">
            <p className="text-body-sm font-semibold text-ink-900 m-0">{row.criterion}</p>
            <div className="flex flex-wrap gap-1.5">
              {([1, 2, 3, 4, 5] as DreyfusLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => handleScoreChange(idx, level)}
                  className={`px-3 py-1 rounded-pill text-caption font-semibold transition-all ${
                    row.score === level
                      ? 'bg-primary-600 text-white'
                      : 'bg-ink-100 text-ink-600 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  D{level} · {DREYFUS_LABELS[level]}
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              placeholder="Commentaire (optionnel)"
              value={row.comment}
              onChange={(e) => handleCommentChange(idx, e.target.value)}
              className="w-full p-2 rounded-md border border-ink-200 font-body text-caption focus:outline-none focus:ring-1 focus:ring-primary-500 h-auto min-h-[52px]"
            />
          </div>
        ))}
      </div>

      {/* Average level display */}
      <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
        <Target size={16} className="text-primary-600 shrink-0" />
        <p className="text-body-sm text-primary-800 m-0">
          Niveau Dreyfus calculé : <strong>D{averageLevel} : {DREYFUS_LABELS[averageLevel]}</strong>
        </p>
      </div>

      {/* Global feedback */}
      <FormGroup label="Feedback global">
        <textarea
          rows={3}
          placeholder="Synthèse de l'évaluation, axes d'amélioration..."
          value={globalFeedback}
          onChange={(e) => setGlobalFeedback(e.target.value)}
          className="w-full p-3 rounded-md border border-ink-200 font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-auto min-h-[88px]"
        />
      </FormGroup>

      {/* Decision */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600 m-0">Décision</p>
        <div className="flex gap-2 flex-wrap">
          {(['approved', 'rework_submitted', 'rejected'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDecision(d)}
              className={`px-4 py-2 rounded-pill text-body-sm font-semibold transition-all ${
                decision === d
                  ? d === 'approved'
                    ? 'bg-success-base text-white'
                    : d === 'rejected'
                    ? 'bg-danger-base text-white'
                    : 'bg-info-base text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {d === 'approved' ? 'Valider' : d === 'rework_submitted' ? 'À retravailler' : 'Refuser'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-stack-xs justify-end">
        <Button variant="ghost" size="sm" onClick={onClose}>Annuler</Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Confirmer l'évaluation
        </Button>
      </div>
    </div>
  );
};

export const ProjectJac: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProjectsStore();
  const [expandedJacId, setExpandedJacId] = useState<string | null>(null);
  const [validatingJacId, setValidatingJacId] = useState<string | null>(null);

  const jacs = projectId ? store.getJacs(projectId) : [];

  const pendingJacs = jacs.filter((j) => j.status === 'pending' || j.status === 'rework_submitted');
  const doneJacs = jacs.filter((j) => j.status === 'approved' || j.status === 'rejected');

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  const toggleExpand = (jacId: string) => {
    setExpandedJacId((prev) => (prev === jacId ? null : jacId));
  };

  return (
    <Container width="medium" className="py-section flex flex-col gap-section">
      <div>
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
          Retour au projet
        </Button>
      </div>

      <EditorialHero
        eyebrow={{ label: 'Projet · JAC' }}
        title="Jalons d'Application Critique"
        summary="Évaluations Dreyfus par compétence. Validez les JAC soumis par les collaborateurs."
        tone="brand"
        meta={[
          { icon: <Clock size={12} />, label: `${pendingJacs.length} en attente` },
          { icon: <CheckCircle2 size={12} />, label: `${doneJacs.length} traités` },
        ]}
      />

      {/* JACs en attente */}
      {pendingJacs.length > 0 && (
        <SectionCard
          title="JAC en attente de validation"
          titleIcon={<Clock size={18} />}
          description={`${pendingJacs.length} JAC à évaluer`}
        >
          <div className="flex flex-col gap-stack-xs">
            {pendingJacs.map((jac) => (
              <div key={jac.id} className="rounded-lg border border-ink-200 overflow-hidden">
                <div
                  className="flex items-center gap-stack p-4 cursor-pointer hover:bg-ink-50 transition-all"
                  onClick={() => toggleExpand(jac.id)}
                >
                  <Avatar initials={jac.collaboratorInitials} size="md" tint="brand" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">{jac.collaboratorName}</p>
                    <p className="text-caption text-ink-500 m-0">{jac.competencyName} · soumis le {formatDate(jac.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-stack-xs shrink-0">
                    <Badge variant={JAC_STATUS_VARIANTS[jac.status]}>
                      <span className="inline-flex items-center gap-1">
                        {JAC_STATUS_ICONS[jac.status]}
                        {JAC_STATUS_LABELS[jac.status]}
                      </span>
                    </Badge>
                    {expandedJacId === jac.id ? <ChevronUp size={16} className="text-ink-400" /> : <ChevronDown size={16} className="text-ink-400" />}
                  </div>
                </div>

                {expandedJacId === jac.id && (
                  <div className="px-4 pb-4 flex flex-col gap-stack border-t border-ink-100 pt-stack">
                    <div className="flex items-center gap-3 text-caption text-ink-600">
                      <Avatar initials={jac.expertInitials} size="sm" />
                      <span>Expert assigné : {jac.expertName}</span>
                    </div>

                    {validatingJacId === jac.id ? (
                      <JacValidationForm
                        jacId={jac.id}
                        collaboratorName={jac.collaboratorName}
                        competencyName={jac.competencyName}
                        onClose={() => setValidatingJacId(null)}
                      />
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        leadingIcon={<Target size={14} />}
                        onClick={() => setValidatingJacId(jac.id)}
                      >
                        Évaluer ce JAC
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* JACs traités */}
      {doneJacs.length > 0 && (
        <SectionCard
          title="JAC traités"
          titleIcon={<CheckCircle2 size={18} />}
          description={`${doneJacs.length} JAC évalués`}
        >
          <div className="flex flex-col gap-stack-xs">
            {doneJacs.map((jac) => (
              <div key={jac.id} className="rounded-lg border border-ink-100 overflow-hidden">
                <div
                  className="flex items-center gap-stack p-4 cursor-pointer hover:bg-ink-50 transition-all"
                  onClick={() => toggleExpand(jac.id)}
                >
                  <Avatar initials={jac.collaboratorInitials} size="md" tint={jac.status === 'approved' ? 'brand' : 'warm'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-semibold text-ink-900 m-0">{jac.collaboratorName}</p>
                    <p className="text-caption text-ink-500 m-0">
                      {jac.competencyName}
                      {jac.dreyfusLevelAchieved && ` · D${jac.dreyfusLevelAchieved} : ${DREYFUS_LABELS[jac.dreyfusLevelAchieved]}`}
                      {jac.validatedAt && ` · validé le ${formatDate(jac.validatedAt)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-stack-xs shrink-0">
                    <Badge variant={JAC_STATUS_VARIANTS[jac.status]}>
                      <span className="inline-flex items-center gap-1">
                        {JAC_STATUS_ICONS[jac.status]}
                        {JAC_STATUS_LABELS[jac.status]}
                      </span>
                    </Badge>
                    {expandedJacId === jac.id ? <ChevronUp size={16} className="text-ink-400" /> : <ChevronDown size={16} className="text-ink-400" />}
                  </div>
                </div>

                {expandedJacId === jac.id && (
                  <div className="px-4 pb-4 flex flex-col gap-stack border-t border-ink-100 pt-stack">
                    {jac.rubricScores && jac.rubricScores.length > 0 && (
                      <div className="flex flex-col gap-stack-xs">
                        <p className="text-caption font-semibold text-ink-500 uppercase tracking-wide m-0">Grille Dreyfus</p>
                        {jac.rubricScores.map((rs, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-4 p-3 bg-ink-50 rounded-lg">
                            <span className="text-body-sm text-ink-700 flex-1">{rs.criterion}</span>
                            <div className="flex flex-col items-end gap-tight shrink-0">
                              <Badge variant="brand">D{rs.score} · {DREYFUS_LABELS[rs.score]}</Badge>
                              {rs.comment && <span className="text-caption text-ink-500 text-right">{rs.comment}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {jac.expertFeedback && (
                      <div className="p-3 bg-success-bg rounded-lg">
                        <p className="text-caption font-semibold text-success-fg m-0 mb-1">Feedback expert</p>
                        <p className="text-body-sm text-ink-700 m-0 italic">"{jac.expertFeedback}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {jacs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-section gap-stack text-center">
          <Target size={40} className="text-ink-300" />
          <p className="text-body-sm text-ink-500 m-0">Aucun JAC soumis pour ce projet.</p>
        </div>
      )}
    </Container>
  );
};

export default ProjectJac;
