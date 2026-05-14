import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Users, Clock, CheckCircle2 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FilterChip } from '../components/ui/FilterChip';
import { Tabs } from '../components/ui/Tabs';
import { ProfileCard } from '../components/ui/ProfileCard';

// ─── Mock data ────────────────────────────────────────────────────────────────

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'quarter', label: 'Trimestre' },
];

const TAB_ITEMS = [
  { id: 'global', label: 'Vue globale' },
  { id: 'competences', label: 'Par compétence' },
  { id: 'corrections', label: 'Corrections' },
];

const ENGAGEMENT_WEEKS = [65, 72, 68, 75, 80, 71, 78, 72];

const DREYFUS_DISTRIBUTION = [
  { level: 'D1', label: 'Novice', count: 1, pct: 6 },
  { level: 'D2', label: 'Débutant avancé', count: 5, pct: 28 },
  { level: 'D3', label: 'Compétent', count: 8, pct: 44 },
  { level: 'D4', label: 'Performant', count: 3, pct: 17 },
  { level: 'D5', label: 'Expert', count: 1, pct: 6 },
];

const TOP_PROGRESSORS = [
  {
    name: 'Marie Dupont',
    initials: 'MD',
    role: 'Dreyfus +0.8 ce mois',
    specialties: ['Leadership', 'Communication'],
  },
  {
    name: 'Thomas Renard',
    initials: 'TR',
    role: 'Dreyfus +0.6 ce mois',
    specialties: ['Analyse', 'Tech'],
  },
  {
    name: 'Sophie Martin',
    initials: 'SM',
    role: 'Dreyfus +0.5 ce mois',
    specialties: ['Créativité', 'Coopération'],
  },
];

const COMPETENCES = [
  { label: 'Leadership', value: 3.2, pct: 64, badge: 'info' as const },
  { label: 'Communication', value: 3.5, pct: 70, badge: 'success' as const },
  { label: 'Analyse', value: 2.8, pct: 56, badge: 'warning' as const },
  { label: 'Tech', value: 3.7, pct: 74, badge: 'success' as const },
  { label: 'Créativité', value: 2.4, pct: 48, badge: 'warning' as const },
  { label: 'Coopération', value: 3.1, pct: 62, badge: 'info' as const },
];

