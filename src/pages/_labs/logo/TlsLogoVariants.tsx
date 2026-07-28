/**
 * TlsLogoVariants — 6 traitements alternatifs du mark Heritage+
 *
 * Même silhouette (PM / PC / PT / PB), traitements radicalement différents :
 *   V1 Liquide   — océan profond, lumière caustique
 *   V2 Fusion    — palette ambrée inversée (warm dominant)
 *   V3 Aurora    — dégradé multi-couleurs teal→indigo→rose→gold
 *   V4 Obsidian  — dark glass premium, speculaire maximal
 *   V5 Chrome    — metallic / titanium, bandes lumineuses
 *   V6 Électrique— neon glow, corps semi-transparent
 */

import { useId } from 'react';

// ── Paths Heritage+ (silhouette identique) ────────────────────────────────────
const PM = 'M435.056 194.472C434.145 186.524 431.061 178.982 426.141 172.671C421.22 166.361 414.654 161.527 407.165 158.7C399.673 155.873 391.548 155.163 383.679 156.647C375.813 158.132 368.504 161.753 362.562 167.114C354.997 173.879 345.19 177.604 335.037 177.569H329.455C322.163 177.569 315.003 175.632 308.708 171.958C302.412 168.284 297.207 163.004 293.626 156.659C286.029 143.2 274.984 132.001 261.626 124.212C248.268 116.422 233.076 112.321 217.609 112.329H217.155C209.782 112.453 202.507 110.618 196.077 107.011C189.647 103.405 184.291 98.1557 180.559 91.8023L177.768 86.9582C172.687 78.1719 171.057 67.812 173.198 57.8929C175.526 47.0199 173.591 35.6688 167.791 26.1789C161.788 16.4561 152.203 9.47737 141.1 6.74587C129.997 4.01436 118.265 5.74868 108.429 11.5753C98.5939 17.4019 91.443 26.8544 88.5167 37.8971C85.5904 48.9396 87.1228 60.6886 92.7845 70.6132C98.2716 80.152 107.192 87.2429 117.728 90.4432C127.206 93.5298 135.167 100.077 140.021 108.774L142.777 113.584C146.422 120.038 148.284 127.344 148.173 134.753C148.063 142.163 145.984 149.41 142.149 155.753L141.765 156.45C138.177 162.85 132.954 168.186 126.63 171.914C120.306 175.643 113.105 177.63 105.762 177.674H100.181C90.1062 177.73 80.3798 173.997 72.934 167.219C66.6863 161.548 58.9255 157.81 50.5933 156.46C42.2611 155.109 33.7155 156.203 25.9935 159.609C18.2715 163.016 11.7051 168.587 7.09106 175.649C2.47703 182.71 0.0137235 190.957 5.71757e-05 199.39C-0.0136092 207.822 2.42295 216.078 7.01409 223.154C11.6052 230.23 18.1535 235.823 25.8644 239.254C33.5753 242.685 42.1173 243.807 50.4539 242.483C58.7905 241.16 66.5634 237.447 72.8294 231.797C80.3842 225.037 90.1776 221.312 100.32 221.341H105.902C113.248 221.392 120.449 223.386 126.773 227.121C133.097 230.855 138.318 236.196 141.905 242.6L142.288 243.297C146.129 249.637 148.214 256.883 148.331 264.292C148.447 271.702 146.591 279.009 142.951 285.466L140.16 290.276C135.074 299.085 126.893 305.692 117.205 308.816C109.141 311.402 102.005 316.278 96.6685 322.848C91.3325 329.418 88.0272 337.399 87.1561 345.814C86.2851 354.23 87.886 362.717 91.7638 370.239C95.6413 377.76 101.628 383.991 108.992 388.171C116.356 392.352 124.779 394.296 133.232 393.774C141.685 393.251 149.803 390.28 156.594 385.222C163.384 380.168 168.554 373.246 171.472 365.302C174.389 357.359 174.929 348.739 173.023 340.495C170.985 330.757 172.678 320.609 177.768 312.057L180.559 307.213C184.297 300.857 189.651 295.601 196.078 291.978C202.505 288.355 209.776 286.493 217.155 286.582H217.609C233.08 286.587 248.274 282.48 261.632 274.684C274.991 266.888 286.033 255.682 293.626 242.217C297.21 235.874 302.415 230.596 308.71 226.922C315.006 223.248 322.164 221.31 329.455 221.307H335.665C345.748 221.463 355.422 225.321 362.841 232.145C369.451 237.984 377.675 241.684 386.433 242.755C395.191 243.826 404.067 242.219 411.892 238.145C419.713 234.071 426.115 227.723 430.253 219.938C434.391 212.153 436.062 203.297 435.056 194.541V194.472ZM243.773 244.726C234.81 249.896 224.514 252.295 214.186 251.619C203.858 250.943 193.963 247.223 185.751 240.929C177.54 234.635 171.382 226.05 168.055 216.259C164.727 206.469 164.381 195.913 167.06 185.925C169.739 175.939 175.322 166.969 183.103 160.152C190.885 153.335 200.515 148.976 210.776 147.627C221.038 146.277 231.469 147.998 240.752 152.57C250.035 157.143 257.751 164.363 262.926 173.318C269.865 185.324 271.746 199.593 268.154 212.984C264.562 226.376 255.792 237.794 243.773 244.726Z';
const PC = 'M216.398 225.867C230.849 225.867 242.563 214.164 242.563 199.729C242.563 185.293 230.849 173.591 216.398 173.591C201.948 173.591 190.233 185.293 190.233 199.729C190.233 214.164 201.948 225.867 216.398 225.867Z';
const PT = 'M307.193 92.9776C331.38 92.9776 350.986 73.3911 350.986 49.2298C350.986 25.0685 331.38 5.48193 307.193 5.48193C283.007 5.48193 263.4 25.0685 263.4 49.2298C263.4 73.3911 283.007 92.9776 307.193 92.9776Z';
const PB = 'M307.008 395.935C331.092 395.935 350.617 376.431 350.617 352.372C350.617 328.313 331.092 308.809 307.008 308.809C282.924 308.809 263.4 328.313 263.4 352.372C263.4 376.431 282.924 395.935 307.008 395.935Z';

