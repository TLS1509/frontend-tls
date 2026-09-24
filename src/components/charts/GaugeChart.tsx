import React, { useMemo } from 'react';

export interface GaugeChartProps {
  current: number; // 0-100 or 0-5 (Dreyfus)
  max?: number; // Default 100
  label?: string;
  tone?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  variant?: 'arc' | 'needle' | 'segment';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  target?: number; // Optional target line
  /** Nom accessible. Par défaut : libellé, pourcentage et objectif. */
  ariaLabel?: string;
}

const TONE_COLORS: Record<string, { arc: string; needle: string; bg: string }> = {
  primary: {
    arc: '#55A1B4',
    needle: '#3D7786',
    bg: '#E8F4F7',
  },
  warm: {
    arc: '#ED843A',
    needle: '#C06920',
    bg: '#FFF3EB',
  },
  sun: {
    arc: '#F8B044',
    needle: '#E89F1B',
    bg: '#FFF9EE',
  },
  success: {
    arc: '#9DBEBA',
    needle: '#7AA89F',
    bg: '#F0F5F4',
  },
  danger: {
    arc: '#F28559',
    needle: '#C0432A',
    bg: '#FFF5F2',
  },
};

/* Le pourcentage central est du TEXTE : il ne peut pas reprendre la teinte de
 * l'arc (500, 1,86 à 2,94:1 sur blanc). Il passe au cran 800 ou au `-fg` de la
 * famille (≥ 4,5:1) ; seul l'arc garde la couleur du ton. */
const TONE_TEXT: Record<NonNullable<GaugeChartProps['tone']>, string> = {
  primary: 'text-primary-800',
  warm: 'text-secondary-800',
  sun: 'text-accent-800',
  success: 'text-success-fg',
  danger: 'text-danger-fg',
};

const SIZE_CONFIG: Record<string, { radius: number; center: number; strokeWidth: number }> = {
  sm: {
    radius: 40,
    center: 50,
    strokeWidth: 6,
  },
  md: {
    radius: 60,
    center: 70,
    strokeWidth: 8,
  },
  lg: {
    radius: 80,
    center: 100,
    strokeWidth: 10,
  },
};

/* La valeur d'une jauge est un chiffre mis en avant : la famille de `stat-value`
 * (League Spartan 700), sur un pas de l'échelle proportionnel à la jauge — elle
 * était à 14 · 18 · 22 px, trois tailles hors échelle posées en style en ligne.
 * Chaque pas tient dans l'anneau : « 100 % » fait 50 · 70 · 90 px de large pour
 * un intérieur de 74 · 112 · 150 px. */
const VALUE_SIZE: Record<NonNullable<GaugeChartProps['size']>, string> = {
  sm: 'text-h3',
  md: 'text-h2',
  lg: 'text-h1',
};

/**
 * GaugeChart — Circular progress indicator (0-100% or 0-5 Dreyfus scale)
 * Variants: arc-fill (default), needle (speedometer), segment (rings)
 * Tone-aware colors, size variants, optional target indicator
 */
