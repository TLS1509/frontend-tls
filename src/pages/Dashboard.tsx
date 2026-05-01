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

import React from 'react';
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
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
      title: 'Coaching 1-to-1',
      description: 'Réserver une session',
      path: '/coaching',
    },
    {
      id: 'paths',
      icon: <Map size={28} strokeWidth={1.8} color="var(--tls-orange-600)" />,
      title: 'Parcours',
      description: 'Explorer les cours',
      path: '/learning-paths',
    },
    {
      id: 'journal',
      icon: <PenLine size={28} strokeWidth={1.8} color="var(--tls-yellow-600)" />,
      title: 'Journal',
      description: 'Noter mes réflexions',
      path: '/journal',
    },
    {
      id: 'veille',
      icon: <Sparkles size={28} strokeWidth={1.8} color="var(--tls-primary-500)" />,
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
    },
    {
      id: 'block',
      label: 'Blocage',
      badgeVariant: 'warm',
      icon: <TrendingUp size={34} strokeWidth={1.8} color="var(--tls-orange-600)" />,
      text: "Qu'est-ce qui m'a ralenti et comment puis-je le surmonter ?",
      path: '/journal/new',
    },
    {
      id: 'gratitude',
      label: 'Gratitude',
      badgeVariant: 'sun',
      icon: <Heart size={34} strokeWidth={1.8} color="var(--tls-yellow-600)" />,
      text: 'Pour quoi suis-je reconnaissant dans mon parcours ?',
      path: '/journal/new',
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
      <section style={{ background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-orange-500))', color: 'white', padding: 'var(--s-12)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blur blobs */}
        <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', filter: 'blur(50px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--s-6)', alignItems: 'flex-start' }}>
          {/* Greeting */}
          <div>
            <p style={{ margin: 0, fontSize: 'var(--t-caption)', fontWeight: 600, opacity: 0.9 }}>
              {currentDate}
            </p>
            <h1 style={{ fontSize: 'var(--t-h1)', fontFamily: 'var(--font-display)', fontWeight: 700, margin: 'var(--s-2) 0 var(--s-3)' }}>
              Hello {user?.name ?? 'membre'} 👋
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--t-body-lg)', opacity: 0.92, maxWidth: 500 }}>
              "L'apprentissage est un voyage, pas une destination."
            </p>
          </div>

          {/* Stats Pills */}
          <MetaPillGroup
            items={[
              { icon: <Flame size={14} />, text: '7 jours', tone: 'sun' },
              { icon: <Award size={14} />, text: '12 badges', tone: 'warm' },
              { icon: <TrendingUp size={14} />, text: '68%', tone: 'primary' },
            ]}
            layout="horizontal"
            gap="md"
            size="md"
          />
        </div>
      </section>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 'var(--s-8)', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
        {/* Quick Actions Grid */}
        <div>
          <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-6)', margin: '0 0 var(--s-6)' }}>
            Actions rapides
          </h2>
          <CardGrid layout="feature" gapSize="md">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                variant="interactive"
                onClick={() => navigate(action.path)}
                style={{ textAlign: 'center', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--s-4)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <Card variant="feature" style={{ background: 'linear-gradient(135deg, var(--tls-orange-50), var(--tls-yellow-50))', border: '2px solid var(--tls-orange-200)', cursor: 'pointer', transition: 'all var(--dur-2)' }} onClick={() => navigate('/learning-paths/1')}>
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
                <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)' }}>
                  Étape 2 : Applications pratiques
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
              />
            ))}
          </CardGrid>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-6)', margin: '0 0 var(--s-6)' }}>
            Fil d'actualités
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
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
    </div>
  );
};

export default Dashboard;
