/**
 * RatingModal — Feedback Pattern
 *
 * Star rating component with text feedback textarea.
 * Collects user satisfaction ratings and comments.
 *
 * Usage:
 *   <RatingModal
 *     title="How was your experience?"
 *     onSubmit={(rating, feedback) => console.log(rating, feedback)}
 *     onCancel={() => setOpen(false)}
 *   />
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../core/Button';
import './RatingModal.css';

export interface RatingModalProps {
  title?: string;
  description?: string;
  onSubmit: (rating: number, feedback: string) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

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
    <div className={`rating-modal ${className}`}>
      {/* Header */}
      {title && <h2 className="rating-modal__title">{title}</h2>}
      {description && <p className="rating-modal__description">{description}</p>}

      {/* Stars */}
      <div className="rating-modal__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`rating-modal__star${
              star <= (hoverRating || rating) ? ' rating-modal__star--active' : ''
            }${star === (hoverRating || rating) ? ' rating-modal__star--current' : ''}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${star} out of 5`}
            disabled={isSubmitting}
          >
            <Star size={32} aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Rating text */}
      {rating > 0 && (
        <p className="rating-modal__rating-text">
          {rating === 1 && 'Poor'}
          {rating === 2 && 'Fair'}
          {rating === 3 && 'Good'}
          {rating === 4 && 'Very Good'}
          {rating === 5 && 'Excellent'}
        </p>
      )}

      {/* Feedback textarea */}
      <div className="rating-modal__feedback">
        <label htmlFor="rating-feedback" className="rating-modal__label">
          Additional feedback (optional)
        </label>
        <textarea
          id="rating-feedback"
          className="rating-modal__textarea"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isSubmitting}
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="rating-modal__actions">
        {onCancel && (
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
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
