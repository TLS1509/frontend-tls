import React from 'react';
import { Award, Flame, Trophy, Star, Zap, BookOpen, Users, Target } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import AchievementBadge from '../components/ui/AchievementBadge';
import Avatar from '../components/ui/Avatar';

const RECENT_ACHIEVEMENTS = [
  {
    id: '1',
    title: 'Super Star XP',
    description: 'Dépasse 3 000 XP accumulés',
    icon: <Zap size={24} strokeWidth={1.75} />,
    unlockedDate: '13 mai 2026',
    color: 'sun' as const,
  },
  {
    id: '2',
    title: 'Compétent',
    description: 'Atteint le niveau Dreyfus 3 dans une compétence',
    icon: <Award size={24} strokeWidth={1.75} />,
    unlockedDate: '12 mai 2026',
    color: 'primary' as const,
  },
  {
    id: '3',
    title: 'Apprenti Assidu',
    description: '7 jours de connexion consécutifs',
    icon: <Flame size={24} strokeWidth={1.75} />,
    unlockedDate: '8 mai 2026',
    color: 'warm' as const,
  },
  {
    id: '4',
    title: 'Explorateur',
    description: 'Accès à 3 domaines de compétences',
    icon: <BookOpen size={24} strokeWidth={1.75} />,
    unlockedDate: '10 mai 2026',
    color: 'sun' as const,
  },
  {
    id: '5',
    title: 'Esprit Communauté',
    description: '10 interactions validées avec des pairs',
    icon: <Users size={24} strokeWidth={1.75} />,
    unlockedDate: '11 mai 2026',
    color: 'success' as const,
  },
];

const IN_PROGRESS = [
  {
    id: 'p1',
    label: 'Maître du Streak — 30 jours consécutifs',
    current: 12,
    target: 30,
    fill: 40,
    fillColor: 'warm' as const,
  },
  {
    id: 'p2',
    label: 'Légende XP — 10 000 XP',
    current: 3240,
    target: 10000,
    fill: 32,
    fillColor: 'sun' as const,
  },
  {
    id: 'p3',
    label: 'Expert Reconnu — Dreyfus niveau 4',
    current: 3,
    target: 4,
    fill: 75,
    fillColor: 'brand' as const,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Mathieu D.', score: 8420, initials: 'MD' },
  { rank: 2, name: 'Camille R.', score: 7310, initials: 'CR' },
  { rank: 3, name: 'Lucas B.', score: 5980, initials: 'LB' },
  { rank: 4, name: 'Sophie M.', score: 4750, initials: 'SM' },
  { rank: 5, name: 'Toi', score: 3240, initials: 'Moi', isMe: true },
];

export default function DashboardAchievements() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Dashboard · Réussites"
        title="Mes Réussites"
        summary="Retrouve ici tous tes badges, ton streak actuel et ton rang dans le classement de la communauté."
        tone="sun"
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Badges obtenus"
            value="8"
            sub="badges"
            tone="sun"
            surface="tinted"
            icon={<Award size={20} />}
            delta="+2 ce mois"
            deltaDirection="up"
          />
          <StatCard
            label="Streak actuel"
            value="12"
            sub="jours"
            tone="warm"
            surface="tinted"
            icon={<Flame size={20} />}
          />
          <StatCard
            label="Rang leaderboard"
            value="#5"
            tone="neutral"
            surface="card"
            icon={<Trophy size={20} />}
            delta="+ 3 places"
            deltaDirection="up"
          />
        </div>

        {/* Récentes réussites */}
        <SectionCard
          title="Récentes réussites"
          titleIcon={<Star size={18} />}
          description="Tes 5 derniers badges et accomplissements"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-stack">
            {RECENT_ACHIEVEMENTS.map((a) => (
              <AchievementBadge
                key={a.id}
                title={a.title}
                description={a.description}
                icon={a.icon}
                unlockedDate={a.unlockedDate}
                color={a.color}
                size="sm"
              />
            ))}
          </div>
        </SectionCard>

        {/* En progression */}
        <SectionCard
          title="En progression"
          titleIcon={<Target size={18} />}
          description="Objectifs en cours — continue pour débloquer ces badges"
        >
          <div className="flex flex-col gap-stack">
            {IN_PROGRESS.map((item) => (
              <div key={item.id} className="flex flex-col gap-tight">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-semibold text-ink-800">{item.label}</span>
                  <span className="text-caption text-ink-500">
                    {item.current} / {item.target}
                  </span>
                </div>
                <ProgressBar
                  value={item.fill}
                  fill={item.fillColor}
                  size="sm"
                  valueLabel={`${item.fill} %`}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Classement */}
        <SectionCard
          title="Classement"
          titleIcon={<Trophy size={18} />}
          description="Top 5 apprenants de la communauté cette semaine"
        >
          <ol className="flex flex-col divide-y divide-ink-100">
            {LEADERBOARD.map((entry) => (
              <li
                key={entry.rank}
                className={`flex items-center gap-stack py-3 ${entry.isMe ? 'bg-primary-50 -mx-4 px-4 rounded-md' : ''}`}
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
                  tint={entry.isMe ? 'brand' : 'ink'}
                />
                <span
                  className={`flex-1 text-body-sm ${
                    entry.isMe ? 'font-bold text-primary-700' : 'text-ink-800'
                  }`}
                >
                  {entry.name}
                </span>
                <span className="text-body-sm font-semibold text-ink-600">
                  {entry.score.toLocaleString('fr-FR')} XP
                </span>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </div>
  );
}
