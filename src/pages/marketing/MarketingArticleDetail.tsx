/**
 * MarketingArticleDetail : Article reading experience (Phase P4.2)
 *
 * Direction: editorial premium. Reading progress bar, sticky TOC, pull quotes,
 * related articles, share. Inspired by Stripe Press, Anthropic, Notion blog.
 *
 * Content is imported from src/data/marketingArticles.ts (10 articles from live site).
 * For the full article body, links to the canonical liveUrl.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Quote,
  Share2,
  Sparkles,
  Calendar,
  Hash,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { PageShell } from '../../components/layout';
import {
  FadeInWhenVisible,
  MagneticButton,
  MeshGradientBg,
} from '../../components/marketing/motion';
import { ARTICLES, findArticle, getRelatedArticles, type ArticleBodyBlock } from '../../data/marketingArticles';
import { SEOHead } from './components/SEOHead';

const CATEGORY_TONES: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-accent-600 border-accent-200',
  Innovation: 'bg-ink-100 text-ink-700 border-ink-200',
  "Retours d'expérience": 'bg-success-bg text-success-fg border-success-base/30',
};

/**
 * Canonical container — matches PageShell width="medium" (1024px) horizontal
 * rhythm exactly (same max-w + same responsive px scale). Used on every
 * section of this page (hero, body, prev/next, related) so nothing
 * horizontally drifts between the gradient hero and the white body sections
 * — same pattern as MagazineArticle.tsx (learning app / Veille family).
 */
const CONTAINER = 'max-w-medium mx-auto px-4 sm:px-6 lg:px-10';

// ─── Slug helper ──────────────────────────────────────────────────────────────
const headingToId = (heading: string): string =>
  heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ─── Section TOC (sticky aside) ───────────────────────────────────────────────
const SectionTOC: React.FC<{ sections: { heading: string }[]; activeId: string | null }> = ({
  sections,
  activeId,
}) => (
  <nav aria-label="Sommaire de l'article" className="flex flex-col gap-stack">
    <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
      <Hash size={14} />
      Sommaire
    </span>
    <ul className="flex flex-col gap-tight m-0 p-0 list-none">
      {sections.map((s) => {
        const id = headingToId(s.heading);
        const isActive = activeId === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-1.5 pl-3 border-l-2 text-body-sm leading-snug transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                isActive
                  ? 'border-primary-600 text-primary-700 font-semibold'
                  : 'border-ink-200 text-ink-600 hover:text-ink-900 hover:border-ink-400'
              }`}
            >
              {s.heading}
            </a>
          </li>
        );
      })}
    </ul>
  </nav>
);

// ─── Share button with copy-link ──────────────────────────────────────────────
const ShareBar: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Silent fail : share API not available
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-stack-xs">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-stack-xs px-3 h-9 rounded-pill bg-white border border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-primary-300 transition-colors duration-fast min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        aria-label="Partager l'article"
      >
        <Share2 size={14} />
        <span className="font-body text-caption font-semibold">Partager</span>
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-stack-xs px-3 h-9 rounded-pill border transition-colors duration-fast min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
          copied
            ? 'bg-success-bg text-success-fg border-success-base/40'
            : 'bg-white text-ink-700 border-ink-200 hover:bg-ink-50 hover:border-primary-300'
        }`}
        aria-label="Copier le lien de l'article"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span className="font-body text-caption font-semibold">
          {copied ? 'Copié' : 'Copier le lien'}
        </span>
      </button>
    </div>
  );
};

// ─── Hook : track which section is currently in view ──────────────────────────
const useActiveSection = (sectionIds: string[]): string | null => {
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (sectionIds.length === 0) return;
    const handler = () => {
      // Find the section closest to top of viewport (within 30 % from top)
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) current = id;
      }
      setActive(current ?? sectionIds[0]);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|')]);

  return active;
};

// ─── Block renderer ───────────────────────────────────────────────────────────
const PULLQUOTE_GRADIENTS = [
  'from-primary-50 via-white to-accent-50/30 border-primary-100',
  'from-secondary-50 via-white to-accent-50/30 border-secondary-100',
  'from-accent-50 via-white to-primary-50/30 border-accent-100',
];
const PULLQUOTE_ICON_COLORS = ['text-primary-300', 'text-secondary-300', 'text-warning-fg/40'];

