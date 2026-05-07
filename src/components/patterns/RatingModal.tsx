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
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const RatingModal: React.FC<RatingModalProps> = ({
  title = 'Rate your experience',
  description = 'Help us improve by sharing your feedback',
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

  return (
    <div
      className={[
        'flex flex-col gap-5 bg-white border border-ink-200 rounded-2xl p-8 max-w-[480px] mx-auto',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="text-center">
        {title && (
          <h2 className="m-0 mb-2 font-display text-h3 font-bold text-ink-900">{title}</h2>
        )}
        {description && (
          <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{description}</p>
        )}
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverRating || rating);
          return (
            <button
              key={star}
              className={[
                'inline-flex items-center justify-center w-12 h-12 rounded-md border-0 bg-transparent cursor-pointer transition-transform hover:scale-110',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
                isActive ? 'text-accent-400' : 'text-ink-200',
              ].join(' ')}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${star} out of 5`}
              disabled={isSubmitting}
            >
              <Star
                size={32}
                fill={isActive ? 'currentColor' : 'none'}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {rating > 0 && (
        <p className="m-0 text-center text-body-sm font-semibold text-accent-700">
          {RATING_LABELS[rating]}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="rating-feedback" className="text-body-sm font-medium text-ink-900">
          Additional feedback (optional)
        </label>
        <textarea
          id="rating-feedback"
          className="w-full px-3 py-2.5 h-auto min-h-[120px] rounded-md border border-ink-300 bg-white text-body-sm text-ink-900 placeholder:text-ink-500 focus:border-primary-400 focus:outline-none focus:shadow-brand-sm transition-all disabled:bg-ink-50 disabled:cursor-not-allowed"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isSubmitting}
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
    </div>
  );
};

export default RatingModal;
