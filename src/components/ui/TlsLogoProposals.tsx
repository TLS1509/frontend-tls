/**
 * TLS Logo Mark — 5 Design Proposals
 *
 * Each proposal explores a different design direction:
 *   P1 Heritage+ — Évolution douce, topology identique, finitions premium
 *   P2 Bloom     — 4 pétales organiques, dots réinterprétés comme tips
 *   P3 Nexus     — Graphe réseau géométrique précis, 5 nœuds
 *   P4 Arc       — 3 arcs propeller, abstract minimal, sans dots
 *   P5 Orb       — Grande sphère + 2 satellites, organique fluide, dots gardés
 *
 * All use viewBox="0 0 400 400". Size prop scales uniformly.
 */

import { useId } from 'react';

interface P { size?: number; className?: string; }

// TLS brand palette
const C = {
  t100: '#DCEBEF', t200: '#B9D7DF', t300: '#96C3CF', t400: '#73AFBF',
  t500: '#55A1B4', t600: '#4A8FA1', t700: '#3D7786', t800: '#2F5F6A', t900: '#1F3E45',
  amber: '#EB7724', amberDk: '#B85C14', amberLt: '#F5AB78',
  gold:  '#F8B044', goldDk:  '#C07A10', goldLt:  '#FCDB9C',
};

// ── Original TLS mark paths (viewBox 0 0 439 402) ─────────────────────────────
const PM = 'M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z';
const PC = 'M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z';
const PT = 'M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z';
const PB = 'M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z';

// ── 4-petal bloom paths (viewBox 0 0 400 400, center 200,200) ─────────────────
// Pétales symétriques calculés par rotation CCW 90° successive
const PUP    = 'M 200 200 C 270 190 270 65 200 35 C 130 65 130 190 200 200 Z';
const PRIGHT = 'M 200 200 C 210 270 335 270 365 200 C 335 130 210 130 200 200 Z';
const PDOWN  = 'M 200 200 C 130 210 130 335 200 365 C 270 335 270 210 200 200 Z';
const PLEFT  = 'M 200 200 C 190 130 65 130 35 200 C 65 270 190 270 200 200 Z';

// ── Arc propeller paths (viewBox 0 0 400 400, center 200,200) ─────────────────
// 3 arcs de 240° CW, rayon décroissant, décalés de 120° chacun
const ARCO = 'M 200 45 A 155 155 0 1 1 65.8 277.5';     // R=155, début 270°
const ARCM = 'M 286.6 250 A 100 100 0 1 1 200 100';     // R=100, début 30°
const ARCI = 'M 156.7 225 A 50 50 0 1 1 243.3 225';     // R=50,  début 150°


