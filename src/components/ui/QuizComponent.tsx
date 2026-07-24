/**
 * QuizComponent — quiz de leçon avec récupération en mémoire et calibration.
 *
 * ## Pourquoi le flux se fait en deux temps
 *
 * L'apprenant choisit une option, **déclare sa confiance**, et voit seulement ensuite
 * si sa réponse était juste. Cet ordre n'est pas cosmétique :
 *
 * 1. **Il force l'engagement.** Révéler la réponse au clic transforme le quiz en
 *    reconnaissance ; différer la révélation en fait une vraie récupération en mémoire.
 * 2. **Il rend la confiance exploitable.** Une confiance déclarée après avoir vu la
 *    réponse ne mesure rien. Déclarée avant, croisée avec le résultat, elle donne une
 *    mesure de **calibration métacognitive** — et c'est elle qui a de la valeur :
 *
 *    |                 | Réponse juste          | Réponse fausse                    |
 *    |-----------------|------------------------|-----------------------------------|
 *    | **Sûr**         | maîtrise               | **erreur ancrée** — à corriger    |
 *    | **Pas sûr**     | savoir fragile        | lacune assumée                    |
 *
 *    Un apprenant sûr et faux ne demande pas la même remédiation qu'un apprenant
 *    hésitant et juste. Cette distinction alimente directement le modèle Dreyfus du
 *    cahier 02 (Passeport).
 *
 * ## Ce qui remonte
 *
 * `onComplete` reçoit le **détail par question**, pas seulement un score. Le score seul
 * ne permet ni remédiation, ni répétition espacée, ni preuve de compétence.
 * Voir `QuizAttempt` dans `stores/persistence.ts`.
 *
 * @see docs/product/CRITIQUE-BOUCLE-APPRENANT.md — origine de ces choix
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, PartyPopper, BarChart3 } from 'lucide-react';
import type { QuizAnswer } from '../../stores/persistence';

export interface QuizQuestion {
  question: string;
  options: string[];
  /** Index de l'option correcte dans `options`. */
  correct: number;
}

/** 1 = pas sûr · 2 = plutôt sûr · 3 = certain. */
export type ConfidenceLevel = 1 | 2 | 3;

export interface QuizComponentProps {
  questions: QuizQuestion[];
  /**
   * Appelé une fois le quiz terminé, avec le détail par question.
   * Le consommateur est responsable de la persistance — voir `LessonPlayer`.
   */
  onComplete?: (results: { correct: number; total: number; answers: QuizAnswer[] }) => void;
  /**
   * Demander la confiance avant de révéler la réponse. `true` par défaut.
   * Ne passer `false` que pour une démo ou un quiz d'échauffement sans enjeu.
   */
  askConfidence?: boolean;
}

/** Réponse en cours de construction pour une question. */
interface AnswerRecord {
  selected: number;
  confidence?: ConfidenceLevel;
}

const CONFIDENCE_OPTIONS: { level: ConfidenceLevel; label: string }[] = [
  { level: 1, label: 'Pas sûr' },
  { level: 2, label: 'Plutôt sûr' },
  { level: 3, label: 'Certain' },
];

const BTN_BASE =
  'inline-flex items-center justify-center gap-stack-xs px-5 py-2.5 rounded-md text-body-sm font-semibold cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-fast ease-emphasis active:scale-[0.98] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 ' +
  'disabled:opacity-40 disabled:cursor-not-allowed';
const BTN_PRIMARY = 'bg-primary-600 text-white hover:bg-primary-700';
const BTN_SECONDARY = 'bg-ink-50 text-ink-900 border border-ink-200 hover:bg-ink-100';

