import React, { useId } from 'react';

export interface TlsLogoProps {
  /** Size of the logo bubble (px). Default: 36 */
  size?: number;
  /** Add a light plate + soft shadow around the logo. Default: true */
  withBubble?: boolean;
  /**
   * Color variant — matches the app tone system.
   * - `"color"` (default): branded multicolor (teal / orange / doré) — seul variant intentionnellement multi-couleurs
   * - `"light"`: monochrome blanc — surfaces dark/glass (AuthShell, dark heroes)
   * - `"primary"`: monochrome teal TLS — surfaces primary teintées
   * - `"warm"`: monochrome amber — surfaces warm/secondary
   * - `"sun"`: monochrome gold — surfaces sun/accent
   * - `"ink"`: monochrome dark — impression, haute-contraste
   */
  variant?: 'color' | 'light' | 'primary' | 'warm' | 'sun' | 'ink';
  /**
   * Matière du mark. Voir MATERIAL_THRESHOLD ci-dessous.
   * - `"auto"` (défaut) : aplat sous le seuil, dégradé au-dessus
   * - `"flat"` / `"gradient"` : forcer
   */
  material?: 'auto' | 'flat' | 'gradient';
  /**
   * V0.5 — orbital cascade pulse sur les 4 formes internes.
   * Chaque forme pulse (scale 0.92→1.08 + opacity) avec délais staggered.
   * 1.8s cycle, ease-in-out. Honors prefers-reduced-motion.
   */
  loading?: boolean;
  className?: string;
}

// ── Le traitement du brand kit ───────────────────────────────────────────────
//
// Source de vérité : brand/identity/logos/svg/tls-mark-*-grad.svg et *.svg.
// Toute modification de couleur se fait LÀ-BAS d'abord, puis se recopie ici.
//
// Trois règles, et elles ne sont pas décoratives :
//
//   1. UN SEUL AXE DE LUMIÈRE pour tout le mark — `userSpaceOnUse` sur
//      (46,8) → (398,394), donc chaque forme reçoit la portion de nappe qui lui
//      revient selon sa position. Le mark est découpé dans une seule feuille de
//      matière, il n'a pas quatre sources de lumière.
//   2. LA PASTILLE CENTRALE SUIT LE CORPS — même dégradé, pas une couleur à part.
//   3. AUCUN EFFET AJOUTÉ — pas de sheen, pas de sphère radiale, pas de
//      drop-shadow. Le bombé glassy de l'ancienne version faisait daté et se
//      transformait en bouillie sous 32 px.
//
const LIGHT_AXIS = { x1: 46, y1: 8, x2: 398, y2: 394 } as const;

/** Sous ce seuil (largeur du mark rendu, en px), l'aplat bat le dégradé. */
const MATERIAL_THRESHOLD = 28;

type Stops = readonly [string, string, string];
type P = {
  /** dégradé du corps — porte aussi la pastille centrale */
  body: Stops;
  /** dégradé du nœud haut (orange en `color`) */
  nodeTop: Stops;
  /** dégradé du nœud bas (doré en `color`) */
  nodeBot: Stops;
  /** aplats — corps+centre, nœud haut, nœud bas */
  flat: { body: string; center: string; top: string; bot: string };
};

