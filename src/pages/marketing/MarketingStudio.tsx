/**
 * MarketingStudio — page "Studio IA & Pédagogie", /website/studio.
 *
 * Créée le 28/07/2026 depuis le copy arbitré PAD-page-studio-ia-pedagogie.md
 * (docs/site/propositions-PAD/). Tone warm (création / action).
 *
 * Écart copy documenté : "Parcours & modules certifiants" (livrables) adouci en
 * "Parcours et modules sur-mesure" — "certifiant" est un claim non sourcé côté
 * TLS (règle FACTS-CANON, seul C-Campus certifie).
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Bot,
  Cable,
  CheckCircle2,
  LayoutDashboard,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { GRID_CONTAINER } from '../../lib/grid-columns';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero — lumière chaude, typographie éditoriale ────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-hero pb-band">
        <motion.div
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-flow"
        >
          {/* Hero éditorial — motif emprunté à Retool : un titre surdimensionné
              qui occupe toute la largeur, puis le texte courant en deux colonnes
              étroites dessous. La page qui vend un atelier ouvre sur de la
              typographie, pas sur une pastille de sur-titre.
              Le titre sort du `max-w-4xl` commun aux autres pages : c'est
              l'écart de mesure qui fait la différence, pas un ornement. */}
          <h1 className="font-display text-hero text-ink-900 [text-wrap:balance] max-w-5xl">
            Vos contenus et vos outils IA,{' '}
            <span className="text-secondary-700">prêts à opérer.</span>
          </h1>

          <div className={GRID_CONTAINER}>
            <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-flow max-w-4xl">
              <p className="font-body text-body text-ink-600 m-0 border-t-2 border-secondary-500 pt-stack">
                De l'ingénierie pédagogique aux agents IA métiers, nous
                concevons, déployons et vous transmettons les briques qui font
                tourner votre organisation.
              </p>
              <p className="font-body text-body text-ink-600 m-0 border-t border-ink-200 pt-stack">
                Vos équipes les opèrent sans nous : parcours, agents configurés,
                tableau de bord et kit de déploiement restent chez vous après
                notre départ.
              </p>
            </div>
          </div>

          <div>
            <Button to="/website/contact" emphasis="solid" tone="brand" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Lancer un projet avec le Studio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Le problème — bandeau sombre, deux raisons d'échec ───────────────────

const FAILURES = [
  {
    title: 'Des contenus e-learning génériques',
    detail:
      "Déconnectés des situations réelles de vos équipes, ils sont consommés puis oubliés. La courbe de l'oubli fait le reste.",
  },
  {
    title: "Des outils IA parachutés sans accompagnement",
    detail:
      "Un copilote déployé sans méthode ni cas d'usage métier devient un gadget. Personne ne l'utilise, le ROI reste introuvable.",
  },
];

