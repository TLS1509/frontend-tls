import { useState } from 'react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import { useToast } from '../components/ui/notification-toast';
import { useCelebration } from '../components/ui/celebration-modal';
import { AvatarWithBadge, NotificationBell } from '../components/ui/notification-badge';
import { NotificationFeed, CompactNotificationFeed, NotificationItem } from '../components/ui/notification-feed';
import { mockNotifications as mockNotificationsData } from '../data/notificationsData';
import { 
  Sparkles, 
  Trophy, 
  Flame, 
  Target,
  Bell,
  Zap,
} from 'lucide-react';

interface NotificationSystemDemoPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function NotificationSystemDemoPage({ onNavigate, onLogout }: NotificationSystemDemoPageProps) {
  const toast = useToast();
  const celebration = useCelebration();
  
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    mockNotificationsData.map(n => ({
      ...n,
      isPinned: n.type === 'achievement',
    }))
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    toast.success('Notification marquée comme lue');
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info('Notification supprimée');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="dashboard"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <div 
            className="px-6 md:px-8 py-6"
            style={{
              background: 'rgba(85, 161, 180, 0.08)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h1 
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    🎨 Système de Notifications - Démo
                  </h1>
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    Testez tous les composants de notifications, toasts et célébrations
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <NotificationBell count={unreadCount} onClick={() => {}} size="lg" />
                  <AvatarWithBadge 
                    initials="A"
                    name="Admin1509"
                    notificationCount={unreadCount}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 py-8 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* TOAST DEMOS */}
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                  <h2 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Toast Notifications
                  </h2>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => toast.success('Leçon complétée !', 'Excellent travail', 50)}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: 'var(--success)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✅ Success Toast (+50 XP)
                  </button>

                  <button
                    onClick={() => toast.error('Erreur de connexion', 'Veuillez réessayer')}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(220, 38, 38, 0.1)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      color: 'var(--destructive)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ❌ Error Toast
                  </button>

                  <button
                    onClick={() => toast.warning('Session expirée', 'Reconnectez-vous dans 5 min')}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: 'var(--warning)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ⚠️ Warning Toast
                  </button>

                  <button
                    onClick={() => toast.info('Nouvelle leçon disponible', 'Découvrez "IA Générative Avancée"')}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(85, 161, 180, 0.1)',
                      border: '1px solid var(--primary-200)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ℹ️ Info Toast
                  </button>

                  <button
                    onClick={() => toast.achievement('Badge "Expert GPT" débloqué !', 'Félicitations 🎉', 100)}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1), rgba(237, 132, 58, 0.1))',
                      border: '1px solid var(--accent-200)',
                      color: 'var(--accent)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    🏆 Achievement Toast (+100 XP)
                  </button>

                  <button
                    onClick={() => toast.streak('7 jours consécutifs !', 'Vous êtes en feu 🔥')}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1), rgba(220, 38, 38, 0.1))',
                      border: '1px solid var(--secondary-200)',
                      color: 'var(--secondary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    🔥 Streak Toast
                  </button>

                  <button
                    onClick={() => toast.xp(75, 'Quiz complété')}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(85, 161, 180, 0.08)',
                      border: '1px solid var(--primary-200)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ⭐ XP Toast (+75 XP)
                  </button>
                </div>
              </div>

              {/* CELEBRATION DEMOS */}
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  <h2 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Celebrations (Confetti)
                  </h2>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => celebration.courseComplete(
                      'Formation GPT-4 Avancé',
                      250,
                      () => toast.info('Navigation vers certificat')
                    )}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(85, 161, 180, 0.1)',
                      border: '1px solid var(--primary-200)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    🏆 Cours Terminé (+250 XP)
                  </button>

                  <button
                    onClick={() => celebration.badgeUnlocked(
                      'Expert en Prompt Engineering',
                      '🤖',
                      100,
                      () => toast.info('Navigation vers profil')
                    )}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(237, 132, 58, 0.1)',
                      border: '1px solid var(--secondary-200)',
                      color: 'var(--secondary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    🎖️ Badge Débloqué (+100 XP)
                  </button>

                  <button
                    onClick={() => celebration.levelUp(15, 500)}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      border: '1px solid var(--accent-200)',
                      color: 'var(--accent)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ⭐ Niveau 15 Atteint (+500 XP)
                  </button>

                  <button
                    onClick={() => celebration.streakMilestone(30)}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1), rgba(220, 38, 38, 0.1))',
                      border: '1px solid var(--secondary-200)',
                      color: 'var(--secondary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    🔥 30 Jours de Suite ! (+300 XP)
                  </button>

                  <button
                    onClick={() => celebration.coachingBooked(
                      'Sophie Martin',
                      'demain à 14h00',
                      () => toast.info('Navigation vers coaching')
                    )}
                    className="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'rgba(85, 161, 180, 0.1)',
                      border: '1px solid var(--primary-200)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    ✅ Session Coaching Confirmée
                  </button>
                </div>
              </div>

              {/* NOTIFICATION FEED COMPACT */}
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <CompactNotificationFeed 
                  notifications={notifications}
                  onViewAll={() => toast.info('Navigation vers notifications')}
                  maxItems={3}
                />
              </div>

              {/* NOTIFICATION FEED FULL */}
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                  <h2 
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Feed Complet
                  </h2>
                </div>

                <NotificationFeed 
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                  onAction={(id, url) => toast.info(`Action: ${url}`)}
                  showActions
                  maxItems={5}
                />
              </div>
            </div>

            {/* Info Card */}
            <div 
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1), rgba(248, 176, 68, 0.05))',
                border: '1px solid var(--primary-200)',
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                  }}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Composants Implémentés
                  </h3>
                  <ul 
                    className="space-y-1"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      lineHeight: '1.6',
                    }}
                  >
                    <li>✅ Toast Notifications (7 types)</li>
                    <li>✅ Celebration Modals avec confetti</li>
                    <li>✅ Notification Badges pulsants</li>
                    <li>✅ Avatar avec badge</li>
                    <li>✅ Notification Bell</li>
                    <li>✅ Notification Feed complet & compact</li>
                    <li>✅ Design System TLS respecté à 100%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
