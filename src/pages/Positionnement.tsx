/**
 * Positionnement — Test de positionnement initial pour un parcours.
 *
 * Flow : full-screen sans sidebar, focus test.
 *
 * Structure :
 *  1. ViewerHeader sticky (back vers /learning-paths/:id, titre, current/total)
 *  2. InlineProgress (X / Y)
 *  3. QuizQuestionCard centré (1 question à la fois)
 *  4. Footer nav : Précédent + Suivant
 *  5. État final : SectionCard avec niveau estimé + CTA "Commencer le parcours"
 *
 * Route : /learning-paths/:id/positionnement
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Award, TrendingUp } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { QuizQuestionCard } from '../components/patterns/QuizQuestionCard';
import type { QuizOption } from '../components/patterns/QuizQuestionCard';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { SectionCard } from '../components/patterns/SectionCard';
import { useToastContext } from '../contexts/ToastContext';
import { getFirstLessonId } from '../data/learningPaths';

/* ─── Mock questions ─────────────────────────────────────────────────────── */

interface PositionQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

const QUESTIONS: PositionQuestion[] = [
  {
    id: 'q1',
    question: "Quelle est votre expérience avec le sujet de ce parcours ?",
    options: [
      { id: 'q1-a', label: "Je découvre le sujet pour la première fois" },
      { id: 'q1-b', label: "J'en ai entendu parler mais sans pratique" },
      { id: 'q1-c', label: 'Je pratique de manière occasionnelle' },
      { id: 'q1-d', label: 'Je maîtrise déjà ce domaine au quotidien' },
    ],
  },
  {
    id: 'q2',
    question: "Quel est votre objectif principal en suivant ce parcours ?",
    options: [
      { id: 'q2-a', label: 'Acquérir les bases pour démarrer' },
      { id: 'q2-b', label: 'Approfondir des connaissances déjà solides' },
      { id: 'q2-c', label: 'Préparer une certification' },
      { id: 'q2-d', label: 'Former mon équipe sur ce sujet' },
    ],
  },
  {
    id: 'q3',
    question: "Combien de temps pouvez-vous y consacrer par semaine ?",
    options: [
      { id: 'q3-a', label: 'Moins de 30 min — j\'avance à mon rythme' },
      { id: 'q3-b', label: '30 min à 1h — apprentissage régulier' },
      { id: 'q3-c', label: '1h à 3h — engagement soutenu' },
      { id: 'q3-d', label: 'Plus de 3h — immersion intensive' },
    ],
  },
  {
    id: 'q4',
    question: "Quel format d'apprentissage préférez-vous ?",
    options: [
      { id: 'q4-a', label: 'Vidéos courtes + quiz interactifs' },
      { id: 'q4-b', label: 'Articles long-form + lecture approfondie' },
      { id: 'q4-c', label: 'Coaching et échanges en groupe' },
      { id: 'q4-d', label: 'Mix complet selon les sujets' },
    ],
  },
];

/* ─── Level estimation logic (mocked) ───────────────────────────────────── */

type EstimatedLevel = 'beginner' | 'intermediate' | 'advanced';

const LEVEL_CONFIG: Record<EstimatedLevel, {
  label: string;
  description: string;
  badge: 'success' | 'brand' | 'warm';
  Icon: React.ComponentType<{ size?: number }>;
}> = {
  beginner: {
    label: 'Débutant',
    description: "Vous démarrez ce sujet. Le parcours commencera par les fondamentaux pour vous mettre à l'aise.",
    badge: 'success',
    Icon: Sparkles,
  },
  intermediate: {
    label: 'Intermédiaire',
    description: 'Vous avez déjà des bases solides. Les premières leçons seront accessibles et la difficulté progressera.',
    badge: 'brand',
    Icon: TrendingUp,
  },
  advanced: {
    label: 'Avancé',
    description: 'Vous maîtrisez le sujet. Le parcours se focalisera sur les concepts avancés et cas d\'usage complexes.',
    badge: 'warm',
    Icon: Award,
  },
};

