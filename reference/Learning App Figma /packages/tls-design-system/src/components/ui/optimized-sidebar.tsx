import { useState, useEffect } from 'react';
import { 
  Home,
  Map,
  Users,
  User,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sparkles,
  Palette,
  Pen,
  BarChart3,
  MessageSquare,
  Trophy,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import { NotificationDropdown, Notification } from './notification-dropdown';

interface OptimizedSidebarProps {
  currentPage: 'dashboard' | 'parcours' | 'coaching' | 'journal' | 'veille' | 'entreprise' | 'entreprise-dashboard' | 'profile' | 'account' | 'messages' | 'notifications' | 'leaderboard';
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise' | 'entreprise-dashboard' | 'journal' | 'journal-detail' | 'journal-free-entry' | 'account' | 'messages' | 'notifications' | 'leaderboard') => void;
  onLogout?: () => void;
  userHasEnterpriseAccess?: boolean;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  notifications?: Notification[];
  unreadMessagesCount?: number;
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  // New props for viewer mode
  isViewerMode?: boolean; // Ultra minimal for content viewers
  // NEW: Notification display mode for testing
  notificationDisplayMode?: 'avatar' | 'header' | 'logo';
}

const navItems = [
  { 
    icon: Home, 
    label: 'Tableau de bord', 
    page: 'dashboard' as const,
  },
  { 
    icon: Map, 
    label: 'Parcours', 
    page: 'parcours' as const,
  },
  { 
    icon: Pen, 
    label: 'Journal de bord', 
    page: 'journal' as const,
  },
  { 
    icon: Users, 
    label: 'Coaching', 
    page: 'coaching' as const,
  },
  { 
    icon: Sparkles, 
    label: 'Veille', 
    page: 'veille' as const,
  },
];

export default function OptimizedSidebar({
  currentPage,
  onNavigate,
  onLogout,
  userHasEnterpriseAccess = false,
  userName = 'Admin1509',
  userEmail = 'padennery@me.com',
  userInitials = 'A',
  notifications = [],
  unreadMessagesCount = 0,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onDeleteNotification,
  isViewerMode = false,
  notificationDisplayMode = 'avatar', // Default to avatar mode
}: OptimizedSidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Charger l'état collapsed depuis localStorage au montage - COLLAPSED PAR DÉFAUT
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      // Si jamais sauvegardé, collapsed par défaut (true)
      return saved === null ? true : saved === 'true';
    }
    return true; // Collapsed par défaut
  });

  // Synchroniser l'état collapsed avec le document et localStorage
  useEffect(() => {
    if (isCollapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
    
    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    }
  }, [isCollapsed]);

  const handleNavigate = (page: any) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handlers for notifications
  const handleMarkAsRead = (id: string) => {
    onMarkNotificationAsRead?.(id);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllNotificationsAsRead?.();
  };

  const handleDeleteNotification = (id: string) => {
    onDeleteNotification?.(id);
  };

  const handleNotificationNavigate = (url: string) => {
    handleNavigate(url);
  };

  // Mode ultra-minimaliste pour les viewers
  if (isViewerMode) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'var(--shadow-md)',
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
          ) : (
            <Menu className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
          )}
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            style={{ backdropFilter: 'blur(4px)' }}
          />
        )}

        {/* Ultra Minimal Sidebar - Logo only */}
        <aside 
          className={`
            fixed lg:relative
            inset-y-0 left-0
            flex-shrink-0 
            flex flex-col items-center
            py-6
            border-r 
            z-40
            transition-all duration-300 ease-out
            ${mobileMenuOpen ? 'translate-x-0 w-80 px-6' : '-translate-x-full lg:translate-x-0 w-20 px-4'}
          `}
          style={{
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 0.4) inset',
          }}
        >
          {/* Logo */}
          <div 
            className={`
              cursor-pointer transition-all duration-300
              ${mobileMenuOpen ? 'mb-8 w-full' : 'mb-6'}
            `}
            onClick={() => handleNavigate('dashboard')}
            title="Retour au dashboard"
          >
            {mobileMenuOpen ? (
              /* Full logo on mobile */
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 
                    style={{ 
                      color: 'var(--primary)',
                      lineHeight: '1.2',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--text-xl)',
                    }}
                  >
                    The Learning Society
                  </h2>
                </div>
              </div>
            ) : (
              /* Compact logo on desktop */
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <>
              <nav className="flex-1 w-full overflow-y-auto mb-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.page;
                  
                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavigate(item.page)}
                      className="w-full flex items-center gap-4 px-5 py-3.5 mb-2 rounded-2xl transition-all duration-300"
                      style={isActive ? {
                        background: 'var(--gradient-primary)',
                        boxShadow: 'var(--shadow-md)',
                        color: 'white',
                      } : {
                        color: 'var(--foreground)',
                      }}
                    >
                      <Icon className="w-6 h-6 flex-shrink-0" />
                      <span 
                        style={{ 
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile User Section */}
              <div className="w-full pt-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <button
                  onClick={() => {
                    handleNavigate('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200"
                  style={{
                    background: 'rgba(85, 161, 180, 0.05)',
                    borderColor: 'rgba(85, 161, 180, 0.1)',
                  }}
                >
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {userInitials}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p 
                      className="truncate"
                      style={{ 
                        color: 'var(--foreground)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      {userName}
                    </p>
                    <p 
                      className="truncate"
                      style={{ 
                        color: 'var(--muted-foreground)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      {userEmail}
                    </p>
                  </div>
                </button>
              </div>
            </>
          )}
        </aside>
      </>
    );
  }

  // Mode normal avec collapsible
  return (
    <>
      {/* Mobile Menu Button - UNIQUEMENT SUR MOBILE */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-6 left-6 z-[100] w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: 'var(--shadow-md)',
        }}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
        ) : (
          <Menu className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          style={{ backdropFilter: 'blur(4px)' }}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative
          inset-y-0 left-0
          flex-shrink-0 
          border-r 
          z-40
          transition-all duration-300 ease-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-24 lg:cursor-pointer' : 'lg:w-80'}
          w-80
        `}
        style={{
          // Glass effect plus transparent quand collapsed pour effet floating
          background: isCollapsed 
            ? 'rgba(255, 255, 255, 0.4)' // Plus transparent en mode collapsed
            : 'rgba(255, 255, 255, 0.7)', // Moins transparent en mode expanded
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: isCollapsed 
            ? 'rgba(255, 255, 255, 0.2)' // Border plus subtile en collapsed
            : 'rgba(255, 255, 255, 0.3)',
          boxShadow: isCollapsed
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.3) inset' // Shadow plus prononcée pour effet floating
            : '0 4px 16px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 0.4) inset',
        }}
        onClick={() => {
          // Cliquer sur la sidebar collapsed l'ouvre (desktop uniquement)
          if (isCollapsed && window.innerWidth >= 1024) {
            setIsCollapsed(false);
          }
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section + Toggle Button Desktop */}
          <div 
            className={`
              border-b transition-all duration-300 relative
              ${isCollapsed ? 'lg:p-4' : 'p-6 sm:p-8'}
            `}
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div>
              {/* Desktop Layout - Logo + Toggle */}
              <div className="hidden lg:flex items-center justify-between gap-3">
                {/* Logo Area */}
                <div 
                  className={`
                    cursor-pointer transition-all duration-300 flex items-center gap-3 relative
                    ${isCollapsed ? 'justify-center w-full' : ''}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate('dashboard');
                  }}
                  title={isCollapsed ? "TLS - Dashboard" : undefined}
                >
                  {/* OPTION 3: Badge on Logo */}
                  {notificationDisplayMode === 'logo' && unreadCount > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: 'var(--secondary)',
                        color: 'white',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        boxShadow: '0 2px 8px rgba(237, 132, 58, 0.4)',
                      }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                  
                  <div 
                    className={`rounded-2xl flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'w-12 h-12' : 'w-14 h-14'}`}
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                    }}
                  >
                    <Sparkles className={`text-white ${isCollapsed ? 'w-6 h-6' : 'w-7 h-7'}`} />
                  </div>
                  
                  {!isCollapsed && (
                    <div>
                      <h2 
                        style={{ 
                          color: 'var(--primary)',
                          lineHeight: '1.2',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 'var(--font-weight-bold)',
                          fontSize: 'var(--text-xl)',
                        }}
                      >
                        The Learning Society
                      </h2>
                    </div>
                  )}
                </div>

                {/* OPTION 2: Header Notification Bell */}
                {notificationDisplayMode === 'header' && !isCollapsed && (
                  <div className="flex items-center gap-2">
                    <NotificationDropdown
                      notifications={notifications}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onDelete={handleDeleteNotification}
                      onNavigate={handleNotificationNavigate}
                    />
                  </div>
                )}

                {/* Toggle Button Desktop - Toujours visible */}
                {!isCollapsed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCollapsed(!isCollapsed);
                    }}
                    className="p-2 rounded-xl transition-all duration-200 hover:bg-gray-100"
                    style={{
                      color: 'var(--muted-foreground)',
                    }}
                    title="Réduire la sidebar"
                    aria-label="Toggle sidebar"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Expand Button when Collapsed - Desktop Only - Positioned on right edge */}
            {isCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(false);
                }}
                className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full items-center justify-center transition-all duration-200 z-10"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                  color: 'white',
                }}
                title="Développer la sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav 
            className={`
              flex-1 overflow-y-auto transition-all duration-300
              ${isCollapsed ? 'lg:p-3' : 'p-4 sm:p-6'}
            `}
            role="menu"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.page;
                
                return (
                  <button
                    key={item.page}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(item.page);
                    }}
                    className={`
                      w-full flex items-center rounded-2xl transition-all duration-300 relative
                      ${isActive 
                        ? 'text-white' 
                        : 'hover:bg-opacity-10'
                      }
                      ${isCollapsed 
                        ? 'lg:w-14 lg:h-14 lg:justify-center lg:mx-auto gap-4 px-5 py-3.5' 
                        : 'gap-4 px-5 py-3.5'
                      }
                    `}
                    style={isActive ? {
                      background: 'var(--gradient-primary)',
                      boxShadow: 'var(--shadow-md)',
                    } : {
                      color: 'var(--foreground)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <span 
                      className={`flex-1 text-left ${isCollapsed ? 'lg:hidden' : ''}`}
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div 
            className={`
              border-t relative transition-all duration-300
              ${isCollapsed ? 'lg:p-4' : 'p-4 sm:p-6'}
            `}
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            {/* Dropdown */}
            {dropdownOpen && (
              <div 
                className={`
                  absolute mb-3 rounded-2xl p-3
                  ${isCollapsed ? 'lg:bottom-full lg:left-full lg:ml-2 bottom-full left-0 right-0' : 'bottom-full left-0 right-0'}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
                  zIndex: 100,
                  minWidth: isCollapsed ? '240px' : 'auto',
                }}
              >
                <button
                  onClick={() => {
                    handleNavigate('profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <User className="w-5 h-5" />
                  <span 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Mon Profil
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleNavigate('account');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Settings className="w-5 h-5" />
                  <span 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Paramètres
                  </span>
                </button>

                {/* Notifications Link */}
                <button
                  onClick={() => {
                    handleNavigate('notifications');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative"
                  style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Bell className="w-5 h-5" />
                  <span 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span 
                      className="absolute right-4 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: 'var(--secondary)',
                        color: 'white',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        boxShadow: '0 2px 8px rgba(237, 132, 58, 0.4)',
                      }}
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {userHasEnterpriseAccess && (
                  <button
                    onClick={() => {
                      handleNavigate('entreprise-dashboard');
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative"
                    style={{ color: 'var(--foreground)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span 
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Espace Entreprise
                    </span>
                    <span 
                      className="absolute right-4 px-2 py-1 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                        color: 'white',
                        letterSpacing: '0.05em',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                      }}
                    >
                      PRO
                    </span>
                  </button>
                )}

                <div className="h-px my-2" style={{ background: 'rgba(0, 0, 0, 0.06)' }} />

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout?.();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ color: 'var(--destructive)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Déconnexion
                  </span>
                </button>
              </div>
            )}

            {/* User Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className={`
                w-full flex items-center rounded-2xl border transition-all duration-200 relative
                ${isCollapsed ? 'lg:flex-col lg:gap-2 lg:p-3 gap-3 p-4' : 'gap-3 p-4'}
              `}
              style={{
                background: 'rgba(85, 161, 180, 0.05)',
                borderColor: 'rgba(85, 161, 180, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(85, 161, 180, 0.1)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(85, 161, 180, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(85, 161, 180, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(85, 161, 180, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              title={isCollapsed ? userName : undefined}
            >
              {/* OPTION 1: Badge on Avatar - Toujours visible même en mode collapsed */}
              <div className="relative">
                {notificationDisplayMode === 'avatar' && unreadCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: 'var(--secondary)',
                      color: 'white',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-bold)',
                      boxShadow: '0 2px 8px rgba(237, 132, 58, 0.4)',
                    }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
                
                <div 
                  className={`rounded-full flex items-center justify-center text-white flex-shrink-0 ${isCollapsed ? 'lg:w-10 lg:h-10 w-11 h-11' : 'w-11 h-11'}`}
                  style={{
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: isCollapsed ? 'var(--text-sm)' : 'var(--text-base)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {userInitials}
                </div>
              </div>
              
              {/* User info - Hidden when collapsed on desktop */}
              <div className={`flex-1 min-w-0 text-left ${isCollapsed ? 'lg:hidden' : ''}`}>
                <p 
                  className="truncate"
                  style={{ 
                    color: 'var(--foreground)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {userName}
                </p>
                <p 
                  className="truncate"
                  style={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {userEmail}
                </p>
              </div>
              
              <ChevronDown 
                className={`flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''} ${isCollapsed ? 'lg:hidden w-5 h-5' : 'w-5 h-5'}`}
                style={{ color: 'var(--muted-foreground)' }}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}