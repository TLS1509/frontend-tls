/**
 * MarketingTaglineLab — comparateur visuel des 6 angles de tagline
 * (proposition brand refresh mai 2026, décision #5 encore ouverte).
 *
 * Dev-only page à /marketing/_taglines. Rend chaque option dans le vrai
 * hero type-hero (même typo, même fond, même accent géométrique) pour
 * comparer à taille réelle plutôt que sur une liste de texte.
 *
 * Aucune de ces options n'est adoptée — c'est un outil de décision.
 */
import React from 'react';

type Angle = {
  name: string;
  headline: string;
  sub: string;
  force: string;
  risque: string;
};

const ANGLES: Angle[] = [
  {
    name: 'Augmentation positive (actuelle)',
    headline: "L'IA au service des compétences",
    sub: "Pas l'inverse.",
    force: 'Pro-IA, défensif, clair',
    risque: 'Trop sage',
  },
  {
    name: 'Catégorie nouvelle',
    headline: 'Le système d’exploitation des organisations Skills-Based',
    sub: 'Former, valider sur projets réels, allouer les bonnes compétences.',
    force: 'Audacieux, premium',
    risque: 'Très tech, exclut les non-SBO',
  },
  {
    name: 'Méthode signature',
    headline: 'Learn. Practice. Master.',
    sub: 'Augmenté par l’IA.',
    force: 'Brandable, rythme ternaire',
    risque: 'Nécessite une explication',
  },
  {
    name: 'Survival / urgency',
    headline: "Maîtrisez l'IA. Avant qu'elle ne vous maîtrise.",
    sub: 'Devenez le professionnel que l’IA ne peut pas remplacer.',
    force: 'Punche, mémorable',
    risque: 'Fear-based, anti-warm',
  },
  {
    name: 'Indispensabilité',
    headline: "Devenez le pro que l'IA ne peut pas remplacer",
    sub: 'Des compétences qui durent, pas des outils qui datent.',
    force: 'Valorisant',
    risque: 'Évoque quand même la peur du remplacement',
  },
  {
    name: 'Vision long-terme',
    headline: "L'avenir du L&D commence par la maîtrise de l'IA",
    sub: 'Pour les organisations qui pensent à 2031, pas au prochain trimestre.',
    force: 'Stratégique, CLO-friendly',
    risque: 'Long, peu de punch',
  },
];

const TaglineCard: React.FC<{ angle: Angle; index: number }> = ({ angle, index }) => (
  <section className="relative overflow-hidden rounded-2xl bg-primary-50 border border-primary-100">
    <div
      aria-hidden
      className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-primary-600/8 pointer-events-none"
    />
    <div className="relative px-6 sm:px-10 py-section flex flex-col items-center text-center gap-stack">
      <div className="flex items-center gap-stack-xs">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-pill bg-ink-900 text-white font-body text-caption font-bold">
          {index + 1}
        </span>
        <span className="font-body text-caption font-semibold uppercase tracking-widest text-primary-700">
          {angle.name}
        </span>
      </div>

      <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-display m-0 [text-wrap:balance] max-w-[18ch] text-[clamp(1.8rem,4.4vw,3rem)]">
        {angle.headline}
      </h1>
      <p className="font-body text-body text-primary-600 font-semibold m-0 max-w-[50ch]">
        {angle.sub}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack text-caption font-body">
        <span className="inline-flex px-3 py-1 rounded-pill bg-white border border-primary-100 text-ink-700">
          Force : {angle.force}
        </span>
        <span className="inline-flex px-3 py-1 rounded-pill bg-white border border-secondary-200 text-secondary-700">
          Risque : {angle.risque}
        </span>
      </div>
    </div>
  </section>
);

export const MarketingTaglineLab: React.FC = () => (
  <div className="min-h-screen bg-ink-50">
    <div className="sticky top-0 z-[999] bg-white/97 backdrop-blur-glass-medium border-b border-ink-200 shadow-xs">
      <div className="max-w-[1000px] mx-auto px-4 h-14 flex items-center gap-stack">
        <span className="font-display text-body-sm font-extrabold text-primary-700 tracking-tight">
          TLS Tagline Lab
        </span>
        <span className="font-body text-caption text-ink-500">
          6 angles, même hero, même typo — décision non tranchée
        </span>
      </div>
    </div>

    <main className="max-w-[1000px] mx-auto px-4 py-page flex flex-col gap-stack-lg">
      {ANGLES.map((angle, i) => (
        <TaglineCard key={angle.name} angle={angle} index={i} />
      ))}
    </main>
  </div>
);

export default MarketingTaglineLab;
