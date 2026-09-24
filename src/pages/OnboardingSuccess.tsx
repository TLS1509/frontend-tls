import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Stepper } from '../components/ui/Stepper';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { TlsLogo } from '../components/ui/TlsLogo';
import { PageShell } from '../components/layout';
import { CongratulationsCard } from '../components/patterns/CongratulationsCard';
import { NextStepsGrid } from '../components/patterns/NextStepsGrid';
import type { NextStepItem } from '../components/patterns/NextStepsGrid';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { useOnboardingStore, useUserProfileStore } from '../stores/persistence';

export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const onboardingStore = useOnboardingStore();
  const profileStore = useUserProfileStore();

  // Mark final step on mount so subsequent visits know onboarding is fully done.
  // Pose aussi `isOnboarded` sur le profil : sans lui, le tableau de bord
  // n'atteignait jamais son démarrage à froid (`EmptyDashboardState`) et
  // ouvrait sur l'historique fictif d'un autre (audit du 23/09). À la
  // première fin d'onboarding seulement, le compteur de visites repart de
  // zéro : c'est ce qui fait de la prochaine visite la première.
  React.useEffect(() => {
    onboardingStore.markStepComplete('success');
    onboardingStore.goToStep('success');
    const profil = profileStore.get();
    if (!profil.isOnboarded) {
      profileStore.patch({
        isOnboarded: true,
        dashboardVisitCount: 0,
        onboardingStep: 'completed',
        completedAt: new Date().toISOString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSteps: NextStepItem[] = [
    {
      id: 'parcours',
      icon: <BookOpen size={20} />,
      title: 'Explore tes parcours',
      description: "Découvre les parcours adaptés à ton profil Dreyfus et commence ta première leçon.",
      cta: 'Voir les parcours',
      tone: 'brand',
      onClick: () => navigate('/learning-paths'),
    },
    {
      id: 'coach',
      icon: <GraduationCap size={20} />,
      title: 'Réserve ton coach',
      description: 'Planifie une première session de coaching pour accélérer ta progression.',
      cta: 'Réserver une session',
      tone: 'warm',
      onClick: () => navigate('/coaching'),
    },
    {
      id: 'passeport',
      icon: <Target size={20} />,
      title: 'Consulte ton Passeport',
      description: 'Ton radar de compétences initial est prêt. Définis tes premiers objectifs.',
      cta: 'Voir mon passeport',
      tone: 'brand',
      onClick: () => navigate('/passeport'),
    },
  ];

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      {/* Sun gradient — celebration tone (orange→white→yellow) */}
      <div className="fixed inset-0 -z-10 bg-gradient-page-ambient-sun" aria-hidden />
      <AmbientBlobs intensity="normal" />

      {/* Gouttière standard : PageShell la délègue au <main> d'AppLayout, et
          cette page est rendue hors de la coque — elle touchait le bord à 375 px. */}
      <div className="px-4 sm:px-6 lg:px-10">
      <PageShell width="content" className="relative z-base">

        {/* ── Brand bar ── */}
        <div className="flex items-center justify-center">
          <a href="/dashboard" aria-label="The Learning Society" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm">
            <TlsLogo size={40} variant="color" withBubble />
          </a>
        </div>

        <Stepper items={buildOnboardingStepperItems('pret', onboardingStore.accountType)} orientation="horizontal" />

        <CongratulationsCard
          tone="brand"
          badgeLabel="Profil complété"
          title="Bienvenue sur The Learning Society"
          summary="Ton profil est configuré et ton passeport de compétences est prêt. Tu peux maintenant commencer ton parcours d'apprentissage personnalisé."
          xp={{ earned: 150, current: 150, max: 500, levelLabel: 'Onboarding terminé' }}
        />

        {/* « Par où commencer ? » est une section : h2 à 28 (il était à 20, la
            taille d'un titre de carte). */}
        <section className="w-full flex flex-col gap-stack">
          <h2 className="font-display text-h2 text-ink-900 text-center">
            Par où commencer ?
          </h2>
          <NextStepsGrid items={nextSteps} columns={3} />
        </section>

        <div className="flex flex-col items-center gap-stack w-full sm:w-auto">
          <Button
            emphasis="soft"
            size="lg"
            trailingIcon={<ArrowRight size={18} />}
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto min-w-max"
          >
            Accéder à mon tableau de bord
          </Button>
          <button
            type="button"
            onClick={() => navigate('/onboarding/tutorial')}
            className="text-caption text-ink-600 hover:text-primary-700 underline underline-offset-2 transition-colors duration-fast bg-transparent border-0 cursor-pointer p-0"
          >
            Revoir le tutoriel de la plateforme
          </button>
        </div>
      </PageShell>
      </div>
    </main>
  );
}
