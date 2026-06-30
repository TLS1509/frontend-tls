/**
 * Veille — Hub éditorial (refonte v8)
 *
 * Structure :
 *  1. Header flat — titre + sous-titre + search + category chips (même surface)
 *  2. Feed vertical (VeilleCardFeed list) — tous les contenus filtrés
 *  3. Bande mailing glassy minimale
 */

import React, { useMemo, useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  FolderOpen,
  BookOpen,
  TrendingUp,
  Mail,
  Bookmark,
  Rss,
  RotateCcw,
  Grid3x3,
  List,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { Search } from '../components/ui/Search';
import {
  VeilleCardFeed,
  type VeilleFeedItem,
} from '../components/patterns/VeilleCardFeed';
import { PageShell } from '../components/layout';
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

interface TypeFilter {
  id: 'all' | VeilleType;
  label: string;
  Icon?: LucideIcon;
}

const TYPE_FILTERS: TypeFilter[] = [
  { id: 'all',      label: 'Tout' },
  { id: 'actu',     label: 'Actus',     Icon: TrendingUp },
  { id: 'tutoriel', label: 'Tutoriels', Icon: Video },
  { id: 'dossier',  label: 'Dossiers',  Icon: FolderOpen },
  { id: 'magazine', label: 'Magazine',  Icon: BookOpen },
];

const ITEMS: VeilleRawItem[] = [
  { id: '1', type: 'actu',     typeLabel: 'Actu',     TypeIcon: TrendingUp, tone: 'brand', isNew: true,  title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites. Une analyse exclusive de l'équipe TLS.", category: 'IA & Pédagogie',     author: 'The Learning Society', publishedAt: "Aujourd'hui",      readTime: '6 min' },
  { id: '2', type: 'tutoriel', typeLabel: 'Tutoriel', TypeIcon: Video,      tone: 'warm',  isNew: true,  isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
  { id: '3', type: 'dossier',  typeLabel: 'Dossier',  TypeIcon: FolderOpen, tone: 'sun',   isNew: true,  title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
  { id: '4', type: 'magazine', typeLabel: 'Magazine', TypeIcon: BookOpen,   tone: 'brand', title: 'Tendances EdTech 2026', summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs et opportunités stratégiques.', category: 'EdTech', author: 'TLS Mag', publishedAt: 'Il y a 1 semaine', readTime: '18 min' },
  { id: '5', type: 'actu',     typeLabel: 'Actu',     TypeIcon: TrendingUp, tone: 'brand', title: "L'essor du microlearning dans les entreprises", summary: "78% des entreprises du CAC40 ont adopté le microlearning : résultats, bonnes pratiques et conditions du succès.", category: 'Formation', author: 'TLS Rédaction', publishedAt: 'Il y a 2 semaines', readTime: '4 min' },
  { id: '6', type: 'tutoriel', typeLabel: 'Tutoriel', TypeIcon: Video,      tone: 'warm',  isVideo: true, title: "Maîtriser l'IA pour la Formation Professionnelle", summary: "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement.", category: 'Facilitation', author: 'Pierre Leclerc', publishedAt: 'Il y a 3 semaines', readTime: '15 min' },
];

const resolveItemRoute = (item: VeilleRawItem) => {
  if (item.type === 'actu')     return `/veille/weekly-news/${item.id}`;
  if (item.type === 'tutoriel') return `/veille/video-tutorial/${item.id}`;
  if (item.type === 'dossier')  return `/veille/dossier/${item.id}`;
  if (item.type === 'magazine') return `/veille/magazine-article/${item.id}`;
  return '/veille';
};

const itemToVideoProps = (item: VeilleRawItem) => ({
  title: item.title, duration: item.readTime, instructor: item.author, description: item.summary,
});

/* ─── Component ─────────────────────────────────────────────────────────── */

export const Veille: React.FC = () => {
  const navigate   = useNavigate();
  const toast      = useToastContext();
  const emailId    = useId();

  const persistedFilter    = useFilterPrefsStore((s) => s.filters['veille']?.[0]);
  const setPersistedFilter = useFilterPrefsStore((s) => s.set);

  const [selected, setSelectedRaw] = useState<'all' | VeilleType>(
    (persistedFilter as 'all' | VeilleType) || 'all'
  );
  const setSelected = (val: 'all' | VeilleType) => {
    setSelectedRaw(val);
    setPersistedFilter('veille', [val]);
  };

  const [query, setQuery]         = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [videoModal, setVideoModal] = useState<VideoModalState>({ open: false });
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('list');

  const bookmarkedIds = useBookmarksStore((s) => s.ids);
  const toggleBookmark = useBookmarksStore((s) => s.toggle);
  const savedIds = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);

  const counts = useMemo(() => {
    const base: Record<'all' | VeilleType, number> = { all: ITEMS.length, actu: 0, tutoriel: 0, dossier: 0, magazine: 0 };
    ITEMS.forEach((item) => { base[item.type] += 1; });
    return base;
  }, []);

  const hasActiveFilter = selected !== 'all' || query.trim() !== '' || showSavedOnly;

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchType  = selected === 'all' || item.type === selected;
      const q          = query.trim().toLowerCase();
      const matchQuery = q === '' || item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
      const matchSaved = !showSavedOnly || savedIds.has(item.id);
      return matchType && matchQuery && matchSaved;
    });
  }, [selected, query, showSavedOnly, savedIds]);

  const handleOpen = (item: VeilleFeedItem) => {
    const raw = item as VeilleRawItem;
    if (raw.isVideo) setVideoModal({ open: true, item: raw });
    else navigate(resolveItemRoute(raw));
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (new FormData(e.currentTarget)).get('email') as string;
    toast.success(`Inscription confirmée pour ${email}`, 'Veille hebdo');
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <PageShell width="page" gap="stack-lg" noPadTop className="relative z-base pt-6 md:pt-8 lg:pt-10">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-tight">
        <span className="inline-flex items-center gap-1.5 text-micro font-bold text-ink-400 uppercase tracking-[0.08em] w-max">
          <Rss size={11} aria-hidden />
          Veille & Actualités
        </span>
        <h1 className="m-0 font-display text-h2 font-bold text-ink-900 tracking-headline leading-tight">
          Veille &amp; Actualités
        </h1>
        <p className="m-0 font-body text-body-sm text-ink-500 max-w-2xl">
          Actus, tutoriels, dossiers et magazine — toute la veille TLS au même endroit.
        </p>
      </div>

      {/* ── Search + filters ────────────────────────────────────────────── */}
      <Search
        variant="default"
        size="md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un sujet, auteur, catégorie…"
        aria-label="Rechercher dans la veille"
        trailing={
          hasActiveFilter ? (
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={<RotateCcw size={11} />}
              onClick={() => { setSelected('all'); setQuery(''); setShowSavedOnly(false); }}
            >
              Réinitialiser
            </Button>
          ) : undefined
        }
        filtersSlot={
          <div className="flex flex-wrap items-center gap-2">
            {TYPE_FILTERS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={[
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill font-body text-caption font-semibold border transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  selected === id
                    ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                    : 'bg-white text-ink-600 border-ink-200 hover:bg-ink-50 hover:border-ink-300',
                ].join(' ')}
              >
                {Icon && <Icon size={12} strokeWidth={2.5} />}
                {label}
                {id !== 'all' && (
                  <span className={selected === id ? 'text-white/70' : 'text-ink-400'}>
                    {counts[id]}
                  </span>
                )}
              </button>
            ))}

            <span aria-hidden className="w-px h-4 bg-ink-200 mx-0.5" />

            <button
              type="button"
              onClick={() => setShowSavedOnly((v) => !v)}
              className={[
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill font-body text-caption font-semibold border transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                showSavedOnly
                  ? 'bg-accent-400 text-ink-900 border-accent-400 shadow-sm'
                  : 'bg-white text-ink-600 border-ink-200 hover:bg-ink-50 hover:border-ink-300',
              ].join(' ')}
            >
              <Bookmark size={12} strokeWidth={2.5} />
              Sauvegardés
              {savedIds.size > 0 && (
                <span className={showSavedOnly ? 'text-ink-600' : 'text-ink-400'}>{savedIds.size}</span>
              )}
            </button>
          </div>
        }
      />

      {/* ── Feed ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-stack">
        {/* Count + display mode toggle */}
        <div className="flex items-center justify-between gap-stack">
          <span className="text-caption text-ink-500 font-medium">
            {filteredItems.length} résultat{filteredItems.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDisplayMode('grid')}
              aria-label="Affichage grille"
              aria-pressed={displayMode === 'grid'}
              className={[
                'inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                displayMode === 'grid'
                  ? 'bg-primary-100 text-primary-600 shadow-xs'
                  : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
              ].join(' ')}
            >
              <Grid3x3 size={14} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('list')}
              aria-label="Affichage liste"
              aria-pressed={displayMode === 'list'}
              className={[
                'inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                displayMode === 'list'
                  ? 'bg-primary-100 text-primary-600 shadow-xs'
                  : 'bg-white text-ink-400 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
              ].join(' ')}
            >
              <List size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        <VeilleCardFeed
          items={filteredItems}
          layout={displayMode}
          savedIds={savedIds}
          onToggleSave={(id) => toggleBookmark(id)}
          onItemClick={handleOpen}
          emptyMessage="Aucun résultat — essayez d'élargir vos filtres."
        />
      </div>

      {/* ── Bande mailing — glassy minimale ──────────────────────────────── */}
      <div className="rounded-2xl border border-ink-200/60 bg-white/70 backdrop-blur-glass-medium px-stack-lg py-stack">
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-stack-xs"
        >
          <div className="flex items-center gap-stack-xs text-ink-600 shrink-0">
            <Mail size={14} className="text-ink-400" />
            <span className="font-body text-body-sm">
              Recevoir les actus veille dans ta boîte mail
            </span>
          </div>
          <div className="flex items-center gap-stack-xs sm:ml-auto">
            <label htmlFor={emailId} className="sr-only">Votre adresse e-mail</label>
            <Input
              id={emailId}
              name="email"
              type="email"
              required
              size="sm"
              placeholder="votre@email.com"
              autoComplete="email"
              className="w-48 sm:w-56"
            />
            <Button type="submit" variant="primary" size="sm">
              S'abonner
            </Button>
            <button
              type="button"
              onClick={() => navigate('/veille/newsletter')}
              className="font-body text-caption text-ink-400 hover:text-primary-600 underline underline-offset-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              Gérer mes préférences
            </button>
          </div>
        </form>
      </div>

      {videoModal.item && (
        <VideoPlayerModal
          isOpen={videoModal.open}
          onClose={() => setVideoModal({ open: false })}
          {...itemToVideoProps(videoModal.item)}
        />
      )}
    </PageShell>
  );
};

export default Veille;