type VP = { size?: number; className?: string };

// ── V1 — Liquide ─────────────────────────────────────────────────────────────
// Océan profond : gradient lit par le haut comme le soleil à travers l'eau.
// Lumière caustique : 3 ellipses spectrales semi-transparentes.
export function V1LogoLiquide({ size = 200, className }: VP) {
  const u = 'v1lq' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id={`${u}bg`} cx="50%" cy="8%" r="90%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#B9D7DF" />
          <stop offset="22%"  stopColor="#3D7786" />
          <stop offset="58%"  stopColor="#1F3E45" />
          <stop offset="100%" stopColor="#071214" />
        </radialGradient>
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0.3" y2="0.4">
          <stop offset="0%"   stopColor="white" stopOpacity="0.50" />
          <stop offset="30%"  stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${u}ci`} cx="32%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="25%"  stopColor="#DCEBEF" />
          <stop offset="60%"  stopColor="#55A1B4" />
          <stop offset="100%" stopColor="#1F3E45" />
        </radialGradient>
        <radialGradient id={`${u}am`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FDDAB5" />
          <stop offset="46%"  stopColor="#EB7724" />
          <stop offset="100%" stopColor="#B85C14" />
        </radialGradient>
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FCDB9C" />
          <stop offset="46%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#C07A10" />
        </radialGradient>
        <filter id={`${u}gw`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id={`${u}sh`} x="-30%" y="-24%" width="162%" height="168%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="b1"/>
          <feOffset in="b1" dy="22" result="o1"/>
          <feFlood floodColor="#071214" floodOpacity="0.55" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2"/>
          <feOffset in="b2" dy="5" result="o2"/>
          <feFlood floodColor="#1F3E45" floodOpacity="0.35" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b"/>
          <feOffset in="b" dy="8" result="o"/>
          <feFlood floodColor="#071214" floodOpacity="0.40" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        {/* Halo profond */}
        <path d={PM} fill="#0A2028" opacity="0.60" filter={`url(#${u}gw)`} />
        {/* Corps */}
        <g filter={`url(#${u}sh)`}>
          <path d={PM} fill={`url(#${u}bg)`} />
        </g>
        {/* Specular top */}
        <path d={PM} fill={`url(#${u}sp)`} />
        {/* Lumière caustique — 3 taches */}
        <ellipse cx="130" cy="90"  rx="55" ry="22" fill="white" fillOpacity="0.055" transform="rotate(-18 130 90)" />
        <ellipse cx="250" cy="180" rx="38" ry="14" fill="white" fillOpacity="0.040" transform="rotate(8 250 180)" />
        <ellipse cx="80"  cy="290" rx="42" ry="16" fill="white" fillOpacity="0.045" transform="rotate(-12 80 290)" />
        {/* Centre */}
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.72" />
        {/* Dots */}
        <g filter={`url(#${u}ds)`}><path d={PT} fill={`url(#${u}am)`} /></g>
        <ellipse cx="287" cy="28" rx="12" ry="8" fill="white" fillOpacity="0.78" transform="rotate(-22 287 28)" />
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.55" />
        <g filter={`url(#${u}ds)`}><path d={PB} fill={`url(#${u}gl)`} /></g>
        <ellipse cx="287" cy="331" rx="12" ry="8" fill="white" fillOpacity="0.78" transform="rotate(-22 287 331)" />
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.55" />
      </svg>
    </svg>
  );
}

