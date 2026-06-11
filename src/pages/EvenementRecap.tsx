import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Play,
  Award,
  Sparkles,
  Video,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { AITransparencyLabel } from '../components/ui/AITransparencyLabel';
import { Container } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  title: 'Conférence TLS 2026',
  date: '20 juin 2026',
  participants: 342,
  xp: 80,
  replayDuration: '2h 47min',
};

const KEY_POINTS = [
  {
    id: '1',
    text: "L'IA générative réduit de 40% le temps de création de contenu pédagogique, mais nécessite un cadrage éditorial solide pour maintenir la qualité.",
  },
  {
    id: '2',
    text: "Les managers qui pratiquent le feedback structuré voient une amélioration de 28% de l'engagement de leurs équipes (étude TLS 2025).",
  },
  {
    id: '3',
    text: "Les formations hybrides combinant micro-apprentissage et practice sociale ont un taux de complétion 3x supérieur aux formats e-learning classiques.",
  },
];

const PARALLEL_SESSIONS = [
  { id: '1', title: 'Workshop : Design de parcours IA-first', duration: '55 min' },
  { id: '2', title: 'Atelier : Feedback Culture en pratique', duration: '50 min' },
  { id: '3', title: "Conférence : L'avenir des certifications", duration: '45 min' },
];

const RESOURCES = [
  { type: 'download', title: 'Slides : Keynote ouverture.pdf', size: '3.2 MB' },
  { type: 'download', title: 'Guide complet IA & Learning 2026.pdf', size: '2.1 MB' },
  { type: 'download', title: 'Synthèse des ateliers.pdf', size: '0.9 MB' },
  { type: 'download', title: 'Bibliographie & ressources.pdf', size: '0.4 MB' },
  { type: 'link', title: 'Replay complet sur YouTube', url: '#' },
];

export default function EvenementRecap() {
  useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-section px-4 py-6">
      <EditorialHero
        tone="sun"
        eyebrow={{ label: 'Événement · Récapitulatif' }}
        title={EVENT.title}
        summary={`Session du ${EVENT.date} · ${EVENT.participants} participants`}
        trailing={
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="success">✓ Participé</Badge>
            <Badge variant="success">+{EVENT.xp} XP</Badge>
          </div>
        }
      />

      <Container width="wide" padding={false} className="grid md:grid-cols-3 gap-section">
        {/* Colonne principale — col span 2 */}
        <div className="md:col-span-2 flex flex-col gap-section">
          {/* Replay */}
          <Card className="aspect-video flex items-center justify-center bg-ink-900 rounded-2xl overflow-hidden">
            <Button
              variant="glass"
              size="lg"
              leadingIcon={<Play size={18} />}
            >
              Voir le replay ({EVENT.replayDuration})
            </Button>
          </Card>

          {/* Points clés */}
          <SectionCard
            title="Points clés"
            titleIcon={<Sparkles size={18} />}
            headerAction={<AITransparencyLabel variant="generated" size="sm" />}
          >
            {KEY_POINTS.map((point) => (
              <div key={point.id} className="flex items-start gap-3 py-2 border-b border-ink-100 last:border-0">
                <Badge variant="brand">{point.id}</Badge>
                <p className="text-body-sm text-ink-700 m-0 flex-1">{point.text}</p>
              </div>
            ))}
          </SectionCard>

          {/* Sessions parallèles */}
          <SectionCard
            title="Sessions à revoir"
            titleIcon={<Video size={18} />}
          >
            {PARALLEL_SESSIONS.map((session) => (
              <Card
                key={session.id}
                variant="default"
                className="flex items-center gap-section p-4"
              >
                <div className="flex flex-col gap-tight flex-1 min-w-0">
                  <p className="text-body-sm font-semibold text-ink-900 m-0">{session.title}</p>
                  <p className="text-caption text-ink-500 m-0">{session.duration}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Voir
                </Button>
              </Card>
            ))}
          </SectionCard>
        </div>

        {/* Sidebar — col span 1 */}
        <div className="md:col-span-1 flex flex-col gap-stack">
          {/* XP */}
          <Card variant="tinted" tone="primary" className="p-4 text-center flex flex-col items-center gap-tight">
            <Award size={28} className="text-primary-600" />
            <p className="text-h2 font-bold text-primary-700 font-display m-0">+{EVENT.xp} XP</p>
            <p className="text-caption text-ink-500 m-0">Événement complété</p>
          </Card>

          {/* Stats */}
          <Card variant="default" className="p-4 flex flex-col gap-tight">
            <StatCard
              value={EVENT.participants}
              label="Participants"
              size="sm"
              variant="default"
              className="border-0 p-0 shadow-none rounded-none"
            />
            <div className="border-t border-ink-100" />
            <StatCard
              value={47}
              label="Questions posées"
              size="sm"
              variant="default"
              className="border-0 p-0 shadow-none rounded-none"
            />
          </Card>

          {/* Ressources */}
          <SectionCard
            title="Ressources"
            titleIcon={<FileText size={18} />}
          >
            {RESOURCES.map((res, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1.5 border-b border-ink-100 last:border-0">
                {res.type === 'download' ? (
                  <Download size={14} className="text-primary-500 shrink-0" />
                ) : (
                  <ExternalLink size={14} className="text-primary-500 shrink-0" />
                )}
                <span className="text-caption text-ink-700 flex-1 min-w-0 truncate">{res.title}</span>
                {res.type === 'download' && res.size && (
                  <Button variant="ghost" size="sm" aria-label={`Télécharger ${res.title}`}>
                    <Download size={12} />
                  </Button>
                )}
                {res.type === 'link' && (
                  <Button variant="ghost" size="sm" aria-label={`Ouvrir ${res.title}`}>
                    <ExternalLink size={12} />
                  </Button>
                )}
              </div>
            ))}
          </SectionCard>

          {/* CTA avis */}
          <Card variant="tinted" tone="sun" className="p-4 flex flex-col gap-tight">
            <p className="text-body-sm font-semibold text-ink-900 m-0">
              Votre avis compte !
            </p>
            <p className="text-caption text-ink-500 m-0">
              Partagez votre retour d'expérience pour améliorer les prochains événements.
            </p>
            <Button variant="primary" size="sm" className="w-full">
              Donner mon avis
            </Button>
          </Card>
        </div>
      </Container>
    </div>
  );
}
