/**
 * HeroConstellation — v3 "Starfield + constellation dessinée à la main"
 * (14/07/2026). Synthèse des retours :
 *  - la version dessinée seule mettait un nœud focal derrière la headline
 *    centrée → "bizarre derrière le texte" ;
 *  - la version vidéo seule (starfield) était propre en compo mais FROIDE :
 *    plus de côté handmade / illustration / connexions / touch humain.
 *
 * Ici on combine : le champ d'étoiles (Pexels, gradé TLS teal) sert de fond
 * AMBIANT (profondeur, cinématique, compo sûre), et par-dessus, une
 * CONSTELLATION DESSINÉE À LA MAIN — traits d'encre imparfaits (double-stroke,
 * courbes organiques) qui SE TRACENT (draw-on) entre des nœuds chauds. Les
 * traits sont disposés en canopée sur le haut + descentes latérales, JAMAIS
 * derrière le texte centré (le centre reste calme).
 *
 * Sens : le ciel = la matière (la société, les points). La main qui relie les
 * points = l'humain qui construit du savoir → "les connexions qui se
 * construisent", touch humain, learning society. Puis la lumière dorée se lève
 * de l'horizon (mise en lumière). Nuit → aube.
 *
 * Route cachée /website/_hero-constellation — essai, pas en prod.
 */

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroCopy } from './heroShared';

type P = { x: number; y: number };

// Nœuds en canopée (haut) + descentes latérales — hors de la zone de texte
// centrale (x 360-1080, y 280-680).
const NODES: P[] = [
  { x: 250, y: 140 }, // 0
  { x: 470, y: 95 }, // 1
  { x: 700, y: 125 }, // 2
  { x: 955, y: 100 }, // 3
  { x: 1185, y: 150 }, // 4
  { x: 150, y: 360 }, // 5
  { x: 1300, y: 330 }, // 6
  { x: 185, y: 600 }, // 7
  { x: 1285, y: 610 }, // 8
  { x: 395, y: 795 }, // 9
  { x: 1055, y: 800 }, // 10
];

type Link = { a: number; b: number; bow: number; delay: number };
const LINKS: Link[] = [
  { a: 0, b: 1, bow: 20, delay: 0.6 },
  { a: 1, b: 2, bow: -18, delay: 0.72 },
  { a: 2, b: 3, bow: 22, delay: 0.84 },
  { a: 3, b: 4, bow: -20, delay: 0.96 },
  { a: 1, b: 5, bow: 24, delay: 1.05 },
  { a: 3, b: 6, bow: -24, delay: 1.1 },
  { a: 0, b: 5, bow: -16, delay: 1.15 },
  { a: 5, b: 7, bow: 18, delay: 1.28 },
  { a: 7, b: 9, bow: -18, delay: 1.42 },
  { a: 4, b: 6, bow: 16, delay: 1.15 },
  { a: 6, b: 8, bow: -18, delay: 1.28 },
  { a: 8, b: 10, bow: 18, delay: 1.42 },
];

/** Chemin courbe (bombé perpendiculaire) = trait dessiné à la main, pas droit. */
const curve = (a: P, b: P, bow: number): string => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return `M${a.x},${a.y} Q${mx + (-dy / len) * bow},${my + (dx / len) * bow} ${b.x},${b.y}`;
};

const NODE_DELAY = [1.0, 1.0, 1.1, 1.1, 1.2, 1.45, 1.45, 1.65, 1.65, 1.85, 1.85];
const EASE = [0.22, 1, 0.36, 1] as const;

const HandDrawnConstellation: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const draw = (delay: number, op: number) => ({
    initial: reduced ? { pathLength: 1, opacity: op } : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: op },
    transition: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : delay, ease: EASE },
  });
  const appear = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay },
  });

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {LINKS.map((l, i) => {
        const d = curve(NODES[l.a], NODES[l.b], l.bow);
        // double-stroke = encre : trait large diffus + trait fin lumineux.
        return (
          <g key={`l${i}`}>
            <motion.path d={d} stroke="rgba(249,220,174,0.5)" strokeWidth={3.4} strokeLinecap="round" {...draw(l.delay, 0.2)} />
            <motion.path d={d} stroke="rgba(255,240,208,0.9)" strokeWidth={1.4} strokeLinecap="round" {...draw(l.delay, 0.62)} />
          </g>
        );
      })}
      {NODES.map((n, i) => (
        <motion.g key={`n${i}`} {...appear(NODE_DELAY[i])}>
          <circle cx={n.x} cy={n.y} r={13} fill="rgba(248,176,68,0.20)" />
          <circle cx={n.x} cy={n.y} r={3.2} fill="#FFF3D8" />
        </motion.g>
      ))}
    </svg>
  );
};

export const HeroConstellation: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [reduced]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#0b2228]">
      {/* Champ d'étoiles ambiant (gradé TLS teal), légèrement estompé pour
          laisser la constellation dessinée dominer. */}
      {reduced ? (
        <img src="/images/starfield-teal-poster.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/starfield-teal-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          tabIndex={-1}
          aria-hidden
        >
          <source src="/videos/starfield-teal-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Constellation dessinée à la main (touch humain, connexions) */}
      <HandDrawnConstellation reduced={reduced} />

      {/* Vignette centrale : le texte centré s'assoit au calme. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(105% 72% at 50% 46%, rgba(11,34,40,0.6) 0%, rgba(11,34,40,0.22) 46%, rgba(11,34,40,0) 74%)',
        }}
      />

      {/* La lumière qui se lève de l'horizon bas (sous le texte) = mise en lumière. */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(62% 100% at 50% 100%, rgba(248,176,68,0.5) 0%, rgba(248,176,68,0.14) 42%, rgba(248,176,68,0) 72%)',
          filter: 'blur(28px)',
        }}
        initial={reduced ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 80 }}
        animate={{ opacity: reduced ? 0.5 : 0.62, y: 0 }}
        transition={{ duration: reduced ? 0 : 2.8, delay: reduced ? 0 : 0.4, ease: EASE }}
      />

      <HeroCopy />
    </section>
  );
};

export default HeroConstellation;
