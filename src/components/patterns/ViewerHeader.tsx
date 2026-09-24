/**
 * ViewerHeader — Sticky toolbar for full-screen viewer / reader pages.
 *
 * Pattern audit Phase 10 : 6+ viewer pages reproduisent la même UI manuelle
 * (back btn + title + prev/next chevrons + close). Ce composant l'unifie.
 *
 * Used by (relevé le 2026-09-24) : LessonPlayer, FlashcardsViewer, AstucesViewer,
 *   ComplementaryContentViewer, VideoViewer, Positionnement (deux états).
 *   La liste citait VideoReels, JournalDetail et CourseDetail, qui ne l'emploient pas.
 *
 * Layout (révisé le 2026-09-24 — le titre d'abord, puis UNE ligne de méta) :
 *   ┌──────────────────────────────────────────────────────────────────┐
 *   │ [← Back]   Titre (16/600)                  [< Prev] [Next >] [×] │
 *   │            Surtitre · sous-titre (13, ink-600)                   │
 *   │ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (optional progress) │
 *   └──────────────────────────────────────────────────────────────────┘
 *
 * Features :
 *  - Sticky top-0 z-sticky glass background
 *  - Back button (gauche) — un `Button` ghost : libellé dès 640 px, icône seule en dessous
 *  - Title + optional subtitle / meta (centré, truncate)
 *  - Prev / Next chevrons (droite) — disabled at boundaries
 *  - Close button optionnel (X — typically navigate to parent route)
 *  - Optional counter ("3 / 12")
 *  - Optional inline progress bar (0–100) — Phase 14.2a addition
 *  - Tone-aware (primary / warm / sun) — Phase 14.2a addition
 *  - Touch targets ≥ 44 px (mobile a11y) — Phase 14.2a fix
 *  - 100% Tailwind, glass-light backdrop-blur, no BEM
 */

import React from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PageTone } from '../../lib/tone-classes';
import { Button } from '../core/Button';

export interface ViewerHeaderProps {
  /** Back button label (default "Retour"). Hidden if onBack is omitted. */
  backLabel?: string;
  /** Back button callback (typically navigate(-1) or to parent route). */
  onBack?: () => void;

  /** Type ou contexte du contenu (e.g. "Vidéo · Module 2"). Rendu en tête de la
   *  ligne de méta, SOUS le titre — plus en surtitre capitales au-dessus. */
  eyebrow?: React.ReactNode;
  /** Main title displayed in the toolbar — truncated if too long. */
  title?: React.ReactNode;
  /** Optional secondary text, sur la ligne de méta après le surtitre. */
  subtitle?: React.ReactNode;
  /**
   * Balise du titre — `p` par défaut depuis le 2026-09-24. Le titre d'une barre
   * de lecteur est à 16 px : la doctrine veut que la taille suive le niveau, un
   * h1 de 16 n'en est donc pas un. Le h1 de la page vit dans son contenu (c'est
   * le cas de VideoViewer et de ComplementaryContentViewer, qui en avaient deux).
   * `h1` reste possible pour un écran qui n'a pas d'autre titre — un écart
   * assumé, que `check-typo` relève.
   */
  titleAs?: 'h1' | 'p';
  /** id posé sur le titre, pour l'`aria-labelledby` d'un dialogue. */
  titleId?: string;

  /** Optional progression : current index (1-based). */
  current?: number;
  /** Optional total count : displayed as "current / total". */
  total?: number;

  /** Optional inline progress bar value (0–100). Renders below the row when defined. */
  progress?: number;

  /** Previous callback. Disabled if undefined OR `disablePrev` is true. */
  onPrev?: () => void;
  /** Next callback. Disabled if undefined OR `disableNext` is true. */
  onNext?: () => void;
  /** Force-disable prev (e.g. at first item). */
  disablePrev?: boolean;
  /** Force-disable next (e.g. at last item). */
  disableNext?: boolean;

  /** Optional close callback (X button, typically navigates to parent). */
  onClose?: () => void;

  /** Optional extra slot rendered between subtitle and prev/next (e.g. badge, action). */
  trailing?: React.ReactNode;

  /** Make the header sticky to top (default true). */
  sticky?: boolean;

  /** Ton du compteur et de la barre de progression. */
  tone?: PageTone;

  className?: string;
}

/* Une couleur de marque ne porte du texte qu'au cran 800 (doctrine, rôle des
   couleurs) : le compteur passe de 700 à 800. */
const TONE_COUNTER_ACCENT: Record<PageTone, string> = {
  primary: 'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
};

const TONE_PROGRESS_FILL: Record<PageTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-700',
  sun:     'bg-gradient-to-r from-accent-300 to-accent-500',
};

