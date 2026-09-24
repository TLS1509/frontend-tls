/**
 * FlipCard — carte 3D à retournement (flip animation).
 *
 * Extrait de FlashcardsViewer (Phase 14.2c). Réutilisable pour tout besoin
 * de carte recto/verso avec animation CSS 3D.
 *
 * Structure :
 *  - Recto : image de fond + overlay gradient + icône + catégorie (MetaPill) + titre (20/26/700)
 *  - Verso  : fond dégradé tone-aware + icône + contenu + détails optionnels
 *  Chaque face est un <button> : il n'admet que du contenu phrasé, donc tout
 *  ce qu'il contient est en <span> (2026-09-24 — il portait des <div>, des <p>
 *  et un <h2>, du HTML invalide). Les classes d'affichage donnent le rendu.
 *
 * Accessibilité (2026-09-24) :
 *  - chaque face se nomme par SON CONTENU — la question au recto, la réponse
 *    au verso. Les deux portaient `aria-label="Retourner la flashcard"`, qui
 *    remplace le contenu : un lecteur d'écran n'entendait jamais ni l'une ni
 *    l'autre, seulement deux fois la même consigne ;
 *  - la face cachée sort du clavier et de l'arbre (`tabIndex={-1}`,
 *    `aria-hidden`) : on atteignait la réponse par Tab avant d'avoir retourné
 *    la carte ;
 *  - retourner la carte depuis une face fait passer le focus sur l'autre : le
 *    lecteur d'écran lit la réponse, et Entrée la retourne encore. Le focus
 *    n'est déplacé que s'il était sur la carte (un raccourci de page ne le
 *    vole pas).
 *
 * Mécanique :
 *  - `perspective: 1500px` sur le container (inline style — valeur calculée)
 *  - `transformStyle: preserve-3d` + `rotateY(180deg)` pour le flip
 *  - `backfaceVisibility: hidden` sur chaque face (inline — pas d'équivalent Tailwind)
 *
 * Usage :
 *   const [flipped, setFlipped] = useState(false);
 *   <FlipCard
 *     front={{ image: "…", icon: <Zap />, category: "Productivité", title: "Raccourcis" }}
 *     back={{ content: "Ctrl+Shift+P…", details: "Conseil…" }}
 *     isFlipped={flipped}
 *     onFlip={() => setFlipped(f => !f)}
 *     tone="primary"
 *   />
 */

import React, { useEffect, useRef } from 'react';
import { RotateCw } from 'lucide-react';
import { TONE_BORDER_500, TONE_HERO_GRADIENT } from '../../lib/tone-classes';
import type { PageTone } from '../../lib/tone-classes';
import { MetaPill } from '../ui/MetaPill';

const TONE_FOCUS_OUTLINE: Record<PageTone, string> = {
  primary: 'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-500',
  sun:     'focus-visible:outline-accent-400',
};

export interface FlipCardFront {
  /** Background image URL. */
  image: string;
  /** Icon rendered on both faces (Lucide ReactNode). */
  icon: React.ReactNode;
  /** Short category label (MetaPill on the front — a datum, not a state). */
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

  const rectoRef = useRef<HTMLButtonElement>(null);
  const versoRef = useRef<HTMLButtonElement>(null);
  /* La face qui vient de se cacher avait le focus ? Il passe sur celle qui
     apparaît. Elle ne l'a pas perdu entre-temps : `aria-hidden` et
     `tabIndex={-1}` ne retirent pas le focus d'un élément (`inert` le ferait,
     et le rendrait à <body> avant cet effet). */
  useEffect(() => {
    const visible = isFlipped ? versoRef.current : rectoRef.current;
    const cachee = isFlipped ? rectoRef.current : versoRef.current;
    if (cachee && document.activeElement === cachee) visible?.focus({ preventScroll: true });
  }, [isFlipped]);

