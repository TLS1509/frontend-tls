/**
 * AmbientBlobs — fond ambient TLS avec 3 blobs flottants (primary teal / warm orange / sun yellow).
 *
 * Pattern décoratif full-page : 3 cercles très flous (blur 80px) qui dérivent lentement
 * (animation `float` 20s). Couches positionnées en `fixed` overlay, `pointer-events-none`
 * pour ne pas bloquer les interactions.
 *
 * Usage canonique (pair avec le token gradient DS `bg-gradient-page-ambient`) :
 * ```tsx
 * <div className="relative min-h-[100dvh] bg-gradient-page-ambient">
 *   <AmbientBlobs />
 *   <div className="relative z-base max-w-page mx-auto p-6"> ... </div>
 * </div>
 * ```
 *
 * Variants de gradient disponibles dans `src/index.css` @layer utilities :
 *  - `bg-gradient-page-ambient`      : teal-50 → white → yellow-50 (DEFAULT)
 *  - `bg-gradient-page-ambient-warm` : teal-50 → white → orange-50
 *  - `bg-gradient-page-ambient-sun`  : orange-50 → white → yellow-50
 *
 * Props :
 *  - `intensity` : 'subtle' (0.1) / 'normal' (0.15 - DEFAULT) / 'vivid' (0.25)
 *  - `position` : 'fixed' (DEFAULT) ou 'absolute' selon le contexte du parent
 *  - `className` : extra classes sur le wrapper
 *
 * ⚠️ Important : le parent immédiat doit être `relative` pour ancrer les blobs si
 * `position="absolute"`. En mode `fixed` (default) les blobs sont ancrés au viewport.
 */

import React from 'react';

export type AmbientBlobsIntensity = 'subtle' | 'normal' | 'vivid';
export type AmbientBlobsPosition = 'fixed' | 'absolute';

export interface AmbientBlobsProps {
  intensity?: AmbientBlobsIntensity;
  position?: AmbientBlobsPosition;
  className?: string;
}

/* Per-tone opacity — warm est intentionnellement plus bas (~60%) car
   l'orange est perçu comme plus saturé/dominant à intensité égale que teal/yellow.
   Ça évite que le blob warm "écrase" les autres dans la composition. */
const BLOB_OPACITY: Record<AmbientBlobsIntensity, { cool: string; warm: string }> = {
  subtle: { cool: 'opacity-[0.10]', warm: 'opacity-[0.06]' },
  normal: { cool: 'opacity-[0.15]', warm: 'opacity-[0.09]' },
  vivid:  { cool: 'opacity-[0.25]', warm: 'opacity-[0.15]' },
};

const POSITION: Record<AmbientBlobsPosition, string> = {
  fixed:    'fixed',
  absolute: 'absolute',
};

export const AmbientBlobs: React.FC<AmbientBlobsProps> = ({
  intensity = 'normal',
  position = 'fixed',
  className = '',
}) => {
  const opacityCool = BLOB_OPACITY[intensity].cool;
  const opacityWarm = BLOB_OPACITY[intensity].warm;
  return (
    <div
      aria-hidden="true"
      className={[
        POSITION[position],
        'inset-0 overflow-hidden pointer-events-none z-base',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Flow "cool top → warm bottom" comme un coucher de soleil TLS :
         primary teal top-left → sun yellow middle-right → warm orange bottom-right. */}

      {/* Blob 1 — primary teal, top-left (cool, dominant en haut) */}
      <span
        className={[
          'absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full bg-primary-500 blur-[80px]',
          'animate-[float_20s_ease-in-out_infinite]',
          opacityCool,
        ].join(' ')}
      />
      {/* Blob 2 — sun yellow, middle-right (transition cool→warm) */}
      <span
        className={[
          'absolute top-1/3 -right-56 w-[400px] h-[400px] rounded-full bg-accent-400 blur-[80px]',
          'animate-[float_20s_ease-in-out_infinite] [animation-delay:-7s]',
          opacityCool,
        ].join(' ')}
      />
      {/* Blob 3 — warm orange, bottom-right (opacity réduite ~60% car orange visuellement
          plus dominant — évite d'écraser teal/yellow et le bandeau newsletter en bas). */}
      <span
        className={[
          'absolute -bottom-64 -right-32 w-[380px] h-[380px] rounded-full bg-secondary-400 blur-[80px]',
          'animate-[float_20s_ease-in-out_infinite] [animation-delay:-14s]',
          opacityWarm,
        ].join(' ')}
      />
    </div>
  );
};

export default AmbientBlobs;
