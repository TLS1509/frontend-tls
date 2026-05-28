import React, { useId } from 'react';

export interface TlsLogoProps {
  /** Size of the logo bubble (px). Default: 36 */
  size?: number;
  /** Add a glass background bubble + shadow around the logo. Default: true */
  withBubble?: boolean;
  /**
   * Color variant — matches the app tone system.
   * - `"color"` (default): branded multicolor (primary-500 / secondary / accent) — seul variant intentionnellement multi-couleurs
   * - `"light"`: monochrome blanc — surfaces dark/glass (AuthShell, dark heroes)
   * - `"primary"`: monochrome teal TLS — surfaces primary teintées
   * - `"warm"`: monochrome amber — surfaces warm/secondary
   * - `"sun"`: monochrome gold — surfaces sun/accent
   * - `"ink"`: monochrome dark — impression, haute-contraste
   *
   * Tous les variants (sauf "color") utilisent UNE seule famille de couleur.
   * La profondeur est rendue via glassmorphism SVG : gradient NW speculaire
   * + gradient sphérique 3D sur les dots + feDropShadow sur le corps.
   */
  variant?: 'color' | 'light' | 'primary' | 'warm' | 'sun' | 'ink';
  /**
   * V0.5 — orbital cascade pulse sur les 4 formes internes.
   * Chaque forme pulse (scale 0.92→1.08 + opacity) avec délais staggered.
   * 1.8s cycle, ease-in-out. Honors prefers-reduced-motion.
   */
  loading?: boolean;
  className?: string;
}

// ── Palettes monochromes TLS + glassmorphism ──────────────────────────────────
// Chaque variant = une famille de couleur unique.
// Les dots reçoivent un gradient sphérique (highlight NW → base → shadow).
// Le corps reçoit un sheen glass linéaire NW + feDropShadow.

type P = {
  body:    string;  // couleur de base du corps
  center:  string;  // cercle central (teinte plus claire)
  // dot top (amber pour "color", même teinte que corps pour autres)
  topHi:   string; topMid: string; topDark: string;
  // dot bot (gold pour "color", même teinte que corps pour autres)
  botHi:   string; botMid: string; botDark: string;
  shadow:  string;  // couleur du drop shadow
};

const PALETTES: Record<NonNullable<TlsLogoProps['variant']>, P> = {

  // ── Branded multicolor (seul variant intentionnellement multi-couleurs) ──────
  // Corps teal, centre teal clair, dot haut amber, dot bas gold — tous TLS.
  color: {
    body:    '#55A1B4',          // primary-500
    center:  '#96C3CF',          // primary-300
    topHi:   '#FEF0DE', topMid:  '#EB7724', topDark: '#9B4A0A',  // amber
    botHi:   '#FFF4D0', botMid:  '#F8B044', botDark: '#9B6808',  // gold
    shadow:  '#1F3E45',
  },

  // ── Monochrome blanc — surfaces dark/glass ──────────────────────────────────
  light: {
    body:    'rgba(255,255,255,0.88)',
    center:  'rgba(255,255,255,0.38)',
    topHi:  'rgba(255,255,255,1)',   topMid:  'rgba(255,255,255,0.75)', topDark:  'rgba(200,220,228,0.50)',
    botHi:  'rgba(255,255,255,1)',   botMid:  'rgba(255,255,255,0.75)', botDark:  'rgba(200,220,228,0.50)',
    shadow:  'rgba(0,0,0,0.08)',
  },

  // ── Monochrome teal TLS ─────────────────────────────────────────────────────
  // primary-50 (highlight) → primary-500 (base) → primary-900 (shadow)
  primary: {
    body:    '#4A8FA1',          // primary-600
    center:  '#B9D7DF',          // primary-200
    topHi:   '#E8F4F7', topMid:  '#55A1B4', topDark: '#1F3E45',
    botHi:   '#E8F4F7', botMid:  '#55A1B4', botDark: '#1F3E45',
    shadow:  '#1F3E45',
  },

  // ── Monochrome amber TLS ────────────────────────────────────────────────────
  // secondary-50 (highlight) → secondary-500 (base) → secondary-800 (shadow)
  warm: {
    body:    '#ED843A',          // secondary-500
    center:  '#FDDAB5',          // amber très clair
    topHi:   '#FFF3EB', topMid:  '#ED843A', topDark: '#A34A10',
    botHi:   '#FFF3EB', botMid:  '#ED843A', botDark: '#A34A10',
    shadow:  '#5C240A',
  },

  // ── Monochrome gold TLS ─────────────────────────────────────────────────────
  // accent-50 (highlight) → accent-400 (base) → accent-dark (shadow)
  sun: {
    body:    '#F8B044',          // accent-400
    center:  '#FCE8A0',          // gold très clair
    topHi:   '#FFF9EE', topMid:  '#F8B044', topDark: '#B07010',
    botHi:   '#FFF9EE', botMid:  '#F8B044', botDark: '#B07010',
    shadow:  '#7A5010',
  },

  // ── Monochrome dark/ink ─────────────────────────────────────────────────────
  ink: {
    body:    'rgba(26,26,26,0.90)',
    center:  'rgba(26,26,26,0.26)',
    topHi:  'rgba(100,100,100,0.55)', topMid:  'rgba(26,26,26,0.82)', topDark:  'rgba(8,8,8,0.97)',
    botHi:  'rgba(100,100,100,0.55)', botMid:  'rgba(26,26,26,0.82)', botDark:  'rgba(8,8,8,0.97)',
    shadow:  'rgba(0,0,0,0.18)',
  },
};

