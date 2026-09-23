/**
 * Pre-Coaching Questionnaire
 *
 * "Prépare ta session" : 3 vertical steps with icon + card + textarea
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Target,
  Lightbulb,
  Compass,
  Send,
} from 'lucide-react';
import { useToastContext } from '../contexts/ToastContext';
import { Button } from '../components/core/Button';
import { IconChip } from '../components/ui/IconChip';

/* ─── Step config ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    id: 'objectifs',
    step: 'ÉTAPE 1',
    label: 'VOS OBJECTIFS',
    icon: <Target size={20} />,
    question: 'Quels sont tes objectifs principaux pour cette session de coaching ?',
    placeholder: 'Décris en détail tes attentes et ce que tu souhaites accomplir...',
  },
  {
    id: 'defis',
    step: 'ÉTAPE 2',
    label: 'VOS DÉFIS',
    icon: <Lightbulb size={20} />,
    question: 'Quels défis ou obstacles rencontres-tu actuellement ?',
    placeholder: 'Partage les difficultés que tu rencontres dans ton parcours...',
  },
  {
    id: 'sujets',
    step: 'ÉTAPE 3',
    label: 'SUJETS PRIORITAIRES',
    icon: <Compass size={20} />,
    question: 'Y a-t-il des sujets spécifiques que tu aimerais aborder ?',
    placeholder: 'Liste les thématiques prioritaires que tu souhaites traiter...',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const PreCoachingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({
    objectifs: '',
    defis: '',
    sujets: '',
  });

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const isComplete = Object.values(answers).some((v) => v.trim().length > 0);
  const toast = useToastContext();

  const handleSubmit = () => {
    if (!isComplete) {
      toast.warning('Renseigne au moins une réponse avant d\'envoyer', 'Formulaire incomplet');
      return;
    }
    toast.success('Tes réponses ont été transmises à ton coach', 'Questionnaire envoyé');
    setTimeout(() => navigate('/coaching/pre-questionnaire/response'), 800);
  };

  return (
    <div className="min-h-[100dvh] bg-surface font-body py-section px-stack-lg">
      <div className="max-w-[640px] mx-auto">

        {/* ─ Back button ─────────────────────────────────────────────── */}
        <div className="mb-section">
          <Button
            emphasis="soft" tone="warm"
            size="sm"
            leadingIcon={<ChevronLeft size={14} />}
            onClick={() => navigate('/coaching')}
          >
            Retour
          </Button>
        </div>

        {/* ─ Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-section-lg">
          <h1 className="font-display text-h1 text-ink-900 mb-stack-xs tracking-tight">
            Prépare ta session
          </h1>
          <p className="font-body text-body text-ink-500 m-0">
            Réponds à ces 3 questions pour une session sur-mesure
          </p>
        </div>

        {/* ─ Steps ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-stack-lg">
          {STEPS.map((step) => (
            <div key={step.id} className="flex gap-stack items-start">

              {/* Circle icon */}
              <IconChip size="lg" tone="neutral" className="mt-stack">
                {step.icon}
              </IconChip>

              {/* Card */}
              <div className="flex-1 bg-white border border-ink-200 rounded-lg p-stack-lg">
                <p className="font-body text-caption font-medium text-primary-700 m-0 mb-1">
                  {step.step} • {step.label}
                </p>
                <p className="font-body text-body font-bold text-ink-900 leading-snug m-0 mb-stack">
                  {step.question}
                </p>
                <textarea
                  rows={5}
                  value={answers[step.id]}
                  onChange={(e) => setAnswer(step.id, e.target.value)}
                  placeholder={step.placeholder}
                  className="w-full h-auto py-stack px-stack rounded-lg border border-ink-200 bg-ink-50 text-ink-900 font-body text-body-sm leading-[1.65] resize-y outline-none transition-colors duration-200 focus:border-primary-400 focus:bg-white placeholder:text-ink-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─ Submit button ────────────────────────────────────────────── */}
        <div className="text-center mt-section-lg">
          <Button
            emphasis="soft"
            size="lg"
            leadingIcon={<Send size={16} />}
            disabled={!isComplete}
            onClick={handleSubmit}
          >
            Envoyer mes réponses
          </Button>
        </div>

      </div>
    </div>
  );
};
