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
  Bookmark,
  Share2,
  CalendarDays,
  Clock3,
  Tag as TagIcon,
  BookOpen,
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
  "Depuis 2023, la chaîne de production des contenus de formation s'est radicalement transformée. Là où il fallait six semaines pour concevoir un module complet (analyse de besoin, scénarisation, story-board, production multimédia, tests), il faut désormais huit jours en moyenne dans les organisations qui ont structuré leur usage de l'IA générative.",
  "Le gain ne se mesure pas qu'en vitesse. La qualité progresse aussi, paradoxalement. Les outils IA fournissent une première version exploitable très rapidement, ce qui laisse plus de temps à l'ingénieur pédagogique pour la pédagogie elle-même : tester, retravailler les exemples, affiner les exercices, soigner les transitions.",
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

      <ReaderContextStrip
        title={ARTICLE.title}
        onBack={() => navigate('/veille/magazine')}
        backLabel="Retour au magazine"
        containerWidth="medium"
        trailing={
          <>
            <ReadingProgressRing targetRef={articleRef} tone="brand" size={32} />
            <Button
              emphasis={bookmarked ? 'soft' : 'outline'}
              iconOnly
              aria-label="Bookmark"
              onClick={() => toggleBookmark(bookmarkKey)}
            >
              <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button emphasis="outline" iconOnly aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </>
        }
      />

      {/* Marge haute par défaut de PageShell : l'en-tête collait à la barre
          (16 au-dessus du titre comme en dessous). */}
      <PageShell
        ref={articleRef}
        width="medium"
        className="relative z-base gap-section flex-1"
      >
        {/* Hero — rubrique (MetaPill) → 8 → h1 → 12 → chapô. Le titre prend le
            pas de l'app, 36 à l'encre (il était à 48, interligne et approche
            forcés, en teal : une couleur de marque ne décore pas un titre) ;
            le chapô passe au cran 700. */}
        <header className="flex flex-col max-w-prose">
          <MetaPill icon={<BookOpen />} text={`${ARTICLE.category} · ${ARTICLE.pages}`} tone="primary" className="self-start" />

          <h1 className="mt-stack-xs font-display text-h1 text-ink-900 text-balance">
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

        <EditorialLayout
          main={
            <article className="flex flex-col gap-stack max-w-prose">
              {/* Featured image */}
              <figure className="m-0">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-200 border border-ink-100 flex items-center justify-center font-body text-body text-ink-700">
                  Image principale : schéma de transformation
                </div>
              </figure>

              {/* Intro callout */}
              <IntroCallout tone="brand" eyebrow="À retenir" withQuoteIcon>
                Trois ans après les premiers POC, l'IA générative est devenue un outil structurant
                de l'ingénierie pédagogique. Plus qu'un accélérateur, elle redessine la chaîne de
                valeur du métier, et déplace la valeur humaine vers la curation et le design.
              </IntroCallout>

              {/* Body paragraphs */}
              <div className="flex flex-col gap-stack">
                {/* Le texte de l'article est le texte principal : ink-900. */}
                {PARAGRAPHS.map((p, i) => (
                  <p key={i} className="font-body text-body text-ink-900">
                    {p}
                  </p>
                ))}

                {/* Inline quote — la légende passe au cran 600 : au 500 sur le
                    fond primary-50, elle mesurait 4,44:1 (sous AA). Padding
                    20 / 24, jamais sous le rayon ; plus de « : » en tête. */}
                <figure className="my-stack px-stack-lg py-stack-md bg-primary-50 rounded-xl flex flex-col gap-stack-xs">
                  <blockquote className="font-body italic text-body-lg text-primary-800">
                    « Le métier d'ingénieur pédagogique cesse d'être un métier de production
                    pour devenir un métier de curation, de coaching et de design. »
                  </blockquote>
                  <figcaption className="font-body text-caption text-ink-600">
                    Pierre Leclerc, Lead Pédagogie TLS
                  </figcaption>
                </figure>

                {/* Intertitre h2 28 (il était à 20) : 48 au-dessus, 16 dessous. */}
                <h2 className="mt-section font-display text-h2 text-ink-900">
                  Une chaîne de valeur reconfigurée
                </h2>
                <p className="font-body text-body text-ink-900">
                  Concrètement, sur les 8 jours d'une production typique 2026, l'IA prend en charge
                  environ 60 % du temps de scénarisation initiale, 40 % du story-board et 30 % de la
                  production multimédia. Le reste, l'essentiel, reste un travail humain et expert :
                  l'analyse de besoin, le choix pédagogique, l'animation, l'évaluation.
                </p>
              </div>

              {/* Tags — libellé de groupe (13/600 ink-600) et données en
                  MetaPill, comme l'article de la veille. */}
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
            </article>
          }
          aside={
            /* L'encart dit une fois ce qu'il est : un libellé (13/600 ink-600)
               au-dessus de la liste. Il le disait deux fois — un Badge (le
               registre des états) puis une carte titrée en h3 — et ce h3 sautait
               un niveau dans le plan de la page. */
            <div className="flex flex-col gap-stack-sm">
              <p className="font-body text-caption font-semibold text-ink-600">Dans cette édition</p>
              <RelatedItemList
                items={RELATED_ENTRIES.map((r) => ({
                  id: r.id,
                  title: r.title,
                  meta: r.meta,
                  onClick: () => navigate('/veille/magazine-article/1'),
                }))}
              />
            </div>
          }
        />
      </PageShell>
    </div>
  );
};

export default MagazineArticle;
