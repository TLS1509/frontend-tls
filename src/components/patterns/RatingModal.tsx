import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../core/Button';

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
  2: 'text-secondary-700 bg-secondary-50 border-secondary-200',
  3: 'text-accent-700 bg-accent-50 border-accent-200',
  4: 'text-primary-700 bg-primary-50 border-primary-200',
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
        'flex flex-col gap-6 bg-white border border-ink-200 rounded-3xl p-8 max-w-[520px] mx-auto shadow-xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="text-center">
        {title && (
          <h2 className="m-0 mb-2 font-display text-h2 font-bold text-ink-900 leading-tight">
            {title}
          </h2>
        )}
        {description && (
          <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = star <= displayRating;
            return (
              <button
                key={star}
                className={[
                  'inline-flex items-center justify-center w-14 h-14 rounded-2xl border-0 bg-transparent cursor-pointer transition-all duration-200',
                  'hover:scale-115 active:scale-95',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md',
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
                'inline-flex items-center px-4 py-1 rounded-pill text-caption font-bold border transition-colors',
                RATING_COLORS[displayRating],
              ].join(' ')}
            >
              {RATING_LABELS[displayRating]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rating-feedback" className="text-body-sm font-semibold text-ink-900">
          Commentaire <span className="text-ink-400 font-normal">(optionnel)</span>
        </label>
        <textarea
          id="rating-feedback"
          className="w-full px-4 py-3 h-auto min-h-[100px] rounded-xl border border-ink-300 bg-white text-body-sm text-ink-900 leading-relaxed placeholder:text-ink-400 focus:border-primary-400 focus:outline-none focus:shadow-brand-sm transition-all resize-y disabled:bg-ink-50 disabled:cursor-not-allowed"
          placeholder="Partagez vos impressions, suggestions ou retours…"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isSubmitting}
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3 pt-1">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
        )}
        <Button
          variant="primary"
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
