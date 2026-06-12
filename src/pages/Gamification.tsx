import React, { useState } from 'react';
import { Flame, Trophy, Zap, Star, Award, TrendingUp, Medal } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Tabs } from '../components/ui/Tabs';
import { Container } from '../components/layout';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';
import type { BadgeType } from '../types/learning';

// ─── Static mock data (sections without store model yet) ──────────────────────

const NEXT_BADGES = [
  { title: '30 jours de streak', description: 'Encore 12 jours', progress: 60 },
  { title: 'Leadership D4', description: '180 pts restants', progress: 36 },
  { title: 'Analyste confirmé', description: 'Valider 2 JAC en Analyse', progress: 50 },
];

const DREYFUS_LEVEL_STYLES: Record<number, { color: string }> = {
  1: { color: 'bg-ink-200 text-ink-600' },
  2: { color: 'bg-info-bg text-info-fg' },
  3: { color: 'bg-success-bg text-success-fg' },
  4: { color: 'bg-warning-bg text-warning-fg' },
  5: { color: 'bg-accent-50 text-accent-600' },
};

const BADGE_ICON: Record<BadgeType, React.ReactNode> = {
  plateforme: <Flame size={20} strokeWidth={1.75} />,
  open_badge: <Medal size={20} strokeWidth={1.75} />,
  competence: <Award size={20} strokeWidth={1.75} />,
};

