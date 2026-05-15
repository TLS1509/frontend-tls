import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Bell } from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';

// ─── AtelierWaitlist ──────────────────────────────────────────────────────────

export default function AtelierWaitlist() {
  const { id } = useParams<{ id: string }>();
  void id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-section text-center">
        {/* Icône */}
        <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center">
          <Clock size={32} className="text-secondary-600" />
        </div>

        <Badge variant="sun" size="md">Liste d'attente</Badge>

        <h1 className="text-h2 font-display font-bold text-ink-900">
          Tu es sur la liste d'attente
        </h1>

        <p className="text-body-sm text-ink-500">
          L'atelier "Communication assertive" est complet. Tu as été ajouté(e) à la liste d'attente.
        </p>

        {/* Info card */}
        <Card variant="tinted" tone="warm" className="w-full p-6 flex flex-col gap-stack">
          {/* Position */}
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-ink-600">Ta position</span>
            <Badge variant="sun" size="md">
              <span className="text-h3 font-bold">#3</span>
            </Badge>
          </div>

          {/* Manager */}
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-ink-600">Notification manager</span>
            <Badge variant="success" size="sm">Envoyée ✓</Badge>
          </div>

          {/* Session */}
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-ink-600">Session</span>
            <span className="text-body-sm font-semibold text-ink-900">25 juin 2026</span>
          </div>
        </Card>

        {/* Alert */}
        <Alert
          variant="info"
          icon={<Bell size={16} />}
          className="w-full text-left"
        >
          Tu seras notifié(e) par email si une place se libère. Le manager a été informé de ta demande pour validation budgétaire.
        </Alert>

        {/* Actions */}
        <div className="flex flex-col gap-tight w-full">
          <Button variant="primary" size="lg" fullWidth>
            Voir les autres ateliers disponibles
          </Button>
          <Button variant="ghost" size="md" fullWidth>
            Annuler ma demande
          </Button>
        </div>
      </div>
    </div>
  );
}
