import React from 'react';
import { TrendingUp, Award, BookOpen, Briefcase } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import SectionCard from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { CompetencyRadar } from '../components/ui/CompetencyRadar';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'jac' | 'mission' | 'formation' | 'dreyfus-up';
  title: string;
  detail: string;
  competence: string;
  level?: number;
}

const TIMELINE: TimelineEvent[] = [
  { id: '1', date: '12 mai 2026', type: 'dreyfus-up', title: 'Stratégie produit : D2 → D3', detail: 'Validé suite à la mission TLS 2027', competence: 'Stratégie produit', level: 3 },
  { id: '2', date: '5 mai 2026', type: 'jac', title: 'JAC validé : Communication écrite', detail: 'Mission Acme Corp · Validé par Pierre L.', competence: 'Communication écrite' },
  { id: '3', date: '20 avril 2026', type: 'mission', title: 'Mission terminée : Plan CRM', detail: '4 semaines · 5 livrables · 92% satisfaction', competence: 'UX & Tech' },
  { id: '4', date: '10 avril 2026', type: 'formation', title: 'Parcours complété : Leadership 360°', detail: '8 modules · 24 leçons · Badge Or débloqué', competence: 'Leadership' },
  { id: '5', date: '28 mars 2026', type: 'dreyfus-up', title: 'Leadership : D2 → D3', detail: 'Validé après parcours + 360° peer review', competence: 'Leadership', level: 3 },
  { id: '6', date: '15 mars 2026', type: 'mission', title: 'Mission terminée : Onboarding partenaires', detail: '6 semaines · Mission collaborative', competence: 'Process' },
];

const TYPE_CONFIG = {
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
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow="Passeport · Historique"
        title="6 mois de progression"
        summary="Tous tes événements Dreyfus, JAC, missions et formations validés depuis novembre 2025"
        tone="default"
      />

      <div className="max-w-page mx-auto w-full px-4 md:px-8 flex flex-col gap-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
          <StatCard label="Niveaux Dreyfus gagnés" value="+4" sub="6 derniers mois" delta="+2" deltaDirection="up" />
          <StatCard label="JAC validés" value="8" sub="dont 2 ce mois" />
          <StatCard label="Missions complétées" value="5" />
          <StatCard label="Parcours terminés" value="3" sub="Badge Or × 2" />
        </div>

        <SectionCard title="Radar actuel vs il y a 6 mois" description="Évolution de tous les axes Dreyfus">
          <Card className="p-6 flex items-center justify-center">
            <CompetencyRadar axes={RADAR_AXES} size="md" />
          </Card>
        </SectionCard>

        <SectionCard title="Timeline détaillée" description="Tous les événements impactant ton passeport">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink-200" />
            <div className="flex flex-col gap-stack">
              {TIMELINE.map((ev) => {
                const cfg = TYPE_CONFIG[ev.type];
                const Icon = cfg.icon;
                return (
                  <div key={ev.id} className="relative pl-16">
                    <div className={`absolute left-2 w-9 h-9 rounded-full ${cfg.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <Card className="p-4">
                      <div className="flex items-start justify-between gap-stack mb-1">
                        <div className="font-semibold">{ev.title}</div>
                        <Badge variant="neutral">{ev.date}</Badge>
                      </div>
                      <div className="text-body-sm text-ink-600 mb-2">{ev.detail}</div>
                      <div className="flex items-center gap-stack-xs">
                        <Badge variant="brand">{ev.competence}</Badge>
                        {ev.level && <Badge variant="success">Dreyfus {ev.level}</Badge>}
                        <span className="text-caption text-ink-500">{cfg.label}</span>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default PasseportHistorique;
