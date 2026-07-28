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
  BookOpenCheck,
  Bot,
  Cable,
  CheckCircle2,
  LayoutDashboard,
  PenTool,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero — lumière chaude, typographie éditoriale ────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary-50 via-white to-white">
      <div
        aria-hidden
        className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-pill bg-secondary-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-40 left-[-12%] h-[360px] w-[360px] rounded-pill bg-accent-200/30 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-stack-lg"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-secondary-100 px-4 py-1.5 font-body text-caption font-bold text-secondary-800 m-0">
            <PenTool size={14} />
            Le Studio TLS
          </p>
          <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.5rem,5.5vw,4.25rem)]">
            Vos contenus et vos outils IA sur-mesure.{' '}
            <span className="text-secondary-700">Pensés pour l'impact, prêts à opérer.</span>
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
            De l'ingénierie pédagogique au développement d'Agents IA métiers,
            nous concevons et déployons les briques opérationnelles de votre
            transition vers le modèle Skills-Based Organization.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack-xs">
            <MagneticButton strength={14}>
              <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Lancer un projet avec le Studio
              </Button>
            </MagneticButton>
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
  <section className="relative bg-ink-900 text-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-section items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display font-extrabold leading-[1.08] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,2.75rem)]">
              Des formations hors-sol et des outils IA que personne n'utilise.
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {FAILURES.map((f, i) => (
            <FadeInWhenVisible key={f.title} delay={i * 0.08}>
              <div className="border-t border-white/15 py-stack-lg first:border-t-0">
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-h4 font-bold text-white m-0 leading-tight">{f.title}</h3>
                  <p className="font-body text-body text-white/70 leading-relaxed m-0 max-w-xl">{f.detail}</p>
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
    icon: <BookOpenCheck size={22} />,
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
    icon: <Bot size={22} />,
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
    icon: <Cable size={22} />,
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
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            L'alliance de la pédagogie de pointe et de la{' '}
            <span className="text-secondary-700">technologie sur-mesure</span>.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PILIERS.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack lg:gap-section items-start border-t border-ink-200/70 py-section first:border-t-0">
              <div className="lg:col-span-5 flex items-start gap-stack">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                  {p.icon}
                </span>
                <h3 className="font-display text-h3 font-bold text-ink-900 m-0 leading-tight [text-wrap:balance]">
                  {p.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="font-body text-body text-ink-600 leading-relaxed m-0">{p.desc}</p>
              </div>
              <ul className="lg:col-span-3 flex flex-col gap-stack-xs m-0 p-0 list-none">
                {p.exemples.map((e) => (
                  <li key={e} className="flex items-start gap-stack-xs">
                    <CheckCircle2 size={16} className="text-secondary-600 shrink-0 mt-0.5" />
                    <span className="font-body text-body-sm text-ink-700 leading-snug">{e}</span>
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
    detail: 'Prêts à déployer dans votre environnement, avec Open Badge quand un dispositif certifiant C-Campus est associé.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Agents IA propriétaires',
    detail: 'Tuteurs et copilotes configurés pour vos métiers, documentés et transférés à vos équipes.',
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: 'Tableau de bord de compétences',
    detail: "La progression de vos équipes lisible en un coup d'œil, branchée sur le Passeport.",
  },
  {
    icon: <BookOpenCheck size={20} />,
    title: "Kit de déploiement & guides d'adoption",
    detail: "Tout ce qu'il faut pour que le dispositif vive après notre départ : guides, rituels, relais internes.",
  },
];

const Livrables: React.FC = () => (
  <section className="bg-secondary-50/60">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-2xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Une production opérationnelle, clé en main.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            Chaque projet Studio livre des actifs concrets que vos équipes
            peuvent opérer sans nous.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        {LIVRABLES.map((l, i) => (
          <FadeInWhenVisible key={l.title} delay={i * 0.05} direction="up">
            <div className="flex h-full items-start gap-stack rounded-2xl bg-white p-stack-lg shadow-card">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
                {l.icon}
              </span>
              <div className="flex flex-col gap-stack-xs">
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">{l.title}</h3>
                <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{l.detail}</p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section className="bg-secondary-50 border-t border-secondary-100">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <FadeInWhenVisible>
        <div className="flex flex-col gap-stack-lg lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-stack">
            <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.25rem)]">
              Concevons vos prochains actifs pédagogiques et IA.
            </h2>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 [text-wrap:pretty]">
              Chaque projet Studio commence par un cadrage sur-mesure : nous
              partons de votre besoin réel, jamais d'un catalogue.
            </p>
          </div>
          <div className="shrink-0">
            <MagneticButton strength={16}>
              <Button to="/website/contact" variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                Échanger avec l'équipe du Studio
              </Button>
            </MagneticButton>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingStudio: React.FC = () => (
  <div className="bg-white">
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
  </div>
);

export default MarketingStudio;
