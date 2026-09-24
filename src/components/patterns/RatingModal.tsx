import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../core/Button';
import { Input } from '../core/Input';

export interface RatingModalProps {
  title?: string;
  description?: string;
  onSubmit: (rating: number, feedback: string) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Pas satisfait',
  2: 'Peu satisfait',
  3: 'Satisfait',
  4: 'Très satisfait',
  5: 'Excellent',
};

const RATING_COLORS: Record<number, string> = {
  1: 'text-danger-fg bg-danger-bg border-danger-base/30',
  2: 'text-secondary-800 bg-secondary-50 border-secondary-200',
  3: 'text-accent-800 bg-accent-50 border-accent-200',
  4: 'text-primary-800 bg-primary-50 border-primary-200',
  5: 'text-success-fg bg-success-bg border-success-base/30',
};

export const RatingModal: React.FC<RatingModalProps> = ({
  title = 'Évaluez votre expérience',
  description = 'Aidez-nous à nous améliorer en partageant votre retour',
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = '',
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit(rating, feedback);
  };

  const displayRating = hoverRating || rating;

  return (
    <div
      className={[
        'flex flex-col gap-stack-lg bg-white border border-ink-200 rounded-2xl p-section max-w-[520px] mx-auto shadow-xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Titre → texte 8 ; la description passe de ink-500 (réservé aux
          textes indicatifs) à ink-700, le texte secondaire qu'on lit.
          Le titre prend celui de `Modal` (2026-09-24) : un h2 au pas du titre
          de bloc, 20/26/700. Il était au pas de la section (28/36) — un
          dialogue est un bloc posé sur la page, pas une section de page. */}
      <div className="flex flex-col gap-stack-xs text-center">
        {title && (
          <h2 className="font-display text-h3 text-ink-900 text-balance">
            {title}
          </h2>
        )}
        {description && (
          <p className="m-0 text-body text-ink-700">{description}</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-stack-xs">
        <div className="flex justify-center gap-stack-2xs">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = star <= displayRating;
            return (
              <button
                key={star}
                className={[
                  'inline-flex items-center justify-center w-14 h-14 rounded-2xl border-0 bg-transparent cursor-pointer transition-all duration-200',
                  'hover:scale-115 active:scale-95',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  isActive ? 'text-accent-400' : 'text-ink-200 hover:text-accent-300',
                ].join(' ')}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`Noter ${star} sur 5`}
                disabled={isSubmitting}
              >
                <Star
                  size={40}
                  fill={isActive ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                  className={isActive ? 'drop-shadow-sm' : ''}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        <div className="h-7">
          {displayRating > 0 && (
            <span
              className={[
                /* Le sens de la note est une donnée : le registre de MetaPill
                   (13/500), plus 700. */
                'inline-flex items-center px-4 py-1 rounded-pill text-caption font-medium border transition-colors',
                RATING_COLORS[displayRating],
              ].join(' ')}
            >
              {RATING_LABELS[displayRating]}
            </span>
          )}
        </div>
      </div>

      {/* Le champ du système (2026-09-24) : `Input multiline`. La zone de
          texte était faite main, au filet ink-300 — 1,47:1 sur le blanc de la
          modale, sous le 3:1 d'un contrôle (SC 1.4.11) ; on ne voyait pas où
          écrire. Elle prend le filet de la famille champ (ink-400, 3,01:1,
          arbitrage n°7), son rayon, son padding et son focus (primary-500 et
          halo, à la place d'une ombre teintée et d'un filet primary-400 à
          2,37:1). Le libellé et son « (optionnel) » ne changent pas. */}
      <Input
        multiline
        rows={4}
        id="rating-feedback"
        label={<>Commentaire <span className="text-ink-600 font-normal">(optionnel)</span></>}
        placeholder="Partagez vos impressions, suggestions ou retours…"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        disabled={isSubmitting}
      />

      {/* Un formulaire (arbitrage n°19) : « Envoyer mon avis » est le
          `solid`, Annuler un `outline` neutre (ils étaient en `soft` warm et
          `soft` brand). */}
      <div className="flex justify-end gap-stack-xs pt-1">
        {onCancel && (
          <Button emphasis="outline" tone="neutral" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
        )}
        <Button
          emphasis="solid"
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? 'Envoi…' : 'Envoyer mon avis'}
        </Button>
      </div>
    </div>
  );
};

export default RatingModal;
