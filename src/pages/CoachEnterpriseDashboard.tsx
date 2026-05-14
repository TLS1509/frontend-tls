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

const ROSTER = [
  { name: 'Léa Martin', initials: 'LM', dept: 'Produit', jacStatus: 'validated', jacCount: 3 },
  { name: 'Tom Bernard', initials: 'TB', dept: 'Marketing', jacStatus: 'pending', jacCount: 1 },
  { name: 'Sara Costa', initials: 'SC', dept: 'Sales', jacStatus: 'in-review', jacCount: 2 },
  { name: 'Jules Petit', initials: 'JP', dept: 'Tech', jacStatus: 'validated', jacCount: 4 },
];

const VALIDATION_QUEUE = [
  { id: '1', learner: 'Tom Bernard', initials: 'TB', exercise: 'Pitch produit Q2', submitted: 'il y a 1 jour', competence: 'Communication' },
  { id: '2', learner: 'Sara Costa', initials: 'SC', exercise: 'Plan de vente B2B', submitted: 'il y a 2 jours', competence: 'Stratégie' },
  { id: '3', learner: 'Sara Costa', initials: 'SC', exercise: 'Analyse concurrentielle', submitted: 'il y a 3 jours', competence: 'Analyse' },
];

const STATUS_VARIANT: Record<string, 'success' | 'warm' | 'info'> = {
  validated: 'success',
  pending: 'warm',
  'in-review': 'info',
};

const CoachEnterpriseDashboard: React.FC = () => {
  const [tab, setTab] = useState<'roster' | 'queue' | 'analytics'>('roster');

  return (
    <div className="min-h-screen bg-surface">
      <EditorialHero
        eyebrow="Coach Enterprise · Vue équipe"
        title="Mon équipe Acme Corp"
        description="Team roster, validation queue JAC et analytics agrégés"
        tone="warm"
      />

      <div className="max-w-page mx-auto px-4 py-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Apprenants suivis" value="12" sub="4 départements" />
          <StatCard label="JAC validés YTD" value="34" sub="+8 ce trimestre" />
          <StatCard label="Queue validation" value="3" sub="à reviewer" />
          <StatCard label="Compétence #1" value="Communication" sub="92% couverture" />
        </div>

        <Tabs
          value={tab}
          onChange={(v) => setTab(v as typeof tab)}
          items={[
            { value: 'roster', label: 'Team Roster' },
            { value: 'queue', label: 'Validation Queue' },
            { value: 'analytics', label: 'Team Analytics' },
          ]}
        />

        {tab === 'roster' && (
          <SectionCard title="Apprenants assignés" description="Statut JAC par membre de l'équipe">
            <div className="flex flex-col gap-stack-xs">
              {ROSTER.map((r) => (
                <Card key={r.name} className="p-4 flex items-center gap-stack">
                  <Avatar initials={r.initials} size="md" />
                  <div className="flex-1">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-caption text-ink-500">{r.dept}</div>
                  </div>
                  <Badge variant={STATUS_VARIANT[r.jacStatus]}>{r.jacCount} JAC {r.jacStatus}</Badge>
                  <Button variant="ghost" size="sm">Voir fiche</Button>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === 'queue' && (
          <SectionCard title="Validation Queue" description="JAC soumis prêts pour review">
            <div className="flex flex-col gap-stack-xs">
              {VALIDATION_QUEUE.map((q) => (
                <Card key={q.id} className="p-4 flex items-center gap-stack">
                  <ClipboardCheck className="w-6 h-6 text-warm-fg" />
                  <Avatar initials={q.initials} size="sm" />
                  <div className="flex-1">
                    <div className="font-semibold">{q.exercise}</div>
                    <div className="text-caption text-ink-500">{q.learner} · {q.submitted}</div>
                  </div>
                  <Badge variant="brand">{q.competence}</Badge>
                  <Button variant="warm" size="sm">Reviewer</Button>
                </Card>
              ))}
            </div>
          </SectionCard>
        )}

        {tab === 'analytics' && (
          <SectionCard title="Team Analytics" description="Tendances de complétion et performance compétences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
              <Card className="p-6">
                <TrendingUp className="w-6 h-6 text-success-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux de complétion JAC</div>
                <div className="text-h2 font-bold">87%</div>
                <div className="text-caption text-ink-500">+12 pts vs trimestre précédent</div>
              </Card>
              <Card className="p-6">
                <Users className="w-6 h-6 text-info-fg mb-stack-xs" />
                <div className="font-semibold mb-1">Taux d'engagement hebdomadaire</div>
                <div className="text-h2 font-bold">92%</div>
                <div className="text-caption text-ink-500">11 / 12 apprenants actifs</div>
              </Card>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
};

export default CoachEnterpriseDashboard;
