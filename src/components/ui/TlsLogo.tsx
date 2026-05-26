import React from 'react';

export interface TlsLogoProps {
  /** Size of the logo bubble (px). Default: 36 */
  size?: number;
  /** Add a glass background bubble + shadow around the logo. Default: true */
  withBubble?: boolean;
  /**
   * Color variant — matches the app tone system.
   * - `"color"` (default): branded multicolor (primary-500 / secondary-600 / accent-400)
   * - `"light"`: all-white translucent — dark/glass surfaces (AuthShell, dark heroes)
   * - `"primary"`: monochrome teal — tinted primary backgrounds
   * - `"warm"`: warm amber-white — secondary/warm tone surfaces
   * - `"sun"`: golden translucent — sun/accent tone surfaces
   * - `"ink"`: dark ink monochrome — print, invert, high-contrast contexts
   */
  variant?: 'color' | 'light' | 'primary' | 'warm' | 'sun' | 'ink';
  /**
   * V0.5 — orbital cascade pulse on the 4 inner shapes (main + center + dotTop + dotBot).
   * Used as a "waiting" / "thinking" / "computing on your behalf" signal.
   * Each shape pulses (scale 0.92→1.08 + opacity 0.5→1.0) with staggered delays creating
   * a wave that travels through the mark. 1.8s cycle, ease-in-out. Geometry preserved.
   * Honors `prefers-reduced-motion` (drops to gentle opacity breath, no scale).
   * V1 (deferred to brand refresh): shape-morphing between validated silhouettes.
   * Default: false.
   */
  loading?: boolean;
  className?: string;
}

/**
 * TlsLogo — official The Learning Society mark.
 * Original asset: src/assets/tls-logo.svg
 *
 * Renders the multi-color SVG logo, optionally wrapped in a glass bubble
 * (backdrop-blur + soft shadow + subtle ring) for use in headers/sidebars.
 *
 * ── Animation roadmap (DESIGN-IMPECCABLE.md §13 Signature 4) ──
 * V0 (current): pulse loop via consumer CSS (cf. DesignShowcase.tsx animate-tls-pulse).
 * V1 (deferred, brand handoff): shape-morphing logo — path interpolation
 *   between 2–3 brand-validated silhouettes, like Claude's loading mark.
 *   Requires brand team to design and approve the morph shapes (Canva brand
 *   kit + Notion brand guidelines). Implementation: framer-motion `motion.path`
 *   with `d` interpolation (flubber lib) or `<motion.svg>` keyframes.
 *   Until V1 ships, do NOT introduce arbitrary path distortions here — those
 *   would fail brand review.
 */
// ── Fill palettes ────────────────────────────────────────────────────────────

