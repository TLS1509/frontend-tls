import React, { useState } from 'react';
import { Award, Lock, Star, Flame, BookOpen, Users, Zap, Heart } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import AchievementBadge from '../components/ui/AchievementBadge';
import FilterChip from '../components/ui/FilterChip';

type FilterKey = 'all' | 'dreyfus' | 'engagement' | 'special';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'dreyfus', label: 'Dreyfus' },
  { key: 'engagement', label: 'Engagement' },
  { key: 'special', label: 'Spéciaux' },
];

const BADGES = [
  {
    id: '1',
    title: 'Novice Confirmé',
    description: 'Premier parcours terminé avec succès',
    icon: <Star size={28} strokeWidth={1.75} />,
    unlockedDate: '5 mai 2026',
    color: 'primary' as const,
    category: 'dreyfus' as FilterKey,
  },
  {
    id: '2',
    title: 'Apprenti Assidu',
    description: '7 jours de connexion consécutifs',
    icon: <Flame size={28} strokeWidth={1.75} />,
    unlockedDate: '8 mai 2026',
    color: 'warm' as const,
    category: 'engagement' as FilterKey,
  },
  {
    id: '3',
    title: 'Explorateur',
    description: 'Accès à 3 domaines de compétences différents',
    icon: <BookOpen size={28} strokeWidth={1.75} />,
    unlockedDate: '10 mai 2026',
    color: 'sun' as const,
    category: 'dreyfus' as FilterKey,
  },
  {
    id: '4',
    title: 'Esprit Communauté',
    description: '10 interactions avec des pairs validées',
    icon: <Users size={28} strokeWidth={1.75} />,
    unlockedDate: '11 mai 2026',
    color: 'success' as const,
    category: 'engagement' as FilterKey,
  },
  {
    id: '5',
    title: 'Super Star XP',
    description: 'Dépasse 3 000 XP accumulés',
    icon: <Zap size={28} strokeWidth={1.75} />,
    unlockedDate: '13 mai 2026',
    color: 'sun' as const,
    category: 'special' as FilterKey,
  },
  {
    id: '6',
    title: 'Compétent',
    description: 'Atteint le niveau Dreyfus 3 dans une compétence',
    icon: <Award size={28} strokeWidth={1.75} />,
    unlockedDate: '12 mai 2026',
    color: 'primary' as const,
    category: 'dreyfus' as FilterKey,
  },
  {
    id: '7',
    title: 'Cœur du Projet',
    description: 'Participe à 5 collaborations de groupe',
    icon: <Heart size={28} strokeWidth={1.75} />,
    unlockedDate: '9 mai 2026',
    color: 'warm' as const,
    category: 'special' as FilterKey,
  },
  {
    id: '8',
    title: 'Premier Pas',
    description: 'Complète ton profil à 100 %',
    icon: <Star size={28} strokeWidth={1.75} />,
    unlockedDate: '1 mai 2026',
    color: 'success' as const,
    category: 'engagement' as FilterKey,
  },
];

const LOCKED_BADGES = [
  {
    id: 'l1',
    title: 'Expert Reconnu',
    description: 'Atteindre le niveau Dreyfus 4 dans une compétence',
    condition: 'Niveau Dreyfus 4 requis',
    icon: <Award size={28} strokeWidth={1.75} />,
    color: 'primary' as const,
  },
  {
    id: 'l2',
    title: 'Maître du Streak',
    description: '30 jours de connexion consécutifs',
    condition: '30 jours consécutifs requis',
    icon: <Flame size={28} strokeWidth={1.75} />,
    color: 'warm' as const,
  },
  {
    id: 'l3',
    title: 'Légende XP',
    description: 'Dépasse 10 000 XP accumulés',
    condition: '10 000 XP requis (tu en as 3 240)',
    icon: <Zap size={28} strokeWidth={1.75} />,
    color: 'sun' as const,
  },
];

export default function BadgeGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const visibleBadges =
    activeFilter === 'all' ? BADGES : BADGES.filter((b) => b.category === activeFilter);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Badges"
        title="Mes Badges"
        summary="Tes récompenses, trophées et distinctions obtenus au fil de ton parcours d'apprentissage."
        tone="sun"
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section">
        {/* Filters */}
        <div className="flex flex-wrap gap-stack-xs">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              active={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
              count={
                f.key === 'all'
                  ? BADGES.length
                  : BADGES.filter((b) => b.category === f.key).length
              }
            />
          ))}
        </div>

        {/* Badge grid */}
        <SectionCard
          title={`Badges obtenus (${visibleBadges.length})`}
          titleIcon={<Award size={18} />}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-stack">
            {visibleBadges.map((badge) => (
              <AchievementBadge
                key={badge.id}
                title={badge.title}
                description={badge.description}
                icon={badge.icon}
                unlockedDate={badge.unlockedDate}
                color={badge.color}
                size="sm"
              />
            ))}
          </div>
        </SectionCard>

        {/* Locked badges */}
        <SectionCard
          title="Badges à débloquer"
          titleIcon={<Lock size={18} />}
          description="Continue à progresser pour obtenir ces récompenses"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
            {LOCKED_BADGES.map((badge) => (
              <div key={badge.id} className="flex flex-col gap-stack-xs">
                <AchievementBadge
                  title={badge.title}
                  description={badge.description}
                  icon={badge.icon}
                  isLocked
                  color={badge.color}
                  size="sm"
                />
                <p className="text-caption text-ink-400 text-center">{badge.condition}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
