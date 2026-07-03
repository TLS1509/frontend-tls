/**
 * MarketingDossierDetail : lecture d'un Dossier (contenu de fond, sourcé).
 *
 * Modèle calqué sur MarketingArticleDetail (hero light + cover, sommaire sticky,
 * corps chapitré) MAIS :
 *  - reveal LOCAL « visible par défaut » (pas de FadeInWhenVisible → pas de bug hero-vide)
 *  - PAS de GradientText (banni)
 *  - bloc `stat` (donnée chiffrée attribuée à sa source)
 *  - section Bibliographie (la preuve)
 *  - routes à plat (/dossiers, /dossiers/:slug)
 */

import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Hash,
  Quote,
  Library,
  ListChecks,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { PageShell } from '../../components/layout';
import { MeshGradientBg } from '../../components/marketing/motion';
import {
  findDossier,
  type DossierBodyBlock,
  type DossierSource,
} from '../../data/marketingDossiers';

/**
 * Canonical container — matches PageShell width="medium" (1024px) exactly,
 * same as MarketingArticleDetail.tsx / MagazineArticle.tsx (Veille family).
 * Applied to every section (hero, body, key findings, bibliography, CTA) so
 * nothing horizontally drifts between sections.
 */
const CONTAINER = 'max-w-medium mx-auto px-4 sm:px-6 lg:px-10';

// ─── Reveal local : VISIBLE par défaut, seul translateY s'anime ───────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <motion.div
    className={className}
    initial={{ y: 26 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Reading progress bar (fixe, en haut) ─────────────────────────────────────
const ReadingProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-0.5 origin-left bg-primary-600 z-sticky"
    />
  );
};

// ─── Intro callout (résumé exécutif) ──────────────────────────────────────────
const IntroCallout: React.FC<{ text: string }> = ({ text }) => (
  <div className="rounded-2xl border border-secondary-100 bg-secondary-50/60 p-stack-lg flex gap-stack">
    <Quote size={22} className="text-secondary-400 shrink-0 mt-0.5" />
    <div className="flex flex-col gap-tight">
      <span className="font-body text-caption font-bold text-secondary-700 uppercase tracking-widest">
        En résumé
      </span>
      <p className="font-body text-body text-ink-700 leading-relaxed m-0">{text}</p>
    </div>
  </div>
);

