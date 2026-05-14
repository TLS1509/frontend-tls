import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';

const QUESTIONS = [
  { id: 1, competence: 'Communication écrite', q: 'Comment évaluez-vous votre aisance à rédiger des documents structurés (mémo, rapport) ?' },
  { id: 2, competence: 'Communication orale', q: 'Lors d\'une présentation devant 10+ personnes, vous sentez-vous à l\'aise ?' },
  { id: 3, competence: 'Résolution de problèmes', q: 'Face à un problème inédit, décomposez-vous systématiquement la situation ?' },
  { id: 4, competence: 'Gestion du temps', q: 'Réussissez-vous à respecter vos échéances même en charge importante ?' },
  { id: 5, competence: 'Travail en équipe', q: 'Contribuez-vous activement aux décisions collectives ?' },
  { id: 6, competence: 'Leadership', q: 'Avez-vous déjà piloté un projet transverse avec plusieurs interlocuteurs ?' },
  { id: 7, competence: 'Adaptabilité', q: 'Face à un changement d\'objectif soudain, ajustez-vous rapidement vos priorités ?' },
  { id: 8, competence: 'Esprit critique', q: 'Remettez-vous en question les sources et données qu\'on vous fournit ?' },
];

const DREYFUS_LEVELS = [
  { v: 1, label: 'Novice', desc: 'Je découvre' },
  { v: 2, label: 'Débutant avancé', desc: 'Je connais les bases' },
  { v: 3, label: 'Compétent', desc: 'Je sais faire en autonomie' },
  { v: 4, label: 'Maîtrise', desc: 'Je sais expliquer et adapter' },
  { v: 5, label: 'Expert', desc: 'Je sais innover et former' },
];

const OnboardingQuestionnaire: React.FC = () => {
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
    if (currentQ < total - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Onboarding · Positionnement Dreyfus"
        title="Évaluons ton niveau de départ"
        description={`Réponds à ces ${total} questions pour qu'on adapte ton parcours. Tu pourras toujours ajuster ces niveaux plus tard.`}
        tone="brand"
      />

      <div className="max-w-content mx-auto px-4 py-section flex flex-col gap-section">
        <div className="flex items-center justify-between gap-stack">
          <div className="flex-1">
            <ProgressBar value={progress} max={100} tone="brand" />
            <div className="mt-tight text-caption text-ink-500">
              Question {currentQ + 1} sur {total} · {Object.keys(answers).length} répondues
            </div>
          </div>
          <Button variant="ghost" size="sm" leadingIcon={<Save className="w-4 h-4" />}>
            Sauvegarder brouillon
          </Button>
        </div>

        <Card className="p-8 flex flex-col gap-stack-lg">
          <div className="flex items-center gap-stack-xs">
            <Badge variant="brand">{q.competence}</Badge>
          </div>
          <h2 className="text-h3 font-display font-semibold">{q.q}</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-stack-xs">
            {DREYFUS_LEVELS.map((lv) => (
              <button
                key={lv.v}
                onClick={() => handleAnswer(lv.v)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-base ${
                  selected === lv.v
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-ink-200 hover:border-primary-300'
                }`}
              >
                <div className="text-h4 font-bold text-primary-700">{lv.v}</div>
                <div className="font-semibold text-body-sm">{lv.label}</div>
                <div className="text-caption text-ink-500 mt-1">{lv.desc}</div>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="ghost" leadingIcon={<ChevronLeft className="w-4 h-4" />} onClick={handlePrev} disabled={currentQ === 0}>
            Précédent
          </Button>
          {currentQ < total - 1 ? (
            <Button variant="primary" trailingIcon={<ChevronRight className="w-4 h-4" />} onClick={handleNext} disabled={!selected}>
              Suivant
            </Button>
          ) : (
            <Button variant="primary" disabled={!selected}>
              Terminer → Mon passeport
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
