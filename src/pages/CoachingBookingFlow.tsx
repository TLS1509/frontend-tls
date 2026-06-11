import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { Container } from '../components/layout';
import { CalendarDays, Clock3, MapPin, Sparkles, UserRound, Coins } from 'lucide-react';
import { useToastContext } from '../contexts/ToastContext';
import { useUserProfileStore, useCoachingStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { MOCK_COACH_ID } from '../data/coaching';

export const CoachingBookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToastContext();
  const profileStore = useUserProfileStore();
  const coachingStore = useCoachingStore();
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<'slot-1' | 'slot-2'>('slot-2');

  const SLOTS = {
    'slot-1': { label: 'Lundi 09:00', coach: 'Sarah Martin', dateISO: '2026-05-19T09:00:00Z' },
    'slot-2': { label: 'Mardi 14:30', coach: 'Sophie Marchand', dateISO: '2026-05-20T14:30:00Z' },
  };

  const slot = SLOTS[selectedSlot];

  const handleConfirm = async () => {
    const profile = profileStore.get();
    if (profile.credits.classic < 1) {
      toast.error('Vous n\'avez plus de crédits Classic. Rechargez votre compte pour réserver.', 'Crédits insuffisants');
      return;
    }
    setIsConfirming(true);
    await new Promise((res) => setTimeout(res, 700));

    // Deduct 1 classic credit (Cahier #04 + #03)
    profileStore.patch({ credits: { ...profile.credits, classic: profile.credits.classic - 1 } });

    // Save session to store
    coachingStore.addSession({
      id: `session-${Date.now()}`,
      learnerId: MOCK_USER_ID,
      coachId: MOCK_COACH_ID,
      coachName: slot.coach,
      coachSpeciality: 'Leadership & Développement managérial',
      type: 'classic',
      status: 'booked',
      scheduledAt: slot.dateISO,
      durationMinutes: 60,
      preQuestionnaireCompleted: false,
      xpAwarded: 120,
      createdAt: new Date().toISOString(),
    });

    setIsConfirming(false);
    toast.success(`Créneau ${slot.label} réservé · Coach ${slot.coach}`, 'Session confirmée');
    setTimeout(() => navigate('/coaching/pre-questionnaire'), 600);
  };

  return (
    <Container width="medium" className="py-section flex flex-col gap-section">
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
            description="Sélectionnez le créneau souhaité : 1 crédit Classic sera déduit à la confirmation."
            actions={
              <>
                <Button
                  onClick={handleConfirm}
                  loading={isConfirming}
                  leadingIcon={<Coins size={15} />}
                >
                  Confirmer (1 crédit Classic)
                </Button>
                <Button variant="secondary">Voir tous les créneaux</Button>
              </>
            }
          >
            <RelatedItemList
              items={[
                {
                  id: 'slot-1',
                  title: 'Lundi 09:00',
                  description: 'Coach : Sarah Martin',
                  onClick: () => setSelectedSlot('slot-1'),
                },
                {
                  id: 'slot-2',
                  title: 'Mardi 14:30',
                  description: 'Coach : Sophie Marchand',
                  onClick: () => setSelectedSlot('slot-2'),
                },
              ]}
            />
          </SectionCard>
        }
        aside={
          <SectionCard title="Session choisie">
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-caption text-ink-500">
              <li className="inline-flex items-center gap-1.5"><CalendarDays size={12} /> {slot.label}</li>
              <li className="inline-flex items-center gap-1.5"><Clock3 size={12} /> 60 minutes</li>
              <li className="inline-flex items-center gap-1.5"><MapPin size={12} /> Visioconférence</li>
              <li className="inline-flex items-center gap-1.5"><UserRound size={12} /> Coach : {slot.coach}</li>
              <li className="inline-flex items-center gap-1.5 mt-2 text-secondary-600 font-medium">
                <Coins size={12} /> 1 crédit Classic requis
              </li>
            </ul>
          </SectionCard>
        }
      />
    </Container>
  );
};

export default CoachingBookingFlow;