const BodyBlock: React.FC<{ block: ArticleBodyBlock; pullquoteIndex: number }> = ({
  block,
  pullquoteIndex,
}) => {
  const gradIdx = pullquoteIndex % 3;

  switch (block.type) {
    case 'h2':
      return (
        <h2
          id={headingToId(block.text)}
          className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold text-ink-900 leading-tight m-0 scroll-mt-32 pt-stack"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="font-display text-[clamp(1.1rem,1.8vw,1.35rem)] font-bold text-ink-800 leading-snug m-0 pt-1">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="font-body text-[clamp(1rem,1.3vw,1.125rem)] text-ink-700 leading-[1.8] m-0">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul className="flex flex-col gap-stack-xs m-0 pl-0 list-none">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-stack-xs">
              <span className="shrink-0 mt-[0.45em] w-1.5 h-1.5 rounded-full bg-primary-400" />
              <span className="font-body text-[clamp(0.9375rem,1.2vw,1rem)] text-ink-700 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'pullquote':
      return (
        <blockquote
          className={`relative my-2 rounded-3xl bg-gradient-to-br ${PULLQUOTE_GRADIENTS[gradIdx]} border p-section`}
        >
          <Quote
            aria-hidden
            size={48}
            className={`absolute -top-4 left-section ${PULLQUOTE_ICON_COLORS[gradIdx]}`}
          />
          <p className="font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium text-ink-900 leading-snug m-0 italic">
            « {block.text} »
          </p>
        </blockquote>
      );
    default:
      return null;
  }
};

// ─── Article body ─────────────────────────────────────────────────────────────
const ArticleBody: React.FC<{
  intro: string;
  body: ArticleBodyBlock[];
  conclusion: string;
  liveUrl: string;
}> = ({ intro, body, conclusion, liveUrl }) => {
  let pullquoteCount = 0;

  return (
    <article className="flex flex-col gap-stack-lg max-w-prose">
      {/* Intro : drop cap */}
      <FadeInWhenVisible direction="up">
        <p className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] text-ink-800 leading-relaxed m-0 first-letter:font-extrabold first-letter:text-[3rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary-600">
          {intro}
        </p>
      </FadeInWhenVisible>

      {/* Body blocks : no per-block animation for reading flow */}
      {body.map((block, i) => {
        const pqIdx = block.type === 'pullquote' ? pullquoteCount++ : -1;
        if (block.type === 'h2') {
          return (
            <FadeInWhenVisible key={i} direction="up">
              <BodyBlock block={block} pullquoteIndex={pqIdx} />
            </FadeInWhenVisible>
          );
        }
        return <BodyBlock key={i} block={block} pullquoteIndex={pqIdx} />;
      })}

      {/* Conclusion */}
      <FadeInWhenVisible direction="up">
        <div className="rounded-3xl bg-ink-50/40 border border-ink-100 p-section mt-stack">
          <div className="flex items-center gap-stack-xs mb-stack">
            <Sparkles size={18} className="text-warning-fg" />
            <span className="font-body text-caption font-bold text-warning-fg uppercase tracking-widest">
              Pour conclure
            </span>
          </div>
          <p className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] text-ink-800 leading-relaxed m-0">
            {conclusion}
          </p>
        </div>
      </FadeInWhenVisible>

      {/* Source link */}
      <FadeInWhenVisible direction="up">
        <div className="flex items-center gap-stack-xs pt-stack border-t border-ink-100">
          <ExternalLink size={14} className="text-ink-400 shrink-0" />
          <span className="font-body text-caption text-ink-500">
            Article publié sur{' '}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              thelearningsociety.fr
            </a>
          </span>
        </div>
      </FadeInWhenVisible>
    </article>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const MarketingArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? findArticle(slug) : null;
  const ref = useRef<HTMLDivElement>(null);

  const sectionIds = article ? article.sections.map((s) => headingToId(s.heading)) : [];
  const activeId = useActiveSection(sectionIds);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!article) {
    return <Navigate to="/website/resources" replace />;
  }

  const related = getRelatedArticles(article.slug, 3);
  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = ARTICLES[currentIndex - 1] ?? null;
  const next = ARTICLES[currentIndex + 1] ?? null;

  return (
    <div ref={ref} className="bg-white">
      <SEOHead
        title={article.title}
        description={article.summary}
        canonical={`/website/magazine/${article.slug}`}
        ogType="article"
      />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={`relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br ${article.cover}`}>

        <div className={`relative ${CONTAINER} flex flex-col gap-stack-lg`}>
          {/* Back link */}
          <FadeInWhenVisible direction="up">
            <Link
              to="/website/resources"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Retour au Mag'
            </Link>
          </FadeInWhenVisible>

          {/* Meta */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className="flex items-center gap-stack flex-wrap">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-pill border ${
                  CATEGORY_TONES[article.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'
                } font-body text-caption font-bold uppercase tracking-wider`}
              >
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Clock size={14} />
                {article.readTime} de lecture
              </span>
            </div>
          </FadeInWhenVisible>

          {/* Title */}
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 text-[clamp(2.25rem,5vw,4rem)]">
              {article.title}
            </h1>
          </FadeInWhenVisible>

          {/* Subtitle */}
          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-display text-[clamp(1.25rem,2vw,1.5rem)] text-ink-700 leading-snug m-0 italic">
              {article.subtitle}
            </p>
          </FadeInWhenVisible>

          {/* Share + author block */}
          <FadeInWhenVisible direction="up" delay={0.2}>
            <div className="flex items-center justify-between gap-stack flex-wrap pt-stack border-t border-ink-200/60">
              <div className="flex items-center gap-stack-xs">
                <div className="w-10 h-10 rounded-pill bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-display font-bold text-body-sm">
                  TLS
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-body-sm text-ink-900">
                    Équipe TLS
                  </span>
                  <span className="font-body text-caption text-ink-500">
                    The Learning Society
                  </span>
                </div>
              </div>
              <ShareBar url={article.liveUrl} title={article.title} />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Body + TOC — narrow fixed sidebar inside the same container as the
          hero (not a margin float — that needed ≥1536px to have room, which
          hid the TOC on most real desktop viewports incl. 1440px). ────────── */}
      <PageShell width="medium" className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-section items-start">
          <aside className="hidden lg:block sticky top-28">
            <SectionTOC sections={article.sections} activeId={activeId} />
          </aside>
          <ArticleBody
            intro={article.intro}
            body={article.body}
            conclusion={article.conclusion}
            liveUrl={article.liveUrl}
          />
        </div>
      </PageShell>

      {/* ── Prev/Next navigation ──────────────────────────────────────────── */}
      <section className="py-page bg-ink-50/40 border-y border-ink-100">
        <div className={`${CONTAINER} grid grid-cols-1 md:grid-cols-2 gap-stack`}>
          {prev && (
            <Link
              to={`/website/magazine/${prev.slug}`}
              className="group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                <ArrowLeft size={14} className="transition-transform duration-base group-hover:-translate-x-1" />
                Article précédent
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-fast">
                {prev.title}
              </h3>
              <p className="font-body text-caption text-ink-500 m-0">{prev.date} · {prev.readTime}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/website/magazine/${next.slug}`}
              className={`group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-card-hover transition-all duration-base text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${!prev ? 'md:col-start-2' : ''}`}
            >
              <span className="inline-flex items-center gap-1.5 self-end font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                Article suivant
                <ArrowRight size={14} className="transition-transform duration-base group-hover:translate-x-1" />
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-fast">
                {next.title}
              </h3>
              <p className="font-body text-caption text-ink-500 m-0">{next.date} · {next.readTime}</p>
            </Link>
          )}
        </div>
      </section>

      {/* ── Related articles ──────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className={`${CONTAINER} flex flex-col gap-section`}>
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                À lire aussi
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois autres{' '}
                <span className="text-accent-400">analyses</span> sur le même thème.
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {related.map((r, i) => (
              <FadeInWhenVisible key={r.slug} direction="up" delay={i * 0.1}>
                <Link to={`/website/magazine/${r.slug}`} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-card hover:shadow-card-lift hover:border-primary-200 transition-shadow duration-base"
                  >
                    <div className={`relative h-32 bg-gradient-to-br ${r.cover} flex items-center justify-center overflow-hidden`}>
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
                      <BookOpen size={36} strokeWidth={1.25} className="text-ink-900/25 relative" />
                    </div>
                    <div className="p-stack-lg flex flex-col gap-stack flex-1">
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-pill border ${
                            CATEGORY_TONES[r.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'
                          } font-body text-micro font-bold uppercase tracking-wider`}
                        >
                          {r.category}
                        </span>
                        <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
                          <Clock size={11} />
                          {r.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                        {r.title}
                      </h3>
                      <p className="font-body text-caption text-ink-500 m-0 line-clamp-3 flex-1">
                        {r.summary}
                      </p>
                      <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-100">
                        Lire
                        <ArrowRight
                          size={12}
                          className="transition-transform duration-base group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final (le seul moment dark) ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950">
        <MeshGradientBg tone="ink" intensity="subtle" />
        <div className={`relative ${CONTAINER} text-center flex flex-col items-center gap-stack-lg`}>
          <FadeInWhenVisible direction="up">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Passer de la théorie à la pratique ?
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.08}>
            <p className="font-body text-body-lg text-white/80 max-w-2xl m-0">
              La Learning App et l'accompagnement STRIDE opérationnalisent ce modèle dans votre
              organisation.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-stack">
              <Button to="/website/accompagnement" variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Découvrir l'accompagnement
              </Button>
              <Button to="/website/learning-app" variant="glass" size="lg" trailingIcon={<ArrowRight size={18} />}>
                Voir la Learning App
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingArticleDetail;
