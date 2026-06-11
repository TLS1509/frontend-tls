import { useState } from 'react';
import { 
  Target, Type, Layout, Bell, Layers, Box, Sparkles, 
  CheckCircle2, AlertTriangle, Info, Zap, TrendingUp, Star,
  Calendar, Trophy, Lock
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Slider } from '../ui/slider';
import { BookingConfirmedModal } from '../celebrations/BookingConfirmedModal';
import { CelebrationCard } from '../celebrations/CelebrationCard';

interface ComponentShowcaseProps {
  category: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  components: Array<{
    name: string;
    description: string;
    preview: React.ReactNode;
  }>;
}

const ComponentShowcase = ({ category, icon: Icon, color, gradient, components }: ComponentShowcaseProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      {/* Category Header */}
      <h3 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: 'var(--text-xl)', 
        fontWeight: 'var(--font-weight-bold)',
        color,
        marginBottom: 'var(--space-6)',
        paddingBottom: 'var(--space-3)',
        borderBottom: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-lg)',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 12px ${color}40`
        }}>
          <Icon className="w-5 h-5" style={{ color: 'white' }} />
        </div>
        {category}
      </h3>

      {/* Components Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: 'var(--space-4)' 
      }}>
        {components.map((comp, index) => (
          <div
            key={index}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: expandedIndex === index ? `2px solid ${color}` : '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: expandedIndex === index 
                ? `0 8px 24px ${color}20, 0 4px 16px ${color}10` 
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1)',
              transform: expandedIndex === index ? 'scale(1.02) translateY(-2px)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (expandedIndex !== index) {
                e.currentTarget.style.boxShadow = `0 4px 16px ${color}15`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (expandedIndex !== index) {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {/* Component Name */}
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)',
            }}>
              {comp.name}
            </h4>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-4)',
            }}>
              {comp.description}
            </p>

            {/* Interactive Preview */}
            <div style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80px',
            }}>
              {comp.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InteractiveComponentCatalog = () => {
  const [progressValue, setProgressValue] = useState(68);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // 🎯 BUTTONS & ACTIONS
  const buttonsComponents = [
    {
      name: 'Button Variants',
      description: 'Boutons avec différents styles et variantes',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="accent" size="sm">Accent</Button>
        </div>
      ),
    },
    {
      name: 'Glass Button',
      description: 'Bouton avec effet glassmorphism',
      preview: (
        <button
          style={{
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            transition: 'all var(--duration-fast)',
            boxShadow: '0 2px 8px rgba(85, 161, 180, 0.15)',
          }}
        >
          Glass Button
        </button>
      ),
    },
    {
      name: 'Gradient Buttons',
      description: 'Boutons avec gradients TLS',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button variant="gradient-primary" size="sm">Gradient</Button>
          <Button variant="gradient-warm" size="sm">Warm</Button>
        </div>
      ),
    },
    {
      name: 'Outline Buttons',
      description: 'Boutons outline avec couleurs TLS',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button variant="outline-primary" size="sm">Primary</Button>
          <Button variant="outline-orange" size="sm">Orange</Button>
          <Button variant="outline-yellow" size="sm">Yellow</Button>
        </div>
      ),
    },
    {
      name: 'Ghost & Link',
      description: 'Boutons ghost et link',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="link" size="sm">Link</Button>
        </div>
      ),
    },
  ];

  // 📝 FORM INPUTS
  const formComponents = [
    {
      name: 'Glass Input',
      description: 'Input avec effet glassmorphism (par défaut)',
      preview: (
        <Input 
          placeholder="Entrez votre texte..." 
          style={{ 
            fontSize: 'var(--text-sm)',
            maxWidth: '240px',
          }} 
        />
      ),
    },
    {
      name: 'Glass Textarea',
      description: 'Textarea avec effet glassmorphism',
      preview: (
        <Textarea 
          placeholder="Votre message..." 
          rows={3}
          style={{ 
            fontSize: 'var(--text-sm)',
            maxWidth: '240px',
          }} 
        />
      ),
    },
    {
      name: 'Checkbox',
      description: 'Case à cocher interactive',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Checkbox 
            checked={checkboxChecked}
            onCheckedChange={setCheckboxChecked}
          />
          <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}>
            J'accepte les conditions
          </span>
        </div>
      ),
    },
    {
      name: 'Switch',
      description: 'Interrupteur avec animation',
      preview: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Switch 
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
          />
          <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)' }}>
            {switchChecked ? 'Activé' : 'Désactivé'}
          </span>
        </div>
      ),
    },
    {
      name: 'Slider',
      description: 'Curseur de sélection de valeur',
      preview: (
        <div style={{ width: '100%', maxWidth: '200px' }}>
          <Slider 
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
          />
          <p style={{ 
            fontSize: 'var(--text-xs)', 
            color: 'var(--muted-foreground)', 
            fontFamily: 'var(--font-body)',
            marginTop: 'var(--space-2)',
            textAlign: 'center',
          }}>
            Valeur: {sliderValue[0]}
          </p>
        </div>
      ),
    },
  ];

  // 🔔 FEEDBACK & NOTIFICATIONS
  const feedbackComponents = [
    {
      name: 'Alert Info',
      description: 'Alerte d\'information',
      preview: (
        <Alert variant="info" style={{ width: '100%', maxWidth: '280px' }}>
          <Info className="h-4 w-4" />
          <AlertTitle style={{ fontFamily: 'var(--font-display)' }}>Info</AlertTitle>
          <AlertDescription style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
            Message d'information
          </AlertDescription>
        </Alert>
      ),
    },
    {
      name: 'Alert Success',
      description: 'Alerte de succès',
      preview: (
        <Alert variant="success" style={{ width: '100%', maxWidth: '280px' }}>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle style={{ fontFamily: 'var(--font-display)' }}>Succès</AlertTitle>
          <AlertDescription style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
            Opération réussie !
          </AlertDescription>
        </Alert>
      ),
    },
    {
      name: 'Alert Warning',
      description: 'Alerte d\'avertissement',
      preview: (
        <Alert variant="warning" style={{ width: '100%', maxWidth: '280px' }}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle style={{ fontFamily: 'var(--font-display)' }}>Attention</AlertTitle>
          <AlertDescription style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)' }}>
            Soyez prudent
          </AlertDescription>
        </Alert>
      ),
    },
    {
      name: 'Badge Variants',
      description: 'Badges avec différentes variantes',
      preview: (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      ),
    },
  ];

  // 📊 PROGRESS & LOADING
  const progressComponents = [
    {
      name: 'Progress Bar Animated',
      description: 'Barre de progression avec animations du Dashboard/Parcours',
      preview: (
        <div style={{ width: '100%', maxWidth: '240px' }}>
          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '8px',
            borderRadius: '9999px',
            background: 'rgba(85, 161, 180, 0.15)',
            overflow: 'hidden',
          }}>
            {/* Progress fill with gradient */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progressValue}%`,
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--primary) 100%)',
              backgroundSize: '200% 100%',
              borderRadius: '9999px',
              transition: 'width var(--duration-normal) cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'shimmer 2s ease-in-out infinite',
            }} />
            
            {/* Glow effect */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '-2px',
              height: 'calc(100% + 4px)',
              width: `${progressValue}%`,
              background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              filter: 'blur(4px)',
              opacity: 0.6,
              transition: 'width var(--duration-normal) cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
          </div>
          
          <p style={{ 
            fontSize: 'var(--text-xs)', 
            color: 'var(--muted-foreground)', 
            fontFamily: 'var(--font-body)',
            marginTop: 'var(--space-2)',
            textAlign: 'center',
          }}>
            {progressValue}% complété
          </p>

          <style>
            {`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.8; }
              }
            `}
          </style>
        </div>
      ),
    },
    {
      name: 'Progress Standard',
      description: 'Barre de progression standard',
      preview: (
        <div style={{ width: '100%', maxWidth: '200px' }}>
          <Progress value={progressValue} />
        </div>
      ),
    },
    {
      name: 'Loading Spinner',
      description: 'Spinner de chargement',
      preview: (
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '3px solid rgba(85, 161, 180, 0.2)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        >
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ),
    },
  ];

  // 🎉 CELEBRATIONS
  const celebrationComponents = [
    {
      name: 'Booking Confirmed Modal',
      description: 'Modal de confirmation de réservation avec particules animées',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Button 
            variant="gradient-warm" 
            size="sm"
            onClick={() => setShowBookingModal(true)}
          >
            <Calendar className="w-4 h-4" />
            Voir Modal
          </Button>
          <BookingConfirmedModal
            open={showBookingModal}
            onOpenChange={setShowBookingModal}
            date="24 Jan"
            time="14:00"
            coachName="Sophie"
          />
        </div>
      ),
    },
    {
      name: 'Celebration Cards',
      description: 'Cards de célébration avec variants (booking, unlock, badge)',
      preview: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: '350px' }}>
          <CelebrationCard
            icon={Calendar}
            title="Booking Confirmed"
            description="Réservation confirmée avec particules animées"
            tags={['Booking', 'Particules', 'Glass']}
            variant="booking"
          />
          <CelebrationCard
            icon={Lock}
            title="Course Unlocked"
            description="Nouveau cours débloqué avec rayons lumineux"
            tags={['Course', 'Rays', 'Unlock']}
            variant="unlock"
          />
          <CelebrationCard
            icon={Trophy}
            title="Badge Earned"
            description="Badge obtenu avec sparkles et rotation"
            tags={['Badge', 'Sparkles', 'Trophy']}
            variant="badge"
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <ComponentShowcase
        category="Buttons & Actions"
        icon={Target}
        color="var(--primary)"
        gradient="linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)"
        components={buttonsComponents}
      />

      <ComponentShowcase
        category="Form Inputs"
        icon={Type}
        color="var(--secondary)"
        gradient="linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)"
        components={formComponents}
      />

      <ComponentShowcase
        category="Feedback & Notifications"
        icon={Bell}
        color="var(--accent)"
        gradient="linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)"
        components={feedbackComponents}
      />

      <ComponentShowcase
        category="Progress & Loading"
        icon={TrendingUp}
        color="var(--success)"
        gradient="linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)"
        components={progressComponents}
      />

      <ComponentShowcase
        category="🎉 Celebrations"
        icon={Sparkles}
        color="#F8B044"
        gradient="linear-gradient(135deg, #F8B044 0%, #ED843A 100%)"
        components={celebrationComponents}
      />

      {/* Stats Summary */}
      <div style={{
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(237, 132, 58, 0.1) 100%)',
        border: '1px solid rgba(85, 161, 180, 0.3)',
        marginTop: 'var(--space-4)',
      }}>
        <h4 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: 'var(--text-lg)', 
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          Statistiques Components
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-6)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary)' }}>75+</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>UI Components</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--secondary)' }}>15</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Common Components</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: '#F8B044' }}>12</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Celebrations</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--success)' }}>100+</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Total Components</p>
          </div>
        </div>
      </div>
    </div>
  );
};
