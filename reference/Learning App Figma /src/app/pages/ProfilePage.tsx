import { useState } from 'react';
import {
  Camera,
  Mail,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Zap,
  Settings,
  Share2,
  Edit3,
  ChevronRight,
  Trophy,
  Star,
  Flame,
  CheckCircle2,
  Users,
  Heart,
  MessageSquare,
  Download,
} from 'lucide-react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { BackgroundBlobs } from '../components/ui/background-blobs';

interface ProfilePageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'plan' | 'veille' | 'entreprise-dashboard' | 'account' | 'journal' | 'messages' | 'notifications' | 'leaderboard') => void;
  onLogout: () => void;
}

// Mock user data
const userData = {
  name: 'Alexandre Padennery',
  username: '@admin1509',
  email: 'padennery@me.com',
  role: 'Formateur Expert IA',
  location: 'Paris, France',
  joinDate: 'Janvier 2024',
  bio: 'Passionné par l\'IA générative et la pédagogie innovante. Je crée des expériences d\'apprentissage qui transforment la formation professionnelle.',
  avatar: 'A',
  stats: {
    coursesCompleted: 12,
    hoursLearned: 86,
    currentStreak: 7,
    totalPoints: 2450,
    rank: 'Expert',
    level: 12,
  },
  badges: [
    { id: 1, name: 'Pionnier IA', icon: '🤖', color: 'var(--primary)', earned: true, date: '15 Jan 2024' },
    { id: 2, name: 'Streak Master', icon: '🔥', color: 'var(--secondary)', earned: true, date: '20 Jan 2024' },
    { id: 3, name: 'Expert GPT', icon: '⚡', color: 'var(--accent)', earned: true, date: '25 Jan 2024' },
    { id: 4, name: 'Contributeur', icon: '🌟', color: 'var(--primary-300)', earned: true, date: '1 Fév 2024' },
    { id: 5, name: 'Mentor', icon: '👨‍🏫', color: 'var(--secondary-300)', earned: false, progress: 60 },
    { id: 6, name: 'Innovateur', icon: '💡', color: 'var(--accent-300)', earned: false, progress: 40 },
  ],
  recentActivity: [
    { id: 1, type: 'course', title: 'Formation GPT-4 Avancé', date: 'Aujourd\'hui', icon: BookOpen, status: 'completed' },
    { id: 2, type: 'badge', title: 'Badge "Expert GPT" débloqué', date: 'Hier', icon: Award, status: 'new' },
    { id: 3, type: 'streak', title: 'Série de 7 jours maintenue', date: 'Il y a 2 jours', icon: Flame, status: 'active' },
    { id: 4, type: 'coaching', title: 'Session avec Marie Dubois', date: 'Il y a 3 jours', icon: Users, status: 'completed' },
  ],
  skills: [
    { name: 'Prompt Engineering', level: 95 },
    { name: 'IA Générative', level: 88 },
    { name: 'Pédagogie', level: 92 },
    { name: 'Design Thinking', level: 78 },
    { name: 'Veille Technologique', level: 85 },
  ],
  interests: ['IA Générative', 'Pédagogie', 'Prompt Engineering', 'Formation', 'Innovation', 'Learning Design'],
};

