/**
 * VeilleCardFeed — Feed de contenus éditoriaux (articles, vidéos, dossiers, magazine).
 *
 * v2 (Phase 10) : refonte avec featured spotlight + surface variants + author/readTime + bookmark.
 *
 * Features :
 *  - Item flagué `featured: true` → rendu en hero spotlight horizontal en haut du feed
 *  - Cards verticales avec top stripe tone-aware (indicateur visuel rapide du type)
 *  - 3 surfaces (card / tinted / glass) — extensible aux conventions DS
 *  - 3 tones (brand / warm / sun) — par item ou globale
 *  - Save (bookmark) configurable
 *  - Loading state + empty state
 *  - Grid responsive 1/2/3 cols
 *
 * ⚠️ Neutralise piège #8 `[role="button"]` (BEM 40px clip) via `!h-auto !overflow-visible`.
 */

import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Play,
  User,
  Clock,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '../core/Button';

export type VeilleCardTone = 'brand' | 'warm' | 'sun';
export type VeilleCardSurface = 'card' | 'tinted' | 'glass';
/** Layout du feed : grid (cards verticales) ou list (cards horizontales). */
export type VeilleCardFeedLayout = 'grid' | 'list';

export interface VeilleFeedItem {
  id: string;
  /** Label affiché en badge type (ex. "Actu", "Tutoriel"). */
  typeLabel: string;
  /** Icône Lucide associée au type. */
  TypeIcon: LucideIcon;
  /** Tone visuel (couleur stripe + badge + CTA). */
  tone: VeilleCardTone;
  /** True si vidéo → affiche overlay Play sur le spotlight + label "Voir". */
  isVideo?: boolean;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  /** Si true, affiché en hero spotlight horizontal en haut du feed. */
  featured?: boolean;
}

