import { useState } from 'react';
import { 
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Award,
  Zap,
  Target,
  ChevronUp,
  ChevronDown,
  Minus,
  Filter,
  Calendar,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

// ✅ Import upgraded components
import { BadgeDisplay } from '../components/ui/badge-display';
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import { Tooltip } from '../components/ui/tooltip';
import { EmptyState } from '../components/ui/empty-state';

interface LeaderboardPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'account') => void;
  onLogout: () => void;
}

interface LeaderboardUser {
  id: string;
  rank: number;
  previousRank: number | null;
  name: string;
  initials: string;
  level: number;
  xp: number;
  coursesCompleted: number;
  badgesEarned: number;
  streak: number;
  avatarColor: string;
  isCurrentUser?: boolean;
}

// ✅ Sample leaderboard data
const generateLeaderboardData = (): LeaderboardUser[] => {
  const users: LeaderboardUser[] = [
    {
      id: 'current',
      rank: 8,
      previousRank: 12,
      name: 'Admin1509 (Vous)',
      initials: 'A',
      level: 12,
      xp: 1750,
      coursesCompleted: 12,
      badgesEarned: 8,
      streak: 12,
      avatarColor: 'var(--primary)',
      isCurrentUser: true,
    },
    {
      id: '1',
      rank: 1,
      previousRank: 1,
      name: 'Sophie Martin',
      initials: 'SM',
      level: 28,
      xp: 8420,
      coursesCompleted: 45,
      badgesEarned: 32,
      streak: 89,
      avatarColor: 'var(--accent)',
    },
    {
      id: '2',
      rank: 2,
      previousRank: 3,
      name: 'Thomas Dubois',
      initials: 'TD',
      level: 25,
      xp: 7235,
      coursesCompleted: 38,
      badgesEarned: 28,
      streak: 45,
      avatarColor: 'var(--secondary)',
    },
    {
      id: '3',
      rank: 3,
      previousRank: 2,
      name: 'Marie Leroy',
      initials: 'ML',
      level: 24,
      xp: 6890,
      coursesCompleted: 36,
      badgesEarned: 26,
      streak: 67,
      avatarColor: '#9333EA',
    },
    {
      id: '4',
      rank: 4,
      previousRank: 5,
      name: 'Pierre Bernard',
      initials: 'PB',
      level: 22,
      xp: 5670,
      coursesCompleted: 32,
      badgesEarned: 24,
      streak: 34,
      avatarColor: '#EC4899',
    },
    {
      id: '5',
      rank: 5,
      previousRank: 4,
      name: 'Julie Moreau',
      initials: 'JM',
      level: 21,
      xp: 5430,
      coursesCompleted: 29,
      badgesEarned: 22,
      streak: 56,
      avatarColor: '#F59E0B',
    },
    {
      id: '6',
      rank: 6,
      previousRank: 6,
      name: 'Lucas Petit',
      initials: 'LP',
      level: 19,
      xp: 4820,
      coursesCompleted: 25,
      badgesEarned: 20,
      streak: 28,
      avatarColor: '#10B981',
    },
    {
      id: '7',
      rank: 7,
      previousRank: 8,
      name: 'Emma Rousseau',
      initials: 'ER',
      level: 18,
      xp: 4560,
      coursesCompleted: 23,
      badgesEarned: 18,
      streak: 41,
      avatarColor: '#3B82F6',
    },
    {
      id: '9',
      rank: 9,
      previousRank: 7,
      name: 'Nicolas Garnier',
      initials: 'NG',
      level: 16,
      xp: 3890,
      coursesCompleted: 19,
      badgesEarned: 15,
      streak: 22,
      avatarColor: '#EF4444',
    },
    {
      id: '10',
      rank: 10,
      previousRank: 9,
      name: 'Léa Bonnet',
      initials: 'LB',
      level: 15,
      xp: 3640,
      coursesCompleted: 17,
      badgesEarned: 14,
      streak: 19,
      avatarColor: '#8B5CF6',
    },
  ];

  // Sort by rank
  return users.sort((a, b) => a.rank - b.rank);
};

type PeriodFilter = 'all-time' | 'monthly' | 'weekly';