// ─────────────────────────────────────────────────────────────────────────────
// P1 — Heritage+ : même topologie TLS, glass/frost/3D premium
// Shadow multi-pass · specular sweep · rim light · dots sphériques
// ─────────────────────────────────────────────────────────────────────────────
export function LogoP1Heritage({ size = 200, className }: P) {
  const u = 'p1' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        {/* ─ Corps principal : radial NW→SE, profondeur lumineuse ─ */}
        <radialGradient id={`${u}bg`} cx="27%" cy="23%" r="82%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t100} />
          <stop offset="18%"  stopColor={C.t400} />
          <stop offset="52%"  stopColor={C.t600} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>

        {/* Glass specular — sweep lumineux fort NW→SE */}
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0.58" y2="0.82">
          <stop offset="0%"   stopColor="white" stopOpacity="0.64" />
          <stop offset="28%"  stopColor="white" stopOpacity="0.22" />
          <stop offset="62%"  stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Frost rim — lumière de contour SE, effet de relief */}
        <radialGradient id={`${u}rm`} cx="76%" cy="80%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t300} stopOpacity="0.42" />
          <stop offset="100%" stopColor={C.t300} stopOpacity="0" />
        </radialGradient>

        {/* ─ Cercle central : perle blanche glass ─ */}
        <radialGradient id={`${u}ci`} cx="32%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="20%"  stopColor={C.t100} />
          <stop offset="58%"  stopColor={C.t200} />
          <stop offset="100%" stopColor={C.t500} />
        </radialGradient>

        {/* ─ Dot amber : sphère 3D warm ─ */}
        <radialGradient id={`${u}am`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white"   stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FDDAB5" />
          <stop offset="46%"  stopColor={C.amber} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>

        {/* ─ Dot gold : sphère 3D doré ─ */}
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white"   stopOpacity="0.95" />
          <stop offset="18%"  stopColor={C.goldLt} />
          <stop offset="46%"  stopColor={C.gold} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>

        {/* ─ Glow teal ambiant DERRIÈRE le mark ─ */}
        <filter id={`${u}gw`} x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="30" />
        </filter>

        {/* ─ Shadow corps : 2 passes (ambient étalé + contact net) ─ */}
        <filter id={`${u}sh`} x="-30%" y="-24%" width="162%" height="168%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="26" result="b1"/>
          <feOffset in="b1" dy="24" result="o1"/>
          <feFlood floodColor={C.t900} floodOpacity="0.26" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>

          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="b2"/>
          <feOffset in="b2" dy="6" result="o2"/>
          <feFlood floodColor={C.t800} floodOpacity="0.20" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>

          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* ─ Shadow dots (proportionnel, plus net) ─ */}
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="11" result="b"/>
          <feOffset in="b" dy="10" result="o"/>
          <feFlood floodColor={C.t900} floodOpacity="0.26" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Coordonnées 439×402 → translate(20,35) scale(0.820) → 400×400 */}
      <g transform="translate(20,35) scale(0.820)">

        {/* Couche 0 : halo teal ambiant derrière */}
        <path d={PM} fill={C.t500} opacity="0.30" filter={`url(#${u}gw)`} />

        {/* Couche 1 : corps + shadow multi-pass */}
        <g filter={`url(#${u}sh)`}>
          <path d={PM} fill={`url(#${u}bg)`} />
        </g>

        {/* Couche 2 : glass specular sweep */}
        <path d={PM} fill={`url(#${u}sp)`} />

        {/* Couche 3 : frost rim light SE */}
        <path d={PM} fill={`url(#${u}rm)`} />

        {/* Cercle central perle */}
        <path d={PC} fill={`url(#${u}ci)`} />
        {/* Micro-glint central (catch light) */}
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.68" />

        {/* Dot amber sphère — PT center ≈ (307, 49) r≈44 dans 439×402 */}
        <g filter={`url(#${u}ds)`}>
          <path d={PT} fill={`url(#${u}am)`} />
        </g>
        {/* Amber : highlight primaire oval */}
        <ellipse cx="287" cy="28" rx="12" ry="8"
          fill="white" fillOpacity="0.76" transform="rotate(-22 287 28)" />
        {/* Amber : glint secondaire */}
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.52" />

        {/* Dot gold sphère — PB center ≈ (307, 352) r≈44 dans 439×402 */}
        <g filter={`url(#${u}ds)`}>
          <path d={PB} fill={`url(#${u}gl)`} />
        </g>
        {/* Gold : highlight primaire oval */}
        <ellipse cx="287" cy="331" rx="12" ry="8"
          fill="white" fillOpacity="0.76" transform="rotate(-22 287 331)" />
        {/* Gold : glint secondaire */}
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.52" />

      </g>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// P2 — Bloom : 4 pétales organiques, accent-tips amber & gold
