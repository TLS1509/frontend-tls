import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Video,
  Globe,
  Clock,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ───────────────────────────────────────────────────────────────

const FEATURED = {
  title: "Conférence TLS 2026 — L'Avenir du Learning",
  description: 'Keynotes, workshops et networking. 3h · 400 places.',
  date: '20 juin',
  mode: 'Distanciel',
  capacity: 400,
  registered: 342,
  free: true,
};

const EVENTS = [
  {
    id: '2',
    title: 'Webinaire IA & RH',
    date: '28 juin',
    duration: '1h30',
    organizer: 'Sophie Dumas',
    mode: 'Distanciel',
    capacity: 150,
    registered: 120,
    status: 'upcoming',
    access: 'public',
    modeIcon: 'video',
  },
  {
    id: '3',
    title: 'Design Thinking Workshop',
    date: '5 juil.',
    duration: '4h',
    organizer: 'TLS Learning',
    mode: 'Présentiel Paris',
    capacity: 20,
    registered: 18,
    status: 'upcoming',
    access: 'members',
    modeIcon: 'pin',
  },
  {
    id: '4',
    title: 'Table Ronde Leadership Féminin',
    date: '10 juil.',
    duration: '2h',
    organizer: 'Marie Leconte',
    mode: 'Hybride',
    capacity: 100,
    registered: 89,
    status: 'upcoming',
    access: 'public',
    modeIcon: 'globe',
  },
  {
    id: '5',
    title: 'Replay : Feedback Culture',
    date: '12 mai',
    duration: '1h45',
    organizer: 'Équipe TLS',
    mode: 'Distanciel',
    capacity: 200,
    registered: 200,
    status: 'past',
    access: 'public',
    modeIcon: 'video',
  },
  {
    id: '6',
    title: 'Soirée Alumni TLS',
    date: '2 juil.',
    duration: '3h',
    organizer: 'TLS Community',
    mode: 'Présentiel Lyon',
    capacity: 60,
    registered: 45,
    status: 'upcoming',
    access: 'members',
    modeIcon: 'pin',
  },
];

type FilterTime = 'all' | 'upcoming' | 'past';
type FilterMode = 'all' | 'distanciel' | 'presentiel' | 'hybride';

const MODE_ICON_MAP: Record<string, React.ReactNode> = {
  video: <Video size={12} />,
  pin: <MapPin size={12} />,
  globe: <Globe size={12} />,
};

