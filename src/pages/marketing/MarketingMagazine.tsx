/**
 * MarketingMagazine — Editorial article grid (Phase P2.4)
 *
 * Direction: Editorial magazine. Featured article hero + filterable grid + newsletter.
 * Tone: brand primary + warm category accents + sun accents.
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  ArrowRight,
  Clock,
  Sparkles,
  Search,
  ArrowUpRight,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  MeshGradientBg,
  FadeInWhenVisible,
  MagneticButton,
  GradientText,
  useMarketingToast,
} from '../../components/marketing/motion';
import { ARTICLES, type ArticleCategory } from '../../data/marketingArticles';

type Category = 'Tous' | ArticleCategory;

const CATEGORIES: Category[] = [
  'Tous',
  'IA',
  'Pédagogie',
  'Outils',
  'Innovation',
  "Retours d'expérience",
];

// Articles importés depuis src/data/marketingArticles.ts (10 articles fidèles au live site).

const CATEGORY_TONES: Record<string, string> = {
  IA: 'bg-primary-50 text-primary-700 border-primary-100',
  Pédagogie: 'bg-secondary-50 text-secondary-700 border-secondary-100',
  Outils: 'bg-accent-50 text-warning-fg border-accent-100',
  Innovation: 'bg-primary-50 text-primary-700 border-primary-100',
  "Retours d'expérience": 'bg-secondary-50 text-secondary-700 border-secondary-100',
};

export const MarketingMagazine: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { push: pushToast } = useMarketingToast();

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchCat = activeCategory === 'Tous' || a.category === activeCategory;
      const matchQuery =
        query.trim() === '' ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, query]);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a !== featured);

  return (
    <div className="bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50/40">
        <MeshGradientBg tone="warm" intensity="subtle" />
        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-secondary-200 shadow-xs">
              <TrendingUp size={14} className="text-secondary-600" />
              <span className="font-body text-caption font-semibold text-secondary-700 tracking-wider uppercase">
                Le Mag' · réflexions & analyses
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.5rem,7vw,5rem)] max-w-4xl">
              Réflexions sur l'IA &{' '}
              <GradientText
                from="from-secondary-500"
                via="via-secondary-600"
                to="to-accent-500"
                duration={10}
              >
                la formation
              </GradientText>
              .
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-2xl">
              Explorations à la croisée de la pédagogie, de l'intelligence artificielle et de l'innovation.
              Par les experts de The Learning Society.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Filter bar (sticky) ───────────────────────────────────────────── */}
      <section className="sticky top-16 z-sticky bg-white/85 backdrop-blur-glass-heavy border-b border-ink-100 py-stack">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-center gap-stack md:gap-stack-lg">
          {/* Search input */}
          <div className="relative md:max-w-xs w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article…"
              className="w-full pl-9 pr-4 h-10 rounded-pill bg-ink-50 border border-ink-100 text-ink-900 placeholder:text-ink-400 font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
            />
          </div>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors duration-base whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-ink-700 hover:text-ink-900 bg-ink-50 hover:bg-ink-100 border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="magazine-cat-bg"
                      className="absolute inset-0 rounded-pill bg-gradient-to-r from-secondary-500 to-secondary-600 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Articles ──────────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section-lg">
          {filtered.length === 0 ? (
            <FadeInWhenVisible direction="up">
              <div className="text-center py-page flex flex-col items-center gap-stack">
                <BookOpen size={48} className="text-ink-300" />
                <h2 className="font-display text-h3 font-bold text-ink-900 m-0">
                  Aucun article ne correspond à ta recherche.
                </h2>
                <p className="font-body text-body text-ink-600 m-0">
                  Essaie une autre catégorie ou réinitialise ta recherche.
                </p>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    setActiveCategory('Tous');
                    setQuery('');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </FadeInWhenVisible>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <FadeInWhenVisible direction="up" key={`featured-${featured.title}`}>
                  <div className="flex flex-col gap-stack-lg">
                    <span className="inline-flex self-start items-center gap-1 px-2 py-0.5 rounded-pill bg-accent-100 text-warning-fg font-body text-micro font-bold uppercase tracking-wider">
                      <Sparkles size={12} />
                      À la une
                    </span>
                    <Link to={`/marketing/magazine/${featured.slug}`} className="group block">
                      <motion.article
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0 bg-white border border-ink-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary-200 transition-shadow duration-base"
                      >
                        <div
                          className={`relative h-64 lg:h-auto bg-gradient-to-br ${featured.cover} flex items-center justify-center overflow-hidden`}
                        >
                          <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
                          <BookOpen size={88} strokeWidth={1} className="text-ink-900/30 relative" />
                        </div>
                        <div className="p-stack-lg lg:p-section flex flex-col justify-center gap-stack">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-pill border ${CATEGORY_TONES[featured.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'} font-body text-micro font-bold uppercase tracking-wider`}
                            >
                              {featured.category}
                            </span>
                            <span className="font-body text-caption text-ink-500">{featured.date}</span>
                            <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                              <Clock size={12} />
                              {featured.readTime}
                            </span>
                          </div>
                          <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-ink-900 leading-[1.15] tracking-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                            {featured.title}
                          </h2>
                          <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                            {featured.summary}
                          </p>
                          <div className="inline-flex items-center gap-1.5 font-body text-body-sm font-bold text-primary-700">
                            Lire l'article
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-base group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </div>
                </FadeInWhenVisible>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="flex flex-col gap-stack-lg">
                  <span className="inline-flex self-start items-center gap-1 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                    <TrendingUp size={14} />
                    Tous les articles
                  </span>
                  <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
                      {rest.map((a, i) => (
                        <motion.div
                          key={a.title}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <Link to={`/marketing/magazine/${a.slug}`} className="group block h-full">
                            <motion.article
                              whileHover={{ y: -4 }}
                              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                              className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-lg hover:border-primary-200 transition-shadow duration-base"
                            >
                              <div
                                className={`relative h-40 bg-gradient-to-br ${a.cover} flex items-center justify-center overflow-hidden`}
                              >
                                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
                                <BookOpen size={36} strokeWidth={1.25} className="text-ink-900/25 relative" />
                              </div>
                              <div className="p-stack-lg flex flex-col gap-stack flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-pill border ${CATEGORY_TONES[a.category] ?? 'bg-ink-50 text-ink-700 border-ink-100'} font-body text-micro font-bold uppercase tracking-wider`}
                                  >
                                    {a.category}
                                  </span>
                                  <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                                    <Clock size={12} />
                                    {a.readTime}
                                  </span>
                                </div>
                                <h3 className="font-display text-h4 font-bold text-ink-900 leading-tight m-0 group-hover:text-primary-700 transition-colors duration-base">
                                  {a.title}
                                </h3>
                                <p className="font-body text-body-sm text-ink-500 leading-relaxed m-0 line-clamp-2 flex-1">
                                  {a.summary}
                                </p>
                                <div className="inline-flex items-center gap-1.5 font-body text-body-sm font-bold text-primary-700 pt-1">
                                  Lire
                                  <ArrowRight
                                    size={14}
                                    className="transition-transform duration-base group-hover:translate-x-1"
                                  />
                                </div>
                              </div>
                            </motion.article>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-page bg-gradient-to-br from-secondary-50 via-accent-50/40 to-white">
        <MeshGradientBg tone="sun" intensity="subtle" />
        <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-accent-200 shadow-xs">
              <Mail size={14} className="text-warning-fg" />
              <span className="font-body text-caption font-semibold text-warning-fg tracking-wider uppercase">
                Newsletter bi-mensuelle
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
              Ne rate plus rien.
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.15}>
            <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-prose">
              Un email tous les 15 jours. Les meilleurs articles, des ressources exclusives,
              et les invitations aux événements TLS.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white rounded-2xl p-stack-lg border border-secondary-200 shadow-md flex flex-col items-center gap-stack max-w-md"
              >
                <CheckCircle2 size={32} className="text-secondary-600" />
                <p className="font-display font-bold text-h5 text-ink-900 m-0">Merci ! Tu es inscrit·e.</p>
                <p className="font-body text-body-sm text-ink-600 m-0">
                  Premier email d'ici 2 semaines maximum.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) {
                    setSubscribed(true);
                    pushToast({
                      tone: 'success',
                      message: 'Inscription confirmée ✨',
                      description: 'Premier email du Mag\' d\'ici 15 jours dans ta boîte.',
                    });
                  }
                }}
                className="w-full max-w-md flex flex-col sm:flex-row gap-2 pt-stack"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton.email@exemple.fr"
                  className="flex-1 min-w-0 px-4 h-12 rounded-pill bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-base"
                />
                <MagneticButton strength={10}>
                  <Button type="submit" variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
                    S'inscrire
                  </Button>
                </MagneticButton>
              </form>
            )}
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.3}>
            <p className="font-body text-caption text-ink-500 m-0">
              Aucun spam. Désinscription en 1 clic. RGPD respecté.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  );
};

export default MarketingMagazine;