// ── Paths SVG (viewBox 0 0 439 402) ──────────────────────────────────────────
const PM = 'M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z';
const PC = 'M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z';
const PT = 'M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z';
const PB = 'M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z';

// ─────────────────────────────────────────────────────────────────────────────

export const TlsLogo: React.FC<TlsLogoProps> = ({
  size = 36,
  withBubble = true,
  variant = 'color',
  loading = false,
  className = '',
}) => {
  const uid = 'tl' + useId().replace(/[^a-z0-9]/gi, '');
  const p = PALETTES[variant];

  const shapeClass = (key: 'main' | 'top' | 'center' | 'bot') =>
    loading ? `tls-shape tls-shape--${key}` : '';

  const svgW = withBubble ? size * 0.62 : size;
  const svgH = svgW * (402 / 439);

  const inner = (
    <svg
      viewBox="0 0 439 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={svgW}
      height={svgH}
      aria-label="The Learning Society"
      role="img"
      overflow="visible"
    >
      <defs>
        {/* Drop shadow corps */}
        <filter id={`${uid}sf`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="5"
            floodColor={p.shadow} floodOpacity="0.28" />
        </filter>

        {/* Glass sheen NW — couche specular sur le corps */}
        <linearGradient id={`${uid}sh`} x1="0" y1="0" x2="0.65" y2="0.85">
          <stop offset="0%"   stopColor="white" stopOpacity="0.52" />
          <stop offset="32%"  stopColor="white" stopOpacity="0.16" />
          <stop offset="65%"  stopColor="white" stopOpacity="0.03" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Gradient sphérique — dot haut */}
        <radialGradient id={`${uid}gt`} cx="30%" cy="26%" r="72%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white"    stopOpacity="0.88" />
          <stop offset="20%"  stopColor={p.topHi} />
          <stop offset="55%"  stopColor={p.topMid} />
          <stop offset="100%" stopColor={p.topDark} />
        </radialGradient>

        {/* Gradient sphérique — dot bas */}
        <radialGradient id={`${uid}gb`} cx="30%" cy="26%" r="72%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white"    stopOpacity="0.88" />
          <stop offset="20%"  stopColor={p.botHi} />
          <stop offset="55%"  stopColor={p.botMid} />
          <stop offset="100%" stopColor={p.botDark} />
        </radialGradient>

        {/* Centre — léger glass fill */}
        <radialGradient id={`${uid}gc`} cx="35%" cy="30%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white"   stopOpacity="0.60" />
          <stop offset="40%"  stopColor={p.center} stopOpacity="0.90" />
          <stop offset="100%" stopColor={p.center} />
        </radialGradient>
      </defs>

      {/* Corps — couche 1 : fill base + shadow */}
      <g className={shapeClass('main')}>
        <path d={PM} fill={p.body} filter={`url(#${uid}sf)`} />
        {/* Corps — couche 2 : sheen glass NW */}
        <path d={PM} fill={`url(#${uid}sh)`} />
      </g>

      {/* Cercle central glass */}
      <path className={shapeClass('center')} d={PC} fill={`url(#${uid}gc)`} />

      {/* Dot haut — sphère 3D */}
      <path className={shapeClass('top')} d={PT} fill={`url(#${uid}gt)`} />

      {/* Dot bas — sphère 3D */}
      <path className={shapeClass('bot')} d={PB} fill={`url(#${uid}gb)`} />

      {loading && (
        <style>{`
          .tls-shape {
            transform-box: fill-box;
            transform-origin: center;
            animation: tls-orbital 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
            will-change: transform, opacity;
          }
          @keyframes tls-orbital {
            0%, 100% { opacity: 0.55; transform: scale(0.92); }
            50%      { opacity: 1;    transform: scale(1.08); }
          }
          .tls-shape--main {
            animation-duration: 2.2s;
            animation-name: tls-orbital-soft;
            animation-delay: 0s;
          }
          @keyframes tls-orbital-soft {
            0%, 100% { opacity: 0.72; transform: scale(0.98); }
            50%      { opacity: 1;    transform: scale(1.02); }
          }
          .tls-shape--top    { animation-delay: 0.20s; }
          .tls-shape--center { animation-delay: 0.42s; }
          .tls-shape--bot    { animation-delay: 0.64s; }
          @media (prefers-reduced-motion: reduce) {
            .tls-shape, .tls-shape--main,
            .tls-shape--top, .tls-shape--center, .tls-shape--bot {
              animation: tls-shape-breath 1.6s ease-in-out infinite !important;
              animation-delay: 0s !important;
            }
            @keyframes tls-shape-breath {
              0%, 100% { opacity: 1; transform: none; }
              50%      { opacity: 0.7; transform: none; }
            }
          }
        `}</style>
      )}
    </svg>
  );

  if (!withBubble) {
    return (
      <span className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}>
        {inner}
      </span>
    );
  }

  return (
    <span
      className={[
        'relative inline-flex items-center justify-center shrink-0',
        'rounded-xl',
        'bg-gradient-to-br from-white via-primary-50/90 to-primary-100',
        'ring-1 ring-primary-200/60',
        'shadow-[0_8px_20px_-6px_rgba(85,161,180,0.45),0_3px_8px_-2px_rgba(85,161,180,0.25),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(85,161,180,0.08)]',
        'backdrop-blur-glass-light',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-x-1 top-1 h-1/2 rounded-lg bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative inline-flex">{inner}</span>
    </span>
  );
};

export default TlsLogo;
