/**
 * MarketingResources — Ressources & Blog, hub agrégateur unique du site.
 *
 * SEUL hub de contenu du site marketing (Phase consolidation) : Magazine et
 * Dossiers n'ont plus de hub dédié (des hubs séparés par format n'apportaient
 * rien — un seul point d'entrée filtrable équivalent blog). Agrège les 5
 * formats de contenu : Articles, Dossiers, Guides PDF, Tutoriels vidéo,
 * Webinaires. Chaque format garde son propre template de lecture/conversion
 * (voir Marketing*Detail.tsx) mais partage ce même point d'entrée + filtres.
 *
 * Structure:
 *  1. Header flat — titre + sous-titre, pas de card hero éditoriale
 *  2. Recherche + filtres par type (fonctionnels — comptes réels des datasets)
 *  3. Carte "à la une" + grille de cartes (routées vers le bon template par type)
 *  4. Newsletter signup CTA
 *  5. Thématiques clés
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
  Library,
  FileText,
  Play,
  Radio,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { Input } from '../../components/core/Input';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { ARTICLES } from '../../data/marketingArticles';
import { DOSSIERS } from '../../data/marketingDossiers';
import { VIDEOS } from '../../data/marketingVideos';
import { GUIDES } from '../../data/marketingGuides';
import { WEBINAIRES } from '../../data/marketingWebinaires';

type ResourceType = 'all' | 'article' | 'dossier' | 'guide' | 'tutorial' | 'webinaire';
type ContentType = Exclude<ResourceType, 'all'>;

interface ResourceItem {
  type: ContentType;
  slug: string;
  href: string;
  title: string;
  summary: string;
  badgeLabel: string;
  date: string;
  meta: string;
  cover: string;
}

const CATEGORY_BADGE: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-warning-fg border-accent-100',
  Innovation: 'bg-primary-50 text-primary-700 border-primary-100',
  "Retours d'expérience": 'bg-secondary-50 text-secondary-700 border-secondary-100',
};

const TYPE_BADGE_TONE: Record<ContentType, string> = {
  article: 'bg-primary-50 text-primary-700 border-primary-100',
  dossier: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  guide: 'bg-accent-50 text-warning-fg border-accent-100',
  tutorial: 'bg-primary-50 text-primary-700 border-primary-100',
  webinaire: 'bg-success-bg text-success-fg border-success-base/30',
};

const TYPE_ICON: Record<ContentType, LucideIcon> = {
  article: BookOpen,
  dossier: Library,
  guide: FileText,
  tutorial: Play,
  webinaire: Radio,
};

const TYPE_CTA_LABEL: Record<ContentType, string> = {
  article: "Lire l'article",
  dossier: 'Lire le dossier',
  guide: 'Télécharger',
  tutorial: 'Regarder',
  webinaire: 'Voir le webinaire',
};

/** Normalise les 5 datasets en une liste unique de cartes, chacune routée
 * vers son propre template de détail. */
const ALL_ITEMS: ResourceItem[] = [
  ...ARTICLES.map((a): ResourceItem => ({
    type: 'article',
    slug: a.slug,
    href: `/website/magazine/${a.slug}`,
    title: a.title,
    summary: a.summary,
    badgeLabel: a.category,
    date: a.date,
    meta: a.readTime,
    cover: a.cover,
  })),
  ...DOSSIERS.map((d): ResourceItem => ({
    type: 'dossier',
    slug: d.slug,
    href: `/website/dossiers/${d.slug}`,
    title: d.title,
    summary: d.summary,
    badgeLabel: 'Dossier',
    date: d.date,
    meta: `${d.readTime} · ${d.sourceCount} sources`,
    cover: d.cover,
  })),
  ...VIDEOS.map((v): ResourceItem => ({
    type: 'tutorial',
    slug: v.slug,
    href: `/website/videos/${v.slug}`,
    title: v.title,
    summary: v.description,
    badgeLabel: 'Vidéo',
    date: v.date,
    meta: v.duration,
    cover: v.cover,
  })),
  ...GUIDES.map((g): ResourceItem => ({
    type: 'guide',
    slug: g.slug,
    href: `/website/guides/${g.slug}`,
    title: g.title,
    summary: g.description,
    badgeLabel: `Guide ${g.format}`,
    date: g.date,
    meta: `${g.pageCount} pages`,
    cover: g.cover,
  })),
  ...WEBINAIRES.map((w): ResourceItem => ({
    type: 'webinaire',
    slug: w.slug,
    href: `/website/webinaires/${w.slug}`,
    title: w.title,
    summary: w.description,
    badgeLabel: w.status === 'upcoming' ? 'Webinaire · à venir' : 'Webinaire · replay',
    date: w.date,
    meta: w.time,
    cover: w.cover,
  })),
];

