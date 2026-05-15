/**
 * LessonNavigation — Footer molecule for viewer / lesson page navigation.
 *
 * Pattern unifié pour LessonPlayer + 4 viewers (Astuces / Flashcards /
 * Complementary / Video). Remplace les 3 implémentations footer ad-hoc.
 *
 * Layout (desktop) :
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ [← Précédent]      • • • ● • • •      [Suivant →] / [Terminer ✓] │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * Layout (mobile, < sm) : labels masqués sur prev/next, dots restent.
 *
 * Props :
 *  - `current` / `total` (1-based count) → required pour les dots
 *  - `tone` : propage à ProgressDots + button accent
 *  - `onPrev` / `onNext` : callbacks ; disabled prop force-disable
 *  - `onFinish` : si fourni ET current === total, le bouton suivant
 *                 devient "Terminer" avec icône Check
 *  - `onDotSelect` : clic sur un dot (optionnel)
 */

import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '../core/Button';
import { ProgressDots } from '../ui/ProgressDots';
import type { PageTone } from '../../lib/tone-classes';

export interface LessonNavigationProps {
  /** 1-based current position. */
  current: number;
  /** Total items. */
  total: number;
  tone?: PageTone;

  onPrev?: () => void;
  onNext?: () => void;
  /** When set + current === total, the Next button becomes "Terminer". */
  onFinish?: () => void;
  /** Force-disable Prev (e.g. at first item). */
  disablePrev?: boolean;
  /** Force-disable Next. */
  disableNext?: boolean;

  /** Allow clicking a dot to jump (optional). */
  onDotSelect?: (index: number) => void;

  /** Labels override. */
  prevLabel?: string;
  nextLabel?: string;
  finishLabel?: string;

  className?: string;
}

const TONE_BUTTON_VARIANT: Record<PageTone, 'primary' | 'warm'> = {
  primary: 'primary',
  warm:    'warm',
  sun:     'primary', // Button has no "sun" variant — fall back to primary
};

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  current,
  total,
  tone = 'primary',
  onPrev,
  onNext,
  onFinish,
  disablePrev = false,
  disableNext = false,
  onDotSelect,
  prevLabel = 'Précédent',
  nextLabel = 'Suivant',
  finishLabel = 'Terminer',
  className = '',
}) => {
  const isLast = current >= total;
  const showFinish = isLast && !!onFinish;

  const handleNext = showFinish ? onFinish : onNext;
  const nextDisabled = showFinish ? false : !onNext || disableNext;
  const prevDisabled = !onPrev || disablePrev || current <= 1;

  const wrapperClasses = [
    'flex items-center justify-between gap-stack',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={wrapperClasses} aria-label="Navigation de la leçon">
      <Button
        variant="secondary"
        size="md"
        leadingIcon={<ChevronLeft size={16} />}
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label={prevLabel}
      >
        <span className="hidden sm:inline">{prevLabel}</span>
      </Button>

      <ProgressDots
        total={total}
        current={Math.max(0, current - 1)}
        tone={tone}
        size="sm"
        onSelect={onDotSelect}
        ariaLabel={`${current} sur ${total}`}
      />

      <Button
        variant={TONE_BUTTON_VARIANT[tone]}
        size="md"
        trailingIcon={showFinish ? <Check size={16} /> : <ChevronRight size={16} />}
        onClick={handleNext}
        disabled={nextDisabled}
        aria-label={showFinish ? finishLabel : nextLabel}
      >
        <span className="hidden sm:inline">{showFinish ? finishLabel : nextLabel}</span>
      </Button>
    </nav>
  );
};

export default LessonNavigation;
