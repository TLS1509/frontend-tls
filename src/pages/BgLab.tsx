/**
 * BgLab — page de test isolée pour les variantes de fond d'app (texture / lavis).
 * Route standalone /_bg-lab. NON extendu à l'app tant qu'une variante n'est pas choisie.
 * À supprimer une fois la direction validée.
 */

import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

/* Grain papier fin via feTurbulence (test uniquement — en prod on passera sur une vraie
   image noise si validé). opacity pilote l'intensité du grain. */
const grain = (op: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='${op}'/%3E%3C/svg%3E")`;

const AQUA_LIGHT =
  'radial-gradient(62% 46% at 10% 2%, rgba(85,161,180,0.10), transparent 62%),' +
  'radial-gradient(54% 40% at 92% 16%, rgba(248,176,68,0.06), transparent 58%),' +
  'radial-gradient(80% 56% at 50% 106%, rgba(237,132,58,0.07), transparent 66%),' +
  'linear-gradient(180deg,#f4fafb 0%,#ffffff 46%,#fffaf7 100%)';

const AQUA_STRONG =
  'radial-gradient(60% 48% at 8% 0%, rgba(85,161,180,0.18), transparent 60%),' +
  'radial-gradient(52% 42% at 95% 14%, rgba(248,176,68,0.12), transparent 55%),' +
  'radial-gradient(85% 60% at 50% 108%, rgba(237,132,58,0.13), transparent 64%),' +
  'linear-gradient(180deg,#eef7f9 0%,#ffffff 46%,#fff6ef 100%)';

interface Variant {
  id: string;
  name: string;
  desc: string;
  bg: string;
}

const VARIANTS: Variant[] = [
  { id: 'A', name: 'Aquarelle légère', desc: 'Lavis TLS très doux (≤10 %). Le fond que je proposais au départ.', bg: AQUA_LIGHT },
  { id: 'B', name: 'Aquarelle présente', desc: 'Mêmes lavis, ~1,7× plus saturés + base légèrement teintée.', bg: AQUA_STRONG },
  { id: 'C', name: 'Aquarelle + grain papier', desc: 'Lavis léger + grain fin (~4,5 %) pour la tactilité « papier ».', bg: `${grain(0.045)},${AQUA_LIGHT}` },
  { id: 'D', name: 'Grain papier seul', desc: 'Papier warm quasi-blanc + grain seul, sans lavis couleur.', bg: `${grain(0.06)},linear-gradient(180deg,#fcfcfb,#faf9f6)` },
];

const Sample: React.FC<{ v: Variant }> = ({ v }) => (
  <section
    className="relative flex flex-col gap-5 p-6 sm:p-8 min-h-[560px] overflow-hidden border-r border-b border-ink-100"
    style={{ backgroundImage: v.bg }}
  >
    {/* Label variante */}
    <div className="flex items-baseline gap-2">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-pill bg-ink-900 text-white text-caption font-bold">
        {v.id}
      </span>
      <div className="flex flex-col">
        <h2 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-headline">{v.name}</h2>
        <p className="m-0 text-caption text-ink-500">{v.desc}</p>
      </div>
    </div>

    {/* Titre + corps témoin (test lisibilité sur le fond) */}
    <div className="flex flex-col gap-2 max-w-[46ch]">
      <h3 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-headline leading-tight">
        Mes objectifs de progression
      </h3>
      <p className="m-0 text-body-sm text-ink-600 leading-relaxed">
        Le corps de texte se lit-il bien sur ce fond ? Contraste, confort, et sensation
        générale de la texture au repos comme au scroll.
      </p>
    </div>

    {/* Card blanche solide (surface app validée) */}
    <div className="rounded-2xl bg-white border border-ink-100 shadow-card p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600">
          <Sparkles size={16} />
        </span>
        <span className="font-display text-body-sm font-bold text-ink-900">Card blanche solide</span>
      </div>
      <p className="m-0 text-caption text-ink-500 leading-snug">
        Les cartes de l'app restent blanches — vérifier qu'elles se détachent bien du fond.
      </p>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-micro font-medium bg-ink-50 text-ink-700 border border-ink-200">
          <Clock size={11} /> 14 min
        </span>
        <span className="inline-flex items-center rounded-pill px-2 py-0.5 text-micro font-medium bg-ink-50 text-ink-700 border border-ink-200">
          Intermédiaire
        </span>
      </div>
    </div>

    {/* Card teintée (surface active) */}
    <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-200/70 shadow-brand-sm p-4 flex flex-col gap-1">
      <span className="font-display text-body-sm font-bold text-ink-900">Card teintée (surface active)</span>
      <p className="m-0 text-caption text-ink-600 leading-snug">
        Une surface teintée sur le fond texturé — cohérence des deux lavis.
      </p>
    </div>
  </section>
);

export const BgLab: React.FC = () => (
  <div className="min-h-[100dvh] w-full bg-white">
    <header className="px-6 sm:px-8 py-5 border-b border-ink-100 bg-white sticky top-0 z-10">
      <h1 className="m-0 font-display text-h4 font-bold text-ink-900 tracking-headline">
        Fond d'app — test de texture
      </h1>
      <p className="m-0 text-caption text-ink-500 mt-0.5">
        4 variantes côte à côte · mêmes contenus témoins · choisis-en une, je l'étends à toute l'app.
      </p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2">
      {VARIANTS.map((v) => (
        <Sample key={v.id} v={v} />
      ))}
    </div>
  </div>
);

export default BgLab;
