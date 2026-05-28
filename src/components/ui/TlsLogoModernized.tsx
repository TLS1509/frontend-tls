import { useId } from 'react';

export type MarkStyle = 'glass' | 'mono' | 'classic' | 'shadow';
export type LogoLayout = 'mark' | 'stacked' | 'h1' | 'h2' | 'h3';

interface TlsLogoModernizedProps {
  layout?: LogoLayout;
  markStyle?: MarkStyle;
  /** Height in pixels; width derived from aspect ratio */
  size?: number;
  className?: string;
}

// ── TLS mark paths (viewBox 0 0 439 402) ─────────────────────────────────────

const P_MAIN = "M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z";
const P_CENTER = "M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z";
const P_TOP    = "M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z";
const P_BOTTOM = "M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z";

// ── Layout tables ─────────────────────────────────────────────────────────────

const VB: Record<LogoLayout, [number, number]> = {
  mark:    [256, 256],
  stacked: [512, 460],
  h1:      [620, 152],
  h2:      [520, 192],
  h3:      [520, 242],
};

const DEFAULT_H: Record<LogoLayout, number> = {
  mark: 80, stacked: 160, h1: 64, h2: 80, h3: 96,
};

// [x, y, w, h] of mark nested-svg in parent viewBox coords
const MARK_POS: Record<LogoLayout, [number, number, number, number]> = {
  mark:    [19,  28,  218, 200],
  stacked: [136, 18,  240, 220],
  h1:      [10,  22,  108,  99],
  h2:      [20,  40,  112, 103],
  h3:      [20,  62,  110, 101],
};

// ── Design tokens ─────────────────────────────────────────────────────────────

const FF = "'League Spartan', 'Helvetica Neue', 'Arial Narrow', Arial, sans-serif";
const C = {
  the:   '#73AFBF', // primary-400 — light label
  learn: '#2F5F6A', // primary-800 — hero word
  soc:   '#4A8FA1', // primary-600 — sub-word
  bar:   '#EB7724', // amber accent separator
};

// ── SVG defs per mark style ───────────────────────────────────────────────────

