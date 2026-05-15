import React, { useState } from 'react';
import { Users, CheckCircle2, Clock3, MessageSquare, ChevronRight, AlertTriangle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Tabs } from '../components/ui/Tabs';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { AtrophieIndicator } from '../components/ui/AtrophieIndicator';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const APPRENANTS = [
  {
    id: 1, name: 'Sophie Martin', initials: 'SM', status: 'active',
    lastActivity: '2j', jac: 82, streak: 14, dreyfus: 3.2, daysSinceActivity: 2,
    radar: [
      { label: 'Leadership', current: 3 }, { label: 'Communication', current: 4 },
      { label: 'Analyse', current: 2 }, { label: 'Tech', current: 4 },
      { label: 'Créativité', current: 2 }, { label: 'Coopération', current: 3 },
    ],
  },
  {
    id: 2, name: 'Pierre Bernard', initials: 'PB', status: 'stuck',
    lastActivity: '8j', jac: 45, streak: 0, dreyfus: 2.1, daysSinceActivity: 8,
    radar: [
      { label: 'Leadership', current: 2 }, { label: 'Communication', current: 3 },
      { label: 'Analyse', current: 1 }, { label: 'Tech', current: 2 },
      { label: 'Créativité', current: 1 }, { label: 'Coopération', current: 2 },
    ],
  },
  {
    id: 3, name: 'Nadia Ferreira', initials: 'NF', status: 'ahead',
    lastActivity: '1j', jac: 95, streak: 21, dreyfus: 4.1, daysSinceActivity: 1,
    radar: [
      { label: 'Leadership', current: 4 }, { label: 'Communication', current: 5 },
      { label: 'Analyse', current: 4 }, { label: 'Tech', current: 4 },
      { label: 'Créativité', current: 3 }, { label: 'Coopération', current: 4 },
    ],
  },
  {
    id: 4, name: 'Julien Moreau', initials: 'JM', status: 'active',
    lastActivity: '3j', jac: 70, streak: 6, dreyfus: 2.8, daysSinceActivity: 95,
    radar: [
      { label: 'Leadership', current: 3 }, { label: 'Communication', current: 3 },
      { label: 'Analyse', current: 2 }, { label: 'Tech', current: 3 },
      { label: 'Créativité', current: 2 }, { label: 'Coopération', current: 3 },
    ],
  },
];

const CORRECTIONS_QUEUE = [
  { id: 1, name: 'Sophie Martin', type: 'Mission', title: 'Atelier leadership équipe', submitted: '2h', priority: 'normal' },
  { id: 2, name: 'Pierre Bernard', type: 'JAC', title: 'JAC Analyse de données', submitted: '1j', priority: 'urgent' },
  { id: 3, name: 'Julien Moreau', type: 'Projet Final', title: 'Projet Communication avancée', submitted: '3j', priority: 'normal' },
];

const STATUS_CONFIG = {
  active: { label: 'Actif', variant: 'success' as const },
  stuck: { label: 'En difficulté', variant: 'danger' as const },
  ahead: { label: 'En avance', variant: 'brand' as const },
};

