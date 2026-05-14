import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, BarChart3, Bell, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { StepTutorial } from '../components/patterns/StepTutorial';

// ─── Mock data ────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = [
  {
    id: 'parcours',
    title: 'Tes parcours d\'apprentissage',
    description: 'La Learning Society propose des parcours structurés autour de 6 compétences clés (H.S.O.). Chaque parcours contient des leçons, des exercices pratiques corrigés par ton coach, et des ressources complémentaires. Commence par le parcours recommandé sur ton profil.',
    icon: <BookOpen size={22} />,
  },
  {
    id: 'coaching',
    title: 'Ton coach personnel',
    description: 'Ton coach expert t\'accompagne tout au long de ton parcours. Réserve des sessions individuelles, soumets tes exercices pour correction, et échange via la messagerie privée. Ton coach analyse ta progression et adapte ses recommandations.',
    icon: <GraduationCap size={22} />,
  },
  {
    id: 'passeport',
    title: 'Le Passeport Compétences',
    description: 'Ton Passeport visualise ta progression sur l\'échelle Dreyfus (D1 Novice → D5 Expert) pour chaque compétence. Il évolue automatiquement au fil de tes activités. Tu peux définir des objectifs et suivre leur avancement.',
    icon: <Target size={22} />,
  },
  {
    id: 'analytics',
    title: 'Ton tableau de bord',
    description: 'Le Dashboard centralise toutes tes données : XP accumulés, streak d\'activité, progression Dreyfus, prochaines sessions coaching, et contenu de veille personnalisé. Consulte-le chaque matin pour savoir par où commencer.',
    icon: <BarChart3 size={22} />,
  },
  {
    id: 'notifications',
    title: 'Notifications & rappels',
    description: 'Active les notifications pour ne manquer aucune session coaching, aucune correction reçue, et rester informé de tes objectifs. Tu peux gérer tes préférences dans ton profil à tout moment.',
    icon: <Bell size={22} />,
  },
  {
    id: 'communaute',
    title: 'La communauté SBO',
    description: 'Échange avec d\'autres apprenants dans les espaces de collaboration, partage tes insights via le journal de bord, et consultez ensemble la veille professionnelle hebdomadaire. L\'apprentissage social accélère la progression.',
    icon: <MessageSquare size={22} />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingTutorial() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Onboarding · Tutoriel"
        title="Découvre la plateforme"
        subtitle="Un tour rapide des fonctionnalités clés pour démarrer efficacement."
        tone="brand"
      />

      <div className="max-w-content mx-auto w-full px-4 md:px-8 py-section">
        <StepTutorial
          steps={TUTORIAL_STEPS}
          currentStep={step}
          tone="primary"
          onNext={() => setStep((s) => Math.min(s + 1, TUTORIAL_STEPS.length - 1))}
          onPrev={() => setStep((s) => Math.max(s - 1, 0))}
          onComplete={() => navigate('/dashboard')}
          onSkip={() => navigate('/dashboard')}
        />
      </div>
    </div>
  );
}
