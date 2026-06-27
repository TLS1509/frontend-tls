import React from 'react';
import { useParams } from 'react-router-dom';
import { ClipboardList, Info, Calendar, Clock, MapPin, Users, Video } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Container } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface ProgramItem {
  time: string;
  label: string;
  duration: string;
}

const PROGRAMME: ProgramItem[] = [
  { time: '10h00', label: 'Accueil + icebreaker', duration: '15 min' },
  { time: '10h15', label: 'Théorie feedback constructif', duration: '30 min' },
  { time: '10h45', label: 'Exercice en paires', duration: '45 min' },
  { time: '11h30', label: 'Débriefing collectif', duration: '30 min' },
  { time: '12h00', label: 'Plan d\'action individuel', duration: '30 min' },
];

interface InfoItem {
  label: string;
  value: string;
}

const INFOS: InfoItem[] = [
  { label: 'Date', value: '18 juin 2026' },
  { label: 'Heure', value: '10h00 – 13h00' },
  { label: 'Durée', value: '3 heures' },
  { label: 'Mode', value: 'Distanciel (Google Meet)' },
  { label: 'Niveau requis', value: 'D2 et plus' },
  { label: 'Matériel', value: 'Papier + stylo recommandés' },
];

// ─── AtelierDetail ────────────────────────────────────────────────────────────

export default function AtelierDetail() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="flat"
        eyebrow="Ateliers · Détail"
        title="Atelier Feedback 360°"
        summary="Pratique le feedback constructif en situation réelle. Jeux de rôle + débriefing collectif."
        trailing={
          <div className="flex gap-stack-xs flex-wrap">
            <Badge variant="info" size="md">18 juin 2026 · 10h00</Badge>
            <Badge variant="neutral" size="md">Distanciel · 3h</Badge>
          </div>
        }
      />

      <Container width="content" padding={false} className="px-stack py-section flex flex-col gap-section">
        {/* Coach card */}
        <Card variant="tinted" tone="flat" className="flex flex-col sm:flex-row items-start sm:items-center gap-section p-stack-lg">
          <Avatar name="Sophie Martin" initials="SM" size="xl" />
          <div className="flex flex-col gap-tight">
            <h3 className="text-h3 font-display font-bold text-ink-900">Sophie Martin</h3>
            <p className="text-body-sm text-ink-500">Coach certifiée ICF · Spécialité Communication</p>
            <p className="text-caption text-ink-400">Animation de +120 ateliers. Approche pratique et bienveillante.</p>
          </div>
        </Card>

        {/* Programme */}
        <SectionCard
          title="Programme de l'atelier"
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

        {/* Infos pratiques */}
        <SectionCard
          title="Infos pratiques"
          titleIcon={<Info size={18} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack">
            {INFOS.map((info, idx) => (
              <div key={idx} className="flex flex-col gap-tight">
                <span className="text-caption font-semibold text-ink-500 uppercase tracking-wide">{info.label}</span>
                <span className="text-body-sm text-ink-800">{info.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Inscription CTA */}
        <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-section">
          <div className="flex flex-col gap-tight w-full sm:flex-1">
            <span className="text-body font-semibold text-ink-900">7 / 12 places disponibles</span>
            <ProgressBar value={58} fill="warm" size="md" valueLabel={false} />
            <span className="text-caption text-ink-400">Clôture des inscriptions : 17 juin à 18h00</span>
          </div>
          <div className="flex flex-col gap-tight items-stretch sm:items-end shrink-0">
            <Button variant="primary" size="lg">Réserver ma place</Button>
            <span className="text-micro text-ink-400 text-center">Annulation gratuite jusqu'à J-2</span>
          </div>
        </Card>

        {/* Infos mode */}
        <div className="flex items-center gap-stack text-caption text-ink-500">
          <Video size={14} className="text-ink-400" />
          <span>Session sur Google Meet : lien envoyé 24h avant la session</span>
          <Users size={14} className="text-ink-400 ml-stack-xs" />
          <span>Max 12 participants</span>
          <MapPin size={14} className="text-ink-400 ml-stack-xs" />
          <span>Distanciel</span>
          <Calendar size={14} className="text-ink-400 ml-stack-xs" />
          <span>18 juin 2026</span>
          <Clock size={14} className="text-ink-400 ml-stack-xs" />
          <span>10h00 – 13h00</span>
        </div>
      </Container>
    </div>
  );
}
