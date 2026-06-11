/**
 * ArticleDetail : Phase 10 Tier 2 refonte.
 *
 * Page article éditorial (sources : Magazine / Newsletter / Dossier).
 *
 * Structure (per Figma audit) :
 *  1. ReadingProgressBar fixed top + sticky glass header (back, ring, bookmark, share)
 *  2. Breadcrumb 2-niveaux + eyebrow + h1 + excerpt
 *  3. AuthorStrip (variant expanded)
 *  4. Featured image 16:9
 *  5. IntroCallout (lead paragraph)
 *  6. Article body (text + quote + image blocks via ContentBlockRenderer)
 *  7. Tags + external link CTA
 *  8. RelatedItemList aside (sticky)
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
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { Container } from '../components/layout';
import {
  ReadingProgressBar,
  ReadingProgressRing,
  useReadingProgress,
} from '../components/patterns/ReadingProgress';

/* ─── Content block model ────────────────────────────────────────────────── */

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; placeholder: string; caption?: string };

const ARTICLE = {
  source: 'newsletter' as 'newsletter' | 'magazine' | 'dossier',
  category: 'Travail & Apprentissage',
  title: 'Le futur du travail hybride',
  excerpt:
    "Comment les organisations combinent apprentissage continu, autonomie et rituels collaboratifs pour maintenir la performance des équipes distribuées.",
  publishedAt: '25 avril 2026',
  readTime: '10 min de lecture',
  author: {
    name: 'Claire Martin',
    role: 'Rédactrice en chef · The Learning Society',
  },
  tags: ['Travail hybride', 'Management asynchrone', 'Apprentissage continu', 'Performance'],
  externalLink: 'https://example.com/source',
};

const BLOCKS: ContentBlock[] = [
  {
    type: 'heading',
    text: 'Un nouveau contrat de travail',
  },
  {
    type: 'paragraph',
    text: "Depuis 2020, les organisations ont accumulé six années d'expérimentation sur le travail distribué. La période post-pilote permet aujourd'hui une lecture plus posée : ce qui a tenu, ce qui s'est défait, ce qui mérite d'être systématisé.",
  },
  {
    type: 'paragraph',
    text: "Trois lignes de force se dégagent. Premièrement, la flexibilité spatiale n'est plus négociable : elle est un standard implicite, même chez les sceptiques. Deuxièmement, la performance se mesure désormais à l'output et non à la présence. Troisièmement, l'apprentissage continu devient un mode de management à part entière.",
  },
  {
    type: 'quote',
    text: "Le travail hybride n'est plus une réponse à une crise sanitaire : c'est devenu la grammaire du travail qualifié.",
    attribution: 'Étude Deloitte, mars 2026',
  },
  {
    type: 'heading',
    text: 'Compétences clés à renforcer',
  },
  {
    type: 'paragraph',
    text: "L'étude TLS de mars 2026 (n=412 managers) identifie cinq compétences sur-utilisées dans les configurations distribuées : la communication écrite asynchrone, la facilitation d'équipe à distance, la priorisation autonome, le feedback structuré, et l'animation de rituels collectifs.",
  },
  {
    type: 'image',
    placeholder: 'Schéma : Cartographie des 5 compétences distribuées',
    caption: "Source : TLS Research Lab, mars 2026 (n=412)",
  },
  {
    type: 'paragraph',
    text: "Le constat est net : ces compétences ne sont enseignées dans aucun cursus initial. Elles s'apprennent en situation, dans des dispositifs de coaching court et de pair-learning structuré : ce qui plaide pour une refonte des plans de formation 2026-2028.",
  },
  {
    type: 'heading',
    text: 'Un framework pratique',
  },
  {
    type: 'paragraph',
    text: "Le framework HARP (Hybrid, Asynchronous, Rituals, Performance) propose 4 leviers d'action concrets pour les équipes qui veulent industrialiser leur fonctionnement distribué : (1) définir un mode opératoire écrit, (2) instaurer 2 rituels minimum par semaine, (3) clarifier les attentes de réactivité, (4) outiller le feedback continu.",
  },
];

const RELATED = [
  { id: 'r1', title: '5 compétences asynchrones à acquérir', meta: 'Article · 6 min', tone: 'brand' as const, href: '/veille/weekly-news/2' },
  { id: 'r2', title: 'Dossier : management asynchrone', meta: 'Dossier · 22 min', tone: 'warm' as const, href: '/veille/dossier/1' },
  { id: 'r3', title: 'Animer des rituels distribués', meta: 'Tutoriel · 12 min', tone: 'sun' as const, href: '/veille/video-tutorial/1' },
];

