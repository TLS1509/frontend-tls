/**
 * CompletionModal — shown when a viewer item (astuces, flashcards, video, etc.)
 * is fully consumed. Dit calmement ce qui s'est passé (l'étape est validée) et
 * propose, s'il y en a un, le contenu suivant.
 *
 * Arbitrage n°18 (2026-09-24) : plus d'XP dans l'app apprenant. La modale
 * affichait « +50 XP gagnés » par défaut, avec une étincelle décorative ; le
 * bloc est retiré, et `xpEarned` n'a plus d'effet (voir la prop).
 *
 * Usage:
 *   <CompletionModal
 *     isOpen={showCompletion}
 *     itemTitle="Raccourcis Clavier"
 *     nextItem={{ title: 'Flashcards Productivité', type: 'flashcard' }}
 *     onClose={() => navigate('/learning-space')}
 *     onNext={() => navigate(nextRoute)}
 *   />
 */

import React from 'react';
import { CheckCircle2, ArrowRight, X } from 'lucide-react';
import { Button } from '../core/Button';
import { useDialog } from '../../hooks/useDialog';

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
  /**
   * @deprecated Sans effet depuis l'arbitrage n°18 (2026-09-24) : l'app
   * apprenant n'affiche plus d'XP. Gardée le temps que la vitrine cesse de la
   * passer, puis à retirer.
   */
  xpEarned?: number;
  /** Optional next suggested item. */
  nextItem?: CompletionNextItem;
  /** Called when user clicks "Voir le prochain". */
  onNext?: () => void;
  /** Custom heading — defaults to "Étape validée" */
  title?: string;
  /** Custom description. */
  description?: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  itemTitle,
  nextItem,
  onNext,
  title = 'Étape validée',
  description,
}) => {
  // Comportement de dialogue partagé (APG) : focus entrant, Tab piégé, Échap, focus rendu.
  const dialog = useDialog<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-modal-bd-in"
      onClick={onClose}
      ref={dialog.ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-modal-title"
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl overflow-hidden bg-white shadow-lg animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Gradient header band ───────────────────────────────── */}
        <div className="relative px-section pt-section pb-stack-lg bg-gradient-to-br from-primary-700 to-primary-800 text-white text-center overflow-hidden">
          {/* Decorative ambient blobs */}
          <div
            aria-hidden
            className="absolute -top-6 -right-6 w-24 h-24 rounded-pill bg-white/10 pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-pill bg-accent-400/20 pointer-events-none"
          />

          {/* Close button */}
          <Button
            iconOnly
            size="sm"
            onDark
            emphasis="ghost"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-3 right-3 z-10"
          >
            <X strokeWidth={2.5} />
          </Button>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 ring-4 ring-white/30">
            <CheckCircle2 size={32} className="text-white" strokeWidth={2} />
          </div>

          {/* Titre h2 au pas du bloc (20/26/700) · 8 · texte 16 — il était au
              pas de la section (28), avec un tracking réécrit. */}
          <h2
            id="completion-modal-title"
            /* Écart icône → titre écrit SUR le titre : un `mt-*` bat la marge de base des titres (0,75em), qui sinon s'ajoutait à celle de l'icône (31 px au lieu de 16). */
            className="mt-stack font-display text-h3 text-white text-balance"
          >
            {title}
          </h2>

          {itemTitle && (
            <p className="mt-stack-xs font-body text-body text-white line-clamp-2">
              {itemTitle}
            </p>
          )}

          {description && (
            <p className="mt-stack-xs font-body text-body text-white text-balance">
              {description}
            </p>
          )}
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="px-section py-stack-lg flex flex-col gap-stack">
          {/* Next item suggestion */}
          {nextItem && onNext && (
            <button
              type="button"
              onClick={onNext}
              className="group w-full text-left px-4 py-3 rounded-xl bg-ink-50 border border-ink-100 hover:bg-primary-50 hover:border-primary-200 transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              {/* Surtitre en légende 13/600 (11 px capitales espacées : le
                  registre du `Badge`) · 4 · titre 16/600 · 4 · méta. */}
              <span className="block text-caption font-semibold text-ink-600 mb-stack-3xs">
                Continuer avec
              </span>
              <span className="flex items-center justify-between gap-stack-xs">
                <span className="font-body text-body font-semibold text-ink-900 group-hover:text-primary-800 transition-colors line-clamp-1">
                  {nextItem.title}
                </span>
                <ArrowRight size={14} className="text-ink-400 group-hover:text-primary-600 shrink-0 transition-colors" aria-hidden />
              </span>
              {nextItem.duration && (
                <span className="block text-caption text-ink-600 mt-stack-3xs">
                  {nextItem.type} · {nextItem.duration}
                </span>
              )}
            </button>
          )}

          {/* Actions — à 24 px du contenu (16 + 8). Un seul `solid`, l'action
              que la modale sert (arbitrage n°19) : « Suivant » quand un
              contenu suit, sinon l'unique « Retour à l'espace ». « Retour »,
              à côté de « Suivant », referme sans rien confirmer : `ghost`.
              Seules dans le corps (plus de bloc XP au-dessus, arbitrage
              n°18), elles n'ajoutent pas leurs 8 px au padding : 24 en haut
              comme en bas. */}
          <div className={['flex gap-stack-xs', nextItem && onNext ? 'mt-stack-xs' : ''].filter(Boolean).join(' ')}>
            {nextItem && onNext ? (
              <>
                <Button emphasis="ghost" tone="neutral" size="md" onClick={onClose} className="flex-1">
                  Retour
                </Button>
                <Button emphasis="solid" size="md" trailingIcon={<ArrowRight />} onClick={onNext} className="flex-1">
                  Suivant
                </Button>
              </>
            ) : (
              <Button emphasis="solid" size="md" fullWidth onClick={onClose}>
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