// ── V2 — Fusion ───────────────────────────────────────────────────────────────
// Palette ambrée inversée : le corps est chaud (amber/orange), les dots sont teal.
export function V2LogoFusion({ size = 200, className }: VP) {
  const u = 'v2fs' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Corps amber warm */}
        <radialGradient id={`${u}bg`} cx="27%" cy="23%" r="80%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="14%"  stopColor="#FDDAB5" />
          <stop offset="44%"  stopColor="#EB7724" />
          <stop offset="78%"  stopColor="#A34A10" />
          <stop offset="100%" stopColor="#5C240A" />
        </radialGradient>
        {/* Speculaire */}
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0.58" y2="0.82">
          <stop offset="0%"   stopColor="white" stopOpacity="0.60" />
          <stop offset="26%"  stopColor="white" stopOpacity="0.18" />
          <stop offset="60%"  stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Frost chaud SE */}
        <radialGradient id={`${u}rm`} cx="76%" cy="80%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#F8B044" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#F8B044" stopOpacity="0" />
        </radialGradient>
        {/* Centre teal (inversé) */}
        <radialGradient id={`${u}ci`} cx="32%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="22%"  stopColor="#B9D7DF" />
          <stop offset="58%"  stopColor="#55A1B4" />
          <stop offset="100%" stopColor="#1F3E45" />
        </radialGradient>
        {/* Dot teal (top) */}
        <radialGradient id={`${u}t1`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#B9D7DF" />
          <stop offset="46%"  stopColor="#4A8FA1" />
          <stop offset="100%" stopColor="#1F3E45" />
        </radialGradient>
        {/* Dot gold (bottom — garde la dorure) */}
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FCDB9C" />
          <stop offset="46%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#C07A10" />
        </radialGradient>
        <filter id={`${u}gw`} x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        <filter id={`${u}sh`} x="-30%" y="-24%" width="162%" height="168%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="b1"/>
          <feOffset in="b1" dy="20" result="o1"/>
          <feFlood floodColor="#5C240A" floodOpacity="0.30" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2"/>
          <feOffset in="b2" dy="5" result="o2"/>
          <feFlood floodColor="#A34A10" floodOpacity="0.22" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b"/>
          <feOffset in="b" dy="8" result="o"/>
          <feFlood floodColor="#5C240A" floodOpacity="0.30" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        <path d={PM} fill="#EB7724" opacity="0.28" filter={`url(#${u}gw)`} />
        <g filter={`url(#${u}sh)`}><path d={PM} fill={`url(#${u}bg)`} /></g>
        <path d={PM} fill={`url(#${u}sp)`} />
        <path d={PM} fill={`url(#${u}rm)`} />
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.68" />
        <g filter={`url(#${u}ds)`}><path d={PT} fill={`url(#${u}t1)`} /></g>
        <ellipse cx="287" cy="28" rx="12" ry="8" fill="white" fillOpacity="0.76" transform="rotate(-22 287 28)" />
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.52" />
        <g filter={`url(#${u}ds)`}><path d={PB} fill={`url(#${u}gl)`} /></g>
        <ellipse cx="287" cy="331" rx="12" ry="8" fill="white" fillOpacity="0.76" transform="rotate(-22 287 331)" />
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.52" />
      </svg>
    </svg>
  );
}

