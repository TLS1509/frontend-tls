import React, { useState } from 'react';
import { Flame, TrendingDown, Award, Zap, AlertTriangle } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Avatar } from '../components/ui/Avatar';
import { FilterChip } from '../components/ui/FilterChip';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';
import { ProgressBar } from '../components/ui/ProgressBar';

interface Learner {
  name: string;
  initials: string;
  streak: number;
  badges: number;
  xpWeek: number;
  trend: 'up' | 'down' | 'stable';
  atrophyDays?: number;
}

const LEARNERS: Learner[] = [
  { name: 'Léa Martin', initials: 'LM', streak: 18, badges: 12, xpWeek: 320, trend: 'up' },
  { name: 'Tom Bernard', initials: 'TB', streak: 7, badges: 8, xpWeek: 180, trend: 'stable' },
  { name: 'Sara Costa', initials: 'SC', streak: 0, badges: 14, xpWeek: 0, trend: 'down', atrophyDays: 95 },
  { name: 'Jules Petit', initials: 'JP', streak: 24, badges: 18, xpWeek: 410, trend: 'up' },
  { name: 'Anna Roux', initials: 'AR', streak: 2, badges: 5, xpWeek: 60, trend: 'down', atrophyDays: 32 },
];

const CoachEngagement: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'at-risk'>('all');

  const filtered = LEARNERS.filter((l) => {
    if (filter === 'active') return l.streak > 0 && !l.atrophyDays;
    if (filter === 'at-risk') return !!l.atrophyDays || l.streak === 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coach · Engagement & Analytics"
        title="L'engagement de mon équipe"
        description="Streaks, badges, XP semaine et alertes d'atrophie"
        tone="warm"
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Apprenants actifs" value="3/5" sub="60%" />
          <StatCard label="Streak moyen" value="10.2j" sub="+2 vs S-1" />
          <StatCard label="Badges semaine" value="7" sub="dont 2 Or" />
          <StatCard label="⚠️ Atrophie" value="2" sub="à relancer" />
        </div>

        <div className="flex flex-wrap gap-stack-xs">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>Tous</FilterChip>
          <FilterChip active={filter === 'active'} onClick={() => setFilter('active')}>Actifs</FilterChip>
          <FilterChip active={filter === 'at-risk'} onClick={() => setFilter('at-risk')}>À risque</FilterChip>
        </div>

        <SectionCard title="Apprenants assignés" description="Cliquez sur un apprenant pour voir son détail">
          <div className="flex flex-col gap-stack-xs">
            {filtered.map((l) => (
              <Card key={l.name} className="p-4 flex items-center gap-stack">
                <Avatar initials={l.initials} size="md" />
                <div className="flex-1">
                  <div className="font-semibold flex items-center gap-stack-xs">
                    {l.name}
                    {l.atrophyDays && <AtrophieIndicator daysSinceActivity={l.atrophyDays} />}
                  </div>
                  <div className="flex items-center gap-stack-xs text-caption text-ink-500 mt-1">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-secondary-500" /> {l.streak}j</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-accent-400" /> {l.badges}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-info-fg" /> {l.xpWeek} XP</span>
                  </div>
                </div>
                <div className="w-32">
                  <ProgressBar value={(l.xpWeek / 500) * 100} max={100} tone="warm" />
                </div>
                <Badge variant={l.trend === 'up' ? 'success' : l.trend === 'down' ? 'danger' : 'neutral'}>
                  {l.trend === 'up' ? '↑' : l.trend === 'down' ? '↓' : '→'}
                </Badge>
              </Card>
            ))}
          </div>
        </SectionCard>

        {LEARNERS.some((l) => l.atrophyDays) && (
          <Card className="p-4 bg-warning-bg border-warning-base/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning-fg mt-1" />
            <div>
              <div className="font-semibold mb-1">2 apprenants en atrophie</div>
              <p className="text-body-sm text-ink-700">Sara C. (95 jours) et Anna R. (32 jours) n'ont pas validé d'activité récemment. Pense à les recontacter.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoachEngagement;
