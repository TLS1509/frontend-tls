/**
 * CompletionModal — shown when a viewer item (astuces, flashcards, video, etc.)
 * is fully consumed. Celebrates completion, shows XP earned, and optionally
 * surfaces the next suggested item.
 *
 * Usage:
 *   <CompletionModal
 *     isOpen={showCompletion}
 *     itemTitle="Raccourcis Clavier"
 *     xpEarned={50}
 *     nextItem={{ title: 'Flashcards Productivité', type: 'flashcard' }}
 *     onClose={() => navigate('/learning-space')}
 *     onNext={() => navigate(nextRoute)}
 *   />
 */

import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, X, Zap } from 'lucide-react';
import { Button } from '../core/Button';

export interface CompletionNextItem {
  title: string;
  type: string;
  duration?: string;
}

export interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Title of the completed item. */
  itemTitle?: string;
  /** XP points awarded for completion. */
  xpEarned?: number;
  /** Optional next suggested item. */
  nextItem?: CompletionNextItem;
  /** Called when user clicks "Voir le prochain". */
  onNext?: () => void;
  /** Custom heading — defaults to "Terminé !" */
  title?: string;
  /** Custom description. */
  description?: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  itemTitle,
  xpEarned = 50,
  nextItem,
  onNext,
  title = 'Terminé !',
  description,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-modal-bd-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-modal-title"
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl overflow-hidden bg-white shadow-lg animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Gradient header band ───────────────────────────────── */}
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white text-center overflow-hidden">
          {/* Decorative ambient blobs */}
          <div
            aria-hidden
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent-400/20 pointer-events-none"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          >
            <X size={15} strokeWidth={2.5} />
          </button>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 ring-4 ring-white/30 mb-4">
            <CheckCircle2 size={32} className="text-white" strokeWidth={2} />
          </div>

          <h2
            id="completion-modal-title"
            className="m-0 font-display text-h2 font-bold tracking-display leading-tight text-white"
          >
            {title}
          </h2>

          {itemTitle && (
            <p className="m-0 mt-1 text-body-sm text-white/75 leading-snug line-clamp-2">
              {itemTitle}
            </p>
          )}

          {description && (
            <p className="m-0 mt-2 text-body-sm text-white/80 leading-snug">
              {description}
            </p>
          )}
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="px-8 py-6 flex flex-col gap-stack">
          {/* XP badge */}
          {xpEarned > 0 && (
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent-50 border border-accent-200">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent-400 text-white shrink-0">
                <Zap size={14} strokeWidth={2.5} />
              </span>
              <span className="font-body text-body-sm font-semibold text-accent-700">
                +{xpEarned} XP gagnés
              </span>
              <Sparkles size={14} className="text-accent-500 ml-auto shrink-0" aria-hidden />
            </div>
          )}

          {/* Next item suggestion */}
          {nextItem && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="group w-full text-left px-4 py-3 rounded-xl bg-ink-50 border border-ink-100 hover:bg-primary-50 hover:border-primary-200 transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <span className="block text-micro font-bold text-ink-400 uppercase tracking-[0.07em] mb-0.5">
                Continuer avec
              </span>
              <span className="flex items-center justify-between gap-2">
                <span className="font-body text-body-sm font-semibold text-ink-800 group-hover:text-primary-700 transition-colors line-clamp-1">
                  {nextItem.title}
                </span>
                <ArrowRight size={14} className="text-ink-400 group-hover:text-primary-600 shrink-0 transition-colors" aria-hidden />
              </span>
              {nextItem.duration && (
                <span className="block text-micro text-ink-400 mt-0.5">
                  {nextItem.type} · {nextItem.duration}
                </span>
              )}
            </button>
          )}

          {/* Actions */}
          <div className="flex gap-stack-xs">
            {nextItem && onNext ? (
              <>
                <Button variant="secondary" size="md" onClick={onClose} className="flex-1">
                  Retour
                </Button>
                <Button variant="primary" size="md" trailingIcon={<ArrowRight size={15} />} onClick={onNext} className="flex-1">
                  Suivant
                </Button>
              </>
            ) : (
              <Button variant="primary" size="md" fullWidth onClick={onClose}>
                Retour à l'espace
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