const TABS = [
  { id: 'apprenants', label: 'Mes apprenants' },
  { id: 'corrections', label: 'Corrections' },
  { id: 'sessions', label: 'Sessions' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('apprenants');
  const [selectedApprenant, setSelectedApprenant] = useState<number | null>(null);

  const selected = APPRENANTS.find((a) => a.id === selectedApprenant);

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Espace Coach"
        title="Tableau de bord Coach"
        summary="Suis la progression de tes apprenants, revois leurs travaux et planifie vos sessions."
        tone="default"
      />

      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack">
          <StatCard label="Apprenants assignés" value="4" size="sm" />
          <StatCard label="Corrections en attente" value="3" delta="urgent" deltaDirection="up" size="sm" />
          <StatCard label="Sessions cette semaine" value="2" size="sm" />
          <StatCard label="Taux JAC moyen" value="73%" delta="+5%" deltaDirection="up" size="sm" />
        </div>

        <Tabs items={TABS} value={activeTab} onChange={setActiveTab} variant="underline" />

        {/* Apprenants tab */}
        {activeTab === 'apprenants' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-section items-start">
            <div className="flex flex-col gap-stack">
              <SectionHeader
                title="Mes apprenants"
                subtitle={`${APPRENANTS.length} apprenants assignés`}
                icon={<Users size={20} />}
                tone="primary"
              />
              {APPRENANTS.map((a) => {
                const status = STATUS_CONFIG[a.status as keyof typeof STATUS_CONFIG];
                return (
                  <Card
                    key={a.id}
                    className={`p-4 flex items-start gap-4 cursor-pointer transition-all duration-base ${selectedApprenant === a.id ? 'ring-2 ring-primary-400' : 'hover:shadow-sm'}`}
                    onClick={() => setSelectedApprenant(a.id === selectedApprenant ? null : a.id)}
                  >
                    <Avatar initials={a.initials} size="md" />
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-body-sm font-semibold text-ink-900">{a.name}</span>
                        <Badge variant={status.variant} size="sm">{status.label}</Badge>
                        <AtrophieIndicator daysSinceActivity={a.daysSinceActivity} currentLevel={Math.round(a.dreyfus)} size="sm" showLabel={false} />
                      </div>
                      <div className="flex gap-4 text-caption text-ink-500 flex-wrap">
                        <span>Dernière activité : {a.lastActivity}</span>
                        <span>JAC : {a.jac}%</span>
                        <span>Dreyfus moy. : {a.dreyfus}</span>
                      </div>
                      <ProgressBar value={a.jac} fill="brand" size="sm" />
                    </div>
                    <ChevronRight size={16} className="shrink-0 text-ink-300 mt-1" />
                  </Card>
                );
              })}
            </div>

            {/* Radar detail panel */}
            {selected && (
              <div className="w-full lg:w-80 sticky top-4">
                <SectionCard
                  title={`Radar — ${selected.name}`}
                  description="Niveau actuel Dreyfus par compétence"
                >
                  <CompetencyRadar axes={selected.radar} size="sm" showLegend />
                  <Button variant="brand-ghost" size="sm" fullWidth trailingIcon={<ChevronRight size={14} />}>
                    Voir la fiche complète
                  </Button>
                </SectionCard>
              </div>
            )}
          </div>
        )}

        {/* Corrections tab */}
        {activeTab === 'corrections' && (
          <div className="flex flex-col gap-stack">
            <SectionHeader
              title="File de corrections"
              subtitle={`${CORRECTIONS_QUEUE.length} travaux en attente de review`}
              icon={<CheckCircle2 size={20} />}
              tone="primary"
            />
            {CORRECTIONS_QUEUE.length > 0 ? (
              CORRECTIONS_QUEUE.map((c) => (
                <Card key={c.id} className="p-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-body-sm font-semibold text-ink-900">{c.title}</span>
                      {c.priority === 'urgent' && <Badge variant="danger" size="sm">Urgent</Badge>}
                    </div>
                    <div className="flex gap-3 text-caption text-ink-500">
                      <span>{c.name}</span>
                      <span>·</span>
                      <span>{c.type}</span>
                      <span>·</span>
                      <span>Soumis il y a {c.submitted}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">Corriger</Button>
                </Card>
              ))
            ) : (
              <EmptyState title="Aucune correction en attente" description="Tous les travaux ont été reviewés." />
            )}
          </div>
        )}

        {/* Sessions tab */}
        {activeTab === 'sessions' && (
          <EmptyState
            title="Gestion des sessions"
            description="Calendrier et synchronisation Google/Outlook — disponible avec la configuration OAuth."
            icon={<Clock3 size={32} />}
          />
        )}

      </div>
    </div>
  );
}
