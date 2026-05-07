/**
 * Dashboard Page — User Learning Hub
 */

import React, { useMemo } from 'react';
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
  cardClasses?: string;
}

const DAILY_QUOTES = [
  "L'apprentissage est un voyage, pas une destination.",
  "Ce n'est pas l'intelligence qui garantit le succès, c'est la curiosité.",
  'Chaque jour, une nouvelle compétence transforme votre potentiel.',
  "Apprendre, c'est s'offrir la liberté de devenir.",
  "La croissance commence là où la zone de confort s'arrête.",
  'Un petit progrès chaque jour mène à de grands changements.',
];

const SECTION_HEADING = 'text-h3 font-bold text-ink-900 m-0 mb-6';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dailyQuote = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
    );
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }, []);

  const activities: Activity[] = [
    {
      id: '1',
      title: 'Leçon terminée',
      description: 'Vous avez terminé "Introduction au Machine Learning".',
      timestamp: 'Il y a 2 heures',
    },
    {
      id: '2',
      title: 'Nouveau badge débloqué',
      description: "Vous avez obtenu le badge 'Pionnier de l'IA'.",
      timestamp: 'Hier',
    },
    {
      id: '3',
      title: 'Série maintenue',
      description: "Vous avez maintenu votre série d'apprentissage à 7 jours.",
      timestamp: "Aujourd'hui",
    },
  ];
  const progressValue = 68;

  const quickActions: QuickAction[] = [
    {
      id: 'coaching',
      icon: <Users size={28} strokeWidth={1.8} className="text-primary-600" />,
      iconBg: 'bg-primary-50',
      title: 'Coaching 1-to-1',
      description: 'Réserver une session',
      path: '/coaching',
    },
    {
      id: 'paths',
      icon: <Map size={28} strokeWidth={1.8} className="text-secondary-600" />,
      iconBg: 'bg-secondary-50',
      title: 'Parcours',
      description: 'Explorer les cours',
      path: '/learning-paths',
    },
    {
      id: 'journal',
      icon: <PenLine size={28} strokeWidth={1.8} className="text-accent-700" />,
      iconBg: 'bg-accent-50',
      title: 'Journal',
      description: 'Noter mes réflexions',
      path: '/journal',
    },
    {
      id: 'veille',
      icon: <Sparkles size={28} strokeWidth={1.8} className="text-primary-500" />,
      iconBg: 'bg-primary-50',
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
      icon: <BookOpen size={34} strokeWidth={1.8} className="text-primary-600" />,
      text: "Quelle a été ma plus grande découverte aujourd'hui ?",
      path: '/journal/new',
      cardClasses: 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200',
    },
    {
      id: 'block',
      label: 'Blocage',
      badgeVariant: 'warm',
      icon: <TrendingUp size={34} strokeWidth={1.8} className="text-secondary-600" />,
      text: "Qu'est-ce qui m'a ralenti et comment puis-je le surmonter ?",
      path: '/journal/new',
      cardClasses: 'bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200',
    },
    {
      id: 'gratitude',
      label: 'Gratitude',
      badgeVariant: 'sun',
      icon: <Heart size={34} strokeWidth={1.8} className="text-accent-700" />,
      text: 'Pour quoi suis-je reconnaissant dans mon parcours ?',
      path: '/journal/new',
      cardClasses: 'bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200',
    },
  ];

  const getActivityIcon = (id: string) => {
    if (id === '1') return <CheckCircle2 size={18} />;
    if (id === '2') return <Award size={18} />;
    return <Flame size={18} />;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <section className="relative overflow-hidden text-white p-12 bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-10 flex flex-col gap-6 items-start">
          <div>
            <p className="m-0 text-caption font-semibold opacity-90">{currentDate}</p>
            <h1 className="text-h1 font-display font-bold m-0 mt-2 mb-3">
              Hello {user?.name ?? 'membre'} 👋
            </h1>
            <p className="m-0 text-body-lg italic tracking-tight opacity-90 max-w-[500px]">
              "{dailyQuote}"
            </p>
          </div>

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

      <div className="flex-1 max-w-[1280px] mx-auto w-full p-8 flex flex-col gap-8">
        <div>
          <h2 className={SECTION_HEADING}>Actions rapides</h2>
          <CardGrid layout="feature" gapSize="md">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                variant="interactive"
                onClick={() => navigate(action.path)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(action.path);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${action.title}: ${action.description}`}
                className="text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.iconBg}`}
                  >
                    {action.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-body m-0 mb-2">{action.title}</CardTitle>
                <CardDesc className="text-center text-caption">{action.description}</CardDesc>
              </Card>
            ))}
          </CardGrid>
        </div>

        <Card
          variant="feature"
          onClick={() => navigate('/learning-paths/1')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/learning-paths/1');
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Continuer le parcours d'apprentissage: Maîtriser l'IA pour la Formation"
          className="cursor-pointer transition-all bg-gradient-to-br from-secondary-50 to-accent-50 border-2 border-secondary-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500"
        >
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <span className="block text-caption font-bold uppercase text-secondary-600 tracking-wider mb-2">
                  Continuer votre parcours
                </span>
                <h2 className="text-h3 font-display font-bold text-ink-900 m-0 mb-2">
                  Maîtriser l'IA pour la Formation
                </h2>
                <p className="m-0 text-body-sm text-ink-500 inline-flex items-center gap-2 flex-wrap">
                  Étape 2 : Applications pratiques
                  <span className="inline-flex items-center gap-1 text-secondary-500 font-semibold text-caption">
                    · ⏱ ~8 min restantes
                  </span>
                </p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/learning-paths/1');
                }}
              >
                Continuer →
              </Button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-caption font-medium text-ink-500">Progression globale</span>
                <span className="text-caption font-bold text-ink-900">{progressValue}%</span>
              </div>
              <ProgressBar value={progressValue} fill="brand" />
            </div>

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

        <div>
          <h2 className={SECTION_HEADING}>Prompts de réflexion</h2>
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
                className={prompt.cardClasses ? `border ${prompt.cardClasses}` : undefined}
              />
            ))}
          </CardGrid>
        </div>

        <div>
          <h2 className={SECTION_HEADING}>Fil d'actualités</h2>
          <div className="flex flex-col gap-3">
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
