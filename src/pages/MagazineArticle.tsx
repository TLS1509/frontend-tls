/**
 * MagazineArticle : Phase 10 Tier 2 refonte.
 *
 * Article du Magazine TLS, tone brand (gradient text title signature).
 *
 * Structure (per Figma audit) :
 *  1. ReadingProgressBar + sticky glass header (back + ring + bookmark/share)
 *  2. Hero bounded (category pill brand + gradient text H1 + meta strip)
 *  3. AuthorStrip expanded
 *  4. Featured image
 *  5. IntroCallout brand
 *  6. Body blocks
 *  7. Quote callout
 *  8. Aside : related items (autres articles de l'édition)
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookmarksStore, useReadingProgressSync } from '../stores/persistence';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  CalendarDays,
  Clock3,
  Tag as TagIcon,
  BookOpen,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { SectionCard } from '../components/patterns/SectionCard';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { Container } from '../components/layout';
import {
  ReadingProgressBar,
  ReadingProgressRing,
  useReadingProgress,
} from '../components/patterns/ReadingProgress';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const ARTICLE = {
  category: 'Technologie',
  title: "L'IA générative redéfinit la conception pédagogique",
  excerpt:
    "Comment l'IA générative transforme concrètement le métier d'ingénieur pédagogique : de la production de contenu à la personnalisation des parcours.",
  publishedAt: 'Avril 2026',
  readTime: '14 min de lecture',
  pages: 'pp. 4–12',
  author: {
    name: 'Pierre Leclerc',
    role: 'Lead Pédagogie · The Learning Society',
  },
  tags: ['IA générative', 'Ingénierie pédagogique', 'Personnalisation', 'LMS'],
};

const PARAGRAPHS = [
  "Depuis 2023, la chaîne de production des contenus de formation s'est radicalement transformée. Là où il fallait six semaines pour concevoir un module complet : analyse de besoin, scénarisation, story-board, production multimédia, tests : il faut désormais huit jours en moyenne dans les organisations qui ont structuré leur usage de l'IA générative.",
  "Le gain ne se mesure pas qu'en vitesse. La qualité progresse aussi : paradoxalement. Les outils IA fournissent une première version exploitable très rapidement, ce qui laisse plus de temps à l'ingénieur pédagogique pour la pédagogie elle-même : tester, retravailler les exemples, affiner les exercices, soigner les transitions.",
  "Cette redistribution du temps de travail révèle une transformation plus profonde : le métier d'ingénieur pédagogique cesse d'être un métier de production pour devenir un métier de curation, de coaching et de design. L'IA est l'outil ; la valeur humaine se déplace vers les zones où elle est irremplaçable.",
];

const RELATED_ENTRIES = [
  { id: 'r1', title: 'Portrait : 10 formateurs qui transforment leur pratique', meta: 'Article · pp. 24–30' },
  { id: 'r2', title: 'Outils du moment : comparatif LMS nouvelle génération',  meta: 'Article · pp. 32–40' },
  { id: 'r3', title: 'Tendances 2026 : ce qui va changer en formation',         meta: 'Article · pp. 42–50' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const MagazineArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const bookmarkKey = `magazine-article-${id}`;
  const bookmarked = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const progressPercent = useReadingProgress(articleRef);
  useReadingProgressSync(bookmarkKey, progressPercent);

  return (
    <div className="min-h-[100dvh] bg-surface">
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <Container width="medium" className="h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/veille/magazine')}
            className="inline-flex items-center gap-1.5 font-body text-caption font-semibold text-ink-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          >
            <ArrowLeft size={14} /> Retour au magazine
          </button>

          <div className="flex items-center gap-stack-xs">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={36} />
            <Button
              variant={bookmarked ? 'primary' : 'ghost'}
              size="sm"
              iconOnly
              aria-label="Bookmark"
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
              <Share2 size={15} />
            </Button>
          </div>
        </Container>
      </div>

      <div
        ref={articleRef}
        className="max-w-medium mx-auto px-stack sm:px-stack-lg lg:px-section-lg py-section flex flex-col gap-section"
      >
        {/* Hero */}
        <header className="flex flex-col gap-stack max-w-prose">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill border-2 border-primary-300 bg-primary-50/30 text-micro font-bold uppercase tracking-wider text-primary-700">
            <BookOpen size={11} /> {ARTICLE.category} · {ARTICLE.pages}
          </span>

          {/* Gradient text H1 : signature magazine */}
          <h1 className="m-0 font-display text-h1 sm:text-[3rem] font-extrabold leading-[1.05] tracking-tight bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {ARTICLE.title}
          </h1>

          <p className="m-0 font-body text-body-lg text-ink-600 leading-relaxed">
            {ARTICLE.excerpt}
          </p>
        </header>

        {/* Author strip */}
        <div className="pb-stack-lg border-b border-ink-100">
          <AuthorStrip
            variant="expanded"
            name={ARTICLE.author.name}
            role={ARTICLE.author.role}
            meta={[
              { icon: <CalendarDays size={12} />, text: ARTICLE.publishedAt },
              { icon: <Clock3 size={12} />,       text: ARTICLE.readTime },
            ]}
          />
        </div>

        <EditorialLayout
          main={
            <article className="flex flex-col gap-stack max-w-prose">
              {/* Featured image */}
              <figure className="m-0">
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-200 border border-ink-100 flex items-center justify-center font-body text-body-sm text-ink-500">
                  Image principale : schéma de transformation
                </div>
              </figure>

              {/* Intro callout */}
              <IntroCallout tone="brand" eyebrow="À retenir" withQuoteIcon>
                Trois ans après les premiers POC, l'IA générative est devenue un outil structurant
                de l'ingénierie pédagogique. Plus qu'un accélérateur, elle redessine la chaîne de
                valeur du métier : et déplace la valeur humaine vers la curation et le design.
              </IntroCallout>

              {/* Body paragraphs */}
              <div className="flex flex-col gap-stack">
                {PARAGRAPHS.map((p, i) => (
                  <p key={i} className="m-0 font-body text-body text-ink-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Inline quote */}
                <figure className="m-0 my-stack px-5 sm:px-6 py-4 bg-primary-50 rounded-xl">
                  <blockquote className="m-0 font-display italic text-body-lg text-primary-800 leading-relaxed">
                    « Le métier d'ingénieur pédagogique cesse d'être un métier de production
                    pour devenir un métier de curation, de coaching et de design. »
                  </blockquote>
                  <figcaption className="mt-stack-xs font-body text-caption text-ink-500">
                    : Pierre Leclerc, Lead Pédagogie TLS
                  </figcaption>
                </figure>

                <h2 className="m-0 mt-stack-lg font-display text-h3 font-bold text-ink-900 leading-tight tracking-tight">
                  Une chaîne de valeur reconfigurée
                </h2>
                <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
                  Concrètement, sur les 8 jours d'une production typique 2026, l'IA prend en charge
                  environ 60 % du temps de scénarisation initiale, 40 % du story-board et 30 % de la
                  production multimédia. Le reste : l'essentiel : reste un travail humain et expert :
                  l'analyse de besoin, le choix pédagogique, l'animation, l'évaluation.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-stack-xs pt-section border-t border-ink-100">
                <span className="inline-flex items-center gap-1.5 font-body text-micro font-bold uppercase tracking-wider text-ink-500">
                  <TagIcon size={11} /> Tags
                </span>
                <div className="flex flex-wrap gap-stack-xs">
                  {ARTICLE.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 font-body text-micro font-semibold text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          }
          aside={
            <div className="flex flex-col gap-stack-lg">
              <Badge variant="brand">Dans cette édition</Badge>
              <SectionCard title="Continuer la lecture" titleIcon={<BookOpen size={16} />}>
                <RelatedItemList
                  items={RELATED_ENTRIES.map((r) => ({
                    id: r.id,
                    title: r.title,
                    meta: r.meta,
                    onClick: () => navigate('/veille/magazine-article/1'),
                  }))}
                />
              </SectionCard>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default MagazineArticle;
