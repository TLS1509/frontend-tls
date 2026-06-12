import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Bell } from 'lucide-react';
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

  const atelierId = id ?? 'at-002';
  const atelier = eventsStore.ateliers.find((a) => a.id === atelierId)
    ?? eventsStore.ateliers[1];
  const enrollment = atelier
    ? eventsStore.getAtelierEnrollment(MOCK_USER_ID, atelier.id)
    : undefined;

  const waitlistPosition = enrollment?.waitlistPosition ?? 1;

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-secondary-50 px-stack py-page">
      <div className="w-full max-w-md flex flex-col items-center gap-section text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center">
          <Clock size={32} className="text-secondary-600" />
        </div>

        <Badge variant="sun" size="md">Liste d'attente</Badge>

        <h1 className="text-h2 font-display font-bold text-ink-900">
          Tu es sur la liste d'attente
        </h1>

        <p className="text-body-sm text-ink-500">
          L'atelier "{atelier?.title ?? 'Atelier complet'}" est complet.
          Tu as été ajouté(e) à la liste d'attente.
        </p>

        {/* Info card */}
        <Card variant="tinted" tone="warm" className="w-full p-stack-lg flex flex-col gap-stack">
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-ink-600">Ta position</span>
            <Badge variant="sun" size="md">
              <span className="text-h3 font-bold">#{waitlistPosition}</span>
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-body-sm text-ink-600">Notification manager</span>
            <Badge variant="success" size="sm">Envoyée ✓</Badge>
          </div>

          {atelier && (
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-ink-600">Session</span>
              <span className="text-body-sm font-semibold text-ink-900">
                {formatDate(atelier.scheduledAt)}
              </span>
            </div>
          )}

          {atelier && (
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-ink-600">Inscrits / Capacité</span>
              <span className="text-body-sm font-semibold text-ink-900">
                {atelier.enrolledCount} / {atelier.maxParticipants}
              </span>
            </div>
          )}
        </Card>

        <Alert variant="info" icon={<Bell size={16} />} className="w-full text-left">
          Tu seras notifié(e) par email si une place se libère. Le manager a été informé de ta demande pour validation budgétaire.
        </Alert>

        <div className="flex flex-col gap-tight w-full">
          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/ateliers')}>
            Voir les autres ateliers disponibles
          </Button>
          <Button
            variant="ghost"
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