// Direction : Évolution douce · Style : organique fluide · Dots : réinterprétés
// ─────────────────────────────────────────────────────────────────────────────
export function LogoP2Bloom({ size = 200, className }: P) {
  const u = 'p2' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        {/* Pétale haut — amber (tip à y=35) */}
        <linearGradient id={`${u}pu`} x1="200" y1="35" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.amber} />
          <stop offset="55%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.t700} />
        </linearGradient>
        {/* Pétale droite — gold (tip à x=365) */}
        <linearGradient id={`${u}pr`} x1="365" y1="200" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.gold} />
          <stop offset="55%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.t700} />
        </linearGradient>
        {/* Pétales bas & gauche — teal profond */}
        <linearGradient id={`${u}pd`} x1="200" y1="365" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t900} />
          <stop offset="100%" stopColor={C.t600} />
        </linearGradient>
        <linearGradient id={`${u}pl`} x1="35" y1="200" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t700} />
          <stop offset="100%" stopColor={C.t400} />
        </linearGradient>
        {/* Centre */}
        <radialGradient id={`${u}ce`} cx="40%" cy="35%" r="65%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor={C.t200} />
        </radialGradient>
        {/* Ombre globale */}
        <filter id={`${u}f`} x="-18%" y="-18%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor={C.t800} floodOpacity="0.30" />
        </filter>
        {/* Sheen léger sur chaque pétale */}
        <linearGradient id={`${u}sn`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter={`url(#${u}f)`}>
        {/* 4 pétales */}
        <path d={PDOWN}  fill={`url(#${u}pd)`} />
        <path d={PLEFT}  fill={`url(#${u}pl)`} />
        <path d={PUP}    fill={`url(#${u}pu)`} />
        <path d={PRIGHT} fill={`url(#${u}pr)`} />
        {/* Sheen overlay */}
        <path d={PUP}    fill={`url(#${u}sn)`} />
        <path d={PRIGHT} fill={`url(#${u}sn)`} />
      </g>

      {/* Centre blanc lumineux */}
      <circle cx="200" cy="200" r="28" fill={`url(#${u}ce)`} />

      {/* Petits halos aux tips amber & gold */}
      <circle cx="200" cy="35"  r="12" fill={C.amber} opacity="0.55" />
      <circle cx="365" cy="200" r="12" fill={C.gold}  opacity="0.50" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// P3 — Nexus : graphe réseau 5 nœuds, précision géométrique
// Direction : Réinterprétation audacieuse · Style : géométrique · Dots : réinterprétés
// ─────────────────────────────────────────────────────────────────────────────
export function LogoP3Nexus({ size = 200, className }: P) {
  const u = 'p3' + useId().replace(/[^a-z0-9]/gi, '');

  // Positions des 5 nœuds
  const cx = 200, cy = 200;
  const nodes = {
    center: { x: cx,     y: cy,     r: 62,  grad: `url(#${u}cn)` },
    ne:     { x: 305,    y: 95,     r: 40,  grad: `url(#${u}an)` }, // amber
    se:     { x: 305,    y: 305,    r: 40,  grad: `url(#${u}gn)` }, // gold
    sw:     { x: 95,     y: 305,    r: 36,  grad: `url(#${u}tn2)` }, // teal
    nw:     { x: 95,     y: 95,     r: 36,  grad: `url(#${u}tn1)` }, // teal-light
  };

  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        {/* Nœud central */}
        <radialGradient id={`${u}cn`} cx="35%" cy="30%" r="68%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="45%"  stopColor={C.t600} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>
        {/* Amber NE */}
        <radialGradient id={`${u}an`} cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        {/* Gold SE */}
        <radialGradient id={`${u}gn`} cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        {/* Teal NW */}
        <radialGradient id={`${u}tn1`} cx="32%" cy="28%" r="68%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t200} />
          <stop offset="100%" stopColor={C.t600} />
        </radialGradient>
        {/* Teal SW */}
        <radialGradient id={`${u}tn2`} cx="32%" cy="28%" r="68%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="100%" stopColor={C.t700} />
        </radialGradient>
        {/* Ombre */}
        <filter id={`${u}f`} x="-20%" y="-20%" width="145%" height="145%">
          <feDropShadow dx="0" dy="9" stdDeviation="15" floodColor={C.t900} floodOpacity="0.32" />
        </filter>
        {/* Sheen central */}
        <linearGradient id={`${u}sn`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.32" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Liens — bezier légèrement courbés */}
      <g stroke={C.t200} strokeWidth="10" strokeLinecap="round" opacity="0.65">
        <path d={`M ${cx} ${cy} C 248 158 278 122 ${nodes.ne.x} ${nodes.ne.y}`} />
        <path d={`M ${cx} ${cy} C 248 242 278 278 ${nodes.se.x} ${nodes.se.y}`} />
        <path d={`M ${cx} ${cy} C 152 242 122 278 ${nodes.sw.x} ${nodes.sw.y}`} />
        <path d={`M ${cx} ${cy} C 152 158 122 122 ${nodes.nw.x} ${nodes.nw.y}`} />
      </g>

      {/* Nœuds satellites */}
      <g filter={`url(#${u}f)`}>
        {Object.entries(nodes).filter(([k]) => k !== 'center').map(([key, n]) => (
          <circle key={key} cx={n.x} cy={n.y} r={n.r} fill={n.grad} />
        ))}
      </g>

      {/* Nœud central — au-dessus des liens */}
      <circle cx={cx} cy={cy} r={nodes.center.r} fill={nodes.center.grad} filter={`url(#${u}f)`} />
      <circle cx={cx} cy={cy} r={nodes.center.r} fill={`url(#${u}sn)`} />

      {/* Petits points spéculaires sur NE & SE */}
      <circle cx={nodes.ne.x - 12} cy={nodes.ne.y - 12} r="7" fill="white" opacity="0.45" />
      <circle cx={nodes.se.x - 12} cy={nodes.se.y - 12} r="7" fill="white" opacity="0.40" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// P4 — Arc : 3 arcs propeller 240°, minimal, sans dots
// Direction : Réinterprétation audacieuse · Style : abstract minimal · Dots : supprimés
// ─────────────────────────────────────────────────────────────────────────────
export function LogoP4Arc({ size = 200, className }: P) {
  const u = 'p4' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        {/* Gradient arc externe — light top */}
        <linearGradient id={`${u}go`} x1="200" y1="45" x2="66" y2="278" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t300} />
          <stop offset="100%" stopColor={C.t800} />
        </linearGradient>
        {/* Gradient arc moyen — mid */}
        <linearGradient id={`${u}gm`} x1="287" y1="250" x2="200" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t400} />
          <stop offset="100%" stopColor={C.t700} />
        </linearGradient>
        {/* Gradient arc interne — dark */}
        <linearGradient id={`${u}gi`} x1="157" y1="225" x2="243" y2="225" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.t600} />
          <stop offset="100%" stopColor={C.t900} />
        </linearGradient>
        {/* Ombre globale */}
        <filter id={`${u}f`} x="-22%" y="-22%" width="148%" height="148%">
          <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor={C.t900} floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter={`url(#${u}f)`}>
        {/* Arc externe R=155 — du top (270°) jusqu'à 150°, 240° CW */}
        <path
          d={ARCO}
          stroke={`url(#${u}go)`}
          strokeWidth="26"
          strokeLinecap="round"
        />
        {/* Arc moyen R=100 — 120° offset */}
        <path
          d={ARCM}
          stroke={`url(#${u}gm)`}
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* Arc interne R=50 — 240° offset */}
        <path
          d={ARCI}
          stroke={`url(#${u}gi)`}
          strokeWidth="18"
          strokeLinecap="round"
        />
      </g>

      {/* Point central — ancre de la composition */}
      <circle cx="200" cy="200" r="10" fill={C.t800} opacity="0.70" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// P5 — Orb : grande sphère teal + 2 satellites, organique fluide