const Probleme: React.FC = () => (
  <section className="relative">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Des formations hors-sol et des outils IA que personne n'utilise.
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {FAILURES.map((f, i) => (
            <FadeInWhenVisible key={f.title} delay={i * 0.08}>
              <div className="border-t border-ink-200 py-stack-lg first:border-t-0">
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-feature text-ink-900">{f.title}</h3>
                  <p className="font-body text-body text-ink-600 m-0 max-w-xl">{f.detail}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── 3. L'approche — 3 piliers en rangées éditoriales ────────────────────────

type Pilier = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  exemples: string[];
};

const PILIERS: Pilier[] = [
  {
    icon: <BookOpenCheck size={20} />,
    title: 'Ingénierie & contenus pédagogiques sur-mesure',
    desc:
      "Des parcours construits sur vos projets réels, pas sur des cas d'école. Chaque module prépare une mise en pratique observable.",
    exemples: [
      'Cas pratiques issus de vos propres projets',
      "Modules immersifs et supports d'animation augmentés",
      'Scénarisation ancrée dans le travail quotidien',
    ],
  },
  {
    icon: <Bot size={20} />,
    title: 'Agents IA & assistants métiers',
    desc:
      "Des agents conçus pour vos workflows : tuteurs qui accompagnent l'apprentissage, copilotes qui augmentent l'exécution.",
    exemples: [
      'Agents tuteurs adossés à vos contenus',
      'Agents copilotes intégrés aux processus métiers',
      'Prompt engineering sectoriel documenté',
    ],
  },
  {
    icon: <Cable size={20} />,
    title: 'Intégration tech & écosystème',
    desc:
      "Le Studio livre dans votre environnement, pas à côté : vos outils existants deviennent le terrain de déploiement.",
    exemples: [
      'Connexion LMS / LXP et SIRH, Teams, Slack',
      'Passeport de compétences branché sur vos données',
      'Dashboards de pilotage pour vos équipes L&D',
    ],
  },
];

const Approche: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            L'alliance de la pédagogie de pointe et de la{' '}
            <span className="text-secondary-700">technologie sur-mesure</span>.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PILIERS.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-flow items-start border-t border-ink-200/70 py-section first:border-t-0">
              <div className="lg:col-span-5 flex items-start gap-stack">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                  {p.icon}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 [text-wrap:balance]">
                  {p.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="font-body text-body text-ink-600 m-0">{p.desc}</p>
              </div>
              <ul className="lg:col-span-3 flex flex-col gap-stack-xs m-0 p-0 list-none">
                {p.exemples.map((e) => (
                  <li key={e} className="flex items-start gap-stack-xs">
                    <CheckCircle2 size={16} className="text-secondary-600 shrink-0 mt-0.5" />
                    <span className="font-body text-body-sm text-ink-700">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. Les livrables — production clé en main ───────────────────────────────

const LIVRABLES = [
  {
    icon: <Rocket size={20} />,
    title: 'Parcours et modules sur-mesure',
    detail: 'Prêts à déployer dans votre environnement, avec un Open Badge quand un dispositif certifiant C-Campus est associé.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Agents IA propriétaires',
    detail: 'Tuteurs et copilotes configurés pour vos métiers, documentés et transférés à vos équipes.',
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: 'Tableau de bord de compétences',
    detail: "La progression de vos équipes lisible en un coup d'œil, branchée sur le Passeport de la Learning App.",
  },
  {
    icon: <BookOpenCheck size={20} />,
    title: "Kit de déploiement & guides d'adoption",
    detail: "Tout ce qu'il faut pour que le dispositif vive après notre départ : guides, rituels, relais internes.",
  },
];

const Livrables: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <div className="max-w-2xl flex flex-col gap-stack">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            Une production opérationnelle, clé en main.
          </h2>
          <p className="font-body text-body-lg text-ink-600 m-0">
            Chaque projet Studio livre des actifs concrets que vos équipes
            peuvent opérer sans nous.
          </p>
        </div>
      </FadeInWhenVisible>

      {/* Le motif dissous (16/09). C'était une grille de quatre cartes
          rigoureusement identiques — même fond blanc, même ombre, même bulle
          d'icône, même longueur : de la « card soup », et le défaut que la
          fiche Notion demandait de traiter. Quatre contenants identiques ne
          hiérarchisent rien ; ils ajoutent seulement du mobilier autour d'un
          texte qui se suffit.
          Ce qui reste : une énumération, des filets, et l'icône ramenée au rang
          de repère inline. La liste dit ce que le chapô promet — des actifs
          qu'on emporte, pas des produits qu'on expose. */}
      {/* Deux boîtes : la requête de conteneur remonte à l'ancêtre le plus
          proche, jamais à l'élément qui la porte. */}
      <div className={GRID_CONTAINER}>
        <ul className="grid grid-cols-1 @2xl:grid-cols-2 gap-x-flow m-0 p-0 list-none">
        {LIVRABLES.map((l, i) => (
          <li key={l.title} className="border-t border-ink-200 py-stack-lg">
            <FadeInWhenVisible delay={i * 0.05} className="flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs">
                <span className="inline-flex shrink-0 items-center justify-center icon-sm text-secondary-700 [&>svg]:w-full [&>svg]:h-full">
                  {l.icon}
                </span>
                <h3 className="font-display text-feature text-ink-900">{l.title}</h3>
              </div>
              <p className="font-body text-body text-ink-600 m-0 max-w-lg">{l.detail}</p>
            </FadeInWhenVisible>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      {/* Le seuil passe en requête de conteneur (16/09). En `lg:` — un seuil de
          FENÊTRE à 1024 px — la ligne basculait alors que les deux boutons XL
          réclament ~690 px : le titre était écrasé à 245 px, un mot par ligne.
          Mesuré au navigateur. `@5xl` (1024 px de CONTENEUR) ne bascule que
          quand la place existe vraiment, et les boutons perdent `shrink-0`
          pour pouvoir passer à la ligne au lieu d'écraser le voisin. */}
      <FadeInWhenVisible className={GRID_CONTAINER}>
        <div className="flex flex-col gap-stack-lg @5xl:flex-row @5xl:items-end @5xl:justify-between">
          <div className="flex max-w-2xl flex-col gap-stack">
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Concevons vos prochains actifs pédagogiques et IA.
            </h2>
            <p className="font-body text-body-lg text-ink-600 m-0 [text-wrap:pretty]">
              Chaque projet Studio commence par un cadrage sur-mesure : nous
              partons de votre besoin réel, jamais d'un catalogue.
            </p>
          </div>
          <div className="flex flex-wrap flex-col items-start gap-stack-xs @md:flex-row @md:items-center">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="xl" trailingIcon={<ArrowRight size={20} />}>
              Échanger avec l'équipe du Studio
            </Button>
            <Button to="/website/accompagnement" emphasis="outline" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
              Voir la méthode STRIDE
            </Button>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingStudio: React.FC = () => (
  <>
    <SEOHead
      title="Studio IA & Pédagogie · The Learning Society"
      description="Contenus pédagogiques sur-mesure, agents IA métiers et intégration dans votre écosystème : le Studio TLS conçoit et déploie les briques opérationnelles de votre transition SBO."
      canonical="/website/studio"
    />
    <Hero />
    <Probleme />
    <Approche />
    <Livrables />
    <CtaFinal />
  </>
);

export default MarketingStudio;
