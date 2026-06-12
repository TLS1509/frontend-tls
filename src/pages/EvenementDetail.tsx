import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ClipboardList,
  Info,
  Users,
  MapPin,
  Calendar,
  Clock,
  Video,
  Globe,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Container } from '../components/layout';

// ─── Mock data ───────────────────────────────────────────────────────────────

const EVENT = {
  id: '1',
  title: "Conférence TLS 2026 : L'Avenir du Learning",
  subtitle: "Keynotes, tables rondes et networking autour de l'avenir de la formation professionnelle.",
  date: '20 juin 2026',
  time: '14h00',
  duration: '3h',
  mode: 'Distanciel',
  price: 'Gratuit',
  capacity: 400,
  registered: 342,
  language: 'Français',
  access: 'Lien Zoom envoyé 24h avant',
  organizer: {
    name: 'The Learning Society',
    initials: 'TLS',
    role: 'Organisateur officiel',
    description: 'La plateforme de référence pour la montée en compétences des managers.',
  },
};

const PROGRAMME = [
  { time: '14h00', title: 'Keynote ouverture', speaker: 'Dr. Laura Martin, CEO TLS' },
  { time: '14h45', title: 'Panel "IA & Learning"', speaker: 'Modéré par Jean Dubois' },
  { time: '15h30', title: 'Workshop au choix (3 sessions parallèles)', speaker: 'Intervenants experts' },
  { time: '16h30', title: 'Networking & clôture', speaker: 'Tous les intervenants' },
];

const SPEAKERS = [
  { name: 'Dr. Laura Martin', title: 'CEO & Fondatrice', company: 'The Learning Society' },
  { name: 'Jean Dubois', title: 'Directeur L&D', company: 'Groupe Renault' },
  { name: 'Amina Khoury', title: 'Future of Work Lead', company: 'Meta EMEA' },
];

const INFO_GRID = [
  { icon: <Calendar size={15} />, label: 'Date', value: '20 juin 2026' },
  { icon: <Clock size={15} />, label: 'Heure', value: '14h00 – 17h00' },
  { icon: <Clock size={15} />, label: 'Durée', value: '3 heures' },
  { icon: <Video size={15} />, label: 'Format', value: 'Distanciel (Zoom)' },
  { icon: <Globe size={15} />, label: 'Accès', value: 'Lien envoyé 24h avant' },
  { icon: <MapPin size={15} />, label: 'Langue', value: 'Français' },
];

export default function EvenementDetail() {
  useParams<{ id: string }>();

  const pct = Math.round((EVENT.registered / EVENT.capacity) * 100);

  return (
    <div className="flex flex-col gap-section px-stack py-stack-lg">
      <EditorialHero
        tone="sun"
        eyebrow={{ label: 'Événements · Détail' }}
        title={EVENT.title}
        summary={EVENT.subtitle}
        trailing={
          <div className="flex flex-wrap gap-stack-xs items-center">
            <Badge variant="sun" size="lg">{EVENT.date} · {EVENT.time}</Badge>
            <Badge variant="info" size="lg">{EVENT.mode} · {EVENT.duration}</Badge>
            <Badge variant="neutral" size="lg">{EVENT.price}</Badge>
          </div>
        }
      />

      <Container width="content" padding={false} className="flex flex-col gap-section">
        {/* Organizer */}
        <Card variant="tinted" tone="sun" className="flex items-center gap-section p-stack-lg">
          <Avatar name={EVENT.organizer.name} initials={EVENT.organizer.initials} size="lg" />
          <div className="flex flex-col gap-tight">
            <h3 className="text-h3 font-bold text-ink-900 m-0">{EVENT.organizer.name}</h3>
            <p className="text-body-sm text-ink-500 m-0">{EVENT.organizer.role}</p>
            <p className="text-caption text-ink-400 m-0">{EVENT.organizer.description}</p>
          </div>
        </Card>

        {/* Programme */}
        <SectionCard
          title="Programme"
          titleIcon={<ClipboardList size={18} />}
        >
          {PROGRAMME.map((item, idx) => (
            <div key={idx} className="flex gap-section items-start py-stack-xs border-b border-ink-100 last:border-0">
              <span className="text-caption font-mono font-bold text-primary-600 shrink-0 w-12">
                {item.time}
              </span>
              <div className="flex flex-col gap-tight min-w-0">
                <p className="text-body-sm font-semibold text-ink-900 m-0">{item.title}</p>
                <p className="text-caption text-ink-500 m-0">{item.speaker}</p>
              </div>
            </div>
          ))}
        </SectionCard>

        {/* Informations pratiques */}
        <SectionCard
          title="Informations pratiques"
          titleIcon={<Info size={18} />}
        >
          <div className="grid grid-cols-2 gap-stack">
            {INFO_GRID.map((item, idx) => (
              <div key={idx} className="flex items-center gap-stack-xs">
                <span className="text-primary-500 shrink-0">{item.icon}</span>
                <div className="flex flex-col gap-tight min-w-0">
                  <span className="text-micro font-bold uppercase tracking-wider text-ink-400">{item.label}</span>
                  <span className="text-body-sm text-ink-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Speakers */}
        <SectionCard
          title="Intervenants"
          titleIcon={<Users size={18} />}
        >
          {SPEAKERS.map((sp, idx) => (
            <div key={idx} className="flex items-center gap-stack-xs py-stack-xs border-b border-ink-100 last:border-0">
              <Avatar name={sp.name} size="md" />
              <div className="flex flex-col gap-tight min-w-0">
                <p className="text-body-sm font-semibold text-ink-900 m-0">{sp.name}</p>
                <p className="text-caption text-ink-500 m-0">{sp.title} · {sp.company}</p>
              </div>
            </div>
          ))}
        </SectionCard>

        {/* Inscription */}
        <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-section">
          <div className="flex flex-col gap-tight flex-1">
            <Badge variant="success">{EVENT.registered} / {EVENT.capacity} inscrits</Badge>
            <ProgressBar
              value={pct}
              fill="brand"
              size="sm"
              valueLabel={false}
              className="max-w-xs"
            />
            <p className="text-caption text-ink-400 m-0">
              Inscription gratuite · Lien de connexion envoyé 24h avant
            </p>
          </div>
          <div className="flex flex-col gap-tight items-end shrink-0">
            <Button variant="primary" size="lg">
              S'inscrire gratuitement
            </Button>
            <p className="text-micro text-ink-400 m-0">Annulation possible jusqu'à J-1</p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
