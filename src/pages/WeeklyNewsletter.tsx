/**
 * WeeklyNewsletter : Phase 10 Tier 2 refonte.
 *
 * Page "Actus de la semaine" : édition hebdo curée par TLS.
 *
 * Structure (per Figma audit) :
 *  1. Sticky glass header (back + actions)
 *  2. Hero éditorial bounded (badge édition + h1 gradient text + meta)
 *  3. EditorialQuoteCallout (édito hebdo signature)
 *  4. Featured video card (grid 5-cols)
 *  5. À la une : grid 3 articles featured
 *  6. Toutes les actus : list rows
 *  7. Newsletter signup CTA centered
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarksStore } from '../stores/persistence';
import {
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
import { MetaPill } from '../components/ui/MetaPill';
import { EditorialQuoteCallout } from '../components/patterns/EditorialQuoteCallout';
import { ReaderContextStrip } from '../components/patterns/ReaderContextStrip';
import { PageShell } from '../components/layout';
import { CARD_HOVER_NEUTRE } from '../lib/tone-classes';

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
  brand: { cover: 'bg-gradient-to-br from-primary-400 to-primary-600',     chip: 'bg-white/90 text-ink-900' },
  warm:  { cover: 'bg-gradient-to-br from-secondary-400 to-secondary-600', chip: 'bg-white/90 text-ink-900' },
  sun:   { cover: 'bg-gradient-to-br from-accent-300 to-secondary-400',    chip: 'bg-white/90 text-ink-900' },
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
    <div className="min-h-[100dvh] bg-surface">
      {/* Barre de lecture : ReaderContextStrip, comme les autres pages de la
          veille. Elle était un PageShell dont la `flex-col` empilait « Retour »
          au-dessus des deux actions, hors des 56 px de la barre. */}
      <ReaderContextStrip
        title="Actus de la semaine"
        onBack={() => navigate('/veille')}
        backLabel="Retour à la veille"
        trailing={
          <div className="flex items-center gap-stack-xs">
            {/* Des outils de barre : `ghost` (arbitrage n°19 ; ils étaient en
                `soft` et en `outline`, réservé à Annuler). L'inscription a son
                panneau en bas de page ; l'édition se lit, sans aplat. */}
            <Button emphasis="ghost" size="sm" leadingIcon={<Mail size={14} />} className="max-sm:hidden">
              S'abonner
            </Button>
            <Button emphasis="ghost" tone="neutral" iconOnly size="sm" aria-label="Partager">
              <Share2 size={14} />
            </Button>
          </div>
        }
      />

      <PageShell width="page">

        {/* Hero éditorial — l'édition (MetaPill) → 8 → h1 → 12 → méta. Le
            titre au pas de l'app, à l'encre (il était à 48 px, en teal) ; la
            date et le compte sont des données : légende 13 ink-600. L'édition
            du lundi 28 avril est la #17, comme dans les archives (elle
            s'affichait « #08 »). */}
        {/* L'ouverture de l'édition : l'en-tête et son édito, 32 entre eux ;
            48 ensuite jusqu'à la première section. */}
        <div className="flex flex-col gap-section">
        <header className="flex flex-col">
          <MetaPill icon={<TrendingUp />} text="Semaine #17" tone="primary" className="self-start" />

          <h1 className="mt-stack-xs font-display text-h1 text-ink-900">
            Actus de la semaine
          </h1>

          <p className="mt-stack-sm font-body text-caption text-ink-600 tabular-nums">
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
            Ceux qui expérimentent maintenant prendront une longueur d'avance décisive : pas dans
            12 mois, dès aujourd'hui.
          </p>
        </EditorialQuoteCallout>
        </div>

        {/* Vidéo de la semaine */}
        <section className="flex flex-col gap-stack">
          <div className="flex flex-wrap items-center justify-between gap-x-stack gap-y-stack-xs">
            <h2 className="font-display text-h2 text-ink-900">
              Vidéo de la semaine
            </h2>
            {/* Un « Voir tout » : `ghost` (arbitrage n°19). */}
            <Button emphasis="ghost" size="sm" trailingIcon={<ArrowRight size={14} />} onClick={() => navigate('/veille')}>
              Toute la veille
            </Button>
          </div>

          <article
            onClick={() => navigate('/veille/video-tutorial/1')}
            className={`grid grid-cols-1 md:grid-cols-[3fr_2fr] rounded-xl overflow-hidden border border-ink-100 cursor-pointer ${CARD_HOVER_NEUTRE} transition-colors duration-base`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[260px] bg-gradient-to-br from-ink-900 via-primary-900 to-ink-800 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-pill bg-white/20 border-2 border-white/40 backdrop-blur-glass-light">
                <Play size={20} fill="white" color="white" className="ml-0.5" />
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-pill bg-black/60 text-white font-body text-caption font-semibold tabular-nums backdrop-blur-glass-light">
                12:34
              </span>
            </div>

            {/* Info */}
            <div className="bg-white p-stack-lg flex flex-col gap-stack justify-between">
              {/* Type (une donnée : MetaPill, plus Badge) → 4 → titre → 8 →
                  texte ink-700. */}
              <div className="flex flex-col">
                <MetaPill text="Tutoriel vidéo" tone="warm" className="self-start" />
                <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">
                  Construire un prompt structuré en 5 étapes
                </h3>
                <p className="mt-stack-xs font-body text-body text-ink-700">
                  Séquence pratique orientée exécution : cadrage, exemples, validation et itération
                  sur des cas réels de formation.
                </p>
              </div>
              <Button emphasis="soft" size="sm" leadingIcon={<Play size={14} fill="currentColor" />} className="self-start">
                Regarder maintenant
              </Button>
            </div>
          </article>
        </section>

        {/* À la une */}
        <section className="flex flex-col gap-stack">
          <h2 className="font-display text-h2 text-ink-900">
            À la une
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
            {TOP_ARTICLES.map((article) => {
              const tone = CATEGORY_TONE[article.tone];
              return (
                <article
                  key={article.id}
                  onClick={() => navigate('/veille/weekly-news/1')}
                  className={`rounded-xl overflow-hidden border border-ink-100 cursor-pointer ${CARD_HOVER_NEUTRE} transition-colors duration-base`}
                >
                  {/* La catégorie est une donnée : une puce (500), plus une
                      étiquette 11/700. */}
                  <div className={`h-28 flex items-end p-3 ${tone.cover}`}>
                    <span className={`inline-flex px-2.5 py-1 rounded-pill text-micro font-medium backdrop-blur-glass-light ${tone.chip}`}>
                      {article.category}
                    </span>
                  </div>
                  {/* Titre h3 20 en League Spartan (il était en Nunito gras 16 :
                      un titre qui s'ignore) → 12 → le lien, 13/600 au cran 800.
                      Padding 20 : jamais sous le rayon de la carte. */}
                  <div className="p-stack-md bg-white flex flex-col gap-stack-sm">
                    <h3 className="font-display text-h3 text-ink-900">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-stack-3xs font-body text-caption font-semibold text-primary-800">
                      Lire l'article <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Toutes les actus */}
        <section className="flex flex-col gap-stack">
          <h2 className="font-display text-h2 text-ink-900">
            Toutes les actus
          </h2>
          <div className="flex flex-col rounded-xl border border-ink-100 overflow-hidden">
            {ALL_ARTICLES.map((article, idx) => {
              const isSaved = savedArticles.has(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => navigate('/veille/weekly-news/1')}
                  className={[
                    'flex items-center gap-stack px-stack-md py-stack cursor-pointer hover:bg-ink-50 transition-colors duration-base',
                    idx < ALL_ARTICLES.length - 1 ? 'border-b border-ink-100' : '',
                  ].join(' ')}
                >
                  {/* Méta → 4 → titre. La méta était en étiquette 11 px au cran
                      500, la catégorie en capitales teal : une ligne de légende
                      13 ink-600, la catégorie en 600. */}
                  <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
                    <p className="flex items-center gap-stack-xs flex-wrap font-body text-caption text-ink-600 tabular-nums">
                      <span className="font-semibold text-ink-700">
                        {article.category}
                      </span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-stack-3xs">
                        <Clock size={14} aria-hidden="true" /> {article.readTime}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{article.date}</span>
                    </p>
                    <p className="font-body text-body font-semibold text-ink-900 leading-snug">
                      {article.title}
                    </p>
                  </div>

                  {/* Le favori de la rangée : `ghost` neutre, `soft` une fois
                      posé, comme dans la Veille (arbitrage n°19). */}
                  <Button
                    emphasis={isSaved ? 'soft' : 'ghost'}
                    tone={isSaved ? 'brand' : 'neutral'}
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
                  <ArrowRight size={14} className="shrink-0 text-ink-600" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter signup */}
        <section
          aria-label="Inscription newsletter"
          className="rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 p-section sm:p-section-lg text-white flex flex-col items-center text-center gap-stack"
        >
          {/* Une section de la page : h2 28 (il était un h3 20). La pastille
              est carrée — le rond est réservé aux personnes. Texte centré :
              deux lignes au plus. */}
          <span aria-hidden className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/15 backdrop-blur-glass-light">
            <Mail size={20} />
          </span>
          <h2 className="font-display text-h2 text-white">
            Recevez les actus chaque lundi
          </h2>
          <p className="font-body text-body text-white max-w-prose">
            La sélection hebdomadaire TLS directement dans votre boîte mail. Pas de spam,
            désinscription en 1 clic.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) alert(`Inscription confirmée pour ${email}.`);
              setEmail('');
            }}
            className="w-full max-w-md flex flex-col sm:flex-row gap-stack-xs"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="flex-1 h-11 px-stack rounded-lg border-0 bg-white/15 backdrop-blur-glass-light font-body text-body text-white placeholder:text-white/80 focus:outline-2 focus:outline-white/40"
            />
            <Button emphasis="soft" tone="warm" size="md" type="submit">
              S'abonner
            </Button>
          </form>
        </section>
      </PageShell>
    </div>
  );
};

export default WeeklyNewsletter;
