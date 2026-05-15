/**
 * FlashcardsViewer — flashcards d'apprentissage avec flip 3D.
 *
 * Phase 14.2a refactor :
 *  - Header (close-only) → <ViewerHeader> tone-aware, progress inline
 *  - Footer nav         → <LessonNavigation> (prev/dots/next molecule)
 *  - Tone inherited from LessonContext (fallback "primary" — visual identity)
 *  - 3D flip mechanics & thumbnails strip preserved (extraction → Phase 14.2c)
 *
 * Route : /lesson/:id/flashcards
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, RotateCw } from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { useLessonContext, resolveAfterLessonRoute } from '../lib/lesson-context';
import { TONE_BG_500, TONE_HERO_GRADIENT, TONE_BORDER_500 } from '../lib/tone-classes';
import type { PageTone } from '../lib/tone-classes';

interface Flashcard {
  id: number;
  front: {
    title: string;
    category: string;
    icon: string;
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
      icon: '⚡',
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
      icon: '🎯',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1080&q=80',
    },
    back: {
      content: 'RÔLE — CONTEXTE — INSTRUCTION — FORMAT',
      details:
        "Ces 4 éléments permettent de structurer un prompt clair et précis pour obtenir les meilleurs résultats de l'IA.",
    },
  },
  {
    id: 3,
    front: {
      title: 'Organisation de Fichiers',
      category: 'ORGANISATION',
      icon: '📁',
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
      icon: '🧠',
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
      icon: '🔄',
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
  const lessonCtx = useLessonContext();
  const tone: PageTone = lessonCtx?.tone ?? 'primary';

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const currentCard = FLASHCARDS[currentCardIndex];
  const total = FLASHCARDS.length;
  const progressPct = (completedCards.length / total) * 100;

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

  const handleMarkUnderstood = useCallback(() => {
    if (!completedCards.includes(currentCardIndex)) {
      setCompletedCards((prev) => [...prev, currentCardIndex]);
    }
    if (currentCardIndex < total - 1) handleNext();
  }, [completedCards, currentCardIndex, total, handleNext]);

  const handleClose = useCallback(() => {
    if (lessonCtx) {
      navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
    } else {
      navigate(-1);
    }
  }, [navigate, lessonCtx]);

  const handleFinish = useCallback(() => {
    navigate(resolveAfterLessonRoute(lessonCtx));
  }, [navigate, lessonCtx]);

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
      className={['fixed inset-0 z-modal overflow-y-auto', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Flashcards d'apprentissage"
    >
      <ViewerHeader
        tone={tone}
        eyebrow="Flashcards"
        title={lessonCtx ? lessonCtx.lesson.title : "Flashcards d'apprentissage"}
        subtitle={`${completedCards.length} / ${total} comprises`}
        current={currentCardIndex + 1}
        total={total}
        progress={progressPct}
        onClose={handleClose}
      />

      <main className="py-stack-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-stack-lg">

          {/* ── Title block ─────────────────────────────────────── */}
          <header className="flex items-center gap-stack">
            <div
              className={[
                'w-10 h-10 rounded-xl inline-flex items-center justify-center shadow-sm',
                TONE_HERO_GRADIENT[tone],
              ].join(' ')}
            >
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
              Flashcards d'apprentissage
            </h1>
          </header>

          {/* ── Thumbnails ──────────────────────────────────────── */}
          <div className="flex gap-3 justify-center flex-wrap" role="tablist" aria-label="Sélection de flashcard">
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
                    'relative shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-base',
                    active
                      ? `border-[3px] ${TONE_BORDER_500[tone]} scale-105 opacity-100`
                      : 'border-2 border-ink-200 opacity-50 hover:opacity-80',
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
                      <Check size={24} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Main flashcard (3D flip — preserved from v1) ────── */}
          <div className="relative" style={{ perspective: '1500px', height: '380px' }}>
            <div
              className="relative w-full h-full transition-transform duration-700 ease-standard"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <button
                type="button"
                onClick={handleFlip}
                aria-label="Retourner la flashcard"
                className={[
                  'absolute inset-0 rounded-2xl overflow-hidden cursor-pointer border-[3px] shadow-[0_8px_32px_rgba(85,161,180,0.18)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                  TONE_BORDER_500[tone],
                ].join(' ')}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className="absolute inset-0">
                  <img
                    src={currentCard.front.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                </div>

                <div className="relative z-base flex flex-col items-center justify-center h-full p-section gap-stack text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
                    <span className="text-[2rem] leading-none" aria-hidden>
                      {currentCard.front.icon}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-4 py-1.5 rounded-pill bg-white/90 backdrop-blur-glass-light text-ink-900 text-micro font-bold uppercase tracking-wider">
                    {currentCard.front.category}
                  </span>

                  <h2 className="m-0 font-display text-h3 sm:text-h2 font-bold text-white leading-tight max-w-prose [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
                    {currentCard.front.title}
                  </h2>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-white/15 backdrop-blur-glass-light border border-white/30">
                    <RotateCw size={16} className="text-white" />
                    <span className="font-body text-caption font-medium text-white">
                      Cliquez pour voir la réponse
                    </span>
                  </div>
                </div>
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={handleFlip}
                aria-label="Retourner la flashcard"
                className={[
                  'absolute inset-0 rounded-2xl overflow-hidden cursor-pointer p-section border-[3px] shadow-[0_8px_32px_rgba(85,161,180,0.18)]',
                  TONE_HERO_GRADIENT[tone],
                  TONE_BORDER_500[tone],
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                ].join(' ')}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex flex-col justify-center items-center h-full text-white text-center gap-stack-lg">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
                    <span className="text-[1.75rem] leading-none" aria-hidden>
                      {currentCard.front.icon}
                    </span>
                  </div>

                  <p className="m-0 font-body text-h4 sm:text-h3 font-semibold leading-relaxed max-w-[600px]">
                    {currentCard.back.content}
                  </p>

                  {currentCard.back.details && (
                    <p className="m-0 font-body text-body-sm leading-relaxed opacity-90 max-w-[500px]">
                      {currentCard.back.details}
                    </p>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* ── Mark as understood (only when flipped + not done) ── */}
          {isFlipped && !completedCards.includes(currentCardIndex) && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleMarkUnderstood}
                className="inline-flex items-center gap-2 min-h-touch px-5 py-3 rounded-xl bg-success-base text-white font-body text-body-sm font-semibold shadow-[0_4px_16px_rgba(157,190,186,0.4)] hover:bg-success-fg hover:scale-105 active:scale-95 transition-all duration-base"
              >
                <Check size={16} />
                Marquer comme compris
              </button>
            </div>
          )}

          {/* ── Footer navigation ───────────────────────────────── */}
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
      </main>
    </div>
  );
};

export default FlashcardsViewer;
