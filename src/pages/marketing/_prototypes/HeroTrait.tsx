/**
 * HeroTrait — essai "Trait de lumière" (option 5) : minimal, éditorial. Fond
 * clair texturé peinture, texte ink, et LE seul mouvement = un trait doré
 * dessiné à la main qui se TRACE sous le titre (draw-on). Zéro imagerie tech.
 *
 * Un seul geste, hero-only. 100% SVG/CSS + framer, aucun asset externe.
 * Route cachée /website/_hero-trait — essai, pas en prod.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { MagneticButton } from '../../../components/marketing/motion';

export const HeroTrait: React.FC = () => {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        // Fond clair "aube" texturé (grain aquarelle blendé au paint level).
        backgroundColor: '#FFF6EA',
        backgroundImage:
          'url(/images/dawn-wash-grain.jpg), radial-gradient(120% 90% at 50% 8%, #FFF9EE 0%, #FFF3EB 45%, #FDEBDD 100%)',
        backgroundBlendMode: 'soft-light, normal',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 min-h-[100dvh] flex items-center justify-center">
        <div className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg">
          <div className="flex flex-col items-center gap-3">
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[26ch] text-[clamp(3rem,7vw,5.5rem)]">
              L'IA n'éclipse pas vos formateurs.{' '}
              <span className="text-secondary-600">Elle les met en lumière.</span>
            </h1>

            {/* Le trait de lumière qui se dessine à la main sous le titre. */}
            <svg
              aria-hidden
              className="w-[min(70vw,440px)] h-[22px]"
              viewBox="0 0 440 22"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M8 13 Q 112 3 224 12 T 432 9"
                stroke="#ED843A"
                strokeWidth={4}
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduced ? 0 : 1.4, delay: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>

          <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[62ch]">
            The Learning Society aide organisations et professionnels à maîtriser
            l'IA en formation : une formation certifiante, une Learning App
            adaptative et un accompagnement sur mesure. Sans perdre l'humain au centre.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-stack-xs pt-stack">
            <MagneticButton strength={14}>
              <Button to="/website/accompagnement" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Je représente une entreprise
              </Button>
            </MagneticButton>
            <Button to="/website/learning-app" variant="secondary" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Me former
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroTrait;
