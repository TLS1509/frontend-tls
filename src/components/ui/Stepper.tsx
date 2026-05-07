import React from 'react';
import { Check } from 'lucide-react';

export type StepperState = 'done' | 'current' | 'upcoming';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperItem {
  label: React.ReactNode;
  description?: React.ReactNode;
  state: StepperState;
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  items: StepperItem[];
  orientation?: StepperOrientation;
}

const CIRCLE_BASE =
  'relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-body font-bold text-caption shrink-0 transition-colors';

const CIRCLE_STATE: Record<StepperState, string> = {
  done:     'bg-primary-600 border-transparent text-white',
  current:  'bg-white border-primary-600 text-primary-700 shadow-[0_0_0_4px_rgba(85,161,180,0.18)]',
  upcoming: 'bg-ink-100 border-transparent text-ink-500',
};

const LABEL_STATE: Record<StepperState, string> = {
  done:     'text-ink-900',
  current:  'text-ink-900',
  upcoming: 'text-ink-500',
};

const LINE_STATE: Record<StepperState, string> = {
  done:     'bg-primary-500',
  current:  'bg-ink-200',
  upcoming: 'bg-ink-200',
};

export const Stepper: React.FC<StepperProps> = ({
  items,
  orientation = 'horizontal',
  className = '',
  ...rest
}) => {
  const isVertical = orientation === 'vertical';

  const wrapperClasses = [
    'flex w-full m-0 p-0 list-none',
    isVertical ? 'flex-col items-stretch' : 'items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const stepClasses = isVertical
    ? 'relative flex flex-row items-start gap-3 min-h-[52px] text-left'
    : 'relative flex-1 flex flex-col items-center gap-2 text-center';

  return (
    <ol className={wrapperClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        const lineClasses = isVertical
          ? `absolute left-[15px] top-8 bottom-[-16px] w-0.5 ${LINE_STATE[item.state]}`
          : `absolute top-4 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 ${LINE_STATE[item.state]}`;

        return (
          <li
            key={idx}
            className={stepClasses}
            aria-current={item.state === 'current' ? 'step' : undefined}
          >
            <div className={`${CIRCLE_BASE} ${CIRCLE_STATE[item.state]}`}>
              {item.state === 'done' ? <Check size={14} strokeWidth={3} /> : idx + 1}
            </div>

            {isVertical ? (
              <div className="pt-1">
                <p className={`m-0 text-caption font-semibold ${LABEL_STATE[item.state]}`}>
                  {item.label}
                </p>
                {item.description && (
                  <p className="m-0 text-micro text-ink-500">{item.description}</p>
                )}
              </div>
            ) : (
              <p className={`m-0 text-caption font-semibold ${LABEL_STATE[item.state]}`}>
                {item.label}
              </p>
            )}

            {!isLast && <span className={lineClasses} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
