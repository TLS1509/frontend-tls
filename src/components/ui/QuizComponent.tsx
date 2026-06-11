import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, PartyPopper, BarChart3 } from 'lucide-react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete?: (results: { correct: number; total: number }) => void;
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-body-sm font-semibold cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-fast ease-emphasis active:scale-[0.98] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed';
const BTN_PRIMARY = 'bg-primary-600 text-white hover:bg-primary-700';
const BTN_SECONDARY = 'bg-ink-50 text-ink-900 border border-ink-200 hover:bg-ink-100';

export const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [results, setResults] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const correctCount = results.filter((idx, i) => idx === questions[i].correct).length;

  const handleNext = () => {
    if (answered !== null) {
      const newResults = [...results, answered];
      setResults(newResults);

      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setAnswered(null);
      } else {
        setIsComplete(true);
        onComplete?.({
          correct: newResults.filter((idx, i) => idx === questions[i].correct).length,
          total: questions.length,
        });
      }
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswered(results[current - 1] ?? null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswered(null);
    setResults([]);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    const isSuccess = percentage >= 80;
    return (
      <div className="bg-white rounded-xl border border-ink-200 p-8 text-center max-w-2xl mx-auto">
        <div
          className={[
            'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4',
            isSuccess ? 'bg-success-bg text-success-fg' : 'bg-primary-50 text-primary-600',
          ].join(' ')}
        >
          {isSuccess ? <PartyPopper size={40} /> : <BarChart3 size={40} />}
        </div>
        <h2
          className={[
            'm-0 mb-2 text-h2 font-display font-bold',
            isSuccess ? 'text-success-fg' : 'text-ink-900',
          ].join(' ')}
        >
          Quiz Complete!
        </h2>
        <div
          className={[
            'text-h1 font-display font-black mb-2',
            isSuccess ? 'text-success-fg' : 'text-primary-600',
          ].join(' ')}
        >
          {percentage}%
        </div>
        <p className="m-0 mb-6 text-body text-ink-500">
          You got {correctCount} out of {questions.length} questions correct.
        </p>
        <button type="button" onClick={handleRestart} className={`${BTN_BASE} ${BTN_PRIMARY}`}>
          <RotateCcw size={16} /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-ink-200 p-6 max-w-2xl mx-auto">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption font-semibold text-ink-500">
            Question {current + 1} of {questions.length}
          </span>
          <span className="text-caption font-semibold text-primary-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-ink-100 rounded-pill overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-pill transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-5">
        <h3 className="m-0 mb-4 text-h4 font-display font-semibold text-ink-900">
          {currentQuestion.question}
        </h3>

        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answered === idx;
            const isCorrect = idx === currentQuestion.correct;

            return (
              <label
                key={idx}
                className={[
                  'relative flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-[background-color,border-color] duration-fast ease-emphasis',
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="answer"
                  className="sr-only"
                  onChange={() => setAnswered(idx)}
                  checked={isSelected}
                />
                <span
                  className={[
                    'inline-flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0',
                    isSelected ? 'border-primary-500 bg-primary-500' : 'border-ink-300 bg-white',
                  ].join(' ')}
                >
                  {isSelected && <span className="block w-2 h-2 rounded-full bg-white" />}
                </span>
                <span className="flex-1 text-body-sm text-ink-900">{option}</span>
                {isSelected && (
                  <span
                    className={[
                      'inline-flex items-center justify-center w-6 h-6 rounded-full text-white shrink-0',
                      isCorrect ? 'bg-success-base' : 'bg-danger-base',
                    ].join(' ')}
                  >
                    {isCorrect ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={current === 0}
          className={`${BTN_BASE} ${BTN_SECONDARY}`}
        >
          <ArrowLeft size={16} /> Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={answered === null}
          className={`${BTN_BASE} ${BTN_PRIMARY}`}
        >
          {current === questions.length - 1 ? 'Submit' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