// ── V3 — Aurora ───────────────────────────────────────────────────────────────
// Gradient multi-couleurs diagonal : teal → indigo → rose → gold.
// Atmosphérique, éditorial, premium.
export function V3LogoAurora({ size = 200, className }: VP) {
  const u = 'v3au' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Gradient diagonal bottom-left → top-right */}
        <linearGradient id={`${u}bg`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1F3E45" />
          <stop offset="24%"  stopColor="#3D7786" />
          <stop offset="48%"  stopColor="#7B4DB0" />
          <stop offset="72%"  stopColor="#C4518A" />
          <stop offset="100%" stopColor="#EB7724" />
        </linearGradient>
        {/* Speculaire blanc préservé */}
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0.58" y2="0.82">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="28%"  stopColor="white" stopOpacity="0.18" />
          <stop offset="62%"  stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Frost SE teinté violet-rose */}
        <radialGradient id={`${u}rm`} cx="76%" cy="80%" r="38%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#C4518A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#C4518A" stopOpacity="0" />
        </radialGradient>
        {/* Centre perle irisée */}
        <radialGradient id={`${u}ci`} cx="32%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="22%"  stopColor="#E8D4F0" />
          <stop offset="55%"  stopColor="#B07AE0" />
          <stop offset="100%" stopColor="#6B3498" />
        </radialGradient>
        {/* Dot amber */}
        <radialGradient id={`${u}am`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FDDAB5" />
          <stop offset="46%"  stopColor="#EB7724" />
          <stop offset="100%" stopColor="#B85C14" />
        </radialGradient>
        {/* Dot gold */}
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FCDB9C" />
          <stop offset="46%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#C07A10" />
        </radialGradient>
        {/* Halo aurora multi-blob */}
        <filter id={`${u}gw`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="32" />
        </filter>
        <filter id={`${u}sh`} x="-30%" y="-24%" width="162%" height="168%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="24" result="b1"/>
          <feOffset in="b1" dy="20" result="o1"/>
          <feFlood floodColor="#3B1060" floodOpacity="0.28" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2"/>
          <feOffset in="b2" dy="5" result="o2"/>
          <feFlood floodColor="#1F3E45" floodOpacity="0.22" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b"/>
          <feOffset in="b" dy="8" result="o"/>
          <feFlood floodColor="#3B1060" floodOpacity="0.30" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        {/* Halo aurora coloré */}
        <path d={PM} fill="#7B4DB0" opacity="0.35" filter={`url(#${u}gw)`} />
        <g filter={`url(#${u}sh)`}><path d={PM} fill={`url(#${u}bg)`} /></g>
        <path d={PM} fill={`url(#${u}sp)`} />
        <path d={PM} fill={`url(#${u}rm)`} />
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.70" />
        <g filter={`url(#${u}ds)`}><path d={PT} fill={`url(#${u}am)`} /></g>
        <ellipse cx="287" cy="28" rx="12" ry="8" fill="white" fillOpacity="0.76" transform="rotate(-22 287 28)" />
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.55" />
        <g filter={`url(#${u}ds)`}><path d={PB} fill={`url(#${u}gl)`} /></g>
        <ellipse cx="287" cy="331" rx="12" ry="8" fill="white" fillOpacity="0.76" transform="rotate(-22 287 331)" />
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.55" />
      </svg>
    </svg>
  );
}

