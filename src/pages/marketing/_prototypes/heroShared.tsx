/**
 * HeroCopy — bloc texte partagé par tous les essais de hero (11/07/2026).
 * Toujours VISIBLE (jamais gaté par une animation). `dark` = texte blanc sur
 * fond saturé (défaut) ; `dark={false}` = texte ink sur fond clair (essai Trait).
 * Pas d'indice "défiler" (retiré à la demande), heroes autonomes 100dvh.
 */

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { MagneticButton } from '../../../components/marketing/motion';

export const HeroCopy: React.FC<{ dark?: boolean }> = ({ dark = true }) => (
  <div className="relative z-10 min-h-[100dvh] flex items-center justify-center">
    <div className="w-full max-w-page mx-auto px-6 py-page text-center flex flex-col items-center gap-stack-lg">
      <h1
        className={`font-display font-extrabold leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[30ch] text-[clamp(3rem,7vw,5.5rem)] ${
          dark ? 'text-white [text-shadow:0_2px_24px_rgba(11,34,40,0.5)]' : 'text-ink-900'
        }`}
      >
        L'IA n'éclipse pas vos formateurs.{' '}
        <span className={dark ? 'text-accent-400' : 'text-secondary-600'}>Elle les met en lumière.</span>
      </h1>

      <p
        className={`font-body text-body-lg leading-relaxed m-0 max-w-[62ch] ${
          dark ? 'text-white/85 [text-shadow:0_1px_16px_rgba(11,34,40,0.6)]' : 'text-ink-700'
        }`}
      >
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
        <Button
          to="/website/learning-app"
          variant={dark ? 'glass' : 'secondary'}
          size="lg"
          trailingIcon={<ArrowUpRight size={18} />}
        >
          Me former
        </Button>
      </div>
    </div>
  </div>
);

export default HeroCopy;
