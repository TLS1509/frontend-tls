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
 *  4. La compétence en h2 + DreyfusLevelSelector (1 question par compétence)
 *  5. Footer nav : Précédent + Suivant
 *  6. État final : h1, niveau moyen et compétences en rangées + CTA "Commencer le parcours"
 *
 * Route : /learning-paths/:id/positionnement
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { ProgressBar } from '../components/ui/ProgressBar';
import { DreyfusLevelSelector } from '../components/ui/DreyfusLevelSelector';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { useToastContext } from '../contexts/ToastContext';
import { getFirstLessonId, getParcoursCompetenceIds, MOCK_PARCOURS_DATA } from '../data/learningPaths';
import { getCompetenceById, DREYFUS_LABELS } from '../data/competencies';
import { usePositioningStore } from '../stores/persistence';
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

  /* Le nom du parcours tient la barre du lecteur ; le titre de l'écran vit
     dans le contenu, en h1 (passe typographique du 24/09). */
  const parcoursTitle = MOCK_PARCOURS_DATA[id]?.title ?? 'Parcours';

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
      toast.warning('Choisis un niveau avant de continuer', 'Niveau requis');
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

    /* L'écran de résultats, retravaillé le 24/09 : un h1 dans le contenu (la
       barre le portait, à 16 px) ; le niveau moyen comme une valeur (League
       Spartan au cran 800 : il était au 600, 3,66:1) ; les compétences en
       rangées, leur niveau en MetaPill (une donnée — elles étaient en Badge
       capitales). Le tout calé à gauche : le paragraphe centré courait sur
       deux lignes et demie. */
    return (
      <div className="min-h-[100dvh] bg-gradient-page-ambient flex flex-col">
        <ViewerHeader
          onBack={() => navigate(`/learning-paths/${id}`)}
          backLabel="Retour au parcours"
          eyebrow="Positionnement"
          title={parcoursTitle}
        />

        <div className="flex-1 px-4 sm:px-6 lg:px-10 py-section md:py-section-lg">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-section">
            <header className="flex flex-col gap-stack-sm">
              <h1 className="font-display text-h1 text-ink-900">
                Ton positionnement est enregistré
              </h1>
              <p className="font-body text-body-lg text-ink-700 max-w-prose">
                Nous avons évalué tes {total} compétences clés. Le contenu du parcours
                s'adapte à ta progression.
              </p>
            </header>

            <Card className="flex flex-col gap-stack-lg">
              {/* La valeur et son libellé, sur la même ligne de base. */}
              <div className="flex flex-col gap-stack-3xs">
                <p className="font-body text-caption font-semibold text-ink-600">Niveau moyen</p>
                <p className="flex items-baseline gap-stack-xs">
                  <span className="font-display text-h1 text-primary-800 tabular-nums">D{avgLevel}</span>
                  <span className="font-body text-body-lg text-ink-900">
                    {DREYFUS_LABELS[avgLevel as DreyfusLevel]}
                  </span>
                </p>
              </div>

              {/* Deux parties de la même carte, deux libellés de même voix
                  (13/600 ink-600) : « Niveau moyen » et celui-ci. */}
              <div className="flex flex-col gap-stack-3xs pt-stack-lg border-t border-ink-100">
                <p className="font-body text-caption font-semibold text-ink-600">Compétences positionnées</p>
                <ul className="divide-y divide-ink-100">
                  {Object.entries(answers).map(([compId, level]) => {
                    const comp = getCompetenceById(compId);
                    return (
                      <li key={compId} className="flex items-center justify-between gap-stack py-stack-sm">
                        <span className="font-body text-body text-ink-900">{comp?.label ?? compId}</span>
                        <MetaPill
                          tone="brand"
                          text={`D${level} · ${DREYFUS_LABELS[level as DreyfusLevel]}`}
                          className="shrink-0"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>

            {/* « Commencer le parcours » est l'aplat de l'écran (arbitrage
                n°19). « Refaire » efface les réponses : un `ghost` neutre,
                comme « Réinitialiser » — il était en `outline`, réservé à
                Annuler dans une paire. */}
            <div className="flex flex-col-reverse sm:flex-row gap-stack sm:justify-between">
              <Button
                emphasis="ghost"
                tone="neutral"
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
                emphasis="solid"
                size="md"
                trailingIcon={<ArrowRight size={14} />}
                onClick={handleStartPath}
              >
                Commencer le parcours
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Questionnaire ─────────────────────────────────────────────────── */
  /* Retravaillé le 24/09 : le titre de l'écran est un h1 dans le contenu (la
     barre du lecteur le portait en h1 à 16 px, check-typo le relevait) ; la
     compétence évaluée est la question, posée sur la page en h2 28 avec sa
     description — elle était un h3 20 dans une carte vitrée qui contenait
     elle-même cinq cartes. Le compteur de la barre disparaît : il doublait
     « Compétence 1 sur 3 » et sa jauge. */
  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col">
      <ViewerHeader
        onBack={() => navigate(`/learning-paths/${id}`)}
        backLabel="Retour au parcours"
        eyebrow="Positionnement"
        title={parcoursTitle}
      />

      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-section md:py-section-lg">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-page">

          {/* En-tête de l'écran : titre, chapô, puis l'avancement (12 sous le
              chapô ; 16 entre les deux groupes). */}
          <header className="flex flex-col gap-stack">
            <div className="flex flex-col gap-stack-sm">
              <h1 className="font-display text-h1 text-ink-900">Évaluons ton niveau</h1>
              <p className="font-body text-body-lg text-ink-700 max-w-prose">
                Pour chaque compétence du parcours, choisis le niveau qui te décrit aujourd'hui.
              </p>
            </div>
            <div className="flex flex-col gap-stack-xs">
              <div className="flex items-baseline justify-between font-body text-caption text-ink-600">
                <span className="tabular-nums">Compétence {currentIndex + 1} sur {total}</span>
                <span className="font-semibold text-primary-800 tabular-nums">{progressPct}{' '}%</span>
              </div>
              <ProgressBar value={progressPct} max={100} fill="brand" size="md" valueLabel={false} />
            </div>
          </header>

          {/* La question : la compétence (h2), sa description, les cinq niveaux,
              puis les actions à 24. */}
          <section className="flex flex-col gap-stack" aria-labelledby="positionnement-competence">
            <div className="flex flex-col gap-stack-3xs">
              <h2 id="positionnement-competence" className="font-display text-h2 text-ink-900">
                {currentQuestion.competenceLabel}
              </h2>
              {currentQuestion.competenceDescription && (
                <p className="font-body text-body text-ink-700 max-w-prose">
                  {currentQuestion.competenceDescription}
                </p>
              )}
            </div>

            <DreyfusLevelSelector
              tone="brand"
              value={currentAnswer ?? undefined}
              onChange={(lv) => handleSelect(lv as DreyfusLevel)}
              aria-label={`Niveau Dreyfus pour ${currentQuestion.competenceLabel}`}
            />

            {/* Footer nav — à 24 de la question. Sous 640 px les deux actions
                s'empilent sur toute la largeur, la suivante d'abord avec sa
                raison dessous : côte à côte, « Compétence suivante » sortait de
                l'écran de 30 px à 375. Avancer est l'aplat de l'écran,
                « Précédent » un `ghost` neutre, comme dans les lecteurs
                (arbitrage n°19) : les deux étaient en `soft`, de deux tons. */}
            <div className="mt-stack-xs flex flex-col-reverse gap-stack-sm sm:flex-row sm:items-start sm:justify-between">
              <Button
                emphasis="ghost" tone="neutral"
                size="md"
                leadingIcon={<ArrowLeft size={14} />}
                onClick={handlePrev}
                disabled={isFirst}
              >
                Précédent
              </Button>

              {/* Désactivé tant qu'aucun niveau n'est choisi : actif, il laissait
                  croire qu'on pouvait passer, puis répondait par un toast. La
                  raison est écrite sous le bouton plutôt que devinée. */}
              <div className="flex flex-col gap-stack-xs sm:items-end">
                <Button
                  emphasis="solid"
                  size="md"
                  trailingIcon={<ArrowRight size={14} />}
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  aria-describedby={!currentAnswer ? 'positionnement-requis' : undefined}
                >
                  {isLast ? 'Voir les résultats' : 'Compétence suivante'}
                </Button>
                {!currentAnswer && (
                  <p id="positionnement-requis" className="font-body text-caption text-ink-600 sm:text-right">
                    Choisis un niveau pour continuer.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Positionnement;
