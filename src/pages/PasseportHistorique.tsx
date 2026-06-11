import React from 'react';
import { TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';
import { usePasseportStore } from '../stores/persistence';
import { getCompetenceById } from '../data/competencies';
import { MOCK_USER_ID } from '../data/passeport';
import type { CompetencyProgression } from '../types/learning';
import { Container } from '../components/layout';

const TYPE_CONFIG: Record<CompetencyProgression['type'], { icon: React.ElementType; color: string; bg: string; label: string }> = {
  jac: { icon: Award, color: 'text-success-fg', bg: 'bg-success-bg', label: 'JAC' },
  mission: { icon: Briefcase, color: 'text-secondary-600', bg: 'bg-secondary-50', label: 'Mission' },
  formation: { icon: BookOpen, color: 'text-info-fg', bg: 'bg-info-bg', label: 'Formation' },
  'dreyfus-up': { icon: TrendingUp, color: 'text-primary-700', bg: 'bg-primary-50', label: 'Niveau ↑' },
};

const RADAR_AXES = [
  { label: 'Communication', current: 4 },
  { label: 'Stratégie', current: 3 },
  { label: 'Leadership', current: 3 },
  { label: 'Tech', current: 2 },
  { label: 'Process', current: 4 },
  { label: 'Esprit critique', current: 3 },
];

const PasseportHistorique: React.FC = () => {
  const passeportStore = usePasseportStore();
  const progressions = passeportStore.getProgressions(MOCK_USER_ID);
  // Sort descending by date
  const timeline = [...progressions].sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  );

  const dreyfusUps = timeline.filter((e) => e.type === 'dreyfus-up').length;
  const jacs = timeline.filter((e) => e.type === 'jac').length;
  const missions = timeline.filter((e) => e.type === 'mission').length;
  const formations = timeline.filter((e) => e.type === 'formation').length;

  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Passeport · Historique"
        title="6 mois de progression"
        summary="Tous tes événements Dreyfus, JAC, missions et formations validés depuis novembre 2025"
        tone="default"
      />

      <Container width="wide" padding={false} className="px-stack md:px-section flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Niveaux Dreyfus gagnés" value={`+${dreyfusUps}`} sub="depuis le début" deltaDirection="up" />
          <StatCard label="JAC validés" value={String(jacs)} />
          <StatCard label="Missions complétées" value={String(missions)} />
          <StatCard label="Formations terminées" value={String(formations)} />
        </div>

        <SectionCard title="Radar actuel vs il y a 6 mois" description="Évolution de tous les axes Dreyfus">
          <Card className="p-stack-lg flex items-center justify-center">
            <CompetencyRadar axes={RADAR_AXES} size="md" />
          </Card>
        </SectionCard>

        <SectionCard title="Timeline détaillée" description="Tous les événements impactant ton passeport">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink-200" />
            <div className="flex flex-col gap-stack">
              {timeline.map((ev) => {
                const cfg = TYPE_CONFIG[ev.type];
                const Icon = cfg.icon;
                const comp = getCompetenceById(ev.competenceId);
                const dateLabel = new Date(ev.occurredAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
                return (
                  <div key={ev.id} className="relative pl-16">
                    <div className={`absolute left-2 w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <Card className="p-stack">
                      <div className="flex items-start justify-between gap-stack mb-1">
                        <div className="font-semibold">{ev.title}</div>
                        <Badge variant="neutral">{dateLabel}</Badge>
                      </div>
                      <div className="text-body-sm text-ink-600 mb-stack-xs">{ev.detail}</div>
                      <div className="flex items-center gap-stack-xs">
                        <Badge variant="brand">{comp?.label ?? ev.competenceId}</Badge>
                        {ev.newLevel && <Badge variant="success">Dreyfus {ev.newLevel}</Badge>}
                        <span className="text-caption text-ink-500">{cfg.label}</span>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </Container>
    </div>
  );
};

export default PasseportHistorique;
