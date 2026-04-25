import React from 'react';

/**
 * Steps — Source of truth: design-system/spec.json → components.Progress.subComponents.Steps
 *
 * Sequential checklist of named steps within a single task/journey.
 * States: done (strikethrough), current (ring glow), upcoming (gray marker).
 */

export type StepState = 'done' | 'current' | 'upcoming';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  state: StepState;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  items: StepItem[];
}

export const Steps: React.FC<StepsProps> = ({ items, className = '', ...rest }) => (
  <ol className={['steps', className].filter(Boolean).join(' ')} {...rest}>
    {items.map((item, idx) => {
      const stateClass =
        item.state === 'done'
          ? 'step--done'
          : item.state === 'current'
          ? 'step--current'
          : '';
      return (
        <li
          key={idx}
          className={['step', stateClass].filter(Boolean).join(' ')}
          aria-current={item.state === 'current' ? 'step' : undefined}
        >
          <p className="step__title">{item.title}</p>
          {item.description && <p className="step__desc">{item.description}</p>}
        </li>
      );
    })}
  </ol>
);

export default Steps;