export const ViewerHeader: React.FC<ViewerHeaderProps> = ({
  backLabel = 'Retour',
  onBack,
  eyebrow,
  title,
  subtitle,
  current,
  total,
  progress,
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  onClose,
  trailing,
  sticky = true,
  tone = 'primary',
  titleAs: TitleTag = 'p',
  titleId,
  className = '',
}) => {
  const prevDisabled = !onPrev || disablePrev;
  const nextDisabled = !onNext || disableNext;
  const hasNav = !!onPrev || !!onNext;

  const wrapperClasses = [
    'bg-white/85 backdrop-blur-glass-light border-b border-ink-200',
    sticky && 'sticky top-0 z-sticky',
    className,
  ].filter(Boolean).join(' ');

  /* Pas de `role="banner"` (retiré le 2026-09-24) : la barre vit dans le
     <main> de la page, et un bandeau de site n'a qu'une place, au premier
     niveau, celle de la coque. Posé ici, il ajoutait un landmark `banner`
     DANS `main` sur les six lecteurs. Un <header> dans <main> n'a pas de
     rôle : c'est ce qu'il faut. */
  return (
    <header className={wrapperClasses}>
      <div className="flex items-center gap-stack px-4 sm:px-6 lg:px-8 py-2">
        {/* Retour : un `Button` ghost (2026-09-24), comme le précédent, le
            suivant et la fermeture de la même barre — il était fait main, sur
            un fond ink-50. Dès 640 px, le libellé en `sm` (13/700, cible
            tactile de 44) : en 16/700, il pèserait plus que le titre qu'il
            accompagne (16/600). En dessous, l'icône seule, un cercle de 44
            comme ses voisins. `max-sm:hidden` et `sm:hidden` — des variantes,
            donc émises après le `inline-flex` du bouton, qu'elles battent. */}
        {onBack && (
          <>
            <Button
              emphasis="ghost"
              tone="neutral"
              size="sm"
              onClick={onBack}
              leadingIcon={<ArrowLeft strokeWidth={2.5} />}
              className="shrink-0 max-sm:hidden"
            >
              {backLabel}
            </Button>
            <Button
              iconOnly
              emphasis="ghost"
              tone="neutral"
              onClick={onBack}
              aria-label={backLabel}
              className="shrink-0 sm:hidden"
            >
              <ArrowLeft strokeWidth={2.5} />
            </Button>
          </>
        )}

        {/* Title block (center, flex-1, truncate) — révisé le 2026-09-24.
            Le titre à 16/600 : c'est la barre d'un lecteur, le contenu mène.
            Il était à 20/700 en League Spartan, SOUS un surtitre de 11 px en
            capitales et AU-DESSUS d'un sous-titre : trois lignes, deux registres
            de méta. Le surtitre (un type de contenu : une donnée, pas un état)
            rejoint le sous-titre sur une seule ligne de méta, à 13 px. */}
        {(title || eyebrow || subtitle) && (
          <div className="flex-1 min-w-0 flex flex-col items-start sm:items-center">
            {title && (
              <TitleTag
                id={titleId}
                className="font-body text-body font-semibold text-ink-900 truncate w-full text-left sm:text-center"
                title={typeof title === 'string' ? title : undefined}
              >
                {title}
              </TitleTag>
            )}
            {(eyebrow || subtitle) && (
              <p className="font-body text-caption text-ink-600 truncate w-full text-left sm:text-center">
                {eyebrow && <span className="font-semibold text-ink-700">{eyebrow}</span>}
                {eyebrow && subtitle && <span aria-hidden> · </span>}
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Trailing custom slot */}
        {trailing && <div className="shrink-0">{trailing}</div>}

        {/* Counter "X / Y" */}
        {current !== undefined && total !== undefined && (
          <span className="shrink-0 font-body text-caption font-semibold text-ink-600 tabular-nums">
            <span className={TONE_COUNTER_ACCENT[tone]}>{current}</span>
            <span className="text-ink-600"> / {total}</span>
          </span>
        )}

        {/* Prev / Next nav chevrons + Close button (right group) */}
        <div className="shrink-0 flex items-center gap-stack-2xs">
          {/* Prev / Next nav chevrons */}
          {hasNav && (
            <div className="flex items-center gap-tight">
              <Button iconOnly emphasis="ghost" tone="neutral" onClick={onPrev} disabled={prevDisabled} aria-label="Élément précédent">
                <ChevronLeft strokeWidth={2.25} />
              </Button>
              <Button iconOnly emphasis="ghost" tone="neutral" onClick={onNext} disabled={nextDisabled} aria-label="Élément suivant">
                <ChevronRight strokeWidth={2.25} />
              </Button>
            </div>
          )}

          {/* Close button (right) */}
          {onClose && (
            <Button iconOnly emphasis="ghost" tone="neutral" onClick={onClose} aria-label="Fermer" className="shrink-0">
              <X strokeWidth={2.25} />
            </Button>
          )}
        </div>
      </div>

      {/* Optional inline progress bar (under the header row) */}
      {typeof progress === 'number' && (
        <div className="h-1 bg-ink-100">
          <div
            className={['h-full transition-[width] duration-500 ease-out', TONE_PROGRESS_FILL[tone]].join(' ')}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
    </header>
  );
};

export default ViewerHeader;