// Direction : Réinterprétation audacieuse · Style : organique · Dots : gardés
// ─────────────────────────────────────────────────────────────────────────────
export function LogoP5Orb({ size = 200, className }: P) {
  const u = 'p5' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        {/* Orbe principal — gradient teal radial */}
        <radialGradient id={`${u}orb`} cx="32%" cy="28%" r="72%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={C.t200} />
          <stop offset="40%"  stopColor={C.t500} />
          <stop offset="100%" stopColor={C.t900} />
        </radialGradient>
        {/* Satellite amber — gradient chaud */}
        <radialGradient id={`${u}am`} cx="28%" cy="24%" r="72%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.88" />
          <stop offset="28%"  stopColor={C.amberLt} />
          <stop offset="100%" stopColor={C.amberDk} />
        </radialGradient>
        {/* Satellite gold — gradient doré */}
        <radialGradient id={`${u}gld`} cx="28%" cy="24%" r="72%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.88" />
          <stop offset="30%"  stopColor={C.goldLt} />
          <stop offset="100%" stopColor={C.goldDk} />
        </radialGradient>
        {/* Noyau central blanc */}
        <radialGradient id={`${u}nuc`} cx="40%" cy="35%" r="60%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="60%"  stopColor={C.t100} />
          <stop offset="100%" stopColor={C.t300} />
        </radialGradient>
        {/* Sheen orbe */}
        <linearGradient id={`${u}sn`} x1="0" y1="0" x2="0.7" y2="0.7">
          <stop offset="0%"   stopColor="white" stopOpacity="0.38" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Ombres individuelles */}
        <filter id={`${u}fo`} x="-25%" y="-25%" width="155%" height="155%">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor={C.t900} floodOpacity="0.36" />
        </filter>
        <filter id={`${u}fs`} x="-30%" y="-30%" width="165%" height="165%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={C.t800} floodOpacity="0.28" />
        </filter>
      </defs>

      {/* ── Orbe principal R=108, légèrement décentré ── */}
      <circle cx="192" cy="204" r="108" fill={`url(#${u}orb)`} filter={`url(#${u}fo)`} />
      {/* Sheen */}
      <circle cx="192" cy="204" r="108" fill={`url(#${u}sn)`} />

      {/* ── Satellite amber (haut-droite) ── */}
      <circle cx="296" cy="104" r="52" fill={`url(#${u}am)`} filter={`url(#${u}fs)`} />
      {/* ── Satellite gold (bas-droite) ── */}
      <circle cx="296" cy="304" r="52" fill={`url(#${u}gld)`} filter={`url(#${u}fs)`} />

      {/* ── Noyau central ── */}
      <circle cx="192" cy="204" r="30" fill={`url(#${u}nuc)`} />

      {/* ── Spéculaires sur les satellites ── */}
      <circle cx="280" cy="90"  r="10" fill="white" opacity="0.50" />
      <circle cx="280" cy="290" r="10" fill="white" opacity="0.44" />
    </svg>
  );
}

