import React from 'react';
import { Flame, Target, CheckCircle2, Lock } from 'lucide-react';
import { useGamificationStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Container } from '../components/layout';

// Milestone tone → icon bubble classes
const MILESTONE_BUBBLE: Record<string, string> = {
  info:    'bg-primary-100 text-primary-700',
  success: 'bg-success-bg text-success-fg',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-500',
};

const MILESTONE_DEFS = [
  { days: 7,   label: '1 semaine', tone: 'info'    as const },
  { days: 14,  label: '2 semaines', tone: 'success' as const },
  { days: 30,  label: '1 mois',    tone: 'warm'    as const },
  { days: 100, label: '100 jours', tone: 'sun'     as const },
];

const StreakDetail: React.FC = () => {
  const gamifStore = useGamificationStore();
  const streak = gamifStore.getStreak(MOCK_USER_ID);
  const currentStreak = streak.currentStreak;
  const longest = streak.longestStreak;

  const DAYS = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    active: i < currentStreak,
  }));

  const MILESTONES = MILESTONE_DEFS.map((m) => ({
    ...m,
    unlocked: currentStreak >= m.days || longest >= m.days,
    progress: Math.min(100, Math.round((currentStreak / m.days) * 100)),
  }));

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Gamification · Streak"
        title={`${currentStreak} jours d'affilée`}
        summary={currentStreak >= 30 ? "Incroyable ! Tu as décroché le badge 1 mois de streak !" : `Continue comme ça : encore ${30 - currentStreak} jours pour décrocher ton badge 1 mois !`}
        tone="flat"
      />

      <Container width="wide" padding={false} className="px-stack py-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Streak actuel" value={`${currentStreak}j`} sub="🔥 Actif" />
          <StatCard label="Streak record" value={`${longest}j`} sub="Mars 2026" />
          <StatCard label="Total jours actifs" value="142" sub="6 derniers mois" />
          <StatCard label="Reset heure" value="00:00" sub="UTC+1 Paris" />
        </div>

        <SectionCard title="Activité des 30 derniers jours" description="Un carré = un jour. Vert = activité validée, gris = inactif">
          <Card className="p-stack-lg">
            <div className="grid grid-cols-7 gap-tight max-w-[280px]">
              {DAYS.map((d) => (
                <div
                  key={d.day}
                  title={`Jour ${d.day} : ${d.active ? 'Actif' : 'Inactif'}`}
                  className={`aspect-square rounded-sm ${
                    d.active ? 'bg-success-base' : 'bg-ink-100'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-stack-xs mt-stack text-caption text-ink-500">
              <span className="w-3 h-3 rounded bg-ink-100" /> Inactif
              <span className="w-3 h-3 rounded bg-success-base ml-stack-xs" /> Actif
            </div>
          </Card>
        </SectionCard>

        <SectionCard title="Milestones débloquées" description="Atteins ces paliers pour gagner des badges">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
            {MILESTONES.map((m) => (
              <Card key={m.days} className="p-stack flex items-center gap-stack">
                {/* Icon bubble : replaces AchievementBadge (full card component, not suitable inline) */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${MILESTONE_BUBBLE[m.tone]}`}>
                  {m.unlocked
                    ? <CheckCircle2 className="w-6 h-6" />
                    : <Lock className="w-5 h-5 opacity-60" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-caption text-ink-500 mb-stack-xs">{m.days} jours consécutifs</div>
                  {m.unlocked ? (
                    <Badge variant="success">Débloqué</Badge>
                  ) : (
                    <div className="flex items-center gap-stack-xs">
                      <ProgressBar value={m.progress!} max={100} fill="brand" />
                      <span className="text-caption text-ink-500 shrink-0">{currentStreak}/{m.days}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>

        <Card className="p-stack-lg bg-secondary-50/50 border-secondary-200 flex items-center gap-stack">
          <Target className="w-10 h-10 text-secondary-600" />
          <div className="flex-1">
            <div className="font-semibold mb-1">Objectif du jour</div>
            <p className="text-body-sm text-ink-700">Termine une leçon ou écris une entrée de journal avant minuit pour maintenir ta streak.</p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default StreakDetail;
