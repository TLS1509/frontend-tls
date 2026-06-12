import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { useEventsStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';

const RATING_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Décevant',
  2: 'Moyen',
  3: 'Bien',
  4: 'Super',
  5: 'Excellent',
};

export default function MasterclassSurvey() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventsStore = useEventsStore();

  const contentId = id ?? 'mc-002';
  const existing = eventsStore.getSurvey(MOCK_USER_ID, 'masterclass', contentId);

  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(
    (existing?.rating as 1 | 2 | 3 | 4 | 5) ?? null
  );
  const [feedback, setFeedback] = useState(existing?.feedback ?? '');
  const [submitted, setSubmitted] = useState(!!existing);

  const masterclass = eventsStore.masterclasses.find((m) => m.id === contentId);

  const handleSubmit = () => {
    if (!rating) return;
    eventsStore.submitSurvey({
      userId: MOCK_USER_ID,
      contentType: 'masterclass',
      contentId,
      rating,
      feedback: feedback.trim() || undefined,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-primary-50 px-stack">
        <div className="w-full max-w-md flex flex-col items-center gap-section text-center">
          <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center">
            <CheckCircle size={32} className="text-success-fg" />
          </div>
          <h1 className="text-h2 font-display font-bold text-ink-900">Merci pour ton retour !</h1>
          <p className="text-body-sm text-ink-500">
            Ton avis nous aide à améliorer nos masterclasses. À très bientôt !
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/masterclass')}>
            Voir les prochaines masterclasses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-primary-50 px-stack">
      <div className="w-full max-w-md flex flex-col gap-section">
        {/* Header */}
        <div className="text-center flex flex-col gap-tight">
          {masterclass && (
            <div className="flex justify-center">
              <Badge variant="info" size="md">{masterclass.title}</Badge>
            </div>
          )}
          <h1 className="text-h2 font-display font-bold text-ink-900">
            Comment s'est passée la session ?
          </h1>
          <p className="text-body-sm text-ink-500">
            Ton avis nous aide à améliorer les prochaines masterclasses.
          </p>
        </div>

        {/* Rating : 1–5 scale per spec (chat_surveys.rating 1-5) */}
        <Card variant="default" className="p-stack-lg flex flex-col gap-stack">
          <p className="text-body-sm font-semibold text-ink-800">Ta satisfaction globale</p>
          <div className="flex justify-between gap-stack-xs">
            {([1, 2, 3, 4, 5] as const).map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setRating(score)}
                className={[
                  'flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all duration-fast',
                  rating === score
                    ? 'border-primary-400 bg-primary-50 text-primary-700'
                    : 'border-ink-200 bg-white text-ink-600 hover:border-primary-300 hover:bg-primary-50',
                ].join(' ')}
                aria-label={RATING_LABELS[score]}
                aria-pressed={rating === score}
              >
                <span className="text-h3 font-bold">{score}</span>
                <span className="text-micro text-center leading-tight">{RATING_LABELS[score]}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Feedback */}
        <Card variant="default" className="p-stack-lg flex flex-col gap-stack">
          <p className="text-body-sm font-semibold text-ink-800">Un commentaire ? (optionnel)</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full min-h-[100px] h-auto p-3 border border-ink-200 rounded-xl text-body-sm resize-none focus:outline-none focus:border-primary-400"
            placeholder="Ce que tu as aimé, ce qui pourrait être amélioré..."
          />
        </Card>

        {/* CTA */}
        <div className="flex flex-col gap-tight">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!rating}
            onClick={handleSubmit}
          >
            Envoyer mon avis
          </Button>
          <button
            type="button"
            onClick={() => navigate('/masterclass')}
            className="text-caption text-ink-400 underline underline-offset-2 hover:text-ink-600 w-full text-center mt-tight"
          >
            Passer
          </button>
        </div>
      </div>
    </div>
  );
}
