/**
 * MarketingResourceDetail — Deep-read resource experience
 *
 * Applies internal design patterns (ArticleDetail, Dossier) to marketing context:
 *  - Reading progress bar (fixed top)
 *  - Sticky TOC (aside right)
 *  - Key findings grid (mid-page callout)
 *  - Share bar + author metadata
 *  - Prev/Next navigation
 *  - Related resources
 *
 * Content sourced from marketingArticles.ts (editorial articles from live site)
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
  Calendar,
  Hash,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Users,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
} from '../../components/marketing/motion';
import { ARTICLES, findArticle, getRelatedArticles, type ArticleBodyBlock } from '../../data/marketingArticles';

const CATEGORY_TONES: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-warning-fg border-accent-100',
  Innovation: 'bg-primary-50 text-primary-700 border-primary-100',
  "Retours d'expérience": 'bg-secondary-50 text-secondary-700 border-secondary-100',
};

// ─── Heading slug helper ──────────────────────────────────────────────────────
const headingToId = (heading: string): string =>
  heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ─── Reading progress hook ────────────────────────────────────────────────────
const useReadingProgress = (ref: React.RefObject<HTMLDivElement>): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const handler = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = Math.max(0, -rect.top);
      const percent = (visible / el.offsetHeight) * 100;
      setProgress(Math.min(100, percent));
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [ref]);

  return progress;
};

// ─── Reading progress bar (fixed top) ─────────────────────────────────────────
const ReadingProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-ink-100 z-50 pointer-events-none">
    <motion.div
      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.15, ease: 'linear' }}
    />
  </div>
);

// ─── Sticky TOC ───────────────────────────────────────────────────────────────
const SectionTOC: React.FC<{ sections: { heading: string }[]; activeId: string | null }> = ({
  sections,
  activeId,
}) => (
  <nav aria-label="Table of contents" className="flex flex-col gap-stack">
    <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
      <Hash size={14} />
      Table des matières
    </span>
    <ul className="flex flex-col gap-tight m-0 p-0 list-none">
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

// ─── Share bar ────────────────────────────────────────────────────────────────
const ShareBar: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Silent fail
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
        className="inline-flex items-center gap-stack-xs px-3 h-9 rounded-pill bg-white border border-ink-200 text-ink-700 hover:bg-ink-50 hover:border-primary-300 transition-colors duration-fast min-h-touch"
        aria-label="Share article"
      >
        <Share2 size={14} />
        <span className="font-body text-caption font-semibold">Share</span>
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-stack-xs px-3 h-9 rounded-pill border transition-colors duration-fast min-h-touch ${
          copied
            ? 'bg-success-bg text-success-fg border-success-base/40'
            : 'bg-white text-ink-700 border-ink-200 hover:bg-ink-50 hover:border-primary-300'
        }`}
        aria-label="Copy link"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span className="font-body text-caption font-semibold">
          {copied ? 'Copied' : 'Copy link'}
        </span>
      </button>
    </div>
  );
};

// ─── Active section hook ──────────────────────────────────────────────────────
const useActiveSection = (sectionIds: string[]): string | null => {
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (sectionIds.length === 0) return;
    const handler = () => {
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

// ─── Body block renderer ──────────────────────────────────────────────────────
const PULLQUOTE_GRADIENTS = [
  'from-primary-50 via-white to-accent-50/30 border-primary-100',
  'from-secondary-50 via-white to-accent-50/30 border-secondary-100',
  'from-accent-50 via-white to-primary-50/30 border-accent-100',
];

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
          <Quote aria-hidden size={48} className="absolute -top-4 left-section text-primary-300/40" />
          <p className="font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-medium text-ink-900 leading-snug m-0 italic">
            « {block.text} »
          </p>
        </blockquote>
      );
    default:
      return null;
  }
};

// ─── Key findings callout (from internal Dossier pattern) ────────────────────
const KeyFindingsSection: React.FC = () => {
  const findings = [
    {
      icon: <TrendingUp size={20} />,
      title: 'Adoption croissante',
      stat: '+34%',
      desc: 'des organisations adoptent l\'IA en formation',
    },
    {
      icon: <Users size={20} />,
      title: 'Formateurs engagés',
      stat: '78%',
      desc: 'utilisent au moins 1 outil IA hebdomadairement',
    },
    {
      icon: <Zap size={20} />,
      title: 'Gain de productivité',
      stat: '3.2×',
      desc: 'plus rapide pour créer du contenu pédagogique',
    },
  ];

  return (
    <FadeInWhenVisible className="my-section rounded-3xl bg-gradient-to-br from-primary-50 to-accent-50/30 border border-primary-100 p-section-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-section">
        {findings.map((finding, i) => (
          <div key={i} className="flex flex-col gap-stack">
            <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              {finding.icon}
            </div>
            <div>
              <p className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest m-0">
                {finding.title}
              </p>
              <p className="font-display text-2xl font-bold text-ink-900 m-0 mt-stack">
                {finding.stat}
              </p>
              <p className="font-body text-body-sm text-ink-600 m-0 mt-tight">
                {finding.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const MarketingResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? findArticle(slug) : null;
  const ref = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(ref);

  const sectionIds = article ? article.sections.map((s) => headingToId(s.heading)) : [];
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!article) {
    return <Navigate to="/marketing/resources" replace />;
  }

  const related = getRelatedArticles(article.slug, 3);
  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = ARTICLES[currentIndex - 1] ?? null;
  const next = ARTICLES[currentIndex + 1] ?? null;

  let pullquoteCount = 0;

  return (
    <div ref={ref} className="bg-white">
      <ReadingProgressBar progress={progress} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={`relative pt-32 pb-page overflow-hidden bg-gradient-to-br ${article.cover}`}>
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-stack-lg">
          {/* Back link */}
          <FadeInWhenVisible direction="up">
            <Link
              to="/marketing/resources"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Back to Resources
            </Link>
          </FadeInWhenVisible>

          {/* Meta */}
          <FadeInWhenVisible direction="up" delay={0.05}>
            <div className="flex items-center gap-stack flex-wrap">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-pill border font-body text-caption font-bold uppercase tracking-wider ${CATEGORY_TONES[article.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'}`}
              >
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Clock size={14} />
                {article.readTime} read
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
                    TLS Team
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
            <article className="flex flex-col gap-stack-lg">
              {/* Intro */}
              <FadeInWhenVisible direction="up">
                <p className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] text-ink-800 leading-relaxed m-0 first-letter:font-extrabold first-letter:text-[3rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-primary-600">
                  {article.intro}
                </p>
              </FadeInWhenVisible>

              {/* Body blocks */}
              {article.body.map((block, i) => {
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

              {/* Key findings callout (internal Dossier pattern) */}
              <KeyFindingsSection />

              {/* Conclusion */}
              <FadeInWhenVisible direction="up">
                <div className="rounded-3xl bg-ink-50/40 border border-ink-100 p-section mt-stack">
                  <div className="flex items-center gap-stack-xs mb-stack">
                    <Star size={18} className="text-accent-400" />
                    <span className="font-body text-caption font-bold text-ink-700 uppercase tracking-widest">
                      En résumé
                    </span>
                  </div>
                  <p className="font-display text-[clamp(1.125rem,1.5vw,1.375rem)] text-ink-800 leading-relaxed m-0">
                    {article.conclusion}
                  </p>
                </div>
              </FadeInWhenVisible>

              {/* Source link */}
              <FadeInWhenVisible direction="up">
                <div className="flex items-center gap-stack-xs pt-stack border-t border-ink-100">
                  <ExternalLink size={14} className="text-ink-400 shrink-0" />
                  <span className="font-body text-caption text-ink-500">
                    Full article at{' '}
                    <a
                      href={article.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors duration-fast"
                    >
                      thelearningsociety.fr
                    </a>
                  </span>
                </div>
              </FadeInWhenVisible>
            </article>
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
              to={`/marketing/resources/${prev.slug}`}
              className="group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-lg transition-all duration-base"
            >
              <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                <ArrowLeft size={14} className="transition-transform duration-base group-hover:-translate-x-1" />
                Previous
              </span>
              <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-fast">
                {prev.title}
              </h3>
              <p className="font-body text-caption text-ink-500 m-0">{prev.date} · {prev.readTime}</p>
            </Link>
          )}
          {next && (
            <Link
              to={`/marketing/resources/${next.slug}`}
              className={`group flex flex-col gap-stack p-stack-lg rounded-2xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-lg transition-all duration-base text-right ${!prev ? 'md:col-start-2' : ''}`}
            >
              <span className="inline-flex items-center gap-1.5 self-end font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                Next
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

      {/* ── Related resources ─────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section">
          <FadeInWhenVisible direction="up">
            <div className="flex flex-col gap-stack max-w-3xl">
              <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
                Read Next
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Three more <span className="text-accent-400">insights</span> on related topics.
              </h2>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {related.map((r, i) => (
              <FadeInWhenVisible key={r.slug} direction="up" delay={i * 0.1}>
                <Link to={`/marketing/resources/${r.slug}`} className="group block h-full">
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
                      <div className="flex items-center gap-stack-xs flex-wrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-pill border font-body text-micro font-bold uppercase tracking-wider bg-ink-50 text-ink-700 border-ink-100`}
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
                        Read
                        <ArrowRight size={12} className="transition-transform duration-base group-hover:translate-x-0.5" />
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

export default MarketingResourceDetail;
