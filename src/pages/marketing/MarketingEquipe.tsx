/**
 * MarketingEquipe — page "Les Fondateurs", /website/equipe.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré PAD-page-fondateurs.md
 * (docs/site/propositions-PAD/). Remplace "L'Équipe" (décision réunion 28/07).
 * Attribution confirmée par Chloé : Fondateur 1 = Pierre-Armand Dennery,
 * Fondateur 2 = Chloé Mimault. Accessible via le footer (pas la nav).
 *
 * Visuels : monogrammes tone-aware en attendant les vraies photos des
 * fondateurs (règle : pas de photos stock pour des personnes réelles).
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Brain, Cpu, Target, Zap } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-28 right-[-8%] h-[420px] w-[420px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-hero pb-band">
        <motion.div
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-flow"
        >
          {/* Les noms SONT le titre. C'est la seule page du site dont l'objet
              est une personne, et la promesse tient dans le fait qu'on peut les
              nommer et qu'on leur parlera. Un H1 abstrait sur « l'alliance de
              la pédagogie et de l'IA » dit l'inverse : une entité sans visage.

              ⚠️ Décidé le 16/09/2026 : **le décompte ne s'écrit nulle part.**
              La page nommait l'effectif sept fois — « voilà toute l'équipe »,
              « les deux mêmes », « l'un de nous deux », « deux personnes, deux
              métiers ». Devant un acheteur qui engage cinq chiffres, un nombre
              se lit comme une capacité, pas comme une promesse de proximité.
              Les noms restent, le compte part. Ne pas le réintroduire. */}
          <h1 className="font-display text-hero text-ink-900 [text-wrap:balance]">
            <span className="block">Pierre-Armand Dennery</span>
            <span className="block text-primary-700">Chloé Mimault</span>
          </h1>
          <p className="font-body text-lede text-ink-700 leading-relaxed m-0 max-w-2xl [text-wrap:pretty]">
            L'ingénierie pédagogique d'un côté, le logiciel de l'autre — et les
            mêmes personnes du premier cadrage à la livraison.
          </p>
          <div>
            <Button to="/website/contact" emphasis="solid" tone="brand" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Échanger avec les fondateurs
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Ce qui relie tout ────────────────────────────────────────────────────
//
// Deux réécritures successives le 16/09, et la seconde corrige la première.
//
// Au départ : « Notre ADN — l'agilité d'une structure experte au service de
// votre transformation ». Trois tics de cabinet dans une phrase, zéro
// information.
//
// Puis, trop loin dans l'autre sens : une section qui assumait l'effectif
// (« nous faisons le travail nous-mêmes, donc nous ne prenons pas tous les
// projets »). C'était honnête et c'était une erreur commerciale — décision de
// Chloé : **l'effectif ne se met pas en avant**. Devant un CODIR qui engage
// cinq chiffres, « nous sommes deux » se lit « ils ne tiendront pas la
// charge », quelle que soit la qualité du travail.
//
// La section dit donc ce qui relie les métiers, pas combien de personnes les
// portent. C'est générique au bon sens du terme : une position, pas un vide.
//
// ⚠️ Le hero porte encore la même information plus fort — deux noms en H1 et
// « Voilà toute l'équipe ». Si l'effectif ne doit pas se lire, c'est là qu'il
// se lit d'abord. Laissé tel quel faute d'arbitrage.
//
// Le bandeau `bg-primary-700` pleine largeur est retiré : la coque porte un
// dégradé ambiant, la page n'a pas besoin d'un second fond.

const Approche: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <FadeInWhenVisible className="lg:col-span-5">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            La compétence se prouve. Elle ne se déclare pas.
          </h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08} className="lg:col-span-7 lg:pt-2">
          <div className="flex flex-col gap-flow">
            <p className="font-body text-lede text-ink-700 leading-relaxed m-0 [text-wrap:pretty]">
              C'est ce qui relie tout ce que nous faisons, de la conception d'un
              parcours à la ligne de code.
            </p>
            <p className="font-body text-body text-ink-600 m-0">
              Des leçons qui se terminent par une mise en pratique plutôt que
              par un quiz. Un logiciel qui garde la trace de ce qui a été
              démontré en situation réelle. Et un accompagnement qui part du
              travail tel qu'il se fait, pas de la fiche de poste telle qu'elle
              est écrite.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 3. Deux personnes, deux métiers ─────────────────────────────────────────
//
// Il y avait ici « trois piliers d'excellence » pour deux personnes : le
// troisième, « Ensemble », était une catégorie déguisée en associé. Et depuis
// D9 (31/08) le mot « pilier » désigne autre chose — les trois piliers de
// l'offre. Deux fiches, deux métiers, pas de troisième colonne pour faire
// nombre.

type Fondateur = {
  monogram: string;
  icon: React.ReactNode;
  nom: string;
  domaine: string;
  expertise: string;
  detail: string;
  monoClasses: string;
  iconClasses: string;
};

