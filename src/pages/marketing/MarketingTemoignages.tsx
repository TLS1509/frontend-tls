/**
 * MarketingTemoignages — Case studies gallery — Premium Minimal (redesign)
 *
 * Direction: storytelling. Featured case study + filterable grid + impact metrics.
 * Suppression: MeshGradientBg, ParallaxLayer, GradientText, NoiseTexture.
 * Fonds blanc/primary-50. Accents accent-400.
 *
 * ⚠️ PLACEHOLDER CONTENT — all case studies below are illustrative.
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Quote,
  Building2,
  TrendingUp,
  Clock,
  Award,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import {
  FadeInWhenVisible,
  MagneticButton,
  CountUp,
  TiltCard,
} from '../../components/marketing/motion';
import { SEOHead } from './components/SEOHead';
import { MarketingFooter } from '../../components/marketing/FooterMinimal';

type SectorFilter = 'Tous' | 'Industrie' | 'Tech' | 'Finance' | 'Services' | 'Public';

const SECTOR_FILTERS: SectorFilter[] = ['Tous', 'Industrie', 'Tech', 'Finance', 'Services', 'Public'];

// ⚠️ PLACEHOLDER — Cas clients illustratifs. À remplacer par vrais clients après accord écrit.
const CASES = [
  {
    id: 'industriel-500',
    sector: 'Industrie' as SectorFilter,
    org: 'Groupe industriel · 500 collaborateurs',
    project: 'Refonte formation commerciale en 6 semaines',
    summary:
      "Refonte complète du parcours d'onboarding commercial via la méthode STRIDE. Génération IA des variantes par secteur, animation augmentée par le formateur.",
    metrics: [
      { value: '40 %', label: 'temps conception en moins' },
      { value: '2×', label: 'engagement apprenants' },
      { value: '6 sem', label: 'time-to-market' },
    ],
    quote: "L'équipe TLS nous a permis de déployer notre première formation IA en 6 semaines.",
    quoteAuthor: 'Directrice Formation',
    duration: '6 semaines',
    cover: 'from-primary-100 via-primary-50 to-white',
    featured: true,
  },
  {
    id: 'scaleup-tech',
    sector: 'Tech' as SectorFilter,
    org: 'Scale-up tech · 200 collaborateurs',
    project: 'Diagnostic + feuille de route IA',
    summary:
      "Diagnostic complet du dispositif L&D existant. Identification de doublons, outils sous-utilisés. Feuille de route 12 mois priorisée par impact.",
    metrics: [
      { value: '12 mois', label: 'roadmap stratégique' },
      { value: '60 %', label: 'outils consolidés' },
      { value: '3 axes', label: 'priorités définies' },
    ],
    quote:
      "Le diagnostic initial a été une révélation : nous avions des doublons et des outils sous-utilisés.",
    quoteAuthor: 'Responsable L&D',
    duration: '4 semaines',
    cover: 'from-secondary-100 via-secondary-50 to-white',
    featured: false,
  },
  {
    id: 'banque-1000',
    sector: 'Finance' as SectorFilter,
    org: 'Groupe bancaire · 1000+ collaborateurs',
    project: 'Cohorte Manager Augmenté · 8 semaines',
    summary:
      "Parcours certifiant pour 40 managers + 5 référents L&D. Cohorte mixte alignée sur les vrais cas d'usage opérationnels, validés en JAC à chaque étape.",
    metrics: [
      { value: '92 %', label: 'taux de complétion' },
      { value: '40', label: 'managers certifiés' },
      { value: '8 sem', label: "durée du parcours" },
    ],
    quote:
      "Le format STRIDE a tout changé. On a co-construit, pas reçu un produit fini.",
    quoteAuthor: 'Head of L&D',
    duration: '8 semaines',
    cover: 'from-accent-100 via-accent-50 to-white',
    featured: false,
  },
  {
    id: 'conseil-300',
    sector: 'Services' as SectorFilter,
    org: 'Cabinet conseil · 300 consultants',
    project: 'Workflow learning intégré au CRM',
    summary:
      "Compagnon IA embarqué dans l'outil métier des consultants. Micro-apprentissages 'just-in-time' déclenchés par les vrais moments du flux de travail.",
    metrics: [
      { value: '78 %', label: 'adoption en 3 mois' },
      { value: '15 min', label: 'temps moyen par session' },
      { value: '4.6/5', label: 'satisfaction' },
    ],
    quote:
      "Apprendre dans le flux du travail, c'est ce qu'on cherchait depuis 10 ans. STRIDE l'a rendu possible.",
    quoteAuthor: 'CHRO',
    duration: '12 semaines',
    cover: 'from-primary-100 via-accent-50 to-white',
    featured: false,
  },
  {
    id: 'collectivite',
    sector: 'Public' as SectorFilter,
    org: 'Collectivité territoriale · 800 agents',
    project: 'Sensibilisation IA & AI Act',
    summary:
      "Parcours de sensibilisation pour 800 agents publics. Module dédié AI Act et conformité RGPD. Open Badges délivrés à tous les participants.",
    metrics: [
      { value: '800', label: 'agents sensibilisés' },
      { value: '100 %', label: 'conformité AI Act' },
      { value: '6 sem', label: 'déploiement' },
    ],
    quote: 'TLS a transformé un sujet anxiogène en opportunité concrète pour nos équipes.',
    quoteAuthor: 'DGA Ressources Humaines',
    duration: '6 semaines',
    cover: 'from-secondary-100 via-primary-50 to-white',
    featured: false,
  },
  {
    id: 'startup-tech',
    sector: 'Tech' as SectorFilter,
    org: 'Startup SaaS · 80 collaborateurs',
    project: 'Onboarding produit augmenté',
    summary:
      "Refonte de l'onboarding produit en 3 semaines. Génération IA des micro-vidéos par persona, parcours adaptatif selon le rôle (sales, success, support).",
    metrics: [
      { value: '3 sem', label: 'délai total' },
      { value: '5 personas', label: 'parcours différenciés' },
      { value: '85 %', label: "ramp-up à J+30" },
    ],
    quote: 'Notre time-to-productivity a été divisé par 2. Impact direct sur le revenue.',
    quoteAuthor: 'VP People',
    duration: '3 semaines',
    cover: 'from-accent-100 via-primary-50 to-white',
    featured: false,
  },
];

export const MarketingTemoignages: React.FC = () => {
  const [filter, setFilter] = useState<SectorFilter>('Tous');

  const filtered = useMemo(
    () => (filter === 'Tous' ? CASES : CASES.filter((c) => c.sector === filter)),
    [filter]
  );

  const featured = filtered.find((c) => c.featured) ?? filtered[0];
  const rest = filtered.filter((c) => c !== featured);

  return (
    <div className="bg-white">
      <SEOHead
        title="Témoignages"
        description="Découvrez comment nos clients ont transformé leurs organisations avec la méthode STRIDE et la Learning App de The Learning Society."
        canonical="/marketing/temoignages"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-page overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white">
        <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[500px] rounded-pill bg-primary-100/25 blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

        <div className="relative max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
          <FadeInWhenVisible direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-primary-200 shadow-xs">
              <Sparkles size={14} className="text-accent-400" />
              <span className="font-body text-caption font-semibold text-primary-700 tracking-wider uppercase">
                Cas clients · histoires de transformation
              </span>
            </span>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.1}>
            <h1 className="font-display font-extrabold text-ink-900 leading-[0.98] tracking-tight m-0 text-[clamp(2.75rem,7vw,5.5rem)] max-w-4xl">
              Six équipes,{' '}
              <span className="text-accent-400">six transformations</span>.
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.2}>
            <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
              Comment des organisations de l'industrie, de la tech, du conseil et du public
              ont déployé l'IA dans leur formation avec TLS. Méthode STRIDE, résultats mesurés.
            </p>
          </FadeInWhenVisible>

          {/* Aggregate metrics */}
          <FadeInWhenVisible direction="up" delay={0.3}>
            <div className="grid grid-cols-3 gap-section pt-stack-lg border-t border-ink-100 mt-stack-lg max-w-2xl">
              {[
                { to: 40, suffix: '+', label: 'missions livrées' },
                { to: 12, suffix: '+', label: 'secteurs' },
                { to: 97, suffix: ' %', label: 'satisfaction' },
              ].map((m) => (
                <div key={m.label} className="flex flex-col items-center text-center">
                  <CountUp
                    to={m.to}
                    suffix={m.suffix}
                    className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold text-primary-700 leading-none"
                  />
                  <span className="font-body text-caption text-ink-500 mt-1 uppercase tracking-wider font-semibold">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="up" delay={0.4}>
            <p className="font-body text-caption text-ink-400 italic m-0">
              Cas illustratifs — les vrais témoignages publiés à mesure des autorisations.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <section className="sticky top-16 z-sticky bg-white/85 backdrop-blur-glass-heavy border-b border-ink-100 py-stack">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-stack overflow-x-auto">
          <span className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-500 uppercase tracking-widest shrink-0">
            <Filter size={14} />
            Filtrer
          </span>
          <div className="flex items-center gap-2">
            {SECTOR_FILTERS.map((s) => {
              const isActive = filter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={`relative inline-flex items-center px-3 py-1.5 rounded-pill text-caption font-semibold transition-colors duration-base whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-ink-700 hover:text-ink-900 bg-ink-50 hover:bg-ink-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="temoignages-filter-bg"
                      className="absolute inset-0 rounded-pill bg-primary-600 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s}</span>
                </button>
              );
            })}
          </div>
          <span className="ml-auto font-body text-caption text-ink-500 shrink-0">
            <CountUp to={filtered.length} className="font-bold text-ink-900" /> cas affichés
          </span>
        </div>
      </section>

      {/* ── Featured case ─────────────────────────────────────────────────── */}
      <section className="py-page bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-section-lg">
          {filtered.length === 0 ? (
            <FadeInWhenVisible direction="up">
              <div className="text-center py-page flex flex-col items-center gap-stack">
                <Building2 size={48} className="text-ink-300" />
                <h2 className="font-display text-h3 font-bold text-ink-900 m-0">
                  Aucun cas pour ce secteur.
                </h2>
                <Button variant="ghost" size="md" onClick={() => setFilter('Tous')}>
                  Voir tous les cas
                </Button>
              </div>
            </FadeInWhenVisible>
          ) : (
            <>
              {featured && (
                <FadeInWhenVisible direction="up">
                  <article className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-0 bg-white border border-ink-100 rounded-3xl overflow-hidden shadow-xl">
                    <div
                      className={`relative h-80 lg:h-auto bg-gradient-to-br ${featured.cover} flex items-center justify-center overflow-hidden`}
                    >
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30" />
                      <Building2 size={88} strokeWidth={1} className="text-ink-900/20 relative" />
                      <span className="absolute top-stack left-stack inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white text-ink-900 text-caption font-bold uppercase tracking-wider shadow-md">
                        <Sparkles size={12} className="text-accent-400" />
                        Cas en vedette
                      </span>
                    </div>
                    <div className="p-section flex flex-col gap-stack-lg justify-center">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill border bg-primary-50 border-primary-100 text-primary-700 font-body text-micro font-bold uppercase tracking-wider">
                          {featured.sector}
                        </span>
                        <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                          <Clock size={12} />
                          {featured.duration}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-wider">
                          {featured.org}
                        </span>
                        <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-extrabold text-ink-900 leading-[1.15] tracking-tight m-0">
                          {featured.project}
                        </h2>
                      </div>
                      <p className="font-body text-body text-ink-600 leading-relaxed m-0">
                        {featured.summary}
                      </p>
                      <div className="grid grid-cols-3 gap-stack pt-stack border-t border-ink-100">
                        {featured.metrics.map((m) => (
                          <div key={m.label} className="flex flex-col">
                            <span className="font-display text-h4 font-extrabold text-primary-700 leading-none">
                              {m.value}
                            </span>
                            <span className="font-body text-micro text-ink-500 mt-1 uppercase tracking-wider font-semibold">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <blockquote className="rounded-2xl bg-primary-50 border border-primary-100 p-stack-lg flex flex-col gap-2">
                        <Quote size={20} className="text-primary-700" />
                        <p className="font-display font-medium text-body text-ink-900 leading-snug m-0">
                          « {featured.quote} »
                        </p>
                        <p className="font-body text-caption font-semibold text-primary-700 m-0">
                          — {featured.quoteAuthor}
                        </p>
                      </blockquote>
                    </div>
                  </article>
                </FadeInWhenVisible>
              )}

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="flex flex-col gap-stack-lg">
                  <span className="inline-flex self-start items-center gap-1 font-body text-caption font-bold text-ink-500 uppercase tracking-widest">
                    <TrendingUp size={14} />
                    Tous les cas
                  </span>
                  <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
                      {rest.map((c, i) => (
                        <motion.div
                          key={c.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.35, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <motion.article
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                            className="h-full bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-primary-200 transition-shadow duration-base"
                          >
                            <div
                              className={`relative h-32 bg-gradient-to-br ${c.cover} flex items-center justify-center overflow-hidden`}
                            >
                              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30" />
                              <Building2 size={36} strokeWidth={1.25} className="text-ink-900/20 relative" />
                            </div>
                            <div className="p-stack-lg flex flex-col gap-stack flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-pill border bg-primary-50 border-primary-100 text-primary-700 font-body text-micro font-bold uppercase tracking-wider">
                                  {c.sector}
                                </span>
                                <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                                  <Clock size={11} />
                                  {c.duration}
                                </span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-body text-caption font-bold text-ink-500 uppercase tracking-wider line-clamp-1">
                                  {c.org}
                                </span>
                                <h3 className="font-display text-h5 font-extrabold text-ink-900 leading-tight m-0">
                                  {c.project}
                                </h3>
                              </div>
                              <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0 line-clamp-3 flex-1">
                                {c.summary}
                              </p>
                              <div className="flex items-center gap-2 pt-stack border-t border-ink-100">
                                {c.metrics.slice(0, 2).map((m) => (
                                  <div key={m.label} className="flex flex-col">
                                    <span className="font-display text-body font-extrabold text-primary-700 leading-none">
                                      {m.value}
                                    </span>
                                    <span className="font-body text-micro text-ink-500 mt-0.5 uppercase tracking-wider">
                                      {m.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.article>
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

      {/* ── CTA — glassmorphic card on light bg ───────────────────────────── */}
      <section className="py-page bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
          <FadeInWhenVisible direction="up">
            <div className="w-full rounded-3xl bg-white/70 backdrop-blur-glass-medium border border-ink-100 shadow-xl p-section-lg flex flex-col items-center text-center gap-stack-lg">
              <Award size={36} className="text-accent-400" />
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold text-ink-900 leading-[1.05] tracking-tight m-0">
                Ton équipe sera-t-elle la prochaine ?
              </h2>
              <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-prose">
                Diagnostic gratuit de 90 min. On comprend ton contexte, on évalue le potentiel,
                on propose un chemin.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-stack">
                <MagneticButton strength={12}>
                  <Link to="/marketing/contact">
                    <Button variant="primary" size="xl" trailingIcon={<ArrowRight size={20} />}>
                      Réserver un diagnostic
                    </Button>
                  </Link>
                </MagneticButton>
                <Link to="/marketing/methode">
                  <Button variant="ghost" size="xl" trailingIcon={<ArrowUpRight size={20} />}>
                    Voir notre méthode
                  </Button>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
};

export default MarketingTemoignages;