export interface VeilleCardFeedProps {
  items: VeilleFeedItem[];
  savedIds?: Set<string> | string[];
  onToggleSave?: (id: string) => void;
  onItemClick?: (item: VeilleFeedItem) => void;
  /** Layout : 'grid' (cards verticales 1/2/3 cols — DEFAULT) ou 'list' (cards horizontales dense). */
  layout?: VeilleCardFeedLayout;
  /** Surface des cards (card/tinted/glass). Default 'card'. */
  surface?: VeilleCardSurface;
  /** Cacher le bouton bookmark si pas besoin. Default true. */
  showSaveButton?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

/* ─── Tone visual maps ───────────────────────────────────────────────────── */

/** Top stripe accent (4px) — indicateur visuel rapide du type. */
const STRIPE_BG: Record<VeilleCardTone, string> = {
  brand: 'bg-primary-500',
  warm:  'bg-secondary-500',
  sun:   'bg-accent-400',
};

const BADGE_STYLE: Record<VeilleCardTone, string> = {
  brand: 'bg-primary-50 text-primary-700 border-primary-200',
  warm:  'bg-secondary-50 text-secondary-700 border-secondary-200',
  sun:   'bg-accent-50 text-accent-700 border-accent-200',
};

const TONE_LINK: Record<VeilleCardTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

const COVER_GRADIENT: Record<VeilleCardTone, string> = {
  brand: 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700',
  warm:  'bg-gradient-to-br from-secondary-300 via-secondary-500 to-secondary-700',
  sun:   'bg-gradient-to-br from-accent-300 via-accent-500 to-secondary-500',
};

const CTA_VARIANT: Record<VeilleCardTone, 'glass-brand' | 'glass-warm' | 'glass-sun'> = {
  brand: 'glass-brand',
  warm:  'glass-warm',
  sun:   'glass-sun',
};

/* ─── Surface maps ───────────────────────────────────────────────────────── */

const SURFACE_CARD = 'bg-white border-ink-200 hover:border-ink-300';
const SURFACE_TINTED: Record<VeilleCardTone, string> = {
  brand: 'bg-primary-50/60 border-primary-100 hover:border-primary-200 hover:bg-primary-50',
  warm:  'bg-secondary-50/60 border-secondary-100 hover:border-secondary-200 hover:bg-secondary-50',
  sun:   'bg-accent-50/60 border-accent-100 hover:border-accent-200 hover:bg-accent-50',
};
const SURFACE_GLASS = 'bg-white/60 backdrop-blur-glass-light border-white/60 hover:bg-white/80';

function getSurfaceClasses(surface: VeilleCardSurface, tone: VeilleCardTone): string {
  switch (surface) {
    case 'tinted': return SURFACE_TINTED[tone];
    case 'glass':  return SURFACE_GLASS;
    case 'card':
    default:       return SURFACE_CARD;
  }
}

/** Neutralisation piège #8 BEM `[role="button"]`. */
const ROLE_BUTTON_RESET = '!h-auto !overflow-visible !items-stretch !font-normal';

/* ─── VeilleCard (vertical, top-stripe design) ───────────────────────────── */

export interface VeilleCardProps {
  item: VeilleFeedItem;
  surface: VeilleCardSurface;
  isSaved: boolean;
  showSaveButton: boolean;
  onToggleSave?: (id: string) => void;
  onClick?: (item: VeilleFeedItem) => void;
}

export const VeilleCard: React.FC<VeilleCardProps> = ({ item, surface, isSaved, showSaveButton, onToggleSave, onClick }) => {
  const { TypeIcon, tone, isVideo } = item;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(item); }}
      aria-label={`${isVideo ? 'Visionner' : 'Lire'} : ${item.title}`}
      className={[
        'group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer',
        'transition-all duration-base hover:-translate-y-1 hover:shadow-xl',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        surface === 'glass' ? SURFACE_GLASS : 'bg-white border-ink-200 hover:border-ink-300',
        ROLE_BUTTON_RESET,
      ].join(' ')}
    >
      {/* Cover gradient tone-aware (h-40) — style magazine cover */}
      <div className={['relative h-40 shrink-0 overflow-hidden', COVER_GRADIENT[tone]].join(' ')}>
        {/* Decorative radial pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} aria-hidden />

        {/* Big type icon centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon size={72} strokeWidth={1.25} className="text-white/95 transition-transform duration-base group-hover:scale-110" />
        </div>

        {/* Play overlay for videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/95 text-secondary-700 shadow-lg transition-transform duration-base group-hover:scale-110">
              <Play size={22} fill="currentColor" />
            </span>
          </div>
        )}

        {/* Type badge top-left (glass on tone bg) */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-white/95 backdrop-blur-glass-light text-micro font-bold uppercase tracking-wider text-ink-900 shadow-sm">
          <TypeIcon size={11} strokeWidth={2.5} /> {item.typeLabel}
        </span>

        {/* Bookmark top-right glass */}
        {showSaveButton && onToggleSave && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
            className={[
              'absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-pill backdrop-blur-glass-light border transition-all',
              isSaved
                ? 'bg-white text-primary-700 border-white shadow-sm'
                : 'bg-white/30 text-white border-white/40 hover:bg-white/60 hover:text-ink-900',
            ].join(' ')}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        )}
      </div>

      {/* Body content */}
      <div className="flex flex-col gap-stack-xs p-5 flex-1">
        <span className="font-body text-micro font-semibold uppercase tracking-wider text-ink-500">
          {item.category} · {item.publishedAt}
        </span>

        <h3 className="m-0 font-display text-h4 font-bold text-ink-900 leading-tight line-clamp-2">
          {item.title}
        </h3>

        <p className="m-0 font-body text-body-sm text-ink-600 leading-relaxed line-clamp-2 flex-1">
          {item.summary}
        </p>

        <footer className="flex flex-wrap gap-3 items-center justify-between pt-stack-xs border-t border-ink-100 mt-stack-xs">
          <div className="inline-flex items-center gap-2 font-body text-caption text-ink-600 min-w-0">
            <span className="inline-flex items-center gap-1 truncate">
              <User size={12} />{item.author}
            </span>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Clock size={12} />{item.readTime}
            </span>
          </div>
          <span className={['inline-flex items-center gap-1 font-body text-caption font-bold transition-transform group-hover:translate-x-0.5', TONE_LINK[tone]].join(' ')}>
            {isVideo ? <><Play size={11} fill="currentColor" /> Voir</> : <>Lire <ArrowRight size={13} /></>}
          </span>
        </footer>
      </div>
    </article>
  );
};

