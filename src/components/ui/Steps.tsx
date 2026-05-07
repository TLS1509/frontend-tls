import React from 'react';
import { Check, Lock } from 'lucide-react';

export type StepState = 'done' | 'current' | 'upcoming' | 'locked';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  state: StepState;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  items: StepItem[];
}

const MARKER_BASE =
  'absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-caption font-bold border-2 transition-all';

const MARKER_STATE: Record<StepState, string> = {
  done:     'bg-primary-500 border-primary-500 text-white',
  current:  'bg-primary-50 border-primary-500 text-primary-600 shadow-[0_0_0_4px_rgba(85,161,180,0.18)]',
  upcoming: 'bg-white border-ink-200 text-ink-400',
  locked:   'bg-ink-50 border-ink-300 text-ink-400 opacity-70',
};

const LINE_STATE: Record<StepState, string> = {
  done:     'bg-primary-300',
  current:  'bg-ink-200',
  upcoming: 'bg-ink-200',
  locked:   'bg-ink-200',
};

const TITLE_STATE: Record<StepState, string> = {
  done:     'text-ink-500 line-through decoration-primary-300',
  current:  'text-ink-900 font-bold',
  upcoming: 'text-ink-500 font-semibold',
  locked:   'text-ink-400 font-semibold opacity-60',
};

const DESC_STATE: Record<StepState, string> = {
  done:     'text-ink-500',
  current:  'text-ink-500',
  upcoming: 'text-ink-500',
  locked:   'text-ink-500 opacity-50',
};

export const Steps: React.FC<StepsProps> = ({ items, className = '', ...rest }) => {
  const wrapperClasses = [
    'list-none m-0 p-0 flex flex-col font-body',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ol className={wrapperClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <li
            key={idx}
            className="relative pl-10 pb-6"
            aria-current={item.state === 'current' ? 'step' : undefined}
            aria-disabled={item.state === 'locked' ? 'true' : undefined}
          >
            <span className={`${MARKER_BASE} ${MARKER_STATE[item.state]}`}>
              {item.state === 'done' ? (
                <Check size={14} strokeWidth={3} />
              ) : item.state === 'locked' ? (
                <Lock size={12} strokeWidth={2.25} />
              ) : (
                idx + 1
              )}
            </span>

            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[15px] top-9 bottom-0 w-0.5 ${LINE_STATE[item.state]}`}
              />
            )}

            <p
              className={`m-0 mb-1 text-body-sm leading-snug pt-[2px] ${TITLE_STATE[item.state]}`}
            >
              {item.title}
            </p>
            {item.description && (
              <p className={`m-0 mt-1 text-caption leading-relaxed ${DESC_STATE[item.state]}`}>
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
