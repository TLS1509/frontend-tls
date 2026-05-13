/**
 * VeilleContent — Phase 10 Tier 2 refonte.
 *
 * Page rapport / étude de marché. Tone brand (data, étude).
 *
 * Structure :
 *  1. ReadingProgressBar + sticky glass header (back + ring + download)
 *  2. Hero brand bounded (icon-bubble + eyebrow + h1 + meta)
 *  3. IntroCallout brand (résumé exécutif)
 *  4. EditorialLayout asideFirst — TOC sticky gauche + sections
 *  5. KeyFindingCard grid 2-cols (Points clés)
 *  6. Big stats (data) + chart placeholder
 *  7. Conclusion brand card
 *  8. Download CTA centered
 */

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  UserRound,
  CalendarDays,
  FileText,
  Download,
  TrendingUp,
  Users,
  Zap,
  Star,
  CheckCircle2,
  Bookmark,
  Share2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { TableOfContents } from '../components/patterns/TableOfContents';
import type { TocItem } from '../components/patterns/TableOfContents';
import { KeyFindingCard } from '../components/patterns/KeyFindingCard';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import {
  ReadingProgressBar,
  ReadingProgressRing,
} from '../components/patterns/ReadingProgress';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TOC: TocItem[] = [
  { id: 'sec-marche',      label: 'État du marché 2026' },
  { id: 'sec-adoption',    label: "Adoption de l'IA par les formateurs" },
  { id: 'sec-points',      label: 'Points clés & enseignements' },
  { id: 'sec-data',        label: 'Données & Analyses' },
  { id: 'sec-conclusion',  label: 'Conclusions & recommandations' },
];

const KEY_FINDINGS = [
  { icon: <TrendingUp size={20} />, tone: 'brand' as const,   title: 'Croissance du marché',     metric: { value: '+34 %', label: 'en 12 mois' },     desc: "d'adoption de l'IA en formation professionnelle." },
  { icon: <Users size={20} />,      tone: 'warm' as const,    title: 'Formateurs impliqués',    metric: { value: '78 %', label: 'des formateurs' }, desc: 'utilisent au moins 1 outil IA hebdomadairement.' },
  { icon: <Zap size={20} />,        tone: 'sun' as const,     title: 'Gain de productivité',    metric: { value: '3,2×', label: 'plus rapide' },    desc: 'pour créer des contenus pédagogiques.' },
  { icon: <Star size={20} />,       tone: 'success' as const, title: 'Engagement apprenant',    metric: { value: '+41 %', label: "d'engagement" },   desc: 'sur les parcours IA-augmentés.' },
];

const BIG_STATS = [
  { value: '78 %', label: "des formateurs utilisent l'IA",    trend: '+12 pts vs 2025',         tone: 'brand' as const },
  { value: '3,2×', label: 'gain productivité contenu',         trend: 'Mesuré sur 6 mois',        tone: 'warm'  as const },
  { value: '+41 %', label: 'engagement apprenant',             trend: 'Parcours IA-augmentés',    tone: 'sun'   as const },
  { value: '12 h', label: 'économisées / semaine',             trend: 'Par formateur en moyenne', tone: 'brand' as const },
];

const RECOMMENDATIONS = [
  "Commencer par 1 outil, maîtriser avant d'élargir",
  'Former les formateurs avant de former les apprenants',
  "Mesurer l'impact dès la première expérimentation",
];