  const faceBase = [
    'absolute inset-0 rounded-xl overflow-hidden cursor-pointer border-[3px]',
    'shadow-[0_8px_32px_rgba(85,161,180,0.18)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    borderClass,
    focusOutline,
  ].join(' ');

  return (
    <div
      className={['relative w-full max-w-[560px] mx-auto', className].join(' ')}
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
          ref={rectoRef}
          type="button"
          onClick={onFlip}
          tabIndex={isFlipped ? -1 : undefined}
          aria-hidden={isFlipped || undefined}
          className={faceBase}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Background image + gradient overlay */}
          <span className="absolute inset-0">
            <img
              src={front.image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          </span>

          {/* Front content */}
          <span className="relative z-base flex flex-col items-center justify-center h-full p-section gap-stack text-center">
            {/* Icon bubble */}
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
              <span className="inline-flex items-center justify-center" aria-hidden>{front.icon}</span>
            </span>

            {/* Catégorie — une DONNÉE : MetaPill (arbitrage n°14), opaque donc
                lisible sur la photo. Elle était en capitales espacées 700.
                Catégorie → titre 8 : le titre appartient à sa catégorie. La
                marge de base des titres (0,75em) s'ajoutait au gap : 37 px
                au-dessus du titre, 16 en dessous. */}
            <span className="flex flex-col items-center">
              <MetaPill text={front.category} tone="neutral" size="md" />

              {/* Titre de la carte : 20/26/700, le pas d'un titre de bloc — le
                  jeton porte la graisse. C'était un <h2> en 20 puis 28 dès
                  640 px (`sm:text-h2`) et `font-bold` : un titre de section
                  pour nommer une carte. Ce n'est plus un élément de titre :
                  un titre n'a pas sa place dans un <button> (le HTML n'y admet
                  que du texte courant) et le rôle bouton rend ses enfants
                  présentatifs — il n'était exposé comme titre à personne,
                  mais comptait dans le plan de la page. */}
              <span className="block mt-stack-xs font-display text-h3 text-white max-w-prose text-balance [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
                {front.title}
              </span>
            </span>

            {/* Flip hint */}
            {/* Voile CLAIR + encre foncée : blanc sur blanc/15 tombait sous 4,5 sur l'or 700. */}
            <span className="inline-flex items-center gap-stack-xs px-4 py-2 rounded-pill bg-white/90 backdrop-blur-glass-light border border-white/30">
              <RotateCw size={16} className="text-ink-900" />
              {/* Surface apprenant : « tu » (arbitrage n°23). « Cliquez pour
                  voir la réponse » ne valait que pour la souris ; le verbe de
                  l'action vaut au doigt comme au clavier. « … pour voir la
                  réponse » passait sur deux lignes à 375 : au recto d'une
                  flashcard, la réponse est ce qu'on attend du verso. */}
              <span className="font-body text-caption font-semibold text-ink-900">
                Retourne la carte
              </span>
            </span>
          </span>
        </button>

        {/* ── Back face ──────────────────────────────────────── */}
        <button
          ref={versoRef}
          type="button"
          onClick={onFlip}
          tabIndex={isFlipped ? undefined : -1}
          aria-hidden={!isFlipped || undefined}
          className={[faceBase, gradientClass, 'p-section'].join(' ')}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="flex flex-col justify-center items-center h-full text-white text-center gap-stack-lg">
            {/* Icon bubble (smaller on back) */}
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-white/20 backdrop-blur-glass-light border-2 border-white/30">
              <span className="inline-flex items-center justify-center" aria-hidden>{front.icon}</span>
            </span>

            {/* Réponse — le chapô (18/28, 600) : du texte qu'on lit, en Nunito,
                plus un 20 px avec le tracking des titres et un interligne écrit
                à côté (`leading-relaxed`). Largeur de lecture : `max-w-prose`. */}
            <span className="block font-body text-body-lg font-semibold max-w-prose">
              {back.content}
            </span>

            {/* Optional details */}
            {back.details && (
              <span className="block font-body text-body max-w-prose">
                {back.details}
              </span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FlipCard;