function MarkDefs({ u, ms }: { u: string; ms: MarkStyle }) {
  if (ms === 'glass') return (
    <defs>
      <linearGradient id={`${u}a`} x1="0" y1="0" x2="439" y2="402" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#96C3CF" />
        <stop offset="45%"  stopColor="#4A8FA1" />
        <stop offset="100%" stopColor="#1F3E45" />
      </linearGradient>
      <linearGradient id={`${u}b`} x1="0" y1="0" x2="280" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="white" stopOpacity="0.38" />
        <stop offset="55%"  stopColor="white" stopOpacity="0.05" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${u}c`} cx="32%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="white" />
        <stop offset="28%"  stopColor="#B9D7DF" />
        <stop offset="100%" stopColor="#3D7786" />
      </radialGradient>
      <radialGradient id={`${u}d`} cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="white" stopOpacity="0.85" />
        <stop offset="32%"  stopColor="#F8B044" />
        <stop offset="100%" stopColor="#C06920" />
      </radialGradient>
      <radialGradient id={`${u}e`} cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="white" stopOpacity="0.85" />
        <stop offset="35%"  stopColor="#FBCF6F" />
        <stop offset="100%" stopColor="#C88020" />
      </radialGradient>
      <filter id={`${u}f`} x="-18%" y="-15%" width="138%" height="142%">
        <feDropShadow dx="2" dy="7" stdDeviation="12" floodColor="#1F3E45" floodOpacity="0.32" />
      </filter>
    </defs>
  );

  if (ms === 'mono') return (
    <defs>
      <linearGradient id={`${u}a`} x1="0" y1="0" x2="439" y2="402" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#8DBAC6" />
        <stop offset="50%"  stopColor="#4A8FA1" />
        <stop offset="100%" stopColor="#2F5F6A" />
      </linearGradient>
      <radialGradient id={`${u}c`} cx="35%" cy="30%" r="65%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="#DCEBEF" />
        <stop offset="100%" stopColor="#55A1B4" />
      </radialGradient>
      <filter id={`${u}f`} x="-18%" y="-15%" width="138%" height="148%">
        <feDropShadow dx="2" dy="8" stdDeviation="14" floodColor="#1F3E45" floodOpacity="0.45" />
      </filter>
    </defs>
  );

  if (ms === 'classic') return (
    <defs>
      <linearGradient id={`${u}a`} x1="0" y1="0" x2="439" y2="402" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#73AFBF" />
        <stop offset="100%" stopColor="#3D7786" />
      </linearGradient>
      <radialGradient id={`${u}c`} cx="35%" cy="30%" r="65%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#8DBAC6" />
      </radialGradient>
      <filter id={`${u}f`} x="-12%" y="-10%" width="126%" height="128%">
        <feDropShadow dx="1" dy="4" stdDeviation="7" floodColor="#1F3E45" floodOpacity="0.2" />
      </filter>
    </defs>
  );

  // shadow: original flat colors + dramatic drop shadow
  return (
    <defs>
      <filter id={`${u}f`} x="-22%" y="-18%" width="148%" height="150%">
        <feDropShadow dx="4" dy="10" stdDeviation="16" floodColor="#1F3E45" floodOpacity="0.5" />
      </filter>
    </defs>
  );
}

function MarkBody({ u, ms }: { u: string; ms: MarkStyle }) {
  const flt = `url(#${u}f)`;
  switch (ms) {
    case 'glass':
      return (
        <g filter={flt}>
          <path d={P_MAIN}   fill={`url(#${u}a)`} />
          <path d={P_MAIN}   fill={`url(#${u}b)`} />
          <path d={P_CENTER} fill={`url(#${u}c)`} />
          <path d={P_TOP}    fill={`url(#${u}d)`} />
          <path d={P_BOTTOM} fill={`url(#${u}e)`} />
        </g>
      );
    case 'mono':
      return (
        <g filter={flt}>
          <path d={P_MAIN}   fill={`url(#${u}a)`} />
          <path d={P_CENTER} fill={`url(#${u}c)`} />
          <path d={P_TOP}    fill="#3D7786" />
          <path d={P_BOTTOM} fill="#55A1B4" />
        </g>
      );
    case 'classic':
      return (
        <g filter={flt}>
          <path d={P_MAIN}   fill={`url(#${u}a)`} />
          <path d={P_CENTER} fill={`url(#${u}c)`} />
          <path d={P_TOP}    fill="#EB7724" />
          <path d={P_BOTTOM} fill="#F8B044" />
        </g>
      );
    default: // shadow
      return (
        <g filter={flt}>
          <path d={P_MAIN}   fill="#55A1B4" />
          <path d={P_CENTER} fill="#8DBAC6" />
          <path d={P_TOP}    fill="#EB7724" />
          <path d={P_BOTTOM} fill="#F8B044" />
        </g>
      );
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export function TlsLogoModernized({
  layout = 'stacked',
  markStyle = 'glass',
  size,
  className,
}: TlsLogoModernizedProps) {
  const rawId = useId();
  const u = 'tls' + rawId.replace(/[^a-zA-Z0-9]/g, '');

  const [vbW, vbH] = VB[layout];
  const h = size ?? DEFAULT_H[layout];
  const w = Math.round(h * (vbW / vbH));
  const [mx, my, mw, mh] = MARK_POS[layout];

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${vbW} ${vbH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="The Learning Society"
      role="img"
    >
      <MarkDefs u={u} ms={markStyle} />

      <svg x={mx} y={my} width={mw} height={mh} viewBox="0 0 439 402" fill="none" overflow="visible">
        <MarkBody u={u} ms={markStyle} />
      </svg>

      {/* stacked: mark top, 3 lines centered below */}
      {layout === 'stacked' && <>
        <text x="256" y="272" textAnchor="middle"
          fontFamily={FF} fontSize="20" fontWeight="400" fill={C.the} letterSpacing="2.5">
          THE
        </text>
        <rect x="198" y="282" width="116" height="2.5" rx="1.25" fill={C.bar} opacity="0.7" />
        <text x="256" y="372" textAnchor="middle"
          fontFamily={FF} fontSize="78" fontWeight="800" fill={C.learn} letterSpacing="-1">
          LEARNING
        </text>
        <text x="256" y="432" textAnchor="middle"
          fontFamily={FF} fontSize="34" fontWeight="600" fill={C.soc}>
          Society
        </text>
      </>}

      {/* h1: mark left, 3 words stacked right (single column) */}
      {layout === 'h1' && <>
        <text x="134" y="54"
          fontFamily={FF} fontSize="19" fontWeight="400" fill={C.the} letterSpacing="2.8">
          THE
        </text>
        <text x="134" y="111"
          fontFamily={FF} fontSize="56" fontWeight="800" fill={C.learn} letterSpacing="-0.5">
          LEARNING
        </text>
        <text x="134" y="141"
          fontFamily={FF} fontSize="27" fontWeight="600" fill={C.soc}>
          Society
        </text>
      </>}

      {/* h2: mark left, 2 lines right */}
      {layout === 'h2' && <>
        <text y="96" fontFamily={FF} fontSize="44" letterSpacing="-0.5">
          <tspan x="148" fill={C.the} fontWeight="400">THE </tspan>
          <tspan fill={C.learn} fontWeight="800">LEARNING</tspan>
        </text>
        <text x="148" y="154"
          fontFamily={FF} fontSize="30" fontWeight="600" fill={C.soc}>
          Society
        </text>
      </>}

      {/* h3: mark left, 3 distinct lines right */}
      {layout === 'h3' && <>
        <text x="150" y="88"
          fontFamily={FF} fontSize="19" fontWeight="400" fill={C.the} letterSpacing="2.8">
          THE
        </text>
        <rect x="150" y="98" width="90" height="2" rx="1" fill={C.bar} opacity="0.65" />
        <text x="150" y="170"
          fontFamily={FF} fontSize="64" fontWeight="800" fill={C.learn} letterSpacing="-0.5">
          LEARNING
        </text>
        <text x="150" y="214"
          fontFamily={FF} fontSize="30" fontWeight="600" fill={C.soc}>
          Society
        </text>
      </>}
    </svg>
  );
}
