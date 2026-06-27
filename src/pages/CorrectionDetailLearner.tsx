import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, RotateCcw, Clock, RefreshCw } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Alert } from '../components/ui/Alert';
import { useCoachingStore } from '../stores/persistence';
import { getCompetenceById } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CorrectionStatus } from '../types/learning';

const STATUS_LABELS: Record<CorrectionStatus, string> = {
  pending: 'En attente de correction',
  'in-review': 'En cours de révision',
  'coach-feedback': 'Correction reçue',
  'learner-response': 'Réponse envoyée',
  completed: 'Terminé',
};

const STATUS_VARIANTS: Record<CorrectionStatus, 'neutral' | 'info' | 'sun' | 'success'> = {
  pending: 'neutral',
  'in-review': 'info',
  'coach-feedback': 'info',
  'learner-response': 'sun',
  completed: 'success',
};

const MOCK_COACH_INITIALS = 'MD';
const MOCK_COACH_NAME = 'Marie Dubois';

const CorrectionDetailLearner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useCoachingStore();

  const corrections = store.getCorrections(MOCK_USER_ID);
  const correction = corrections.find((c) => c.id === id) ?? corrections[0];

  if (!correction) {
    return (
      <PageShell>
        <EditorialHero title="Correction introuvable" summary="Cette correction n'existe pas." tone="flat" />
        <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/coaching')}>
          Retour au coaching
        </Button>
      </PageShell>
    );
  }

  const competence = correction.competenceId ? getCompetenceById(correction.competenceId) : null;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  const hasFeedback = !!correction.coachFeedback;
  const canResubmit = correction.status === 'coach-feedback' || correction.status === 'learner-response';

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow={{ label: 'Coaching · Ma correction' }}
        title={correction.exerciseTitle}
        summary={`Soumis le ${formatDate(correction.submittedAt)} · Iteration ${correction.iterationCount + 1}`}
        tone="flat"
        trailing={
          <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/coaching')}>
            Retour
          </Button>
        }
      />

      <PageShell noPadTop>

        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Badge variant={STATUS_VARIANTS[correction.status]}>
            <span className="inline-flex items-center gap-tight">
              {correction.status === 'pending' && <Clock size={12} />}
              {correction.status === 'coach-feedback' && <CheckCircle2 size={12} />}
              {correction.status === 'learner-response' && <RefreshCw size={12} />}
              {correction.status === 'completed' && <CheckCircle2 size={12} />}
              {STATUS_LABELS[correction.status]}
            </span>
          </Badge>
          {competence && <Badge variant="brand">{competence.label}</Badge>}
          {correction.xpAwarded && <Badge variant="success">+{correction.xpAwarded} XP</Badge>}
          <span className="text-caption text-ink-400">Itération {correction.iterationCount + 1}</span>
        </div>

        {/* Learner submission */}
        <SectionCard title="Ta soumission" titleIcon={<Send size={18} />}>
          <p className="text-body text-ink-700 leading-relaxed m-0">{correction.submittedContent}</p>
        </SectionCard>

        {/* Coach feedback */}
        {hasFeedback ? (
          <Card className="p-stack-lg flex items-start gap-stack">
            <Avatar initials={MOCK_COACH_INITIALS} size="md" tint="brand" />
            <div className="flex-1">
              <div className="text-caption text-ink-500 mb-1">{MOCK_COACH_NAME} : Feedback</div>
              <p className="text-body text-ink-700 leading-relaxed m-0">{correction.coachFeedback}</p>
            </div>
          </Card>
        ) : (
          <Alert variant="info" title="En attente de feedback">
            Ton coach n'a pas encore corrigé cet exercice. Tu seras notifié dès que le feedback sera disponible.
          </Alert>
        )}

        {/* Learner response */}
        {correction.learnerResponse && (
          <SectionCard title="Ta réponse au coach">
            <p className="text-body text-ink-700 leading-relaxed m-0">{correction.learnerResponse}</p>
          </SectionCard>
        )}

        {/* Resubmit prompt */}
        {canResubmit && hasFeedback && (
          <Alert variant="info" title="Tu peux resoumettre">
            Si tu souhaites améliorer ton travail suite au feedback, tu peux soumettre une nouvelle version. Le coach sera notifié automatiquement.
          </Alert>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-stack-xs">
          {canResubmit && (
            <Button
              variant="primary"
              size="lg"
              leadingIcon={<RotateCcw size={16} />}
              aria-label="Resoumettre une nouvelle version de l'exercice"
            >
              Resoumettre une nouvelle version
            </Button>
          )}
          {hasFeedback && (
            <Button
              variant="secondary"
              size="lg"
              leadingIcon={<Send size={16} />}
              aria-label="Répondre au feedback du coach"
            >
              Répondre au coach
            </Button>
          )}
          {correction.status !== 'completed' && (
            <Button
              variant="ghost"
              leadingIcon={<CheckCircle2 size={16} />}
              onClick={() => store.updateCorrection(MOCK_USER_ID, correction.id, { status: 'completed' })}
            >
              Marquer comme lue
            </Button>
          )}
        </div>

      </PageShell>
    </div>
  );
};

export default CorrectionDetailLearner;