// ── V4 — Obsidian ─────────────────────────────────────────────────────────────
// Dark glass premium : corps quasi-noir, speculaire maximal, teal en reflet de bord.
export function V4LogoObsidian({ size = 200, className }: VP) {
  const u = 'v4ob' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Corps obsidien — très sombre, micro-lit NW */}
        <radialGradient id={`${u}bg`} cx="22%" cy="18%" r="75%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#2A4A55" />
          <stop offset="22%"  stopColor="#182E35" />
          <stop offset="55%"  stopColor="#0F1E23" />
          <stop offset="100%" stopColor="#060D10" />
        </radialGradient>
        {/* Speculaire très fort — éclat de verre */}
        <linearGradient id={`${u}sp`} x1="0" y1="0" x2="0.42" y2="0.58">
          <stop offset="0%"   stopColor="white" stopOpacity="0.88" />
          <stop offset="12%"  stopColor="white" stopOpacity="0.55" />
          <stop offset="32%"  stopColor="white" stopOpacity="0.10" />
          <stop offset="55%"  stopColor="white" stopOpacity="0.02" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Reflet de bord teal — lumière rebond NE */}
        <radialGradient id={`${u}eb`} cx="82%" cy="22%" r="52%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#55A1B4" stopOpacity="0.28" />
          <stop offset="60%"  stopColor="#55A1B4" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#55A1B4" stopOpacity="0" />
        </radialGradient>
        {/* Micro-reflet bas (rebond au sol) */}
        <radialGradient id={`${u}rb`} cx="50%" cy="95%" r="40%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#3D7786" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3D7786" stopOpacity="0" />
        </radialGradient>
        {/* Centre perle brillante */}
        <radialGradient id={`${u}ci`} cx="28%" cy="22%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="18%"  stopColor="#E8F4F7" />
          <stop offset="50%"  stopColor="#73AFBF" />
          <stop offset="100%" stopColor="#1F3E45" />
        </radialGradient>
        {/* Dot amber */}
        <radialGradient id={`${u}am`} cx="28%" cy="22%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="14%"  stopColor="#FDDAB5" />
          <stop offset="42%"  stopColor="#EB7724" />
          <stop offset="100%" stopColor="#7A3008" />
        </radialGradient>
        {/* Dot gold */}
        <radialGradient id={`${u}gl`} cx="28%" cy="22%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="14%"  stopColor="#FCDB9C" />
          <stop offset="42%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#8A5008" />
        </radialGradient>
        <filter id={`${u}gw`} x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        {/* Shadow très forte — renforce le noir */}
        <filter id={`${u}sh`} x="-35%" y="-28%" width="170%" height="178%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="34" result="b1"/>
          <feOffset in="b1" dy="28" result="o1"/>
          <feFlood floodColor="#000000" floodOpacity="0.55" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="b2"/>
          <feOffset in="b2" dy="6" result="o2"/>
          <feFlood floodColor="#060D10" floodOpacity="0.70" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="b"/>
          <feOffset in="b" dy="10" result="o"/>
          <feFlood floodColor="#000000" floodOpacity="0.60" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        <path d={PM} fill="#0F1E23" opacity="0.80" filter={`url(#${u}gw)`} />
        <g filter={`url(#${u}sh)`}><path d={PM} fill={`url(#${u}bg)`} /></g>
        {/* Reflet bord teal */}
        <path d={PM} fill={`url(#${u}eb)`} />
        {/* Rebond bas */}
        <path d={PM} fill={`url(#${u}rb)`} />
        {/* Speculaire très fort */}
        <path d={PM} fill={`url(#${u}sp)`} />
        {/* Centre — surbrillant */}
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="8" ry="6" fill="white" fillOpacity="0.90" />
        <circle cx="209" cy="181" r="3.5" fill="white" fillOpacity="0.70" />
        <g filter={`url(#${u}ds)`}><path d={PT} fill={`url(#${u}am)`} /></g>
        <ellipse cx="287" cy="28" rx="13" ry="9" fill="white" fillOpacity="0.85" transform="rotate(-22 287 28)" />
        <circle cx="297" cy="19" r="5" fill="white" fillOpacity="0.65" />
        <g filter={`url(#${u}ds)`}><path d={PB} fill={`url(#${u}gl)`} /></g>
        <ellipse cx="287" cy="331" rx="13" ry="9" fill="white" fillOpacity="0.85" transform="rotate(-22 287 331)" />
        <circle cx="297" cy="322" r="5" fill="white" fillOpacity="0.65" />
      </svg>
    </svg>
  );
}

