import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/core/Button';
import { ActivityItem } from '../components/ui/ActivityItem';
import { IconFeatureCard } from '../components/ui/IconFeatureCard';
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
import '../styles/dashboard-modern.css';

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
    <div className="dashboard-modern">
      <section className="dashboard-modern__hero">
        <div className="dashboard-modern__hero-glow dashboard-modern__hero-glow--top" />
        <div className="dashboard-modern__hero-glow dashboard-modern__hero-glow--bottom" />

        <div className="dashboard-modern__hero-header">
          <div className="dashboard-modern__hero-title-wrap">
            <span className="dashboard-modern__date">{currentDate}</span>
            <h1 className="dashboard-modern__title">Hello {user?.name ?? 'membre'} 👋</h1>
            <p className="dashboard-modern__quote">
              "L'apprentissage est un voyage, pas une destination."
            </p>
          </div>
          <div className="dashboard-modern__stats">
            <span className="dashboard-modern__stat-pill dashboard-modern__stat-pill--sun">
              <Flame size={14} /> 7 jours
            </span>
            <span className="dashboard-modern__stat-pill dashboard-modern__stat-pill--warm">
              <Award size={14} /> 12 badges
            </span>
            <span className="dashboard-modern__stat-pill dashboard-modern__stat-pill--brand">
              <TrendingUp size={14} /> 68%
            </span>
          </div>
        </div>
      </section>

      <section className="dashboard-modern__quick-actions">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className="dashboard-modern__action-btn"
            onClick={() => navigate(action.path)}
          >
            <IconFeatureCard
              icon={action.icon}
              title={action.title}
              description={action.description}
              className="dashboard-modern__action"
            />
          </button>
        ))}
      </section>

      <section className="dashboard-modern__continue">
        <div className="dashboard-modern__continue-head">
          <div>
            <h2>Maîtriser l'IA pour la Formation</h2>
            <p>Étape 2: Applications pratiques</p>
          </div>
          <Button onClick={() => navigate('/learning-paths/1')}>Continuer</Button>
        </div>
        <ProgressBar value={progressValue} label="Progression" />
        <span className="dashboard-modern__progress-label">{progressValue}% complété</span>
      </section>

      <section className="dashboard-modern__prompts">
        {prompts.map((prompt) => (
          <article
            key={prompt.id}
            className="dashboard-modern__prompt-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(prompt.path)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(prompt.path);
              }
            }}
          >
            <Badge variant={prompt.badgeVariant}>{prompt.label}</Badge>
            {prompt.icon}
            <p>{prompt.text}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-modern__activity">
        <h3>Fil d'actualités</h3>
        <div className="dashboard-modern__activity-list dashboard-modern__activity-shell">
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
      </section>
    </div>
  );
};

export default Dashboard;
