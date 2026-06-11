import { useState } from 'react';
import { 
  Users,
  TrendingUp,
  Award,
  Download,
  UserPlus,
  Crown,
  Target,
  BarChart3,
  Settings,
  Clock,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  BookOpen,
  Zap,
  Bell,
  Shield,
  CreditCard,
  Mail,
  Building2,
  Globe,
  Palette,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserMinus,
  Video,
  Calendar,
  X,
  ChevronDown,
  Save,
  AlertCircle,
  Key,
  Lock,
  Unlock,
  ShieldCheck,
  UserCog,
  Plus,
  Minus,
  CheckSquare,
  XSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import { ProgressBarEnhanced } from '../components/ui/progress-bar-enhanced';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface EnterprisePageCompleteProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'account') => void;
  onLogout: () => void;
}

type TabType = 'dashboard' | 'users' | 'settings';
type UserRole = 'admin' | 'manager' | 'member' | 'viewer';
type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended';

// ========== INTERFACES ==========

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface RoleConfig {
  name: string;
  description: string;
  color: string;
  permissions: Permission[];
}

interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  joinedDate: string;
  lastActive: string;
  
  // Stats
  coursesCompleted: number;
  coursesInProgress: number;
  totalHours: number;
  currentStreak: number;
  completionRate: number;
  averageScore: number;
  badgesUnlocked: number;
  coachingSessions: number;
  activeDaysThisMonth: number;
  lastCourse: string;
}

// ========== DATA ==========

const companyInfo = {
  name: 'TLS Formation',
  plan: 'Premium Enterprise',
  domain: 'tls-formation.fr',
  industry: 'Formation Professionnelle',
  size: '50-200 employés',
  address: '10 Rue de la Formation, 75001 Paris',
  phone: '+33 1 23 45 67 89',
  email: 'contact@tls-formation.fr',
  website: 'https://tls-formation.fr',
  
  // Licensing
  totalLicenses: 50,
  usedLicenses: 24,
  remainingLicenses: 26,
  billingDate: '28 janvier 2026',
  billingAmount: '4,500€',
  
  // Admin
  adminEmail: 'admin@tls-formation.fr',
  adminName: 'Pierre Administrateur',
};

const globalStats = {
  totalUsers: 24,
  activeUsers: 18,
  totalHours: 456,
  averageCompletion: 72,
  coursesCompleted: 156,
  coachingSessions: 45,
  badgesUnlocked: 89,
  usersTrend: 8,
  hoursTrend: 12,
  completionTrend: 5,
  coursesTrend: 15,
};