const PALETTES: Record<NonNullable<TlsLogoProps['variant']>, P> = {
  // Branded multicolor — seul variant intentionnellement multi-couleurs.
  color: {
    body:    ['#5FAABB', '#4A8FA1', '#3D7786'],
    nodeTop: ['#F6A268', '#EB7724', '#C25A10'],
    nodeBot: ['#FDD08A', '#F8B044', '#DE9424'],
    flat: { body: '#55A1B4', center: '#8DBAC6', top: '#EB7724', bot: '#F8B044' },
  },

  // Monochrome blanc — surfaces dark/glass.
  // Amplitude 12 points de L*, pas 20 comme les couleurs : sur fond sombre,
  // griser du blanc ne se lit pas comme de la profondeur, ça se lit comme de la
  // saleté. Mesuré, pas supposé.
  light: {
    body:    ['#FFFFFF', '#F1F4F5', '#E0E2E3'],
    nodeTop: ['#FFFFFF', '#F1F4F5', '#E0E2E3'],
    nodeBot: ['#FFFFFF', '#F1F4F5', '#E0E2E3'],
    flat: { body: '#FFFFFF', center: '#B9D7DF', top: '#FFFFFF', bot: '#FFFFFF' },
  },

  // Monochrome teal TLS.
  primary: {
    body:    ['#5CA9BB', '#4A8FA1', '#3A7484'],
    nodeTop: ['#7FBDCD', '#55A1B4', '#3D7786'],
    nodeBot: ['#7FBDCD', '#55A1B4', '#3D7786'],
    flat: { body: '#4A8FA1', center: '#B9D7DF', top: '#55A1B4', bot: '#55A1B4' },
  },

  // Monochrome amber TLS.
  warm: {
    body:    ['#F5A06A', '#ED843A', '#D06B22'],
    nodeTop: ['#F7AE7E', '#F18A4C', '#D16E2A'],
    nodeBot: ['#F7AE7E', '#F18A4C', '#D16E2A'],
    flat: { body: '#ED843A', center: '#FDDAB5', top: '#F18A4C', bot: '#F18A4C' },
  },

  // Monochrome gold TLS.
  sun: {
    body:    ['#FCC97A', '#F8B044', '#E09A2E'],
    nodeTop: ['#FFD996', '#FFC15A', '#E5A038'],
    nodeBot: ['#FFD996', '#FFC15A', '#E5A038'],
    flat: { body: '#F8B044', center: '#FFECC8', top: '#FFC15A', bot: '#FFC15A' },
  },

  // Monochrome dark — impression, haute-contraste.
  // Le corps est sur ink-900 #252B37, l'ancre de la rampe. L'ancienne version
  // utilisait #1a1a1a, un gris neutre qui n'appartient pas au système.
  ink: {
    body:    ['#3A4356', '#252B37', '#171C25'],
    nodeTop: ['#4E5768', '#374151', '#232A34'],
    nodeBot: ['#4E5768', '#374151', '#232A34'],
    flat: { body: '#252B37', center: '#9CA3AF', top: '#374151', bot: '#374151' },
  },
};

// ── Paths SVG (viewBox 0 0 439 402) ──────────────────────────────────────────
const PM = 'M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z';
const PC = 'M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z';
const PT = 'M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z';
const PB = 'M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z';

/**
 * Part de la plaque occupée par le mark, et rayon de la plaque.
 * 76 % est mesuré, pas repris d'un gabarit système : le mark TLS est ajouré,
 * à surface de boîte égale il pèse moins qu'un glyphe plein. À 62 % il flottait,
 * à 82 % les bras serrent l'arrondi. Aligné sur brand/identity/logos/app-icon/.
 */
const MARK_RATIO = 0.76;
const PLATE_RADIUS_RATIO = 230 / 1024; // le squircle des icônes système

// ─────────────────────────────────────────────────────────────────────────────

