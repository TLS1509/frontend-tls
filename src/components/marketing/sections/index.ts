/**
 * Marketing sections — Layout routers
 *
 * Each section accepts a `layout` prop to switch between 2-4 visual patterns.
 * Import and use in homepage variants.
 *
 * Example:
 *   <HeroSection layout="centered" animation={!reduce}>
 *     <h1>Title</h1>
 *     <p>Subtitle</p>
 *   </HeroSection>
 */

export { HeroSection, type HeroLayout } from './HeroSection';
export { ConvictionSection, type ConvictionLayout } from './ConvictionSection';
export { CtaSection, type CtaLayout } from './CtaSection';