const weeklyData = [
  { day: 'Lun', heures: 45, actifs: 18 },
  { day: 'Mar', heures: 52, actifs: 20 },
  { day: 'Mer', heures: 48, actifs: 19 },
  { day: 'Jeu', heures: 61, actifs: 22 },
  { day: 'Ven', heures: 55, actifs: 21 },
  { day: 'Sam', heures: 28, actifs: 12 },
  { day: 'Dim', heures: 32, actifs: 14 },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@tls-formation.fr',
    role: 'admin',
    department: 'Formation',
    status: 'active',
    joinedDate: '2024-11-15',
    lastActive: '2 min',
    coursesCompleted: 15,
    coursesInProgress: 3,
    totalHours: 68,
    currentStreak: 12,
    completionRate: 85,
    averageScore: 92,
    badgesUnlocked: 8,
    coachingSessions: 5,
    activeDaysThisMonth: 18,
    lastCourse: 'Techniques avancées de prompting',
  },
  {
    id: 2,
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@tls-formation.fr',
    role: 'manager',
    department: 'Pédagogie',
    status: 'active',
    joinedDate: '2024-11-20',
    lastActive: '1h',
    coursesCompleted: 12,
    coursesInProgress: 4,
    totalHours: 54,
    currentStreak: 8,
    completionRate: 78,
    averageScore: 88,
    badgesUnlocked: 6,
    coachingSessions: 4,
    activeDaysThisMonth: 15,
    lastCourse: 'Création de contenus IA',
  },
  {
    id: 3,
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@tls-formation.fr',
    role: 'member',
    department: 'Formation',
    status: 'active',
    joinedDate: '2024-12-01',
    lastActive: '5h',
    coursesCompleted: 10,
    coursesInProgress: 2,
    totalHours: 42,
    currentStreak: 5,
    completionRate: 72,
    averageScore: 85,
    badgesUnlocked: 5,
    coachingSessions: 3,
    activeDaysThisMonth: 12,
    lastCourse: 'Fondamentaux ChatGPT',
  },
  {
    id: 4,
    firstName: 'Thomas',
    lastName: 'Petit',
    email: 'thomas.petit@tls-formation.fr',
    role: 'member',
    department: 'RH',
    status: 'active',
    joinedDate: '2024-12-05',
    lastActive: '2 jours',
    coursesCompleted: 8,
    coursesInProgress: 3,
    totalHours: 35,
    currentStreak: 3,
    completionRate: 65,
    averageScore: 82,
    badgesUnlocked: 4,
    coachingSessions: 2,
    activeDaysThisMonth: 10,
    lastCourse: 'Introduction à l\'IA',
  },
  {
    id: 5,
    firstName: 'Claire',
    lastName: 'Dubois',
    email: 'claire.dubois@tls-formation.fr',
    role: 'member',
    department: 'Marketing',
    status: 'inactive',
    joinedDate: '2024-11-25',
    lastActive: '3 jours',
    coursesCompleted: 5,
    coursesInProgress: 1,
    totalHours: 22,
    currentStreak: 0,
    completionRate: 45,
    averageScore: 78,
    badgesUnlocked: 2,
    coachingSessions: 1,
    activeDaysThisMonth: 6,
    lastCourse: 'Prompt Engineering basics',
  },
  {
    id: 6,
    firstName: 'Luc',
    lastName: 'Moreau',
    email: 'luc.moreau@tls-formation.fr',
    role: 'viewer',
    department: 'Commercial',
    status: 'invited',
    joinedDate: '2026-01-05',
    lastActive: 'Jamais',
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHours: 0,
    currentStreak: 0,
    completionRate: 0,
    averageScore: 0,
    badgesUnlocked: 0,
    coachingSessions: 0,
    activeDaysThisMonth: 0,
    lastCourse: '-',
  },
  {
    id: 7,
    firstName: 'Emma',
    lastName: 'Rousseau',
    email: 'emma.rousseau@tls-formation.fr',
    role: 'member',
    department: 'Formation',
    status: 'suspended',
    joinedDate: '2024-10-10',
    lastActive: '2 semaines',
    coursesCompleted: 3,
    coursesInProgress: 0,
    totalHours: 15,
    currentStreak: 0,
    completionRate: 30,
    averageScore: 65,
    badgesUnlocked: 1,
    coachingSessions: 0,
    activeDaysThisMonth: 0,
    lastCourse: 'Intro IA',
  },
];

// ========== ROLES & PERMISSIONS ==========

const availablePermissions = [
  { id: 'view-content', name: 'Voir les contenus', description: 'Accès en lecture aux parcours et leçons' },
  { id: 'complete-lessons', name: 'Compléter les leçons', description: 'Marquer les leçons comme terminées' },
  { id: 'access-coaching', name: 'Accès coaching', description: 'Réserver et participer aux sessions de coaching' },
  { id: 'view-analytics', name: 'Voir les analytics', description: 'Accès aux statistiques personnelles' },
  { id: 'manage-users', name: 'Gérer les utilisateurs', description: 'Ajouter, modifier, supprimer des utilisateurs' },
  { id: 'manage-content', name: 'Gérer le contenu', description: 'Créer et modifier les parcours et leçons' },
  { id: 'view-all-analytics', name: 'Analytics globales', description: 'Voir les statistiques de tous les utilisateurs' },
  { id: 'manage-billing', name: 'Gérer la facturation', description: 'Accès aux paramètres de facturation et licences' },
  { id: 'manage-settings', name: 'Gérer les paramètres', description: 'Modifier les paramètres de l\'entreprise' },
];

