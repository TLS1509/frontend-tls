import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, BarChart3, Bell, MessageSquare, Compass } from 'lucide-react';
import { StepTutorial } from '../components/patterns/StepTutorial';
import { Stepper } from '../components/ui/Stepper';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { TlsLogo } from '../components/ui/TlsLogo';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { useOnboardingStore } from '../stores/persistence';

// ─── Mock data ────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = [
  {
    id: 'parcours',
    title: "Tes parcours d'apprentissage",
    description: "La Learning Society propose des parcours structurés autour de 6 compétences clés (H.S.O.). Chaque parcours contient des leçons, des exercices pratiques corrigés par ton coach, et des ressources complémentaires. Commence par le parcours recommandé sur ton profil.",
    icon: <BookOpen size={22} />,
  },
  {
    id: 'coaching',
    title: 'Ton coach personnel',
    description: "Ton coach expert t'accompagne tout au long de ton parcours. Réserve des sessions individuelles, soumets tes exercices pour correction, et échange via la messagerie privée. Ton coach analyse ta progression et adapte ses recommandations.",
    icon: <GraduationCap size={22} />,
  },
  {
    id: 'passeport',
    title: 'Le Passeport Compétences',
    description: "Ton Passeport visualise ta progression sur l'échelle Dreyfus (D1 Novice → D5 Expert) pour chaque compétence. Il évolue automatiquement au fil de tes activités. Tu peux définir des objectifs et suivre leur avancement.",
    icon: <Target size={22} />,
  },
  {
    id: 'analytics',
    title: 'Ton tableau de bord',
    description: "Le Dashboard centralise toutes tes données : XP accumulés, streak d'activité, progression Dreyfus, prochaines sessions coaching, et contenu de veille personnalisé. Consulte-le chaque matin pour savoir par où commencer.",
    icon: <BarChart3 size={22} />,
  },
  {
    id: 'notifications',
    title: 'Notifications & rappels',
    description: "Active les notifications pour ne manquer aucune session coaching, aucune correction reçue, et rester informé de tes objectifs. Tu peux gérer tes préférences dans ton profil à tout moment.",
    icon: <Bell size={22} />,
  },
  {
    id: 'communaute',
    title: 'La communauté SBO',
    description: "Échange avec d'autres apprenants dans les espaces de collaboration, partage tes insights via le journal de bord, et consultez ensemble la veille professionnelle hebdomadaire. L'apprentissage social accélère la progression.",
    icon: <MessageSquare size={22} />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingTutorial() {
  const navigate = useNavigate();
  const onboardingStore = useOnboardingStore();
  const [step, setStep] = useState(0);

  const handleDone = () => {
    onboardingStore.markStepComplete('tutorial');
    onboardingStore.goToStep('success');
    navigate('/onboarding/success');
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
      <AmbientBlobs intensity="subtle" />

      <div className="relative z-base max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-section flex flex-col gap-section-lg">

        {/* ── Brand bar ── */}
        <div className="flex items-center justify-between">
          <div className="w-24" />
          <a href="/dashboard" aria-label="The Learning Society — retour accueil" className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={36} variant="color" withBubble />
          </a>
          <div className="w-24 flex justify-end">
            <button
              onClick={() => navigate('/dashboard')}
              className="font-body text-caption text-ink-500 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center"
            >
              Passer
            </button>
          </div>
        </div>

        <Stepper items={buildOnboardingStepperItems('tutoriel', onboardingStore.accountType)} orientation="horizontal" />

        <header className="flex flex-col gap-tight text-center">
          <p className="m-0 inline-flex items-center justify-center gap-2 font-body text-caption font-semibold uppercase tracking-wider text-secondary-600">
            <Compass size={14} aria-hidden="true" />
            Tutoriel plateforme
          </p>
          <h1 className="m-0 font-display text-h2 font-extrabold tracking-display text-ink-900 leading-tight">
            Découvre la plateforme
          </h1>
          <p className="m-0 font-body text-body text-ink-500 leading-relaxed">
            Un tour rapide des fonctionnalités clés pour démarrer efficacement.
          </p>
        </header>

        <StepTutorial
          steps={TUTORIAL_STEPS}
          currentStep={step}
          tone="warm"
          onNext={() => setStep((s) => Math.min(s + 1, TUTORIAL_STEPS.length - 1))}
          onPrev={() => setStep((s) => Math.max(s - 1, 0))}
          onComplete={handleDone}
          onSkip={handleDone}
        />
      </div>
    </main>
  );
}
