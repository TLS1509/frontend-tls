import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Calendar, BarChart3, AlertTriangle, ChevronRight } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProfileCard } from '../components/ui/ProfileCard';
import { Tabs } from '../components/ui/Tabs';
import { FilterChip } from '../components/ui/FilterChip';
import { Container } from '../components/layout';
import { useAnalyticsStore } from '../stores/persistence';
import { MOCK_COACH_ID } from '../data/analytics';
import type { LearnerStatus } from '../types/learning';

// ─── Status config ────────────────────────────────────────────────────────────

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

const WEEKLY_ACTIVITY = [
  { day: 'Lun', sessions: 3, corrections: 1 },
  { day: 'Mar', sessions: 2, corrections: 2 },
  { day: 'Mer', sessions: 4, corrections: 0 },
  { day: 'Jeu', sessions: 1, corrections: 3 },
  { day: 'Ven', sessions: 3, corrections: 1 },
];

function formatLastActive(daysSince: number): string {
  if (daysSince === 0) return "Aujourd'hui";
  if (daysSince === 1) return 'Il y a 1 jour';
  return `Il y a ${daysSince} jours`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachTeamDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<LearnerStatus | 'all'>('all');

  const analyticsStore = useAnalyticsStore();
  const learners = analyticsStore.getLearnerProfiles(MOCK_COACH_ID);
  const stats = analyticsStore.getTeamStats(MOCK_COACH_ID);

  const filteredLearners = useMemo(() => {
    if (statusFilter === 'all') return learners;
    return learners.filter((l) => l.status === statusFilter);
  }, [learners, statusFilter]);

  const topProgressors = useMemo(
    () => [...learners].sort((a, b) => b.progressPercent - a.progressPercent).slice(0, 3),
    [learners]
  );

  const alertCount = stats.stuckCount + stats.atRiskCount;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Équipe"
        title="Tableau de Bord Équipe"
        summary="Vue d'ensemble de la progression de toute ton équipe : activité, niveaux Dreyfus, sessions et corrections."
        tone="flat"
        trailing={
          <div className="flex items-center gap-stack-xs">
            <Button variant="ghost" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
            <Button variant="glass" size="md" leadingIcon={<Users size={16} />}>
              Voir tous les profils
            </Button>
          </div>
        }
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={stats.totalLearners} label="Apprenants" size="sm" />
          <StatCard
            value={stats.stuckCount}
            label="Bloqués"
            variant="warm"
            size="sm"
            delta={stats.stuckCount > 0 ? 'Action recommandée' : 'RAS'}
            deltaDirection={stats.stuckCount > 0 ? 'down' : 'up'}
          />
          <StatCard
            value={`D${stats.avgDreyfus.toFixed(1)}`}
            label="Dreyfus moyen"
            variant="brand"
            size="sm"
            delta="↑ 0.3 ce mois"
            deltaDirection="up"
          />
          <StatCard
            value={stats.correctionsQueue}
            label="Corrections en attente"
            size="sm"
          />
        </div>

        {/* Alert */}
        {alertCount > 0 && (
          <div className="flex items-start gap-stack p-stack bg-warning-bg border border-warning-border rounded-xl">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <p className="text-body-sm text-ink-700">
              <strong>{stats.stuckCount} bloqué{stats.stuckCount !== 1 ? 's' : ''}</strong> et{' '}
              <strong>{stats.atRiskCount} à risque</strong> : planifie un bilan cette semaine.
            </p>
            <Button variant="ghost" size="sm" className="shrink-0 ml-auto">
              Planifier
            </Button>
          </div>
        )}

        {/* Tabs */}
        <Tabs
          items={[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'apprenants', label: `Apprenants (${stats.totalLearners})` },
            { id: 'top', label: 'Top progresseurs' },
          ]}
          value={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">
            {/* Activity chart */}
            <SectionCard title="Activité hebdomadaire" titleIcon={<BarChart3 size={18} />}>
              <div className="flex items-end gap-stack-xs h-32 px-2">
                {WEEKLY_ACTIVITY.map(({ day, sessions, corrections }) => {
                  const maxVal = 5;
                  return (
                    <div key={day} className="flex flex-col items-center gap-tight flex-1">
                      <div className="flex items-end gap-0.5 h-24 w-full">
                        <div
                          className="flex-1 bg-secondary-300 rounded-t-sm transition-all duration-slow"
                          style={{ height: `${(sessions / maxVal) * 100}%` }}
                          title={`${sessions} sessions`}
                        />
                        <div
                          className="flex-1 bg-primary-300 rounded-t-sm transition-all duration-slow"
                          style={{ height: `${(corrections / maxVal) * 100}%` }}
                          title={`${corrections} corrections`}
                        />
                      </div>
                      <span className="text-micro text-ink-400">{day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-stack mt-stack-xs">
                <div className="flex items-center gap-tight.5 text-caption text-ink-500">
                  <span className="w-3 h-3 rounded-sm bg-secondary-300" /> Sessions
                </div>
                <div className="flex items-center gap-tight.5 text-caption text-ink-500">
                  <span className="w-3 h-3 rounded-sm bg-primary-300" /> Corrections
                </div>
              </div>
            </SectionCard>

            {/* Dreyfus distribution */}
            <SectionCard title="Distribution Dreyfus" titleIcon={<TrendingUp size={18} />}>
              <div className="flex flex-col gap-stack-xs">
                {[1, 2, 3, 4, 5].map((level) => {
                  const count = learners.filter((l) => Math.round(l.dreyfusAvg) === level).length;
                  const pct = stats.totalLearners > 0 ? Math.round((count / stats.totalLearners) * 100) : 0;
                  return (
                    <div key={level} className="flex items-center gap-stack">
                      <span className="text-caption font-semibold text-ink-600 w-6">D{level}</span>
                      <div className="flex-1">
                        <ProgressBar value={pct} fill="brand" size="sm" />
                      </div>
                      <span className="text-caption text-ink-500 w-16 text-right">{count} apprenant{count !== 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'apprenants' && (
          <div className="flex flex-col gap-section">
            {/* Status filter chips */}
            <div className="flex flex-wrap gap-stack-xs">
              {(['all', 'on-track', 'at-risk', 'stuck'] as const).map((s) => {
                const count = s === 'all' ? learners.length : learners.filter((l) => l.status === s).length;
                return (
                  <FilterChip
                    key={s}
                    label={s === 'all' ? `Tous (${count})` : `${STATUS_LABEL[s]} (${count})`}
                    active={statusFilter === s}
                    onClick={() => setStatusFilter(s)}
                  />
                );
              })}
            </div>

            {/* Learner list */}
            <div className="flex flex-col gap-stack-xs">
              {filteredLearners.length === 0 ? (
                <p className="text-body-sm text-ink-500 py-stack">Aucun apprenant dans cette catégorie.</p>
              ) : (
                filteredLearners.map((learner) => (
                  <Link key={learner.userId} to={`/coach/apprenant/${learner.userId}/analytics`} className="block">
                    <Card variant="default" className="flex items-center gap-stack px-stack py-3 hover:bg-ink-50 transition-colors duration-fast cursor-pointer">
                      {/* Avatar */}
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary-50 text-secondary-600 text-caption font-bold shrink-0">
                        {learner.initials}
                      </span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-stack-xs flex-wrap">
                          <span className="text-body-sm font-semibold text-ink-900">{learner.name}</span>
                          <Badge variant={STATUS_VARIANT[learner.status]} size="sm">
                            {STATUS_LABEL[learner.status]}
                          </Badge>
                        </div>
                        <p className="text-caption text-ink-400 truncate">{learner.role}</p>
                      </div>

                      {/* Progress */}
                      <div className="hidden md:flex flex-col items-end gap-tight w-32 shrink-0">
                        <span className="text-caption text-ink-500">Dreyfus {learner.dreyfusAvg.toFixed(1)}</span>
                        <ProgressBar value={learner.progressPercent} fill="brand" size="sm" />
                        <span className="text-micro text-ink-400">{learner.progressPercent}% objectif</span>
                      </div>

                      {/* Last activity */}
                      <span className="hidden lg:block text-caption text-ink-400 w-28 text-right shrink-0">
                        {formatLastActive(learner.daysSinceActivity)}
                      </span>

                      <ChevronRight size={16} className="text-ink-300 shrink-0" />
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'top' && (
          <SectionCard title="Top progresseurs ce mois" titleIcon={<TrendingUp size={18} />}>
            <div className="grid md:grid-cols-3 gap-stack">
              {topProgressors.map((p, i) => (
                <div key={p.userId} className="relative">
                  {i === 0 && (
                    <span className="absolute -top-2 -right-2 z-base inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-400 text-white text-micro font-bold">1</span>
                  )}
                  <ProfileCard
                    name={p.name}
                    role={p.role}
                    initials={p.initials}
                    specialties={p.competencyScores.slice(0, 2).map((c) => c.label)}
                    variant="default"
                    align="center"
                    cta={<Badge variant="success" size="sm">D{p.dreyfusAvg.toFixed(1)}</Badge>}
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        )}

      </Container>
    </div>
  );
}
