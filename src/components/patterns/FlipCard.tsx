/**
 * FlipCard — carte 3D à retournement (flip animation).
 *
 * Extrait de FlashcardsViewer (Phase 14.2c). Réutilisable pour tout besoin
 * de carte recto/verso avec animation CSS 3D.
 *
 * Structure :
 *  - Recto : image de fond + overlay gradient + icône emoji + catégorie pill + titre
 *  - Verso  : fond dégradé tone-aware + icône + contenu + détails optionnels
 *
 * Mécanique :
 *  - `perspective: 1500px` sur le container (inline style — valeur calculée)
 *  - `transformStyle: preserve-3d` + `rotateY(180deg)` pour le flip
 *  - `backfaceVisibility: hidden` sur chaque face (inline — pas d'équivalent Tailwind)
 *
 * Usage :
 *   const [flipped, setFlipped] = useState(false);
 *   <FlipCard
 *     front={{ image: "…", icon: "⚡", category: "PRODUCTIVITÉ", title: "Raccourcis" }}
 *     back={{ content: "Ctrl+Shift+P…", details: "Conseil…" }}
 *     isFlipped={flipped}
 *     onFlip={() => setFlipped(f => !f)}
 *     tone="primary"
 *   />
 */

import React from 'react';
import { RotateCw } from 'lucide-react';
import { TONE_BORDER_500, TONE_HERO_GRADIENT } from '../../lib/tone-classes';
import type { PageTone } from '../../lib/tone-classes';

const TONE_FOCUS_OUTLINE: Record<PageTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-500',
  sun:     'focus-visible:outline-accent-400',
};

export interface FlipCardFront {
  /** Background image URL. */
  image: string;
  /** Emoji icon rendered on both faces. */
  icon: string;
  /** Short category label (displayed as uppercase pill on front). */
  category: string;
  /** Main title (front face). */
  title: string;
}

export interface FlipCardBack {
  /** Primary answer / content text. */
  content: string;
  /** Optional secondary detail text. */
  details?: string;
}

export interface FlipCardProps {
  front: FlipCardFront;
  back: FlipCardBack;
  /** Whether the card shows the back face. Controlled externally. */
  isFlipped: boolean;
  /** Callback when either face is clicked (toggle the flip state). */
  onFlip: () => void;
  /** Tone applied to border + back gradient. */
  tone?: PageTone;
  /** Card height in px (default 380). Use style — it is a dynamic value. */
  height?: number;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  isFlipped,
  onFlip,
  tone = 'primary',
  height = 380,
  className = '',
}) => {
  const borderClass = TONE_BORDER_500[tone];
  const gradientClass = TONE_HERO_GRADIENT[tone];
  const focusOutline = TONE_FOCUS_OUTLINE[tone];

  const faceBase = [
    'absolute inset-0 rounded-2xl overflow-hidden cursor-pointer border-[3px]',
    'shadow-[0_8px_32px_rgba(85,161,180,0.18)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    borderClass,
    focusOutline,
  ].join(' ');

  return (
    <div
      className={['relative', className].join(' ')}
      style={{ perspective: '1500px', height: `${height}px` }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-standard"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── Front face ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={onFlip}
          aria-label="Retourner la flashcard"
          className={faceBase}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Background image + gradient overlay */}
          <div className="absolute inset-0">
            <img
              src={front.image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          </div>

          {/* Front content */}
          <div className="relative z-base flex flex-col items-center justify-center h-full p-section gap-stack text-center">
            {/* Icon bubble */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
              <span className="text-[2rem] leading-none" aria-hidden>{front.icon}</span>
            </div>

            {/* Category pill */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-pill bg-white/90 backdrop-blur-glass-light text-ink-900 text-micro font-bold uppercase tracking-wider">
              {front.category}
            </span>

            {/* Title */}
            <h2 className="m-0 font-display text-h3 sm:text-h2 font-bold text-white leading-tight max-w-prose text-balance [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
              {front.title}
            </h2>

            {/* Flip hint */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-white/15 backdrop-blur-glass-light border border-white/30">
              <RotateCw size={16} className="text-white" />
              <span className="font-body text-caption font-medium text-white">
                Cliquez pour voir la réponse
              </span>
            </div>
          </div>
        </button>

        {/* ── Back face ──────────────────────────────────────── */}
        <button
          type="button"
          onClick={onFlip}
          aria-label="Retourner la flashcard"
          className={[faceBase, gradientClass, 'p-section'].join(' ')}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col justify-center items-center h-full text-white text-center gap-stack-lg">
            {/* Icon bubble (smaller on back) */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
              <span className="text-[1.75rem] leading-none" aria-hidden>{front.icon}</span>
            </div>

            {/* Answer content */}
            <p className="m-0 font-body text-h4 sm:text-h3 font-semibold leading-relaxed max-w-[600px]">
              {back.content}
            </p>

            {/* Optional details */}
            {back.details && (
              <p className="m-0 font-body text-body-sm leading-relaxed opacity-90 max-w-[500px]">
                {back.details}
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default FlipCard;
