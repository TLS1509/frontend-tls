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
      <div style={{ textAlign: 'center', padding: 'var(--s-8)' }}>
        <h2
          style={{
            fontSize: 'var(--t-h2)',
            fontFamily: 'var(--font-display)',
            fontWeight: '600',
            marginBottom: 'var(--s-4)',
            color: percentage >= 80 ? 'var(--tls-success-base)' : 'var(--text)',
          }}
        >
          {percentage >= 80 ? '🎉' : '📊'} Quiz Complete!
        </h2>
        <div
          style={{
            fontSize: '4rem',
            fontWeight: '700',
            background: 'linear-gradient(120deg, var(--tls-primary-500), var(--tls-orange-500))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'var(--s-4)',
          }}
        >
          {percentage}%
        </div>
        <p
          style={{
            fontSize: 'var(--t-body)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--s-6)',
          }}
        >
          You got {correctCount} out of {questions.length} questions correct.
        </p>
        <button
          onClick={handleRestart}
          style={{
            padding: 'var(--s-4) var(--s-8)',
            background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-yellow-400))',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--r-lg)',
            fontSize: 'var(--t-body-sm)',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(127, 86, 217, 0.2)',
            transition: 'all var(--dur-2) var(--ease-standard)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translateY(-2px)';
            el.style.boxShadow = '0 6px 16px rgba(127, 86, 217, 0.3)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 4px 12px rgba(127, 86, 217, 0.2)';
          }}
        >
          🔄 Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 'var(--s-8)' }}>
        {/* Question Counter and Emoji */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--s-6)',
          }}
        >
          <span style={{ fontSize: 'var(--t-caption)', fontWeight: '600', color: 'var(--text-soft)' }}>
            Question {current + 1} of {questions.length}
          </span>
          {showEmojis && <div style={{ fontSize: '1.5rem' }}>{emojis[current % emojis.length]}</div>}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: '6px',
            width: '100%',
            backgroundColor: 'var(--border)',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: 'var(--s-8)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--tls-primary-500), var(--tls-yellow-400))',
              transition: 'width var(--dur-3) var(--ease-standard)',
            }}
          />
        </div>

        {/* Question Title */}
        <h3
          style={{
            fontSize: 'var(--t-h3)',
            fontFamily: 'var(--font-display)',
            fontWeight: '600',
            marginBottom: 'var(--s-6)',
            color: 'var(--text)',
          }}
        >
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answered === idx;
            const isCorrect = idx === currentQuestion.correct;

            return (
              <label
                key={idx}
                style={{
                  padding: 'var(--s-4)',
                  border: `2px solid ${isSelected ? 'var(--tls-primary-500)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-lg)',
                  backgroundColor: isSelected ? 'var(--tls-primary-500)' + '11' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all var(--dur-2) var(--ease-standard)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--surface-sunken)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <input
                  type="radio"
                  name="answer"
                  onChange={() => handleAnswer(idx)}
                  checked={isSelected}
                  style={{
                    marginRight: 'var(--s-4)',
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                  }}
                />
                <span style={{ fontSize: 'var(--t-body-sm)', fontWeight: '500', color: 'var(--text)', flex: 1 }}>
                  {option}
                </span>
                {isSelected && <span style={{ marginLeft: 'auto', fontSize: '1.25rem' }}>{isCorrect ? '✅' : '❌'}</span>}
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: 'var(--s-4)', justifyContent: 'space-between' }}>
        <button
          onClick={handlePrevious}
          disabled={current === 0}
          style={{
            padding: 'var(--s-3) var(--s-5)',
            backgroundColor: 'var(--surface-sunken)',
            border: `2px solid var(--border)`,
            borderRadius: 'var(--r-lg)',
            cursor: current === 0 ? 'not-allowed' : 'pointer',
            opacity: current === 0 ? 0.5 : 1,
            fontSize: 'var(--t-body-sm)',
            fontWeight: '600',
            transition: 'all var(--dur-2) var(--ease-standard)',
          }}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={answered === null}
          style={{
            padding: 'var(--s-3) var(--s-5)',
            background: answered === null ? 'var(--surface-sunken)' : 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-yellow-400))',
            color: answered === null ? 'var(--text-muted)' : '#fff',
            border: 'none',
            borderRadius: 'var(--r-lg)',
            cursor: answered === null ? 'not-allowed' : 'pointer',
            fontSize: 'var(--t-body-sm)',
            fontWeight: '600',
            opacity: answered === null ? 0.6 : 1,
            boxShadow: answered === null ? 'none' : '0 4px 12px rgba(127, 86, 217, 0.3)',
            transition: 'all var(--dur-2) var(--ease-standard)',
          }}
          onMouseEnter={(e) => {
            if (answered !== null) {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 6px 16px rgba(127, 86, 217, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (answered !== null) {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 4px 12px rgba(127, 86, 217, 0.3)';
            }
          }}
        >
          {current === questions.length - 1 ? '🎉 Submit' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
