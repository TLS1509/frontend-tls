import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../core/Button';
import { Badge } from '../ui/Badge';
import { IconChip, type IconChipTone } from '../ui/IconChip';
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

/* La pastille de l'étape est un `IconChip` (arbitrage n°3, 2026-09-24). Elle
   était faite main : 56 px au rayon 20 — hors de l'échelle de la pastille
   d'icône (24 · 32 · 40 · 48) — et son glyphe au cran 600 (500 pour l'or :
   2,20:1 sur accent-50, sous le 3:1 d'un objet graphique ; 3,26 et 3,65 pour
   le teal et l'orange). `IconChip` le porte au cran 800 : teal 6,31, orange
   9,49, or 7,64. `primary` s'y appelle `brand`. */
const TONE_CHIP: Record<StepTutorialTone, IconChipTone> = {
  primary: 'brand',
  warm: 'warm',
  sun: 'sun',
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

  /* `@container` : la rangée de navigation répond à la largeur du tutoriel,
     pas à celle de la fenêtre (deux boîtes : le conteneur ici, la requête sur
     les points de progression, plus bas). */
  return (
    <div className={['@container flex flex-col gap-section', className].filter(Boolean).join(' ')}>
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
            icône | (titre h3 · 8 · description 16 ink-700) · 24 · action.
            La description vit dans la colonne du titre, comme dans
            `SectionHeader` : sous l'icône de 56 px, elle tombait à 23 px du
            titre — plus loin que le titre ne l'était du compteur. Padding
            24 / 32 (le `p-7`, 28 px, n'était pas un pas). */}
        <div className="p-stack-lg sm:p-section flex flex-col">
          {/* Step badge */}
          <Badge variant="neutral" className="self-start select-none">
            {activeStep + 1} / {steps.length}
          </Badge>

          {/* Icône | texte — le texte descend de (48 − 36) / 2 = 6 px pour
              centrer la PREMIÈRE ligne du titre sur la pastille (doctrine § 4 ;
              c'était 10 px pour l'ancienne bulle de 56).
              Titre d'étape : un h2 à 28 (2026-09-24). C'était un h2 dessiné à
              20, le pas d'un titre de carte : le niveau disait « section », la
              taille disait « bloc ». Posé sous le h1 de la page (onboarding),
              il nomme le contenu principal — c'est un h2, et la taille suit
              le niveau (doctrine § 6). */}
          <div className="mt-stack-sm flex items-start gap-stack">
            {step.icon && (
              <IconChip size="lg" tone={TONE_CHIP[tone]}>
                {step.icon}
              </IconChip>
            )}
            <div className={['flex flex-col gap-stack-xs min-w-0', step.icon ? 'mt-1.5' : ''].filter(Boolean).join(' ')}>
              <h2 className="font-display text-h2 text-ink-900 text-balance">
                {step.title}
              </h2>
              <p className="font-body text-body text-ink-700 max-w-prose">
                {step.description}
              </p>
            </div>
          </div>

          {/* Optional CTA — une action de contexte, dans l'étape : `soft` au
              ton du tutoriel (arbitrage n°19 ; elle était en `outline`,
              réservé à Annuler). « Suivant » garde le `solid`. */}
          {step.cta && step.onCta && (
            <Button emphasis="soft" tone={PAGE_TONE_TO_BUTTON[tone]} size="md" onClick={step.onCta} className="self-start mt-stack-lg">
              {step.cta}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation — arbitrage n°19 : « Suivant / Compris » est l'action
          principale de l'écran (`solid`), « Précédent » un `ghost`. Ils
          étaient en `soft` et en `outline`.
          « Précédent » ouvre la rangée : son libellé se cale sur le bord de la
          carte (`flush`). À 375, la rangée débordait de 24 px — « Précédent »
          (141), les points (104) et « Suivant » (122) pour 343 de place, sans
          aucun écart entre eux. Sous 28rem de tutoriel, les points
          s'effacent : le compteur « n / N » et la barre du haut de la carte
          disent déjà où on en est. Au-dessus, 16 px les séparent des
          boutons. */}
      <div className="flex items-center justify-between gap-stack">
        <Button
          emphasis="ghost"
          tone="neutral"
          size="md"
          flush="start"
          leadingIcon={<ChevronLeft size={16} />}
          onClick={handlePrev}
          disabled={isFirst}
        >
          Précédent
        </Button>

        {/* Progress dots */}
        <div className="@max-md:hidden flex items-center gap-stack-xs" role="tablist" aria-label="Progression du tutoriel">
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
          emphasis="solid"
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