export default function ProfilePage({ onNavigate, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'badges' | 'stats'>('overview');

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="profile"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* ========== HERO PROFILE CARD ========== */}
          <div 
            className="relative px-6 md:px-8 py-8"
            style={{
              background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--accent-50) 100%)',
            }}
          >
            {/* Decorative glow */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at 30% 20%, rgba(85, 161, 180, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(248, 176, 68, 0.2) 0%, transparent 50%)',
              }}
            />

            <div className="relative max-w-6xl mx-auto">
              {/* Main Profile Card */}
              <div 
                className="p-8 rounded-3xl relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative">
                      {/* Avatar */}
                      <div 
                        className="w-32 h-32 rounded-3xl flex items-center justify-center text-white relative overflow-hidden"
                        style={{
                          background: 'var(--gradient-primary)',
                          boxShadow: '0 12px 40px rgba(85, 161, 180, 0.4)',
                        }}
                      >
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: '3rem',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {userData.avatar}
                        </span>

                        {/* Edit button overlay */}
                        <button 
                          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300"
                          style={{
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          <Camera className="w-8 h-8 text-white" />
                        </button>
                      </div>

                      {/* Level Badge */}
                      <div 
                        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'var(--gradient-secondary)',
                          border: '3px solid white',
                          boxShadow: '0 4px 16px rgba(237, 132, 58, 0.4)',
                        }}
                      >
                        <span 
                          className="text-white"
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {userData.stats.level}
                        </span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-6 flex gap-3">
                      <div 
                        className="px-4 py-2 rounded-xl text-center"
                        style={{
                          background: 'var(--primary-50)',
                          border: '1px solid var(--primary-100)',
                        }}
                      >
                        <div 
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--primary)',
                          }}
                        >
                          #{userData.stats.rank}
                        </div>
                        <div 
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          Rang
                        </div>
                      </div>

                      <div 
                        className="px-4 py-2 rounded-xl text-center"
                        style={{
                          background: 'var(--secondary-50)',
                          border: '1px solid var(--secondary-100)',
                        }}
                      >
                        <div 
                          className="flex items-center gap-1"
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--secondary)',
                          }}
                        >
                          <Flame className="w-4 h-4" />
                          {userData.stats.currentStreak}
                        </div>
                        <div 
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          jours
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <h1 
                          className="mb-1"
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {userData.name}
                        </h1>
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ color: 'var(--muted-foreground)' }}>
                            {userData.username}
                          </span>
                          <span style={{ color: 'var(--border)' }}>•</span>
                          <div 
                            className="px-3 py-1 rounded-full"
                            style={{
                              background: 'var(--accent-100)',
                              color: 'var(--accent-700)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                            }}
                          >
                            {userData.role}
                          </div>
                        </div>

                        <p 
                          className="mb-4"
                          style={{ 
                            color: 'var(--foreground)',
                            lineHeight: '1.6',
                          }}
                        >
                          {userData.bio}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                            <Mail className="w-4 h-4" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>{userData.email}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                            <MapPin className="w-4 h-4" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>{userData.location}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                            <Calendar className="w-4 h-4" />
                            <span style={{ fontSize: 'var(--text-sm)' }}>Membre depuis {userData.joinDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onNavigate('account')}
                          className="p-3 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)',
                          }}
                        >
                          <Settings className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-3 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid var(--border)',
                            color: 'var(--foreground)',
                          }}
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Interests Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {userData.interests.map((interest, index) => (
                        <div
                          key={index}
                          className="px-3 py-1.5 rounded-lg"
                          style={{
                            background: 'rgba(85, 161, 180, 0.1)',
                            border: '1px solid rgba(85, 161, 180, 0.2)',
                            color: 'var(--primary)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className="text-center">
                    <div 
                      className="flex items-center justify-center gap-2 mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary)',
                      }}
                    >
                      <BookOpen className="w-6 h-6" />
                      {userData.stats.coursesCompleted}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Cours terminés
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="flex items-center justify-center gap-2 mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--secondary)',
                      }}
                    >
                      <Clock className="w-6 h-6" />
                      {userData.stats.hoursLearned}h
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Temps d'apprentissage
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="flex items-center justify-center gap-2 mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Trophy className="w-6 h-6" />
                      {userData.stats.totalPoints}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Points XP
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="flex items-center justify-center gap-2 mb-1"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary-600)',
                      }}
                    >
                      <Award className="w-6 h-6" />
                      {userData.badges.filter(b => b.earned).length}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Badges débloqués
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== TABS NAVIGATION ========== */}
          <div 
            className="sticky top-0 z-20 px-6 md:px-8 py-4"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="max-w-6xl mx-auto flex gap-2">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Target },
                { id: 'activity', label: 'Activité récente', icon: TrendingUp },
                { id: 'badges', label: 'Badges & Réussites', icon: Award },
                { id: 'stats', label: 'Compétences', icon: Zap },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300"
                    style={{
                      background: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? 'white' : 'var(--foreground)',
                      fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                      boxShadow: isActive ? '0 4px 16px rgba(85, 161, 180, 0.3)' : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========== CONTENT ========== */}
          {/* ✅ CONTENEUR PRINCIPAL - Standard TLS harmonisé */}
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
          }}>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activity Card */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Activité récente
                    </h3>
                    <button 
                      onClick={() => setActiveTab('activity')}
                      style={{ color: 'var(--primary)' }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {userData.recentActivity.slice(0, 4).map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div 
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-102"
                          style={{
                            background: 'var(--background)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: activity.status === 'completed' ? 'var(--success-100)' : 
                                         activity.status === 'new' ? 'var(--accent-100)' : 'var(--primary-100)',
                              color: activity.status === 'completed' ? 'var(--success)' : 
                                     activity.status === 'new' ? 'var(--accent)' : 'var(--primary)',
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p 
                              className="mb-1"
                              style={{ 
                                fontWeight: 'var(--font-weight-medium)',
                                color: 'var(--foreground)',
                              }}
                            >
                              {activity.title}
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Badges Preview Card */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Badges récents
                    </h3>
                    <button 
                      onClick={() => setActiveTab('badges')}
                      style={{ color: 'var(--primary)' }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {userData.badges.filter(b => b.earned).slice(0, 6).map((badge) => (
                      <div 
                        key={badge.id}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'var(--background)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                          style={{
                            background: badge.color,
                            boxShadow: `0 8px 24px ${badge.color}40`,
                          }}
                        >
                          {badge.icon}
                        </div>
                        <span 
                          className="text-center"
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {badge.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Progress Card */}
                <div 
                  className="md:col-span-2 p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h3 
                    className="mb-6"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Progression cette semaine
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div 
                      className="p-6 rounded-xl text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Target className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--primary)' }} />
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--primary)',
                        }}
                      >
                        3/5
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Objectifs atteints
                      </p>
                    </div>

                    <div 
                      className="p-6 rounded-xl text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--secondary)' }} />
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--secondary)',
                        }}
                      >
                        12h
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Temps d'étude
                      </p>
                    </div>

                    <div 
                      className="p-6 rounded-xl text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Zap className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--accent)',
                        }}
                      >
                        +450
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Points XP gagnés
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <h3 
                  className="mb-6"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Toute l'activité
                </h3>

                {userData.recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div 
                      key={activity.id}
                      className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-102"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: activity.status === 'completed' ? 'var(--success-100)' : 
                                     activity.status === 'new' ? 'var(--accent-100)' : 'var(--primary-100)',
                          color: activity.status === 'completed' ? 'var(--success)' : 
                                 activity.status === 'new' ? 'var(--accent)' : 'var(--primary)',
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 
                          className="mb-1"
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {activity.title}
                        </h4>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                          {activity.date}
                        </p>
                      </div>
                      {activity.status === 'completed' && (
                        <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--success)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* BADGES TAB */}
            {activeTab === 'badges' && (
              <div>
                <h3 
                  className="mb-6"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Badges & Réussites
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {userData.badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                      style={{
                        background: badge.earned ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${badge.earned ? 'var(--border)' : 'rgba(0, 0, 0, 0.05)'}`,
                        boxShadow: badge.earned ? '0 8px 32px rgba(0, 0, 0, 0.08)' : 'none',
                        opacity: badge.earned ? 1 : 0.6,
                      }}
                    >
                      <div 
                        className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4"
                        style={{
                          background: badge.earned ? badge.color : 'var(--muted)',
                          boxShadow: badge.earned ? `0 12px 32px ${badge.color}40` : 'none',
                        }}
                      >
                        {badge.icon}
                      </div>

                      <h4 
                        className="text-center mb-2"
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {badge.name}
                      </h4>

                      {badge.earned ? (
                        <div 
                          className="flex items-center justify-center gap-1"
                          style={{ color: 'var(--success)', fontSize: 'var(--text-sm)' }}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Débloqué le {badge.date}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="w-full h-2 rounded-full mb-2" style={{ background: 'var(--muted)' }}>
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${badge.progress}%`,
                                background: 'var(--gradient-primary)',
                              }}
                            />
                          </div>
                          <p 
                            className="text-center"
                            style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}
                          >
                            Progression : {badge.progress}%
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STATS TAB */}
            {activeTab === 'stats' && (
              <div>
                <h3 
                  className="mb-6"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Compétences & Expertise
                </h3>

                <div 
                  className="p-8 rounded-2xl mb-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="space-y-6">
                    {userData.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            style={{ 
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)',
                            }}
                          >
                            {skill.name}
                          </span>
                          <span 
                            style={{ 
                              fontFamily: 'var(--font-display)',
                              fontWeight: 'var(--font-weight-bold)',
                              color: 'var(--primary)',
                            }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div 
                          className="w-full h-3 rounded-full relative overflow-hidden"
                          style={{ background: 'var(--muted)' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${skill.level}%`,
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 0 20px rgba(85, 161, 180, 0.4)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div 
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-50) 100%)',
                      border: '1px solid var(--primary-200)',
                    }}
                  >
                    <Star className="w-8 h-8 mb-4" style={{ color: 'var(--primary)' }} />
                    <h4 
                      className="mb-2"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary)',
                      }}
                    >
                      Expertise Reconnue
                    </h4>
                    <p style={{ color: 'var(--primary-700)' }}>
                      Vos compétences en IA Générative vous placent dans le top 5% des apprenants.
                    </p>
                  </div>

                  <div 
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-100) 0%, var(--accent-50) 100%)',
                      border: '1px solid var(--accent-200)',
                    }}
                  >
                    <TrendingUp className="w-8 h-8 mb-4" style={{ color: 'var(--accent)' }} />
                    <h4 
                      className="mb-2"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--accent)',
                      }}
                    >
                      Progression Rapide
                    </h4>
                    <p style={{ color: 'var(--accent-700)' }}>
                      +25% de progression ce mois-ci, continuez ainsi !
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
