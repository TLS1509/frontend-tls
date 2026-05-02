import React, { useState } from 'react';
import './QuizComponent.css';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete?: (results: { correct: number; total: number }) => void;
  showEmojis?: boolean;
}

const emojis = ['🤔', '🧠', '💭', '🎯', '⚡'];

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  showEmojis = true,
}) => {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [results, setResults] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const correctCount = results.filter((idx, i) => idx === questions[i].correct).length;

  const handleAnswer = (optionIndex: number) => {
    setAnswered(optionIndex);
  };

  const handleNext = () => {
    if (answered !== null) {
      const newResults = [...results, answered];
      setResults(newResults);

      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setAnswered(null);
      } else {
        setIsComplete(true);
        onComplete?.({ correct: newResults.filter((idx, i) => idx === questions[i].correct).length, total: questions.length });
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
    return (
      <div className="quiz__results">
        <div className="quiz__results-emoji">{percentage >= 80 ? '🎉' : '📊'}</div>
        <h2 className={`quiz__results-title${percentage >= 80 ? ' quiz__results-title--success' : ''}`}>
          Quiz Complete!
        </h2>
        <div className="quiz__results-score">{percentage}%</div>
        <p className="quiz__results-text">
          You got {correctCount} out of {questions.length} questions correct.
        </p>
        <button
          type="button"
          className="quiz__button quiz__button--primary quiz__button--restart"
          onClick={handleRestart}
        >
          🔄 Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz__progress-section">
        <div className="quiz__counter">
          <span className="quiz__counter-text">
            Question {current + 1} of {questions.length}
          </span>
          {showEmojis && <div className="quiz__emoji">{emojis[current % emojis.length]}</div>}
        </div>

        <div className="quiz__progress-bar">
          <div
            className="quiz__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="quiz__question">
        <h3 className="quiz__question-title">{currentQuestion.question}</h3>

        <div className="quiz__options">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answered === idx;
            const isCorrect = idx === currentQuestion.correct;

            return (
              <label
                key={idx}
                className={[
                  'quiz__option-label',
                  isSelected ? 'quiz__option-label--selected' : '',
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name="answer"
                  className="quiz__option-input"
                  onChange={() => handleAnswer(idx)}
                  checked={isSelected}
                />
                <span className="quiz__option-text">{option}</span>
                {isSelected && (
                  <span className="quiz__option-feedback">
                    {isCorrect ? '✅' : '❌'}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div className="quiz__navigation">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={current === 0}
          className="quiz__button quiz__button--secondary"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={answered === null}
          className={`quiz__button quiz__button--primary${answered === null ? ' quiz__button--disabled' : ''}`}
        >
          {current === questions.length - 1 ? '🎉 Submit' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
