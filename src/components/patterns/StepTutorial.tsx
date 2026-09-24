import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../core/Button';
import { Badge } from '../ui/Badge';
import { PAGE_TONE_TO_BUTTON } from '../../lib/tone-classes';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  cta?: string;
  onCta?: () => void;
}

export type StepTutorialTone = 'primary' | 'warm' | 'sun';

export interface StepTutorialProps {
  steps: TutorialStep[];
  currentStep?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  tone?: StepTutorialTone;
  className?: string;
}

// ─── Tone config ──────────────────────────────────────────────────────────────

const TONE_DOT: Record<StepTutorialTone, string> = {
  primary: 'bg-primary-600',
  warm: 'bg-secondary-500',
  sun: 'bg-accent-400',
};

const TONE_ICON_BG: Record<StepTutorialTone, string> = {
  primary: 'bg-primary-50 text-primary-600',
  warm: 'bg-secondary-50 text-secondary-600',
  sun: 'bg-accent-50 text-accent-500',
};

// ─── StepTutorial ─────────────────────────────────────────────────────────────

export const StepTutorial: React.FC<StepTutorialProps> = ({
  steps,
  currentStep: externalStep,
  onNext,
  onPrev,
  onComplete,
  onSkip,
  tone = 'primary',
  className = '',
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const activeStep = externalStep ?? internalStep;
  const isControlled = externalStep !== undefined;

  const step = steps[activeStep];
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete?.();
    } else {
      onNext?.();
      if (!isControlled) setInternalStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    onPrev?.();
    if (!isControlled) setInternalStep((s) => Math.max(s - 1, 0));
  };

  if (!step) return null;

  return (
    <div className={['flex flex-col gap-section', className].filter(Boolean).join(' ')}>
      {/* Card — glass surface matching the onboarding shell */}
      <div className="rounded-lg bg-white/75 backdrop-blur-glass-medium border border-white/60 shadow-card overflow-hidden">

        {/* Warm progress bar — thin top stripe showing step N/total */}
        <div className="flex h-1 gap-px bg-ink-100/60" aria-hidden="true">
          {steps.map((_, i) => (
            <div
              key={i}
              className={[
                'flex-1 transition-all duration-300 ease-standard',
                i <= activeStep ? TONE_DOT[tone] : 'bg-transparent',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Optional illustration */}
        {step.image && (
          <div className="w-full h-48 bg-ink-50 overflow-hidden">
            <img src={step.image} alt="" className="w-full h-full object-cover" aria-hidden />
          </div>
        )}

        {/* Anatomie (passe typographique du 2026-09-24) : compteur · 12 ·
            icône + titre h3 · 8 · description 16 ink-700 · 24 · action.
            Padding 24 / 32 (le `p-7`, 28 px, n'était pas un pas). */}
        <div className="p-stack-lg sm:p-section flex flex-col">
          {/* Step badge */}
          <Badge variant="neutral" className="self-start select-none">
            {activeStep + 1} / {steps.length}
          </Badge>

          {/* Icon + title — le titre descend de (56 − 26) / 2 = 15 px pour
              centrer sa PREMIÈRE ligne sur l'icône (doctrine § 4). */}
          <div className="mt-stack-sm flex items-start gap-stack">
            {step.icon && (
              <div className={['w-14 h-14 rounded-xl flex items-center justify-center shrink-0', TONE_ICON_BG[tone]].join(' ')}>
                {step.icon}
              </div>
            )}
            <h2 className={['font-display text-h3 text-ink-900 text-balance', step.icon ? 'mt-[15px]' : ''].filter(Boolean).join(' ')}>
              {step.title}
            </h2>
          </div>

          {/* Description */}
          <p className="mt-stack-xs font-body text-body text-ink-700 max-w-prose">
            {step.description}
          </p>

          {/* Optional CTA */}
          {step.cta && step.onCta && (
            <Button emphasis="outline" size="md" onClick={step.onCta} className="self-start mt-stack-lg">
              {step.cta}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          emphasis="outline"
          size="md"
          leadingIcon={<ChevronLeft size={16} />}
          onClick={handlePrev}
          disabled={isFirst}
        >
          Précédent
        </Button>

        {/* Progress dots */}
        <div className="flex items-center gap-stack-xs" role="tablist" aria-label="Progression du tutoriel">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              role="tab"
              aria-selected={idx === activeStep}
              aria-label={`Étape ${idx + 1}`}
              className={[
                'rounded-pill transition-all duration-base',
                idx === activeStep
                  ? `w-6 h-2 ${TONE_DOT[tone]}`
                  : idx < activeStep
                  ? `w-2 h-2 ${TONE_DOT[tone]} opacity-disabled`
                  : 'w-2 h-2 bg-ink-200',
              ].join(' ')}
            />
          ))}
        </div>

        <Button
          emphasis="soft"
          tone={PAGE_TONE_TO_BUTTON[tone]}
          size="md"
          trailingIcon={isLast ? <Check size={16} /> : <ChevronRight size={16} />}
          onClick={handleNext}
        >
          {isLast ? 'Compris' : 'Suivant'}
        </Button>
      </div>

      {/* Skip link */}
      {onSkip && !isLast && (
        <div className="text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-caption text-ink-600 hover:text-ink-900 underline underline-offset-2 transition-colors duration-fast min-h-touch px-2 py-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Passer le tutoriel
          </button>
        </div>
      )}
    </div>
  );
};

export default StepTutorial;