const CORRECTIONS_PENDING = [
  {
    id: 1,
    apprenant: 'Marc Leroy',
    exercice: 'Étude de cas leadership',
    competence: 'Leadership',
    delai: 'Il y a 2 jours',
  },
  {
    id: 2,
    apprenant: 'Julie Perrin',
    exercice: 'Synthèse analytique Q2',
    competence: 'Analyse',
    delai: 'Il y a 3 jours',
  },
  {
    id: 3,
    apprenant: 'Kevin Blanc',
    exercice: 'Pitch créativité',
    competence: 'Créativité',
    delai: 'Il y a 4 jours',
  },
  {
    id: 4,
    apprenant: 'Nadia Koury',
    exercice: 'Atelier communication',
    competence: 'Communication',
    delai: 'Il y a 5 jours',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachAnalytics() {
  const [activePeriod, setActivePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('global');

  const maxEngagement = Math.max(...ENGAGEMENT_WEEKS);

  return (
    <div className="flex flex-col gap-section">
      {/* Hero */}
      <EditorialHero
        eyebrow={{ label: 'Coach · Analytics' }}
        title="Analytics Équipe"
        summary="Suivi de l'engagement, de la progression Dreyfus et de l'activité de correction de ta cohorte."
        tone="warm"
        trailing={
          <div className="flex flex-wrap gap-2">
            {PERIOD_OPTIONS.map((p) => (
              <FilterChip
                key={p.id}
                label={p.label}
                active={activePeriod === p.id}
                onClick={() => setActivePeriod(p.id)}
              />
            ))}
          </div>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack">
          <StatCard
            icon={<Users size={20} />}
            value="18"
            label="Apprenants actifs"
            delta="↑ 2 ce mois"
            deltaDirection="up"
            variant="brand"
            size="md"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            value="D3.2"
            label="Dreyfus moyen"
            delta="↑ 0.3 ce trimestre"
            deltaDirection="up"
            size="md"
          />
          <StatCard
            icon={<BarChart3 size={20} />}
            value="72"
            sub="%"
            label="Taux engagement"
            delta="↑ 5%"
            deltaDirection="up"
            size="md"
          />
          <StatCard
            icon={<Clock size={20} />}
            value="4"
            label="Corrections en attente"
            variant="warm"
            size="md"
          />
        </div>

        {/* Tabs */}
        <Tabs
          items={TAB_ITEMS}
          value={activeTab}
          onChange={setActiveTab}
          variant="underline"
        />

        {/* Tab : Vue globale */}
        {activeTab === 'global' && (
          <div className="flex flex-col gap-section">
            {/* Engagement chart */}
            <SectionCard
              title="Engagement hebdomadaire"
              titleIcon={<BarChart3 size={18} className="text-secondary-600" />}
            >
              <div className="flex items-end gap-2 h-32 pt-2">
                {ENGAGEMENT_WEEKS.map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                    <span className="text-micro text-ink-500 font-medium tabular-nums">{val}%</span>
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-secondary-600 to-secondary-400 transition-all duration-slow"
                      style={{ height: `${(val / maxEngagement) * 80}px` }}
                    />
                    <span className="text-micro text-ink-400 font-medium">S{i + 1}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Distribution Dreyfus */}
            <SectionCard
              title="Distribution Dreyfus"
              titleIcon={<TrendingUp size={18} className="text-primary-600" />}
            >
              <div className="flex flex-col gap-stack">
                {DREYFUS_DISTRIBUTION.map((d) => (
                  <div key={d.level} className="flex items-center gap-stack">
                    <span className="w-8 shrink-0 font-display text-body-sm font-bold text-ink-700">
                      {d.level}
                    </span>
                    <span className="w-36 shrink-0 text-caption text-ink-500 hidden sm:block">
                      {d.label}
                    </span>
                    <div className="flex-1">
                      <ProgressBar value={d.pct} fill="brand" size="sm" valueLabel={false} />
                    </div>
                    <span className="w-20 shrink-0 text-caption text-ink-600 font-semibold text-right">
                      {d.count} apprenant{d.count > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Top progressors */}
            <SectionCard
              title="Top progression ce mois"
              titleIcon={<Award size={18} className="text-accent-700" />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                {TOP_PROGRESSORS.map((p) => (
                  <ProfileCard
                    key={p.name}
                    name={p.name}
                    initials={p.initials}
                    role={p.role}
                    specialties={p.specialties}
                    tone="warm"
                    variant="compact"
                    align="center"
                  />
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab : Par compétence */}
        {activeTab === 'competences' && (
          <div className="flex flex-col gap-section">
            <SectionCard title="Dreyfus moyen par compétence">
              <div className="flex flex-col gap-stack">
                {COMPETENCES.map((c) => (
                  <div key={c.label} className="flex items-center gap-stack">
                    <span className="w-32 shrink-0 text-body-sm font-semibold text-ink-700">
                      {c.label}
                    </span>
                    <div className="flex-1">
                      <ProgressBar value={c.pct} fill="brand" size="sm" valueLabel={false} />
                    </div>
                    <Badge variant={c.badge} size="sm">
                      D{c.value.toFixed(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* Tab : Corrections */}
        {activeTab === 'corrections' && (
          <div className="flex flex-col gap-section">
            {/* Summary KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
              <StatCard
                icon={<Clock size={20} />}
                value="4"
                label="En attente"
                variant="warm"
                size="md"
              />
              <StatCard
                icon={<CheckCircle2 size={20} />}
                value="12"
                label="Traitées ce mois"
                variant="brand"
                size="md"
              />
              <StatCard
                icon={<TrendingUp size={20} />}
                value="83"
                sub="%"
                label="Taux retour 48h"
                deltaDirection="up"
                delta="↑ 5%"
                size="md"
              />
            </div>

            {/* Pending corrections */}
            <SectionCard
              title="Résumé corrections"
              actions={
                <Button variant="primary" size="md">
                  Aller à la queue
                </Button>
              }
            >
              <Card variant="tinted" tone="warm" className="p-0 overflow-hidden">
                <div className="flex flex-col divide-y divide-secondary-100">
                  {CORRECTIONS_PENDING.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-stack-xs px-4 py-3"
                    >
                      <span className="font-display text-body-sm font-bold text-ink-900 w-36 shrink-0">
                        {c.apprenant}
                      </span>
                      <span className="flex-1 text-body-sm text-ink-700">{c.exercice}</span>
                      <Badge variant="info" size="sm">
                        {c.competence}
                      </Badge>
                      <span className="text-caption text-ink-500 shrink-0">{c.delai}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </SectionCard>
          </div>
        )}

      </div>
    </div>
  );
}