/* ─── VeilleCardListItem (horizontal layout pour mode list) ──────────────── */

export const VeilleCardListItem: React.FC<VeilleCardProps> = ({ item, surface, isSaved, showSaveButton, onToggleSave, onClick }) => {
  const { TypeIcon, tone, isVideo } = item;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(item); }}
      aria-label={`${isVideo ? 'Visionner' : 'Lire'} : ${item.title}`}
      className={[
        'group relative flex items-stretch gap-0 rounded-2xl border overflow-hidden cursor-pointer',
        'transition-all duration-base hover:-translate-y-0.5 hover:shadow-lg',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        surface === 'glass' ? SURFACE_GLASS : 'bg-white border-ink-200 hover:border-ink-300',
        ROLE_BUTTON_RESET,
      ].join(' ')}
    >
      {/* Large square cover gradient left (28 w · self-stretch) */}
      <div className={['relative w-28 sm:w-36 shrink-0 overflow-hidden', COVER_GRADIENT[tone]].join(' ')}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon size={44} strokeWidth={1.5} className="text-white/95 transition-transform duration-base group-hover:scale-110" />
        </div>
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-secondary-700 shadow">
              <Play size={16} fill="currentColor" />
            </span>
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="flex-1 min-w-0 flex flex-col gap-tight p-4 sm:p-5 justify-center">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={['inline-flex items-center gap-1 px-2 py-0.5 rounded-pill border text-micro font-bold uppercase tracking-wider', BADGE_STYLE[tone]].join(' ')}>
            <TypeIcon size={10} strokeWidth={2.5} /> {item.typeLabel}
          </span>
          <span className="font-body text-micro text-ink-500">{item.category} · {item.publishedAt}</span>
        </div>
        <h3 className="m-0 font-display text-body sm:text-h4 font-bold text-ink-900 leading-tight line-clamp-2">
          {item.title}
        </h3>
        <p className="m-0 font-body text-caption sm:text-body-sm text-ink-600 leading-relaxed line-clamp-2">
          {item.summary}
        </p>
        <div className="inline-flex items-center gap-2 font-body text-caption text-ink-600 mt-tight">
          <span className="inline-flex items-center gap-1 truncate"><User size={11} />{item.author}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1 shrink-0"><Clock size={11} />{item.readTime}</span>
        </div>
      </div>

      {/* Right actions : bookmark + CTA */}
      <div className="flex flex-col items-end justify-between gap-stack-xs shrink-0 p-4">
        {showSaveButton && onToggleSave ? (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
            className={[
              'inline-flex items-center justify-center w-9 h-9 rounded-pill cursor-pointer transition-all',
              isSaved
                ? 'bg-primary-50 text-primary-700 border border-primary-200'
                : 'bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700 border border-transparent',
            ].join(' ')}
          >
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        ) : <span aria-hidden />}
        <span className={['inline-flex items-center gap-1 font-body text-caption font-bold transition-transform group-hover:translate-x-0.5 whitespace-nowrap', TONE_LINK[tone]].join(' ')}>
          {isVideo ? <><Play size={11} fill="currentColor" /> Voir</> : <>Lire <ArrowRight size={13} /></>}
        </span>
      </div>
    </article>
  );
};

/* ─── FeaturedSpotlight (hero card horizontal) ───────────────────────────── */

