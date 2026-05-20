import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { ErrorPage } from '../components/patterns/ErrorPage';
import { Compass, Home, Search, Zap, HelpCircle } from 'lucide-react';

export const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      tone="default"
      animated="expressive"
      eyebrow={
        <>
          <Compass size={14} strokeWidth={2.25} /> Navigation perdue
        </>
      }
      code="404"
      title="Oups, page non trouvée"
      description="La page demandée n'existe pas ou a été déplacée. Pas de problème, nous vous proposons ces raccourcis utiles."
      suggestions={[
        {
          icon: <Home size={20} />,
          title: 'Tableau de bord',
          description: 'Retourner à votre espace personnel',
          onClick: () => navigate('/dashboard'),
          tone: 'primary',
        },
        {
          icon: <Search size={20} />,
          title: 'Parcours disponibles',
          description: "Explorer tous les cursus d'apprentissage",
          onClick: () => navigate('/learning-paths'),
          tone: 'sun',
        },
        {
          icon: <Zap size={20} />,
          title: 'Veille & Ressources',
          description: 'Découvrir vidéos et contenus récents',
          onClick: () => navigate('/veille'),
          tone: 'warm',
        },
        {
          icon: <HelpCircle size={20} />,
          title: 'Support & Questions',
          description: "Contacter notre équipe d'assistance",
          onClick: () => navigate('/messages'),
          tone: 'primary',
        },
      ]}
      primaryAction={
        <Button onClick={() => navigate('/dashboard')} leadingIcon={<Home size={16} />} size="lg">
          Retour au tableau de bord
        </Button>
      }
    />
  );
};
