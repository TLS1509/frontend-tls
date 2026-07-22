import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Détecte les contextes où `whileInView` ne peut structurellement pas se
 * déclencher : pas d'IntersectionObserver, ou viewport d'aire nulle (outils de
 * capture, générateurs d'aperçu, in-app browsers dégradés, onglet masqué).
 *
 * Sans ce garde-fou le composant est FAIL-CLOSED : `initial={{opacity:0}}` est
 * appliqué, `whileInView` ne se déclenche jamais, et le contenu reste invisible
 * pour toujours — le HTML est intact mais la page paraît vide.
 * Audit 2026-07-22 : reproduit sur `/website/*`.
 */
const cannotObserve = (): boolean => {
  if (typeof window === 'undefined') return true;
  if (typeof IntersectionObserver === 'undefined') return true;
  return !window.innerHeight || !window.innerWidth;
};

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const DIRS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Trigger margin in px — earlier values trigger sooner. Default 0px (viewport edge).
   * Use a negative value (e.g. '-60px') only for below-fold content that should pre-load. */
  margin?: string;
  /** Re-trigger on every entry. Default false (once only). */
  repeat?: boolean;
};

/**
 * IntersectionObserver-driven fade-in (via framer-motion whileInView).
 * Respects prefers-reduced-motion: only fades opacity, no transform shift.
 * Always renders as <motion.div> — wrap inline elements explicitly if needed.
 *
 * FAIL-OPEN : si le contexte ne permet pas d'observer (voir `cannotObserve`),
 * le composant rend son état final directement au lieu de rester à opacity 0.
 * Mieux vaut du contenu sans animation qu'un bloc invisible.
 */
export const FadeInWhenVisible: React.FC<Props> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  margin = '0px',
  repeat = false,
}) => {
  const reduced = useReducedMotion();
  const offset = DIRS[direction];
  const initial = reduced ? { opacity: 0 } : { opacity: 0, ...offset };
  const animate = { opacity: 1, x: 0, y: 0 };

  // Évalué après le montage : `window` n'existe pas au rendu serveur, et la
  // taille du viewport n'est fiable qu'une fois la mise en page faite.
  const [failOpen, setFailOpen] = React.useState(false);
  React.useEffect(() => {
    if (cannotObserve()) setFailOpen(true);
  }, []);

  if (failOpen) {
    // `initial={false}` : on démarre directement à l'état final, sans transition.
    return (
      <motion.div className={className} initial={false} animate={animate}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: !repeat, margin: margin as `${number}px` }}
      transition={{
        duration: reduced ? 0.25 : duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
