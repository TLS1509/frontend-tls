/**
 * HeroLeverDuJour — essai "Lever du jour" (option 3) : la "peinture vivante".
 * Fond teal peint (nappes douces), un SOLEIL chaud se lève au centre-bas, et
 * quelques MOTES de lumière dérivent lentement vers le haut = les "éléments de
 * l'illustration qui s'animent". Aube = savoir/enlightenment, l'humain éclairé.
 *
 * NB : version 100% code (interprétation). L'idéal serait une vraie illustration
 * peinte (générée IA ou commandée) animée élément par élément ; ici les nappes,
 * le soleil et les motes tiennent lieu de peinture animée, sans asset externe.
 *
 * Hero-only, texte blanc toujours visible. Route /website/_hero-lever-du-jour.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroCopy } from './heroShared';

const EASE = [0.22, 1, 0.36, 1] as const;

// Motes de lumière (éléments animés de la "peinture") : dérive lente vers le haut.
const MOTES = [
  { x: '32%', size: 10, dur: 13, delay: 0, drift: -60 },
  { x: '46%', size: 6, dur: 17, delay: 2, drift: -80 },
  { x: '58%', size: 12, dur: 15, delay: 1, drift: -70 },
  { x: '67%', size: 7, dur: 19, delay: 3, drift: -90 },
];

export const HeroLeverDuJour: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#0b2228] via-primary-900 to-[#123f47]">
      {/* Nappes peintes (ciel d'aube), douces, statiques */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(40% 30% at 22% 26%, rgba(85,161,180,0.28) 0%, transparent 70%), radial-gradient(46% 34% at 82% 30%, rgba(237,132,58,0.16) 0%, transparent 72%)',
        }}
      />

      {/* Le soleil qui se lève (centre-bas), disque chaud défini */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '18%',
          width: 'min(60vh, 640px)',
          height: 'min(60vh, 640px)',
          background:
            'radial-gradient(circle, rgba(255,232,180,0.9) 0%, rgba(248,176,68,0.55) 26%, rgba(248,176,68,0.14) 52%, rgba(248,176,68,0) 72%)',
          filter: 'blur(20px)',
        }}
        initial={reduced ? { y: 0, opacity: 0.55 } : { y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: reduced ? 0.55 : 0.7 }}
        transition={{ duration: reduced ? 0 : 2.8, delay: reduced ? 0 : 0.3, ease: EASE }}
      />

      {/* Motes de lumière qui dérivent (les éléments animés de la peinture) */}
      {!reduced &&
        MOTES.map((m, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              left: m.x,
              bottom: '26%',
              width: m.size,
              height: m.size,
              background: 'radial-gradient(circle, rgba(255,240,205,0.9) 0%, rgba(248,176,68,0) 70%)',
              filter: 'blur(1px)',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, m.drift, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(11,34,40,0.4), transparent)' }}
      />

      <HeroCopy />
    </section>
  );
};

export default HeroLeverDuJour;
