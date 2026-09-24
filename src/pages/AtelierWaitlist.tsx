import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bell, Check } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { PageShell } from '../components/layout';
import { useEventsStore } from '../stores/persistence';

const MOCK_USER_ID = 'user-demo';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AtelierWaitlist() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventsStore = useEventsStore();

  // Le store ne se remplit qu'au premier appel d'un getter. On lisait
  // `ateliers` avant tout appel : la liste était vide, et la page affichait son
  // texte de repli, « L'atelier "Atelier complet" est complet » (audit du
  // 23/09). On amorce donc le store, puis on lit son état à jour.
  eventsStore.getAtelierEnrollment(MOCK_USER_ID, '__seed__');
  const ateliers = useEventsStore.getState().ateliers;
  const atelierId = id ?? 'at-002';
  const atelier = ateliers.find((a) => a.id === atelierId) ?? ateliers[1];
  const enrollment = atelier
    ? eventsStore.getAtelierEnrollment(MOCK_USER_ID, atelier.id)
    : undefined;

  const waitlistPosition = enrollment?.waitlistPosition ?? 1;

  return (
    /* L'ouverture de toutes les pages, calée à gauche : l'écran était centré
       sur un fond `secondary-50` qui s'arrêtait à la colonne, avec un h1 à
       28 px, une grosse icône et une pastille « Liste d'attente » qui
       répétait le titre. Le centré ne vaut que pour deux lignes au plus
       (doctrine § 3) ; ici suivent une fiche, une alerte et deux actions. */
    <PageShell width="content" noPadTop gap="section" className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        tone="flat"
        eyebrow="Ateliers · Liste d'attente"
        title="Tu es sur la liste d'attente"
        summary={
          <>
            {atelier ? <>L'atelier «&nbsp;{atelier.title}&nbsp;» est complet.</> : <>Cet atelier est complet.</>}
            {' '}Tu as été ajouté(e) à la liste d'attente.
          </>
        }
      />

      {/* La fiche : libellé 16 ink-700 à gauche, valeur 16/600 ink-900 à
          droite, sur la même ligne de base. La position, l'information clé,
          prend le pas du titre de bloc — elle était enfermée dans une pastille
          d'état. */}
      <Card variant="tinted" tone="warm" className="flex flex-col gap-stack">
        <dl className="flex flex-col gap-stack">
          <div className="flex items-baseline justify-between gap-stack">
            <dt className="text-body text-ink-700">Ta position</dt>
            <dd className="font-display text-h3 text-ink-900 tabular-nums">#{waitlistPosition}</dd>
          </div>
          <div className="flex items-center justify-between gap-stack">
            <dt className="text-body text-ink-700">Notification manager</dt>
            <dd><Badge variant="success" size="compact"><Check size={12} aria-hidden="true" /> Envoyée</Badge></dd>
          </div>
          {atelier && (
            <div className="flex items-baseline justify-between gap-stack">
              <dt className="text-body text-ink-700">Session</dt>
              <dd className="text-body font-semibold text-ink-900">{formatDate(atelier.scheduledAt)}</dd>
            </div>
          )}
          {atelier && (
            <div className="flex items-baseline justify-between gap-stack">
              <dt className="text-body text-ink-700">Inscrits / Capacité</dt>
              <dd className="text-body font-semibold text-ink-900 tabular-nums">
                {atelier.enrolledCount} / {atelier.maxParticipants}
              </dd>
            </div>
          )}
        </dl>
      </Card>

      <div className="flex flex-col gap-stack">
        <Alert variant="info" icon={<Bell size={16} />}>
          Tu seras notifié(e) par email si une place se libère. Le manager a été informé de ta demande pour validation budgétaire.
        </Alert>

        {/* La suite proposée est l'action principale de l'écran, son seul
            `solid` ; le retour est un `ghost` neutre (arbitrage n°19). */}
        <div className="flex flex-wrap items-center gap-stack-xs">
          <Button emphasis="solid" tone="brand" size="lg" onClick={() => navigate('/ateliers')}>
            Voir les autres ateliers disponibles
          </Button>
          <Button
            emphasis="ghost"
            tone="neutral"
            size="lg"
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
