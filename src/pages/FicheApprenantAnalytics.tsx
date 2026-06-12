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
import { useAnalyticsStore } from '../stores/persistence';
import { Container } from '../components/layout';
import { MOCK_COACH_ID } from '../data/analytics';
import type { LearnerStatus } from '../types/learning';

const STATUS_LABEL: Record<LearnerStatus, string> = {
  'on-track': 'En progression',
  'at-risk': 'À risque',
  'stuck': 'Bloqué',
};

const STATUS_VARIANT: Record<LearnerStatus, 'success' | 'warm' | 'danger'> = {
  'on-track': 'success',
  'at-risk': 'warm',
  'stuck': 'danger',
};

function formatRelativeDate(isoDate: string): string {
  const days = Math.round((Date.now() - new Date(isoDate).getTime()) / 86400000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return 'Il y a 1 jour';
  return `Il y a ${days} jours`;
}

function dreyfusLabel(level: number): string {
  return ['', 'Novice', 'Apprenant', 'Compétent', 'Expert', 'Maître'][level] ?? 'D?';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FicheApprenantAnalytics() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<'overview' | 'heatmap' | 'activity'>('overview');

  const analyticsStore = useAnalyticsStore();
  // Seed coach profiles then find the specific learner
  analyticsStore.getLearnerProfiles(MOCK_COACH_ID);
  const learner = id ? analyticsStore.getLearnerById(id) : undefined;

  if (!learner) {
    return (
      <div className="flex flex-col gap-section">
        <EditorialHero eyebrow="Coach · Fiche Apprenant" title="Apprenant introuvable" summary="Cet apprenant n'est pas dans ton équipe." tone="warm" />
        <Container width="wide" padding={false} className="px-stack md:px-section">
          <p className="text-body-sm text-ink-500">Aucune donnée pour l'identifiant : {id}</p>
        </Container>
      </div>
    );
  }

  const radarAxes = learner.competencyScores.map((cs) => ({
    label: cs.label,
    current: cs.current,
    target: cs.target,
  }));

  const skillBars = learner.competencyScores.map((cs) => ({
    label: cs.label,
    value: cs.current,
    max: 5,
  }));

  const heatmapAxes = learner.competencyScores.map((cs) => cs.label);
  const heatmapRows = [{
    name: learner.name,
    initials: learner.initials,
    scores: learner.competencyScores.map((cs) => cs.current),
  }];

  const dreyfusLevelRound = Math.round(learner.dreyfusAvg);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Fiche Apprenant"
        title={learner.name}
        summary={learner.role}
        tone="warm"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <Button variant="ghost" size="md" leadingIcon={<MessageSquare size={16} />}>
              Envoyer un message
            </Button>
            <Button variant="glass" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* Profile header */}
        <Card variant="default" className="flex items-center gap-section p-stack-lg flex-wrap">
          <Avatar name={learner.name} initials={learner.initials} size="xl" />
          <div className="flex flex-col gap-tight flex-1">
            <div className="flex items-center gap-stack-xs flex-wrap">
              <h2 className="text-h3 font-display font-bold text-ink-900">{learner.name}</h2>
              <Badge variant={STATUS_VARIANT[learner.status]} size="md">
                {STATUS_LABEL[learner.status]}
              </Badge>
              <Badge variant="info" size="md">D{dreyfusLevelRound} {dreyfusLabel(dreyfusLevelRound)}</Badge>
              <AtrophieIndicator daysSinceActivity={learner.daysSinceActivity} />
            </div>
            <p className="text-body-sm text-ink-500">{learner.role}</p>
          </div>
          <div className="w-full md:w-48">
            <div className="flex justify-between text-caption text-ink-500 mb-1">
              <span>Objectif</span>
              <span>{learner.progressPercent}%</span>
            </div>
            <ProgressBar value={learner.progressPercent} fill="brand" size="md" />
          </div>
        </Card>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={`D${learner.dreyfusAvg.toFixed(1)}`} label="Dreyfus moyen" variant="brand" size="sm" />
          <StatCard value={`${learner.streak}j`} label="Streak actuel" variant="warm" size="sm" delta={learner.streak > 0 ? `↑ actif` : 'Inactif'} deltaDirection={learner.streak > 0 ? 'up' : 'down'} />
          <StatCard value={learner.sessionsCompleted} label="Sessions complétées" size="sm" />
          <StatCard value={`${learner.totalXp} XP`} label="Total XP" size="sm" />
        </div>

        {/* Tabs */}
        <div className="flex gap-stack-xs border-b border-ink-100">
          {(['overview', 'heatmap', 'activity'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-stack py-stack-xs text-body-sm font-semibold transition-colors duration-fast',
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
              <CompetencyRadar axes={radarAxes} size="md" showLegend />
            </SectionCard>
            <SectionCard title="Niveaux par compétence" titleIcon={<BarChart3 size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {skillBars.map((s) => <SkillBar key={s.label} label={s.label} value={s.value} />)}
              </div>
            </SectionCard>
          </div>
        )}

        {tab === 'heatmap' && (
          <SectionCard title="Détail Dreyfus par axe" titleIcon={<BarChart3 size={18} />}>
            <HeatmapGrid axes={heatmapAxes} rows={heatmapRows} showLegend />
          </SectionCard>
        )}

        {tab === 'activity' && (
          <SectionCard title="Activités récentes" titleIcon={<Clock size={18} />}>
            {learner.recentCompletions.length === 0 ? (
              <p className="text-body-sm text-ink-500">Aucune activité récente enregistrée.</p>
            ) : (
              <div className="flex flex-col gap-stack-xs">
                {learner.recentCompletions.map((a) => (
                  <Card key={a.id} variant="default" className="flex items-center justify-between px-stack py-3 flex-wrap gap-stack-xs">
                    <div className="flex items-center gap-stack-xs">
                      <Badge variant="neutral" size="sm">{a.itemType}</Badge>
                      <span className="text-body-sm text-ink-800">{a.itemLabel}</span>
                    </div>
                    <div className="flex items-center gap-stack-xs flex-wrap">
                      {a.npsGiven !== undefined && (
                        <span className="text-caption text-ink-400">NPS {a.npsGiven}/10</span>
                      )}
                      <span className="text-caption text-ink-400">{formatRelativeDate(a.completedAt)}</span>
                      <Badge variant="success" size="sm">+{a.xpEarned} XP</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </SectionCard>
        )}

      </Container>
    </div>
  );
}
