import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';

// ─── Mock data ──────────────────────────────────────────────────────────────

const EMOJIS = ['😞', '😐', '🙂', '😄', '😍'];
const EMOJI_LABELS = ['Décevant', 'Moyen', 'Bien', 'Super', 'Excellent'];

// ─── MasterclassSurvey ───────────────────────────────────────────────────────

export default function MasterclassSurvey() {
  useParams<{ id: string }>();
  const [rating, setRating] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <div className="w-full max-w-md flex flex-col gap-section">
        {/* Header */}
        <div className="text-center flex flex-col gap-tight">
          <div className="flex justify-center">
            <Badge variant="info" size="md">Leadership en temps de crise</Badge>
          </div>
          <h1 className="text-h2 font-display font-bold text-ink-900">
            Comment s'est passée la session ?
          </h1>
          <p className="text-body-sm text-ink-500">
            Ton avis nous aide à améliorer les prochaines masterclasses.
          </p>
        </div>

        {/* Rating question */}
        <Card variant="default" className="p-6 flex flex-col gap-stack">
          <p className="text-body-sm font-semibold text-ink-800">Ta satisfaction globale</p>
          <div className="flex justify-between gap-2">
            {EMOJIS.map((emoji, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                className={[
                  'text-3xl p-3 rounded-xl transition-all duration-fast flex-1 flex items-center justify-center',
                  rating === i
                    ? 'bg-primary-100 scale-110 ring-2 ring-primary-400'
                    : 'hover:bg-ink-50',
                ].join(' ')}
                aria-label={EMOJI_LABELS[i]}
                aria-pressed={rating === i}
              >
                {emoji}
              </button>
            ))}
          </div>
          {/* Labels sous les emojis */}
          <div className="flex justify-between gap-2">
            {EMOJI_LABELS.map((label) => (
              <span key={label} className="text-micro text-ink-400 text-center flex-1 leading-tight">
                {label}
              </span>
            ))}
          </div>
        </Card>

        {/* Feedback texte */}
        <Card variant="default" className="p-6 flex flex-col gap-stack">
          <p className="text-body-sm font-semibold text-ink-800">Un commentaire ? (optionnel)</p>
          <textarea
            className="w-full min-h-[100px] h-auto p-3 border border-ink-200 rounded-xl text-body-sm resize-none focus:outline-none focus:border-primary-400"
            placeholder="Ce que tu as aimé, ce qui pourrait être amélioré..."
          />
        </Card>

        {/* CTA */}
        <div className="flex flex-col gap-tight">
          <Button variant="primary" size="lg" fullWidth>
            Envoyer mon avis
          </Button>
          <button
            type="button"
            className="text-caption text-ink-400 underline underline-offset-2 hover:text-ink-600 w-full text-center mt-tight"
          >
            Passer
          </button>
        </div>
      </div>
    </div>
  );
}
