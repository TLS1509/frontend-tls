/**
 * Dashboard Page — User Learning Hub
 *
 * Central dashboard with:
 * - Personalized hero greeting with stats
 * - Quick action cards for main features
 * - Continue learning card with progress
 * - Prompt reflection cards for journaling
 * - Recent activity feed
 *
 * Uses TLS design tokens throughout. No hardcoded values.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/core/Button';
import { ActivityItem } from '../components/ui/ActivityItem';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { CardGrid } from '../components/patterns/CardGrid';
import { Card, CardTitle, CardDesc } from '../components/core/Card';
import {
  Users,
  Map,
  PenLine,
  Sparkles,
  BookOpen,
  TrendingUp,
  Heart,
  CheckCircle2,
  Award,
  Flame,
} from 'lucide-react';
import { PromptCard } from '../components/learning';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  path: string;
}

interface PromptItem {
  id: string;
  label: string;
  badgeVariant: 'info' | 'warm' | 'sun';
  icon: React.ReactNode;
  text: string;
  path: string;
  cardBg?: string;
  cardBorder?: string;
}

const DAILY_QUOTES = [
  "L'apprentissage est un voyage, pas une destination.",
  "Ce n'est pas l'intelligence qui garantit le succès, c'est la curiosité.",
  "Chaque jour, une nouvelle compétence transforme votre potentiel.",
  "Apprendre, c'est s'offrir la liberté de devenir.",
  "La croissance commence là où la zone de confort s'arrête.",
  "Un petit progrès chaque jour mène à de grands changements.",
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [focusedAction, setFocusedAction] = useState<string | null>(null);
  const [hoveredContinue, setHoveredContinue] = useState(false);
  const [focusedContinue, setFocusedContinue] = useState(false);
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Rotate daily quote based on day of year
  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }, []);
  const activities: Activity[] = [
    { id: '1', title: 'Leçon terminée', description: 'Vous avez terminé "Introduction au Machine Learning".', timestamp: 'Il y a 2 heures' },
    { id: '2', title: 'Nouveau badge débloqué', description: "Vous avez obtenu le badge 'Pionnier de l'IA'.", timestamp: 'Hier' },
    { id: '3', title: 'Série maintenue', description: "Vous avez maintenu votre série d'apprentissage à 7 jours.", timestamp: "Aujourd'hui" },
  ];
  const progressValue = 68;
  const quickActions: QuickAction[] = [
    {
      id: 'coaching',
      icon: <Users size={28} strokeWidth={1.8} color="var(--tls-primary-600)" />,
      iconBg: 'var(--tls-primary-50)',
      title: 'Coaching 1-to-1',
      description: 'Réserver une session',
      path: '/coaching',
    },
    {
      id: 'paths',
      icon: <Map size={28} strokeWidth={1.8} color="var(--tls-orange-600)" />,
      iconBg: 'var(--tls-orange-50)',
      title: 'Parcours',
      description: 'Explorer les cours',
      path: '/learning-paths',
    },
    {
      id: 'journal',
      icon: <PenLine size={28} strokeWidth={1.8} color="var(--tls-yellow-600)" />,
      iconBg: 'var(--tls-yellow-50)',
      title: 'Journal',
      description: 'Noter mes réflexions',
      path: '/journal',
    },
    {
      id: 'veille',
      icon: <Sparkles size={28} strokeWidth={1.8} color="var(--tls-primary-500)" />,
      iconBg: 'var(--tls-primary-50)',
      title: 'Veille',
      description: 'Découvrir du contenu',
      path: '/veille',
    },
  ];
  const prompts: PromptItem[] = [
    {
      id: 'learning',
      label: 'Apprentissage',
      badgeVariant: 'info',
      icon: <BookOpen size={34} strokeWidth={1.8} color="var(--tls-primary-600)" />,
      text: "Quelle a été ma plus grande découverte aujourd'hui ?",
      path: '/journal/new',
      cardBg: 'linear-gradient(135deg, var(--tls-primary-50), var(--tls-primary-100))',
      cardBorder: 'var(--tls-primary-200)',
    },
    {
      id: 'block',
      label: 'Blocage',
      badgeVariant: 'warm',
      icon: <TrendingUp size={34} strokeWidth={1.8} color="var(--tls-orange-600)" />,
      text: "Qu'est-ce qui m'a ralenti et comment puis-je le surmonter ?",
      path: '/journal/new',
      cardBg: 'linear-gradient(135deg, var(--tls-orange-50), var(--tls-orange-100))',
      cardBorder: 'var(--tls-orange-200)',
    },
    {
      id: 'gratitude',
      label: 'Gratitude',
      badgeVariant: 'sun',
      icon: <Heart size={34} strokeWidth={1.8} color="var(--tls-yellow-600)" />,
      text: 'Pour quoi suis-je reconnaissant dans mon parcours ?',
      path: '/journal/new',
      cardBg: 'linear-gradient(135deg, var(--tls-yellow-50), var(--tls-yellow-100))',
      cardBorder: 'var(--tls-yellow-200)',
    },
  ];

  const getActivityIcon = (id: string) => {
    if (id === '1') return <CheckCircle2 size={18} />;
    if (id === '2') return <Award size={18} />;
    return <Flame size={18} />;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section with Greeting & Stats */}
      <section style={{ background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-orange-500))', color: 'var(--text-inverse)', padding: 'var(--s-12)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blur blobs with breathe animation — using glass tokens */}
        <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--glass-fill-light)', filter: 'var(--glass-blur-light)', pointerEvents: 'none', animation: 'dbBreathe 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--glass-fill-light)', filter: 'var(--glass-blur-light)', pointerEvents: 'none', animation: 'dbBreathe 8s ease-in-out infinite 2s' }} />
        <div style={{ position: 'absolute', top: '20%', left: '50%', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--glass-fill-light)', filter: 'var(--glass-blur-light)', pointerEvents: 'none', animation: 'dbBreathe 10s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-6)', alignItems: 'flex-start', width: '100%', padding: '0 var(--page-padding-desktop)' }}>
          {/* Greeting */}
          <div>
            <p style={{ margin: 0, fontSize: 'var(--t-caption)', fontWeight: 600, opacity: 0.9 }}>
              {currentDate}
            </p>
            <h1 style={{ fontSize: 'var(--t-h1)', fontFamily: 'var(--font-display)', fontWeight: 700, margin: 'var(--s-2) 0 var(--s-3)' }}>
              Hello {user?.name ?? 'membre'} 👋
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--t-body-lg)', opacity: 0.92, maxWidth: 500, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              "{dailyQuote}"
            </p>
          </div>

          {/* Hero Stat Chips — gamification at a glance */}
          <div className="tls-hero-stats">
            <div className="tls-hero-stat">
              <div className="tls-hero-stat__value">🔥 7</div>
              <div className="tls-hero-stat__label">Jours consécutifs</div>
            </div>
            <div className="tls-hero-stat">
              <div className="tls-hero-stat__value">12</div>
              <div className="tls-hero-stat__label">Badges obtenus</div>
            </div>
            <div className="tls-hero-stat">
              <div className="tls-hero-stat__value">68%</div>
              <div className="tls-hero-stat__label">Progression globale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 'var(--s-8)', maxWidth: 'var(--container-wide)', marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
        {/* Quick Actions Grid */}
        <div>
          <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-6)' }}>
            Actions rapides
          </h2>
          <CardGrid layout="feature" gapSize="md">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                variant="interactive"
                onClick={() => navigate(action.path)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setFocusedAction(action.id)}
                onBlur={() => setFocusedAction(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(action.path);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${action.title}: ${action.description}`}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--dur-2)',
                  transform: hoveredAction === action.id ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredAction === action.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  outline: focusedAction === action.id ? '2px solid var(--tls-primary-500)' : 'none',
                  outlineOffset: focusedAction === action.id ? '2px' : '0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--s-4)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--r-lg)', background: action.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {action.icon}
                  </div>
                </div>
                <CardTitle style={{ textAlign: 'center', fontSize: 'var(--t-body)', margin: '0 0 var(--s-2)' }}>
                  {action.title}
                </CardTitle>
                <CardDesc style={{ textAlign: 'center', fontSize: 'var(--t-caption)' }}>
                  {action.description}
                </CardDesc>
              </Card>
            ))}
          </CardGrid>
        </div>

        {/* Continue Learning Card */}
        <Card
          variant="feature"
          onClick={() => navigate('/learning-paths/1')}
          onMouseEnter={() => setHoveredContinue(true)}
          onMouseLeave={() => setHoveredContinue(false)}
          onFocus={() => setFocusedContinue(true)}
          onBlur={() => setFocusedContinue(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/learning-paths/1');
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Continuer le parcours d'apprentissage: Maîtriser l'IA pour la Formation"
          style={{
            background: 'linear-gradient(135deg, var(--tls-orange-50), var(--tls-yellow-50))',
            border: '2px solid var(--tls-orange-200)',
            cursor: 'pointer',
            transition: 'all var(--dur-2)',
            transform: hoveredContinue ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredContinue ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
            outline: focusedContinue ? '2px solid var(--tls-orange-500)' : 'none',
            outlineOffset: focusedContinue ? '2px' : '0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-4)' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--tls-orange-600)', letterSpacing: '0.06em', display: 'block', marginBottom: 'var(--s-2)' }}>
                  Continuer votre parcours
                </span>
                <h2 style={{ fontSize: 'var(--t-h3)', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-2)' }}>
                  Maîtriser l'IA pour la Formation
                </h2>
                <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
                  Étape 2 : Applications pratiques
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', color: 'var(--tls-orange-500)', fontWeight: 600, fontSize: 'var(--t-caption)' }}>
                    · ⏱ ~8 min restantes
                  </span>
                </p>
              </div>
              <Button onClick={(e) => { e.stopPropagation(); navigate('/learning-paths/1'); }}>
                Continuer →
              </Button>
            </div>

            {/* Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-2)' }}>
                <span style={{ fontSize: 'var(--t-caption)', fontWeight: 500, color: 'var(--text-muted)' }}>
                  Progression globale
                </span>
                <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text)' }}>
                  {progressValue}%
                </span>
              </div>
              <ProgressBar value={progressValue} fill="brand" />
            </div>

            {/* Lesson Stats */}
            <MetaPillGroup
              items={[
                { icon: <CheckCircle2 size={13} />, text: '24 leçons complétées', tone: 'warm' },
                { icon: <BookOpen size={13} />, text: '35 leçons au total', tone: 'warm' },
              ]}
              size="sm"
              layout="horizontal"
            />
          </div>
        </Card>

        {/* Reflection Prompts */}
        <div>
          <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-6)', margin: '0 0 var(--s-6)' }}>
            Prompts de réflexion
          </h2>
          <CardGrid layout="default" gapSize="lg" autoFit={true}>
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                label={prompt.label}
                icon={prompt.icon}
                text={prompt.text}
                variant={prompt.badgeVariant}
                onClick={() => navigate(prompt.path)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(prompt.path);
                  }
                }}
                cardStyle={prompt.cardBg ? {
                  background: prompt.cardBg,
                  border: `1px solid ${prompt.cardBorder}`,
                } : undefined}
              />
            ))}
          </CardGrid>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-6)', margin: '0 0 var(--s-6)' }}>
            Fil d'actualités
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                icon={getActivityIcon(activity.id)}
                title={activity.title}
                description={activity.description}
                timestamp={activity.timestamp}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dbBreathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
