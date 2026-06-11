/**
 * Veille : Hub éditorial (refonte v8)
 *
 * Structure :
 *  1. Hero full-bleed remixé : titre + sous-titre + search + category chips intégrés
 *  2. Feed vertical (VeilleCardFeed list) : tous les contenus filtrés
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
  Newspaper,
  Clapperboard,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';
import { Button } from '../components/core/Button';
import { Input } from '../components/core/Input';
import {
  VeilleCardFeed,
  type VeilleFeedItem,
} from '../components/patterns/VeilleCardFeed';
import { VeilleFormatShortcutCards } from '../components/patterns/VeilleFormatShortcutCards';
import { VeilleHeroFilterChips, type VeilleHeroFilter } from '../components/patterns/VeilleHeroFilterChips';

import { useBookmarksStore, useFilterPrefsStore } from '../stores/persistence';
import { useToastContext } from '../contexts/ToastContext';
import { Container } from '../components/layout';

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

        {/* Decorative grid : subtle texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-faint"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        />

        <Container width="page" padding={false} className="relative z-10 px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 pb-10 sm:pb-14 flex flex-col gap-6">

          {/* Titre + sous-titre */}
          <div className="flex flex-col gap-2">
            <h1 className="m-0 font-display font-bold text-white leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)' }}>
              Veille &amp; Actualités
            </h1>
            <p className="m-0 font-body text-body text-white/55 leading-relaxed max-w-2xl">
              Articles, vidéos, dossiers et le magazine TLS : leadership, IA et formation professionnelle.
            </p>
          </div>

          {/* Search bar glass : pleine largeur container */}
          <div className="relative">
            <SearchIcon size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <input
              type="search"
              placeholder="Rechercher un sujet, auteur, catégorie…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 font-body text-body-sm backdrop-blur-glass-light focus:outline-none focus:bg-white/12 focus:border-white/30 transition-all"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filtres type + Sauvegardés */}
          <VeilleHeroFilterChips
            filters={TYPE_FILTERS.map(({ id, label, Icon }): VeilleHeroFilter => ({
              id,
              label,
              icon: Icon ? <Icon size={12} strokeWidth={2.5} /> : undefined,
              count: id !== 'all' ? counts[id] : undefined,
            }))}
            value={selected}
            onChange={(id) => setSelected(id as 'all' | VeilleType)}
            savedCount={savedIds.size}
            isSavedActive={showSavedOnly}
            onSavedToggle={() => setShowSavedOnly((v) => !v)}
            hasActiveFilter={hasActiveFilter}
            onReset={() => { setSelected('all'); setQuery(''); setShowSavedOnly(false); }}
            resultsCount={filteredItems.length}
          />

          {/* Formats éditoriaux : 4 cartes navigation, dark-glass */}
          <VeilleFormatShortcutCards
            className="pt-1"
            items={[
              { label: 'Magazine TLS',  desc: 'Mensuel · analyses',     icon: <BookOpen     size={15} strokeWidth={2} />, iconClassName: 'text-primary-200',   onClick: () => navigate('/veille/magazine') },
              { label: 'Actu hebdo',    desc: 'Chaque vendredi',        icon: <Newspaper    size={15} strokeWidth={2} />, iconClassName: 'text-secondary-200', onClick: () => navigate('/veille/weekly-newsletter') },
              { label: 'Vidéo Reels',   desc: 'Short formats · 60 sec', icon: <Clapperboard size={15} strokeWidth={2} />, iconClassName: 'text-white/70',      onClick: () => navigate('/veille/video-reels') },
              { label: 'Newsletter',    desc: 'Abonnement & archives',  icon: <Mail         size={15} strokeWidth={2} />, iconClassName: 'text-accent-300',    onClick: () => navigate('/veille/newsletter') },
            ]}
          />

        </Container>
      </section>

      {/* ── 3. FEED VERTICAL ─────────────────────────────────────────────── */}
      <Container width="page" className="py-section flex flex-col gap-section flex-1">

        <VeilleCardFeed
          items={filteredItems}
          layout="list"
          savedIds={savedIds}
          onToggleSave={(id) => toggleBookmark(id)}
          onItemClick={handleOpen}
          emptyMessage="Aucun résultat : essayez d'élargir vos filtres."
        />
      </Container>

      {/* ── 4. BANDE MAILING : glassy minimale ──────────────────────────── */}
      <div className="relative border-t border-ink-200/60 bg-white/70 backdrop-blur-glass-medium">
        <Container width="page" padding={false} className="px-4 sm:px-6 lg:px-10 py-4">
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
        </Container>
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
