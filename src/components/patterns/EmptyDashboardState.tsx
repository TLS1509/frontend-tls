/**
 * EmptyDashboardState — Cold-start Dashboard for new learners.
 *
 * Shown when the user has just completed onboarding and has no parcours,
 * coaching session, or activity to display. Replaces the "mock data soup"
 * effect on the regular Dashboard for first-time users.
 *
 * Layout : welcome hero (handled by parent EditorialHero) + NextStepsGrid
 * showing the canonical 3 cold-start actions :
 *   1. Explore parcours
 *   2. Book first coaching session
 *   3. Check your Passeport
 *
 * The component is purely presentational ; the parent page decides when to
 * render it (e.g. `user.isOnboarded && !user.hasStartedParcours`).
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Target, Sparkles } from 'lucide-react';
import { NextStepsGrid } from './NextStepsGrid';
import type { NextStepItem } from './NextStepsGrid';

export interface EmptyDashboardStateProps {
  /** Optional learner first name (used for personalized headline). */
  firstName?: string;
  /** Override the default 3 cold-start actions. */
  items?: NextStepItem[];
  className?: string;
}

export const EmptyDashboardState: React.FC<EmptyDashboardStateProps> = ({
  firstName,
  items,
  className = '',
}) => {
  const navigate = useNavigate();

  const defaultItems: NextStepItem[] = [
    {
      id: 'parcours',
      icon: <BookOpen size={22} />,
      title: 'Explore tes parcours',
      description: 'Découvre les parcours adaptés à ton profil et démarre ta première leçon.',
      cta: 'Voir les parcours',
      tone: 'brand',
      onClick: () => navigate('/learning-paths'),
    },
    {
      id: 'coach',
      icon: <GraduationCap size={22} />,
      title: 'Rencontre ton coach',
      description: 'Planifie une première session pour cadrer tes objectifs avec ton coach.',
      cta: 'Réserver une session',
      tone: 'warm',
      onClick: () => navigate('/coaching'),
    },
    {
      id: 'passeport',
      icon: <Target size={22} />,
      title: 'Ouvre ton Passeport',
      description: 'Ton radar de compétences initial est prêt. Définis tes premiers objectifs.',
      cta: 'Voir mon passeport',
      tone: 'sun',
      onClick: () => navigate('/passeport'),
    },
  ];

  const wrapperClasses = ['w-full flex flex-col gap-section', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClasses}>
      <div className="flex items-center gap-2 text-primary-700">
        <Sparkles size={16} />
        <span className="text-caption font-semibold uppercase tracking-wide">
          {firstName ? `Bienvenue, ${firstName}` : 'Bienvenue'}
        </span>
      </div>

      <div className="flex flex-col gap-stack max-w-2xl">
        <h2 className="text-h2 font-display font-bold text-ink-900 leading-tight m-0">
          Tout est prêt pour démarrer
        </h2>
        <p className="text-body text-ink-600 leading-relaxed m-0">
          Ton profil et ton passeport sont configurés. Choisis par où tu veux commencer —
          tu pourras revenir sur ce tableau de bord à tout moment.
        </p>
      </div>

      <NextStepsGrid items={items ?? defaultItems} columns={3} />
    </section>
  );
};

export default EmptyDashboardState;
