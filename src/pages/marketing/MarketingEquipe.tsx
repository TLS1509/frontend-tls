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
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  HeartHandshake,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div
        aria-hidden
        className="absolute -top-28 right-[-8%] h-[420px] w-[420px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-stack-lg"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-primary-100 px-4 py-1.5 font-body text-caption font-bold text-primary-800 m-0">
            <Users size={14} />
            Deux fondateurs, une vision commune
          </p>
          <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.5rem,5.5vw,4.25rem)]">
            L'alliance de la pédagogie, de l'IA{' '}
            <span className="text-primary-700">et de la stratégie RH.</span>
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
            Pas de chaîne hiérarchique lourde, pas de consultants juniors. The
            Learning Society a été créée par un duo complémentaire qui associe
            la recherche en ingénierie pédagogique, l'architecture IA et la
            transformation des organisations.
          </p>
          <div className="pt-stack-xs">
            <MagneticButton strength={14}>
              <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Réserver un échange direct avec les fondateurs
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Notre ADN ────────────────────────────────────────────────────────────

const Adn: React.FC = () => (
  <section className="relative bg-primary-700 text-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <FadeInWhenVisible>
        <div className="max-w-4xl flex flex-col gap-stack-lg">
          <h2 className="font-display font-extrabold text-white leading-[1.06] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            L'agilité d'une structure experte au service de votre
            transformation.
          </h2>
          <p className="font-body text-body-lg text-white/85 leading-relaxed m-0 max-w-3xl">
            Ni cabinet de conseil traditionnel, ni éditeur de logiciel
            impersonnel : vous échangez directement avec les concepteurs de la
            méthode et de la plateforme.
          </p>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 3. Deux fondateurs, trois piliers ───────────────────────────────────────

type Pilier = {
  monogram: string | null;
  icon: React.ReactNode;
  nom: string;
  domaine: string;
  expertise: string;
  detail: string;
  monoClasses: string;
  iconClasses: string;
};

const PILIERS: Pilier[] = [
  {
    monogram: 'PA',
    icon: <Brain size={20} />,
    nom: 'Pierre-Armand Dennery',
    domaine: 'La science pédagogique & la vision SBO',
    expertise: 'Ingénierie pédagogique · Modélisation des compétences · Thought leadership',
    detail:
      "Porte la vision Skills-Based Organization, formalise les travaux méthodologiques et garantit la rigueur scientifique du dispositif : arc de leçon EDRA, gestion de l'atrophie des acquis, échelle Dreyfus.",
    monoClasses: 'bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-800',
    iconClasses: 'bg-secondary-100 text-secondary-700',
  },
  {
    monogram: 'CM',
    icon: <Cpu size={20} />,
    nom: 'Chloé Mimault',
    domaine: "L'ingénierie IA, le produit & la data",
    expertise: 'Architecture logicielle · IA générative · Product design',
    detail:
      'Conçoit et développe la Learning App TLS, traduit la pédagogie en fonctionnalités logicielles, configure les tuteurs IA et garantit la sécurité et la souveraineté des données.',
    monoClasses: 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800',
    iconClasses: 'bg-primary-100 text-primary-700',
  },
  {
    monogram: null,
    icon: <HeartHandshake size={20} />,
    nom: 'Ensemble',
    domaine: "La transformation & l'ancrage terrain",
    expertise: 'Accompagnement DRH · Directions L&D · CODIR',
    detail:
      "Un accompagnement personnel, du dépoussiérage des fiches de poste à l'embarquement des managers : la transformation ne se délègue pas à un slide.",
    monoClasses: 'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-900',
    iconClasses: 'bg-accent-100 text-accent-800',
  },
];

const Fondateurs: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)] max-w-3xl">
          Deux fondateurs, trois piliers d'excellence.
        </h2>
      </FadeInWhenVisible>

      <div className="flex flex-col">
        {PILIERS.map((p, i) => (
          <FadeInWhenVisible key={p.domaine} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-start border-t border-ink-200/70 py-section first:border-t-0">
              <div className="lg:col-span-4 flex items-center gap-stack">
                <span
                  aria-hidden
                  className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-h3 font-extrabold ${p.monoClasses}`}
                >
                  {p.monogram ?? <HeartHandshake size={28} />}
                </span>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-display text-h4 font-extrabold text-ink-900 m-0 leading-tight">{p.nom}</h3>
                  <span className="font-body text-caption font-bold text-ink-500">{p.expertise}</span>
                </div>
              </div>
              <div className="lg:col-span-3">
                <p className="font-display text-body-lg font-bold text-ink-900 m-0 leading-snug [text-wrap:balance]">
                  {p.domaine}
                </p>
              </div>
              <p className="lg:col-span-5 font-body text-body text-ink-600 leading-relaxed m-0 max-w-xl">
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

const RAISONS = [
  {
    icon: <Zap size={20} />,
    title: 'Garantie de seniorité',
    detail: 'Les personnes qui cadrent votre projet sont celles qui le livrent.',
  },
  {
    icon: <ArrowUpRight size={20} />,
    title: 'Réactivité et sur-mesure',
    detail: 'Pas de circuit de validation : les décisions se prennent avec vous, en séance.',
  },
  {
    icon: <Target size={20} />,
    title: 'Pragmatisme opérationnel',
    detail: 'Des livrables actionnables, sans jargon ni slideware.',
  },
];

const Pourquoi: React.FC = () => (
  <section className="bg-primary-50/50">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,2.75rem)] max-w-2xl">
          Pourquoi travailler directement avec les fondateurs.
        </h2>
      </FadeInWhenVisible>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {RAISONS.map((r, i) => (
          <FadeInWhenVisible key={r.title} delay={i * 0.06} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                {r.icon}
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">{r.title}</h3>
              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{r.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 5. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section className="bg-white border-t border-ink-100">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <FadeInWhenVisible>
        <div className="mx-auto flex max-w-content flex-col items-center gap-stack-lg text-center">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.25rem)]">
            Discutons directement de vos enjeux de compétences.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-[62ch] [text-wrap:pretty]">
            Vous échangez avec les personnes qui conçoivent la méthode et la
            plateforme, pas avec un intermédiaire.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack-xs">
            <MagneticButton strength={16}>
              <Button to="/website/contact" variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                Planifier un échange stratégique
              </Button>
            </MagneticButton>
            <Button to="/website/diagnostic" variant="ghost" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
              Évaluer votre maturité SBO
            </Button>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingEquipe: React.FC = () => (
  <div className="bg-white">
    <SEOHead
      title="Les Fondateurs · The Learning Society"
      description="The Learning Society a été créée par un duo complémentaire : Pierre-Armand Dennery (ingénierie pédagogique, vision SBO) et Chloé Mimault (ingénierie IA, produit, data). Échangez directement avec les fondateurs."
      canonical="/website/equipe"
    />
    <Hero />
    <Adn />
    <Fondateurs />
    <Pourquoi />
    <CtaFinal />
  </div>
);

export default MarketingEquipe;
