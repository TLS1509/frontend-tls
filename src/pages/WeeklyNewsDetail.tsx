/**
 * WeeklyNewsDetail : Actu individuelle issue de la newsletter hebdo.
 *
 * Accessible depuis :
 *  - La page hub /veille (type 'actu')
 *  - La page /veille/weekly-newsletter (édition hebdo)
 *
 * Navigation : navigate(-1) pour retourner à la source naturellement.
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookmarksStore } from '../stores/persistence';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  CalendarDays,
  Clock3,
  TrendingUp,
  ExternalLink,
  Tag as TagIcon,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { IntroCallout } from '../components/patterns/IntroCallout';
import {
  ReadingProgressBar,
  ReadingProgressRing,
} from '../components/patterns/ReadingProgress';
import { Container } from '../components/layout';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const ACTU = {
  id: '1',
  week: 'Semaine #17',
  date: 'Lundi 28 avril 2026',
  category: 'IA & Pédagogie',
  priority: 'Priorité forte',
  title: 'IA générative et formation : où en sommes-nous en 2026 ?',
  excerpt:
    "L'essentiel de l'actualité en une page : impact, opportunités à court terme et actions recommandées pour les équipes formation.",
  readTime: '6 min',
  sourceLabel: 'MIT Technology Review',
  sourceUrl: 'https://www.technologyreview.com',
  tags: ['IA générative', 'Formation pro', 'EdTech', '2026'],
  body: [
    {
      heading: 'Ce qui s\'est passé',
      text: "Une méta-analyse portant sur 340 dispositifs de formation intégrant l'IA générative publiée ce mois-ci confirme une tendance que les practitioners observaient depuis 18 mois : le gain de temps moyen sur la production de contenu pédagogique dépasse 40 %, mais l'impact sur les résultats apprenants reste très variable selon le niveau d'accompagnement humain maintenu.",
    },
    {
      heading: 'Pourquoi c\'est important',
      text: "Pour les responsables formation, cela confirme que l'IA n'est pas un remplacement du formateur mais un levier de scalabilité : à condition de préserver les moments de guidance personnalisée. Les organisations qui ont sabré les budgets formateurs tout en déployant de l'IA rapportent des résultats décevants.",
    },
    {
      heading: 'Ce que vous pouvez faire maintenant',
      text: "Trois actions concrètes : (1) Auditer vos dispositifs existants pour identifier où l'IA peut absorber la production répétitive (quiz, résumés, transcriptions). (2) Renforcer les rituels d'accompagnement synchrone là où l'IA prend du terrain. (3) Mettre en place un indicateur de qualité perçue par les apprenants pour détecter les glissements rapidement.",
    },
  ],
};

const RELATED = [
  { id: 'r1', title: 'Dossier complet : transformation IA des parcours',  description: 'Dossier · 22 min',   tone: 'warm'  as const, href: '/veille/dossier/1' },
  { id: 'r2', title: 'Tutoriel : construire un prompt pédagogique',        description: 'Vidéo · 12 min',     tone: 'sun'   as const, href: '/veille/video-tutorial/1' },
  { id: 'r3', title: 'L\'essor du microlearning dans les entreprises',     description: 'Article · 4 min',    tone: 'brand' as const, href: '/veille/article/2' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const WeeklyNewsDetail: React.FC = () => {
  const navigate   = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const bookmarkKey = `weekly-news-${id}`;
  const saved   = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  return (
    <div className="min-h-screen bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <Container width="page" className="h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
          <div className="flex items-center gap-stack-xs">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={36} />
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

      <div ref={articleRef} className="max-w-page mx-auto px-stack sm:px-stack-lg lg:px-section-lg py-section">
        <EditorialLayout
          main={
            <div className="flex flex-col gap-section">

              {/* Hero éditorial */}
              <header className="flex flex-col gap-stack">
                {/* Eyebrow */}
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-primary-500 text-white font-body text-micro font-bold uppercase tracking-widest">
                    <TrendingUp size={11} /> {ACTU.week}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-ink-100 text-ink-600 font-body text-micro font-semibold">
                    {ACTU.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-danger-bg text-danger-fg font-body text-micro font-semibold">
                    {ACTU.priority}
                  </span>
                </div>

                <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight">
                  {ACTU.title}
                </h1>

                <div className="flex items-center gap-stack font-body text-caption text-ink-500 flex-wrap border-b border-ink-100 pb-stack">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} /> {ACTU.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} /> {ACTU.readTime}
                  </span>
                </div>
              </header>

              {/* Intro callout */}
              <IntroCallout tone="brand">
                {ACTU.excerpt}
              </IntroCallout>

              {/* Featured image placeholder */}
              <div className="rounded-xl border border-ink-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50/30 aspect-video flex items-center justify-center font-body text-caption text-ink-400 shadow-xs">
                Visuel / illustration principale
              </div>

              {/* Body sections */}
              <div className="flex flex-col gap-stack-lg">
                {ACTU.body.map((section, i) => (
                  <section key={i} className="flex flex-col gap-3">
                    <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
                      {section.heading}
                    </h2>
                    <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                      {section.text}
                    </p>
                  </section>
                ))}
              </div>

              {/* Tags + source */}
              <footer className="flex flex-col gap-3 pt-stack border-t border-ink-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <TagIcon size={13} className="text-ink-400 shrink-0" />
                  {ACTU.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-pill bg-ink-100 font-body text-micro text-ink-600 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  trailingIcon={<ExternalLink size={13} />}
                  onClick={() => window.open(ACTU.sourceUrl, '_blank', 'noopener')}
                  className="self-start"
                >
                  Lire la source : {ACTU.sourceLabel}
                </Button>
              </footer>

            </div>
          }
          aside={
            <SectionCard title="À lire aussi" titleIcon={<TrendingUp size={16} />}>
              <RelatedItemList
                items={RELATED.map((r) => ({
                  ...r,
                  onClick: () => navigate(r.href),
                }))}
              />
            </SectionCard>
          }
        />
      </div>
    </div>
  );
};

export default WeeklyNewsDetail;
