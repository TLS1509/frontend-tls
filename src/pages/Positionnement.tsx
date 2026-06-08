/**
 * Positionnement — Test de positionnement initial pour un parcours.
 *
 * Cahier #01 Phase 16.1.2 : auto-génère 1 question par compétence du parcours,
 * using Dreyfus level selector (1–5 scale). Results persisted to usePositioningStore.
 *
 * Flow : full-screen sans sidebar, focus test.
 *  1. Check hasCompleted (skip if already done)
 *  2. ViewerHeader sticky (back vers /learning-paths/:id)
 *  3. InlineProgress (X / Y compétences)
 *  4. DreyfusLevelSelector centré (1 question par compétence)
 *  5. Footer nav : Précédent + Suivant
 *  6. État final : SectionCard avec résumé + CTA "Commencer le parcours"
 *
 * Route : /learning-paths/:id/positionnement
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { SectionCard } from '../components/patterns/SectionCard';
import { useToastContext } from '../contexts/ToastContext';
import { getFirstLessonId, getParcoursCompetenceIds } from '../data/learningPaths';
import { getCompetenceById, DREYFUS_LABELS } from '../data/competencies';
import { usePositioningStore } from '../stores/persistence';
import { DreyfusSlider } from '../components/ui/DreyfusSlider';
import type { DreyfusLevel, PositioningAnswer } from '../types/learning';

/* ─── Mock userId (placeholder — Phase 16.2 will use actual auth) ──────────── */
const MOCK_USER_ID = 'user-placeholder';

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Positionnement: React.FC = () => {
  const navigate = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const toast = useToastContext();
  const positioningStore = usePositioningStore();

  // Generate questions from parcours competencies
  const competenceIds = useMemo(() => getParcoursCompetenceIds(id), [id]);
  const questions = useMemo(
    () =>
      competenceIds.map((competenceId) => {
        const competence = getCompetenceById(competenceId);
        return {
          competenceId,
          competenceLabel: competence?.label ?? competenceId,
          competenceDescription: competence?.description,
        };
      }),
    [competenceIds]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, DreyfusLevel>>({});
  const [isFinished, setIsFinished] = useState(false);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.competenceId];
  const isLast = currentIndex === total - 1;
  const isFirst = currentIndex === 0;
  const progressPct = Math.round(((currentIndex + 1) / total) * 100);

  const handleSelect = (level: DreyfusLevel) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.competenceId]: level }));
  };

  const handleNext = () => {
    if (!currentAnswer) {
      toast.warning('Choisissez un niveau avant de continuer', 'Niveau requis');
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
    // Persist to store
    const positioningAnswers: PositioningAnswer[] = Object.entries(answers).map(
      ([competenceId, level]) => ({
        competenceId,
        level,
      })
    );
    positioningStore.set(MOCK_USER_ID, id, positioningAnswers);

    toast.success('Niveaux enregistrés · parcours adapté', 'Positionnement validé');
    const firstLessonId = getFirstLessonId(id);
    const target = firstLessonId
      ? `/learning-paths/${id}/lessons/${firstLessonId}`
      : `/learning-paths/${id}`;
    setTimeout(() => navigate(target), 600);
  };

  /* ── Résultats ──────────────────────────────────────────────────────── */
  if (isFinished) {
    const avgLevel = Math.round(
      Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length
    );

    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <ViewerHeader
          onBack={() => navigate(`/learning-paths/${id}`)}
          backLabel="Retour au parcours"
          eyebrow="Positionnement"
          title="Résultats"
        />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-section">
          <div className="w-full max-w-2xl flex flex-col gap-section">
            <SectionCard
              tone="brand"
              titleIcon={<CheckCircle size={20} />}
              title="Positionnement complété"
              description="Voici votre niveau moyen Dreyfus. Le parcours s'adapte à votre profil."
            >
              <div className="flex flex-col items-center gap-stack text-center py-stack">
                <div className="flex items-baseline gap-2">
                  <span className="text-h1 font-display font-bold text-primary-600">D{avgLevel}</span>
                  <span className="text-body-sm text-ink-600">{DREYFUS_LABELS[avgLevel as DreyfusLevel]}</span>
                </div>
                <p className="m-0 font-body text-body-sm text-ink-700 leading-relaxed max-w-prose">
                  Nous avons évalué vos {total} compétences clés. Le contenu du parcours s'adapte à
                  votre progression.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-caption font-semibold text-primary-700">Compétences positionnées :</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(answers).map(([compId, level]) => {
                    const comp = getCompetenceById(compId);
                    return (
                      <Badge key={compId} variant="brand" size="sm">
                        {comp?.label ?? compId} : D{level}
                      </Badge>
                    );
                  })}
                </div>
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
                Refaire le positionnement
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
        eyebrow="Positionnement"
        title="Évaluons votre niveau"
        current={currentIndex + 1}
        total={total}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-section">

          {/* Progress */}
          <div className="flex flex-col gap-tight">
            <div className="flex items-baseline justify-between font-body text-caption text-ink-500">
              <span>Compétence {currentIndex + 1} sur {total}</span>
              <span className="font-bold text-primary-700 tabular-nums">{progressPct}%</span>
            </div>
            <div className="w-full h-2 bg-ink-200 rounded-pill overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-6 bg-white rounded-xl border border-ink-200">
            <DreyfusSlider
              value={currentAnswer ?? null}
              onChange={handleSelect}
              tone="brand"
            />
          </div>

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
              {isLast ? 'Voir les résultats' : 'Compétence suivante'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Positionnement;
