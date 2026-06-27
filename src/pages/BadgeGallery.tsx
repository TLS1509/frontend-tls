import React, { useState } from 'react';
import { Award, Lock, Star, Flame, BookOpen, Users, Zap, Heart, Medal } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import AchievementBadge from '../components/ui/AchievementBadge';
import FilterChip from '../components/ui/FilterChip';
import { useGamificationStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import type { BadgeType } from '../types/learning';
import { Container } from '../components/layout';

type FilterKey = 'all' | BadgeType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'Tous' },
  { key: 'plateforme', label: 'Plateforme' },
  { key: 'open_badge', label: 'Open Badges' },
  { key: 'competence', label: 'Compétences' },
];

const TYPE_COLOR: Record<BadgeType, 'primary' | 'warm' | 'sun' | 'success'> = {
  plateforme: 'warm',
  open_badge: 'primary',
  competence: 'sun',
};

const TYPE_ICON: Record<BadgeType, React.ReactNode> = {
  plateforme: <Flame size={28} strokeWidth={1.75} />,
  open_badge: <Medal size={28} strokeWidth={1.75} />,
  competence: <Award size={28} strokeWidth={1.75} />,
};

const LOCKED_BADGES = [
  {
    id: 'streak-30',
    title: 'Maître du Streak',
    description: '30 jours de connexion consécutifs',
    condition: '30 jours consécutifs requis',
    icon: <Flame size={28} strokeWidth={1.75} />,
    color: 'warm' as const,
  },
  {
    id: 'comp-communication-d4-locked',
    title: 'Expert Reconnu',
    description: 'Atteindre Dreyfus D4 sur une compétence',
    condition: 'Niveau Dreyfus D4 requis',
    icon: <Award size={28} strokeWidth={1.75} />,
    color: 'primary' as const,
  },
  {
    id: 'xp-legend',
    title: 'Légende XP',
    description: 'Dépasse 10 000 XP accumulés',
    condition: '10 000 XP requis',
    icon: <Zap size={28} strokeWidth={1.75} />,
    color: 'sun' as const,
  },
];

export default function BadgeGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const gamifStore = useGamificationStore();

  const earnedUserBadges = gamifStore.getBadges(MOCK_USER_ID);

  const earnedBadges = earnedUserBadges
    .map((ub) => {
      const def = getBadgeDefById(ub.badgeId);
      if (!def) return null;
      return {
        id: def.id,
        title: def.name,
        description: def.description,
        icon: TYPE_ICON[def.type],
        color: TYPE_COLOR[def.type],
        type: def.type,
        unlockedDate: ub.earnedAt,
      };
    })
    .filter(Boolean) as {
      id: string; title: string; description: string;
      icon: React.ReactNode; color: 'primary' | 'warm' | 'sun' | 'success';
      type: BadgeType; unlockedDate: string;
    }[];

  const visibleBadges =
    activeFilter === 'all'
      ? earnedBadges
      : earnedBadges.filter((b) => b.type === activeFilter);

  const earnedIds = new Set(earnedUserBadges.map((ub) => ub.badgeId));
  const lockedToShow = LOCKED_BADGES.filter((b) => !earnedIds.has(b.id));

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Profil · Badges"
        title="Mes Badges"
        summary="Tes récompenses, trophées et distinctions obtenus au fil de ton parcours d'apprentissage."
        tone="flat"
      />

      <Container width="wide" padding={false} className="px-stack flex flex-col gap-section">
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
                  ? earnedBadges.length
                  : earnedBadges.filter((b) => b.type === f.key).length
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
        {lockedToShow.length > 0 && (
          <SectionCard
            title="Badges à débloquer"
            titleIcon={<Lock size={18} />}
            description="Continue à progresser pour obtenir ces récompenses"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
              {lockedToShow.map((badge) => (
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
        )}
      </Container>
    </div>
  );
}