// ── V5 — Chrome ───────────────────────────────────────────────────────────────
// Metallic / titanium : bandes linéaires multi-angles, aucun blur, reflets froids.
export function V5LogoChrome({ size = 200, className }: VP) {
  const u = 'v5ch' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Base chrome — diagonal principal */}
        <linearGradient id={`${u}bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#D8E8F0" />
          <stop offset="14%"  stopColor="#7A9AAC" />
          <stop offset="30%"  stopColor="#3A5060" />
          <stop offset="50%"  stopColor="#5A7888" />
          <stop offset="66%"  stopColor="#C2D5E0" />
          <stop offset="80%"  stopColor="#6A8898" />
          <stop offset="100%" stopColor="#1E3040" />
        </linearGradient>
        {/* Bande de reflet diagonal inverse */}
        <linearGradient id={`${u}h2`} x1="100%" y1="0%" x2="30%" y2="60%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.50" />
          <stop offset="20%"  stopColor="white" stopOpacity="0.22" />
          <stop offset="50%"  stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Reflet de bord bleu-acier E */}
        <radialGradient id={`${u}eb`} cx="88%" cy="45%" r="42%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#9FBECE" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9FBECE" stopOpacity="0" />
        </radialGradient>
        {/* Centre mirror ball */}
        <linearGradient id={`${u}ci`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="white" />
          <stop offset="25%"  stopColor="#C8D8E8" />
          <stop offset="55%"  stopColor="#607888" />
          <stop offset="80%"  stopColor="#C0D0DC" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        {/* Dot amber (reste chaud — contraste avec le chrome froid) */}
        <radialGradient id={`${u}am`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FDDAB5" />
          <stop offset="46%"  stopColor="#EB7724" />
          <stop offset="100%" stopColor="#B85C14" />
        </radialGradient>
        {/* Dot gold */}
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="18%"  stopColor="#FCDB9C" />
          <stop offset="46%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#C07A10" />
        </radialGradient>
        {/* Shadow froide */}
        <filter id={`${u}sh`} x="-30%" y="-24%" width="162%" height="168%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="b1"/>
          <feOffset in="b1" dy="18" result="o1"/>
          <feFlood floodColor="#0A1820" floodOpacity="0.42" result="f1"/>
          <feComposite in="f1" in2="o1" operator="in" result="s1"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b2"/>
          <feOffset in="b2" dy="4" result="o2"/>
          <feFlood floodColor="#1E3040" floodOpacity="0.35" result="f2"/>
          <feComposite in="f2" in2="o2" operator="in" result="s2"/>
          <feMerge>
            <feMergeNode in="s1"/>
            <feMergeNode in="s2"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`${u}ds`} x="-48%" y="-42%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b"/>
          <feOffset in="b" dy="8" result="o"/>
          <feFlood floodColor="#0A1820" floodOpacity="0.45" result="f"/>
          <feComposite in="f" in2="o" operator="in" result="s"/>
          <feMerge>
            <feMergeNode in="s"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        {/* Pas de halo — le métal ne rayonne pas */}
        <g filter={`url(#${u}sh)`}><path d={PM} fill={`url(#${u}bg)`} /></g>
        {/* 2e bande de reflet diagonal inverse */}
        <path d={PM} fill={`url(#${u}h2)`} />
        {/* Reflet de bord acier */}
        <path d={PM} fill={`url(#${u}eb)`} />
        {/* Centre mirror */}
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.80" />
        <circle cx="208" cy="182" r="3" fill="white" fillOpacity="0.65" />
        <g filter={`url(#${u}ds)`}><path d={PT} fill={`url(#${u}am)`} /></g>
        <ellipse cx="287" cy="28" rx="12" ry="8" fill="white" fillOpacity="0.78" transform="rotate(-22 287 28)" />
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.55" />
        <g filter={`url(#${u}ds)`}><path d={PB} fill={`url(#${u}gl)`} /></g>
        <ellipse cx="287" cy="331" rx="12" ry="8" fill="white" fillOpacity="0.78" transform="rotate(-22 287 331)" />
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.55" />
      </svg>
    </svg>
  );
}

