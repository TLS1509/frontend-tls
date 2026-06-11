import { useState } from 'react';
import { 
  Palette, Type, Box, Layers, Sparkles, Ruler, Target, Zap, ArrowRight, MessageSquare,
  Info, Check, AlertTriangle, AlertCircle, X, ChevronRight, Search, Filter, ArrowLeft, Star, Heart,
  Bell, Mail, User, Settings, Home, Book, Trophy, Calendar, Plus, Video, Route, BookMarked,
  TrendingUp, CheckCircle2, Award, Lock, Phone, Smartphone, Eye, EyeOff, PanelLeftClose
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader, SectionHeaderCompact } from '../components/common/SectionHeader';
import { 
  ActionCard, JournalPromptCard, ActivityCard,
  VerticalCardXL, VerticalCardLarge, VerticalCardMedium, VerticalCardSmall,
  HorizontalCardLarge, HorizontalCardMedium, HorizontalCardSmall, HorizontalCardMini
} from '../components/patterns/CardPatterns';
import PositionnementModal from '../components/modals/PositionnementModal';
import { CompetenceBadge, CompetenceProgressCard } from '../components/ui/competence-badge';
import { AlertBanner, SuccessAlertBanner } from '../components/ui/AlertBanner';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { SidebarShowcase } from '../components/design-system/SidebarShowcase';

// Types
interface DesignSystemRealPageProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function DesignSystemRealPage({ onNavigate, onLogout }: DesignSystemRealPageProps) {
  const [activeSection, setActiveSection] = useState<'spacing' | 'cards' | 'components' | 'modals' | 'typography' | 'colors' | 'effects' | 'sidebar'>('components');
  const [searchValue, setSearchValue] = useState('');
  const [isPositionnementModalOpen, setIsPositionnementModalOpen] = useState(false);
  const [showPositionnementSuccessBanner, setShowPositionnementSuccessBanner] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [showWarningBanner, setShowWarningBanner] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(false);
  
  // States pour les inputs de démonstration
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const sections = [
    { id: 'spacing', label: 'Espacement', icon: Ruler },
    { id: 'cards', label: 'Cards', icon: Layers },
    { id: 'components', label: 'Composants UI', icon: Box },
    { id: 'modals', label: 'Modals & Feedback', icon: MessageSquare },
    { id: 'typography', label: 'Typographie', icon: Type },
    { id: 'colors', label: 'Couleurs', icon: Palette },
    { id: 'effects', label: 'Effets Visuels', icon: Sparkles },
    { id: 'sidebar', label: 'Sidebar', icon: PanelLeftClose },
  ];

  const spacingSizes = [
    { name: '--space-1', value: '0.25rem', pixels: '4px' },
    { name: '--space-2', value: '0.5rem', pixels: '8px' },
    { name: '--space-3', value: '0.75rem', pixels: '12px' },
    { name: '--space-4', value: '1rem', pixels: '16px' },
    { name: '--space-5', value: '1.25rem', pixels: '20px' },
    { name: '--space-6', value: '1.5rem', pixels: '24px' },
    { name: '--space-8', value: '2rem', pixels: '32px' },
    { name: '--space-10', value: '2.5rem', pixels: '40px' },
    { name: '--space-12', value: '3rem', pixels: '48px' },
    { name: '--space-16', value: '4rem', pixels: '64px' },
  ];

  const colorPalette = [
    { name: 'Primary', var: '--primary', desc: 'Bleu TLS #55A1B4' },
    { name: 'Secondary', var: '--secondary', desc: 'Orange TLS #ED843A' },
    { name: 'Accent', var: '--accent', desc: 'Jaune TLS #F8B044' },
    { name: 'Success', var: '--success', desc: 'Vert #4A8C6E' },
    { name: 'Warning', var: '--warning', desc: 'Jaune TLS #F8B044' },
    { name: 'Destructive', var: '--destructive', desc: 'Rouge #A93226' },
    { name: 'Info', var: '--info', desc: 'Bleu info #2E8F98' },
    { name: 'Background', var: '--background', desc: 'Fond principal' },
    { name: 'Foreground', var: '--foreground', desc: 'Texte principal' },
    { name: 'Card', var: '--card', desc: 'Fond des cartes' },
    { name: 'Border', var: '--border', desc: 'Bordures' },
    { name: 'Muted', var: '--muted', desc: 'Fond atténué' },
    { name: 'Muted Foreground', var: '--muted-foreground', desc: 'Texte secondaire' },
  ];