const FONDATEURS: Fondateur[] = [
  {
    monogram: 'PA',
    icon: <Brain size={20} />,
    nom: 'Pierre-Armand Dennery',
    domaine: 'La méthode',
    expertise: 'Ingénierie pédagogique · Modélisation des compétences',
    detail:
      "Il formalise ce que nous appliquons : l'arc de leçon, la gestion de l'atrophie des acquis, l'échelle Dreyfus. Quand un choix pédagogique se pose sur votre projet, c'est lui qui l'argumente.",
    monoClasses: 'bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-800',
    iconClasses: 'bg-secondary-100 text-secondary-700',
  },
  {
    monogram: 'CM',
    icon: <Cpu size={20} />,
    nom: 'Chloé Mimault',
    domaine: 'Le logiciel',
    expertise: 'Architecture · IA générative · Product design',
    detail:
      "Elle conçoit et développe la Learning App : les tuteurs IA, le Passeport de compétences, et les arbitrages de souveraineté — où tourne le modèle, quelles données sortent de chez vous.",
    monoClasses: 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800',
    iconClasses: 'bg-primary-100 text-primary-800',
  },
];

const Fondateurs: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Les fondateurs, et ce dont chacun répond.
        </h2>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {FONDATEURS.map((p, i) => (
          <FadeInWhenVisible key={p.domaine} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-flow items-start border-t border-ink-200/70 py-section first:border-t-0">
              <div className="lg:col-span-4 flex items-center gap-stack">
                <span
                  aria-hidden
                  className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg font-display text-h3 font-extrabold ${p.monoClasses}`}
                >
                  {p.monogram}
                </span>
                <div className="flex flex-col gap-tight">
                  <h3 className="font-display text-h3 text-ink-900">{p.nom}</h3>
                  <span className="font-body text-caption font-bold text-ink-500">{p.expertise}</span>
                </div>
              </div>
              <div className="lg:col-span-2">
                <p className="font-display text-body-lg font-bold text-ink-900 m-0 leading-snug [text-wrap:balance]">
                  {p.domaine}
                </p>
              </div>
              <p className="lg:col-span-6 font-body text-body text-ink-600 m-0 max-w-xl">
                {p.detail}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. Pourquoi travailler directement avec les fondateurs ──────────────────

// Ces trois entrées s'appelaient « Garantie de seniorité », « Réactivité et
// sur-mesure » et « Pragmatisme opérationnel » — trois noms abstraits, dont le
// dernier promettait « sans jargon ni slideware » en jargon. Un titre de
// rubrique peut être une phrase qui affirme quelque chose.
const RAISONS = [
  {
    icon: <Zap size={20} />,
    title: 'La personne au devis est celle à la livraison.',
    detail: "Aucun transfert de dossier, aucune montée en compétence à vos frais.",
  },
  {
    icon: <ArrowUpRight size={20} />,
    title: 'Une décision se prend en séance.',
    detail: "Les arbitrages se font avec vous, en direct, pas en comité.",
  },
  {
    icon: <Target size={20} />,
    title: 'Nous savons dire non.',
    detail: "Si ce que vous cherchez n'est pas ce que nous faisons, vous le saurez avant de signer.",
  },
];

const Pourquoi: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-2xl">
          Ce que ça change, concrètement.
        </h2>
      </FadeInWhenVisible>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {RAISONS.map((r, i) => (
          <FadeInWhenVisible key={r.title} delay={i * 0.06} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-800">
                {r.icon}
              </span>
              <h3 className="font-display text-h3 font-bold text-ink-900">{r.title}</h3>
              <p className="font-body text-body text-ink-600 m-0">{r.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <FadeInWhenVisible>
        <div className="mx-auto flex max-w-content flex-col items-center gap-stack-lg text-center">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            Vous saurez en trente minutes si nous sommes les bons.
          </h2>
          <p className="font-body text-body-lg text-ink-600 m-0 max-w-[62ch] [text-wrap:pretty]">
            C'est un fondateur au bout du fil. Si le format ne convient pas à
            ce que vous cherchez, nous vous le dirons pendant l'appel.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack-xs">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="xl" trailingIcon={<ArrowRight size={20} />}>
              Réserver trente minutes
            </Button>
            <Button to="/website/diagnostic" emphasis="outline" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
              Évaluer votre maturité
            </Button>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingEquipe: React.FC = () => (
  <>
    <SEOHead
      title="Les Fondateurs · The Learning Society"
      description="Pierre-Armand Dennery pour la méthode, Chloé Mimault pour le logiciel. Chez The Learning Society, vous parlez à celle ou celui qui fera le travail."
      canonical="/website/equipe"
    />
    <Hero />
    <Approche />
    <Fondateurs />
    <Pourquoi />
    <CtaFinal />
  </>
);

export default MarketingEquipe;
