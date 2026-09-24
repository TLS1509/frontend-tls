import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { EditorialLayout } from '../components/patterns/EditorialLayout';
import { SectionCard } from '../components/patterns/SectionCard';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import { PageShell } from '../components/layout';
import { CalendarDays, Clock3, MapPin, UserRound, Coins } from 'lucide-react';
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
    'slot-1': { label: 'Lundi 09:00', coach: 'Sophie Marchand', dateISO: '2026-05-19T09:00:00Z' },
    'slot-2': { label: 'Mardi 14:30', coach: 'Sophie Marchand', dateISO: '2026-05-20T14:30:00Z' },
  };

  const slot = SLOTS[selectedSlot];

  const handleConfirm = async () => {
    const profile = profileStore.get();
    if (profile.credits.classic < 1) {
      toast.error('Tu n\'as plus de crédits Classic. Recharge ton compte pour réserver.', 'Crédits insuffisants');
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
    /* PageShell, comme les autres pages : même marge haute, 48 px entre
       l'en-tête et le contenu. L'en-tête passe au ton `flat` des pages de
       l'app (il était en carte teintée) et perd l'étincelle : elle marque une
       fonction d'IA (DESIGN.md §10), une réservation n'en est pas une. */
    <PageShell width="medium" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      <EditorialHero
        eyebrow="Coaching personnalisé"
        title="Réserve ta session"
        summary="Réservation de session coaching : créneau, contexte, validation et questionnaire pré-session."
        tone="flat"
      />

      <EditorialLayout
        main={
          /* Le créneau est la section de la page : titre h2 hors de la carte
             (c'était un h3 de 20 px dans la carte, juste sous le h1). */
          <section className="flex flex-col gap-stack">
            <SectionHeader
              title="Choisir un créneau"
              subtitle="Sélectionne le créneau souhaité : 1 crédit Classic sera déduit à la confirmation."
              size="md"
            />
            <Card className="flex flex-col gap-stack-lg">
              <RelatedItemList
                items={[
                  {
                    id: 'slot-1',
                    title: 'Lundi 09:00',
                    description: 'Avec Sophie Marchand',
                    onClick: () => setSelectedSlot('slot-1'),
                  },
                  {
                    id: 'slot-2',
                    title: 'Mardi 14:30',
                    description: 'Avec Sophie Marchand',
                    onClick: () => setSelectedSlot('slot-2'),
                  },
                ]}
              />
              {/* Confirmer : l'action principale, le seul `solid` (arbitrage
                  n°19). « Voir tous les créneaux » est un renvoi : `ghost`, au
                  ton de la page — il était orange, au même poids que
                  Confirmer. */}
              <div className="flex flex-wrap items-center gap-stack-xs">
                <Button
                  emphasis="solid"
                  tone="brand"
                  onClick={handleConfirm}
                  loading={isConfirming}
                  leadingIcon={<Coins size={14} />}
                >
                  Confirmer (1 crédit Classic)
                </Button>
                <Button emphasis="ghost" tone="brand">Voir tous les créneaux</Button>
              </div>
            </Card>
          </section>
        }
        aside={
          /* Le récapitulatif est ce qu'on vient choisir : il se lit au corps
             du texte (16 ink-900), plus en légende ink-500. Le coût, en
             graisse, pas en orange. */
          <SectionCard title="Session choisie">
            <ul className="flex flex-col gap-stack-xs text-body text-ink-900">
              <li className="flex items-center gap-stack-xs"><CalendarDays size={16} className="shrink-0 text-ink-600" aria-hidden="true" /> {slot.label}</li>
              <li className="flex items-center gap-stack-xs"><Clock3 size={16} className="shrink-0 text-ink-600" aria-hidden="true" /> 60 minutes</li>
              <li className="flex items-center gap-stack-xs"><MapPin size={16} className="shrink-0 text-ink-600" aria-hidden="true" /> Visioconférence</li>
              <li className="flex items-center gap-stack-xs"><UserRound size={16} className="shrink-0 text-ink-600" aria-hidden="true" /> Coach : {slot.coach}</li>
              <li className="flex items-center gap-stack-xs mt-stack-xs pt-stack-sm border-t border-ink-100 font-semibold">
                <Coins size={16} className="shrink-0 text-ink-600" aria-hidden="true" /> 1 crédit Classic requis
              </li>
            </ul>
          </SectionCard>
        }
      />
    </PageShell>
  );
};

export default CoachingBookingFlow;
