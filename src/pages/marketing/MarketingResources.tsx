/**
 * MarketingResources — Ressources & Blog landing page
 *
 * Direction: Editorial hub combining articles, dossiers, guides, and tutorials.
 * Inspired by internal pages (Magazine, Dossier, ArticleDetail) with marketing layer.
 *
 * Structure:
 *  1. EditorialHero (tone: brand — Learning Society authority voice)
 *  2. Filter tabs (All / Articles / Dossiers / Guides / Tutoriels)
 *  3. Featured card (latest article)
 *  4. Grid of resource cards (3-col, responsive)
 *  5. Newsletter signup CTA
 *  6. Related topics section
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { Input } from '../../components/core/Input';
import { PageHero } from '../../components/patterns/EditorialHero';
import { FadeInWhenVisible, MagneticButton } from '../../components/marketing/motion';
import { ARTICLES } from '../../data/marketingArticles';

type ResourceType = 'all' | 'article' | 'dossier' | 'guide' | 'tutorial';

const RESOURCE_TYPES = [
  { id: 'all', label: 'Tous', count: 32 },
  { id: 'article', label: 'Articles', count: 12, icon: '📄' },
  { id: 'dossier', label: 'Dossiers', count: 8, icon: '📑' },
  { id: 'guide', label: 'Guides Pratiques', count: 7, icon: '🗂️' },
  { id: 'tutorial', label: 'Tutoriels vidéo', count: 5, icon: '🎬' },
] as const;

const FEATURED_TOPICS = [
  { label: 'IA en Formation', href: '#', count: 18 },
  { label: 'Compétences', href: '#', count: 15 },
  { label: 'Hybrid Learning', href: '#', count: 11 },
  { label: 'L&D Strategy', href: '#', count: 9 },
  { label: 'Micro-learning', href: '#', count: 7 },
  { label: 'Engagement', href: '#', count: 6 },
];

const CATEGORY_COLORS: Record<string, string> = {
  IA: 'from-primary-100 to-primary-50 border-primary-200',
  Pédagogie: 'from-secondary-100 to-secondary-50 border-secondary-200',
  Outils: 'from-accent-100 to-accent-50 border-accent-200',
  Innovation: 'from-primary-100 to-primary-50 border-primary-200',
  "Retours d'expérience": 'from-secondary-100 to-secondary-50 border-secondary-200',
};

const CATEGORY_BADGE: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-warning-fg border-accent-100',
  Innovation: 'bg-primary-50 text-primary-700 border-primary-100',
  "Retours d'expérience": 'bg-secondary-50 text-secondary-700 border-secondary-100',
};

/**
 * Featured article card — Hero card at top of grid
 */
const FeaturedCard: React.FC<{ article: typeof ARTICLES[0] }> = ({ article }) => (
  <FadeInWhenVisible>
    <Link to={`/marketing/magazine/${article.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className={`relative rounded-3xl bg-gradient-to-br ${CATEGORY_COLORS[article.category]} border h-full overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-base`}
      >
        {/* Image background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative p-section-lg sm:p-section-xl flex flex-col gap-section h-full justify-between">
          <div className="flex flex-col gap-stack">
            <div className="flex items-center gap-stack flex-wrap">
              <span className={`inline-flex items-center px-3 py-1 rounded-pill border font-body text-caption font-bold uppercase tracking-wider ${CATEGORY_BADGE[article.category]}`}>
                ⭐ À la une
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-600">
                <Calendar size={14} />
                {article.date}
              </span>
            </div>

            <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold text-ink-900 leading-tight m-0">
              {article.title}
            </h3>

            <p className="font-body text-body text-ink-700 leading-relaxed m-0">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center gap-tight font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-200/40">
            Lire l'article
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
const ResourceCard: React.FC<{ article: typeof ARTICLES[0]; index: number }> = ({
  article,
  index,
}) => (
  <FadeInWhenVisible direction="up" delay={index * 0.05}>
    <Link to={`/marketing/magazine/${article.slug}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-base"
      >
        {/* Image placeholder */}
        <div className={`relative h-40 bg-gradient-to-br ${CATEGORY_COLORS[article.category]} flex items-center justify-center overflow-hidden`}>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
          <BookOpen size={40} strokeWidth={1.25} className="text-ink-900/20 relative" />
        </div>

        {/* Content */}
        <div className="p-stack-lg flex flex-col gap-stack flex-1">
          {/* Meta */}
          <div className="flex items-center gap-stack-xs flex-wrap">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-pill border font-body text-micro font-bold uppercase tracking-wider ${CATEGORY_BADGE[article.category]}`}>
              {article.category}
            </span>
            <span className="inline-flex items-center gap-tight font-body text-caption text-ink-500">
              <Clock size={11} />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-h5 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base line-clamp-2">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="font-body text-caption text-ink-500 m-0 line-clamp-3 flex-1">
            {article.summary}
          </p>

          {/* Footer */}
          <div className="inline-flex items-center gap-tight font-body text-caption font-bold text-primary-700 pt-stack border-t border-ink-100">
            Lire
            <ArrowRight size={12} className="transition-transform duration-base group-hover:translate-x-0.5" />
          </div>
        </div>
      </motion.article>
    </Link>
  </FadeInWhenVisible>
);

/**
 * Main component
 */
export const MarketingResources: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedType === 'all') return matchesSearch;
    if (selectedType === 'article') return matchesSearch;
    // Note: in a real app, articles would have a `type` field
    return matchesSearch;
  });

  const featured = filteredArticles[0];
  const remaining = filteredArticles.slice(1);

  return (
    <div className="bg-white">
      {/* ── Hero section ──────────────────────────────────────────────────────── */}
      <PageHero
        tone="brand"
        eyebrow={{
          icon: <BookOpen size={16} />,
          text: 'Ressources & Blog',
        }}
        title="Apprenez. Transformez. Progressez."
        summary="Articles, dossiers et guides pour maîtriser l'IA en formation, transformer vos pratiques L&D, et piloter le changement dans votre organisation."
        trailing={
          <MagneticButton strength={12}>
            <Button variant="warm" size="lg" trailingIcon={<Sparkles size={18} />}>
              S'inscrire à la newsletter
            </Button>
          </MagneticButton>
        }
      />

      {/* ── Filter & search ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-6 py-section">
          <div className="flex flex-col gap-stack">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder="Chercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leadingIcon={<Search size={16} />}
                className="pl-10"
              />
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-tight flex-wrap">
              {RESOURCE_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id as ResourceType)}
                  className={`inline-flex items-center gap-1.5 px-4 h-10 rounded-pill font-body text-body-sm font-semibold transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    selectedType === type.id
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-ink-50 text-ink-700 hover:bg-ink-100 border border-ink-200'
                  }`}
                >
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
        <div className="max-w-7xl mx-auto px-6">
          {filteredArticles.length === 0 ? (
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
                  <FeaturedCard article={featured} />
                </div>
              )}

              {/* Grid of remaining articles */}
              {remaining.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
                  {remaining.map((article, i) => (
                    <ResourceCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────────────────── */}
      <section className="py-section-lg bg-gradient-to-br from-primary-50 to-primary-100/50 border-y border-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
        <div className="max-w-7xl mx-auto px-6">
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
