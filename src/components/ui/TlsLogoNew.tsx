/**
 * TLS Logo New Proposals — 6 marks DS-aligned, 2026 trends
 *
 * A — NODE      : 3 sphères connectées (Figma-system, social graph)
 * B — TRIDENT   : 3 arcs rotatifs 120° (Claude starburst, énergie)
 * C — CROSS+    : croix épaisse arrondie simplifiée du mark original (favicon-proof)
 * D — ORBIT     : grande sphère teal + 2 satellites orbite arc (solaire, cosmos)
 * E — JOURNEY   : courbe bezier S avec 3 stops couleur (parcours apprenants)
 * F — SIGNAL    : onde montante + point d'arrivée (insight, breakthrough)
 *
 * Tous : viewBox 160×160, palette DS TLS uniquement, works 16px → 512px
 */

import { useId } from 'react';

interface P { size?: number; className?: string; }

const C = {
  t50:  '#E8F4F7', t100: '#DCEBEF', t200: '#B9D7DF', t300: '#96C3CF',
  t400: '#73AFBF', t500: '#55A1B4', t600: '#4A8FA1', t700: '#3D7786',
  t800: '#2F5F6A', t900: '#1F3E45',
  amber: '#EB7724', amberDk: '#B85C14', amberLt: '#F5AB78',
  gold: '#F8B044',  goldDk: '#C07A10',  goldLt: '#FCDB9C',
  white: '#FFFFFF',
};


// ── A — NODE ─────────────────────────────────────────────────────────────────
// 3 sphères reliées par des arcs fins (réseau de compétences)
// Inspiré : Figma, graph social, constellation
// Lisibilité 16px : 3 blobs distincts → parfait
// ─────────────────────────────────────────────────────────────────────────────
export function LogoANode({ size = 200, className }: P) {
  const u = 'la' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <radialGradient id={`${u}tc`} cx="33%" cy="28%" r="72%">
          <stop offset="0%"   stopColor={C.t200} />
          <stop offset="45%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>
        <radialGradient id={`${u}am`} cx="30%" cy="25%" r="72%">
          <stop offset="0%"   stopColor={C.white} stopOpacity="0.9" />
          <stop offset="20%"  stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        <radialGradient id={`${u}gl`} cx="30%" cy="25%" r="72%">
          <stop offset="0%"   stopColor={C.white} stopOpacity="0.9" />
          <stop offset="20%"  stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        <filter id={`${u}sh`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={C.t900} floodOpacity="0.24" />
        </filter>
        <filter id={`${u}ss`} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={C.t900} floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Connectors — bezier doux */}
      <path d="M 76 62 C 84 56 98 50 116 42" stroke={C.t400} strokeWidth="7"
        strokeLinecap="round" opacity="0.45" />
      <path d="M 76 98 C 84 104 100 110 116 116" stroke={C.t400} strokeWidth="7"
        strokeLinecap="round" opacity="0.45" />

      {/* Satellite gold (bas-droite) — derrière teal */}
      <circle cx="122" cy="118" r="22" fill={`url(#${u}gl)`} filter={`url(#${u}ss)`} />
      <circle cx="115" cy="112" r="6"  fill={C.white} fillOpacity="0.36" />

      {/* Satellite amber (haut-droite) — derrière teal */}
      <circle cx="120" cy="42" r="22" fill={`url(#${u}am)`} filter={`url(#${u}ss)`} />
      <circle cx="113" cy="36" r="6"  fill={C.white} fillOpacity="0.36" />

      {/* Centre teal (dominant) */}
      <circle cx="74" cy="80" r="40" fill={`url(#${u}tc)`} filter={`url(#${u}sh)`} />
      <ellipse cx="61" cy="66" rx="13" ry="9" fill={C.white} fillOpacity="0.28"
        transform="rotate(-28 61 66)" />
      <circle cx="66" cy="62" r="5" fill={C.white} fillOpacity="0.22" />
    </svg>
  );
}


