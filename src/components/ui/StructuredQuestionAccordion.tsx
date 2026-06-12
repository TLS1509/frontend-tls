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

import React, { useState } from 'react';
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
        <span className="font-body text-body-sm font-semibold text-ink-900">{label}</span>
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
                <div className="flex-1 min-w-0">
                  <p className="font-body text-body-sm font-semibold text-ink-900 m-0">
                    {q.title}
                  </p>
                  {!isOpen && (
                    <p className="font-body text-caption text-ink-500 m-0">{q.description}</p>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={[
                    'text-ink-400 shrink-0 transition-transform duration-200',
                    isOpen ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>

              {isOpen && (
                <div className="px-4 py-stack bg-ink-50 border-t border-ink-200">
                  <p className="font-body text-caption text-ink-600 mb-3 m-0">
                    {q.description}
                  </p>
                  <textarea
                    value={answers[q.id] ?? ''}
                    onChange={(e) => onChange({ ...answers, [q.id]: e.target.value })}
                    placeholder={q.placeholder}
                    rows={4}
                    className="w-full border border-ink-200 rounded-lg p-3 font-body text-body text-ink-900 placeholder:text-ink-400 resize-none h-auto min-h-[96px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
