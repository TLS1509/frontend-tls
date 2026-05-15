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

const QUESTIONS = [
  { id: 1, competence: 'Communication écrite',     q: 'Comment évaluez-vous votre aisance à rédiger des documents structurés (mémo, rapport) ?' },
  { id: 2, competence: 'Communication orale',      q: "Lors d'une présentation devant 10+ personnes, vous sentez-vous à l'aise ?" },
  { id: 3, competence: 'Résolution de problèmes',  q: 'Face à un problème inédit, décomposez-vous systématiquement la situation ?' },
  { id: 4, competence: 'Gestion du temps',         q: 'Réussissez-vous à respecter vos échéances même en charge importante ?' },
  { id: 5, competence: 'Travail en équipe',        q: 'Contribuez-vous activement aux décisions collectives ?' },
  { id: 6, competence: 'Leadership',               q: 'Avez-vous déjà piloté un projet transverse avec plusieurs interlocuteurs ?' },
  { id: 7, competence: 'Adaptabilité',             q: "Face à un changement d'objectif soudain, ajustez-vous rapidement vos priorités ?" },
  { id: 8, competence: 'Esprit critique',          q: "Remettez-vous en question les sources et données qu'on vous fournit ?" },
];

const OnboardingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = QUESTIONS.length;
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / total) * 100;
  const selected = answers[q.id];

  const handleAnswer = (level: number) => {
    setAnswers((a) => ({ ...a, [q.id]: level }));
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      navigate('/onboarding/tutorial');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        <Stepper items={buildOnboardingStepperItems('positionnement')} orientation="horizontal" />

        <EditorialHero
          tone="warm"
          eyebrow="Onboarding · Positionnement Dreyfus"
          title="Évaluons ton niveau de départ"
          summary={`${total} questions pour adapter ton parcours. Tu pourras ajuster ces niveaux à tout moment depuis ton Passeport.`}
        />

        <div className="flex items-end justify-between gap-stack">
          <div className="flex-1 flex flex-col gap-tight">
            <ProgressBar value={progress} max={100} fill="warm" size="md" valueLabel={false} />
            <div className="text-caption text-ink-500">
              Question {currentQ + 1} sur {total} · {Object.keys(answers).length} répondue{Object.keys(answers).length > 1 ? 's' : ''}
            </div>
          </div>
          <Button variant="ghost" size="sm" leadingIcon={<Save className="w-4 h-4" />}>
            Sauvegarder
          </Button>
        </div>

        <SectionCard
          title={q.q}
          description={`Compétence évaluée : ${q.competence}`}
        >
          <DreyfusLevelSelector tone="warm" value={selected} onChange={handleAnswer} />
        </SectionCard>

        <div className="flex items-center justify-between gap-stack">
          <Button
            variant="secondary"
            leadingIcon={<ChevronLeft className="w-4 h-4" />}
            onClick={handlePrev}
            disabled={currentQ === 0}
          >
            Précédent
          </Button>

          <Button
            variant="warm"
            trailingIcon={<ChevronRight className="w-4 h-4" />}
            onClick={handleNext}
            disabled={!selected}
          >
            {currentQ < total - 1 ? 'Suivant' : 'Continuer vers le tutoriel'}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OnboardingQuestionnaire;
