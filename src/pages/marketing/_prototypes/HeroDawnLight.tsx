/**
 * HeroDawnLight — essai "Aube" : fond teal sombre, la lumière dorée SE LÈVE et
 * se pose au centre sur le sujet humain (mise en lumière = le H1 rendu image).
 * Une seule geste, au chargement. Hero-only (aucune section en dessous, aucun
 * indice "défiler"). 100% CSS/framer, aucun asset.
 *
 * Route cachée /website/_hero-dawn-light — essai, pas en prod.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroCopy } from './heroShared';

export const HeroDawnLight: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#0b2228] via-primary-900 to-primary-800">
      {/* La lumière dorée se lève et se centre sur le sujet (l'humain). */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 42% at 50% 54%, rgba(248,176,68,0.80) 0%, rgba(248,176,68,0.26) 48%, rgba(248,176,68,0) 74%)',
          filter: 'blur(56px)',
        }}
        initial={reduced ? { opacity: 0.55, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.7 }}
        animate={{ opacity: reduced ? 0.55 : 0.6, y: 0, scale: 1 }}
        transition={{ duration: reduced ? 0 : 2.6, delay: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(11,34,40,0.45), transparent)' }}
      />
      <HeroCopy />
    </section>
  );
};

export default HeroDawnLight;
