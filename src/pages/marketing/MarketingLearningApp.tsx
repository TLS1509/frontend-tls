/**
 * MarketingLearningApp — page produit "Learning App", /website/learning-app.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré PAD-page-learning-app.md
 * (docs/site/propositions-PAD/) : sections 1/2/3/9 arbitrées le 28/07 (choix
 * documentés dans le fichier PAD), sections 4-8 validées PAD, section 10
 * (pricing) intentionnellement absente (décision Chloé 28/07 : pas de prix
 * public en V1 → CTA d'échange), section 11 (CTA final) écrite à l'intégration.
 * Inclut la sous-section Bibliothèque de compétences (PAD-page-bibliotheque-
 * competences.md) avec explorateur interactif.
 *
 * Écarts copy documentés :
 *  - CTA hero "Démarrer un essai gratuit (14 jours)" → "Réserver une
 *    démonstration" (état bêta de l'app + funnel RDV B2B acté ; Chloé pas
 *    encore sûre — swap d'une ligne si l'essai gratuit est confirmé) ;
 *  - "80 % oublié en 2 semaines" → formulation sans fausse précision (règle
 *    des sources réelles) ;
 *  - "Open Badges 2.0" → "Open Badges" (règle marketing FACTS-CANON) ;
 *  - Match/allocation projets formulé AU FUTUR (décision réunion 28/07 §1.6).
 */

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  CalendarClock,
  CheckCircle2,
  LibraryBig,
  Radar,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  InteractiveAppMockup,
  } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-hero pb-band">
        <motion.div
          initial={reduced ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-flow"
        >
          <h1 className="font-display text-hero text-ink-900 [text-wrap:balance]">
            Une formation qui ne s'évapore pas{' '}
            <span className="text-primary-700">trois semaines après la session.</span>
          </h1>
          {/* Le rythme d'ancrage, en toutes lettres. C'est le mécanisme du
              produit — reprise espacée jusqu'à la bascule des 90 jours — et
              c'est ce qui distingue cette page sans rien avoir à montrer.
              Décision du 16/09 : hero typographique, le produit se montre plus
              bas, où la maquette interactive existe déjà.
              Différent du bloc de chiffres du Diagnostic à dessein : celui-ci
              est une ligne de temps, pas un relevé. */}
          <ol className="flex flex-wrap items-center gap-stack-xs m-0 p-0 list-none font-display text-feature text-ink-500">
            {['J+1', 'J+7', 'J+30', 'J+90'].map((j, i) => (
              <li key={j} className="flex items-center gap-stack-xs">
                {i > 0 && <span aria-hidden className="h-px w-8 bg-primary-200" />}
                <span className={i === 3 ? 'text-primary-700' : undefined}>{j}</span>
              </li>
            ))}
            <li className="font-body text-body-sm text-ink-500 ps-stack-xs">
              la reprise espacée, jusqu'à la bascule des 90 jours
            </li>
          </ol>
          <p className="font-body text-lede text-ink-700 leading-relaxed m-0 max-w-2xl [text-wrap:pretty]">
            La Learning App prolonge nos programmes dans le quotidien de vos
            équipes : ancrage espacé, veille rattachée à vos compétences, et une
            trace vivante de ce qui est réellement maîtrisé.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
            <Button to="/website/contact" emphasis="solid" tone="brand" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Réserver une démonstration
            </Button>
            <Button href="#bibliotheque" emphasis="outline" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Explorer la Bibliothèque de compétences
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Le problème — constat de performance ─────────────────────────────────

const CONSTATS = [
  {
    title: 'La formation "hors-sol" ne produit rien',
    detail:
      "Des heures de e-learning consommées loin du poste de travail, et l'essentiel oublié en quelques semaines faute de pratique. Le budget part, la compétence ne reste pas.",
  },
  {
    title: "L'IA parachutée sans méthode stagne",
    detail:
      "Des licences distribuées sans cas d'usage métier ni accompagnement : les usages restent superficiels et le ROI invisible.",
  },
  {
    title: 'Les fiches de poste mortes aveuglent le pilotage',
    detail:
      'Impossible de savoir qui maîtrise réellement quoi : les décisions de staffing et de formation se prennent au feeling.',
  },
];

const Probleme: React.FC = () => (
  <section className="relative">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display text-section [text-wrap:balance]">
              Trois constats qui coûtent cher aux organisations.
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {CONSTATS.map((c, i) => (
            <FadeInWhenVisible key={c.title} delay={i * 0.07}>
              <div className="border-t border-ink-200 py-stack-lg first:border-t-0">
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-feature text-ink-900">{c.title}</h3>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-xl">{c.detail}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── 3. Le moteur — Learn → Do → Match + démo produit ────────────────────────

const MOTEUR = [
  {
    num: '1',
    verbe: 'Learn',
    detail: "Ancrage théorique ciblé et veille quotidienne, rattachés aux compétences de votre référentiel.",
  },
  {
    num: '2',
    verbe: 'Do',
    detail: "Application pratique sur les projets réels et adoption méthodique de l'IA dans les workflows.",
  },
  {
    num: '3',
    verbe: 'Match',
    detail: "Un Passeport de compétences vivant, mesuré sur l'échelle Dreyfus, qui alimentera demain l'allocation des talents sur les projets.",
  },
];

const Moteur: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Le moteur de performance :{' '}
          <span className="text-primary-700">Learn → Do → Match</span>.
        </h2>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg lg:gap-flow">
        {MOTEUR.map((e, i) => (
          <FadeInWhenVisible key={e.verbe} delay={i * 0.07} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <div className="flex items-baseline gap-stack-xs">
                <span className="font-display text-h1 font-extrabold text-primary-300 leading-none">{e.num}</span>
                <h3 className="font-display text-h2 text-ink-900 leading-none">{e.verbe}</h3>
              </div>
              <p className="font-body text-body text-ink-600 m-0">{e.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>

      <FadeInWhenVisible delay={0.1}>
        <div className="rounded-xl overflow-hidden ring-1 ring-ink-200 shadow-card-lift bg-white">
          <InteractiveAppMockup />
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 4-8. Les quatre piliers ─────────────────────────────────────────────────

type PilierData = {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  points: { label: string; detail: string }[];
};

const PILIERS: PilierData[] = [
  {
    icon: <Radar size={20} />,
    kicker: 'Continuous Intelligence',
    title: 'Transformez cinq minutes de lecture quotidienne en montée en compétences.',
    points: [
      {
        label: "Curation IA + validation d'experts",
        detail: "La veille est collectée par IA puis validée par des ingénieurs pédagogiques : pas de bruit, pas d'hallucination.",
      },
      {
        label: 'Rattachement automatique au Passeport',
        detail: 'Chaque lecture nourrit les compétences de votre référentiel, pas un fil infini.',
      },
      {
        label: 'Formats micro-learning',
        detail: 'Des capsules de trois à cinq minutes, calibrées pour les fenêtres réelles de la journée de travail.',
      },
    ],
  },
  {
    icon: <Bot size={20} />,
    kicker: 'Action-Based Learning',
    title: 'Vos équipes apprennent en faisant, pas en regardant.',
    points: [
      {
        label: 'Leçons structurées en quatre phases',
        detail:
          "Le modèle EDRA, de la méthode EDRACT de C-Campus : Engagement, Découverte, Réflexion, Activité. Chaque leçon se termine par une mise en pratique.",
      },
      {
        label: 'Positionnement initial auto-généré',
        detail: "Le parcours démarre là où en est chacun, pas au module 1 pour tout le monde.",
      },
      {
        label: 'Tuteurs & copilotes IA intégrés',
        detail: "Des agents configurés sur vos contenus accompagnent la pratique, sans jamais s'y substituer.",
      },
    ],
  },
  {
    icon: <LibraryBig size={20} />,
    kicker: 'Le Learning Space',
    title: 'Une structure claire, une autonomie totale.',
    points: [
      {
        label: "Onze formats d'apprentissage modulaires",
        detail: 'Leçons, articles, vidéos, ateliers, masterclass : chaque contenu a un format adapté à son usage.',
      },
      {
        label: 'Libre accès organisé',
        detail: "L'apprenant explore en autonomie, la structure garde le cap.",
      },
      {
        label: 'Gestion intelligente des prérequis',
        detail: 'Les dépendances entre contenus guident la progression sans la verrouiller.',
      },
    ],
  },
  {
    icon: <TrendingUp size={20} />,
    kicker: 'Le Passeport de compétences vivant',
    title: "Mesurez la maîtrise réelle. Éliminez l'obsolescence.",
    points: [
      {
        label: 'Cartographier',
        detail: 'Échelle Dreyfus et heatmap 360° sur trois familles : Hard, Soft et Out-skills.',
      },
      {
        label: 'Prouver',
        detail: "La maîtrise se mesure en continu sur cinq niveaux, du novice au maître, par preuves d'exécution.",
      },
      {
        label: 'Maintenir',
        detail: "Sans preuve récente pendant 90 jours, la compétence se signale et déclenche une re-pratique.",
      },
    ],
  },
  {
    icon: <Users size={20} />,
    kicker: 'Coaching, ateliers & preuve',
    title: 'La puissance de la tech, la valeur du coaching humain.',
    points: [
      {
        label: 'Accompagner',
        detail: 'Coaching individuel sur-mesure, messagerie et sessions 1-1 intégrées.',
      },
      {
        label: 'Pratiquer',
        detail: "Ateliers d'équipe en comité réduit, douze personnes maximum.",
      },
      {
        label: 'Reconnaître',
        detail: 'Des Open Badges vérifiables et partageables matérialisent chaque niveau validé.',
      },
    ],
  },
];

const Piliers: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Cinq piliers, une seule plateforme.
        </h2>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PILIERS.map((p, i) => (
          <FadeInWhenVisible key={p.kicker} delay={Math.min(i * 0.04, 0.12)}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-flow items-start border-t border-primary-200/70 py-section first:border-t-0">
              <div className="lg:col-span-5 flex flex-col gap-stack">
                <span className="inline-flex w-fit items-center gap-stack-xs rounded-pill bg-white px-3.5 py-1.5 font-body text-caption font-bold text-primary-800 shadow-card">
                  {p.icon}
                  {p.kicker}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 [text-wrap:balance]">
                  {p.title}
                </h3>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-stack">
                {p.points.map((pt) => (
                  <div key={pt.label} className="flex items-start gap-stack">
                    <CheckCircle2 size={20} className="text-primary-700 shrink-0 mt-1" />
                    <p className="font-body text-body text-ink-700 m-0">
                      <span className="font-bold text-ink-900">{pt.label} : </span>
                      {pt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 9. Bibliothèque de compétences — sous-section + explorateur ─────────────

const DREYFUS: { niveau: string; statut: string; critere: string }[] = [
  { niveau: 'D1 · Novice', statut: 'Apprenti', critere: 'Applique des règles strictes sans contexte' },
  { niveau: 'D2 · Débutant avancé', statut: 'Exécutant', critere: 'Reconnaît les situations récurrentes, autonomie partielle' },
  { niveau: 'D3 · Compétent', statut: 'Praticien', critere: 'Planifie et résout des problèmes complexes sur projet réel' },
  { niveau: 'D4 · Performant', statut: 'Expert', critere: 'Perçoit globalement, anticipe les risques' },
  { niveau: 'D5 · Maître', statut: 'Leader / Mentor', critere: 'Innove et transmet le savoir-faire' },
];

type Fiche = {
  domaine: string;
  type: 'Out-skill' | 'Hard skill' | 'Soft skill';
  competence: string;
  preuves: Record<string, string>;
  parcours: string;
};

const FICHES: Fiche[] = [
  {
    domaine: 'Formation & pédagogie',
    type: 'Out-skill',
    competence: 'Prompt engineering pédagogique',
    preuves: {
      D1: "Capture d'un system prompt testé et commenté",
      D3: "Configuration complète d'un tuteur IA déployé sur projet réel, avec compte-rendu de recette",
      D5: "Framework de prompting adopté par toute l'équipe, avec analyse d'engagement",
    },
    parcours: "Micro-veille (3 min) → démonstration vidéo (5 min) → réalisation sur projet réel (AFEST) → alerte d'ancrage à 90 jours",
  },
  {
    domaine: 'Gestion de projet',
    type: 'Hard skill',
    competence: 'Pilotage de projet agile',
    preuves: {
      D1: "Backlog priorisé sur un projet d'entraînement",
      D3: 'Sprint mené de bout en bout sur un projet réel, rétrospective documentée',
      D5: "Cadre agile adapté et transmis à plusieurs équipes",
    },
    parcours: 'Positionnement initial → leçons EDRA ciblées → mission apprenante sur projet réel → consolidation à 90 jours',
  },
  {
    domaine: 'Management',
    type: 'Soft skill',
    competence: 'Feedback structuré',
    preuves: {
      D1: "Grille d'observation remplie sur un cas fourni",
      D3: "Entretiens de feedback menés et débriefés avec un coach",
      D5: "Culture de feedback instaurée et mesurée dans l'équipe",
    },
    parcours: "Auto-positionnement → atelier en comité réduit → pratique accompagnée 1-1 → preuve d'exécution terrain",
  },
];

const NIVEAUX_EXPLORER = ['D1', 'D3', 'D5'] as const;

const Bibliotheque: React.FC = () => {
  const [ficheIdx, setFicheIdx] = useState(0);
  const [niveau, setNiveau] = useState<(typeof NIVEAUX_EXPLORER)[number]>('D3');
  const fiche = useMemo(() => FICHES[ficheIdx], [ficheIdx]);

  return (
    <section id="bibliotheque" className="scroll-mt-24">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
        <FadeInWhenVisible>
          <div className="max-w-3xl flex flex-col gap-stack">
            <p className="inline-flex w-fit items-center gap-stack-xs rounded-pill bg-primary-100 px-4 py-1.5 font-body text-caption font-bold text-primary-800 m-0">
              <LibraryBig size={14} />
              La Bibliothèque de compétences
            </p>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Oubliez les catalogues de cours.{' '}
              <span className="text-primary-700">Pilotez des compétences vivantes et mesurables.</span>
            </h2>
            <p className="font-body text-body-lg text-ink-600 m-0">
              Un catalogue e-learning mesure la consommation. Notre bibliothèque
              mesure la maîtrise : chaque compétence est une brique autonome,
              rattachée à des missions réelles, évaluée par preuves d'exécution
              et soumise à la mesure de l'atrophie. Trois familles : Hard
              skills, Soft skills, et les Out-skills, notre signature, la
              maîtrise des copilotes IA par métier.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Matrice Dreyfus */}
        <FadeInWhenVisible>
          <div className="overflow-x-auto rounded-xl ring-1 ring-ink-200">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">Matrice d'évaluation : échelle Dreyfus D1 à D5</caption>
              <thead>
                <tr className="bg-primary-50">
                  <th scope="col" className="px-stack-md py-3 font-display text-body-sm font-bold text-ink-900">Niveau</th>
                  <th scope="col" className="px-stack-md py-3 font-display text-body-sm font-bold text-ink-900">Statut</th>
                  <th scope="col" className="px-stack-md py-3 font-display text-body-sm font-bold text-ink-900">Critère d'observation</th>
                </tr>
              </thead>
              <tbody>
                {DREYFUS.map((d) => (
                  <tr key={d.niveau} className="border-t border-ink-100">
                    <td className="px-stack-md py-3 font-body text-body-sm font-bold text-primary-800 whitespace-nowrap">{d.niveau}</td>
                    <td className="px-stack-md py-3 font-body text-body-sm text-ink-700 whitespace-nowrap">{d.statut}</td>
                    <td className="px-stack-md py-3 font-body text-body-sm text-ink-600">{d.critere}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInWhenVisible>

        {/* Explorateur interactif */}
        <FadeInWhenVisible>
          <div className="rounded-lg bg-primary-50/60 p-stack-lg sm:p-section flex flex-col gap-stack-lg">
            <div className="flex flex-col gap-stack-xs">
              <h3 className="font-display text-h3 font-bold text-ink-900">
                Explorez une brique de compétence.
              </h3>
              <p className="font-body text-body-sm text-ink-600 m-0">
                Choisissez une compétence et un niveau : la fiche montre les
                preuves attendues et le parcours qui y mène.
              </p>
            </div>

            <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Choisir une compétence">
              {FICHES.map((f, i) => (
                <button
                  key={f.competence}
                  type="button"
                  onClick={() => setFicheIdx(i)}
                  aria-pressed={i === ficheIdx}
                  className={`min-h-touch rounded-pill px-4 py-2 font-body text-body-sm font-bold transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    i === ficheIdx
                      ? 'bg-primary-700 text-white'
                      : 'bg-white text-ink-700 hover:bg-primary-100 ring-1 ring-ink-200'
                  }`}
                >
                  {f.competence}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
              <div className="lg:col-span-7 flex flex-col gap-stack rounded-lg border border-ink-200 bg-white p-stack-lg">
                <div className="flex flex-wrap items-center gap-stack-xs">
                  <span className="rounded-pill bg-primary-100 px-3 py-1 font-body text-caption font-bold text-primary-800">
                    {fiche.type}
                  </span>
                  <span className="font-body text-caption text-ink-500">{fiche.domaine}</span>
                </div>
                <h4 className="font-display text-h4 text-ink-900 leading-tight">
                  {fiche.competence}
                </h4>
                <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Choisir un niveau Dreyfus">
                  {NIVEAUX_EXPLORER.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNiveau(n)}
                      aria-pressed={n === niveau}
                      className={`min-h-touch rounded-pill px-4 py-1.5 font-body text-body-sm font-bold transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                        n === niveau
                          ? 'bg-ink-900 text-white'
                          : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex items-start gap-stack border-t border-ink-100 pt-stack">
                  <BadgeCheck size={20} className="text-primary-700 shrink-0 mt-0.5" />
                  <p className="font-body text-body text-ink-700 m-0">
                    <span className="font-bold text-ink-900">Preuve requise au niveau {niveau} : </span>
                    {fiche.preuves[niveau]}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-stack">
                <div className="flex items-start gap-stack rounded-lg border border-ink-200 bg-white p-stack-lg">
                  <CalendarClock size={20} className="text-primary-700 shrink-0 mt-0.5" />
                  <p className="font-body text-body-sm text-ink-700 m-0">
                    <span className="font-bold text-ink-900">Parcours lié : </span>
                    {fiche.parcours}
                  </p>
                </div>
                <div className="flex items-start gap-stack rounded-lg border border-ink-200 bg-white p-stack-lg">
                  <BadgeCheck size={20} className="text-primary-700 shrink-0 mt-0.5" />
                  <p className="font-body text-body-sm text-ink-700 m-0">
                    <span className="font-bold text-ink-900">Reconnaissance : </span>
                    chaque niveau validé génère un Open Badge et incrémente le
                    Passeport ainsi que la heatmap d'équipe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

// ─── 10. L'actif stratégique (Match au futur) ────────────────────────────────

const ActifStrategique: React.FC = () => (
  <section className="relative overflow-hidden">
    <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-pill bg-primary-200/40 blur-3xl pointer-events-none" />
    <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-white [text-wrap:balance]">
              Un actif de compétences qui prend de la valeur{' '}
              <span className="text-primary-700">à mesure que vous l'utilisez</span>.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <p className="font-body text-lede text-ink-700 leading-relaxed m-0 max-w-2xl">
              Chaque preuve d'exécution enrichit un référentiel qui devient le
              socle de vos décisions : qui former, sur quoi, et bientôt qui
              positionner sur quel projet. Le Passeport prépare dès aujourd'hui
              le terrain du Match : demain, l'allocation des talents sur les
              futurs projets s'appuiera sur la maîtrise démontrée, pas sur les
              intitulés de poste.
            </p>
          </FadeInWhenVisible>
        </div>
        <FadeInWhenVisible delay={0.1} className="lg:col-span-5">
          <div className="flex flex-col gap-stack rounded-lg bg-primary-50 p-stack-lg">
            <h3 className="font-display text-feature text-ink-900">
              Du Skills-Based au Matching Projets
            </h3>
            <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
              La maturité IA de votre organisation commence par une donnée de
              compétences propre et vivante. C'est exactement ce que la
              Learning App construit, jour après jour.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

// ─── 11. CTA final (pas de pricing public en V1) ─────────────────────────────

const CtaFinal: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <FadeInWhenVisible>
        <div className="relative overflow-hidden rounded-lg bg-ink-900 text-white px-6 sm:px-10 lg:px-16 py-band">
          <div className="relative max-w-content flex flex-col gap-stack-lg">
            <h2 className="font-display text-section text-white [text-wrap:balance]">
              Voyez la Learning App fonctionner sur vos cas d'usage.
            </h2>
            <p className="font-body text-body-lg text-white/80 m-0 max-w-2xl">
              Une démonstration sur vos métiers et vos enjeux réels. Les
              modalités se cadrent ensuite ensemble, selon votre contexte.
            </p>
            <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
              <Button to="/website/contact" emphasis="solid" tone="warm" size="xl" trailingIcon={<ArrowRight size={20} />}>
                Réserver une démonstration
              </Button>
              <Button to="/website/diagnostic" emphasis="solid" onDark size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                Évaluer votre maturité SBO
              </Button>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingLearningApp: React.FC = () => (
  <>
    <SEOHead
      title="Learning App · The Learning Society"
      description="Work-Integrated Learning & SBO Operating System : veille continue, apprentissage par l'action (EDRA), Passeport de compétences vivant sur l'échelle Dreyfus et coaching humain intégré."
      canonical="/website/learning-app"
    />
    <Hero />
    <Probleme />
    <Moteur />
    <Piliers />
    <Bibliotheque />
    <ActifStrategique />
    <CtaFinal />
  </>
);

export default MarketingLearningApp;
