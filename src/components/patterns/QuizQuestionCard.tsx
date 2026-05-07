import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

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
    <div
      className={[
        'flex flex-col gap-5 bg-white border border-ink-200 rounded-2xl p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="m-0 text-h3 font-display font-semibold text-ink-900 leading-snug">
        {question}
      </h2>

      <div className="flex flex-col gap-2" role="radiogroup">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;
          const showCorrect = answered && showCorrectAnswer && isCorrect;
          const showIncorrect = answered && showCorrectAnswer && isSelected && !isCorrect;

          let optionClasses = 'border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50 text-ink-900';
          if (showCorrect) {
            optionClasses = 'border-success-base bg-success-bg text-success-fg';
          } else if (showIncorrect) {
            optionClasses = 'border-danger-base bg-danger-bg text-danger-fg';
          } else if (isSelected) {
            optionClasses = 'border-primary-500 bg-primary-50 text-primary-700';
          }

          return (
            <button
              key={option.id}
              className={[
                'flex items-center justify-between gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors text-left',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
                optionClasses,
              ].join(' ')}
              onClick={() => !disabled && !answered && onSelectOption(option.id)}
              disabled={disabled || (answered && !isSelected)}
              aria-pressed={isSelected}
              role="radio"
            >
              <span className="flex-1 text-body-sm font-medium">{option.label}</span>

              {answered && showCorrect && (
                <CheckCircle size={20} className="text-success-base shrink-0" aria-label="Correct" />
              )}
              {answered && showIncorrect && (
                <XCircle size={20} className="text-danger-base shrink-0" aria-label="Incorrect" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={[
            'p-4 rounded-md text-body-sm font-medium',
            isCorrectAnswer
              ? 'bg-success-bg text-success-fg border border-success-base/30'
              : 'bg-danger-bg text-danger-fg border border-danger-base/30',
          ].join(' ')}
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
