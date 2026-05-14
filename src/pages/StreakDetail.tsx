import React from 'react';
import { Flame, Trophy, Target, Calendar } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { AchievementBadge } from '../components/ui/AchievementBadge';

const DAYS = Array.from({ length: 30 }, (_, i) => {
  // Simulate streak data: 18-day current streak, with one break around day 12
  const day = i + 1;
  const active = day >= 13 || (day <= 11 && day >= 1);
  return { day, active };
});

const MILESTONES = [
  { days: 7, label: '1 semaine', tone: 'info' as const, unlocked: true },
  { days: 14, label: '2 semaines', tone: 'success' as const, unlocked: true },
  { days: 30, label: '1 mois', tone: 'warm' as const, unlocked: false, progress: 60 },
  { days: 100, label: '100 jours', tone: 'sun' as const, unlocked: false, progress: 18 },
];

const StreakDetail: React.FC = () => {
  const currentStreak = 18;
  const longest = 24;

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Gamification · Streak"
        title="🔥 18 jours d'affilée"
        description="Continue comme ça pour décrocher ton badge 1 mois !"
        tone="default"
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Streak actuel" value={`${currentStreak}j`} sub="🔥 Actif" />
          <StatCard label="Streak record" value={`${longest}j`} sub="Mars 2026" />
          <StatCard label="Total jours actifs" value="142" sub="6 derniers mois" />
          <StatCard label="Reset heure" value="00:00" sub="UTC+1 Paris" />
        </div>

        <SectionCard title="Activité des 30 derniers jours" description="Un carré = un jour. Vert = activité validée, gris = inactif">
          <Card className="p-6">
            <div className="grid grid-cols-7 sm:grid-cols-15 gap-1">
              {DAYS.map((d) => (
                <div
                  key={d.day}
                  title={`Jour ${d.day} — ${d.active ? 'Actif' : 'Inactif'}`}
                  className={`aspect-square rounded ${
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
              <Card key={m.days} className="p-4 flex items-center gap-4">
                <AchievementBadge tone={m.tone} icon={<Flame className="w-6 h-6" />} size="md" />
                <div className="flex-1">
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-caption text-ink-500 mb-2">{m.days} jours consécutifs</div>
                  {m.unlocked ? (
                    <Badge variant="success">Débloqué</Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ProgressBar value={m.progress!} max={100} tone="brand" />
                      <span className="text-caption text-ink-500 shrink-0">{currentStreak}/{m.days}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>

        <Card className="p-6 bg-warm-bg/30 border-warm-base/30 flex items-center gap-4">
          <Target className="w-10 h-10 text-warm-fg" />
          <div className="flex-1">
            <div className="font-semibold mb-1">Objectif du jour</div>
            <p className="text-body-sm text-ink-700">Termine une leçon ou écris une entrée de journal avant minuit pour maintenir ta streak.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StreakDetail;