export const GaugeChart: React.FC<GaugeChartProps> = ({
  current,
  max = 100,
  label,
  tone = 'primary',
  variant = 'arc',
  size = 'md',
  showPercentage = true,
  target,
  ariaLabel,
}) => {
  const config = SIZE_CONFIG[size];
  const colors = TONE_COLORS[tone];

  // Clamp values to 0-max
  const normalizedCurrent = Math.max(0, Math.min(current, max));
  const normalizedTarget = target ? Math.max(0, Math.min(target, max)) : null;
  const percentage = (normalizedCurrent / max) * 100;
  const targetPercentage = normalizedTarget ? (normalizedTarget / max) * 100 : null;

  // SVG dimensions
  const svgSize = config.center * 2;
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  /* ⚠️ Valeur et légende étaient posées SOUS le SVG puis remontées dessus par
   * une marge négative (`-mt-16`). Or le SVG tourné (`-rotate-90`) se peint
   * au-dessus du texte qui le suit : mesuré le 2026-09-24 sur /passeport, le
   * « 57% » passait derrière le disque teinté et « Objectif : 90 % » derrière
   * l'anneau — illisible. La valeur se pose maintenant DANS l'anneau, par-dessus
   * le SVG ; le libellé et l'objectif, sous la jauge. */
  const valeur = `${Math.round(percentage)}\u202F%`;
  const valueClasses = `font-display tabular-nums ${VALUE_SIZE[size]} ${TONE_TEXT[tone]}`;

  /* Le corps est posé sur chaque <p>. (La base de `globals.css` donnait 16 px
     à tout paragraphe jusqu'au 2026-09-24 ; il hérite désormais, mais le pas
     écrit sur l'élément reste la règle.) */
  const legende = (label || targetPercentage !== null) && (
    <div className="flex flex-col items-center gap-stack-3xs text-center">
      {label && <p className="text-caption text-ink-600">{label}</p>}
      {targetPercentage !== null && (
        <p className="text-caption text-ink-600 tabular-nums">{`Objectif : ${Math.round(targetPercentage)}\u202F%`}</p>
      )}
    </div>
  );

  const renderArcVariant = () => (
    <div className="flex flex-col items-center gap-stack-xs">
      <div className="relative">
        <svg width={svgSize} height={svgSize} className="block -rotate-90">
          {/* Background circle */}
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius}
            fill={colors.bg}
            opacity={0.5}
          />

          {/* Target indicator line (if provided) */}
          {targetPercentage !== null && (
            <circle
              cx={config.center}
              cy={config.center}
              r={config.radius}
              fill="none"
              stroke={colors.needle}
              strokeWidth={2}
              strokeDasharray={`${(targetPercentage / 100) * circumference} ${(100 - targetPercentage) / 100 * circumference}`}
              opacity={0.4}
              strokeDashoffset={0}
            />
          )}

          {/* Main arc */}
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius}
            fill="none"
            stroke={colors.arc}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-out',
            }}
          />
        </svg>

        {/* La valeur, au centre de l'anneau. Le petit disque blanc qui occupait
            ce centre est retiré : le chiffre y tombait à cheval sur son bord. */}
        {showPercentage && (
          <span className={`absolute inset-0 flex items-center justify-center ${valueClasses}`}>
            {valeur}
          </span>
        )}
      </div>
      {legende}
    </div>
  );

  const renderNeedleVariant = () => {
    /* Le demi-cercle va de la gauche (0 %) à la droite (100 %) en passant par le
     * haut, soit −180° → 0° à l'écran. L'ancien décalage de −90° faisait pointer
     * l'aiguille vers le HAUT à 0 % et vers le BAS à 100 % : la jauge mentait. */
    const angle = (percentage / 100) * 180 - 180;
    const radian = (angle * Math.PI) / 180;
    const angleCible = targetPercentage !== null ? (((targetPercentage / 100) * 180 - 180) * Math.PI) / 180 : 0;
    const needleLength = config.radius * 0.8;
    const needleEndX = config.center + needleLength * Math.cos(radian);
    const needleEndY = config.center + needleLength * Math.sin(radian);

    return (
      <div className="flex flex-col items-center gap-stack-sm">
        <svg width={svgSize} height={svgSize * 0.6}>
          {/* Background semi-circle */}
          <circle
            cx={config.center}
            cy={config.center}
            r={config.radius}
            fill={colors.bg}
            opacity={0.3}
          />

          {/* Gauge arc (180°) */}
          <path
            d={`M ${config.center - config.radius} ${config.center} A ${config.radius} ${config.radius} 0 0 1 ${config.center + config.radius} ${config.center}`}
            fill="none"
            className="stroke-ink-200"
            strokeWidth={config.strokeWidth}
          />

          {/* Gauge filled arc */}
          <path
            d={`M ${config.center - config.radius} ${config.center} A ${config.radius} ${config.radius} 0 0 1 ${
              config.center + config.radius * Math.cos(radian)
            } ${config.center + config.radius * Math.sin(radian)}`}
            fill="none"
            stroke={colors.arc}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />

          {/* Target indicator (if provided) */}
          {targetPercentage !== null && (
            <circle
              cx={config.center + config.radius * Math.cos(angleCible)}
              cy={config.center + config.radius * Math.sin(angleCible)}
              r={3}
              fill={colors.needle}
              opacity={0.6}
            />
          )}

          {/* Needle */}
          <line
            x1={config.center}
            y1={config.center}
            x2={needleEndX}
            y2={needleEndY}
            stroke={colors.needle}
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              transition: 'all 1s ease-out',
            }}
          />

          {/* Center dot */}
          <circle cx={config.center} cy={config.center} r={4} fill={colors.needle} />
        </svg>

        {/* Valeur sous le demi-cercle, dans le flux : la marge négative qui la
            remontait vers le pivot la faisait passer sous l'aiguille. */}
        {showPercentage && <span className={valueClasses}>{valeur}</span>}
        {label && <p className="text-caption text-ink-600 text-center">{label}</p>}
      </div>
    );
  };

  /* Chaque anneau a SA circonférence — corrigé le 2026-09-24. Les deux anneaux
   * intérieurs (0,7 et 0,4 × le rayon) reprenaient celle de l'anneau extérieur :
   * leur trait valait p × 2πR sur un cercle de 0,7 × 2πR, donc tout anneau
   * au-delà de 70 % (40 % pour l'objectif) se dessinait plein. Mesuré sur la
   * vitrine, 75 % et un objectif à 90 % rendaient deux cercles complets. */
  const rayonCourant = config.radius * 0.7;
  const rayonCible = config.radius * 0.4;
  const circonferenceCourant = 2 * Math.PI * rayonCourant;
  const circonferenceCible = 2 * Math.PI * rayonCible;

  const renderSegmentVariant = () => (
    <div className="flex flex-col items-center gap-stack-sm">
      <svg width={svgSize} height={svgSize}>
        {/* Outer ring (max) */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill="none"
          className="stroke-ink-200"
          strokeWidth={4}
          opacity={0.3}
        />

        {/* Current ring */}
        <circle
          cx={config.center}
          cy={config.center}
          r={rayonCourant}
          fill="none"
          stroke={colors.arc}
          strokeWidth={6}
          strokeDasharray={`${(percentage / 100) * circonferenceCourant} ${circonferenceCourant}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: `${config.center}px ${config.center}px`,
            transition: 'stroke-dasharray 1s ease-out',
          }}
        />

        {/* Target ring (if provided) */}
        {targetPercentage !== null && (
          <circle
            cx={config.center}
            cy={config.center}
            r={rayonCible}
            fill="none"
            stroke={colors.needle}
            strokeWidth={2}
            strokeDasharray={`${(targetPercentage / 100) * circonferenceCible} ${circonferenceCible}`}
            strokeDashoffset={0}
            opacity={0.6}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: `${config.center}px ${config.center}px`,
            }}
          />
        )}

        {/* Center circle background */}
        <circle cx={config.center} cy={config.center} r={config.radius * 0.3} fill="white" />
      </svg>

      {/* Valeur sous les anneaux : au centre, elle chevauchait l'anneau de
          l'objectif (0,4 × le rayon). */}
      {showPercentage && <span className={valueClasses}>{valeur}</span>}
      {legende}
    </div>
  );

  const description =
    ariaLabel ??
    `${label ?? 'Jauge'} : ${Math.round(percentage)} %` +
    (targetPercentage !== null ? `, objectif ${Math.round(targetPercentage)} %` : '');

  return (
    <div className="flex justify-center" role="img" aria-label={description}>
      {variant === 'needle' && renderNeedleVariant()}
      {variant === 'segment' && renderSegmentVariant()}
      {variant === 'arc' && renderArcVariant()}
    </div>
  );
};

export default GaugeChart;