const RESOURCE_TYPES = [
  { id: 'all' as const, label: 'Tous', count: ALL_ITEMS.length, Icon: null },
  { id: 'article' as const, label: 'Articles', count: ARTICLES.length, Icon: BookOpen },
  { id: 'dossier' as const, label: 'Dossiers', count: DOSSIERS.length, Icon: Library },
  { id: 'guide' as const, label: 'Guides', count: GUIDES.length, Icon: FileText },
  { id: 'tutorial' as const, label: 'Tutoriels vidéo', count: VIDEOS.length, Icon: Play },
  { id: 'webinaire' as const, label: 'Webinaires', count: WEBINAIRES.length, Icon: Radio },
];

const FEATURED_TOPICS = [
  { label: 'IA en Formation', href: '#', count: 18 },
  { label: 'Compétences', href: '#', count: 15 },
  { label: 'Hybrid Learning', href: '#', count: 11 },
  { label: 'L&D Strategy', href: '#', count: 9 },
  { label: 'Micro-learning', href: '#', count: 7 },
  { label: 'Engagement', href: '#', count: 6 },
];

/**
 * Canonical container — same width/padding scale on every section of this
 * page (header, filters, grid, topics), so nothing horizontally drifts.
 */
const CONTAINER = 'max-w-page mx-auto px-4 sm:px-6 lg:px-10';

const badgeTone = (item: ResourceItem) =>
  item.type === 'article' ? (CATEGORY_BADGE[item.badgeLabel] ?? TYPE_BADGE_TONE.article) : TYPE_BADGE_TONE[item.type];

/**
 * Featured card — Hero card at top of grid
 */
