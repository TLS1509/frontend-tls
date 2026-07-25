/**
 * FlashcardsViewer : flashcards d'apprentissage avec flip 3D.
 *
 * Phase 14.2a refactor :
 *  - Header (close-only) → <ViewerHeader> tone-aware, progress inline
 *  - Footer nav         → <LessonNavigation> (prev/dots/next molecule)
 *  - Tone inherited from LessonContext (fallback "primary" : visual identity)
 *
 * Phase 14.2c refactor :
 *  - 3D flip mechanics extracted → <FlipCard> DS component
 *
 * Route : /lesson/:id/flashcards
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronRight, Home, Zap, Target, FolderOpen, Brain, RefreshCw } from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { ViewerProgressTrail } from '../components/patterns/ViewerProgressTrail';
import { FlipCard } from '../components/patterns/FlipCard';
import { CompletionModal } from '../components/modals';
import { useLessonContext, resolveAfterLessonRoute } from '../lib/lesson-context';
import { useLessonProgressStore, useCardReviewStore, type CardRating } from '../stores/persistence';
import { TONE_BORDER_500, TONE_HERO_GRADIENT } from '../lib/tone-classes';
import type { PageTone } from '../lib/tone-classes';
import { MOCK_PARCOURS_DATA } from '../data/learningPaths';

interface Flashcard {
  id: number;
  front: {
    title: string;
    category: string;
    icon: React.ReactNode;
    image: string;
  };
  back: {
    content: string;
    details?: string;
  };
}

const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    front: {
      title: 'Raccourcis Clavier Essentiels',
      category: 'PRODUCTIVITÉ',
      icon: <Zap size={28} strokeWidth={1.75} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content:
        'Ctrl+Shift+P : Ouvrir la palette de commandes • Ctrl+K : Recherche rapide • Alt+Tab : Naviguer entre fenêtres',
      details: 'Maîtriser ces raccourcis vous fera gagner des heures chaque semaine.',
    },
  },
  {
    id: 2,
    front: {
      title: 'Les 4 Piliers du Prompt',
      category: 'PROMPT ENGINEERING',
      icon: <Target size={28} strokeWidth={1.75} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content: 'RÔLE : CONTEXTE : INSTRUCTION : FORMAT',
      details:
        "Ces 4 éléments permettent de structurer un prompt clair et précis pour obtenir les meilleurs résultats de l'IA.",
    },
  },
  {
    id: 3,
    front: {
      title: 'Organisation de Fichiers',
      category: 'ORGANISATION',
      icon: <FolderOpen size={28} strokeWidth={1.75} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content: 'Utilisez une nomenclature cohérente : YYYY-MM-DD_Projet_Version',
      details: "Une bonne organisation vous fait gagner 30% de temps sur la recherche de documents.",
    },
  },
  {
    id: 4,
    front: {
      title: 'Few-Shot Learning',
      category: 'IA & APPRENTISSAGE',
      icon: <Brain size={28} strokeWidth={1.75} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content: "Donnez 2-3 exemples à l'IA avant votre vraie question pour de meilleurs résultats.",
      details: 'Cette technique améliore la précision des réponses de 40% en moyenne.',
    },
  },
  {
    id: 5,
    front: {
      title: 'Itération de Prompts',
      category: 'OPTIMISATION',
      icon: <RefreshCw size={28} strokeWidth={1.75} className="text-white" />,
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content: 'Testez → Analysez → Affinez → Répétez',
      details:
        "L'itération est la clé pour obtenir des prompts parfaits. Chaque version améliore le résultat.",
    },
  },
];

const TONE_GRADIENT_BG: Record<PageTone, string> = {
  primary: 'bg-gradient-to-b from-primary-50 via-white to-accent-50',
  warm:    'bg-gradient-to-b from-secondary-50 via-white to-accent-50',
  sun:     'bg-gradient-to-b from-accent-50 via-white to-primary-50',
};

export const FlashcardsViewer: React.FC = () => {
  const navigate = useNavigate();
  const { id: itemId } = useParams<{ id: string }>();
  const lessonCtx = useLessonContext();
  const tone: PageTone = lessonCtx?.tone ?? 'primary';

  const progressStore = useLessonProgressStore();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentCard = FLASHCARDS[currentCardIndex];
  const total = FLASHCARDS.length;
  const progressPct = (completedCards.length / total) * 100;

  // ── Répétition espacée (SRS · capstone). Spec : docs/product/SPEC-SRS-repetition-espacee.md
  const cardReview = useCardReviewStore();
  const deckKey = itemId ?? 'flashcards-default';
  const allCardKeys = FLASHCARDS.map((c) => `${deckKey}:${c.id}`);
  const dueToday = cardReview.dueCount(allCardKeys);
  /** Intervalle planifié à afficher juste après un rating (null = boutons visibles). */
  const [lastScheduled, setLastScheduled] = useState<number | null>(null);

  const handleFlip = useCallback(() => setIsFlipped((f) => !f), []);

  const goToCard = useCallback(
    (idx: number) => {
      if (isFlipped) {
        setIsFlipped(false);
        setTimeout(() => setCurrentCardIndex(idx), 300);
      } else {
        setCurrentCardIndex(idx);
      }
    },
    [isFlipped],
  );

  const handleNext = useCallback(() => {
    if (currentCardIndex < total - 1) goToCard(currentCardIndex + 1);
  }, [currentCardIndex, total, goToCard]);

  const handlePrev = useCallback(() => {
    if (currentCardIndex > 0) goToCard(currentCardIndex - 1);
  }, [currentCardIndex, goToCard]);

  /**
   * Note la carte courante (SRS) et planifie sa prochaine révision, puis avance.
   * `again` → l'intervalle retombe à 1 j ; `known` → il s'allonge (3 → 7 → 14 → 30).
   * Le rating est auto-déclaré : AUCUN XP (firewall gamification).
   */
  const handleRate = useCallback(
    (rating: CardRating) => {
      const card = FLASHCARDS[currentCardIndex];
      const review = cardReview.rateCard(`${deckKey}:${card.id}`, rating);
      setLastScheduled(review.intervalDays);
      setCompletedCards((prev) => (prev.includes(currentCardIndex) ? prev : [...prev, currentCardIndex]));
      // Laisser lire « prochaine révision dans X j », puis avancer (flip-back géré par goToCard).
      window.setTimeout(() => {
        setLastScheduled(null);
        if (currentCardIndex < total - 1) goToCard(currentCardIndex + 1);
        else setIsFlipped(false);
      }, 900);
    },
    [cardReview, deckKey, currentCardIndex, total, goToCard],
  );

  const handleClose = useCallback(() => {
    if (lessonCtx) {
      navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
    } else {
      navigate(-1);
    }
  }, [navigate, lessonCtx]);

  const markCompleted = useCallback(() => {
    const id = itemId ?? 'flashcards-default';
    progressStore.setSection(id, 0, 1);
    progressStore.completeSection(id, 0);
  }, [itemId, progressStore]);

  const handleFinish = useCallback(() => {
    markCompleted();
    setShowCompletion(true);
  }, [markCompleted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === ' ' || e.key === 'Enter') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'BUTTON' && tag !== 'A' && tag !== 'INPUT') {
          e.preventDefault();
          handleFlip();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, handleNext, handlePrev, handleFlip]);

  return (
    <div
      className={['fixed inset-0 z-modal flex flex-col', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Flashcards d'apprentissage"
    >
      {/* ── Header (sticky, no shrink) ────────────────────────────────── */}
      <ViewerHeader
        tone={tone}
        eyebrow="Flashcards"
        title={lessonCtx ? lessonCtx.lesson.title : "Flashcards d'apprentissage"}
        subtitle={`${completedCards.length} / ${total} comprises`}
        current={currentCardIndex + 1}
        total={total}
        progress={progressPct}
        onClose={handleClose}
        className="shrink-0"
      />

      {/* ── Breadcrumb navigation (clickable) ──────────────────────────── */}
      {lessonCtx && (
        <div className="shrink-0 px-4 sm:px-6 lg:px-10 py-1 flex items-center gap-1 text-micro text-ink-400 font-medium border-b border-ink-100/50">
          <button
            type="button"
            onClick={() => navigate(`/learning-paths/${lessonCtx.parcoursId}`)}
            className="inline-flex items-center gap-1 hover:text-primary-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          >
            <Home size={12} aria-hidden />
            {MOCK_PARCOURS_DATA[lessonCtx.parcoursId]?.title || 'Parcours'}
          </button>
          <ChevronRight size={12} aria-hidden className="opacity-50" />
          <button
            type="button"
            onClick={() => navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`)}
            className="hover:text-primary-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          >
            {lessonCtx.lesson.title}
          </button>
          <ChevronRight size={12} aria-hidden className="opacity-50" />
          <span className="text-ink-500">Flashcard {currentCardIndex + 1}/{total}</span>
        </div>
      )}

      {/* ── Content container (grows, no scroll) ──────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 lg:px-10 py-2 gap-2 overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col gap-2 w-full">

          {/* ── Progress bar ──────────────────────────────────────────── */}
          <ViewerProgressTrail
            current={currentCardIndex}
            total={total}
            tone={tone}
            style="bar"
          />

          {/* ── Thumbnails grid (shrinkable) ──────────────────────────── */}
          <div className="flex gap-1.5 justify-center flex-wrap" role="tablist" aria-label="Sélection de flashcard">
            {FLASHCARDS.map((card, index) => {
              const active = index === currentCardIndex;
              const done = completedCards.includes(index);
              return (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Aller à la flashcard ${index + 1}`}
                  onClick={() => goToCard(index)}
                  className={[
                    'relative shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-base',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    active
                      ? `border-[2px] ${TONE_BORDER_500[tone]} scale-110 opacity-100`
                      : 'border border-ink-200 opacity-40 hover:opacity-70',
                  ].join(' ')}
                >
                  <img
                    src={card.front.image}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {done && (
                    <div className="absolute inset-0 flex items-center justify-center bg-success-base/90">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Compteur SRS : cartes dues aujourd'hui ── */}
          {dueToday > 0 && (
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary-50 border border-primary-100 px-3 py-1 text-caption font-semibold text-primary-800">
                <Brain size={13} aria-hidden /> {dueToday} à réviser aujourd'hui
              </span>
            </div>
          )}

          {/* ── Main flashcard (3D flip, centered, height-constrained) ── */}
          <div className="flex-1 flex items-center justify-center min-h-[300px] max-h-[400px]">
            <FlipCard
              front={currentCard.front}
              back={currentCard.back}
              isFlipped={isFlipped}
              onFlip={handleFlip}
              tone={tone}
            />
          </div>

          {/* ── Rating SRS (répétition espacée) — n'apparaît qu'après le flip ── */}
          {isFlipped && (
            <div className="flex flex-col items-center gap-stack-xs pb-stack" aria-live="polite">
              {lastScheduled != null ? (
                <p className="inline-flex items-center gap-1.5 text-caption font-semibold text-success-fg" role="status">
                  <Check size={14} /> Noté — prochaine révision dans {lastScheduled}{' '}
                  {lastScheduled > 1 ? 'jours' : 'jour'}.
                </p>
              ) : (
                <>
                  <p className="text-micro text-ink-500">Tu la savais&nbsp;?</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleRate('again')}
                      className="inline-flex items-center gap-1.5 min-h-touch px-4 py-2.5 rounded-lg bg-white text-ink-700 border border-ink-200 font-body text-caption font-semibold hover:bg-ink-50 hover:border-ink-300 active:scale-95 transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      <RefreshCw size={14} />
                      À revoir
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRate('known')}
                      className="inline-flex items-center gap-1.5 min-h-touch px-4 py-2.5 rounded-lg bg-success-base text-white font-body text-caption font-semibold shadow-[0_2px_8px_rgba(157,190,186,0.3)] hover:bg-success-fg hover:scale-105 active:scale-95 transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success-base"
                    >
                      <Check size={14} />
                      Je le savais
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Footer navigation (sticky at bottom) ────────────────────────── */}
      <div className="shrink-0 px-4 sm:px-6 lg:px-10 py-stack border-t border-ink-100/50 backdrop-blur-glass-light">
        <div className="max-w-3xl mx-auto">
          <LessonNavigation
            tone={tone}
            current={currentCardIndex + 1}
            total={total}
            onPrev={handlePrev}
            onNext={handleNext}
            onFinish={handleFinish}
            onDotSelect={(idx) => goToCard(idx)}
            finishLabel="Terminer les flashcards"
          />
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletion}
        itemTitle={lessonCtx?.lesson.title ?? 'Flashcards d\'apprentissage'}
        xpEarned={50}
        onClose={() => {
          setShowCompletion(false);
          navigate(resolveAfterLessonRoute(lessonCtx));
        }}
      />
    </div>
  );
};

export default FlashcardsViewer;