// ── B — TRIDENT ───────────────────────────────────────────────────────────────
// 3 arcs 120°, épaisseur > 20px, pinwheel dynamique
// Inspiré : Claude starburst, Framer, Arc Browser, énergie radiante
// Lisibilité 16px : silhouette triangulaire → excellent
// ─────────────────────────────────────────────────────────────────────────────
export function LogoBTriden({ size = 200, className }: P) {
  const u = 'lb' + useId().replace(/[^a-z0-9]/gi, '');
  // Arc de 130° centré en haut (−65° → +65° par rapport à la verticale)
  // rayon = 52, centre = 80,80
  // start: angle 205° standard → x=80+52*cos205°=32.9, y=80+52*sin205°=58.0
  // end  : angle 335° standard → x=127.1, y=58.0
  const ARC = 'M 32.9 58.0 A 52 52 0 0 1 127.1 58.0';
  const SW = 22;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <linearGradient id={`${u}g1`} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="100%" stopColor={C.t700} />
        </linearGradient>
        <linearGradient id={`${u}g2`} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </linearGradient>
        <linearGradient id={`${u}g3`} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </linearGradient>
        <filter id={`${u}sh`} x="-18%" y="-18%" width="136%" height="136%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={C.t900} floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter={`url(#${u}sh)`}>
        {/* Arc teal — top */}
        <path d={ARC} stroke={`url(#${u}g1)`} strokeWidth={SW} strokeLinecap="round" fill="none" />
        {/* Arc amber — bottom-right (120° CW) */}
        <path d={ARC} stroke={`url(#${u}g2)`} strokeWidth={SW} strokeLinecap="round" fill="none"
          transform="rotate(120 80 80)" />
        {/* Arc gold — bottom-left (240° CW) */}
        <path d={ARC} stroke={`url(#${u}g3)`} strokeWidth={SW} strokeLinecap="round" fill="none"
          transform="rotate(240 80 80)" />
      </g>

      {/* Centre dot — ancre optique */}
      <circle cx="80" cy="80" r="14" fill={C.t800} />
      <circle cx="75" cy="75" r="5" fill={C.white} fillOpacity="0.35" />
    </svg>
  );
}


// ── C — CROSS+ ────────────────────────────────────────────────────────────────
// Croix épaisse arrondie — distillation du mark original TLS (4 lobes)
// Simplicité absolue, monochrome teal + gold tip
// Inspiré : Notion, Linear, favicon-first thinking
// Lisibilité 16px : forme de croix = la plus lisible qui soit
// ─────────────────────────────────────────────────────────────────────────────
export function LogoCCross({ size = 200, className }: P) {
  const u = 'lc' + useId().replace(/[^a-z0-9]/gi, '');
  const SW = 44;
  const R = SW / 2;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <radialGradient id={`${u}bg`} cx="35%" cy="30%" r="75%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="50%"  stopColor={C.t600} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>
        <radialGradient id={`${u}am`} cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.white} stopOpacity="0.88" />
          <stop offset="25%"  stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        <filter id={`${u}sh`} x="-22%" y="-22%" width="144%" height="144%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor={C.t900} floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter={`url(#${u}sh)`}>
        {/* Croix — H + V overlapping */}
        <rect x={80 - SW / 2} y={20} width={SW} height={120} rx={R}
          fill={`url(#${u}bg)`} />
        <rect x={20} y={80 - SW / 2} width={120} height={SW} rx={R}
          fill={`url(#${u}bg)`} />
      </g>

      {/* Specular sweep */}
      <rect x={80 - SW / 2} y={20} width={SW} height={120} rx={R}
        fill="white" fillOpacity="0.12" />

      {/* Centre pearl dot */}
      <circle cx="80" cy="80" r="16" fill={C.t100} />
      <circle cx="75" cy="75" r="6"  fill={C.white} fillOpacity="0.70" />

      {/* Gold accent tip — coin haut-droit (signature TLS) */}
      <circle cx="128" cy="32" r="14" fill={`url(#${u}am)`} />
      <circle cx="123" cy="27" r="5" fill={C.white} fillOpacity="0.46" />
    </svg>
  );
}


