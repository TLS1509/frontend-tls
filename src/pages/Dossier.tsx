/**
 * Dossier : Phase 10 Tier 2 refonte.
 *
 * Page dossier thématique long-form, tone warm.
 *
 * Structure (per Figma audit) :
 *  1. ReadingProgressBar fixed top + sticky glass header (back, ring, download CTA)
 *  2. Hero warm bounded (gradient subtle bg, breadcrumb 2-niveaux, emoji-bubble, h1, meta)
 *  3. IntroCallout (résumé exécutif, tone warm, quote icon)
 *  4. EditorialLayout asideFirst : TOC sticky gauche + sections numérotées
 *  5. KeyFindingCard grid 2-cols (Points clés)
 *  6. Conclusion brand gradient card
 *  7. Download CTA centered
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookmarksStore, useReadingProgressSync } from '../stores/persistence';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  Download,
  CalendarDays,
  UserRound,
  FileText,
  TrendingUp,
  Users,
  Zap,
  Star,
  CheckCircle2,
  BarChart2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Container } from '../components/layout';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { TableOfContents } from '../components/patterns/TableOfContents';
import type { TocItem } from '../components/patterns/TableOfContents';
import { KeyFindingCard } from '../components/patterns/KeyFindingCard';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import {
  ReadingProgressBar,
  ReadingProgressRing,
  useReadingProgress,
} from '../components/patterns/ReadingProgress';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TOC: TocItem[] = [
  { id: 'sec-contexte',     label: 'Contexte & enjeux 2026' },
  { id: 'sec-transfo',      label: "Transformation par l'IA" },
  { id: 'sec-points',       label: 'Points clés & enseignements' },
  { id: 'sec-data',         label: 'Données & Analyses' },
  { id: 'sec-conclusion',   label: 'Conclusions & recommandations' },
];

const KEY_FINDINGS = [
  { icon: <TrendingUp size={20} />, tone: 'warm' as const,    title: "Croissance de l'adoption", metric: { value: '+34 %', label: 'en 12 mois' },             desc: "d'organisations ayant intégré l'IA dans leurs parcours formation." },
  { icon: <Users size={20} />,      tone: 'brand' as const,   title: 'Formateurs impliqués',     metric: { value: '78 %', label: 'des formateurs' },          desc: 'utilisent au moins 1 outil IA hebdomadairement dans leur pratique.' },
  { icon: <Zap size={20} />,        tone: 'sun' as const,     title: 'Gain de productivité',     metric: { value: '3,2×', label: 'plus rapide' },             desc: 'pour créer des contenus pédagogiques avec l\'IA.' },
  { icon: <Star size={20} />,       tone: 'success' as const, title: 'Engagement apprenant',     metric: { value: '+41 %', label: 'd\'engagement' },           desc: 'sur les parcours IA-augmentés vs parcours traditionnels.' },
];

const BIG_STATS = [
  { value: '72 %',  label: 'des DRH priorisent la formation IA',  trend: 'Top 3 priorités 2026',     tone: 'brand' as const },
  { value: '3,2×',  label: 'gain productivité contenu',           trend: 'Mesuré sur 6 mois',         tone: 'warm'  as const },
  { value: '+41 %', label: 'engagement apprenant',                trend: 'Parcours IA-augmentés',     tone: 'sun'   as const },
  { value: '280 %', label: 'ROI moyen sur 18 mois',               trend: 'Organisations pionnières',  tone: 'warm'  as const },
];

const RECOMMENDATIONS = [
  'Déployer un diagnostic de maturité IA pour votre organisation',
  'Former les managers de premier niveau avant les équipes',
  'Mettre en place des boucles de feedback hebdomadaires sur les usages IA',
];

const STAT_TONE: Record<'brand' | 'warm' | 'sun', { value: string; trend: string }> = {
  brand: { value: 'text-primary-700',   trend: 'bg-primary-100 text-primary-700' },
  warm:  { value: 'text-secondary-700', trend: 'bg-secondary-100 text-secondary-700' },
  sun:   { value: 'text-accent-700',    trend: 'bg-accent-100 text-accent-800' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const Dossier: React.FC = () => {
  const navigate = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const bookmarkKey = `dossier-${id}`;
  const saved = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const progressPercent = useReadingProgress(articleRef);
  useReadingProgressSync(bookmarkKey, progressPercent);

  return (
    <div className="min-h-[100dvh] bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="warm" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <Container width="page" className="h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/veille')}
          >
            Retour à la veille
          </Button>

          <div className="flex items-center gap-stack-xs">
            <ReadingProgressRing targetRef={articleRef} tone="warm" size={36} />
            <Button variant="warm" size="sm" leadingIcon={<Download size={13} />} className="hidden sm:inline-flex">
              Télécharger
            </Button>
            <Button
              variant={saved ? 'primary' : 'ghost'}
              size="sm"
              iconOnly
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
              <Share2 size={15} />
            </Button>
          </div>
        </Container>
      </div>

      <div ref={articleRef}>
        {/* Hero warm bounded */}
        <header className="bg-gradient-to-br from-secondary-50 via-white to-accent-50/40 border-b border-ink-100">
          <Container width="page" className="py-section flex flex-col gap-stack-lg">
            <div className="flex items-start gap-stack sm:gap-stack-lg">
              <span aria-hidden className="shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary-100 border border-secondary-200 text-3xl sm:text-4xl">
                🧠
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-stack">
                <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-secondary-100 border border-secondary-200 text-micro font-bold uppercase tracking-wider text-secondary-800">
                  Dossier thématique
                </span>
                <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight max-w-content">
                  Transformation IA des parcours de formation professionnelle
                </h1>
                <div className="flex items-center gap-stack flex-wrap font-body text-caption text-ink-600">
                  <span className="inline-flex items-center gap-1.5"><UserRound size={13} /> The Learning Society</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> 15 janvier 2026</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><FileText size={13} /> 38 pages</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-1.5"><Download size={13} /> 2 847 téléchargements</span>
                </div>
              </div>
            </div>
          </Container>
        </header>

        {/* Body : EditorialLayout aside-left (TOC) + main */}
        <Container width="page" className="py-section">
          <EditorialLayout
            asideFirst
            aside={
              <div className="flex flex-col gap-stack-lg pt-2">
                <TableOfContents
                  tone="warm"
                  items={TOC}
                  scrollOffset={80}
                />
                <AuthorStrip
                  variant="compact"
                  name="The Learning Society"
                  role="Équipe Research"
                />
              </div>
            }
            main={
              <div className="flex flex-col gap-section">
                {/* Résumé Exécutif callout */}
                <IntroCallout tone="warm" eyebrow="Résumé exécutif" withQuoteIcon>
                  Ce dossier analyse en profondeur la transformation des parcours de formation sous
                  l'impulsion de l'intelligence artificielle. Basé sur une étude menée auprès de 1 800
                  responsables formation et 12 000 apprenants dans 8 pays européens, il documente les
                  pratiques émergentes, les freins identifiés et les leviers d'accélération.
                </IntroCallout>

                {/* Section 1 */}
                <section id="sec-contexte" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-secondary-200">
                    01 : Contexte & enjeux 2026
                  </h2>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    La transformation des organisations par l'IA générative est désormais un fait structurel,
                    pas une tendance conjoncturelle. En 2026, 72 % des DRH interrogés placent la montée en
                    compétences IA dans leur top 3 des priorités stratégiques. Cette pression crée un besoin
                    massif de refonte des dispositifs de formation : les parcours longs et standardisés
                    cèdent la place à des modules courts, personnalisés et disponibles en flux continu.
                  </p>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Les équipes Formation & Talent doivent non seulement former aux nouveaux outils, mais
                    repenser fondamentalement leur rôle et leur valeur ajoutée. Le formateur de demain est
                    avant tout un architecte de parcours et un curateur d'expériences.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="sec-transfo" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-secondary-200">
                    02 : Transformation par l'IA
                  </h2>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Notre enquête terrain révèle une polarisation nette entre les organisations qui ont engagé
                    une transformation structurée et celles qui expérimentent encore de façon isolée. Les
                    premières : 34 % de notre panel : ont mis en place des cellules dédiées, des indicateurs
                    de maturité IA et des budgets sanctuarisés.
                  </p>
                  <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    Le facteur différenciant n'est pas technologique : c'est la gouvernance. Les organisations
                    performantes ont systématiquement nommé un pilote formation IA avec un mandat clair et un
                    accès direct au CODIR.
                  </p>
                </section>

                {/* Section 3 : KeyFinding grid */}
                <section id="sec-points" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-secondary-200">
                    03 : Points clés & enseignements
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

                {/* Section 4 : Big stats */}
                <section id="sec-data" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-secondary-200">
                    04 : Données & Analyses
                  </h2>

                  <div className="grid grid-cols-2 gap-stack">
                    {BIG_STATS.map((stat, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-5 rounded-2xl border border-ink-100 bg-white">
                        <div className={`font-display text-h1 font-extrabold leading-none mb-stack-xs ${STAT_TONE[stat.tone].value}`}>
                          {stat.value}
                        </div>
                        <p className="m-0 font-body text-body-sm font-semibold text-ink-900 mb-stack-xs">
                          {stat.label}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-pill font-body text-micro font-semibold ${STAT_TONE[stat.tone].trend}`}>
                          {stat.trend}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-ink-50 border border-dashed border-ink-200 rounded-2xl h-[200px] flex flex-col items-center justify-center gap-stack-xs text-ink-400">
                    <BarChart2 size={32} className="opacity-50" />
                    <span className="font-body text-body-sm">
                      Graphique : Évolution de l'adoption IA en formation (2023–2026)
                    </span>
                  </div>
                </section>

                {/* Section 5 : Conclusion brand card */}
                <section id="sec-conclusion" className="flex flex-col gap-stack scroll-mt-24">
                  <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight pb-3 border-b border-secondary-200">
                    05 : Conclusions & recommandations
                  </h2>

                  <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 p-stack-lg sm:p-section text-white">
                    <div className="flex items-center gap-stack-xs mb-stack">
                      <CheckCircle2 size={20} className="text-white/80" />
                      <span className="font-body text-caption font-bold text-white/80 uppercase tracking-wider">
                        Conclusion principale
                      </span>
                    </div>
                    <p className="m-0 mb-stack-lg font-display text-h4 font-semibold text-white leading-relaxed">
                      La transformation IA des parcours de formation n'est plus optionnelle. Les organisations
                      qui agissent maintenant, avec méthode et gouvernance, bâtissent un avantage durable sur
                      l'acquisition et la rétention des talents.
                    </p>

                    <ul className="m-0 p-0 list-none flex flex-col gap-stack-xs">
                      {RECOMMENDATIONS.map((rec, i) => (
                        <li key={i} className="flex items-start gap-stack-xs">
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
        </Container>

        {/* Download CTA centered */}
        <div className="max-w-2xl mx-auto px-stack sm:px-stack-lg lg:px-section-lg pb-section">
          <div className="rounded-3xl border border-secondary-200 bg-gradient-to-br from-secondary-50 to-accent-50/40 p-section text-center flex flex-col items-center gap-stack">
            <span aria-hidden className="inline-flex items-center justify-center w-14 h-14 rounded-pill bg-secondary-500 text-white shadow-md">
              <Download size={22} />
            </span>
            <div className="flex flex-col gap-tight">
              <h3 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
                Télécharger le dossier complet
              </h3>
              <p className="m-0 font-body text-body-sm text-ink-600">
                PDF de 38 pages · Données exclusives · Mise à jour janvier 2026
              </p>
            </div>
            <Button variant="warm" size="lg" leadingIcon={<Download size={16} />}>
              Télécharger le PDF gratuit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dossier;
