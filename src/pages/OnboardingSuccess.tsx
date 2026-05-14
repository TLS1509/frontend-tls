import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, BookOpen, GraduationCap, Target, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ────────────────────────────────────────────────────────────────

const NEXT_STEPS = [
  {
    id: 'parcours',
    icon: <BookOpen size={22} />,
    title: 'Explore tes parcours',
    description: 'Découvre les parcours adaptés à ton profil Dreyfus et commence ta première leçon.',
    cta: 'Voir les parcours',
    route: '/learning-paths',
    tone: 'primary' as const,
  },
  {
    id: 'coach',
    icon: <GraduationCap size={22} />,
    title: 'Réserve ton coach',
    description: 'Planifie une première session de coaching pour accélérer ta progression.',
    cta: 'Réserver une session',
    route: '/coaching',
    tone: 'warm' as const,
  },
  {
    id: 'passeport',
    icon: <Target size={22} />,
    title: 'Consulte ton Passeport',
    description: 'Ton radar de compétences initial est prêt. Définis tes premiers objectifs.',
    cta: 'Voir mon passeport',
    route: '/passeport',
    tone: 'sun' as const,
  },
];

const TONE_BG: Record<string, string> = {
  primary: 'bg-primary-50',
  warm: 'bg-secondary-50',
  sun: 'bg-accent-50',
};

const TONE_ICON: Record<string, string> = {
  primary: 'text-primary-600',
  warm: 'text-secondary-500',
  sun: 'text-accent-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function OnboardingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-page-ambient px-4 py-page">
      <div className="max-w-content mx-auto w-full flex flex-col gap-section items-center text-center">

        {/* Success icon */}
        <div className="flex flex-col items-center gap-stack">
          <div className="w-20 h-20 rounded-full bg-success-bg border-2 border-success-border flex items-center justify-center shadow-lg">
            <CheckCircle2 size={40} className="text-success-fg" />
          </div>
          <Badge variant="success" size="lg">Profil complété !</Badge>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-stack max-w-lg">
          <h1 className="text-h1 font-display font-bold text-ink-900">
            Bienvenue sur The Learning Society
          </h1>
          <p className="text-body-lg text-ink-600">
            Ton profil est configuré et ton passeport de compétences est prêt. Tu peux maintenant commencer ton parcours d'apprentissage personnalisé.
          </p>
        </div>

        {/* XP earned */}
        <Card variant="tinted" tone="primary" className="w-full max-w-sm flex flex-col gap-3 items-center py-6">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary-600" />
            <span className="text-body-sm font-semibold text-primary-700">Onboarding terminé</span>
          </div>
          <span className="text-h2 font-display font-bold text-primary-700">+150 XP</span>
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between text-caption text-ink-500">
              <span>Niveau 1</span>
              <span>150 / 500 XP</span>
            </div>
            <ProgressBar value={30} tone="primary" size="sm" />
          </div>
        </Card>

        {/* Next steps */}
        <div className="w-full flex flex-col gap-stack">
          <h2 className="text-h3 font-display font-semibold text-ink-900">
            Par où commencer ?
          </h2>
          <div className="grid md:grid-cols-3 gap-stack text-left">
            {NEXT_STEPS.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => navigate(step.route)}
                className="group flex flex-col gap-stack p-6 bg-white rounded-2xl border border-ink-100 hover:border-primary-200 hover:shadow-md transition-all duration-base text-left"
              >
                <div className={['w-12 h-12 rounded-xl flex items-center justify-center', TONE_BG[step.tone], TONE_ICON[step.tone]].join(' ')}>
                  {step.icon}
                </div>
                <div className="flex flex-col gap-tight flex-1">
                  <h3 className="text-body font-semibold text-ink-900">{step.title}</h3>
                  <p className="text-body-sm text-ink-500 leading-relaxed">{step.description}</p>
                </div>
                <span className="text-caption font-semibold text-primary-700 flex items-center gap-1 group-hover:gap-2 transition-all duration-fast">
                  {step.cta} <ArrowRight size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <Button
          variant="primary"
          size="lg"
          trailingIcon={<ArrowRight size={18} />}
          onClick={() => navigate('/dashboard')}
        >
          Accéder à mon tableau de bord
        </Button>

        {/* Tutorial link */}
        <button
          type="button"
          onClick={() => navigate('/onboarding/tutorial')}
          className="text-caption text-ink-400 hover:text-primary-700 underline underline-offset-2 transition-colors duration-fast"
        >
          Voir le tutoriel de la plateforme
        </button>

      </div>
    </div>
  );
}
