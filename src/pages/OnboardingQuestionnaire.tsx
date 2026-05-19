import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Stepper } from '../components/ui/Stepper';
import { ProgressBar } from '../components/ui/ProgressBar';
import { DreyfusLevelSelector } from '../components/ui/DreyfusLevelSelector';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { usePositioningStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { DreyfusLevel } from '../types/learning';

const ONBOARDING_PARCOURS_ID = 'onboarding-initial';

/** 8 questions de positionnement initial, une par compétence H.S.O. canonique */
const QUESTIONS = [
  { id: 1, competenceId: 'communication',    q: 'Comment évalues-tu ton aisance à communiquer clairement et à embarquer tes interlocuteurs ?' },
  { id: 2, competenceId: 'leadership',       q: 'As-tu déjà piloté un projet transverse ou dirigé une équipe vers un objectif commun ?' },
  { id: 3, competenceId: 'analyse',          q: 'Face à un problème complexe, décomposes-tu systématiquement la situation pour décider ?' },
  { id: 4, competenceId: 'project_mgmt',     q: 'Réussis-tu à planifier et respecter tes échéances même en charge importante ?' },
  { id: 5, competenceId: 'cooperation',      q: 'Contribues-tu activement aux décisions collectives et au travail en équipe ?' },
  { id: 6, competenceId: 'adaptability',     q: "Face à un changement d'objectif soudain, ajustes-tu rapidement tes priorités ?" },
  { id: 7, competenceId: 'critical_thinking', q: "Remets-tu en question les sources et données qu'on te fournit ?" },
  { id: 8, competenceId: 'tech_tools',       q: 'Maîtrises-tu les outils numériques du quotidien professionnel (suite office, outils cloud) ?' },
];

const OnboardingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const positioningStore = usePositioningStore();
  const passeportStore = usePasseportStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = QUESTIONS.length;
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / total) * 100;
  const selected = answers[q.id];

  const handleAnswer = (level: number) => {
    setAnswers((a) => ({ ...a, [q.id]: level }));
  };

  const handleComplete = () => {
    // Persist positioning result (Cahier #01 / #03)
    const positioningAnswers = QUESTIONS.map((question) => ({
      competenceId: question.competenceId,
      level: (answers[question.id] ?? 1) as DreyfusLevel,
    }));
    positioningStore.set(MOCK_USER_ID, ONBOARDING_PARCOURS_ID, positioningAnswers);

    // Seed LearnerCompetency baselines in Passeport (Cahier #02 / #03)
    QUESTIONS.forEach((question) => {
      const level = (answers[question.id] ?? 1) as DreyfusLevel;
      passeportStore.setCompetency({
        userId: MOCK_USER_ID,
        competenceId: question.competenceId,
        currentLevel: level,
        points: 0,
        nextLevelPoints: level < 5 ? 100 : 0,
        daysSinceActivity: 0,
        lastUpdated: new Date().toISOString(),
      });
    });

    navigate('/onboarding/tutorial');
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-10 pt-14 md:pt-section pb-section flex flex-col gap-section">

        <Stepper items={buildOnboardingStepperItems('positionnement')} orientation="horizontal" />

        <EditorialHero
          tone="warm"
          eyebrow="Onboarding · Positionnement Dreyfus"
          title="Évaluons ton niveau de départ"
          summary={`${total} questions pour adapter ton parcours. Tu pourras ajuster ces niveaux à tout moment depuis ton Passeport.`}
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-stack">
          <div className="flex-1 flex flex-col gap-tight">
            <ProgressBar value={progress} max={100} fill="warm" size="md" valueLabel={false} />
            <div className="text-caption text-ink-500">
              Question {currentQ + 1} sur {total} · {Object.keys(answers).length} répondue{Object.keys(answers).length > 1 ? 's' : ''}
            </div>
          </div>
          <Button variant="ghost" size="sm" leadingIcon={<Save className="w-4 h-4" />} className="sm:flex-none w-full sm:w-auto">
            Sauvegarder
          </Button>
        </div>

        <SectionCard
          title={q.q}
          description={`Compétence évaluée : ${getCompetenceById(q.competenceId)?.label ?? q.competenceId}`}
        >
          <DreyfusLevelSelector tone="warm" value={selected} onChange={handleAnswer} />
        </SectionCard>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-stack">
          <Button
            variant="secondary"
            leadingIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={handlePrev}
            disabled={currentQ === 0}
            className="flex-1 sm:flex-none"
          >
            Précédent
          </Button>

          <Button
            variant="warm"
            trailingIcon={<ChevronRight className="w-4 h-4" />}
            onClick={handleNext}
            disabled={!selected}
            className="flex-1 sm:flex-none"
          >
            {currentQ < total - 1 ? 'Suivant' : 'Continuer vers le tutoriel'}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OnboardingQuestionnaire;
