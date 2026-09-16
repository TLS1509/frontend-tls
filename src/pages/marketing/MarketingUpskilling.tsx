/**
 * MarketingUpskilling — page "Upskilling sur-mesure", /website/upskilling.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré PAD-page-upskilling.md
 * (docs/site/propositions-PAD/). Scope réunion 28/07 : recentré département
 * L&D. Tone warm (action / parcours), bande sombre = pilotage Learning App.
 *
 * Écart copy documenté : les 3 mentions "Open Badges 2.0" (dont "certifiés")
 * → "Open Badge" (FACTS-CANON F6, RECAP §3).
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Building2,
  Gift,
  HeartHandshake,
  Landmark,
  Ruler,
  School,
  Wrench,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
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
            Trois manières de commencer,{' '}
            <span className="text-secondary-700">selon ce que vous pouvez engager.</span>
          </h1>

          {/* L'échelle d'engagement en ouverture — motif emprunté à OpenTable :
              des lignes de texte nu, aucun contenant, le format en légende.
              Ce hero règle un trou commercial autant qu'un problème de design :
              la page ne montrait que le projet sur-mesure, le plus cher des
              trois, et un visiteur qui n'a pas ce budget repartait sans savoir
              que les deux autres existent.
              ⚠️ Les prix ne figurent pas : leur affichage public n'est pas
              tranché (fiche Tarifs, base Website pages). Le format suffit à
              ranger les trois offres par niveau d'engagement. */}
          <ol className="flex flex-col m-0 p-0 list-none">
            {[
              { nom: 'Pack Flash Leçons', format: 'Quatre webinaires de 1h30, à distance' },
              { nom: 'Bootcamp IP Augmenté', format: 'Quatre demi-journées de 3h30, en présentiel' },
              { nom: 'Projet d’upskilling sur-mesure', format: 'Plusieurs mois, de l’habilitation au déploiement' },
            ].map((o, i) => (
              <li
                key={o.nom}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-stack border-t border-ink-200 py-stack first:border-t-0 first:pt-0"
              >
                <span className="font-display text-caption font-bold text-secondary-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-feature text-ink-900">{o.nom}</span>
                  <span className="font-body text-body-sm text-ink-500">{o.format}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="font-body text-lede text-ink-700 leading-relaxed m-0 max-w-2xl [text-wrap:pretty]">
            Parce que la formation est un métier, tout projet commence par
            l’habilitation de vos concepteurs et formateurs. Un accès à la
            Learning App est inclus ; sa durée se fixe au cadrage.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs">
            <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Cadrer un projet d'upskilling
            </Button>
            <Button to="/website/learning-app" variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Découvrir la Learning App
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. La conviction — deux règles cardinales ───────────────────────────────

const REGLES = [
  {
    title: 'La formation est un métier à part entière',
    detail:
      "Concevoir un parcours qui produit de la compétence réelle demande une ingénierie : objectifs observables, situations de travail, preuves d'exécution.",
  },
  {
    title: 'Tout projet débute par les concepteurs et formateurs',
    detail:
      "Échelle Dreyfus, méthode EDRACT de C-Campus, prompting L&D : nous habilitons d'abord celles et ceux qui façonnent l'apprentissage chez vous.",
  },
];

const Conviction: React.FC = () => (
  <section className="relative">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Tout projet commence par outiller et former ceux qui{' '}
              <span className="text-secondary-400">façonnent l'apprentissage.</span>
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {REGLES.map((r, i) => (
            <FadeInWhenVisible key={r.title} delay={i * 0.08}>
              <div className="border-t border-ink-200 py-stack-lg first:border-t-0">
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-feature text-ink-900">{r.title}</h3>
                  <p className="font-body text-body text-ink-600 leading-relaxed m-0 max-w-xl">{r.detail}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── 3. À qui s'adresse cette offre ──────────────────────────────────────────

const CIBLES = [
  {
    icon: <Landmark size={20} />,
    title: 'Directions L&D de grands groupes & ETI',
    detail:
      'Des parcours Work-Integrated Learning co-conçus avec vos équipes pédagogiques, sur vos projets réels.',
  },
  {
    icon: <Building2 size={20} />,
    title: 'Responsables Formation de PME & ETI',
    detail:
      'Des dispositifs courts, engageants et directement applicables au poste de travail.',
  },
  {
    icon: <School size={20} />,
    title: "Directeurs d'Organismes de Formation",
    detail:
      "Acculturation de vos formateurs, tuteurs IA et Open Badge pour faire évoluer votre offre.",
  },
];

const Cibles: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-2xl">
          Trois profils, un même besoin : des compétences qui tiennent.
        </h2>
      </FadeInWhenVisible>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {CIBLES.map((c, i) => (
          <FadeInWhenVisible key={c.title} delay={i * 0.06} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-secondary-200 pt-stack-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                {c.icon}
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight">{c.title}</h3>
              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{c.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. Le périmètre d'upskilling ────────────────────────────────────────────

const PERIMETRE = [
  {
    icon: <Wrench size={20} />,
    title: 'Hard & Soft Skills métiers',
    desc:
      'Vente, gestion de projet agile, posture managériale, conformité : les compétences cœur de vos équipes, travaillées sur leurs situations réelles.',
  },
  {
    icon: <Bot size={20} />,
    title: "Out-skills & augmentation par l'IA",
    desc:
      'Prompt engineering, pilotage de copilotes, sécurité des données : la maîtrise des outils IA appliquée à chaque métier.',
  },
  {
    icon: <Ruler size={20} />,
    title: 'Acculturation au modèle SBO',
    desc:
      "Transition Skills-Based, déconstruction des fiches de poste, posture d'évaluateur pour les managers.",
  },
];

const Perimetre: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <h2 className="font-display text-section text-ink-900 [text-wrap:balance] max-w-3xl">
          Trois périmètres d'upskilling, un seul standard :{' '}
          <span className="text-secondary-700">la preuve d'exécution</span>.
        </h2>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PERIMETRE.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-flow items-start border-t border-secondary-200/70 py-section first:border-t-0">
              <div className="lg:col-span-5 flex items-start gap-stack">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-secondary-700 shadow-card">
                  {p.icon}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight [text-wrap:balance]">
                  {p.title}
                </h3>
              </div>
              <p className="lg:col-span-7 font-body text-body text-ink-600 leading-relaxed m-0 max-w-2xl">
                {p.desc}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. Pilotage par la Learning App ─────────────────────────────────────────

const PILOTAGE = [
  {
    title: 'Méthode EDRACT de C-Campus',
    detail: 'Évaluation, Découverte, Réalisation AFEST, Ancrage, Consolidation, Transfert.',
  },
  {
    title: 'Échelle Dreyfus (D1 à D5)',
    detail: 'La maîtrise mesurée par observation, du novice au mentor.',
  },
  {
    title: "Gestion de l'atrophie à 90 jours",
    detail: 'Une compétence sans preuve récente se signale et se réactive.',
  },
  {
    title: 'Passeport & Open Badge',
    detail: 'Chaque niveau validé enrichit le Passeport de compétences.',
  },
];

const Pilotage: React.FC = () => (
  <section className="relative overflow-hidden">
    <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-pill bg-primary-200/40 blur-3xl pointer-events-none" />
    <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band flex flex-col gap-flow">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
            Une ingénierie orchestrée par la <span className="text-accent-400">Learning App TLS</span>.
          </h2>
          <p className="font-body text-lede text-ink-700 leading-relaxed m-0">
            Le projet ne vit pas dans un slide : il s'opère dans la plateforme,
            du positionnement initial à la preuve finale.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-section gap-y-stack-lg">
        {PILOTAGE.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.05}>
            <div className="flex items-start gap-stack border-t border-ink-200 pt-stack">
              <CheckCircle2 size={20} className="text-accent-400 shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-feature text-ink-900">{p.title}</h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{p.detail}</p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>

      <FadeInWhenVisible delay={0.1}>
        <div className="flex items-start gap-stack rounded-lg bg-primary-50 p-stack-lg">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-400/20 text-accent-300">
            <Gift size={20} />
          </span>
          <p className="font-body text-body text-ink-700 leading-relaxed m-0">
            <span className="font-bold text-ink-900">Bonus :</span> un an d'accès
            à la Learning App TLS offert pour vos apprenants, concepteurs et
            formateurs.
          </p>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 6. Modalités & livrables ────────────────────────────────────────────────

const LIVRABLES = [
  'Une équipe pédagogique habilitée, autonome après notre départ',
  'Des tuteurs IA de contexte configurés sur vos contenus',
  "Une heatmap de maîtrise d'équipe lisible par vos managers",
  'Des Open Badges qui matérialisent chaque niveau validé',
];

const Modalites: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-flow items-start">
        <div className="lg:col-span-5 flex flex-col gap-stack-lg">
          <FadeInWhenVisible>
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Formation-Action, accompagnement hybride.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.06}>
            <div className="flex flex-col gap-stack">
              <div className="flex items-start gap-stack">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                  <Wrench size={20} />
                </span>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  <span className="font-bold text-ink-900">Formation-Action :</span>{' '}
                  nous travaillons sur les cas réels de votre entreprise, jamais
                  sur des exercices hors-sol.
                </p>
              </div>
              <div className="flex items-start gap-stack">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                  <HeartHandshake size={20} />
                </span>
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                  <span className="font-bold text-ink-900">Accompagnement hybride :</span>{' '}
                  ateliers, sprints, playground et débriefings, rythmés par la
                  plateforme.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-7">
          <ul className="flex flex-col m-0 p-0 list-none">
            {LIVRABLES.map((l, i) => (
              <FadeInWhenVisible key={l} delay={i * 0.05}>
                <li className="flex items-start gap-stack border-t border-ink-200/70 py-stack first:border-t-0 last:border-b last:border-ink-200/70">
                  <CheckCircle2 size={20} className="text-secondary-700 shrink-0 mt-0.5" />
                  <span className="font-body text-body-lg text-ink-800">{l}</span>
                </li>
              </FadeInWhenVisible>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ─── 7. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section>
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-band">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-flow items-start">
        <FadeInWhenVisible className="lg:col-span-3">
          <div className="flex flex-col gap-stack">
            <h2 className="font-display text-section text-ink-900 [text-wrap:balance]">
              Lançons votre prochain projet d'upskilling.
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl [text-wrap:pretty]">
              Un temps de cadrage avec les fondateurs suffit à dessiner le
              dispositif qui correspond à vos équipes.
            </p>
            <div className="pt-stack-xs">
              <Button to="/website/contact" variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                Planifier un échange de cadrage
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.08} className="lg:col-span-2">
          <div className="flex flex-col gap-stack rounded-lg bg-secondary-50 p-stack-lg">
            <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight">
              Avant de vous décider
            </h3>
            <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
              La Méthode TLS explique ce qui fonde nos dispositifs : échelle
              Dreyfus, EDRACT de C-Campus, augmentation cognitive.
            </p>
            <div>
              <Button to="/website/methode" variant="ghost" size="md" trailingIcon={<ArrowUpRight size={16} />}>
                Découvrir la Méthode TLS
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </div>
  </section>
);

export const MarketingUpskilling: React.FC = () => (
  <>
    <SEOHead
      title="Upskilling sur-mesure · The Learning Society"
      description="Des projets d'upskilling pilotés par les professionnels de la formation : habilitation de vos concepteurs et formateurs, méthode EDRACT de C-Campus, échelle Dreyfus et Learning App incluse un an."
      canonical="/website/upskilling"
    />
    <Hero />
    <Conviction />
    <Cibles />
    <Perimetre />
    <Pilotage />
    <Modalites />
    <CtaFinal />
  </>
);

export default MarketingUpskilling;
