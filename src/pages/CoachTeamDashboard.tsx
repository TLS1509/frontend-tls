import React, { useState } from 'react';
import { Users, TrendingUp, Calendar, BarChart3, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProfileCard } from '../components/ui/ProfileCard';
import { Tabs } from '../components/ui/Tabs';
import { CardGrid } from '../components/patterns/CardGrid';

// ─── Mock data ────────────────────────────────────────────────────────────────

const TEAM_STATS = {
  total: 8,
  active: 6,
  stuck: 2,
  avgDreyfus: 3.1,
  avgStreak: 9,
  sessionsThisMonth: 12,
  correctionsQueue: 4,
};

const WEEKLY_ACTIVITY = [
  { day: 'Lun', sessions: 3, corrections: 1 },
  { day: 'Mar', sessions: 2, corrections: 2 },
  { day: 'Mer', sessions: 4, corrections: 0 },
  { day: 'Jeu', sessions: 1, corrections: 3 },
  { day: 'Ven', sessions: 3, corrections: 1 },
];

const TOP_PROGRESSORS = [
  { name: 'Nadia Ferreira', initials: 'NF', progress: '+2 niveaux', role: 'Directrice Marketing', tags: ['D4 Leadership'] },
  { name: 'Camille Durand', initials: 'CD', progress: '+3 niveaux', role: 'Directrice Commerciale', tags: ['D5 Expertise'] },
  { name: 'Sophie Martin', initials: 'SM', progress: '+1 niveau', role: 'Manager d\'équipe', tags: ['D3 Leadership'] },
];

const UPCOMING_SESSIONS = [
  { id: 1, apprenant: 'Sophie Martin', initials: 'SM', date: '20 mai 14h00', type: 'Coaching individuel', status: 'confirmed' },
  { id: 2, apprenant: 'Pierre Bernard', initials: 'PB', date: '22 mai 10h00', type: 'Bilan progression', status: 'pending' },
  { id: 3, apprenant: 'Nadia Ferreira', initials: 'NF', date: '23 mai 16h00', type: 'Coaching individuel', status: 'confirmed' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachTeamDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Coach · Équipe"
        title="Tableau de Bord Équipe"
        subtitle="Vue d'ensemble de la progression de toute ton équipe — activité, niveaux Dreyfus, sessions et corrections."
        tone="warm"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="glass-light-ghost" size="md" leadingIcon={<Calendar size={16} />}>
              Planifier une session
            </Button>
            <Button variant="glass" size="md" leadingIcon={<Users size={16} />}>
              Voir tous les profils
            </Button>
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard value={TEAM_STATS.total} label="Apprenants" size="sm" />
          <StatCard
            value={TEAM_STATS.stuck}
            label="En difficulté"
            variant="warm"
            size="sm"
            delta={TEAM_STATS.stuck > 0 ? 'Action recommandée' : 'RAS'}
            deltaDirection={TEAM_STATS.stuck > 0 ? 'down' : 'up'}
          />
          <StatCard
            value={`D${TEAM_STATS.avgDreyfus.toFixed(1)}`}
            label="Dreyfus moyen"
            variant="brand"
            size="sm"
            delta="↑ 0.3 ce mois"
            deltaDirection="up"
          />
          <StatCard
            value={TEAM_STATS.correctionsQueue}
            label="Corrections en attente"
            size="sm"
          />
        </div>

        {/* Alert */}
        {TEAM_STATS.stuck > 0 && (
          <div className="flex items-start gap-stack p-4 bg-warning-bg border border-warning-border rounded-xl">
            <AlertTriangle size={18} className="text-warning-fg shrink-0 mt-0.5" />
            <p className="text-body-sm text-ink-700">
              <strong>{TEAM_STATS.stuck} apprenants</strong> nécessitent une attention particulière. Planifie un bilan de progression cette semaine.
            </p>
            <Button variant="ghost" size="sm" className="shrink-0 ml-auto">
              Planifier
            </Button>
          </div>
        )}

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Vue d\'ensemble' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'top', label: 'Top progresseurs' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === 'overview' && (
          <div className="flex flex-col gap-section">

            {/* Activity chart (simplified) */}
            <SectionCard title="Activité hebdomadaire" icon={<BarChart3 size={18} />}>
              <div className="flex items-end gap-3 h-32 px-2">
                {WEEKLY_ACTIVITY.map(({ day, sessions, corrections }) => {
                  const maxVal = 5;
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
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
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-caption text-ink-500">
                  <span className="w-3 h-3 rounded-sm bg-secondary-300" /> Sessions
                </div>
                <div className="flex items-center gap-1.5 text-caption text-ink-500">
                  <span className="w-3 h-3 rounded-sm bg-primary-300" /> Corrections
                </div>
              </div>
            </SectionCard>

            {/* Dreyfus distribution */}
            <SectionCard title="Distribution Dreyfus" icon={<TrendingUp size={18} />}>
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((level) => {
                  const count = [1, 2, 3, 2, 0][level - 1];
                  const pct = Math.round((count / TEAM_STATS.total) * 100);
                  return (
                    <div key={level} className="flex items-center gap-stack">
                      <span className="text-caption font-semibold text-ink-600 w-6">D{level}</span>
                      <div className="flex-1">
                        <ProgressBar value={pct} tone="primary" size="sm" />
                      </div>
                      <span className="text-caption text-ink-500 w-16 text-right">{count} apprenant{count !== 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'sessions' && (
          <SectionCard title="Prochaines sessions" icon={<Calendar size={18} />}>
            <div className="flex flex-col gap-2">
              {UPCOMING_SESSIONS.map((s) => (
                <Card key={s.id} variant="default" className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-stack">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-50 text-secondary-600 text-caption font-bold shrink-0">
                      {s.initials}
                    </span>
                    <div className="flex flex-col gap-tight">
                      <span className="text-body-sm font-medium text-ink-900">{s.apprenant}</span>
                      <span className="text-caption text-ink-400">{s.date} · {s.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.status === 'confirmed' ? 'success' : 'warning'} size="sm">
                      {s.status === 'confirmed' ? 'Confirmée' : 'En attente'}
                    </Badge>
                    <Button variant="ghost" size="sm">Préparer</Button>
                  </div>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === 'top' && (
          <SectionCard title="Top progresseurs ce mois" icon={<TrendingUp size={18} />}>
            <div className="grid md:grid-cols-3 gap-stack">
              {TOP_PROGRESSORS.map((p, i) => (
                <div key={p.name} className="relative">
                  {i === 0 && (
                    <span className="absolute -top-2 -right-2 z-base inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-400 text-white text-micro font-bold">1</span>
                  )}
                  <ProfileCard
                    name={p.name}
                    role={p.role}
                    initials={p.initials}
                    tags={p.tags}
                    variant="default"
                    alignment="center"
                    cta={<Badge variant="success" size="sm">{p.progress}</Badge>}
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}
