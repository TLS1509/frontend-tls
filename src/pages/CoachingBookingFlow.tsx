import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { CalendarDays, Clock3, MapPin, Sparkles, UserRound } from 'lucide-react';
import { useToastContext } from '../contexts/ToastContext';

export const CoachingBookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastContext();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    await new Promise((res) => setTimeout(res, 700));
    setIsConfirming(false);
    toast.success('Créneau Mardi 14:30 réservé · Coach Sarah Martin', 'Session confirmée');
    setTimeout(() => navigate('/coaching/pre-questionnaire'), 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <Sparkles size={12} />, label: 'Coaching personnalisé' }}
        title="Coaching Booking Flow"
        summary="Réservation de session coaching : créneau, contexte, validation et questionnaire pré-session."
      />

      <EditorialLayout
        main={
          <SectionCard
            title="Choisir un créneau"
            titleIcon={<CalendarDays size={16} className="text-primary-600" />}
            description="Interface statique de réservation, intégration dynamique différée."
            actions={
              <>
                <Button onClick={handleConfirm} loading={isConfirming}>
                  Confirmer la réservation
                </Button>
                <Button variant="secondary">Voir tous les créneaux</Button>
              </>
            }
          >
            <RelatedItemList
              items={[
                { id: '1', title: 'Lundi 09:00', description: 'Coach : Sarah Martin' },
                { id: '2', title: 'Mardi 14:30', description: 'Coach : Julien Morel' },
              ]}
            />
          </SectionCard>
        }
        aside={
          <SectionCard title="Session choisie">
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-caption text-ink-500">
              <li className="inline-flex items-center gap-1.5"><CalendarDays size={12} /> Mardi 14:30</li>
              <li className="inline-flex items-center gap-1.5"><Clock3 size={12} /> 45 minutes</li>
              <li className="inline-flex items-center gap-1.5"><MapPin size={12} /> Visioconférence</li>
              <li className="inline-flex items-center gap-1.5"><UserRound size={12} /> Coach : Sarah Martin</li>
            </ul>
          </SectionCard>
        }
      />
    </div>
  );
};

export default CoachingBookingFlow;