const STAT_TONE: Record<'brand' | 'warm' | 'sun', { value: string; trend: string }> = {
  brand: { value: 'text-primary-700',   trend: 'bg-primary-100 text-primary-700' },
  warm:  { value: 'text-secondary-700', trend: 'bg-secondary-100 text-secondary-700' },
  sun:   { value: 'text-accent-700',    trend: 'bg-accent-100 text-accent-800' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const VeilleContent: React.FC = () => {
  const navigate = useNavigate();
  const articleRef = useRef<HTMLElement>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/veille')}
          >
            Retour à la veille
          </Button>

          <div className="flex items-center gap-2">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={36} />
            <Button variant="primary" size="sm" leadingIcon={<Download size={13} />} className="hidden sm:inline-flex">
              Télécharger
            </Button>
            <Button
              variant={saved ? 'primary' : 'ghost'}
              size="sm"
              iconOnly
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => setSaved((s) => !s)}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
              <Share2 size={15} />
            </Button>
          </div>
        </div>
      </div>

      <main ref={articleRef}>
        {/* Hero brand */}
        <header className="bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border-b border-ink-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-stack-lg">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 font-body text-micro text-ink-500">
              <button type="button" onClick={() => navigate('/veille')} className="hover:text-primary-700 bg-transparent border-0 cursor-pointer p-0">
                Veille
              </button>
              <ChevronRight size={10} aria-hidden />
              <span className="text-ink-700">Étude de marché</span>
            </nav>

            <div className="flex items-start gap-4 sm:gap-stack-lg">
              <span aria-hidden className="shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-100 border border-primary-200 text-primary-700">
                <BarChart2 size={26} strokeWidth={2.2} />
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-stack">
                <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-primary-100 border border-primary-200 text-micro font-bold uppercase tracking-wider text-primary-700">
                  Étude de marché
                </span>
                <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight max-w-3xl">
                  L'IA générative dans la formation professionnelle
                </h1>
                <div className="flex items-center gap-4 flex-wrap font-body text-caption text-ink-600">
                  <span className="inline-flex items-center gap-1.5"><UserRound size={13} /> The Learning Society</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> 25 avril 2026</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><FileText size={13} /> 32 pages</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><Download size={13} /> 234 téléchargements</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section">
          <EditorialLayout
            asideFirst
            aside={
              <div className="flex flex-col gap-stack-lg pt-2">
                <TableOfContents
                  tone="brand"
                  items={TOC}
                  scrollOffset={80}
                />
                <AuthorStrip
                  variant="compact"
                  name="The Learning Society"
                  role="Research Lab"
                />
              </div>
            }
            main={
              <div className="flex flex-col gap-section">
                <IntroCallout tone="brand" eyebrow="Résumé exécutif" withQuoteIcon>
                  Cette étude analyse l'impact de l'IA générative sur les pratiques pédagogiques en
                  France. Basée sur 450 entretiens avec des formateurs professionnels, elle révèle
                  une adoption accélérée (+34 % en 12 mois), des gains de productivité significatifs
                  (3,2× sur la création de contenu) et une amélioration mesurée de l'engagement
                  apprenant.
                </IntroCallout>

                {/* Section 1 */}
                <section id="sec-marche" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-primary-200">
                    01 — État du marché 2026
                  </h2>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Le marché de la formation professionnelle en France traverse une mutation
                    profonde sous l'impulsion de l'intelligence artificielle générative. Après une
                    phase d'expérimentation timide en 2024, l'adoption s'est accélérée : 78 % des
                    formateurs déclarent utiliser au moins un outil IA chaque semaine, contre 44 %
                    en 2025.
                  </p>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Les outils les plus utilisés restent les assistants de génération de contenu
                    (ChatGPT, Claude, Gemini) suivis des plateformes spécialisées en e-learning
                    augmenté. La conception de quiz, d'exercices et de supports visuels dominent
                    les cas d'usage déclarés.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="sec-adoption" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-primary-200">
                    02 — Adoption de l'IA par les formateurs
                  </h2>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Notre enquête révèle 3 profils types : (1) les "early adopters intégrés", qui
                    ont structuré leur usage autour de workflows reproductibles (28 %) ; (2) les
                    "expérimentateurs ponctuels" qui utilisent l'IA au cas par cas (46 %) ; (3) les
                    "réfractaires actifs" qui rejettent l'outil pour des raisons éthiques ou
                    pédagogiques (26 %).
                  </p>
                </section>

                {/* Section 3 — KeyFindings */}
                <section id="sec-points" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-primary-200">
                    03 — Points clés & enseignements
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
                    {KEY_FINDINGS.map((k, i) => (
                      <KeyFindingCard
                        key={i}
                        tone={k.tone}
                        icon={k.icon}
                        title={k.title}
                        metric={k.metric}
                        description={k.desc}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 4 — Big stats */}
                <section id="sec-data" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-primary-200">
                    04 — Données & Analyses
                  </h2>

                  <div className="grid grid-cols-2 gap-stack">
                    {BIG_STATS.map((stat, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl border border-ink-100 bg-white">
                        <div className={`font-display text-h1 font-extrabold leading-none mb-2 ${STAT_TONE[stat.tone].value}`}>
                          {stat.value}
                        </div>
                        <p className="m-0 font-body text-body-sm font-semibold text-ink-900 mb-2">
                          {stat.label}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-pill font-body text-micro font-semibold ${STAT_TONE[stat.tone].trend}`}>
                          {stat.trend}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-ink-50 border border-dashed border-ink-200 rounded-2xl h-[200px] flex flex-col items-center justify-center gap-2 text-ink-400">
                    <BarChart2 size={32} className="opacity-50" />
                    <span className="font-body text-body-sm">
                      Graphique — Évolution de l'adoption IA (2024–2026)
                    </span>
                  </div>
                </section>

                {/* Section 5 — Conclusion */}
                <section id="sec-conclusion" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-primary-200">
                    05 — Conclusions & recommandations
                  </h2>

                  <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={20} className="text-white/80" />
                      <span className="font-body text-caption font-bold text-white/80 uppercase tracking-wider">
                        Conclusion principale
                      </span>
                    </div>
                    <p className="m-0 mb-stack-lg font-display text-h4 font-semibold text-white leading-relaxed">
                      L'IA générative n'est plus un gadget mais un levier stratégique pour les
                      formateurs. Ceux qui l'intègrent maintenant bénéficieront d'un avantage
                      compétitif durable — en productivité, en personnalisation et en impact.
                    </p>

                    <ul className="m-0 p-0 list-none flex flex-col gap-2">
                      {RECOMMENDATIONS.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight size={14} className="text-white/60 shrink-0 mt-1" />
                          <span className="font-body text-body-sm text-white/95">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            }
          />
        </div>

        {/* Download CTA */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 pb-section">
          <div className="rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-50/40 p-8 text-center flex flex-col items-center gap-stack">
            <span aria-hidden className="inline-flex items-center justify-center w-14 h-14 rounded-pill bg-primary-600 text-white shadow-md">
              <Download size={22} />
            </span>
            <div className="flex flex-col gap-tight">
              <h3 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
                Télécharger le rapport complet
              </h3>
              <p className="m-0 font-body text-body-sm text-ink-600">
                PDF de 32 pages · Données exclusives · Mise à jour avril 2026
              </p>
            </div>
            <Button variant="primary" size="lg" leadingIcon={<Download size={16} />}>
              Télécharger le PDF gratuit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VeilleContent;