// ── Named exports pour le test page ──────────────────────────────────────────
export const proposals = [
  {
    id: 'heritage',
    label: 'Heritage+',
    Component: LogoP1Heritage,
    direction: 'Évolution douce',
    style: 'Organique raffin',
    dots: 'Dots gardés',
    desc: 'Même topologie TLS. Gradient radial premium, sheen, ombre teal.',
  },
  {
    id: 'bloom',
    label: 'Bloom',
    Component: LogoP2Bloom,
    direction: 'Évolution douce',
    style: 'Organique fluide',
    dots: 'Dots réinterprétés',
    desc: '4 pétales de Bézier symétriques. Tips amber & gold = les dots.',
  },
  {
    id: 'nexus',
    label: 'Nexus',
    Component: LogoP3Nexus,
    direction: 'Réinterprétation',
    style: 'Géométrique précis',
    dots: 'Dots réinterprétés',
    desc: 'Graphe réseau 5 nœuds. Bonds bezier. Amber NE, gold SE.',
  },
  {
    id: 'arc',
    label: 'Arc',
    Component: LogoP4Arc,
    direction: 'Réinterprétation',
    style: 'Abstract minimal',
    dots: 'Supprimés',
    desc: '3 arcs propeller 240°, R décroissant, décalés de 120°.',
  },
  {
    id: 'orb',
    label: 'Orb',
    Component: LogoP5Orb,
    direction: 'Réinterprétation',
    style: 'Organique fluide',
    dots: 'Dots gardés',
    desc: 'Grande sphère teal + 2 satellites amber/gold. Profondeur 3D.',
  },
] as const;
