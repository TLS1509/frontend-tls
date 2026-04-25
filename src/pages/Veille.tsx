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
import '../styles/veille.css';

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
    id: 'item-1',
    type: 'actu',
    title: 'IA générative en formation : où en sommes-nous en 2026 ?',
    summary: 'Tour d\'horizon des nouveaux usages de l\'IA dans les parcours de formation, des cas concrets et des limites.',
    category: 'IA & Pédagogie',
    author: 'The Learning Society',
    publishedAt: 'Aujourd\'hui',
    readTime: '6 min',
  },
  {
    id: 'item-2',
    type: 'tutoriel',
    title: 'Construire un prompt structuré en 5 étapes',
    summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.',
    category: 'Prompt Engineering',
    author: 'Marie Dubois',
    publishedAt: 'Hier',
    readTime: '12 min',
  },
  {
    id: 'item-3',
    type: 'dossier',
    title: 'Le futur du travail hybride',
    summary: 'Synthèse approfondie sur les impacts du travail hybride sur la culture d\'apprentissage en entreprise.',
    category: 'Management',
    author: 'McKinsey',
    publishedAt: 'Il y a 3 jours',
    readTime: '22 min',
  },
  {
    id: 'item-4',
    type: 'magazine',
    title: 'Tendances EdTech 2026',
    summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs et opportunités stratégiques.',
    category: 'EdTech',
    author: 'TLS Mag',
    publishedAt: 'Il y a 1 semaine',
    readTime: '18 min',
  },
  {
    id: 'item-5',
    type: 'actu',
    title: 'React 19 : les nouveautés UI à connaître',
    summary: 'Décryptage des nouveautés React 19 utiles pour les plateformes d\'apprentissage modernes.',
    category: 'Tech',
    author: 'TLS Tech',
    publishedAt: 'Il y a 2 semaines',
    readTime: '8 min',
  },
  {
    id: 'item-6',
    type: 'tutoriel',
    title: 'Animer un atelier collaboratif à distance',
    summary: 'Méthode et outils pour faciliter un atelier d\'intelligence collective en visio.',
    category: 'Facilitation',
    author: 'Pierre Leclerc',
    publishedAt: 'Il y a 3 semaines',
    readTime: '15 min',
  },
];

export const Veille: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'all' | VeilleType>('all');
  const [query, setQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

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
    if (item.type === 'actu') return '/veille/article/1';
    if (item.type === 'tutoriel') return '/veille/video-tutorial/1';
    if (item.type === 'dossier') return '/veille/dossier/1';
    return '/veille/magazine-article/1';
  };

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
              return (
                <li key={item.id}>
                  <article className="veille-card" data-tone={meta.tone}>
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
                        onClick={() => toggleSave(item.id)}
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
                        onClick={() => navigate(resolveItemRoute(item))}
                      >
                        <span>Lire</span>
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
    </div>
  );
};
