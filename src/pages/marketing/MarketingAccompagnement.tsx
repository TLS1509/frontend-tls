/**
 * MarketingAccompagnement — page "Accompagnement STRIDE", /website/accompagnement.
 *
 * Reconstruite le 28/07/2026 depuis le copy arbitré
 * PAD-page-accompagnement-stride.md (docs/site/propositions-PAD/).
 * Tone primary (conseil / leadership). Libellé nav provisoire :
 * "Déploiement IA & SBO" (piste réunion 28/07, RECAP §2).
 *
 * Écarts copy documentés :
 *  - "D — Déploiement" → "D — Déployer" (FACTS-CANON A2 : les 6 mots officiels
 *    sont S'orienter · Tester · Réaliser · Intégrer · Déployer · Évoluer) ;
 *  - "Open Badges 2.0" (bonus) → "Open Badge" (FACTS-CANON F6).
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileText,
  Gift,
  Map,
  School,
  UserRound,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible, MagneticButton, MeshGradientBg } from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div
        aria-hidden
        className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-pill bg-primary-200/40 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col gap-stack-lg"
        >
          <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-primary-100 px-4 py-1.5 font-body text-caption font-bold text-primary-800 m-0">
            <Compass size={14} />
            Conseil & transformation SBO
          </p>
          <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 [text-wrap:balance] text-[clamp(2.5rem,5.5vw,4.25rem)]">
            La méthode STRIDE : opérez votre transition SBO et{' '}
            <span className="text-primary-700">déployez vos premières solutions IA.</span>
          </h1>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
            Un accompagnement sur-mesure pour faire sauter les verrous de la
            fiche de poste, cartographier vos compétences réelles selon
            l'échelle Dreyfus et déployer des copilotes IA métiers dans vos
            workflows opérationnels.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-stack-xs pt-stack-xs">
            <MagneticButton strength={14}>
              <Button to="/website/contact" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Réserver un Audit Flash STRIDE
              </Button>
            </MagneticButton>
            <Button href="#stride-etapes" variant="ghost" size="lg" trailingIcon={<ArrowUpRight size={18} />}>
              Découvrir la méthode en 6 étapes
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── 2. Le double piège ──────────────────────────────────────────────────────

const PIEGES = [
  {
    icon: <Bot size={22} />,
    title: "Déployer des outils IA à l'aveugle",
    detail:
      'Sans cadre ni référentiel de compétences, les licences dorment, le Shadow AI prolifère et le ROI reste introuvable.',
  },
  {
    icon: <FileText size={22} />,
    title: 'Passer au SBO avec des méthodes manuelles',
    detail:
      'Cartographier des compétences au tableur prend dix-huit mois : épuisement des équipes RH, rejet des managers, données mortes à la livraison.',
  },
];

const DoublePiege: React.FC = () => (
  <section className="relative bg-ink-900 text-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-section items-start">
        <div className="lg:col-span-5">
          <FadeInWhenVisible>
            <h2 className="font-display font-extrabold leading-[1.08] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,2.75rem)]">
              L'IA sans SBO est un gadget.{' '}
              <span className="text-primary-300">Le SBO sans IA est trop lent.</span>
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          {PIEGES.map((p, i) => (
            <FadeInWhenVisible key={p.title} delay={i * 0.08}>
              <div className="flex items-start gap-stack-lg border-t border-white/15 py-stack-lg first:border-t-0">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary-300">
                  {p.icon}
                </span>
                <div className="flex flex-col gap-stack-xs">
                  <h3 className="font-display text-h4 font-bold text-white m-0 leading-tight">{p.title}</h3>
                  <p className="font-body text-body text-white/70 leading-relaxed m-0 max-w-xl">{p.detail}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── 3. L'Audit Flash ────────────────────────────────────────────────────────

const AUDIT_LIVRABLES = [
  {
    icon: <ClipboardList size={20} />,
    title: 'État des lieux',
    detail: 'Vos pratiques de formation, vos référentiels et vos usages IA, photographiés sans complaisance.',
  },
  {
    icon: <Map size={20} />,
    title: 'Heatmap des Skill Gaps',
    detail: "Vos écarts de compétences critiques, positionnés sur l'échelle Dreyfus.",
  },
  {
    icon: <FileText size={20} />,
    title: 'Feuille de route STRIDE chiffrée',
    detail: 'Les étapes, les jalons et le budget de votre transition, noir sur blanc.',
  },
];

const AuditFlash: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Un diagnostic express pour cadrer votre feuille de route.
          </h2>
          <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0">
            L'Audit Flash SBO tient en une demi-journée à une journée, et livre
            trois documents que vous gardez, quoi qu'il arrive ensuite.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {AUDIT_LIVRABLES.map((l, i) => (
          <FadeInWhenVisible key={l.title} delay={i * 0.06} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                {l.icon}
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">{l.title}</h3>
              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{l.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 4. La méthodologie STRIDE — 6 étapes, vraie séquence ────────────────────

const ETAPES: { lettre: string; verbe: string; phase: string; livrable: string }[] = [
  {
    lettre: 'S',
    verbe: "S'orienter",
    phase: 'Audit & cadrage',
    livrable: "Rapport d'audit et feuille de route 12-24 mois",
  },
  {
    lettre: 'T',
    verbe: 'Tester',
    phase: 'POC pilote',
    livrable: 'Dispositif pilote validé sur un périmètre réel',
  },
  {
    lettre: 'R',
    verbe: 'Réaliser',
    phase: 'Ingénierie & copilotes',
    livrable: 'Référentiel dynamique et Agents IA configurés',
  },
  {
    lettre: 'I',
    verbe: 'Intégrer',
    phase: 'Connexion stack tech',
    livrable: 'Stack interconnectée (LMS, SIRH, outils métiers)',
  },
  {
    lettre: 'D',
    verbe: 'Déployer',
    phase: 'Mise en production',
    livrable: "Dispositif déployé et dashboard d'engagement",
  },
  {
    lettre: 'E',
    verbe: 'Évoluer',
    phase: 'Amélioration par la donnée',
    livrable: 'Executive Dashboard et backlog mensuel',
  },
];

const Methodologie: React.FC = () => (
  <section id="stride-etapes" className="bg-primary-50/50 scroll-mt-24">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <div className="max-w-3xl flex flex-col gap-stack">
          <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
            Six étapes, un livrable tangible à chaque jalon.
          </h2>
        </div>
      </FadeInWhenVisible>

      <ol className="flex flex-col m-0 p-0 list-none">
        {ETAPES.map((e, i) => (
          <FadeInWhenVisible key={e.lettre} delay={i * 0.04}>
            <li className="grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[auto_220px_minmax(0,1fr)] items-center gap-stack md:gap-section border-t border-primary-200/70 py-stack-lg first:border-t-0">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-700 font-display text-h3 font-extrabold text-white">
                {e.lettre}
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-display text-h4 font-extrabold text-ink-900 m-0 leading-tight">{e.verbe}</h3>
                <span className="font-body text-caption font-bold text-primary-700">{e.phase}</span>
              </div>
              <p className="col-span-2 md:col-span-1 font-body text-body text-ink-600 leading-relaxed m-0">
                {e.livrable}
              </p>
            </li>
          </FadeInWhenVisible>
        ))}
      </ol>

      <FadeInWhenVisible>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack rounded-2xl bg-white p-stack-lg shadow-card">
          <p className="font-body text-body text-ink-600 m-0 max-w-xl">
            Pourquoi ces six étapes ? La science derrière STRIDE : échelle
            Dreyfus, méthode EDRACT de C-Campus et augmentation cognitive.
          </p>
          <Button to="/website/methode" variant="ghost" size="md" trailingIcon={<ArrowRight size={16} />}>
            Lire la Méthode TLS
          </Button>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

// ─── 5. Ce que vous obtenez ──────────────────────────────────────────────────

const OBTENEZ = [
  'Une feuille de route SBO & IA arbitrée et chiffrée',
  'Un Passeport de compétences dynamique pour vos équipes',
  'Des copilotes et assistants IA opérationnels dans vos workflows',
  'Un tableau de pilotage pour votre direction',
];

const Obtenez: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-section items-start">
        <div className="lg:col-span-5 flex flex-col gap-stack-lg">
          <FadeInWhenVisible>
            <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.2vw,3.25rem)]">
              Un cadre stratégique clair et des briques IA immédiatement
              opérationnelles.
            </h2>
          </FadeInWhenVisible>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <ul className="flex flex-col m-0 p-0 list-none">
            {OBTENEZ.map((o, i) => (
              <FadeInWhenVisible key={o} delay={i * 0.05}>
                <li className="flex items-start gap-stack border-t border-ink-200/70 py-stack first:border-t-0">
                  <CheckCircle2 size={22} className="text-primary-700 shrink-0 mt-0.5" />
                  <span className="font-body text-body-lg text-ink-800">{o}</span>
                </li>
              </FadeInWhenVisible>
            ))}
          </ul>
          <FadeInWhenVisible delay={0.1}>
            <div className="flex items-start gap-stack rounded-2xl bg-accent-50 p-stack-lg">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-800">
                <Gift size={20} />
              </span>
              <p className="font-body text-body text-ink-800 leading-relaxed m-0">
                <span className="font-bold">Bonus :</span> un an d'accès offert
                à la Learning App Pro TLS pour les cohortes pilotes, avec moteur
                d'ancrage, gestion de l'atrophie à 90 jours et Open Badge.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  </section>
);

// ─── 6. Pour qui ─────────────────────────────────────────────────────────────

const PROFILS = [
  {
    icon: <UserRound size={20} />,
    title: 'DRH & Directeurs L&D',
    detail: 'Vous voulez sortir du catalogue et piloter des compétences réelles.',
  },
  {
    icon: <Building2 size={20} />,
    title: 'CEO, COO & Directeurs de la Transformation',
    detail: 'Vous cherchez un déploiement IA qui produise un ROI observable.',
  },
  {
    icon: <School size={20} />,
    title: 'Organismes de Formation',
    detail: 'Vous voulez faire évoluer votre offre vers la preuve de compétence.',
  },
];

const PourQui: React.FC = () => (
  <section className="bg-white border-t border-ink-100">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 flex flex-col gap-section-lg">
      <FadeInWhenVisible>
        <h2 className="font-display font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0 [text-wrap:balance] text-[clamp(1.9rem,3.6vw,2.75rem)] max-w-2xl">
          Conçu pour celles et ceux qui portent la transformation.
        </h2>
      </FadeInWhenVisible>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {PROFILS.map((p, i) => (
          <FadeInWhenVisible key={p.title} delay={i * 0.06} direction="up">
            <div className="flex h-full flex-col gap-stack border-t-2 border-primary-200 pt-stack-lg">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                {p.icon}
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight">{p.title}</h3>
              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">{p.detail}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  </section>
);

// ─── 7. CTA final ────────────────────────────────────────────────────────────

const CtaFinal: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
      <FadeInWhenVisible>
        <div className="relative overflow-hidden rounded-2xl bg-ink-900 text-white px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <MeshGradientBg tone="ink" intensity="subtle" />
          <div className="relative max-w-content flex flex-col gap-stack-lg">
            <h2 className="font-display font-extrabold text-white leading-[1.04] tracking-tight m-0 [text-wrap:balance] text-[clamp(2rem,4.5vw,3.5rem)]">
              Déployez le duo SBO + IA dans votre organisation.
            </h2>
            <p className="font-body text-body-lg text-white/80 leading-relaxed m-0 max-w-2xl">
              Un premier échange avec les fondateurs suffit à cadrer la suite :
              périmètre, jalons, budget.
            </p>
            <div className="flex flex-wrap items-center gap-stack-xs pt-stack">
              <MagneticButton strength={16}>
                <Button to="/website/contact" variant="secondary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                  Demander un Audit Flash STRIDE
                </Button>
              </MagneticButton>
              <Button to="/website/learning-app" variant="glass" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                Découvrir la Learning App
              </Button>
            </div>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  </section>
);

export const MarketingAccompagnement: React.FC = () => (
  <div className="bg-white">
    <SEOHead
      title="Accompagnement STRIDE · The Learning Society"
      description="La méthode STRIDE en 6 étapes : audit, pilote, ingénierie, intégration, déploiement, amélioration continue. Opérez votre transition Skills-Based Organization et déployez vos premières solutions IA."
      canonical="/website/accompagnement"
    />
    <Hero />
    <DoublePiege />
    <AuditFlash />
    <Methodologie />
    <Obtenez />
    <PourQui />
    <CtaFinal />
  </div>
);

export default MarketingAccompagnement;
