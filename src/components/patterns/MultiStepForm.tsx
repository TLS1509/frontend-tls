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
    <div className="flex flex-col gap-6">
      {showProgressBar && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-pill bg-ink-100 overflow-hidden">
            <div
              className="h-full rounded-pill bg-gradient-to-r from-primary-500 to-primary-700 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-caption font-semibold text-ink-700 whitespace-nowrap">
            {currentStep} / {steps.length}
          </span>
        </div>
      )}

      {showStepIndicators && (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((s) => {
            const isActive = s.id === currentStep;
            const isCompleted = s.id < currentStep;

            return (
              <div
                key={s.id}
                onClick={() => onStepClick?.(s.id)}
                className={[
                  'flex flex-col items-center gap-2 transition-opacity',
                  onStepClick ? 'cursor-pointer hover:opacity-80' : '',
                  !isActive && !isCompleted ? 'opacity-50' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div
                  className={[
                    'inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-body-sm transition-colors',
                    isCompleted
                      ? 'bg-success-base text-white'
                      : isActive
                      ? 'bg-primary-500 text-white shadow-brand-sm'
                      : 'bg-ink-100 text-ink-500',
                  ].join(' ')}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : s.id}
                </div>
                <span
                  className={[
                    'text-caption font-medium',
                    isActive ? 'text-ink-900' : 'text-ink-500',
                  ].join(' ')}
                >
                  Étape {s.id}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <Card>
        {step && (
          <div className="mb-5">
            <h2 className="m-0 mb-2 font-display text-h3 font-bold text-ink-900">{step.title}</h2>
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
