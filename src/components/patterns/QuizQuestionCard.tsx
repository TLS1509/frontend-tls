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
        'flex flex-col gap-stack-lg bg-white border border-ink-200 rounded-lg p-stack-lg',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Compteur → question 8 (passe typographique du 2026-09-24). La
          question est le titre de la carte : h3 20/700, l'interligne de son pas
          — c'était un h2 au corps d'un h3, et le `leading-snug` doublait le
          token. La marge de base des titres (0,75em) cède à `mt-stack-xs`. */}
      <div className="flex flex-col">
        {questionNumber && totalQuestions && (
          <div className="flex items-center gap-stack-xs">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-pill bg-primary-50 text-primary-800 text-caption font-bold tabular-nums">
              {questionNumber}
            </span>
            <span className="text-caption text-ink-600 tabular-nums">
              sur {totalQuestions}
            </span>
          </div>
        )}
        <h3 className={['text-h3 font-display text-ink-900 text-balance', questionNumber && totalQuestions ? 'mt-stack-xs' : ''].join(' ')}>
          {question}
        </h3>
      </div>

      <div className="flex flex-col gap-stack-sm" role="radiogroup">
        {options.map((option, idx) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;
          const showCorrect = answered && showCorrectAnswer && isCorrect;
          const showIncorrect = answered && showCorrectAnswer && isSelected && !isCorrect;
          const optionLetter = String.fromCharCode(65 + idx);

          let optionClasses = 'border-ink-200 bg-white hover:border-primary-300 hover:bg-primary-50/30';
          let letterBg = 'bg-ink-100 text-ink-700';
          if (showCorrect) {
            optionClasses = 'border-success-base bg-success-bg shadow-sm';
            letterBg = 'bg-success-vivid text-white';
          } else if (showIncorrect) {
            optionClasses = 'border-danger-base bg-danger-bg';
            letterBg = 'bg-danger-strong text-white';
          } else if (isSelected) {
            optionClasses = 'border-primary-500 bg-primary-50 shadow-brand-xs';
            letterBg = 'bg-primary-700 text-white';
          }

          return (
            <button
              key={option.id}
              className={[
                /* `items-start` + boîtes `h-lh` : la lettre et l'icône de résultat
                   se centrent sur la PREMIÈRE ligne de la réponse, pas sur le
                   bloc, quand la réponse tient sur deux lignes. */
                'group flex items-start gap-stack px-stack-md py-stack rounded-lg border-2 cursor-pointer transition-all text-left text-body',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
                optionClasses,
              ].join(' ')}
              onClick={() => !disabled && !answered && onSelectOption(option.id)}
              disabled={disabled || (answered && !isSelected && !isCorrect)}
              aria-pressed={isSelected}
              role="radio"
            >
              <span className="flex items-center h-lh shrink-0">
                <span
                  className={[
                    'inline-flex items-center justify-center w-8 h-8 rounded-pill font-display font-bold text-body transition-colors',
                    letterBg,
                  ].join(' ')}
                >
                  {optionLetter}
                </span>
              </span>
              <span className="flex-1 text-body text-ink-900">{option.label}</span>

              {answered && showCorrect && (
                <span className="flex items-center h-lh shrink-0">
                  <CheckCircle size={20} className="text-success-base" aria-label="Correct" />
                </span>
              )}
              {answered && showIncorrect && (
                <span className="flex items-center h-lh shrink-0">
                  <XCircle size={20} className="text-danger-base" aria-label="Incorrect" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={[
            'flex items-start gap-stack-xs p-4 rounded-lg text-body',
            isCorrectAnswer
              ? 'bg-gradient-to-br from-success-bg to-white border border-success-base/30 text-success-fg'
              : 'bg-gradient-to-br from-danger-bg to-white border border-danger-base/30 text-danger-fg',
          ].join(' ')}
        >
          {/* Une validation, pas une étincelle : Sparkles est réservé aux
              fonctions d'IA (DESIGN.md § 10). */}
          <span className="flex items-center h-lh shrink-0">
            {isCorrectAnswer ? <CheckCircle size={18} /> : <XCircle size={18} />}
          </span>
          <span className="font-semibold">
            {isCorrectAnswer
              ? 'Bonne réponse.'
              : 'Incorrect. Consultez la bonne réponse ci-dessus pour comprendre.'}
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizQuestionCard;
