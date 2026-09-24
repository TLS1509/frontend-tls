import React, { useState } from 'react';
import { Award, Star, Flame, BookOpen, Users, Zap, Heart, Medal } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import AchievementBadge from '../components/ui/AchievementBadge';
import FilterChip from '../components/ui/FilterChip';
import { useGamificationStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import type { BadgeType } from '../types/learning';
import { PageShell } from '../components/layout';

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

  /* La date d'obtention arrivait au composant telle que stockée
     (« 2026-05-08T10:00:00Z ») : elle est rendue au format français. */
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    /* Un seul conteneur pour l'en-tête et le corps : le titre collait au haut
       de l'écran et le corps partait 16 px plus à droite. Mots et ordre des
       blocs inchangés (arbitrage n°18 en cours). */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Profil · Badges"
        title="Mes Badges"
        summary="Tes récompenses, trophées et distinctions obtenus au fil de ton parcours d'apprentissage."
        tone="flat"
      />

      {/* Les filtres et la grille qu'ils filtrent forment une section ; son
          titre (h2 28, le compte compris) sort de la carte qui enveloppait des
          cartes. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title={`Badges obtenus (${visibleBadges.length})`} />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-stack">
          {visibleBadges.map((badge) => (
            <AchievementBadge
              key={badge.id}
              title={badge.title}
              description={badge.description}
              icon={badge.icon}
              unlockedDate={formatDate(badge.unlockedDate)}
              color={badge.color}
              size="sm"
            />
          ))}
        </div>
      </section>

      {/* Locked badges — la condition se lit sous chaque badge, en légende
          ink-600 (ink-500 est la couleur des placeholders). */}
      {lockedToShow.length > 0 && (
        <section className="flex flex-col gap-stack">
          <SectionHeader
            title="Badges à débloquer"
            subtitle="Continue à progresser pour obtenir ces récompenses"
          />
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
                <p className="text-caption text-ink-600 text-center">{badge.condition}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
