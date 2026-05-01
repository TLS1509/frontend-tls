import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Target,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

// ✅ Import upgraded components
import { ButtonEnhanced } from '../ui/button-enhanced';
import { ProgressBarEnhanced } from '../ui/progress-bar-enhanced';
import { Celebration } from '../ui/celebration';

interface QuizSystemProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onExit?: () => void;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  passingScore: number; // percentage
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
  explanation?: string;
  hint?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  xpEarned: number;
  answers: UserAnswer[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
}

export function QuizSystem({ quiz, onComplete, onExit }: QuizSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered) return;

    if (currentQuestion.type === 'single') {
      setSelectedOptions([optionId]);
    } else {
      // Multiple choice
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const checkAnswer = () => {
    if (selectedOptions.length === 0) return;

    const correctOptions = currentQuestion.options
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id)
      .sort();

    const userSelectedSorted = [...selectedOptions].sort();
    const correct = JSON.stringify(correctOptions) === JSON.stringify(userSelectedSorted);

    setIsCorrect(correct);
    setHasAnswered(true);
    setShowExplanation(true);

    // Save answer
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptions: [...selectedOptions],
      isCorrect: correct,
    };

    setAnswers(prev => [...prev, userAnswer]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      // Next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setHasAnswered(false);
      setShowExplanation(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Quiz complete
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const correctCount = answers.filter(a => a.isCorrect).length + (isCorrect ? 1 : 0);
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    const result: QuizResult = {
      quizId: quiz.id,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      percentage,
      passed,
      xpEarned: passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5),
      answers: [...answers, {
        questionId: currentQuestion.id,
        selectedOptions,
        isCorrect,
      }],
    };

    setQuizComplete(true);
    
    if (passed) {
      setShowCelebration(true);
    }

    setTimeout(() => {
      onComplete(result);
    }, passed ? 3000 : 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOptions([]);
    setShowExplanation(false);
    setHasAnswered(false);
    setIsCorrect(false);
    setQuizComplete(false);
    setShowHint(false);
  };

  if (quizComplete) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'var(--background)' }}
      >
        <div 
          className="w-full max-w-2xl p-12 rounded-3xl text-center"
          style={{
            background: 'var(--glass-white)',
            backdropFilter: 'var(--blur-xl)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-lg)',
          }}
        >
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: passed ? 'var(--success-100)' : 'var(--warning-100)',
            }}
          >
            {passed ? (
              <Award className="w-12 h-12" style={{ color: 'var(--success-600)' }} />
            ) : (
              <Target className="w-12 h-12" style={{ color: 'var(--warning-600)' }} />
            )}
          </div>

          <h2 
            className="mb-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            {passed ? 'Quiz réussi ! 🎉' : 'Presque ! 💪'}
          </h2>

          <p 
            className="mb-8"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--muted-foreground)',
            }}
          >
            {passed 
              ? 'Félicitations, vous avez obtenu un excellent score !'
              : `Il vous faut ${quiz.passingScore}% pour valider. Réessayez !`
            }
          </p>

          {/* Score display */}
          <div 
            className="p-8 rounded-2xl mb-8"
            style={{
              background: passed ? 'var(--success-100)' : 'var(--warning-100)',
            }}
          >
            <p 
              className="mb-2"
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-6xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: passed ? 'var(--success-600)' : 'var(--warning-600)',
              }}
            >
              {percentage}%
            </p>
            <p 
              style={{ 
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
              }}
            >
              {correctCount} / {quiz.questions.length} réponses correctes
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div 
              className="p-4 rounded-xl"
              style={{ background: 'var(--neutral-100)' }}
            >
              <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--primary)' }} />
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Score
              </p>
              <p 
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {percentage}%
              </p>
            </div>

            <div 
              className="p-4 rounded-xl"
              style={{ background: 'var(--neutral-100)' }}
            >
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--success-600)' }} />
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Correct
              </p>
              <p 
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {correctCount}
              </p>
            </div>

            <div 
              className="p-4 rounded-xl"
              style={{ background: 'var(--neutral-100)' }}
            >
              <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                XP Gagnés
              </p>
              <p 
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                +{passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {!passed && (
              <ButtonEnhanced
                variant="ghost"
                size="lg"
                icon={<RotateCcw className="w-5 h-5" />}
                onClick={restartQuiz}
                fullWidth
              >
                Réessayer
              </ButtonEnhanced>
            )}
            
            <ButtonEnhanced
              variant="primary"
              size="lg"
              onClick={() => onComplete({
                quizId: quiz.id,
                score: correctCount,
                totalQuestions: quiz.questions.length,
                correctAnswers: correctCount,
                percentage,
                passed,
                xpEarned: passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5),
                answers,
              })}
              fullWidth
            >
              Continuer
            </ButtonEnhanced>
          </div>
        </div>

        {/* ✅ Success Celebration */}
        {showCelebration && (
          <Celebration
            type="achievement"
            title="🏆 Quiz réussi !"
            subtitle={`+${quiz.xpReward} XP • Score: ${percentage}%`}
            onClose={() => setShowCelebration(false)}
            duration={3000}
          />
        )}
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'var(--background)' }}
    >
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                {quiz.title}
              </h1>
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Question {currentQuestionIndex + 1} sur {quiz.questions.length}
              </p>
            </div>

            {onExit && (
              <ButtonEnhanced
                variant="ghost"
                size="sm"
                onClick={onExit}
              >
                Quitter
              </ButtonEnhanced>
            )}
          </div>

          <ProgressBarEnhanced
            current={currentQuestionIndex + 1}
            total={quiz.questions.length}
            color="var(--gradient-primary)"
            height="8px"
            animated={true}
            showPercentage={false}
          />
        </div>

        {/* Question Card */}
        <div 
          className="p-8 rounded-3xl"
          style={{
            background: 'var(--glass-white)',
            backdropFilter: 'var(--blur-xl)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-lg)',
          }}
        >
          {/* Question */}
          <div className="mb-8">
            <h2 
              className="mb-4"
              style={{ 
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'multiple' && (
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  fontStyle: 'italic',
                }}
              >
                ℹ️ Plusieurs réponses possibles
              </p>
            )}
          </div>

          {/* Hint */}
          {currentQuestion.hint && !hasAnswered && (
            <div className="mb-6">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 transition-all"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--primary)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                <AlertCircle className="w-4 h-4" />
                {showHint ? 'Masquer l\'indice' : 'Voir l\'indice'}
              </button>

              {showHint && (
                <div 
                  className="mt-3 p-4 rounded-xl"
                  style={{
                    background: 'var(--primary-lighter)',
                    border: '1px solid var(--primary-200)',
                  }}
                >
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--primary)',
                    }}
                  >
                    💡 {currentQuestion.hint}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              const showCorrect = hasAnswered && option.isCorrect;
              const showWrong = hasAnswered && isSelected && !option.isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={hasAnswered}
                  className="w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4"
                  style={{
                    background: showCorrect 
                      ? 'var(--success-100)' 
                      : showWrong 
                        ? 'var(--error-100)' 
                        : isSelected 
                          ? 'var(--primary-lighter)' 
                          : 'var(--neutral-50)',
                    border: `2px solid ${
                      showCorrect 
                        ? 'var(--success-600)' 
                        : showWrong 
                          ? 'var(--error-600)' 
                          : isSelected 
                            ? 'var(--primary)' 
                            : 'var(--border)'
                    }`,
                    cursor: hasAnswered ? 'default' : 'pointer',
                    transform: isSelected && !hasAnswered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {/* Checkbox/Radio */}
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: showCorrect 
                        ? 'var(--success-600)' 
                        : showWrong 
                          ? 'var(--error-600)' 
                          : isSelected 
                            ? 'var(--primary)' 
                            : 'white',
                      border: `2px solid ${
                        showCorrect 
                          ? 'var(--success-600)' 
                          : showWrong 
                            ? 'var(--error-600)' 
                            : isSelected 
                              ? 'var(--primary)' 
                              : 'var(--neutral-300)'
                      }`,
                    }}
                  >
                    {(isSelected || showCorrect) && (
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ background: 'white' }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <span 
                    className="flex-1"
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: showCorrect || showWrong 
                        ? showCorrect ? 'var(--success-600)' : 'var(--error-600)'
                        : 'var(--foreground)',
                    }}
                  >
                    {option.text}
                  </span>

                  {/* Icon */}
                  {hasAnswered && (
                    <>
                      {showCorrect && (
                        <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--success-600)' }} />
                      )}
                      {showWrong && (
                        <XCircle className="w-6 h-6" style={{ color: 'var(--error-600)' }} />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div 
              className="p-6 rounded-xl mb-6"
              style={{
                background: isCorrect ? 'var(--success-100)' : 'var(--warning-100)',
                border: `1px solid ${isCorrect ? 'var(--success-200)' : 'var(--warning-200)'}`,
              }}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--success-600)' }} />
                ) : (
                  <AlertCircle className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--warning-600)' }} />
                )}
                <div>
                  <p 
                    className="mb-2"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: isCorrect ? 'var(--success-600)' : 'var(--warning-600)',
                    }}
                  >
                    {isCorrect ? '✅ Bonne réponse !' : '❌ Incorrect'}
                  </p>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div>
              {!hasAnswered && (
                <p 
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {selectedOptions.length > 0 
                    ? `${selectedOptions.length} réponse(s) sélectionnée(s)` 
                    : 'Sélectionnez une ou plusieurs réponses'
                  }
                </p>
              )}
            </div>

            <div>
              {!hasAnswered ? (
                <ButtonEnhanced
                  variant="primary"
                  size="lg"
                  onClick={checkAnswer}
                  disabled={selectedOptions.length === 0}
                >
                  Valider
                </ButtonEnhanced>
              ) : (
                <ButtonEnhanced
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  onClick={handleNext}
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                </ButtonEnhanced>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
