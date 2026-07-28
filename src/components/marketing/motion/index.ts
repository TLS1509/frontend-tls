/**
 * Primitives de motion du site marketing.
 *
 * Nettoyé le 2026-07-28 : 20 primitives sans aucun consommateur ont été
 * supprimées, ainsi que `scroll-effects.tsx` — qui portait `ParallaxSection`,
 * un effet écarté. Ne réexporter ici que ce qu'une page consomme réellement.
 */
export { MeshGradientBg, type MeshTone } from './MeshGradientBg';
export { FadeInWhenVisible } from './FadeInWhenVisible';
export { MagneticButton } from './MagneticButton';
export { InteractiveAppMockup } from './InteractiveAppMockup';
export { KineticHeadline } from './KineticHeadline';
export { RevealMask } from './RevealMask';
export { ScrollProgress } from './ScrollProgress';
export { NoiseTexture } from './NoiseTexture';
export { MarketingToastProvider, useMarketingToast } from './Toast';
