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
import { Card } from '../components/core/Card';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';

/* ─── Step config ────────────────────────────────────────────────────────── */

/* Surtitre en casse normale (« Étape 1 · Tes objectifs ») : les capitales
   teal étaient le registre d'une étiquette, posé au-dessus de chaque carte. */
const STEPS = [
  {
    id: 'objectifs',
    step: 'Étape 1',
    label: 'Tes objectifs',
    icon: <Target size={20} />,
    question: 'Quels sont tes objectifs principaux pour cette session de coaching ?',
    placeholder: 'Décris en détail tes attentes et ce que tu souhaites accomplir...',
  },
  {
    id: 'defis',
    step: 'Étape 2',
    label: 'Tes défis',
    icon: <Lightbulb size={20} />,
    question: 'Quels défis ou obstacles rencontres-tu actuellement ?',
    placeholder: 'Partage les difficultés que tu rencontres dans ton parcours...',
  },
  {
    id: 'sujets',
    step: 'Étape 3',
    label: 'Sujets prioritaires',
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
    /* Un seul bord gauche : le retour, le titre, le chapô, les questions et
       l'envoi partent de la même ligne. Le titre et le chapô étaient centrés
       au-dessus de cartes calées à gauche, elles-mêmes décalées par une
       pastille d'icône posée hors de la carte (deux bords gauches). Et la page
       peignait un fond blanc (`bg-surface`) qui s'arrêtait à la colonne. */
    <PageShell width="content" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow="Coaching · Préparation"
        title="Prépare ta session"
        summary="Réponds à ces 3 questions pour une session sur-mesure."
        trailing={
          <Button emphasis="outline" size="md" leadingIcon={<ChevronLeft size={16} />} onClick={() => navigate('/coaching')}>
            Retour
          </Button>
        }
      />

      {/* Chaque question est une carte : son étape en légende 600 ink-600,
          4 px, la question en libellé 16/600 ink-900 (celui d'un champ), 8 px,
          puis la zone de réponse. 16 px entre deux questions : les trois
          forment un seul formulaire. */}
      <div className="flex flex-col gap-stack">
        {STEPS.map((step) => (
          <Card key={step.id} className="flex flex-col gap-0">
            <p className="font-body text-caption font-semibold text-ink-600">
              {step.step} · {step.label}
            </p>
            <label htmlFor={`question-${step.id}`} className="mt-stack-3xs font-body text-body font-semibold text-ink-900">
              {step.question}
            </label>
            <textarea
              id={`question-${step.id}`}
              rows={5}
              value={answers[step.id]}
              onChange={(e) => setAnswer(step.id, e.target.value)}
              placeholder={step.placeholder}
              className="mt-stack-xs w-full h-auto py-stack px-stack rounded-lg border border-ink-200 bg-ink-50 text-ink-900 font-body text-body resize-y outline-none transition-colors duration-200 focus:border-primary-400 focus:bg-white placeholder:text-ink-500"
            />
          </Card>
        ))}
      </div>

      <div>
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
    </PageShell>
  );
};

