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

// Numéro d'étape : un chiffre sous 16 px — Nunito 600, tabulaire (doctrine § 1).
const CIRCLE_BASE =
  'relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-pill border-2 font-body font-semibold tabular-nums text-caption shrink-0 transition-[background-color,border-color,box-shadow,transform] duration-base ease-emphasis';

const CIRCLE_STATE: Record<StepperState, string> = {
  done:     'bg-success-vivid border-success-vivid text-white shadow-sm',
  current:  'bg-white border-primary-600 text-primary-700 shadow-brand-sm ring-4 ring-primary-100 scale-110',
  upcoming: 'bg-white border-ink-200 text-ink-600',
};

/* Libellés : l'étape courante en emphase (600, ink-900), les autres en texte
   (400). À venir en ink-600 — ink-500 est réservé aux placeholders, et 500
   aux puces. */
const LABEL_STATE: Record<StepperState, string> = {
  done:     'text-success-fg',
  current:  'text-ink-900 font-semibold',
  upcoming: 'text-ink-600',
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
    isVertical ? 'flex-col items-stretch gap-tight' : 'items-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const stepClasses = isVertical
    ? 'relative flex flex-row items-start gap-stack-xs min-h-[60px] text-left'
    : 'relative flex-1 min-w-0 basis-0 flex flex-col items-center gap-stack-xs text-center';

  return (
    <ol className={wrapperClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        const lineClasses = isVertical
          ? `absolute left-[19px] top-10 bottom-[-0.25rem] w-0.5 rounded-pill ${LINE_STATE[item.state]}`
          : `absolute top-5 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5 rounded-pill ${LINE_STATE[item.state]}`;

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
              /* (40 − 26) / 2 = 7 : la première ligne du libellé se centre sur
                 le rond (doctrine § 4). */
              <div className="pt-[7px] flex-1 min-w-0 flex flex-col gap-stack-3xs">
                <p className={`text-body ${LABEL_STATE[item.state]}`}>
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-caption text-ink-600">
                    {item.description}
                  </p>
                )}
              </div>
            ) : (
              /* Légende 13 à toutes les largeurs : elle tombait à 11 px sur
                 mobile, le registre des étiquettes (`Badge`). */
              <p className={`text-caption break-words ${LABEL_STATE[item.state]}`}>
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
