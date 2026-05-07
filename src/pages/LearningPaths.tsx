/**
 * LearningPaths Page — Mes Parcours
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

const TONES: ParcoursTone[] = ['primary', 'warm', 'sun'];

const STATUS_FILTERS: { id: ParcoursStatus; label: string }[] = [
  { id: 'en cours', label: 'En cours' },
  { id: 'complété', label: 'Terminés' },
  { id: 'non commencé', label: 'Pas commencés' },
];

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: React.ReactNode;
  label: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, iconBg, iconColor, value, label }) => (
  <div
    role="listitem"
    className="flex items-center gap-3 p-4 rounded-xl bg-white/85 border border-black/5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm"
  >
    <span
      className={`w-10 h-10 rounded-lg inline-flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}
    >
      {icon}
    </span>
    <div>
      <span className="block font-display text-h3 font-bold text-ink-900 leading-tight">
        {value}
      </span>
      <span className="block font-body text-caption text-ink-500 mt-0.5">{label}</span>
    </div>
  </div>
);

export const LearningPaths: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<Set<ParcoursStatus>>(new Set());
  const [query, setQuery] = useState('');

  const total = MOCK_PARCOURS.length;
  const inProgressCount = MOCK_PARCOURS.filter((p) => p.status === 'en cours').length;
  const completedCount = MOCK_PARCOURS.filter((p) => p.status === 'complété').length;
  const totalLessons = MOCK_PARCOURS.reduce((s, p) => s + p.lessons, 0);
  const completedLessons = MOCK_PARCOURS.reduce(
    (s, p) => s + Math.round((p.lessons * p.progress) / 100),
    0,
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
    <div className="flex flex-col gap-8 max-w-[1180px] mx-auto px-6 pt-8 pb-12">
      <header className="relative overflow-hidden flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border border-white/40 shadow-xs">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_0%_0%,rgba(85,161,180,0.15)_0%,transparent_60%),radial-gradient(circle_at_100%_100%,rgba(237,132,58,0.15)_0%,transparent_60%)]"
        />

        <div className="relative flex flex-col gap-2 max-w-[720px]">
          <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-primary-100 text-primary-700 font-body text-micro font-bold uppercase tracking-wider">
            <GraduationCap size={14} /> Mon apprentissage
          </span>
          <h1 className="font-display text-h1 font-bold leading-tight m-0 text-ink-900">
            Mes Parcours
          </h1>
          <p className="font-body text-body-lg text-ink-500 m-0">
            Explorez vos parcours de formation et suivez votre progression au fil des leçons.
          </p>
        </div>

        <div
          role="list"
          className="relative grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
        >
          <KpiCard
            icon={<Sparkles size={18} />}
            iconBg="bg-primary-100"
            iconColor="text-primary-700"
            value={total}
            label="Parcours"
          />
          <KpiCard
            icon={<Flame size={18} />}
            iconBg="bg-secondary-50"
            iconColor="text-secondary-600"
            value={inProgressCount}
            label="En cours"
          />
          <KpiCard
            icon={<CheckCircle2 size={18} />}
            iconBg="bg-accent-100"
            iconColor="text-accent-700"
            value={completedCount}
            label="Terminés"
          />
          <KpiCard
            icon={<BookOpen size={18} />}
            iconBg="bg-primary-100"
            iconColor="text-primary-700"
            value={
              <>
                {completedLessons}
                <span className="text-body text-ink-500 font-medium">/{totalLessons}</span>
              </>
            }
            label="Leçons complétées"
          />
        </div>

        {overallProgress > 0 && (
          <div
            role="progressbar"
            aria-valuenow={overallProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression globale"
            className="relative flex flex-col gap-2 px-5 py-4 rounded-xl text-white bg-gradient-to-br from-primary-500 to-primary-700 shadow-[0_8px_24px_rgba(85,161,180,0.25)]"
          >
            <div className="flex items-baseline justify-between font-body font-semibold">
              <span>Progression globale</span>
              <strong className="font-display text-h3">{overallProgress}%</strong>
            </div>
            <div className="h-2 rounded-pill bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-pill transition-[width] duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <section aria-label="Filtres" className="flex flex-col gap-3">
        <Search
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Rechercher un parcours…"
          aria-label="Rechercher un parcours"
        />

        <div role="group" aria-label="Filtrer par statut" className="flex flex-wrap items-center gap-2">
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
          <span className="font-body text-caption text-ink-500">
            {filteredParcours.length} sur {total}
          </span>
        </div>
      </section>

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
            duration={parcours.duration}
            lessons={parcours.lessons}
            level={parcours.level}
          />
        ))}
      </CardGrid>

      {filteredParcours.length === 0 && (
        <div className="flex flex-col items-center gap-3 text-center p-12 rounded-2xl bg-white/70 border border-dashed border-ink-300">
          <p className="m-0 font-body text-ink-500">
            Aucun parcours ne correspond à vos filtres.
          </p>
          <Button variant="secondary" size="sm" onClick={resetFilters}>
            <RotateCcw size={12} />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
};
