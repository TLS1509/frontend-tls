/**
 * HeroCelestial — essai "Celestial onirique" (14/07/2026). Direction retenue
 * après retour utilisateur : "modern celestial", rêveur, **line-art OR** sur un
 * **ciel peint/encre** navy-teal, symbolique du savoir (PAS grad hat), éléments
 * dessinés main qui s'animent (draw-on / twinkle).
 *
 * Couches :
 *  - Fond : navy-ink-sky.jpg (aquarelle inversée + gradée navy-teal = ciel
 *    d'encre texturé, nébuleuse rêveuse) + wash teal + vignette centrale.
 *  - Line-art OR (#F8B044) : croissant de lune, étoiles-sparkles (twinkle),
 *    constellation (nœuds + liens qui se tracent) = la société / les connexions.
 *  - Lumière dorée qui se lève de l'horizon (mise en lumière), sous le texte.
 *  - Centre-milieu laissé calme (texte).
 *
 * NB : version 100% code = "goût" de la direction. La facture finale idéale =
 * un asset illustré (Procreate/Affinity) ou animé (Lottie/Rive) posé sur ce
 * même fond. Voir docs/briefs/HERO-CONSTELLATION-ILLUSTRATION-BRIEF.md.
 *
 * Route cachée /website/_hero-celestial — essai, pas en prod.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroCopy } from './heroShared';

const GOLD = '#F8B044';
const EASE = [0.22, 1, 0.36, 1] as const;

type P = { x: number; y: number };

// Constellation (canopée haut + descentes) — hors zone texte centrale.
const NODES: P[] = [
  { x: 300, y: 180 }, // 0
  { x: 560, y: 120 }, // 1
  { x: 860, y: 140 }, // 2
  { x: 1120, y: 190 }, // 3
  { x: 180, y: 440 }, // 4
  { x: 1280, y: 420 }, // 5
  { x: 420, y: 760 }, // 6
  { x: 1020, y: 780 }, // 7
];
const LINKS: [number, number, number, number][] = [
  [0, 1, 22, 0.6],
  [1, 2, -18, 0.72],
  [2, 3, 20, 0.84],
  [0, 4, -18, 0.98],
  [3, 5, 18, 0.98],
  [4, 6, 16, 1.15],
  [5, 7, -16, 1.15],
];
const curve = (a: P, b: P, bow: number): string => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return `M${a.x},${a.y} Q${mx + (-dy / len) * bow},${my + (dx / len) * bow} ${b.x},${b.y}`;
};

// Étoiles-sparkles (4 branches) — dispersées, hors centre.
const SPARKS = [
  { x: 250, y: 300, s: 13, d: 0.3 },
  { x: 1210, y: 300, s: 10, d: 1.1 },
  { x: 150, y: 640, s: 9, d: 0.7 },
  { x: 1305, y: 700, s: 12, d: 1.5 },
  { x: 650, y: 92, s: 8, d: 0.5 },
  { x: 960, y: 84, s: 11, d: 1.3 },
  { x: 730, y: 828, s: 10, d: 0.9 },
];
const sparkPath = (s: number) =>
  `M0,${-s} L${s * 0.16},${-s * 0.16} L${s},0 L${s * 0.16},${s * 0.16} L0,${s} L${-s * 0.16},${s * 0.16} L${-s},0 L${-s * 0.16},${-s * 0.16} Z`;

const MOON = { cx: 1185, cy: 222, r: 58 };

const Celestial: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const draw = (delay: number) => ({
    initial: reduced ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.7 },
    transition: { duration: reduced ? 0 : 1.3, delay: reduced ? 0 : delay, ease: EASE },
  });
  const appear = (delay: number, op = 1) => ({
    initial: reduced ? { opacity: op } : { opacity: 0 },
    animate: { opacity: op },
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay },
  });

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {/* Croissant de lune (line-art) */}
      <motion.circle cx={MOON.cx} cy={MOON.cy} r={MOON.r} stroke={GOLD} strokeWidth={1.8} {...draw(0.4)} />
      <motion.path
        d={`M${MOON.cx},${MOON.cy - MOON.r} A${MOON.r * 1.42},${MOON.r * 1.42} 0 0 1 ${MOON.cx},${MOON.cy + MOON.r}`}
        stroke={GOLD}
        strokeWidth={1.8}
        strokeLinecap="round"
        {...draw(0.7)}
      />

      {/* Constellation : liens qui se tracent + nœuds */}
      {LINKS.map(([a, b, bow, delay], i) => (
        <motion.path key={`l${i}`} d={curve(NODES[a], NODES[b], bow)} stroke={GOLD} strokeWidth={1.5} strokeLinecap="round" {...draw(delay)} />
      ))}
      {NODES.map((n, i) => (
        <motion.g key={`n${i}`} {...appear(1.0 + i * 0.08)}>
          <circle cx={n.x} cy={n.y} r={11} fill="rgba(248,176,68,0.18)" />
          <circle cx={n.x} cy={n.y} r={3} fill="#FFF3D8" />
        </motion.g>
      ))}

      {/* Étoiles-sparkles : twinkle doux */}
      {SPARKS.map((s, i) => (
        <motion.path
          key={`s${i}`}
          d={sparkPath(s.s)}
          fill={GOLD}
          transform={`translate(${s.x} ${s.y})`}
          initial={reduced ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.5 }}
          animate={reduced ? { opacity: 0.85, scale: 1 } : { opacity: [0, 0.95, 0.55, 0.95], scale: [0.5, 1, 0.9, 1] }}
          transition={reduced ? undefined : { duration: 5, delay: s.d, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        />
      ))}
    </svg>
  );
};

export const HeroCelestial: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#0b2228]">
      {/* Ciel d'encre texturé (aquarelle inversée gradée navy-teal) */}
      <img src="/images/navy-ink-sky.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      {/* Wash teal pour unifier + assombrir les bords chauds */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-primary-900/35" />

      {/* Line-art OR celestial */}
      <Celestial reduced={reduced} />

      {/* Vignette centrale : texte au calme */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(102% 70% at 50% 47%, rgba(11,34,40,0.6) 0%, rgba(11,34,40,0.24) 46%, rgba(11,34,40,0) 74%)',
        }}
      />

      {/* Lumière dorée qui se lève de l'horizon (mise en lumière), sous le texte */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(248,176,68,0.46) 0%, rgba(248,176,68,0.13) 42%, rgba(248,176,68,0) 72%)',
          filter: 'blur(30px)',
        }}
        initial={reduced ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 80 }}
        animate={{ opacity: reduced ? 0.5 : 0.6, y: 0 }}
        transition={{ duration: reduced ? 0 : 2.8, delay: reduced ? 0 : 0.4, ease: EASE }}
      />

      <HeroCopy />
    </section>
  );
};

export default HeroCelestial;
