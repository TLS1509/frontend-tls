import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Flame, Trophy, Star, ArrowRight } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import AchievementBadge from '../components/ui/AchievementBadge';
import Avatar from '../components/ui/Avatar';
import { PageShell } from '../components/layout';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { competencyLevel } from '../data/competencies';
import { getBadgeDefById } from '../data/gamification';
import { buildLeaderboard } from '../data/apprenants';
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
      return competencyLevel(c) > competencyLevel(best) ? c : best;
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
              label: `Expert Reconnu : Dreyfus niveau ${Math.min(competencyLevel(topComp) + 1, 5)}`,
              current: competencyLevel(topComp),
              target: Math.min(competencyLevel(topComp) + 1, 5),
              fill: Math.round((competencyLevel(topComp) / Math.min(competencyLevel(topComp) + 1, 5)) * 100),
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

  /* Lien « voir tout » d'une section : la typographie des liens de l'app
     (13/600 au cran 800 ; il était au 700, avec une flèche en caractère). */
  const lienVoirTout = (label: string, to: string) => (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="inline-flex items-center min-h-6 py-1 -my-1 gap-stack-3xs font-body text-caption font-semibold text-primary-800 hover:text-primary-900 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </button>
  );

  /* Passe typographique du 24/09 — la page prend le rythme de PageShell (48
     entre sections ; elle posait sa propre marge haute puis 32). Ses trois
     blocs sont des sections : un h2 28 et sa phrase, puis leur contenu — ils
     étaient trois cartes titrées en h3 et la page sautait du h1 au h3. Le
     contenu de la gamification (série, XP, classement) n'est pas l'objet de
     cette passe (arbitrage n°18). */
  return (
    <PageShell width="wide">
      <EditorialHero
        eyebrow="Tableau de bord · Réussites"
        title="Mes réussites"
        summary="Retrouve ici tous tes badges, ton streak actuel et ton rang dans le classement de la communauté."
        tone="flat"
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard
          label="Badges obtenus"
          value={String(userBadges.length)}
          sub="badges"
          tone="neutral"
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
          delta={`Meilleur : ${streak.longestStreak} j`}
          deltaDirection={streak.currentStreak >= streak.longestStreak ? 'up' : 'down'}
        />
        {/* Sans rang, un tiret de valeur absente (il affichait « : »). */}
        <StatCard
          label="Rang leaderboard"
          value={currentRank ? `#${currentRank}` : '–'}
          tone="neutral"
          surface="card"
          icon={<Trophy size={20} />}
        />
      </div>

      {/* Récentes réussites */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Récentes réussites"
          subtitle="Tes 5 derniers badges et accomplissements"
          action={lienVoirTout('Tout voir', '/gamification/badges')}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-stack">
          {recentAchievements.length === 0 ? (
            <p className="font-body text-body text-ink-700 col-span-full">Aucun badge obtenu pour l'instant.</p>
          ) : (
            recentAchievements.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => navigate(`/gamification/badge/${a.id}`)}
                /* `flex flex-col` : un <button> centre son contenu dans la
                   hauteur de la rangée — les badges de hauteurs différentes
                   partaient chacun de leur propre haut. Ils s'alignent en haut. */
                className="flex flex-col bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg"
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
      </section>

      {/* En progression */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="En progression"
          subtitle="Objectifs en cours : continue pour débloquer ces badges."
        />
        <Card className="flex flex-col gap-stack-lg">
          {inProgress.map((item) => (
            /* Libellé et valeur sur la même ligne de base ; la valeur est une
               donnée tabulaire au cran 600 (elle était au 500). */
            <div key={item.id} className="flex flex-col gap-stack-xs">
              <div className="flex items-baseline justify-between gap-stack">
                <span className="font-body text-body font-semibold text-ink-900">{item.label}</span>
                <span className="font-body text-caption text-ink-600 tabular-nums shrink-0">
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
        </Card>
      </section>

      {/* Classement */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Classement"
          subtitle="Top 5 apprenants de la communauté"
          action={lienVoirTout('Voir tout', '/leaderboard')}
        />
        <Card>
          <ol className="flex flex-col divide-y divide-ink-100">
            {leaderboard.map((entry) => (
              <li
                key={entry.id}
                className={`flex items-center gap-stack py-3 ${entry.isCurrentUser ? 'bg-primary-50 -mx-4 px-stack rounded-md' : ''}`}
              >
                <span
                  className={`w-7 text-center font-body text-body font-bold tabular-nums shrink-0 ${
                    entry.rank === 1 ? 'text-warning-fg' : 'text-ink-600'
                  }`}
                >
                  #{entry.rank}
                </span>
                <Avatar
                  initials={entry.initials}
                  size="sm"
                  tint={entry.isCurrentUser ? 'brand' : 'ink'}
                />
                {/* Le nom : 600 et l'encre du texte, au cran 800 du teal
                    pour soi (il était en 700 au cran 700). */}
                <span
                  className={`flex-1 font-body text-body ${
                    entry.isCurrentUser ? 'font-semibold text-primary-800' : 'text-ink-900'
                  }`}
                >
                  {entry.name}
                </span>
                <span className="font-body text-body font-semibold text-ink-700 tabular-nums">
                  {entry.xp.toLocaleString('fr-FR')} XP
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </PageShell>
  );
}
