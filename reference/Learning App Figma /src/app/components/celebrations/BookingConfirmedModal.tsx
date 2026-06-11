import { CheckCircle2, Calendar, Clock, User } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

interface BookingConfirmedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date?: string;
  time?: string;
  coachName?: string;
}

export function BookingConfirmedModal({ 
  open, 
  onOpenChange, 
  date = "24 Jan", 
  time = "14:00", 
  coachName = "Sophie" 
}: BookingConfirmedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(85, 161, 180, 0.2)',
          boxShadow: '0 24px 64px rgba(85, 161, 180, 0.2)',
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 'var(--space-6)',
          padding: 'var(--space-6)',
        }}>
          {/* Icon animé avec particules */}
          <div style={{ position: 'relative' }}>
            {/* Cercles de glow */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              background: 'radial-gradient(circle, rgba(248, 176, 68, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '-10px',
              background: 'radial-gradient(circle, rgba(85, 161, 180, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.5s',
            }} />
            
            {/* Icon principal */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F8B044 0%, #ED843A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(248, 176, 68, 0.4)',
              position: 'relative',
              zIndex: 1,
            }}>
              <CheckCircle2 
                className="w-10 h-10" 
                style={{ 
                  color: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }} 
              />
            </div>

            {/* Particules animées */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#55A1B4' : '#F8B044',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-50px)`,
                  opacity: 0,
                  animation: `float-particle 2s ease-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Titre et description */}
          <div style={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-2)' 
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-black)',
              color: 'var(--foreground)',
              letterSpacing: '-0.02em',
            }}>
              Réservation confirmée !
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
            }}>
              Votre session de coaching est programmée
            </p>
          </div>

          {/* Informations de booking */}
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-3)',
          }}>
            {/* Date */}
            <div style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(85, 161, 180, 0.08)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Calendar className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                }}>
                  {date}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}>
                  Date
                </p>
              </div>
            </div>

            {/* Heure */}
            <div style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(85, 161, 180, 0.08)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Clock className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                }}>
                  {time}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}>
                  Heure
                </p>
              </div>
            </div>

            {/* Coach */}
            <div style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(85, 161, 180, 0.08)',
              border: '1px solid rgba(85, 161, 180, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <User className="w-6 h-6" style={{ color: 'var(--primary)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                }}>
                  {coachName}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}>
                  Coach
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <span style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(85, 161, 180, 0.1)',
              border: '1px solid rgba(85, 161, 180, 0.3)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--primary)',
            }}>
              Booking
            </span>
            <span style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(85, 161, 180, 0.1)',
              border: '1px solid rgba(85, 161, 180, 0.3)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--primary)',
            }}>
              Particules
            </span>
            <span style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(85, 161, 180, 0.1)',
              border: '1px solid rgba(85, 161, 180, 0.3)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--primary)',
            }}>
              Glass
            </span>
          </div>
        </div>

        {/* Animations CSS */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.5;
              transform: scale(1.05);
            }
          }
          
          @keyframes float-particle {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-50px) scale(0);
            }
            20% {
              opacity: 1;
              transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-60px) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-100px) scale(0.5);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
