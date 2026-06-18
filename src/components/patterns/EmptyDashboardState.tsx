/**
 * EmptyDashboardState — Cold-start Dashboard for new learners.
 *
 * Shown when the user has just completed onboarding and has no parcours,
 * coaching session, or activity to display. Replaces the "mock data soup"
 * effect on the regular Dashboard for first-time users.
 *
 * Composition (no second welcome — the parent PageHero already greets) :
 *   - orienting header ("Par où commencer ?")
 *   - ONE dominant action : start the first parcours (practice-as-verb, warm)
 *   - TWO secondary actions (coach + passeport) via NextStepsGrid
 *
 * The dominant + secondary split gives the new learner a clear first move
 * instead of three equal cards. Purely presentational ; the parent decides
 * when to render it (e.g. `user.isOnboarded && !user.hasStartedParcours`).
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Target, ArrowRight, Play } from 'lucide-react';
import { NextStepsGrid } from './NextStepsGrid';
import type { NextStepItem } from './NextStepsGrid';

export interface EmptyDashboardStateProps {
  /** @deprecated The greeting now lives in the parent PageHero. Kept for API compat. */
  firstName?: string;
  /** Override the secondary cold-start actions (coach + passeport by default). */
  items?: NextStepItem[];
  className?: string;
}

export const EmptyDashboardState: React.FC<EmptyDashboardStateProps> = ({
  items,
  className = '',
}) => {
  const navigate = useNavigate();

  const secondaryItems: NextStepItem[] = [
    {
      id: 'coach',
      icon: <GraduationCap size={22} />,
      title: 'Rencontre ton coach',
      description: 'Planifie une première session pour cadrer tes objectifs.',
      cta: 'Réserver une session',
      tone: 'brand',
      onClick: () => navigate('/coaching'),
    },
    {
      id: 'passeport',
      icon: <Target size={22} />,
      title: 'Ouvre ton Passeport',
      description: 'Ton radar de compétences initial t’attend. Pose tes premiers objectifs.',
      cta: 'Voir mon passeport',
      tone: 'sun',
      onClick: () => navigate('/passeport'),
    },
  ];

  const wrapperClasses = ['w-full flex flex-col gap-stack-lg', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClasses} aria-label="Premiers pas">
      {/* Orienting header — oriente, ne ré-accueille pas (le hero a déjà salué). */}
      <div className="flex flex-col gap-tight max-w-2xl">
        <h2 className="text-h3 font-display font-bold text-ink-900 tracking-headline leading-tight m-0 text-balance">
          Par où commencer&nbsp;?
        </h2>
        <p className="text-body text-ink-600 leading-relaxed m-0">
          Ton profil et ton passeport sont prêts. Trois portes d&apos;entrée pour lancer ta pratique.
        </p>
      </div>

      {/* Action dominante — démarrer son premier parcours (practice-as-verb, ton warm). */}
      <button
        type="button"
        onClick={() => navigate('/learning-paths')}
        aria-label="Démarre ton premier parcours"
        className="group relative overflow-hidden w-full text-left rounded-2xl border border-secondary-200/70 bg-gradient-to-br from-secondary-100/92 to-secondary-50/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] p-6 md:p-8 cursor-pointer transition-[transform,box-shadow] duration-base ease-emphasis hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400 flex flex-col gap-3.5"
      >
        <span className="inline-flex self-start items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-pill bg-secondary-200/60 text-secondary-700">
          <Play size={8} fill="currentColor" aria-hidden="true" /> Premier pas
        </span>

        <h3 className="font-display font-bold leading-[1.05] tracking-display m-0 text-balance text-[1.7rem] md:text-[2.1rem] text-secondary-800">
          Démarre ton premier parcours
        </h3>

        <p className="font-body text-body text-ink-700 leading-relaxed m-0 max-w-[52ch]">
          Découvre les parcours adaptés à ton profil et lance ta première leçon.
        </p>

        <span className="mt-1 inline-flex self-start items-center gap-2 h-11 px-6 rounded-pill bg-white/80 text-secondary-800 border border-white/70 backdrop-blur-sm shadow-sm text-body-sm font-semibold transition-[background-color,box-shadow,transform] duration-fast ease-emphasis group-hover:bg-white group-hover:shadow-warm-sm group-hover:-translate-y-px">
          Explorer les parcours <ArrowRight size={15} aria-hidden="true" />
        </span>
      </button>

      {/* Actions secondaires — coach + passeport. */}
      <NextStepsGrid items={items ?? secondaryItems} columns={2} />
    </section>
  );
};

export default EmptyDashboardState;
