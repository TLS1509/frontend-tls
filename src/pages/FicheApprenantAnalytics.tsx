import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart3, TrendingUp, Calendar, Clock, MessageSquare } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { SkillBar } from '../components/ui/SkillBar';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { HeatmapGrid } from '../components/ui/HeatmapGrid';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';

// ─── Mock data ────────────────────────────────────────────────────────────────

const APPRENANT = {
  id: '1',
  name: 'Sophie Martin',
  initials: 'SM',
  role: 'Manager d\'équipe · Secteur IT',
  dreyfusAvg: 3.2,
  streak: 14,
  totalXp: 1240,
  lastActivity: '2 jours',
  daysSinceActivity: 2,
  sessionsCompleted: 5,
  correctionsReceived: 8,
  currentLevel: 3,
};

const RADAR_AXES = [
  { label: 'Leadership', current: 3, target: 5 },
  { label: 'Communication', current: 4, target: 4 },
  { label: 'Analyse', current: 2, target: 4 },
  { label: 'Tech & Outils', current: 4, target: 5 },
  { label: 'Créativité', current: 2, target: 3 },
  { label: 'Coopération', current: 3, target: 4 },
];

const SKILLS = [
  { label: 'Leadership & Management', value: 3, max: 5 },
  { label: 'Communication & Influence', value: 4, max: 5 },
  { label: 'Analyse & Décision', value: 2, max: 5 },
  { label: 'Tech & Outils numériques', value: 4, max: 5 },
  { label: 'Créativité & Innovation', value: 2, max: 5 },
  { label: 'Coopération & Équipe', value: 3, max: 5 },
];

const HEATMAP_AXES = ['Leadership', 'Communication', 'Analyse', 'Tech', 'Créativité', 'Coopération'];
const HEATMAP_ROWS = [
  { name: 'Sophie Martin', initials: 'SM', scores: [3, 4, 2, 4, 2, 3] },
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'Leçon', label: 'Styles de leadership situationnel', date: 'Il y a 2j', xp: 25 },
  { id: 2, type: 'Session', label: 'Coaching — bilan D3', date: 'Il y a 5j', xp: 100 },
  { id: 3, type: 'Exercice', label: 'Cas pratique : délégation', date: 'Il y a 8j', xp: 50 },
  { id: 4, type: 'Leçon', label: 'Feedback 360° en pratique', date: 'Il y a 12j', xp: 25 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FicheApprenantAnalytics() {
  const { id } = useParams<{ id: string }>();
  const _ = id;
  const [tab, setTab] = useState<'overview' | 'heatmap' | 'activity'>('overview');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Fiche Apprenant"
        title={APPRENANT.name}
        summary={APPRENANT.role}
        tone="warm"
        trailing={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" leadingIcon={<MessageSquare size={16} />}>
              Envoyer un message
            </Button>
            <Button variant="glass" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Profile header */}
        <Card variant="default" className="flex items-center gap-section p-6">
          <Avatar name={APPRENANT.name} initials={APPRENANT.initials} size="xl" />
          <div className="flex flex-col gap-tight flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-h3 font-display font-bold text-ink-900">{APPRENANT.name}</h2>
              <Badge variant="info" size="md">D{APPRENANT.currentLevel} Compétent</Badge>
              <AtrophieIndicator daysSinceActivity={APPRENANT.daysSinceActivity} />
            </div>
            <p className="text-body-sm text-ink-500">{APPRENANT.role}</p>
          </div>
        </Card>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={`D${APPRENANT.dreyfusAvg}`} label="Dreyfus moyen" variant="brand" size="sm" />
          <StatCard value={`${APPRENANT.streak}j`} label="Streak actuel" variant="warm" size="sm" delta="↑ 3j cette semaine" deltaDirection="up" />
          <StatCard value={APPRENANT.sessionsCompleted} label="Sessions complétées" size="sm" />
          <StatCard value={`${APPRENANT.totalXp} XP`} label="Total XP" size="sm" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-ink-100">
          {(['overview', 'heatmap', 'activity'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-4 py-2 text-body-sm font-semibold transition-colors duration-fast',
                tab === t ? 'text-secondary-600 border-b-2 border-secondary-500' : 'text-ink-500 hover:text-ink-900',
              ].join(' ')}
            >
              {t === 'overview' ? 'Compétences' : t === 'heatmap' ? 'Heatmap' : 'Activité'}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-section">
            <SectionCard title="Radar compétences" titleIcon={<TrendingUp size={18} />}>
              <CompetencyRadar axes={RADAR_AXES} size="md" showLegend />
            </SectionCard>
            <SectionCard title="Niveaux par compétence" titleIcon={<BarChart3 size={18} />}>
              <div className="flex flex-col gap-3">
                {SKILLS.map((s) => <SkillBar key={s.label} label={s.label} value={s.value} />)}
              </div>
            </SectionCard>
          </div>
        )}

        {tab === 'heatmap' && (
          <SectionCard title="Détail Dreyfus par axe" titleIcon={<BarChart3 size={18} />}>
            <HeatmapGrid axes={HEATMAP_AXES} rows={HEATMAP_ROWS} showLegend />
          </SectionCard>
        )}

        {tab === 'activity' && (
          <SectionCard title="Activités récentes" titleIcon={<Clock size={18} />}>
            <div className="flex flex-col gap-2">
              {RECENT_ACTIVITY.map((a) => (
                <Card key={a.id} variant="default" className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="neutral" size="sm">{a.type}</Badge>
                    <span className="text-body-sm text-ink-800">{a.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-ink-400">{a.date}</span>
                    <Badge variant="success" size="sm">+{a.xp} XP</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}
