import type { StepperItem } from '../components/ui/Stepper';

export type OnboardingStepId = 'profil' | 'positionnement' | 'tutoriel' | 'pret';

export const ONBOARDING_STEPS: { id: OnboardingStepId; label: string }[] = [
  { id: 'profil',         label: 'Profil' },
  { id: 'positionnement', label: 'Positionnement' },
  { id: 'tutoriel',       label: 'Tutoriel' },
  { id: 'pret',           label: 'Prêt' },
];

export function buildOnboardingStepperItems(current: OnboardingStepId): StepperItem[] {
  const currentIdx = ONBOARDING_STEPS.findIndex(s => s.id === current);
  return ONBOARDING_STEPS.map((s, i) => ({
    label: s.label,
    state: i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'upcoming',
  }));
}
