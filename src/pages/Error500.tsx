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
      /* Passe typographique du 2026-09-24 : le libellé « Diagnostic » passe de
         700 à 600 (la légende n'a que deux graisses) ; les deux lignes qui
         redisaient la description (« équipe notifiée », « réessayer ») sont
         retirées — l'encart garde la seule donnée qu'on transmet au support. */
      callout={
        <>
          <p className="font-body text-caption font-semibold text-ink-700">Diagnostic</p>
          <p className="font-mono text-caption text-ink-700">
            Code <span className="font-semibold">500</span> · Erreur interne
          </p>
        </>
      }
      /* Arbitrage n°19 : réessayer est l'action principale (solid, au ton
         neutre de la page) ; le retour au tableau de bord, l'issue de repli
         (ghost). Les deux étaient au même poids. */
      primaryAction={
        <Button
          size="lg"
          emphasis="solid"
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
          emphasis="ghost"
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
