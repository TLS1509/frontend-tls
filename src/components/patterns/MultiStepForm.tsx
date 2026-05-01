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
 * Uses TLS design tokens throughout.
 */

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
      {/* Progress Bar */}
      {showProgressBar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: '6px',
                borderRadius: 'var(--r-pill)',
                background: 'var(--surface-muted)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--tls-primary-500)',
                  width: `${progress}%`,
                  transition: 'width var(--dur-3)',
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontSize: 'var(--t-caption)',
              fontWeight: 600,
              color: 'var(--tls-primary-500)',
              minWidth: '60px',
              textAlign: 'right',
            }}
          >
            {currentStep} / {steps.length}
          </span>
        </div>
      )}

      {/* Step Indicators */}
      {showStepIndicators && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 'var(--s-2)' }}>
          {steps.map((s) => {
            const isActive = s.id === currentStep;
            const isCompleted = s.id < currentStep;
            return (
              <div
                key={s.id}
                onClick={() => onStepClick?.(s.id)}
                style={{
                  padding: 'var(--s-3)',
                  borderRadius: 'var(--r-lg)',
                  border: isActive
                    ? '2px solid var(--tls-primary-500)'
                    : '1px solid var(--border)',
                  background: isActive
                    ? 'var(--tls-primary-50)'
                    : isCompleted
                      ? 'var(--tls-success-50)'
                      : 'var(--surface)',
                  cursor: onStepClick ? 'pointer' : 'default',
                  textAlign: 'center',
                  transition: 'all var(--dur-2)',
                }}
                onMouseEnter={(e) => {
                  if (onStepClick)
                    (e.currentTarget as HTMLDivElement).style.transform =
                      'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  if (onStepClick)
                    (e.currentTarget as HTMLDivElement).style.transform =
                      'translateY(0)';
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--t-h4)',
                    fontWeight: 700,
                    color: isActive
                      ? 'var(--tls-primary-600)'
                      : isCompleted
                        ? 'var(--tls-success-600)'
                        : 'var(--text-soft)',
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : s.id}
                </div>
                <span
                  style={{
                    fontSize: 'var(--t-micro)',
                    color: 'var(--text-soft)',
                    display: 'block',
                    marginTop: 'var(--s-1)',
                  }}
                >
                  Étape {s.id}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      <Card style={{ padding: 'var(--s-8)' }}>
        {step && (
          <>
            <h2
              style={{
                fontSize: 'var(--t-h3)',
                fontWeight: 700,
                color: 'var(--text)',
                margin: '0 0 var(--s-2)',
              }}
            >
              {step.title}
            </h2>
            {step.description && (
              <p
                style={{
                  fontSize: 'var(--t-body-lg)',
                  color: 'var(--text-soft)',
                  margin: '0 0 var(--s-6)',
                }}
              >
                {step.description}
              </p>
            )}
          </>
        )}

        {/* Custom children or step content */}
        {children || step?.content}
      </Card>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--s-4)',
          justifyContent: 'space-between',
        }}
      >
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
