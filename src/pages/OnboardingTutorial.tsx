import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, BarChart3, Bell, MessageSquare, Compass } from 'lucide-react';
import { StepTutorial } from '../components/patterns/StepTutorial';
import { PageHeader } from '../components/patterns/PageHeader';
import { Stepper } from '../components/ui/Stepper';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { TlsLogo } from '../components/ui/TlsLogo';
import { PageShell } from '../components/layout';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { useOnboardingStore } from '../stores/persistence';

// ─── Mock data ────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = [
  {
    id: 'parcours',
    title: "Tes parcours d'apprentissage",
    description: "La Learning Society propose des parcours structurés autour de 6 compétences clés (H.S.O.). Chaque parcours contient des leçons, des exercices pratiques corrigés par ton coach, et des ressources complémentaires. Commence par le parcours recommandé sur ton profil.",
    icon: <BookOpen size={20} />,
  },
  {
    id: 'coaching',
    title: 'Ton coach personnel',
    description: "Ton coach expert t'accompagne tout au long de ton parcours. Réserve des sessions individuelles, soumets tes exercices pour correction, et échange via la messagerie privée. Ton coach analyse ta progression et adapte ses recommandations.",
    icon: <GraduationCap size={20} />,
  },
  {
    id: 'passeport',
    title: 'Le Passeport Compétences',
    description: "Ton Passeport visualise ta progression sur l'échelle Dreyfus (D1 Novice → D5 Expert) pour chaque compétence. Il évolue automatiquement au fil de tes activités. Tu peux définir des objectifs et suivre leur avancement.",
    icon: <Target size={20} />,
  },
  {
    id: 'analytics',
    title: 'Ton tableau de bord',
    description: "Le Dashboard centralise toutes tes données : XP accumulés, streak d'activité, progression Dreyfus, prochaines sessions coaching, et contenu de veille personnalisé. Consulte-le chaque matin pour savoir par où commencer.",
    icon: <BarChart3 size={20} />,
  },
  {
    id: 'notifications',
    title: 'Notifications & rappels',
    description: "Active les notifications pour ne manquer aucune session coaching, aucune correction reçue, et rester informé de tes objectifs. Tu peux gérer tes préférences dans ton profil à tout moment.",
    icon: <Bell size={20} />,
  },
  {
    id: 'communaute',
    title: 'La communauté SBO',
    description: "Échange avec d'autres apprenants dans les espaces de collaboration, partage tes insights via le journal de bord, et consulte avec eux la veille professionnelle hebdomadaire. L'apprentissage social accélère la progression.",
    icon: <MessageSquare size={20} />,
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
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-warm" aria-hidden />
      <AmbientBlobs intensity="subtle" />

      {/* Gouttière standard : PageShell la délègue au <main> d'AppLayout, et
          cette page est rendue hors de la coque — elle touchait le bord à 375 px. */}
      <div className="px-4 sm:px-6 lg:px-10">
      <PageShell width="content" className="relative z-base">

        {/* ── Brand bar ── */}
        <div className="flex items-center justify-between">
          <div className="w-24" />
          <a href="/dashboard" aria-label="The Learning Society — retour accueil" className="flex items-center gap-stack-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={36} variant="color" withBubble />
          </a>
          <div className="w-24 flex justify-end">
            {/* « Passer » saute CETTE étape, pas l'onboarding : il mène à l'écran de fin, qui pose isOnboarded.
                Il envoyait au tableau de bord sans marquer l'onboarding fait. */}
            <button
              onClick={() => navigate('/onboarding/success')}
              className="font-body text-caption text-ink-600 hover:text-ink-900 transition-colors duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm min-h-touch flex items-center"
            >
              Passer
            </button>
          </div>
        </div>

        <Stepper items={buildOnboardingStepperItems('tutoriel', onboardingStore.accountType)} orientation="horizontal" />

        {/* Passe typographique du 2026-09-24 : une seule largeur (768 ; `max-w-3xl`
            perdait contre `width="page"`, la carte s'étalait sur 1 152 px), le
            haut de page au padding de la coque ; l'en-tête et le tutoriel
            forment un bloc (48 au-dessus, 32 dessous) ; `PageHeader` centré :
            surtitre 13 / 600 ink-600, h1 à 36, chapô 18 ink-700. */}
        <div className="flex flex-col gap-section">
          <PageHeader
            align="center"
            variant="tight"
            eyebrow={{ icon: <Compass size={14} aria-hidden="true" />, text: 'Tutoriel plateforme' }}
            title="Découvre la plateforme"
            description="Un tour rapide des fonctionnalités clés pour démarrer efficacement."
          />

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
      </PageShell>
      </div>
    </main>
  );
}
