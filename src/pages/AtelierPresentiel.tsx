import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Navigation, Copy, Info, ClipboardList, FileText, Download } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { ResourceListItem } from '../components/learning/ResourceListItem';
import { Container } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface InfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const INFOS_PRATIQUES: InfoItem[] = [
  { icon: <MapPin size={14} />, label: 'Accès', value: 'Métro ligne 9 — Franklin D. Roosevelt' },
  { icon: <MapPin size={14} />, label: 'Parking', value: 'Payant à 200 m — 13 av. Montaigne' },
  { icon: <Info size={14} />, label: 'Accueil', value: 'Demander Sophie Martin à l\'entrée' },
  { icon: <Info size={14} />, label: 'Code WiFi', value: 'LS_Atelier2026' },
];

interface ProgramItem {
  time: string;
  label: string;
  duration: string;
}

const PROGRAMME: ProgramItem[] = [
  { time: '09h30', label: 'Accueil café + installation', duration: '30 min' },
  { time: '10h00', label: 'Introduction + icebreaker', duration: '15 min' },
  { time: '10h15', label: 'Théorie et outils de gestion du stress', duration: '45 min' },
  { time: '11h00', label: 'Exercices pratiques en groupe', duration: '60 min' },
  { time: '12h00', label: 'Debriefing + plan d\'action', duration: '30 min' },
];

interface ResourceItem {
  label: string;
  type: string;
}

const RESSOURCES: ResourceItem[] = [
  { label: 'Support de l\'atelier', type: 'PDF' },
  { label: 'Fiche mémo stress & récupération', type: 'PDF' },
];

// ─── AtelierPresentiel ───────────────────────────────────────────────────────

export default function AtelierPresentiel() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="warm"
        eyebrow="Atelier · Présentiel"
        title="Atelier Gestion du stress"
        summary="Session en présentiel · Sophie Martin"
        trailing={
          <Badge variant="danger" size="md" className="animate-pulse">🔴 AUJOURD'HUI</Badge>
        }
      />

      <Container width="content" padding={false} className="px-4 py-section flex flex-col gap-section">
        {/* Adresse card */}
        <Card variant="tinted" tone="warm" className="p-6 flex flex-col gap-stack">
          <div className="flex items-center gap-stack-xs">
            <MapPin size={24} className="text-secondary-600" />
            <h3 className="text-h3 font-semibold text-ink-900">The Learning Hub</h3>
          </div>
          <p className="text-body-sm text-ink-600">45 avenue Montaigne, 75008 Paris</p>
          <p className="text-body-sm text-ink-600">Salle Liberté · 3e étage</p>

          {/* Carte placeholder */}
          <div className="bg-ink-100 rounded-xl h-48 flex flex-col items-center justify-center gap-stack-xs">
            <MapPin size={32} className="text-ink-300" />
            <p className="text-caption text-ink-400">Carte interactive</p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="ghost" size="sm" leadingIcon={<Navigation size={14} />}>
              Itinéraire
            </Button>
            <Button variant="ghost" size="sm" leadingIcon={<Copy size={14} />}>
              Copier l'adresse
            </Button>
          </div>
        </Card>

        {/* Infos pratiques */}
        <SectionCard
          title="À savoir avant de venir"
          titleIcon={<Info size={18} />}
        >
          <div className="flex flex-col gap-stack">
            {INFOS_PRATIQUES.map((item, idx) => (
              <div key={idx} className="flex items-start gap-stack-xs">
                <span className="text-ink-400 shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex flex-col gap-tight">
                  <span className="text-caption font-semibold text-ink-500 uppercase tracking-wide">{item.label}</span>
                  <span className="text-body-sm text-ink-800">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Programme du jour */}
        <SectionCard
          title="Programme"
          titleIcon={<ClipboardList size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            {PROGRAMME.map((item, idx) => (
              <div key={idx} className="flex items-center gap-stack flex-wrap">
                <Badge variant="info" size="sm">{item.time}</Badge>
                <span className="text-body-sm text-ink-700 flex-1">{item.label}</span>
                <span className="text-caption text-ink-400">{item.duration}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Ressources */}
        <SectionCard
          title="Ressources"
          titleIcon={<FileText size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            {RESSOURCES.map((res, idx) => (
              <ResourceListItem
                key={idx}
                icon={<FileText size={14} />}
                label={res.label}
                badge={<Badge variant="neutral" size="sm">{res.type}</Badge>}
                action={
                  <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
                    Télécharger
                  </Button>
                }
              />
            ))}
          </div>
        </SectionCard>
      </Container>
    </div>
  );
}