export default function LeaderboardPage({ onNavigate, onLogout }: LeaderboardPageProps) {
  const [period, setPeriod] = useState<PeriodFilter>('all-time');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>(generateLeaderboardData());

  const currentUser = leaderboardData.find(u => u.isCurrentUser);
  const topThree = leaderboardData.slice(0, 3);
  const restOfUsers = leaderboardData.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6" style={{ color: '#FFD700' }} />;
      case 2:
        return <Medal className="w-6 h-6" style={{ color: '#C0C0C0' }} />;
      case 3:
        return <Medal className="w-6 h-6" style={{ color: '#CD7F32' }} />;
      default:
        return null;
    }
  };

  const getRankChange = (current: number, previous: number | null) => {
    if (previous === null) return { icon: <Minus className="w-4 h-4" />, color: 'var(--muted-foreground)', text: '-' };
    
    const diff = previous - current;
    if (diff > 0) {
      return { 
        icon: <ChevronUp className="w-4 h-4" />, 
        color: 'var(--success-600)', 
        text: `+${diff}` 
      };
    } else if (diff < 0) {
      return { 
        icon: <ChevronDown className="w-4 h-4" />, 
        color: 'var(--error-600)', 
        text: `${diff}` 
      };
    } else {
      return { 
        icon: <Minus className="w-4 h-4" />, 
        color: 'var(--muted-foreground)', 
        text: '=' 
      };
    }
  };

  const getPeriodLabel = (p: PeriodFilter) => {
    switch (p) {
      case 'all-time':
        return '🏆 Tous les temps';
      case 'monthly':
        return '📅 Ce mois-ci';
      case 'weekly':
        return '⚡ Cette semaine';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="leaderboard"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 md:p-8 pb-12">
            
            {/* ========== HEADER ========== */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Trophy 
                  className="w-7 h-7" 
                  style={{ color: 'var(--primary)' }} 
                />
                <h1 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Classement
                </h1>
              </div>
              
              <p 
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Suivez votre progression et comparez-vous aux autres apprenants
              </p>
            </div>

            {/* ========== PERIOD FILTER ========== */}
            <div className="flex items-center gap-4 mb-8">
              {(['all-time', 'monthly', 'weekly'] as PeriodFilter[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-6 py-3 rounded-xl transition-all"
                  style={{
                    background: period === p ? 'var(--primary)' : 'var(--glass-white)',
                    color: period === p ? 'white' : 'var(--foreground)',
                    border: `1px solid ${period === p ? 'var(--primary)' : 'var(--glass-border)'}`,
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                >
                  {getPeriodLabel(p)}
                </button>
              ))}
            </div>

            {/* ========== YOUR RANK CARD ========== */}
            {currentUser && (
              <div 
                className="p-6 rounded-3xl mb-8"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              >
                <div className="flex items-center gap-6">
                  {/* Rank badge */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'white',
                      }}
                    >
                      #{currentUser.rank}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p 
                      className="mb-1"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      Votre classement
                    </p>
                    <h3 
                      className="mb-2"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'white',
                      }}
                    >
                      {currentUser.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-white" />
                        <span style={{ color: 'white', fontSize: 'var(--text-sm)' }}>
                          Niveau {currentUser.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-white" />
                        <span style={{ color: 'white', fontSize: 'var(--text-sm)' }}>
                          {currentUser.xp} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-white" />
                        <span style={{ color: 'white', fontSize: 'var(--text-sm)' }}>
                          {currentUser.badgesEarned} badges
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rank change */}
                  {(() => {
                    const change = getRankChange(currentUser.rank, currentUser.previousRank);
                    return (
                      <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {change.icon}
                        <span 
                          style={{ 
                            color: 'white',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {change.text}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ========== TOP 3 PODIUM ========== */}
            <div className="mb-8">
              <h2 
                className="mb-6"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                🏆 Top 3
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topThree.map((user) => {
                  const rankIcon = getRankIcon(user.rank);
                  const change = getRankChange(user.rank, user.previousRank);

                  return (
                    <div
                      key={user.id}
                      className="p-6 rounded-3xl text-center transition-all duration-300 hover:-translate-y-2"
                      style={{
                        background: 'var(--glass-white)',
                        backdropFilter: 'var(--blur-xl)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)',
                      }}
                    >
                      {/* Rank icon */}
                      <div className="mb-4">
                        {rankIcon}
                      </div>

                      {/* Avatar */}
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                          background: user.avatarColor,
                          color: 'white',
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {user.initials}
                      </div>

                      {/* Name */}
                      <h3 
                        className="mb-1"
                        style={{ 
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {user.name}
                      </h3>

                      {/* Stats */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-center">
                          <p 
                            style={{ 
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-2xl)',
                              fontWeight: 'var(--font-weight-bold)',
                              color: 'var(--primary)',
                            }}
                          >
                            {user.level}
                          </p>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            Niveau
                          </p>
                        </div>

                        <div className="text-center">
                          <p 
                            style={{ 
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-2xl)',
                              fontWeight: 'var(--font-weight-bold)',
                              color: 'var(--secondary)',
                            }}
                          >
                            {user.xp}
                          </p>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            XP
                          </p>
                        </div>
                      </div>

                      {/* Badges & Streak */}
                      <div className="flex items-center justify-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-lg"
                          style={{
                            background: 'var(--accent-lighter)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--accent)',
                          }}
                        >
                          🏅 {user.badgesEarned}
                        </span>
                        <span 
                          className="px-3 py-1 rounded-lg"
                          style={{
                            background: 'rgba(255, 138, 0, 0.1)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: '#FF8A00',
                          }}
                        >
                          🔥 {user.streak}j
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========== REST OF LEADERBOARD ========== */}
            <div>
              <h2 
                className="mb-6"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Classement général
              </h2>

              <div 
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'var(--glass-white)',
                  backdropFilter: 'var(--blur-xl)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                }}
              >
                {/* Table header */}
                <div 
                  className="grid grid-cols-12 gap-4 p-4 border-b"
                  style={{
                    background: 'var(--neutral-50)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="col-span-1 text-center">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Rang
                    </p>
                  </div>
                  <div className="col-span-4">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Utilisateur
                    </p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Niveau
                    </p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      XP
                    </p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Badges
                    </p>
                  </div>
                  <div className="col-span-1 text-center">
                    <p 
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Évol.
                    </p>
                  </div>
                </div>

                {/* Table rows */}
                {restOfUsers.map((user) => {
                  const change = getRankChange(user.rank, user.previousRank);

                  return (
                    <div
                      key={user.id}
                      className="grid grid-cols-12 gap-4 p-4 border-b transition-all hover:bg-opacity-50"
                      style={{
                        background: user.isCurrentUser ? 'var(--primary-lighter)' : 'transparent',
                        borderColor: 'var(--border)',
                      }}
                    >
                      {/* Rank */}
                      <div className="col-span-1 flex items-center justify-center">
                        <p 
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: user.isCurrentUser ? 'var(--primary)' : 'var(--foreground)',
                          }}
                        >
                          #{user.rank}
                        </p>
                      </div>

                      {/* User */}
                      <div className="col-span-4 flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: user.avatarColor,
                            color: 'white',
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'var(--foreground)',
                            }}
                          >
                            {user.name}
                          </p>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-xs)',
                              color: 'var(--muted-foreground)',
                            }}
                          >
                            🔥 {user.streak} jours
                          </p>
                        </div>
                      </div>

                      {/* Level */}
                      <div className="col-span-2 flex items-center justify-center">
                        <span 
                          className="px-3 py-1 rounded-lg"
                          style={{
                            background: 'var(--primary-lighter)',
                            color: 'var(--primary)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                          }}
                        >
                          {user.level}
                        </span>
                      </div>

                      {/* XP */}
                      <div className="col-span-2 flex items-center justify-center">
                        <p 
                          style={{ 
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          {user.xp.toLocaleString()}
                        </p>
                      </div>

                      {/* Badges */}
                      <div className="col-span-2 flex items-center justify-center">
                        <p 
                          style={{ 
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          🏅 {user.badgesEarned}
                        </p>
                      </div>

                      {/* Change */}
                      <div className="col-span-1 flex items-center justify-center">
                        <div 
                          className="flex items-center gap-1"
                          style={{ color: change.color }}
                        >
                          {change.icon}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}