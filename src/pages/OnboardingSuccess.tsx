import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Stepper } from '../components/ui/Stepper';
import { CongratulationsCard } from '../components/patterns/CongratulationsCard';
import { NextStepsGrid } from '../components/patterns/NextStepsGrid';
import type { NextStepItem } from '../components/patterns/NextStepsGrid';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';

export default function OnboardingSuccess() {
  const navigate = useNavigate();

  const nextSteps: NextStepItem[] = [
    {
      id: 'parcours',
      icon: <BookOpen size={22} />,
      title: 'Explore tes parcours',
      description: "Découvre les parcours adaptés à ton profil Dreyfus et commence ta première leçon.",
      cta: 'Voir les parcours',
      tone: 'brand',
      onClick: () => navigate('/learning-paths'),
    },
    {
      id: 'coach',
      icon: <GraduationCap size={22} />,
      title: 'Réserve ton coach',
      description: 'Planifie une première session de coaching pour accélérer ta progression.',
      cta: 'Réserver une session',
      tone: 'warm',
      onClick: () => navigate('/coaching'),
    },
    {
      id: 'passeport',
      icon: <Target size={22} />,
      title: 'Consulte ton Passeport',
      description: 'Ton radar de compétences initial est prêt. Définis tes premiers objectifs.',
      cta: 'Voir mon passeport',
      tone: 'brand',
      onClick: () => navigate('/passeport'),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-page-ambient">
      <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-10 pt-14 md:pt-page pb-page flex flex-col gap-section-lg">

        <Stepper items={buildOnboardingStepperItems('pret')} orientation="horizontal" />

        <CongratulationsCard
          tone="brand"
          badgeLabel="Profil complété !"
          title="Bienvenue sur The Learning Society"
          summary="Ton profil est configuré et ton passeport de compétences est prêt. Tu peux maintenant commencer ton parcours d'apprentissage personnalisé."
          xp={{ earned: 150, current: 150, max: 500, levelLabel: 'Onboarding terminé' }}
        />

        <section className="w-full flex flex-col gap-stack">
          <h2 className="text-h3 font-display font-semibold text-ink-900 text-center m-0">
            Par où commencer ?
          </h2>
          <NextStepsGrid items={nextSteps} columns={3} />
        </section>

        <div className="flex flex-col items-center gap-stack w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            trailingIcon={<ArrowRight size={18} />}
            onClick={() => navigate('/dashboard?firstTime=1')}
            className="w-full sm:w-auto min-w-max"
          >
            Accéder à mon tableau de bord
          </Button>
          <button
            type="button"
            onClick={() => navigate('/onboarding/tutorial')}
            className="text-caption text-ink-400 hover:text-primary-700 underline underline-offset-2 transition-colors duration-fast bg-transparent border-0 cursor-pointer p-0"
          >
            Revoir le tutoriel de la plateforme
          </button>
        </div>
      </div>
    </main>
  );
}