// ── D — ORBIT ────────────────────────────────────────────────────────────────
// Grande sphère teal + 2 satellites sur orbite, trace d'arc subtile
// Inspiré : cosmos, écosystème apprenant, planète + lunes
// Lisibilité 16px : 1 gros disque + 2 petits = silhouette claire
// ─────────────────────────────────────────────────────────────────────────────
export function LogoDOrbit({ size = 200, className }: P) {
  const u = 'ld' + useId().replace(/[^a-z0-9]/gi, '');
  // Orbit ring : ellipse inclinée 25° sur le grand cercle r=46
  // Satellites à 45° (haut-droit) et 225° (bas-gauche) de l'ellipse
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <radialGradient id={`${u}orb`} cx="32%" cy="27%" r="72%">
          <stop offset="0%"   stopColor={C.t100} />
          <stop offset="35%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>
        <radialGradient id={`${u}am`} cx="30%" cy="25%" r="70%">
          <stop offset="0%"   stopColor={C.white} stopOpacity="0.92" />
          <stop offset="22%"  stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        <radialGradient id={`${u}gl`} cx="30%" cy="25%" r="70%">
          <stop offset="0%"   stopColor={C.white} stopOpacity="0.92" />
          <stop offset="22%"  stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        <filter id={`${u}sh`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor={C.t900} floodOpacity="0.26" />
        </filter>
        <filter id={`${u}ss`} x="-55%" y="-55%" width="210%" height="210%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={C.t900} floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Orbit ring — ellipse inclinée légère */}
      <ellipse cx="80" cy="80" rx="64" ry="30"
        stroke={C.t400} strokeWidth="2" fill="none" opacity="0.30"
        transform="rotate(-25 80 80)" />

      {/* Satellite gold — bas-gauche de l'orbite */}
      <circle cx="34" cy="102" r="16" fill={`url(#${u}gl)`} filter={`url(#${u}ss)`} />
      <circle cx="29" cy="97"  r="5"  fill={C.white} fillOpacity="0.40" />

      {/* Orbe principal */}
      <circle cx="80" cy="80" r="46" fill={`url(#${u}orb)`} filter={`url(#${u}sh)`} />
      <ellipse cx="65" cy="64" rx="16" ry="11" fill={C.white} fillOpacity="0.26"
        transform="rotate(-28 65 64)" />
      <circle cx="68" cy="60" r="6" fill={C.white} fillOpacity="0.22" />

      {/* Satellite amber — haut-droit de l'orbite */}
      <circle cx="128" cy="52" r="16" fill={`url(#${u}am)`} filter={`url(#${u}ss)`} />
      <circle cx="123" cy="47" r="5"  fill={C.white} fillOpacity="0.42" />
    </svg>
  );
}


