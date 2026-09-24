import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Target, CheckCircle2, Clock, XCircle, RefreshCw, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Card } from '../components/core/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Avatar } from '../components/ui/Avatar';
import FormGroup from '../components/core/FormGroup';
import { useProjectsStore } from '../stores/persistence';
import type { JacStatus, DreyfusRubricScore } from '../types/projects';
import type { DreyfusLevel } from '../types/learning';
import { DREYFUS_LABELS } from '../data/competencies';
import { PageShell } from '../components/layout';

const MOCK_EXPERT_ID = 'expert-jean-marc';

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
  // Le niveau validé est une DÉCISION de l'expert (art. 22), pas une moyenne écrite
  // en aveugle : la moyenne rubrique pré-remplit, l'expert confirme ou ajuste.
  const [levelOverride, setLevelOverride] = useState<DreyfusLevel | null>(null);
  const effectiveLevel: DreyfusLevel = levelOverride ?? averageLevel;

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
      effectiveLevel,
      decision,
      globalFeedback,
      rubricScores
    );
    onClose();
  };

  /* Rythme du formulaire : 24 entre ses groupes (32 avant, l'écart entre deux
     sections de page). Les intitulés de groupe sont des légendes 13/600 en
     casse normale (ils étaient en capitales espacées ink-500) ; les champs
     prennent le filet des champs (ink-400) et un texte saisi à 16 (sous 16,
     iOS zoome au focus). Les boutons de décision passent au rayon des
     contrôles (14) et à leur hauteur (44). */
  return (
    <div className="flex flex-col gap-stack-lg p-stack-md bg-ink-50 rounded-xl border border-ink-200">
      <div className="flex flex-col gap-stack-3xs">
        <p className="text-body font-semibold text-ink-900">
          Validation JAC : {collaboratorName}
        </p>
        <p className="text-caption text-ink-600">{competencyName}</p>
      </div>

      {/* Rubric scoring */}
      <div className="flex flex-col gap-stack-sm">
        <p className="text-caption font-semibold text-ink-600">Grille d'évaluation Dreyfus</p>
        {rubric.map((row, idx) => (
          <div key={idx} className="flex flex-col gap-stack-xs p-stack bg-white rounded-lg border border-ink-100">
            <p className="text-body font-semibold text-ink-900">{row.criterion}</p>
            <div className="flex flex-wrap gap-stack-2xs">
              {([1, 2, 3, 4, 5] as DreyfusLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={row.score === level}
                  onClick={() => handleScoreChange(idx, level)}
                  className={`px-3 py-1 rounded-pill text-caption font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    row.score === level
                      ? 'bg-primary-700 text-white'
                      : 'bg-ink-100 text-ink-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  D{level} · {DREYFUS_LABELS[level]}
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              placeholder="Commentaire (optionnel)"
              aria-label={`Commentaire : ${row.criterion}`}
              value={row.comment}
              onChange={(e) => handleCommentChange(idx, e.target.value)}
              className="w-full p-stack-sm rounded-lg border border-ink-400 font-body text-body placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-primary-500 h-auto min-h-[52px]"
            />
          </div>
        ))}
      </div>

      {/* Niveau validé — pré-rempli depuis la moyenne rubrique, l'expert décide
          (art. 22). La précision est en encre de marque au cran 800 (le 700
          mesure 4,48 sur primary-50). */}
      <div className="flex flex-col gap-stack-xs px-stack py-stack-sm bg-primary-50 rounded-lg">
        <div className="flex items-start gap-stack-xs">
          <Target size={16} className="text-primary-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-caption font-semibold text-primary-800">
            Niveau Dreyfus validé{' '}
            <span className="font-normal">· pré-rempli D{averageLevel} (moyenne rubrique), ajuste si besoin</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-stack-2xs">
          {([1, 2, 3, 4, 5] as DreyfusLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              aria-pressed={effectiveLevel === level}
              onClick={() => setLevelOverride(level)}
              className={`px-3 py-1 rounded-pill text-caption font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                effectiveLevel === level
                  ? 'bg-primary-700 text-white'
                  : 'bg-white text-ink-700 hover:bg-primary-100 hover:text-primary-800'
              }`}
            >
              D{level} · {DREYFUS_LABELS[level]}
            </button>
          ))}
        </div>
      </div>

      {/* Global feedback */}
      <FormGroup label="Feedback global">
        <textarea
          rows={3}
          placeholder="Synthèse de l'évaluation, axes d'amélioration..."
          value={globalFeedback}
          onChange={(e) => setGlobalFeedback(e.target.value)}
          className="w-full p-stack-sm rounded-lg border border-ink-400 font-body text-body placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-primary-500 h-auto min-h-[88px]"
        />
      </FormGroup>

      {/* Decision */}
      <div className="flex flex-col gap-stack-xs">
        <p className="text-caption font-semibold text-ink-600">Décision</p>
        <div className="flex gap-stack-xs flex-wrap">
          {(['approved', 'rework_submitted', 'rejected'] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={decision === d}
              onClick={() => setDecision(d)}
              className={`h-11 px-stack rounded-lg text-body font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                decision === d
                  ? d === 'approved'
                    ? 'bg-success-vivid text-white'
                    : d === 'rejected'
                    ? 'bg-danger-strong text-white'
                    : 'bg-info-base text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              {d === 'approved' ? 'Valider' : d === 'rework_submitted' ? 'À retravailler' : 'Refuser'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-stack-xs justify-end">
        <Button emphasis="outline" size="sm" onClick={onClose}>Annuler</Button>
        <Button emphasis="soft" size="sm" onClick={handleSubmit}>
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

  /* L'en-tête d'un JAC (dépliable) : un vrai bouton, qui dit son état. Une
     fonction de rendu, pas un composant défini ici : recréé à chaque rendu,
     il se remonterait et le focus clavier serait perdu au dépliage. */
  const renderRowHeader = (jac: typeof jacs[number], tint: 'brand' | 'warm', children: React.ReactNode) => (
    <button
      type="button"
      aria-expanded={expandedJacId === jac.id}
      onClick={() => toggleExpand(jac.id)}
      className="w-full flex items-center gap-stack px-stack-lg py-stack text-left cursor-pointer hover:bg-ink-50 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500"
    >
      <Avatar initials={jac.collaboratorInitials} size="md" tint={tint} />
      <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
        <p className="text-body font-semibold text-ink-900">{jac.collaboratorName}</p>
        <p className="text-caption text-ink-600">{children}</p>
      </div>
      <div className="flex items-center gap-stack-xs shrink-0">
        <Badge variant={JAC_STATUS_VARIANTS[jac.status]}>
          <span className="inline-flex items-center gap-stack-3xs">
            {JAC_STATUS_ICONS[jac.status]}
            {JAC_STATUS_LABELS[jac.status]}
          </span>
        </Badge>
        {expandedJacId === jac.id ? <ChevronUp size={16} className="text-ink-600" /> : <ChevronDown size={16} className="text-ink-600" />}
      </div>
    </button>
  );

  return (
    /* `PageShell` : le `Container` ajoutait sa propre gouttière à celle de la
       page (tout le contenu était décalé de 40 px). */
    <PageShell width="medium">
      {/* Le retour et l'en-tête forment un groupe : 24 entre eux. */}
      <div className="flex flex-col gap-stack-lg">
        <div>
          <Button emphasis="outline" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(`/project/${projectId}`)}>
            Retour au projet
          </Button>
        </div>

        <EditorialHero
          eyebrow={{ label: 'Projet · JAC' }}
          title="Jalons d'Application Critique"
          summary="Évaluations Dreyfus par compétence. Validez les JAC soumis par les collaborateurs."
          tone="flat"
          meta={[
            { icon: <Clock size={14} />, label: `${pendingJacs.length} en attente` },
            { icon: <CheckCircle2 size={14} />, label: `${doneJacs.length} traités` },
          ]}
        />
      </div>

      {/* Deux sections : leur titre (h2 28) sur la page, le compte en méta ;
          les JAC en rangées dépliables dans une carte (ils étaient des boîtes
          dans une carte). */}
      {pendingJacs.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="JAC en attente de validation" meta={`${pendingJacs.length} JAC à évaluer`} />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {pendingJacs.map((jac) => (
                <li key={jac.id}>
                  {renderRowHeader(jac, 'brand', <>{jac.competencyName} · soumis le {formatDate(jac.createdAt)}</>)}

                  {expandedJacId === jac.id && (
                    <div className="px-stack-lg pb-stack-lg pt-stack flex flex-col gap-stack border-t border-ink-100">
                      <div className="flex items-center gap-stack-xs text-caption text-ink-600">
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
                          emphasis="soft"
                          size="sm"
                          leadingIcon={<Target size={14} />}
                          onClick={() => setValidatingJacId(jac.id)}
                          className="self-start"
                        >
                          Évaluer ce JAC
                        </Button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {doneJacs.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="JAC traités" meta={`${doneJacs.length} JAC évalués`} />
          <Card className="p-0 overflow-hidden">
            <ul className="divide-y divide-ink-100">
              {doneJacs.map((jac) => (
                <li key={jac.id}>
                  {renderRowHeader(jac, jac.status === 'approved' ? 'brand' : 'warm', <>
                    {jac.competencyName}
                    {jac.dreyfusLevelAchieved && ` · D${jac.dreyfusLevelAchieved} : ${DREYFUS_LABELS[jac.dreyfusLevelAchieved]}`}
                    {jac.validatedAt && ` · validé le ${formatDate(jac.validatedAt)}`}
                  </>)}

                  {expandedJacId === jac.id && (
                    <div className="px-stack-lg pb-stack-lg pt-stack flex flex-col gap-stack border-t border-ink-100">
                      {jac.rubricScores && jac.rubricScores.length > 0 && (
                        <div className="flex flex-col gap-stack-xs">
                          {/* Intitulé en légende 13/600, casse normale (il était
                              en capitales ink-500). Le score est une donnée :
                              MetaPill. */}
                          <p className="text-caption font-semibold text-ink-600">Grille Dreyfus</p>
                          {jac.rubricScores.map((rs, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-stack px-stack py-stack-sm bg-ink-50 rounded-lg">
                              <span className="text-body text-ink-900 flex-1">{rs.criterion}</span>
                              <div className="flex flex-col items-end gap-stack-3xs shrink-0">
                                <MetaPill text={`D${rs.score} · ${DREYFUS_LABELS[rs.score]}`} tone="primary" />
                                {rs.comment && <span className="text-caption text-ink-600 text-right">{rs.comment}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {jac.expertFeedback && (
                        <div className="flex flex-col gap-stack-3xs px-stack py-stack-sm bg-success-bg rounded-lg">
                          <p className="text-caption font-semibold text-success-fg">Feedback expert</p>
                          <p className="font-body text-body text-ink-700 italic max-w-prose">"{jac.expertFeedback}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {jacs.length === 0 && (
        <EmptyState
          icon={<Target size={32} />}
          title="Aucun JAC soumis pour ce projet."
        />
      )}
    </PageShell>
  );
};

export default ProjectJac;
