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
  Grid3x3,
  List,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import { SearchFilters } from '../components/patterns/SearchFilters';
import {
  VeilleCardFeed,
  type VeilleFeedItem,
} from '../components/patterns/VeilleCardFeed';
import { PageShell } from '../components/layout';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
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

  const compte = `${filteredItems.length} publication${filteredItems.length > 1 ? 's' : ''}`;

  return (
    /* Rythme et marge haute par défaut de PageShell : 48 entre l'en-tête, la
       collection et la bande d'abonnement. La page posait sa propre marge
       haute, plus courte que celle des autres pages, et 24 px partout. */
    <PageShell width="page" className="relative z-base">

      {/* ── Page header ───────────────────────────────────────────────────
          Le PageHero de l'app (h1 36, chapô 18 ink-700). Il était fait main :
          h1 à 28, chapô à 16 au cran 500 des placeholders, collé à 2 px. */}
      <PageHero
        tone="flat"
        title="Veille et actualités"
        summary="Actus, tutoriels, dossiers et magazine : toute la veille TLS au même endroit."
      />

      {/* ── La collection : titre (h2) → recherche → fil, 16 px ───────────
          La page passait du h1 aux titres des publications. Le compte est
          une donnée (méta 13 ink-600, il était au cran 500) ; le choix de
          l'affichage est l'action de la section. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Dernières publications"
          meta={compte}
          action={
            <div className="flex items-center gap-stack-3xs">
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                aria-label="Affichage grille"
                aria-pressed={displayMode === 'grid'}
                className={[
                  'inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                  displayMode === 'grid'
                    ? 'bg-primary-100 text-primary-800 shadow-xs'
                    : 'bg-white text-ink-600 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
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
                    ? 'bg-primary-100 text-primary-800 shadow-xs'
                    : 'bg-white text-ink-600 hover:text-ink-600 hover:bg-ink-50 border border-ink-200',
                ].join(' ')}
              >
                <List size={14} strokeWidth={2} />
              </button>
            </div>
          }
        />

        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          placeholder="Rechercher un sujet, auteur, catégorie…"
          aria-label="Rechercher dans la veille"
          filters={[
            {
              id: 'type',
              label: 'Type',
              multi: false,
              options: TYPE_FILTERS.filter((f) => f.id !== 'all').map((f) => ({
                id: f.id,
                label: f.label,
                count: counts[f.id as VeilleType],
                icon: f.Icon ? <f.Icon size={14} strokeWidth={2.5} /> : undefined,
              })),
              selected: selected === 'all' ? [] : [selected],
              onChange: (ids) => setSelected((ids[0] as 'all' | VeilleType) ?? 'all'),
            },
            {
              id: 'saved',
              label: 'Sauvegardés',
              kind: 'toggle',
              icon: <Bookmark size={14} strokeWidth={2.5} />,
              value: showSavedOnly,
              onChange: setShowSavedOnly,
              count: savedIds.size || undefined,
            },
          ]}
        />

        <VeilleCardFeed
          items={filteredItems}
          layout={displayMode}
          savedIds={savedIds}
          onToggleSave={(id) => toggleBookmark(id)}
          onItemClick={handleOpen}
          emptyMessage="Aucun résultat. Essayez d'élargir vos filtres."
        />
      </section>

      {/* ── Bande d'abonnement ────────────────────────────────────────────
          Un conteneur posé dans la page : rayon 20, padding 24 (anatomie de
          carte ; il était à 14 pour 16 de haut). Elle mesure SA largeur
          (requête de conteneur) : sur une ligne à partir de 768 px de bande,
          sinon trois rangées — la phrase, le champ et son bouton, le lien. À
          375 px, tout tenait sur une ligne de 428 px dans 295 : « Gérer mes
          préférences » sortait de la bande. */}
      <div className="@container rounded-xl border border-ink-200/60 bg-white/70 backdrop-blur-glass-medium p-stack-lg">
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col gap-stack-sm @3xl:flex-row @3xl:items-center @3xl:gap-stack"
        >
          {/* La phrase porte l'offre : 16/600 ink-900 (elle était au cran 600
              de la méta). L'icône se cale sur sa première ligne. */}
          <p className="flex items-start gap-stack-xs font-body text-body font-semibold text-ink-900 @3xl:flex-1">
            <Mail size={16} className="shrink-0 mt-[5px] text-ink-600" aria-hidden="true" />
            Recevoir les actus veille dans ta boîte mail
          </p>
          <div className="flex items-center gap-stack-xs">
            <label htmlFor={emailId} className="sr-only">Votre adresse e-mail</label>
            <Input
              id={emailId}
              name="email"
              type="email"
              required
              size="sm"
              placeholder="votre@email.com"
              autoComplete="email"
              className="flex-1 min-w-0 @3xl:flex-none @3xl:w-56"
            />
            <Button type="submit" emphasis="soft" size="sm">
              S'abonner
            </Button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/veille/newsletter')}
            className="self-start @3xl:self-auto inline-flex items-center min-h-6 py-1 -my-1 font-body text-caption text-ink-600 hover:text-primary-800 underline underline-offset-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          >
            Gérer mes préférences
          </button>
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