// ── E — JOURNEY ───────────────────────────────────────────────────────────────
// Courbe bezier ascendante (parcours) avec 3 stops couleur
// Inspiré : progress paths, data viz, learning journey
// Lisibilité 16px : courbe épaisse bold + 3 dots → lisible
// ─────────────────────────────────────────────────────────────────────────────
export function LogoEJourney({ size = 200, className }: P) {
  const u = 'le' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <linearGradient id={`${u}path`} x1="20" y1="130" x2="140" y2="30"
          gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.amber} />
          <stop offset="50%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
        <radialGradient id={`${u}s1`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        <radialGradient id={`${u}s2`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={C.t200} />
          <stop offset="100%" stopColor={C.t800} />
        </radialGradient>
        <radialGradient id={`${u}s3`} cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        <filter id={`${u}sh`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor={C.t900} floodOpacity="0.26" />
        </filter>
      </defs>

      {/* Halo glow derrière la courbe */}
      <path d="M 26 128 C 40 90 90 80 134 28"
        stroke={C.t500} strokeWidth="28" strokeLinecap="round" fill="none"
        opacity="0.08" filter={`url(#${u}sh)`} />

      {/* Courbe principale épaisse */}
      <path d="M 26 128 C 40 90 90 80 134 28"
        stroke={`url(#${u}path)`} strokeWidth="18" strokeLinecap="round" fill="none" />

      {/* Stop amber — départ bas-gauche */}
      <circle cx="26"  cy="128" r="20" fill={`url(#${u}s1)`} />
      <circle cx="20"  cy="122" r="6"  fill={C.white} fillOpacity="0.42" />

      {/* Stop teal — milieu chemin */}
      <circle cx="80"  cy="79"  r="16" fill={`url(#${u}s2)`} />
      <circle cx="75"  cy="74"  r="5"  fill={C.white} fillOpacity="0.38" />

      {/* Stop gold — arrivée haut-droit */}
      <circle cx="134" cy="28"  r="20" fill={`url(#${u}s3)`} />
      <circle cx="128" cy="22"  r="6"  fill={C.white} fillOpacity="0.46" />
    </svg>
  );
}


// ── F — SIGNAL ────────────────────────────────────────────────────────────────
// Onde montante (3 arcs concentriques) + point d'arrivée gold
// Inspiré : insight, breakthrough, wifi/signal, progress radar
// Lisibilité 16px : 3 arcs concentriques → très distinctifs
// ─────────────────────────────────────────────────────────────────────────────
export function LogoFSignal({ size = 200, className }: P) {
  const u = 'lf' + useId().replace(/[^a-z0-9]/gi, '');
  // 3 arcs de cercle centrés en bas-gauche (30,130)
  // R = 36, 62, 90 — each arc ~90° (de 0° à 90° = bottom-left to top-right quadrant)
  const ARC_OPTS = (r: number) =>
    `M ${30 + r} 130 A ${r} ${r} 0 0 1 30 ${130 - r}`;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" className={className}>
      <defs>
        <linearGradient id={`${u}g1`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="100%" stopColor={C.t700} />
        </linearGradient>
        <linearGradient id={`${u}g2`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor={C.t400} />
          <stop offset="100%" stopColor={C.t600} />
        </linearGradient>
        <linearGradient id={`${u}g3`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor={C.t200} />
          <stop offset="100%" stopColor={C.t500} />
        </linearGradient>
        <radialGradient id={`${u}dot`} cx="30%" cy="25%" r="70%">
          <stop offset="0%"   stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        <filter id={`${u}sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor={C.t900} floodOpacity="0.22" />
        </filter>
      </defs>

      {/* 3 arcs concentriques */}
      <g filter={`url(#${u}sh)`} strokeLinecap="round" fill="none">
        {/* Outer arc — le plus clair */}
        <path d={ARC_OPTS(88)} stroke={`url(#${u}g3)`} strokeWidth="18" />
        {/* Mid arc */}
        <path d={ARC_OPTS(58)} stroke={`url(#${u}g2)`} strokeWidth="20" />
        {/* Inner arc — le plus sombre + épais */}
        <path d={ARC_OPTS(30)} stroke={`url(#${u}g1)`} strokeWidth="22" />
      </g>

      {/* Point origine bas-gauche */}
      <circle cx="30" cy="130" r="12" fill={C.t800} />
      <circle cx="26" cy="126" r="4"  fill={C.white} fillOpacity="0.38" />

      {/* Gold star — arrivée signal haut-droit */}
      <circle cx="124" cy="38" r="18" fill={`url(#${u}dot)`} filter={`url(#${u}sh)`} />
      <circle cx="119" cy="33" r="6"  fill={C.white} fillOpacity="0.46" />
    </svg>
  );
}

// ── Export catalogue ──────────────────────────────────────────────────────────
export const newProposals = [
  {
    id: 'node',    label: 'A — Node',
    Sub: LogoANode,
    inspo: 'Figma · social graph · réseau compétences',
    concept: '3 sphères connectées : teal dominant + amber/gold satellites. Système modulaire, lisible à 16px.',
    favicon: '⭐⭐⭐⭐⭐',
  },
  {
    id: 'trident', label: 'B — Trident',
    Sub: LogoBTriden,
    inspo: 'Claude · Arc Browser · Framer · énergie radiante',
    concept: '3 arcs 120° en pinwheel. Teal/amber/gold. Silhouette triangulaire très distinctive à 16px.',
    favicon: '⭐⭐⭐⭐⭐',
  },
  {
    id: 'cross',   label: 'C — Cross+',
    Sub: LogoCCross,
    inspo: 'Linear · Notion · distillation 4-lobes TLS',
    concept: 'Croix épaisse arrondie = forme distillée du mark original. Tip gold haut-droit = signature TLS. Ultra-favicon.',
    favicon: '⭐⭐⭐⭐⭐',
  },
  {
    id: 'orbit',   label: 'D — Orbit',
    Sub: LogoDOrbit,
    inspo: 'cosmique · écosystème · Apple Mac icons 2026',
    concept: 'Grande orbe teal + 2 lunes amber/gold sur ellipse inclinée. Évoque un écosystème d\'apprentissage.',
    favicon: '⭐⭐⭐⭐',
  },
  {
    id: 'journey', label: 'E — Journey',
    Sub: LogoEJourney,
    inspo: 'Kahoot · data viz · progress paths',
    concept: 'Courbe bezier ascendante = parcours apprenant. 3 stops: amber (start) → teal (platform) → gold (achievement).',
    favicon: '⭐⭐⭐',
  },
  {
    id: 'signal',  label: 'F — Signal',
    Sub: LogoFSignal,
    inspo: 'wifi · radar · insight · Perplexity',
    concept: '3 arcs concentriques = signal d\'insight. Point origine + étoile gold = breakthrough. Métaphore forte.',
    favicon: '⭐⭐⭐⭐',
  },
] as const;
