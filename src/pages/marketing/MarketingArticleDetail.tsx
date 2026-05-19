/**
 * MarketingArticleDetail — Article reading experience (Phase P4.2)
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
  ArrowUpRight,
  Clock,
  Quote,
  Share2,
  BookOpen,
  Sparkles,
  Calendar,
  Hash,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  GradientText,
  MagneticButton,
} from '../../components/marketing/motion';
import { ARTICLES, findArticle, getRelatedArticles } from '../../data/marketingArticles';

const CATEGORY_TONES: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-warning-fg border-accent-100',
  Innovation: 'bg-primary-50 text-primary-700 border-primary-100',
  "Retours d'expérience": 'bg-secondary-50 text-secondary-700 border-secondary-100',
};

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
    <ul className="flex flex-col gap-1 m-0 p-0 list-none">
      {sections.map((s) => {
        const id = headingToId(s.heading);
        const isActive = activeId === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-1.5 pl-3 border-l-2 text-body-sm leading-snug transition-all duration-base ${
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
      // Silent fail — share API not available
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
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3 h-9 rounded-pill bg-white border border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-primary-300 transition-colors duration-fast min-h-touch"
        aria-label="Partager l'article"
      >
        <Share2 size={14} />
        <span className="font-body text-caption font-semibold">Partager</span>
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 px-3 h-9 rounded-pill border transition-colors duration-fast min-h-touch ${
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

// ─── Article body (intro + sections + pull quotes + conclusion) ───────────────
const ArticleBody: React.FC<{
  intro: string;
  sections: { heading: string; subheadings?: string[] }[];
  quotes: string[];
  conclusion: string;
  liveUrl: string;
}> = ({ intro, sections, quotes, conclusion, liveUrl }) => (
  <article className="flex flex-col gap-section">
    {/* Intro */}
    <FadeInWhenVisible direction="up">
      <div className="prose-content">
        <p className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] text-ink-800 leading-relaxed m-0 first-letter:font-extrabold first-letter:text-[3rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary-600">
          {intro}
        </p>
      </div>
    </FadeInWhenVisible>

    {/* Pull quote #1 */}
    {quotes[0] && (
      <FadeInWhenVisible direction="up" delay={0.05}>
        <blockquote className="relative my-stack rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50/30 border border-primary-100 p-section">
          <Quote
            aria-hidden
            size={48}
            className="absolute -top-4 left-section text-primary-300"
          />
          <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-ink-900 leading-snug m-0 italic">
            « {quotes[0]} »
          </p>
        </blockquote>
      </FadeInWhenVisible>
    )}

    {/* Sections (headings only — body lives on live site) */}
    <FadeInWhenVisible direction="up">
      <div className="flex flex-col gap-stack-lg">
        <h2 className="font-display text-h2 font-extrabold text-ink-900 leading-tight m-0">
          Le sommaire détaillé
        </h2>
        <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
          Voici la structure complète de l'article. Le contenu in extenso est publié
          sur le site canonique TLS — clique sur les sections pour y accéder.
        </p>
        <ol className="flex flex-col gap-2 m-0 p-0 list-none">
          {sections.map((s, i) => {
            const id = headingToId(s.heading);
            return (
              <li key={id} id={id} className="scroll-mt-32">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-md transition-all duration-base group"
                >
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-stack p-stack-lg"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-pill bg-primary-50 text-primary-700 border border-primary-100 font-display font-extrabold text-body-sm tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-fast">
                        {s.heading}
                      </h3>
                      {s.subheadings && (
                        <ul className="flex flex-col gap-1 m-0 mt-1 p-0 list-none">
                          {s.subheadings.map((sub) => (
                            <li
                              key={sub}
                              className="font-body text-body-sm text-ink-600 leading-snug pl-3 border-l-2 border-ink-100"
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-ink-400 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-base shrink-0 mt-2"
                    />
                  </a>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </FadeInWhenVisible>

    {/* Pull quote #2 */}
    {quotes[1] && (
      <FadeInWhenVisible direction="up">
        <blockquote className="relative my-stack rounded-3xl bg-gradient-to-br from-secondary-50 via-white to-accent-50/30 border border-secondary-100 p-section">
          <Quote
            aria-hidden
            size={48}
            className="absolute -top-4 left-section text-secondary-300"
          />
          <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-ink-900 leading-snug m-0 italic">
            « {quotes[1]} »
          </p>
        </blockquote>
      </FadeInWhenVisible>
    )}

    {/* Pull quote #3 */}
    {quotes[2] && (
      <FadeInWhenVisible direction="up">
        <blockquote className="relative my-stack rounded-3xl bg-gradient-to-br from-accent-50 via-white to-primary-50/30 border border-accent-100 p-section">
          <Quote
            aria-hidden
            size={48}
            className="absolute -top-4 left-section text-warning-fg/40"
          />
          <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-ink-900 leading-snug m-0 italic">
            « {quotes[2]} »
          </p>
        </blockquote>
      </FadeInWhenVisible>
    )}

    {/* Conclusion */}
    <FadeInWhenVisible direction="up">
      <div className="rounded-3xl bg-ink-50/40 border border-ink-100 p-section">
        <div className="flex items-center gap-2 mb-stack">
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

    {/* CTA full article */}
    <FadeInWhenVisible direction="up">
      <div className="rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 text-white p-section text-center flex flex-col items-center gap-stack-lg">
        <BookOpen size={36} className="text-accent-400" />
        <h3 className="font-display text-h3 font-extrabold m-0 leading-tight max-w-xl">
          Lis l'article complet sur le site TLS
        </h3>
        <p className="font-body text-body text-white/85 m-0 max-w-prose">
          Cette page présente la structure et les idées-clés. Le développement complet
          (3 000 mots, exemples concrets, illustrations) est publié sur le site canonique.
        </p>
        <MagneticButton strength={12}>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              size="lg"
              trailingIcon={<ExternalLink size={16} />}
              className="!bg-white !text-primary-700 hover:!bg-accent-50 !border-0 shadow-2xl"
            >
              Lire sur thelearningsociety.fr
            </Button>
          </a>
        </MagneticButton>
      </div>
    </FadeInWhenVisible>
  </article>
);

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
    return <Navigate to="/marketing/magazine" replace />;
  }

  const related = getRelatedArticles(article.slug, 3);
  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = ARTICLES[currentIndex - 1] ?? null;
  const next = ARTICLES[currentIndex + 1] ?? null;

  return (
    <div ref={ref} className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={`relative pt-32 pb-page overflow-hidden bg-gradient-to-br ${article.cover}`}>
        <MeshGradientBg tone="warm" intensity="subtle" />

        <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-stack-lg">
          {/* Back link */}
          <FadeInWhenVisible direction="up">
            <Link
              to="/marketing/magazine"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group"
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
              <div className="flex items-center gap-2">
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

      {/* ── Body + TOC layout ─────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-section items-start">
          {/* Main content */}
          <div className="min-w-0 max-w-3xl">
            <ArticleBody
              intro={article.intro}
              sections={article.sections}
              quotes={article.quotes}
              conclusion={article.conclusion}
              liveUrl={article.liveUrl}
            />
          </div>

          {/* Sticky TOC aside */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <SectionTOC sections={article.sections} activeId={activeId} />
          </aside>
        </div>
      </section>

      {/* ── Prev/Next navigation ──────────────────────────────────────────── */}
      <section className="py-page bg-ink-50/40 border-y border-ink-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-stack">
          {prev && (
            <Link
              to={`/marketing/magazine/${prev.slug}`}
              className="group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-lg transition-all duration-base"
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
              to={`/marketing/magazine/${next.slug}`}
              className={`group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-lg transition-all duration-base text-right ${!prev ? 'md:col-start-2' : ''}`}
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
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                À lire aussi
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Trois autres{' '}
                <GradientText>analyses</GradientText> sur le même thème.
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {related.map((r, i) => (
              <FadeInWhenVisible key={r.slug} direction="up" delay={i * 0.1}>
                <Link to={`/marketing/magazine/${r.slug}`} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-primary-200 transition-shadow duration-base"
                  >
                    <div className={`relative h-32 bg-gradient-to-br ${r.cover} flex items-center justify-center overflow-hidden`}>
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
                      <BookOpen size={36} strokeWidth={1.25} className="text-ink-900/25 relative" />
                    </div>
                    <div className="p-stack-lg flex flex-col gap-stack flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-pill border ${
                            CATEGORY_TONES[r.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'
                          } font-body text-micro font-bold uppercase tracking-wider`}
                        >
                          {r.category}
                        </span>
                        <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
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
                      <div className="inline-flex items-center gap-1 font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-100">
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
    </div>
  );
};

export default MarketingArticleDetail;
