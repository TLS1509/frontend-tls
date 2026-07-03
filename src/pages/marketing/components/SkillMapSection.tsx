/**
 * SkillMapSection — "La méthode TLS se dessine sous tes yeux"
 *
 * Direction C — Illustrated Glass : fond petrol profond + SVG qui s'assemble
 * progressivement au scroll (draw-on-scroll pathLength). Évoque le stop-motion
 * création et les éléments qui apparaissent progressivement pour remplir l'espace.
 *
 * Animation sequence :
 *   t=0.0  — Header (eyebrow + titre + sous-titre)
 *   t=0.0  — Main nodes pop-in staggeré (teal · orange · gold)
 *   t=0.6  — Arc L→P se dessine (dashed)
 *   t=1.0  — Arc P→V se dessine (dashed)
 *   t=1.4+ — Satellites + lignes satellites apparaissent
 *   t=0.4  — Glass pills flottent au-dessus de chaque nœud principal
 *   t=2.8  — Captions Apprendre/Pratiquer/Valider
 *
 * 03/07/2026 — Fusion avec l'ex-section MethodSteps (critique : les deux
 * racontaient la même boucle Learn/Do/Match en double, à 30s d'écart, avec
 * deux vocabulaires différents). La copy la plus riche de MethodSteps est
 * reprise ici en captions texte sous le diagramme — pas de nouvelle grille
 * de cartes, juste le texte qui manquait au visuel le plus travaillé de la
 * page. MethodSteps supprimé de MarketingHome.tsx.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

// ── Grain ──────────────────────────────────────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── SVG Geometry ───────────────────────────────────────────────────────────
const VB_W = 1100;
const VB_H = 440;

const MAIN_NODES = [
  {
    id: 'learn',
    cx: 165,
    cy: 215,
    r: 52,
    label: 'Apprendre',
    sub: 'Modules · Vidéos · Quiz',
    pill: 'Learning App',
    color: '#55A1B4',
    glow: 'rgba(85,161,180,0.45)',
    popDelay: 0.05,
  },
  {
    id: 'practice',
    cx: 550,
    cy: 215,
    r: 52,
    label: 'Pratiquer',
    sub: 'Missions · Projets réels',
    pill: 'Projets Réels',
    color: '#ED843A',
    glow: 'rgba(237,132,58,0.45)',
    popDelay: 0.20,
  },
  {
    id: 'validate',
    cx: 935,
    cy: 215,
    r: 52,
    label: 'Valider',
    sub: 'Compétences · Badges',
    pill: 'Passeport Dreyfus',
    color: '#F8B044',
    glow: 'rgba(248,176,68,0.45)',
    popDelay: 0.35,
  },
] as const;

const ARCS = [
  { id: 'lp', d: 'M 218 213 Q 385 128 498 213', delay: 0.65 },
  { id: 'pv', d: 'M 603 213 Q 770 128 882 213', delay: 1.05 },
] as const;

const SAT_NODES = [
  // Around Learn (3 satellites)
  { id: 's1', cx: 62,  cy: 112, r: 20, label: 'Vidéos',    delay: 1.4, path: 'M 82 128 Q 112 162 140 185' },
  { id: 's2', cx: 56,  cy: 322, r: 17, label: 'Quiz',       delay: 1.5, path: 'M 74 307 Q 104 272 132 245' },
  { id: 's3', cx: 270, cy: 86,  r: 19, label: 'Cours',      delay: 1.6, path: 'M 258 105 Q 228 145 205 178' },
  // Around Practice (3 satellites)
  { id: 's4', cx: 418, cy: 86,  r: 19, label: 'Missions',   delay: 1.85, path: 'M 430 105 Q 468 147 514 185' },
  { id: 's5', cx: 682, cy: 86,  r: 19, label: 'Cas réels',  delay: 1.95, path: 'M 670 105 Q 632 147 588 185' },
  { id: 's6', cx: 550, cy: 398, r: 17, label: 'Coaching',   delay: 2.05, path: 'M 550 381 Q 550 332 550 268' },
  // Around Validate (3 satellites)
  { id: 's7', cx: 820, cy: 86,  r: 19, label: 'Badges',     delay: 2.25, path: 'M 832 105 Q 870 147 912 182' },
  { id: 's8', cx: 1050, cy: 112, r: 20, label: 'Passeport',  delay: 2.35, path: 'M 1032 130 Q 1000 163 963 185' },
  { id: 's9', cx: 1048, cy: 322, r: 17, label: 'JAC',        delay: 2.45, path: 'M 1036 307 Q 1008 272 968 243' },
] as const;

// ── Captions (copy reprise de l'ex-MethodSteps, 03/07/2026) ────────────────
const CAPTIONS = [
  {
    title: 'Apprendre, à votre rythme.',
    body: "Un parcours adaptatif qui part de votre niveau réel (échelle Dreyfus) et vous fait progresser sur ce qui compte pour votre métier : pas un catalogue de vidéos à consommer.",
  },
  {
    title: 'Mettre en pratique, sur du concret.',
    body: "Vous appliquez immédiatement sur vos propres projets. La compétence se construit en faisant, et se prouve sur un livrable réel : accompagné, jamais seul.",
  },
  {
    title: 'Valoriser, et faire matcher.',
    body: "Chaque acquis enrichit un passeport de compétences vérifiable. Des preuves lisibles, prêtes à relier les bonnes compétences aux bons projets.",
  },
] as const;

// ── Easing & variants ──────────────────────────────────────────────────────
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

function drawPath(delay: number, duration = 1.6) {
  return {
    hidden:  { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration, ease: EASE_OUT, delay },
        opacity:    { duration: 0.08, delay },
      },
    },
  };
}

function popIn(delay: number): Variants {
  return {
    hidden:  { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24, delay },
    },
  };
}

function fadeUp(delay: number) {
  return {
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay } },
  };
}

// ── Component ──────────────────────────────────────────────────────────────
export const SkillMapSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const animate = inView || reduced ? 'visible' : 'hidden';
  const initial = reduced ? 'visible' : 'hidden';

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-br from-primary-900 via-[#1B3B47] to-[#111820] py-page"
      aria-labelledby="skillmap-title"
    >
      {/* Seams : adoucissent les coupures nettes blanc→pétrole (haut) et
          pétrole→gris clair (bas), 03/07/2026 */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-ink-50/15 to-transparent pointer-events-none" />

      {/* Ambient glow behind each main node */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {MAIN_NODES.map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-pill blur-[90px] opacity-20"
            style={{
              width: 360, height: 360,
              left: `${(n.cx / VB_W) * 100}%`,
              top:  `calc(${(n.cy / VB_H) * 55}% + 35%)`,
              background: `radial-gradient(circle, ${n.glow}, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.045]"
        style={{ backgroundImage: GRAIN_SVG }}
      />

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="relative z-base mx-auto max-w-page px-stack text-center mb-section">
        <motion.h2
          id="skillmap-title"
          initial={initial}
          animate={animate}
          variants={fadeUp(0.12)}
          className="font-display text-h2 font-extrabold tracking-display text-white [text-wrap:balance]"
        >
          Former, pratiquer, valider.
        </motion.h2>
        <motion.p
          initial={initial}
          animate={animate}
          variants={fadeUp(0.22)}
          className="mx-auto mt-stack max-w-[52ch] font-body text-body leading-relaxed text-primary-200/75"
        >
          Une boucle d'apprentissage complète, celle que vivront vos formateurs
          et apprenants, de la théorie à la preuve concrète de compétence.
        </motion.p>
      </div>

      {/* ── SVG Knowledge Map ──────────────────────────────────────────── */}
      <div className="relative z-base mx-auto max-w-[1100px] px-4">
        <div className="relative w-full">

          {/* SVG canvas */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full"
            aria-hidden
            style={{ overflow: 'visible' }}
          >
            <defs>
              {/* Glow filter per main node */}
              {MAIN_NODES.map((n) => (
                <filter
                  key={`glow-${n.id}`}
                  id={`glow-${n.id}`}
                  x="-60%" y="-60%" width="220%" height="220%"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* ── Main connection arcs (dashed, draw-on-scroll) ── */}
            {ARCS.map((arc) => (
              <motion.path
                key={arc.id}
                d={arc.d}
                fill="none"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : drawPath(arc.delay, 1.5)}
              />
            ))}

            {/* ── Satellite connection lines (thin, draw-on-scroll) ── */}
            {SAT_NODES.map((s) => (
              <motion.path
                key={`sp-${s.id}`}
                d={s.path}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : drawPath(s.delay - 0.08, 1.0)}
              />
            ))}

            {/* ── Main nodes ── */}
            {MAIN_NODES.map((n) => (
              <motion.g
                key={n.id}
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : popIn(n.popDelay)}
              >
                {/* Outer halo */}
                <circle
                  cx={n.cx} cy={n.cy} r={n.r + 24}
                  fill="none"
                  stroke={n.color}
                  strokeOpacity="0.10"
                  strokeWidth="1"
                />
                {/* Mid ring */}
                <circle
                  cx={n.cx} cy={n.cy} r={n.r + 10}
                  fill="none"
                  stroke={n.color}
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                {/* Core fill */}
                <circle
                  cx={n.cx} cy={n.cy} r={n.r}
                  fill={`${n.color}18`}
                  stroke={n.color}
                  strokeOpacity="0.65"
                  strokeWidth="1.5"
                  filter={`url(#glow-${n.id})`}
                />
                {/* Center dot */}
                <circle
                  cx={n.cx} cy={n.cy} r={7}
                  fill={n.color}
                  fillOpacity="0.95"
                />
              </motion.g>
            ))}

            {/* ── Satellite nodes ── */}
            {SAT_NODES.map((s) => (
              <motion.g
                key={s.id}
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : popIn(s.delay)}
              >
                <circle
                  cx={s.cx} cy={s.cy} r={s.r}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1"
                />
                <circle cx={s.cx} cy={s.cy} r={3.5} fill="rgba(255,255,255,0.65)" />
              </motion.g>
            ))}

            {/* ── Satellite text labels ── */}
            {SAT_NODES.map((s) => (
              <motion.text
                key={`stxt-${s.id}`}
                x={s.cx}
                y={s.cy + s.r + 15}
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="11.5"
                fontFamily="Nunito, sans-serif"
                fontWeight="600"
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : fadeUp(s.delay + 0.12)}
              >
                {s.label}
              </motion.text>
            ))}

            {/* ── Main node text labels (below each node) ── */}
            {MAIN_NODES.map((n) => (
              <motion.g
                key={`mtxt-${n.id}`}
                initial={initial}
                animate={animate}
                variants={reduced ? undefined : fadeUp(n.popDelay + 0.28)}
              >
                <text
                  x={n.cx}
                  y={n.cy + n.r + 30}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.92)"
                  fontSize="15.5"
                  fontFamily="League Spartan, sans-serif"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                >
                  {n.label}
                </text>
                <text
                  x={n.cx}
                  y={n.cy + n.r + 48}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.38)"
                  fontSize="10.5"
                  fontFamily="Nunito, sans-serif"
                  fontWeight="600"
                >
                  {n.sub}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>

      {/* ── Captions — copy reprise de l'ex-MethodSteps ──────────────────── */}
      <motion.div
        initial={initial}
        animate={animate}
        variants={fadeUp(2.8)}
        className="relative z-base mx-auto mt-section-lg max-w-page px-stack"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg border-t border-white/10 pt-section">
          {CAPTIONS.map((c) => (
            <div key={c.title} className="flex flex-col gap-tight text-center md:text-left">
              <p className="font-display text-body font-bold text-white m-0">{c.title}</p>
              <p className="font-body text-body-sm text-primary-200/70 leading-relaxed m-0">{c.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillMapSection;