export const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  askConfidence = true,
}) => {
  const [current, setCurrent] = useState(0);
  const [records, setRecords] = useState<(AnswerRecord | null)[]>(() => questions.map(() => null));
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[current];
  const record = records[current];
  const progress = ((current + 1) / questions.length) * 100;

  /** La réponse n'est montrée qu'une fois la confiance déclarée — voir l'en-tête du fichier. */
  const isRevealed = record !== null && (!askConfidence || record.confidence !== undefined);
  const isLast = current === questions.length - 1;

  const correctCount = records.reduce<number>(
    (acc, r, i) => (r && r.selected === questions[i].correct ? acc + 1 : acc),
    0
  );

  const updateRecord = (next: AnswerRecord) =>
    setRecords((prev) => prev.map((r, i) => (i === current ? next : r)));

  const handleSelect = (idx: number) => {
    // Re-cliquer une option déjà révélée ne doit pas effacer la confiance déclarée.
    if (isRevealed) return;
    updateRecord({ selected: idx });
  };

  const handleConfidence = (level: ConfidenceLevel) => {
    if (!record) return;
    updateRecord({ ...record, confidence: level });
  };

  const handleNext = () => {
    if (!isRevealed) return;
    if (!isLast) {
      setCurrent(current + 1);
      return;
    }
    setIsComplete(true);
    const answers: QuizAnswer[] = records.map((r, i) => ({
      questionIndex: i,
      selected: r?.selected ?? -1,
      correct: questions[i].correct,
      isCorrect: r?.selected === questions[i].correct,
      confidence: r?.confidence,
    }));
    onComplete?.({ correct: correctCount, total: questions.length, answers });
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleRestart = () => {
    setCurrent(0);
    setRecords(questions.map(() => null));
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    const isSuccess = percentage >= 80;
    /** Sûr et faux : le cas qui mérite d'être signalé à l'apprenant. */
    const overconfident = records.filter(
      (r, i) => r && r.confidence === 3 && r.selected !== questions[i].correct
    ).length;

    return (
      <div className="bg-white rounded-xl border border-ink-200 p-8 text-center max-w-2xl mx-auto">
        <div
          className={[
            'inline-flex items-center justify-center w-20 h-20 rounded-full mb-stack',
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
          Quiz terminé
        </h2>
        <div
          className={[
            'text-h1 font-display font-black mb-2',
            isSuccess ? 'text-success-fg' : 'text-primary-600',
          ].join(' ')}
        >
          {percentage}%
        </div>
        <p className="m-0 mb-stack text-body text-ink-500">
          {correctCount} bonne{correctCount > 1 ? 's' : ''} réponse
          {correctCount > 1 ? 's' : ''} sur {questions.length}.
        </p>
        {overconfident > 0 && (
          <p className="m-0 mb-stack-lg text-body-sm text-ink-500 max-w-prose mx-auto">
            {overconfident === 1
              ? 'Sur une question, tu étais certain de ta réponse alors qu’elle était fausse. C’est le point à revoir en priorité.'
              : `Sur ${overconfident} questions, tu étais certain de ta réponse alors qu’elle était fausse. Ce sont les points à revoir en priorité.`}
          </p>
        )}
        <button type="button" onClick={handleRestart} className={`${BTN_BASE} ${BTN_PRIMARY}`}>
          <RotateCcw size={16} /> Refaire le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-ink-200 p-6 max-w-2xl mx-auto">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption font-semibold text-ink-500">
            Question {current + 1} sur {questions.length}
          </span>
          <span className="text-caption font-semibold text-primary-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 bg-ink-100 rounded-pill overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-pill transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-5">
        <h3 className="m-0 mb-stack text-h4 font-display font-semibold text-ink-900">
          {currentQuestion.question}
        </h3>

        <div className="flex flex-col gap-stack-xs">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = record?.selected === idx;
            const isCorrect = idx === currentQuestion.correct;
            // La bonne réponse est aussi mise en avant quand l'apprenant s'est trompé :
            // savoir qu'on a faux sans savoir où est le juste n'apprend rien.
            const showAsCorrect = isRevealed && isCorrect;
            const showAsWrong = isRevealed && isSelected && !isCorrect;

            return (
              <label
                key={idx}
                className={[
                  'relative flex items-center gap-stack-xs p-4 rounded-lg border-2 transition-[background-color,border-color] duration-fast ease-emphasis',
                  isRevealed ? 'cursor-default' : 'cursor-pointer',
                  showAsCorrect
                    ? 'border-success-base bg-success-bg'
                    : showAsWrong
                      ? 'border-danger-base bg-danger-bg'
                      : isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : isRevealed
                          ? 'border-ink-200 bg-white'
                          : 'border-ink-200 bg-white hover:border-ink-300 hover:bg-ink-50',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name={`answer-${current}`}
                  className="sr-only"
                  onChange={() => handleSelect(idx)}
                  checked={isSelected}
                  disabled={isRevealed}
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
                {(showAsCorrect || showAsWrong) && (
                  <span
                    className={[
                      'inline-flex items-center justify-center w-6 h-6 rounded-full text-white shrink-0',
                      showAsCorrect ? 'bg-success-base' : 'bg-danger-base',
                    ].join(' ')}
                  >
                    {showAsCorrect ? (
                      <Check size={14} strokeWidth={3} />
                    ) : (
                      <X size={14} strokeWidth={3} />
                    )}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Calibration : demandée après le choix, avant la révélation. */}
      {askConfidence && record !== null && !isRevealed && (
        <fieldset className="mb-5 border-0 p-0 m-0">
          <legend className="text-body-sm font-semibold text-ink-900 mb-stack-xs p-0">
            À quel point es-tu sûr de ta réponse&nbsp;?
          </legend>
          <div className="flex flex-wrap gap-stack-xs">
            {CONFIDENCE_OPTIONS.map(({ level, label }) => (
              <button
                key={level}
                type="button"
                onClick={() => handleConfidence(level)}
                className={`${BTN_BASE} ${BTN_SECONDARY} min-h-touch flex-1`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-center justify-between gap-stack-xs">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={current === 0}
          className={`${BTN_BASE} ${BTN_SECONDARY}`}
        >
          <ArrowLeft size={16} /> Précédent
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isRevealed}
          className={`${BTN_BASE} ${BTN_PRIMARY}`}
        >
          {isLast ? 'Terminer' : 'Suivant'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
