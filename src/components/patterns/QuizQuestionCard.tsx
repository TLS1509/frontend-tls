/**
 * QuizQuestionCard — Assessment Pattern
 *
 * Individual quiz question with multiple choice options.
 * Shows selection state, correct/incorrect feedback.
 *
 * Usage:
 *   <QuizQuestionCard
 *     question="What is the capital of France?"
 *     options={[
 *       { id: '1', label: 'London' },
 *       { id: '2', label: 'Paris', isCorrect: true }
 *     ]}
 *     selectedId="2"
 *     answered={true}
 *     showCorrectAnswer={true}
 *     onSelectOption={(id) => setSelected(id)}
 *   />
 */

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import './QuizQuestionCard.css';

export interface QuizOption {
  id: string;
  label: string;
  isCorrect?: boolean;
}

export interface QuizQuestionCardProps {
  question: string;
  options: QuizOption[];
  selectedId?: string;
  answered?: boolean;
  showCorrectAnswer?: boolean;
  onSelectOption: (id: string) => void;
  disabled?: boolean;
  className?: string;
}

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  options,
  selectedId,
  answered = false,
  showCorrectAnswer = false,
  onSelectOption,
  disabled = false,
  className = '',
}) => {
  const isCorrectAnswer = selectedId && options.find((opt) => opt.id === selectedId)?.isCorrect;

  return (
    <div className={`quiz-question-card ${className}`}>
      {/* Question */}
      <h2 className="quiz-question-card__question">{question}</h2>

      {/* Options */}
      <div className="quiz-question-card__options">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;
          const showCorrect = answered && showCorrectAnswer && isCorrect;
          const showIncorrect = answered && showCorrectAnswer && isSelected && !isCorrect;

          return (
            <button
              key={option.id}
              className={`quiz-question-card__option${isSelected ? ' quiz-question-card__option--selected' : ''}${
                showCorrect ? ' quiz-question-card__option--correct' : ''
              }${showIncorrect ? ' quiz-question-card__option--incorrect' : ''}`}
              onClick={() => !disabled && !answered && onSelectOption(option.id)}
              disabled={disabled || (answered && !isSelected)}
              aria-pressed={isSelected}
              role="radio"
            >
              <div className="quiz-question-card__option-content">
                <span className="quiz-question-card__option-label">{option.label}</span>

                {/* Feedback icons */}
                {answered && (
                  <>
                    {showCorrect && (
                      <CheckCircle
                        size={20}
                        className="quiz-question-card__option-icon quiz-question-card__option-icon--correct"
                        aria-label="Correct"
                      />
                    )}
                    {showIncorrect && (
                      <XCircle
                        size={20}
                        className="quiz-question-card__option-icon quiz-question-card__option-icon--incorrect"
                        aria-label="Incorrect"
                      />
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {answered && (
        <div
          className={`quiz-question-card__feedback${
            isCorrectAnswer ? ' quiz-question-card__feedback--correct' : ' quiz-question-card__feedback--incorrect'
          }`}
        >
          {isCorrectAnswer
            ? 'Correct! Great job!'
            : 'Incorrect. Please try again or review the material.'}
        </div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
