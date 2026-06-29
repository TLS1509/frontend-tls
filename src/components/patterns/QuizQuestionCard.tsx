import React from 'react';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';

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
  questionNumber?: number;
  totalQuestions?: number;
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
  questionNumber,
  totalQuestions,
}) => {
  const isCorrectAnswer = selectedId && options.find((opt) => opt.id === selectedId)?.isCorrect;

  return (
    <div
      className={[
        'flex flex-col gap-stack-lg bg-white border border-ink-200 rounded-2xl p-7 shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div>
        {questionNumber && totalQuestions && (
          <div className="flex items-center gap-stack-xs mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-700 text-caption font-bold">
              {questionNumber}
            </span>
            <span className="text-caption text-ink-500 font-medium">
              sur {totalQuestions}
            </span>
          </div>
        )}
        <h2 className="m-0 text-h3 font-display font-bold text-ink-900 leading-snug text-balance">
          {question}
        </h2>
      </div>

      <div className="flex flex-col gap-2.5" role="radiogroup">
        {options.map((option, idx) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;
          const showCorrect = answered && showCorrectAnswer && isCorrect;
          const showIncorrect = answered && showCorrectAnswer && isSelected && !isCorrect;
          const optionLetter = String.fromCharCode(65 + idx);

          let optionClasses = 'border-ink-200 bg-white hover:border-primary-300 hover:bg-primary-50/30 hover:-translate-y-px';
          let letterBg = 'bg-ink-100 text-ink-700';
          if (showCorrect) {
            optionClasses = 'border-success-base bg-success-bg shadow-sm';
            letterBg = 'bg-success-base text-white';
          } else if (showIncorrect) {
            optionClasses = 'border-danger-base bg-danger-bg';
            letterBg = 'bg-danger-base text-white';
          } else if (isSelected) {
            optionClasses = 'border-primary-500 bg-primary-50 shadow-brand-xs';
            letterBg = 'bg-primary-500 text-white';
          }

          return (
            <button
              key={option.id}
              className={[
                'group flex items-center gap-stack px-5 py-stack rounded-xl border-2 cursor-pointer transition-all text-left',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
                optionClasses,
              ].join(' ')}
              onClick={() => !disabled && !answered && onSelectOption(option.id)}
              disabled={disabled || (answered && !isSelected && !isCorrect)}
              aria-pressed={isSelected}
              role="radio"
            >
              <span
                className={[
                  'inline-flex items-center justify-center w-8 h-8 rounded-full font-display font-bold text-body-sm transition-colors shrink-0',
                  letterBg,
                ].join(' ')}
              >
                {optionLetter}
              </span>
              <span className="flex-1 text-body font-medium text-ink-900">{option.label}</span>

              {answered && showCorrect && (
                <CheckCircle size={22} className="text-success-base shrink-0" aria-label="Correct" />
              )}
              {answered && showIncorrect && (
                <XCircle size={22} className="text-danger-base shrink-0" aria-label="Incorrect" />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={[
            'flex items-start gap-stack-xs p-4 rounded-xl text-body-sm leading-relaxed',
            isCorrectAnswer
              ? 'bg-gradient-to-br from-success-bg to-white border border-success-base/30 text-success-fg'
              : 'bg-gradient-to-br from-danger-bg to-white border border-danger-base/30 text-danger-fg',
          ].join(' ')}
        >
          <span className="shrink-0 mt-0.5">
            {isCorrectAnswer ? <Sparkles size={18} /> : <XCircle size={18} />}
          </span>
          <span className="font-medium">
            {isCorrectAnswer
              ? 'Excellent ! Bonne réponse.'
              : 'Incorrect. Consultez la bonne réponse ci-dessus pour comprendre.'}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
