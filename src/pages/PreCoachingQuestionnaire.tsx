/**
 * Pre-Coaching Questionnaire
 *
 * "Préparez votre session" — 3 vertical steps with icon + card + textarea
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

/* ─── Step config ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    id: 'objectifs',
    step: 'ÉTAPE 1',
    label: 'VOS OBJECTIFS',
    icon: <Target size={22} />,
    question: 'Quels sont vos objectifs principaux pour cette session de coaching ?',
    placeholder: 'Décrivez en détail vos attentes et ce que vous souhaitez accomplir...',
  },
  {
    id: 'defis',
    step: 'ÉTAPE 2',
    label: 'VOS DÉFIS',
    icon: <Lightbulb size={22} />,
    question: 'Quels défis ou obstacles rencontrez-vous actuellement ?',
    placeholder: 'Partagez les difficultés que vous rencontrez dans votre parcours...',
  },
  {
    id: 'sujets',
    step: 'ÉTAPE 3',
    label: 'SUJETS PRIORITAIRES',
    icon: <Compass size={22} />,
    question: 'Y a-t-il des sujets spécifiques que vous aimeriez aborder ?',
    placeholder: 'Listez les thématiques prioritaires que vous souhaitez traiter...',
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
      toast.warning('Renseignez au moins une réponse avant d\'envoyer', 'Formulaire incomplet');
      return;
    }
    toast.success('Vos réponses ont été transmises à votre coach', 'Questionnaire envoyé');
    setTimeout(() => navigate('/coaching/pre-questionnaire/response'), 800);
  };

  return (
    <div className="min-h-screen bg-surface font-body py-section px-6">
      <div className="max-w-[640px] mx-auto">

        {/* ─ Back button ─────────────────────────────────────────────── */}
        <div className="mb-section">
          <Button
            variant="secondary"
            size="sm"
            leadingIcon={<ChevronLeft size={14} />}
            onClick={() => navigate('/coaching')}
          >
            Retour
          </Button>
        </div>

        {/* ─ Header ──────────────────────────────────────────────────── */}
        <div className="text-center mb-section-lg">
          <h1 className="font-display text-h1 font-extrabold text-ink-900 m-0 mb-2 tracking-tight">
            Préparez votre session
          </h1>
          <p className="font-body text-body text-ink-500 m-0">
            Répondez à ces 3 questions pour une session sur-mesure
          </p>
        </div>

        {/* ─ Steps ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-stack-lg">
          {STEPS.map((step) => (
            <div key={step.id} className="flex gap-4 items-start">

              {/* Circle icon */}
              <div className="w-12 h-12 rounded-full bg-ink-50 border border-ink-200 text-ink-400 flex items-center justify-center shrink-0 mt-4">
                {step.icon}
              </div>

              {/* Card */}
              <div className="flex-1 bg-white border border-ink-200 rounded-2xl p-6 shadow-sm">
                <p className="font-body text-caption font-bold text-primary-600 uppercase tracking-wider m-0 mb-1">
                  {step.step} • {step.label}
                </p>
                <p className="font-body text-body font-bold text-ink-900 leading-snug m-0 mb-4">
                  {step.question}
                </p>
                <textarea
                  rows={5}
                  value={answers[step.id]}
                  onChange={(e) => setAnswer(step.id, e.target.value)}
                  placeholder={step.placeholder}
                  className="w-full h-auto py-4 px-4 rounded-xl border border-ink-200 bg-ink-50 text-ink-900 font-body text-body-sm leading-[1.65] resize-y outline-none transition-colors duration-200 focus:border-primary-400 focus:bg-white placeholder:text-ink-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─ Submit button ────────────────────────────────────────────── */}
        <div className="text-center mt-section-lg">
          <Button
            variant="primary"
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
