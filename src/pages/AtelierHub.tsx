import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useEventsStore } from '../stores/persistence';
import { Container } from '../components/layout';

const MOCK_USER_ID = 'user-demo';

type Filter = 'all' | 'upcoming' | 'past' | 'mine';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AtelierHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const eventsStore = useEventsStore();

  // Seed on first render
  if (eventsStore.ateliers.length === 0) {
    eventsStore.getAtelierEnrollment(MOCK_USER_ID, '__seed__');
  }
  const ateliers = eventsStore.ateliers;

  const myEnrollments = ateliers.filter((a) => !!eventsStore.getAtelierEnrollment(MOCK_USER_ID, a.id));
  const upcomingCount = ateliers.filter((a) => a.status === 'published').length;
  const pastCount = ateliers.filter((a) => a.status === 'completed').length;

  const filtered = ateliers.filter((a) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return a.status === 'published';
    if (activeFilter === 'past') return a.status === 'completed';
    if (activeFilter === 'mine') return !!eventsStore.getAtelierEnrollment(MOCK_USER_ID, a.id);
    return true;
  });

  return (
    <div className="flex flex-col">
      <EditorialHero
        tone="flat"
        eyebrow="Ateliers Pratiques"
        title="Ateliers de ta Cohorte"
        summary="Sessions pratiques en petit groupe animées par ton coach. Maximum 12 participants. Distanciel ou présentiel."
        trailing={<Badge variant="info" size="md">Accès entreprise</Badge>}
      />

      <Container width="wide" padding={false} className="px-stack py-section flex flex-col gap-section">
        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard label="Prochains ateliers" value={upcomingCount} icon={<Calendar size={18} />} tone="flat" surface="tinted" />
          <StatCard label="Mes inscriptions" value={myEnrollments.length} icon={<Users size={18} />} tone="flat" surface="tinted" />
          <StatCard label="Ateliers passés" value={pastCount} icon={<Clock size={18} />} variant="warm" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <FilterChip label="Tous" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Passés" active={activeFilter === 'past'} onClick={() => setActiveFilter('past')} />
          <FilterChip label={`Mes inscriptions (${myEnrollments.length})`} active={activeFilter === 'mine'} onClick={() => setActiveFilter('mine')} />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-body-sm text-ink-400 py-section text-center">Aucun atelier dans cette catégorie.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-stack">
            {filtered.map((atelier) => {
              const enrollment = eventsStore.getAtelierEnrollment(MOCK_USER_ID, atelier.id);
              const isFull = atelier.enrolledCount >= atelier.maxParticipants;
              const isPast = atelier.status === 'completed';
              const percent = Math.round((atelier.enrolledCount / atelier.maxParticipants) * 100);

              return (
                <Card key={atelier.id} variant="default" className="flex flex-col gap-stack p-5">
                  <div className="flex items-center gap-stack-xs flex-wrap">
                    {isPast ? (
                      <Badge variant="success">Passé</Badge>
                    ) : isFull ? (
                      <Badge variant="neutral">Complet</Badge>
                    ) : (
                      <Badge variant="info">À venir</Badge>
                    )}
                    <Badge variant="neutral">
                      {atelier.mode === 'distanciel' ? 'Distanciel' : 'Présentiel'}
                    </Badge>
                    {enrollment && (
                      <Badge variant={enrollment.status === 'waitlist' ? 'warm' : 'success'}>
                        {enrollment.status === 'waitlist' ? (
                          <><AlertCircle size={11} className="inline mr-0.5" />Liste d'attente #{enrollment.waitlistPosition}</>
                        ) : enrollment.status === 'validated' ? (
                          <><CheckCircle size={11} className="inline mr-0.5" />Validé</>
                        ) : (
                          <><Clock size={11} className="inline mr-0.5" />En attente</>
                        )}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-body font-semibold text-ink-900">{atelier.title}</h3>

                  <div className="flex items-center gap-stack-xs">
                    <Avatar initials={atelier.coachInitials} size="sm" />
                    <span className="text-body-sm text-ink-600">{atelier.coachName}</span>
                  </div>

                  <div className="flex items-center gap-stack-xs flex-wrap">
                    <Calendar size={13} className="text-ink-400 shrink-0" />
                    <span className="text-caption text-ink-500">{formatDate(atelier.scheduledAt)}</span>
                    {atelier.mode === 'presentiel' && atelier.location ? (
                      <>
                        <MapPin size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                        <span className="text-caption text-ink-500 truncate">{atelier.location}</span>
                      </>
                    ) : (
                      <>
                        <Video size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                        <span className="text-caption text-ink-500">Distanciel</span>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-tight">
                    <ProgressBar value={percent} fill="warm" size="sm" valueLabel={false} />
                    <span className="text-caption text-ink-500">
                      {atelier.enrolledCount}/{atelier.maxParticipants} places
                    </span>
                  </div>

                  <div className="mt-tight">
                    {isPast ? (
                      <Button variant="ghost" size="sm" fullWidth>Voir le récap</Button>
                    ) : enrollment ? (
                      <Button variant="ghost" size="sm" fullWidth disabled>
                        {enrollment.status === 'waitlist' ? 'Sur liste d\'attente' : 'Inscription en cours'}
                      </Button>
                    ) : isFull ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        fullWidth
                        onClick={() => eventsStore.requestAtelierEnrollment(MOCK_USER_ID, atelier.id)}
                      >
                        Rejoindre la liste d'attente
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => eventsStore.requestAtelierEnrollment(MOCK_USER_ID, atelier.id)}
                      >
                        Demander une inscription
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
