import React, { useState } from 'react';
import { Users, ClipboardCheck, TrendingUp } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Tabs } from '../components/ui/Tabs';
import { Avatar } from '../components/ui/Avatar';
import { Container } from '../components/layout';
import { useEnterpriseStore, useCoachingStore } from '../stores/persistence';
import { MOCK_COMPANY_ID } from '../data/enterprise';
import { MOCK_USER_ID } from '../data/passeport';
import { getCompetenceById } from '../data/competencies';

const MEMBER_STATUS_VARIANT: Record<string, 'success' | 'warm' | 'info' | 'neutral'> = {
  active: 'success',
  pending: 'warm',
  suspended: 'neutral',
};

const CoachEnterpriseDashboard: React.FC = () => {
  const [tab, setTab] = useState<'roster' | 'queue' | 'analytics'>('roster');

  const enterpriseStore = useEnterpriseStore();
  const coachingStore = useCoachingStore();

  const members = enterpriseStore.getMembers(MOCK_COMPANY_ID);
  const stats = enterpriseStore.getStats(MOCK_COMPANY_ID);

  const pendingCorrections = coachingStore
    .getCorrections(MOCK_USER_ID)
    .filter((c) => c.status === 'pending');

  const formatDate = (iso: string) => {
    const diff = Math.round((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "aujourd'hui" : diff === 1 ? 'il y a 1 jour' : `il y a ${diff} jours`;
  };

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coach Enterprise · Vue équipe"
        title="Mon équipe Acme Corp"
        summary="Team roster, validation queue et analytics agrégés"
        tone="warm"
      />

      <Container width="page" padding={false} className="px-stack py-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Apprenants suivis" value={stats.activeMembers} sub={`${members.length} membres total`} />
          <StatCard label="Taux de complétion" value={`${stats.completionRate}%`} sub="formations" />
          <StatCard label="Queue validation" value={pendingCorrections.length} sub="à reviewer" />
          <StatCard label="Engagement" value={`${stats.engagementRate}%`} sub="hebdomadaire" />
        </div>

        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          items={[
            { id: 'roster', label: 'Team Roster' },
            { id: 'queue', label: 'Validation Queue' },
            { id: 'analytics', label: 'Team Analytics' },
          ]}
        />

        {tab === 'roster' && (
          <SectionCard title="Apprenants assignés" description="Statut et progression par membre de l'équipe">
            <div className="flex flex-col gap-stack-xs">
              {members.map((m) => (
                <Card key={m.id} className="p-stack flex items-center gap-stack">
                  <Avatar initials={m.name.split(' ').map((n) => n[0]).join('').slice(0, 2)} size="md" />
                  <div className="flex-1">
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-caption text-ink-500">{m.role} · {m.progressPercent}% progression</div>
                  </div>
                  <Badge variant={MEMBER_STATUS_VARIANT[m.status]}>{m.status}</Badge>
                  <Button variant="ghost" size="sm">Voir fiche</Button>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === 'queue' && (
          <SectionCard title="Validation Queue" description="Corrections soumises en attente de review">
            {pendingCorrections.length === 0 ? (
              <p className="text-body-sm text-ink-500 m-0">Aucune correction en attente.</p>
            ) : (
              <div className="flex flex-col gap-stack-xs">
                {pendingCorrections.map((c) => {
                  const competence = c.competenceId ? getCompetenceById(c.competenceId) : null;
                  return (
                    <Card key={c.id} className="p-stack flex items-center gap-stack">
                      <ClipboardCheck className="w-6 h-6 text-secondary-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{c.exerciseTitle}</div>
                        <div className="text-caption text-ink-500">{formatDate(c.submittedAt)}</div>
                      </div>
                      {competence && <Badge variant="brand">{competence.label}</Badge>}
                      <Button variant="warm" size="sm">Reviewer</Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </SectionCard>
        )}

        {tab === 'analytics' && (
          <SectionCard title="Team Analytics" description="Tendances de complétion et engagement">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              <Card className="p-stack-lg">
                <TrendingUp className="w-6 h-6 text-success-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux de complétion</div>
                <div className="text-h2 font-bold">{stats.completionRate}%</div>
                <div className="text-caption text-ink-500">formations actives : {stats.activeFormations}</div>
              </Card>
              <Card className="p-stack-lg">
                <Users className="w-6 h-6 text-info-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux d'engagement hebdomadaire</div>
                <div className="text-h2 font-bold">{stats.engagementRate}%</div>
                <div className="text-caption text-ink-500">{stats.activeMembers} / {members.length} apprenants actifs</div>
              </Card>
            </div>
          </SectionCard>
        )}
      </Container>
    </div>
  );
};

export default CoachEnterpriseDashboard;