const FILLS = {
  // ── Branded multicolor (default) ──────────────────────────────────────────
  color: {
    main:   'var(--color-primary-500)',
    center: 'var(--color-primary-300)',
    dotTop: 'var(--color-secondary-600)',
    dotBot: 'var(--color-accent-400)',
  },
  // ── All-white glass — dark/teal surfaces (AuthShell, dark heroes) ─────────
  light: {
    main:   'rgba(255,255,255,0.88)',
    center: 'rgba(255,255,255,0.50)',
    dotTop: 'rgba(255,255,255,0.72)',
    dotBot: 'rgba(255,255,255,0.72)',
  },
  // ── Monochrome teal — tinted primary/glass backgrounds ───────────────────
  primary: {
    main:   'rgba(85,161,180,0.90)',   // primary-500
    center: 'rgba(85,161,180,0.45)',
    dotTop: 'rgba(61,119,134,0.85)',   // primary-700
    dotBot: 'rgba(61,119,134,0.75)',
  },
  // ── Warm amber-white — secondary/warm tone surfaces ───────────────────────
  warm: {
    main:   'rgba(237,132,58,0.88)',   // secondary-500
    center: 'rgba(237,132,58,0.45)',
    dotTop: 'rgba(255,255,255,0.80)',
    dotBot: 'rgba(192,105,32,0.80)',   // secondary-600
  },
  // ── Golden translucent — sun/accent tone surfaces ─────────────────────────
  sun: {
    main:   'rgba(248,176,68,0.90)',   // accent-400
    center: 'rgba(248,176,68,0.48)',
    dotTop: 'rgba(255,255,255,0.85)',
    dotBot: 'rgba(223,158,61,0.82)',   // accent-500
  },
  // ── Dark ink monochrome — print, invert, high-contrast ───────────────────
  ink: {
    main:   'rgba(26,26,26,0.88)',     // ink-900
    center: 'rgba(26,26,26,0.38)',
    dotTop: 'rgba(26,26,26,0.72)',
    dotBot: 'rgba(26,26,26,0.60)',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────

export const TlsLogo: React.FC<TlsLogoProps> = ({
  size = 36,
  withBubble = true,
  variant = 'color',
  loading = false,
  className = '',
}) => {
  const f = FILLS[variant];

  // V0.5 — orbital cascade : each of the 4 inner shapes pulses with a staggered
  // delay, creating a wave that travels: main → dotTop → center → dotBot, then
  // loops. 1.8s total cycle. Smaller amplitude on the big halo (main) to avoid
  // wobbling the whole mark; full amplitude on the 3 dots for a clear orbital
  // feel. Reduced-motion fallback: gentle opacity breath, no transforms.
  const shapeClass = (key: 'main' | 'top' | 'center' | 'bot') =>
    loading ? `tls-shape tls-shape--${key}` : '';

  const inner = (
    <svg
      viewBox="0 0 439 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={withBubble ? size * 0.62 : size}
      height={withBubble ? size * 0.62 * (402 / 439) : size * (402 / 439)}
      aria-label="The Learning Society"
      role="img"
    >
      <path
        className={shapeClass('main')}
        d="M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z"
        fill={f.main}
      />
      <path
        className={shapeClass('center')}
        d="M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z"
        fill={f.center}
      />
      <path
        className={shapeClass('top')}
        d="M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z"
        fill={f.dotTop}
      />
      <path
        className={shapeClass('bot')}
        d="M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z"
        fill={f.dotBot}
      />

      {/* Loading animation keyframes — scoped to .tls-shape inside this SVG */}
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
          /* Halo gets a softer amplitude — keeps the mark from wobbling */
          .tls-shape--main {
            animation-duration: 2.2s;
            animation-name: tls-orbital-soft;
            animation-delay: 0s;
          }
          @keyframes tls-orbital-soft {
            0%, 100% { opacity: 0.72; transform: scale(0.98); }
            50%      { opacity: 1;    transform: scale(1.02); }
          }
          /* Three dots — staggered cascade clockwise: top → center → bot */
          .tls-shape--top    { animation-delay: 0.20s; }
          .tls-shape--center { animation-delay: 0.42s; }
          .tls-shape--bot    { animation-delay: 0.64s; }

          @media (prefers-reduced-motion: reduce) {
            .tls-shape,
            .tls-shape--main,
            .tls-shape--top,
            .tls-shape--center,
            .tls-shape--bot {
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
    return <span className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}>{inner}</span>;
  }

  return (
    <span
      className={[
        'relative inline-flex items-center justify-center shrink-0',
        // Rounded square (smaller radius than rounded-2xl so corners read clearly,
        // not circle-like on small bubbles)
        'rounded-xl',
        'bg-gradient-to-br from-white via-primary-50/90 to-primary-100',
        'ring-1 ring-primary-200/60',
        'shadow-[0_8px_20px_-6px_rgba(85,161,180,0.45),0_3px_8px_-2px_rgba(85,161,180,0.25),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_2px_rgba(85,161,180,0.08)]',
        'backdrop-blur-glass-light',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Top highlight gloss */}
      <span
        className="absolute inset-x-1 top-1 h-1/2 rounded-lg bg-gradient-to-b from-white/80 via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative inline-flex">{inner}</span>
    </span>
  );
};

export default TlsLogo;
