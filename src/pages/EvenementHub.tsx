import React, { useState } from 'react';
import { Calendar, Users, MapPin, Video, Clock, CheckCircle, Lock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useEventsStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';
const MOCK_COMPANY_ID = 'company-demo';

type FilterTime = 'all' | 'upcoming' | 'past' | 'mine';
type FilterMode = 'all' | 'distanciel' | 'presentiel';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function EvenementHub() {
  const [filterTime, setFilterTime] = useState<FilterTime>('all');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const eventsStore = useEventsStore();

  // Seed on first render
  if (eventsStore.evenements.length === 0) {
    eventsStore.getEventRegistration(MOCK_USER_ID, '__seed__');
  }
  const evenements = eventsStore.evenements;

  const myRegistrations = evenements.filter((ev) => !!eventsStore.getEventRegistration(MOCK_USER_ID, ev.id));
  const upcomingCount = evenements.filter((ev) => ev.status === 'published').length;
  const pastCount = evenements.filter((ev) => ev.status === 'completed').length;
  const totalRegistered = evenements.reduce((acc, ev) => acc + ev.registeredCount, 0);

  const featured = evenements.find((ev) => ev.status === 'published' && ev.visibility === 'public');

  const filteredEvents = evenements.filter((ev) => {
    const matchTime =
      filterTime === 'all' ||
      (filterTime === 'upcoming' && ev.status === 'published') ||
      (filterTime === 'past' && ev.status === 'completed') ||
      (filterTime === 'mine' && !!eventsStore.getEventRegistration(MOCK_USER_ID, ev.id));
    const matchMode =
      filterMode === 'all' ||
      (filterMode === 'distanciel' && ev.mode === 'distanciel') ||
      (filterMode === 'presentiel' && ev.mode === 'presentiel');
    return matchTime && matchMode;
  });

  // Access check: private events only visible to company members
  const canAccessEvent = (ev: typeof evenements[number]) => {
    if (ev.visibility === 'public') return true;
    return ev.companyId === MOCK_COMPANY_ID;
  };

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="sun"
        eyebrow={{ label: 'Événements' }}
        title="Événements & Conférences"
        summary="Conférences, webinaires et ateliers ouverts à la communauté TLS. Certains événements sont réservés aux membres."
        trailing={
          <Button variant="glass" size="md">
            S'abonner au calendrier
          </Button>
        }
      />

      <div className="max-w-wide mx-auto w-full px-4 py-section flex flex-col gap-section">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard label="Événements à venir" value={upcomingCount} variant="brand" icon={<Calendar size={20} />} />
          <StatCard label="Mes inscriptions" value={myRegistrations.length} variant="warm" icon={<Users size={20} />} />
          <StatCard label="Événements passés" value={pastCount} variant="default" icon={<Clock size={20} />} />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-tight">
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Tous" active={filterTime === 'all'} onClick={() => setFilterTime('all')} />
            <FilterChip label="À venir" active={filterTime === 'upcoming'} onClick={() => setFilterTime('upcoming')} />
            <FilterChip label="Passés" active={filterTime === 'past'} onClick={() => setFilterTime('past')} />
            <FilterChip label={`Mes inscriptions (${myRegistrations.length})`} active={filterTime === 'mine'} onClick={() => setFilterTime('mine')} />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Tous modes" active={filterMode === 'all'} onClick={() => setFilterMode('all')} />
            <FilterChip label="Distanciel" active={filterMode === 'distanciel'} onClick={() => setFilterMode('distanciel')} icon={<Video size={12} />} />
            <FilterChip label="Présentiel" active={filterMode === 'presentiel'} onClick={() => setFilterMode('presentiel')} icon={<MapPin size={12} />} />
          </div>
        </div>

        {/* Featured event */}
        {featured && (
          <Card variant="default" className="md:flex gap-section p-0 overflow-hidden">
            <div className="md:w-64 bg-primary-100 flex items-center justify-center min-h-[180px] shrink-0">
              <Calendar size={48} className="text-primary-300" />
            </div>
            <div className="p-6 flex flex-col gap-tight flex-1">
              <div className="flex flex-wrap gap-2">
                <Badge variant="danger" className="animate-pulse">🔴 En vedette · {formatDate(featured.scheduledAt)}</Badge>
                <Badge variant="info">{featured.mode === 'distanciel' ? 'Distanciel' : 'Présentiel'}</Badge>
                {featured.maxParticipants && (
                  <Badge variant={featured.registeredCount >= featured.maxParticipants ? 'neutral' : 'success'}>
                    {featured.registeredCount}/{featured.maxParticipants} inscrits
                  </Badge>
                )}
              </div>
              <h2 className="text-h3 font-display font-bold text-ink-900 m-0">{featured.title}</h2>
              <p className="text-body-sm text-ink-500 m-0">{featured.description}</p>
              {featured.maxParticipants && (
                <ProgressBar
                  value={Math.round((featured.registeredCount / featured.maxParticipants) * 100)}
                  fill="brand"
                  size="sm"
                  valueLabel={false}
                  className="max-w-xs"
                />
              )}
              <div className="mt-2">
                {eventsStore.getEventRegistration(MOCK_USER_ID, featured.id) ? (
                  <Button variant="ghost" size="md" disabled>
                    <CheckCircle size={16} className="mr-1.5" /> Déjà inscrit(e)
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => eventsStore.registerForEvent(MOCK_USER_ID, featured.id)}
                  >
                    S'inscrire · Gratuit
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Event grid */}
        {filteredEvents.length === 0 ? (
          <p className="text-body-sm text-ink-400 py-8 text-center">Aucun événement dans cette catégorie.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {filteredEvents.map((ev) => {
              const registration = eventsStore.getEventRegistration(MOCK_USER_ID, ev.id);
              const isFull = ev.maxParticipants ? ev.registeredCount >= ev.maxParticipants : false;
              const isPast = ev.status === 'completed';
              const isPrivateAccessible = canAccessEvent(ev);
              const pct = ev.maxParticipants
                ? Math.round((ev.registeredCount / ev.maxParticipants) * 100)
                : 0;

              return (
                <Card key={ev.id} variant="default" className="p-5 flex flex-col gap-tight">
                  <div className="flex flex-wrap gap-1.5">
                    {isPast ? (
                      <Badge variant="neutral">Terminé</Badge>
                    ) : isFull ? (
                      <Badge variant="danger">Complet</Badge>
                    ) : (
                      <Badge variant="success">Places disponibles</Badge>
                    )}
                    <Badge variant={ev.mode === 'presentiel' ? 'warm' : 'info'}>
                      <span className="inline-flex items-center gap-1">
                        {ev.mode === 'presentiel' ? <MapPin size={11} /> : <Video size={11} />}
                        {ev.mode === 'distanciel' ? 'Distanciel' : 'Présentiel'}
                      </span>
                    </Badge>
                    {ev.visibility === 'private' && (
                      <Badge variant="neutral">
                        <Lock size={10} className="inline mr-0.5" />
                        Privé
                      </Badge>
                    )}
                    {registration && (
                      <Badge variant="success">
                        <CheckCircle size={10} className="inline mr-0.5" />
                        Inscrit(e)
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-body font-semibold text-ink-900 m-0">{ev.title}</h3>

                  <p className="text-caption text-ink-500 m-0 inline-flex items-center gap-1.5 flex-wrap">
                    <Calendar size={12} />
                    {formatDate(ev.scheduledAt)}
                    <span>·</span>
                    <Clock size={12} />
                    {ev.durationMinutes} min
                    <span>·</span>
                    {ev.organizerName}
                  </p>

                  {!isPast && ev.maxParticipants && (
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-ink-500">{ev.registeredCount}/{ev.maxParticipants}</span>
                      <ProgressBar value={pct} fill={pct > 90 ? 'danger' : 'brand'} size="sm" valueLabel={false} className="flex-1" />
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                    {!isPrivateAccessible ? (
                      <Button variant="ghost" size="sm" disabled>
                        <Lock size={12} className="mr-1.5" /> Réservé aux membres
                      </Button>
                    ) : isPast ? (
                      <Button variant="ghost" size="sm">Voir le récap</Button>
                    ) : registration ? (
                      <Button variant="ghost" size="sm" disabled>Déjà inscrit(e)</Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => eventsStore.registerForEvent(MOCK_USER_ID, ev.id)}
                      >
                        S'inscrire
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Totals info */}
        <p className="text-caption text-ink-400 text-center">
          {totalRegistered} participants au total · {evenements.length} événements
        </p>
      </div>
    </div>
  );
}
