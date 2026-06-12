import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Flame, Trophy, Star, Zap, Target } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import AchievementBadge from '../components/ui/AchievementBadge';
import Avatar from '../components/ui/Avatar';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { getBadgeDefById } from '../data/gamification';
import { buildLeaderboard } from '../data/apprenants';
import { Container } from '../components/layout';
import type { BadgeDef } from '../types/learning';

// ─── Display helpers ──────────────────────────────────────────────────────────

const BADGE_COLOR: Record<BadgeDef['type'], 'primary' | 'warm' | 'sun'> = {
  plateforme: 'warm',
  open_badge: 'sun',
  competence: 'primary',
};

const TYPE_ICON: Record<BadgeDef['type'], React.ReactNode> = {
  plateforme: <Flame size={24} strokeWidth={1.75} />,
  open_badge: <Award size={24} strokeWidth={1.75} />,
  competence: <Star size={24} strokeWidth={1.75} />,
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export default function DashboardAchievements() {
  const navigate = useNavigate();
  const gamificationStore = useGamificationStore();
  const passeportStore = usePasseportStore();

  // Phase 16.5 #3 : wire stats + recent badges + leaderboard live
  const userBadges = gamificationStore.getBadges(MOCK_USER_ID);
  const totalXP = gamificationStore.getTotalXP(MOCK_USER_ID);
  const streak = gamificationStore.getStreak(MOCK_USER_ID);
  const competencies = passeportStore.getCompetencies(MOCK_USER_ID);

  // Recent achievements (top 5 most recently earned)
  const recentAchievements = useMemo(() => {
    return [...userBadges]
      .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
      .slice(0, 5)
      .map((ub) => {
        const def = getBadgeDefById(ub.badgeId);
        return {
          id: ub.badgeId,
          title: def?.name ?? ub.badgeId,
          description: def?.description ?? '',
          icon: def ? TYPE_ICON[def.type] : <Award size={24} />,
          unlockedDate: formatDate(ub.earnedAt),
          color: def ? BADGE_COLOR[def.type] : ('primary' as const),
        };
      });
  }, [userBadges]);

  // In-progress goals : derived from the highest-level competency tracked,
  // a streak target, and the next XP milestone.
  const inProgress = useMemo(() => {
    const topComp = competencies.reduce<typeof competencies[number] | null>((best, c) => {
      if (!best) return c;
      return c.currentLevel > best.currentLevel ? c : best;
    }, null);
    const streakTarget = streak.currentStreak < 7 ? 7 : streak.currentStreak < 14 ? 14 : 30;
    const xpTarget = totalXP < 1000 ? 1000 : totalXP < 3000 ? 3000 : 10000;
    return [
      {
        id: 'streak',
        label: `Maître du Streak : ${streakTarget} jours consécutifs`,
        current: streak.currentStreak,
        target: streakTarget,
        fill: Math.round((streak.currentStreak / streakTarget) * 100),
        fillColor: 'warm' as const,
      },
      {
        id: 'xp',
        label: `Légende XP : ${xpTarget.toLocaleString('fr-FR')} XP`,
        current: totalXP,
        target: xpTarget,
        fill: Math.round((totalXP / xpTarget) * 100),
        fillColor: 'sun' as const,
      },
      ...(topComp
        ? [
            {
              id: 'dreyfus',
              label: `Expert Reconnu : Dreyfus niveau ${Math.min(topComp.currentLevel + 1, 5)}`,
              current: topComp.currentLevel,
              target: Math.min(topComp.currentLevel + 1, 5),
              fill: Math.round((topComp.currentLevel / Math.min(topComp.currentLevel + 1, 5)) * 100),
              fillColor: 'brand' as const,
            },
          ]
        : []),
    ];
  }, [streak.currentStreak, totalXP, competencies]);

  // Leaderboard (top 5) using the shared helper
  const leaderboard = useMemo(
    () =>
      buildLeaderboard({
        currentUserName: 'Toi',
        currentUserInitials: 'VT',
        currentUserXP: totalXP,
        currentUserStreak: streak.currentStreak,
        currentUserBadgeCount: userBadges.length,
      }).slice(0, 5),
    [totalXP, streak.currentStreak, userBadges.length],
  );
  const currentRank = leaderboard.find((r) => r.isCurrentUser)?.rank;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Dashboard · Réussites"
        title="Mes Réussites"
        summary="Retrouve ici tous tes badges, ton streak actuel et ton rang dans le classement de la communauté."
        tone="sun"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Badges obtenus"
            value={String(userBadges.length)}
            sub="badges"
            tone="sun"
            surface="tinted"
            icon={<Award size={20} />}
          />
          <StatCard
            label="Streak actuel"
            value={String(streak.currentStreak)}
            sub="jours"
            tone="warm"
            surface="tinted"
            icon={<Flame size={20} />}
            delta={`Meilleur : ${streak.longestStreak}j`}
            deltaDirection={streak.currentStreak >= streak.longestStreak ? 'up' : 'down'}
          />
          <StatCard
            label="Rang leaderboard"
            value={currentRank ? `#${currentRank}` : ':'}
            tone="neutral"
            surface="card"
            icon={<Trophy size={20} />}
          />
        </div>

        {/* Récentes réussites */}
        <SectionCard
          title="Récentes réussites"
          titleIcon={<Star size={18} />}
          description="Tes 5 derniers badges et accomplissements"
          headerAction={
            <button
              type="button"
              onClick={() => navigate('/gamification/badges')}
              className="text-caption font-semibold text-primary-700 hover:text-primary-800 bg-transparent border-0 cursor-pointer p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              Tout voir →
            </button>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-stack">
            {recentAchievements.length === 0 ? (
              <p className="text-caption text-ink-400 col-span-full">Aucun badge obtenu pour l'instant.</p>
            ) : (
              recentAchievements.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => navigate(`/gamification/badge/${a.id}`)}
                  className="bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg"
                >
                  <AchievementBadge
                    title={a.title}
                    description={a.description}
                    icon={a.icon}
                    unlockedDate={a.unlockedDate}
                    color={a.color}
                    size="sm"
                  />
                </button>
              ))
            )}
          </div>
        </SectionCard>

        {/* En progression */}
        <SectionCard
          title="En progression"
          titleIcon={<Target size={18} />}
          description="Objectifs en cours : continue pour débloquer ces badges"
        >
          <div className="flex flex-col gap-stack">
            {inProgress.map((item) => (
              <div key={item.id} className="flex flex-col gap-tight">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-semibold text-ink-800">{item.label}</span>
                  <span className="text-caption text-ink-500">
                    {item.current.toLocaleString('fr-FR')} / {item.target.toLocaleString('fr-FR')}
                  </span>
                </div>
                <ProgressBar
                  value={Math.min(item.fill, 100)}
                  fill={item.fillColor}
                  size="sm"
                  valueLabel={`${Math.min(item.fill, 100)} %`}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Classement */}
        <SectionCard
          title="Classement"
          titleIcon={<Trophy size={18} />}
          description="Top 5 apprenants de la communauté"
          headerAction={
            <button
              type="button"
              onClick={() => navigate('/leaderboard')}
              className="text-caption font-semibold text-primary-700 hover:text-primary-800 bg-transparent border-0 cursor-pointer p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              Voir tout →
            </button>
          }
        >
          <ol className="flex flex-col divide-y divide-ink-100">
            {leaderboard.map((entry) => (
              <li
                key={entry.id}
                className={`flex items-center gap-stack py-3 ${entry.isCurrentUser ? 'bg-primary-50 -mx-4 px-stack rounded-md' : ''}`}
              >
                <span
                  className={`w-7 text-center text-body-sm font-bold shrink-0 ${
                    entry.rank === 1
                      ? 'text-warning-fg'
                      : entry.rank <= 3
                        ? 'text-ink-600'
                        : 'text-ink-400'
                  }`}
                >
                  #{entry.rank}
                </span>
                <Avatar
                  initials={entry.initials}
                  size="sm"
                  tint={entry.isCurrentUser ? 'brand' : 'ink'}
                />
                <span
                  className={`flex-1 text-body-sm ${
                    entry.isCurrentUser ? 'font-bold text-primary-700' : 'text-ink-800'
                  }`}
                >
                  {entry.name}
                </span>
                <span className="text-body-sm font-semibold text-ink-600">
                  {entry.xp.toLocaleString('fr-FR')} XP
                </span>
              </li>
            ))}
          </ol>
        </SectionCard>
      </Container>
    </div>
  );
}