const rolesConfig: Record<UserRole, RoleConfig> = {
  admin: {
    name: 'Administrateur',
    description: 'Accès complet à toutes les fonctionnalités',
    color: 'var(--accent)',
    permissions: availablePermissions.map(p => ({ ...p, enabled: true })),
  },
  manager: {
    name: 'Manager',
    description: 'Gestion des utilisateurs et analytics',
    color: 'var(--secondary)',
    permissions: availablePermissions.map(p => ({ 
      ...p, 
      enabled: !['manage-billing', 'manage-settings'].includes(p.id),
    })),
  },
  member: {
    name: 'Membre',
    description: 'Accès aux contenus et coaching',
    color: 'var(--primary)',
    permissions: availablePermissions.map(p => ({ 
      ...p, 
      enabled: ['view-content', 'complete-lessons', 'access-coaching', 'view-analytics'].includes(p.id),
    })),
  },
  viewer: {
    name: 'Lecteur',
    description: 'Accès en lecture seule',
    color: 'var(--muted-foreground)',
    permissions: availablePermissions.map(p => ({ 
      ...p, 
      enabled: p.id === 'view-content',
    })),
  },
};

export default function EnterprisePageComplete({ onNavigate, onLogout }: EnterprisePageCompleteProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Users tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'hours' | 'lastActive'>('name');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Settings tab state
  const [settingsSection, setSettingsSection] = useState<'general' | 'roles' | 'licenses' | 'branding' | 'notifications' | 'security'>('general');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [inactivityAlerts, setInactivityAlerts] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState(90);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'users' as TabType, label: 'Utilisateurs', icon: Users },
    { id: 'settings' as TabType, label: 'Paramètres', icon: Settings },
  ];

  const settingsSections = [
    { id: 'general' as const, label: 'Général', icon: Building2 },
    { id: 'roles' as const, label: 'Rôles & Permissions', icon: Shield },
    { id: 'licenses' as const, label: 'Licences', icon: CreditCard },
    { id: 'branding' as const, label: 'Branding', icon: Palette },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Sécurité', icon: Lock },
  ];

  // Filtered users
  const filteredUsers = teamMembers
    .filter((user) => {
      const matchesSearch = 
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;
      const matchesRole = !selectedRole || user.role === selectedRole;
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.lastName.localeCompare(b.lastName);
        case 'progress':
          return b.completionRate - a.completionRate;
        case 'hours':
          return b.totalHours - a.totalHours;
        case 'lastActive':
          return a.lastActive.localeCompare(b.lastActive);
        default:
          return 0;
      }
    });

  const departments = Array.from(new Set(teamMembers.map((u) => u.department)));

  const getRoleBadgeColor = (role: UserRole) => {
    return rolesConfig[role].color;
  };

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return { bg: 'var(--success-50)', color: 'var(--success)' };
      case 'inactive':
        return { bg: 'var(--muted)', color: 'var(--muted-foreground)' };
      case 'invited':
        return { bg: 'var(--secondary-50)', color: 'var(--secondary)' };
      case 'suspended':
        return { bg: 'var(--error-50)', color: 'var(--error)' };
    }
  };

  const getRoleLabel = (role: UserRole) => rolesConfig[role].name;

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'invited': return 'Invité';
      case 'suspended': return 'Suspendu';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="entreprise-dashboard"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* ========== HEADER ========== */}
          <div 
            className="sticky top-0 z-30 px-6 md:px-8 py-6"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {companyInfo.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      {companyInfo.plan}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <ButtonEnhanced
                  variant="ghost"
                  size="md"
                  icon={<Download className="w-4 h-4" />}
                >
                  Exporter
                </ButtonEnhanced>
                {activeTab === 'users' && (
                  <ButtonEnhanced
                    variant="primary"
                    size="md"
                    icon={<UserPlus className="w-4 h-4" />}
                    onClick={() => setShowInviteModal(true)}
                  >
                    Inviter
                  </ButtonEnhanced>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div 
              className="rounded-2xl p-1"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200"
                      style={{
                        background: isActive ? 'var(--gradient-primary)' : 'transparent',
                        color: isActive ? 'white' : 'var(--muted-foreground)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
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
            
            {/* ========== DASHBOARD TAB ========== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div 
                    className="p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Users className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success)' }}>
                          <ArrowUpRight className="w-3 h-3" />
                          {globalStats.usersTrend}%
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-1)' }}>
                        {globalStats.totalUsers}
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Utilisateurs
                      </p>
                    </div>
                  </div>

                  <div 
                    className="p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.15) 0%, transparent 70%)' }} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Clock className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success)' }}>
                          <ArrowUpRight className="w-3 h-3" />
                          {globalStats.hoursTrend}%
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-1)' }}>
                        {globalStats.totalHours}h
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Heures totales
                      </p>
                    </div>
                  </div>

                  <div 
                    className="p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.15) 0%, transparent 70%)' }} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Target className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success)' }}>
                          <ArrowUpRight className="w-3 h-3" />
                          {globalStats.completionTrend}%
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-1)' }}>
                        {globalStats.averageCompletion}%
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Complétion
                      </p>
                    </div>
                  </div>

                  <div 
                    className="p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Award className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--success)' }}>
                          <ArrowUpRight className="w-3 h-3" />
                          {globalStats.coursesTrend}%
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-1)' }}>
                        {globalStats.coursesCompleted}
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Cours complétés
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div 
                  className="p-8 rounded-3xl relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                  <div className="relative">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-6)' }}>
                      Activité de la semaine
                    </h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="colorHeures" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorActifs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="day" style={{ fontSize: '12px', fill: 'var(--muted-foreground)' }} stroke="var(--border)" />
                        <YAxis style={{ fontSize: '12px', fill: 'var(--muted-foreground)' }} stroke="var(--border)" />
                        <Tooltip contentStyle={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="heures" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorHeures)" />
                        <Area type="monotone" dataKey="actifs" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorActifs)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* ========== USERS TAB ========== */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Filters */}
                <div 
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                      <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl"
                        style={{
                          background: 'white',
                          border: '1px solid var(--border)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--foreground)',
                        }}
                      />
                    </div>

                    <select
                      value={selectedDepartment || ''}
                      onChange={(e) => setSelectedDepartment(e.target.value || null)}
                      className="px-4 py-3 rounded-xl"
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <option value="">Tous les départements</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>

                    <select
                      value={selectedRole || ''}
                      onChange={(e) => setSelectedRole((e.target.value as UserRole) || null)}
                      className="px-4 py-3 rounded-xl"
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <option value="">Tous les rôles</option>
                      <option value="admin">Administrateur</option>
                      <option value="manager">Manager</option>
                      <option value="member">Membre</option>
                      <option value="viewer">Lecteur</option>
                    </select>

                    <select
                      value={selectedStatus || ''}
                      onChange={(e) => setSelectedStatus((e.target.value as UserStatus) || null)}
                      className="px-4 py-3 rounded-xl"
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <option value="">Tous les statuts</option>
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="invited">Invité</option>
                      <option value="suspended">Suspendu</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-4 py-3 rounded-xl"
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                      }}
                    >
                      <option value="name">Nom</option>
                      <option value="progress">Progression</option>
                      <option value="hours">Heures</option>
                      <option value="lastActive">Dernière activité</option>
                    </select>
                  </div>

                  {/* Active Filters */}
                  {(selectedDepartment || selectedStatus || selectedRole || searchQuery) && (
                    <div className="flex items-center gap-2 mt-4">
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                        Filtres actifs :
                      </span>
                      {searchQuery && (
                        <span className="px-3 py-1 rounded-lg flex items-center gap-2" style={{ background: 'var(--primary-lighter)', color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>
                          "{searchQuery}"
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                        </span>
                      )}
                      {selectedDepartment && (
                        <span className="px-3 py-1 rounded-lg flex items-center gap-2" style={{ background: 'var(--secondary-50)', color: 'var(--secondary)', fontSize: 'var(--text-sm)' }}>
                          {selectedDepartment}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDepartment(null)} />
                        </span>
                      )}
                      {selectedRole && (
                        <span className="px-3 py-1 rounded-lg flex items-center gap-2" style={{ background: 'var(--accent-50)', color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>
                          {getRoleLabel(selectedRole)}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRole(null)} />
                        </span>
                      )}
                      {selectedStatus && (
                        <span className="px-3 py-1 rounded-lg flex items-center gap-2" style={{ background: getStatusBadgeColor(selectedStatus).bg, color: getStatusBadgeColor(selectedStatus).color, fontSize: 'var(--text-sm)' }}>
                          {getStatusLabel(selectedStatus)}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedStatus(null)} />
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Users List */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowUserModal(true);
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ 
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                fontSize: 'var(--text-base)',
                                fontWeight: 'var(--font-weight-bold)',
                              }}
                            >
                              {user.firstName[0]}{user.lastName[0]}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                                  {user.firstName} {user.lastName}
                                </h4>
                                <span 
                                  className="px-2 py-0.5 rounded-md text-xs"
                                  style={{
                                    background: `${getRoleBadgeColor(user.role)}15`,
                                    color: getRoleBadgeColor(user.role),
                                    fontWeight: 'var(--font-weight-semibold)',
                                  }}
                                >
                                  {getRoleLabel(user.role)}
                                </span>
                                <span 
                                  className="px-2 py-0.5 rounded-md text-xs"
                                  style={{
                                    background: getStatusBadgeColor(user.status).bg,
                                    color: getStatusBadgeColor(user.status).color,
                                    fontWeight: 'var(--font-weight-semibold)',
                                  }}
                                >
                                  {getStatusLabel(user.status)}
                                </span>
                              </div>
                              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                                {user.email} • {user.department}
                              </p>
                            </div>
                          </div>

                          <button 
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--muted-foreground)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Open action menu
                            }}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                              Cours complétés
                            </p>
                            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                              {user.coursesCompleted}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                              Temps total
                            </p>
                            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                              {user.totalHours}h
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                              Complétion
                            </p>
                            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                              {user.completionRate}%
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '4px' }}>
                              Score moyen
                            </p>
                            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                              {user.averageScore}%
                            </p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                              Progression globale
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)' }}>
                              {user.completionRate}%
                            </span>
                          </div>
                          <ProgressBarEnhanced
                            current={user.completionRate}
                            total={100}
                            color="var(--gradient-primary)"
                            height="8px"
                            showPercentage={false}
                            animated={true}
                          />
                        </div>

                        {/* Footer Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                            <Clock className="w-4 h-4" />
                            Dernière activité : {user.lastActive}
                          </span>
                          <span className="flex items-center gap-2" style={{ color: 'var(--muted-foreground)' }}>
                            <Calendar className="w-4 h-4" />
                            Inscrit le {new Date(user.joinedDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                  <div 
                    className="p-12 rounded-3xl text-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Users className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--muted-foreground)' }} />
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
                      Aucun utilisateur trouvé
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      Essayez de modifier vos filtres de recherche
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ========== SETTINGS TAB ========== */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div 
                  className="lg:col-span-1 p-4 rounded-2xl h-fit"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <nav className="space-y-1">
                    {settingsSections.map((section) => {
                      const Icon = section.icon;
                      const isActive = settingsSection === section.id;
                      
                      return (
                        <button
                          key={section.id}
                          onClick={() => setSettingsSection(section.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                          style={{
                            background: isActive ? 'var(--gradient-primary)' : 'transparent',
                            color: isActive ? 'white' : 'var(--foreground)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <Icon className="w-5 h-5" />
                          {section.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* GENERAL SETTINGS */}
                  {settingsSection === 'general' && (
                    <div 
                      className="p-8 rounded-3xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                      <div className="relative space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <Building2 className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                            Informations générales
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Nom de l'entreprise
                            </label>
                            <input
                              type="text"
                              defaultValue={companyInfo.name}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Domaine
                            </label>
                            <input
                              type="text"
                              defaultValue={companyInfo.domain}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Secteur d'activité
                            </label>
                            <input
                              type="text"
                              defaultValue={companyInfo.industry}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Taille de l'entreprise
                            </label>
                            <select
                              defaultValue={companyInfo.size}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            >
                              <option value="1-10">1-10 employés</option>
                              <option value="11-50">11-50 employés</option>
                              <option value="50-200">50-200 employés</option>
                              <option value="200+">200+ employés</option>
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Adresse
                            </label>
                            <input
                              type="text"
                              defaultValue={companyInfo.address}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              defaultValue={companyInfo.phone}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div>
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Email
                            </label>
                            <input
                              type="email"
                              defaultValue={companyInfo.email}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                              Site web
                            </label>
                            <input
                              type="url"
                              defaultValue={companyInfo.website}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                          <ButtonEnhanced variant="ghost" size="lg">
                            Annuler
                          </ButtonEnhanced>
                          <ButtonEnhanced variant="primary" size="lg" icon={<Save className="w-5 h-5" />}>
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ROLES & PERMISSIONS */}
                  {settingsSection === 'roles' && (
                    <div className="space-y-6">
                      {Object.entries(rolesConfig).map(([roleKey, role]) => (
                        <div 
                          key={roleKey}
                          className="p-8 rounded-3xl relative overflow-hidden"
                          style={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                          }}
                        >
                          <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 0%, ${role.color}20 0%, transparent 70%)` }} />
                          <div className="relative">
                            <div className="flex items-start justify-between mb-6">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <Shield className="w-6 h-6" style={{ color: role.color }} />
                                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                                    {role.name}
                                  </h3>
                                  <span 
                                    className="px-3 py-1 rounded-lg text-xs"
                                    style={{
                                      background: `${role.color}15`,
                                      color: role.color,
                                      fontWeight: 'var(--font-weight-bold)',
                                    }}
                                  >
                                    {roleKey.toUpperCase()}
                                  </span>
                                </div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                                  {role.description}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {role.permissions.map((permission) => (
                                <div 
                                  key={permission.id}
                                  className="flex items-start justify-between p-4 rounded-xl"
                                  style={{ background: 'rgba(0, 0, 0, 0.02)' }}
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      {permission.enabled ? (
                                        <CheckSquare className="w-5 h-5" style={{ color: 'var(--success)' }} />
                                      ) : (
                                        <XSquare className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                                      )}
                                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                                        {permission.name}
                                      </p>
                                    </div>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginLeft: '28px' }}>
                                      {permission.description}
                                    </p>
                                  </div>
                                  <span 
                                    className="px-3 py-1 rounded-lg text-xs flex-shrink-0"
                                    style={{
                                      background: permission.enabled ? 'var(--success-50)' : 'var(--muted)',
                                      color: permission.enabled ? 'var(--success)' : 'var(--muted-foreground)',
                                      fontWeight: 'var(--font-weight-semibold)',
                                    }}
                                  >
                                    {permission.enabled ? 'Activé' : 'Désactivé'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LICENSES */}
                  {settingsSection === 'licenses' && (
                    <div 
                      className="p-8 rounded-3xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.15) 0%, transparent 70%)' }} />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                          <CreditCard className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                            Gestion des licences
                          </h3>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                              Licences utilisées
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary)' }}>
                              {companyInfo.usedLicenses} / {companyInfo.totalLicenses}
                            </span>
                          </div>
                          <ProgressBarEnhanced
                            current={companyInfo.usedLicenses}
                            total={companyInfo.totalLicenses}
                            color="var(--gradient-primary)"
                            height="12px"
                            showPercentage={true}
                            animated={true}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(85, 161, 180, 0.08)' }}>
                            <p className="mb-1" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary)' }}>
                              {companyInfo.totalLicenses}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              Total
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.08)' }}>
                            <p className="mb-1" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--success)' }}>
                              {companyInfo.usedLicenses}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              Utilisées
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(248, 176, 68, 0.08)' }}>
                            <p className="mb-1" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--accent)' }}>
                              {companyInfo.remainingLicenses}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              Disponibles
                            </p>
                          </div>
                        </div>

                        <div className="p-6 rounded-xl mb-6" style={{ background: 'rgba(85, 161, 180, 0.08)' }}>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Plan actuel
                              </p>
                              <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary)' }}>
                                {companyInfo.plan}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Montant mensuel
                              </p>
                              <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                                {companyInfo.billingAmount}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Prochaine facturation
                              </p>
                              <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
                                {companyInfo.billingDate}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <ButtonEnhanced variant="primary" size="lg" icon={<Plus className="w-5 h-5" />}>
                            Ajouter des licences
                          </ButtonEnhanced>
                          <ButtonEnhanced variant="ghost" size="lg">
                            Gérer l'abonnement
                          </ButtonEnhanced>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BRANDING */}
                  {settingsSection === 'branding' && (
                    <div 
                      className="p-8 rounded-3xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(248, 176, 68, 0.15) 0%, transparent 70%)' }} />
                      <div className="relative space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <Palette className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                            Personnalisation
                          </h3>
                        </div>

                        <div>
                          <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                            Logo de l'entreprise
                          </label>
                          <div 
                            className="p-6 rounded-xl border-2 border-dashed text-center"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <Building2 className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
                              Glissez-déposez votre logo ici ou cliquez pour parcourir
                            </p>
                            <ButtonEnhanced variant="ghost" size="sm">
                              Parcourir
                            </ButtonEnhanced>
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                            Couleur principale
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              type="color"
                              defaultValue="#55A1B4"
                              className="w-16 h-12 rounded-xl cursor-pointer"
                              style={{ border: '1px solid var(--border)' }}
                            />
                            <input
                              type="text"
                              defaultValue="#55A1B4"
                              className="flex-1 px-4 py-3 rounded-xl"
                              style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--foreground)',
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                            Message de bienvenue
                          </label>
                          <textarea
                            rows={4}
                            defaultValue="Bienvenue sur la plateforme de formation TLS Formation. Développez vos compétences en IA et transformez votre pratique professionnelle."
                            className="w-full px-4 py-3 rounded-xl"
                            style={{
                              background: 'white',
                              border: '1px solid var(--border)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--foreground)',
                              resize: 'vertical',
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                          <ButtonEnhanced variant="ghost" size="lg">
                            Annuler
                          </ButtonEnhanced>
                          <ButtonEnhanced variant="primary" size="lg" icon={<Save className="w-5 h-5" />}>
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NOTIFICATIONS */}
                  {settingsSection === 'notifications' && (
                    <div 
                      className="p-8 rounded-3xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)' }} />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                          <Bell className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                            Notifications
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                            <div className="flex-1">
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Notifications activées
                              </p>
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                Activer les notifications par email pour les administrateurs
                              </p>
                            </div>
                            <button
                              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                              className="ml-4 w-12 h-6 rounded-full transition-colors relative"
                              style={{
                                background: notificationsEnabled ? 'var(--success)' : 'var(--muted)',
                              }}
                            >
                              <div 
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                                style={{
                                  left: notificationsEnabled ? 'calc(100% - 22px)' : '2px',
                                }}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                            <div className="flex-1">
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Rapports hebdomadaires
                              </p>
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                Recevoir un résumé hebdomadaire de l'activité de l'équipe
                              </p>
                            </div>
                            <button
                              onClick={() => setWeeklyReports(!weeklyReports)}
                              className="ml-4 w-12 h-6 rounded-full transition-colors relative"
                              style={{
                                background: weeklyReports ? 'var(--success)' : 'var(--muted)',
                              }}
                            >
                              <div 
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                                style={{
                                  left: weeklyReports ? 'calc(100% - 22px)' : '2px',
                                }}
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                            <div className="flex-1">
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Alertes d'inactivité
                              </p>
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                Être notifié quand un utilisateur est inactif pendant 7 jours
                              </p>
                            </div>
                            <button
                              onClick={() => setInactivityAlerts(!inactivityAlerts)}
                              className="ml-4 w-12 h-6 rounded-full transition-colors relative"
                              style={{
                                background: inactivityAlerts ? 'var(--success)' : 'var(--muted)',
                              }}
                            >
                              <div 
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                                style={{
                                  left: inactivityAlerts ? 'calc(100% - 22px)' : '2px',
                                }}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                          <ButtonEnhanced variant="ghost" size="lg">
                            Annuler
                          </ButtonEnhanced>
                          <ButtonEnhanced variant="primary" size="lg" icon={<Save className="w-5 h-5" />}>
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECURITY */}
                  {settingsSection === 'security' && (
                    <div 
                      className="p-8 rounded-3xl relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 70%)' }} />
                      <div className="relative space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <Lock className="w-6 h-6" style={{ color: 'var(--error)' }} />
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)' }}>
                            Sécurité
                          </h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                            <div className="flex-1">
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '4px' }}>
                                Authentification à deux facteurs (2FA)
                              </p>
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                                Exiger la 2FA pour tous les utilisateurs
                              </p>
                            </div>
                            <button
                              onClick={() => setTwoFactorRequired(!twoFactorRequired)}
                              className="ml-4 w-12 h-6 rounded-full transition-colors relative"
                              style={{
                                background: twoFactorRequired ? 'var(--success)' : 'var(--muted)',
                              }}
                            >
                              <div 
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                                style={{
                                  left: twoFactorRequired ? 'calc(100% - 22px)' : '2px',
                                }}
                              />
                            </button>
                          </div>

                          <div className="p-4 rounded-xl" style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', marginBottom: '12px' }}>
                              Expiration du mot de passe
                            </p>
                            <div className="flex items-center gap-4">
                              <input
                                type="number"
                                value={passwordExpiry}
                                onChange={(e) => setPasswordExpiry(Number(e.target.value))}
                                min="30"
                                max="365"
                                className="w-24 px-4 py-2 rounded-xl"
                                style={{
                                  background: 'white',
                                  border: '1px solid var(--border)',
                                  fontSize: 'var(--text-sm)',
                                  color: 'var(--foreground)',
                                }}
                              />
                              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                                jours
                              </span>
                            </div>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '8px' }}>
                              Les utilisateurs devront changer leur mot de passe tous les {passwordExpiry} jours
                            </p>
                          </div>

                          <div 
                            className="p-6 rounded-xl flex items-start gap-4"
                            style={{ background: 'var(--error-50)', border: '1px solid var(--error-200)' }}
                          >
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--error)' }} />
                            <div>
                              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--error)', marginBottom: '4px' }}>
                                Zone dangereuse
                              </p>
                              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--error)', marginBottom: '12px' }}>
                                Les actions suivantes sont irréversibles
                              </p>
                              <ButtonEnhanced 
                                variant="ghost" 
                                size="sm"
                                style={{ 
                                  color: 'var(--error)',
                                  borderColor: 'var(--error)',
                                }}
                              >
                                Révoquer tous les accès
                              </ButtonEnhanced>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6">
                          <ButtonEnhanced variant="ghost" size="lg">
                            Annuler
                          </ButtonEnhanced>
                          <ButtonEnhanced variant="primary" size="lg" icon={<Save className="w-5 h-5" />}>
                            Enregistrer
                          </ButtonEnhanced>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ========== INVITE MODAL ========== */}
      {showInviteModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowInviteModal(false)}
        >
          <div 
            className="w-full max-w-lg p-8 rounded-3xl"
            style={{
              background: 'white',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
              Inviter un utilisateur
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-6)' }}>
              Envoyez une invitation par email à un nouveau membre de votre équipe
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="nom@entreprise.com"
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>

              <div>
                <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                  Rôle
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                  }}
                >
                  <option value="member">Membre</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrateur</option>
                  <option value="viewer">Lecteur</option>
                </select>
              </div>

              <div>
                <label className="block mb-2" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                  Département
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    background: 'white',
                    border: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                  }}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ButtonEnhanced 
                variant="ghost" 
                size="lg"
                onClick={() => setShowInviteModal(false)}
                style={{ flex: 1 }}
              >
                Annuler
              </ButtonEnhanced>
              <ButtonEnhanced 
                variant="primary" 
                size="lg"
                icon={<Mail className="w-5 h-5" />}
                style={{ flex: 1 }}
              >
                Envoyer l'invitation
              </ButtonEnhanced>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
