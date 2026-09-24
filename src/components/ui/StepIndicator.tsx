import React from 'react';
import { Check } from 'lucide-react';

export type StepStatus = 'completed' | 'active' | 'upcoming';

export interface Step {
  label: string;
  description?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  /** 'horizontal' works best up to 5 steps; 'vertical' for long or multi-line steps */
  orientation?: 'horizontal' | 'vertical';
  /** Tone used for the active + completed accent */
  tone?: 'primary' | 'warm' | 'sun';
  className?: string;
}

const TONE_ACTIVE: Record<string, string> = {
  primary: 'bg-primary-700 text-white',
  warm:    'bg-secondary-700 text-white',
  sun:     'bg-accent-400 text-ink-900',
};

const TONE_COMPLETED: Record<string, string> = {
  primary: 'bg-primary-100 text-primary-800',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-500',
};

const TONE_CONNECTOR_DONE: Record<string, string> = {
  primary: 'bg-primary-300',
  warm:    'bg-secondary-300',
  sun:     'bg-accent-300',
};

// Texte de marque : cran 800 (doctrine § 2).
const TONE_LABEL_ACTIVE: Record<string, string> = {
  primary: 'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
};

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'active';
  return 'upcoming';
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  tone = 'primary',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <ol className={['flex flex-col', className].filter(Boolean).join(' ')}>
        {steps.map((step, i) => {
          const status = getStatus(i, currentStep);
          const isLast = i === steps.length - 1;
          return (
            <li key={i} className="flex gap-stack-xs">
              {/* Column: bubble + connector */}
              <div className="flex flex-col items-center">
                {/* Bubble */}
                <div
                  className={[
                    'inline-flex items-center justify-center w-8 h-8 rounded-pill shrink-0 text-caption font-semibold tabular-nums transition-all duration-base',
                    status === 'active'    ? TONE_ACTIVE[tone] : '',
                    status === 'completed' ? TONE_COMPLETED[tone] : '',
                    status === 'upcoming'  ? 'bg-ink-100 text-ink-600' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {status === 'completed' ? <Check size={14} strokeWidth={2.5} /> : i + 1}
                </div>
                {/* Connector */}
                {!isLast && (
                  <div
                    className={[
                      'w-0.5 flex-1 mt-1 mb-1 min-h-[24px] rounded-pill transition-all duration-base',
                      i < currentStep ? TONE_CONNECTOR_DONE[tone] : 'bg-ink-200',
                    ].join(' ')}
                  />
                )}
              </div>

              {/* Text — (32 − 26) / 2 = 3 : la première ligne se centre sur la
                  pastille. Libellé 16/600 · 4 · description en légende ink-600. */}
              <div className="pb-stack-md pt-[3px] flex flex-col gap-stack-3xs">
                <p
                  className={[
                    'text-body font-semibold transition-colors duration-base',
                    status === 'active' ? TONE_LABEL_ACTIVE[tone] : '',
                    status === 'completed' ? 'text-ink-600' : '',
                    status === 'upcoming' ? 'text-ink-600' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-caption text-ink-600">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  /* ---- Horizontal ---- */
  return (
    <ol className={['flex items-start gap-0', className].filter(Boolean).join(' ')}>
      {steps.map((step, i) => {
        const status = getStatus(i, currentStep);
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="flex-1 flex flex-col items-center relative">
            {/* Connector left */}
            {i > 0 && (
              <div
                className={[
                  'absolute left-0 right-1/2 top-4 h-0.5 -translate-y-1/2 transition-all duration-base',
                  i <= currentStep ? TONE_CONNECTOR_DONE[tone] : 'bg-ink-200',
                ].join(' ')}
              />
            )}
            {/* Connector right */}
            {!isLast && (
              <div
                className={[
                  'absolute left-1/2 right-0 top-4 h-0.5 -translate-y-1/2 transition-all duration-base',
                  i < currentStep ? TONE_CONNECTOR_DONE[tone] : 'bg-ink-200',
                ].join(' ')}
              />
            )}

            {/* Bubble */}
            <div
              className={[
                'relative z-base inline-flex items-center justify-center w-8 h-8 rounded-pill shrink-0 text-caption font-semibold tabular-nums transition-all duration-base',
                status === 'active'    ? TONE_ACTIVE[tone] : '',
                status === 'completed' ? TONE_COMPLETED[tone] : '',
                status === 'upcoming'  ? 'bg-ink-100 text-ink-600' : '',
              ].filter(Boolean).join(' ')}
            >
              {status === 'completed' ? <Check size={14} strokeWidth={2.5} /> : i + 1}
            </div>

            {/* Label */}
            {/* Libellé en légende 13 (il était à 11 px, le registre des
                étiquettes), 8 px sous la pastille ; description 4 px dessous. */}
            <p
              className={[
                'text-caption font-semibold text-center mt-stack-xs px-1 transition-colors duration-base',
                status === 'active' ? TONE_LABEL_ACTIVE[tone] : '',
                status === 'completed' ? 'text-ink-600' : '',
                status === 'upcoming' ? 'text-ink-600' : '',
              ].filter(Boolean).join(' ')}
            >
              {step.label}
            </p>
            {step.description && (
              <p className="text-caption text-ink-600 text-center mt-stack-3xs px-1 hidden sm:block">
                {step.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
