/**
 * FlashcardsViewer — design Figma "Learning App" porté sur le DS TLS.
 *
 * Layout :
 *  - Plein écran gradient primary-50 → accent cream.
 *  - X close top-right.
 *  - Progress card glass : icon gradient, titre, compteur, progress bar.
 *  - Thumbnails row : 5 cards 64×64, active border-3 primary + scale,
 *    completed = green overlay + check.
 *  - Main 3D flip card :
 *    • Front : image cover + dark overlay + icon glass + category pill + titre.
 *    • Back : gradient primary→secondary, icon glass, content, details.
 *  - Bouton "Marquer comme compris" (success) après flip.
 *  - Navigation : Précédent | dots | Suivant / Terminer.
 *
 * Route : /lesson/:id/flashcards
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Check, Sparkles, RotateCw } from 'lucide-react';

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

export const FlashcardsViewer: React.FC = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const currentCard = FLASHCARDS[currentCardIndex];
  const progress = (completedCards.length / FLASHCARDS.length) * 100;

  const handleFlip = () => setIsFlipped((f) => !f);

  const handleNext = () => {
    if (isFlipped) setIsFlipped(false);
    setTimeout(
      () => {
        if (currentCardIndex < FLASHCARDS.length - 1) setCurrentCardIndex((i) => i + 1);
      },
      isFlipped ? 300 : 0,
    );
  };

  const handlePrev = () => {
    if (isFlipped) setIsFlipped(false);
    setTimeout(
      () => {
        if (currentCardIndex > 0) setCurrentCardIndex((i) => i - 1);
      },
      isFlipped ? 300 : 0,
    );
  };

  const handleMarkUnderstood = () => {
    if (!completedCards.includes(currentCardIndex)) {
      setCompletedCards((prev) => [...prev, currentCardIndex]);
    }
    if (currentCardIndex < FLASHCARDS.length - 1) handleNext();
  };

  const handleThumbClick = (idx: number) => {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex(idx), 300);
  };

  const handleClose = () => navigate(-1);

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
  });

  return (
    <div
      className="fixed inset-0 z-modal overflow-y-auto bg-gradient-to-b from-primary-50 via-white to-accent-50"
      role="dialog"
      aria-modal="true"
      aria-label="Flashcards d'apprentissage"
    >
      <div className="min-h-screen py-stack-lg px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-stack">

          {/* ── Close button ─────────────────────────────────────── */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer"
              className="inline-flex items-center justify-center w-11 h-11 rounded-pill bg-white/70 backdrop-blur-glass-light border border-ink-100 text-ink-700 hover:bg-white hover:text-ink-900 active:scale-95 transition-all duration-base"
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Progress card ────────────────────────────────────── */}
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-glass-light border-[3px] border-primary-500 shadow-[0_8px_32px_rgba(85,161,180,0.15)]">
            <div className="flex items-center justify-between mb-stack">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 inline-flex items-center justify-center shadow-sm">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="m-0 font-display text-body font-bold text-ink-900">
                    💡 Flashcards d'apprentissage
                  </h2>
                  <p className="m-0 font-body text-caption text-ink-500">
                    {completedCards.length} / {FLASHCARDS.length} comprises
                  </p>
                </div>
              </div>
              <div className="font-display text-h4 font-bold text-primary-600 tabular-nums">
                {currentCardIndex + 1} / {FLASHCARDS.length}
              </div>
            </div>

            <div className="h-2 rounded-pill bg-ink-100 overflow-hidden">
              <div
                className="h-full rounded-pill bg-gradient-to-r from-primary-500 to-accent-400 transition-all duration-slow"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* ── Thumbnails ──────────────────────────────────────── */}
          <div className="flex gap-3 justify-center flex-wrap">
            {FLASHCARDS.map((card, index) => {
              const active = index === currentCardIndex;
              const done = completedCards.includes(index);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleThumbClick(index)}
                  aria-label={`Aller à la flashcard ${index + 1}`}
                  aria-current={active ? 'true' : 'false'}
                  className={[
                    'relative shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-base',
                    active
                      ? 'border-[3px] border-primary-500 scale-105 opacity-100'
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

          {/* ── Main flashcard (3D flip) ────────────────────────── */}
          <div
            className="relative"
            style={{ perspective: '1500px', height: '380px' }}
          >
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
                className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer border-[3px] border-primary-500 shadow-[0_8px_32px_rgba(85,161,180,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
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
                className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer p-section border-[3px] border-primary-500 shadow-[0_8px_32px_rgba(85,161,180,0.2)] bg-gradient-to-br from-primary-500 to-secondary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-success-base text-white font-body text-body-sm font-semibold shadow-[0_4px_16px_rgba(157,190,186,0.4)] hover:bg-success-fg hover:scale-105 active:scale-95 transition-all duration-base"
              >
                <Check size={16} />
                Marquer comme compris
              </button>
            </div>
          )}

          {/* ── Navigation ──────────────────────────────────────── */}
          <nav aria-label="Navigation flashcards" className="flex items-center justify-between gap-stack">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentCardIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/70 backdrop-blur-glass-light border border-ink-100 text-ink-800 font-body text-body-sm font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-base"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <div className="flex items-center gap-2" role="tablist">
              {FLASHCARDS.map((_, idx) => {
                const active = idx === currentCardIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Flashcard ${idx + 1}`}
                    onClick={() => handleThumbClick(idx)}
                    className={[
                      'h-2.5 rounded-pill transition-all duration-base',
                      active ? 'w-8 bg-primary-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300',
                    ].join(' ')}
                  />
                );
              })}
            </div>

            {currentCardIndex < FLASHCARDS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 text-white font-body text-body-sm font-semibold shadow-[0_4px_16px_rgba(85,161,180,0.3)] hover:scale-105 active:scale-95 transition-all duration-base"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-success-base text-white font-body text-body-sm font-semibold shadow-[0_4px_16px_rgba(157,190,186,0.4)] hover:bg-success-fg hover:scale-105 active:scale-95 transition-all duration-base"
              >
                <Check size={16} />
                <span className="hidden sm:inline">Terminer</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsViewer;
