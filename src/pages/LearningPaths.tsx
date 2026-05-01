/**
 * LearningPaths Page — Mes Parcours
 *
 * Layout adapté du WIP ParcoursPageUpgraded :
 * - Titre + sous-titre
 * - KPI row (4 indicateurs)
 * - Filtres statut + recherche
 * - Grille 3 colonnes de ParcoursCard (design system pattern)
 */

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Flame,
  CheckCircle2,
  BookOpen,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { Search } from '../components/ui/Search';
import { FilterChip } from '../components/ui/FilterChip';
import { ParcoursCard } from '../components/patterns/ParcoursCard';
import type { ParcoursTone, ParcoursStatus } from '../components/patterns/ParcoursCard';
import { CardGrid } from '../components/patterns/CardGrid';
import { Button } from '../components/core/Button';

/* ── Types ─────────────────────────────────────────────────── */
interface Parcours {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string;
  lessons: number;
  progress: number;
  status: ParcoursStatus;
  category: string;
}

/* ── Mock data ─────────────────────────────────────────────── */
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

/* ── Tone rotation (primary / warm / sun) ──────────────────── */
const TONES: ParcoursTone[] = ['primary', 'warm', 'sun'];

/* ── Status filter config ──────────────────────────────────── */
const STATUS_FILTERS: { id: ParcoursStatus; label: string }[] = [
  { id: 'en cours', label: 'En cours' },
  { id: 'complété', label: 'Terminés' },
  { id: 'non commencé', label: 'Pas commencés' },
];

