import React, { useState } from 'react';
import { Video, Calendar, Clock, Users, Play, CheckCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
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
  const enrolledCount = masterclasses.filter((m) => eventsStore.getMasterclassEnrollment(MOCK_USER_ID, m.id)).length;

  const filtered = masterclasses.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return m.status === 'scheduled';
    if (activeFilter === 'replay') return m.status === 'completed' && !!m.vimeoVideoId;
    if (activeFilter === 'enrolled') return !!eventsStore.getMasterclassEnrollment(MOCK_USER_ID, m.id);
    return true;
  });

  const filtreLabel: Record<Filter, string> = {
    all: 'Toutes les masterclasses',
    upcoming: 'Masterclasses à venir',
    replay: 'Replays disponibles',
    enrolled: 'Mes inscriptions',
  };

  return (
    <PageShell width="page" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow="Masterclass"
        title="Masterclasses & Experts"
        summary="Accède aux sessions live avec des experts de l'industrie. Format 90 min. Questions live. Replay illimité."
      />

      {/* Une section h2 entre le h1 et les titres de carte (h3) : ils
          suivaient directement le h1. Les filtres appartiennent à la grille
          qu'ils filtrent, sous son titre ; le compte passe en méta. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title={filtreLabel[activeFilter]}
          meta={`${filtered.length} masterclass${filtered.length > 1 ? 'es' : ''}`}
          size="md"
        />
        <div className="flex items-center gap-stack-xs flex-wrap" role="group" aria-label="Filtrer les masterclasses">
          <FilterChip label="Toutes" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Replays" active={activeFilter === 'replay'} onClick={() => setActiveFilter('replay')} />
          <FilterChip label={`Mes inscriptions (${enrolledCount})`} active={activeFilter === 'enrolled'} onClick={() => setActiveFilter('enrolled')} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-body text-ink-600 py-section text-center">Aucune masterclass dans cette catégorie.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
            {filtered.map((mc) => {
              const enrollment = eventsStore.getMasterclassEnrollment(MOCK_USER_ID, mc.id);
              const isCompleted = mc.status === 'completed';
              const hasReplay = isCompleted && !!mc.vimeoVideoId;
              const isFull = mc.maxParticipants !== null && mc.enrolledCount >= mc.maxParticipants;

              return (
                <Card key={mc.id} variant="default" className="flex flex-col p-0 overflow-hidden">
                  <div className="bg-primary-100 h-44 flex items-center justify-center relative">
                    <Video size={40} className="text-primary-400" />
                    {hasReplay && (
                      <div className="absolute top-2 right-2 flex items-center gap-tight bg-ink-900/80 text-white text-micro px-2 py-0.5 rounded-pill">
                        <Play size={14} /> Replay
                      </div>
                    )}
                  </div>

                  {/* Anatomie de carte (doctrine § 5), padding dense 20 : les
                      états → 4 → le titre h3 20 → 8 → l'expert → 12 → date,
                      durée, places (légende ink-600) → 24 → l'action. Tout
                      était à 2 px (`gap-tight`) sous un titre à 16/600. */}
                  <div className="p-stack-md flex flex-col flex-1">
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
                          <CheckCircle size={14} className="inline mr-0.5" />
                          {enrollment.status === 'completed' ? 'Complétée' : 'Inscrit(e)'}
                        </Badge>
                      )}
                    </div>

                    <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{mc.title}</h3>

                    <div className="mt-stack-xs flex items-center gap-stack-xs">
                      <Avatar initials={mc.expertInitials} size="sm" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-caption font-semibold text-ink-900 truncate">{mc.expertName}</span>
                        <span className="text-caption text-ink-600 truncate">{mc.expertTitle}</span>
                      </div>
                    </div>

                    <div className="mt-stack-sm flex flex-col gap-stack-3xs text-caption text-ink-600">
                      <p className="flex items-center gap-stack-2xs flex-wrap text-caption">
                        <Calendar size={14} className="shrink-0" aria-hidden="true" />
                        <span>{formatDate(mc.scheduledAt)}</span>
                        <Clock size={14} className="shrink-0 ml-stack-xs" aria-hidden="true" />
                        <span className="tabular-nums">{mc.durationMinutes} min</span>
                      </p>
                      {mc.maxParticipants && (
                        <p className="flex items-center gap-stack-2xs text-caption">
                          <Users size={14} className="shrink-0" aria-hidden="true" />
                          <span className="tabular-nums">{mc.enrolledCount} / {mc.maxParticipants} inscrits</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-stack-lg">
                      {hasReplay ? (
                        <Button emphasis="outline" size="sm" fullWidth leadingIcon={<Play size={14} />}>
                          Voir le replay
                        </Button>
                      ) : enrollment ? (
                        <Button emphasis="outline" size="sm" fullWidth disabled>
                          Déjà inscrit(e)
                        </Button>
                      ) : isFull ? (
                        <Button emphasis="outline" size="sm" fullWidth disabled>
                          Complet
                        </Button>
                      ) : (
                        <Button
                          emphasis="soft"
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
      </section>
    </PageShell>
  );
}
