import { useState } from 'react';
import { Sparkles, Target, Calendar, Trophy, Flame, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FAQAccordion } from './FAQAccordion';
import { StarRatingModal } from '../feedback/StarRatingModal';
import { LearnerPositioningModal } from '../assessment/LearnerPositioningModal';
import { BookingModal } from '../coaching/BookingModal';
import { BookingModalMinimal } from '../coaching/BookingModalMinimal';
import { CancelSessionModal } from '../coaching/CancelSessionModal';
import { ConfirmationModal } from '../coaching/ConfirmationModal';
import { ConfirmationModalAdvanced } from '../modals/ConfirmationModalAdvanced';
import { SuccessModal } from '../modals/SuccessModal';
import { AchievementUnlockModal } from '../modals/AchievementUnlockModal';
import { StreakCelebrationModal } from '../modals/StreakCelebrationModal';
import { BookingConfirmationModal } from '../modals/BookingConfirmationModal';
import { EmojiRatingModal } from '../modals/EmojiRatingModal';
import { useCelebration } from '../ui/celebration-modal';
import { useToast } from '../ui/notification-toast';

interface ModalsSectionUpdatedProps {
  mockQuestions: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export function ModalsSectionUpdated({ mockQuestions }: ModalsSectionUpdatedProps) {
  // Existing modals
  const [showStarRatingModal, setShowStarRatingModal] = useState(false);
  const [showPositioningModal, setShowPositioningModal] = useState(false);
  const [positioningVariant, setPositioningVariant] = useState<'floating' | 'progressive' | 'fullscreen'>('floating');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingModalMinimal, setShowBookingModalMinimal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // New modals
  const [showConfirmAdvanced, setShowConfirmAdvanced] = useState(false);
  const [confirmVariant, setConfirmVariant] = useState<'danger' | 'success' | 'warning' | 'info'>('info');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementRarity, setAchievementRarity] = useState<'common' | 'rare' | 'epic' | 'legendary'>('rare');
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showEmojiRating, setShowEmojiRating] = useState(false);

  const celebration = useCelebration();
  const toast = useToast();

  return (
    <>
      {/* Emoji Rating Modal - ACTIF POUR FIN DE PARCOURS */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            Modal Satisfaction - Emoji Rating ⭐
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de feedback avec emojis (😞 à 😄) pour la fin des parcours - VERSION ACTIVE
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="accent"
              items={[
                {
                  question: "😄 Caractéristiques principales",
                  answer: "5 emojis interactifs (😞 😕 😐 🙂 😄) avec animations hover, scale, bounce, labels dynamiques, couleurs uniques par rating, champ commentaire optionnel, et bouton gradient TLS.",
                },
                {
                  question: "🎯 Utilisation recommandée",
                  answer: "✅ Fin de parcours complet, ✅ Fin d'étape majeure, ✅ Après session de coaching, ✅ Feedback post-quiz. Plus engageant et visuel que les étoiles.",
                },
                {
                  question: "🎨 Design",
                  answer: "Emojis 48px avec animations rotate au clic, background gradient bleu-orange 5% opacity, glassmorphism modal, selected ring effect avec glow coloré, et textarea qui apparaît en slide-down.",
                },
              ]}
            />

            {/* Demo Button */}
            <button
              onClick={() => setShowEmojiRating(true)}
              style={{
                background: 'linear-gradient(135deg, rgb(248, 176, 68) 0%, rgb(237, 132, 58) 100%)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: '0 8px 24px rgba(248, 176, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(248, 176, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(248, 176, 68, 0.25)';
              }}
            >
              😄 Tester Modal Emoji Rating
            </button>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Confirmation Modal Advanced */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            Modal de Confirmation Avancé
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de confirmation avec 4 variantes (danger, success, warning, info) et animations
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="primary"
              items={[
                {
                  question: "🎨 Variantes disponibles",
                  answer: "4 variantes avec couleurs TLS : Danger (orange), Success (bleu), Warning (jaune), Info (bleu clair). Chaque variante a son icône et gradient personnalisé.",
                },
                {
                  question: "✨ Animations",
                  answer: "Entrée avec spring animation, backdrop blur, hover effects sur les boutons, et icon scale animation.",
                },
              ]}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-2)' }}>
              <button
                onClick={() => {
                  setConfirmVariant('danger');
                  setShowConfirmAdvanced(true);
                }}
                style={{
                  background: 'var(--gradient-destructive)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ⚠️ Danger
              </button>
              <button
                onClick={() => {
                  setConfirmVariant('success');
                  setShowConfirmAdvanced(true);
                }}
                style={{
                  background: 'var(--gradient-success)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ✅ Success
              </button>
              <button
                onClick={() => {
                  setConfirmVariant('warning');
                  setShowConfirmAdvanced(true);
                }}
                style={{
                  background: 'var(--gradient-warning)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ⚡ Warning
              </button>
              <button
                onClick={() => {
                  setConfirmVariant('info');
                  setShowConfirmAdvanced(true);
                }}
                style={{
                  background: 'var(--gradient-info)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ℹ️ Info
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Success Modal */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
            Modal de Succès Animé
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de succès avec checkmark animée, gradient background et pulse effect
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="primary"
              items={[
                {
                  question: "✨ Animations uniques",
                  answer: "Checkmark qui tourne en entrée, pulse ring effect, gradient background animé, et bounce spring animation.",
                },
                {
                  question: "🎯 Utilisation recommandée",
                  answer: "Confirmation d'inscription, validation de paiement, complétion de formulaire, réussite d'une action importante.",
                },
              ]}
            />

            <button
              onClick={() => setShowSuccessModal(true)}
              style={{
                background: 'var(--gradient-success)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: '0 8px 24px rgba(85, 161, 180, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Tester Modal Succès
            </button>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Achievement Unlock Modal */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Trophy className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            Modal de Déblocage d'Achievement
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de célébration pour les déblocages d'achievements avec particules et badges de rareté
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="accent"
              items={[
                {
                  question: "🏆 Système de rareté",
                  answer: "4 niveaux : Commun (gris), Rare (bleu), Épique (violet), Légendaire (or). Chaque rareté a son gradient, glow et animations uniques.",
                },
                {
                  question: "✨ Effets visuels",
                  answer: "Particules flottantes, rotating ring, 3D flip animation, et XP badge avec star icon.",
                },
              ]}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--space-2)' }}>
              {(['common', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => {
                    setAchievementRarity(rarity);
                    setShowAchievementModal(true);
                  }}
                  style={{
                    background: 
                      rarity === 'common' ? 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)' :
                      rarity === 'rare' ? 'var(--gradient-primary)' :
                      rarity === 'epic' ? 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)' :
                      'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {rarity === 'common' && '⚪'}
                  {rarity === 'rare' && '🔵'}
                  {rarity === 'epic' && '🟣'}
                  {rarity === 'legendary' && '🟡'}
                  {' '}{rarity}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Streak Celebration Modal */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Flame className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
            Modal de Série (Streak)
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de célébration de série de jours consécutifs avec flame particles et stats
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="secondary"
              items={[
                {
                  question: "🔥 Animations flame",
                  answer: "Particules de flammes animées qui montent, pulse effect sur l'icône principale, et gradient orange/jaune vibrant.",
                },
                {
                  question: "📊 Statistiques affichées",
                  answer: "Nombre de jours, conversion en semaines, total XP gagné, et badge spécial pour les jalons (7, 30, 100 jours).",
                },
              ]}
            />

            <button
              onClick={() => setShowStreakModal(true)}
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Flame className="w-5 h-5" />
              Tester Modal Streak (7 jours)
            </button>
          </div>
        </CardContent>
      </Card>

      {/* NEW: Booking Confirmation Modal */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            Modal de Confirmation de Réservation
          </CardTitle>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', marginTop: 'var(--space-2)' }}>
            Modal de confirmation pour valider une réservation de session de coaching avec détails complets
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FAQAccordion
              variant="primary"
              items={[
                {
                  question: "📋 Détails affichés",
                  answer: "Titre de session, date, heure, durée, nom du coach, et format de la visioconférence. Info box avec instructions post-confirmation.",
                },
                {
                  question: "🎨 Design",
                  answer: "Card glassmorphism avec gradient overlay, icônes colorées par catégorie (bleu, jaune, orange), grid 2x2 pour les détails, et badges arrondis.",
                },
                {
                  question: "🎯 Utilisation",
                  answer: "Affichée après la sélection de date/heure dans BookingModalMinimal, permet de confirmer ou annuler avant validation finale.",
                },
              ]}
            />

            <button
              onClick={() => setShowBookingConfirmation(true)}
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-4) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: '0 8px 24px rgba(85, 161, 180, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Calendar className="w-5 h-5" />
              Tester Modal Confirmation
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Render Modals */}
      <EmojiRatingModal
        isOpen={showEmojiRating}
        onClose={() => setShowEmojiRating(false)}
        onSubmit={(rating, feedback) => {
          console.log('Rating:', rating, 'Feedback:', feedback);
          toast.success('Merci pour votre avis !', `Vous avez donné ${rating}/5`);
        }}
        title="Comment s'est passé votre parcours ?"
        subtitle="Votre avis nous aide à améliorer l'expérience"
      />

      <ConfirmationModalAdvanced
        isOpen={showConfirmAdvanced}
        onClose={() => setShowConfirmAdvanced(false)}
        onConfirm={() => {
          toast.success('Confirmé !', 'Action effectuée avec succès');
          setShowConfirmAdvanced(false);
        }}
        title="Confirmer l'action"
        message="Êtes-vous sûr de vouloir continuer cette action ?"
        variant={confirmVariant}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Félicitations !"
        message="Votre action a été complétée avec succès"
      />

      <AchievementUnlockModal
        isOpen={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        title="Nouveau Badge Débloqué !"
        description="Vous avez atteint un nouveau niveau de maîtrise"
        rarity={achievementRarity}
        points={achievementRarity === 'legendary' ? 500 : achievementRarity === 'epic' ? 250 : achievementRarity === 'rare' ? 100 : 50}
      />

      <StreakCelebrationModal
        isOpen={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        streakCount={7}
        milestone={7}
        encouragement="Vous êtes sur la bonne voie ! Continuez comme ça."
      />

      <BookingConfirmationModal
        isOpen={showBookingConfirmation}
        onClose={() => setShowBookingConfirmation(false)}
        onConfirm={() => {
          toast.success('Réservation confirmée !', 'Vous recevrez un email de confirmation');
          setShowBookingConfirmation(false);
        }}
        bookingDetails={{
          sessionTitle: 'Session de Coaching IA & Formation',
          date: '31 janv. 2026',
          time: '14:00',
          duration: '1 heure',
          coachName: 'Sophie Martin',
          format: 'Visioconférence Google Meet',
        }}
      />
    </>
  );
}
