import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FilterChip } from '../components/ui/FilterChip';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useEventsStore } from '../stores/persistence';

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

  const filtered = ateliers.filter((a) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return a.status === 'published';
    if (activeFilter === 'past') return a.status === 'completed';
    if (activeFilter === 'mine') return !!eventsStore.getAtelierEnrollment(MOCK_USER_ID, a.id);
    return true;
  });

  const filtreLabel: Record<Filter, string> = {
    all: 'Tous les ateliers',
    upcoming: 'Ateliers à venir',
    past: 'Ateliers passés',
    mine: 'Mes inscriptions',
  };

  return (
    <PageShell width="page" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* « Accès entreprise » dit à qui s'ouvre la page : une donnée de la
          ligne de méta, plus une pastille d'état. Casse normale dans le
          surtitre et le titre (« Ateliers Pratiques », « de ta Cohorte »). */}
      <EditorialHero
        tone="flat"
        eyebrow="Ateliers pratiques"
        title="Ateliers de ta cohorte"
        summary="Sessions pratiques en petit groupe animées par ton coach. Maximum 12 participants. Distanciel ou présentiel."
        meta={[{ label: 'Accès entreprise' }]}
      />

      {/* Une section h2 entre le h1 et les titres de carte (h3) ; les filtres
          vivent sous son titre, le compte passe en méta. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader
          title={filtreLabel[activeFilter]}
          meta={`${filtered.length} atelier${filtered.length > 1 ? 's' : ''}`}
          size="md"
        />
        <div className="flex items-center gap-stack-xs flex-wrap" role="group" aria-label="Filtrer les ateliers">
          <FilterChip label="Tous" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
          <FilterChip label="À venir" active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} />
          <FilterChip label="Passés" active={activeFilter === 'past'} onClick={() => setActiveFilter('past')} />
          <FilterChip label={`Mes inscriptions (${myEnrollments.length})`} active={activeFilter === 'mine'} onClick={() => setActiveFilter('mine')} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-body text-ink-600 py-section text-center">Aucun atelier dans cette catégorie.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-stack">
            {filtered.map((atelier) => {
              const enrollment = eventsStore.getAtelierEnrollment(MOCK_USER_ID, atelier.id);
              const isFull = atelier.enrolledCount >= atelier.maxParticipants;
              const isPast = atelier.status === 'completed';
              const percent = Math.round((atelier.enrolledCount / atelier.maxParticipants) * 100);

              return (
                /* Anatomie de carte (doctrine § 5) : les états → 4 → le titre
                   h3 20 → 8 → le coach → 12 → date, lieu, places (légende
                   ink-600) → 24 → l'action. Tous les blocs se touchaient (la
                   carte déclare `flex`, elle perd son gap) sous un titre à
                   16/600. Le mode (distanciel ou présentiel) est une donnée :
                   il quitte les pastilles d'état pour la ligne de date. */
                <Card key={atelier.id} variant="default" className="flex flex-col p-stack-md">
                  <div className="flex items-center gap-stack-xs flex-wrap">
                    {isPast ? (
                      <Badge variant="success">Passé</Badge>
                    ) : isFull ? (
                      <Badge variant="neutral">Complet</Badge>
                    ) : (
                      <Badge variant="info">À venir</Badge>
                    )}
                    {enrollment && (
                      <Badge variant={enrollment.status === 'waitlist' ? 'warm' : 'success'}>
                        {enrollment.status === 'waitlist' ? (
                          <><AlertCircle size={14} className="inline mr-0.5" />Liste d'attente #{enrollment.waitlistPosition}</>
                        ) : enrollment.status === 'validated' ? (
                          <><CheckCircle size={14} className="inline mr-0.5" />Validé</>
                        ) : (
                          <><Clock size={14} className="inline mr-0.5" />En attente</>
                        )}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-stack-3xs font-display text-h3 text-ink-900">{atelier.title}</h3>

                  <p className="mt-stack-xs flex items-center gap-stack-xs text-caption font-semibold text-ink-900">
                    <Avatar initials={atelier.coachInitials} size="sm" />
                    {atelier.coachName}
                  </p>

                  <div className="mt-stack-sm flex flex-col gap-stack-xs text-caption text-ink-600">
                    {/* Chaque icône voyage avec son texte : l'adresse passait à
                        la ligne en laissant son icône seule au bout de la première. */}
                    <p className="flex flex-wrap items-start gap-x-stack-sm gap-y-stack-3xs text-caption">
                      <span className="inline-flex items-center gap-stack-2xs">
                        <Calendar size={14} className="shrink-0" aria-hidden="true" />
                        {formatDate(atelier.scheduledAt)}
                      </span>
                      {atelier.mode === 'presentiel' && atelier.location ? (
                        <span className="inline-flex items-start gap-stack-2xs min-w-0">
                          <span className="shrink-0 inline-flex items-center h-lh"><MapPin size={14} aria-hidden="true" /></span>
                          <span>Présentiel · {atelier.location}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-stack-2xs">
                          <Video size={14} className="shrink-0" aria-hidden="true" />
                          Distanciel
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col gap-stack-3xs">
                      <ProgressBar value={percent} fill="warm" size="sm" valueLabel={false} />
                      <span className="tabular-nums">
                        {atelier.enrolledCount}/{atelier.maxParticipants} places
                      </span>
                    </div>
                  </div>

                  {/* Arbitrage n°19 : l'action de la carte en `soft` ; un état
                      (« Inscription en cours », bouton désactivé) en `ghost`
                      neutre, qui ne se lit pas comme une action. Un catalogue
                      n'a pas d'action principale : pas de `solid`. */}
                  <div className="mt-auto pt-stack-lg">
                    {isPast ? (
                      <Button emphasis="soft" tone="brand" size="sm" fullWidth>Voir le récap</Button>
                    ) : enrollment ? (
                      <Button emphasis="ghost" tone="neutral" size="sm" fullWidth disabled>
                        {enrollment.status === 'waitlist' ? 'Sur liste d\'attente' : 'Inscription en cours'}
                      </Button>
                    ) : isFull ? (
                      <Button
                        emphasis="soft"
                        tone="brand"
                        size="sm"
                        fullWidth
                        onClick={() => eventsStore.requestAtelierEnrollment(MOCK_USER_ID, atelier.id)}
                      >
                        Rejoindre la liste d'attente
                      </Button>
                    ) : (
                      <Button
                        emphasis="soft"
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
      </section>
    </PageShell>
  );
}
