import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { CalendarDays, CheckCircle2, Clock3, Sparkles } from 'lucide-react';
import { Container } from '../components/layout';

export const PreCoachingQuestionnaireResponse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container width="medium" className="py-section flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <Sparkles size={12} />, label: 'Coaching prep' }}
        title="Questionnaire Response"
        summary="Vue de restitution des réponses envoyées au coach, utilisées pour personnaliser votre prochaine session."
        meta={[
          { icon: <CalendarDays size={12} />, label: 'Session prévue mardi 14:30' },
          { icon: <Clock3 size={12} />, label: 'Soumis il y a 2h' },
        ]}
      />

      <EditorialLayout
        main={
          <SectionCard
            title="Vos réponses"
            titleIcon={<CheckCircle2 size={16} className="text-success-fg" />}
            actions={
              <>
                <Button variant="secondary" onClick={() => navigate('/coaching/pre-questionnaire')}>
                  Modifier mes réponses
                </Button>
                <Button onClick={() => navigate('/coaching')}>Retour coaching</Button>
              </>
            }
          >
            <RelatedItemList
              items={[
                { id: '1', title: 'Objectif', description: 'Mieux déléguer dans mon équipe' },
                { id: '2', title: 'Obstacle principal', description: 'Manque de clarté sur les responsabilités' },
                { id: '3', title: 'Sujet prioritaire', description: 'Cadre de suivi et feedback hebdomadaire' },
              ]}
            />
          </SectionCard>
        }
        aside={
          <SectionCard title="Statut">
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-caption text-success-fg">
              <li className="inline-flex items-center gap-1.5"><CheckCircle2 size={12} /> Transmis au coach</li>
              <li className="inline-flex items-center gap-1.5"><CheckCircle2 size={12} /> Pris en compte pour la session</li>
            </ul>
          </SectionCard>
        }
      />
    </Container>
  );
};

export default PreCoachingQuestionnaireResponse;
