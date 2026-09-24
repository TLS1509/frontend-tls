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
  Bookmark,
  Share2,
  CalendarDays,
  Clock3,
  Tag as TagIcon,
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { AuthorStrip } from '../components/patterns/AuthorStrip';
import { IntroCallout } from '../components/patterns/IntroCallout';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import { PageShell } from '../components/layout';
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
    /* Intertitre : une section de l'article, h2 28 (il était à 20). 48 au-
       dessus (16 du flux + 32), 16 en dessous : il se lit avec son texte. */
    case 'heading':
      return (
        <h2 className="mt-section font-display text-h2 text-ink-900">
          {block.text}
        </h2>
      );
    /* Le texte de l'article est le texte principal : ink-900 (il était au
       cran 700, celui des descriptions). */
    case 'paragraph':
      return (
        <p className="font-body text-body text-ink-900">
          {block.text}
        </p>
      );
    /* Citation : padding 20 / 24, jamais sous le rayon (20) ; la source en
       légende ink-600, sans le « : » resté d'un tiret remplacé. */
    case 'quote':
      return (
        <figure className="my-stack px-stack-lg py-stack-md bg-primary-50 rounded-xl flex flex-col gap-stack-xs">
          <blockquote className="font-body italic text-body-lg text-primary-800">
            « {block.text} »
          </blockquote>
          {block.attribution && (
            <figcaption className="font-body text-caption text-ink-600">
              {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case 'image':
      return (
        <figure className="my-stack flex flex-col gap-stack-xs">
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary-50 via-white to-secondary-50 border border-ink-100 flex items-center justify-center font-body text-caption text-ink-600 text-center px-stack">
            {block.placeholder}
          </div>
          {block.caption && (
            <figcaption className="font-body text-caption text-ink-600 italic text-center">
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
    <>
      {/* Top reading progress bar : fixed */}
      <ReadingProgressBar targetRef={articleRef} tone="brand" />

      {/* Barre de lecture : ReaderContextStrip, comme l'article du magazine,
          l'actu hebdo et le dossier. Elle était un PageShell dont la
          `flex-col` battait le `flex` de la page : « Retour » et les trois
          boutons s'empilaient et débordaient des 56 px de la barre. */}
      <ReaderContextStrip
        title={ARTICLE.title}
        onBack={() => navigate('/veille')}
        backLabel="Retour à la veille"
        containerWidth="medium"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={32} />
            {/* Des outils de lecture : `ghost` neutre, le marque-page en `soft`
                une fois posé, comme les favoris de la Veille (arbitrage n°19 ;
                ils étaient en `outline`, réservé à Annuler). Une page de
                lecture n'a pas d'aplat. */}
            <Button
              emphasis={bookmarked ? 'soft' : 'ghost'}
              tone={bookmarked ? 'brand' : 'neutral'}
              iconOnly
              size="sm"
              aria-label={bookmarked ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button emphasis="ghost" tone="neutral" iconOnly size="sm" aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </div>
        }
      />

      {/* La marge haute par défaut de PageShell : l'en-tête était collé à la
          barre (16 au-dessus du h1, 32 en dessous). */}
      <PageShell width="medium">
        <div ref={articleRef} className="flex flex-col gap-section">
        {/* En-tête : la source (donnée, MetaPill) → 8 → h1 36 → 12 → chapô 18
            ink-700 (il était au cran 600 de la méta). */}
        <header className="flex flex-col max-w-prose">
          <MetaPill icon={<Newspaper />} text={sourceLabel} tone="primary" className="self-start" />

          <h1 className="mt-stack-xs font-display text-h1 text-ink-900">
            {ARTICLE.title}
          </h1>

          <p className="mt-stack-sm font-body text-body-lg text-ink-700">
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
              { icon: <CalendarDays size={14} />, text: ARTICLE.publishedAt },
              { icon: <Clock3 size={14} />,       text: ARTICLE.readTime },
            ]}
          />
        </div>

        {/* Two-col layout : article body (main) + related aside */}
        <EditorialLayout
          main={
            <article className="flex flex-col gap-stack max-w-prose">
              {/* Featured image */}
              <figure className="m-0">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-100 border border-ink-100 flex items-center justify-center font-body text-body text-ink-700">
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

              {/* Tags — un libellé de groupe (13/600 ink-600, il était en
                  capitales 11 px au cran 500) et des données en MetaPill (les
                  puces faites main étaient en 11/600, avec un curseur de lien
                  sans lien). */}
              <div className="mt-stack flex flex-col gap-stack-xs pt-section border-t border-ink-100">
                <p className="inline-flex items-center gap-stack-2xs font-body text-caption font-semibold text-ink-600">
                  <TagIcon size={14} aria-hidden="true" /> Tags
                </p>
                <div className="flex flex-wrap gap-stack-xs">
                  {ARTICLE.tags.map((tag) => (
                    <MetaPill key={tag} text={tag} tone="neutral" />
                  ))}
                </div>
              </div>

              {/* External link CTA */}
              {ARTICLE.externalLink && (
                <Button
                  href={ARTICLE.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  emphasis="soft"
                  size="sm"
                  leadingIcon={<ExternalLink size={14} />}
                  className="self-start"
                >
                  Voir la source originale
                </Button>
              )}
            </article>
          }
          aside={
            /* Le titre de l'encart est un libellé (13/600 ink-600) : un Badge
               dit un état, pas le nom d'un bloc. */
            <div className="flex flex-col gap-stack-sm">
              <p className="font-body text-caption font-semibold text-ink-600">À découvrir aussi</p>
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
      </PageShell>
    </>
  );
};

export default ArticleDetail;
