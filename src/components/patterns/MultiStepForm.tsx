/**
 * MultiStepForm — Reusable multi-step form pattern
 *
 * Used for Project, Onboarding, CoachingQuestionnaire, etc.
 * Provides:
 * - Step indicators
 * - Progress tracking
 * - Navigation (next/back)
 * - Step content rendering
 *
 * Uses TLS design tokens throughout via CSS classes (BEM naming).
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../core/Button';
import { Card } from '../core/Card';
import './MultiStepForm.css';

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
    <div className="multi-step-form">
      {/* Progress Bar */}
      {showProgressBar && (
        <div className="multi-step-form__progress-section">
          <div className="multi-step-form__progress-track-container">
            <div className="multi-step-form__progress-track">
              <div
                className="multi-step-form__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="multi-step-form__progress-label">
            {currentStep} / {steps.length}
          </span>
        </div>
      )}

      {/* Step Indicators */}
      {showStepIndicators && (
        <div
          className="multi-step-form__indicators"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((s) => {
            const isActive = s.id === currentStep;
            const isCompleted = s.id < currentStep;
            const indicatorClasses = [
              'multi-step-form__indicator',
              isActive && 'multi-step-form__indicator--active',
              isCompleted && 'multi-step-form__indicator--completed',
              onStepClick && 'multi-step-form__indicator--interactive',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={s.id}
                className={indicatorClasses}
                onClick={() => onStepClick?.(s.id)}
              >
                <div className="multi-step-form__indicator-number">
                  {isCompleted ? <CheckCircle2 size={20} /> : s.id}
                </div>
                <span className="multi-step-form__indicator-label">
                  Étape {s.id}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      <Card className="multi-step-form__content">
        {step && (
          <>
            <h2 className="multi-step-form__title">
              {step.title}
            </h2>
            {step.description && (
              <p className="multi-step-form__description">
                {step.description}
              </p>
            )}
          </>
        )}

        {/* Custom children or step content */}
        {children || step?.content}
      </Card>

      {/* Navigation */}
      <div className="multi-step-form__navigation">
        <Button
          onClick={onBack}
          disabled={currentStep === 1}
          variant="secondary"
        >
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
