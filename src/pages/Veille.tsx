/**
 * Veille — Hub éditorial (refonte v8)
 *
 * Structure :
 *  1. Hero full-bleed remixé — titre + sous-titre + search + category chips intégrés
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
  Search as SearchIcon,
  Mail,
  X,
  Bookmark,
  Newspaper,
  Clapperboard,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import {
  VeilleCardFeed,
  type VeilleFeedItem,
} from '../components/patterns/VeilleCardFeed';
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
  { id: '1', type: 'actu',     typeLabel: 'Actu',     TypeIcon: TrendingUp, tone: 'brand', title: "IA générative en formation : où en sommes-nous en 2026 ?", summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites. Une analyse exclusive de l'équipe TLS.", category: 'IA & Pédagogie',     author: 'The Learning Society', publishedAt: "Aujourd'hui",      readTime: '6 min' },
  { id: '2', type: 'tutoriel', typeLabel: 'Tutoriel', TypeIcon: Video,      tone: 'warm',  isVideo: true, title: 'Construire un prompt structuré en 5 étapes', summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.', category: 'Prompt Engineering', author: 'Marie Dubois', publishedAt: 'Hier', readTime: '12 min' },
  { id: '3', type: 'dossier',  typeLabel: 'Dossier',  TypeIcon: FolderOpen, tone: 'sun',   title: "Transformation IA des parcours de formation", summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.", category: 'Management', author: 'McKinsey', publishedAt: 'Il y a 3 jours', readTime: '22 min' },
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
    <div className="relative min-h-screen flex flex-col bg-white">

      {/* ── 1. HERO full-bleed remixé ─────────────────────────────────────── */}
      <section
        aria-label="Veille & Actualités TLS"
        className="relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #2F5F6A 0%, #3D7786 40%, #55A1B4 75%, #73AFBF 100%)' }}
      >
        {/* Ambient glows */}
        <div aria-hidden className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-[100px] pointer-events-none" />
        <div aria-hidden className="absolute top-1/3 -left-16 w-64 h-64 rounded-full bg-primary-900/20 blur-[80px] pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 right-1/3 w-56 h-32 rounded-full bg-white/8 blur-[60px] pointer-events-none" />

        {/* Decorative grid — subtle texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-faint"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 pb-10 sm:pb-14">

          {/* Layout 2 cols desktop : titre gauche / search+chips droite */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-end mb-6">

            {/* Titre + sous-titre */}
            <div className="flex flex-col gap-3">
              <h1 className="m-0 font-display font-bold text-white leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(2.75rem, 5vw, 4rem)' }}>
                Veille &amp;<br /> Actualités
              </h1>
              <p className="m-0 font-body text-body-lg text-white/55 leading-relaxed">
                Articles, vidéos, dossiers et le magazine TLS — leadership, IA et formation professionnelle.
              </p>
            </div>

            {/* Search bar + chips — côté droit, même largeur que le contenu du feed */}
            <div className="flex flex-col gap-4">

          {/* Search bar glass — intégrée dans le hero */}
          <div className="relative mb-0">
            <SearchIcon
              size={18}
              strokeWidth={2}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Rechercher un sujet, auteur, catégorie…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 font-body text-body-sm backdrop-blur-glass-light focus:outline-none focus:bg-white/12 focus:border-white/30 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category chips + pill Sauvegardés */}
          <div className="flex flex-wrap items-center gap-2">
            {TYPE_FILTERS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={[
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill font-body text-caption font-semibold border transition-all duration-base',
                  selected === id
                    ? 'bg-white text-ink-900 border-white shadow-md'
                    : 'bg-white/8 text-white/70 border-white/15 hover:bg-white/15 hover:text-white hover:border-white/25',
                ].join(' ')}
              >
                {Icon && <Icon size={12} strokeWidth={2.5} />}
                {label}
                {id !== 'all' && (
                  <span className={selected === id ? 'text-ink-500' : 'text-white/40'}>
                    {counts[id]}
                  </span>
                )}
              </button>
            ))}

            {/* Séparateur visuel */}
            <span aria-hidden className="w-px h-4 bg-white/20 mx-0.5" />

            {/* Pill Sauvegardés */}
            <button
              type="button"
              onClick={() => setShowSavedOnly((v) => !v)}
              className={[
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill font-body text-caption font-semibold border transition-all duration-base',
                showSavedOnly
                  ? 'bg-accent-400 text-ink-900 border-accent-400 shadow-md'
                  : 'bg-white/8 text-white/70 border-white/15 hover:bg-white/15 hover:text-white hover:border-white/25',
              ].join(' ')}
            >
              <Bookmark size={12} strokeWidth={2.5} />
              Sauvegardés
              {savedIds.size > 0 && (
                <span className={showSavedOnly ? 'text-ink-600' : 'text-white/40'}>
                  {savedIds.size}
                </span>
              )}
            </button>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => { setSelected('all'); setQuery(''); setShowSavedOnly(false); }}
                className="font-body text-caption text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors ml-1"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Résultats count — quand filtre actif */}
          {hasActiveFilter && (
            <p className="font-body text-caption text-white/40 mb-0">
              <strong className="text-white/70">{filteredItems.length}</strong> résultat{filteredItems.length !== 1 ? 's' : ''}
              {selected !== 'all' && ` · ${TYPE_FILTERS.find((f) => f.id === selected)?.label}`}
              {showSavedOnly && ' · Sauvegardés'}
              {query.trim() && ` pour "${query.trim()}"`}
            </p>
          )}

            </div>{/* end search+chips col */}
          </div>{/* end 2-col grid */}
        </div>{/* end max-w container */}
      </section>

      {/* ── 2. FORMATS ÉDITORIAUX — 4 portes d'entrée ───────────────────── */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 pt-section-lg pb-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: 'Magazine TLS',
              desc: 'Numéro mensuel · analyses & tendances',
              Icon: BookOpen,
              tone: 'bg-primary-50 border-primary-100 hover:border-primary-200',
              iconTone: 'text-primary-600 bg-primary-100',
              labelTone: 'text-primary-700',
              descTone: 'text-primary-600/70',
              route: '/veille/magazine',
            },
            {
              label: 'Actu hebdo',
              desc: 'Newsletter éditoriale · chaque vendredi',
              Icon: Newspaper,
              tone: 'bg-secondary-50 border-secondary-100 hover:border-secondary-200',
              iconTone: 'text-secondary-600 bg-secondary-100',
              labelTone: 'text-secondary-700',
              descTone: 'text-secondary-600/70',
              route: '/veille/weekly-newsletter',
            },
            {
              label: 'Vidéo Reels',
              desc: 'Short formats · 60 sec pour apprendre',
              Icon: Clapperboard,
              tone: 'bg-ink-50 border-ink-100 hover:border-ink-200',
              iconTone: 'text-ink-600 bg-ink-100',
              labelTone: 'text-ink-800',
              descTone: 'text-ink-500',
              route: '/veille/video-reels',
            },
            {
              label: 'Newsletter',
              desc: 'Abonnement · préférences · archives',
              Icon: Mail,
              tone: 'bg-accent-50 border-accent-100 hover:border-accent-200',
              iconTone: 'text-accent-500 bg-accent-100',
              labelTone: 'text-accent-600',
              descTone: 'text-accent-500/70',
              route: '/veille/newsletter',
            },
          ].map(({ label, desc, Icon, tone, iconTone, labelTone, descTone, route }) => (
            <button
              key={route}
              type="button"
              onClick={() => navigate(route)}
              className={[
                'group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-base text-left',
                tone,
              ].join(' ')}
            >
              <span className={['shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg', iconTone].join(' ')}>
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className={['font-body text-caption font-bold leading-tight', labelTone].join(' ')}>{label}</span>
                <span className={['font-body text-micro leading-tight hidden sm:block', descTone].join(' ')}>{desc}</span>
              </span>
              <ArrowRight size={13} className={['shrink-0 opacity-0 group-hover:opacity-100 transition-opacity', labelTone].join(' ')} />
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. FEED VERTICAL ─────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section flex-1">
        <VeilleCardFeed
          items={filteredItems}
          layout="list"
          savedIds={savedIds}
          onToggleSave={(id) => toggleBookmark(id)}
          onItemClick={handleOpen}
          emptyMessage="Aucun résultat — essayez d'élargir vos filtres."
        />
      </main>

      {/* ── 4. BANDE MAILING — glassy minimale ──────────────────────────── */}
      <div className="relative border-t border-ink-200/60 bg-white/70 backdrop-blur-glass-medium">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <div className="flex items-center gap-2 text-ink-600 shrink-0">
              <Mail size={14} className="text-ink-400" />
              <span className="font-body text-body-sm">
                Recevoir les actus veille dans votre boîte mail
              </span>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
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
                className="font-body text-caption text-ink-400 hover:text-primary-600 underline underline-offset-2 transition-colors whitespace-nowrap hidden sm:block"
              >
                Gérer mes préférences
              </button>
            </div>
          </form>
        </div>
      </div>

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
