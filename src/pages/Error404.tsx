/**
 * Error404 — Page non trouvée
 *
 * Consomme `patterns/ErrorPage`, le pattern canonique des pages d'erreur
 * (2026-09-24). La page refaisait tout à la main : code géant, blobs animés en
 * boucle, parallaxe, grille de raccourcis. Les raccourcis gardés sont ceux qui
 * ne doublent pas l'action principale : la tuile « Tableau de bord » répétait
 * le bouton juste en dessous.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, BookOpen, Zap, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/core/Button';
import { ErrorPage, type ErrorPageSuggestion } from '../components/patterns/ErrorPage';

export const Error404: React.FC = () => {
  const navigate = useNavigate();

  const suggestions: ErrorPageSuggestion[] = [
    { icon: <BookOpen size={18} />, title: 'Mes parcours', onClick: () => navigate('/learning-paths') },
    { icon: <Zap size={18} />, title: 'Veille & Ressources', onClick: () => navigate('/veille') },
    { icon: <HelpCircle size={18} />, title: 'Support', onClick: () => navigate('/help') },
  ];

  return (
    <ErrorPage
      code="404"
      eyebrow={<><Compass size={14} aria-hidden /> Navigation perdue</>}
      title="On vous remet sur la bonne route"
      description="Cette page n'existe pas ou a été déplacée. Voici par où repartir."
      suggestions={suggestions}
      /* Repartir est l'action principale d'une page d'erreur (arbitrage
         n°19) ; les raccourcis restent des tuiles. */
      primaryAction={
        <Button size="lg" emphasis="solid" tone="brand" onClick={() => navigate('/dashboard')} trailingIcon={<ArrowRight size={18} />}>
          Tableau de bord
        </Button>
      }
    />
  );
};

export default Error404;