// ── V6 — Électrique ───────────────────────────────────────────────────────────
// Corps semi-transparent + contour néon avec glow teal.
// Conçu pour surfaces sombres.
export function V6LogoElectrique({ size = 200, className }: VP) {
  const u = 'v6el' + useId().replace(/[^a-z0-9]/gi, '');
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Corps — fill translucide teal */}
        <radialGradient id={`${u}bg`} cx="27%" cy="23%" r="80%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#73AFBF" stopOpacity="0.22" />
          <stop offset="50%"  stopColor="#3D7786" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#1F3E45" stopOpacity="0.10" />
        </radialGradient>
        {/* Glow externe — halo néon */}
        <filter id={`${u}gn`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {/* Glow dot néon */}
        <filter id={`${u}gd`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {/* Centre néon */}
        <radialGradient id={`${u}ci`} cx="32%" cy="27%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="25%"  stopColor="#B9D7DF" />
          <stop offset="60%"  stopColor="#55A1B4" />
          <stop offset="100%" stopColor="#3D7786" />
        </radialGradient>
        {/* Dot amber néon */}
        <radialGradient id={`${u}am`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="20%"  stopColor="#FDE8C8" />
          <stop offset="50%"  stopColor="#EB7724" />
          <stop offset="100%" stopColor="#C06018" />
        </radialGradient>
        {/* Dot gold néon */}
        <radialGradient id={`${u}gl`} cx="30%" cy="24%" r="70%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="white" />
          <stop offset="20%"  stopColor="#FCE8A0" />
          <stop offset="50%"  stopColor="#F8B044" />
          <stop offset="100%" stopColor="#C07818" />
        </radialGradient>
      </defs>
      <svg x="19" y="28" width="218" height="200" viewBox="0 0 439 402" overflow="visible">
        {/* Corps transparent */}
        <path d={PM} fill={`url(#${u}bg)`} />
        {/* Contour néon teal — couche glow */}
        <path d={PM} fill="none" stroke="#55A1B4" strokeWidth="3.5"
          filter={`url(#${u}gn)`} opacity="0.80" />
        {/* Contour néon teal — couche nette */}
        <path d={PM} fill="none" stroke="#73AFBF" strokeWidth="1.8" />
        {/* Ligne intérieure blanche ultra-fine */}
        <path d={PM} fill="none" stroke="white" strokeWidth="0.8" opacity="0.45" />
        {/* Centre illuminé */}
        <path d={PC} fill={`url(#${u}ci)`} />
        <ellipse cx="205" cy="185" rx="7" ry="5" fill="white" fillOpacity="0.85" />
        {/* Glow sur le centre */}
        <path d={PC} fill="#55A1B4" opacity="0.35" filter={`url(#${u}gd)`} />
        {/* Dots avec glow néon */}
        <path d={PT} fill="#EB7724" opacity="0.40" filter={`url(#${u}gd)`} />
        <path d={PT} fill={`url(#${u}am)`} />
        <ellipse cx="287" cy="28" rx="12" ry="8" fill="white" fillOpacity="0.80" transform="rotate(-22 287 28)" />
        <circle cx="296" cy="20" r="4.5" fill="white" fillOpacity="0.60" />
        <path d={PB} fill="#F8B044" opacity="0.40" filter={`url(#${u}gd)`} />
        <path d={PB} fill={`url(#${u}gl)`} />
        <ellipse cx="287" cy="331" rx="12" ry="8" fill="white" fillOpacity="0.80" transform="rotate(-22 287 331)" />
        <circle cx="296" cy="323" r="4.5" fill="white" fillOpacity="0.60" />
      </svg>
    </svg>
  );
}

// ── Export catalogue ──────────────────────────────────────────────────────────
export const variantProposals: Array<{
  id: string;
  label: string;
  Sub: (p: VP) => React.ReactElement;
  matiere: string;
  concept: string;
  surface: string;
}> = [
  {
    id: 'v1',
    label: 'Liquide',
    Sub: V1LogoLiquide,
    matiere: 'océan profond · caustique',
    concept: "Lumière filtrée à travers l'eau. Gradient lit par le haut, taches caustiques. Très profond.",
    surface: 'Fond sombre',
  },
  {
    id: 'v2',
    label: 'Fusion',
    Sub: V2LogoFusion,
    matiere: 'amber dominant · palette inversée',
    concept: 'Corps ambré chaud, dots teal et gold. Inversion complète de la hiérarchie couleur. Énergie, chaleur, dynamisme.',
    surface: 'Fond sombre / clair',
  },
  {
    id: 'v3',
    label: 'Aurora',
    Sub: V3LogoAurora,
    matiere: 'multi-couleurs · atmosphérique',
    concept: 'Dégradé diagonal teal → indigo → rose → gold. Centre perle irisée. Très éditorial, premium, unique.',
    surface: 'Fond sombre',
  },
  {
    id: 'v4',
    label: 'Obsidian',
    Sub: V4LogoObsidian,
    matiere: 'dark glass · speculaire maximal',
    concept: 'Corps quasi-noir, reflet de bord teal, éclat speculaire très fort. Haut contraste, ultra-premium. Linear/Vercel-style.',
    surface: 'Fond sombre',
  },
  {
    id: 'v5',
    label: 'Chrome',
    Sub: V5LogoChrome,
    matiere: 'metallic · titanium facets',
    concept: 'Bandes linéaires multi-angles, pas de blur. Reflets froids acier-bleu. Dots amber/gold = seule chaleur. Technique, précis.',
    surface: 'Fond sombre / clair',
  },
  {
    id: 'v6',
    label: 'Électrique',
    Sub: V6LogoElectrique,
    matiere: 'néon glow · semi-transparent',
    concept: 'Corps translucide avec contour néon teal. Dots lumineux. Glow double-pass. Dark surfaces exclusivement.',
    surface: 'Fond sombre uniquement',
  },
];
