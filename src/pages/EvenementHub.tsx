import React, { useState } from 'react';
import { Calendar, MapPin, Video, Clock, CheckCircle, Lock } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageShell } from '../components/layout';
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
    /* PageShell : la page n'avait pas de marge haute (surtitre collé au bord)
       et son contenu partait 16 px à droite du titre. Deux sections à 48 px :
       l'événement à la une, puis tous les événements — les filtres vivent
       sous le titre de la grille qu'ils filtrent (ils étaient au-dessus de
       l'événement vedette, qu'ils ne filtrent pas), et le total qui fermait la
       page, centré, devient la méta de cette section. */
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Événements' }}
        title="Événements & Conférences"
        summary="Conférences, webinaires et ateliers ouverts à la communauté TLS. Certains événements sont réservés aux membres."
        /* S'abonner au calendrier est un outil : `ghost` (arbitrage n°19).
           `-ml-stack-md` rend à son libellé le bord gauche du texte (le
           padding du ghost le décalait de 20 px). Le seul `solid` possible de
           la page est l'inscription à l'événement à la une ; déjà inscrit, la
           page n'en a plus. */
        trailing={
          <Button emphasis="ghost" tone="brand" size="md" className="-ml-stack-md">
            S'abonner au calendrier
          </Button>
        }
      />

      {featured && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="À la une" size="md" />
          {/* L'événement vedette : la date, le mode et les inscrits sont des
              données — la méta, en légende (ils étaient trois pastilles d'état,
              dont une rouge à point). Titre h3 20 (un h2 rendu à 20), texte 16
              ink-700 à la largeur de lecture (ink-500). */}
          <Card variant="default" className="md:flex-row p-0 overflow-hidden">
            <div className="md:w-64 bg-primary-100 flex items-center justify-center min-h-[180px] shrink-0">
              <Calendar size={48} className="text-primary-300" />
            </div>
            <div className="p-stack-lg flex flex-col flex-1 min-w-0">
              <p className="flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs text-caption text-ink-600">
                <span className="inline-flex items-center gap-stack-2xs"><Calendar size={14} aria-hidden="true" />{formatDate(featured.scheduledAt)}</span>
                <span className="inline-flex items-center gap-stack-2xs">
                  {featured.mode === 'distanciel' ? <Video size={14} aria-hidden="true" /> : <MapPin size={14} aria-hidden="true" />}
                  {featured.mode === 'distanciel' ? 'Distanciel' : 'Présentiel'}
                </span>
                {featured.maxParticipants && (
                  <span className="tabular-nums">{featured.registeredCount}/{featured.maxParticipants} inscrits</span>
                )}
              </p>
              <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{featured.title}</h3>
              <p className="mt-stack-xs text-body text-ink-700 max-w-prose">{featured.description}</p>
              {featured.maxParticipants && (
                <ProgressBar
                  value={Math.round((featured.registeredCount / featured.maxParticipants) * 100)}
                  fill="brand"
                  size="sm"
                  valueLabel={false}
                  className="mt-stack-sm max-w-xs"
                />
              )}
              <div className="mt-stack-lg">
                {eventsStore.getEventRegistration(MOCK_USER_ID, featured.id) ? (
                  <Button emphasis="ghost" tone="neutral" size="md" disabled className="-ml-stack-md">
                    <CheckCircle size={16} className="mr-1.5" /> Déjà inscrit(e)
                  </Button>
                ) : (
                  <Button
                    emphasis="solid"
                    tone="brand"
                    size="md"
                    onClick={() => eventsStore.registerForEvent(MOCK_USER_ID, featured.id)}
                  >
                    S'inscrire · Gratuit
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </section>
      )}

      <section className="flex flex-col gap-stack">
        <SectionHeader
          title="Tous les événements"
          meta={`${filteredEvents.length} événement${filteredEvents.length > 1 ? 's' : ''} affiché${filteredEvents.length > 1 ? 's' : ''} · ${totalRegistered} participants au total`}
          size="md"
        />
        {/* Deux groupes de filtres : 8 px entre eux (2 avant). */}
        <div className="flex flex-col gap-stack-xs">
          <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer par période">
            <FilterChip label="Tous" active={filterTime === 'all'} onClick={() => setFilterTime('all')} />
            <FilterChip label="À venir" active={filterTime === 'upcoming'} onClick={() => setFilterTime('upcoming')} />
            <FilterChip label="Passés" active={filterTime === 'past'} onClick={() => setFilterTime('past')} />
            <FilterChip label={`Mes inscriptions (${myRegistrations.length})`} active={filterTime === 'mine'} onClick={() => setFilterTime('mine')} />
          </div>
          <div className="flex flex-wrap gap-stack-xs" role="group" aria-label="Filtrer par mode">
            <FilterChip label="Tous modes" active={filterMode === 'all'} onClick={() => setFilterMode('all')} />
            <FilterChip label="Distanciel" active={filterMode === 'distanciel'} onClick={() => setFilterMode('distanciel')} icon={<Video size={14} />} />
            <FilterChip label="Présentiel" active={filterMode === 'presentiel'} onClick={() => setFilterMode('presentiel')} icon={<MapPin size={14} />} />
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-body text-ink-600 py-section text-center">Aucun événement dans cette catégorie.</p>
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
                /* Anatomie de carte : les états (disponibilité, accès, inscription)
                   → 4 → le titre h3 20 → 8 → date, durée, mode, organisateur en
                   légende ink-600 → 12 → les places → 24 → l'action. Le mode
                   quitte les pastilles d'état (c'est une donnée). */
                <Card key={ev.id} variant="default" className="p-stack-md flex flex-col">
                  <div className="flex flex-wrap gap-stack-2xs">
                    {isPast ? (
                      <Badge variant="neutral">Terminé</Badge>
                    ) : isFull ? (
                      <Badge variant="danger">Complet</Badge>
                    ) : (
                      <Badge variant="success">Places disponibles</Badge>
                    )}
                    {ev.visibility === 'private' && (
                      <Badge variant="neutral">
                        <Lock size={14} className="inline mr-0.5" />
                        Privé
                      </Badge>
                    )}
                    {registration && (
                      <Badge variant="success">
                        <CheckCircle size={14} className="inline mr-0.5" />
                        Inscrit(e)
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{ev.title}</h3>

                  <p className="mt-stack-xs flex flex-wrap items-center gap-x-stack-sm gap-y-stack-3xs text-caption text-ink-600">
                    <span className="inline-flex items-center gap-stack-2xs"><Calendar size={14} aria-hidden="true" />{formatDate(ev.scheduledAt)}</span>
                    <span className="inline-flex items-center gap-stack-2xs tabular-nums"><Clock size={14} aria-hidden="true" />{ev.durationMinutes} min</span>
                    <span className="inline-flex items-center gap-stack-2xs">
                      {ev.mode === 'presentiel' ? <MapPin size={14} aria-hidden="true" /> : <Video size={14} aria-hidden="true" />}
                      {ev.mode === 'distanciel' ? 'Distanciel' : 'Présentiel'}
                    </span>
                    <span>{ev.organizerName}</span>
                  </p>

                  {!isPast && ev.maxParticipants && (
                    <div className="mt-stack-sm flex items-center gap-stack-xs">
                      <span className="text-caption text-ink-600 tabular-nums">{ev.registeredCount}/{ev.maxParticipants}</span>
                      <ProgressBar value={pct} fill={pct > 90 ? 'danger' : 'brand'} size="sm" valueLabel={false} className="flex-1" />
                    </div>
                  )}

                  {/* L'action de la carte en `soft` ; un état (bouton
                      désactivé) en `ghost` neutre, qui ne se lit pas comme une
                      action (arbitrage n°19), calé sur le bord du texte
                      (`-ml-stack`, le padding du ghost `sm`). */}
                  <div className="mt-auto pt-stack-lg">
                    {!isPrivateAccessible ? (
                      <Button emphasis="ghost" tone="neutral" size="sm" disabled className="-ml-stack">
                        <Lock size={14} className="mr-1.5" /> Réservé aux membres
                      </Button>
                    ) : isPast ? (
                      <Button emphasis="soft" tone="brand" size="sm">Voir le récap</Button>
                    ) : registration ? (
                      <Button emphasis="ghost" tone="neutral" size="sm" disabled className="-ml-stack">Déjà inscrit(e)</Button>
                    ) : (
                      <Button
                        emphasis="soft"
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
      </section>
    </PageShell>
  );
}
