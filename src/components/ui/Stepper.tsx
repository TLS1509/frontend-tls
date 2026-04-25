import React from 'react';

/**
 * Stepper — Source of truth: design-system/spec.json → components.Stepper
 *
 * Linear sequential process. 3–5 steps max. Orientations: horizontal | vertical.
 */

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

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Stepper: React.FC<StepperProps> = ({
  items,
  orientation = 'horizontal',
  className = '',
  ...rest
}) => {
  const classes = [
    'stepper',
    orientation === 'vertical' && 'stepper--vertical',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ol className={classes} {...rest}>
      {items.map((item, idx) => {
        const stateClass =
          item.state === 'done'
            ? 'stepper__step--done'
            : item.state === 'current'
            ? 'stepper__step--current'
            : 'stepper__step--upcoming';

        return (
          <li
            key={idx}
            className={['stepper__step', stateClass].filter(Boolean).join(' ')}
            aria-current={item.state === 'current' ? 'step' : undefined}
          >
            <div className="stepper__circle">
              {item.state === 'done' ? CHECK : idx + 1}
            </div>
            {orientation === 'vertical' ? (
              <div className="stepper__body">
                <p className="stepper__label">{item.label}</p>
                {item.description && <p className="stepper__desc">{item.description}</p>}
              </div>
            ) : (
              <p className="stepper__label">{item.label}</p>
            )}
            {idx < items.length - 1 && <span className="stepper__line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