/* ─── Block renderer ────────────────────────────────────────────────────── */

const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="m-0 mt-stack-lg font-display text-h3 font-bold text-ink-900 leading-tight tracking-tight">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="m-0 font-body text-body text-ink-700 leading-relaxed">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <figure className="m-0 my-stack pl-5 sm:pl-6 border-l-4 border-primary-400">
          <blockquote className="m-0 font-display italic text-body-lg text-ink-800 leading-relaxed">
            « {block.text} »
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-2 font-body text-caption text-ink-500">
              : {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case 'image':
      return (
        <figure className="m-0 my-stack flex flex-col gap-2">
          <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-ink-100 flex items-center justify-center font-body text-caption text-ink-400 text-center px-4">
            {block.placeholder}
          </div>
          {block.caption && (
            <figcaption className="font-body text-caption text-ink-500 italic text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id = '1' } = useParams<{ id: string }>();
  const articleRef = useRef<HTMLDivElement>(null);
  const bookmarkKey = `article-${id}`;
  const bookmarked = useBookmarksStore((s) => s.ids.includes(bookmarkKey));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const progressPercent = useReadingProgress(articleRef);
  useReadingProgressSync(bookmarkKey, progressPercent);

  const sourceLabel =
    ARTICLE.source === 'magazine'
      ? 'Magazine TLS'
      : ARTICLE.source === 'dossier'
      ? 'Dossier'
      : 'Newsletter';
  const sourceHref =
    ARTICLE.source === 'magazine'
      ? '/veille/magazine'
      : ARTICLE.source === 'dossier'
      ? '/veille/dossiers'
      : '/veille/weekly-newsletter';

  return (
    <div className="min-h-screen bg-surface">
      {/* Top reading progress bar : fixed */}
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <Container width="medium" className="h-14 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/veille')}
            className="inline-flex items-center gap-1.5 font-body text-caption font-semibold text-ink-700 hover:text-primary-700 bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={14} /> Retour à la veille
          </button>

          <div className="flex items-center gap-2">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={36} />
            <Button
              variant={bookmarked ? 'primary' : 'ghost'}
              size="sm"
              iconOnly
              aria-label={bookmarked ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
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
        className="max-w-medium mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section"
      >
        {/* Breadcrumb + eyebrow + h1 + excerpt */}
        <header className="flex flex-col gap-stack max-w-prose">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-primary-100 border border-primary-200 text-micro font-bold uppercase tracking-wider text-primary-700">
            <Newspaper size={11} /> {sourceLabel}
          </span>

          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight tracking-tight">
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

        {/* Two-col layout : article body (main) + related aside */}
        <EditorialLayout
          main={
            <article className="flex flex-col gap-stack max-w-prose">
              {/* Featured image */}
              <figure className="m-0">
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100 border border-ink-100 flex items-center justify-center font-body text-body-sm text-ink-500">
                  Image principale de l'article
                </div>
              </figure>

              {/* Intro callout : lead paragraph */}
              <IntroCallout tone="brand" withQuoteIcon>
                Six ans après le grand bascule, le travail hybride a pris une forme stable. Notre analyse de 412 organisations en mars 2026 montre que ce n'est plus une exception : c'est devenu la norme du travail qualifié.
              </IntroCallout>

              {/* Body blocks */}
              <div className="flex flex-col gap-stack">
                {BLOCKS.map((block, i) => (
                  <ContentBlockRenderer key={i} block={block} />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-stack-xs pt-section border-t border-ink-100">
                <span className="inline-flex items-center gap-1.5 font-body text-micro font-bold uppercase tracking-wider text-ink-500">
                  <TagIcon size={11} /> Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {ARTICLE.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-pill bg-ink-50 border border-ink-200 font-body text-micro font-semibold text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External link CTA */}
              {ARTICLE.externalLink && (
                <a
                  href={ARTICLE.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-primary-50 border border-primary-200 font-body text-caption font-semibold text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  <ExternalLink size={13} /> Voir la source originale
                </a>
              )}
            </article>
          }
          aside={
            <div className="flex flex-col gap-stack-lg">
              <Badge variant="brand">À découvrir aussi</Badge>
              <RelatedItemList
                items={RELATED.map((r) => ({
                  id: r.id,
                  title: r.title,
                  meta: r.meta,
                  onClick: () => navigate(r.href),
                }))}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
