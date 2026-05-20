import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { ErrorPage } from '../components/patterns/ErrorPage';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      tone="danger"
      animated="expressive"
      eyebrow={<>Système • Incident</>}
      code="500"
      icon={<AlertTriangle size={48} strokeWidth={1.5} />}
      title="Erreur serveur"
      description="Une erreur technique s'est produite. Vous pouvez réessayer ou retourner au tableau de bord."
      callout={
        <>
          <p className="font-body text-body-sm font-semibold text-ink-900 m-0">
            Diagnostic rapide (statique)
          </p>
          <p className="font-body text-caption text-ink-500 m-0">
            Code: 500 • Notification équipe technique envoyée • Action recommandée : réessayer dans
            quelques instants.
          </p>
        </>
      }
      primaryAction={
        <Button leadingIcon={<RefreshCw size={18} />} onClick={() => window.location.reload()} size="lg">
          Réessayer
        </Button>
      }
      secondaryAction={
        <Button
          variant="secondary"
          leadingIcon={<Home size={18} />}
          onClick={() => navigate('/dashboard')}
          size="lg"
        >
          Tableau de bord
        </Button>
      }
    />
  );
};
