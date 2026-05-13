import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { RankingCard } from '../components/learning/RankingCard';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Flame, Medal, Sparkles, Trophy, Users, Zap, ArrowUp, Minus, ArrowDown, Star } from 'lucide-react';

const PODIUM_USERS = [
  { name: 'Sophie Martin',  points: 1240, streak: 18, initials: 'SM', rank: 1, level: 12, xp: 4820, badges: 9 },
  { name: 'Pierre Bernard', points: 1120, streak: 13, initials: 'PB', rank: 2, level: 11, xp: 4110, badges: 7 },
  { name: 'Nadia Ferreira', points: 980,  streak: 9,  initials: 'NF', rank: 3, level: 10, xp: 3540, badges: 6 },
];

const FULL_RANKING = [
  { rank: 4,  name: 'Julien Moreau',    initials: 'JM', points: 870, trend: 'up'   as const, level: 9,  xp: 3020, badges: 5, isCurrentUser: false },
  { rank: 5,  name: 'Amina Benali',     initials: 'AB', points: 820, trend: 'same' as const, level: 9,  xp: 2880, badges: 4, isCurrentUser: false },
  { rank: 6,  name: 'Thomas Dupont',    initials: 'TD', points: 760, trend: 'down' as const, level: 8,  xp: 2650, badges: 4, isCurrentUser: false },
  { rank: 7,  name: 'Claire Fontaine',  initials: 'CF', points: 710, trend: 'up'   as const, level: 8,  xp: 2480, badges: 3, isCurrentUser: false },
  { rank: 8,  name: 'Vous',             initials: 'VT', points: 680, trend: 'same' as const, level: 7,  xp: 2240, badges: 3, isCurrentUser: true  },
  { rank: 9,  name: 'Lucie Perrot',     initials: 'LP', points: 640, trend: 'up'   as const, level: 7,  xp: 2100, badges: 2, isCurrentUser: false },
  { rank: 10, name: 'Antoine Garnier',  initials: 'AG', points: 600, trend: 'down' as const, level: 6,  xp: 1980, badges: 2, isCurrentUser: false },
];

const PERIODS = [
  { id: 'week'  as const, label: 'Cette semaine' },
  { id: 'month' as const, label: 'Ce mois' },
  { id: 'all'   as const, label: 'Tout temps' },
];

const TREND_ICON: Record<'up' | 'same' | 'down', React.ReactNode> = {
  up:   <ArrowUp   size={11} className="text-success-fg" />,
  same: <Minus     size={11} className="text-ink-400" />,
  down: <ArrowDown size={11} className="text-secondary-600" />,
};

// Per-rank visual config — Tailwind classes only
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

export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-section flex flex-col gap-section">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <EditorialHero
          tone="sun"
          eyebrow={{ icon: <Trophy size={12} />, label: 'Progression communauté' }}
          title="Leaderboard"
          summary="Classement communautaire hebdomadaire — les apprenants les plus engagés mis à l'honneur."
        />

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack">
          <StatCard
            variant="brand"
            size="sm"
            icon={<Users strokeWidth={1.8} />}
            value={PODIUM_USERS.length + FULL_RANKING.length}
            label="Participants"
          />
          <StatCard
            variant="warm"
            size="sm"
            icon={<Trophy strokeWidth={1.8} />}
            value="#8"
            label="Votre classement"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Zap strokeWidth={1.8} />}
            value="2 240"
            label="Votre XP total"
          />
          <StatCard
            variant="sun"
            size="sm"
            icon={<Flame strokeWidth={1.8} />}
            value="18j"
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
          {PODIUM_USERS.map((entry, index) => {
            const pod = PODIUM_CONFIG[index];
            return (
              <Card
                key={entry.name}
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
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>

                <Button size="sm" variant="secondary" className="self-start">
                  <Medal size={13} /> Voir le profil
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Full ranking list */}
        <div className="flex flex-col gap-4">
          {/* Current user banner */}
          <Card variant="tinted" tone="primary" className="flex items-center gap-4 p-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-extrabold text-body-sm shrink-0">
              VT
            </div>
            <div className="flex-1">
              <div className="font-body text-body-sm font-bold text-ink-900">Vous</div>
              <div className="font-body text-caption text-ink-500">Niveau 7 · 2 240 XP</div>
            </div>
            <div className="text-right">
              <div className="font-display text-h3 font-extrabold text-primary-600 leading-none">#8</div>
              <div className="font-body text-caption text-ink-500">classement</div>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            {FULL_RANKING.map((entry) => (
              <RankingCard
                key={entry.rank}
                rank={entry.rank}
                name={entry.name}
                points={entry.points}
                streak={undefined}
                variant={entry.isCurrentUser ? 'brand' : 'neutral'}
                onViewProfile={() => navigate(`/profile/${entry.rank}`)}
              />
            ))}
          </div>
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
                Complétez 3 activités réflexives et 2 modules pour intégrer le top 3.
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/learning-paths')}>Continuer mon parcours</Button>
        </Card>
      </div>
    </div>
  );
};