const TABS = [
  { id: 'overview', label: 'Tableau de bord' },
  { id: 'badges', label: 'Mes badges' },
  { id: 'streak', label: 'Streak & XP' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Gamification() {
  const [activeTab, setActiveTab] = useState('overview');
  const gamifStore = useGamificationStore();
  const passeportStore = usePasseportStore();

  const streak = gamifStore.getStreak(MOCK_USER_ID);
  const totalXP = gamifStore.getTotalXP(MOCK_USER_ID);
  const earnedUserBadges = gamifStore.getBadges(MOCK_USER_ID);
  const competencies = passeportStore.getCompetencies(MOCK_USER_ID);

  const STATS = [
    { label: 'XP total',      value: totalXP.toLocaleString('fr-FR'), delta: '+320', deltaDirection: 'up' as const, icon: <Zap size={18} /> },
    { label: 'Streak actuel', value: `${streak.currentStreak}j`,      delta: '+3j',  deltaDirection: 'up' as const, icon: <Flame size={18} /> },
    { label: 'Badges gagnés', value: String(earnedUserBadges.length),  delta: '+2',   deltaDirection: 'up' as const, icon: <Award size={18} /> },
    { label: 'Niveau',        value: String(streak.currentLevel),      delta: '',     deltaDirection: 'up' as const, icon: <Star size={18} /> },
  ];

  const recentBadges = [...earnedUserBadges]
    .sort((a, b) => b.earnedAt.localeCompare(a.earnedAt))
    .slice(0, 3)
    .map((ub) => {
      const def = getBadgeDefById(ub.badgeId);
      if (!def) return null;
      return { id: ub.badgeId, title: def.name, description: def.description, icon: BADGE_ICON[def.type] };
    })
    .filter(Boolean) as { id: string; title: string; description: string; icon: React.ReactNode }[];

  const competenceBadges = competencies.map((lc) => {
    const comp = getCompetenceById(lc.competenceId);
    return {
      label: comp?.label ?? lc.competenceId,
      level: lc.currentLevel,
      maxLevel: 5 as const,
      daysSinceActivity: lc.daysSinceActivity,
    };
  });

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="SBO · Learn"
        title="Ma Progression & Gamification"
        summary="Streaks, badges, XP et niveaux Dreyfus : suis ta progression et célèbre chaque étape."
        tone="warm"
        trailing={
          <Button variant="glass" size="md" leadingIcon={<Trophy size={16} />}>
            Galerie de badges
          </Button>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
          {STATS.map((s, i) => (
            <StatCard
              key={i}
              label={s.label}
              value={s.value}
              delta={s.delta || undefined}
              deltaDirection={s.deltaDirection}
              size="sm"
              variant="default"
            />
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          items={TABS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">

            {/* Recently unlocked */}
            <SectionCard
              title="Badges récemment débloqués"
              titleIcon={<Award size={20} />}
              tone="warm"
              headerAction={
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('badges')}>
                  Tout voir
                </Button>
              }
            >
              <div className="flex flex-wrap gap-stack">
                {recentBadges.map((b) => (
                  <div key={b.id} className="flex flex-col items-center gap-stack-xs text-center">
                    <AchievementBadge
                      title={b.title}
                      description={b.description}
                      icon={b.icon}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Next badges in progress */}
            <SectionCard
              title="Prochains badges"
              titleIcon={<TrendingUp size={20} />}
              description="Tes prochaines étapes de progression"
            >
              <div className="flex flex-col gap-stack">
                {NEXT_BADGES.map((b, i) => (
                  <Card key={i} className="p-stack flex flex-col gap-stack-xs">
                    <div className="flex items-center justify-between gap-stack-xs">
                      <span className="text-body-sm font-semibold text-ink-900">{b.title}</span>
                      <span className="text-caption text-ink-400">{b.description}</span>
                    </div>
                    <ProgressBar value={b.progress} fill="warm" size="sm" showLabel label={`${b.progress}%`} />
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Badges tab */}
        {activeTab === 'badges' && (
          <div className="flex flex-col gap-section">
            <SectionHeader
              title="Badges Compétences"
              subtitle="Niveaux Dreyfus par domaine : indicateur d'atrophie si inactif +90j"
              icon={<Award size={20} />}
              tone="warm"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
              {competenceBadges.map((c, i) => {
                const dreyfusLabel = ['Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'][c.level - 1] ?? 'Novice';
                const levelStyle = DREYFUS_LEVEL_STYLES[c.level];
                return (
                  <Card key={i} className="p-stack flex flex-col gap-stack-xs">
                    <div className="flex items-start justify-between gap-stack-xs">
                      <span className="text-body-sm font-semibold text-ink-900">{c.label}</span>
                      <AtrophieIndicator
                        daysSinceActivity={c.daysSinceActivity}
                        currentLevel={c.level}
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                    <div className="flex items-center gap-stack-xs">
                      <span className={`inline-flex items-center px-2 py-0.5 text-micro font-semibold rounded-pill ${levelStyle.color}`}>
                        D{c.level} : {dreyfusLabel}
                      </span>
                    </div>
                    <ProgressBar
                      value={(c.level / c.maxLevel) * 100}
                      fill="warm"
                      size="sm"
                      label={`Niveau ${c.level}/${c.maxLevel}`}
                      showLabel
                    />
                    <div className="flex gap-tight">
                      {Array.from({ length: c.maxLevel }, (_, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 h-1.5 rounded-full ${idx < c.level ? 'bg-secondary-500' : 'bg-ink-100'}`}
                        />
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <SectionHeader
              title="Badges Plateforme"
              subtitle="Badges gagnés pour ton engagement et tes activités"
              icon={<Trophy size={20} />}
              tone="warm"
            />
            <div className="flex flex-wrap gap-stack">
              {recentBadges.map((b) => (
                <AchievementBadge
                  key={b.id}
                  title={b.title}
                  description={b.description}
                  icon={b.icon}
                />
              ))}
            </div>
          </div>
        )}

        {/* Streak tab */}
        {activeTab === 'streak' && (
          <div className="flex flex-col gap-section">
            <SectionCard
              title="Streak actuel"
              titleIcon={<Flame size={20} />}
              tone="warm"
              description="18 jours consécutifs de connexion · Démarré le 25 avril 2026"
            >
              <div className="flex flex-col gap-stack">
                <div className="flex items-end gap-stack-xs">
                  <span className="text-h1 font-display font-bold text-secondary-600">18</span>
                  <span className="text-body text-ink-400 pb-2">jours</span>
                </div>
                <ProgressBar value={(18 / 30) * 100} fill="warm" size="lg" label="Prochain milestone : 30 jours" showLabel />
                {/* Calendar heatmap (simplified) */}
                <div className="grid grid-cols-7 gap-tight mt-stack-xs">
                  {Array.from({ length: 21 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-7 rounded-sm ${i < 18 ? 'bg-secondary-300' : 'bg-ink-100'} flex items-center justify-center`}
                      title={i < 18 ? '✅ Connecté' : ''}
                    >
                      {i < 18 && <span className="text-micro text-white font-bold">✓</span>}
                    </div>
                  ))}
                </div>
                <p className="text-caption text-ink-400">21 derniers jours</p>
              </div>
            </SectionCard>

            <SectionCard title="XP par catégorie" titleIcon={<Zap size={20} />}>
              <div className="flex flex-col gap-stack-xs">
                {[
                  { label: 'Parcours', xp: 1840, pct: 38 },
                  { label: 'Coaching', xp: 1200, pct: 25 },
                  { label: 'Veille', xp: 960, pct: 20 },
                  { label: 'Journal', xp: 480, pct: 10 },
                  { label: 'Autre', xp: 340, pct: 7 },
                ].map((cat) => (
                  <div key={cat.label} className="flex flex-col gap-tight">
                    <div className="flex justify-between text-caption text-ink-600">
                      <span>{cat.label}</span>
                      <span className="font-medium">{cat.xp.toLocaleString()} XP</span>
                    </div>
                    <ProgressBar value={cat.pct} fill="warm" size="sm" />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

      </Container>
    </div>
  );
}