export interface FeaturedSpotlightProps {
  item: VeilleFeedItem;
  isSaved: boolean;
  showSaveButton: boolean;
  onToggleSave?: (id: string) => void;
  onClick?: (item: VeilleFeedItem) => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({ item, isSaved, showSaveButton, onToggleSave, onClick }) => {
  const { TypeIcon, tone } = item;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(item); }}
      className={[
        'group relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] rounded-2xl border border-ink-200 bg-white overflow-hidden cursor-pointer',
        'transition-all duration-base hover:-translate-y-1 hover:shadow-xl',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        ROLE_BUTTON_RESET,
      ].join(' ')}
    >
      {/* Cover (left) — gradient + icon */}
      <div className={['relative min-h-[240px] lg:min-h-[300px] overflow-hidden', COVER_GRADIENT[tone]].join(' ')}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, transparent 60%)' }} aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon size={96} strokeWidth={1.25} className="text-white/90 transition-transform duration-base group-hover:scale-110" />
        </div>
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white/95 backdrop-blur-glass-light text-caption font-bold text-ink-900 shadow-sm">
          ✨ À la une
        </span>
        {showSaveButton && onToggleSave && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleSave(item.id); }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
            className={[
              'absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-pill backdrop-blur-glass-light border transition-all',
              isSaved
                ? 'bg-white text-primary-700 border-white shadow-sm'
                : 'bg-white/30 text-white border-white/40 hover:bg-white/60 hover:text-ink-900',
            ].join(' ')}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        )}
      </div>

      {/* Content (right) */}
      <div className="flex flex-col gap-stack p-6 lg:p-8 justify-center">
        <span className={['inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-pill border text-micro font-bold uppercase tracking-wider', BADGE_STYLE[tone]].join(' ')}>
          <TypeIcon size={11} strokeWidth={2.5} /> {item.typeLabel} · {item.category}
        </span>
        <h2 className="m-0 font-display text-h2 font-bold text-ink-900 leading-tight">
          {item.title}
        </h2>
        <p className="m-0 font-body text-body text-ink-700 leading-relaxed line-clamp-3">
          {item.summary}
        </p>
        <div className="flex flex-wrap gap-3 items-center text-caption text-ink-600">
          <span className="inline-flex items-center gap-1"><User size={13} />{item.author}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} />{item.readTime}</span>
          <span aria-hidden>•</span>
          <span>{item.publishedAt}</span>
        </div>
        <Button
          variant={CTA_VARIANT[tone]}
          size="md"
          trailingIcon={<ArrowRight size={16} />}
          onClick={(e) => { e.stopPropagation(); onClick?.(item); }}
          className="self-start"
        >
          {item.isVideo ? 'Visionner maintenant' : "Lire l'article"}
        </Button>
      </div>
    </article>
  );
};

/* ─── Main component ─────────────────────────────────────────────────────── */

export const VeilleCardFeed: React.FC<VeilleCardFeedProps> = ({
  items,
  savedIds,
  onToggleSave,
  onItemClick,
  layout = 'grid',
  surface = 'card',
  showSaveButton = true,
  isLoading = false,
  emptyMessage = 'Aucun contenu disponible',
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-10 h-10 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm font-medium">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div
        className={[
          'flex items-center justify-center p-12 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200',
          className,
        ].filter(Boolean).join(' ')}
      >
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <p className="m-0 text-4xl">📭</p>
          <p className="m-0 text-body-sm font-medium">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const featured = items.find((i) => i.featured);
  const others = items.filter((i) => !i.featured);

  const isSavedSet =
    savedIds instanceof Set ? savedIds : new Set(savedIds ?? []);
  const isSaved = (id: string) => isSavedSet.has(id);

  return (
    <div className={['flex flex-col gap-stack-lg', className].filter(Boolean).join(' ')}>
      {featured && (
        <FeaturedSpotlight
          item={featured}
          isSaved={isSaved(featured.id)}
          showSaveButton={showSaveButton}
          onToggleSave={onToggleSave}
          onClick={onItemClick}
        />
      )}

      {others.length > 0 && (
        layout === 'list' ? (
          <div className="flex flex-col gap-stack">
            {others.map((item) => (
              <VeilleCardListItem
                key={item.id}
                item={item}
                surface={surface}
                isSaved={isSaved(item.id)}
                showSaveButton={showSaveButton}
                onToggleSave={onToggleSave}
                onClick={onItemClick}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
            {others.map((item) => (
              <VeilleCard
                key={item.id}
                item={item}
                surface={surface}
                isSaved={isSaved(item.id)}
                showSaveButton={showSaveButton}
                onToggleSave={onToggleSave}
                onClick={onItemClick}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default VeilleCardFeed;