/* ── Component ─────────────────────────────────────────────── */
export const LearningPaths: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<Set<ParcoursStatus>>(new Set());
  const [query, setQuery] = useState('');

  /* KPI calculations */
  const total = MOCK_PARCOURS.length;
  const inProgressCount = MOCK_PARCOURS.filter((p) => p.status === 'en cours').length;
  const completedCount = MOCK_PARCOURS.filter((p) => p.status === 'complété').length;
  const totalLessons = MOCK_PARCOURS.reduce((s, p) => s + p.lessons, 0);
  const completedLessons = MOCK_PARCOURS.reduce(
    (s, p) => s + Math.round((p.lessons * p.progress) / 100),
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  /* Filtering */
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

  const toggleStatus = (status: ParcoursStatus) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      next.has(status) ? next.delete(status) : next.add(status);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedStatuses(new Set());
    setQuery('');
  };

  const handleCardClick = (id: string) => navigate(`/learning-paths/${id}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)', maxWidth: 1180, margin: '0 auto', padding: 'var(--s-8) var(--s-6) var(--s-12)' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)', padding: 'var(--s-8)', borderRadius: 'var(--r-2xl)', background: 'linear-gradient(135deg, var(--overlay-white-xl) 0%, rgba(255, 255, 255, 0.6) 100%)', backdropFilter: 'var(--glass-blur-heavy)', WebkitBackdropFilter: 'var(--glass-blur-heavy)', border: '1px solid rgba(255, 255, 255, 0.6)', boxShadow: 'var(--shadow-xs)', position: 'relative', overflow: 'hidden' }}>

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 0%, var(--overlay-brand-lg) 0%, transparent 60%), radial-gradient(circle at 100% 100%, var(--overlay-warm-lg) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', maxWidth: 720 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1-5)', padding: 'var(--s-1) var(--s-2-5)', borderRadius: 'var(--r-pill)', background: 'var(--overlay-brand-md)', color: 'var(--tls-primary-700)', fontFamily: 'var(--font-body)', fontSize: 'var(--t-micro)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', alignSelf: 'flex-start' }}>
            <GraduationCap size={14} /> Mon apprentissage
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h1)', fontWeight: 700, lineHeight: 1.1, margin: 0, color: 'var(--text)' }}>
            Mes Parcours
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--t-body-lg)', color: 'var(--text-soft)', margin: 0 }}>
            Explorez vos parcours de formation et suivez votre progression au fil des leçons.
          </p>
        </div>

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--s-4)' }} role="list">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', background: 'var(--overlay-white-xl)', border: '1px solid var(--overlay-dark-sm)', boxShadow: 'var(--shadow-xs)', transition: `transform var(--dur-2) var(--ease-standard), box-shadow var(--dur-2) var(--ease-standard)` }} role="listitem" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}>
            <span style={{ width: '40px', height: '40px', borderRadius: 'var(--r-lg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--overlay-brand-md)', color: 'var(--tls-primary-700)' }}>
              <Sparkles size={18} />
            </span>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>{total}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)', marginTop: '2px' }}>Parcours</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', background: 'var(--overlay-white-xl)', border: '1px solid var(--overlay-dark-sm)', boxShadow: 'var(--shadow-xs)', transition: `transform var(--dur-2) var(--ease-standard), box-shadow var(--dur-2) var(--ease-standard)` }} role="listitem" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}>
            <span style={{ width: '40px', height: '40px', borderRadius: 'var(--r-lg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--overlay-warm-sm)', color: 'var(--tls-orange-600)' }}>
              <Flame size={18} />
            </span>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>{inProgressCount}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)', marginTop: '2px' }}>En cours</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', background: 'var(--overlay-white-xl)', border: '1px solid var(--overlay-dark-sm)', boxShadow: 'var(--shadow-xs)', transition: `transform var(--dur-2) var(--ease-standard), box-shadow var(--dur-2) var(--ease-standard)` }} role="listitem" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}>
            <span style={{ width: '40px', height: '40px', borderRadius: 'var(--r-lg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--overlay-warm-md)', color: 'var(--tls-yellow-600)' }}>
              <CheckCircle2 size={18} />
            </span>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>{completedCount}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)', marginTop: '2px' }}>Terminés</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', background: 'var(--overlay-white-xl)', border: '1px solid var(--overlay-dark-sm)', boxShadow: 'var(--shadow-xs)', transition: `transform var(--dur-2) var(--ease-standard), box-shadow var(--dur-2) var(--ease-standard)` }} role="listitem" onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}>
            <span style={{ width: '40px', height: '40px', borderRadius: 'var(--r-lg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'var(--overlay-brand-md)', color: 'var(--tls-primary-700)' }}>
              <BookOpen size={18} />
            </span>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
                {completedLessons}
                <span style={{ fontSize: 'var(--t-body)', color: 'var(--text-soft)', fontWeight: 500 }}>/{totalLessons}</span>
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)', marginTop: '2px' }}>Leçons complétées</span>
            </div>
          </div>
        </div>

        {overallProgress > 0 && (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', padding: 'var(--s-4) var(--s-5)', borderRadius: 'var(--r-xl)', background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-primary-700))', color: 'var(--text-inverse)', boxShadow: '0 8px 24px var(--overlay-brand-xl)' }} role="progressbar" aria-valuenow={overallProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Progression globale">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              <span>Progression globale</span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)' }}>{overallProgress}%</strong>
            </div>
            <div style={{ height: '8px', borderRadius: 'var(--r-pill)', background: 'var(--overlay-white-sm)', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--text-inverse)', borderRadius: 'var(--r-pill)', transition: `width var(--dur-3) var(--ease-standard)`, width: `${overallProgress}%` }} />
            </div>
          </div>
        )}
      </header>

      {/* ── Filters ─────────────────────────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }} aria-label="Filtres">

        {/* Search — premier élément, ancré à gauche */}
        <Search
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Rechercher un parcours…"
          wrapperClassName="parcours-page__search"
          aria-label="Rechercher un parcours"
        />

        {/* Status chips + count */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2)' }} role="group" aria-label="Filtrer par statut">
          {STATUS_FILTERS.map((f) => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={selectedStatuses.has(f.id)}
              onClick={() => toggleStatus(f.id)}
            />
          ))}
          {(selectedStatuses.size > 0 || query) && (
            <FilterChip
              variant="reset"
              label="Réinitialiser"
              icon={<RotateCcw size={12} />}
              onClick={resetFilters}
              aria-label="Réinitialiser les filtres"
            />
          )}
          <span style={{ marginLeft: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--t-caption)', color: 'var(--text-soft)' }}>
            {filteredParcours.length} sur {total}
          </span>
        </div>
      </section>

      {/* ── Card grid — using CardGrid DS component ────────────────────────────────────────── */}
      <CardGrid layout="default" gapSize="md" aria-label="Liste des parcours">
        {filteredParcours.map((parcours, index) => (
          <ParcoursCard
            key={parcours.id}
            id={parcours.id}
            title={parcours.title}
            description={parcours.description}
            progress={parcours.progress}
            status={parcours.status}
            tone={TONES[index % TONES.length]}
            onClick={handleCardClick}
            instructor={parcours.instructor}
            duration={parcours.duration}
            lessons={parcours.lessons}
            level={parcours.level}
          />
        ))}
      </CardGrid>

      {/* Empty state */}
      {filteredParcours.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--s-12)', borderRadius: 'var(--r-2xl)', background: 'rgba(255, 255, 255, 0.7)', border: '1px dashed var(--overlay-dark-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'center' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', color: 'var(--text-soft)' }}>Aucun parcours ne correspond à vos filtres.</p>
          <Button variant="secondary" size="sm" onClick={resetFilters}>
            <RotateCcw size={12} />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
};
