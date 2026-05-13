/**
 * WeeklyNewsletter — Phase 10 Tier 2 refonte.
 *
 * Page "Actus de la semaine" — édition hebdo curée par TLS.
 *
 * Structure (per Figma audit) :
 *  1. Sticky glass header (back + actions)
 *  2. Hero éditorial bounded (badge édition + h1 gradient text + meta)
 *  3. EditorialQuoteCallout (édito hebdo signature)
 *  4. Featured video card (grid 5-cols)
 *  5. À la une — grid 3 articles featured
 *  6. Toutes les actus — list rows
 *  7. Newsletter signup CTA centered
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarksStore } from '../stores/persistence';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Mail,
  TrendingUp,
  Clock,
  Play,
  Share2,
} from 'lucide-react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EditorialQuoteCallout } from '../components/patterns/EditorialQuoteCallout';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TOP_ARTICLES = [
  { id: 'a1', category: 'IA & Formation', title: "L'IA générative révolutionne la conception pédagogique", tone: 'brand' as const },
  { id: 'a2', category: 'Tendances',      title: 'Micro-learning : vers des sessions de 5 minutes ultra-ciblées', tone: 'warm'  as const },
  { id: 'a3', category: 'Technologie',    title: 'Les LMS de nouvelle génération intègrent le coaching IA', tone: 'sun'   as const },
];

const ALL_ARTICLES = [
  { id: 'b1', date: '28 avril 2026', readTime: '4 min', title: "Comment mesurer l'impact réel d'une formation en entreprise ?", category: 'Évaluation' },
  { id: 'b2', date: '27 avril 2026', readTime: '6 min', title: 'Prompt engineering pour formateurs : les 10 techniques essentielles', category: 'IA Pratique' },
  { id: 'b3', date: '26 avril 2026', readTime: '3 min', title: "Le feedback immédiat comme levier d'apprentissage accéléré", category: 'Pédagogie' },
  { id: 'b4', date: '25 avril 2026', readTime: '5 min', title: 'Certification professionnelle : quel format pour quel objectif ?', category: 'Certification' },
];

const CATEGORY_TONE: Record<'brand' | 'warm' | 'sun', { cover: string; chip: string }> = {
  brand: { cover: 'bg-gradient-to-br from-primary-400 to-primary-600',     chip: 'bg-white/15 text-white' },
  warm:  { cover: 'bg-gradient-to-br from-secondary-400 to-secondary-600', chip: 'bg-white/15 text-white' },
  sun:   { cover: 'bg-gradient-to-br from-accent-300 to-secondary-400',    chip: 'bg-white/20 text-white' },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const WeeklyNewsletter: React.FC = () => {
  const navigate = useNavigate();
  const bookmarkedIds = useBookmarksStore((s) => s.ids);
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const [email, setEmail] = useState('');

  const savedArticles = new Set(
    bookmarkedIds.filter((id) => id.startsWith('weekly-news-'))
      .map((id) => id.replace('weekly-news-', ''))
  );

  const toggleSave = (id: string) => toggleBookmark(`weekly-news-${id}`);

  return (
    <div className="min-h-screen bg-surface">
      {/* Sticky glass header */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={<ArrowLeft size={14} />}
            onClick={() => navigate('/veille')}
          >
            Retour à la veille
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" leadingIcon={<Mail size={13} />} className="hidden sm:inline-flex">
              S'abonner
            </Button>
            <Button variant="ghost" size="sm" iconOnly aria-label="Partager">
              <Share2 size={15} />
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        {/* Hero éditorial */}
        <header className="flex flex-col gap-stack">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 font-body text-micro text-ink-500">
            <button type="button" onClick={() => navigate('/veille')} className="hover:text-primary-700 bg-transparent border-0 cursor-pointer p-0">
              Veille
            </button>
            <ChevronRight size={10} aria-hidden />
            <span className="text-ink-700">Actus de la semaine</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-pill bg-primary-500 text-white font-body text-micro font-bold uppercase tracking-widest">
            <TrendingUp size={11} /> Semaine #08
          </span>

          <h1 className="m-0 font-display text-h1 sm:text-[3rem] font-extrabold leading-[1.05] tracking-tight bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 bg-clip-text text-transparent">
            Actus de la semaine
          </h1>

          <p className="m-0 font-body text-body-lg text-ink-600">
            Lundi 28 avril 2026 · {ALL_ARTICLES.length + TOP_ARTICLES.length} articles sélectionnés
          </p>
        </header>

        {/* Édito */}
        <EditorialQuoteCallout
          tone="brand"
          eyebrow="L'édito de la semaine"
          signature={{ name: "L'équipe éditoriale TLS", role: 'Rédaction' }}
        >
          <p>
            Cette semaine, l'IA générative continue de remodeler les pratiques pédagogiques à
            une vitesse remarquable. Entre prompt engineering pour formateurs et micro-learning
            augmenté, le secteur s'adapte.
          </p>
          <p>
            Ceux qui expérimentent maintenant prendront une longueur d'avance décisive — pas dans
            12 mois, dès aujourd'hui.
          </p>
        </EditorialQuoteCallout>

        {/* Vidéo de la semaine */}
        <section className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
              Vidéo de la semaine
            </h2>
            <Button variant="ghost" size="sm" trailingIcon={<ArrowRight size={12} />} onClick={() => navigate('/veille/tutoriels')}>
              Tous les tutoriels
            </Button>
          </div>

          <article
            onClick={() => navigate('/veille/video-tutorial/1')}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr] rounded-2xl overflow-hidden border border-ink-100 cursor-pointer hover:shadow-md transition-shadow duration-base"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[260px] bg-gradient-to-br from-ink-900 via-primary-900 to-ink-800 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-pill bg-white/20 border-2 border-white/40 backdrop-blur-glass-light">
                <Play size={20} fill="white" color="white" className="ml-0.5" />
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white font-body text-micro font-bold backdrop-blur-glass-light">
                12:34
              </span>
            </div>

            {/* Info */}
            <div className="bg-white p-6 flex flex-col gap-stack justify-between">
              <div className="flex flex-col gap-stack-xs">
                <Badge variant="warm">Tutoriel vidéo</Badge>
                <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight tracking-tight">
                  Construire un prompt structuré en 5 étapes
                </h3>
                <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed">
                  Séquence pratique orientée exécution : cadrage, exemples, validation et itération
                  sur des cas réels de formation.
                </p>
              </div>
              <Button variant="primary" size="sm" leadingIcon={<Play size={13} fill="currentColor" />} className="self-start">
                Regarder maintenant
              </Button>
            </div>
          </article>
        </section>

        {/* À la une */}
        <section className="flex flex-col gap-stack">
          <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
            À la une
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TOP_ARTICLES.map((article) => {
              const tone = CATEGORY_TONE[article.tone];
              return (
                <article
                  key={article.id}
                  onClick={() => navigate('/veille/weekly-news/1')}
                  className="rounded-2xl overflow-hidden border border-ink-100 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-base"
                >
                  <div className={`h-28 flex items-end p-3 ${tone.cover}`}>
                    <span className={`inline-flex px-2.5 py-1 rounded-pill text-micro font-bold backdrop-blur-glass-light ${tone.chip}`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4 bg-white flex flex-col gap-2">
                    <h3 className="m-0 font-body text-body-sm font-bold text-ink-900 leading-snug">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 font-body text-micro font-semibold text-primary-700">
                      Lire l'article <ArrowRight size={11} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Toutes les actus */}
        <section className="flex flex-col gap-stack">
          <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
            Toutes les actus
          </h2>
          <div className="flex flex-col rounded-2xl border border-ink-100 overflow-hidden">
            {ALL_ARTICLES.map((article, idx) => {
              const isSaved = savedArticles.has(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => navigate('/veille/weekly-news/1')}
                  className={[
                    'flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-ink-50 transition-colors duration-base',
                    idx < ALL_ARTICLES.length - 1 ? 'border-b border-ink-100' : '',
                  ].join(' ')}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1 font-body text-micro text-ink-500">
                      <span className="font-bold uppercase tracking-wider text-primary-700">
                        {article.category}
                      </span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} /> {article.readTime}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{article.date}</span>
                    </div>
                    <p className="m-0 font-body text-body-sm font-semibold text-ink-900 leading-snug">
                      {article.title}
                    </p>
                  </div>

                  <Button
                    variant={isSaved ? 'brand-ghost' : 'ghost'}
                    size="sm"
                    iconOnly
                    aria-label={isSaved ? 'Retirer le marque-page' : 'Ajouter aux marque-pages'}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      toggleSave(article.id);
                    }}
                  >
                    {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                  </Button>
                  <ArrowRight size={15} className="shrink-0 text-ink-400" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter signup */}
        <section
          aria-label="Inscription newsletter"
          className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 sm:p-10 text-white flex flex-col items-center text-center gap-stack"
        >
          <span aria-hidden className="inline-flex items-center justify-center w-14 h-14 rounded-pill bg-white/15 backdrop-blur-glass-light">
            <Mail size={22} />
          </span>
          <h3 className="m-0 font-display text-h3 font-bold tracking-tight">
            Recevez les actus chaque lundi
          </h3>
          <p className="m-0 font-body text-body text-white/85 max-w-prose">
            La sélection hebdomadaire TLS directement dans votre boîte mail. Pas de spam,
            désinscription en 1 clic.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) alert(`Merci ! Inscription confirmée pour ${email}`);
              setEmail('');
            }}
            className="w-full max-w-md flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 h-11 px-4 rounded-pill border-0 bg-white/15 backdrop-blur-glass-light font-body text-body-sm text-white placeholder:text-white/60 focus:outline-2 focus:outline-white/40"
            />
            <Button variant="warm" size="md" type="submit">
              S'abonner
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default WeeklyNewsletter;
