/**
 * HeroEclipse — essai "Éclipse" (option 4) : littéral au H1. Un disque sombre
 * (l'éclipse) couvre une lumière chaude ; au chargement il GLISSE et s'efface,
 * la lumière dorée flotte et révèle le titre. Aurore douce, pas sci-fi froid.
 *
 * Un seul geste, hero-only. 100% CSS/framer, aucun asset.
 * Route cachée /website/_hero-eclipse — essai, pas en prod.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroCopy } from './heroShared';

export const HeroEclipse: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#0b2228] via-primary-900 to-primary-800">
      {/* Lumière chaude révélée derrière le disque */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(46% 40% at 50% 50%, rgba(248,176,68,0.72) 0%, rgba(248,176,68,0.22) 50%, rgba(248,176,68,0) 76%)',
          filter: 'blur(52px)',
        }}
        initial={reduced ? { opacity: 0.55 } : { opacity: 0 }}
        animate={{ opacity: reduced ? 0.55 : 0.6 }}
        transition={{ duration: reduced ? 0 : 2.2, delay: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Le disque (l'éclipse) : glisse vers le haut et s'efface = l'éclipse
          passe. Halo chaud sur son bord bas pendant qu'il se retire. */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="rounded-full w-[78vh] h-[78vh] max-w-[92vw] max-h-[92vw]"
          style={{
            background:
              'radial-gradient(circle, #0b2228 58%, rgba(11,34,40,0.86) 66%, rgba(11,34,40,0) 73%)',
            boxShadow: '0 22px 90px 10px rgba(248,176,68,0.28)',
          }}
          initial={reduced ? { y: '-82%', opacity: 0 } : { y: 0, opacity: 1 }}
          animate={{ y: '-82%', opacity: 0 }}
          transition={{ duration: reduced ? 0 : 2.6, delay: reduced ? 0 : 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

      <HeroCopy />
    </section>
  );
};

export default HeroEclipse;
