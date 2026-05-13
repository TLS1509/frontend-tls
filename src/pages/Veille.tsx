/**
 * Veille Page — Hub de contenus éditoriaux (Phase 10 rework v5 — DS-aligned)
 *
 * Consomme `<VeilleCardFeed>` du DS (refactor v2) — plus de cards inline.
 *
 * Structure :
 *  1. Header compact
 *  2. Toolbar (Search + filter button collapsible)
 *  3. <VeilleCardFeed> (featured spotlight + grid 2/3 cols)
 *  4. Newsletter full-bleed à la toute fin (mt-auto)
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Newspaper,
  Video,
  FolderOpen,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Megaphone,
  SlidersHorizontal,
} from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';
import { Search } from '../components/ui/Search';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';
import { FilterBar } from '../components/forms/FilterBar';
import { VeilleCardFeed, type VeilleFeedItem } from '../components/patterns/VeilleCardFeed';
import { MagazineCard } from '../components/learning/MagazineCard';
import { useBookmarksStore, useFilterPrefsStore } from '../stores/persistence';
import { useToastContext } from '../contexts/ToastContext';

/* ─── Types & data ───────────────────────────────────────────────────────── */

type VeilleType = 'actu' | 'tutoriel' | 'dossier' | 'magazine';

interface VeilleRawItem extends VeilleFeedItem {
  type: VeilleType;
}

interface VideoModalState {
  open: boolean;
  item?: VeilleRawItem;
}

interface CategoryTile {
  id: string;
  label: string;
  desc: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  bubble: string;
}

const CATEGORY_TILES: CategoryTile[] = [
  { id: 'actus',      label: 'Actus',           desc: 'L\'essentiel de la semaine, chaque vendredi.', href: '/veille/actus',              Icon: TrendingUp, bubble: 'bg-primary-100 text-primary-700' },
  { id: 'tutoriels',  label: 'Tutoriels',       desc: 'Vidéos pas-à-pas pour monter en compétence.',  href: '/veille/tutoriels',          Icon: Video,      bubble: 'bg-accent-100 text-accent-700' },
  { id: 'dossiers',   label: 'Dossiers',        desc: 'Analyses longues pour creuser un sujet.',      href: '/veille/dossiers',           Icon: FolderOpen, bubble: 'bg-secondary-100 text-secondary-700' },
  { id: 'magazine',   label: 'Magazine TLS',    desc: 'Notre numéro éditorial mensuel.',              href: '/veille/magazine',           Icon: BookOpen,   bubble: 'bg-primary-100 text-primary-700' },
  { id: 'newsletter', label: 'Newsletter',      desc: 'La sélection hebdo curée par TLS.',            href: '/veille/weekly-newsletter',  Icon: Megaphone,  bubble: 'bg-accent-100 text-accent-700' },
  { id: 'reels',      label: 'Vidéos courtes',  desc: 'Format reels — apprendre en 60 secondes.',     href: '/veille/video-reels',        Icon: Newspaper,  bubble: 'bg-secondary-100 text-secondary-700' },
];

const FILTERS: { id: 'all' | VeilleType; label: string }[] = [
  { id: 'all',      label: 'Tout' },
  { id: 'actu',     label: '📰 Actus' },
  { id: 'tutoriel', label: '🎬 Tutoriels' },
  { id: 'dossier',  label: '📂 Dossiers' },
  { id: 'magazine', label: '📚 Le Mag' },
];

