import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, RotateCcw, Clock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { SectionHeader } from '../components/patterns/SectionHeader';
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

const MOCK_COACH_INITIALS = 'SM';
const MOCK_COACH_NAME = 'Sophie Marchand';

const CorrectionDetailLearner: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useCoachingStore();

  const corrections = store.getCorrections(MOCK_USER_ID);
  const correction = corrections.find((c) => c.id === id) ?? corrections[0];

  if (!correction) {
    return (
      <PageShell noPadTop className="pt-6 md:pt-8 lg:pt-10">
        <EditorialHero
          title="Correction introuvable"
          summary="Cette correction n'existe pas."
          tone="flat"
          /* Seule sortie de l'écran, donc son action principale : `solid`
             (arbitrage n°19). */
          trailing={
            <Button emphasis="solid" tone="brand" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/coaching/corrections')}>
              Retour aux corrections
            </Button>
          }
        />
      </PageShell>
    );
  }

  const competence = correction.competenceId ? getCompetenceById(correction.competenceId) : null;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  const hasFeedback = !!correction.coachFeedback;
  const canResubmit = correction.status === 'coach-feedback' || correction.status === 'learner-response';

  return (
    /* PageShell enveloppe la page : l'en-tête vivait au-dessus (surtitre collé
       au bord) et un fond `bg-surface` blanc s'arrêtait à 900 px. L'état, la
       date, l'itération et la compétence forment la ligne de méta de l'en-tête
       — l'itération était dite deux fois, la barre d'état collait au bouton
       Retour, et la compétence (une donnée) était une pastille d'état. */
    <PageShell noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coaching · Ma correction"
        title={correction.exerciseTitle}
        meta={[
          { label: <Badge variant={STATUS_VARIANTS[correction.status]}>{STATUS_LABELS[correction.status]}</Badge> },
          { icon: <Clock size={14} aria-hidden="true" />, label: `Soumis le ${formatDate(correction.submittedAt)}` },
          { label: `Itération ${correction.iterationCount + 1}` },
          ...(competence ? [{ label: competence.label }] : []),
          ...(correction.xpAwarded ? [{ label: `+${correction.xpAwarded} XP` }] : []),
        ]}
        tone="flat"
        trailing={
          <Button emphasis="ghost" tone="neutral" size="md" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate('/coaching/corrections')}>
            Retour aux corrections
          </Button>
        }
      />

      {/* Ta soumission → le retour du coach → ta réponse : trois sections h2
          (elles étaient des h3 de 20 px dans des cartes), le texte à la
          largeur de lecture, en ink-900 — c'est ce qu'on lit. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Ta soumission" size="md" />
        <Card>
          <p className="text-body text-ink-900 max-w-prose">{correction.submittedContent}</p>
        </Card>
      </section>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Retour de ton coach" size="md" />
        {hasFeedback ? (
          /* L'auteur en 16/600 avec son avatar, puis le retour à 8 px — il
             était annoncé par une légende ink-500 « Sophie Marchand : Feedback ». */
          <Card className="flex flex-col gap-stack-xs">
            <p className="flex items-center gap-stack-xs text-body font-semibold text-ink-900">
              <Avatar initials={MOCK_COACH_INITIALS} size="sm" tint="brand" />
              {MOCK_COACH_NAME}
            </p>
            <p className="text-body text-ink-900 max-w-prose">{correction.coachFeedback}</p>
          </Card>
        ) : (
          <Alert variant="info" title="En attente de feedback">
            Ton coach n'a pas encore corrigé cet exercice. Tu seras notifié dès que le feedback sera disponible.
          </Alert>
        )}
      </section>

      {correction.learnerResponse && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Ta réponse au coach" size="md" />
          <Card>
            <p className="text-body text-ink-900 max-w-prose">{correction.learnerResponse}</p>
          </Card>
        </section>
      )}

      {/* La suite : l'invitation à resoumettre et les actions forment un
          groupe (16 px), pas deux blocs à 48. */}
      <div className="flex flex-col gap-stack">
        {canResubmit && hasFeedback && (
          <Alert variant="info" title="Tu peux resoumettre">
            Si tu souhaites améliorer ton travail suite au feedback, tu peux soumettre une nouvelle version. Le coach sera notifié automatiquement.
          </Alert>
        )}

        {/* Une action principale selon l'état (arbitrage n°19) : resoumettre
            quand le retour appelle une version, sinon répondre au coach. La
            seconde est en `soft`, « Marquer comme lue » en `ghost`. Les trois
            boutons avaient le même poids en trois tons. */}
        <div className="flex flex-wrap gap-stack-xs">
          {canResubmit && (
            <Button
              emphasis="solid"
              tone="brand"
              size="lg"
              leadingIcon={<RotateCcw size={16} />}
              aria-label="Resoumettre une nouvelle version de l'exercice"
            >
              Resoumettre une nouvelle version
            </Button>
          )}
          {hasFeedback && (
            <Button
              emphasis={canResubmit ? 'soft' : 'solid'}
              tone="brand"
              size="lg"
              leadingIcon={<Send size={16} />}
              aria-label="Répondre au feedback du coach"
            >
              Répondre au coach
            </Button>
          )}
          {correction.status !== 'completed' && (
            <Button
              emphasis="ghost"
              tone="brand"
              size="lg"
              leadingIcon={<CheckCircle2 size={16} />}
              onClick={() => store.updateCorrection(MOCK_USER_ID, correction.id, { status: 'completed' })}
            >
              Marquer comme lue
            </Button>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default CorrectionDetailLearner;