// ─── Points clés (key findings) ───────────────────────────────────────────────
const KeyFindings: React.FC<{ findings: { text: string; source?: string }[] }> = ({ findings }) => (
  <section className="py-page bg-white">
    <div className={`${CONTAINER} flex flex-col gap-section`}>
      <Reveal>
        <span className="inline-flex items-center gap-stack-xs font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
          <ListChecks size={15} />
          Points clés
        </span>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
        {findings.map((f, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-ink-100 bg-ink-50/40 p-stack-lg flex flex-col gap-stack">
              <span className="font-display text-h4 font-bold text-primary-700 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-body text-body text-ink-800 leading-snug m-0">{f.text}</p>
              {f.source && (
                <span className="font-body text-caption text-ink-500 mt-auto">Source : {f.source}</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─── Slug helper (TOC anchors) ────────────────────────────────────────────────
const headingToId = (heading: string): string =>
  heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ─── Active-section tracking for the sticky TOC ───────────────────────────────
const useActiveSection = (ids: string[]): string | null => {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

// ─── Sticky table of contents ─────────────────────────────────────────────────
const SectionTOC: React.FC<{ sections: { heading: string }[]; activeId: string | null }> = ({
  sections,
  activeId,
}) => (
  <nav aria-label="Sommaire du dossier" className="flex flex-col gap-stack">
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

// ─── Body renderer ────────────────────────────────────────────────────────────
const DossierBody: React.FC<{ intro: string; body: DossierBodyBlock[] }> = ({ intro, body }) => (
  <article className="flex flex-col gap-stack-lg">
    <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 first-letter:font-display first-letter:text-[3.25rem] first-letter:font-extrabold first-letter:text-primary-700 first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
      {intro}
    </p>

    {body.map((block, i) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2
              key={i}
              id={headingToId(block.text)}
              className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold text-ink-900 leading-tight tracking-tight m-0 mt-stack scroll-mt-28"
            >
              {block.text}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={i} className="font-display text-h4 font-bold text-ink-800 leading-snug m-0 mt-stack">
              {block.text}
            </h3>
          );
        case 'p':
          return (
            <p key={i} className="font-body text-body text-ink-700 leading-relaxed m-0">
              {block.text}
            </p>
          );
        case 'ul':
          return (
            <ul key={i} className="flex flex-col gap-stack m-0 pl-0 list-none">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-stack-xs font-body text-body text-ink-700 leading-relaxed">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        case 'pullquote':
          return (
            <figure key={i} className="my-stack px-stack-lg py-stack bg-accent-50 rounded-xl">
              <Quote size={22} className="text-accent-400 mb-2" />
              <blockquote className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold text-accent-900 leading-snug m-0">
                {block.text}
              </blockquote>
            </figure>
          );
        case 'stat':
          return (
            <div
              key={i}
              className="my-stack rounded-2xl border border-secondary-100 bg-gradient-to-br from-secondary-50 to-accent-50/50 p-stack-lg flex flex-col gap-tight"
            >
              <span className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold text-secondary-700 leading-none tracking-tight">
                {block.value}
              </span>
              <span className="font-body text-body text-ink-700 leading-snug">{block.label}</span>
              <span className="font-body text-caption text-ink-500 mt-1">Source : {block.source}</span>
            </div>
          );
        default:
          return null;
      }
    })}
  </article>
);

// ─── Bibliography ─────────────────────────────────────────────────────────────
const Bibliography: React.FC<{ sources: DossierSource[] }> = ({ sources }) => (
  <section className="py-page bg-ink-50/40 border-y border-ink-100">
    <div className={`${CONTAINER} flex flex-col gap-section`}>
      <Reveal>
        <div className="flex flex-col gap-stack max-w-content">
          <span className="inline-flex items-center gap-stack-xs font-body text-caption font-bold text-primary-700 uppercase tracking-widest">
            <Library size={15} />
            Bibliographie
          </span>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold text-ink-900 leading-[1.08] tracking-tight m-0">
            {sources.length} sources, toutes vérifiables.
          </h2>
          <p className="font-body text-body text-ink-600 m-0">
            Les données chiffrées de ce dossier décrivent la Skills-Based Organization en général
            (recherche institutionnelle). Aucune n'est un résultat client The Learning Society.
          </p>
        </div>
      </Reveal>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-stack m-0 p-0 list-none">
        {sources.map((s) => (
          <li key={s.ref}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-stack-xs p-stack rounded-xl bg-white border border-ink-100 hover:border-primary-200 hover:shadow-sm transition-all duration-base"
            >
              <span className="font-mono text-caption font-bold text-primary-600 shrink-0 mt-0.5">
                {s.ref}
              </span>
              <span className="flex flex-col gap-0.5 min-w-0">
                <span className="font-body text-body-sm font-semibold text-ink-900 leading-snug group-hover:text-primary-700 transition-colors duration-fast">
                  {s.title}
                </span>
                <span className="font-body text-caption text-ink-500">
                  {s.org} · {s.year}
                </span>
              </span>
              <ExternalLink
                size={14}
                className="text-ink-300 shrink-0 ml-auto mt-0.5 transition-colors duration-fast group-hover:text-primary-500"
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export const MarketingDossierDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dossier = slug ? findDossier(slug) : null;

  const sectionIds = dossier ? dossier.sections.map((s) => headingToId(s.heading)) : [];
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!dossier) {
    return <Navigate to="/website/resources" replace />;
  }

  return (
    <div className="bg-white">
      <ReadingProgressBar />
      {/* ── Hero (light + warm) ─────────────────────────────────────────────── */}
      <section className={`relative pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br ${dossier.cover}`}>
        <MeshGradientBg tone="warm" intensity="subtle" />

        <div className={`relative ${CONTAINER} flex flex-col gap-stack-lg`}>
          <Reveal>
            <Link
              to="/website/resources"
              className="inline-flex items-center gap-1.5 self-start text-ink-700 hover:text-ink-900 font-body text-body-sm font-semibold transition-colors duration-fast group"
            >
              <ArrowLeft size={16} className="transition-transform duration-base group-hover:-translate-x-1" />
              Tous les dossiers
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center gap-stack flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-pill border bg-secondary-50 text-secondary-700 border-secondary-100 font-body text-caption font-bold uppercase tracking-wider">
                Dossier
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} />
                {dossier.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Clock size={14} />
                {dossier.readTime} de lecture
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Library size={14} />
                {dossier.sourceCount} sources
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 text-[clamp(2.25rem,5vw,4rem)]">
              {dossier.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-display text-[clamp(1.25rem,2vw,1.5rem)] text-ink-700 leading-snug m-0 italic">
              {dossier.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Body + TOC — sommaire flottant dans la marge (hors container) ──── */}
      <div className="relative bg-white">
        <div className="hidden 2xl:block absolute top-0 left-[calc(50%-47.5rem)] w-56">
          <div className="sticky top-28">
            <SectionTOC sections={dossier.sections} activeId={activeId} />
          </div>
        </div>
        <PageShell width="medium" className="bg-white">
          <IntroCallout text={dossier.summary} />
          <DossierBody intro={dossier.intro} body={dossier.body} />
        </PageShell>
      </div>

      {/* ── Points clés ─────────────────────────────────────────────────────── */}
      {dossier.keyFindings && dossier.keyFindings.length > 0 && (
        <KeyFindings findings={dossier.keyFindings} />
      )}

      {/* ── Bibliographie ───────────────────────────────────────────────────── */}
      <Bibliography sources={dossier.sources} />

      {/* ── CTA final (le seul moment dark) ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-ink-900 via-primary-900 to-primary-950">
        <MeshGradientBg tone="ink" intensity="subtle" />
        <div className={`relative ${CONTAINER} text-center flex flex-col items-center gap-stack-lg`}>
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white leading-[1.05] tracking-tight m-0">
              Passer de la théorie à la pratique ?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-body-lg text-white/80 max-w-2xl m-0">
              La Learning App et l'accompagnement STRIDE opérationnalisent ce modèle dans votre
              organisation.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-stack">
              <Link to="/website/accompagnement">
                <Button variant="primary" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Découvrir l'accompagnement
                </Button>
              </Link>
              <Link to="/website/learning-app">
                <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={18} />}>
                  Voir la Learning App
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default MarketingDossierDetail;
