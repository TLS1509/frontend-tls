import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

/**
 * /course/:id — redirection vers le détail de parcours.
 *
 * Cette page était un doublon orphelin de `/learning-paths/:id` (aucun lien
 * entrant) qui le contredisait : 0 % contre 4/9 leçons, des objectifs sur le
 * prompt dans un parcours de leadership, du texte de développement visible
 * (« Parcours statique en cours »). Audit du 23/09.
 *
 * La route reste déclarée dans App.tsx pour ne casser aucun lien ancien ; elle
 * renvoie désormais au seul détail de parcours, sans entrée dans l'historique.
 */
export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={id ? `/learning-paths/${id}` : '/learning-paths'} replace />;
};

export default CourseDetail;