const ITEMS: VeilleRawItem[] = [
  { id: '1', type: 'actu',     featured: true,  typeLabel: 'Actu',     TypeIcon: TrendingUp, tone: 'brand', title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites. Une analyse exclusive de l'équipe TLS.", category: 'IA & Pédagogie',     author: 'The Learning Society', publishedAt: "Aujourd'hui",      readTime: '6 min' },
  { id: '2', type: 'tutoriel',                  typeLabel: 'Tutoriel', TypeIcon: Video,      tone: 'warm',  isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
  { id: '3', type: 'dossier',                   typeLabel: 'Dossier',  TypeIcon: FolderOpen, tone: 'sun',   title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
  { id: '4', type: 'magazine',                  typeLabel: 'Magazine', TypeIcon: BookOpen,   tone: 'brand', title: 'Tendances EdTech 2026', summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs et opportunités stratégiques.', category: 'EdTech', author: 'TLS Mag', publishedAt: 'Il y a 1 semaine', readTime: '18 min' },
  { id: '5', type: 'actu',                      typeLabel: 'Actu',     TypeIcon: TrendingUp, tone: 'brand', title: "L'essor du microlearning dans les entreprises", summary: "78% des entreprises du CAC40 ont adopté le microlearning : résultats, bonnes pratiques et conditions du succès.", category: 'Formation', author: 'TLS Rédaction', publishedAt: 'Il y a 2 semaines', readTime: '4 min' },
  { id: '6', type: 'tutoriel',                  typeLabel: 'Tutoriel', TypeIcon: Video,      tone: 'warm',  isVideo: true, title: "Maîtriser l'IA pour la Formation Professionnelle", summary: "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement.", category: 'Facilitation', author: 'Pierre Leclerc', publishedAt: 'Il y a 3 semaines', readTime: '15 min' },
];

const itemToVideoProps = (item: VeilleRawItem) => ({
  title: item.title, duration: item.readTime, instructor: item.author, description: item.summary,
});

const resolveItemRoute = (item: VeilleRawItem) => {
  if (item.type === 'actu')     return `/veille/weekly-news/${item.id}`;
  if (item.type === 'tutoriel') return `/veille/video-tutorial/${item.id}`;
  if (item.type === 'dossier')  return `/veille/dossier/${item.id}`;
  if (item.type === 'magazine') return `/veille/magazine-article/${item.id}`;
  return '/veille';
};

/* ─── Main component ─────────────────────────────────────────────────────── */

export const Veille: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastContext();
  // Persisted filter (Zustand cross-session) — primitive selector to avoid infinite loop
  const persistedVeilleFilter = useFilterPrefsStore((s) => s.filters['veille']?.[0]);
  const setPersistedVeilleFilter = useFilterPrefsStore((s) => s.set);
  const [selected, setSelectedRaw] = useState<'all' | VeilleType>(
    (persistedVeilleFilter as 'all' | VeilleType) || 'all'
  );
  const setSelected = (val: 'all' | VeilleType) => {
    setSelectedRaw(val);
    setPersistedVeilleFilter('veille', [val]);
  };
  const [query, setQuery] = useState('');
  const bookmarkedIds = useBookmarksStore((s) => s.ids);
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const savedIds = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<VideoModalState>({ open: false });

  const counts = useMemo(() => {
    const base: Record<'all' | VeilleType, number> = { all: ITEMS.length, actu: 0, tutoriel: 0, dossier: 0, magazine: 0 };
    ITEMS.forEach((item) => { base[item.type] += 1; });
    return base;
  }, []);

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchType = selected === 'all' || item.type === selected;
      const q = query.trim().toLowerCase();
      const matchQuery = q === '' || item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [selected, query]);

  const toggleSave = (id: string) => toggleBookmark(id);

  const handleOpen = (item: VeilleFeedItem) => {
    const raw = item as VeilleRawItem;
    if (raw.isVideo) setVideoModal({ open: true, item: raw });
    else navigate(resolveItemRoute(raw));
  };

  const hasActiveFilter = selected !== 'all' || query !== '';

  return (
    <div className="relative min-h-screen bg-gradient-page-ambient flex flex-col">
      <AmbientBlobs />

      <main className="relative z-base w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section flex-1">

        {/* Header compact */}
        <header className="flex flex-col gap-tight">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-primary-100 border border-primary-200 text-caption font-bold text-primary-700">
            <Sparkles size={12} /> Veille curée par TLS
          </span>
          <h1 className="m-0 font-display text-h1 font-bold text-ink-900 leading-tight">
            L'actualité du leadership &amp; de l'IA
          </h1>
          <p className="m-0 font-body text-body text-ink-600 max-w-prose">
            Articles, vidéos, dossiers et le magazine — sélectionnés par notre équipe éditoriale.
          </p>
        </header>

        {/* Toolbar : Search + filter drawer */}
        <div className="flex flex-col gap-stack-xs">
          <Search
            variant="default"
            placeholder="Rechercher un sujet, auteur, source…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            trailing={
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                aria-label={`${filtersOpen ? 'Masquer' : 'Afficher'} les filtres`}
                className={[
                  'relative inline-flex items-center justify-center w-9 h-9 rounded-md border cursor-pointer transition-all',
                  filtersOpen || selected !== 'all'
                    ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600'
                    : 'bg-white border-ink-200 text-ink-600 hover:bg-ink-50 hover:border-ink-300',
                ].join(' ')}
              >
                <SlidersHorizontal size={16} strokeWidth={2.25} />
                {selected !== 'all' && !filtersOpen && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold border border-white">
                    1
                  </span>
                )}
              </button>
            }
          />

          {filtersOpen && (
            <div className="animate-[filterIn_0.18s_ease_both]">
              <FilterBar
                surface="tinted"
                tone="brand"
                multiSelect={false}
                options={FILTERS.map(({ id, label }) => ({
                  id,
                  label,
                  count: counts[id],
                }))}
                selected={selected === 'all' ? [] : [selected]}
                onChange={(ids) => setSelected(ids[0] as typeof selected ?? 'all')}
                showClearAll={false}
              />
            </div>
          )}
        </div>

        {/* Results counter (filtre actif) */}
        {hasActiveFilter && (
          <div className="flex items-center justify-between gap-3 -mt-stack">
            <span className="font-body text-caption text-ink-600">
              <strong className="text-primary-700">{filteredItems.length}</strong> résultat{filteredItems.length > 1 ? 's' : ''}
              {selected !== 'all' && ` dans ${FILTERS.find((f) => f.id === selected)?.label}`}
              {query && ` pour "${query}"`}
            </span>
            <button
              type="button"
              onClick={() => { setSelected('all'); setQuery(''); }}
              className="inline-flex items-center gap-1 font-body text-caption text-primary-600 hover:text-primary-700 font-semibold cursor-pointer bg-transparent border-0"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* === Le pattern DS porte tout : featured spotlight + grid === */}
        <VeilleCardFeed
          items={filteredItems}
          savedIds={savedIds}
          onToggleSave={toggleSave}
          onItemClick={handleOpen}
          emptyMessage="Aucun résultat — essayez d'élargir vos filtres."
        />

        {/* === Featured Magazine spotlight === */}
        <section
          aria-label="Magazine TLS — édition courante"
          className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-stack-lg pt-section border-t border-ink-100 items-center"
        >
          <div className="flex flex-col gap-stack">
            <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-secondary-100 text-micro font-bold uppercase tracking-wider text-secondary-800">
              ✨ Magazine TLS
            </span>
            <h2 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight tracking-tight">
              Le numéro du mois
            </h2>
            <p className="m-0 font-body text-body text-ink-600 leading-relaxed">
              Notre magazine éditorial mensuel : 6 articles approfondis, portraits de formateurs et
              tendances 2026. Format premium, lecture posée.
            </p>
            <Button
              variant="warm"
              size="md"
              trailingIcon={<ArrowRight size={14} />}
              onClick={() => navigate('/veille/magazine')}
              className="self-start"
            >
              Ouvrir le numéro
            </Button>
          </div>

          <div className="max-w-md md:justify-self-end w-full">
            <MagazineCard
              tone="warm"
              issueNumber={14}
              title="L'IA au cœur de la formation"
              description="56 pages de recherches, portraits et analyses pour transformer vos pratiques pédagogiques en 2026."
              articleCount={6}
              onClick={() => navigate('/veille/magazine')}
            />
          </div>
        </section>

        {/* === Explorer par catégorie : deeplinks vers pages n-1 === */}
        <section
          aria-label="Explorer par catégorie"
          className="flex flex-col gap-stack-lg pt-section border-t border-ink-100"
        >
          <div className="flex flex-col gap-tight">
            <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-ink-100 text-micro font-bold uppercase tracking-wider text-ink-700">
              Explorer en profondeur
            </span>
            <h2 className="m-0 font-display text-h3 font-bold text-ink-900 leading-tight">
              Toutes les collections
            </h2>
            <p className="m-0 font-body text-body-sm text-ink-600 max-w-prose">
              Plongez dans une catégorie en particulier — les listings complets, archives et filtres avancés.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {CATEGORY_TILES.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => navigate(tile.href)}
                className={[
                  'group relative text-left flex flex-col gap-stack-xs p-4 sm:p-5 rounded-2xl',
                  'bg-white/70 backdrop-blur-glass-light border border-ink-100',
                  'hover:border-ink-200 hover:-translate-y-0.5 hover:shadow-sm',
                  'transition-all duration-base cursor-pointer',
                  '!h-auto !overflow-visible !items-stretch !font-normal',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className={[
                    'inline-flex items-center justify-center w-10 h-10 rounded-pill',
                    tile.bubble,
                  ].join(' ')}
                >
                  <tile.Icon size={18} strokeWidth={2} />
                </span>
                <span className="font-display text-body font-bold text-ink-900">
                  {tile.label}
                </span>
                <span className="font-body text-caption text-ink-500 leading-snug">
                  {tile.desc}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 font-body text-micro font-semibold text-primary-700 group-hover:gap-1.5 transition-all">
                  Explorer <ArrowRight size={11} />
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* === Newsletter banner — éditorial épuré, pas de card-in-card === */}
      <section
        aria-label="Inscription newsletter hebdomadaire"
        className="relative z-base overflow-hidden bg-gradient-soft-duo border-t-2 border-accent-400 mt-auto"
      >
        {/* Décor subtil : une seule particule yellow blur en background, pas tout l'AmbientBlobs */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent-400 blur-[100px] opacity-[0.18] pointer-events-none"
        />

        <div className="relative z-base max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-section grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-stack-lg lg:gap-section items-center">

          {/* Left : message éditorial direct sur bg pastel, pas de card overlay */}
          <div className="flex flex-col gap-stack max-w-prose">
            <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill bg-accent-100 border border-accent-200 text-micro font-bold uppercase tracking-wider text-accent-800">
              ✨ Newsletter · Gratuit
            </span>
            <h2 className="font-display text-h1 font-bold text-ink-900 m-0 leading-tight">
              La sélection TLS,<br />chaque vendredi.
            </h2>
            <p className="font-body text-body-lg text-ink-700 m-0">
              Les meilleurs articles, vidéos et dossiers de la semaine — curés par notre équipe éditoriale.
            </p>
            <button
              type="button"
              onClick={() => navigate('/veille/weekly-newsletter')}
              className="inline-flex items-center gap-1 self-start font-body text-caption font-semibold text-primary-700 hover:text-primary-800 underline underline-offset-4 cursor-pointer bg-transparent border-0"
            >
              Voir la dernière édition <ArrowRight size={13} />
            </button>
          </div>

          {/* Right : form simple, vertical sur mobile, horizontal sur desktop */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              toast.success(`Inscription confirmée pour ${email}`, 'Newsletter');
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="flex flex-col gap-stack-xs w-full"
          >
            <label htmlFor="newsletter-email" className="font-body text-caption font-semibold text-ink-700">
              Votre adresse e-mail
            </label>
            <div className="flex flex-col sm:flex-row gap-stack-xs">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="votre@email.com"
                autoComplete="email"
                className="flex-1 min-w-0 px-4 py-3 rounded-pill bg-white border border-ink-300 text-body-sm text-ink-900 placeholder:text-ink-400 shadow-sm focus:outline-2 focus:outline-accent-400 focus:border-accent-400"
              />
              <Button
                type="submit"
                variant="accent"
                size="md"
              >
                S'inscrire
              </Button>
            </div>
            <p className="font-body text-micro text-ink-500 m-0">
              Pas de spam · Désinscription en 1 clic
            </p>
          </form>

        </div>
      </section>

      {videoModal.item && (
        <VideoPlayerModal
          isOpen={videoModal.open}
          onClose={() => setVideoModal({ open: false })}
          {...itemToVideoProps(videoModal.item)}
        />
      )}
    </div>
  );
};

export default Veille;
