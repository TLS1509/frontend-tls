import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Play, CheckCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { useEventsStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';

type Filter = 'all' | 'upcoming' | 'replay' | 'enrolled';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MasterclassHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const eventsStore = useEventsStore();

  const masterclasses = eventsStore.masterclasses.length > 0
    ? eventsStore.masterclasses
    : (() => { eventsStore.getMasterclassEnrollment(MOCK_USER_ID, '__seed__'); return eventsStore.masterclasses; })();

  const upcomingCount = masterclasses.filter((m) => m.status === 'scheduled').length;
  const replayCount = masterclasses.filter((m) => m.status === 'completed' && m.vimeoVideoId).length;
  const enrolledCount = masterclasses.filter((m) => eventsStore.getMasterclassEnrollment(MOCK_USER_ID, m.id)).length;

  const filtered = masterclasses.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return m.status === 'scheduled';
    if (activeFilter === 'replay') return m.status === 'completed' && !!m.vimeoVideoId;
    if (activeFilter === 'enrolled') return !!eventsStore.getMasterclassEnrollment(MOCK_USER_ID, m.id);
    return true;
  });

  return (
    <PageShell width="page" noPadTop={true}>
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass"
        title="Masterclasses & Experts"
        summary="Accède aux sessions live avec des experts de l'industrie. Format 90 min. Questions live. Replay illimité."
      />

      <div className="flex flex-col gap-section">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          <StatCard label="Prochaines sessions" value={upcomingCount} icon={<Calendar size={18} />} tone="flat" surface="tinted" />
          <StatCard label="Replays disponibles" value={replayCount} icon={<Play size={18} />} tone="flat" surface="tinted" />
          <StatCard label="Mes inscriptions" value={enrolledCount} icon={<Users size={18} />} variant="brand" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-stack-xs flex-wrap">
          <FilterChip label="Toutes" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Replays" active={activeFilter === 'replay'} onClick={() => setActiveFilter('replay')} />
          <FilterChip label={`Mes inscriptions (${enrolledCount})`} active={activeFilter === 'enrolled'} onClick={() => setActiveFilter('enrolled')} />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-body-sm text-ink-400 py-section text-center">Aucune masterclass dans cette catégorie.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {filtered.map((mc) => {
              const enrollment = eventsStore.getMasterclassEnrollment(MOCK_USER_ID, mc.id);
              const isCompleted = mc.status === 'completed';
              const hasReplay = isCompleted && !!mc.vimeoVideoId;
              const isFull = mc.maxParticipants !== null && mc.enrolledCount >= mc.maxParticipants;

              return (
                <Card key={mc.id} variant="default" className="flex flex-col gap-stack p-0 overflow-hidden">
                  <div className="bg-primary-100 h-44 flex items-center justify-center relative">
                    <Video size={40} className="text-primary-400" />
                    {hasReplay && (
                      <div className="absolute top-2 right-2 flex items-center gap-tight bg-ink-900/80 text-white text-micro px-2 py-0.5 rounded-pill">
                        <Play size={10} /> Replay
                      </div>
                    )}
                  </div>

                  <div className="p-stack flex flex-col gap-tight flex-1">
                    <div className="flex items-center gap-stack-xs flex-wrap">
                      {isCompleted ? (
                        <Badge variant="success">Terminée</Badge>
                      ) : isFull ? (
                        <Badge variant="neutral">Complet</Badge>
                      ) : (
                        <Badge variant="info">À venir</Badge>
                      )}
                      {enrollment && (
                        <Badge variant="success">
                          <CheckCircle size={11} className="inline mr-0.5" />
                          {enrollment.status === 'completed' ? 'Complétée' : 'Inscrit(e)'}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-body font-semibold text-ink-900">{mc.title}</h3>

                    <div className="flex items-center gap-stack-xs mt-tight">
                      <Avatar initials={mc.expertInitials} size="sm" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-caption font-semibold text-ink-700 truncate">{mc.expertName}</span>
                        <span className="text-caption text-ink-500 truncate">{mc.expertTitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-stack-xs mt-tight">
                      <Calendar size={13} className="text-ink-400 shrink-0" />
                      <span className="text-caption text-ink-500">{formatDate(mc.scheduledAt)}</span>
                      <Clock size={13} className="text-ink-400 shrink-0 ml-stack-xs" />
                      <span className="text-caption text-ink-500">{mc.durationMinutes} min</span>
                    </div>

                    {mc.maxParticipants && (
                      <div className="flex items-center gap-1.5 text-caption text-ink-500">
                        <Users size={12} className="shrink-0" />
                        <span>{mc.enrolledCount} / {mc.maxParticipants} inscrits</span>
                      </div>
                    )}

                    <div className="mt-auto pt-tight">
                      {hasReplay ? (
                        <Button variant="ghost" size="sm" fullWidth leadingIcon={<Play size={14} />}>
                          Voir le replay
                        </Button>
                      ) : enrollment ? (
                        <Button variant="ghost" size="sm" fullWidth disabled>
                          Déjà inscrit(e)
                        </Button>
                      ) : isFull ? (
                        <Button variant="ghost" size="sm" fullWidth disabled>
                          Complet
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() => eventsStore.enrollInMasterclass(MOCK_USER_ID, mc.id)}
                        >
                          S'inscrire
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}
