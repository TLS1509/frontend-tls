/**
 * StructuredQuestionAccordion — Figma DS Journal component.
 *
 * Collapsible accordion list of guided structured questions (EDRA-R or generic).
 * Each item shows a title + description header button; expanding reveals a
 * textarea for the learner's answer.
 *
 * The component manages which items are open internally. Answers are
 * controlled via `answers` / `onChange` props.
 *
 * Usage:
 *   import { EDRA_R_QUESTIONS } from '../../data/journal';
 *
 *   <StructuredQuestionAccordion
 *     questions={EDRA_R_QUESTIONS}
 *     answers={structuredAnswers}
 *     onChange={setStructuredAnswers}
 *     label="Template EDRA-R (optionnel)"
 *   />
 */

import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface StructuredQuestion {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly placeholder: string;
}

export interface StructuredQuestionAccordionProps {
  questions: readonly StructuredQuestion[];
  answers: Record<string, string>;
  onChange: (answers: Record<string, string>) => void;
  /** Optional section label rendered above the accordion. */
  label?: string;
  className?: string;
}

export const StructuredQuestionAccordion: React.FC<StructuredQuestionAccordionProps> = ({
  questions,
  answers,
  onChange,
  label,
  className = '',
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const uid = useId();

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>
      {label && (
        <span className="font-body text-body font-semibold text-ink-900">{label}</span>
      )}

      <div className="flex flex-col gap-stack-xs">
        {questions.map((q) => {
          const isOpen = expanded.has(q.id);
          return (
            <div key={q.id} className="border border-ink-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(q.id)}
                className="w-full flex items-center justify-between gap-stack-xs px-4 py-3 bg-white hover:bg-ink-50 transition-colors text-left min-h-touch"
              >
                {/* Question 16 / 600, sa consigne 13 / 400 ink-600 à 4 px dessous
                    (titre → texte d'un même groupe). Des <span> : un <button>
                    n'admet que du contenu phrasé (il portait un <div> et deux
                    <p>, 2026-09-24) ; la colonne flex donne le même rendu. */}
                <span className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                  <span className="font-body text-body font-semibold text-ink-900">
                    {q.title}
                  </span>
                  {!isOpen && (
                    <span className="font-body text-caption text-ink-600">{q.description}</span>
                  )}
                </span>
                <ChevronDown
                  size={18}
                  className={[
                    'text-ink-600 shrink-0 transition-transform duration-200',
                    isOpen ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>

              {isOpen && (
                <div className="flex flex-col gap-stack-xs px-4 py-stack bg-ink-50 border-t border-ink-200">
                  {/* La consigne nomme la zone de réponse (elle n'avait aucun nom
                      accessible). Filet ink-400 de la famille champ (arbitrage
                      n°7) — l'ink-200 d'avant mesurait 1,2:1 sur le blanc du champ. */}
                  <p id={`${uid}-${q.id}-consigne`} className="font-body text-caption text-ink-600">
                    {q.description}
                  </p>
                  <textarea
                    value={answers[q.id] ?? ''}
                    onChange={(e) => onChange({ ...answers, [q.id]: e.target.value })}
                    placeholder={q.placeholder}
                    rows={4}
                    aria-label={q.title}
                    aria-describedby={`${uid}-${q.id}-consigne`}
                    className="w-full bg-white border border-ink-400 rounded-lg p-3 font-body text-body text-ink-900 placeholder:text-ink-500 resize-none h-auto min-h-[96px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StructuredQuestionAccordion;
