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
import { buttonClasses } from '../core/Button';
import { MetaPill } from '../ui/MetaPill';
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
      icon: <GraduationCap size={20} />,
      title: 'Rencontre ton coach',
      description: 'Planifie une première session pour cadrer tes objectifs.',
      cta: 'Réserver une session',
      tone: 'brand',
      onClick: () => navigate('/coaching'),
    },
    {
      id: 'passeport',
      icon: <Target size={20} />,
      title: 'Ouvre ton Passeport',
      description: 'Ton radar de compétences initial t’attend. Pose tes premiers objectifs.',
      cta: 'Voir mon passeport',
      tone: 'sun',
      onClick: () => navigate('/passeport'),
    },
  ];

  const wrapperClasses = ['w-full flex flex-col gap-stack', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClasses} aria-label="Premiers pas">
      {/* Orienting header — oriente, ne ré-accueille pas (le hero a déjà salué).
          C'est un titre de SECTION (h2 28/36), avec sa phrase à 4 px (16/26
          ink-700). Il était au pas du titre de carte (20 px), comme la carte
          juste en dessous : deux rangs, une seule taille. */}
      <div className="flex flex-col gap-stack-3xs">
        <h2 className="font-display text-h2 text-ink-900 text-balance">
          Par où commencer&nbsp;?
        </h2>
        <p className="font-body text-body text-ink-700 max-w-prose">
          Ton profil et ton passeport sont prêts. Trois portes d&apos;entrée pour lancer ta pratique.
        </p>
      </div>

      {/* Action dominante — démarrer son premier parcours (practice-as-verb, ton warm). */}
      <button
        type="button"
        onClick={() => navigate('/learning-paths')}
        aria-label="Démarre ton premier parcours"
        className="group relative overflow-hidden w-full text-left rounded-lg border border-secondary-200/70 bg-gradient-to-br from-secondary-100/92 to-secondary-50/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] p-stack-lg md:p-section cursor-pointer transition-colors duration-base ease-emphasis hover:border-secondary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400 flex flex-col"
      >
        {/* Anatomie (passe typographique du 2026-09-24) : type · 4 · titre h3
            20/700 ink-900 · 8 · texte 16 ink-700 · 24 · action.
            (méta → titre 4, comme dans l'anatomie d'une carte.)
            - « Premier pas » est une DONNÉE sur la carte : `MetaPill`
              (arbitrages n°14-15), plus une pastille faite main en 11 px
              capitales, le registre du `Badge`.
            - Le titre prend le pas du titre de carte. Il était à 27 → 34 px,
              hors échelle, et au-dessus du titre de section qui le coiffe ;
              la carte domine par sa surface et sa largeur, pas par sa taille
              de texte. Encre ink-900 : la marque ne teinte pas un titre.
            - Pas de <h3> : dans un <button>, un titre est invalide (HTML). */}
        <MetaPill
          text="Premier pas"
          icon={<Play size={14} fill="currentColor" aria-hidden="true" />}
          tone="warm"
          className="self-start"
        />

        <span className="mt-stack-3xs font-display text-h3 text-ink-900 text-balance">
          Démarre ton premier parcours
        </span>

        <span className="mt-stack-xs font-body text-body text-ink-700 max-w-prose">
          Découvre les parcours adaptés à ton profil et lance ta première leçon.
        </span>

        {/* Affordance visuelle dans une carte déjà cliquable — voir PromptCard. */}
        <span className={buttonClasses({ variant: 'glass-light', className: 'mt-stack-lg self-start' })}>
          Explorer les parcours <ArrowRight size={14} aria-hidden="true" />
        </span>
      </button>

      {/* Actions secondaires — coach + passeport. */}
      <NextStepsGrid items={items ?? secondaryItems} columns={2} />
    </section>
  );
};

export default EmptyDashboardState;
