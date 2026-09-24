import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Bell, Check } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
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
    <div className="min-h-[100dvh] flex items-center justify-center bg-secondary-50 px-stack py-page">
      <div className="w-full max-w-md flex flex-col items-center gap-section text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-pill bg-secondary-100 flex items-center justify-center">
          <Clock size={32} className="text-secondary-600" />
        </div>

        <Badge variant="sun" size="normal">Liste d'attente</Badge>

        <h1 className="text-h2 font-display font-bold text-ink-900">
          Tu es sur la liste d'attente
        </h1>

        <p className="text-body text-ink-500">
          {atelier ? <>L'atelier « {atelier.title} » est complet.</> : <>Cet atelier est complet.</>}
          {' '}Tu as été ajouté(e) à la liste d'attente.
        </p>

        {/* Info card */}
        <Card variant="tinted" tone="warm" className="w-full p-stack-lg flex flex-col gap-stack">
          <div className="flex items-center justify-between">
            <span className="text-body text-ink-600">Ta position</span>
            <Badge variant="sun" size="normal">
              <span className="font-display text-h3 font-bold">#{waitlistPosition}</span>
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-body text-ink-600">Notification manager</span>
            <Badge variant="success" size="compact"><Check size={12} aria-hidden="true" /> Envoyée</Badge>
          </div>

          {atelier && (
            <div className="flex items-center justify-between">
              <span className="text-body text-ink-600">Session</span>
              <span className="text-body font-semibold text-ink-900">
                {formatDate(atelier.scheduledAt)}
              </span>
            </div>
          )}

          {atelier && (
            <div className="flex items-center justify-between">
              <span className="text-body text-ink-600">Inscrits / Capacité</span>
              <span className="text-body font-semibold text-ink-900">
                {atelier.enrolledCount} / {atelier.maxParticipants}
              </span>
            </div>
          )}
        </Card>

        <Alert variant="info" icon={<Bell size={16} />} className="w-full text-left">
          Tu seras notifié(e) par email si une place se libère. Le manager a été informé de ta demande pour validation budgétaire.
        </Alert>

        <div className="flex flex-col gap-tight w-full">
          <Button emphasis="soft" size="lg" fullWidth onClick={() => navigate('/ateliers')}>
            Voir les autres ateliers disponibles
          </Button>
          <Button
            emphasis="outline"
            size="md"
            fullWidth
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
}
