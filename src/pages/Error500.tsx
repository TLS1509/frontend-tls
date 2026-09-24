/**
 * Error500 — Erreur serveur
 *
 * Consomme `patterns/ErrorPage`, le pattern canonique des pages d'erreur
 * (2026-09-24), au ton `neutral` : une panne serveur n'est pas une action à
 * mener ni un parcours, le warm (orange) qui l'habillait n'avait pas lieu
 * d'être. La page refaisait tout à la main (code géant, blobs animés en
 * boucle, parallaxe) ; le diagnostic passe dans l'encart du pattern.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { ErrorPage } from '../components/patterns/ErrorPage';

export const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      tone="neutral"
      code="500"
      eyebrow={<><AlertTriangle size={14} aria-hidden /> Système · Incident</>}
      title="Une erreur s'est produite"
      description="Notre équipe technique a été notifiée. Vous pouvez réessayer dans quelques instants."
      callout={
        <>
          <p className="font-body text-caption font-bold text-ink-700 m-0">Diagnostic</p>
          <p className="font-mono text-caption text-ink-700 m-0">
            Code : <span className="font-bold">500</span> · Erreur interne
          </p>
          <p className="font-mono text-caption text-ink-600 m-0">Équipe technique notifiée</p>
          <p className="font-mono text-caption text-ink-600 m-0">
            Action recommandée : réessayer dans quelques instants
          </p>
        </>
      }
      primaryAction={
        <Button
          size="lg"
          emphasis="soft"
          tone="neutral"
          onClick={() => window.location.reload()}
          leadingIcon={<RefreshCw size={18} />}
        >
          Réessayer
        </Button>
      }
      secondaryAction={
        <Button
          size="lg"
          emphasis="soft"
          tone="neutral"
          onClick={() => navigate('/dashboard')}
          leadingIcon={<Home size={16} />}
          trailingIcon={<ArrowRight size={18} />}
        >
          Tableau de bord
        </Button>
      }
    />
  );
};

export default Error500;
