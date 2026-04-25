/**
 * LearningPaths Page (List View)
 *
 * Liste des parcours d'apprentissage avec hero, KPIs, filtres et grille de cartes
 * "glass" en rotation de couleurs (primary / warm / sun) inspirée du Figma
 * `ParcoursPageUpgraded`.
 *
 * Statique : les données sont locales pour la phase design.
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  PlayCircle,
  Clock3,
  Layers,
  BookOpen,
  UserRound,
  Flame,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Search,
} from 'lucide-react';
import '../styles/learning-paths.css';

type Tone = 'primary' | 'warm' | 'sun';
type Status = 'en cours' | 'complété' | 'non commencé';

interface Parcours {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  lessons: number;
  progress: number;
  status: Status;
  category: string;
}

const MOCK_PARCOURS: Parcours[] = [
  {
    id: '1',
    title: 'Fondamentaux du Leadership',
    description:
      'Apprenez les principes essentiels du leadership moderne et développez vos compétences de management.',
    instructor: 'Marie Dubois',
    level: 'débutant',
    duration: '6 semaines',
    lessons: 12,
    progress: 65,
    status: 'en cours',
    category: 'Leadership',
  },
  {
    id: '2',
    title: 'Communication Efficace',
    description:
      'Maîtrisez les techniques de communication interpersonnelle pour améliorer vos relations professionnelles.',
    instructor: 'Jean Martin',
    level: 'intermédiaire',
    duration: '4 semaines',
    lessons: 8,
    progress: 100,
    status: 'complété',
    category: 'Soft Skills',
  },
  {
    id: '3',
    title: 'Gestion de Projet Agile',
    description:
      'Découvrez les méthodologies agiles et apprenez à piloter vos projets de manière flexible et efficace.',
    instructor: 'Pierre Leclerc',
    level: 'intermédiaire',
    duration: '8 semaines',
    lessons: 16,
    progress: 35,
    status: 'en cours',
    category: 'Project Management',
  },
  {
    id: '4',
    title: 'Intelligence Émotionnelle en Entreprise',
    description:
      'Développez votre intelligence émotionnelle pour mieux gérer le stress et les relations interpersonnelles.',
    instructor: 'Sophie Bernard',
    level: 'avancé',
    duration: '6 semaines',
    lessons: 14,
    progress: 0,
    status: 'non commencé',
    category: 'Soft Skills',
  },
  {
    id: '5',
    title: 'Prise de Décision Stratégique',
    description:
      'Apprenez un cadre structuré pour prendre des décisions stratégiques complexes et assurer leur mise en œuvre.',
    instructor: 'Marc Rousseau',
    level: 'avancé',
    duration: '8 semaines',
    lessons: 18,
    progress: 0,
    status: 'non commencé',
    category: 'Strategic Thinking',
  },
  {
    id: '6',
    title: 'Transformation Digitale et Innovation',
    description:
      'Explorez comment piloter la transformation digitale et créer une culture d\'innovation durable.',
    instructor: 'Isabelle Fontaine',
    level: 'avancé',
    duration: '10 semaines',
    lessons: 20,
    progress: 20,
    status: 'en cours',
    category: 'Digital',
  },
];

const TONES: Tone[] = ['primary', 'warm', 'sun'];

const STATUS_FILTERS: { id: Status; label: string }[] = [
  { id: 'en cours', label: 'En cours' },
  { id: 'complété', label: 'Complétés' },
  { id: 'non commencé', label: 'Pas commencés' },
];

const STATUS_BADGE_LABEL: Record<Status, string> = {
  'en cours': 'EN COURS',
  complété: 'TERMINÉ',
  'non commencé': 'PAS COMMENCÉ',
};

export const LearningPaths: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<Set<Status>>(new Set());
  const [query, setQuery] = useState('');

  const total = MOCK_PARCOURS.length;
  const inProgressCount = MOCK_PARCOURS.filter((p) => p.status === 'en cours').length;
  const completedCount = MOCK_PARCOURS.filter((p) => p.status === 'complété').length;
  const totalLessons = MOCK_PARCOURS.reduce((sum, p) => sum + p.lessons, 0);
  const completedLessons = MOCK_PARCOURS.reduce(
    (sum, p) => sum + Math.round((p.lessons * p.progress) / 100),
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const filteredParcours = useMemo(() => {
    return MOCK_PARCOURS.filter((p) => {
      const matchStatus = selectedStatuses.size === 0 || selectedStatuses.has(p.status);
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.instructor.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [selectedStatuses, query]);

  const toggleStatus = (status: Status) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const resetFilters = () => setSelectedStatuses(new Set());

  const handleOpen = (parcoursId: string) => {
    navigate(`/learning-paths/${parcoursId}`);
  };

  return (
    <div className="parcours-page">
      <header className="parcours-page__hero">
        <div className="parcours-page__hero-text">
          <span className="parcours-page__eyebrow">
            <GraduationCap size={14} /> Mon apprentissage
          </span>
          <h1>Mes Parcours</h1>
          <p>Explorez vos parcours de formation et suivez votre progression au fil des leçons.</p>
        </div>

        <div className="parcours-kpis" role="list">
          <div className="parcours-kpi" role="listitem">
            <span className="parcours-kpi__icon parcours-kpi__icon--primary">
              <Sparkles size={18} />
            </span>
            <div>
              <span className="parcours-kpi__value">{total}</span>
              <span className="parcours-kpi__label">Parcours</span>
            </div>
          </div>
          <div className="parcours-kpi" role="listitem">
            <span className="parcours-kpi__icon parcours-kpi__icon--warm">
              <Flame size={18} />
            </span>
            <div>
              <span className="parcours-kpi__value">{inProgressCount}</span>
              <span className="parcours-kpi__label">En cours</span>
            </div>
          </div>
          <div className="parcours-kpi" role="listitem">
            <span className="parcours-kpi__icon parcours-kpi__icon--sun">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <span className="parcours-kpi__value">{completedCount}</span>
              <span className="parcours-kpi__label">Terminés</span>
            </div>
          </div>
          <div className="parcours-kpi" role="listitem">
            <span className="parcours-kpi__icon parcours-kpi__icon--primary">
              <BookOpen size={18} />
            </span>
            <div>
              <span className="parcours-kpi__value">
                {completedLessons}
                <span className="parcours-kpi__value-suffix">/{totalLessons}</span>
              </span>
              <span className="parcours-kpi__label">Leçons complétées</span>
            </div>
          </div>
        </div>

        {overallProgress > 0 && (
          <div
            className="parcours-overall"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={overallProgress}
            aria-label="Progression globale"
          >
            <div className="parcours-overall__head">
              <span>Progression globale</span>
              <strong>{overallProgress}%</strong>
            </div>
            <div className="parcours-overall__track">
              <div
                className="parcours-overall__fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <div className="parcours-page__divider" aria-hidden="true" />

      <section className="parcours-page__filters" aria-label="Filtrer les parcours par statut">
        <span className="parcours-page__filters-label">Filtrer par statut</span>
        <label className="parcours-page__search">
          <Search size={14} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un parcours..."
            aria-label="Rechercher un parcours"
          />
        </label>
        <div className="parcours-page__filters-row">
          {STATUS_FILTERS.map((filter) => {
            const active = selectedStatuses.has(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                className="parcours-filter-pill"
                data-active={active ? 'true' : 'false'}
                onClick={() => toggleStatus(filter.id)}
                aria-pressed={active}
              >
                {filter.label}
              </button>
            );
          })}
          {selectedStatuses.size > 0 && (
            <button
              type="button"
              className="parcours-filter-pill parcours-filter-pill--reset"
              onClick={resetFilters}
            >
              <RotateCcw size={12} />
              Réinitialiser
            </button>
          )}
        </div>
        <span className="parcours-page__filters-count">
          {filteredParcours.length} sur {total}
        </span>
      </section>

      <section className="parcours-grid" aria-label="Liste des parcours">
        {filteredParcours.map((parcours, index) => {
          const tone: Tone = TONES[index % TONES.length];
          const isLocked = parcours.status === 'non commencé';
          const isDone = parcours.status === 'complété';

          return (
            <article
              key={parcours.id}
              className="parcours-tile"
              data-tone={tone}
              data-status={parcours.status}
            >
              <div className="parcours-tile__glow" aria-hidden="true" />

              <header className="parcours-tile__head">
                <span
                  className="parcours-tile__badge"
                  data-state={isDone ? 'done' : isLocked ? 'idle' : 'progress'}
                >
                  {STATUS_BADGE_LABEL[parcours.status]}
                </span>
                <span className="parcours-tile__category">{parcours.category}</span>
              </header>

              <h2 className="parcours-tile__title">{parcours.title}</h2>
              <p className="parcours-tile__description">{parcours.description}</p>

              <div className="parcours-tile__chips">
                <span className="parcours-tile__chip">
                  <UserRound size={14} />
                  {parcours.instructor}
                </span>
                <span className="parcours-tile__chip">
                  <Clock3 size={14} />
                  {parcours.duration}
                </span>
                <span className="parcours-tile__chip">
                  <Layers size={14} />
                  Niveau {parcours.level}
                </span>
                <span className="parcours-tile__chip">
                  <BookOpen size={14} />
                  {parcours.lessons} leçons
                </span>
              </div>

              <div className="parcours-tile__spacer" />

              <div className="parcours-tile__progress">
                <div
                  className="parcours-tile__progress-track"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={parcours.progress}
                  aria-label={`Progression du parcours ${parcours.title}`}
                >
                  <div
                    className="parcours-tile__progress-fill"
                    style={{ width: `${parcours.progress}%` }}
                  />
                </div>
                <span className="parcours-tile__progress-value">{parcours.progress}%</span>
              </div>

              <button
                type="button"
                className="parcours-tile__cta"
                onClick={() => handleOpen(parcours.id)}
              >
                <span>
                  {isDone
                    ? 'Revoir le parcours'
                    : parcours.progress > 0
                    ? 'Continuer le parcours'
                    : 'Commencer le parcours'}
                </span>
                {parcours.progress > 0 ? <ArrowRight size={16} /> : <PlayCircle size={16} />}
              </button>
            </article>
          );
        })}
      </section>

      {filteredParcours.length === 0 && (
        <div className="parcours-empty">
          <p>Aucun parcours ne correspond à vos filtres.</p>
          <button type="button" className="parcours-filter-pill" onClick={resetFilters}>
            <RotateCcw size={12} />
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
