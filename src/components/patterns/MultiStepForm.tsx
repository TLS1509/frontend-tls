import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../core/Button';
import { Card } from '../core/Card';

export interface FormStep {
  id: number;
  title: string;
  description?: string;
  content?: React.ReactNode;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onStepClick?: (stepId: number) => void;
  children?: React.ReactNode;
  showProgressBar?: boolean;
  showStepIndicators?: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  currentStep,
  onNext,
  onBack,
  onStepClick,
  children,
  showProgressBar = true,
  showStepIndicators = true,
}) => {
  const progress = (currentStep / steps.length) * 100;
  const step = steps[currentStep - 1];

  return (
    <div className="flex flex-col gap-7">
      {showProgressBar && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 rounded-pill bg-ink-100 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-pill bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-[width] duration-500 ease-out shadow-brand-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-bold text-primary-700 whitespace-nowrap min-w-[3.5rem] text-right">
            {currentStep} / {steps.length}
          </span>
        </div>
      )}

      {showStepIndicators && (
        <div
          className="grid gap-2 relative"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((s, idx) => {
            const isActive = s.id === currentStep;
            const isCompleted = s.id < currentStep;
            const isClickable = onStepClick && (isCompleted || isActive);
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={s.id}
                onClick={() => isClickable && onStepClick?.(s.id)}
                className={[
                  'relative flex flex-col items-center gap-2 transition-all',
                  isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default',
                ].join(' ')}
              >
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={[
                      'absolute top-5 left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] h-0.5 rounded-full transition-colors',
                      isCompleted ? 'bg-success-base' : 'bg-ink-200',
                    ].join(' ')}
                  />
                )}

                <div
                  className={[
                    'relative inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-body-sm transition-all duration-200',
                    isCompleted
                      ? 'bg-gradient-to-br from-success-base to-success-fg text-white shadow-md ring-4 ring-success-bg'
                      : isActive
                      ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-brand-sm ring-4 ring-primary-100 scale-110'
                      : 'bg-white text-ink-400 ring-2 ring-ink-200',
                  ].join(' ')}
                >
                  {isCompleted ? <CheckCircle2 size={20} strokeWidth={2.5} /> : s.id}
                </div>

                <div className="text-center">
                  <span
                    className={[
                      'block text-caption font-semibold leading-tight',
                      isActive ? 'text-ink-900' : isCompleted ? 'text-success-fg' : 'text-ink-500',
                    ].join(' ')}
                  >
                    {s.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Card>
        {step && (
          <div className="mb-6 pb-6 border-b border-ink-200">
            <span className="inline-block text-caption font-bold uppercase tracking-wider text-primary-600 mb-2">
              Étape {step.id} / {steps.length}
            </span>
            <h2 className="m-0 mb-2 font-display text-h2 font-bold text-ink-900 leading-tight">
              {step.title}
            </h2>
            {step.description && (
              <p className="m-0 text-body text-ink-500 leading-relaxed">{step.description}</p>
            )}
          </div>
        )}

        {children || step?.content}
      </Card>

      <div className="flex justify-between gap-3">
        <Button onClick={onBack} disabled={currentStep === 1} variant="secondary">
          ← Précédent
        </Button>
        <Button onClick={onNext} disabled={currentStep === steps.length}>
          {currentStep === steps.length ? 'Terminer' : 'Suivant'} →
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
