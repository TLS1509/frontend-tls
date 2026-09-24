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
import { MetaPill } from '../components/ui/MetaPill';
import { PageShell } from '../components/layout';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { TableOfContents } from '../components/patterns/TableOfContents';
import type { TocItem } from '../components/patterns/TableOfContents';
import { KeyFindingCard } from '../components/patterns/KeyFindingCard';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
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
  { id: 'sec-data',         label: 'Données & analyses' },
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

/* Une couleur de marque ne porte du texte qu'au cran 800 ; la tendance est
   une donnée : MetaPill au ton du chiffre. */
const STAT_TONE: Record<'brand' | 'warm' | 'sun', { value: string; pill: 'brand' | 'warm' | 'sun' }> = {
  brand: { value: 'text-primary-800',   pill: 'brand' },
  warm:  { value: 'text-secondary-800', pill: 'warm' },
  sun:   { value: 'text-accent-800',    pill: 'sun' },
};

/* Titre de section numéroté : h2 28 (il était à 20), le numéro en encre de
   méta, séparé par une espace — plus « 01 : », reste d'un tiret remplacé. */
const SectionTitle: React.FC<{ num: string; children: React.ReactNode }> = ({ num, children }) => (
  <h2 className="font-display text-h2 text-ink-900 pb-stack-sm border-b border-secondary-200">
    <span className="tabular-nums text-ink-600">{num}</span>{'\u00A0\u00A0'}{children}
  </h2>
);

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
    <PageShell width="page" noPadTop={true} className="bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="warm" />

      <ReaderContextStrip
        title="Transformation IA des parcours de formation professionnelle"
        onBack={() => navigate('/veille')}
        backLabel="Retour à la veille"
        trailing={
          <>
            <ReadingProgressRing targetRef={articleRef} tone="warm" size={32} />
            <Button emphasis="soft" tone="warm" size="sm" leadingIcon={<Download size={14} />} className="max-sm:hidden">
              Télécharger
            </Button>
            <Button
              emphasis={saved ? 'soft' : 'outline'}
              iconOnly
              aria-label={saved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
            </Button>
            <Button emphasis="outline" iconOnly aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </>
        }
      />

      <div ref={articleRef}>
        {/* Hero warm bounded */}
        <header className="bg-gradient-to-br from-secondary-50 via-white to-accent-50/40 border-b border-ink-100">
          {/* En-tête sur le bord gauche de la page : l'émoji 🧠 en pastille
              décalait le titre de 80 px sur un second axe. Type (MetaPill) → 8
              → h1 → 12 → méta. */}
          <PageShell width="page" className="py-section flex flex-col gap-stack-lg">
              <div className="flex flex-col">
                <MetaPill text="Dossier thématique" tone="warm" className="self-start" />
                <h1 className="mt-stack-xs font-display text-h1 text-ink-900 max-w-content">
                  Transformation IA des parcours de formation professionnelle
                </h1>
                <div className="mt-stack-sm flex items-center gap-stack flex-wrap font-body text-caption text-ink-600 tabular-nums">
                  <span className="inline-flex items-center gap-stack-2xs"><UserRound size={14} /> The Learning Society</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-stack-2xs"><CalendarDays size={14} /> 15 janvier 2026</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-stack-2xs"><FileText size={14} /> 38 pages</span>
                  <span aria-hidden className="text-ink-300">·</span>
                  <span className="inline-flex items-center gap-stack-2xs"><Download size={14} /> 2 847 téléchargements</span>
                </div>
              </div>
          </PageShell>
        </header>

        {/* Body : EditorialLayout aside-left (TOC) + main */}
        <PageShell width="page">
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
              <div className="flex flex-col gap-page">
                {/* Résumé Exécutif callout */}
                <IntroCallout tone="warm" eyebrow="Résumé exécutif" withQuoteIcon>
                  Ce dossier analyse en profondeur la transformation des parcours de formation sous
                  l'impulsion de l'intelligence artificielle. Basé sur une étude menée auprès de 1 800
                  responsables formation et 12 000 apprenants dans 8 pays européens, il documente les
                  pratiques émergentes, les freins identifiés et les leviers d'accélération.
                </IntroCallout>

                {/* Section 1 */}
                <section id="sec-contexte" className="flex flex-col gap-stack scroll-mt-24">
                  <SectionTitle num="01">Contexte & enjeux 2026</SectionTitle>
                  <p className="font-body text-body text-ink-900 max-w-prose">
                    La transformation des organisations par l'IA générative est désormais un fait structurel,
                    pas une tendance conjoncturelle. En 2026, 72 % des DRH interrogés placent la montée en
                    compétences IA dans leur top 3 des priorités stratégiques. Cette pression crée un besoin
                    massif de refonte des dispositifs de formation : les parcours longs et standardisés
                    cèdent la place à des modules courts, personnalisés et disponibles en flux continu.
                  </p>
                  <p className="font-body text-body text-ink-900 max-w-prose">
                    Les équipes Formation & Talent doivent non seulement former aux nouveaux outils, mais
                    repenser fondamentalement leur rôle et leur valeur ajoutée. Le formateur de demain est
                    avant tout un architecte de parcours et un curateur d'expériences.
                  </p>
                </section>

                {/* Section 2 */}
                <section id="sec-transfo" className="flex flex-col gap-stack scroll-mt-24">
                  <SectionTitle num="02">Transformation par l'IA</SectionTitle>
                  <p className="font-body text-body text-ink-900 max-w-prose">
                    Notre enquête terrain révèle une polarisation nette entre les organisations qui ont engagé
                    une transformation structurée et celles qui expérimentent encore de façon isolée. Les
                    premières : 34 % de notre panel : ont mis en place des cellules dédiées, des indicateurs
                    de maturité IA et des budgets sanctuarisés.
                  </p>
                  <p className="font-body text-body text-ink-900 max-w-prose">
                    Le facteur différenciant n'est pas technologique : c'est la gouvernance. Les organisations
                    performantes ont systématiquement nommé un pilote formation IA avec un mandat clair et un
                    accès direct au CODIR.
                  </p>
                </section>

                {/* Section 3 : KeyFinding grid */}
                <section id="sec-points" className="flex flex-col gap-stack scroll-mt-24">
                  <SectionTitle num="03">Points clés & enseignements</SectionTitle>
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
                  <SectionTitle num="04">Données & analyses</SectionTitle>

                  <div className="grid grid-cols-2 gap-stack">
                    {BIG_STATS.map((stat, i) => (
                      /* Chiffre → 4 → libellé → 12 → tendance. Rayon 20 et padding
                         24 d'une carte (elle était à 14). */
                      <div key={i} className="flex flex-col items-center text-center p-stack-lg rounded-xl border border-ink-100 bg-white">
                        <p className={`font-display text-h1 tabular-nums ${STAT_TONE[stat.tone].value}`}>
                          {stat.value}
                        </p>
                        <p className="mt-stack-3xs font-body text-body font-semibold text-ink-900">
                          {stat.label}
                        </p>
                        <MetaPill text={stat.trend} tone={STAT_TONE[stat.tone].pill} className="mt-stack-sm" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-ink-50 border border-dashed border-ink-200 rounded-xl h-[200px] flex flex-col items-center justify-center gap-stack-xs text-ink-600">
                    <BarChart2 size={32} className="opacity-50" aria-hidden="true" />
                    <span className="font-body text-body">
                      Graphique : Évolution de l'adoption IA en formation (2023–2026)
                    </span>
                  </div>
                </section>

                {/* Section 5 : Conclusion brand card */}
                <section id="sec-conclusion" className="flex flex-col gap-stack scroll-mt-24">
                  <SectionTitle num="05">Conclusions & recommandations</SectionTitle>

                  <div className="rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 p-stack-lg sm:p-section text-white">
                    {/* Libellé (13/600, il était en capitales espacées) → 8 → la
                        conclusion, un chapô 18/600 (elle était un paragraphe en
                        League Spartan 20/600 à interligne forcé) → 24 → les
                        recommandations, en blanc plein (texte sur fond 700). */}
                    <p className="flex items-center gap-stack-xs font-body text-caption font-semibold text-white">
                      <CheckCircle2 size={16} className="text-white" aria-hidden="true" />
                      Conclusion principale
                    </p>
                    <p className="mt-stack-xs mb-stack-lg font-body text-body-lg font-semibold text-white max-w-prose">
                      La transformation IA des parcours de formation n'est plus optionnelle. Les organisations
                      qui agissent maintenant, avec méthode et gouvernance, bâtissent un avantage durable sur
                      l'acquisition et la rétention des talents.
                    </p>

                    <ul className="flex flex-col gap-stack-xs">
                      {RECOMMENDATIONS.map((rec, i) => (
                        <li key={i} className="flex items-start gap-stack-xs">
                          <ArrowRight size={16} className="text-white shrink-0 mt-[5px]" aria-hidden="true" />
                          <span className="font-body text-body text-white">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Télécharger — dans la colonne de l'article, calé à gauche
                    comme elle : centré sous la page, le bloc flottait sur un
                    autre axe que le texte qu'il conclut. Pastille carrée (le
                    rond est réservé aux personnes). */}
                <div className="rounded-xl border border-secondary-200 bg-gradient-to-br from-secondary-50 to-accent-50/40 p-stack-lg sm:p-section flex flex-col items-start gap-stack">
                  <span aria-hidden className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary-700 text-white">
                    <Download size={20} />
                  </span>
                  <div className="flex flex-col gap-stack-xs">
                    <h3 className="font-display text-h3 text-ink-900">
                      Télécharger le dossier complet
                    </h3>
                    <p className="font-body text-body text-ink-700">
                      PDF de 38 pages · Données exclusives · Mise à jour janvier 2026
                    </p>
                  </div>
                  <Button emphasis="soft" tone="warm" size="lg" leadingIcon={<Download size={16} />} className="mt-stack-xs">
                    Télécharger le PDF gratuit
                  </Button>
                </div>
              </div>
            }
          />
        </PageShell>

      </div>
    </PageShell>
  );
};

export default Dossier;
