import { useState } from 'react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import { 
  Bell, 
  Check,
  CheckCheck, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Trophy, 
  Trash2,
  FileText,
  Award,
  CheckCircle2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'lesson' | 'coaching' | 'achievement' | 'correction' | 'system' | 'completion' | 'report';
  title: string;
  message: string;
  timestamp: string;
  date: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  badge?: string;
  metadata?: {
    lessonTitle?: string;
    projectTitle?: string;
    grade?: string;
    badgeName?: string;
    progressPercent?: number;
  };
}

interface NotificationsPageProps {
  onNavigate: (page: string, id?: string) => void;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
}

export default function NotificationsPageUltra({ 
  onNavigate, 
  notifications: initialNotifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onDeleteNotification
}: NotificationsPageProps) {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'messages' | 'lessons' | 'coaching'>('all');

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications || [
    {
      id: '1',
      type: 'correction',
      title: 'Correction de projet final disponible',
      message: 'Votre projet final "Chatbot IA pour la Formation" a été corrigé. Excellente intégration des concepts d\'IA générative !',
      timestamp: 'Il y a 5 min',
      date: "Aujourd'hui",
      time: '14:35',
      isRead: false,
      actionUrl: 'project',
      badge: 'Nouveau',
      metadata: {
        projectTitle: 'Projet Final - Chatbot IA',
        grade: '18/20',
      }
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Nouveau badge débloqué !',
      message: 'Félicitations ! Vous avez débloqué le badge "Expert en Prompt Engineering" en complétant toutes les leçons du module.',
      timestamp: 'Il y a 15 min',
      date: "Aujourd'hui",
      time: '14:25',
      isRead: false,
      actionUrl: 'profile',
      badge: 'Nouveau',
      metadata: {
        badgeName: 'Expert en Prompt Engineering',
      }
    },
    {
      id: '3',
      type: 'lesson',
      title: 'Nouvelle leçon disponible',
      message: 'La leçon "IA Générative et Créativité" est maintenant disponible dans votre parcours "Maîtriser l\'IA pour la Formation".',
      timestamp: 'Il y a 1h',
      date: "Aujourd'hui",
      time: '13:40',
      isRead: false,
      actionUrl: 'parcours',
      badge: 'Nouveau',
      metadata: {
        lessonTitle: 'Leçon 5 - IA Générative et Créativité',
      }
    },
    {
      id: '4',
      type: 'completion',
      title: 'Leçon complétée avec succès',
      message: 'Vous avez terminé la leçon "Fondamentaux du Prompt Engineering" avec un score de 95%. Continuez comme ça !',
      timestamp: 'Il y a 2h',
      date: "Aujourd'hui",
      time: '12:40',
      isRead: true,
      actionUrl: 'lesson',
      metadata: {
        lessonTitle: 'Leçon 3 - Fondamentaux du Prompt Engineering',
        grade: '95%',
      }
    },
    {
      id: '5',
      type: 'report',
      title: 'Compte-rendu de session de coaching',
      message: 'Sophie Martin a publié le compte-rendu de votre session de coaching du 18 janvier. Consultez les recommandations et les prochaines étapes.',
      timestamp: 'Il y a 3h',
      date: "Aujourd'hui",
      time: '11:40',
      isRead: true,
      actionUrl: 'coaching',
      metadata: {
        lessonTitle: 'Session du 18 janvier 2026',
      }
    },
    {
      id: '6',
      type: 'coaching',
      title: 'Session de coaching confirmée',
      message: 'Votre session de coaching avec Marc Dubois est confirmée pour demain à 14h00. Préparez vos questions sur l\'intégration de l\'IA dans vos formations.',
      timestamp: 'Hier',
      date: 'Hier',
      time: '18:20',
      isRead: true,
      actionUrl: 'coaching',
    },
    {
      id: '7',
      type: 'achievement',
      title: 'Série de 7 jours maintenue !',
      message: 'Bravo ! Vous avez maintenu une série d\'apprentissage de 7 jours consécutifs. Continuez sur cette lancée ! 🔥',
      timestamp: 'Il y a 2 jours',
      date: '18 janvier',
      time: '09:00',
      isRead: true,
      actionUrl: 'dashboard',
    },
    {
      id: '8',
      type: 'correction',
      title: 'Correction d\'exercice disponible',
      message: 'L\'exercice "Optimisation de Prompts" a été corrigé. Très bon travail sur la structuration des instructions !',
      timestamp: 'Il y a 2 jours',
      date: '18 janvier',
      time: '16:45',
      isRead: true,
      actionUrl: 'lesson',
      metadata: {
        lessonTitle: 'Exercice - Optimisation de Prompts',
        grade: '17/20',
      }
    },
    {
      id: '9',
      type: 'lesson',
      title: 'Nouveau parcours ajouté',
      message: 'Le parcours "IA Éthique et Responsable" vient d\'être ajouté à votre catalogue. Découvrez les enjeux éthiques de l\'IA dans la formation.',
      timestamp: 'Il y a 3 jours',
      date: '17 janvier',
      time: '10:30',
      isRead: true,
      actionUrl: 'parcours',
      metadata: {
        lessonTitle: 'Parcours - IA Éthique et Responsable',
      }
    },
    {
      id: '10',
      type: 'achievement',
      title: 'Badge "Pionnier de l\'IA" débloqué',
      message: 'Vous avez complété votre premier parcours complet ! Vous êtes maintenant un pionnier de l\'IA appliquée à la formation.',
      timestamp: 'Il y a 4 jours',
      date: '16 janvier',
      time: '15:20',
      isRead: true,
      actionUrl: 'profile',
      metadata: {
        badgeName: 'Pionnier de l\'IA',
      }
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'lesson':
        return BookOpen;
      case 'coaching':
        return Calendar;
      case 'achievement':
        return Trophy;
      case 'correction':
        return CheckCircle2;
      case 'completion':
        return Award;
      case 'report':
        return FileText;
      default:
        return Bell;
    }
  };

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary-50)';
      case 'lesson':
        return 'var(--secondary-50)';
      case 'coaching':
        return 'var(--accent-50)';
      case 'achievement':
        return 'rgba(245, 158, 11, 0.1)';
      case 'correction':
        return 'var(--success-100)';
      case 'completion':
        return 'rgba(139, 92, 246, 0.1)';
      case 'report':
        return 'rgba(139, 92, 246, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary)';
      case 'lesson':
        return 'var(--secondary)';
      case 'coaching':
        return 'var(--accent)';
      case 'achievement':
        return '#D97706';
      case 'correction':
        return 'var(--success-600)';
      case 'completion':
        return '#8B5CF6';
      case 'report':
        return '#8B5CF6';
      default:
        return 'var(--muted-foreground)';
    }
  };

  const getBadgeBg = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary-50)';
      case 'lesson':
        return 'var(--secondary-50)';
      case 'coaching':
        return 'var(--accent-50)';
      case 'achievement':
        return 'rgba(245, 158, 11, 0.1)';
      case 'correction':
        return 'var(--success-100)';
      case 'completion':
        return 'rgba(139, 92, 246, 0.1)';
      case 'report':
        return 'rgba(139, 92, 246, 0.1)';
      default:
        return 'rgba(156, 163, 175, 0.1)';
    }
  };

  const getBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'var(--primary)';
      case 'lesson':
        return 'var(--secondary)';
      case 'coaching':
        return 'var(--accent)';
      case 'achievement':
        return '#D97706';
      case 'correction':
        return 'var(--success-600)';
      case 'completion':
        return '#8B5CF6';
      case 'report':
        return '#8B5CF6';
      default:
        return 'var(--muted-foreground)';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !notif.isRead;
    if (filterType === 'messages') return notif.type === 'message';
    if (filterType === 'lessons') return notif.type === 'lesson' || notif.type === 'correction' || notif.type === 'completion';
    if (filterType === 'coaching') return notif.type === 'coaching' || notif.type === 'report';
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    onMarkNotificationAsRead?.(id);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    onMarkAllNotificationsAsRead?.();
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    onDeleteNotification?.(id);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filters = [
    { id: 'all', label: 'Toutes', count: notifications.length },
    { id: 'unread', label: 'Non lues', count: unreadCount },
    { id: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'lessons', label: 'Formations', count: notifications.filter(n => n.type === 'lesson' || n.type === 'correction' || n.type === 'completion').length },
    { id: 'coaching', label: 'Coaching', count: notifications.filter(n => n.type === 'coaching' || n.type === 'report').length },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      <OptimizedSidebar
        currentPage="notifications"
        onNavigate={onNavigate as any}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onDeleteNotification={onDeleteNotification}
      />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <BackgroundBlobs />

        {/* Header */}
        <div 
          className="relative z-10 border-b"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #4A8FA0)',
                    boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                  }}
                >
                  <Bell className="w-8 h-8 text-white" />
                  {unreadCount > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: 'var(--secondary)',
                        color: 'white',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        boxShadow: '0 4px 12px rgba(237, 132, 58, 0.6)',
                        border: '2px solid white',
                      }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h1 
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontFamily: 'var(--font-display)',
                      color: 'var(--foreground)',
                      lineHeight: '1.2',
                    }}
                  >
                    Notifications
                  </h1>
                </div>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), #4A8FA0)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 161, 180, 0.3)';
                  }}
                >
                  <CheckCheck className="w-5 h-5" />
                  <span>Tout marquer comme lu</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div 
          className="relative z-10 border-b"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderColor: 'rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              {filters.map((filter) => {
                const isActive = filterType === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setFilterType(filter.id as any)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200"
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, var(--primary), #4A8FA0)'
                        : 'rgba(0, 0, 0, 0.03)',
                      color: isActive ? 'white' : 'var(--foreground)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: isActive ? '0 4px 12px rgba(85, 161, 180, 0.25)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                      }
                    }}
                  >
                    <span>{filter.label}</span>
                    <span 
                      className="px-2 py-0.5 rounded-lg"
                      style={{
                        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.06)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                      }}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'rgba(85, 161, 180, 0.1)',
                  }}
                >
                  <Bell className="w-10 h-10" style={{ color: 'var(--muted-foreground)' }} />
                </div>
                <h3 
                  style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Aucune notification
                </h3>
                <p 
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Vous êtes à jour ! 🎉
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notif) => {
                  const Icon = getIcon(notif.type);
                  
                  return (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (notif.actionUrl) {
                          onNavigate(notif.actionUrl);
                        }
                      }}
                      className="p-6 rounded-3xl transition-all duration-500 relative overflow-hidden group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                        cursor: notif.actionUrl ? 'pointer' : 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.1), 0 0 40px 0 rgba(85, 161, 180, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
                      }}
                    >
                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: `radial-gradient(circle at 0% 50%, ${getIconColor(notif.type)}15 0%, transparent 50%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Action Buttons */}
                      <div 
                        className="absolute right-6 top-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ zIndex: 10 }}
                      >
                        {!notif.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(notif.id);
                            }}
                            className="w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center"
                            style={{
                              background: 'rgba(85, 161, 180, 0.15)',
                              color: 'var(--primary)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(85, 161, 180, 0.25)';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(85, 161, 180, 0.15)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                            title="Marquer comme lu"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notif.id);
                          }}
                          className="w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center"
                          style={{
                            background: 'rgba(220, 38, 38, 0.15)',
                            color: 'var(--destructive)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.25)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.15)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative z-10 flex items-start gap-4">
                        {/* Icon */}
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: getIconBg(notif.type),
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color: getIconColor(notif.type) }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p 
                              style={{ 
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--foreground)',
                                fontFamily: 'var(--font-display)',
                              }}
                            >
                              {notif.title}
                            </p>
                            {notif.badge && (
                              <span 
                                className="px-2 py-0.5 rounded-full"
                                style={{
                                  background: getBadgeBg(notif.type),
                                  color: getBadgeColor(notif.type),
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                }}
                              >
                                {notif.badge}
                              </span>
                            )}
                          </div>
                          <p 
                            className="mb-2"
                            style={{ 
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}
                          >
                            {notif.message}
                          </p>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-sm)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            {notif.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
