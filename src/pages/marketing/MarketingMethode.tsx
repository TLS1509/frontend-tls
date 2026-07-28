/**
 * MarketingMethode — page "Méthode TLS", /website/methode.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré PAD-page-methode-tls.md
 * (docs/site/propositions-PAD/). Page storytelling scientifique, accessible
 * depuis la page STRIDE (pas dans le menu principal — réunion 28/07).
 *
 * Écarts copy documentés :
 *  - "80 % des infos balayées en 14 jours" → formulation sans fausse précision
 *    (le chiffre pop attribué à Ebbinghaus n'est pas sourçable tel quel ;
 *    règle des sources réelles, cf. mémoire feedback_cite_academic_sources) ;
 *  - "Pour aller plus loin" : lien Livre & Substack omis (pas d'URL existante,
 *    canal jugé "bonus" en réunion) — restent La Vigie et le Magazine.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Ban,
  BookOpenCheck,
  Brain,
  FlaskConical,
  Landmark,
  Radar,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Le récit d'origine — long-form éditorial ─────────────────────────────

const Recit: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-50/70 via-white to-white">
      <div
        aria-hidden
        className="absolute -top-28 right-[-10%] h-[420px] w-[420px] rounded-pill bg-accent-200/40 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-stack-lg"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-accent-100 px-4 py-1.5 font-body text-caption font-bold text-accent-900 m-0">
            <FlaskConical size={14} />
            La Méthode TLS
          </p>
          <h1 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.25rem,5vw,3.75rem)]">
            Pourquoi nous avons arrêté de croire aux catalogues de formation.
          </h1>
          <div className="flex flex-col gap-stack font-body text-body-lg text-ink-700 leading-relaxed [&>p]:m-0">
            <p>
              Des millions d'euros investis dans des LMS et des catalogues de
              cinq mille cours. Des quiz théoriques passés « pour faire du
              chiffre RH ». Et quelques semaines après la formation, la courbe
              de l'oubli décrite par Ebbinghaus a fait son œuvre : l'essentiel
              s'est évaporé, faute d'avoir été pratiqué.
            </p>
            <p className="font-bold text-ink-900">
              The Learning Society est née d'une conviction : la formation
              théorique déconnectée du travail réel est une illusion coûteuse.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Les fondations scientifiques — 3 piliers ─────────────────────────────

const PILIERS = [
  {
    icon: <Landmark size={22} />,
    title: "L'échelle Dreyfus",
    detail:
      "Les travaux de Stuart et Hubert Dreyfus (UC Berkeley) sur l'acquisition des compétences chez l'adulte. Un QCM ne mesure que la mémoire à court terme : la compétence s'évalue par observation et preuves d'exécution, du novice au maître.",
  },
  {
    icon: <BookOpenCheck size={22} />,
    title: "La méthode EDRACT de C-Campus & l'AFEST",
    detail:
      "Conçue par notre partenaire C-Campus, référence française de l'ingénierie de formation et de l'AFEST : Évaluation, Découverte, Réalisation, Ancrage, Consolidation, Transfert. The Learning Society digitalise et augmente EDRACT par l'IA.",
  },
  {
    icon: <Brain size={22} />,
    title: "L'augmentation cognitive & les Out-skills",
    detail:
      "Redéfinir les workflows métiers en identifiant la frontière entre cognition humaine (jugement, empathie, stratégie) et exécution IA (synthèse, génération, automatisation).",
  },
];

const Fondations: React.FC = () => (
  <section className="bg-white border-t border-ink-100">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)] max-w-3xl">
          Trois fondations scientifiques, aucune boîte noire.
        </h2>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PILIERS.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-section items-start border-t border-ink-200/70 py-section first:border-t-0">
              <div className="lg:col-span-5 flex items-start gap-stack">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-900">
                  {p.icon}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight [text-wrap:balance]">
                  {p.title}
                </h3>
              </div>
              <p className="lg:col-span-7 font-body text-body text-ink-600 leading-relaxed m-0 max-w-2xl">
                {p.detail}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 3. Le framework STRIDE — du modèle théorique au terrain ─────────────────

const STRIDE_PHASES = [
  { lettre: 'S', verbe: "S'orienter", experience: "L'évidence du cap" },
  { lettre: 'T', verbe: 'Tester', experience: 'La preuve immédiate' },
  { lettre: 'R', verbe: 'Réaliser', experience: "L'orfèvrerie de l'architecture" },
  { lettre: 'I', verbe: 'Intégrer', experience: "L'invisibilité de la technologie" },
  { lettre: 'D', verbe: 'Déployer', experience: "L'étincelle de l'adoption" },
  { lettre: 'E', verbe: 'Évoluer', experience: "L'éternelle jeunesse du capital humain" },
];

const Framework: React.FC = () => (
  <section className="bg-primary-50/50">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Du modèle théorique à la réalité terrain : pourquoi nous avons créé
            STRIDE.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Six phases qui traduisent Dreyfus, EDRACT et l'augmentation
            cognitive en un chemin opérationnel.
          </p>
        </div>
      </FadeInWhenVisible>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg m-0 p-0 list-none">
        {STRIDE_PHASES.map((s, i) => (
          <FadeInWhenVisible key={s.lettre} delay={i * 0.04} direction="up">
            <li className="flex h-full items-center gap-stack rounded-2xl bg-white p-stack-lg shadow-card">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-700 font-display text-h4 font-extrabold text-white">
                {s.lettre}
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-display text-h4 font-extrabold text-ink-900 m-0 leading-tight">{s.verbe}</h3>
                <span className="font-body text-caption text-ink-500 italic">{s.experience}</span>
              </div>
            </li>
          </FadeInWhenVisible>
        ))}
      </ol>

      <FadeInWhenVisible>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack rounded-2xl bg-white p-stack-lg shadow-card">
          <p className="font-body text-body text-ink-600 m-0 max-w-xl">
            La version opérationnelle, avec les livrables de chaque jalon, est
            sur la page Accompagnement STRIDE.
          </p>
          <Button to="/website/accompagnement" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
            Voir l'accompagnement STRIDE
          </Button>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 4. Le manifeste méthodologique — 4 règles d'or ──────────────────────────

const REFUS = [
  {
    title: "Refus de l'assiduité comme illusion de la compétence",
    detail:
      "Aucune validation sur simple QCM ou feuille de présence : seule la preuve d'exécution, évaluée sur l'échelle Dreyfus, compte.",
  },
  {
    title: 'Refus du techno-solutionnisme aveugle',
    detail:
      "Le cadre pédagogique dicte sa loi à l'outil. L'IA reste un amplificateur d'ancrage, jamais un substitut au jugement humain.",
  },
  {
    title: 'Refus de la dépendance et de la boîte noire',
    detail:
      'Co-construction avec vos équipes et transfert total de compétences : le dispositif doit vivre sans nous.',
  },
  {
    title: 'Refus des compétences fantômes',
    detail:
      'Une compétence sans preuve pendant 90 jours se dégrade automatiquement dans le Passeport, et déclenche un parcours de réactivation.',
  },
];

const Manifeste: React.FC = () => (
  <section className="relative bg-ink-900 text-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <h2 className="font-display font-extrabold leading-[1.06] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)] max-w-3xl">
          Quatre règles d'or : ce que The Learning Society{' '}
          <span className="text-accent-400">refuse</span>.
        </h2>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-section gap-y-stack-lg">
        {REFUS.map((r, i) => (
          <FadeInWhenVisible key={r.title} delay={i * 0.05}>
            <div className="flex items-start gap-stack border-t border-white/15 pt-stack">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                <Ban size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-h4 font-bold text-white m-0 leading-tight">{r.title}</h3>
                <p className="font-body text-body-sm text-white/70 leading-relaxed m-0">{r.detail}</p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. Pour aller plus loin ─────────────────────────────────────────────────

const AllerPlusLoin: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        <FadeInWhenVisible direction="up">
          <div className="flex h-full flex-col gap-stack rounded-2xl bg-primary-50 p-section">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Radar size={20} />
            </span>
            <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">La Vigie</h3>
            <p className="font-body text-body text-ink-700 leading-relaxed m-0 flex-1">
              Nos meilleures analyses sur l'IA, les compétences et le futur du
              travail, dans votre boîte mail.
            </p>
            <div>
              <Button to="/website/vigie" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                S'abonner à La Vigie
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible direction="up" delay={0.08}>
          <div className="flex h-full flex-col gap-stack rounded-2xl bg-secondary-50 p-section">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
              <BookOpenCheck size={20} />
            </span>
            <h3 className="font-display text-h3 font-bold text-ink-900 leading-tight m-0">Le Magazine</h3>
            <p className="font-body text-body text-ink-700 leading-relaxed m-0 flex-1">
              Analyses de fond, dossiers et retours de terrain, en accès libre.
            </p>
            <div>
              <Button to="/website/resources" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
                Lire le Magazine
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>

      <FadeInWhenVisible delay={0.12}>
        <p className="font-body text-body text-ink-600 leading-relaxed m-0 pt-section max-w-[62ch]">
          Vous préférez en parler de vive voix ?{' '}
          <Link
            to="/website/contact"
            className="font-bold text-primary-700 underline underline-offset-4 transition-colors duration-fast hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            Échangez directement avec les fondateurs
          </Link>
          .
        </p>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingMethode: React.FC = () => (
  <div className="bg-white">
    <SEOHead
      title="La Méthode TLS · The Learning Society"
      description="Échelle Dreyfus, méthode EDRACT de C-Campus, augmentation cognitive : les fondations scientifiques de la méthode The Learning Society, et les quatre règles d'or que nous refusons de transgresser."
      canonical="/website/methode"
    />
    <Recit />
    <Fondations />
    <Framework />
    <Manifeste />
    <AllerPlusLoin />
  </div>
);

export default MarketingMethode;
