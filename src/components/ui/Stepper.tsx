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
  'relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-body font-bold text-caption shrink-0 transition-all duration-200';

const CIRCLE_STATE: Record<StepperState, string> = {
  done:     'bg-success-base border-success-base text-white shadow-sm',
  current:  'bg-white border-primary-600 text-primary-700 shadow-brand-sm ring-4 ring-primary-100 scale-110',
  upcoming: 'bg-white border-ink-200 text-ink-400',
};

const LABEL_STATE: Record<StepperState, string> = {
  done:     'text-success-base font-semibold',
  current:  'text-ink-900 font-bold',
  upcoming: 'text-ink-500 font-medium',
};

const LINE_STATE: Record<StepperState, string> = {
  done:     'bg-success-base/70',
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
    isVertical ? 'flex-col items-stretch gap-1' : 'items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const stepClasses = isVertical
    ? 'relative flex flex-row items-start gap-3 min-h-[60px] text-left'
    : 'relative flex-1 min-w-0 basis-0 flex flex-col items-center gap-2 text-center';

  return (
    <ol className={wrapperClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        const lineClasses = isVertical
          ? `absolute left-[19px] top-10 bottom-[-0.25rem] w-0.5 rounded-full ${LINE_STATE[item.state]}`
          : `absolute top-5 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5 rounded-full ${LINE_STATE[item.state]}`;

        return (
          <li
            key={idx}
            className={stepClasses}
            aria-current={item.state === 'current' ? 'step' : undefined}
          >
            <div className={`${CIRCLE_BASE} ${CIRCLE_STATE[item.state]}`}>
              {item.state === 'done' ? <Check size={16} strokeWidth={3} /> : idx + 1}
            </div>

            {isVertical ? (
              <div className="pt-2 flex-1 min-w-0">
                <p className={`m-0 text-body-sm leading-snug ${LABEL_STATE[item.state]}`}>
                  {item.label}
                </p>
                {item.description && (
                  <p className="m-0 mt-0.5 text-caption text-ink-500 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            ) : (
              <p className={`m-0 text-[11px] sm:text-caption leading-tight break-words ${LABEL_STATE[item.state]}`}>
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