export default function EvenementHub() {
  const [filterTime, setFilterTime] = useState<FilterTime>('all');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const filteredEvents = EVENTS.filter((ev) => {
    const matchTime =
      filterTime === 'all' ||
      (filterTime === 'upcoming' && ev.status === 'upcoming') ||
      (filterTime === 'past' && ev.status === 'past');
    const modeNorm = ev.mode.toLowerCase();
    const matchMode =
      filterMode === 'all' ||
      (filterMode === 'distanciel' && modeNorm.includes('distanciel')) ||
      (filterMode === 'presentiel' && modeNorm.includes('présentiel')) ||
      (filterMode === 'hybride' && modeNorm.includes('hybride'));
    return matchTime && matchMode;
  });

  const featuredPct = Math.round((FEATURED.registered / FEATURED.capacity) * 100);

  return (
    <div className="flex flex-col gap-section px-4 py-6 max-w-wide mx-auto">
      <EditorialHero
        tone="sun"
        eyebrow={{ label: 'Événements' }}
        title="Événements & Conférences"
        summary="Conférences, webinaires et ateliers ouverts à la communauté TLS. Certains événements sont réservés aux membres."
        trailing={
          <div className="flex flex-wrap gap-3">
            <Button variant="glass-light-ghost" size="md">
              S'abonner au calendrier
            </Button>
            <Button variant="glass" size="md">
              Créer un événement
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
        <StatCard
          label="Événements à venir"
          value={6}
          variant="brand"
          icon={<Calendar size={20} />}
        />
        <StatCard
          label="Participants inscrits"
          value={284}
          variant="warm"
          icon={<Users size={20} />}
        />
        <StatCard
          label="Événements passés"
          value={12}
          variant="default"
          icon={<Clock size={20} />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-tight">
        <div className="flex flex-wrap gap-2">
          <FilterChip label="Tous" active={filterTime === 'all'} onClick={() => setFilterTime('all')} />
          <FilterChip label="À venir" active={filterTime === 'upcoming'} onClick={() => setFilterTime('upcoming')} />
          <FilterChip label="Passés" active={filterTime === 'past'} onClick={() => setFilterTime('past')} />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip label="Tous modes" active={filterMode === 'all'} onClick={() => setFilterMode('all')} />
          <FilterChip
            label="Distanciel"
            active={filterMode === 'distanciel'}
            onClick={() => setFilterMode('distanciel')}
            icon={<Video size={12} />}
          />
          <FilterChip
            label="Présentiel"
            active={filterMode === 'presentiel'}
            onClick={() => setFilterMode('presentiel')}
            icon={<MapPin size={12} />}
          />
          <FilterChip
            label="Hybride"
            active={filterMode === 'hybride'}
            onClick={() => setFilterMode('hybride')}
            icon={<Globe size={12} />}
          />
        </div>
      </div>

      {/* Featured event */}
      <Card variant="default" className="md:flex gap-section p-0 overflow-hidden">
        <div className="md:w-64 bg-primary-100 flex items-center justify-center min-h-[180px] shrink-0">
          <Calendar size={48} className="text-primary-300" />
        </div>
        <div className="p-6 flex flex-col gap-tight flex-1">
          <div className="flex flex-wrap gap-2">
            <Badge variant="danger" className="animate-pulse">🔴 Bientôt · 20 juin</Badge>
            <Badge variant="info">Distanciel</Badge>
          </div>
          <h2 className="text-h3 font-display font-bold text-ink-900 m-0">{FEATURED.title}</h2>
          <p className="text-body-sm text-ink-500 m-0">{FEATURED.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="success">{FEATURED.registered}/{FEATURED.capacity} inscrits</Badge>
            <ProgressBar
              value={featuredPct}
              fill="brand"
              size="sm"
              valueLabel={false}
              className="flex-1 min-w-[80px]"
            />
          </div>
          <div className="mt-2">
            <Button variant="primary" size="md">
              S'inscrire · Gratuit
            </Button>
          </div>
        </div>
      </Card>

      {/* Event grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
        {filteredEvents.map((ev) => {
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          const isFull = ev.registered >= ev.capacity;
          const isPast = ev.status === 'past';
          return (
            <Card key={ev.id} variant="default" className="p-5 flex flex-col gap-tight">
              <div className="flex flex-wrap gap-1.5">
                {isPast ? (
                  <Badge variant="neutral">Replay disponible</Badge>
                ) : isFull ? (
                  <Badge variant="danger">Complet</Badge>
                ) : (
                  <Badge variant="success">Places disponibles</Badge>
                )}
                <Badge variant={ev.modeIcon === 'pin' ? 'warm' : ev.modeIcon === 'globe' ? 'sun' : 'info'}>
                  <span className="inline-flex items-center gap-1">
                    {MODE_ICON_MAP[ev.modeIcon]}
                    {ev.mode}
                  </span>
                </Badge>
                {ev.access === 'members' && (
                  <Badge variant="neutral">Membres</Badge>
                )}
              </div>
              <h3 className="text-body font-semibold text-ink-900 m-0">{ev.title}</h3>
              <p className="text-caption text-ink-500 m-0 inline-flex items-center gap-1.5 flex-wrap">
                <Calendar size={12} />
                {ev.date}
                <span>·</span>
                <Clock size={12} />
                {ev.duration}
                <span>·</span>
                {ev.organizer}
              </p>
              {!isPast && (
                <div className="flex items-center gap-2">
                  <span className="text-caption text-ink-500">{ev.registered}/{ev.capacity}</span>
                  <ProgressBar
                    value={pct}
                    fill={pct > 90 ? 'danger' : 'brand'}
                    size="sm"
                    valueLabel={false}
                    className="flex-1"
                  />
                </div>
              )}
              <div className="mt-auto pt-2">
                <Button
                  variant={isPast ? 'ghost' : isFull ? 'ghost' : 'primary'}
                  size="sm"
                >
                  {isPast ? "Voir le replay" : isFull ? "Liste d'attente" : "S'inscrire"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
