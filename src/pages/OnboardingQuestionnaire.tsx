import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save, Target } from 'lucide-react';
import SectionCard from '../components/patterns/SectionCard';
import { Button } from '../components/core/Button';
import { Stepper } from '../components/ui/Stepper';
import { ProgressBar } from '../components/ui/ProgressBar';
import { DreyfusLevelSelector } from '../components/ui/DreyfusLevelSelector';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { buildOnboardingQuestionnaire } from '../lib/onboarding-questionnaire';
import { usePositioningStore, usePasseportStore, useOnboardingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import { OnboardingQuestionnaireConversational } from './OnboardingQuestionnaireConversational';
import type { DreyfusLevel } from '../types/learning';

const ONBOARDING_PARCOURS_ID = 'onboarding-initial';

const OnboardingQuestionnaire: React.FC = () => {
  const navigate = useNavigate();
  const positioningStore = usePositioningStore();
  const passeportStore = usePasseportStore();
  const onboardingStore = useOnboardingStore();

  // ── CDC §03 — dynamic 3-30 questions based on user's selected goals ──
  const QUESTIONS = React.useMemo(
    () => buildOnboardingQuestionnaire(onboardingStore.goals),
    [onboardingStore.goals]
  );

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const total = QUESTIONS.length;

  // ── CDC §UJ #1a vs #1b — Individual gets conversational, invited gets form ──
  const isIndividual = onboardingStore.accountType === 'individual';

  const persistAndContinue = (
    finalAnswers: Record<number, DreyfusLevel | number>,
    _elaborations?: Record<number, string>
  ) => {
    // Persist positioning result (Cahier #01 / #03)
    const positioningAnswers = QUESTIONS.map((question) => ({
      competenceId: question.competenceId,
      level: (finalAnswers[question.id] ?? 1) as DreyfusLevel,
    }));
    positioningStore.set(MOCK_USER_ID, ONBOARDING_PARCOURS_ID, positioningAnswers);

    // Seed LearnerCompetency baselines in Passeport
    QUESTIONS.forEach((question) => {
      const level = (finalAnswers[question.id] ?? 1) as DreyfusLevel;
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

    onboardingStore.markStepComplete('questionnaire');

    if (onboardingStore.requiresPayment()) {
      onboardingStore.goToStep('payment');
      navigate('/onboarding/payment');
    } else {
      onboardingStore.goToStep('tutorial');
      navigate('/onboarding/tutorial');
    }
  };

  // ── Conversational variant : Individual (CDC §UJ #1a) ──
  if (isIndividual) {
    return (
      <main className="min-h-screen bg-gradient-page-ambient-warm">
        <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-10 pt-14 md:pt-section pb-section flex flex-col gap-section">

          <Stepper items={buildOnboardingStepperItems('positionnement', onboardingStore.accountType)} orientation="horizontal" />

          <header className="flex flex-col gap-tight text-center">
            <p className="m-0 inline-flex items-center justify-center gap-2 font-body text-caption font-semibold uppercase tracking-wider text-secondary-600">
              <Target size={14} aria-hidden="true" />
              Positionnement Dreyfus
            </p>
            <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
              Évaluons ton niveau de départ
            </h1>
            <p className="m-0 font-body text-body text-ink-600 max-w-prose mx-auto leading-relaxed">
              Une conversation guidée — {total} compétences à évaluer.
            </p>
          </header>

          <OnboardingQuestionnaireConversational
            questions={QUESTIONS}
            firstName={onboardingStore.firstName}
            requiresPayment={onboardingStore.requiresPayment()}
            onComplete={(ans, elab) => persistAndContinue(ans, elab)}
          />
        </div>
      </main>
    );
  }

  // ── Form variant : Company learner (CDC §UJ #1b) ──
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
      persistAndContinue(answers);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <main className="min-h-screen bg-gradient-page-ambient-warm">
      <div className="max-w-content mx-auto w-full px-4 sm:px-6 lg:px-10 pt-14 md:pt-section pb-section flex flex-col gap-section">

        <Stepper items={buildOnboardingStepperItems('positionnement', onboardingStore.accountType)} orientation="horizontal" />

        <header className="flex flex-col gap-tight text-center">
          <p className="m-0 inline-flex items-center justify-center gap-2 font-body text-caption font-semibold uppercase tracking-wider text-secondary-600">
            <Target size={14} aria-hidden="true" />
            Positionnement Dreyfus
          </p>
          <h1 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
            Évaluons ton niveau de départ
          </h1>
          <p className="m-0 font-body text-body text-ink-600 max-w-prose mx-auto leading-relaxed">
            {total} questions pour adapter ton parcours. Tu pourras ajuster ces niveaux à tout moment depuis ton Passeport.
          </p>
        </header>

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
          className="!bg-white/70 backdrop-blur-glass-medium border border-white/60 shadow-lg"
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
            {currentQ < total - 1
              ? 'Suivant'
              : onboardingStore.requiresPayment()
              ? 'Continuer vers le paiement'
              : 'Continuer vers le tutoriel'}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OnboardingQuestionnaire;
