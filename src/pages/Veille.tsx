/**
 * Veille Page
 *
 * Hub de contenus éditoriaux (anciennement "Monitoring") :
 * - Sélection multi-format (Actu, Tutoriel, Dossier, Magazine)
 * - Recherche par titre / catégorie
 * - Filtres en pills
 * - Liste type "feed" (carte par item)
 *
 * Statique pour l'instant — les données seront branchées sur l'API WP plus tard.
 * Référence Figma: figmamakedesignreact/src/app/pages/VeillePage.tsx
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
  Search,
  X,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { VideoPlayerModal } from '../components/modals';

type VeilleType = 'actu' | 'tutoriel' | 'dossier' | 'magazine';

interface VeilleItem {
  id: string;
  type: VeilleType;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string; // formaté pour l'affichage
  readTime: string;
}

const FILTERS: { id: 'all' | VeilleType; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'all', label: 'Tout', Icon: Sparkles },
  { id: 'actu', label: 'Actus', Icon: TrendingUp },
  { id: 'tutoriel', label: 'Tutoriels', Icon: Video },
  { id: 'dossier', label: 'Dossiers', Icon: FolderOpen },
  { id: 'magazine', label: 'Le Mag', Icon: BookOpen },
];

const TYPE_META: Record<VeilleType, { label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; tone: 'primary' | 'warm' | 'sun' }> = {
  actu: { label: 'Actu de la semaine', Icon: TrendingUp, tone: 'primary' },
  tutoriel: { label: 'Tutoriel', Icon: Video, tone: 'warm' },
  dossier: { label: 'Dossier', Icon: FolderOpen, tone: 'sun' },
  magazine: { label: 'Magazine', Icon: BookOpen, tone: 'primary' },
};

const ITEMS: VeilleItem[] = [
  {
    id: '1',
    type: 'actu',
    title: "IA générative en formation : où en sommes-nous en 2026 ?",
    summary: "Tour d'horizon des nouveaux usages de l'IA dans les parcours de formation, des cas concrets et des limites.",
    category: 'IA & Pédagogie',
    author: 'The Learning Society',
    publishedAt: "Aujourd'hui",
    readTime: '6 min',
  },
  {
    id: '2',
    type: 'tutoriel',
    title: 'Construire un prompt structuré en 5 étapes',
    summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.',
    category: 'Prompt Engineering',
    author: 'Marie Dubois',
    publishedAt: 'Hier',
    readTime: '12 min',
  },
  {
    id: '3',
    type: 'dossier',
    title: "Transformation IA des parcours de formation",
    summary: "Synthèse approfondie sur l'impact de l'IA sur les dispositifs de formation professionnelle en Europe.",
    category: 'Management',
    author: 'McKinsey',
    publishedAt: 'Il y a 3 jours',
    readTime: '22 min',
  },
  {
    id: '4',
    type: 'magazine',
    title: 'Tendances EdTech 2026',
    summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs et opportunités stratégiques.',
    category: 'EdTech',
    author: 'TLS Mag',
    publishedAt: 'Il y a 1 semaine',
    readTime: '18 min',
  },
  {
    id: '5',
    type: 'actu',
    title: "L'essor du microlearning dans les entreprises françaises",
    summary: "78% des entreprises du CAC40 ont adopté le microlearning : résultats, bonnes pratiques et conditions du succès.",
    category: 'Formation',
    author: 'TLS Rédaction',
    publishedAt: 'Il y a 2 semaines',
    readTime: '4 min',
  },
  {
    id: '6',
    type: 'tutoriel',
    title: 'Maîtriser l\'IA pour la Formation Professionnelle',
    summary: "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement.",
    category: 'Facilitation',
    author: 'Pierre Leclerc',
    publishedAt: 'Il y a 3 semaines',
    readTime: '15 min',
  },
];

interface VideoModalState {
  open: boolean;
  item?: VeilleItem;
}

// Maps a VeilleItem to VideoPlayerModal props
const itemToVideoProps = (item: VeilleItem) => ({
  title: item.title,
  duration: item.readTime,
  instructor: item.author,
  description: item.summary,
});

export const Veille: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'all' | VeilleType>('all');
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [videoModal, setVideoModal] = useState<VideoModalState>({ open: false });

  const counts = useMemo(() => {
    const base: Record<'all' | VeilleType, number> = {
      all: ITEMS.length,
      actu: 0,
      tutoriel: 0,
      dossier: 0,
      magazine: 0,
    };
    ITEMS.forEach((item) => {
      base[item.type] += 1;
    });
    return base;
  }, []);

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchType = selected === 'all' || item.type === selected;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [selected, query]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resolveItemRoute = (item: VeilleItem) => {
    // Chaque type pointe vers sa page spécifiquement designée
    if (item.type === 'actu')     return `/veille/weekly-news/${item.id}`;    // → WeeklyNewsDetail
    if (item.type === 'tutoriel') return `/veille/video-tutorial/${item.id}`; // → VideoTutorial
    if (item.type === 'dossier')  return `/veille/dossier/${item.id}`;        // → Dossier
    if (item.type === 'magazine') return `/veille/magazine-article/${item.id}`; // → MagazineArticle
    return '/veille';
  };

  const FORMAT_LINKS = [
    {
      icon: '📬',
      label: 'Actus de la semaine',
      sub: 'Sélection hebdo éditoriale',
      path: '/veille/weekly-newsletter',
      color: 'var(--tls-primary-500)',
      bg: 'var(--tls-primary-50)',
      border: 'var(--tls-primary-300)',
    },
    {
      icon: '📂',
      label: 'Étude de Marché',
      sub: 'Dossier & analyse approfondie',
      path: '/veille/content',
      color: 'var(--tls-orange-600)',
      bg: 'var(--tls-orange-50)',
      border: 'var(--tls-orange-200)',
    },
    {
      icon: '🎬',
      label: 'Tutoriel Vidéo',
      sub: 'Séquence pratique guidée',
      path: '/veille/video-tutorial/1',
      color: 'var(--tls-primary-600)',
      bg: 'var(--tls-primary-50)',
      border: 'var(--tls-primary-200)',
    },
    {
      icon: '📚',
      label: 'Magazine TLS',
      sub: 'Édition complète · 56 pages',
      path: '/veille/magazine',
      color: 'var(--tls-orange-500)',
      bg: 'var(--tls-orange-50)',
      border: 'var(--tls-orange-200)',
    },
  ];

  return (
    <div className="veille-page">
      <header className="veille-page__header">
        <div className="veille-page__header-inner">
          <div className="veille-page__title-row">
            <div className="veille-page__brand-icon" aria-hidden="true">
              <Sparkles size={22} />
            </div>
            <div className="veille-page__title-block">
              <h1>Veille &amp; Apprentissage</h1>
              <p>
                {filteredItems.length} ressource{filteredItems.length > 1 ? 's' : ''} disponible{filteredItems.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <label className="veille-page__search" data-active={query.length > 0 ? 'true' : 'false'}>
            <Search size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher par titre, catégorie, thématique…"
              aria-label="Rechercher dans la veille"
            />
            {query && (
              <button
                type="button"
                className="veille-page__search-clear"
                onClick={() => setQuery('')}
                aria-label="Effacer la recherche"
              >
                <X size={14} />
              </button>
            )}
          </label>

          <div className="veille-page__filters" role="tablist" aria-label="Filtres de contenus">
            {FILTERS.map(({ id, label, Icon }) => {
              const active = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className="veille-pill"
                  data-active={active ? 'true' : 'false'}
                  onClick={() => setSelected(id)}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                  <span className="veille-pill__count">{counts[id]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ─ Format quick-access strip ─────────────────────────── */}
      <div className="veille-format-strip">
        {FORMAT_LINKS.map((f) => (
          <button
            key={f.path}
            type="button"
            onClick={() => navigate(f.path)}
            className="veille-format-card"
            style={{ '--fmt-bg': f.bg, '--fmt-border': f.border, '--fmt-color': f.color } as React.CSSProperties}
          >
            <span className="veille-format-card__emoji">{f.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div className="veille-format-card__label">{f.label}</div>
              <div className="veille-format-card__sub">{f.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <section className="veille-page__feed" aria-live="polite">
        {filteredItems.length === 0 ? (
          <div className="veille-page__empty">
            <div className="veille-page__empty-icon" aria-hidden="true">
              <Search size={28} />
            </div>
            <h3>Aucun résultat trouvé</h3>
            <p>Essayez d'élargir vos filtres ou de modifier votre recherche.</p>
          </div>
        ) : (
          <ul className="veille-page__feed-list">
            {filteredItems.map((item) => {
              const meta = TYPE_META[item.type];
              const isSaved = savedIds.has(item.id);
              const route = resolveItemRoute(item);
              return (
                <li key={item.id}>
                  <article
                    className="veille-card"
                    data-tone={meta.tone}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (item.type === 'tutoriel') {
                        setVideoModal({ open: true, item });
                      } else {
                        navigate(route);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (item.type === 'tutoriel') setVideoModal({ open: true, item });
                        else navigate(route);
                      }
                    }}
                    aria-label={`${item.type === 'tutoriel' ? 'Visionner' : 'Lire'} : ${item.title}`}
                  >
                    <header className="veille-card__head">
                      <div className="veille-card__type">
                        <span className="veille-card__type-icon" aria-hidden="true">
                          <meta.Icon size={16} />
                        </span>
                        <div className="veille-card__type-text">
                          <span className="veille-card__type-label">{meta.label}</span>
                          <span className="veille-card__type-date">
                            <Calendar size={12} />
                            {item.publishedAt}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="veille-card__save"
                        data-active={isSaved ? 'true' : 'false'}
                        onClick={(e) => { e.stopPropagation(); toggleSave(item.id); }}
                        title={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
                        aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
                      >
                        {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                      </button>
                    </header>

                    <div className="veille-card__body">
                      <span className="veille-card__category">{item.category}</span>
                      <h3 className="veille-card__title">{item.title}</h3>
                      <p className="veille-card__summary">{item.summary}</p>
                    </div>

                    <footer className="veille-card__footer">
                      <div className="veille-card__meta">
                        <span>
                          <User size={12} />
                          {item.author}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>
                          <Clock size={12} />
                          {item.readTime}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="veille-card__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.type === 'tutoriel') setVideoModal({ open: true, item });
                          else navigate(route);
                        }}
                      >
                        <span>{item.type === 'tutoriel' ? 'Visionner' : 'Lire'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </footer>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <aside className="veille-page__newsletter" aria-label="Newsletter">
        <div className="veille-page__newsletter-info">
          <span className="veille-page__newsletter-eyebrow">
            <Newspaper size={14} /> Newsletter hebdomadaire
          </span>
          <h2>La sélection éditoriale TLS chaque vendredi</h2>
          <p>Recevez les meilleurs contenus de la semaine, classés par sujet et durée de lecture.</p>
        </div>
        <button
          type="button"
          className="veille-page__newsletter-cta"
          onClick={() => navigate('/veille/weekly-newsletter')}
        >
          <TrendingUp size={16} />
          Voir la dernière édition
        </button>
      </aside>

      {/* ─ Video Player Modal (tutoriels) ──────────────────────────── */}
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