function estimateLevel(answers: Record<string, string>): EstimatedLevel {
  // Mocked logic — based on first question (experience level)
  const exp = answers['q1'];
  if (exp === 'q1-a' || exp === 'q1-b') return 'beginner';
  if (exp === 'q1-c') return 'intermediate';
  return 'advanced';
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Positionnement: React.FC = () => {
  const navigate = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const toast = useToastContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const isLast = currentIndex === total - 1;
  const isFirst = currentIndex === 0;
  const progressPct = Math.round(((currentIndex + 1) / total) * 100);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (!currentAnswer) {
      toast.warning('Choisissez une réponse avant de continuer', 'Réponse requise');
      return;
    }
    if (isLast) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  };

  const handleStartPath = () => {
    toast.success('Niveau enregistré · contenu du parcours adapté', 'Positionnement validé');
    const firstLessonId = getFirstLessonId(id);
    const target = firstLessonId
      ? `/learning-paths/${id}/lessons/${firstLessonId}`
      : `/learning-paths/${id}`;
    setTimeout(() => navigate(target), 600);
  };

  /* ── Résultats ──────────────────────────────────────────────────────── */
  if (isFinished) {
    const level = estimateLevel(answers);
    const cfg = LEVEL_CONFIG[level];
    const Icon = cfg.Icon;

    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <ViewerHeader
          onBack={() => navigate(`/learning-paths/${id}`)}
          backLabel="Retour au parcours"
          eyebrow="Test de positionnement"
          title="Résultats"
        />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-section">
          <div className="w-full max-w-2xl flex flex-col gap-section">
            <SectionCard
              tone="brand"
              titleIcon={<Icon size={20} />}
              title="Niveau estimé"
              description="D'après vos réponses, voici le point de départ recommandé."
            >
              <div className="flex flex-col items-center gap-stack text-center py-stack">
                <Badge variant={cfg.badge}>{cfg.label}</Badge>
                <p className="m-0 font-body text-body text-ink-700 leading-relaxed max-w-prose">
                  {cfg.description}
                </p>
              </div>
            </SectionCard>

            <div className="flex flex-col sm:flex-row gap-stack justify-center">
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  setCurrentIndex(0);
                  setIsFinished(false);
                  setAnswers({});
                }}
              >
                Refaire le test
              </Button>
              <Button
                variant="primary"
                size="md"
                trailingIcon={<ArrowRight size={14} />}
                onClick={handleStartPath}
              >
                Commencer le parcours
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ── Questionnaire ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <ViewerHeader
        onBack={() => navigate(`/learning-paths/${id}`)}
        backLabel="Retour au parcours"
        eyebrow="Test de positionnement"
        title="Évaluons votre niveau"
        current={currentIndex + 1}
        total={total}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-section">

          {/* Progress */}
          <div className="flex flex-col gap-tight">
            <div className="flex items-baseline justify-between font-body text-caption text-ink-500">
              <span>Question {currentIndex + 1} sur {total}</span>
              <span className="font-bold text-primary-700 tabular-nums">{progressPct}%</span>
            </div>
            <InlineProgress value={progressPct} tone="primary" showLabel={false} />
          </div>

          {/* Question */}
          <QuizQuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedId={currentAnswer}
            onSelectOption={handleSelect}
            questionNumber={currentIndex + 1}
            totalQuestions={total}
          />

          {/* Footer nav */}
          <div className="flex items-center justify-between gap-stack">
            <Button
              variant="secondary"
              size="md"
              leadingIcon={<ArrowLeft size={14} />}
              onClick={handlePrev}
              disabled={isFirst}
            >
              Précédent
            </Button>

            <Button
              variant="primary"
              size="md"
              trailingIcon={<ArrowRight size={14} />}
              onClick={handleNext}
            >
              {isLast ? 'Voir mes résultats' : 'Question suivante'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Positionnement;
