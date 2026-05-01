import { OnboardingFlow, type OnboardingData } from '../components/onboarding/OnboardingFlow';

interface OnboardingPageUpgradedProps {
  onComplete: (data: OnboardingData) => void;
}

export default function OnboardingPageUpgraded({ onComplete }: OnboardingPageUpgradedProps) {
  const handleComplete = (data: OnboardingData) => {
    // Save onboarding data (would normally save to backend/localStorage)
    console.log('Onboarding completed with data:', data);
    localStorage.setItem('onboardingData', JSON.stringify(data));
    
    // Call parent completion handler
    onComplete(data);
  };

  const handleSkip = () => {
    console.log('Onboarding skipped');
    onComplete({
      role: '',
      experience: '',
      goals: [],
      interests: [],
      learningStyle: '',
      availability: '',
    });
  };

  return (
    <OnboardingFlow 
      onComplete={handleComplete}
      onSkip={handleSkip}
    />
  );
}