export const TlsLogo: React.FC<TlsLogoProps> = ({
  size = 36,
  withBubble = true,
  variant = 'color',
  material = 'auto',
  loading = false,
  className = '',
}) => {
  const uid = 'tl' + useId().replace(/[^a-z0-9]/gi, '');
  const p = PALETTES[variant];

  const shapeClass = (key: 'main' | 'top' | 'center' | 'bot') =>
    loading ? `tls-shape tls-shape--${key}` : '';

  const svgW = withBubble ? size * MARK_RATIO : size;
  const svgH = svgW * (402 / 439);

  const useGradient =
    material === 'gradient' || (material === 'auto' && svgW >= MATERIAL_THRESHOLD);

  const grad = (id: string, stops: Stops) => (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" {...LIGHT_AXIS}>
      <stop offset="0" stopColor={stops[0]} />
      <stop offset="0.52" stopColor={stops[1]} />
      <stop offset="1" stopColor={stops[2]} />
    </linearGradient>
  );

  const fBody = useGradient ? `url(#${uid}b)` : p.flat.body;
  const fCenter = useGradient ? `url(#${uid}b)` : p.flat.center;
  const fTop = useGradient ? `url(#${uid}t)` : p.flat.top;
  const fBot = useGradient ? `url(#${uid}o)` : p.flat.bot;

  const inner = (
    <svg
      viewBox="0 0 439 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={svgW}
      height={svgH}
      aria-label="The Learning Society"
      role="img"
    >
      {useGradient && (
        <defs>
          {grad(`${uid}b`, p.body)}
          {grad(`${uid}t`, p.nodeTop)}
          {grad(`${uid}o`, p.nodeBot)}
        </defs>
      )}

      <path className={shapeClass('main')} d={PM} fill={fBody} />
      {/* La pastille centrale est sur la nappe du corps — même feuille de matière. */}
      <path className={shapeClass('center')} d={PC} fill={fCenter} />
      <path className={shapeClass('top')} d={PT} fill={fTop} />
      <path className={shapeClass('bot')} d={PB} fill={fBot} />

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

  // La plaque reproduit `app-icon-clair-arrondi` : fond blanc franc, coin
  // squircle, ombre neutre. Rien de galbé — Apple pose le verre sur le
  // CONTENEUR, jamais sur le glyphe, et ici même le conteneur reste sobre.
  return (
    <span
      className={[
        'relative inline-flex items-center justify-center shrink-0',
        'bg-white ring-1 ring-primary-100 shadow-card',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: size, height: size, borderRadius: size * PLATE_RADIUS_RATIO }}
      aria-hidden="true"
    >
      {inner}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TlsLogoLockup — icône + wordmark « The Learning Society » (League Spartan)
// Miroir 1-pour-1 du component set Figma `TlsLogoLockup` (property `layout`).
// L'icône est un <TlsLogo> (= instance de l'icône), le wordmark est en
// font-display (League Spartan) ExtraBold, teal par défaut.
// ─────────────────────────────────────────────────────────────────────────────

export type TlsLogoLockupLayout = 'horizontal' | 'vertical' | 'vertical-3' | 'horizontal-3';

export interface TlsLogoLockupProps {
  /** Arrangement du lockup. Default: 'horizontal' */
  layout?: TlsLogoLockupLayout;
  /** Taille de l'icône (px, = largeur du mark). Default: 44 */
  iconSize?: number;
  /** Variant couleur de l'icône (passé à TlsLogo). Default: 'color' */
  variant?: TlsLogoProps['variant'];
  /** Couleur du wordmark. Default: 'primary' (teal) */
  wordmarkTone?: 'primary' | 'ink' | 'white';
  className?: string;
}

const LOCKUP_WORDMARK_TONE: Record<NonNullable<TlsLogoLockupProps['wordmarkTone']>, string> = {
  primary: 'text-primary-500',
  ink:     'text-ink-900',
  white:   'text-white',
};

export const TlsLogoLockup: React.FC<TlsLogoLockupProps> = ({
  layout = 'horizontal',
  iconSize = 44,
  variant = 'color',
  wordmarkTone = 'primary',
  className = '',
}) => {
  const wordBase = `font-display font-extrabold tracking-tight ${LOCKUP_WORDMARK_TONE[wordmarkTone]}`;

  const icon = (
    <span aria-hidden="true" className="inline-flex shrink-0">
      <TlsLogo size={iconSize} withBubble={false} variant={variant} />
    </span>
  );

  const oneLine = (fs: number) => (
    <span className={`${wordBase} leading-none whitespace-nowrap`} style={{ fontSize: fs }}>
      The Learning Society
    </span>
  );

  const threeLine = (fs: number, align: 'left' | 'center') => (
    <span
      className={`${wordBase} leading-[0.92] ${align === 'center' ? 'text-center' : 'text-left'}`}
      style={{ fontSize: fs }}
    >
      The<br />Learning<br />Society
    </span>
  );

  const layoutClass =
    layout === 'horizontal' || layout === 'horizontal-3'
      ? 'flex-row gap-3'
      : layout === 'vertical'
      ? 'flex-col gap-2'
      : 'flex-col gap-3';

  const content =
    layout === 'horizontal'    ? <>{icon}{oneLine(iconSize * 0.86)}</> :
    layout === 'vertical'      ? <>{icon}{oneLine(iconSize * 0.36)}</> :
    layout === 'vertical-3'    ? <>{icon}{threeLine(iconSize * 0.42, 'center')}</> :
    /* horizontal-3 */           <>{icon}{threeLine(iconSize * 0.36, 'left')}</>;

  return (
    <span
      role="img"
      aria-label="The Learning Society"
      className={['inline-flex items-center', layoutClass, className].filter(Boolean).join(' ')}
    >
      {content}
    </span>
  );
};

export default TlsLogo;