const FeaturedCard: React.FC<{ item: ResourceItem }> = ({ item }) => (
  <FadeInWhenVisible>
    <Link to={item.href} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className={`relative rounded-3xl bg-gradient-to-br ${item.cover} border h-full overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-base`}
      >
        {/* Image background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative p-section-lg sm:p-section-xl flex flex-col gap-section h-full justify-between">
          <div className="flex flex-col gap-stack">
            <div className="flex items-center gap-stack flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill border font-body text-caption font-bold uppercase tracking-wider ${badgeTone(item)}`}>
                <Sparkles size={12} /> À la une
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} />
                {item.date}
              </span>
            </div>

            <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-ink-900 leading-tight m-0">
              {item.title}
            </h3>

            <p className="font-body text-body text-ink-700 leading-relaxed m-0">
              {item.summary}
            </p>
          </div>

          <div className="flex items-center gap-tight font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-200/40">
            {TYPE_CTA_LABEL[item.type]}
            <ArrowRight
              size={14}
              className="transition-transform duration-base group-hover:translate-x-1"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  </FadeInWhenVisible>
);

/**
 * Resource card — standard grid item
 */
const ResourceCard: React.FC<{ item: ResourceItem; index: number }> = ({ item, index }) => {
  const Icon = TYPE_ICON[item.type];
  return (
    <FadeInWhenVisible direction="up" delay={index * 0.05}>
      <Link to={item.href} className="group block h-full">
        <motion.article
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-base"
        >
          {/* Image placeholder */}
          <div className={`relative h-40 bg-gradient-to-br ${item.cover} flex items-center justify-center overflow-hidden`}>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
            <Icon size={40} strokeWidth={1.25} className="text-ink-900/20 relative" />
          </div>

          {/* Content */}
          <div className="p-stack-lg flex flex-col gap-stack flex-1">
            {/* Meta */}
            <div className="flex items-center gap-stack-xs flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-pill border font-body text-micro font-bold uppercase tracking-wider ${badgeTone(item)}`}>
                {item.badgeLabel}
              </span>
              <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
                <Clock size={11} />
                {item.meta}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base line-clamp-2">
              {item.title}
            </h3>

            {/* Summary */}
            <p className="font-body text-caption text-ink-500 m-0 line-clamp-3 flex-1">
              {item.summary}
            </p>

            {/* Footer */}
            <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-100">
              {TYPE_CTA_LABEL[item.type]}
              <ArrowRight size={12} className="transition-transform duration-base group-hover:translate-x-0.5" />
            </div>
          </div>
        </motion.article>
      </Link>
    </FadeInWhenVisible>
  );
};

/**
 * Main component
 */
export const MarketingResources: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = ALL_ITEMS.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const featured = filteredItems[0];
  const remaining = filteredItems.slice(1);

  return (
    <div className="bg-white">
      {/* ── Header — flat, pas de card hero éditoriale ─────────────────────── */}
      <div className={`${CONTAINER} pt-24 sm:pt-28 lg:pt-32 pb-section flex flex-col gap-tight`}>
        <h1 className="m-0 font-display text-h2 font-bold text-ink-900 tracking-headline leading-tight">
          Ressources
        </h1>
        <p className="m-0 font-body text-body-sm text-ink-500 max-w-2xl">
          Articles, dossiers, guides, vidéos et webinaires : tout le contenu TLS au même endroit.
        </p>
      </div>

      {/* ── Filter & search ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-ink-100">
        <div className={`${CONTAINER} py-section`}>
          <div className="flex flex-col gap-stack">
            {/* Search */}
            <Input
              placeholder="Chercher une ressource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leadingIcon={<Search size={16} />}
            />

            {/* Type filters */}
            <div className="flex items-center gap-tight flex-wrap">
              {RESOURCE_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`inline-flex items-center gap-1.5 px-4 h-10 rounded-pill font-body text-body-sm font-semibold transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    selectedType === type.id
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-ink-50 text-ink-700 hover:bg-ink-100 border border-ink-200'
                  }`}
                >
                  {type.Icon && <type.Icon size={14} />}
                  <span>{type.label}</span>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-caption font-bold ${
                    selectedType === type.id ? 'bg-white/20' : 'bg-ink-200 text-ink-700'
                  }`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content grid ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className={CONTAINER}>
          {filteredItems.length === 0 ? (
            <FadeInWhenVisible className="text-center py-section">
              <BookOpen size={48} className="mx-auto text-ink-300 mb-stack" />
              <h3 className="font-display text-h3 font-bold text-ink-900 m-0 mb-stack">
                Aucun résultat
              </h3>
              <p className="font-body text-body text-ink-600 max-w-md mx-auto">
                Essayez une autre recherche ou explorez toutes nos ressources.
              </p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                }}
                className="mt-stack"
              >
                Réinitialiser les filtres
              </Button>
            </FadeInWhenVisible>
          ) : (
            <>
              {/* Featured card — full width */}
              {featured && (
                <div className="mb-section">
                  <FeaturedCard item={featured} />
                </div>
              )}

              {/* Grid of remaining items */}
              {remaining.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
                  {remaining.map((item, i) => (
                    <ResourceCard key={`${item.type}-${item.slug}`} item={item} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────────────── */}
      <section className="py-section-lg bg-gradient-to-br from-primary-50 to-primary-100/50 border-y border-primary-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <FadeInWhenVisible className="flex flex-col gap-stack items-center">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-ink-900 leading-tight m-0">
              Restez à jour
            </h2>
            <p className="font-body text-body text-ink-700 max-w-2xl">
              Recevez nos meilleurs articles, dossiers et guides directement dans votre boîte mail chaque semaine.
            </p>
            <form className="flex flex-col sm:flex-row gap-stack-xs w-full max-w-md mt-stack">
              <Input
                type="email"
                placeholder="ton@email.com"
                required
                className="flex-1"
              />
              <MagneticButton strength={12}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  S'inscrire
                </Button>
              </MagneticButton>
            </form>
            <p className="font-body text-caption text-ink-500">
              Sans spam. Désinscrivez-vous anytime.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Topics section ────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className={CONTAINER}>
          <FadeInWhenVisible className="flex flex-col gap-section">
            <div>
              <p className="font-body text-caption font-bold text-primary-700 uppercase tracking-widest m-0">
                Explorez par sujet
              </p>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold text-ink-900 leading-tight m-0 mt-stack">
                Thématiques clés
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
              {FEATURED_TOPICS.map((topic) => (
                <a
                  key={topic.label}
                  href={topic.href}
                  className="group flex flex-col gap-tight p-stack rounded-2xl bg-ink-50 hover:bg-primary-50 border border-ink-100 hover:border-primary-200 transition-all duration-base"
                >
                  <h3 className="font-display text-h5 font-bold text-ink-900 m-0 group-hover:text-primary-700 transition-colors">
                    {topic.label}
                  </h3>
                  <span className="font-body text-caption text-ink-500">
                    {topic.count} ressources
                  </span>
                </a>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingResources;
