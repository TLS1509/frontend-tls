import type { StepperItem } from '../components/ui/Stepper';
import type { OnboardingAccountType } from '../stores/persistence';

/**
 * Macro-steps of the onboarding flow (visible in the top Stepper).
 *
 * Note: this is the *visual* stepper for the user — distinct from the internal
 * `OnboardingStep` granular states in the store. Several internal steps map to
 * the same macro-step (e.g. profile/goals/rhythm/confirmation → "profil").
 */
export type OnboardingStepId = 'profil' | 'positionnement' | 'paiement' | 'tutoriel' | 'pret';

const ALL_STEPS: { id: OnboardingStepId; label: string }[] = [
  { id: 'profil',         label: 'Profil' },
  { id: 'positionnement', label: 'Positionnement' },
  { id: 'paiement',       label: 'Paiement' },
  { id: 'tutoriel',       label: 'Tutoriel' },
  { id: 'pret',           label: 'Prêt' },
];

/**
 * Returns the visible stepper sequence based on account type.
 * - `individual` : 5 steps (includes payment)
 * - `invited`    : 4 steps (skips payment — company credits or invited role)
 */
export function getOnboardingMacroSteps(
  accountType: OnboardingAccountType = 'individual'
): { id: OnboardingStepId; label: string }[] {
  if (accountType === 'invited') {
    return ALL_STEPS.filter((s) => s.id !== 'paiement');
  }
  return ALL_STEPS;
}

export function buildOnboardingStepperItems(
  current: OnboardingStepId,
  accountType: OnboardingAccountType = 'individual'
): StepperItem[] {
  const steps = getOnboardingMacroSteps(accountType);
  const currentIdx = steps.findIndex((s) => s.id === current);
  return steps.map((s, i) => ({
    label: s.label,
    state: i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'upcoming',
  }));
}

/** Legacy export — kept for back-compat with any reads of step list. */
export const ONBOARDING_STEPS = ALL_STEPS.filter((s) => s.id !== 'paiement');
