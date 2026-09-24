import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
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
    /* Confirmation courte : centrée (deux lignes au plus, doctrine § 3), dans
       la page — plus sur un fond `primary-50` qui s'arrêtait à la colonne.
       Le h1 prend le pas du titre de page (36) ; il était à 28. */
    return (
      <PageShell width="content" noPadTop className="pt-6 md:pt-8 lg:pt-10">
        <div className="flex flex-col items-center gap-stack-lg text-center py-section">
          <div className="w-16 h-16 rounded-pill bg-success-bg flex items-center justify-center">
            <CheckCircle size={32} className="text-success-fg" />
          </div>
          <div className="flex flex-col gap-stack-sm">
            <h1 className="font-display text-h1 text-ink-900 text-balance">Merci pour ton retour.</h1>
            <p className="text-body-lg text-ink-700">
              Ton avis nous aide à améliorer nos masterclasses. À bientôt.
            </p>
          </div>
          <Button emphasis="soft" size="lg" onClick={() => navigate('/masterclass')}>
            Voir les prochaines masterclasses
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    /* L'ouverture de toutes les pages : surtitre (la masterclass, une donnée —
       elle était une pastille d'état), h1 36, chapô 18. Un seul bord gauche :
       le titre et le chapô étaient centrés au-dessus de cartes calées à
       gauche, sur un fond `primary-50` arrêté à 1 400 px. */
    <PageShell width="content" noPadTop gap="section" className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow={masterclass ? `Masterclass · ${masterclass.title}` : 'Masterclass'}
        title="Comment s'est passée la session ?"
        summary="Ton avis nous aide à améliorer les prochaines masterclasses."
      />

      <div className="flex flex-col gap-stack">
        {/* Rating : 1–5 scale per spec (chat_surveys.rating 1-5). Libellé 16/600
            ink-900 à 12 px de l'échelle (ils se touchaient) ; sous chaque note,
            une légende de 13 px — elle était à 11, le pas des étiquettes. */}
        <Card variant="default" className="p-stack-lg flex flex-col gap-stack-sm">
          <p className="text-body font-semibold text-ink-900" id="note-globale">Ta satisfaction globale</p>
          <div className="flex justify-between gap-stack-xs" role="group" aria-labelledby="note-globale">
            {([1, 2, 3, 4, 5] as const).map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setRating(score)}
                className={[
                  'flex-1 min-w-0 flex flex-col items-center gap-tight py-3 rounded-lg border-2 transition-all duration-fast',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  rating === score
                    ? 'border-primary-700 bg-primary-50 text-primary-800'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-primary-300 hover:bg-primary-50',
                ].join(' ')}
                aria-label={RATING_LABELS[score]}
                aria-pressed={rating === score}
              >
                <span className="font-display text-h3 tabular-nums">{score}</span>
                <span className="text-caption text-center">{RATING_LABELS[score]}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card variant="default" className="p-stack-lg flex flex-col gap-stack-xs">
          <label htmlFor="commentaire" className="text-body font-semibold text-ink-900">Un commentaire ? (optionnel)</label>
          <textarea
            id="commentaire"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full min-h-[100px] h-auto p-3 border border-ink-400 rounded-lg text-body text-ink-900 placeholder:text-ink-500 resize-none focus:outline-none focus:border-primary-700"
            placeholder="Ce que tu as aimé, ce qui pourrait être amélioré…"
          />
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-stack">
        <Button
          emphasis="soft"
          size="lg"
          disabled={!rating}
          onClick={handleSubmit}
        >
          Envoyer mon avis
        </Button>
        <button
          type="button"
          onClick={() => navigate('/masterclass')}
          className="text-body text-ink-700 underline underline-offset-2 hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
        >
          Passer
        </button>
      </div>
    </PageShell>
  );
}
