/**
 * Flashcard — Learning Pattern
 *
 * Flip card component for spaced repetition learning.
 * Shows front content, flips to back on interaction.
 *
 * Usage:
 *   <Flashcard
 *     front="What is the capital of France?"
 *     back="Paris"
 *     onFlip={(isFlipped) => console.log(isFlipped)}
 *   />
 */

import React, { useState } from 'react';
import './Flashcard.css';

export interface FlashcardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  onFlip?: (isFlipped: boolean) => void;
  className?: string;
  autoFlipDelay?: number; // ms, 0 = manual only
}

export const Flashcard: React.FC<FlashcardProps> = ({
  front,
  back,
  onFlip,
  className = '',
  autoFlipDelay = 0,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className={`flashcard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-xl ${className}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard: ${isFlipped ? 'Back side' : 'Front side'}`}
    >
      <div className={`flashcard__card${isFlipped ? ' flashcard__card--flipped' : ''}`}>
        {/* Front side */}
        <div className="flashcard__side flashcard__side--front">
          <div className="flashcard__content">{front}</div>
          <div className="flashcard__hint">Click to reveal answer</div>
        </div>

        {/* Back side */}
        <div className="flashcard__side flashcard__side--back">
          <div className="flashcard__content">{back}</div>
          <div className="flashcard__hint">Click to flip back</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
