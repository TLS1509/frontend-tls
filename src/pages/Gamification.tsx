import React, { useState } from 'react';
import { Flame, Trophy, Zap, Star, Award, Medal } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { MetaPill, type MetaPillTone } from '../components/ui/MetaPill';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { Tabs } from '../components/ui/Tabs';
import { PageShell } from '../components/layout';
import { useGamificationStore, usePasseportStore } from '../stores/persistence';
import { BADGE_DEFS, getBadgeDefById } from '../data/gamification';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById, competencyLevel } from '../data/competencies';
import type { BadgeType } from '../types/learning';

// ─── Static mock data (sections without store model yet) ──────────────────────

const NEXT_BADGES = [
  { title: '30 jours de streak', description: 'Encore 12 jours', progress: 60 },
  { title: 'Leadership D4', description: '180 pts restants', progress: 36 },
  { title: 'Analyste confirmé', description: 'Valider 2 JAC en Analyse', progress: 50 },
];

/* Le niveau est une donnée : MetaPill, dans la teinte de son cran. La pastille
   faite main était en étiquette 11 px — le registre des seuls Badge. */
const DREYFUS_LEVEL_TONE: Record<number, MetaPillTone> = {
  1: 'neutral',
  2: 'info',
  3: 'success',
  4: 'warm',
  5: 'sun',
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
      level: competencyLevel(lc),
      maxLevel: 5 as const,
      daysSinceActivity: lc.daysSinceActivity,
    };
  });

  return (
    /* Le haut de page est celui de la coque (il était réécrit à la main, 24 à
       40). Les mots et l'ordre des blocs ne bougent pas (arbitrage n°18 en
       cours) : typographie et rythme seulement. */
    <PageShell width="wide">
      <EditorialHero
        eyebrow="SBO · Learn"
        title="Ma Progression & Gamification"
        summary="Streaks, badges, XP et niveaux Dreyfus : suis ta progression et célèbre chaque étape."
        tone="flat"
        trailing={
          <Button emphasis="soft" size="md" leadingIcon={<Trophy size={16} />}>
            Galerie de badges
          </Button>
        }
      />

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

        {/* Overview tab — titres de section (h2 28) posés sur la page ; ils
            étaient des h3 à 20 dans des cartes teintées, et la page sautait
            du h1 au h3. */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-page">

            {/* Recently unlocked — les badges sont des cartes : pas de carte
                orange autour d'eux. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Badges récemment débloqués"
                action={
                  <Button emphasis="outline" size="sm" onClick={() => setActiveTab('badges')}>
                    Tout voir
                  </Button>
                }
              />
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
            </section>

            {/* Next badges in progress — des rangées dans une carte (elles
                étaient des cartes dans une carte). Le pourcentage s'écrivait
                deux fois (libellé et valeur) : il reste la valeur. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Prochains badges"
                subtitle="Tes prochaines étapes de progression"
              />
              <Card className="p-0 overflow-hidden">
                <ul className="divide-y divide-ink-100">
                  {NEXT_BADGES.map((b, i) => (
                    <li key={i} className="flex flex-col gap-stack-xs px-stack-lg py-stack">
                      <div className="flex items-baseline justify-between gap-stack">
                        <span className="text-body font-semibold text-ink-900">{b.title}</span>
                        <span className="text-caption text-ink-600 text-right">{b.description}</span>
                      </div>
                      <ProgressBar value={b.progress} fill="warm" size="sm" showLabel />
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          </div>
        )}

        {/* Badges tab — chaque titre suit son contenu à 16 : le conteneur les
            séparait de 32, autant qu'une section de la suivante. */}
        {activeTab === 'badges' && (
          <div className="flex flex-col gap-page">
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Badges Compétences"
                subtitle="Niveaux Dreyfus par domaine : indicateur d'atrophie si inactif +90j"
                icon={<Award size={20} />}
                tone="warm"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack">
                {competenceBadges.map((c, i) => {
                  const dreyfusLabel = ['Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'][c.level - 1] ?? 'Novice';
                  return (
                    <Card key={i} className="p-stack-md flex flex-col gap-stack-xs">
                      <div className="flex items-start justify-between gap-stack-xs">
                        <span className="text-body font-semibold text-ink-900">{c.label}</span>
                        <AtrophieIndicator
                          daysSinceActivity={c.daysSinceActivity}
                          currentLevel={c.level}
                          size="sm"
                          showLabel={false}
                        />
                      </div>
                      <div className="flex items-center gap-stack-xs">
                        <MetaPill text={`D${c.level} : ${dreyfusLabel}`} tone={DREYFUS_LEVEL_TONE[c.level] ?? 'neutral'} />
                      </div>
                      <ProgressBar
                        className="mt-stack-3xs"
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
                            className={`flex-1 h-1.5 rounded-pill ${idx < c.level ? 'bg-secondary-500' : 'bg-ink-100'}`}
                          />
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="flex flex-col gap-stack">
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
            </section>
          </div>
        )}

        {/* Streak tab */}
        {activeTab === 'streak' && (
          <div className="flex flex-col gap-page">
            {/* La phrase sous le titre est une donnée (un compte, une date) :
                la méta. Le chiffre de la série prend l'échelle des chiffres
                (`stat-value`) et l'encre du cran 800 : il était en orange 600,
                que la doctrine refuse au texte, et collé en bas par un `pb-2`
                au lieu de partager la ligne de base de son unité. */}
            <section className="flex flex-col gap-stack">
              <SectionHeader
                title="Streak actuel"
                meta="18 jours consécutifs de connexion · Démarré le 25 avril 2026"
              />
              <Card className="flex flex-col gap-stack">
                <div className="flex items-baseline gap-stack-xs">
                  <span className="text-stat-value font-display font-bold leading-none text-secondary-800 tabular-nums">18</span>
                  <span className="text-body text-ink-600">jours</span>
                </div>
                <ProgressBar value={(18 / 30) * 100} fill="warm" size="lg" label="Prochain milestone : 30 jours" showLabel />
                {/* Calendar heatmap (simplified) — la coche est un glyphe :
                    3:1 au moins. Blanche sur orange 300, elle n'y était pas. */}
                <div className="flex flex-col gap-stack-xs">
                  <div className="grid grid-cols-7 gap-tight">
                    {Array.from({ length: 21 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-7 rounded-sm ${i < 18 ? 'bg-secondary-200' : 'bg-ink-100'} flex items-center justify-center`}
                        title={i < 18 ? '✅ Connecté' : ''}
                      >
                        {i < 18 && <span className="text-caption text-secondary-800 font-bold" aria-hidden="true">✓</span>}
                      </div>
                    ))}
                  </div>
                  <p className="text-caption text-ink-600">21 derniers jours</p>
                </div>
              </Card>
            </section>

            {/* XP par catégorie — libellé en corps, valeur à droite en chiffres
                tabulaires et au format français (« 1 840 », pas « 1,840 »). */}
            <section className="flex flex-col gap-stack">
              <SectionHeader title="XP par catégorie" />
              <Card>
                <div className="flex flex-col gap-stack">
                  {[
                    { label: 'Parcours', xp: 1840, pct: 38 },
                    { label: 'Coaching', xp: 1200, pct: 25 },
                    { label: 'Veille', xp: 960, pct: 20 },
                    { label: 'Journal', xp: 480, pct: 10 },
                    { label: 'Autre', xp: 340, pct: 7 },
                  ].map((cat) => (
                    <div key={cat.label} className="flex flex-col gap-stack-xs">
                      <div className="flex items-baseline justify-between gap-stack">
                        <span className="text-body text-ink-900">{cat.label}</span>
                        <span className="text-caption font-semibold text-ink-700 tabular-nums">{cat.xp.toLocaleString('fr-FR')} XP</span>
                      </div>
                      <ProgressBar value={cat.pct} fill="warm" size="sm" />
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        )}

    </PageShell>
  );
}
