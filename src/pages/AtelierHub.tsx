import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Video } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ───────────────────────────────────────────────────────────────

type AtelierStatus = 'upcoming' | 'full' | 'past';
type AtelierMode = 'remote' | 'onsite';

interface Atelier {
  id: number;
  title: string;
  coach: string;
  coachInitials: string;
  date: string;
  mode: AtelierMode;
  location: string | null;
  enrolled: number;
  capacity: number;
  status: AtelierStatus;
}

const ATELIERS: Atelier[] = [
  {
    id: 1,
    title: 'Atelier Feedback 360°',
    coach: 'Sophie Martin',
    coachInitials: 'SM',
    date: '18 juin 2026',
    mode: 'remote',
    location: null,
    enrolled: 7,
    capacity: 12,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Communication assertive',
    coach: 'Pierre Bernard',
    coachInitials: 'PB',
    date: '25 juin 2026',
    mode: 'remote',
    location: null,
    enrolled: 12,
    capacity: 12,
    status: 'full',
  },
  {
    id: 3,
    title: 'Gestion du stress',
    coach: 'Sophie Martin',
    coachInitials: 'SM',
    date: '2 juil. 2026',
    mode: 'onsite',
    location: 'Paris 8e',
    enrolled: 4,
    capacity: 12,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Leadership situationnel',
    coach: 'Nadia Ferhat',
    coachInitials: 'NF',
    date: '12 mai 2026',
    mode: 'remote',
    location: null,
    enrolled: 10,
    capacity: 10,
    status: 'past',
  },
  {
    id: 5,
    title: 'Délégation efficace',
    coach: 'Sophie Martin',
    coachInitials: 'SM',
    date: '5 mai 2026',
    mode: 'onsite',
    location: 'Lyon',
    enrolled: 8,
    capacity: 8,
    status: 'past',
  },
  {
    id: 6,
    title: 'Intelligence émotionnelle',
    coach: 'Pierre Bernard',
    coachInitials: 'PB',
    date: '28 avr. 2026',
    mode: 'remote',
    location: null,
    enrolled: 6,
    capacity: 6,
    status: 'past',
  },
];

const STATUS_BADGE: Record<AtelierStatus, { variant: 'info' | 'neutral' | 'success'; label: string }> = {
  upcoming: { variant: 'info', label: 'À venir' },
  full: { variant: 'neutral', label: 'Complet' },
  past: { variant: 'success', label: 'Passé' },
};

type Filter = 'all' | 'upcoming' | 'past' | 'mine';

// ─── AtelierHub ───────────────────────────────────────────────────────────────

export default function AtelierHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = ATELIERS.filter((a) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return a.status === 'upcoming' || a.status === 'full';
    if (activeFilter === 'past') return a.status === 'past';
    if (activeFilter === 'mine') return a.id === 1 || a.id === 3;
    return true;
  });

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="warm"
        eyebrow="Ateliers Pratiques"
        title="Ateliers de ta Cohorte"
        summary="Sessions pratiques en petit groupe animées par ton coach. Maximum 12 participants."
        trailing={
          <Badge variant="info" size="md">Accès entreprise</Badge>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 py-section flex flex-col gap-section">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard
            label="Prochains ateliers"
            value="3"
            icon={<Calendar size={18} />}
            tone="warm"
            surface="tinted"
          />
          <StatCard
            label="Places réservées"
            value="2/12"
            icon={<Users size={18} />}
            tone="warm"
            surface="tinted"
          />
          <StatCard
            label="Ateliers complétés"
            value="4"
            icon={<Clock size={18} />}
            variant="warm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <FilterChip label="Tous" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Passés" active={activeFilter === 'past'} onClick={() => setActiveFilter('past')} />
          <FilterChip label="Mes inscriptions" active={activeFilter === 'mine'} onClick={() => setActiveFilter('mine')} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-stack">
          {filtered.map((atelier) => {
            const { variant, label } = STATUS_BADGE[atelier.status];
            const percent = Math.round((atelier.enrolled / atelier.capacity) * 100);

            return (
              <Card key={atelier.id} variant="default" className="flex flex-col gap-stack p-5">
                {/* Header */}
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <Badge variant={variant}>{label}</Badge>
                  <Badge variant="neutral">
                    {atelier.mode === 'remote' ? 'Distanciel' : 'Présentiel'}
                  </Badge>
                </div>

                <h3 className="text-body font-semibold text-ink-900">{atelier.title}</h3>

                {/* Coach row */}
                <div className="flex items-center gap-stack-xs">
                  <Avatar name={atelier.coach} initials={atelier.coachInitials} size="sm" />
                  <span className="text-body-sm text-ink-600">{atelier.coach}</span>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <Calendar size={13} className="text-ink-400 shrink-0" />
                  <span className="text-caption text-ink-500">{atelier.date}</span>
                  {atelier.mode === 'onsite' && atelier.location ? (
                    <>
                      <MapPin size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                      <span className="text-caption text-ink-500">{atelier.location}</span>
                    </>
                  ) : (
                    <>
                      <Video size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                      <span className="text-caption text-ink-500">Distanciel</span>
                    </>
                  )}
                </div>

                {/* Capacity */}
                <div className="flex flex-col gap-tight">
                  <ProgressBar
                    value={percent}
                    fill="warm"
                    size="sm"
                    valueLabel={false}
                  />
                  <span className="text-caption text-ink-500">
                    {atelier.enrolled}/{atelier.capacity} places
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-tight">
                  {atelier.status === 'upcoming' && (
                    <Button variant="primary" size="sm" fullWidth>S'inscrire</Button>
                  )}
                  {atelier.status === 'full' && (
                    <Button variant="ghost" size="sm" fullWidth disabled>Complet</Button>
                  )}
                  {atelier.status === 'past' && (
                    <Button variant="ghost" size="sm" fullWidth>Voir le récap</Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
