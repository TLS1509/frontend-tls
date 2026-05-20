import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { StatCard } from '../components/ui/StatCard';
import { Pagination } from '../components/ui/Pagination';
import { RankingCard } from '../components/learning/RankingCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Flame, Medal, Sparkles, Trophy, Users, Zap, Star } from 'lucide-react';
import { useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { buildLeaderboard, type LeaderboardRow } from '../data/apprenants';

const PERIODS = [
  { id: 'week'  as const, label: 'Cette semaine' },
  { id: 'month' as const, label: 'Ce mois' },
  { id: 'all'   as const, label: 'Tout temps' },
];

const PODIUM_CONFIG = [
  {
    label: '1er',
    emoji: '🥇',
    cardClasses: 'bg-gradient-to-br from-accent-100 to-white border border-accent-300',
    avatarClasses: 'bg-accent-100 border-2 border-accent-300 text-accent-800',
    pillClasses: 'bg-accent-100 text-accent-800',
    badgeClasses: 'bg-accent-100 text-accent-800 border border-accent-300 rounded-pill px-3 py-1',
    iconClasses: 'text-accent-600',
  },
  {
    label: '2ème',
    emoji: '🥈',
    cardClasses: 'bg-gradient-to-br from-ink-100 to-white border border-ink-300',
    avatarClasses: 'bg-ink-100 border-2 border-ink-300 text-ink-600',
    pillClasses: 'bg-ink-100 text-ink-600',
    badgeClasses: 'bg-ink-100 text-ink-600 border border-ink-300 rounded-pill px-3 py-1',
    iconClasses: 'text-ink-500',
  },
  {
    label: '3ème',
    emoji: '🥉',
    cardClasses: 'bg-gradient-to-br from-secondary-100 to-white border border-secondary-300',
    avatarClasses: 'bg-secondary-100 border-2 border-secondary-300 text-secondary-700',
    pillClasses: 'bg-secondary-100 text-secondary-700',
    badgeClasses: 'bg-secondary-100 text-secondary-700 border border-secondary-300 rounded-pill px-3 py-1',
    iconClasses: 'text-secondary-600',
  },
];

const ITEMS_PER_PAGE = 4;

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const gamificationStore = useGamificationStore();
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [rankPage, setRankPage] = useState(1);

  // Phase 16.5 #3 — live ranking built from shared APPRENANTS + current user state
  const currentUserXP = gamificationStore.getTotalXP(MOCK_USER_ID);
  const currentUserStreak = gamificationStore.getStreak(MOCK_USER_ID);
  const currentUserBadges = gamificationStore.getBadges(MOCK_USER_ID);

  const fullRanking = useMemo<LeaderboardRow[]>(
    () =>
      buildLeaderboard({
        currentUserName: 'Toi',
        currentUserInitials: 'VT',
        currentUserXP,
        currentUserStreak: currentUserStreak.currentStreak,
        currentUserBadgeCount: currentUserBadges.length,
      }),
    [currentUserXP, currentUserStreak.currentStreak, currentUserBadges.length],
  );

  const podium = fullRanking.slice(0, 3);
  const restRanking = fullRanking.slice(3);
  const currentUserRow = fullRanking.find((r) => r.isCurrentUser);
  const totalRankPages = Math.ceil(restRanking.length / ITEMS_PER_PAGE);
  const paginatedRanking = restRanking.slice(
    (rankPage - 1) * ITEMS_PER_PAGE,
    rankPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="flex-1 max-w-wide mx-auto w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-section flex flex-col gap-section">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <EditorialHero
          tone="sun"
          eyebrow={{ icon: <Trophy size={12} />, label: 'Progression communauté' }}
          title="Leaderboard"
          summary="Classement communautaire — les apprenants les plus engagés mis à l'honneur."
        />

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
          <StatCard
            variant="brand"
            size="sm"
            icon={<Users strokeWidth={1.8} />}
            value={fullRanking.length}
            label="Participants"
          />
          <StatCard
            variant="warm"
            size="sm"
            icon={<Trophy strokeWidth={1.8} />}
            value={currentUserRow ? `#${currentUserRow.rank}` : '—'}
            label="Ton classement"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Zap strokeWidth={1.8} />}
            value={currentUserXP.toLocaleString('fr-FR')}
            label="Ton XP total"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Flame strokeWidth={1.8} />}
            value={`${currentUserStreak.longestStreak}j`}
            label="Meilleur streak"
          />
        </div>

        {/* Section heading + period filter */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="m-0 font-display text-h3 font-bold text-ink-900 tracking-tight">
            Classement
          </h2>
          <div className="flex gap-1 p-1 rounded-pill bg-ink-100">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={[
                  'px-3 py-1.5 rounded-pill border-0 font-body text-caption cursor-pointer transition-colors duration-base whitespace-nowrap',
                  period === p.id
                    ? 'bg-white text-ink-900 font-bold shadow-xs'
                    : 'bg-transparent text-ink-600 font-medium hover:text-ink-900',
                ].join(' ')}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {podium.map((entry, index) => {
            const pod = PODIUM_CONFIG[index];
            return (
              <Card
                key={entry.id}
                className={`p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200 cursor-default ${pod.cardClasses}`}
              >
                {/* Rank badge + points */}
                <div className="flex items-center justify-between">
                  <span className="text-[2rem] leading-none">{pod.emoji}</span>
                  <span className={`text-caption font-bold ${pod.badgeClasses}`}>
                    {entry.points} pts
                  </span>
                </div>

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-body-sm font-extrabold shrink-0 ${pod.avatarClasses}`}>
                    {entry.initials}
                  </div>
                  <div>
                    <p className="m-0 font-body text-body font-bold text-ink-900">{entry.name}</p>
                    <p className="m-0 font-body text-caption text-ink-500">{pod.label} du classement</p>
                  </div>
                </div>

                {/* Stats pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption font-semibold ${pod.pillClasses}`}>
                    <Flame size={13} className={pod.iconClasses} />
                    {entry.streak}j streak
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption font-semibold ${pod.pillClasses}`}>
                    <Star size={12} className={pod.iconClasses} />
                    Niv.&nbsp;{entry.level}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-caption font-semibold ${pod.pillClasses}`}>
                    <Zap size={12} className={pod.iconClasses} />
                    {entry.xp.toLocaleString('fr-FR')} XP
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  className="self-start"
                  onClick={() => !entry.isCurrentUser && navigate(`/coach/apprenant/${entry.id}`)}
                  disabled={entry.isCurrentUser}
                >
                  <Medal size={13} /> Voir le profil
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Full ranking list */}
        <div className="flex flex-col gap-4">
          {/* Current user banner — only show if they're not on the podium */}
          {currentUserRow && currentUserRow.rank > 3 && (
            <Card variant="tinted" tone="primary" className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-extrabold text-body-sm shrink-0">
                {currentUserRow.initials}
              </div>
              <div className="flex-1">
                <div className="font-body text-body-sm font-bold text-ink-900">{currentUserRow.name}</div>
                <div className="font-body text-caption text-ink-500">
                  Niveau {currentUserRow.level} · {currentUserRow.xp.toLocaleString('fr-FR')} XP
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-h3 font-extrabold text-primary-600 leading-none">
                  #{currentUserRow.rank}
                </div>
                <div className="font-body text-caption text-ink-500">classement</div>
              </div>
            </Card>
          )}

          <div className="flex flex-col gap-3">
            {paginatedRanking.map((entry) => (
              <RankingCard
                key={entry.id}
                rank={entry.rank}
                name={entry.name}
                points={entry.points}
                streak={undefined}
                variant={entry.isCurrentUser ? 'brand' : 'neutral'}
                onViewProfile={() =>
                  entry.isCurrentUser
                    ? navigate('/profile/badges/competences')
                    : navigate(`/coach/apprenant/${entry.id}`)
                }
              />
            ))}
          </div>

          {totalRankPages > 1 && (
            <Pagination
              page={rankPage}
              totalPages={totalRankPages}
              onChange={setRankPage}
              info={<span className="text-caption text-ink-500">{restRanking.length} participants</span>}
            />
          )}
        </div>

        {/* Weekly goal */}
        <Card variant="tinted" tone="primary" className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
              <Zap size={20} strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="m-0 font-display text-h4 font-bold text-ink-900 flex items-center gap-2">
                <Sparkles size={16} className="text-primary-500" />
                Objectif de la semaine
              </h3>
              <p className="m-0 font-body text-body-sm text-ink-500">
                Complète 3 activités réflexives et 2 modules pour intégrer le top 3.
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/learning-paths')}>Continuer mon parcours</Button>
        </Card>
      </div>
    </div>
  );
};