  const typographySamples = [
    { name: 'Display 2XL', var: '--text-2xl', family: '--font-display', weight: '--font-weight-bold', text: 'The Learning Society' },
    { name: 'Display XL', var: '--text-xl', family: '--font-display', weight: '--font-weight-bold', text: 'Design System TLS' },
    { name: 'Display LG', var: '--text-lg', family: '--font-display', weight: '--font-weight-semibold', text: 'Catalogue de composants' },
    { name: 'Body Base', var: '--text-base', family: '--font-body', weight: '--font-weight-regular', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Body SM', var: '--text-sm', family: '--font-body', weight: '--font-weight-regular', text: 'Texte de description ou label de formulaire.' },
    { name: 'Body XS', var: '--text-xs', family: '--font-body', weight: '--font-weight-regular', text: 'Très petit texte pour les notes ou métadonnées.' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--background)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-6)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        flexShrink: 0
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Back Button */}
          <button
            onClick={() => onNavigate?.('dashboard')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              transition: 'all var(--duration-base) ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
          >
            <ArrowLeft size={16} />
            Retour au Dashboard
          </button>

          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'var(--text-4xl)', 
            fontWeight: 'var(--font-weight-bold)',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}>
            TLS Design System
          </h1>
          <p style={{ 
            fontSize: 'var(--text-base)', 
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-body)',
            marginTop: 'var(--space-2)',
            margin: 0,
          }}>
            Catalogue visuel et interactif des composants The Learning Society
          </p>

          {/* Navigation Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-2)', 
            marginTop: 'var(--space-6)',
            flexWrap: 'wrap',
          }}>
            {sections.map(section => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: isActive ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isActive ? 'rgba(85, 161, 180, 0.1)' : 'var(--card)',
                    color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    transition: 'all var(--duration-base) ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = 'rgba(85, 161, 180, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.background = 'var(--card)';
                    }
                  }}
                >
                  <IconComponent size={16} />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        overflow: 'auto'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: 'var(--space-8)',
          paddingBottom: 'var(--space-16)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--space-6)'
          }}>
          
          {/* ========== SPACING & LAYOUT SECTION ========== */}
          {activeSection === 'spacing' && (
            <>
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Ruler}
                    title="Système d'espacement"
                    subtitle="Variables d'espacement basées sur rem (1rem = 16px)"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {spacingSizes.map(size => (
                      <div key={size.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div style={{ width: '200px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                          <code style={{ background: 'var(--muted)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                            {size.name}
                          </code>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                          <div 
                            style={{ 
                              width: size.value,
                              height: '32px',
                              background: 'var(--gradient-primary)',
                              borderRadius: 'var(--radius-sm)',
                            }}
                          />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                            {size.value} ({size.pixels})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Border Radius */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Border Radius"
                    subtitle="Variables de border-radius pour les coins arrondis"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
                    {[
                      { name: '--radius-sm', value: '0.25rem' },
                      { name: '--radius-md', value: '0.5rem' },
                      { name: '--radius-lg', value: '0.75rem' },
                      { name: '--radius-xl', value: '1rem' },
                      { name: '--radius-2xl', value: '1.5rem' },
                      { name: '--radius-full', value: '9999px' },
                    ].map(radius => (
                      <div key={radius.name}>
                        <div 
                          style={{ 
                            height: '80px',
                            background: 'var(--gradient-primary)',
                            borderRadius: `var(${radius.name})`,
                            marginBottom: 'var(--space-2)',
                          }}
                        />
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0 }}>
                          <code style={{ background: 'var(--muted)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                            {radius.name}
                          </code>
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          {radius.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== CARDS SECTION ========== */}
          {activeSection === 'cards' && (
            <>
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Layers}
                    title="Système de Cards"
                    subtitle="Default Glass Cards et Glass with Shadow Cards"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
                    {/* Default Card */}
                    <div style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                    }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                        Default Card
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-2)' }}>
                        Carte standard avec fond glassmorphism et bordure simple.
                      </p>
                    </div>

                    {/* Glass Card with Shadow */}
                    <div style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      boxShadow: 'var(--shadow-lg)',
                    }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                        Glass Card with Shadow
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-2)' }}>
                        Carte avec effet d'ombre pour plus de profondeur visuelle.
                      </p>
                    </div>

                    {/* Hover Interactive Card */}
                    <div 
                      style={{
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-6)',
                        cursor: 'pointer',
                        transition: 'all var(--duration-base) ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                        Interactive Hover Card
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-2)' }}>
                        Survolez cette carte pour voir l'effet d'élévation et de bordure.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Cards - Dashboard Quick Actions */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Action Cards (Dashboard)"
                    subtitle="Cards d'actions rapides utilisées dans le Dashboard"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
                    <ActionCard
                      icon={Video}
                      iconColor="var(--primary)"
                      title="Coaching 1-to-1"
                      description="Réserver une session"
                    />
                    <ActionCard
                      icon={Route}
                      iconColor="var(--secondary)"
                      title="Parcours"
                      description="Explorer les cours"
                    />
                    <ActionCard
                      icon={BookMarked}
                      iconColor="var(--accent)"
                      title="Journal"
                      description="Noter mes réflexions"
                    />
                    <ActionCard
                      icon={Sparkles}
                      iconColor="var(--primary)"
                      title="Veille"
                      description="Découvrir du contenu"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Journal Prompt Cards */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Journal Prompt Cards"
                    subtitle="Cards de prompts journal avec badge et icône"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
                    <JournalPromptCard
                      badge="Apprentissage"
                      badgeColor="var(--primary)"
                      badgeBg="var(--primary-lighter)"
                      icon={BookMarked}
                      iconColor="var(--primary)"
                      question="Quelle a été ma plus grande découverte aujourd'hui ?"
                    />
                    <JournalPromptCard
                      badge="Blocage"
                      badgeColor="var(--accent)"
                      badgeBg="var(--accent-lighter)"
                      icon={TrendingUp}
                      iconColor="var(--accent)"
                      question="Qu'est-ce qui m'a ralenti et comment puis-je le surmonter ?"
                    />
                    <JournalPromptCard
                      badge="Gratitude"
                      badgeColor="var(--secondary)"
                      badgeBg="var(--secondary-lighter)"
                      icon={Sparkles}
                      iconColor="var(--secondary)"
                      question="Pour quoi suis-je reconnaissant dans mon parcours ?"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Activity Cards */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Activity Cards (Feed)"
                    subtitle="Cards d'activité pour fil d'actualités"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <ActivityCard
                      icon={CheckCircle2}
                      iconColor="var(--success)"
                      title="Leçon terminée"
                      date="Il y a 2 heures"
                      description="Vous avez terminé la leçon 'Introduction au Machine Learning'"
                    />
                    <ActivityCard
                      icon={Award}
                      iconColor="var(--accent)"
                      title="Nouveau badge débloqué"
                      date="Hier"
                      description="Vous avez obtenu le badge 'Pionnier de l'IA'"
                    />
                    <ActivityCard
                      icon={TrendingUp}
                      iconColor="var(--secondary)"
                      title="Série maintenue"
                      date="Aujourd'hui"
                      description="Vous avez maintenu votre série d'apprentissage à 7 jours"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Vertical Cards */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Vertical Cards (Sizes)"
                    subtitle="Cards verticales - Small, Medium, Large, XL"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                    <VerticalCardSmall
                      icon={Star}
                      iconColor="var(--primary)"
                      title="Small Card"
                      description="Card verticale compacte pour grids serrés"
                    />
                    <VerticalCardMedium
                      icon={Trophy}
                      iconColor="var(--secondary)"
                      title="Medium Card"
                      description="Card verticale standard pour grids balanced"
                    />
                    <VerticalCardLarge
                      icon={Award}
                      iconColor="var(--accent)"
                      title="Large Card"
                      description="Card verticale featured pour mise en avant"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Horizontal Cards */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Horizontal Cards (Sizes)"
                    subtitle="Cards horizontales - Mini, Small, Medium, Large"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <HorizontalCardMini
                      icon={Heart}
                      iconColor="var(--primary)"
                      title="Mini Card - Ultra-compact"
                    />
                    <HorizontalCardSmall
                      icon={Star}
                      iconColor="var(--secondary)"
                      title="Small Card"
                      description="Card horizontale compacte pour listes"
                    />
                    <HorizontalCardMedium
                      icon={Trophy}
                      iconColor="var(--accent)"
                      title="Medium Card"
                      description="Card horizontale standard pour list items"
                    />
                    <HorizontalCardLarge
                      icon={Award}
                      iconColor="var(--primary)"
                      title="Large Card"
                      description="Card horizontale full-width pour featured content"
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== COMPONENTS SECTION ========== */}
          {activeSection === 'components' && (
            <>
              {/* Buttons - Utilisation du composant réel */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Box}
                    title="Boutons (Button Component)"
                    subtitle="Composant Button standardisé TLS avec gradients single-color"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {/* Primary & Secondary */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Primary & Secondary Variants
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <Button variant="primary" size="md">
                          Primary Button
                        </Button>
                        <Button variant="primary" size="md" icon={Check}>
                          Avec icône
                        </Button>
                        <Button variant="secondary" size="md">
                          Secondary Button
                        </Button>
                      </div>
                    </div>

                    {/* Outline & Ghost */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Outline & Ghost Variants
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <Button variant="outline" size="md">
                          Outline Button
                        </Button>
                        <Button variant="outline" size="md" icon={Plus}>
                          Ajouter
                        </Button>
                        <Button variant="ghost" size="md">
                          Ghost Button
                        </Button>
                        <Button variant="destructive" size="md" icon={X}>
                          Supprimer
                        </Button>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Tailles disponibles
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Button variant="primary" size="sm">
                          Small
                        </Button>
                        <Button variant="primary" size="md">
                          Medium
                        </Button>
                        <Button variant="primary" size="lg">
                          Large
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges - Utilisation du composant réel */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Badges & Tags (Badge Component)"
                    subtitle="Composant Badge standardisé TLS - Texte blanc sur badge accent"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {/* Status Badges */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Status Badges
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="destructive">Error</Badge>
                        <Badge variant="info">Info</Badge>
                        <Badge variant="neutral">Neutral</Badge>
                      </div>
                    </div>

                    {/* Accent Badge avec texte blanc */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Accent Badge (jaune avec texte blanc #f8fbfd)
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                        <span style={{
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--accent)',
                          color: '#f8fbfd',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}>
                          Premium
                        </span>
                        <span style={{
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--accent)',
                          color: '#f8fbfd',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}>
                          Nouveau
                        </span>
                        <span style={{
                          padding: 'var(--space-1) var(--space-3)',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--accent)',
                          color: '#f8fbfd',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}>
                          🎉 Célébration
                        </span>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Tailles disponibles
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Badge variant="primary" size="sm">Small</Badge>
                        <Badge variant="primary" size="md">Medium</Badge>
                        <Badge variant="primary" size="lg">Large</Badge>
                      </div>
                    </div>

                    {/* With Count */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Badges avec compteurs
                      </h5>
                      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                        <Badge variant="primary" count={5}>Messages</Badge>
                        <Badge variant="secondary" count={7}>Parcours</Badge>
                        <Badge variant="accent" count={8}>Nouveautés</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SearchBar - Composant réel */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Search}
                    title="SearchBar Component"
                    subtitle="Barre de recherche standardisée avec glassmorphism"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ maxWidth: '600px' }}>
                    <SearchBar 
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Rechercher dans le design system..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Form Inputs - Composants réels */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Type}
                    title="Form Inputs"
                    subtitle="Champs de formulaire avec glassmorphism et validation"
                    iconColor="var(--secondary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    
                    {/* Input Standard */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Input Standard
                      </h5>
                      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                          <label 
                            htmlFor="input-text"
                            style={{ 
                              display: 'block',
                              fontFamily: 'var(--font-body)', 
                              fontSize: 'var(--text-sm)', 
                              fontWeight: 'var(--font-weight-medium)', 
                              color: 'var(--foreground)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            Nom complet
                          </label>
                          <Input
                            id="input-text"
                            type="text"
                            placeholder="Jean Dupont"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Input Email avec icône */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Input Email avec icône
                      </h5>
                      <div style={{ maxWidth: '400px' }}>
                        <label 
                          htmlFor="input-email"
                          style={{ 
                            display: 'block',
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          Adresse email
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Mail 
                            style={{ 
                              position: 'absolute', 
                              left: '12px', 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              width: '20px',
                              height: '20px',
                              color: 'var(--muted-foreground)'
                            }} 
                          />
                          <Input
                            id="input-email"
                            type="email"
                            placeholder="votre@email.com"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            className="pl-10"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Input Password avec toggle visibility */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Input Password avec toggle
                      </h5>
                      <div style={{ maxWidth: '400px' }}>
                        <label 
                          htmlFor="input-password"
                          style={{ 
                            display: 'block',
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          Mot de passe
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Lock 
                            style={{ 
                              position: 'absolute', 
                              left: '12px', 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              width: '20px',
                              height: '20px',
                              color: 'var(--muted-foreground)'
                            }} 
                          />
                          <Input
                            id="input-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Votre mot de passe"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            className="pl-10 pr-10"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: 'absolute',
                              right: '12px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            {showPassword ? (
                              <EyeOff style={{ width: '20px', height: '20px' }} />
                            ) : (
                              <Eye style={{ width: '20px', height: '20px' }} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Input Phone */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Input Téléphone
                      </h5>
                      <div style={{ maxWidth: '400px' }}>
                        <label 
                          htmlFor="input-phone"
                          style={{ 
                            display: 'block',
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          Numéro de téléphone
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Phone 
                            style={{ 
                              position: 'absolute', 
                              left: '12px', 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              width: '20px',
                              height: '20px',
                              color: 'var(--muted-foreground)'
                            }} 
                          />
                          <Input
                            id="input-phone"
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            className="pl-10"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Textarea */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        Textarea
                      </h5>
                      <div style={{ maxWidth: '600px' }}>
                        <label 
                          htmlFor="input-textarea"
                          style={{ 
                            display: 'block',
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-sm)', 
                            fontWeight: 'var(--font-weight-medium)', 
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)'
                          }}
                        >
                          Message
                        </label>
                        <Textarea
                          id="input-textarea"
                          placeholder="Écrivez votre message ici..."
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                          rows={4}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-normal)',
                            resize: 'vertical',
                          }}
                        />
                      </div>
                    </div>

                    {/* Input States */}
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-3)' }}>
                        États des inputs
                      </h5>
                      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                          <label 
                            htmlFor="input-disabled"
                            style={{ 
                              display: 'block',
                              fontFamily: 'var(--font-body)', 
                              fontSize: 'var(--text-sm)', 
                              fontWeight: 'var(--font-weight-medium)', 
                              color: 'var(--muted-foreground)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            Input désactivé
                          </label>
                          <Input
                            id="input-disabled"
                            type="text"
                            placeholder="Champ désactivé"
                            disabled
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                        </div>
                        <div>
                          <label 
                            htmlFor="input-error"
                            style={{ 
                              display: 'block',
                              fontFamily: 'var(--font-body)', 
                              fontSize: 'var(--text-sm)', 
                              fontWeight: 'var(--font-weight-medium)', 
                              color: 'var(--foreground)',
                              marginBottom: 'var(--space-2)'
                            }}
                          >
                            Input avec erreur
                          </label>
                          <Input
                            id="input-error"
                            type="email"
                            placeholder="email-invalide"
                            aria-invalid="true"
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-normal)',
                            }}
                          />
                          <p style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--destructive)', 
                            marginTop: 'var(--space-2)',
                            margin: 0,
                            paddingTop: 'var(--space-1)'
                          }}>
                            Veuillez entrer une adresse email valide
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Section Headers - Composant réel */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Target}
                    title="Section Headers"
                    subtitle="Headers de section avec icônes colorées inline"
                    iconColor="var(--secondary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    {/* Full Section Header */}
                    <div>
                      <SectionHeader 
                        icon={Book}
                        title="Ma Bibliothèque"
                        subtitle="Tous vos cours et ressources d'apprentissage"
                        iconColor="var(--primary)"
                      />
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, paddingLeft: 'calc(2.25rem + var(--space-3))' }}>
                        Contenu de la section ici...
                      </p>
                    </div>

                    {/* With Action Button */}
                    <div>
                      <SectionHeader 
                        icon={Trophy}
                        title="Réalisations"
                        subtitle="Vos badges et accomplissements"
                        iconColor="var(--accent)"
                        action={
                          <Button variant="outline" size="sm" icon={Plus}>
                            Voir tout
                          </Button>
                        }
                      />
                    </div>

                    {/* Compact Version */}
                    <div>
                      <SectionHeaderCompact 
                        icon={Calendar}
                        title="Sessions à venir"
                        subtitle="3 sessions cette semaine"
                        iconColor="var(--secondary)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input Fields */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Input Fields"
                    subtitle="Champs de formulaire et contrôles"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '500px' }}>
                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', display: 'block', marginBottom: 'var(--space-2)' }}>
                        Nom d'utilisateur
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Entrez votre nom"
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', display: 'block', marginBottom: 'var(--space-2)' }}>
                        Message
                      </label>
                      <textarea 
                        placeholder="Votre message..."
                        rows={4}
                        style={{
                          width: '100%',
                          padding: 'var(--space-3)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          resize: 'vertical',
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== MODALS & FEEDBACK SECTION ========== */}
          {activeSection === 'modals' && (
            <>
              {/* Positionnement Modal */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Target}
                    title="Modal de Positionnement Apprenant"
                    subtitle="Navigation question par question avec auto-avancement et progression"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {/* Description */}
                    <div style={{ 
                      padding: 'var(--space-4)', 
                      borderRadius: 'var(--radius-lg)',
                      background: 'rgba(85, 161, 180, 0.05)',
                      border: '1px solid rgba(85, 161, 180, 0.1)',
                    }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-2)' }}>
                        Progressive Cards Layout
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>
                        Modal intuitif permettant d'évaluer le niveau de compétence des apprenants avant de commencer un parcours. Chaque question est présentée individuellement avec 5 niveaux de compétence : Débutant, Novice, Intermédiaire, Avancé et Expert.
                      </p>
                    </div>

                    {/* Features */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                      <div style={{ 
                        padding: 'var(--space-4)', 
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                          <Sparkles size={20} style={{ color: 'var(--primary)' }} />
                          <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            Progress Bar
                          </h5>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0 }}>
                          Barre de progression en temps réel avec pourcentage
                        </p>
                      </div>

                      <div style={{ 
                        padding: 'var(--space-4)', 
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                          <Target size={20} style={{ color: 'var(--secondary)' }} />
                          <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            5 Niveaux
                          </h5>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0 }}>
                          Débutant, Novice, Intermédiaire, Avancé, Expert
                        </p>
                      </div>

                      <div style={{ 
                        padding: 'var(--space-4)', 
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                          <Zap size={20} style={{ color: 'var(--accent)' }} />
                          <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            Navigation Fluide
                          </h5>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0 }}>
                          Avancement automatique avec bouton "Suivant"
                        </p>
                      </div>
                    </div>

                    {/* Interactive Demo Button */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      padding: 'var(--space-6)',
                      borderRadius: 'var(--radius-xl)',
                      background: 'linear-gradient(150.76deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)',
                      border: '2px solid rgba(0, 0, 0, 0.05)',
                    }}>
                      <Button 
                        variant="primary" 
                        size="lg" 
                        icon={Target}
                        onClick={() => setIsPositionnementModalOpen(true)}
                      >
                        Voir l'aperçu interactif
                      </Button>
                    </div>

                    {/* Color Legend - TLS Levels */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <h4 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-lg)', 
                        fontWeight: 'var(--font-weight-semibold)', 
                        color: 'var(--foreground)', 
                        margin: 0 
                      }}>
                        Couleurs TLS par Niveau
                      </h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)' }}>
                        {/* Débutant - Jaune Clair */}
                        <div style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, rgba(255, 193, 90, 0.1) 0%, white 100%)',
                          border: '2px solid #FFC15A',
                          boxShadow: '0 4px 12px rgba(255, 193, 90, 0.4)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '36px', marginBottom: 'var(--space-2)' }}>🌱</div>
                          <div style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-xs)', 
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#FFC15A',
                            marginBottom: 'var(--space-1)',
                          }}>
                            Débutant
                          </div>
                          <div style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)',
                          }}>
                            Jaune Clair
                          </div>
                        </div>

                        {/* Novice - Jaune Orangé */}
                        <div style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, white 100%)',
                          border: '2px solid #F8B044',
                          boxShadow: '0 4px 12px rgba(248, 176, 68, 0.4)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '36px', marginBottom: 'var(--space-2)' }}>🔥</div>
                          <div style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-xs)', 
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#F8B044',
                            marginBottom: 'var(--space-1)',
                          }}>
                            Novice
                          </div>
                          <div style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)',
                          }}>
                            Jaune Orangé
                          </div>
                        </div>

                        {/* Intermédiaire - Coral */}
                        <div style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, rgba(244, 154, 118, 0.1) 0%, white 100%)',
                          border: '2px solid #f49a76',
                          boxShadow: '0 4px 12px rgba(244, 154, 118, 0.4)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '36px', marginBottom: 'var(--space-2)' }}>🎯</div>
                          <div style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-xs)', 
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#f49a76',
                            marginBottom: 'var(--space-1)',
                          }}>
                            Intermédiaire
                          </div>
                          <div style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)',
                          }}>
                            Coral
                          </div>
                        </div>

                        {/* Avancé - Bleu TLS */}
                        <div style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, white 100%)',
                          border: '2px solid #55A1B4',
                          boxShadow: '0 4px 12px rgba(85, 161, 180, 0.4)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '36px', marginBottom: 'var(--space-2)' }}>🚀</div>
                          <div style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-xs)', 
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#55A1B4',
                            marginBottom: 'var(--space-1)',
                          }}>
                            Avancé
                          </div>
                          <div style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)',
                          }}>
                            Bleu TLS
                          </div>
                        </div>

                        {/* Expert - Teal */}
                        <div style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, rgba(157, 190, 186, 0.1) 0%, white 100%)',
                          border: '2px solid #9dbeba',
                          boxShadow: '0 4px 12px rgba(157, 190, 186, 0.5)',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '36px', marginBottom: 'var(--space-2)' }}>⭐</div>
                          <div style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-xs)', 
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#9dbeba',
                            marginBottom: 'var(--space-1)',
                          }}>
                            Expert
                          </div>
                          <div style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)',
                          }}>
                            Teal
                          </div>
                        </div>
                      </div>

                      {/* Info Banner */}
                      <div style={{
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, rgba(157, 190, 186, 0.08) 0%, rgba(244, 154, 118, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                      }}>
                        <Sparkles size={16} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                        <p style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)', 
                          color: 'var(--foreground)', 
                          margin: 0 
                        }}>
                          <strong>Nouvelle palette TLS !</strong> Progression harmonieuse du chaud au froid avec deux nouvelles couleurs : <strong style={{ color: 'var(--coral)' }}>Coral</strong> (intermédiaire) et <strong style={{ color: 'var(--teal)' }}>Teal</strong> (expert)
                        </p>
                      </div>
                    </div>

                    {/* Competence Badges Examples */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <h4 style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-lg)', 
                        fontWeight: 'var(--font-weight-semibold)', 
                        color: 'var(--foreground)', 
                        margin: 0 
                      }}>
                        Badges de Compétences
                      </h4>
                      
                      {/* Compact Badges */}
                      <div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-sm)', 
                          color: 'var(--muted-foreground)', 
                          margin: 0,
                          marginBottom: 'var(--space-3)',
                        }}>
                          Format Compact avec indicateurs de niveau
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                          <CompetenceBadge competenceKey="outils_numeriques" label="Outils Numériques" level={1} size="sm" />
                          <CompetenceBadge competenceKey="analyse_donnees" label="Analyse de Données" level={2} size="md" />
                          <CompetenceBadge competenceKey="communication" label="Communication" level={3} size="md" />
                          <CompetenceBadge competenceKey="gestion_projet" label="Gestion de Projet" level={4} size="md" />
                          <CompetenceBadge competenceKey="leadership" label="Leadership" level={5} size="lg" />
                        </div>
                      </div>

                      {/* Progress Cards */}
                      <div>
                        <p style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-sm)', 
                          color: 'var(--muted-foreground)', 
                          margin: 0,
                          marginBottom: 'var(--space-3)',
                        }}>
                          Cards détaillées avec progression
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                          <CompetenceProgressCard
                            competenceKey="ia_formation"
                            label="IA pour la Formation"
                            level={3}
                            description="Utilisation des outils IA pour créer des contenus pédagogiques"
                            lastUpdated={new Date()}
                          />
                          <CompetenceProgressCard
                            competenceKey="design_pedagogique"
                            label="Design Pédagogique"
                            level={4}
                            previousLevel={2}
                            description="Conception de parcours d'apprentissage efficaces"
                            lastUpdated={new Date()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts & Notifications */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={MessageSquare}
                    title="Alerts & Notifications"
                    subtitle="Composants de feedback utilisateur"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {/* Success Alert */}
                    <div style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--success)',
                      background: 'rgba(34, 197, 94, 0.1)',
                      display: 'flex',
                      alignItems: 'start',
                      gap: 'var(--space-3)',
                    }}>
                      <Check size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--success)', margin: 0 }}>
                          Succès !
                        </h5>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          Votre action a été effectuée avec succès.
                        </p>
                      </div>
                    </div>

                    {/* Warning Alert */}
                    <div style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--warning)',
                      background: 'rgba(251, 146, 60, 0.1)',
                      display: 'flex',
                      alignItems: 'start',
                      gap: 'var(--space-3)',
                    }}>
                      <AlertTriangle size={20} style={{ color: 'var(--warning)', flexShrink: 0 }} />
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--warning)', margin: 0 }}>
                          Attention
                        </h5>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          Cette action nécessite votre attention.
                        </p>
                      </div>
                    </div>

                    {/* Info Alert */}
                    <div style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--primary)',
                      background: 'rgba(85, 161, 180, 0.1)',
                      display: 'flex',
                      alignItems: 'start',
                      gap: 'var(--space-3)',
                    }}>
                      <Info size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)', margin: 0 }}>
                          Information
                        </h5>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          Voici une information importante pour vous.
                        </p>
                      </div>
                    </div>

                    {/* Error Alert */}
                    <div style={{
                      padding: 'var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--destructive)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'start',
                      gap: 'var(--space-3)',
                    }}>
                      <X size={20} style={{ color: 'var(--destructive)', flexShrink: 0 }} />
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--destructive)', margin: 0 }}>
                          Erreur
                        </h5>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          Une erreur s'est produite lors du traitement.
                        </p>
                      </div>
                    </div>

                    {/* Alert Banners (Floating) - Démo Tous Variants */}
                    <div style={{
                      padding: 'var(--space-6)',
                      borderRadius: 'var(--radius-xl)',
                      background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.05) 0%, rgba(248, 176, 68, 0.03) 100%)',
                      border: '2px solid rgba(85, 161, 180, 0.2)',
                    }}>
                      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', margin: 0, marginBottom: 'var(--space-2)' }}>
                        🎯 Alert Banners (Floating)
                      </h5>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>
                        Banners de notification qui s'affichent en haut de l'écran avec couleurs sémantiques TLS. Auto-dismiss après 5 secondes. <strong>Note :</strong> Teal (success) et Coral (error) sont utilisés pour les alerts et les niveaux.
                      </p>
                      
                      {/* Grid de boutons pour tester les variants */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: 'var(--space-3)' 
                      }}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowSuccessBanner(true)}
                          style={{
                            borderColor: 'var(--success)',
                            color: 'var(--success)',
                          }}
                        >
                          ✅ Success (Teal)
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowErrorBanner(true)}
                          style={{
                            borderColor: 'var(--destructive)',
                            color: 'var(--destructive)',
                          }}
                        >
                          ❌ Error (Coral)
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowWarningBanner(true)}
                          style={{
                            borderColor: 'var(--warning)',
                            color: 'var(--warning)',
                          }}
                        >
                          ⚠️ Warning (Jaune)
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowInfoBanner(true)}
                          style={{
                            borderColor: 'var(--info)',
                            color: 'var(--info)',
                          }}
                        >
                          ℹ️ Info (Bleu foncé)
                        </Button>
                      </div>

                      {/* Note sur les couleurs */}
                      <div style={{
                        marginTop: 'var(--space-4)',
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'rgba(157, 190, 186, 0.1)',
                        border: '1px solid rgba(157, 190, 186, 0.3)',
                      }}>
                        <p style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)', 
                          color: 'var(--muted-foreground)', 
                          margin: 0,
                          lineHeight: 'var(--leading-relaxed)',
                        }}>
                          💡 <strong>Niveaux de compétences :</strong> Débutant (Teal #9dbeba) → Novice (Coral #f49a76) → Intermédiaire (Jaune) → Avancé (Orange) → Expert (Bleu TLS)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== TYPOGRAPHIE SECTION ========== */}
          {activeSection === 'typography' && (
            <>
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Type}
                    title="Typography System"
                    subtitle="Système typographique avec League Spartan et Nunito"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {typographySamples.map(sample => (
                      <div key={sample.name} style={{ 
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--muted)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontWeight: 'var(--font-weight-semibold)' }}>
                            {sample.name}
                          </span>
                          <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', background: 'var(--background)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}>
                            {sample.var}
                          </code>
                        </div>
                        <p style={{
                          fontFamily: `var(${sample.family})`,
                          fontSize: `var(${sample.var})`,
                          fontWeight: `var(${sample.weight})`,
                          color: 'var(--foreground)',
                          margin: 0,
                        }}>
                          {sample.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Font Weights */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Font Weights"
                    subtitle="Échelle de poids de police disponibles"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {[
                      { name: 'Regular', var: '--font-weight-regular', value: '400' },
                      { name: 'Medium', var: '--font-weight-medium', value: '500' },
                      { name: 'Semibold', var: '--font-weight-semibold', value: '600' },
                      { name: 'Bold', var: '--font-weight-bold', value: '700' },
                    ].map(weight => (
                      <div key={weight.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <code style={{ 
                          width: '180px',
                          fontFamily: 'monospace', 
                          fontSize: 'var(--text-xs)', 
                          color: 'var(--muted-foreground)', 
                          background: 'var(--muted)', 
                          padding: 'var(--space-1) var(--space-2)', 
                          borderRadius: 'var(--radius-sm)' 
                        }}>
                          {weight.var}
                        </code>
                        <p style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-base)', 
                          fontWeight: `var(${weight.var})`,
                          color: 'var(--foreground)',
                          margin: 0,
                        }}>
                          {weight.name} ({weight.value}) - The quick brown fox jumps
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== COULEURS SECTION ========== */}
          {activeSection === 'colors' && (
            <>
              <Card>
                <CardHeader>
                  <SectionHeader 
                    icon={Palette}
                    title="Colors System"
                    subtitle="Palette de couleurs TLS (#55A1B4, #ED843A, #F8B044)"
                    iconColor="var(--primary)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
                    {colorPalette.map(color => (
                      <div key={color.name} style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        background: 'var(--card)',
                      }}>
                        <div 
                          style={{ 
                            height: '80px',
                            borderRadius: 'var(--radius-lg)',
                            background: `var(${color.var})`,
                            marginBottom: 'var(--space-3)',
                            border: color.var === '--background' || color.var === '--card' ? '1px solid var(--border)' : 'none',
                          }}
                        />
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                          {color.name}
                        </h5>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                          {color.desc}
                        </p>
                        <code style={{ 
                          fontFamily: 'monospace', 
                          fontSize: 'var(--text-xs)', 
                          color: 'var(--muted-foreground)', 
                          background: 'var(--muted)', 
                          padding: 'var(--space-1) var(--space-2)', 
                          borderRadius: 'var(--radius-sm)',
                          display: 'inline-block',
                          marginTop: 'var(--space-2)',
                        }}>
                          {color.var}
                        </code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* ========== EFFECTS SECTION ========== */}
          {activeSection === 'effects' && (
            <>
              {/* ⚠️ RÈGLES GRADIENTS - INFO IMPORTANTE */}
              <Card style={{ border: '2px solid var(--destructive)', background: 'rgba(169, 50, 38, 0.03)' }}>
                <CardHeader>
                  <SectionHeader 
                    icon={AlertCircle}
                    title="⚠️ Règles strictes d'utilisation des gradients"
                    subtitle="Les gradients multicouleurs sont INTERDITS pour les composants UI (sauf exceptions)"
                    iconColor="var(--destructive)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
                    <p style={{ marginBottom: 'var(--space-4)', fontWeight: 'var(--font-weight-semibold)' }}>
                      ✅ <strong>AUTORISÉ</strong> pour les gradients multicouleurs :
                    </p>
                    <ul style={{ marginLeft: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
                      <li>Textes et headings (via background-clip)</li>
                      <li>Backgrounds de pages entières</li>
                      <li>Sections hero</li>
                      <li>Progress bars et sliders</li>
                      <li>Combinaison Orange+Jaune uniquement</li>
                    </ul>
                    <p style={{ marginBottom: 'var(--space-4)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--destructive)' }}>
                      ❌ <strong>INTERDIT</strong> pour les gradients multicouleurs :
                    </p>
                    <ul style={{ marginLeft: 'var(--space-6)' }}>
                      <li>Boutons (utiliser gradients single-color uniquement)</li>
                      <li>Cards et containers</li>
                      <li>Badges</li>
                      <li>Tous composants UI standards</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* ✨ SINGLE COLOR GRADIENTS - SECTION MISE EN AVANT ✨ */}
              <Card style={{ border: '2px solid var(--success)', boxShadow: 'var(--shadow-xl)' }}>
                <CardHeader>
                  <SectionHeader 
                    icon={Sparkles}
                    title="✨ Gradients Single-Color (14 gradients whitelisted)"
                    subtitle="SEULS gradients autorisés pour les composants UI - Basés sur une seule couleur"
                    iconColor="var(--success)"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                      Gradients Linéaires Primary Blue (2)
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                      {[
                        { name: '--gradient-primary', label: 'Primary Gradient', desc: 'Boutons et éléments principaux' },
                        { name: '--gradient-primary-glass', label: 'Primary Glass', desc: 'Overlay glassmorphism' },
                      ].map(gradient => (
                        <div key={gradient.name} style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                        }}>
                          <div 
                            style={{ 
                              height: '100px',
                              borderRadius: 'var(--radius-lg)',
                              background: `var(${gradient.name})`,
                              marginBottom: 'var(--space-2)',
                            }}
                          />
                          <h6 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            {gradient.label}
                          </h6>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                            {gradient.desc}
                          </p>
                          <code style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)', 
                            fontFamily: 'monospace', 
                            background: 'var(--muted)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-block',
                            marginTop: 'var(--space-2)',
                          }}>
                            {gradient.name}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                      Gradients Secondary Orange (3)
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                      {[
                        { name: '--gradient-secondary', label: 'Secondary Gradient' },
                        { name: '--gradient-secondary-light', label: 'Secondary Light' },
                        { name: '--gradient-secondary-radial', label: 'Secondary Radial' },
                      ].map(gradient => (
                        <div key={gradient.name} style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                        }}>
                          <div 
                            style={{ 
                              height: '100px',
                              borderRadius: 'var(--radius-lg)',
                              background: `var(${gradient.name})`,
                              marginBottom: 'var(--space-2)',
                            }}
                          />
                          <h6 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            {gradient.label}
                          </h6>
                          <code style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)', 
                            fontFamily: 'monospace', 
                            background: 'var(--muted)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-block',
                            marginTop: 'var(--space-2)',
                          }}>
                            {gradient.name}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                      Gradients Accent Yellow (3)
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                      {[
                        { name: '--gradient-accent-light', label: 'Accent Light' },
                        { name: '--gradient-accent-warm', label: 'Accent Warm' },
                        { name: '--gradient-accent-radial', label: 'Accent Radial' },
                      ].map(gradient => (
                        <div key={gradient.name} style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                        }}>
                          <div 
                            style={{ 
                              height: '100px',
                              borderRadius: 'var(--radius-lg)',
                              background: `var(${gradient.name})`,
                              marginBottom: 'var(--space-2)',
                            }}
                          />
                          <h6 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            {gradient.label}
                          </h6>
                          <code style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)', 
                            fontFamily: 'monospace', 
                            background: 'var(--muted)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-block',
                            marginTop: 'var(--space-2)',
                          }}>
                            {gradient.name}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                      Gradients Mixed (4) - Orange+Jaune uniquement
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                      {[
                        { name: '--gradient-warm', label: 'Warm (Orange→Yellow)' },
                        { name: '--gradient-cool', label: 'Cool (Blue shades)' },
                        { name: '--gradient-sunset', label: 'Sunset' },
                        { name: '--gradient-fire', label: 'Fire' },
                      ].map(gradient => (
                        <div key={gradient.name} style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                        }}>
                          <div 
                            style={{ 
                              height: '100px',
                              borderRadius: 'var(--radius-lg)',
                              background: `var(${gradient.name})`,
                              marginBottom: 'var(--space-2)',
                            }}
                          />
                          <h6 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            {gradient.label}
                          </h6>
                          <code style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)', 
                            fontFamily: 'monospace', 
                            background: 'var(--muted)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-block',
                            marginTop: 'var(--space-2)',
                          }}>
                            {gradient.name}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                      Gradients Spéciaux (2)
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                      {[
                        { name: '--gradient-primary-radial', label: 'Primary Radial', desc: 'Cercles et effets radiaux' },
                        { name: '--gradient-circular-tls', label: 'Circular TLS', desc: 'Pages d\'authentification' },
                      ].map(gradient => (
                        <div key={gradient.name} style={{
                          padding: 'var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                        }}>
                          <div 
                            style={{ 
                              height: '100px',
                              borderRadius: 'var(--radius-lg)',
                              background: `var(${gradient.name})`,
                              marginBottom: 'var(--space-2)',
                            }}
                          />
                          <h6 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                            {gradient.label}
                          </h6>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', margin: 0, marginTop: 'var(--space-1)' }}>
                            {gradient.desc}
                          </p>
                          <code style={{ 
                            fontSize: 'var(--text-xs)', 
                            color: 'var(--muted-foreground)', 
                            fontFamily: 'monospace', 
                            background: 'var(--muted)',
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'inline-block',
                            marginTop: 'var(--space-2)',
                          }}>
                            {gradient.name}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shadow System */}
              <Card>
                <CardHeader>
                  <SectionHeader 
                    title="Shadow System"
                    subtitle="Échelle d'ombres pour la profondeur visuelle"
                  />
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
                    {[
                      { name: '--shadow-sm', label: 'Small' },
                      { name: '--shadow-md', label: 'Medium' },
                      { name: '--shadow-lg', label: 'Large' },
                      { name: '--shadow-xl', label: 'Extra Large' },
                    ].map(shadow => (
                      <div key={shadow.name}>
                        <div 
                          style={{ 
                            height: '100px',
                            borderRadius: 'var(--radius-lg)',
                            background: 'var(--card)',
                            marginBottom: 'var(--space-3)',
                            boxShadow: `var(${shadow.name})`,
                          }}
                        />
                        <h5 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', margin: 0 }}>
                          {shadow.label}
                        </h5>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'monospace', margin: 0, marginTop: 'var(--space-1)' }}>
                          {shadow.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          {/* ========== SIDEBAR SECTION ========== */}
          {activeSection === 'sidebar' && (
            <SidebarShowcase />
          )}

          </div>
        </div>
      </div>

      {/* Positionnement Modal */}
      <PositionnementModal 
        isOpen={isPositionnementModalOpen}
        onClose={() => setIsPositionnementModalOpen(false)}
        onComplete={(responses) => {
          console.log('Assessment complete:', responses);
        }}
        onPositionnementComplete={() => {
          // Afficher le banner de succès après fermeture du modal
          setShowPositionnementSuccessBanner(true);
        }}
      />

      {/* Alert Banners - Système de notifications avec couleurs sémantiques TLS */}
      
      {/* Success Banner - Positionnement (Bleu TLS #73AFBF) */}
      <AlertBanner
        show={showPositionnementSuccessBanner}
        onDismiss={() => setShowPositionnementSuccessBanner(false)}
        variant="success"
        title="✅ Positionnement enregistré avec succès !"
        message="Vos compétences ont été ajoutées à votre profil apprenant"
        autoDismiss={true}
        autoDismissDelay={5000}
      />

      {/* Success Banner - Démo (Bleu TLS) */}
      <AlertBanner
        show={showSuccessBanner}
        onDismiss={() => setShowSuccessBanner(false)}
        variant="success"
        title="✅ Opération réussie !"
        message="Votre action a été effectuée avec succès"
      />

      {/* Error Banner - Démo (Orange #F18A4C) */}
      <AlertBanner
        show={showErrorBanner}
        onDismiss={() => setShowErrorBanner(false)}
        variant="error"
        title="❌ Erreur détectée"
        message="Une erreur s'est produite lors du traitement de votre demande"
      />

      {/* Warning Banner - Démo (Jaune #F8B044) */}
      <AlertBanner
        show={showWarningBanner}
        onDismiss={() => setShowWarningBanner(false)}
        variant="warning"
        title="⚠️ Action requise"
        message="Cette opération nécessite votre attention avant de continuer"
      />

      {/* Info Banner - Démo (Bleu foncé #4A8FA1) */}
      <AlertBanner
        show={showInfoBanner}
        onDismiss={() => setShowInfoBanner(false)}
        variant="info"
        title="ℹ️ Information importante"
        message="Voici une mise à jour importante concernant votre parcours"
      />
    </div>
  );
}
