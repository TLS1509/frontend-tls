import React from 'react';
import { Outlet } from 'react-router-dom';
import { MarketingHeader } from './MarketingHeader';
import { MarketingFooter } from './MarketingFooter';
import { MarketingToastProvider } from '../../../components/marketing/motion';

/**
 * MarketingLayout — coque du site vitrine public (`/website/*`).
 *
 * Header fixe · contenu · footer, posés sur un fond ambiant unique.
 *
 * ── Refondu le 2026-07-29 ────────────────────────────────────────────────────
 *
 * 1. LE VOILE DE PAGE EST RETIRÉ. Chaque changement de route faisait entrer le
 *    contenu en `opacity: 0 → 1` via `AnimatePresence`. Superposé aux
 *    `FadeInWhenVisible` des sections (17 pages), ça faisait **deux voiles
 *    d'opacité** avant que quoi que ce soit soit lisible — au point que les
 *    captures d'écran du site tombaient blanches. Une révélation doit enrichir
 *    un état déjà visible, jamais conditionner son existence ; et un fondu sur
 *    la coque retarde le LCP à chaque navigation. Un changement de route dans
 *    une SPA n'a pas besoin d'être annoncé par une animation.
 *
 * 2. LE FOND EST CONTINU. Les pages alternaient blanc → `ink-900` → blanc →
 *    teinté → blanc, ce qui hachait chaque page en cinq bandes sans rapport.
 *    Le fond monte ici, une fois : `bg-gradient-page-ambient` traverse les
 *    50-tints TLS (bleu en haut → ambré en bas). Étalé sur toute la hauteur du
 *    document, il est imperceptible d'un écran à l'autre mais donne une
 *    direction au scroll : on descend du problème vers l'action, et le CTA final
 *    baigne dans le chaud.
 *    → Corollaire : les sections doivent être **transparentes**. Une section qui
 *      garde `bg-white` perce un trou blanc dans le dégradé.
 *
 * 3. PLUS DE ROUTE EN DUR. Le layout testait `pathname === '/website'` pour se
 *    rendre transparent sous le hero vidéo de l'accueil. Toute nouvelle page
 *    pleine-page obligeait à éditer la coque. Le hero de l'accueil est opaque
 *    (`bg-ink-900` + vidéo) : il couvre le fond ambiant tout seul, sans que la
 *    coque ait à connaître son adresse.
 */
export const MarketingLayout: React.FC = () => (
  <MarketingToastProvider>
    <div className="min-h-[100dvh] flex flex-col bg-gradient-page-ambient">
      <MarketingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  </MarketingToastProvider>
);

export default MarketingLayout;
