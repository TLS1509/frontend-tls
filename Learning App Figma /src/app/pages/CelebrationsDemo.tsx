import { useState } from 'react';
import { Calendar, Trophy, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BookingConfirmedModal } from '../components/celebrations/BookingConfirmedModal';
import { CelebrationCard } from '../components/celebrations/CelebrationCard';
import { ButtonShowcase } from '../components/design-system/ButtonShowcase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface CelebrationsDemoProps {
  onNavigate: (page: string) => void;
}

export default function CelebrationsDemo({ onNavigate }: CelebrationsDemoProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #E8F4F7 0%, #FFF4E6 100%)',
      padding: 'var(--space-8)',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: 'var(--space-8)',
      }}>
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('design-system')}
          style={{ marginBottom: 'var(--space-4)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au Design System
        </Button>

        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-black)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-3)',
            letterSpacing: '-0.02em',
          }}>
            🎉 Celebrations & New Components
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
          }}>
            Découvrez les nouveaux composants inspirés du design Figma
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}>
        {/* Booking Confirmed Modal */}
        <Card>
          <CardHeader>
            <CardTitle style={{
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Calendar className="w-6 h-6" style={{ color: '#F8B044' }} />
              Booking Confirmed Modal
            </CardTitle>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginTop: 'var(--space-2)',
            }}>
              Modal de confirmation avec particules animées et effect glassmorphism
            </p>
          </CardHeader>
          <CardContent>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}>
              <Button
                variant="gradient-warm"
                size="lg"
                onClick={() => setShowBookingModal(true)}
              >
                <Sparkles className="w-5 h-5" />
                Ouvrir le Modal de Confirmation
              </Button>

              <div style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(248, 176, 68, 0.05)',
                border: '1px solid rgba(248, 176, 68, 0.2)',
                width: '100%',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}>
                  ✨ Caractéristiques
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  paddingLeft: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}>
                  <li>Icon animé avec cercles de glow pulsants</li>
                  <li>8 particules colorées flottantes (animation float-particle)</li>
                  <li>3 cards d'information avec icons (Date, Heure, Coach)</li>
                  <li>Effect glassmorphism avec backdrop-blur(20px)</li>
                  <li>Tags stylisés (Booking, Particules, Glass)</li>
                  <li>Gradient de fond bleu → blanc</li>
                </ul>
              </div>
            </div>

            <BookingConfirmedModal
              open={showBookingModal}
              onOpenChange={setShowBookingModal}
              date="24 Jan"
              time="14:00"
              coachName="Sophie"
            />
          </CardContent>
        </Card>

        {/* Celebration Cards */}
        <Card>
          <CardHeader>
            <CardTitle style={{
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Trophy className="w-6 h-6" style={{ color: '#F8B044' }} />
              Celebration Cards
            </CardTitle>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginTop: 'var(--space-2)',
            }}>
              Cards réutilisables avec 3 variants (booking, unlock, badge)
            </p>
          </CardHeader>
          <CardContent>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-4)',
            }}>
              <CelebrationCard
                icon={Calendar}
                title="Booking Confirmed"
                description="Réservation confirmée avec particules animées et effet glassmorphism"
                tags={['Booking', 'Particules', 'Glass']}
                variant="booking"
              />
              <CelebrationCard
                icon={Lock}
                title="Course Unlocked"
                description="Nouveau cours débloqué avec rayons lumineux et effet de glow"
                tags={['Course', 'Rays', 'Unlock']}
                variant="unlock"
              />
              <CelebrationCard
                icon={Trophy}
                title="Badge Earned"
                description="Badge obtenu avec sparkles, rotation 3D et confettis"
                tags={['Badge', 'Sparkles', 'Trophy']}
                variant="badge"
              />
            </div>

            <div style={{
              marginTop: 'var(--space-6)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(85, 161, 180, 0.05)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)',
              }}>
                💡 Usage
              </h4>
              <pre style={{
                fontFamily: 'monospace',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
                whiteSpace: 'pre-wrap',
                background: 'rgba(0, 0, 0, 0.02)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'var(--space-2)',
              }}>
{`<CelebrationCard
  icon={Calendar}
  title="Booking Confirmed"
  description="Réservation confirmée..."
  tags={['Booking', 'Particules', 'Glass']}
  variant="booking"
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Button Showcase */}
        <Card>
          <CardHeader>
            <CardTitle style={{
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Sparkles className="w-6 h-6" style={{ color: '#55A1B4' }} />
              Button Showcase (New Variants)
            </CardTitle>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginTop: 'var(--space-2)',
            }}>
              Ajout des variantes outline-orange et outline-yellow
            </p>
          </CardHeader>
          <CardContent>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}>
              {/* New Outline Variants */}
              <div>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                }}>
                  🆕 Nouvelles Variantes Outline
                </h4>
                <div style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  flexWrap: 'wrap',
                }}>
                  <Button variant="outline-primary">
                    Primary
                  </Button>
                  <Button variant="outline-orange">
                    <Sparkles className="w-4 h-4" />
                    Orange
                  </Button>
                  <Button variant="outline-yellow">
                    <Sparkles className="w-4 h-4" />
                    Yellow
                  </Button>
                  <Button variant="outline-accent">
                    Accent
                  </Button>
                </div>
              </div>

              {/* Code Example */}
              <div style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(85, 161, 180, 0.05)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}>
                  💡 Usage
                </h4>
                <pre style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  whiteSpace: 'pre-wrap',
                  background: 'rgba(0, 0, 0, 0.02)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  marginTop: 'var(--space-2)',
                }}>
{`<Button variant="outline-orange">
  Orange Button
</Button>

<Button variant="outline-yellow">
  Yellow Button
</Button>`}
                </pre>
              </div>

              {/* Full Showcase Link */}
              <div style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'white',
                    marginBottom: 'var(--space-1)',
                  }}>
                    Voir tous les boutons
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}>
                    Découvrez toutes les variantes dans le ButtonShowcase
                  </p>
                </div>
                <Button variant="glass" size="lg">
                  <Sparkles className="w-5 h-5" />
                  Voir Plus
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
