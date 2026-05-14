import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Send, FileText, RotateCcw } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Alert } from '../components/ui/Alert';

const MOCK_CORRECTION = {
  exerciceTitle: 'Mission — Plan stratégique 2026',
  competence: 'Stratégie produit',
  submittedAt: '10 mai 2026',
  status: 'corrected' as const,
  coachName: 'Marie Dubois',
  coachInitials: 'MD',
  dreyfusLevel: 3,
  globalFeedback: 'Excellente structure d\'ensemble. Les axes prioritaires sont clairs et alignés sur la vision long terme. À retravailler : la quantification des KPIs et le séquencement des chantiers.',
  sectionComments: [
    { section: 'Introduction & contexte', feedback: 'Très bon cadrage. Tu as bien situé les enjeux concurrentiels.', tone: 'success' as const },
    { section: 'Axes stratégiques', feedback: 'Les 3 axes sont pertinents. Cependant l\'axe #2 mériterait d\'être plus différenciant — actuellement il ressemble à ce que tout concurrent ferait.', tone: 'warning' as const },
    { section: 'KPIs & métriques', feedback: 'À reprendre : seul l\'OKR Q1 est mesurable. Les autres KPIs sont qualitatifs. Donne des objectifs chiffrés.', tone: 'danger' as const },
    { section: 'Roadmap & jalons', feedback: 'Bonne séquence générale. Pense à inclure des jalons de validation intermédiaires.', tone: 'success' as const },
  ],
};

const CorrectionDetailLearner: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coaching · Ma correction"
        title={MOCK_CORRECTION.exerciceTitle}
        description={`Correction reçue le ${MOCK_CORRECTION.submittedAt} par ${MOCK_CORRECTION.coachName}`}
        tone="default"
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Badge variant="success">Validée Dreyfus {MOCK_CORRECTION.dreyfusLevel}</Badge>
          <Badge variant="info">{MOCK_CORRECTION.competence}</Badge>
        </div>

        <Card className="p-6 flex items-start gap-4">
          <Avatar initials={MOCK_CORRECTION.coachInitials} size="md" />
          <div className="flex-1">
            <div className="text-caption text-ink-500 mb-1">{MOCK_CORRECTION.coachName} — Feedback global</div>
            <p className="text-body text-ink-700 leading-relaxed">{MOCK_CORRECTION.globalFeedback}</p>
          </div>
        </Card>

        <SectionCard
          title="Commentaires détaillés par section"
          description="Feedback ciblé sur chaque partie de ta soumission"
        >
          <div className="flex flex-col gap-stack">
            {MOCK_CORRECTION.sectionComments.map((c, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg border border-ink-200">
                <FileText className="w-5 h-5 text-primary-600 mt-1 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-body-sm mb-1">{c.section}</div>
                  <p className="text-body-sm text-ink-700">{c.feedback}</p>
                  <div className="mt-2">
                    <Badge variant={c.tone === 'success' ? 'success' : c.tone === 'danger' ? 'danger' : 'warm'}>
                      {c.tone === 'success' ? 'OK' : c.tone === 'danger' ? 'À reprendre' : 'À améliorer'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <Alert variant="info" title="Tu peux resoumettre">
          Si tu souhaites améliorer les points "À reprendre", tu peux soumettre une nouvelle version. Le coach sera notifié automatiquement.
        </Alert>

        <div className="flex flex-wrap gap-stack-xs">
          <Button variant="primary" leadingIcon={<RotateCcw className="w-4 h-4" />}>
            Resoumettre une nouvelle version
          </Button>
          <Button variant="secondary" leadingIcon={<Send className="w-4 h-4" />}>
            Répondre au coach
          </Button>
          <Button variant="ghost" leadingIcon={<CheckCircle2 className="w-4 h-4" />}>
            Marquer comme lue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CorrectionDetailLearner;
